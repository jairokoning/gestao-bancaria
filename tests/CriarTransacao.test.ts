import TransacaoDAOMemory from '../src/TransacaoDAOMemory'
import ContaDAOMemory from '../src/ContaDAOMemory'
import CriarTransacao from '../src/CriarTransacao'
import Transacao, { IFormaPagamento } from '../src/Transacao'
import AppErrorHandler from '../src/AppErrorHandler'
import { AppError } from '../src/AppError'
import Conta from '../src/Conta'



describe("Test CriarTransacao usecase", () => {
  test("Deve criar uma nova transacao com forma de pagamento PIX", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError)
    const output = await transacao.execute("P" as unknown as IFormaPagamento, 1991, 25)
    expect(output.saldo).toBe(475)
    expect(output.conta_id).toBe(1991)
  })

  test("Deve lançar uma exceção se não houver saldo", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError)        
    // expect(
    //   transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    // ).rejects.toThrow(new Error("Saldo insuficiente"));

    //  ID: A1 =>  this works fine
    // expect(
    //   transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    // ).rejects.toEqual(new AppError("Saldo insuficiente", 404));

    expect(
      transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    ).rejects.toEqual(new AppError("Saldo insuficiente", 404));
  })

  test.skip("teste teste", async() => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError)        
    // expect(
    //   transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    // ).rejects.toThrow(new Error("Saldo insuficiente"));

    //  ID: A1 =>  this works fine
    // expect(
    //   transacao.execute("P" as unknown as IFormaPagamento, 1991, 501)
    // ).rejects.toEqual(new AppError("Saldo insuficiente", 404));

    expect(
      transacao.execute("P" as unknown as IFormaPagamento, 1991, 0)
    ).rejects.toThrow(new Error("Valor invalido"))
    
  })

  test("Deve lançar uma exceção se forma de pagamento inválido", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError) 
    await expect(
      transacao.execute("X" as unknown as any, 1991, 75)
    ).rejects.toThrow(new Error("Forma de pagamento inválido"))
  })

  test("Deve lançar uma exceção se valor da transação abaixo de 1 centavo", async () => {
    const contaDAO = new ContaDAOMemory()
    await contaDAO.criarConta({ conta_id: 1991, valor: 500 } as Conta)
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError) 
    await expect(
      transacao.execute("P" as any, 1991, 0)
    ).rejects.toThrow(new Error("Informe um valor acima de R$0,00"))
  })

  test("Deve lançar uma exceção se a conta da transação não existir", async () => {
    const contaDAO = new ContaDAOMemory()    
    const transacaoDAO = new TransacaoDAOMemory()
    const appError = new AppErrorHandler();
    const transacao = new CriarTransacao(transacaoDAO, contaDAO, appError) 
    await expect(
      transacao.execute("P" as any, 2002, 99.90)
    ).rejects.toThrow(new Error("Conta não existe"))
  })
})