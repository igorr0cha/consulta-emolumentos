
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe, FileText, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const linksEstados = [
  { 
    estado: 'Acre', 
    uf: 'AC', 
    urlEscritura: 'https://www.tjac.jus.br/wp-content/uploads/2025/01/TABELAS-DOS-EMOLUMENTOS-EXTRAJUDICIAIS-2025.pdf', 
    urlRegistro: 'https://www.tjac.jus.br/wp-content/uploads/2025/01/TABELAS-DOS-EMOLUMENTOS-EXTRAJUDICIAIS-2025.pdf' 
  },
  { 
    estado: 'Alagoas',  
    uf: 'AL', 
    urlEscritura: 'https://cgj.tjal.jus.br/emolumentos/bf9d27ed2925aba59691c53091050b71.pdf', 
    urlRegistro: 'https://cgj.tjal.jus.br/emolumentos/c451ddcdc46d27db878c52d0a10adb83.pdf' 
  },
  { 
    estado: 'Amapá', 
    uf: 'AP', 
    urlEscritura: 'https://cartoriosdopara.com.br/wp-content/uploads/2024/12/Tabela-2025-G4-2-por-cento-Liquido.pdf', 
    urlRegistro: 'https://cartoriosdopara.com.br/wp-content/uploads/2024/12/Tabela-2025-G4-2-por-cento-Liquido.pdf' 
  },
  { 
    estado: 'Amazonas', 
    uf: 'AM', 
    urlEscritura: 'https://www.tjam.jus.br/index.php/ext-emolumentos/emolumentos-capital/44560-tabela-de-emolumentos-2023-provimento-n-447-2023-cgj-am/file', 
    urlRegistro: 'https://www.tjam.jus.br/index.php/ext-emolumentos/emolumentos-capital/44560-tabela-de-emolumentos-2023-provimento-n-447-2023-cgj-am/file' 
  },
  { 
    estado: 'Bahia', 
    uf: 'BA', 
    urlEscritura: 'https://www.tjba.jus.br/tabeladecustas/tabela_custa.pdf', 
    urlRegistro: 'https://www.tjba.jus.br/tabeladecustas/tabela_custa.pdf' 
  },
  { 
    estado: 'Ceará', 
    uf: 'CE', 
    urlEscritura: 'https://www.protestodetitulos.org.br/arquivos/tabelas/emolumentos/CE.pdf', 
    urlRegistro: 'https://www.protestodetitulos.org.br/arquivos/tabelas/emolumentos/CE.pdf' 
  },
  { 
    estado: 'Distrito Federal', 
    uf: 'DF', 
    urlEscritura: 'https://anoregdf.org.br/wp-content/uploads/2025/01/Tabela-de-Emolumentos_2025_com-ISSQN_Anoreg_DF_versão-para-conferência.pdf', 
    urlRegistro: 'https://anoregdf.org.br/wp-content/uploads/2025/01/Tabela-de-Emolumentos_2025_com-ISSQN_Anoreg_DF_versão-para-conferência.pdf' 
  },
  { 
    estado: 'Espírito Santo', 
    uf: 'ES', 
    urlEscritura: 'https://www.sinoreg-es.org.br/?pG=X19leGliZV9ub3RpY2lhcw==&in=OTYyMA==&filtro=#title_noticia', 
    urlRegistro: 'https://www.sinoreg-es.org.br/?pG=X19leGliZV9ub3RpY2lhcw==&in=OTYyMA==&filtro=#title_noticia' 
  },
  { 
    estado: 'Goiás', 
    uf: 'GO', 
    urlEscritura: 'https://cnbgo.org.br/tabela-de-emolumentos/',
    urlRegistro: 'https://1rigo.com/emolumentos/2025.pdf' 
  },
  { 
    estado: 'Maranhão', 
    uf: 'MA', 
    urlEscritura: 'https://cartoriosmaranhao.com.br/tabela-emolumentos', 
    urlRegistro: 'https://cartoriosmaranhao.com.br/tabela-emolumentos' 
  },
  { 
    estado: 'Mato Grosso', 
    uf: 'MT', 
    urlEscritura: 'https://tabelionatobianchin.com.br/tabela-de-emolumentos/', 
    urlRegistro: 'https://tabelionatobianchin.com.br/tabela-de-emolumentos/' 
  },
  { 
    estado: 'Mato Grosso do Sul', 
    uf: 'MS', 
    urlEscritura: 'https://www.cnbms.org.br/tabela-de-emolumentos/', 
    urlRegistro: 'https://portal.digitalcartorios.com.br/uploads/RSAHSERVWH050/img-ced4ab37-6164-4ff0-baf8-759ff92708290.pdf'
  },
  { 
    estado: 'Minas Gerais', 
    uf: 'MG', 
    urlEscritura: 'https://www.tjmg.jus.br/data/files/A3/E3/67/01/C30E3910A67BFD399F28CCA8/Tabela%20de%20Emolumentos%202025.pdf', 
    urlRegistro: 'https://www.tjmg.jus.br/data/files/A3/E3/67/01/C30E3910A67BFD399F28CCA8/Tabela%20de%20Emolumentos%202025.pdf' 
  },
  { 
    estado: 'Pará', 
    uf: 'PA', 
    urlEscritura: 'https://cartoriosdopara.com.br/wp-content/uploads/2024/12/Tabela-2025-G7-3-por-cento-Liquido.pdf', 
    urlRegistro: 'https://cartoriosdopara.com.br/wp-content/uploads/2024/12/Tabela-2025-G7-3-por-cento-Liquido.pdf' 
  },
  { 
    estado: 'Paraíba', 
    uf: 'PB', 
    urlEscritura: 'https://anoregpb.org.br/wp-content/uploads/2025/01/TABELA-EMOLUMENTOS-2025.pdf', 
    urlRegistro: 'https://anoregpb.org.br/wp-content/uploads/2025/01/TABELA-EMOLUMENTOS-2025.pdf' 
  },
  { 
    estado: 'Paraná', 
    uf: 'PR', 
    urlEscritura: 'https://www.1tabelionato.not.br/tabela-de-emolumentos', 
    urlRegistro: 'https://www.1tabelionato.not.br/tabela-de-emolumentos' 
  },
  { 
    estado: 'Pernambuco', 
    uf: 'PE', 
    urlEscritura: 'https://portal.tjpe.jus.br/documents/d/portal/tabela-de-emolumentos-2025', 
    urlRegistro: 'https://portal.tjpe.jus.br/documents/d/portal/tabela-de-emolumentos-2025' 
  },
  { 
    estado: 'Piauí', 
    uf: 'PI', 
    urlEscritura: 'https://www.tjpi.jus.br/cobjud/modules/cobjud/TabelasDeCobrancas.fpg', 
    urlRegistro: 'https://www.tjpi.jus.br/cobjud/modules/cobjud/TabelasDeCobrancas.fpg' 
  },
  { 
    estado: 'Rio de Janeiro', 
    uf: 'RJ', 
    urlEscritura: 'https://www.cartoriomeriti.com.br/wp-content/uploads/2025/01/Portaria-2838-2024.pdf', 
    urlRegistro: 'https://www.cartoriomeriti.com.br/wp-content/uploads/2025/01/Portaria-2838-2024.pdf' 
  },
  { 
    estado: 'Rio Grande do Norte', 
    uf: 'RN', 
    urlEscritura: 'https://anoregrn.org.br/_private/upload/conteudo_arquivos/2/Tabela-de-Custas-2025-1-0-FRMP-SEM-ISS.pdf', 
    urlRegistro: 'https://anoregrn.org.br/_private/upload/conteudo_arquivos/2/Tabela-de-Custas-2025-1-0-FRMP-SEM-ISS.pdf' 
  },
  { 
    estado: 'Rio Grande do Sul', 
    uf: 'RS', 
    urlEscritura: 'https://colegioregistralrs.org.br/tabela-emolumentos', 
    urlRegistro: 'https://colegioregistralrs.org.br/tabela-emolumentos' 
  },
  { 
    estado: 'Rondônia', 
    uf: 'RO', 
    urlEscritura: 'https://www.anoreg.org.br/site/wp-content/uploads/2025/02/tabela_de_custas_2025.pdf', 
    urlRegistro: 'https://www.anoreg.org.br/site/wp-content/uploads/2025/02/tabela_de_custas_2025.pdf' 
  },
  { 
    estado: 'Roraima', 
    uf: 'RR', 
    urlEscritura: 'https://www.irib.org.br/files/emolumento/Emolumentos-de-Roraima-2024.pdf', //TODO: PEGA LINK DO ANO CORRETO!
    urlRegistro: 'https://www.irib.org.br/files/emolumento/Emolumentos-de-Roraima-2024.pdf' 
  },
  { 
    estado: 'Santa Catarina', 
    uf: 'SC', 
    urlEscritura: 'https://www.margarida.not.br/assets/pdf/tabela-de-emolumentos.pdf', 
    urlRegistro: 'https://1ori.com.br/tabela/' 
  },
  { 
    estado: 'São Paulo', 
    uf: 'SP', 
    urlEscritura: 'https://cnbsp.org.br/tabelas-de-custas-e-emolumentos-padrao/#1618854980325-ac7d5176-a6c3', 
    urlRegistro: 'https://www.13registro.com.br/tabela-de-custas' 
  },
  { 
    estado: 'Sergipe', 
    uf: 'SE', 
    urlEscritura: 'https://www.tjse.jus.br/tjnet/publicacoes/visualizar_publicacao.wsp?tmp.idPublicacao=86129', 
    urlRegistro: 'https://www.tjse.jus.br/tjnet/publicacoes/visualizar_publicacao.wsp?tmp.idPublicacao=86129' 
  },
  { 
    estado: 'Tocantins', 
    uf: 'TO', 
    urlEscritura: 'https://wwa.tjto.jus.br/diario/pesquisa/materia/870849', 
    urlRegistro: 'https://wwa.tjto.jus.br/diario/pesquisa/materia/870849' 
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
          <p className="text-xl text-black-600 max-w-3xl mx-auto">
              Valores atualizados para <b>2025</b>
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-[#007581] to-[#009bb0] text-white">
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
                          className="bg-[#00535c] hover:bg-[#004248] w-full flex items-center gap-2"
                        >
                          <PenTool className="w-4 h-4" />
                          <span>Escritura</span>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(item.urlRegistro, '_blank')}
                          className="bg-[#a9ced4] hover:bg-[#8ab5ba] text-[#00454d] w-full flex items-center gap-2"
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
