"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Cake, Candy, Utensils } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-1.5 min-[550px]:px-3 py-0.5 min-[550px]:py-1  
   font-bold transition-all duration-200 rounded-lg md:rounded-xl
  text-[10.5px] min-[375px]:text-[13px] min-[425px]:text-[14px] min-[550px]:text-[16px] min-[768px]:text-[18px] min-[1024px]:text-[20px] min-[1440px]:text-[24px] 
  ${
pathname === path
  ? "bg-transparent text-pink-300 shadow-sm  border border-pink-500"
  : "bg-transparent text-stone-300  border border-gray-300 hover:text-pink-300 hover:border-pink-500 hover:shadow-sm"
    }`;

  return (
    <header className="relative py-1 min-[375px]:p-2 min-[425px]:py-3 min-[550px]:py-3.5">

      <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-contain bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3">
        <div className="flex flex-col items-center mb-1 sm:mb-5">
          <img
            src="/logo1.png"
            alt="Logo"
            className="w-25 min-[375px]:w-30 min-[425px]:w-30 min-[550px]:w-35 min-[768px]:w-40 min-[1440px]:w-50 h-auto"
          />
          <p className="text-pink-300 bg-clip-text drop-shadow-[0_0_25px_#e91f98] font-playfair text-sm min-[375px]:text-[18px] min-[425px]:text-[20px] min-[550px]:text-[22px] min-[768px]:text-[24px] min-[1440px]:text-[28px] mb-2">
            Sua vida mais doce <span className="text-pink-50">✨</span>
          </p>
        </div>

        <nav className="flex justify-center py-3 font-playfair">
          <div className="flex flex-nowrap justify-center gap-2 min-[375px]:gap-3 min-[425px]:gap-4 min-[550px]:gap-7 min-[768px]:gap-10 min-[1024px]:gap-14 min-[1440px]:gap-16  w-full max-w-[320px]">
            <Link href="/" className={`flex items-center gap-0.5 min-[550px]:gap-2 ${linkClass("/")}`}>
              <Cake className="w-3 min-[425px]:w-4 min-[768px]:w-5 " />
              Bolos
            </Link>
            <Link href="/docinhos" className={`flex items-center gap-0.5 min-[550px]:gap-2 ${linkClass("/docinhos")}`}>
              <Candy className="w-3 min-[425px]:w-4 min-[768px]:w-5"/>
              Docinhos
            </Link>
            <Link href="/sobremesas" className={`flex items-center gap-0.5 min-[550px]:gap-2 ${linkClass("/sobremesas")}`}>
              <Utensils className="w-3  min-[425px]:w-4 min-[768px]:w-5"/>
              Sobremesas
            </Link>
            <Link href="/carrinho" className={`flex items-center gap-0.5 min-[550px]:gap-2 ${linkClass("/carrinho")}`}>
              <ShoppingCart className="w-3 min-[425px]:w-4 min-[768px]:w-5"/>
              Carrinho
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
