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

  // Se não há custo_por_faixa, significa que é uma faixa de valor fixo.
  // Nestes casos, o valor final é o emolumento_maximo daquela faixa.
  if (!dados.custo_por_faixa || dados.custo_por_faixa === 0) {
    // CORREÇÃO APLICADA AQUI:
    // Retorna o emolumento_maximo em vez do custo_base, que é nulo para faixas fixas.
    return dados.emolumento_maximo || 0;
  }

  // Se a função chegou até aqui, é porque se trata de uma faixa com cálculo de excedente.
  const custoBase = dados.custo_base || 0;

  // A base para o cálculo do excedente é o início desta faixa.
  const baseFaixa = dados.faixa_minima;
  const valorExcedente = valorImovel - baseFaixa;
  
  // Garante que não haja cálculo se o valor for menor que o início da faixa.
  if (valorExcedente < 0) return custoBase;

  const tamanhoFaixa = dados.tamanho_faixa_excedente || 1;
  const numeroFaixas = Math.ceil(valorExcedente / tamanhoFaixa);
  const custoExcedente = numeroFaixas * dados.custo_por_faixa;
  
  const resultado = custoBase + custoExcedente;
  
  // Limita o resultado ao teto, se houver um definido para a faixa de cálculo.
  return dados.emolumento_maximo ? Math.min(resultado, dados.emolumento_maximo) : resultado;
};

// Padrão 3 (Ex: Rio de Janeiro) - Corrigido
export const calcularPadrao3 = (valorImovel: number, dados: EmolumentoData): number => {
  if (!dados) return 0;

  const custoBase = dados.custo_base || 0;
  
  // ---> PARTE 1: Lógica para faixas de valor fixo <---
  // Se não há custo_por_faixa, é uma faixa de valor fixo.
  if (!dados.custo_por_faixa || dados.custo_por_faixa === 0) {
    // Para R$ 100.000,00, a função entraria aqui e retornaria o valor correto.
    return dados.emolumento_maximo || 0;
  }

  // ---> PARTE 2: Lógica para a faixa de cálculo excedente <---
  // A partir daqui, o código só executa para valores acima de R$ 464.455,57.
  const baseFaixa = dados.faixa_minima;
  const valorExcedente = valorImovel - baseFaixa;

  if (valorExcedente < 0) return custoBase;

  const tamanhoFaixa = dados.tamanho_faixa_excedente || 1;
  const custoPorFaixa = dados.custo_por_faixa || 0;
  
  const acrescimoPorFaixa = dados.pmcmv || (custoPorFaixa * 0.02);
  const numeroFaixas = Math.ceil(valorExcedente / tamanhoFaixa);
  
  // Aplica o custo da faixa + o acréscimo para cada faixa excedente
  const custoTotalExcedente = numeroFaixas * (custoPorFaixa + acrescimoPorFaixa);
  
  const resultado = custoBase + custoTotalExcedente;
  
  return dados.emolumento_maximo ? Math.min(resultado, dados.emolumento_maximo) : resultado;
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