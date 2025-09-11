import { Produto, SelecoesProduto } from "@/types/produto";

export const criarItemCarrinho = (
  produto: Produto,
  selecoes: SelecoesProduto = {}, // Padrão objeto vazio
  quantidade: number,
  precoTotal: number,
  allowMassas: boolean = false
) => {
  // Para produtos com tamanhos (bolos, docinhos)
  const tamanhoSelecionado = selecoes.tamanhoId 
    ? produto.tamanhos.find(t => t.id === selecoes.tamanhoId)
    : null;

  // Para produtos com massas (bolos caseiros)
  const massaSelecionada = allowMassas && selecoes.massaId
    ? produto.massas.find(m => m.id === selecoes.massaId)
    : undefined;

  // Para produtos com recheios (bolos)
  const recheiosSelecionados = selecoes.recheios?.length
    ? produto.recheios.filter(r => selecoes.recheios?.includes(r.id))
    : [];

  // Para produtos com coberturas (bolos)
  const coberturasSelecionadas = selecoes.coberturas?.length
    ? produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id))
    : [];

  // Para produtos com decorações (bolos de aniversário)
  const decoracoesSelecionadas = selecoes.decoracoes?.length
    ? (produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id)) || [])
    : [];

  return {
    id: Date.now(),
    produtoId: produto.id,
    nome: produto.nome,
    tipo: produto.categoria || "Produto",
    imagem: produto.imagem || "",
    quantidade,
    // Campos condicionais baseados no tipo de produto
    tamanho: tamanhoSelecionado?.tamanho,
    massa: massaSelecionada?.massa.nome,
    recheios: recheiosSelecionados.map(r => r.recheio.nome),
    cobertura: coberturasSelecionadas.map(c => c.cobertura.nome).join(", ") || undefined,
    decoracoes: decoracoesSelecionadas.map(d => d.decoracao.nome),
    preco: precoTotal
  };
};