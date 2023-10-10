import BuscarConta from "./application/usecase/BuscarConta"
import CriarConta from "./application/usecase/CriarConta"
import CriarTransacao from "./application/usecase/CriarTransacao"
import ContaDAOPostgres from "./infra/dao/ContaDAOPostgres"
import TransacaoDAOPostgres from "./infra/dao/TransacaoDAOPostgres"
import PostgresAdapter from "./infra/database/PostgresAdapter"
import BuscarContaController from "./infra/http/BuscarContaController"
import CriarContaController from "./infra/http/CriarContaController"
import CriarTransacaoController from "./infra/http/CriarTransacaoController"
import ExpressAdapter from "./infra/http/ExpressAdapter"

const connection = new PostgresAdapter()
const httpServer = new ExpressAdapter()

const contaDAO = new ContaDAOPostgres(connection)
const transacaoDAO = new TransacaoDAOPostgres(connection)

const criarConta = new CriarConta(contaDAO)
const buscarConta = new BuscarConta(contaDAO, transacaoDAO)
const criarTransacao = new CriarTransacao(transacaoDAO, contaDAO)

new CriarContaController(httpServer, criarConta)
new BuscarContaController(httpServer, buscarConta)
new CriarTransacaoController(httpServer, criarTransacao)
httpServer.listen(3333)