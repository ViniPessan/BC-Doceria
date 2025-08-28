'use client'

import { useState, useEffect } from "react";
import {
  Produto,
  SelecoesProduto,
  ItemCarrinhoData
} from "@/types/produto";

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

  useEffect(() => {
    const preco = calcularPreco();
    setPrecoTotal(preco);
  }, [selecoes]);

  function calcularPreco(): number {
    const tamanho = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
    const massa = allowMassas ? produto.massas.find(m => m.id === selecoes.massaId) : undefined;
    const recheios = produto.recheios.filter(r => selecoes.recheios?.includes(r.id));
    const coberturas = produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id));
    const decoracoes = produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id));

    const precoBase = tamanho?.preco || produto.preco || 0;
    const precoMassa = massa?.massa.precoExtra || 0;
    const precoRecheios = recheios.reduce((acc, r) => acc + r.precoExtra, 0);
    const precoCoberturas = coberturas.reduce((acc, c) => acc + c.precoExtra, 0);
    const precoDecoracoes = decoracoes?.reduce((acc, d) => acc + d.decoracao.preco, 0) || 0;

    return precoBase + precoMassa + precoRecheios + precoCoberturas + precoDecoracoes;
  }

  const toggleRecheio = (id: number) => {
    const recheiosAtuais = selecoes.recheios || [];
    const exists = recheiosAtuais.includes(id);
    
    let novosRecheios: number[];
    if (exists) {
      novosRecheios = recheiosAtuais.filter(r => r !== id);
    } else if (recheiosAtuais.length < maxRecheios) {
      novosRecheios = [...recheiosAtuais, id];
    } else {
      return;
    }
    
    setSelecoes({ ...selecoes, recheios: novosRecheios });
  }

  const toggleCobertura = (id: number) => {
    const coberturasAtuais = selecoes.coberturas || [];
    const exists = coberturasAtuais.includes(id);
    
    let novasCoberturas: number[];
    if (exists) {
      novasCoberturas = coberturasAtuais.filter(c => c !== id);
    } else if (coberturasAtuais.length < maxCoberturas) {
      novasCoberturas = [...coberturasAtuais, id];
    } else {
      return;
    }
    
    setSelecoes({ ...selecoes, coberturas: novasCoberturas });
  }

  const toggleDecoracao = (id: number) => {
    const decoracoesAtuais = selecoes.decoracoes || [];
    const exists = decoracoesAtuais.includes(id);
    
    let novasDecoracoes: number[];
    if (exists) {
      novasDecoracoes = decoracoesAtuais.filter(d => d !== id);
    } else if (decoracoesAtuais.length < maxDecoracoes) {
      novasDecoracoes = [...decoracoesAtuais, id];
    } else {
      return;
    }
    
    setSelecoes({ ...selecoes, decoracoes: novasDecoracoes });
  }

  const handleAddToCart = () => {
    const tamanhoSelecionado = produto.tamanhos.find(t => t.id === selecoes.tamanhoId);
    const massaSelecionada = allowMassas ? produto.massas.find(m => m.id === selecoes.massaId) : undefined;
    const recheiosSelecionados = produto.recheios.filter(r => selecoes.recheios?.includes(r.id));
    const coberturasSelecionadas = produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id));
    const decoracoesSelecionadas = produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id)) || [];

    const item: ItemCarrinhoData = {
      produtoId: produto.id,
      quantidade: 1,
      tamanho: tamanhoSelecionado!.tamanho,
      massa: massaSelecionada?.massa.nome,
      recheios: recheiosSelecionados.map(r => r.recheio.nome),
      cobertura: coberturasSelecionadas.map(c => c.cobertura.nome),
      decoracoes: decoracoesSelecionadas.map(d => d.decoracao.nome),
      preco: precoTotal
    }
    
    onAddToCart(item);
  }

  return (
    <div className="flex flex-col items-center m-2">
      <div className="
      flex flex-col border-1 border-pink-500 p-4 rounded-lg shadow-md 
      w-full max-w-md text-white
      bg-gradient-to-br from-black to-gray-900">
        <img 
          src={produto.imagem || "/placeholder.png"} 
          alt={produto.nome} 
          className="w-full h-55 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-playfair font-semibold mb-2">{produto.nome}</h2>
        <p className="text-gray-400 mb-4">{produto.descricao}</p>

        {/* Tamanhos */}
        {produto.tamanhos.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium">Tamanhos:</h3>
            <div className="flex gap-2 flex-wrap mt-1">
              {produto.tamanhos.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelecoes({ ...selecoes, tamanhoId: t.id })}
                  className={`px-3 py-1 border rounded text-sm  border-pink-500 ${
                    selecoes.tamanhoId === t.id 
                      ? "bg-pink-200 border-pink-400 text-black" 
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  {t.tamanho} - R${t.preco.toFixed(2)}
                  {t.fatias && ` (${t.fatias} fatias)`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Massas */}
        {allowMassas && produto.massas.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium">Massas:</h3>
            <div className="flex gap-2 flex-wrap mt-1">
              {produto.massas.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelecoes({ ...selecoes, massaId: m.id })}
                  className={`px-3 py-1 border border-pink-500 rounded text-sm ${
                    selecoes.massaId === m.id 
                      ? "bg-pink-200 border-pink-400 text-black" 
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  {m.massa.nome} 
                  {m.massa.precoExtra > 0 && ` (+R$${m.massa.precoExtra.toFixed(2)})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recheios */}
        {produto.recheios.length > 0 && maxRecheios > 0 && (
          <div className="mb-4">
            <h3 className="font-medium">Recheios (até {maxRecheios}):</h3>
            <div className="flex gap-2 flex-wrap mt-1">
              {produto.recheios.map(r => (
                <button
                  key={r.id}
                  onClick={() => toggleRecheio(r.id)}
                  disabled={!selecoes.recheios?.includes(r.id) && (selecoes.recheios?.length || 0) >= maxRecheios}
                  className={`px-3 py-1 border border-pink-500 rounded text-sm transition-all ${
                    selecoes.recheios?.includes(r.id)
                      ? "bg-pink-200 border-pink-400 text-black" 
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  {r.recheio.nome} 
                  {r.precoExtra > 0 && ` (+R$${r.precoExtra.toFixed(2)})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Coberturas */}
        {produto.coberturas.length > 0 && maxCoberturas > 0 && (
          <div className="mb-4">
            <h3 className="font-medium">Coberturas (até {maxCoberturas}):</h3>
            <div className="flex gap-2 flex-wrap mt-1">
              {produto.coberturas.map(c => (
                <button
                  key={c.id}
                  onClick={() => toggleCobertura(c.id)}
                  disabled={!selecoes.coberturas?.includes(c.id) && (selecoes.coberturas?.length || 0) >= maxCoberturas}
                  className={`px-3 py-1 border border-pink-500 rounded text-sm transition-all ${
                    selecoes.coberturas?.includes(c.id)
                      ? "bg-pink-200 border-pink-400 text-black" 
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  {c.cobertura.nome} 
                  {c.precoExtra > 0 && ` (+R$${c.precoExtra.toFixed(2)})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Decorações */}
        {produto.decoracoes && produto.decoracoes.length > 0 && maxDecoracoes > 0 && (
          <div className="mb-4">
            <h3 className="font-medium">Decorações (até {maxDecoracoes}):</h3>
            <div className="flex gap-2 flex-wrap mt-1">
              {produto.decoracoes.map(d => (
                <button
                  key={d.id}
                  onClick={() => toggleDecoracao(d.id)}
                  disabled={!selecoes.decoracoes?.includes(d.id) && (selecoes.decoracoes?.length || 0) >= maxDecoracoes}
                  className={`px-3 py-1 border border-pink-500 rounded text-sm transition-all ${
                    selecoes.decoracoes?.includes(d.id)
                      ? "bg-pink-200 border-pink-400 text-black" 
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  {d.decoracao.nome} (+R${d.decoracao.preco.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preço total */}
        <div className="bg-gray-800 p-3 rounded mb-4">
          <p className="font-bold text-lg">Total: R${precoTotal.toFixed(2)}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full font-semibold py-3 rounded bg-pink-400 text-black hover:bg-pink-500 hover:shadow-lg transition-all duration-200"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
