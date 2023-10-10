import Conta from "../src/Conta"

describe("Conta | Testes Unitários", () => {
  test("Deve criar uma nova conta bancária", () => {
    const conta = Conta.criar(1234, 500)
    expect(conta.valor).toBe(500)
    expect(conta.conta_id).toBe(1234)
  })

  test.skip("Deve validar o numero da conta", () => {  
    expect(      
      Conta.criar(0, 100)
    ).rejects.toThrow("Número inválido: conta_id")  
  })

  test.skip("Deve validar o valor de entrada", () => {  
    expect(
      Conta.criar(8822, 90)
    ).rejects.toEqual(new Error("Valor mínimo obrigatório: R$100"))  
  })
})
