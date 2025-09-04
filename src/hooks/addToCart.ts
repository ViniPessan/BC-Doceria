import { useDispatch } from "react-redux";
import { adicionarItem } from "@/store/slices/carrinhoSlice";
import { criarItemCarrinho } from "@/utils/criarItemCarrinho";
import { Produto, SelecoesProduto } from "@/types/produto";

export function useCarrinho() {
  const dispatch = useDispatch();

  const addToCart = (
    produto: Produto,
    selecoes: SelecoesProduto,
    quantidade: number,
    precoTotal: number,
    allowMassas: boolean = false
  ) => {
    const novoItem = criarItemCarrinho(produto, selecoes, quantidade, precoTotal, allowMassas);
    dispatch(adicionarItem(novoItem));
  };

  return { addToCart };
}
