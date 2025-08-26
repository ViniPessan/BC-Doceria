import React from 'react';
import { CalculoPreco } from '@/types/produto';
import { formatarPreco } from '@/utils/precoCalculator';

interface PrecoDisplayProps {
  calculo: CalculoPreco;
  mostrarDetalhamento?: boolean;
  className?: string;
}

export default function PrecoDisplay({ 
  calculo, 
  mostrarDetalhamento = false,
  className = ""
}: PrecoDisplayProps) {
  
  // Se não há preço base, não mostra nada
  if (calculo.precoBase === 0) {
    return (
      <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
        <p className="text-gray-500 text-center">
          Selecione as opções para ver o preço
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 border-green-200 rounded-lg p-4 ${className}`}>
      {/* Preço Total - Destaque */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold text-gray-800">
          Total:
        </span>
        <span className="text-2xl font-bold text-green-600">
          {formatarPreco(calculo.precoTotal)}
        </span>
      </div>

      {/* Detalhamento (opcional) */}
      {mostrarDetalhamento && (
        <>
          <hr className="my-3 border-gray-200" />
          <div className="space-y-2 text-sm">
            
            {/* Preço Base */}
            <div className="flex justify-between text-gray-600">
              <span>Preço base:</span>
              <span>{formatarPreco(calculo.precoBase)}</span>
            </div>

            {/* Massa (se houver) */}
            {calculo.precoMassa > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Massa especial:</span>
                <span>+ {formatarPreco(calculo.precoMassa)}</span>
              </div>
            )}

            {/* Recheios (se houver) */}
            {calculo.precoRecheios > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Recheios extras:</span>
                <span>+ {formatarPreco(calculo.precoRecheios)}</span>
              </div>
            )}

            {/* Cobertura (se houver) */}
            {calculo.precoCobertura > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Cobertura especial:</span>
                <span>+ {formatarPreco(calculo.precoCobertura)}</span>
              </div>
            )}

            {/* Decorações (se houver) */}
            {calculo.precoDecoracoes > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Decorações:</span>
                <span>+ {formatarPreco(calculo.precoDecoracoes)}</span>
              </div>
            )}

          </div>
        </>
      )}

      {/* Indicador visual de atualização */}
      <div className="mt-3 flex items-center justify-center text-xs text-green-600">
        <svg 
          className="w-3 h-3 mr-1 animate-pulse" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        </svg>
        Preço atualizado em tempo real
      </div>
    </div>
  );
}

// Componente alternativo para exibição compacta
export function PrecoCompacto({ calculo, className = "" }: PrecoDisplayProps) {
  if (calculo.precoBase === 0) {
    return (
      <span className={`text-gray-400 ${className}`}>
        Selecione as opções
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="text-2xl font-bold text-green-600">
        {formatarPreco(calculo.precoTotal)}
      </span>
      {calculo.precoTotal > calculo.precoBase && (
        <span className="ml-2 text-sm text-gray-500 line-through">
          {formatarPreco(calculo.precoBase)}
        </span>
      )}
    </div>
  );
}