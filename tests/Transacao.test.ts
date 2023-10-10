import Transacao, { IFormaPagamento } from "../src/Transacao"


test("Deve criar uma nova transacao", () => {
  const transacao = Transacao.criar("P" as unknown as IFormaPagamento, 1234, 18.90)
  expect(transacao.forma_pagamento).toBe("P")
  expect(transacao.conta_id).toBe(1234)
  expect(transacao.valor).toBe(18.90)
})

test("Deve validar as forma de pagamento", () => {  
  const formaPagamentoPixValido = Transacao.formaDePagamentoValido("P")
  const formaPagamentoDebitoValido = Transacao.formaDePagamentoValido("C")
  const formaPagamentoCreditoValido = Transacao.formaDePagamentoValido("D")
  const formaPagamentoInvalido = Transacao.formaDePagamentoValido("XPTO")
  expect(formaPagamentoPixValido).toBe(true)
  expect(formaPagamentoDebitoValido).toBe(true)
  expect(formaPagamentoCreditoValido).toBe(true)
  expect(formaPagamentoInvalido).toBe(false)
})

test("Deve somar os valores das transações", () => {
  const transações: Transacao[] = [
    { forma_pagamento: "P" as any, conta_id: 1234, valor: 1400 },
    { forma_pagamento: "D" as any, conta_id: 1234, valor: 76.79 },
    { forma_pagamento: "C" as any, conta_id: 1234, valor: 23.21 }
  ] as any
  const total = Transacao.somarValor(transações)
  expect(total).toBe(1500)
})

