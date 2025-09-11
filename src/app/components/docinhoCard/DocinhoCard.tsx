'use client'

import { useState, useMemo } from "react";
import { Produto, ProdutoTamanho } from "@/types/produto";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Toast } from "../toastCard/toastCard";
import { useToast } from "@/hooks/useToast";
import { useCarrinho } from "@/hooks/addToCart";

interface DocinhoCardProps {
  docinho: Produto;
}

export function DocinhoCard({ docinho }: DocinhoCardProps) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<ProdutoTamanho | undefined>();
  const [quantidade, setQuantidade] = useState(1);

  const { toast, showToast, hideToast } = useToast();
  const { addToCart } = useCarrinho();

  const precoTotal = useMemo(() => {
    return (tamanhoSelecionado?.preco || 0) * quantidade;
  }, [tamanhoSelecionado, quantidade]);

  const handleAddToCart = () => {
    if (!tamanhoSelecionado) {
      showToast("Selecione um tamanho", "error");
      return;
    }

    try {
      addToCart(docinho, { tamanhoId: tamanhoSelecionado.id }, quantidade, tamanhoSelecionado.preco);
      showToast("Docinho adicionado ao carrinho! 🎉", "success");
      setQuantidade(1);
      setTamanhoSelecionado(undefined);
    } catch (err) {
      showToast("Erro ao adicionar ao carrinho", "error");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] border border-pink-500/30">
        
        {/* Imagem */}
        <div className="relative overflow-hidden">
          <img
            src={docinho.imagem || "/placeholder.jpg"}
            alt={docinho.nome}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-3 space-y-4">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-2">{docinho.nome}</h3>
          </div>

          {/* Tamanhos */}
          <div>
            <h4 className="text-pink-400 font-semibold mb-1 flex items-center text-base">
              <span className="w-1 h-1 bg-pink-400 rounded-full mr-1.5"></span>
              Tamanhos <span className="text-red-400 ml-1">*</span>
            </h4>
            <div className="space-y-2">
              {docinho.tamanhos.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTamanhoSelecionado(t)}
                  className={`w-full p-2 rounded border-2 text-base font-medium transition-all duration-300 cursor-pointer
                    ${tamanhoSelecionado?.id === t.id
                      ? "border-pink-400 bg-pink-400/15 text-pink-300"
                      : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{t.tamanho}</span>
                    <span className="text-pink-300 font-bold">R${t.preco.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade e Total */}
          <div className="bg-gray-800/60 p-2 rounded border border-gray-600/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-base">Quantidade:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  disabled={quantidade <= 1}
                  className="w-7 h-7 rounded bg-pink-400 text-black hover:bg-pink-500 flex items-center justify-center cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold text-base w-6 text-center">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(q => q + 1)}
                  className="w-7 h-7 rounded bg-pink-400 text-black hover:bg-pink-500 flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-base">Total:</span>
              <span className="text-pink-300 font-bold text-base">R${precoTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAddToCart}
            disabled={!tamanhoSelecionado}
            className="w-full py-3 rounded font-bold text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {tamanhoSelecionado ? "Adicionar ao carrinho" : "Selecione"}
          </button>
        </div>
      </div>

      {/* Toast - agora fora do card */}
      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={hideToast} />
    </>
  );
}
