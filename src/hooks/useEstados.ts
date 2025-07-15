
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Estado } from '@/types/database';

export const useEstados = () => {
  return useQuery({
    queryKey: ['estados'],
    queryFn: async (): Promise<Estado[]> => {
      const { data, error } = await supabase
        .from('estados')
        .select('*')
        .order('nome');
      
      if (error) {
        console.error('Erro ao buscar estados:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};
