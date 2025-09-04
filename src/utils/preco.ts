import { Produto, SelecoesProduto } from "@/types/produto";

export const calcularPreco = (
  produto: Produto,
  selecoes: SelecoesProduto,
  allowMassas: boolean = false
): number => {
  const tamanho = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
  const massa = allowMassas ? produto.massas.find(m => m.id === selecoes.massaId) : undefined;
  const recheios = produto.recheios.filter(r => selecoes.recheios?.includes(r.id));
  const coberturas = produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id));
  const decoracoes = produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id));

  const precoBase = tamanho?.preco || produto.preco || 0;
  const precoMassa = massa?.massa.precoExtra || 0;
  const precoRecheios = recheios.reduce((acc, r) => acc + r.precoExtra, 0);
  const precoCoberturas = coberturas.reduce((acc, c) => acc + c.precoExtra, 0);
  const precoDecoracoes = decoracoes?.reduce((acc, d) => acc + d.decoracao.preco, 0) || 0;

  return precoBase + precoMassa + precoRecheios + precoCoberturas + precoDecoracoes;
};