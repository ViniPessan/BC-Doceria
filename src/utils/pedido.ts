// --- utils/pedidoUtils.ts ---

// Formata a forma de pagamento para exibição
export const formatarPagamento = (forma: string) => ({
  'DINHEIRO': '💵 Dinheiro',
  'PIX': '📱 PIX',
  'CARTAO': '💳 Cartão'
}[forma] || forma);

// Formata o tipo de pedido para exibição
export const formatarTipoPedido = (tipo: string) =>
  tipo === 'RETIRADA' ? '🏪 Retirada' : '🚚 Entrega';

// Monta a mensagem que será enviada pelo WhatsApp
export const montarMensagemWhatsApp = (
  nome: string,
  tipoEntrega: string,
  endereco: string,
  pagamento: string,
  observacoes: string,
  itens: any[],
  total: number
) => {
  const itensMensagem = itens.map(item => {
    let detalhes = `• *${item.nome}*`;
    if (item.tamanho) detalhes += ` (${item.tamanho})`;
    if (item.massa) detalhes += `\n   └ Massa: ${item.massa}`;
    if (item.recheios?.length) detalhes += `\n   └ Recheios: ${item.recheios.join(', ')}`;
    if (item.cobertura) detalhes += `\n   └ Cobertura: ${item.cobertura}`;
    if (item.decoracoes?.length) detalhes += `\n   └ Decorações: ${item.decoracoes.join(', ')}`;
    detalhes += `\n   └ Quantidade: ${item.quantidade}x`;
    detalhes += `\n   └ Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}`;
    return detalhes;
  }).join('\n\n');

  return `
🍰 *Novo Pedido BC Docearia* 🍰

🙋 *Nome:* ${nome}
💳 *Pagamento:* ${formatarPagamento(pagamento)}
🚚 *Tipo:* ${formatarTipoPedido(tipoEntrega)}
${tipoEntrega === 'ENTREGA' ? `🏠 *Endereço:* ${endereco}` : ''}
${observacoes ? `📝 *Observações:* ${observacoes}` : ''}

📦 *Itens do Pedido:*
${itensMensagem}

💵 *Total Geral: R$${total.toFixed(2)}*
  `.trim();
};

// Monta o corpo do pedido que será enviado ao backend
export const montarBodyPedido = (
  nome: string,
  tipoEntrega: string,
  endereco: string,
  pagamento: string,
  observacoes: string,
  itens: any[],
  total: number
) => ({
  nomeCliente: nome,
  endereco: tipoEntrega === 'ENTREGA' ? endereco : null,
  tipoPedido: tipoEntrega.toUpperCase(),
  formaPagamento: pagamento.toUpperCase(),
  valorTotal: total,
  observacoes: observacoes || null,
  itens: itens.map(item => ({
    produtoId: item.produtoId,
    quantidade: item.quantidade,
    preco: item.preco,
    tamanho: item.tamanho || null,
    massa: item.massa || null,
    recheios: item.recheios || [],
    cobertura: item.cobertura || null,
    decoracoes: item.decoracoes || []
  }))
});
