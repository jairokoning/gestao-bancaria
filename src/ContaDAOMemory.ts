import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

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