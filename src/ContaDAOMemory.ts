import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

export default class ContaDAOMemory implements ContaDAO {
  constructor() {}
  contas: Conta[] = []

  async criarConta(conta: Conta): Promise<void> {
    this.contas.push(conta)
  }
}