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
}
