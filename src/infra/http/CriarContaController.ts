import CriarConta from "../../application/usecase/CriarConta";
import HttpServer from "./HttpServer";

export default class CriarContaController {
  constructor (
    readonly httpServer: HttpServer,
    readonly criarConta: CriarConta
  ) {
    httpServer.register("post", "/conta", async function(parms: any, body: any) {     
      const output = await criarConta.execute(body.conta_id, body.valor)
      return { httpStatus: 201, output};
    })
  }
}