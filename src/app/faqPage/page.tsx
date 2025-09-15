'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Pedidos e Compras",
      items: [
        {
          question: "Qual é o prazo mínimo para fazer um pedido?",
          answer: "Para bolos simples, o prazo mínimo é de 24-48 horas. Para bolos personalizados e decorados, recomendamos 3-5 dias úteis. Em casos urgentes, consulte nossa disponibilidade."
        },
        {
          question: "Posso cancelar ou alterar meu pedido?",
          answer: "Sim, você pode cancelar ou alterar seu pedido até 24 horas antes da data de entrega. Após esse prazo, alterações podem não ser possíveis ou estar sujeitas a taxas adicionais."
        },
        {
          question: "Vocês fazem bolos para pessoas com restrições alimentares?",
          answer: "Sim! Oferecemos opções sem glúten, sem lactose, veganas e para diabéticos. Consulte nossa seção especial ou entre em contato para mais detalhes sobre ingredientes e disponibilidade."
        },
        {
          question: "Como funciona a personalização dos bolos?",
          answer: "Você pode escolher tamanho, massa, recheios, coberturas e decorações através do nosso site. Para personalizações mais específicas, entre em contato diretamente conosco."
        }
      ]
    },
    {
      category: "Entrega e Retirada",
      items: [
        {
          question: "Qual é o valor da taxa de entrega?",
          answer: "A taxa de entrega varia de R$ 5,00 a R$ 15,00, dependendo da região. Consulte nossa página de entrega para valores específicos por bairro."
        },
        {
          question: "Vocês entregam em qual horário?",
          answer: "Realizamos entregas de segunda a sábado, das 8h às 18h. Você pode escolher um horário preferencial durante o checkout."
        },
        {
          question: "E se eu não estiver em casa na hora da entrega?",
          answer: "Nosso entregador tentará contato por telefone. Caso não consiga entregar, faremos uma nova tentativa no mesmo dia. É importante ter alguém para receber o pedido."
        },
        {
          question: "Posso agendar a entrega para um horário específico?",
          answer: "Sim, você pode escolher uma janela de horário de 2 horas. Trabalhamos para ser pontuais, mas podem ocorrer pequenos atrasos devido ao trânsito."
        }
      ]
    },
    {
      category: "Pagamento",
      items: [
        {
          question: "Quais formas de pagamento vocês aceitam?",
          answer: "Aceitamos cartão de crédito (até 12x), cartão de débito, PIX (com 5% de desconto) e dinheiro na entrega. Para pagamentos online, utilizamos um sistema seguro."
        },
        {
          question: "Posso parcelar minha compra?",
          answer: "Sim, oferecemos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 100,00."
        },
        {
          question: "Como funciona o desconto do PIX?",
          answer: "Oferecemos 5% de desconto para pagamentos via PIX. O desconto é aplicado automaticamente no checkout quando você seleciona esta forma de pagamento."
        }
      ]
    },
    {
      category: "Produtos e Qualidade",
      items: [
        {
          question: "Vocês usam conservantes nos produtos?",
          answer: "Não utilizamos conservantes artificiais. Nossos produtos são feitos artesanalmente e devem ser consumidos dentro do prazo de validade informado."
        },
        {
          question: "Qual é a validade dos bolos?",
          answer: "Nossos bolos têm validade de 3-5 dias quando mantidos refrigerados. Bolos com frutas frescas devem ser consumidos em até 2 dias."
        },
        {
          question: "Como devo armazenar meu bolo?",
          answer: "Mantenha o bolo refrigerado e retire da geladeira 30 minutos antes de servir para melhor sabor e textura. Cubra bem para evitar ressecamento."
        },
        {
          question: "Posso visitar a cozinha onde os bolos são feitos?",
          answer: "Por questões de higiene e segurança alimentar, não permitimos visitas à área de produção. Porém, você pode conhecer nossa loja e falar conosco pessoalmente."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-stone-300 mb-6">
            Perguntas Frequentes
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-pink-200 leading-relaxed max-w-3xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 sm:p-8 border border-pink-500/20">
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-pink-400 mb-6 text-center">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="bg-gray-800/50 rounded-xl border border-pink-500/10 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-4 sm:p-6 text-left hover:bg-gray-800/70 transition-colors duration-200 flex items-center justify-between gap-4"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-pink-300">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-pink-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-pink-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="border-t border-pink-500/20 pt-4">
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 sm:p-12 border border-pink-500/20 text-center">
          <h2 className="text-3xl font-playfair font-bold text-pink-400 mb-6">
            Não encontrou sua resposta?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Nossa equipe está sempre pronta para ajudar! Entre em contato conosco 
            através dos canais abaixo e teremos prazer em esclarecer suas dúvidas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 rounded-xl p-6 border border-pink-500/10">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-pink-300 font-bold mb-2">Telefone</h3>
              <p className="text-gray-300 text-sm">(11) 99999-9999</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-pink-500/10">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-pink-300 font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-300 text-sm">Resposta rápida</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-6 border border-pink-500/10">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-pink-300 font-bold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">contato@docearia.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}