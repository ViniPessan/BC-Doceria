import { Produto } from "../../types/produto";

export const fetchProdutos = async (categoria: string): Promise<Produto[]> => {
  const url = categoria? `/api/produtos?categoria=${categoria}` : '/api/produtos';

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  const data: Produto[] = await res.json();
  return data;
}