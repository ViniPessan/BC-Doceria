'use client'

import { BirthdayCake } from "./components/birthdayCake/birthdayCake";
import { CupCake } from "./components/cupCake/cupCake";
import { HomeCake } from "./components/homeCake/homeCake";
import { useState, useEffect } from "react";
import { Loading } from "./components/loading/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Carregando bolos..." />;
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