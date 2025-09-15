'use client'

import { Plus, Minus } from "lucide-react";

interface QuantidadeTotalProps {
  quantidade: number;
  setQuantidade: (valor: number) => void;
  precoTotal: number;
}

export function QuantidadeTotal({ quantidade, setQuantidade, precoTotal }: QuantidadeTotalProps) {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 py-2 sm:p-3 md:py-2 rounded-lg border border-gray-600">
      {/* Quantidade */}
      <div className="flex justify-between items-center mb-1 sm:mb-3 md:mb-2">
        <span className="text-gray-300 font-medium text-sm sm:text-base">Quantidade:</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-7 md:h-7 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-all duration-300 flex items-center justify-center"
            disabled={quantidade <= 1}
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3" />
          </button>
          <span className="text-white font-bold w-6 sm:w-8 text-center text-sm sm:text-base">
            {quantidade}
          </span>
          <button
            onClick={() => setQuantidade(quantidade + 1)}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-7 md:h-7 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-all duration-300 flex items-center justify-center"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-medium text-sm sm:text-base">Total:</span>
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-pink-300">
          R${(precoTotal * quantidade).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
