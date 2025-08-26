import { Produto, ProdutoTamanho, ProdutoMassa, ProdutoRecheio, ProdutoCobertura, ProdutoDecoracao, CalculoPreco, SelecoesProduto } from '../types/produto';

/**
 * Calcula o preço total de um produto baseado nas seleções do usuário
 */
export function calcularPrecoTotal(
  produto: Produto,
  selecoes: SelecoesProduto
): CalculoPreco {
  let precoBase = 0;
  let precoMassa = 0;
  let precoRecheios = 0;
  let precoCobertura = 0;
  let precoDecoracoes = 0;

  // 1. PREÇO BASE (do tamanho selecionado)
  if (selecoes.tamanhoId) {
    const tamanhoSelecionado = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
    precoBase = tamanhoSelecionado?.preco || 0;
  } else if (produto.preco) {
    // Para sobremesas com preço fixo
    precoBase = produto.preco;
  }

  // 2. PREÇO DA MASSA (se houver seleção)
  if (selecoes.massaId && produto.massas) {
    const massaSelecionada = produto.massas.find(m => m.massa.id === selecoes.massaId);
    precoMassa = massaSelecionada?.massa.precoExtra || 0;
  }

  // 3. PREÇO DOS RECHEIOS (soma dos preços extras)
  if (selecoes.recheios && selecoes.recheios.length > 0 && produto.recheios) {
    precoRecheios = selecoes.recheios.reduce((total, recheioId) => {
      const recheioSelecionado = produto.recheios.find(r => r.recheio.id === recheioId);
      return total + (recheioSelecionado?.precoExtra || 0);
    }, 0);
  }

  // 4. PREÇO DA COBERTURA (se houver seleção)
  if (selecoes.coberturaId && produto.coberturas) {
    const coberturaSelecionada = produto.coberturas.find(c => c.cobertura.id === selecoes.coberturaId);
    precoCobertura = coberturaSelecionada?.precoExtra || 0;
  }

  // 5. PREÇO DAS DECORAÇÕES (soma dos preços)
  if (selecoes.decoracoes && selecoes.decoracoes.length > 0 && produto.decoracoes) {
    precoDecoracoes = selecoes.decoracoes.reduce((total, decoracaoId) => {
      const decoracaoSelecionada = produto.decoracoes?.find(d => d.decoracao.id === decoracaoId);
      return total + (decoracaoSelecionada?.decoracao.preco || 0);
    }, 0);
  }

  const precoTotal = precoBase + precoMassa + precoRecheios + precoCobertura + precoDecoracoes;

  return {
    precoBase,
    precoMassa,
    precoRecheios,
    precoCobertura,
    precoDecoracoes,
    precoTotal
  };
}

/**
 * Valida se as seleções estão corretas para o tipo de produto
 */
export function validarSelecoes(
  categoria: string,
  selecoes: SelecoesProduto
): { valido: boolean; erros: string[] } {
  const erros: string[] = [];

  switch (categoria) {
    case 'BOLO_ANIVERSARIO':
      if (!selecoes.tamanhoId) {
        erros.push('Selecione um tamanho');
      }
      if (!selecoes.massaId) {
        erros.push('Selecione uma massa');
      }
      if (!selecoes.recheios || selecoes.recheios.length !== 2) {
        erros.push('Selecione exatamente 2 recheios');
      }
      if (!selecoes.coberturaId) {
        erros.push('Selecione uma cobertura');
      }
      break;

    case 'BOLO_TACA':
      if (!selecoes.tamanhoId) {
        erros.push('Selecione um tamanho');
      }
      if (!selecoes.recheios || selecoes.recheios.length !== 2) {
        erros.push('Selecione exatamente 2 recheios');
      }
      if (!selecoes.coberturaId) {
        erros.push('Selecione uma cobertura');
      }
      break;

    case 'BOLO_CASEIRO':
      if (!selecoes.tamanhoId) {
        erros.push('Selecione um tamanho');
      }
      if (!selecoes.massaId) {
        erros.push('Selecione uma massa');
      }
      // Cobertura é opcional para bolo caseiro
      break;

    case 'DOCINHOS':
      if (!selecoes.tamanhoId) {
        erros.push('Selecione uma quantidade');
      }
      break;

    case 'SOBREMESAS':
      // Sobremesas não têm personalizações
      break;

    default:
      erros.push('Categoria de produto não reconhecida');
  }

  return {
    valido: erros.length === 0,
    erros
  };
}

/**
 * Formata o preço para exibição
 */
export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco);
}

/**
 * Calcula quantas fatias o produto renderá (se aplicável)
 */
export function calcularFatias(
  produto: Produto,
  tamanhoId?: number
): number | null {
  if (!tamanhoId) return null;
  
  const tamanho = produto.tamanhos.find(t => t.id === tamanhoId);
  return tamanho?.fatias || null;
}

/**
 * Gera um resumo das seleções para exibição
 */
export function gerarResumoSelecoes(
  produto: Produto,
  selecoes: SelecoesProduto
): string[] {
  const resumo: string[] = [];

  // Tamanho
  if (selecoes.tamanhoId) {
    const tamanho = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
    if (tamanho) {
      resumo.push(`Tamanho: ${tamanho.tamanho}`);
    }
  }

  // Massa
  if (selecoes.massaId && produto.massas) {
    const massa = produto.massas.find(m => m.massa.id === selecoes.massaId);
    if (massa) {
      resumo.push(`Massa: ${massa.massa.nome}`);
    }
  }

  // Recheios
  if (selecoes.recheios && selecoes.recheios.length > 0 && produto.recheios) {
    const nomes = selecoes.recheios
      .map(id => produto.recheios.find(r => r.recheio.id === id)?.recheio.nome)
      .filter(Boolean);
    if (nomes.length > 0) {
      resumo.push(`Recheios: ${nomes.join(', ')}`);
    }
  }

  // Cobertura
  if (selecoes.coberturaId && produto.coberturas) {
    const cobertura = produto.coberturas.find(c => c.cobertura.id === selecoes.coberturaId);
    if (cobertura) {
      resumo.push(`Cobertura: ${cobertura.cobertura.nome}`);
    }
  }

  // Decorações
  if (selecoes.decoracoes && selecoes.decoracoes.length > 0 && produto.decoracoes) {
    const nomes = selecoes.decoracoes
      .map(id => produto.decoracoes?.find(d => d.decoracao.id === id)?.decoracao.nome)
      .filter(Boolean);
    if (nomes.length > 0) {
      resumo.push(`Decorações: ${nomes.join(', ')}`);
    }
  }

  return resumo;
}