// src/utils/calcularPreco.ts
import { Produto, SelecoesProduto } from "../types/produto";



export function calcularPrecoProduto(produto: Produto, selecoes: SelecoesProduto) {
  const tamanho = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
  const r1 = produto.recheios.find(r => r.recheio.id === selecoes.recheios?.[0]);
  const r2 = produto.recheios.find(r => r.recheio.id === selecoes.recheios?.[1]);
  const cobertura = produto.coberturas.find(c => c.cobertura.id === selecoes.coberturaId);

  return (
    (tamanho?.preco || 0) +
    (r1?.recheio.precoExtra || 0) +
    (r2?.recheio.precoExtra || 0) +
    (cobertura?.cobertura.precoExtra || 0)
  );
}

export function formatarBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
