'use client'

import { fetchProdutos } from "../../services/produtoService";
import { Produto } from "../../../types/produto";
import { useState, useEffect } from "react";
import { calcularPrecoProduto, formatarBRL } from "@/utils/calcularPreco";

export default function Cup() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selecoes, setSelecoes] = useState<{
  [produtoId: number]: {
    tamanhoId?: number;
    recheios?: number[];      // até 2 IDs
    coberturaId?: number;
    massaId?: number;          // só para aniversário
    decoracoes?: number[];     // só para aniversário
  }
}>({});
  

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

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-6">

      {/* Produtos */}
      {produtos.map((produto) => {
          const total = calcularPrecoProduto(produto, selecoes[produto.id] || {});

        
        return (
          <div key={produto.id} className="mb-6 p-4 border border-gray-600 rounded w-72">
            <h3 className="text-lg mb-2">{produto.nome}</h3>
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover mb-2"
              />
            )}

            {/* Tamanho */}
            <div className="mb-2">
              <p>Tamanho:</p>
              <select
                value={selecoes[produto.id]?.tamanhoId || ""}
                onChange={(e) =>
                  setSelecoes((prev) => ({
                    ...prev,
                    [produto.id]:{
                      ...prev[produto.id],
                      tamanhoId: Number(e.target.value),  
                        } 
                  }))
                }
                className="bg-gray-700 text-white p-2 rounded w-full mb-2"
              >
                <option value="">Selecione o tamanho</option>
                {produto.tamanhos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.tamanho} - {formatarBRL(t.preco)}
                  </option>
                ))}
              </select>
            </div>

            {/* Recheio 1 */}
            <div className="mb-2">
              <p>Recheio 1:</p>
              <select
              value={selecoes[produto.id]?.recheios?.[0] || ""}
              onChange={(e) =>
              setSelecoes(prev => {
              const prevRecheios = prev[produto.id]?.recheios || []
              const novoRecheios = [...prevRecheios]  // copia o array
              novoRecheios[0] = Number(e.target.value) // atualiza o recheio 1
              return {
              ...prev,
              [produto.id]: {
                ...prev[produto.id],
                recheios: novoRecheios
        }
      }
    })
  }
                className="bg-gray-700 text-white p-2 rounded w-full mb-2"
              >
                <option value="">Selecione um recheio</option>
                {produto.recheios.map((r) => (
                  <option key={r.recheio.id} value={r.recheio.id}>
                    {r.recheio.nome}{" "}
                    {r.recheio.precoExtra > 0 &&
                      `( + ${formatarBRL(r.recheio.precoExtra)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Recheio 2 */}
            <div className="mb-2">
              <p>Recheio 2:</p>
              <select
                value={selecoes[produto.id]?.recheios?.[1] || ""}
                onChange={(e) =>
                  setSelecoes(prev => {
                    const prevRecheios = prev[produto.id]?.recheios || []
                    const novoRecheios = [...prevRecheios]
                    novoRecheios[1] = Number(e.target.value) 
                    return {
                      ...prev,
                      [produto.id]: {
                        ...prev[produto.id],
                        recheios: novoRecheios
                      }
                    }
                  })
                }
                className="bg-gray-700 text-white p-2 rounded w-full mb-2"
              >
                <option value="">Selecione um recheio</option>
                {produto.recheios.map((r) => (
                  <option key={r.recheio.id} value={r.recheio.id}>
                    {r.recheio.nome}{" "}
                    {r.recheio.precoExtra > 0 &&
                      `( + ${formatarBRL(r.recheio.precoExtra)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Cobertura */}
            <div className="mb-2">
              <p>Cobertura:</p>
              <select
                value={selecoes[produto.id]?.coberturaId || ""}
                onChange={(e) =>
                  setSelecoes((prev) => ({
                    ...prev,
                    [produto.id]: {
                      ...prev[produto.id],
                      coberturaId: Number(e.target.value), 
                    },
                  }))
                }
                className="bg-gray-700 text-white p-2 rounded w-full mb-2"
              >
                <option value="">Selecione uma cobertura</option>
                {produto.coberturas.map((c) => (
                  <option key={c.cobertura.id} value={c.cobertura.id}>
                    {c.cobertura.nome}{" "}
                    {c.cobertura.precoExtra > 0 &&
                      `( + ${formatarBRL(c.cobertura.precoExtra)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço total */}
            <div>
              <p className="font-bold mt-2">
                Preço total: {formatarBRL(total)}
              </p>
              <button
                className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                onClick={() => console.log("Adicionado ao carrinho:", produto)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
