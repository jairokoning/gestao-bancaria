import Transacao, { IFormaPagamento } from "../src/Transacao"


test("Deve criar uma nova transacao", () => {
  const transacao = Transacao.criar("P" as unknown as IFormaPagamento, 1234, 18.90)
  expect(transacao.forma_pagamento).toBe("P")
  expect(transacao.conta_id).toBe(1234)
  expect(transacao.valor).toBe(18.90)
})