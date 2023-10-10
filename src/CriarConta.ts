import { ConflictError } from "./ConflictError";
import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

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