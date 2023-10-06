export default class Conta {
  constructor(readonly conta_id: number, readonly valor: number) {}

  obterSaldo() {
    return this.valor
  }
}