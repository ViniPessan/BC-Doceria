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
