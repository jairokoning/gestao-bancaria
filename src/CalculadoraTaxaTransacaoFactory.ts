import { BadRequestError } from "./BadRequestError";
import CalculadoraTaxaTransacao from "./CalculadoraTaxaTransacao";
import CalculadoraTaxaTransacaoCredito from "./CalculadoraTaxaTransacaoCredito";
import CalculadoraTaxaTransacaoDebito from "./CalculadoraTaxaTransacaoDebito";
import CalculadoraTaxaTransacaoPix from "./CalculadoraTaxaTransacaoPix";

const PIX: string = "P"
const CREDITO: string = "C"
const DEBITO: string = "D"

export default class CalculadoraTaxaTransacaoFactory {

  static create(formaPagamento: string): CalculadoraTaxaTransacao {
    if (formaPagamento === PIX) return new CalculadoraTaxaTransacaoPix()
    if (formaPagamento === CREDITO) return new CalculadoraTaxaTransacaoCredito()
    if (formaPagamento === DEBITO) return new CalculadoraTaxaTransacaoDebito()
    throw new BadRequestError("Forma de pagamento inválido")
  }
}