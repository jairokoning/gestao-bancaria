import CriarConta from '../../src/application/usecase/CriarConta'
import ContaDAOMemory from '../../src/infra/dao/ContaDAOMemory'
import Conta from '../../src/domain/Conta'

describe("Criar Conta | Testes de integração (usecase)", () => {
  test("Deve criar uma nova conta bancária com saldo inicial de R$500", async () => {
    const contaDAO = new ContaDAOMemory()
    const criarConta = new CriarConta(contaDAO)
    const output = await criarConta.execute(9876, 500)
    expect(output.saldo).toBe(500)
    expect(output.conta_id).toBe(9876)
  })

  test("Deve lançar uma exceção se a conta já existir", async () => {
    const contaDAO = new ContaDAOMemory()
    const criarConta = new CriarConta(contaDAO)
    await contaDAO.criarConta({ conta_id: 9876, valor: 970 } as Conta)
    await expect(
      criarConta.execute(9876, 500)
    ).rejects.toThrow(new Error("Conta já cadastrada"))
  })

  test("Deve lançar uma exceção se valor inicial da conta for menor que R$100", async () => {
    const contaDAO = new ContaDAOMemory()
    const criarConta = new CriarConta(contaDAO)
    await expect(
      criarConta.execute(9876, 80)
    ).rejects.toThrow(new Error("Valor mínimo obrigatório: R$100"))
  })

})