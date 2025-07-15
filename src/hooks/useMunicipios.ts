
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useMunicipios = (estadoId: string | null) => {
  return useQuery({
    queryKey: ['municipios', estadoId],
    queryFn: async () => {
      if (!estadoId) return [];
      
      const { data, error } = await supabase
        .from('aliquotas_itbi')
        .select('municipio')
        .eq('estado_id', estadoId)
        .not('municipio', 'is', null)
        .order('municipio');

      if (error) throw error;
      
      // Remove duplicatas e filtra valores válidos
      const municipios = [...new Set(data.map(item => item.municipio).filter(Boolean))];
      return municipios.map(municipio => ({ nome: municipio }));
    },
    enabled: !!estadoId,
  });
};
