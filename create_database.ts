import pgp from 'pg-promise'

async function create() {
  const connection = pgp()("postgres://docker:123456@localhost:5432/app")
	await connection.query("DROP SCHEMA IF EXISTS gestao_bancaria CASCADE")
  await connection.query("CREATE SCHEMA gestao_bancaria;")
  await connection.query(`
    CREATE TABLE gestao_bancaria.conta (
      conta_id integer,
      valor numeric
    )
  `)  		  
	await connection.$pool.end()
}

create()