'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removerItem, limparCarrinho } from '@/store/slices/carrinhoSlice';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

export default function CarrinhoPage() {
  const itens = useSelector((state: RootState) => state.carrinho.itens);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState<'retirada' | 'entrega' | ''>('');
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  if (!itens || itens.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
            <ShoppingCart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-playfair font-bold text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text">
            Carrinho Vazio
          </h1>
          <p className="text-pink-200 text-lg sm:text-xl">
            Adicione alguns doces ao seu carrinho para continuar
          </p>
        </div>
      </div>
    );
  }

  const totalCarrinho = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handleFazerPedido = () => {
    setErro('');

    if (!nome || !pagamento || !tipoEntrega) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (tipoEntrega === 'entrega' && !endereco) {
      setErro('Informe o endereço para entrega.');
      return;
    }

    setLoading(true);

    // Monta mensagem
    const mensagem = `
🍰 *Novo Pedido* 🍰

👤 Nome: ${nome}
💳 Pagamento: ${pagamento}
🚚 Tipo: ${tipoEntrega === 'retirada' ? 'Retirada no balcão' : 'Entrega'}
${tipoEntrega === 'entrega' ? `🏠 Endereço: ${endereco}` : ''}
📝 Observações: ${observacoes || 'Nenhuma'}

📦 *Itens:*
${itens
  .map(
    item =>
      `- ${item.nome} (${item.tamanho}) x${item.quantidade} = R$${(
        item.preco * item.quantidade
      ).toFixed(2)}`
  )
  .join('\n')}

💰 Total: R$${totalCarrinho.toFixed(2)}
`;

    // Abre WhatsApp
    const telefoneLoja = '55SEUNUMEROAQUI'; // exemplo: 5511999999999
    const url = `https://wa.me/${telefoneLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-playfair font-bold text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text pt-10 drop-shadow-[0_0_10px_#f4289157]">
          Carrinho
        </h1>
        <p className="text-pink-200 text-lg sm:text-xl mt-4">
          Revise seus itens antes de finalizar o pedido
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Botão limpar carrinho */}
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(limparCarrinho())}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-red-500/30 font-medium"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Limpar Carrinho
          </button>
        </div>

        {/* Lista de itens */}
        <div className="space-y-4 sm:space-y-6">
          {itens.map(item => (
            <div
              key={item.id}
              className="
                bg-gradient-to-br from-gray-900 via-black to-gray-900
                rounded-xl sm:rounded-2xl overflow-hidden
                shadow-xl hover:shadow-pink-500/20 
                transition-all duration-500 hover:scale-[1.01]
                border border-pink-500/30
              "
            >
              <div className="flex flex-col lg:flex-row">
                {/* Imagem */}
                {item.imagem && (
                  <div className="relative lg:w-72 xl:w-80 overflow-hidden">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-full h-48 sm:h-56 lg:h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 " />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="flex-1 p-4 sm:p-6 space-y-4">
                  {/* Título e detalhes */}
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white mb-2">
                      {item.nome}
                    </h2>
                    <div className="space-y-1 text-sm sm:text-base">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                        <span className="text-pink-200">Tamanho: {item.tamanho || 'Não selecionado'}</span>
                      </div>
                      {item.massa && (
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Massa: {item.massa}</span>
                        </div>
                      )}
                      {item.recheios?.length ? (
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Recheios: {item.recheios.join(', ')}</span>
                        </div>
                      ) : null}
                      {item.cobertura ? (
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Cobertura: {item.cobertura}</span>
                        </div>
                      ) : null}
                      {item.decoracoes?.length ? (
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Decorações: {item.decoracoes.join(', ')}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Quantidade e preço */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-3 sm:p-4 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-medium">Quantidade:</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-colors flex items-center justify-center opacity-50 cursor-not-allowed">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{item.quantidade}</span>
                          <button className="w-8 h-8 rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-colors flex items-center justify-center opacity-50 cursor-not-allowed">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Subtotal:</span>
                      <span className="text-xl sm:text-2xl font-bold text-pink-300">
                        R${(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => dispatch(removerItem(item.id))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-red-500/30 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 sm:p-6 rounded-xl border border-pink-500/30 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">Total Geral:</span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-300">
              R${totalCarrinho.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Formulário de finalização */}
        <div className="
          bg-gradient-to-br from-gray-900 via-black to-gray-900
          rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-6
          shadow-xl border border-pink-500/30
        ">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-300 text-center">
            Finalizar Pedido
          </h2>

          {erro && (
            <div className="p-4 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white rounded-xl border border-red-400/30 shadow-lg">
              {erro}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400"
            />

            <select
              value={pagamento}
              onChange={e => setPagamento(e.target.value)}
              className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Forma de pagamento</option>
              <option value="Dinheiro" className="bg-gray-800">Dinheiro</option>
              <option value="Cartão" className="bg-gray-800">Cartão</option>
              <option value="Pix" className="bg-gray-800">Pix</option>
            </select>

            <select
              value={tipoEntrega}
              onChange={e => setTipoEntrega(e.target.value as 'retirada' | 'entrega')}
              className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Selecione entrega ou retirada</option>
              <option value="retirada" className="bg-gray-800">Retirada</option>
              <option value="entrega" className="bg-gray-800">Entrega</option>
            </select>

            {tipoEntrega === 'entrega' && (
              <input
                type="text"
                placeholder="Endereço para entrega"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400"
              />
            )}

            <textarea
              placeholder="Observações (opcional)"
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              rows={4}
              className="w-full p-3 sm:p-4 rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400 resize-none"
            />
          </div>

          <button
            onClick={handleFazerPedido}
            disabled={loading}
            className={`
              w-full py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl
              transition-all duration-300 hover:scale-[1.02]
              transform active:scale-[0.98] shadow-lg
              ${loading
                ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-300'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:shadow-pink-500/30'
              }
            `}
          >
            {loading ? 'Enviando pedido...' : 'Fazer Pedido via WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}