'use client'

import { BoloCard } from "../boloCard/boloCard";
import { useState, useEffect } from "react";
import { SelecoesProduto, Produto } from "@/types/produto";
import { fetchProdutos } from "../../../services/produtoService";

export const HomeCake = () => {
  const [selecoes, setSelecoes] = useState<SelecoesProduto>({});
  const [produto, setProduto] = useState<Produto | null>(null);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const produtos = await fetchProdutos("BOLO_CASEIRO");
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

  const getMaxCoberturas = () => {
    const tamanhoSelecionado = produto?.tamanhos.find(t => t.id === selecoes.tamanhoId);
    if (!tamanhoSelecionado) return 0;

    const match = tamanhoSelecionado.tamanho.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

    if (!produto) return null;

  return (
    <BoloCard
      produto={produto}
      selecoes={selecoes}
      setSelecoes={setSelecoes}
      onAddToCart={handleAddToCart}
      allowMassas={true}
      maxRecheios={0} // Bolo Caseiro não tem recheios
      maxCoberturas={getMaxCoberturas()} // Coberturas dinâmicas
      maxDecoracoes={0} // Sem decorações
    />
  );
};
