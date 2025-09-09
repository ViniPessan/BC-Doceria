import { useState } from 'react';
import { montarBodyPedido, montarMensagemWhatsApp } from '../utils/pedido';

interface ItemPedido {
  produtoId: number;
  nome: string;
  quantidade: number;
  preco: number;
  tamanho?: string;
  massa?: string;
  recheios?: string[];
  cobertura?: string;
  decoracoes?: string[];
}

interface UsePedidoProps {
  nome: string;
  tipoEntrega: 'ENTREGA' | 'RETIRADA';
  endereco?: string;
  pagamento: string;
  observacoes?: string;
  itens: ItemPedido[];
  telefoneLoja?: string; 
}

export const usePedido = () => {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const enviarPedido = async ({
    nome,
    tipoEntrega,
    endereco = '',
    pagamento,
    observacoes = '',
    itens,
    telefoneLoja = '5518997433503'
  }: UsePedidoProps) => {
    setLoading(true);
    setErro(null);

    try {
      // Monta body para backend
      const body = montarBodyPedido(nome, tipoEntrega, endereco, pagamento, observacoes, itens, 
        itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
      );

      // Envia para backend
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro ${response.status}`);
      }

      // Monta mensagem WhatsApp
      const mensagem = montarMensagemWhatsApp(
        nome,
        body.tipoPedido,
        endereco,
        body.formaPagamento,
        observacoes,
        itens,
        body.valorTotal
      );

      // Abre WhatsApp
      window.open(
        `https://api.whatsapp.com/send?phone=${telefoneLoja}&text=${encodeURIComponent(mensagem)}`,
        '_blank',
        'noopener,noreferrer'
      );

      return true;
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { enviarPedido, loading, erro };
};
