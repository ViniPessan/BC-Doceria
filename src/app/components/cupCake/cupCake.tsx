'use client'
import { BoloCard } from "../boloCard/boloCard";
import { useState, useEffect } from "react";
import { SelecoesProduto, Produto } from "@/types/produto";
import { fetchProdutos } from "../../../services/produtoService";

export const CupCake = () => {
  const [selecoes, setSelecoes] = useState<SelecoesProduto>({});
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const produtos = await fetchProdutos("BOLO_TACA");
        if (produtos.length > 0) setProduto(produtos[0]);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
      }
    };
    carregarProduto();
  }, []);

  const handleAddToCart = (item: any) => {
    console.log("Item adicionado ao carrinho:", item);
  };
  

  if (!produto) return null;

  return (
    <BoloCard
      produto={produto}
      selecoes={selecoes}
      setSelecoes={setSelecoes}
      onAddToCart={handleAddToCart}
      maxRecheios={2}
      maxCoberturas={1}
      allowMassas={false}
    />
  );
};
