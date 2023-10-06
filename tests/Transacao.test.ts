test("Deve criar uma nova transacao", () => {
  const transacao = Transacao.create("P", 1234, 18.90)
  expect(transacao.forma_pagamento).toBe("P")
  expect(transacao.conta_id).toBe(1234)
  expect(transacao.valor).toBe(18.90)
})