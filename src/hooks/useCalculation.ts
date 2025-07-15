
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CalculationResult } from '@/types/database';

interface CalculationParams {
  estadoId: string;
  valorImovel: number;
  tipoProcuracao: string;
}

export const useCalculation = (params: CalculationParams | null) => {
  return useQuery({
    queryKey: ['calculation', params],
    queryFn: async (): Promise<CalculationResult> => {
      if (!params) throw new Error('Parâmetros de cálculo não fornecidos');
      
      const { estadoId, valorImovel, tipoProcuracao } = params;
      
      // Buscar valores de escritura
      const { data: escrituraData, error: escrituraError } = await supabase
        .from('valores_escritura')
        .select('*')
        .eq('estado_id', estadoId)
        .lte('faixa_min', valorImovel)
        .or(`faixa_max.is.null,faixa_max.gte.${valorImovel}`)
        .limit(1)
        .single();

      if (escrituraError) {
        console.error('Erro ao buscar valores de escritura:', escrituraError);
      }

      // Buscar valores de registro
      const { data: registroData, error: registroError } = await supabase
        .from('valores_registro')
        .select('*')
        .eq('estado_id', estadoId)
        .lte('faixa_min', valorImovel)
        .or(`faixa_max.is.null,faixa_max.gte.${valorImovel}`)
        .limit(1)
        .single();

      if (registroError) {
        console.error('Erro ao buscar valores de registro:', registroError);
      }

      // Buscar alíquota ITBI
      const { data: itbiData, error: itbiError } = await supabase
        .from('aliquotas_itbi')
        .select('*')
        .eq('estado_id', estadoId)
        .limit(1)
        .single();

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
        .single();

      if (procuracaoError) {
        console.error('Erro ao buscar valor da procuração:', procuracaoError);
      }

      // Calcular valores
      const calcularValor = (dados: any, valorImovel: number) => {
        if (!dados) return 0;
        
        if (dados.valor_fixo) {
          return dados.valor_fixo;
        }
        
        if (dados.percentual) {
          const valorCalculado = valorImovel * dados.percentual;
          return dados.teto ? Math.min(valorCalculado, dados.teto) : valorCalculado;
        }
        
        return 0;
      };

      const valorEscritura = calcularValor(escrituraData, valorImovel);
      const valorRegistro = calcularValor(registroData, valorImovel);
      const aliquotaITBI = itbiData?.aliquota || 0;
      const valorITBI = valorImovel * aliquotaITBI;
      const valorProcuracao = procuracaoData?.valor || 0;
      const subtotal = valorEscritura + valorRegistro;
      const valorTotal = subtotal + valorITBI + valorProcuracao;

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
