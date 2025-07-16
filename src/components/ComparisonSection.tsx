
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
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
      tipoProcuracao: 'Procuração Básica',
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
    <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-amber-800">
          <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span className="break-words">Economia em Relação ao DF</span>
        </CardTitle>
        <p className="text-xs sm:text-sm text-amber-700">
          Compare os custos entre {formData.estado} e o Distrito Federal para o mesmo imóvel
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Estado Selecionado */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h3 className="font-bold text-blue-800 text-sm sm:text-base">
                {formData.estado} (Consultado)
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-blue-700">Escritura:</span>
                <span className="font-semibold text-blue-900 break-all">
                  {formatCurrency(originalCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-blue-700">Registro:</span>
                <span className="font-semibold text-blue-900 break-all">
                  {formatCurrency(originalCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-blue-700">ITBI:</span>
                <span className="font-semibold text-blue-900 break-all">
                  {formatCurrency(originalCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-blue-700">Procuração:</span>
                <span className="font-semibold text-blue-900 break-all">
                  {formatCurrency(originalCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className="border-blue-300 my-2" />
              <div className="flex justify-between items-center py-2 bg-blue-100 rounded px-2">
                <span className="font-bold text-blue-800">Total:</span>
                <span className="font-bold text-blue-900 text-sm sm:text-base break-all">
                  {formatCurrency(originalCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Distrito Federal */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                Distrito Federal (Referência)
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-700">Escritura:</span>
                <span className="font-semibold text-gray-900 break-all">
                  {formatCurrency(dfCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-700">Registro:</span>
                <span className="font-semibold text-gray-900 break-all">
                  {formatCurrency(dfCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-700">ITBI:</span>
                <span className="font-semibold text-gray-900 break-all">
                  {formatCurrency(dfCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-700">Procuração:</span>
                <span className="font-semibold text-gray-900 break-all">
                  {formatCurrency(dfCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="flex justify-between items-center py-2 bg-gray-100 rounded px-2">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold text-gray-900 text-sm sm:text-base break-all">
                  {formatCurrency(dfCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Resultado da Comparação */}
          <div className={`rounded-lg p-4 sm:p-6 border-2 ${
            hasEconomia 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300' 
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
          }`}>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                {hasEconomia ? (
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                ) : (
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                )}
                <span className={`font-bold text-sm sm:text-base ${
                  hasEconomia ? 'text-green-800' : 'text-red-800'
                }`}>
                  {hasEconomia ? '💰 Economia!' : '💸 Custo Adicional'}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className={`text-2xl sm:text-3xl font-bold break-all ${
                  hasEconomia ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(Math.abs(economia))}
                </p>
                
                <Badge 
                  className={`text-xs sm:text-sm px-3 py-1 ${
                    hasEconomia 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}
                >
                  {Math.abs(percentualEconomia).toFixed(1)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className={`text-xs sm:text-sm font-medium ${
                  hasEconomia ? 'text-green-700' : 'text-red-700'
                }`}>
                  {hasEconomia 
                    ? `✅ Você economiza fazendo em ${formData.estado}!`
                    : `⚠️ Custa mais que no DF`
                  }
                </p>
                
                <p className={`text-xs text-center leading-relaxed ${
                  hasEconomia ? 'text-green-600' : 'text-red-600'
                }`}>
                  {hasEconomia 
                    ? `Diferença de ${Math.abs(percentualEconomia).toFixed(1)}% a menos ao formalizar em ${formData.estado} em comparação com o Distrito Federal.`
                    : `Diferença de ${Math.abs(percentualEconomia).toFixed(1)}% a mais ao formalizar em ${formData.estado} em comparação com o Distrito Federal.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Visual */}
        <div className="mt-6 p-4 bg-white/70 rounded-lg border border-amber-200">
          <div className="text-center">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">
              💡 Resumo da Comparação
            </h4>
            <p className="text-xs sm:text-sm text-amber-700 leading-relaxed">
              {hasEconomia 
                ? `Ao escolher formalizar seu imóvel de ${formatCurrency(formData.valorImovel)} em ${formData.estado}, você economizará ${formatCurrency(Math.abs(economia))} em relação aos custos do Distrito Federal. Esta economia representa ${Math.abs(percentualEconomia).toFixed(1)}% do valor total que seria pago no DF.`
                : `Formalizar seu imóvel de ${formatCurrency(formData.valorImovel)} em ${formData.estado} custará ${formatCurrency(Math.abs(economia))} a mais em relação aos custos do Distrito Federal. Este valor adicional representa ${Math.abs(percentualEconomia).toFixed(1)}% a mais do que seria pago no DF.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
