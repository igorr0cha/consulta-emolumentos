interface EmolumentoData {
  faixa_minima: number;
  faixa_maxima: number | null;
  custo_base: number | null;
  custo_por_faixa: number | null;
  tamanho_faixa_excedente: number | null;
  emolumento_maximo: number | null;
  pmcmv: number | null;
  frj: number | null;
}

// Padrão 1 (Ex: Amazonas) - Busca faixa correspondente e retorna emolumento máximo
export const calcularPadrao1 = (valorImovel: number, dados: EmolumentoData): number => {
  if (!dados || !dados.emolumento_maximo) return 0;
  return dados.emolumento_maximo;
};

// Padrão 2 (Ex: Alagoas) - Custo base + cálculo de faixas excedentes
export const calcularPadrao2 = (valorImovel: number, dados: EmolumentoData): number => {
  if (!dados) return 0;

  const custoBase = dados.custo_base || 0;
  
  // Se não há custo por faixa ou é zerado, retorna apenas o custo base
  if (!dados.custo_por_faixa || dados.custo_por_faixa === 0) {
    return custoBase;
  }

  // Se há faixa máxima e valor está dentro dela, retorna custo base
  if (dados.faixa_maxima && valorImovel <= dados.faixa_maxima) {
    return custoBase;
  }

  // Calcular excedente acima da faixa máxima (ou mínima se não há máxima)
  const baseFaixa = dados.faixa_maxima || dados.faixa_minima;
  const valorExcedente = valorImovel - baseFaixa;
  
  if (valorExcedente <= 0) return custoBase;

  const tamanhoFaixa = dados.tamanho_faixa_excedente || 1;
  const numeroFaixas = Math.ceil(valorExcedente / tamanhoFaixa);
  const custoExcedente = numeroFaixas * dados.custo_por_faixa;
  
  const resultado = custoBase + custoExcedente;
  
  // Limitar pelo emolumento máximo se existir
  return dados.emolumento_maximo ? Math.min(resultado, dados.emolumento_maximo) : resultado;
};

// Padrão 3 (Ex: Rio de Janeiro) - Igual ao Padrão 2 + acréscimo de 2%
export const calcularPadrao3 = (valorImovel: number, dados: EmolumentoData): number => {
  const resultadoBase = calcularPadrao2(valorImovel, dados);
  
  // Aplicar acréscimo de 2% sobre o custo por faixa (baseado na nota 19ª)
  const acrescimo = dados.custo_por_faixa ? dados.custo_por_faixa * 0.02 : 0;
  
  return resultadoBase + acrescimo;
};

// Padrão 4 (Ex: Santa Catarina) - Soma Emolumentos + FRJ
export const calcularPadrao4 = (valorImovel: number, dados: EmolumentoData): number => {
  if (!dados) return 0;
  
  // O emolumento máximo já representa a soma de Emolumentos + FRJ
  return dados.emolumento_maximo || 0;
};

// Padrão 5 (Ex: Ceará) - Cálculo multifatorial complexo
export const calcularPadrao5 = (valorImovel: number, dados: EmolumentoData): number => {
  if (!dados) return 0;

  const LIMITE_BASE = 23322.58;
  const DIVISOR_EXCEDENTE = 10.98;
  const MULTIPLICADOR_EXCEDENTE = 0.23;
  const LIMITE_EMOLUMENTO = 3088.94;
  const PERCENTUAL_FERMOJU = 0.05;
  const BASE_FERMOJU = 47.84;
  const SELO = 0; // Valor do selo não especificado, assumindo 0
  const PERCENTUAL_FAADEP = 0; // Percentual não especificado
  const PERCENTUAL_FRMMP = 0; // Percentual não especificado

  // Cálculo do Emolumento Base
  let emolumentoBase = dados.custo_base || 0;
  
  if (valorImovel > LIMITE_BASE) {
    const excedente = valorImovel - LIMITE_BASE;
    const adicionalExcedente = (excedente / DIVISOR_EXCEDENTE) * MULTIPLICADOR_EXCEDENTE;
    emolumentoBase = Math.min(emolumentoBase + adicionalExcedente, LIMITE_EMOLUMENTO);
  }

  // Cálculo do FERMOJU
  const fermoju = (emolumentoBase * PERCENTUAL_FERMOJU) + BASE_FERMOJU;

  // Subtotal
  const subtotal = emolumentoBase + fermoju + SELO;

  // Taxas FAADEP e FRMMP
  const faadep = subtotal * PERCENTUAL_FAADEP;
  const frmmp = subtotal * PERCENTUAL_FRMMP;

  // Total Final
  return subtotal + faadep + frmmp;
};

// Função principal que escolhe o padrão correto
export const calcularEmolumento = (
  valorImovel: number, 
  dados: EmolumentoData, 
  padraoCalculo: number
): number => {
  switch (padraoCalculo) {
    case 1:
      return calcularPadrao1(valorImovel, dados);
    case 2:
      return calcularPadrao2(valorImovel, dados);
    case 3:
      return calcularPadrao3(valorImovel, dados);
    case 4:
      return calcularPadrao4(valorImovel, dados);
    case 5:
      return calcularPadrao5(valorImovel, dados);
    default:
      return calcularPadrao1(valorImovel, dados);
  }
};