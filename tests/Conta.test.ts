import Conta from "../src/Conta"

test("Deve criar uma nova conta bancária", () => {
  const conta = Conta.criar(1234, 200)
  expect(conta.valor).toBe(200)
  expect(conta.conta_id).toBe(1234)
})
