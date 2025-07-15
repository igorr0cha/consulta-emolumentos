
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/database';
import { useEstados } from '@/hooks/useEstados';
import { useProcuracoes } from '@/hooks/useProcuracoes';

interface FormSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormSection: React.FC<FormSectionProps> = ({ formData, setFormData }) => {
  const { data: estados, isLoading: isLoadingEstados } = useEstados();
  const estadoSelecionado = estados?.find(e => e.uf === formData.estado);
  const { data: procuracoes, isLoading: isLoadingProcuracoes } = useProcuracoes(estadoSelecionado?.id || null);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseInt(numericValue) / 100);
    return formattedValue;
  };

  const handleValueChange = (value: string) => {
    const numericValue = parseInt(value.replace(/\D/g, '')) / 100;
    setFormData(prev => ({ ...prev, valorImovel: numericValue }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Estado */}
      <div className="space-y-2">
        <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
          Estado (UF) *
        </Label>
        <Select 
          value={formData.estado} 
          onValueChange={(value) => setFormData(prev => ({ 
            ...prev, 
            estado: value, 
            tipoProcuracao: '' // Reset procuração quando muda estado
          }))}
        >
          <SelectTrigger className="h-11">
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
        <Label htmlFor="municipio" className="text-sm font-medium text-gray-700">
          Município *
        </Label>
        <Input
          id="municipio"
          placeholder="Digite o município"
          value={formData.municipio}
          onChange={(e) => setFormData(prev => ({ ...prev, municipio: e.target.value }))}
          className="h-11"
        />
      </div>

      {/* Valor do Imóvel */}
      <div className="space-y-2">
        <Label htmlFor="valorImovel" className="text-sm font-medium text-gray-700">
          Valor do Imóvel *
        </Label>
        <Input
          id="valorImovel"
          placeholder="R$ 0,00"
          value={formData.valorImovel > 0 ? formatCurrency((formData.valorImovel * 100).toString()) : ''}
          onChange={(e) => handleValueChange(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Tipo de Procuração */}
      <div className="space-y-2">
        <Label htmlFor="tipoProcuracao" className="text-sm font-medium text-gray-700">
          Tipo de Procuração *
        </Label>
        <Select 
          value={formData.tipoProcuracao} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, tipoProcuracao: value }))}
          disabled={!formData.estado}
        >
          <SelectTrigger className="h-11">
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
  );
};
