'use client'

import { useState, useEffect } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { Produto, SelecoesProduto, ItemCarrinhoData } from "@/types/produto";
import { useDispatch } from 'react-redux';
import { adicionarItem } from '@/store/slices/carrinhoSlice';
import { calcularPreco } from '@/utils/preco'; // ajuste o caminho conforme necessário

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
  const dispatch = useDispatch();

  // Atualiza o preço total sempre que seleções ou produto mudarem
  useEffect(() => {
    setPrecoTotal(calcularPreco(produto, selecoes, allowMassas));
  }, [selecoes, produto, allowMassas]);

  // Funções para alternar seleções
  const toggleRecheio = (id: number) => {
    const recheiosAtuais = selecoes.recheios || [];
    let novosRecheios = recheiosAtuais.includes(id)
      ? recheiosAtuais.filter(r => r !== id)
      : recheiosAtuais.length < maxRecheios
        ? [...recheiosAtuais, id]
        : recheiosAtuais;

    setSelecoes({ ...selecoes, recheios: novosRecheios });
  }

  const toggleCobertura = (id: number) => {
    const coberturasAtuais = selecoes.coberturas || [];
    let novasCoberturas = coberturasAtuais.includes(id)
      ? coberturasAtuais.filter(c => c !== id)
      : coberturasAtuais.length < maxCoberturas
        ? [...coberturasAtuais, id]
        : coberturasAtuais;

    setSelecoes({ ...selecoes, coberturas: novasCoberturas });
  }

  const toggleDecoracao = (id: number) => {
    const decoracoesAtuais = selecoes.decoracoes || [];
    let novasDecoracoes = decoracoesAtuais.includes(id)
      ? decoracoesAtuais.filter(d => d !== id)
      : decoracoesAtuais.length < maxDecoracoes
        ? [...decoracoesAtuais, id]
        : decoracoesAtuais;

    setSelecoes({ ...selecoes, decoracoes: novasDecoracoes });
  }

  // Adicionar ao carrinho
  const handleAddToCart = () => {
    if (!selecoes.tamanhoId) return;

    const tamanhoSelecionado = produto.tamanhos.find(t => t.id === selecoes.tamanhoId)!;
    const massaSelecionada = allowMassas ? produto.massas.find(m => m.id === selecoes.massaId) : undefined;
    const recheiosSelecionados = produto.recheios.filter(r => selecoes.recheios?.includes(r.id));
    const coberturasSelecionadas = produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id));
    const decoracoesSelecionadas = produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id)) || [];

    const novoItem = {
      id: Date.now(),
      produtoId: produto.id,
      nome: produto.nome,
      tipo: produto.categoria || 'Bolo',
      imagem: produto.imagem || '',
      quantidade,
      tamanho: tamanhoSelecionado.tamanho,
      massa: massaSelecionada?.massa.nome,
      recheios: recheiosSelecionados.map(r => r.recheio.nome),
      cobertura: coberturasSelecionadas.map(c => c.cobertura.nome).join(', '),
      decoracoes: decoracoesSelecionadas.map(d => d.decoracao.nome),
      preco: precoTotal
    };

    dispatch(adicionarItem(novoItem));
  };

  return (
    <div className="flex justify-center p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
                      bg-gradient-to-br from-gray-900 via-black to-gray-900
                      rounded-xl sm:rounded-2xl overflow-hidden
                      shadow-xl sm:shadow-2xl hover:shadow-pink-500/20
                      transition-all duration-500 hover:scale-[1.02]
                      border border-pink-500/30">
        {/* Header com imagem */}
        <div className="relative overflow-hidden">
          <img 
            src={produto.imagem || "/placeholder.png"} 
            alt={produto.nome} 
            className="w-full h-48 sm:h-56 md:h-64 lg:h-90 object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Conteúdo */}
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

          {/* Aqui ficariam todas as seções de Tamanhos, Massas, Recheios, Coberturas e Decorações */}
          {/* ...mantendo exatamente como você já tinha... */}

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
              transform active:scale-[0.98]"
          >
            {!selecoes.tamanhoId ? 'Selecione um tamanho' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}
