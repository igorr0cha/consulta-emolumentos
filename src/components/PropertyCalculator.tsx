
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comparativo Imobiliário Brasil
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consulte e compare valores de formalização imobiliária entre diferentes estados brasileiros
          </p>
        </div>

        {/* Formulário */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calculator className="w-6 h-6" />
              Consulta de Valores
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <FormSection formData={formData} setFormData={setFormData} />
            <div className="mt-6">
              <Button 
                onClick={handleCalculate} 
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!formData.estado || !formData.valorImovel || !formData.tipoProcuracao || isCalculating}
              >
                {isCalculating ? 'Calculando...' : 'Calcular Valores'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        {showResults && calculation && (
          <>
            <ResultsSection 
              formData={formData} 
              calculation={calculation} 
            />
            <ComparisonSection 
              formData={formData} 
              originalCalculation={calculation}
            />
          </>
        )}
      </div>
    </div>
  );
};
