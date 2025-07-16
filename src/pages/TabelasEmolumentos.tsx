
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calculator, Building } from 'lucide-react';

const TabelasEmolumentos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-xl shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tabelas de Emolumentos
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Consulte as tabelas oficiais de emolumentos para escritura e registro 
            de todos os estados brasileiros
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Calculator className="w-6 h-6" />
                Valores de Escritura
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Consulte os valores de emolumentos para escrituração de imóveis 
                em todos os estados brasileiros, organizados por faixas de valor.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Informações Disponíveis:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Faixas de valor por estado</li>
                  <li>• Valores fixos e percentuais</li>
                  <li>• Tetos máximos aplicáveis</li>
                  <li>• Classificação por tipo de imóvel</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Building className="w-6 h-6" />
                Valores de Registro
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Consulte os valores de emolumentos para registro de imóveis 
                em todos os estados brasileiros, com detalhamento por faixa de valor.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Informações Disponíveis:</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Tabelas por estado</li>
                  <li>• Valores progressivos</li>
                  <li>• Limites e exceções</li>
                  <li>• Atualizações periódicas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-600 text-white">
            <CardTitle className="text-xl">
              Como Utilizar as Tabelas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Selecione o Estado</h3>
                <p className="text-sm text-gray-600">
                  Escolha o estado onde será realizada a escritura ou registro
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Informe o Valor</h3>
                <p className="text-sm text-gray-600">
                  Digite o valor do imóvel para encontrar a faixa correspondente
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Consulte o Resultado</h3>
                <p className="text-sm text-gray-600">
                  Visualize os valores calculados conforme a tabela oficial
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TabelasEmolumentos;
