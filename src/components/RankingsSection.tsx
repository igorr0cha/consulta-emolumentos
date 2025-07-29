import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { calcularEmolumento } from '@/lib/calculationPatterns';

interface RankingsSectionProps {
  valorImovel: number;
}

export const RankingsSection = ({ valorImovel }: RankingsSectionProps) => {
  const { data: rankingEscritura } = useQuery({
    queryKey: ['ranking-escritura', valorImovel],
    queryFn: async () => {
      const { data: estados } = await supabase.from('estados').select('*');
      const rankings = [];

      for (const estado of estados || []) {
        // Buscar padrão de cálculo do estado
        const { data: regraData } = await supabase
          .from('regras_calculo_estado')
          .select('padrao_calculo')
          .eq('estado_id', estado.id)
          .maybeSingle();

        const padraoCalculo = regraData?.padrao_calculo || 1;

        // Buscar dados de escritura
        const { data: escrituraData } = await supabase
          .from('valores_emolumentos')
          .select('*')
          .eq('estado_id', estado.id)
          .eq('tipo_emolumento', 'escritura')
          .lte('faixa_minima', valorImovel)
          .or(`faixa_maxima.is.null,faixa_maxima.gte.${valorImovel}`)
          .order('faixa_minima', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (escrituraData) {
          const valor = calcularEmolumento(valorImovel, {
            faixa_minima: escrituraData.faixa_minima,
            faixa_maxima: escrituraData.faixa_maxima,
            custo_base: escrituraData.custo_base,
            custo_por_faixa: escrituraData.custo_por_faixa,
            tamanho_faixa_excedente: escrituraData.tamanho_faixa_excedente,
            emolumento_maximo: escrituraData.emolumento_maximo,
            pmcmv: escrituraData.pmcmv,
            frj: escrituraData.frj
          }, padraoCalculo);

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
        // Buscar padrão de cálculo do estado
        const { data: regraData } = await supabase
          .from('regras_calculo_estado')
          .select('padrao_calculo')
          .eq('estado_id', estado.id)
          .maybeSingle();

        const padraoCalculo = regraData?.padrao_calculo || 1;

        // Buscar dados de registro
        const { data: registroData } = await supabase
          .from('valores_emolumentos')
          .select('*')
          .eq('estado_id', estado.id)
          .eq('tipo_emolumento', 'registro')
          .lte('faixa_minima', valorImovel)
          .or(`faixa_maxima.is.null,faixa_maxima.gte.${valorImovel}`)
          .order('faixa_minima', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (registroData) {
          const valor = calcularEmolumento(valorImovel, {
            faixa_minima: registroData.faixa_minima,
            faixa_maxima: registroData.faixa_maxima,
            custo_base: registroData.custo_base,
            custo_por_faixa: registroData.custo_por_faixa,
            tamanho_faixa_excedente: registroData.tamanho_faixa_excedente,
            emolumento_maximo: registroData.emolumento_maximo,
            pmcmv: registroData.pmcmv,
            frj: registroData.frj
          }, padraoCalculo);

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
    
    if (percentage <= 0.2) return 'from-red-500 to-red-400 text-white';
    if (percentage <= 0.4) return 'from-orange-500 to-orange-400 text-white';
    if (percentage <= 0.6) return 'from-yellow-500 to-yellow-400 text-white';
    if (percentage <= 0.8) return 'from-lime-500 to-lime-400 text-white';
    return 'from-green-500 to-green-400 text-white';
  };

  const getPositionText = (index: number, total: number) => {
    const percentage = index / (total - 1);
    if (percentage <= 0.3) return 'MAIS CARO';
    if (percentage >= 0.7) return 'MAIS BARATO';
    return 'INTERMEDIÁRIO';
  };

  const getBarColor = (index: number, total: number) => {
    const percentage = index / (total - 1);
    
    if (percentage <= 0.2) return '#ef4444';
    if (percentage <= 0.4) return '#f97316';
    if (percentage <= 0.6) return '#eab308';
    if (percentage <= 0.8) return '#84cc16';
    return '#22c55e';
  };

  const prepareChartData = (data: any[]) => {
    if (!data) return [];
    return data.map((item, index) => ({
      ...item,
      fill: getBarColor(index, data.length),
      shortName: item.uf,
    }));
  };

  const RankingList = ({ data, title }: { data: any[], title: string }) => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-200">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">
          Ranking baseado em imóvel de {formatCurrency(valorImovel)}
        </p>
        <h3 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h3>
      </div>

      <div className="space-y-2">
        {data?.map((item, index) => (
          <div 
            key={item.uf} 
            className={`bg-gradient-to-r ${getGradientColor(index, data.length)} rounded-lg p-3 shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="text-sm sm:text-lg font-bold opacity-90 min-w-[25px] sm:min-w-[30px]">
                  #{index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="font-semibold text-xs sm:text-sm truncate">{item.estado}</span>
                    <Badge variant="outline" className="bg-white/20 border-white/30 text-white text-xs px-1 sm:px-2 py-0 flex-shrink-0">
                      {item.uf}
                    </Badge>
                  </div>
                  <span className="text-xs opacity-80">
                    {getPositionText(index, data.length)}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-bold text-xs sm:text-sm break-all">
                  {formatCurrency(item.valor)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico Interativo */}
      <div className="mt-6 sm:mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg">
          <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4 text-center">
            Visualização Gráfica - {title}
          </h4>
          <ChartContainer
            config={{
              valor: {
                label: "Valor",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px] sm:h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareChartData(data)}
                margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
              >
                <XAxis 
                  dataKey="shortName" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={10}
                  interval={0}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  fontSize={10}
                  width={80}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        "Valor"
                      ]}
                      labelFormatter={(label) => {
                        const item = data?.find(d => d.uf === label);
                        return item ? `${item.estado} (${item.uf})` : label;
                      }}
                    />
                  }
                />
                <Bar 
                  dataKey="valor" 
                  radius={[4, 4, 0, 0]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#007581] to-[#009bb0] text-white p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl">
          <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0" />
          <span className="break-words">Rankings por Estado</span>
        </CardTitle>
        <p className="text-blue-100 text-sm sm:text-base">
          Compare os custos entre todos os estados brasileiros
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 bg-gray-50">
        <Tabs defaultValue="escritura" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-white shadow-sm h-auto">
            <TabsTrigger value="escritura" className="font-semibold text-xs sm:text-sm p-2 sm:p-3">
              Valores de Escritura
            </TabsTrigger>
            <TabsTrigger value="registro" className="font-semibold text-xs sm:text-sm p-2 sm:p-3">
              Valores de Registro
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="escritura" className="mt-4 sm:mt-6">
            <RankingList 
              data={rankingEscritura || []} 
              title="Custos de Escritura"
            />
          </TabsContent>
          
          <TabsContent value="registro" className="mt-4 sm:mt-6">
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
