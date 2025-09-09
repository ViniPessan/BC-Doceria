import { Massa, Recheio, Cobertura, Decoracao } from './produto';

// Produto-Massa
export interface ProdutoMassa {
  id: number;
  massa: Massa;
}

// Produto-Recheio
export interface ProdutoRecheio {
  id: number;
  precoExtra: number;
  recheio: Recheio;
}

// Produto-Cobertura
export interface ProdutoCobertura {
  id: number;
  precoExtra: number;
  cobertura: Cobertura;
}

// Produto-Decoração
export interface ProdutoDecoracao {
  id: number;
  decoracao: Decoracao;
}
