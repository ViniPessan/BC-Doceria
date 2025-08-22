'use client'

import { fetchProdutos } from "../../services/produtoService";
import { Produto } from "../../../types/produto";
import { useState, useEffect } from "react";
import { calcularPrecoProduto, formatarBRL } from "@/utils/calcularPreco";

// Props do componente genérico baseado no cardápio real
interface BoloCardProps {
  categoria: "BOLO_ANIVERSARIO" | "BOLO_TACA" | "BOLO_CASEIRO";
  configuracao: {
    permiteMassa: boolean;
    quantidadeRecheios: number; // 0 = sem recheios, 2 = dois recheios
    sistemaCobertura: "normal" | "caseiro"; // normal = escolhe 1, caseiro = sistema especial
    permiteDecoracoes: boolean;
    titulo?: string;
  };
}

export default function BoloCard({ categoria, configuracao }: BoloCardProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado das seleções
  const [selecoes, setSelecoes] = useState<{
    [produtoId: number]: {
      tamanhoId?: number;
      massaId?: number;
      recheios?: number[];
      coberturaId?: number;
      decoracoes?: number[];
    }
  }>({});

  // Carregar produtos da categoria
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        const data = await fetchProdutos(categoria);
        setProdutos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    carregarProdutos();
  }, [categoria]);

  // Função para atualizar seleção de massa
  const handleMassaChange = (produtoId: number, massaId: number) => {
    setSelecoes(prev => ({
      ...prev,
      [produtoId]: {
        ...prev[produtoId],
        massaId: massaId
      }
    }));
  };

  // Função para atualizar seleção de recheio
  const handleRecheioChange = (produtoId: number, index: number, recheioId: number) => {
    setSelecoes(prev => {
      const prevRecheios = prev[produtoId]?.recheios || [];
      const novosRecheios = [...prevRecheios];
      novosRecheios[index] = recheioId;
      
      return {
        ...prev,
        [produtoId]: {
          ...prev[produtoId],
          recheios: novosRecheios
        }
      };
    });
  };

  // Função para atualizar seleção de cobertura
  const handleCoberturaChange = (produtoId: number, coberturaId: number) => {
    setSelecoes(prev => ({
      ...prev,
      [produtoId]: {
        ...prev[produtoId],
        coberturaId: coberturaId
      }
    }));
  };

  // Função para atualizar seleção de tamanho
  const handleTamanhoChange = (produtoId: number, tamanhoId: number) => {
    setSelecoes(prev => ({
      ...prev,
      [produtoId]: {
        ...prev[produtoId],
        tamanhoId: tamanhoId
      }
    }));
  };

  // Função para toggle de decoração
  const handleDecoracaoToggle = (produtoId: number, decoracaoId: number) => {
    setSelecoes(prev => {
      const prevDecoracoes = prev[produtoId]?.decoracoes || [];
      const jaExiste = prevDecoracoes.includes(decoracaoId);
      
      const novasDecoracoes = jaExiste 
        ? prevDecoracoes.filter(id => id !== decoracaoId)
        : [...prevDecoracoes, decoracaoId];
      
      return {
        ...prev,
        [produtoId]: {
          ...prev[produtoId],
          decoracoes: novasDecoracoes
        }
      };
    });
  };

  // Estados de loading e erro
  if (loading) return <p className="text-white text-center">Carregando produtos...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-6 p-4">
      <h2 className="text-3xl font-bold mb-6 text-pink-300">
        {configuracao.titulo || categoria.replace('_', ' ')}
      </h2>

      {/* Renderizar produtos */}
      {produtos.map((produto) => {
        const total = calcularPrecoProduto(produto, selecoes[produto.id] || {});

        return (
          <div key={produto.id} className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center text-pink-200">{produto.nome}</h3>
            
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            )}
            
            {produto.descricao && (
              <p className="text-gray-300 text-sm mb-4 text-center italic">{produto.descricao}</p>
            )}

            <div className="space-y-4">
              {/* TAMANHO - sempre presente */}
              <div>
                <label className="block font-semibold mb-2 text-pink-200">
                  {categoria === 'BOLO_CASEIRO' ? 'Opção:' : 'Tamanho:'}
                </label>
                <select
                  value={selecoes[produto.id]?.tamanhoId || ""}
                  onChange={(e) => handleTamanhoChange(produto.id, Number(e.target.value))}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:border-pink-400 focus:outline-none"
                >
                  <option value="">
                    {categoria === 'BOLO_CASEIRO' ? 'Selecione uma opção' : 'Selecione o tamanho'}
                  </option>
                  {produto.tamanhos.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.tamanho} - {formatarBRL(t.preco)}
                      {t.fatias && ` (${t.fatias} fatias)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* MASSA - condicional */}
              {configuracao.permiteMassa && produto.massas && produto.massas.length > 0 && (
                <div>
                  <label className="block font-semibold mb-2 text-pink-200">Massa do Bolo:</label>
                  <select
                    value={selecoes[produto.id]?.massaId || ""}
                    onChange={(e) => handleMassaChange(produto.id, Number(e.target.value))}
                    className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:border-pink-400 focus:outline-none"
                  >
                    <option value="">Selecione a massa</option>
                    {produto.massas.map((m) => (
                      <option key={m.massa.id} value={m.massa.id}>
                        {m.massa.nome}
                        {m.massa.precoExtra > 0 && ` (+${formatarBRL(m.massa.precoExtra)})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* RECHEIOS - baseado na quantidade */}
              {configuracao.quantidadeRecheios > 0 && Array.from({ length: configuracao.quantidadeRecheios }, (_, index) => (
                <div key={index}>
                  <label className="block font-semibold mb-2 text-pink-200">
                    Recheio {index + 1}:
                  </label>
                  <select
                    value={selecoes[produto.id]?.recheios?.[index] || ""}
                    onChange={(e) => handleRecheioChange(produto.id, index, Number(e.target.value))}
                    className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:border-pink-400 focus:outline-none"
                  >
                    <option value="">Selecione um recheio</option>
                    {produto.recheios.map((r) => (
                      <option key={r.recheio.id} value={r.recheio.id}>
                        {r.recheio.nome}
                        {r.recheio.precoExtra > 0 && ` (+${formatarBRL(r.recheio.precoExtra)})`}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* COBERTURA - sistema normal */}
              {configuracao.sistemaCobertura === "normal" && (
                <div>
                  <label className="block font-semibold mb-2 text-pink-200">Cobertura:</label>
                  <select
                    value={selecoes[produto.id]?.coberturaId || ""}
                    onChange={(e) => handleCoberturaChange(produto.id, Number(e.target.value))}
                    className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:border-pink-400 focus:outline-none"
                  >
                    <option value="">Selecione uma cobertura</option>
                    {produto.coberturas.map((c) => (
                      <option key={c.cobertura.id} value={c.cobertura.id}>
                        {c.cobertura.nome}
                        {c.cobertura.precoExtra > 0 && ` (+${formatarBRL(c.cobertura.precoExtra)})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* DECORAÇÕES - só 4 opções para bolo de aniversário */}
              {configuracao.permiteDecoracoes && produto.decoracoes && produto.decoracoes.length > 0 && (
                <div>
                  <label className="block font-semibold mb-2 text-pink-200">
                    Decorações (opcionais):
                  </label>
                  <div className="space-y-2 bg-gray-700 p-3 rounded-md">
                    {produto.decoracoes.map((d) => (
                      <label key={d.decoracao.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(selecoes[produto.id]?.decoracoes || []).includes(d.decoracao.id)}
                          onChange={() => handleDecoracaoToggle(produto.id, d.decoracao.id)}
                          className="w-4 h-4 text-pink-500 bg-gray-600 border-gray-500 rounded focus:ring-pink-400 focus:ring-2"
                        />
                        <span className="text-sm flex-1">
                          {d.decoracao.nome} - {formatarBRL(d.decoracao.preco)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PREÇO TOTAL E BOTÃO */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-pink-300">
                  Total: {formatarBRL(total)}
                </p>
              </div>
              <button
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
                onClick={() => {
                  console.log("Adicionado ao carrinho:", {
                    produto: produto.nome,
                    categoria: categoria,
                    selecoes: selecoes[produto.id],
                    total: total
                  });
                  alert(`${produto.nome} adicionado ao carrinho! Total: ${formatarBRL(total)}`);
                }}
              >
                Adicionar ao Carrinho 🛒
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}