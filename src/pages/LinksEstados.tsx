
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe, FileText, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const linksEstados = [
  { 
    estado: 'Acre', 
    uf: 'AC', 
    urlEscritura: 'https://www.ac.gov.br/escritura', 
    urlRegistro: 'https://www.ac.gov.br/registro' 
  },
  { 
    estado: 'Alagoas', 
    uf: 'AL', 
    urlEscritura: 'https://www.al.gov.br/escritura', 
    urlRegistro: 'https://www.al.gov.br/registro' 
  },
  { 
    estado: 'Amapá', 
    uf: 'AP', 
    urlEscritura: 'https://www.ap.gov.br/escritura', 
    urlRegistro: 'https://www.ap.gov.br/registro' 
  },
  { 
    estado: 'Amazonas', 
    uf: 'AM', 
    urlEscritura: 'https://www.am.gov.br/escritura', 
    urlRegistro: 'https://www.am.gov.br/registro' 
  },
  { 
    estado: 'Bahia', 
    uf: 'BA', 
    urlEscritura: 'https://www.ba.gov.br/escritura', 
    urlRegistro: 'https://www.ba.gov.br/registro' 
  },
  { 
    estado: 'Ceará', 
    uf: 'CE', 
    urlEscritura: 'https://www.ce.gov.br/escritura', 
    urlRegistro: 'https://www.ce.gov.br/registro' 
  },
  { 
    estado: 'Distrito Federal', 
    uf: 'DF', 
    urlEscritura: 'https://www.df.gov.br/escritura', 
    urlRegistro: 'https://www.df.gov.br/registro' 
  },
  { 
    estado: 'Espírito Santo', 
    uf: 'ES', 
    urlEscritura: 'https://www.es.gov.br/escritura', 
    urlRegistro: 'https://www.es.gov.br/registro' 
  },
  { 
    estado: 'Goiás', 
    uf: 'GO', 
    urlEscritura: 'https://www.go.gov.br/escritura', 
    urlRegistro: 'https://www.go.gov.br/registro' 
  },
  { 
    estado: 'Maranhão', 
    uf: 'MA', 
    urlEscritura: 'https://www.ma.gov.br/escritura', 
    urlRegistro: 'https://www.ma.gov.br/registro' 
  },
  { 
    estado: 'Mato Grosso', 
    uf: 'MT', 
    urlEscritura: 'https://www.mt.gov.br/escritura', 
    urlRegistro: 'https://www.mt.gov.br/registro' 
  },
  { 
    estado: 'Mato Grosso do Sul', 
    uf: 'MS', 
    urlEscritura: 'https://www.ms.gov.br/escritura', 
    urlRegistro: 'https://www.ms.gov.br/registro' 
  },
  { 
    estado: 'Minas Gerais', 
    uf: 'MG', 
    urlEscritura: 'https://www.mg.gov.br/escritura', 
    urlRegistro: 'https://www.mg.gov.br/registro' 
  },
  { 
    estado: 'Pará', 
    uf: 'PA', 
    urlEscritura: 'https://www.pa.gov.br/escritura', 
    urlRegistro: 'https://www.pa.gov.br/registro' 
  },
  { 
    estado: 'Paraíba', 
    uf: 'PB', 
    urlEscritura: 'https://www.pb.gov.br/escritura', 
    urlRegistro: 'https://www.pb.gov.br/registro' 
  },
  { 
    estado: 'Paraná', 
    uf: 'PR', 
    urlEscritura: 'https://www.pr.gov.br/escritura', 
    urlRegistro: 'https://www.pr.gov.br/registro' 
  },
  { 
    estado: 'Pernambuco', 
    uf: 'PE', 
    urlEscritura: 'https://www.pe.gov.br/escritura', 
    urlRegistro: 'https://www.pe.gov.br/registro' 
  },
  { 
    estado: 'Piauí', 
    uf: 'PI', 
    urlEscritura: 'https://www.pi.gov.br/escritura', 
    urlRegistro: 'https://www.pi.gov.br/registro' 
  },
  { 
    estado: 'Rio de Janeiro', 
    uf: 'RJ', 
    urlEscritura: 'https://www.rj.gov.br/escritura', 
    urlRegistro: 'https://www.rj.gov.br/registro' 
  },
  { 
    estado: 'Rio Grande do Norte', 
    uf: 'RN', 
    urlEscritura: 'https://www.rn.gov.br/escritura', 
    urlRegistro: 'https://www.rn.gov.br/registro' 
  },
  { 
    estado: 'Rio Grande do Sul', 
    uf: 'RS', 
    urlEscritura: 'https://www.rs.gov.br/escritura', 
    urlRegistro: 'https://www.rs.gov.br/registro' 
  },
  { 
    estado: 'Rondônia', 
    uf: 'RO', 
    urlEscritura: 'https://www.ro.gov.br/escritura', 
    urlRegistro: 'https://www.ro.gov.br/registro' 
  },
  { 
    estado: 'Roraima', 
    uf: 'RR', 
    urlEscritura: 'https://www.rr.gov.br/escritura', 
    urlRegistro: 'https://www.rr.gov.br/registro' 
  },
  { 
    estado: 'Santa Catarina', 
    uf: 'SC', 
    urlEscritura: 'https://www.sc.gov.br/escritura', 
    urlRegistro: 'https://www.sc.gov.br/registro' 
  },
  { 
    estado: 'São Paulo', 
    uf: 'SP', 
    urlEscritura: 'https://www.sp.gov.br/escritura', 
    urlRegistro: 'https://www.sp.gov.br/registro' 
  },
  { 
    estado: 'Sergipe', 
    uf: 'SE', 
    urlEscritura: 'https://www.se.gov.br/escritura', 
    urlRegistro: 'https://www.se.gov.br/registro' 
  },
  { 
    estado: 'Tocantins', 
    uf: 'TO', 
    urlEscritura: 'https://www.to.gov.br/escritura', 
    urlRegistro: 'https://www.to.gov.br/registro' 
  },
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
            Acesse os portais oficiais de escritura e registro de todos os estados brasileiros
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader style={{ backgroundColor: '#00489a' }} className="text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Globe className="w-6 h-6" />
              Portais Governamentais - Escritura e Registro
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linksEstados.map((item) => (
                <Card key={item.uf} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">{item.estado}</h3>
                        <p className="text-sm text-gray-500">{item.uf}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          onClick={() => window.open(item.urlEscritura, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 w-full flex items-center gap-2"
                        >
                          <PenTool className="w-4 h-4" />
                          <span>Escritura</span>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(item.urlRegistro, '_blank')}
                          className="bg-green-600 hover:bg-green-700 w-full flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Registro</span>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
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
