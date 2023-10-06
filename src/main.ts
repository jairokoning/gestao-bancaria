import ContaController from "./ContaController"
import ContaDAOPostgres from "./ContaDAOPostgres"
import CriarConta from "./CriarConta"
import CriarTransacao from "./CriarTransacao"
import ExpressAdapter from "./ExpressAdapter"
import PostgresAdapter from "./PostgresAdapter"
import TransacaoController from "./TransacaoController"
import TransacaoDAOPostgres from "./TransacaoDAOPostgres"

const connection = new PostgresAdapter()

const contaDAO = new ContaDAOPostgres(connection)
const criarConta = new CriarConta(contaDAO)
const transacaoDAO = new TransacaoDAOPostgres(connection)
const criarTransacao = new CriarTransacao(transacaoDAO, contaDAO)

const httpServer = new ExpressAdapter()

new ContaController(httpServer, criarConta)
new TransacaoController(httpServer, criarTransacao)
httpServer.listen(3333)