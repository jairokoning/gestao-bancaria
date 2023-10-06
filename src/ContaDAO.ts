import Conta from "./Conta";

export default interface ContaDAO {
  criarConta(conta: Conta): Promise<void>
  buscarConta(conta_id: number): Promise<Conta | undefined>
}