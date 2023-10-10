import CriarContaController from "./CriarContaController"
import ContaDAOPostgres from "./ContaDAOPostgres"
import CriarConta from "./CriarConta"
import CriarTransacao from "./CriarTransacao"
import ExpressAdapter from "./ExpressAdapter"
import PostgresAdapter from "./PostgresAdapter"
import TransacaoController from "./TransacaoController"
import TransacaoDAOPostgres from "./TransacaoDAOPostgres"
import BuscarConta from "./BuscarConta"
import BuscarContaController from "./BuscarContaController"

const connection = new PostgresAdapter()
const httpServer = new ExpressAdapter()

const contaDAO = new ContaDAOPostgres(connection)
const transacaoDAO = new TransacaoDAOPostgres(connection)

const criarConta = new CriarConta(contaDAO)
const buscarConta = new BuscarConta(contaDAO, transacaoDAO)
const criarTransacao = new CriarTransacao(transacaoDAO, contaDAO)

new CriarContaController(httpServer, criarConta)
new BuscarContaController(httpServer, buscarConta)
new TransacaoController(httpServer, criarTransacao)
httpServer.listen(3333)