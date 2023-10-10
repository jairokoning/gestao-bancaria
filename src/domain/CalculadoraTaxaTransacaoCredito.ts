import CalculadoraTaxaTransacao from "./CalculadoraTaxaTransacao";

export default class CalculadoraTaxaTransacaoCredito implements CalculadoraTaxaTransacao {
  TAXA_CREDITO: number = 5

	calcular (valorTransacao: number) {
		return valorTransacao * (this.TAXA_CREDITO / 100)
	}
}