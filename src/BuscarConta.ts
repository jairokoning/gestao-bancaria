import { ConflictError } from "./ConflictError";
import Conta from "./Conta";
import ContaDAO from "./ContaDAO";
import { NotFoundError } from "./NotFoundError";
import TransacaoDAO from "./TransacaoDAO";

export default class CriarConta {
  constructor(readonly contaDAO: ContaDAO, readonly transacaoDAO: TransacaoDAO) {}

  async execute(conta_id: number) {
    const conta = await this.contaDAO.buscarConta(conta_id)
    if (!conta[0]) throw new NotFoundError("Conta não existe")
    const transacoes = await this.transacaoDAO.buscarTransacoes(conta_id)
    const saldo = Conta.calcularSaldo(conta[0].valor, transacoes)       
    return { conta_id, saldo: saldo }
  }
}