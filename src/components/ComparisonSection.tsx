
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, AlertTriangle, MapPin, Star } from 'lucide-react';
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
  const dfEhMaisBarato = economia > 0; // DF é mais caro que o estado selecionado

  return (
    <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-amber-800">
          <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span className="break-words">Comparação com o Distrito Federal</span>
        </CardTitle>
        <p className="text-xs sm:text-sm text-amber-700">
          Veja como ficaria o custo do mesmo imóvel no Distrito Federal
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Estado Selecionado */}
          <div className={`rounded-lg p-4 sm:p-6 border ${
            dfEhMaisBarato 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                dfEhMaisBarato ? 'bg-green-500' : 'bg-blue-500'
              }`}></div>
              <h3 className={`font-bold text-sm sm:text-base ${
                dfEhMaisBarato ? 'text-green-800' : 'text-blue-800'
              }`}>
                {formData.estado} {dfEhMaisBarato && '⭐ (Mais Econômico)'}
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className={dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'}>Escritura:</span>
                <span className={`font-semibold break-all ${
                  dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(originalCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'}>Registro:</span>
                <span className={`font-semibold break-all ${
                  dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(originalCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'}>ITBI:</span>
                <span className={`font-semibold break-all ${
                  dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(originalCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'}>Procuração:</span>
                <span className={`font-semibold break-all ${
                  dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(originalCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className={`my-2 ${dfEhMaisBarato ? 'border-green-300' : 'border-blue-300'}`} />
              <div className={`flex justify-between items-center py-2 rounded px-2 ${
                dfEhMaisBarato ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <span className={`font-bold ${dfEhMaisBarato ? 'text-green-800' : 'text-blue-800'}`}>Total:</span>
                <span className={`font-bold text-sm sm:text-base break-all ${
                  dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(originalCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Distrito Federal */}
          <div className={`rounded-lg p-4 sm:p-6 border ${
            !dfEhMaisBarato 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                !dfEhMaisBarato ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <h3 className={`font-bold text-sm sm:text-base ${
                !dfEhMaisBarato ? 'text-green-800' : 'text-red-800'
              }`}>
                Distrito Federal {!dfEhMaisBarato && '⭐ (Mais Econômico)'}
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className={!dfEhMaisBarato ? 'text-green-700' : 'text-red-700'}>Escritura:</span>
                <span className={`font-semibold break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={!dfEhMaisBarato ? 'text-green-700' : 'text-red-700'}>Registro:</span>
                <span className={`font-semibold break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={!dfEhMaisBarato ? 'text-green-700' : 'text-red-700'}>ITBI:</span>
                <span className={`font-semibold break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={!dfEhMaisBarato ? 'text-green-700' : 'text-red-700'}>Procuração:</span>
                <span className={`font-semibold break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className={`my-2 ${!dfEhMaisBarato ? 'border-green-300' : 'border-red-300'}`} />
              <div className={`flex justify-between items-center py-2 rounded px-2 ${
                !dfEhMaisBarato ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`font-bold ${!dfEhMaisBarato ? 'text-green-800' : 'text-red-800'}`}>Total:</span>
                <span className={`font-bold text-sm sm:text-base break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Resultado da Comparação */}
          <div className={`rounded-lg p-4 sm:p-6 border-2 ${
            !dfEhMaisBarato 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
          }`}>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                {!dfEhMaisBarato ? (
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                )}
                <span className={`font-bold text-sm sm:text-base ${
                  !dfEhMaisBarato ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {!dfEhMaisBarato ? '🏆 Recomendação: DF!' : '💰 Economia no Estado'}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className={`text-2xl sm:text-3xl font-bold break-all ${
                  !dfEhMaisBarato ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(Math.abs(economia))}
                </p>
                
                <Badge 
                  className={`text-xs sm:text-sm px-3 py-1 ${
                    !dfEhMaisBarato 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}
                >
                  {Math.abs(percentualEconomia).toFixed(1)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className={`text-xs sm:text-sm font-medium ${
                  !dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {!dfEhMaisBarato 
                    ? `✅ Faça no DF e economize ${formatCurrency(Math.abs(economia))}!`
                    : `✅ ${formData.estado} é ${Math.abs(percentualEconomia).toFixed(1)}% mais barato!`
                  }
                </p>
                
                <p className={`text-xs text-center leading-relaxed ${
                  !dfEhMaisBarato ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {!dfEhMaisBarato 
                    ? `💡 Considerando realizar a escritura no Distrito Federal? Você economizaria ${Math.abs(percentualEconomia).toFixed(1)}% comparado a ${formData.estado}.`
                    : `Confirma sua escolha! Realizar em ${formData.estado} é mais vantajoso que no DF em ${Math.abs(percentualEconomia).toFixed(1)}%.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Visual */}
        <div className={`mt-6 p-4 rounded-lg border ${
          !dfEhMaisBarato 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="text-center">
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${
              !dfEhMaisBarato ? 'text-green-800' : 'text-blue-800'
            }`}>
              {!dfEhMaisBarato ? '🎯 Nossa Recomendação' : '📊 Análise Comparativa'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              !dfEhMaisBarato ? 'text-green-700' : 'text-blue-700'
            }`}>
              {!dfEhMaisBarato 
                ? `💰 Considerando seu imóvel de ${formatCurrency(formData.valorImovel)}, recomendamos realizar a escritura e registro no Distrito Federal. Você economizará ${formatCurrency(Math.abs(economia))} (${Math.abs(percentualEconomia).toFixed(1)}% menos) em relação aos custos de ${formData.estado}. O DF oferece tarifas mais competitivas para seu perfil de imóvel!`
                : `✅ Ótima escolha! Para seu imóvel de ${formatCurrency(formData.valorImovel)}, ${formData.estado} oferece uma economia real de ${formatCurrency(Math.abs(economia))} em relação ao Distrito Federal. Isso representa ${Math.abs(percentualEconomia).toFixed(1)}% a menos do que você pagaria no DF. Sua decisão está financeiramente correta!`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
