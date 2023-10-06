
export interface IFormaPagamento {
  forma_pagamento: "P" | "C" | "D"
}

export default class Transacao {
  forma_pagamento!: IFormaPagamento
  conta_id!: number
  valor!: number
  
  private constructor() {}

  static criar(forma_pagamento: IFormaPagamento, conta_id: number, valor: number) {
    const transacao = new Transacao()
    transacao.forma_pagamento = forma_pagamento
    transacao.conta_id = conta_id
    transacao.valor = valor
    return transacao
  }

  static somarValor(transacoes: Transacao[]) {
    const valorTotal = transacoes.reduce((total, transacao) => {
      return transacao.valor
    }, 0);
    return valorTotal
  }
}