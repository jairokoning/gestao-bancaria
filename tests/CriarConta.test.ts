import CriarConta from '../src/CriarConta'

test("Deve criar uma nova conta bancária com saldo inicial de R$500", async () => {
  const criarConta = new CriarConta()
  const output = await criarConta.execute(9876, 500)
  expect(output.saldo).toBe(500)
  expect(output.conta_id).toBe(9876)
})