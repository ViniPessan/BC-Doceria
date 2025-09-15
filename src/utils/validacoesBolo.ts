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

  // Validação do tamanho (obrigatório para todos os tipos)
  if (!selecoes.tamanhoId) {
    return { valido: false, mensagem: 'Selecione um tamanho' };
  }

  // Validação específica para bolos do tipo taça e aniversário
  if (['taca', 'aniversario'].includes(tipoBolo)) {
    if (maxRecheios > 0 && (!selecoes.recheios || selecoes.recheios.length === 0)) {
      return { valido: false, mensagem: 'Selecione ao menos um recheio' };
    }
    if (maxCoberturas > 0 && (!selecoes.coberturas || selecoes.coberturas.length === 0)) {
      return { valido: false, mensagem: 'Selecione ao menos uma cobertura' };
    }
  }

  // Validação específica para bolos caseiros
  if (tipoBolo === 'caseiro') {
    // Validação da massa (se permitida e obrigatória)
    if (allowMassas && !selecoes.massaId) {
      return { valido: false, mensagem: 'Selecione uma massa' };
    }
    
    // Validação das coberturas para bolos caseiros
    if (maxCoberturas > 0) {
      const coberturasEscolhidas = selecoes.coberturas?.length || 0;
      
      if (coberturasEscolhidas === 0) {
        return { valido: false, mensagem: 'Selecione ao menos uma cobertura' };
      }
      
      if (coberturasEscolhidas < maxCoberturas) {
        const faltam = maxCoberturas - coberturasEscolhidas;
        const plural = faltam > 1 ? 's' : '';
        return { 
          valido: false, 
          mensagem: `Selecione mais ${faltam} cobertura${plural} (${coberturasEscolhidas}/${maxCoberturas})` 
        };
      }
    }
    
    // Validação dos recheios para bolos caseiros (se aplicável)
    if (maxRecheios > 0) {
      const recheiosEscolhidos = selecoes.recheios?.length || 0;
      
      if (recheiosEscolhidos === 0) {
        return { valido: false, mensagem: 'Selecione ao menos um recheio' };
      }
      
      if (recheiosEscolhidos < maxRecheios) {
        const faltam = maxRecheios - recheiosEscolhidos;
        const plural = faltam > 1 ? 's' : '';
        return { 
          valido: false, 
          mensagem: `Selecione mais ${faltam} recheio${plural} (${recheiosEscolhidos}/${maxRecheios})` 
        };
      }
    }
  }

  return { valido: true, mensagem: '' };
};