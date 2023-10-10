import Conta from "../src/Conta"

describe("Conta | Testes Unitários", () => {
  test("Deve criar uma nova conta bancária", () => {
    const conta = Conta.criar(1234, 500)
    expect(conta.valor).toBe(500)
    expect(conta.conta_id).toBe(1234)
  })
})
