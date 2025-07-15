
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { FormData, CalculationResult } from '@/types/database';
import { useCalculation } from '@/hooks/useCalculation';
import { useEstados } from '@/hooks/useEstados';

interface ComparisonSectionProps {
  formData: FormData;
  originalCalculation: CalculationResult;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ 
  formData, 
  originalCalculation 
}) => {
  const { data: estados } = useEstados();
  const dfEstado = estados?.find(e => e.uf === 'DF');
  
  const { data: dfCalculation } = useCalculation(
    dfEstado ? {
      estadoId: dfEstado.id,
      valorImovel: formData.valorImovel,
      tipoProcuracao: 'Procuração Básica', // Usar procuração padrão do DF
    } : null
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (!dfCalculation || formData.estado === 'DF') {
    return null;
  }

  const economia = dfCalculation.valorTotal - originalCalculation.valorTotal;
  const percentualEconomia = (economia / dfCalculation.valorTotal) * 100;
  const hasEconomia = economia > 0;

  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Comparação com Distrito Federal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Estado Selecionado */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">
              {formData.estado} (Selecionado)
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Escritura:</span>
                <span className="font-medium">{formatCurrency(originalCalculation.valorEscritura)}</span>
              </div>
              <div className="flex justify-between">
                <span>Registro:</span>
                <span className="font-medium">{formatCurrency(originalCalculation.valorRegistro)}</span>
              </div>
              <div className="flex justify-between">
                <span>ITBI:</span>
                <span className="font-medium">{formatCurrency(originalCalculation.valorITBI)}</span>
              </div>
              <div className="flex justify-between">
                <span>Procuração:</span>
                <span className="font-medium">{formatCurrency(originalCalculation.valorProcuracao)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-blue-900">
                <span>Total:</span>
                <span>{formatCurrency(originalCalculation.valorTotal)}</span>
              </div>
            </div>
          </div>

          {/* Distrito Federal */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Distrito Federal (Referência)
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Escritura:</span>
                <span className="font-medium">{formatCurrency(dfCalculation.valorEscritura)}</span>
              </div>
              <div className="flex justify-between">
                <span>Registro:</span>
                <span className="font-medium">{formatCurrency(dfCalculation.valorRegistro)}</span>
              </div>
              <div className="flex justify-between">
                <span>ITBI:</span>
                <span className="font-medium">{formatCurrency(dfCalculation.valorITBI)}</span>
              </div>
              <div className="flex justify-between">
                <span>Procuração:</span>
                <span className="font-medium">{formatCurrency(dfCalculation.valorProcuracao)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total:</span>
                <span>{formatCurrency(dfCalculation.valorTotal)}</span>
              </div>
            </div>
          </div>

          {/* Resultado da Comparação */}
          <div className={`rounded-lg p-4 ${hasEconomia ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {hasEconomia ? (
                  <TrendingDown className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-red-600" />
                )}
                <span className={`font-semibold ${hasEconomia ? 'text-green-800' : 'text-red-800'}`}>
                  {hasEconomia ? 'Economia' : 'Custo Adicional'}
                </span>
              </div>
              
              <p className={`text-2xl font-bold ${hasEconomia ? 'text-green-900' : 'text-red-900'}`}>
                {formatCurrency(Math.abs(economia))}
              </p>
              
              <Badge 
                className={`mt-2 ${
                  hasEconomia 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}
              >
                {Math.abs(percentualEconomia).toFixed(1)}%
              </Badge>
              
              <p className={`text-xs mt-2 ${hasEconomia ? 'text-green-600' : 'text-red-600'}`}>
                {hasEconomia 
                  ? `Você economiza ${Math.abs(percentualEconomia).toFixed(1)}% ao formalizar em ${formData.estado}`
                  : `Custa ${Math.abs(percentualEconomia).toFixed(1)}% a mais que no DF`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
