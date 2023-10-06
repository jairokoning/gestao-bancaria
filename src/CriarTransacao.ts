import Conta from "./Conta"
import ContaDAO from "./ContaDAO";
import Transacao, { IFormaPagamento } from "./Transacao";
import TransacaoDAO from "./TransacaoDAO";

export default class CriarTransacao {
  constructor(readonly transacaoDAO: TransacaoDAO, readonly contaDAO: ContaDAO) {}

  async execute(forma_pagamento: IFormaPagamento, conta_id: number, valor: number) {
    const transacao = Transacao.criar(forma_pagamento, conta_id, valor)
    await this.transacaoDAO.criarTransacao(transacao)
    const transacoes = await this.transacaoDAO.buscarTransacoes(conta_id)
    const conta = await this.contaDAO.buscarConta(conta_id)
    const saldo = Conta.calcularSaldo(conta[0].valor, transacoes)
    return { conta_id, saldo }
  }
}