'use client'

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Produto } from '../../types/produto';



export default function Cup() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  
  // Estado do produto personalizado
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('');
  const [recheiosSelecionados, setRecheiosSelecionados] = useState<number[]>([]);
  const [coberturaSelecionada, setCoberturaSelecionada] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/produtos?categoria=BOLO_TACA');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      
      const data = await response.json();
      setProdutos(data);
      
      if (data.length > 0) {
        setProdutoSelecionado(data[0]);
        setTamanhoSelecionado(data[0].tamanhos[0]?.tamanho || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const toggleRecheio = (recheioId: number) => {
    setRecheiosSelecionados(prev => {
      if (prev.includes(recheioId)) {
        return prev.filter(id => id !== recheioId);
      } else if (prev.length < 2) {
        return [...prev, recheioId];
      }
      return prev;
    });
  };

  const calcularPreco = () => {
    if (!produtoSelecionado || !tamanhoSelecionado) return 0;

    const tamanho = produtoSelecionado.tamanhos.find(t => t.tamanho === tamanhoSelecionado);
    let precoBase = tamanho?.preco || 0;

    recheiosSelecionados.forEach(recheioId => {
      const recheioRelacao = produtoSelecionado.recheios.find(r => r.recheio.id === recheioId);
      if (recheioRelacao) {
        precoBase += recheioRelacao.recheio.precoExtra;
      }
    });

    if (coberturaSelecionada) {
      const coberturaRelacao = produtoSelecionado.coberturas.find(c => c.cobertura.id === coberturaSelecionada);
      if (coberturaRelacao) {
        precoBase += coberturaRelacao.cobertura.precoExtra;
      }
    }

    return precoBase * quantidade;
  };

  const adicionarAoCarrinho = () => {
    if (!produtoSelecionado || !tamanhoSelecionado || recheiosSelecionados.length === 0) {
      alert('Por favor, selecione um tamanho e pelo menos um recheio');
      return;
    }

    const item = {
      produto: produtoSelecionado,
      tamanho: tamanhoSelecionado,
      recheios: recheiosSelecionados,
      cobertura: coberturaSelecionada,
      quantidade,
      precoTotal: calcularPreco()
    };

    console.log('Item adicionado ao carrinho:', item);
    alert(`${produtoSelecionado.nome} adicionado ao carrinho!\nTotal: R$ ${calcularPreco().toFixed(2)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-pink-300 text-lg">Carregando bolos na taça...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-pink-900/20 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2 className="text-2xl font-bold mb-2">Erro</h2>
          <p>{error}</p>
          <button 
            onClick={fetchProdutos}
            className="mt-4 bg-pink-400 hover:bg-pink-500 px-6 py-2 rounded text-black font-semibold transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!produtoSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-pink-900/20 flex items-center justify-center">
        <p className="text-pink-300 text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Título centralizado */}
      <div className="text-center mt-15 mb-6">
        <h1 className="text-5xl font-bold text-white">
          Taça
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Imagem do produto */}
          <div className="lg:col-span-1">
            <div className="aspect-square rounded-lg overflow-hidden bg-pink-50/10 flex items-center justify-center mb-3">
              {produtoSelecionado.imagem ? (
                <img 
                  src={produtoSelecionado.imagem} 
                  alt={produtoSelecionado.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">🧁</div>
                  <p className="text-pink-300 text-sm">Imagem em breve</p>
                </div>
              )}
            </div>
            
            <div className="bg-pink-50/10 rounded-lg p-3">
              <h3 className="text-md font-bold text-pink-300 mb-1">{produtoSelecionado.nome}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{produtoSelecionado.descricao}</p>
              <p className="text-lg font-bold text-green-400 mt-2">
                R$ {calcularPreco().toFixed(2)}
              </p>
            </div>
          </div>

          {/* Configurações - grid 2 colunas */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Tamanho */}
            <div className="bg-pink-50/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-pink-300 mb-2">Tamanho</h3>
              {produtoSelecionado.tamanhos.map((tamanho) => (
                <label 
                  key={tamanho.id}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all text-xs mb-1 ${
                    tamanhoSelecionado === tamanho.tamanho 
                      ? 'bg-pink-400 text-black' 
                      : 'bg-pink-50/10 hover:bg-pink-50/20 text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="tamanho"
                      value={tamanho.tamanho}
                      checked={tamanhoSelecionado === tamanho.tamanho}
                      onChange={(e) => setTamanhoSelecionado(e.target.value)}
                      className="mr-2 scale-75"
                    />
                    <div>
                      <span className="font-semibold">{tamanho.tamanho}</span>
                      {tamanho.fatias && (
                        <span className="opacity-75 ml-1">({tamanho.fatias} fatias)</span>
                      )}
                    </div>
                  </div>
                  <span className="font-bold">R$ {tamanho.preco.toFixed(2)}</span>
                </label>
              ))}
            </div>

            {/* Recheios - Dropdown */}
            <div className="bg-pink-50/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-pink-300 mb-2">
                Recheios ({recheiosSelecionados.length}/2)
              </h3>
              
              {/* Primeiro Recheio */}
              <div className="mb-2">
                <label className="text-xs text-white/80 mb-1 block">1º Recheio:</label>
                <select
                  value={recheiosSelecionados[0] || ''}
                  onChange={(e) => {
                    const novoRecheio = parseInt(e.target.value);
                    if (novoRecheio) {
                      setRecheiosSelecionados(prev => [novoRecheio, prev[1]].filter(Boolean));
                    } else {
                      setRecheiosSelecionados(prev => prev.slice(1));
                    }
                  }}
                  className="w-full bg-pink-50/10 border border-pink-300/30 rounded p-2 text-xs text-white focus:border-pink-400 focus:outline-none"
                >
                  <option value="">Selecione um recheio</option>
                  {produtoSelecionado.recheios.map((item) => (
                    <option 
                      key={item.id} 
                      value={item.recheio.id}
                      style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                    >
                      {item.recheio.nome}{item.recheio.precoExtra > 0 && ` (+R${item.recheio.precoExtra})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Segundo Recheio */}
              <div>
                <label className="text-xs text-white/80 mb-1 block">2º Recheio:</label>
                <select
                  value={recheiosSelecionados[1] || ''}
                  onChange={(e) => {
                    const novoRecheio = parseInt(e.target.value);
                    if (novoRecheio) {
                      setRecheiosSelecionados(prev => [prev[0], novoRecheio].filter(Boolean));
                    } else {
                      setRecheiosSelecionados(prev => prev.slice(0, 1));
                    }
                  }}
                  className="w-full bg-pink-50/10 border border-pink-300/30 rounded p-2 text-xs text-white focus:border-pink-400 focus:outline-none"
                >
                  <option value="">Selecione um recheio</option>
                  {produtoSelecionado.recheios.map((item) => (
                    <option 
                      key={item.id} 
                      value={item.recheio.id}
                      style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                    >
                      {item.recheio.nome}{item.recheio.precoExtra > 0 && ` (+R${item.recheio.precoExtra})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cobertura - Dropdown */}
            <div className="bg-pink-50/10 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-pink-300 mb-2">Cobertura</h3>
              <select
                value={coberturaSelecionada || ''}
                onChange={(e) => setCoberturaSelecionada(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full bg-pink-50/10 border border-pink-300/30 rounded p-2 text-xs text-white focus:border-pink-400 focus:outline-none"
              >
                <option value="">Selecione uma cobertura</option>
                {produtoSelecionado.coberturas.map((item) => (
                  <option 
                    key={item.id} 
                    value={item.cobertura.id}
                    style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                  >
                    {item.cobertura.nome}{item.cobertura.precoExtra > 0 && ` (+R${item.cobertura.precoExtra})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantidade e Carrinho */}
            <div className="bg-pink-50/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-pink-300">Quantidade</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="w-6 h-6 rounded-full bg-pink-50/10 hover:bg-pink-400 hover:text-black flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-md font-bold w-4 text-center">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="w-6 h-6 rounded-full bg-pink-50/10 hover:bg-pink-400 hover:text-black flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={adicionarAoCarrinho}
                className="w-full bg-pink-400 hover:bg-pink-500 text-black font-bold py-2 px-3 rounded transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Carrinho - R$ {calcularPreco().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}