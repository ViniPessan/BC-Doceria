import React from 'react';
import { ProdutoTamanho } from '@/types/produto';
import { formatarPreco } from '@/utils/precoCalculator';

interface TamanhoSelectorProps {
  tamanhos: ProdutoTamanho[];
  selected?: number;
  onSelect: (id: number) => void;
  disabled?: boolean;
}

export default function TamanhoSelector({ 
  tamanhos, 
  selected, 
  onSelect, 
  disabled = false 
}: TamanhoSelectorProps) {
  
  if (!tamanhos || tamanhos.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-500 text-center">Nenhum tamanho disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">
        Escolha o tamanho *
      </h3>
      
      <div className="grid gap-3">
        {tamanhos.map((tamanho) => (
          <button
            key={tamanho.id}
            onClick={() => onSelect(tamanho.id)}
            disabled={disabled}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200
              ${selected === tamanho.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
              ${disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-sm cursor-pointer'
              }
            `}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">
                  {tamanho.tamanho}
                </h4>
                {tamanho.fatias && (
                  <p className="text-sm text-gray-500 mt-1">
                    Rende aproximadamente {tamanho.fatias} fatias
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <span className="text-xl font-bold text-green-600">
                  {formatarPreco(tamanho.preco)}
                </span>
              </div>
            </div>
            
            {/* Indicador visual de seleção */}
            {selected === tamanho.id && (
              <div className="mt-2 flex items-center text-blue-600">
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm font-medium">Selecionado</span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Informação adicional */}
      <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded">
        <p>* Campo obrigatório - Selecione um tamanho para continuar</p>
      </div>
    </div>
  );
}