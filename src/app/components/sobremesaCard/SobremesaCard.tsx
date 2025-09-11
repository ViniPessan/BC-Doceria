'use client'

import { useState, useMemo } from "react";
import { Produto } from "@/types/produto";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Toast } from "../toastCard/toastCard";
import { useToast } from "@/hooks/useToast";
import { useCarrinho } from "@/hooks/addToCart";

interface SobremesaCardProps {
  sobremesa: Produto;
}

export function SobremesaCard({ sobremesa }: SobremesaCardProps) {
  const [quantidade, setQuantidade] = useState(0);

  const { toast, showToast, hideToast } = useToast();
  const { addToCart } = useCarrinho();

  const precoTotal = useMemo(() => {
    return (sobremesa.preco || 0) * quantidade;
  }, [sobremesa.preco, quantidade]);

  const handleAddToCart = () => {
    if (!sobremesa.preco) {
      showToast("Produto sem preço disponível", "error");
      return;
    }

    if (quantidade <= 0) {
      showToast("Selecione a quantidade desejada", "error");
      return;
    }

    try {
      // Usar o hook useCarrinho com seleções vazias e preço do produto
      addToCart(sobremesa, {}, quantidade, sobremesa.preco);
      showToast("Sobremesa adicionada ao carrinho! 🎉", "success");
      setQuantidade(0);
    } catch (err) {
      showToast("Erro ao adicionar ao carrinho", "error");
      console.error("Erro:", err);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] border border-pink-500/30">
        
        {/* Imagem */}
        <div className="relative overflow-hidden">
          <img
            src={sobremesa.imagem || "/placeholder.jpg"}
            alt={sobremesa.nome}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-3 space-y-4">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-2">
              {sobremesa.nome}
            </h3>
            <div className="text-2xl font-bold text-pink-300">
              R${sobremesa.preco?.toFixed(2) || '0.00'}
            </div>
          </div>

          {/* Quantidade e Total */}
          <div className="bg-gray-800/60 p-2 rounded border border-gray-600/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-base">Quantidade:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantidade(q => Math.max(0, q - 1))}
                  disabled={quantidade <= 0}
                  className="w-7 h-7 rounded bg-pink-400 text-black hover:bg-pink-500 flex items-center justify-center cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 transform active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold text-base w-6 text-center">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(q => q + 1)}
                  className="w-7 h-7 rounded bg-pink-400 text-black hover:bg-pink-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-base">Total:</span>
              <span className="text-pink-300 font-bold text-lg">R${precoTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAddToCart}
            disabled={!sobremesa.preco || quantidade <= 0}
            className="w-full py-3 rounded font-bold text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer hover:scale-[1.02] transform active:scale-[0.98]"
          >
            <ShoppingCart className="w-4 h-4" />
            {quantidade <= 0 ? "Selecione a quantidade" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>

      {/* Toast - Renderizado fora do card para evitar duplicação */}
      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={hideToast} />
    </>
  );
}