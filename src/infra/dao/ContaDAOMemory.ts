import ContaDAO from "../../application/dao/ContaDAO"
import Conta from "../../domain/Conta"

export default class ContaDAOMemory implements ContaDAO {
  contas: Conta[] = []
  
  constructor() {}  

  async criarConta(conta: Conta): Promise<void> {
    this.contas.push(conta)
  }

  async buscarConta(conta_id: number): Promise<any> {
    const conta = this.contas.filter(conta => conta.conta_id === conta_id)
    return conta
  }
}