import { Produto, SelecoesProduto } from "../types/produto";

export function calcularPrecoProduto(produto: Produto, selecoes: SelecoesProduto) {
  const tamanho = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
  const massa = produto.massas?.find(m => m.massa.id === selecoes.massaId);
  const r1 = produto.recheios.find(r => r.recheio.id === selecoes.recheios?.[0]);
  const r2 = produto.recheios.find(r => r.recheio.id === selecoes.recheios?.[1]);
  const cobertura = produto.coberturas.find(c => c.cobertura.id === selecoes.coberturaId);

  // Calcular preço das decorações se existirem
  let precoDecoracoes = 0;
  if (selecoes.decoracoes && produto.decoracoes) {
    selecoes.decoracoes.forEach(decoracaoId => {
      const decoracao = produto.decoracoes?.find(d => d.decoracao.id === decoracaoId);
      precoDecoracoes += decoracao?.decoracao.preco || 0;
    });
  }

  return (
    (tamanho?.preco || 0) +
    (massa?.massa.precoExtra || 0) +
    (r1?.recheio.precoExtra || 0) +
    (r2?.recheio.precoExtra || 0) +
    (cobertura?.cobertura.precoExtra || 0) +
    precoDecoracoes
  );
}

export function formatarBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}