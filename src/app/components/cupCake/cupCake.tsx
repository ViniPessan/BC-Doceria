'use client'

import BoloCard from "../boloCard/boloCard";

export default function CupCake() {
  return (
       <div>
      {/* Bolo na Taça - baseado no cardápio */}
      <BoloCard 
        categoria="BOLO_TACA" 
        configuracao={{
          permiteMassa: false,              // NÃO escolhe massa
          quantidadeRecheios: 2,           // ESCOLHA 2 RECHEIOS
          sistemaCobertura: "normal",      // ESCOLHA 1 COBERTURA
          permiteDecoracoes: false,        // NÃO tem decorações
          titulo: "Bolos na Taça"
        }}
      />
    </div>
  );
}