'use client'

import { fetchProdutos } from "../../services/produtoService";
import { Produto } from "../../types/produto";
import { useState, useEffect } from "react";

export default function Cup() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<{ [produtoId: number]: number | null }>({});
  const [recheio1, setRecheio1] = useState<{ [produtoId: number]: number | null }>({});
  const [recheio2, setRecheio2] = useState<{ [produtoId: number]: number | null }>({});
  const [coberturaSelecionada, setCoberturaSelecionada] = useState<{ [produtoId: number]: number | null }>({});

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        const data = await fetchProdutos("BOLO_TACA");
        setProdutos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    carregarProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  // Função simples que calcula o preço total de um produto
  const calcularPrecoTotal = (produto: Produto) => {
    const tamanho = produto.tamanhos.find(t => t.id === tamanhoSelecionado[produto.id]);
    const r1 = produto.recheios.find(r => r.recheio.id === recheio1[produto.id]);
    const r2 = produto.recheios.find(r => r.recheio.id === recheio2[produto.id]);
    const cobertura = produto.coberturas.find(c => c.cobertura.id === coberturaSelecionada[produto.id]);

    return (
      (tamanho?.preco || 0) +
      (r1?.recheio.precoExtra || 0) +
      (r2?.recheio.precoExtra || 0) +
      (cobertura?.cobertura.precoExtra || 0)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-6">

      {/* Produtos */}
      {produtos.map((produto) => (
        <div key={produto.id} className="mb-6 p-4 border border-gray-600 rounded w-72">
          <h3 className="text-lg mb-2">{produto.nome}</h3>
          {produto.imagem && <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover mb-2" />}

          {/* Tamanho */}
          <div className="mb-2">
            <p>Tamanho:</p>
            <select
              value={tamanhoSelecionado[produto.id] || ""}
              onChange={(e) => setTamanhoSelecionado(prev => ({ ...prev, [produto.id]: Number(e.target.value) }))}
              className="bg-gray-700 text-white p-2 rounded w-full mb-2"
            >
              <option value="">Selecione o tamanho</option>
              {produto.tamanhos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.tamanho} - R$ {t.preco}
                </option>
              ))}
            </select>
          </div>

          {/* Recheio 1 */}
          <div className="mb-2">
            <p>Recheio 1:</p>
            <select
              value={recheio1[produto.id] || ""}
              onChange={(e) => setRecheio1(prev => ({ ...prev, [produto.id]: Number(e.target.value) }))}
              className="bg-gray-700 text-white p-2 rounded w-full mb-2"
            >
              <option value="">Selecione um recheio</option>
              {produto.recheios.map((r) => (
                <option key={r.recheio.id} value={r.recheio.id}>
                  {r.recheio.nome} {r.recheio.precoExtra > 0 && `(R$ ${r.recheio.precoExtra})`}
                </option>
              ))}
            </select>
          </div>

          {/* Recheio 2 */}
          <div className="mb-2">
            <p>Recheio 2:</p>
            <select
              value={recheio2[produto.id] || ""}
              onChange={(e) => setRecheio2(prev => ({ ...prev, [produto.id]: Number(e.target.value) }))}
              className="bg-gray-700 text-white p-2 rounded w-full mb-2"
            >
              <option value="">Selecione um recheio</option>
              {produto.recheios.map((r) => (
                <option key={r.recheio.id} value={r.recheio.id}>
                  {r.recheio.nome} {r.recheio.precoExtra > 0 && `(R$ ${r.recheio.precoExtra})`}
                </option>
              ))}
            </select>
          </div>

          {/* Cobertura */}
          <div className="mb-2">
            <p>Cobertura:</p>
            <select
              value={coberturaSelecionada[produto.id] || ""}
              onChange={(e) => setCoberturaSelecionada(prev => ({ ...prev, [produto.id]: Number(e.target.value) }))}
              className="bg-gray-700 text-white p-2 rounded w-full mb-2"
            >
              <option value="">Selecione uma cobertura</option>
              {produto.coberturas.map((c) => (
                <option key={c.cobertura.id} value={c.cobertura.id}>
                  {c.cobertura.nome} {c.cobertura.precoExtra > 0 && `(R$ ${c.cobertura.precoExtra})`}
                </option>
              ))}
            </select>
          </div>

          {/* Preço total */}
          <div>
             <p className="font-bold mt-2">Preço total: R$ {calcularPrecoTotal(produto).toFixed(2)}</p>
             <button
              className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              onClick={() => console.log("Adicionado ao carrinho:", produto)}>
                Adicionar ao Carrinho
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}
