
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  ativo: boolean;
  imagem: string | null;
  tamanhos: Array<{
    id: number;
    tamanho: string;
    preco: number;
    fatias: number | null;
  }>;
  recheios: Array<{
    id: number;
    recheio: {
      id: number;
      nome: string;
      precoExtra: number;
      ativo: boolean;
    };
  }>;
  coberturas: Array<{
    id: number;
    cobertura: {
      id: number;
      nome: string;
      precoExtra: number;
      ativo: boolean;
    };
  }>;
}