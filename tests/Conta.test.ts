import Conta from "../src/Conta"

test("Deve criar uma nova conta bancária com um saldo inicial de R$500", () => {
  const conta = new Conta(1234, 500);
  expect(conta.obterSaldo()).toBe(500)
  expect(conta.conta_id).toBe(1234)
})