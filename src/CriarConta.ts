import Conta from "./Conta";

export default class CriarConta {
  constructor() {}

  async execute(conta_id: number, valor: number) {
    const conta = new Conta(conta_id, valor)
    const saldo = conta.obterSaldo()
    return { conta_id, saldo }
  }
}