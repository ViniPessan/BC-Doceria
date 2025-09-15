export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-stone-300 mb-6">
            Política de Privacidade
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-pink-200 leading-relaxed max-w-3xl mx-auto">
            Transparência e proteção dos seus dados pessoais são fundamentais para nós
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Última atualização: Janeiro de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          
          {/* Seção 1 - Informações Gerais */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              1. Informações Gerais
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                A BC Docearia, pessoa jurídica de direito privado, está comprometida com a proteção 
                da privacidade e dos dados pessoais de seus usuários, clientes e visitantes.
              </p>
              <p>
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
                suas informações pessoais quando você utiliza nossos serviços, visita nossa loja 
                física ou interage conosco através de nossos canais digitais.
              </p>
              <p>
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política. 
                Se você não concordar com algum termo, pedimos que não utilize nossos serviços.
              </p>
            </div>
          </section>

          {/* Seção 2 - Informações Coletadas */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              2. Informações que Coletamos
            </h2>
            
            <h3 className="text-xl font-bold text-pink-300 mb-4">2.1 Informações Fornecidas Voluntariamente</h3>
            <ul className="space-y-2 text-gray-300 text-sm mb-6">
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Nome completo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Endereço de e-mail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Número de telefone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Endereço de entrega</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Preferências de produtos</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-pink-300 mb-4">2.2 Informações Coletadas Automaticamente</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Endereço IP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Informações do navegador</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Data e hora de acesso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 mt-1">•</span>
                <span>Páginas visitadas</span>
              </li>
            </ul>
          </section>

          {/* Seção 3 - Como Usamos suas Informações */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              3. Como Utilizamos suas Informações
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Utilizamos suas informações pessoais para:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Processar e entregar seus pedidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Comunicar sobre o status do pedido</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Fornecer atendimento ao cliente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Melhorar nossos produtos e serviços</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Enviar informações promocionais (com seu consentimento)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Cumprir obrigações legais</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Seção 4 - Compartilhamento de Informações */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              4. Compartilhamento de Informações
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros 
                para fins comerciais, exceto nas seguintes situações:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Prestadores de serviços (entrega, pagamento) necessários para completar sua compra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Quando exigido por lei ou autoridades competentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Para proteger nossos direitos legais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Com seu consentimento expresso</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Seção 5 - Segurança e Armazenamento */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              5. Segurança e Armazenamento
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Implementamos medidas técnicas e organizacionais apropriadas para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                Suas informações são armazenadas em servidores seguros e mantidas apenas pelo tempo 
                necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.
              </p>
              <p>
                Apesar de nossos esforços, nenhum sistema é completamente seguro. Encorajamos você 
                a também tomar precauções para proteger suas informações pessoais.
              </p>
            </div>
          </section>

          {/* Seção 6 - Seus Direitos */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              6. Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Confirmar a existência de tratamento de seus dados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Acessar seus dados pessoais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Corrigir dados incompletos, inexatos ou desatualizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Solicitar a exclusão de dados desnecessários</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Revogar o consentimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Obter informações sobre o compartilhamento de dados</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Seção 7 - Cookies */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              7. Cookies e Tecnologias Similares
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
                analisar como nossos serviços são utilizados e personalizar conteúdo.
              </p>
              <p>
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar 
                algumas funcionalidades do nosso site.
              </p>
            </div>
          </section>

          {/* Seção 8 - Contato */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              8. Contato
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Para exercer seus direitos, esclarecer dúvidas sobre esta política ou relatar 
                preocupações sobre privacidade, entre em contato conosco:
              </p>
              <div className="bg-gray-800/40 rounded-xl p-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-pink-300 font-semibold mb-2">E-mail:</p>
                    <p>contato@docearia.com</p>
                  </div>
                  <div>
                    <p className="text-pink-300 font-semibold mb-2">Telefone:</p>
                    <p>(11) 99999-9999</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-pink-300 font-semibold mb-2">Endereço:</p>
                    <p>Rua dos Doces, 123 - Centro - Dracena/SP</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 9 - Alterações */}
          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              9. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente para refletir 
                mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
              </p>
              <p>
                Recomendamos que você revise esta política regularmente. As alterações significativas 
                serão comunicadas através de nossos canais oficiais.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}