import CriarConta from "./CriarConta";
import HttpServer from "./HttpServer";

export default class ContaController {
  constructor (
    readonly httpServer: HttpServer,
    readonly criarConta: CriarConta
  ) {
    httpServer.register("post", "/conta", async function(parms: any, body: any) {     
      const output = await criarConta.execute(body.data.conta_id, body.data.valor)
      return output;
    })
  }
}