// Tamanho de produto
export interface ProdutoTamanho {
  id: number;
  tamanho: string;
  preco: number;
  fatias: number | null;
}

// Massa
export interface Massa {
  id: number;
  nome: string;
  tipo: string;
  precoExtra: number;
  ativo: boolean;
}

// Recheio (CORRIGIDO: precoExtra não está diretamente no recheio)
export interface Recheio {
  id: number;
  nome: string;
  ativo: boolean;
}

// Cobertura (CORRIGIDO: precoExtra não está diretamente na cobertura)
export interface Cobertura {
  id: number;
  nome: string;
  ativo: boolean;
}

// Decoração
export interface Decoracao {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

// Relacionamento produto-massa
export interface ProdutoMassa {
  id: number;
  massa: Massa;
}

// Relacionamento produto-recheio (COM precoExtra específico)
export interface ProdutoRecheio {
  id: number;
  precoExtra: number; // ✅ NOVO: preço específico por produto
  recheio: Recheio;
}

// Relacionamento produto-cobertura (COM precoExtra específico)
export interface ProdutoCobertura {
  id: number;
  precoExtra: number; // ✅ NOVO: preço específico por produto
  cobertura: Cobertura;
}

// Relacionamento produto-decoração
export interface ProdutoDecoracao {
  id: number;
  decoracao: Decoracao;
}

// Seleções do produto
export interface SelecoesProduto {
  tamanhoId?: number;
  massaId?: number;
  recheios?: number[];      
  coberturaId?: number;
  decoracoes?: number[];    
}

// Produto principal
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  ativo: boolean;
  imagem: string | null;
  tamanhos: ProdutoTamanho[];
  massas: ProdutoMassa[];
  recheios: ProdutoRecheio[];
  coberturas: ProdutoCobertura[];
  decoracoes?: ProdutoDecoracao[];
}

// ✅ NOVO: Interface para cálculo de preço
export interface CalculoPreco {
  precoBase: number;
  precoMassa: number;
  precoRecheios: number;
  precoCobertura: number;
  precoDecoracoes: number;
  precoTotal: number;
}

// ✅ NOVO: Interface para item do carrinho
export interface ItemCarrinhoData {
  produtoId: number;
  quantidade: number;
  tamanho?: string;
  massa?: string;
  recheios: string[];
  cobertura?: string;
  decoracoes: string[];
  preco: number;
}