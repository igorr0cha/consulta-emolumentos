
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const linksEstados = [
  { estado: 'Acre', uf: 'AC', url: 'https://www.ac.gov.br' },
  { estado: 'Alagoas', uf: 'AL', url: 'https://www.al.gov.br' },
  { estado: 'Amapá', uf: 'AP', url: 'https://www.ap.gov.br' },
  { estado: 'Amazonas', uf: 'AM', url: 'https://www.am.gov.br' },
  { estado: 'Bahia', uf: 'BA', url: 'https://www.ba.gov.br' },
  { estado: 'Ceará', uf: 'CE', url: 'https://www.ce.gov.br' },
  { estado: 'Distrito Federal', uf: 'DF', url: 'https://www.df.gov.br' },
  { estado: 'Espírito Santo', uf: 'ES', url: 'https://www.es.gov.br' },
  { estado: 'Goiás', uf: 'GO', url: 'https://www.go.gov.br' },
  { estado: 'Maranhão', uf: 'MA', url: 'https://www.ma.gov.br' },
  { estado: 'Mato Grosso', uf: 'MT', url: 'https://www.mt.gov.br' },
  { estado: 'Mato Grosso do Sul', uf: 'MS', url: 'https://www.ms.gov.br' },
  { estado: 'Minas Gerais', uf: 'MG', url: 'https://www.mg.gov.br' },
  { estado: 'Pará', uf: 'PA', url: 'https://www.pa.gov.br' },
  { estado: 'Paraíba', uf: 'PB', url: 'https://www.pb.gov.br' },
  { estado: 'Paraná', uf: 'PR', url: 'https://www.pr.gov.br' },
  { estado: 'Pernambuco', uf: 'PE', url: 'https://www.pe.gov.br' },
  { estado: 'Piauí', uf: 'PI', url: 'https://www.pi.gov.br' },
  { estado: 'Rio de Janeiro', uf: 'RJ', url: 'https://www.rj.gov.br' },
  { estado: 'Rio Grande do Norte', uf: 'RN', url: 'https://www.rn.gov.br' },
  { estado: 'Rio Grande do Sul', uf: 'RS', url: 'https://www.rs.gov.br' },
  { estado: 'Rondônia', uf: 'RO', url: 'https://www.ro.gov.br' },
  { estado: 'Roraima', uf: 'RR', url: 'https://www.rr.gov.br' },
  { estado: 'Santa Catarina', uf: 'SC', url: 'https://www.sc.gov.br' },
  { estado: 'São Paulo', uf: 'SP', url: 'https://www.sp.gov.br' },
  { estado: 'Sergipe', uf: 'SE', url: 'https://www.se.gov.br' },
  { estado: 'Tocantins', uf: 'TO', url: 'https://www.to.gov.br' },
];

const LinksEstados = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Links Oficiais dos Estados
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acesse os portais oficiais de todos os estados brasileiros
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Globe className="w-6 h-6" />
              Portais Governamentais
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linksEstados.map((item) => (
                <Card key={item.uf} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.estado}</h3>
                        <p className="text-sm text-gray-500">{item.uf}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => window.open(item.url, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinksEstados;
