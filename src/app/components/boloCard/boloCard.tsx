'use client'

import { useState, useEffect } from "react";
import {
  Produto,
  SelecoesProduto,
  ProdutoTamanho,
  ProdutoMassa,
  ProdutoRecheio,
  ProdutoCobertura,
  ProdutoDecoracao,
  CalculoPreco,
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
    if (!selecoes.recheios) selecoes.recheios = [];
    const exists = selecoes.recheios.includes(id);
    if (exists) {
      setSelecoes({ ...selecoes, recheios: selecoes.recheios.filter(r => r !== id) });
    } else if (selecoes.recheios.length < maxRecheios) {
      setSelecoes({ ...selecoes, recheios: [...selecoes.recheios, id] });
    }
  }

  const toggleCobertura = (id: number) => {
    if (!selecoes.coberturas) selecoes.coberturas = [];
    const exists = selecoes.coberturas.includes(id);
    if (exists) {
      setSelecoes({ ...selecoes, coberturas: selecoes.coberturas.filter(c => c !== id) });
    } else if (selecoes.coberturas.length < maxCoberturas) {
      setSelecoes({ ...selecoes, coberturas: [...selecoes.coberturas, id] });
    }
  }

  const toggleDecoracao = (id: number) => {
    if (!selecoes.decoracoes) selecoes.decoracoes = [];
    const exists = selecoes.decoracoes.includes(id);
    if (exists) {
      setSelecoes({ ...selecoes, decoracoes: selecoes.decoracoes.filter(d => d !== id) });
    } else if (selecoes.decoracoes.length < maxDecoracoes) {
      setSelecoes({ ...selecoes, decoracoes: [...selecoes.decoracoes, id] });
    }
  }

  const handleAddToCart = () => {
    const item: ItemCarrinhoData = {
      produtoId: produto.id,
      quantidade: 1,
      tamanho: produto.tamanhos.find(t => t.id === selecoes.tamanhoId)?.tamanho,
      massa: allowMassas ? produto.massas.find(m => m.id === selecoes.massaId)?.massa.nome : undefined,
      recheios: produto.recheios.filter(r => selecoes.recheios?.includes(r.id)).map(r => r.recheio.nome),
      cobertura: produto.coberturas.filter(c => selecoes.coberturas?.includes(c.id)).map(c => c.cobertura.nome),
      decoracoes: produto.decoracoes?.filter(d => selecoes.decoracoes?.includes(d.id)).map(d => d.decoracao.nome) || [],
      preco: precoTotal
    }
    onAddToCart(item);
  }

  return (
    <div className="border p-4 rounded-lg shadow-md w-full max-w-md text-white">
      <img src={produto.imagem || "/placeholder.png"} alt={produto.nome} className="w-full h-48 object-cover rounded-md mb-4"/>
      <h2 className="text-xl font-semibold mb-2">{produto.nome}</h2>
      <p className="text-gray-600 mb-4">{produto.descricao}</p>

      {/* Tamanhos */}
      {produto.tamanhos.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium">Tamanhos:</h3>
          <div className="flex gap-2 flex-wrap mt-1">
            {produto.tamanhos.map(t => (
              <button
                key={t.id}
                onClick={() => setSelecoes({ ...selecoes, tamanhoId: t.id })}
                className={`px-3 py-1 border rounded ${
                  selecoes.tamanhoId === t.id ? "bg-pink-200 border-pink-400" : "border-gray-300"
                }`}
              >
                {t.tamanho} - R${t.preco} ({t.fatias || 0} fatias)
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
                className={`px-3 py-1 border rounded ${
                  selecoes.massaId === m.id ? "bg-pink-200 border-pink-400" : "border-gray-300"
                }`}
              >
                {m.massa.nome} {m.massa.precoExtra > 0 && `(R$${m.massa.precoExtra})`}
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
                className={`px-3 py-1 border rounded ${
                  selecoes.recheios?.includes(r.id) ? "bg-pink-200 border-pink-400" : "border-gray-300"
                }`}
              >
                {r.recheio.nome} {r.precoExtra > 0 && `(R$${r.precoExtra})`}
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
                className={`px-3 py-1 border rounded ${
                  selecoes.coberturas?.includes(c.id) ? "bg-pink-200 border-pink-400" : "border-gray-300"
                }`}
              >
                {c.cobertura.nome} {c.precoExtra > 0 && `(R$${c.precoExtra})`}
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
                className={`px-3 py-1 border rounded ${
                  selecoes.decoracoes?.includes(d.id) ? "bg-pink-200 border-pink-400" : "border-gray-300"
                }`}
              >
                {d.decoracao.nome} (R${d.decoracao.preco})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preço total */}
      <p className="font-bold text-lg mt-2">Total: R${precoTotal}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-pink-400 text-white font-semibold py-2 rounded hover:bg-pink-500 transition"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
