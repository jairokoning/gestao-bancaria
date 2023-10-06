export default class Conta {
  conta_id?: number
  valor?: number
  
  private constructor() {}

  static criar(conta_id: number, valor: number) {
    const conta = new Conta()
    conta.conta_id = conta_id
    conta.valor = valor
    return conta
  }
}