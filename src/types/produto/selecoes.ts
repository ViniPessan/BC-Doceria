// Seleções do produto
export interface SelecoesProduto {
  tamanhoId?: number;
  massaId?: number;
  recheios?: number[];
  coberturas?: number[];
  decoracoes?: number[];
}

// Cálculo de preço
export interface CalculoPreco {
  precoBase: number;
  precoMassa: number;
  precoRecheios: number;
  precoCobertura: number;
  precoDecoracoes: number;
  precoTotal: number;
}
