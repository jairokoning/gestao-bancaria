import CriarTransacao from "./CriarTransacao";
import HttpServer from "./HttpServer";

export default class CriarTransacaoController {
  constructor (
    readonly httpServer: HttpServer,
    readonly criarTransacao: CriarTransacao
  ) {
    httpServer.register("post", "/transacao", async function(parms: any, body: any) {     
      const output = await criarTransacao?.execute(body.forma_pagamento, body.conta_id, body.valor)
      return { httpStatus: 201, output};
    })
  }
}