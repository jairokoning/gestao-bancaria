import TransacaoDAOMemory from '../src/TransacaoDAOMemory'
import ContaDAOMemory from '../src/ContaDAOMemory'
import CriarTransacao from '../src/CriarTransacao'
import { IFormaPagamento } from '../src/Transacao'



describe("Test CriarTransacao usecase", () => {
  test("Deve criar uma nova transacao com forma de pagamento PIX", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 })
    const transacaoDAO = new TransacaoDAOMemory()
    const transacao = new CriarTransacao(transacaoDAO, contaDAO)
    const output = await transacao.execute("P" as unknown as IFormaPagamento, 1991, 25)
    expect(output.saldo).toBe(475)
    expect(output.conta_id).toBe(1991)
  })
})