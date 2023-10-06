import ContaController from "./ContaController"
import ContaDAOPostgres from "./ContaDAOPostgres"
import CriarConta from "./CriarConta"
import ExpressAdapter from "./ExpressAdapter"
import PostgresAdapter from "./PostgresAdapter"

const connection = new PostgresAdapter()
const contaDAO = new ContaDAOPostgres(connection)
const criarConta = new CriarConta(contaDAO)
const httpServer = new ExpressAdapter()
new ContaController(httpServer, criarConta)
httpServer.listen(3333)