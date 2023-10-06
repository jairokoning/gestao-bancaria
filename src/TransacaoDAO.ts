import Transacao from "./Transacao";

export default interface ContaDAO {
  criarTransacao(transacao: Transacao): Promise<void>
  buscarTransacoes(conta_id: number): Promise<Transacao[]>
}