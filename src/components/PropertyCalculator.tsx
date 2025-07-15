
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Sparkles, TrendingUp } from 'lucide-react';
import { FormSection } from './FormSection';
import { ResultsSection } from './ResultsSection';
import { ComparisonSection } from './ComparisonSection';
import { FormData } from '@/types/database';
import { useCalculation } from '@/hooks/useCalculation';
import { useEstados } from '@/hooks/useEstados';

export const PropertyCalculator = () => {
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
    });
    setShowResults(true);
  };

  const isFormValid = formData.estado && formData.municipio && formData.valorImovel && formData.tipoProcuracao;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header Melhorado */}
        <div className="text-center py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              CONSULTA EMOLUMENTOS
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Plataforma completa para consulta e comparação de valores de formalização imobiliária 
              entre todos os estados brasileiros. Compare custos, economize tempo e tome decisões informadas.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Dados Atualizados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Comparação Automática</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário Redesenhado */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardTitle className="flex items-center gap-3 text-2xl relative z-10">
              <Calculator className="w-7 h-7" />
              Consulta de Valores
            </CardTitle>
            <p className="text-blue-100 relative z-10">
              Preencha os dados abaixo para calcular os emolumentos
            </p>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <FormSection formData={formData} setFormData={setFormData} />
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button 
                onClick={handleCalculate} 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                disabled={!isFormValid || isCalculating}
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Calcular Emolumentos
                  </div>
                )}
              </Button>
              
              {!isFormValid && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Preencha todos os campos obrigatórios para continuar
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        {showResults && calculation && (
          <div className="space-y-8 animate-in fade-in duration-500">
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
