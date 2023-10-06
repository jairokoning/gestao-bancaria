import Connection from "./Connection";
import Conta from "./Conta";
import ContaDAO from "./ContaDAO";

export default class ContaDAOPostgres implements ContaDAO {

	constructor (readonly connection: Connection) {}  

  async criarConta(conta: Conta): Promise<void> {
    await this.connection.query("INSERT INTO gestao_bancaria.conta (conta_id, valor) VALUES ($1, $2)", [conta.conta_id, conta.valor]);		    
  }

  async buscarConta(conta_id: number): Promise<any> {
    const conta = await this.connection.query("SELECT * FROM gestao_bancaria.conta WHERE conta_id = $1", [conta_id]);
    return conta
  }
}