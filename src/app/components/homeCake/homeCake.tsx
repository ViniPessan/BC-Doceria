'use client'

import BoloCard from "../boloCard/boloCard";

export default function HomeCake() {
  return (
    <BoloCard 
  categoria="BOLO_CASEIRO" 
  configuracao={{
    permiteMassa: true,                 // Escolhe massa (10 opções)
    quantidadeRecheios: 0,             // NÃO escolhe recheios específicos
    sistemaCobertura: "caseiro",       // Sistema especial (já no tamanho)
    permiteDecoracoes: false,          // NÃO tem decorações
    titulo: "Bolos Caseiros"
  }}
/>
  );
}