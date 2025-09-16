'use client'

import { BirthdayCake } from "./components/birthdayCake/birthdayCake";
import { CupCake } from "./components/cupCake/cupCake";
import { HomeCake } from "./components/homeCake/homeCake";
import { useState, useEffect } from "react";
import { Loading } from "./components/loading/Loading";
import { fetchProdutos } from "../services/produtoService";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Carregando bolos...");

  useEffect(() => {
    const preCarregarTodosProdutos = async () => {
      try {
        setLoadingMessage("Carregando produtos...");
        
        // Pré-carrega todos os produtos antes de renderizar os componentes
        await Promise.all([
          fetchProdutos("BOLO_TACA"),
          fetchProdutos("BOLO_ANIVERSARIO"), 
          fetchProdutos("BOLO_CASEIRO")
        ]);

        setLoadingMessage("Preparando interface...");
        
        // Pequena pausa para garantir que tudo está pronto
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
      } catch (err) {
        console.error("Erro ao pré-carregar produtos:", err);
        setLoadingMessage("Erro ao carregar. Tentando novamente...");
        
        // Tenta novamente após erro
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    preCarregarTodosProdutos();
  }, []);

  if (isLoading) {
    return <Loading message={loadingMessage} />;
  }

  return (
    <div>
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-vibes text-transparent bg-gradient-to-r from-pink-200 via-pink-500 to-pink-700 bg-clip-text text-center pt-10 drop-shadow-[0_0_10px_#f4289157]">
        Bolos
      </h1>
      <CupCake/>
      <BirthdayCake/>
      <HomeCake/>
    </div>
  );
}