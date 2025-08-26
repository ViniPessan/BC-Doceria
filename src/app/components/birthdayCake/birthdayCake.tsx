import React, { useState, useEffect } from 'react';
import { Produto, SelecoesProduto, CalculoPreco } from '@/types/produto';
import { calcularPrecoTotal, validarSelecoes, gerarResumoSelecoes } from '@/utils/precoCalculator';
import TamanhoSelector from '../shared/TamanhoSelector';
import PrecoDisplay from '../shared/PrecoDisplay';

interface BoloAniversarioProps {
  produto: Produto;
  onAddToCart?: (dados: any) => void;
}

export default function BirthdayCake({ produto, onAddToCart }: BoloAniversarioProps) {
  const [selecoes, setSelecoes] = useState<SelecoesProduto>({
    recheios: [],
    decoracoes: []
  });
  
  const [calculo, setCalculo] = useState<CalculoPreco>({
    precoBase: 0,
    precoMassa: 0,
    precoRecheios: 0,
    precoCobertura: 0,
    precoDecoracoes: 0,
    precoTotal: 0
  });

  // Recalcula preço sempre que seleções mudam
  useEffect(() => {
    const novoCalculo = calcularPrecoTotal(produto, selecoes);
    setCalculo(novoCalculo);
  }, [produto, selecoes]);

  // Handlers para seleções
  const handleTamanhoSelect = (tamanhoId: number) => {
    setSelecoes(prev => ({ ...prev, tamanhoId }));
  };

  const handleMassaSelect = (massaId: number) => {
    setSelecoes(prev => ({ ...prev, massaId }));
  };

  const handleRecheioToggle = (recheioId: number) => {
    setSelecoes(prev => {
      const recheiosAtuais = prev.recheios || [];
      const jaExiste = recheiosAtuais.includes(recheioId);
      
      let novosRecheios;
      if (jaExiste) {
        // Remove se já existe
        novosRecheios = recheiosAtuais.filter(id => id !== recheioId);
      } else if (recheiosAtuais.length < 2) {
        // Adiciona se há espaço (máximo 2)
        novosRecheios = [...recheiosAtuais, recheioId];
      } else {
        // Substitui o primeiro se já tem 2
        novosRecheios = [recheiosAtuais[1], recheioId];
      }
      
      return { ...prev, recheios: novosRecheios };
    });
  };

  const handleCoberturaSelect = (coberturaId: number) => {
    setSelecoes(prev => ({ ...prev, coberturaId }));
  };

  const handleDecoracaoToggle = (decoracaoId: number) => {
    setSelecoes(prev => {
      const decoracoesAtuais = prev.decoracoes || [];
      const jaExiste = decoracoesAtuais.includes(decoracaoId);
      
      const novasDecoracoes = jaExiste
        ? decoracoesAtuais.filter(id => id !== decoracaoId)
        : [...decoracoesAtuais, decoracaoId];
      
      return { ...prev, decoracoes: novasDecoracoes };
    });
  };

  const handleAddToCart = () => {
    const validacao = validarSelecoes('BOLO_ANIVERSARIO', selecoes);
    
    if (!validacao.valido) {
      alert('Por favor, complete todas as seleções obrigatórias:\n' + validacao.erros.join('\n'));
      return;
    }

    const dadosCarrinho = {
      produtoId: produto.id,
      quantidade: 1,
      ...selecoes,
      preco: calculo.precoTotal,
      resumo: gerarResumoSelecoes(produto, selecoes)
    };

    onAddToCart?.(dadosCarrinho);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header do Produto */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {produto.nome}
        </h1>
        <p className="text-gray-600 mb-4">
          {produto.descricao}
        </p>
        {produto.imagem && (
          <img 
            src={produto.imagem} 
            alt={produto.nome}
            className="w-64 h-64 object-cover rounded-lg mx-auto shadow-lg"
          />
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Coluna Esquerda - Seleções */}
        <div className="space-y-6">
          
          {/* 1. Tamanho */}
          <TamanhoSelector
            tamanhos={produto.tamanhos}
            selected={selecoes.tamanhoId}
            onSelect={handleTamanhoSelect}
          />

          {/* 2. Massa */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Escolha a massa *
            </h3>
            <div className="grid gap-2">
              {produto.massas?.map((produtoMassa) => (
                <button
                  key={produtoMassa.massa.id}
                  onClick={() => handleMassaSelect(produtoMassa.massa.id)}
                  className={`
                    p-3 rounded-lg border text-left transition-all
                    ${selecoes.massaId === produtoMassa.massa.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="font-medium">{produtoMassa.massa.nome}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Recheios */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Escolha 2 recheios *
            </h3>
            <p className="text-sm text-gray-500">
              Selecionados: {selecoes.recheios?.length || 0}/2
            </p>
            <div className="grid gap-2">
              {produto.recheios?.map((produtoRecheio) => (
                <button
                  key={produtoRecheio.recheio.id}
                  onClick={() => handleRecheioToggle(produtoRecheio.recheio.id)}
                  className={`
                    p-3 rounded-lg border text-left transition-all
                    ${selecoes.recheios?.includes(produtoRecheio.recheio.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{produtoRecheio.recheio.nome}</span>
                    {produtoRecheio.precoExtra > 0 && (
                      <span className="text-green-600 font-medium">
                        +R$ {produtoRecheio.precoExtra.toFixed(2)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Cobertura */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Escolha a cobertura *
            </h3>
            <div className="grid gap-2">
              {produto.coberturas?.map((produtoCobertura) => (
                <button
                  key={produtoCobertura.cobertura.id}
                  onClick={() => handleCoberturaSelect(produtoCobertura.cobertura.id)}
                  className={`
                    p-3 rounded-lg border text-left transition-all
                    ${selecoes.coberturaId === produtoCobertura.cobertura.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{produtoCobertura.cobertura.nome}</span>
                    {produtoCobertura.precoExtra > 0 && (
                      <span className="text-green-600 font-medium">
                        +R$ {produtoCobertura.precoExtra.toFixed(2)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Decorações (opcional) */}
          {produto.decoracoes && produto.decoracoes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Decorações (opcional)
              </h3>
              <div className="grid gap-2">
                {produto.decoracoes.map((produtoDecoracao) => (
                  <button
                    key={produtoDecoracao.decoracao.id}
                    onClick={() => handleDecoracaoToggle(produtoDecoracao.decoracao.id)}
                    className={`
                      p-3 rounded-lg border text-left transition-all
                      ${selecoes.decoracoes?.includes(produtoDecoracao.decoracao.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{produtoDecoracao.decoracao.nome}</span>
                      <span className="text-green-600 font-medium">
                        +R$ {produtoDecoracao.decoracao.preco.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita - Resumo e Preço */}
        <div className="space-y-6">
          <PrecoDisplay 
            calculo={calculo}
            mostrarDetalhamento={true}
          />

          {/* Botão Adicionar ao Carrinho */}
          <button
            onClick={handleAddToCart}
            disabled={calculo.precoTotal === 0}
            className={`
              w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all
              ${calculo.precoTotal > 0
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {calculo.precoTotal > 0 
              ? `Adicionar ao Carrinho - ${calculo.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
              : 'Complete as seleções'
            }
          </button>

          {/* Resumo das Seleções */}
          {calculo.precoTotal > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Resumo:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {gerarResumoSelecoes(produto, selecoes).map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}