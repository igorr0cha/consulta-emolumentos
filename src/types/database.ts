
export interface Estado {
  id: string;
  nome: string;
  uf: string;
  created_at: string;
}

export interface ValorEscritura {
  id: string;
  estado_id: string;
  faixa_min: number;
  faixa_max: number | null;
  valor_fixo: number | null;
  percentual: number | null;
  teto: number | null;
  tipo_imovel: string | null;
  created_at: string;
}

export interface ValorRegistro {
  id: string;
  estado_id: string;
  faixa_min: number;
  faixa_max: number | null;
  valor_fixo: number | null;
  percentual: number | null;
  teto: number | null;
  tipo_imovel: string | null;
  created_at: string;
}

export interface AliquotaITBI {
  id: string;
  estado_id: string;
  municipio: string | null;
  aliquota: number;
  created_at: string;
}

export interface Procuracao {
  id: string;
  estado_id: string;
  descricao: string;
  valor: number;
  created_at: string;
}

export interface CalculationResult {
  valorRegistro: number;
  aliquotaITBI: number;
  valorITBI: number;
  valorProcuracao: number;
  valorEscritura: number;
  subtotal: number;
  valorTotal: number;
}

export interface FormData {
  estado: string;
  municipio: string;
  valorImovel: number;
  tipoProcuracao: string;
}
