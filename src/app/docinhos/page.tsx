'use client'

import { useState, useEffect } from "react";
import { Produto } from "@/types/produto";
import { DocinhoCard } from "../components/docinhoCard/DocinhoCard";
import { fetchProdutos } from "../../services/produtoService";

export default function DocinhosPage() {
  const [docinhos, setDocinhos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDocinhos = async () => {
      try {
        const produtos = await fetchProdutos("DOCINHOS");
        setDocinhos(produtos);
      } catch (err) {
        console.error("Erro ao buscar docinhos:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarDocinhos();
  }, []);

  if (loading) return <p className="text-center mt-20 text-pink-300">Carregando docinhos...</p>;

  return (
    <main className="min-h-screen bg-black px-4 sm:px-6 pb-20">
      <div className="text-center mb-12 pt-6">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text pt-10 drop-shadow-[0_0_10px_#f4289157]">
          Docinhos
        </h1>
        <p className="text-pink-200 text-lg sm:text-xl mt-4">
          Pequenos momentos de felicidade em cada sabor
        </p>
      </div>

      <div className="max-w-md sm:max-w-7xl xl:max-w-[1400px] mx-auto grid grid-cols-1 min-[640px]:grid-cols-2 min-[980px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6 lg:gap-8">
        {docinhos.map(docinho => (
          <DocinhoCard key={docinho.id} docinho={docinho} />
        ))}
      </div>
    </main>
  );
}
