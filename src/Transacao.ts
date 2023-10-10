import { BadRequestError } from "./BadRequestError"

export type IFormaPagamento = {
  forma_pagamento: "P" | "C" | "D"
}

export default class Transacao {  
  private constructor(readonly forma_pagamento: IFormaPagamento, readonly conta_id: number, readonly valor: number) {
    this.validarDados()    
  }

  static criar(forma_pagamento: IFormaPagamento, conta_id: number, valor: number) {    
    const transacao = new Transacao(forma_pagamento, conta_id, valor)    
    return transacao
  }

  static somarValor(transacoes: Transacao[]) {
    const valorTotal = transacoes.reduce((total, transacao) => {
      return total += Number(transacao.valor)
    }, 0);
    return valorTotal
  }

  private validarDados() {    
    if (!Transacao.formaDePagamentoValido(this.forma_pagamento)) throw new BadRequestError("Forma de pagamento inválido")
    if (this.valor < 0.1) throw new BadRequestError("Informe um valor acima de R$0,00")
  }

  static formaDePagamentoValido(forma_pagamento: any): forma_pagamento is IFormaPagamento {    
    if (typeof forma_pagamento === 'string' && ['P', 'C', 'D'].includes(forma_pagamento)) return true    
    return false
  }
}