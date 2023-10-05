import axios from "axios"

test("Deve criar uma nova conta bancária com saldo inicial de R$500", async () => {
  const response = await axios.post("http://localhost:3000/conta", {
    data: {
      conta_id: 4477,
      valor: 500
    }
  })
  const output = response.data
  expect(output.saldo).toBe(500)
})