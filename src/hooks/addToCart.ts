import { useDispatch } from "react-redux";
import { adicionarItem } from "@/store/slices/carrinhoSlice";
import { criarItemCarrinho } from "@/utils/criarItemCarrinho";
import { Produto, SelecoesProduto } from "@/types/produto";

export function useCarrinho() {
  const dispatch = useDispatch();

  const addToCart = (
    produto: Produto,
    selecoes: SelecoesProduto = {},
    quantidade: number,
    precoTotal?: number, // Opcional, será calculado se não fornecido
    allowMassas: boolean = false
  ) => {
    // Para sobremesas e produtos simples, usar preço direto do produto se não fornecido
    const precoFinal = precoTotal || (produto.preco || 0);
    
    const novoItem = criarItemCarrinho(produto, selecoes, quantidade, precoFinal, allowMassas);
    dispatch(adicionarItem(novoItem));
  };

  return { addToCart };
}