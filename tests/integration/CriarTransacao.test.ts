import TransacaoDAOMemory from '../../src/infra/dao/TransacaoDAOMemory'
import ContaDAOMemory from '../../src/infra/dao/ContaDAOMemory'
import CriarTransacao from '../../src/application/usecase/CriarTransacao'
import { IFormaPagamento } from '../../src/domain/Transacao'
import Conta from '../../src/domain/Conta'
import CalculadoraTaxaTransacaoCredito from '../../src/domain/CalculadoraTaxaTransacaoCredito'
import CalculadoraTaxaTransacaoDebito from '../../src/domain/CalculadoraTaxaTransacaoDebito'
import CalculadoraTaxaTransacaoPix from '../../src/domain/CalculadoraTaxaTransacaoPix'

describe("Criar Transação | Teste de integração (usecase)", () => {
  test("Deve criar uma nova transacao com forma de pagamento PIX", async () => {
    const valorTransacao = 25
    const valorSaldoInicialConta = 500
    const calculadoraTaxaTransacao = new CalculadoraTaxaTransacaoPix()
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: valorSaldoInicialConta } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO)
    const output = await transacao.execute("P" as any, 1991, valorTransacao)
    const valorTaxaTransacao = valorTransacao * (calculadoraTaxaTransacao.TAXA_PIX / 100)
    const valorSaldoFinalConta = valorSaldoInicialConta - valorTransacao - valorTaxaTransacao
    expect(output.saldo).toBe(valorSaldoFinalConta)
    expect(output.conta_id).toBe(1991)
  })

  test("Deve criar uma nova transacao com forma de pagamento CREDITO aplicando a taxa de transacao", async () => {
    const valorTransacao = 25
    const valorSaldoInicialConta = 500
    const calculadoraTaxaTransacao = new CalculadoraTaxaTransacaoCredito()
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: valorSaldoInicialConta } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO)
    const output = await transacao.execute("C" as any, 1991, valorTransacao)
    const valorTaxaTransacao = valorTransacao * (calculadoraTaxaTransacao.TAXA_CREDITO / 100)
    const valorSaldoFinalConta = valorSaldoInicialConta - valorTransacao - valorTaxaTransacao
    expect(output.saldo).toBe(valorSaldoFinalConta)
    expect(output.conta_id).toBe(1991)
  })

  test("Deve criar uma nova transacao com forma de pagamento DEBITO aplicando a taxa de transacao", async () => {
    const valorTransacao = 25
    const valorSaldoInicialConta = 500
    const calculadoraTaxaTransacao = new CalculadoraTaxaTransacaoDebito()
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: valorSaldoInicialConta } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO)
    const output = await transacao.execute("D" as any, 1991, valorTransacao)
    const valorTaxaTransacao = valorTransacao * (calculadoraTaxaTransacao.TAXA_DEBITO / 100)
    const valorSaldoFinalConta = valorSaldoInicialConta - valorTransacao - valorTaxaTransacao
    expect(output.saldo).toBe(valorSaldoFinalConta)
    expect(output.conta_id).toBe(1991)
  })

  test("Deve lançar uma exceção se não houver saldo", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO)            
    expect(
      transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    ).rejects.toThrow(new Error("Saldo insuficiente"));
  })

  test("Deve lançar uma exceção se forma de pagamento inválido", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO) 
    await expect(
      transacao.execute("X" as unknown as any, 1991, 75)
    ).rejects.toThrow(new Error("Forma de pagamento inválido"))
  })

  test("Deve lançar uma exceção se valor da transação abaixo de 1 centavo", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO) 
    await expect(
      transacao.execute("P" as any, 1991, 0)
    ).rejects.toThrow(new Error("Informe um valor acima de R$0,00"))
  })

  test("Deve lançar uma exceção se a conta da transação não existir", async () => {
    const contaDAO = new ContaDAOMemory()    
    const transacaoDAO = new TransacaoDAOMemory()    
    const transacao = new CriarTransacao(transacaoDAO, contaDAO) 
    await expect(
      transacao.execute("P" as any, 2002, 99.90)
    ).rejects.toThrow(new Error("Conta não existe"))
  })
})