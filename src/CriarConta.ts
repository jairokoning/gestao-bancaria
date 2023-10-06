import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

export default class CriarConta {
  constructor(readonly contaDAO: ContaDAO) {}

  async execute(conta_id: number, valor: number) {    
    const conta = Conta.criar(conta_id, valor)
    await this.contaDAO.criarConta(conta)    
    return { conta_id, saldo: valor }
  }
}