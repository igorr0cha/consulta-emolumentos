
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface RankingsSectionProps {
  valorImovel?: number;
}

export const RankingsSection = ({ valorImovel = 500000 }: RankingsSectionProps) => {
  const { data: rankingEscritura } = useQuery({
    queryKey: ['ranking-escritura', valorImovel],
    queryFn: async () => {
      const { data: estados } = await supabase.from('estados').select('*');
      const rankings = [];

      for (const estado of estados || []) {
        const { data: escrituraData } = await supabase
          .from('valores_escritura')
          .select('*')
          .eq('estado_id', estado.id)
          .lte('faixa_min', valorImovel)
          .or(`faixa_max.is.null,faixa_max.gte.${valorImovel}`)
          .limit(1)
          .single();

        if (escrituraData) {
          let valor = 0;
          if (escrituraData.valor_fixo) {
            valor = escrituraData.valor_fixo;
          } else if (escrituraData.percentual) {
            valor = valorImovel * escrituraData.percentual;
            if (escrituraData.teto) valor = Math.min(valor, escrituraData.teto);
          }

          rankings.push({
            estado: estado.nome,
            uf: estado.uf,
            valor,
          });
        }
      }

      return rankings.sort((a, b) => b.valor - a.valor);
    },
  });

  const { data: rankingRegistro } = useQuery({
    queryKey: ['ranking-registro', valorImovel],
    queryFn: async () => {
      const { data: estados } = await supabase.from('estados').select('*');
      const rankings = [];

      for (const estado of estados || []) {
        const { data: registroData } = await supabase
          .from('valores_registro')
          .select('*')
          .eq('estado_id', estado.id)
          .lte('faixa_min', valorImovel)
          .or(`faixa_max.is.null,faixa_max.gte.${valorImovel}`)
          .limit(1)
          .single();

        if (registroData) {
          let valor = 0;
          if (registroData.valor_fixo) {
            valor = registroData.valor_fixo;
          } else if (registroData.percentual) {
            valor = valorImovel * registroData.percentual;
            if (registroData.teto) valor = Math.min(valor, registroData.teto);
          }

          rankings.push({
            estado: estado.nome,
            uf: estado.uf,
            valor,
          });
        }
      }

      return rankings.sort((a, b) => b.valor - a.valor);
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getGradientColor = (index: number, total: number) => {
    const percentage = index / (total - 1);
    
    if (percentage <= 0.2) return 'from-red-500 to-red-400 text-white'; // Mais caros
    if (percentage <= 0.4) return 'from-orange-500 to-orange-400 text-white';
    if (percentage <= 0.6) return 'from-yellow-500 to-yellow-400 text-white';
    if (percentage <= 0.8) return 'from-lime-500 to-lime-400 text-white';
    return 'from-green-500 to-green-400 text-white'; // Mais baratos
  };

  const getPositionText = (index: number, total: number) => {
    const percentage = index / (total - 1);
    if (percentage <= 0.3) return 'MAIS CARO';
    if (percentage >= 0.7) return 'MAIS BARATO';
    return 'INTERMEDIÁRIO';
  };

  const RankingList = ({ data, title }: { data: any[], title: string }) => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-600 mb-1">
          Ranking baseado em imóvel de {formatCurrency(valorImovel)}
        </p>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-2">
        {data?.map((item, index) => (
          <div 
            key={item.uf} 
            className={`bg-gradient-to-r ${getGradientColor(index, data.length)} rounded-lg p-3 shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold opacity-90 min-w-[30px]">
                  #{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{item.estado}</span>
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white text-xs px-2 py-0">
                      {item.uf}
                    </Badge>
                  </div>
                  <span className="text-xs opacity-80">
                    {getPositionText(index, data.length)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-sm">
                  {formatCurrency(item.valor)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <TrendingUp className="w-7 h-7" />
          Rankings por Estado
        </CardTitle>
        <p className="text-purple-100">
          Compare os custos entre todos os estados brasileiros
        </p>
      </CardHeader>
      <CardContent className="p-6 bg-gray-50">
        <Tabs defaultValue="escritura" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-sm">
            <TabsTrigger value="escritura" className="font-semibold">Valores de Escritura</TabsTrigger>
            <TabsTrigger value="registro" className="font-semibold">Valores de Registro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escritura" className="mt-6">
            <RankingList 
              data={rankingEscritura || []} 
              title="Custos de Escritura"
            />
          </TabsContent>
          
          <TabsContent value="registro" className="mt-6">
            <RankingList 
              data={rankingRegistro || []} 
              title="Custos de Registro"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
