-- Criar tabela para mapear padrões de cálculo por estado
CREATE TABLE public.regras_calculo_estado (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estado_id UUID NOT NULL REFERENCES public.estados(id),
  padrao_calculo INTEGER NOT NULL CHECK (padrao_calculo BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.regras_calculo_estado ENABLE ROW LEVEL SECURITY;

-- Criar política para leitura pública
CREATE POLICY "Allow public read access on regras_calculo_estado" 
ON public.regras_calculo_estado 
FOR SELECT 
USING (true);

-- Criar índice para performance
CREATE INDEX idx_regras_calculo_estado_estado_id ON public.regras_calculo_estado(estado_id);

-- Inserir dados iniciais (exemplos baseados na descrição)
INSERT INTO public.regras_calculo_estado (estado_id, padrao_calculo)
SELECT id, 
  CASE 
    WHEN uf = 'AM' THEN 1  -- Amazonas - Padrão 1
    WHEN uf = 'AL' THEN 2  -- Alagoas - Padrão 2  
    WHEN uf = 'RJ' THEN 3  -- Rio de Janeiro - Padrão 3
    WHEN uf = 'SC' THEN 4  -- Santa Catarina - Padrão 4
    WHEN uf = 'CE' THEN 5  -- Ceará - Padrão 5
    ELSE 1  -- Default para outros estados
  END
FROM public.estados;