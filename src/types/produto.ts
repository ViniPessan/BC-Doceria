// Tamanho de produto
export interface ProdutoTamanho {
  id: number;
  tamanho: string;
  preco: number;
  fatias: number | null;
}

// NOVO: Massa
export interface Massa {
  id: number;
  nome: string;
  tipo: string;
  precoExtra: number;
  ativo: boolean;
}

// Recheio
export interface Recheio {
  id: number;
  nome: string;
  precoExtra: number;
  ativo: boolean;
}

// Cobertura
export interface Cobertura {
  id: number;
  nome: string;
  precoExtra: number;
  ativo: boolean;
}

// Decoração
export interface Decoracao {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

// NOVO: Relacionamento (produto -> massa)
export interface ProdutoMassa {
  id: number;
  massa: Massa;
}

// Relacionamento (produto -> recheio)
export interface ProdutoRecheio {
  id: number;
  recheio: Recheio;
}

// Relacionamento (produto -> cobertura)
export interface ProdutoCobertura {
  id: number;
  cobertura: Cobertura;
}

// Relacionamento (produto -> decoração)
export interface ProdutoDecoracao {
  id: number;
  decoracao: Decoracao;
}

// ATUALIZADO: Seleções do produto com massa
export interface SelecoesProduto {
  tamanhoId?: number;
  massaId?: number;        // NOVO: ID da massa selecionada
  recheios?: number[];      
  coberturaId?: number;
  decoracoes?: number[];    
}

// ATUALIZADO: Produto principal com massas
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  ativo: boolean;
  imagem: string | null;
  tamanhos: ProdutoTamanho[];
  massas: ProdutoMassa[];        // NOVO: Massas disponíveis
  recheios: ProdutoRecheio[];
  coberturas: ProdutoCobertura[];
  decoracoes?: ProdutoDecoracao[]; // Opcional pois nem todos produtos têm decorações
}