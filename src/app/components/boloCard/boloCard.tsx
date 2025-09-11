'use client'

import { useState, useEffect, useMemo } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Produto, SelecoesProduto, ItemCarrinhoData } from "@/types/produto/";
import { calcularPreco } from '@/utils/preco';
import { toggleItem } from "@/utils/toggleItem";
import { useCarrinho } from "@/hooks/addToCart";
import { Toast } from "../toastCard/toastCard"; 
import { useToast } from "@/hooks/useToast"; 
import { getTipoBolo, TipoBolo } from '@/utils/tipoBolo';
import { validarSelecoes } from "@/utils/validacoesBolo";

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

  /* Atualiza o preço sempre que seleções ou produto mudarem */
  useEffect(() => {
    setPrecoTotal(calcularPreco(produto, selecoes, allowMassas));
  }, [selecoes, produto, allowMassas]);

  /* Função para identificar o tipo de bolo */
  const tipoBolo: TipoBolo = getTipoBolo(produto.nome);
 

  /* Funções para alternar seleção de ingredientes */
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

/* Validação usada para habilitar/desabilitar botão e também dentro do handleAddToCart*/
const validacao = useMemo(() => {
  return validarSelecoes({
    selecoes,
    tipoBolo,
    maxRecheios,
    maxCoberturas,
    maxDecoracoes,
    allowMassas
  });
}, [selecoes, tipoBolo, maxRecheios, maxCoberturas, maxDecoracoes, allowMassas]);

  /* Adiciona ao carrinho com validação e toast */
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
  // Resetar quantidade também (se quiser)
  setQuantidade(1);
  
} catch (error) {
    showToast('Erro ao adicionar produto ao carrinho', 'error');
  }
};



  return (
    <>
      {/* Toast de notificação */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={hideToast}
      />

      <div className="flex justify-center p-2 sm:p-4 lg:p-6">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] border border-pink-500/30">
          
          {/* Imagem do produto */}
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
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-playfair font-bold text-white mb-2">{produto.nome}</h2>
              <p className="text-pink-200 text-xs sm:text-sm lg:text-lg leading-relaxed px-2">{produto.descricao}</p>
            </div>

            {/* Seções de personalização */}
            <div className="space-y-4 sm:space-y-5">

              {/* Tamanhos */}
              {produto.tamanhos.length > 0 && (
                <div>
                  <h3 className="text-pink-400 font-semibold mb-2 sm:mb-3 flex items-center text-sm lg:text-lg sm:text-base">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                    Tamanhos <span className="text-red-400 ml-1">*</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {produto.tamanhos.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSelecoes({ ...selecoes, tamanhoId: t.id })}
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 cursor-pointer hover:scale-[1.02] transform
                          ${selecoes.tamanhoId === t.id 
                            ? "border-pink-400 bg-pink-400/10 text-pink-300 shadow-lg shadow-pink-500/20" 
                            : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300 hover:bg-gray-800/50"
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="truncate">{t.tamanho}</span>
                          <div className="text-right ml-2 flex-shrink-0">
                            <div className="text-pink-300 font-bold">R${t.preco.toFixed(2)}</div>
                            {t.fatias && <div className="text-xs lg:text-sm text-gray-400">{t.fatias} fatias</div>}
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
                    Massas {getTipoBolo(produto.nome) === 'caseiro' && <span className="text-red-400 ml-1">*</span>}
                  </h3>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                    {produto.massas.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelecoes({ ...selecoes, massaId: m.id })}
                        className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 text-center cursor-pointer hover:scale-105 transform
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

              {/* Recheios, Coberturas e Decorações */}
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
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
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
                            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 text-[11px] sm:text-sm lg:text-base font-medium transition-all duration-300 text-center cursor-pointer hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                              ${isSelected 
                                ? "border-pink-400 bg-pink-400/20 text-pink-300 shadow-lg shadow-pink-500/20" 
                                : "border-gray-600 text-gray-300 hover:border-pink-400/50 hover:text-pink-300 hover:bg-gray-800/50"
                              }`}
                          >
                            <div className="truncate">
                              {nome}
                              {precoExtra > 0 && <span className="block sm:inline text-xs lg:text-base text-pink-300 sm:ml-1">+R${precoExtra.toFixed(2)}</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Quantidade e Preço */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-600">
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <span className="text-gray-300 font-medium text-sm sm:text-base">Quantidade:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 transform active:scale-95"
                    disabled={quantidade <= 1}
                  >
                    <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
                  </button>
                  <span className="text-white font-bold w-6 sm:w-8 text-center text-sm sm:text-base">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 transform active:scale-95"
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
              disabled={!validacao.valido}
              className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 text-white shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02] transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
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
