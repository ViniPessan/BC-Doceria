// Tamanho de produto
export interface ProdutoTamanho {
  id: number;
  tamanho: string;
  preco: number;
  fatias: number | null;
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

export interface SelecoesProduto {
  tamanhoId?: number;
  recheios?: number[];      
  coberturaId?: number;
  massaId?: number;         
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
  recheios: ProdutoRecheio[];
  coberturas: ProdutoCobertura[];
  decoracoes?: ProdutoDecoracao[]; // Opcional pois nem todos produtos têm decorações
}