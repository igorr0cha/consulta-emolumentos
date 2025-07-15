
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Procuracao } from '@/types/database';

export const useProcuracoes = (estadoId: string | null) => {
  return useQuery({
    queryKey: ['procuracoes', estadoId],
    queryFn: async (): Promise<Procuracao[]> => {
      if (!estadoId) return [];
      
      const { data, error } = await supabase
        .from('procuracoes')
        .select('*')
        .eq('estado_id', estadoId)
        .order('valor');
      
      if (error) {
        console.error('Erro ao buscar procurações:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!estadoId,
  });
};
