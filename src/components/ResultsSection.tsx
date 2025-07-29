
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Receipt, Building, Scale } from 'lucide-react';
import { FormData, CalculationResult } from '@/types/database';

interface ResultsSectionProps {
  formData: FormData;
  calculation: CalculationResult;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ formData, calculation }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resumo da Consulta */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg text-gray-800">Resumo da Consulta</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Estado:</span>
              <p className="font-medium text-sm sm:text-base break-words">{formData.estado}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Município:</span>
              <p className="font-medium text-sm sm:text-base break-words">{formData.municipio}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="text-xs sm:text-sm text-gray-500">Valor do Imóvel:</span>
              <p className="font-medium text-sm sm:text-base">{formatCurrency(formData.valorImovel)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados Detalhados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-green-800">Registro</span>
                </div>
                <p className="text-sm sm:text-lg font-bold text-green-900 break-all">
                  {formatCurrency(calculation.valorRegistro)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-blue-800">ITBI</span>
                </div>
                <p className="text-sm sm:text-lg font-bold text-blue-900 break-all">
                  {formatCurrency(calculation.valorITBI)}
                </p>
                <p className="text-xs text-blue-600">
                  Alíquota: {formatPercentage(calculation.aliquotaITBI)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-purple-800">Procuração</span>
                </div>
                <p className="text-sm sm:text-lg font-bold text-purple-900 break-all">
                  {formatCurrency(calculation.valorProcuracao)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Receipt className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-orange-800">Escritura</span>
                </div>
                <p className="text-sm sm:text-lg font-bold text-orange-900 break-all">
                  {formatCurrency(calculation.valorEscritura)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Totais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <span className="text-xs sm:text-sm font-medium text-gray-600">Subtotal (Notas)</span>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 break-all">
                {formatCurrency(calculation.subtotal)}
              </p>
              <span className="text-xs text-gray-500">
                Escritura + Procuração
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#007581] text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <span className="text-xs sm:text-sm font-medium opacity-90">Valor Total</span>
              <p className="text-2xl sm:text-3xl font-bold break-all">
                {formatCurrency(calculation.valorTotal)}
              </p>
              <Badge className="mt-2 bg-white text-blue-600 text-xs sm:text-sm">
                Total Final
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
