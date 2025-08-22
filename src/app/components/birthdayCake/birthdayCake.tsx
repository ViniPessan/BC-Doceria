'use client'

import BoloCard from "../boloCard/boloCard";

export default function BirthdayCake() {
  return (
    <BoloCard 
  categoria="BOLO_ANIVERSARIO" 
  configuracao={{
    permiteMassa: true,                 // Escolhe massa (4 opções)
    quantidadeRecheios: 2,             // ESCOLHA 2 RECHEIOS
    sistemaCobertura: "normal",        // ESCOLHA 1 COBERTURA  
    permiteDecoracoes: true,           // 4 decorações disponíveis
    titulo: "Bolos de Aniversário"
  }}
/>
  );
}