import CalculadoraTaxaTransacao from "./CalculadoraTaxaTransacao";

export default class CalculadoraTaxaTransacaoDebito implements CalculadoraTaxaTransacao{
  TAXA_DEBITO: number = 3
  calcular(valorTransacao: number): number {
    return valorTransacao * (this.TAXA_DEBITO / 100)
  }

}