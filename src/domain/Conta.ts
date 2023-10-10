
import BadRequestError from "./BadRequestError"
import Transacao from "./Transacao"

export default class Conta {
  
  constructor(readonly conta_id: number, readonly valor: number) {
    this.validarDados()
  }

  static criar(conta_id: number, valor: number) {
    const conta = new Conta(conta_id, valor)    
    return conta
  }

  static calcularSaldo(valorConta: number, transacoes: Transacao[]) {
    const valorTotalTransacoes = Transacao.somarValor(transacoes)
    return valorConta - valorTotalTransacoes
  }

  validarDados() {
    if (this.conta_id < 1) throw new BadRequestError("Número da conta inválido: conta_id")
    if (this.valor < 100) throw new BadRequestError("Valor mínimo obrigatório: R$100")
  }
}