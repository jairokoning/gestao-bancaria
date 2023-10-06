import axios from "axios"

import pgp from 'pg-promise'

async function resetDatabase() {
  const connection = pgp()("postgres://docker:123456@localhost:5432/app")
	await connection.query("DROP TABLE IF EXISTS gestao_bancaria.conta")
  await connection.query("DROP TABLE IF EXISTS gestao_bancaria.transacoes")  
  await connection.query(`
    CREATE TABLE gestao_bancaria.conta (
      conta_id integer,
      valor numeric
    )
  `)
  await connection.query(`
    CREATE TABLE gestao_bancaria.transacoes (
      forma_pagamento char(1),
      conta_id integer,
      valor numeric
    )
  `)   		  
	await connection.$pool.end()
}

describe('Testar API (main)', () => {
  beforeAll(async () => {
    await resetDatabase()
  })

  test("Deve criar uma nova conta bancária com saldo inicial de R$500", async () => {
    const response = await axios.post("http://localhost:3333/conta", {
      data: {
        conta_id: 4477,
        valor: 500
      }
    })
    const output = response.data
    expect(output.saldo).toBe(500)
  })

  test("Deve criar uma nova transacao com forma de pagamento PIX", async () => {
    const response = await axios.post("http://localhost:3333/transacao", {
      data: {
        forma_pagamento: "P",
        conta_id: 4477,
        valor: 50
      }
    })
    const output = response.data
    expect(output.saldo).toBe(450)
    expect(output.conta_id).toBe(4477)
  })
})