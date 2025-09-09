'use client'

import { useEffect, useState } from "react";
import { Produto, ProdutoTamanho } from "@/types/produto";
import { useCarrinho } from "@/hooks/addToCart";
import { Toast } from "../components/toastCard/toastCard";
import { useToast } from "@/hooks/useToast";

export default function DocinhosPage() {
  const [docinhos, setDocinhos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTamanhos, setSelectedTamanhos] = useState<{ [id: number]: ProdutoTamanho }>({});

  const { addToCart } = useCarrinho();
  const { toast, showToast, hideToast } = useToast();

  // Busca os docinhos
  useEffect(() => {
    async function fetchDocinhos() {
      try {
        const res = await fetch('/api/produtos?categoria=DOCINHOS');
        const data: Produto[] = await res.json();
        setDocinhos(data);

        // Inicializa tamanhos selecionados
        const inicial = data.reduce((acc, d) => {
          if (d.tamanhos.length > 0) acc[d.id] = d.tamanhos[0];
          return acc;
        }, {} as { [id: number]: ProdutoTamanho });
        setSelectedTamanhos(inicial);

      } catch (error) {
        console.error('Erro ao carregar docinhos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDocinhos();
  }, []);

  if (loading) return <p className="p-6">Carregando docinhos...</p>;

  return (
    <main className="p-6">
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text text-center pt-10 drop-shadow-[0_0_10px_#f4289157]">
        Docinhos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {docinhos.map(docinho => (
          <div key={docinho.id} className="bg-white shadow-lg rounded-xl overflow-hidden p-4 flex flex-col items-center">
            <img
              src={docinho.imagem || "/placeholder.jpg"}
              alt={docinho.nome}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{docinho.nome}</h3>

            <select
              className="border rounded-md p-1 mb-2"
              value={selectedTamanhos[docinho.id]?.id || 0}
              onChange={(e) => {
                const tamanho = docinho.tamanhos.find(t => t.id === Number(e.target.value));
                if (tamanho) {
                  setSelectedTamanhos(prev => ({ ...prev, [docinho.id]: tamanho }));
                }
              }}
            >
              {docinho.tamanhos.map(t => (
                <option key={t.id} value={t.id}>
                  {t.tamanho} - R$ {t.preco.toFixed(2)}
                </option>
              ))}
            </select>

            <button
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
              onClick={() => {
                const tamanhoSelecionado = selectedTamanhos[docinho.id];
                if (!tamanhoSelecionado) return;

                addToCart(
                  docinho,                          // produto
                  { tamanhoId: tamanhoSelecionado.id }, // seleções
                  1,                                 // quantidade
                  tamanhoSelecionado.preco            // preço total
                );

                showToast("Docinho adicionado ao carrinho!", "success");
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={hideToast}
      />
    </main>
  );
}
