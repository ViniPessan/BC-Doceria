'use client'

import { useState, useEffect } from "react";
import { Produto } from "@/types/produto";
import { SobremesaCard } from "../components/sobremesaCard/SobremesaCard";
import { fetchProdutos } from "../../services/produtoService";

export default function SobremesasPage() {
  const [sobremesas, setSobremesas] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarSobremesas = async () => {
      try {
        const produtos = await fetchProdutos("SOBREMESAS");
        setSobremesas(produtos);
      } catch (err) {
        console.error("Erro ao buscar sobremesas:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarSobremesas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto"></div>
          <p className="text-pink-300 text-xl">Carregando sobremesas...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 sm:px-6 pb-20">
      <div className="text-center mb-12 pt-6">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text pt-10 drop-shadow-[0_0_10px_#f4289157]">
          Sobremesas
        </h1>
        <p className="text-pink-200 text-lg sm:text-xl mt-4">
          Deliciosas tentações para finalizar sua refeição
        </p>
      </div>

      <div className="max-w-md sm:max-w-7xl xl:max-w-[1400px] mx-auto grid grid-cols-1 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6 lg:gap-8">
        {sobremesas.map(sobremesa => (
          <SobremesaCard key={sobremesa.id} sobremesa={sobremesa} />
        ))}
      </div>

      {sobremesas.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-pink-200 text-xl">
            Nenhuma sobremesa disponível no momento
          </p>
        </div>
      )}
    </main>
  );
}