import axios from "axios"
import pgp from 'pg-promise'

axios.defaults.validateStatus = function () {
	return true;
}

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

describe('Testes de integração (API) | Conta', () => {
  beforeAll(async () => {
    await resetDatabase()
  })

  test("Deve criar uma nova conta bancária com saldo inicial de R$500", async () => {
    const response = await axios.post("http://localhost:3333/conta", 
      {
        conta_id: 4477,
        valor: 500
      }
    )
    const output = response.data
    expect(output.saldo).toBe(500)
    expect(response.status).toBe(201)
  }) 

  test("Deve lançar 409 se conta já estiver cadastrada", async () => {    
    const input = {
      conta_id: 4477,
      valor: 500
    }
    const response = await axios.post("http://localhost:3333/conta", input)    
    expect(response.data).toBe("Conta já cadastrada")
    expect(response.status).toBe(409)        
  })

  test("Deve lançar 400 se o valor de abertura da conta for abaixo de R$100", async () => {    
    const input = {
      conta_id: 5522,
      valor: 90
    }
    const response = await axios.post("http://localhost:3333/conta", input)    
    expect(response.data).toBe("Valor mínimo obrigatório: R$100")
    expect(response.status).toBe(400)        
  })

  test("Deve validar o número da conta não permitindo a criação da conta se número < 1", async () => {    
    const input = {
      conta_id: 1,
      valor: 100
    }
    const response = await axios.post("http://localhost:3333/conta", input)    
    expect(response.data).toBe("Número da conta inválido: conta_id")
    expect(response.status).toBe(400)        
  })

  test("Deve retornar os dados da conta", async () => {
    const conta_id = 3333     
    await axios.post("http://localhost:3333/conta", {
      conta_id,
      valor: 1000
    })
    await axios.post("http://localhost:3333/transacao",
      {
        forma_pagamento: "P",
        conta_id,
        valor: 479.99
      }
    )

    const response = await axios.get("http://localhost:3333/conta", { params: { id: conta_id }})    
    expect(response.data.conta_id).toBe("3333")
    expect(response.data.saldo).toBe(520.01)  
    expect(response.status).toBe(200)
  })

  test("Deve lançar uma exceção 404 se conta não existir", async () => {    
    const response = await axios.get("http://localhost:3333/conta", { params: { id: 9009 }})        
    expect(response.data).toBe("Conta não existe")  
    expect(response.status).toBe(404)
  })
})

describe("Testes de integração (API) | Transação", () => {
  test("Deve criar uma nova transacao com forma de pagamento PIX", async () => {
    const response = await axios.post("http://localhost:3333/transacao",
      {
        forma_pagamento: "P",
        conta_id: 4477,
        valor: 50
      }
    )
    const output = response.data
    expect(output.saldo).toBe(450)
    expect(output.conta_id).toBe(4477)
    expect(response.status).toBe(201)
  })  

  test("Deve lançar 404 se não houver saldo ao criar nova transação", async () => {        
    const response = await axios.post("http://localhost:3333/transacao", {
      forma_pagamento: "P",
      conta_id: 4477,
      valor: 1500
    })
    expect(response.data).toBe("Saldo insuficiente")
    expect(response.status).toBe(404) 
  })

  test("Deve lançar erro 400 se informado uma forma de pagamento inválido", async () => {    
    const response = await axios.post("http://localhost:3333/transacao", {
      forma_pagamento: "QW",
      conta_id: 4477,
      valor: 15
    })      
    expect(response.data).toBe("Forma de pagamento inválido")
    expect(response.status).toBe(400) 
  })

  test("Deve lançar erro 404 se a conta informado na transação não existir", async () => {    
    const response = await axios.post("http://localhost:3333/transacao", {
      forma_pagamento: "D",
      conta_id: 9007,
      valor: 400
    })      
    expect(response.data).toBe("Conta não existe")
    expect(response.status).toBe(404) 
  })
})