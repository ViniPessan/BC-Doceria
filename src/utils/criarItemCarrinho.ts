import { Produto, SelecoesProduto } from "@/types/produto";

export const criarItemCarrinho = (
  produto: Produto,
  selecoes: SelecoesProduto,
  quantidade: number,
  precoTotal: number,
  allowMassas: boolean = false
) => {
  const tamanhoSelecionado = produto.tamanhos.find(t => t.id === selecoes.tamanhoId)!;
  const massaSelecionada = allowMassas ? produto.massas.find(m => m.id === selecoes.massaId) : undefined;
  const recheiosSelecionados = produto.recheios.filter(r => selecoes.recheios?.includes(r.id));
  const coberturasSelecionadas = produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id));
  const decoracoesSelecionadas = produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id)) || [];

  return {
    id: Date.now(),
    produtoId: produto.id,
    nome: produto.nome,
    tipo: produto.categoria || "Bolo",
    imagem: produto.imagem || "",
    quantidade,
    tamanho: tamanhoSelecionado.tamanho,
    massa: massaSelecionada?.massa.nome,
    recheios: recheiosSelecionados.map(r => r.recheio.nome),
    cobertura: coberturasSelecionadas.map(c => c.cobertura.nome).join(", "),
    decoracoes: decoracoesSelecionadas.map(d => d.decoracao.nome),
    preco: precoTotal
  };
};
