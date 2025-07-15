
-- Criar tabela de estados
CREATE TABLE public.estados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR NOT NULL UNIQUE,
  uf VARCHAR(2) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de valores de escritura
CREATE TABLE public.valores_escritura (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estado_id UUID NOT NULL REFERENCES public.estados(id) ON DELETE CASCADE,
  faixa_min NUMERIC NOT NULL,
  faixa_max NUMERIC,
  valor_fixo NUMERIC,
  percentual NUMERIC,
  teto NUMERIC,
  tipo_imovel VARCHAR DEFAULT 'urbano',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de valores de registro
CREATE TABLE public.valores_registro (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estado_id UUID NOT NULL REFERENCES public.estados(id) ON DELETE CASCADE,
  faixa_min NUMERIC NOT NULL,
  faixa_max NUMERIC,
  valor_fixo NUMERIC,
  percentual NUMERIC,
  teto NUMERIC,
  tipo_imovel VARCHAR DEFAULT 'urbano',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de alíquotas ITBI
CREATE TABLE public.aliquotas_itbi (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estado_id UUID NOT NULL REFERENCES public.estados(id) ON DELETE CASCADE,
  municipio VARCHAR,
  aliquota NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de procurações
CREATE TABLE public.procuracoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  estado_id UUID NOT NULL REFERENCES public.estados(id) ON DELETE CASCADE,
  descricao VARCHAR NOT NULL,
  valor NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(estado_id, descricao)
);

-- Habilitar RLS para leitura pública
ALTER TABLE public.estados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valores_escritura ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valores_registro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aliquotas_itbi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procuracoes ENABLE ROW LEVEL SECURITY;

-- Criar políticas para permitir leitura pública
CREATE POLICY "Allow public read access on estados" ON public.estados FOR SELECT USING (true);
CREATE POLICY "Allow public read access on valores_escritura" ON public.valores_escritura FOR SELECT USING (true);
CREATE POLICY "Allow public read access on valores_registro" ON public.valores_registro FOR SELECT USING (true);
CREATE POLICY "Allow public read access on aliquotas_itbi" ON public.aliquotas_itbi FOR SELECT USING (true);
CREATE POLICY "Allow public read access on procuracoes" ON public.procuracoes FOR SELECT USING (true);

-- Criar índices para otimização
CREATE INDEX idx_valores_escritura_estado_id ON public.valores_escritura(estado_id);
CREATE INDEX idx_valores_registro_estado_id ON public.valores_registro(estado_id);
CREATE INDEX idx_aliquotas_itbi_estado_id ON public.aliquotas_itbi(estado_id);
CREATE INDEX idx_procuracoes_estado_id ON public.procuracoes(estado_id);

-- Inserir dados dos estados brasileiros
INSERT INTO public.estados (nome, uf) VALUES
('Acre', 'AC'),
('Alagoas', 'AL'),
('Amapá', 'AP'),
('Amazonas', 'AM'),
('Bahia', 'BA'),
('Ceará', 'CE'),
('Distrito Federal', 'DF'),
('Espírito Santo', 'ES'),
('Goiás', 'GO'),
('Maranhão', 'MA'),
('Mato Grosso', 'MT'),
('Mato Grosso do Sul', 'MS'),
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Paraíba', 'PB'),
('Paraná', 'PR'),
('Pernambuco', 'PE'),
('Piauí', 'PI'),
('Rio de Janeiro', 'RJ'),
('Rio Grande do Norte', 'RN'),
('Rio Grande do Sul', 'RS'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Santa Catarina', 'SC'),
('São Paulo', 'SP'),
('Sergipe', 'SE'),
('Tocantins', 'TO');

-- Inserir dados de exemplo para São Paulo (SP)
INSERT INTO public.valores_escritura (estado_id, faixa_min, faixa_max, valor_fixo, percentual, teto)
SELECT id, 0, 100000, 500, NULL, NULL FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 100000.01, 500000, NULL, 0.005, 2500 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 500000.01, NULL, NULL, 0.003, NULL FROM public.estados WHERE uf = 'SP';

INSERT INTO public.valores_registro (estado_id, faixa_min, faixa_max, valor_fixo, percentual, teto)
SELECT id, 0, 100000, 300, NULL, NULL FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 100000.01, 500000, NULL, 0.003, 1500 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 500000.01, NULL, NULL, 0.002, NULL FROM public.estados WHERE uf = 'SP';

-- Inserir dados de exemplo para Distrito Federal (DF)
INSERT INTO public.valores_escritura (estado_id, faixa_min, faixa_max, valor_fixo, percentual, teto)
SELECT id, 0, 200000, 800, NULL, NULL FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 200000.01, 1000000, NULL, 0.006, 6000 FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 1000000.01, NULL, NULL, 0.004, NULL FROM public.estados WHERE uf = 'DF';

INSERT INTO public.valores_registro (estado_id, faixa_min, faixa_max, valor_fixo, percentual, teto)
SELECT id, 0, 200000, 400, NULL, NULL FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 200000.01, 1000000, NULL, 0.004, 4000 FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 1000000.01, NULL, NULL, 0.003, NULL FROM public.estados WHERE uf = 'DF';

-- Inserir alíquotas ITBI padrão
INSERT INTO public.aliquotas_itbi (estado_id, aliquota)
SELECT id, 0.02 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 0.025 FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 0.02 FROM public.estados WHERE uf = 'RJ'
UNION ALL
SELECT id, 0.015 FROM public.estados WHERE uf = 'MG';

-- Inserir procurações de exemplo
INSERT INTO public.procuracoes (estado_id, descricao, valor)
SELECT id, 'Procuração Simples', 150 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 'Procuração com Poderes Especiais', 250 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 'Procuração Irrevogável', 350 FROM public.estados WHERE uf = 'SP'
UNION ALL
SELECT id, 'Procuração Básica', 200 FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 'Procuração Completa', 300 FROM public.estados WHERE uf = 'DF'
UNION ALL
SELECT id, 'Procuração Especial', 400 FROM public.estados WHERE uf = 'DF';
