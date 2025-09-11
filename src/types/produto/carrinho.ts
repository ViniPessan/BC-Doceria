// Item do carrinho
export interface ItemCarrinhoData {
  produtoId: number;
  quantidade: number;
  tamanho?: string;
  massa?: string;
  recheios: string[];
  cobertura?: string[];
  decoracoes: string[];
  preco: number;
}

export interface ItemCarrinho {
  id: number;
  produtoId: number;
  nome: string;
  tipo?: string;
  imagem?: string;
  quantidade: number;
  tamanho?: string;
  massa?: string;
  recheios?: string[];
  cobertura?: string;
  decoracoes?: string[];
  preco: number;
}