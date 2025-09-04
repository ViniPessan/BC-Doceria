export type TipoBolo = 'taca' | 'aniversario' | 'caseiro' | 'outros';

export const getTipoBolo = (nome: string): TipoBolo => {
  const n = nome.toLowerCase();
  if (n.includes('taça')) return 'taca';
  if (n.includes('aniversário') || n.includes('aniversario')) return 'aniversario';
  if (n.includes('caseiro')) return 'caseiro';
  return 'outros';
};
