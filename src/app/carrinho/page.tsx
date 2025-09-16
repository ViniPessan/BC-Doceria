'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removerItem, aumentarQuantidade, diminuirQuantidade, limparCarrinho } from '@/store/slices/carrinhoSlice';
import { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { usePedido } from '@/hooks/usePedido';
import { Loading } from '../components/loading/Loading';




export default function CarrinhoPage() {
  const itens = useSelector((state: RootState) => state.carrinho.itens);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState<'retirada' | 'entrega' | ''>('');
  const [endereco, setEndereco] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erros, setErros] = useState({nome: false,pagamento: false,tipoEntrega: false,endereco: false});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const { enviarPedido, loading, erro } = usePedido();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Carregando carrinho..." />;
  }


  if (!itens || itens.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pb-30">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
            <ShoppingCart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-playfair font-bold text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text">
            Carrinho Vazio
          </h1>
          <p className="text-pink-200 text-lg sm:text-xl">
            Adicione alguns produtos ao seu carrinho para continuar
          </p>
        </div>
      </div>
    );
  }

  const totalCarrinho = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handleFazerPedido = async () => {
  setTentouEnviar(true);

  const novosErros = {
    nome: !nome.trim(),
    pagamento: !pagamento,
    tipoEntrega: !tipoEntrega,
    endereco: tipoEntrega === 'entrega' && !endereco.trim()
  };
  setErros(novosErros);

  if (Object.values(novosErros).some(Boolean)) {
    return document.querySelector('#formulario-pedido')?.scrollIntoView({ behavior: 'smooth' });
  }

  const sucesso = await enviarPedido({ nome, tipoEntrega: tipoEntrega.toUpperCase() as 'ENTREGA' | 'RETIRADA', endereco, pagamento, observacoes, itens });

  if (sucesso) {
    dispatch(limparCarrinho());
    setNome(''); setPagamento(''); 
    setTipoEntrega(''); 
    setEndereco(''); 
    setObservacoes('');
    setTentouEnviar(false);
  }
};


  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-playfair font-bold text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text pt-10 drop-shadow-[0_0_10px_#f4289157]">
          Carrinho
        </h1>
        <p className="text-pink-200 min-[320px]:text-sm min-[341px]:text-base sm:text-xl mt-4">
          Revise seus itens antes de finalizar o pedido
        </p>
      </div>

      {/* Produtos do carrinho */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <div className="space-y-4 sm:space-y-4 md:space-y-6">
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
              <div className="flex flex-col sm:flex-row">
                {/* Imagem */}
                {item.imagem && (
                  <div className="relative sm:w-55 lg:w-70 xl:w-80 overflow-hidden">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110
                      sm:h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="flex-1 p-4 sm:px-4 py-2 space-y-2">
                  {/* Título e detalhes */}
                  <div>
                    <div className='flex justify-center sm:justify-start'>
                      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-white mb-2">
                        {item.nome}
                      </h2>
                    </div>
                    <div className="space-y-1 sm:space-y-0 text-sm sm:text-md md:text-[16px] lg:text-lg">
                      <div className="flex items-center">
                        <span className=" w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full mr-2"></span>
                        <span className="text-pink-200">Tamanho: {item.tamanho || 'Não selecionado'}</span>
                      </div>
                      {item.massa && (
                        <div className="flex items-center">
                          <span className=" w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Massa: {item.massa}</span>
                        </div>
                      )}
                      {item.recheios?.length ? (
                        <div className="flex items-center">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Recheios: {item.recheios.join(', ')}</span>
                        </div>
                      ) : null}
                      {item.cobertura ? (
                        <div className="flex items-center">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Coberturas: {item.cobertura}</span>
                        </div>
                      ) : null}
                      {item.decoracoes?.length ? (
                        <div className="flex items-center">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full mr-2"></span>
                          <span className="text-pink-200">Decorações: {item.decoracoes.join(', ')}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Quantidade e preço */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-1 py-0 md:p-2 lg:p-3 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center sm:mb-0 md:mb-1 lg:mb-2">
                      <span className="text-gray-300 font-medium sm:text-md md:text-[16px] lg:text-lg">Quantidade:</span>
                      <div className="flex items-center gap-1 sm:gap-3 ">
                        <div className="flex items-center sm:gap-2">
                          <button 
                            onClick={() => dispatch(diminuirQuantidade(item.id))}
                            disabled={item.quantidade <= 1}
                            className=" w-5 h-5 lg:w-8 lg:h-8
                             rounded-full justify-center flex items-center cursor-pointer 
                             bg-pink-400 text-black hover:bg-pink-500 disabled:bg-gray-400 
                             disabled:cursor-not-allowed transition-all duration-300 
                              hover:scale-110 transform active:scale-95"
                          >
                            <Minus className=" w-3 h-3 lg:w-4 lg:h-4" />
                          </button>
                          <span className="text-white font-bold w-8 sm:w-3 sm:text-lg lg:text-xl text-center">{item.quantidade}</span>
                          <button 
                            onClick={() => dispatch(aumentarQuantidade(item.id))}
                            className="w-5 h-5 lg:w-8 lg:h-8 cursor-pointer rounded-full bg-pink-400 text-black hover:bg-pink-500 transition-all duration-300 flex items-center justify-center hover:scale-110 transform active:scale-95"
                          >
                            <Plus className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium sm:text-md md:text-[16px] lg:text-lg">Subtotal:</span>
                      <span className="text-xl sm:text-lg lg:text-2xl font-bold text-pink-300">
                        R${(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => dispatch(removerItem(item.id))}
                    className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2  rounded-xl ml-auto cursor-pointer  bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-red-500/30 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total e Botão Limpar Carrinho */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-2 sm:p-4 rounded-xl border border-pink-500/30 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">Total:</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-300">
                R${totalCarrinho.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => dispatch(limparCarrinho())}
              className="flex items-center gap-2 px-2 cursor-pointer sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-red-500/30 font-medium"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Limpar Carrinho
            </button>
          </div>
        </div>



        {/* Formulário de finalização */}
        <div 
          id="formulario-pedido"
          className="
            bg-gradient-to-br from-gray-900 via-black to-gray-900
            rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-6
            shadow-xl border border-pink-500/30
          "
        >
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-300 text-center">
            Finalizar Pedido
          </h2>

          {tentouEnviar && Object.values(erros).some(erro => erro) && (
            <div className="p-4 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white rounded-xl border border-red-400/30 shadow-lg">
              <div className="font-semibold mb-2">⚠️ Verifique os campos obrigatórios:</div>
              <ul className="text-sm space-y-1">
                {erros.nome && <li>• Nome completo é obrigatório</li>}
                {erros.pagamento && <li>• Forma de pagamento é obrigatória</li>}
                {erros.tipoEntrega && <li>• Tipo de entrega é obrigatório</li>}
                {erros.endereco && <li>• Endereço é obrigatório para entrega</li>}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nome completo *"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className={`w-full p-2 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-800 text-white border-2 transition-all duration-300 placeholder-gray-400 ${
                  erros.nome && tentouEnviar 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                    : 'border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                }`}
              />
            </div>

            <div>
              <select
                value={pagamento}
                onChange={e => setPagamento(e.target.value)}
                className={`w-full p-2 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-800 text-white border-2 transition-all duration-300 ${
                  erros.pagamento && tentouEnviar 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                    : 'border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                }`}
              >
                <option value="" className="bg-gray-800">Forma de pagamento *</option>
                <option value="DINHEIRO" className="bg-gray-800">💵 Dinheiro</option>
                <option value="CARTAO" className="bg-gray-800">💳 Cartão</option>
                <option value="PIX" className="bg-gray-800">📱 Pix</option>
              </select>
            </div>

            <div>
              <select
                value={tipoEntrega}
                onChange={e => setTipoEntrega(e.target.value as 'retirada' | 'entrega')}
                className={`w-full p-2 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-800 text-white border-2 transition-all duration-300 ${
                  erros.tipoEntrega && tentouEnviar 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                    : 'border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                }`}
              >
                <option value="" className="bg-gray-800">Selecione entrega ou retirada *</option>
                <option value="retirada" className="bg-gray-800">🏪 Retirada</option>
                <option value="entrega" className="bg-gray-800">🚚 Entrega</option>
              </select>
            </div>

            {tipoEntrega === 'entrega' && (
              <div>
                <input
                  type="text"
                  placeholder="Endereço completo para entrega *"
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)}
                  className={`w-full p-2 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-800 text-white border-2 transition-all duration-300 placeholder-gray-400 ${
                    erros.endereco && tentouEnviar 
                      ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20' 
                      : 'border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                  }`}
                />
              </div>
            )}

            <div>
              <textarea
                placeholder="Observações (opcional)"
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                rows={4}
                className="w-full p-2 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-800 text-white border-2 border-gray-600 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleFazerPedido}
            disabled={loading}
            className={`
              w-auto mx-auto py-2 px-1 min-[375px]:px-3 sm:p-5 rounded-xl font-bold text-sm sm:text-2xl min-[425px]:text-lg
              transition-all duration-300 hover:scale-[1.02]
              transform active:scale-[0.98] shadow-lg
              flex items-center justify-center gap-1
              ${loading
                ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-300'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-green-500/30 cursor-pointer'
              }
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processando pedido...
              </>
            ) : (
              <>
                Finalizar Pedido no WhatsApp 
                <FontAwesomeIcon icon={faWhatsapp} size='lg'/>
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            * Campos obrigatórios
          </p>
        </div>
      </div>
    </div>
  );
}