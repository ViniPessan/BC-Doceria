'use client'

import { useState, useEffect, useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import { Produto, SelecoesProduto, ItemCarrinhoData } from "@/types/produto/";
import { calcularPreco } from '@/utils/preco';
import { toggleItem } from "@/utils/toggleItem";
import { useCarrinho } from "@/hooks/addToCart";
import { Toast } from "../toastCard/toastCard"; 
import { useToast } from "@/hooks/useToast"; 
import { getTipoBolo, TipoBolo } from '@/utils/tipoBolo';
import { validarSelecoes } from "@/utils/validacoesBolo";
import { QuantidadeTotal } from "../quantidadeTotal/QuantidadeTotal";

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
  maxRecheios = 0,
  maxCoberturas = 0,
  maxDecoracoes = 0,
  allowMassas = false
}) => {
  const [precoTotal, setPrecoTotal] = useState<number>(produto.preco || 0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const { toast, showToast, hideToast } = useToast();
  const { addToCart } = useCarrinho();

  useEffect(() => {
    setPrecoTotal(calcularPreco(produto, selecoes, allowMassas));
  }, [selecoes, produto, allowMassas]);

  const tipoBolo: TipoBolo = getTipoBolo(produto.nome);

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

  const validacao = useMemo(() => {
    return validarSelecoes({
      selecoes,
      tipoBolo,
      maxRecheios,
      maxCoberturas,
      maxDecoracoes,
      allowMassas,
    });
  }, [selecoes, tipoBolo, maxRecheios, maxCoberturas, maxDecoracoes, allowMassas]);

  const handleAddToCart = () => {
    if (!validacao.valido) {
      showToast(validacao.mensagem, 'error');
      return;
    }

    try {
      addToCart(produto, selecoes, quantidade, precoTotal, allowMassas);
      showToast('Produto adicionado ao carrinho com sucesso! 🎉', 'success');
      setSelecoes({
        tamanhoId: undefined,
        massaId: undefined,
        recheios: [],
        coberturas: [],
        decoracoes: []
      });
      setQuantidade(1);
    } catch (error) {
      showToast('Erro ao adicionar produto ao carrinho', 'error');
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={hideToast}
      />

      <div className="flex justify-center mb-3 p-3 sm:p-5">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-4xl bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] border-2 border-pink-500/40">
          
          {/* layout flex < md, grid 2 colunas >= md */}
          <div className="flex flex-col md:grid md:grid-cols-2">

            {/* ESQUERDA - imagem + título/descrição */}
            <div className="flex flex-col">
              <div className="relative overflow-hidden">
                <img 
                  src={produto.imagem || "/placeholder.png"} 
                  alt={produto.nome} 
                  className="w-full h-auto sm:h-auto md:h-64 lg:h-80 rounded-2xl object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="p-2 sm:p-3 lg:p-4 flex flex-col gap-2 sm:gap-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-stone-300">
                  {produto.nome}
                </h2>
                <p className="text-pink-200 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  {produto.descricao}
                </p>

                {/* Quantidade e total - apenas desktop */}
                <div className="hidden md:block mt-2">
                  <QuantidadeTotal quantidade={quantidade} setQuantidade={setQuantidade} precoTotal={precoTotal} />
                </div>
              </div>
            </div>

            {/* DIREITA - opções de personalização */}
            <div className="p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3 md:overflow-y-auto md:max-h-[460px] lg:max-h-[520px] scrollbar-custom">
              <div className="space-y-2 sm:space-y-3">
                {/* tamanhos */}
                {produto.tamanhos.length > 0 && (
                  <div>
                    <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                      Tamanhos <span className="text-red-400 ml-1">*</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {produto.tamanhos.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setSelecoes({ ...selecoes, tamanhoId: t.id })}
                          className={`p-2 sm:px-3 sm:py-2 md:py-1 rounded-lg border-2 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer hover:scale-[1.02]
                            ${selecoes.tamanhoId === t.id 
                              ? "border-pink-400 bg-pink-400/10 text-pink-300 shadow-lg shadow-pink-500/20" 
                              : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300 hover:bg-gray-800/50"
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">{t.tamanho}</span>
                            <div className="text-right ml-2 flex-shrink-0">
                              <div className="text-pink-300 font-bold">R${t.preco.toFixed(2)}</div>
                              {t.fatias && <div className="text-xs text-gray-400">{t.fatias} fatias</div>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* massas */}
                {allowMassas && produto.massas.length > 0 && (
                  <div>
                    <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                      Massas {getTipoBolo(produto.nome) === 'caseiro' && <span className="text-red-400 ml-1">*</span>}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {produto.massas.map(m => (
                        <button
                          key={m.id}
                          onClick={() => setSelecoes({ ...selecoes, massaId: m.id })}
                          className={`px-2 sm:px-4 py-2 md:py-1 lg:py-2 rounded-full border-2 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer hover:scale-105
                            ${selecoes.massaId === m.id 
                              ? "border-pink-400 bg-pink-400/10 text-pink-300 shadow-lg shadow-pink-500/20" 
                              : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300 hover:bg-gray-800/50"
                            }`}
                        >
                          <div className="truncate">
                            {m.massa.nome}
                            {m.massa.precoExtra > 0 && <span className="block sm:inline text-xs text-pink-300 sm:ml-1">+R${m.massa.precoExtra.toFixed(2)}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* recheios/coberturas/decorações */}
                {['recheios', 'coberturas', 'decoracoes'].map((sec) => {
                  const itens = produto[sec as keyof Produto] as any[];
                  const max = sec === 'recheios' ? maxRecheios : sec === 'coberturas' ? maxCoberturas : maxDecoracoes;
                  const toggleFn = sec === 'recheios' ? toggleRecheio : sec === 'coberturas' ? toggleCobertura : toggleDecoracao;
                  const selecionados = selecoes[sec as keyof SelecoesProduto] as number[] | undefined;

                  if (!itens?.length || max === 0) return null;

                  return (
                    <div key={sec}>
                      <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                        {sec.charAt(0).toUpperCase() + sec.slice(1)}
                        <span className="text-xs text-gray-400 ml-2">({selecionados?.length || 0}/{max})</span>
                        {(['taca', 'aniversario'].includes(tipoBolo) && (sec !== 'decoracoes')) && <span className="text-red-400 ml-1">*</span>}
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {itens.map(item => {
                          const itemId = item.id;
                          const nome = item[sec === 'decoracoes' ? 'decoracao' : sec.slice(0, -1)].nome;
                          const precoExtra = item[sec === 'decoracoes' ? 'decoracao' : sec.slice(0, -1)].preco || item.precoExtra || 0;
                          const isSelected = selecionados?.includes(itemId);
                          const isDisabled = !isSelected && (selecionados?.length || 0) >= max;

                          return (
                            <button
                              key={itemId}
                              onClick={() => toggleFn(itemId)}
                              disabled={isDisabled}
                              className={`px-3 py-2 sm:px-4 md:py-1 lg:py-2 rounded-full border-2 text-[11px] sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                                ${isSelected 
                                  ? "border-pink-400 bg-pink-400/20 text-pink-300 shadow-lg shadow-pink-500/20" 
                                  : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300 hover:bg-gray-800/50"
                                }`}
                            >
                              <div className="truncate">
                                {nome}
                                {precoExtra > 0 && <span className="inline text-[11px] sm:text-xs text-pink-300 sm:ml-1">+R${precoExtra.toFixed(2)}</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Quantidade e total - apenas mobile */}
                <div className="block md:hidden mt-2">
                  <QuantidadeTotal quantidade={quantidade} setQuantidade={setQuantidade} precoTotal={precoTotal} />
                </div>

              </div>
            </div>
          </div>

          {/* botão adicionar ao carrinho */}
          <div className="p-2 border-t border-gray-600">
            <button
              onClick={handleAddToCart}
              disabled={!validacao.valido}
              className="w-full py-2 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl md:rounded-md font-bold text-base sm:text-lg md:text-sm bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-white shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {validacao.valido ? 'Adicionar ao Carrinho' : validacao.mensagem}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
