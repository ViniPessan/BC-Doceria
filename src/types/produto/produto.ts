// Tamanhos
export interface ProdutoTamanho {
  id: number;
  tamanho: string;
  preco: number;
  fatias: number | null;
  maxCoberturas?: number;
}

// Massa
export interface Massa {
  id: number;
  nome: string;
  tipo: string;
  precoExtra: number;
  ativo: boolean;
}

// Recheio
export interface Recheio {
  id: string | number;
  nome: string;
  ativo: boolean;
}

// Cobertura
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

// Produto principal
import { ProdutoMassa, ProdutoRecheio, ProdutoCobertura, ProdutoDecoracao } from './relacionamento';

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
