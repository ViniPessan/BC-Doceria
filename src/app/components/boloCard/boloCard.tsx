'use client'

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import {Produto, SelecoesProduto, ItemCarrinhoData} from "@/types/produto";
import { calcularPreco } from '@/utils/preco';
import { toggleItem } from "@/utils/toggleItem";
import { useCarrinho } from "@/hooks/addToCart";


interface BoloCardProps {
  produto: Produto;
  selecoes: SelecoesProduto;
  setSelecoes: React.Dispatch<React.SetStateAction<SelecoesProduto>>;
  onAddToCart: (item: ItemCarrinhoData) => void;
  maxRecheios?: number;
  maxCoberturas?: number;
  maxDecoracoes?: number;
  allowMassas?: boolean;
}

export const BoloCard: React.FC<BoloCardProps> = ({
  produto,
  selecoes,
  setSelecoes,
  onAddToCart,
  maxRecheios = 0,
  maxCoberturas = 0,
  maxDecoracoes = 0,
  allowMassas = false
}) => {
  const [precoTotal, setPrecoTotal] = useState<number>(produto.preco || 0);
  const [quantidade, setQuantidade] = useState<number>(1);

useEffect(() => {
  setPrecoTotal(calcularPreco(produto, selecoes, allowMassas));
}, [selecoes])

  
  const toggleRecheio = (id: number) => {
  setSelecoes(prev => ({
    ...prev,
    recheios: toggleItem(id, prev.recheios, maxRecheios)
  }));
};

const toggleCobertura = (id: number) => {
  setSelecoes(prev => ({
    ...prev,
    coberturas: toggleItem(id, prev.coberturas, maxCoberturas)
  }));
};

const toggleDecoracao = (id: number) => {
  setSelecoes(prev => ({
    ...prev,
    decoracoes: toggleItem(id, prev.decoracoes, maxDecoracoes)
  }));
};

const { addToCart } = useCarrinho();

const handleAddToCart = () => {
  if (!selecoes.tamanhoId) return;
  addToCart(produto, selecoes, quantidade, precoTotal, allowMassas);
};

  return (
    <div className="flex justify-center p-2 sm:p-4 lg:p-6">
      <div className="
        w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
        bg-gradient-to-br from-gray-900 via-black to-gray-900
        rounded-xl sm:rounded-2xl overflow-hidden
        shadow-xl sm:shadow-2xl hover:shadow-pink-500/20 
        transition-all duration-500 hover:scale-[1.02]
        border border-pink-500/30
      ">
        {/* Header com imagem */}
        <div className="relative overflow-hidden">
          <img 
            src={produto.imagem || "/placeholder.png"} 
            alt={produto.nome} 
            className="w-full h-48 sm:h-56 md:h-64 lg:h-90 object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Título e descrição */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-playfair font-bold text-white mb-2">
              {produto.nome}
            </h2>
            <p className="text-pink-200 text-xs sm:text-sm lg:text-lg leading-relaxed px-2">
              {produto.descricao}
            </p>
          </div>

          {/* Seções de personalização */}
          <div className="space-y-4 sm:space-y-5">
            {/* Tamanhos */}
            {produto.tamanhos.length > 0 && (
              <div>
                <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm lg:text-lg sm:text-base">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 "></span>
                  Tamanhos
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {produto.tamanhos.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelecoes({ ...selecoes, tamanhoId: t.id })}
                      className={`
                        p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 text-xs sm:text-sm lg:text-base font-medium
                        transition-all duration-300
                        ${selecoes.tamanhoId === t.id 
                          ? "border-pink-400 bg-pink-400/10 text-pink-300 shadow-lg shadow-pink-500/20" 
                          : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{t.tamanho}</span>
                        <div className="text-right ml-2 flex-shrink-0">
                          <div className="text-pink-300 font-bold">R${t.preco.toFixed(2)}</div>
                          {t.fatias && (
                            <div className="text-xs lg:text-sm text-gray-400">{t.fatias} fatias</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Massas */}
            {allowMassas && produto.massas.length > 0 && (
              <div>
                <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  Massas
                </h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                  {produto.massas.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelecoes({ ...selecoes, massaId: m.id })}
                      className={`
                        px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-sm lg:text-base font-medium
                        transition-all duration-300 text-center
                        ${selecoes.massaId === m.id 
                          ? "border-pink-400 bg-pink-400/10 text-pink-300" 
                          : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                        }
                      `}
                    >
                      <div className="truncate">
                        {m.massa.nome}
                        {m.massa.precoExtra > 0 && (
                          <span className="block sm:inline text-xs text-pink-300 sm:ml-1">
                            +R${m.massa.precoExtra.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recheios */}
            {produto.recheios.length > 0 && maxRecheios > 0 && (
              <div>
                <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  Recheios 
                  <span className="text-xs text-gray-400 ml-2">
                    ({selecoes.recheios?.length || 0}/{maxRecheios})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                  {produto.recheios.map(r => (
                    <button
                      key={r.id}
                      onClick={() => toggleRecheio(r.id)}
                      disabled={!selecoes.recheios?.includes(r.id) && (selecoes.recheios?.length || 0) >= maxRecheios}
                      className={`
                        px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-sm lg:text-base font-medium
                        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center
                        ${selecoes.recheios?.includes(r.id)
                          ? "border-pink-400 bg-pink-400/20 text-pink-300 shadow-lg shadow-pink-500/20" 
                          : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                        }
                      `}
                    >
                      <div className="truncate">
                        {r.recheio.nome}
                        {r.precoExtra > 0 && (
                          <span className="block sm:inline text-xs lg:text-base text-pink-300 sm:ml-1">
                            +R${r.precoExtra.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Coberturas */}
            {produto.coberturas.length > 0 && maxCoberturas > 0 && (
              <div>
                <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm lg:text-lg sm:text-base">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  Coberturas
                  <span className="text-xs text-gray-400 ml-2">
                    ({selecoes.coberturas?.length || 0}/{maxCoberturas})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                  {produto.coberturas.map(c => (
                    <button
                      key={c.id}
                      onClick={() => toggleCobertura(c.id)}
                      disabled={!selecoes.coberturas?.includes(c.id) && (selecoes.coberturas?.length || 0) >= maxCoberturas}
                      className={`
                        px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-sm lg:text-base font-medium
                        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center
                        ${selecoes.coberturas?.includes(c.id)
                          ? "border-pink-400 bg-pink-400/20 text-pink-300 shadow-lg shadow-pink-500/20" 
                          : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                        }
                      `}
                    >
                      <div className="truncate">
                        {c.cobertura.nome}
                        {c.precoExtra > 0 && (
                          <span className="block sm:inline text-xs lg:text-base text-pink-300 sm:ml-1">
                            +R${c.precoExtra.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Decorações */}
            {produto.decoracoes && produto.decoracoes.length > 0 && maxDecoracoes > 0 && (
              <div>
                <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  Decorações
                  <span className="text-xs text-gray-400 ml-2">
                    ({selecoes.decoracoes?.length || 0}/{maxDecoracoes})
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                  {produto.decoracoes.map(d => (
                    <button
                      key={d.id}
                      onClick={() => toggleDecoracao(d.id)}
                      disabled={!selecoes.decoracoes?.includes(d.id) && (selecoes.decoracoes?.length || 0) >= maxDecoracoes}
                      className={`
                        px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-sm lg:text-base font-medium
                        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center
                        ${selecoes.decoracoes?.includes(d.id)
                          ? "border-pink-400 bg-pink-400/20 text-pink-300 shadow-lg shadow-pink-500/20" 
                          : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300"
                        }
                      `}
                    >
                      <div className="truncate">
                        {d.decoracao.nome}
                        <span className="block sm:inline text-xs lg:text-base text-pink-300 sm:ml-1">
                          +R${d.decoracao.preco.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantidade e Preço */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-600">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-300 font-medium text-sm sm:text-base">Quantidade:</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-colors flex items-center justify-center"
                  disabled={quantidade <= 1}
                >
                  <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
                <span className="text-white font-bold w-6 sm:w-8 text-center text-sm sm:text-base">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(quantidade + 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium text-sm sm:text-base">Total:</span>
              <span className="text-lg sm:text-2xl font-bold text-pink-300">
                R${(precoTotal * quantidade).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Botão adicionar ao carrinho */}
          <button
            onClick={handleAddToCart}
            disabled={!selecoes.tamanhoId}
            className="
              w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg
              bg-gradient-to-r from-pink-500 to-pink-600
              hover:from-pink-600 hover:to-pink-700
              disabled:from-gray-600 disabled:to-gray-700
              disabled:cursor-not-allowed disabled:opacity-50
              text-white shadow-lg hover:shadow-pink-500/30
              transition-all duration-300 hover:scale-[1.02]
              transform active:scale-[0.98]
            "
          >
            {!selecoes.tamanhoId ? 'Selecione um tamanho' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}