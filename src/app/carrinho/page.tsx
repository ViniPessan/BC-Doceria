'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removerItem, limparCarrinho } from '@/store/slices/carrinhoSlice';

export default function CarrinhoPage() {
  const itens = useSelector((state: RootState) => state.carrinho.itens);
  const dispatch = useDispatch();

  if (!itens || itens.length === 0) {
    return (
      <h1 className="text-4xl text-center mt-10 text-gray-300">
        O carrinho está vazio
      </h1>
    );
  }

  const totalCarrinho = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text text-center pt-10 drop-shadow-[0_0_10px_#f4289157]">
        Carrinho
      </h1>

      <button
        onClick={() => dispatch(limparCarrinho())}
        className="mb-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
      >
        Limpar Carrinho
      </button>

      {itens.map(item => (
        <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-gray-800 p-4 rounded-xl border border-pink-500/30 shadow-lg">
          {/* Imagem do produto */}
          {item.imagem && (
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-full sm:w-32 h-32 object-cover rounded-lg"
            />
          )}

          <div className="flex-1 flex flex-col justify-between">
           {/* Informações do produto */}
<div>
  <h2 className="text-xl font-bold text-white">{item.nome}</h2>
  <p className="text-gray-300">Tamanho: {item.tamanho || 'Não selecionado'}</p>

  {/* Mostrar massa somente se existir */}
  {item.massa && <p className="text-gray-300">Massa: {item.massa}</p>}

  {item.recheios?.length ? <p className="text-gray-300">Recheios: {item.recheios.join(', ')}</p> : null}
  {item.cobertura ? <p className="text-gray-300">Cobertura: {item.cobertura}</p> : null}
  {item.decoracoes?.length ? <p className="text-gray-300">Decorações: {item.decoracoes.join(', ')}</p> : null}
</div>


            {/* Quantidade e preço */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-white font-bold">Qtd: {item.quantidade}</span>
              <span className="text-pink-300 font-bold">R${(item.preco * item.quantidade).toFixed(2)}</span>
            </div>

            {/* Botão remover */}
            <button
              onClick={() => dispatch(removerItem(item.id))}
              className="mt-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition self-start"
            >
              Remover Item
            </button>
          </div>
        </div>
      ))}

      {/* Total do carrinho */}
      <div className="text-right mt-6 text-2xl font-bold text-pink-400">
        Total: R${totalCarrinho.toFixed(2)}
      </div>
    </div>
  );
}
