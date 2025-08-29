import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Heart,
  CreditCard,
  Smartphone,
  Banknote
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-20">
      {/* Background with overlay */}
   
      <div className="relative z-10 max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 min-[472px]:grid-cols-2 min-[768px]:grid-cols-4 gap-8 mb-8 justify-items-center">
          
          {/* Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-24 h-auto mb-3"
            />
            <p className="text-pink-300 text-center md:text-left text-sm font-medium italic mb-2">
              Sua vida mais doce ✨
            </p>
            <p className="text-white/80 text-center md:text-left text-xs leading-relaxed">
              Criando momentos especiais com os melhores bolos, docinhos e sobremesas artesanais.
            </p>
          </div>

          {/* Contato */}
          <div className="items-start ">
            <h3 className="text-pink-400 font-bold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <MapPin className="w-4 h-4 text-pink-300" />
                <span>Rua dos Doces, 123 - Centro</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Phone className="w-4 h-4 text-pink-300" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Mail className="w-4 h-4 text-pink-300" />
                <span>contato@docearia.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Clock className="w-4 h-4 text-pink-300" />
                <span>Seg-Sáb: 8h às 18h</span>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="items-start w-48">
            <h3 className="text-pink-400 font-bold text-lg mb-4">Links Úteis</h3>
            <div className="space-y-2">
              <Link href="/sobre" className="block text-white/80 hover:text-pink-300 text-sm transition-colors">
                Sobre Nós
              </Link>
              <Link href="/como-comprar" className="block text-white/80 hover:text-pink-300 text-sm transition-colors">
                Como Comprar
              </Link>
              <Link href="/entrega" className="block text-white/80 hover:text-pink-300 text-sm transition-colors">
                Entrega
              </Link>
              <Link href="/faq" className="block text-white/80 hover:text-pink-300 text-sm transition-colors">
                FAQ
              </Link>
              <Link href="/politica" className="block text-white/80 hover:text-pink-300 text-sm transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Redes Sociais e Pagamento */}
          <div className="items-start w-48">
            <h3 className="text-pink-400 font-bold text-lg mb-4">Siga-nos</h3>
            <div className="flex gap-3 mb-6">
              <Link href="#" className="bg-pink-50/10 hover:bg-pink-400 p-2 rounded-md transition-all duration-200 group">
                <Instagram className="w-5 h-5 text-white group-hover:text-black" />
              </Link>
              <Link href="#" className="bg-pink-50/10 hover:bg-pink-400 p-2 rounded-md transition-all duration-200 group">
                <Facebook className="w-5 h-5 text-white group-hover:text-black" />
              </Link>
            </div>
            
            <h4 className="text-pink-400 font-semibold text-sm mb-3">Formas de Pagamento</h4>
            <div className="flex gap-2 flex-wrap">
              <div className="bg-pink-50/10 p-2 rounded-md">
                <CreditCard className="w-5 h-5 text-pink-300" />
              </div>
              <div className="bg-pink-50/10 p-2 rounded-md">
                <Smartphone className="w-5 h-5 text-pink-300" />
              </div> <div className="bg-pink-50/10 p-2 rounded-md">
                <Banknote className="w-5 h-5 text-pink-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-pink-300/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center text-center">
               <p className="text-white/70 text-xs md:mb-0">
                © 2025 BC Docearia. Todos os direitos reservados.
              </p>
              <p className="text-white/70 text-xs mb-2 md:mb-0">Desenvolvido por
              <Link href="https://portifoliovpr.netlify.app/" className="underline px-1"
              >Vinicius Pessan</Link>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs">Feito com</span>
              <Heart className="w-3 h-3 text-pink-400 fill-current" />
              <span className="text-white/70 text-xs">para você</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}