// Função genérica para alternar itens em um array com limite máximo
export const toggleItem = (
  currentArray: number[] | undefined,
  id: number,
  max: number
): number[] => {
  const current = currentArray || [];
  if (current.includes(id)) {
    // Remove item se já existe
    return current.filter(i => i !== id);
  }
  // Adiciona item se não ultrapassar o limite
  if (current.length < max) {
    return [...current, id];
  }
  return current;
};
