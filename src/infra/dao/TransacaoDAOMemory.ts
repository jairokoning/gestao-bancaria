import TransacaoDAO from "../../application/dao/TransacaoDAO"
import Transacao from "../../domain/Transacao"

export default class TransacaoDAOMemory implements TransacaoDAO {
  transacoes: Transacao[] = []
  
  constructor() {}  

  async criarTransacao(transacao: Transacao): Promise<void> {
    this.transacoes.push(transacao)
  }

  async buscarTransacoes(conta_id: number): Promise<Transacao[]> {
    const transacoes = this.transacoes.filter(transacao => transacao.conta_id === conta_id)
    return transacoes
  }
}