export default function Entrega() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-stone-300 mb-6">
            Entrega
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-pink-200 leading-relaxed max-w-3xl mx-auto">
            Conheça nossas opções de entrega e retirada para receber seus produtos com segurança e praticidade
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Opções de Entrega */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Entrega em Domicílio */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🚚</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400">
                Entrega em Domicílio
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Levamos seus produtos diretamente até você, com todo o cuidado e segurança que seus doces merecem.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Taxa de entrega: R$ 5,00 a R$ 15,00 (varia por região)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Pedido mínimo: R$ 50,00</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Horários: 8h às 18h (seg-sáb)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Raio de atendimento: 15km do centro</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Retirada na Loja */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏪</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400">
                Retirada na Loja
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Retire seu pedido diretamente em nossa loja e ainda economize na taxa de entrega!
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Sem taxa adicional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Sem pedido mínimo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Horários: 8h às 18h (seg-sáb)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Endereço: Rua dos Doces, 123 - Centro</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regiões Atendidas */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 sm:p-12 border border-pink-500/20 mb-16">
          <h2 className="text-3xl font-playfair font-bold text-pink-400 text-center mb-8">
            Regiões Atendidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { region: "Centro", taxa: "R$ 5,00", tempo: "30-45 min" },
              { region: "Vila Progresso", taxa: "R$ 7,00", tempo: "45-60 min" },
              { region: "Jardim Europa", taxa: "R$ 8,00", tempo: "45-60 min" },
              { region: "Alto da Colina", taxa: "R$ 10,00", tempo: "60-75 min" },
              { region: "Nova Dracena", taxa: "R$ 12,00", tempo: "60-75 min" },
              { region: "Outras regiões", taxa: "Consultar", tempo: "Consultar" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/40 rounded-xl p-6 text-center border border-pink-500/10">
                <h3 className="text-lg font-bold text-pink-300 mb-3">{item.region}</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-pink-400">Taxa:</span> {item.taxa}</p>
                  <p><span className="text-pink-400">Tempo:</span> {item.tempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações Importantes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Cuidados na Entrega */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-6">
              Cuidados na Entrega
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">✓</span>
                </div>
                <span>Produtos acondicionados em embalagens térmicas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">✓</span>
                </div>
                <span>Transporte refrigerado para manter a qualidade</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">✓</span>
                </div>
                <span>Entregadores treinados para manuseio cuidadoso</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">✓</span>
                </div>
                <span>Rastreamento em tempo real do seu pedido</span>
              </li>
            </ul>
          </div>

          {/* Política de Entrega */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h3 className="text-2xl font-playfair font-bold text-pink-400 mb-6">
              Política de Entrega
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">!</span>
                </div>
                <span>Entregas apenas em endereços residenciais e comerciais</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">!</span>
                </div>
                <span>Necessário ter alguém no local para receber</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">!</span>
                </div>
                <span>Tentativa de reentrega no mesmo dia, se necessário</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-400 text-xs">!</span>
                </div>
                <span>Confirmação de recebimento obrigatória</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contato para Entrega */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 sm:p-12 border border-pink-500/20 text-center">
          <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-8">
            Dúvidas sobre Entrega?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Entre em contato conosco para esclarecer qualquer dúvida sobre prazos, 
            regiões atendidas ou cuidados especiais para seu pedido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-2xl">📞</span>
              <span className="font-medium">(11) 99999-9999</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-2xl">💬</span>
              <span className="font-medium">WhatsApp disponível</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}