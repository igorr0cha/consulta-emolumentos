
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const RankingsSection = () => {
  const [valorReferencia] = useState(500000); // Valor de referência para comparação

  const { data: rankingEscritura } = useQuery({
    queryKey: ['ranking-escritura', valorReferencia],
    queryFn: async () => {
      const { data: estados } = await supabase.from('estados').select('*');
      const rankings = [];

      for (const estado of estados || []) {
        const { data: escrituraData } = await supabase
          .from('valores_escritura')
          .select('*')
          .eq('estado_id', estado.id)
          .lte('faixa_min', valorReferencia)
          .or(`faixa_max.is.null,faixa_max.gte.${valorReferencia}`)
          .limit(1)
          .single();

        if (escrituraData) {
          let valor = 0;
          if (escrituraData.valor_fixo) {
            valor = escrituraData.valor_fixo;
          } else if (escrituraData.percentual) {
            valor = valorReferencia * escrituraData.percentual;
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
    queryKey: ['ranking-registro', valorReferencia],
    queryFn: async () => {
      const { data: estados } = await supabase.from('estados').select('*');
      const rankings = [];

      for (const estado of estados || []) {
        const { data: registroData } = await supabase
          .from('valores_registro')
          .select('*')
          .eq('estado_id', estado.id)
          .lte('faixa_min', valorReferencia)
          .or(`faixa_max.is.null,faixa_max.gte.${valorReferencia}`)
          .limit(1)
          .single();

        if (registroData) {
          let valor = 0;
          if (registroData.valor_fixo) {
            valor = registroData.valor_fixo;
          } else if (registroData.percentual) {
            valor = valorReferencia * registroData.percentual;
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

  const getRankingIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (index === 1) return <Trophy className="w-4 h-4 text-gray-400" />;
    if (index === 2) return <Trophy className="w-4 h-4 text-amber-600" />;
    return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">{index + 1}</span>;
  };

  const RankingList = ({ data, title }: { data: any[], title: string }) => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          Ranking baseado em imóvel de {formatCurrency(valorReferencia)}
        </p>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="grid gap-2">
        {data?.map((item, index) => (
          <Card key={item.uf} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRankingIcon(index)}
                <div>
                  <span className="font-medium">{item.estado}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {item.uf}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-lg">
                  {formatCurrency(item.valor)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Gráfico Top 10 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Top 10 - {title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data?.slice(0, 10) || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="uf" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                labelFormatter={(label) => `Estado: ${label}`}
              />
              <Bar 
                dataKey="valor" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="w-6 h-6" />
          Rankings por Estado
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="escritura" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="escritura">Valores de Escritura</TabsTrigger>
            <TabsTrigger value="registro">Valores de Registro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escritura" className="mt-6">
            <RankingList 
              data={rankingEscritura || []} 
              title="Custos de Escritura (Mais Caro → Mais Barato)"
            />
          </TabsContent>
          
          <TabsContent value="registro" className="mt-6">
            <RankingList 
              data={rankingRegistro || []} 
              title="Custos de Registro (Mais Caro → Mais Barato)"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
