export default function ComoComprar() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-stone-300 mb-6">
            Como Comprar
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-pink-200 leading-relaxed max-w-3xl mx-auto">
            Siga nosso guia simples e prático para fazer seu pedido de forma rápida e segura
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Passo a Passo */}
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-8 text-center lg:text-left">
              Passo a Passo
            </h2>
            
            {[
              {
                step: "01",
                title: "Escolha seu produto",
                description: "Navegue pelo nosso catálogo e selecione o bolo ou doce desejado. Personalize conforme suas preferências."
              },
              {
                step: "02", 
                title: "Personalize seu pedido",
                description: "Escolha tamanho, sabores, recheios e decorações. Veja o preço sendo calculado em tempo real."
              },
              {
                step: "03",
                title: "Adicione ao carrinho",
                description: "Defina a quantidade e adicione o item ao carrinho. Continue comprando ou finalize seu pedido."
              },
              {
                step: "04",
                title: "Finalize a compra",
                description: "Revise seu pedido, escolha a forma de pagamento e confirme. Você receberá um e-mail de confirmação."
              },
              {
                step: "05",
                title: "Aguarde a entrega",
                description: "Acompanhe o status do seu pedido e aguarde a entrega no prazo combinado."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-300 mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Informações Importantes */}
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-8 text-center lg:text-left">
              Informações Importantes
            </h2>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
              <h3 className="text-xl font-bold text-pink-300 mb-4">Prazos de Entrega</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Bolos simples: 24-48 horas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Bolos personalizados: 3-5 dias úteis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Docinhos: 2-3 dias úteis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Pedidos urgentes: consulte disponibilidade</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
              <h3 className="text-xl font-bold text-pink-300 mb-4">Formas de Pagamento</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Cartão de crédito (até 12x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Cartão de débito</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>PIX (5% de desconto)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Dinheiro na entrega</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
              <h3 className="text-xl font-bold text-pink-300 mb-4">Pedido Mínimo</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Entrega: R$ 50,00</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Retirada: Sem valor mínimo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 sm:p-12 border border-pink-500/20">
          <h2 className="text-3xl font-playfair font-bold text-pink-400 text-center mb-8">
            Dicas para uma Compra Perfeita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Antecedência</h3>
              <p className="text-gray-300 text-sm">
                Faça seu pedido com antecedência para garantir disponibilidade na data desejada.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Detalhes</h3>
              <p className="text-gray-300 text-sm">
                Seja específico nas personalizações para garantir que seu bolo fique exatamente como deseja.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Contato</h3>
              <p className="text-gray-300 text-sm">
                Tem dúvidas? Entre em contato conosco pelo WhatsApp ou telefone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}