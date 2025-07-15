
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const RankingsSection = () => {
  const [valorReferencia] = useState(500000);

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

  const getItemColor = (index: number, total: number) => {
    const percentage = index / (total - 1);
    if (percentage <= 0.3) return 'bg-orange-500 border-orange-600 text-white'; // Mais caros
    if (percentage >= 0.7) return 'bg-green-500 border-green-600 text-white'; // Mais baratos
    return 'bg-yellow-500 border-yellow-600 text-white'; // Intermediários
  };

  const getPositionText = (index: number, total: number) => {
    const percentage = index / (total - 1);
    if (percentage <= 0.3) return 'MAIS CARO';
    if (percentage >= 0.7) return 'MAIS BARATO';
    return 'INTERMEDIÁRIO';
  };

  const RankingList = ({ data, title }: { data: any[], title: string }) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-600 mb-2">
          Ranking baseado em imóvel de {formatCurrency(valorReferencia)}
        </p>
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
      </div>

      <div className="grid gap-3">
        {data?.map((item, index) => (
          <Card key={item.uf} className={`transition-all duration-300 hover:shadow-lg ${getItemColor(index, data.length)} border-2`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold opacity-90">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">{item.estado}</span>
                      <Badge variant="outline" className="bg-white/20 border-white/30 text-white font-semibold">
                        {item.uf}
                      </Badge>
                    </div>
                    <span className="text-xs font-medium opacity-90">
                      {getPositionText(index, data.length)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xl">
                    {formatCurrency(item.valor)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico Top 10 */}
      <Card className="mt-8 shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-600 text-white">
          <CardTitle className="text-xl">Top 10 - {title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data?.slice(0, 10) || []}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="uf" 
                tick={{ fontSize: 12, fill: '#374151' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#374151' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                labelFormatter={(label) => `Estado: ${label}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="valor" 
                fill="url(#gradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
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
