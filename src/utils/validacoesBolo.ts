import { SelecoesProduto } from "@/types/produto";
import { TipoBolo } from "./tipoBolo";

interface ValidacaoResultado {
  valido: boolean;
  mensagem: string;
}

interface ValidarSelecoesArgs {
  selecoes: SelecoesProduto;
  tipoBolo: TipoBolo;
  maxRecheios?: number;
  maxCoberturas?: number;
  maxDecoracoes?: number;
  allowMassas?: boolean;
}

export const validarSelecoes = ({
  selecoes,
  tipoBolo,
  maxRecheios = 0,
  maxCoberturas = 0,
  maxDecoracoes = 0,
  allowMassas = false
}: ValidarSelecoesArgs): ValidacaoResultado => {

  if (!selecoes.tamanhoId) return { valido: false, mensagem: 'Selecione um tamanho' };

  if (['taca', 'aniversario'].includes(tipoBolo)) {
    if (maxRecheios > 0 && (!selecoes.recheios || selecoes.recheios.length === 0)) {
      return { valido: false, mensagem: 'Selecione ao menos um recheio' };
    }
    if (maxCoberturas > 0 && (!selecoes.coberturas || selecoes.coberturas.length === 0)) {
      return { valido: false, mensagem: 'Selecione ao menos uma cobertura' };
    }
  }

  if (tipoBolo === 'caseiro' && allowMassas && !selecoes.massaId) {
    return { valido: false, mensagem: 'Selecione uma massa' };
  }

  return { valido: true, mensagem: '' };
};
