import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/database';
import { useEstados } from '@/hooks/useEstados';
import { useProcuracoes } from '@/hooks/useProcuracoes';
import { useMunicipios } from '@/hooks/useMunicipios';
import { Info } from 'lucide-react';

interface FormSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormSection: React.FC<FormSectionProps> = ({ formData, setFormData }) => {
  const { data: estados, isLoading: isLoadingEstados } = useEstados();
  const estadoSelecionado = estados?.find(e => e.uf === formData.estado);
  const { data: procuracoes, isLoading: isLoadingProcuracoes } = useProcuracoes(estadoSelecionado?.id || null);
  const { data: municipios, isLoading: isLoadingMunicipios } = useMunicipios(estadoSelecionado?.id || null);

  // Função otimizada para lidar com a entrada de valores monetários
  const handleValorImovelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Extrai apenas os dígitos do valor inserido
    const rawValue = e.target.value.replace(/\D/g, '');

    // 2. Se o campo estiver vazio, define o valor como 0
    if (!rawValue) {
      setFormData(prev => ({ ...prev, valorImovel: 0 }));
      return;
    }

    // 3. Converte a string de dígitos para um número (representando centavos)
    const valueInCents = parseInt(rawValue, 10);

    // 4. Atualiza o estado com o valor em formato numérico correto (dividido por 100)
    setFormData(prev => ({ ...prev, valorImovel: valueInCents / 100 }));
  };

  // Formata o valor numérico do estado para a exibição no formato BRL
  const displayValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(formData.valorImovel);

  return (
    <div className="space-y-6">
      {/* Dicas de Uso (mantido como estava) */}
      <div className="bg-[#e6f4f5] border border-[#8db7ba] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#007581] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#007581]">
            <p className="font-semibold mb-2">Como usar a plataforma:</p>
            <ul className="space-y-1 text-xs">
              <li>• Selecione o estado desejado para consulta</li>
              <li>• Escolha o município (apenas municípios cadastrados aparecem)</li>
              <li>• Digite o valor do imóvel com formatação automática</li>
              <li>• Selecione o tipo de procuração específico do estado</li>
              <li>• Clique em "Calcular" para ver os resultados e comparação com o DF</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="estado" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Estado (UF) *
            <span className="text-xs text-gray-500">(Selecione primeiro)</span>
          </Label>
          <Select 
            value={formData.estado} 
            onValueChange={(value) => setFormData(prev => ({ 
              ...prev, 
              estado: value, 
              municipio: '',
              tipoProcuracao: ''
            }))}
          >
            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-[#8db7ba] transition-colors">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {isLoadingEstados ? (
                <SelectItem value="loading" disabled>Carregando...</SelectItem>
              ) : (
                estados?.map((estado) => (
                  <SelectItem key={estado.id} value={estado.uf}>
                    {estado.nome} ({estado.uf})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Município */}
        <div className="space-y-2">
          <Label htmlFor="municipio" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Município *
            <span className="text-xs text-gray-500">(Apenas cadastrados)</span>
          </Label>
          <Select
            value={formData.municipio}
            onValueChange={(value) => setFormData(prev => ({ ...prev, municipio: value }))}
            disabled={!formData.estado}
          >
            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-[#8db7ba] transition-colors">
              <SelectValue placeholder={formData.estado ? "Selecione o município" : "Primeiro selecione um estado"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {isLoadingMunicipios ? (
                <SelectItem value="loading" disabled>Carregando...</SelectItem>
              ) : municipios && municipios.length > 0 ? (
                municipios.map((municipio) => (
                  <SelectItem key={municipio.nome} value={municipio.nome}>
                    {municipio.nome}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-data" disabled>
                  Nenhum município cadastrado
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Valor do Imóvel (com a nova lógica) */}
        <div className="space-y-2">
          <Label htmlFor="valorImovel" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Valor do Imóvel *
            <span className="text-xs text-gray-500">(Formato automático)</span>
          </Label>
          <Input
            id="valorImovel"
            placeholder="R$ 0,00"
            value={formData.valorImovel > 0 ? displayValue : ''}
            onChange={handleValorImovelChange}
            className="h-12 border-2 border-gray-200 hover:border-[#8db7ba] focus:border-[#8db7ba] transition-colors text-lg font-semibold"
          />
        </div>

        {/* Tipo de Procuração */}
        <div className="space-y-2">
          <Label htmlFor="tipoProcuracao" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Tipo de Procuração *
            <span className="text-xs text-gray-500">(Por estado)</span>
          </Label>
          <Select 
            value={formData.tipoProcuracao} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, tipoProcuracao: value }))}
            disabled={!formData.estado}
          >
            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-[#8db7ba] transition-colors">
              <SelectValue placeholder={formData.estado ? "Selecione o tipo" : "Primeiro selecione um estado"} />
            </SelectTrigger>
            <SelectContent>
              {isLoadingProcuracoes ? (
                <SelectItem value="loading" disabled>Carregando...</SelectItem>
              ) : (
                procuracoes?.map((procuracao) => (
                  <SelectItem key={procuracao.id} value={procuracao.descricao}>
                    {procuracao.descricao} - {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(procuracao.valor)}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};