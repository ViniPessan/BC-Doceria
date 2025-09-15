export default function Sobre() {
  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-stone-300 mb-6">
            Sobre Nós
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-pink-200 leading-relaxed max-w-3xl mx-auto">
            Conheça a história por trás da BC Docearia e nossa paixão por criar momentos doces e especiais
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Nossa História */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                A BC Docearia nasceu do sonho de transformar momentos simples em memórias especiais através do sabor único de nossos doces artesanais.
              </p>
              <p>
                Fundada em 2020, começamos como um pequeno negócio familiar com a missão de levar alegria e sabor para cada mesa, criando bolos e doces que despertam sorrisos e conectam pessoas.
              </p>
              <p>
                Hoje, somos reconhecidos pela qualidade de nossos produtos e pelo carinho com que tratamos cada pedido, mantendo sempre a tradição artesanal que nos define.
              </p>
            </div>
          </div>

          {/* Nossa Missão */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-pink-500/20">
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6">
              Nossa Missão
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Criar produtos de alta qualidade que transformem ocasiões especiais em momentos inesquecíveis, sempre priorizando o sabor, a apresentação e o atendimento personalizado.
              </p>
              <p>
                Acreditamos que cada bolo conta uma história e cada doce carrega um sentimento. Por isso, colocamos amor e dedicação em cada receita.
              </p>
              <p>
                Nosso compromisso é com a excelência, utilizando sempre ingredientes selecionados e técnicas artesanais que garantem o melhor resultado.
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 sm:p-12 border border-pink-500/20 mb-16">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-pink-400 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍰</span>
              </div>
              <h3 className="text-xl font-bold text-pink-300 mb-3">Qualidade</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Ingredientes selecionados e técnicas artesanais para garantir o melhor sabor em cada produto.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-pink-300 mb-3">Carinho</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Cada pedido é tratado com atenção especial, como se fosse para nossa própria família.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-pink-300 mb-3">Inovação</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sempre buscando novas receitas e apresentações para surpreender nossos clientes.
              </p>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-pink-400 mb-8">
            Nossa Equipe
          </h2>
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-pink-500/20">
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              Somos uma equipe apaixonada por confeitaria, formada por profissionais experientes que compartilham 
              o mesmo amor pela arte de fazer doces. Cada membro da nossa equipe contribui com sua expertise 
              para garantir que cada produto saia com a qualidade e o carinho que nossos clientes merecem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}