import CalculadoraTaxaTransacao from "./CalculadoraTaxaTransacao";

export default class CalculadoraTaxaTransacaoPix implements CalculadoraTaxaTransacao {
  TAXA_PIX: number = 0

	calcular (valorTransacao: number) {
		return valorTransacao * (this.TAXA_PIX / 100)
	}
}