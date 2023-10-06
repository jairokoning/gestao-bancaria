import CriarTransacao from "./CriarTransacao";
import HttpServer from "./HttpServer";

export default class TransacaoController {
  constructor (
    readonly httpServer: HttpServer,
    readonly criarTransacao: CriarTransacao
  ) {
    httpServer.register("post", "/transacao", async function(parms: any, body: any) {     
      const output = await criarTransacao.execute(body.data.forma_pagamento, body.data.conta_id, body.data.valor)
      return output;
    })
  }
}