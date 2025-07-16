
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

  // Comparação apenas da escritura
  const economiaEscritura = originalCalculation.valorEscritura - dfCalculation.valorEscritura;
  const percentualEconomiaEscritura = Math.abs((economiaEscritura / originalCalculation.valorEscritura) * 100);
  const dfEscrituragMaisBarata = economiaEscritura > 0; // DF tem escritura mais barata que o estado selecionado

  return (
    <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-amber-800">
          <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span className="break-words">Economia na Escritura - Comparação com DF</span>
        </CardTitle>
        <p className="text-xs sm:text-sm text-amber-700">
          Veja quanto você economizaria lavrando a escritura no Distrito Federal
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Estado Selecionado */}
          <div className={`rounded-lg p-4 sm:p-6 border ${
            dfEscrituragMaisBarata 
              ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                dfEscrituragMaisBarata ? 'bg-blue-500' : 'bg-green-500'
              }`}></div>
              <h3 className={`font-bold text-sm sm:text-base ${
                dfEscrituragMaisBarata ? 'text-blue-800' : 'text-green-800'
              }`}>
                {formData.estado} {!dfEscrituragMaisBarata && '⭐ (Mais Econômico)'}
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className={dfEscrituragMaisBarata ? 'text-blue-700' : 'text-green-700'}>Escritura:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {formatCurrency(originalCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEscrituragMaisBarata ? 'text-blue-700' : 'text-green-700'}>Registro:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {formatCurrency(originalCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEscrituragMaisBarata ? 'text-blue-700' : 'text-green-700'}>ITBI:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {formatCurrency(originalCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className={dfEscrituragMaisBarata ? 'text-blue-700' : 'text-green-700'}>Procuração:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {formatCurrency(originalCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className={`my-2 ${dfEscrituragMaisBarata ? 'border-blue-300' : 'border-green-300'}`} />
              <div className={`flex justify-between items-center py-2 rounded px-2 ${
                dfEscrituragMaisBarata ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <span className={`font-bold ${dfEscrituragMaisBarata ? 'text-blue-800' : 'text-green-800'}`}>Total:</span>
                <span className={`font-bold text-sm sm:text-base break-all ${
                  dfEscrituragMaisBarata ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {formatCurrency(originalCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Distrito Federal */}
          <div className={`rounded-lg p-4 sm:p-6 border ${
            dfEscrituragMaisBarata 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200'
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                dfEscrituragMaisBarata ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <h3 className={`font-bold text-sm sm:text-base ${
                dfEscrituragMaisBarata ? 'text-green-800' : 'text-red-800'
              }`}>
                Distrito Federal {dfEscrituragMaisBarata && '⭐ (Escritura Mais Econômica)'}
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1">
                <span className={dfEscrituragMaisBarata ? 'text-green-700' : 'text-red-700'}>Escritura:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorEscritura)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 opacity-50">
                <span className={dfEscrituragMaisBarata ? 'text-green-700' : 'text-red-700'}>Registro:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorRegistro)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 opacity-50">
                <span className={dfEscrituragMaisBarata ? 'text-green-700' : 'text-red-700'}>ITBI:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorITBI)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 opacity-50">
                <span className={dfEscrituragMaisBarata ? 'text-green-700' : 'text-red-700'}>Procuração:</span>
                <span className={`font-semibold break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorProcuracao)}
                </span>
              </div>
              <hr className={`my-2 ${dfEscrituragMaisBarata ? 'border-green-300' : 'border-red-300'}`} />
              <div className={`flex justify-between items-center py-2 rounded px-2 opacity-50 ${
                dfEscrituragMaisBarata ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`font-bold ${dfEscrituragMaisBarata ? 'text-green-800' : 'text-red-800'}`}>Total:</span>
                <span className={`font-bold text-sm sm:text-base break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-red-900'
                }`}>
                  {formatCurrency(dfCalculation.valorTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Resultado da Comparação - Foco na Escritura */}
          <div className={`rounded-lg p-4 sm:p-6 border-2 ${
            dfEscrituragMaisBarata 
              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300' 
              : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
          }`}>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                {dfEscrituragMaisBarata ? (
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                )}
                <span className={`font-bold text-sm sm:text-base ${
                  dfEscrituragMaisBarata ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {dfEscrituragMaisBarata ? '🏆 Escritura no DF!' : '💰 Economia no Estado'}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className={`text-2xl sm:text-3xl font-bold break-all ${
                  dfEscrituragMaisBarata ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {formatCurrency(Math.abs(economiaEscritura))}
                </p>
                
                <Badge 
                  className={`text-xs sm:text-sm px-3 py-1 ${
                    dfEscrituragMaisBarata 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}
                >
                  {percentualEconomiaEscritura.toFixed(1)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className={`text-xs sm:text-sm font-medium ${
                  dfEscrituragMaisBarata ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {dfEscrituragMaisBarata 
                    ? `✅ Faça a escritura no DF e economize ${formatCurrency(Math.abs(economiaEscritura))}!`
                    : `✅ A escritura em ${formData.estado} é ${percentualEconomiaEscritura.toFixed(1)}% mais barata que no DF!`
                  }
                </p>
                
                <p className={`text-xs text-center leading-relaxed ${
                  dfEscrituragMaisBarata ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {dfEscrituragMaisBarata 
                    ? `💡 Considerando lavrar a escritura no Distrito Federal? Você economizaria ${percentualEconomiaEscritura.toFixed(1)}% no valor da escritura comparado a ${formData.estado}.`
                    : `Confirmada sua escolha! A escritura em ${formData.estado} é mais vantajosa que no DF em ${percentualEconomiaEscritura.toFixed(1)}%.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Visual - Foco na Escritura */}
        <div className={`mt-6 p-4 rounded-lg border ${
          dfEscrituragMaisBarata 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="text-center">
            <h4 className={`font-semibold mb-2 text-sm sm:text-base ${
              dfEscrituragMaisBarata ? 'text-green-800' : 'text-blue-800'
            }`}>
              {dfEscrituragMaisBarata ? '🎯 Nossa Recomendação para Escritura' : '📊 Análise da Escritura'}
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              dfEscrituragMaisBarata ? 'text-green-700' : 'text-blue-700'
            }`}>
              {dfEscrituragMaisBarata 
                ? `💰 Para seu imóvel de ${formatCurrency(formData.valorImovel)}, recomendamos lavrar a escritura no Distrito Federal. Você economizará ${formatCurrency(Math.abs(economiaEscritura))} (${percentualEconomiaEscritura.toFixed(1)}% menos) no valor da escritura em relação a ${formData.estado}. O DF oferece tarifas de escritura mais competitivas!`
                : `✅ Ótima escolha para a escritura! Para seu imóvel de ${formatCurrency(formData.valorImovel)}, ${formData.estado} oferece uma economia real de ${formatCurrency(Math.abs(economiaEscritura))} no valor da escritura em relação ao Distrito Federal. Isso representa ${percentualEconomiaEscritura.toFixed(1)}% a menos do que você pagaria no DF. Sua decisão está financeiramente correta para a escritura!`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
