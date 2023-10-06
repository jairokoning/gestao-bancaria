import pgp from 'pg-promise'

async function create() {
  const conta_id = 1234
  const valor = 500
  const connection = pgp()("postgres://docker:123456@localhost:5432/app")
	await connection.query("DROP SCHEMA IF EXISTS gestao_bancaria CASCADE")
  await connection.query("CREATE SCHEMA gestao_bancaria;")
  await connection.query(`
    CREATE TABLE gestao_bancaria.conta (
      conta_id numeric,
      valor numeric
    )
  `)
  await connection.query("insert into gestao_bancaria.conta (conta_id, valor) values ($1, $2)", [conta_id, valor]);		  
	await connection.$pool.end()
}

create()