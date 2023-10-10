import CalculadoraTaxaTransacaoPix from '../src/CalculadoraTaxaTransacaoPix'
import CalculadoraTaxaTransacaoCredito from '../src/CalculadoraTaxaTransacaoCredito'
import CalculadoraTaxaTransacaoDebito from '../src/CalculadoraTaxaTransacaoDebito'

describe("CalculadoraTaxaTransacao | Testes unitários", () => {
  test("Deve calcular a taxa de uma transação PIX", () => {
    const valorTransacao = 180
    const calculadoraTaxa = new CalculadoraTaxaTransacaoPix()    
    const valorTaxaTransacao = calculadoraTaxa.calcular(valorTransacao)
    const valorTaxaTransacaoEsperado = valorTransacao * (calculadoraTaxa.TAXA_PIX / 100)
    expect(valorTaxaTransacao).toBe(valorTaxaTransacaoEsperado)
  })

  test("Deve calcular a taxa de uma transação CREDITO", () => {
    const valorTransacao = 2599.99
    const calculadoraTaxa = new CalculadoraTaxaTransacaoCredito()    
    const valorTaxaTransacao = calculadoraTaxa.calcular(valorTransacao)
    const valorTaxaTransacaoEsperado = valorTransacao * (calculadoraTaxa.TAXA_CREDITO / 100)
    expect(valorTaxaTransacao).toBe(valorTaxaTransacaoEsperado)
  })

  test("Deve calcular a taxa de uma transação DEBITO", () => {
    const valorTransacao = 300
    const calculadoraTaxa = new CalculadoraTaxaTransacaoDebito()    
    const valorTaxaTransacao = calculadoraTaxa.calcular(valorTransacao)
    const valorTaxaTransacaoEsperado = valorTransacao * (calculadoraTaxa.TAXA_DEBITO / 100)
    expect(valorTaxaTransacao).toBe(valorTaxaTransacaoEsperado)
  })
})