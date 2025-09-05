import { ItemCarrinho } from "@/store/slices/carrinhoSlice";

export interface DadosPedidoAPI {
  nomeCliente: string;
  telefone: string;
  endereco?: string;
  tipoPedido: string;
  formaPagamento: string;
  valorTotal: number;
  observacoes?: string;
  itens: ItemPedidoAPI[];
}

export interface ItemPedidoAPI {
  produtoId: number;
  quantidade: number;
  preco: number;
  tamanho?: string;
  massa?: string;
  recheios?: string[];
  cobertura?: string;
  decoracoes?: string[];
}

// Converte os itens do carrinho Redux para o formato da API
export const converterItensParaAPI = (itens: ItemCarrinho[]): ItemPedidoAPI[] => {
  return itens.map(item => ({
    produtoId: item.produtoId,
    quantidade: item.quantidade,
    preco: item.preco,
    tamanho: item.tamanho || undefined,
    massa: item.massa || undefined,
    recheios: item.recheios || [],
    cobertura: item.cobertura || undefined,
    decoracoes: item.decoracoes || [],
  }));
};

// Gera mensagem formatada para WhatsApp
export const gerarMensagemWhatsApp = (
  pedido: any, 
  itens: ItemCarrinho[], 
  dadosCliente: {
    nome: string;
    telefone: string;
    pagamento: string;
    tipoEntrega: string;
    endereco?: string;
    observacoes?: string;
  },
  totalCarrinho: number
): string => {
  return `🍰 *Novo Pedido BC Docearia* 🍰
*Pedido #${pedido.id}*

👤 *Cliente:* ${dadosCliente.nome}
📱 *Telefone:* ${dadosCliente.telefone}
💳 *Pagamento:* ${dadosCliente.pagamento}
🚚 *Tipo:* ${dadosCliente.tipoEntrega === 'retirada' ? 'Retirada no balcão' : 'Entrega'}
${dadosCliente.tipoEntrega === 'entrega' ? `🏠 *Endereço:* ${dadosCliente.endereco}` : ''}
${dadosCliente.observacoes ? `📝 *Observações:* ${dadosCliente.observacoes}` : ''}

📦 *Itens do Pedido:*
${itens
  .map(item => {
    let detalhes = `• *${item.nome}*`;
    if (item.tamanho) detalhes += ` (${item.tamanho})`;
    if (item.massa) detalhes += `\n  └ Massa: ${item.massa}`;
    if (item.recheios?.length) detalhes += `\n  └ Recheios: ${item.recheios.join(', ')}`;
    if (item.cobertura) detalhes += `\n  └ Cobertura: ${item.cobertura}`;
    if (item.decoracoes?.length) detalhes += `\n  └ Decorações: ${item.decoracoes.join(', ')}`;
    detalhes += `\n  └ Quantidade: ${item.quantidade}x`;
    detalhes += `\n  └ Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}`;
    return detalhes;
  })
  .join('\n\n')}

💰 *Total Geral: R$${totalCarrinho.toFixed(2)}*

✅ *Pedido salvo no sistema!*`;
};

// Valida se os dados estão no formato correto antes de enviar
export const validarDadosPedido = (dados: DadosPedidoAPI): string[] => {
  const erros: string[] = [];

  if (!dados.nomeCliente?.trim()) erros.push('Nome do cliente é obrigatório');
  if (!dados.telefone?.trim()) erros.push('Telefone é obrigatório');
  if (!dados.formaPagamento) erros.push('Forma de pagamento é obrigatória');
  if (!dados.tipoPedido) erros.push('Tipo de pedido é obrigatório');
  if (!dados.valorTotal || dados.valorTotal <= 0) erros.push('Valor total deve ser maior que zero');
  if (!dados.itens?.length) erros.push('Pelo menos um item deve estar no pedido');

  if (dados.tipoPedido === 'entrega' && !dados.endereco?.trim()) {
    erros.push('Endereço é obrigatório para entrega');
  }

  // Validar itens
  dados.itens?.forEach((item, index) => {
    if (!item.produtoId) erros.push(`Item ${index + 1}: ID do produto é obrigatório`);
    if (!item.quantidade || item.quantidade <= 0) erros.push(`Item ${index + 1}: Quantidade deve ser maior que zero`);
    if (!item.preco || item.preco <= 0) erros.push(`Item ${index + 1}: Preço deve ser maior que zero`);
  });

  return erros;
};