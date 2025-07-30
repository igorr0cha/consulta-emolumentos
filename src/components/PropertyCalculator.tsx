
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Sparkles, TrendingUp } from 'lucide-react';
import { FormSection } from './FormSection';
import { ResultsSection } from './ResultsSection';
import { ComparisonSection } from './ComparisonSection';
import { FormData } from '@/types/database';
import { useCalculation } from '@/hooks/useCalculation';
import { useEstados } from '@/hooks/useEstados';

interface PropertyCalculatorProps {
  onValorImovelChange?: (valor: number) => void;
}

export const PropertyCalculator = ({ onValorImovelChange }: PropertyCalculatorProps) => {
  const [formData, setFormData] = useState<FormData>({
    estado: '',
    municipio: '',
    valorImovel: 0,
    tipoProcuracao: '',
  });
  const [calculationParams, setCalculationParams] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const { data: estados } = useEstados();
  const { data: calculation, isLoading: isCalculating } = useCalculation(calculationParams);

  // Notificar mudanças no valor do imóvel
  useEffect(() => {
    if (onValorImovelChange && formData.valorImovel > 0) {
      onValorImovelChange(formData.valorImovel);
    }
  }, [formData.valorImovel, onValorImovelChange]);

  const handleCalculate = () => {
    if (!formData.estado || !formData.valorImovel || !formData.tipoProcuracao) {
      return;
    }

    const estadoSelecionado = estados?.find(e => e.uf === formData.estado);
    if (!estadoSelecionado) return;

    setCalculationParams({
      estadoId: estadoSelecionado.id,
      valorImovel: formData.valorImovel,
      tipoProcuracao: formData.tipoProcuracao,
      municipio: formData.municipio,
    });
    setShowResults(true);

    // Notificar sobre a consulta realizada
    if (onValorImovelChange) {
      onValorImovelChange(formData.valorImovel);
    }
  };

  const isFormValid = formData.estado && formData.municipio && formData.valorImovel && formData.tipoProcuracao;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header Melhorado */}
        <div className="text-center py-6 sm:py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl sm:rounded-3xl"></div>
          <div className="relative">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-[#007581] to-[#009bb0] p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <Calculator className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 leading-tight">
              CONSULTA EMOLUMENTOS
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Plataforma completa para consulta e comparação de valores de formalização imobiliária 
              entre todos os estados brasileiros. Compare custos, economize tempo e tome decisões informadas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4">
              <div className="flex items-center gap-2 bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-[#00535c] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Dados Atualizados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <TrendingUp className="w-4 h-4 text-[#007581] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Comparação Automática</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário Redesenhado */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#007581] to-[#009bb0] text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl relative z-10">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" />
              <span className="break-words">Consulta de Valores</span>
            </CardTitle>
            <p className="text-blue-100 relative z-10 text-sm sm:text-base">
              Preencha os dados abaixo para calcular os emolumentos
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8 bg-white">
            <FormSection formData={formData} setFormData={setFormData} />
            
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <Button 
                onClick={handleCalculate} 
                className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg font-semibold bg-[#007581] hover:bg-[#006971] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={!isFormValid || isCalculating}
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Calculando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Calcular Emolumentos</span>
                  </div>
                )}
              </Button>
              
              {/* Frase de estimativa */}
              <div className="text-center mt-3 space-y-1">
                <p className="text-sm sm:text-base text-gray-700 font-bold bg-yellow-50 px-3 py-2 rounded-lg border-l-4 border-yellow-400">
                  Isso revela apenas uma estimativa
                </p>
                <p className="text-xs sm:text-sm text-gray-600 italic">
                  Os valores podem sofrer algumas alterações
                </p>
              </div>
              
              {!isFormValid && (
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
                  Preencha todos os campos obrigatórios para continuar
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        {showResults && calculation && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <ResultsSection 
              formData={formData} 
              calculation={calculation} 
            />
            <ComparisonSection 
              formData={formData} 
              originalCalculation={calculation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
