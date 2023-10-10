import { AppError } from "./AppError";
import Conta from "./Conta"
import ContaDAO from "./ContaDAO";
import ErrorHandler from "./ErrorHandler";
import { NotFoundError } from "./NotFoundError";
import Transacao, { IFormaPagamento } from "./Transacao";
import TransacaoDAO from "./TransacaoDAO";

export default class CriarTransacao {
  constructor(readonly transacaoDAO: TransacaoDAO, readonly contaDAO: ContaDAO, readonly appError: ErrorHandler) {}

  async execute(forma_pagamento: IFormaPagamento, conta_id: number, valor: number) {
    const transacoes = await this.transacaoDAO.buscarTransacoes(conta_id)
    const conta = await this.contaDAO.buscarConta(conta_id)    
    if (!conta[0]) throw new NotFoundError("Conta não existe")
    const saldo = Conta.calcularSaldo(conta[0].valor, transacoes)
    if (valor > saldo) {
      // throw new Error("Saldo insuficiente");
      
      //  ID: A1 =>  this works fine
      // throw new AppError("Saldo insuficiente", 404);

      this.appError.notFound("Saldo insuficiente")

    
      
    }

    const transacao = Transacao.criar(forma_pagamento, conta_id, valor)
    await this.transacaoDAO.criarTransacao(transacao)
    return { conta_id, saldo: saldo - valor }
  }
}