
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Shield, Zap, Users } from 'lucide-react';

const Sobre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre a Documentall
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sua plataforma completa para consulta de emolumentos imobiliários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Facilitar o acesso às informações sobre custos de formalização imobiliária 
                em todo o Brasil, proporcionando transparência e praticidade para 
                profissionais e cidadãos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Confiabilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dados atualizados e verificados conforme as tabelas oficiais 
                de cada estado, garantindo precisão nas consultas e cálculos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Agilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consultas instantâneas e comparações automáticas entre estados, 
                economizando tempo e fornecendo insights valiosos.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Para Quem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advogados, corretores, cartórios, empresários e qualquer pessoa 
                que precise de informações precisas sobre custos imobiliários.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
