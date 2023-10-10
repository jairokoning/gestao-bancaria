import CalculadoraTaxaTransacaoFactory from "./CalculadoraTaxaTransacaoFactory";
import Conta from "./Conta"
import ContaDAO from "./ContaDAO";
import { NotFoundError } from "./NotFoundError";
import Transacao, { IFormaPagamento } from "./Transacao";
import TransacaoDAO from "./TransacaoDAO";

export default class CriarTransacao {
  constructor(readonly transacaoDAO: TransacaoDAO, readonly contaDAO: ContaDAO) {}

  async execute(forma_pagamento: IFormaPagamento, conta_id: number, valor: number) {
    const transacoes = await this.transacaoDAO.buscarTransacoes(conta_id)
    const conta = await this.contaDAO.buscarConta(conta_id)    
    if (!conta[0]) throw new NotFoundError("Conta não existe")
    const saldo = Conta.calcularSaldo(conta[0].valor, transacoes)
    const valorTaxaTransacao = CalculadoraTaxaTransacaoFactory.create(forma_pagamento as any).calcular(valor)
    const valorComTaxa = valor + valorTaxaTransacao
    if (valorComTaxa > saldo) {
      throw new NotFoundError("Saldo insuficiente")      
    }
    const transacao = Transacao.criar(forma_pagamento, conta_id, valorComTaxa)
    await this.transacaoDAO.criarTransacao(transacao)
    return { conta_id, saldo: saldo - valorComTaxa }
  }
}