interface EmolumentoData {
  faixa_minima: number;
  faixa_maxima: number | null;
  custo_base: number | null;
  custo_por_faixa: number | null;
  tamanho_faixa_excedente: number | null;
  emolumento_maximo: number | null;
  pmcmv: number | null;
  frj: number | null;
  tipo_emolumento?: string | null; // LINHA NOVA PARA PADRÃO 5 (CEARÁ)

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

// Padrão 5 (Ex: Ceará) - Lógica de cálculo corrigida e unificada
export const calcularPadrao5 = (valorImovel: number, dados: EmolumentoData): number => {
    if (!dados) return 0;

    // Se a faixa tem um valor máximo, é uma faixa de valor fixo.
    if (dados.faixa_maxima !== null) {
        return dados.emolumento_maximo || 0;
    }

    // A partir daqui, é a faixa de valor excedente.
    let emolumento = 0;
    let fermoju = 0;
    let selo = 0;
    let fadep = 0;
    let frmmp = 0;
    let subtotal = 0;
    
    const custoBase = dados.custo_base || 0;

    // Cálculo do emolumento para a faixa excedente
    const excedente = valorImovel - dados.faixa_minima;
    if (excedente < 0) { // Garante que não calcule valores negativos se algo der errado
        return custoBase;
    }
    
    const numeroDeFrações = Math.ceil(excedente / (dados.tamanho_faixa_excedente || 1));
    const custoExcedente = numeroDeFrações * (dados.custo_por_faixa || 0);
    
    let emolumentoCalculado = custoBase + custoExcedente;

    if (dados.emolumento_maximo) {
        emolumento = Math.min(emolumentoCalculado, dados.emolumento_maximo);
    } else {
        emolumento = emolumentoCalculado;
    }

    if (dados.tipo_emolumento === 'escritura') {
        const fermojuBase = 47.84;
        selo = 36.28;
        fermoju = ((emolumento - custoBase) * 0.05) + fermojuBase;
    } else if (dados.tipo_emolumento === 'registro') {
        const fermojuBase = 94.98;
        selo = 54.40;
        fermoju = ((emolumento - custoBase) * 0.05) + fermojuBase;
    }

    // Cálculo das taxas
    subtotal = emolumento + fermoju + selo;
    fadep = emolumento * 0.05;
    frmmp = emolumento * 0.05;

    // O valor final é a soma de todos os componentes
    return subtotal + fadep + frmmp;
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