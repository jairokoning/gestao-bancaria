
import BuscarConta from "./BuscarConta";
import HttpServer from "./HttpServer";

export default class CriarContaController {
  constructor (
    readonly httpServer: HttpServer,
    readonly criarConta: BuscarConta
  ) {
    httpServer.register("get", "/conta", async function(params: any, body: any, query: any) {
      const output = await criarConta.execute(query.id)
      return { httpStatus: 200, output};
    })
  }
}