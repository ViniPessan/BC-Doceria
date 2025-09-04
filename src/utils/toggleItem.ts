// utils/toggleItem.ts
export const toggleItem = (
  id: number,
  selecionados: number[] = [],
  max?: number
): number[] => {
  const exists = selecionados.includes(id);

  if (exists) {
    return selecionados.filter(i => i !== id);
  }

  if (max !== undefined && selecionados.length >= max) {
    return selecionados;
  }

  return [...selecionados, id];
};
