import Transacao from "./Transacao"

export default class Conta {
  conta_id!: number
  valor!: number
  
  private constructor() {}

  static criar(conta_id: number, valor: number) {
    const conta = new Conta()
    conta.conta_id = conta_id
    conta.valor = valor
    return conta
  }

  static calcularSaldo(valorConta: number, transacoes: Transacao[]) {
    const valorTotalTransacoes = Transacao.somarValor(transacoes)    
    return valorConta - valorTotalTransacoes
  }
}