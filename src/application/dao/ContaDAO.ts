import Conta from "../../domain/Conta"

export default interface ContaDAO {
  criarConta(conta: Conta): Promise<void>
  buscarConta(conta_id: number): Promise<any>
}