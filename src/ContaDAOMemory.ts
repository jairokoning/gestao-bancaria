import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

export default class ContaDAOMemory implements ContaDAO {
  constructor() {}
  
  contas: Conta[] = []

  async criarConta(conta: Conta): Promise<void> {
    this.contas.push(conta)
  }

  async buscarConta(conta_id: number): Promise<Conta | undefined> {
    const conta = this.contas.find(conta => conta.conta_id === conta_id)
    return conta
  }
}