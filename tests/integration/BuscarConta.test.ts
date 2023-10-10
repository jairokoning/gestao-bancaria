import BuscarConta from '../../src/application/usecase/BuscarConta'
import ContaDAOMemory from '../../src/infra/dao/ContaDAOMemory'
import Conta from '../../src/domain/Conta'
import TransacaoDAOMemory from '../../src/infra/dao/TransacaoDAOMemory'

describe("Buscar Conta | Testes de integração (usecase)", () => {
  test("Deve buscar uma conta", async () => {
    const contaDAO = new ContaDAOMemory()
    const transacaoDAO = new TransacaoDAOMemory()
    const buscarConta = new BuscarConta(contaDAO, transacaoDAO)
    const conta_id = 2222
    contaDAO.criarConta({ conta_id, valor: 3000} as Conta)
    const output = await buscarConta.execute(conta_id)
    expect(output.saldo).toBe(3000)
    expect(output.conta_id).toBe(conta_id)
  })

  test("Deve lançar uma exceção se a conta buscada não existir", async () => {
    const contaDAO = new ContaDAOMemory()
    const transacaoDAO = new TransacaoDAOMemory()
    const buscarConta = new BuscarConta(contaDAO, transacaoDAO)    
    expect(buscarConta.execute(4114)).rejects.toThrow(new Error("Conta não existe"))
  })
})