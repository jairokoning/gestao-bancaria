import Connection from "./Connection";
import Transacao from "./Transacao";
import TransacaoDAO from "./TransacaoDAO";

export default class TransacaoDAOPostgres implements TransacaoDAO {
  constructor (readonly connection: Connection) {}  
  
  async criarTransacao(transacao: Transacao): Promise<void> {
    await this.connection.query("INSERT INTO gestao_bancaria.transacoes (forma_pagamento, conta_id, valor) VALUES ($1, $2, $3)", [transacao.forma_pagamento, transacao.conta_id, transacao.valor]);		    
  }

  async buscarTransacoes(conta_id: number): Promise<Transacao[]> {
    const transacoes = await this.connection.query("SELECT * FROM gestao_bancaria.transacoes WHERE conta_id = $1", [conta_id]);		    
    return transacoes
  }
}