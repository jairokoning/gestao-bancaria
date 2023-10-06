import Connection from "./Connection";
import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

export default class ContaDAOPostgres implements ContaDAO {

	constructor (readonly connection: Connection) {}

  async criarConta(conta: Conta): Promise<void> {
    await this.connection.query("insert into gestao_bancaria.conta (conta_id, valor) values ($1, $2)", [conta.conta_id, conta.valor]);		    
  }
}