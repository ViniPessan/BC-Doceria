'use client'

import { BoloCard } from "../boloCard/boloCard";
import { useState, useEffect } from "react";
import { SelecoesProduto, Produto } from "@/types/produto";
import { fetchProdutos } from "../../../services/produtoService";

export const BirthdayCake = () => {
  const [selecoes, setSelecoes] = useState<SelecoesProduto>({});
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const produtos = await fetchProdutos("BOLO_ANIVERSARIO");
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
  
  if (!produto) return <p>Carregando...</p>;

  return (
    <BoloCard
      produto={produto}
      selecoes={selecoes}
      setSelecoes={setSelecoes}
      onAddToCart={handleAddToCart}
      maxRecheios={2}
      maxCoberturas={1}   
      maxDecoracoes={4}   
      allowMassas={false} 
    />
  );
};
