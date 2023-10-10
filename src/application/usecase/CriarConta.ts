import ConflictError from "../../domain/ConflictError"
import Conta from "../../domain/Conta"
import ContaDAO from "../dao/ContaDAO"

export default class CriarConta {
  constructor(readonly contaDAO: ContaDAO) {}

  async execute(conta_id: number, valor: number) {
    const contaExiste = await this.contaDAO.buscarConta(conta_id)    
    if (contaExiste[0]?.conta_id === conta_id) throw new ConflictError("Conta já cadastrada")
    const conta = Conta.criar(conta_id, valor)
    await this.contaDAO.criarConta(conta)    
    return { conta_id, saldo: valor }
  }
}