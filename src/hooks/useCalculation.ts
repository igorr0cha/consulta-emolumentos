
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CalculationResult } from '@/types/database';
import { calcularEmolumento } from '@/lib/calculationPatterns';

interface CalculationParams {
  estadoId: string;
  valorImovel: number;
  tipoProcuracao: string;
  municipio?: string;
}

export const useCalculation = (params: CalculationParams | null) => {
  return useQuery({
    queryKey: ['calculation', params],
    queryFn: async (): Promise<CalculationResult> => {
      if (!params) throw new Error('Parâmetros de cálculo não fornecidos');
      
      const { estadoId, valorImovel, tipoProcuracao, municipio } = params;
      
      // Buscar padrão de cálculo do estado
      const { data: regraData, error: regraError } = await supabase
        .from('regras_calculo_estado')
        .select('padrao_calculo')
        .eq('estado_id', estadoId)
        .maybeSingle();

      if (regraError) {
        console.error('Erro ao buscar regra de cálculo:', regraError);
      }

      const padraoCalculo = regraData?.padrao_calculo || 1;

      // Buscar dados de escritura
      const { data: escrituraData, error: escrituraError } = await supabase
        .from('valores_emolumentos')
        .select('*')
        .eq('estado_id', estadoId)
        .eq('tipo_emolumento', 'escritura')
        .lte('faixa_minima', valorImovel)
        .or(`faixa_maxima.is.null,faixa_maxima.gte.${valorImovel}`)
        .order('faixa_minima', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (escrituraError) {
        console.error('Erro ao buscar valores de escritura:', escrituraError);
      }

      // Buscar dados de registro
      const { data: registroData, error: registroError } = await supabase
        .from('valores_emolumentos')
        .select('*')
        .eq('estado_id', estadoId)
        .eq('tipo_emolumento', 'registro')
        .lte('faixa_minima', valorImovel)
        .or(`faixa_maxima.is.null,faixa_maxima.gte.${valorImovel}`)
        .order('faixa_minima', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (registroError) {
        console.error('Erro ao buscar valores de registro:', registroError);
      }

      // Buscar alíquota ITBI
      let itbiQuery = supabase
        .from('aliquotas_itbi')
        .select('*')
        .eq('estado_id', estadoId);

      // Se município foi selecionado, buscar pela alíquota específica do município
      if (municipio && municipio.trim() !== '') {
        itbiQuery = itbiQuery.eq('municipio', municipio);
      } else {
        // Se não há município específico, buscar alíquota geral do estado (municipio null)
        itbiQuery = itbiQuery.is('municipio', null);
      }

      const { data: itbiData, error: itbiError } = await itbiQuery
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (itbiError) {
        console.error('Erro ao buscar alíquotas ITBI:', itbiError);
      }

      // Buscar valor da procuração
      const { data: procuracaoData, error: procuracaoError } = await supabase
        .from('procuracoes')
        .select('*')
        .eq('estado_id', estadoId)
        .eq('descricao', tipoProcuracao)
        .limit(1)
        .maybeSingle();

      if (procuracaoError) {
        console.error('Erro ao buscar valor da procuração:', procuracaoError);
      }

      // Calcular emolumentos usando os padrões específicos
      const valorEscritura = escrituraData 
        ? calcularEmolumento(valorImovel, {
            faixa_minima: escrituraData.faixa_minima,
            faixa_maxima: escrituraData.faixa_maxima,
            custo_base: escrituraData.custo_base,
            custo_por_faixa: escrituraData.custo_por_faixa,
            tamanho_faixa_excedente: escrituraData.tamanho_faixa_excedente,
            emolumento_maximo: escrituraData.emolumento_maximo,
            pmcmv: escrituraData.pmcmv,
            frj: escrituraData.frj
          }, padraoCalculo)
        : 0;

      const valorRegistro = registroData 
        ? calcularEmolumento(valorImovel, {
            faixa_minima: registroData.faixa_minima,
            faixa_maxima: registroData.faixa_maxima,
            custo_base: registroData.custo_base,
            custo_por_faixa: registroData.custo_por_faixa,
            tamanho_faixa_excedente: registroData.tamanho_faixa_excedente,
            emolumento_maximo: registroData.emolumento_maximo,
            pmcmv: registroData.pmcmv,
            frj: registroData.frj
          }, padraoCalculo)
        : 0;

      const aliquotaITBI = itbiData?.aliquota || 0;
      const valorITBI = valorImovel * aliquotaITBI;
      const valorProcuracao = procuracaoData?.valor || 0;
      const subtotal = valorEscritura + valorProcuracao;
      const valorTotal = valorEscritura + valorRegistro + valorITBI + valorProcuracao;

      return {
        valorRegistro,
        aliquotaITBI,
        valorITBI,
        valorProcuracao,
        valorEscritura,
        subtotal,
        valorTotal,
      };
    },
    enabled: !!params,
  });
};
