export class informacao {
  public id!: number ;
  public informacao!: string;
  public dataCriacao!: string;
  public dataAtualizacao!: string;

  constructor(informacao: string | undefined) {
    if (informacao !== undefined) {
      this.setInformacao(informacao);
      this.verificarData();
    }
  }
  private verificarData() {
    if (this.dataCriacao == undefined) this.setDataCriacao(Date.now());
    else this.SetDataAtualizacao(Date.now());
  }
  public atualizarInformacao(informacao: string) {
    this.verificarData();
    this.setInformacao(informacao);
  }

  private setID(id: number | string) {
    this.id = Number(id);
  }

  private setInformacao(informacao: string) {
    this.informacao = informacao;
  }
  private setDataCriacao(dataCriacao: string | number) {

    this.dataCriacao = new Date(dataCriacao).toLocaleString();
  }
  private SetDataAtualizacao(dataAtualizacao: string | number) {

    this.dataCriacao = new Date(dataAtualizacao).toLocaleString();
  }

  public static gerarInformacoes(quantidadeInformacoes: number): informacao[] {
    let listStr!: string[];

    listStr = [
      'Hydrogen',
      'Helium',
      'Lithium',
      'Beryllium',
      'Boron',
      'Carbon',
      'Nitrogen',
      'Oxygen',
      'Fluorine',
      'Neon',
    ];
    //console.log(listStr)

    let list: informacao[] = [];
    for (let n = 1; n <= quantidadeInformacoes; n++) {
      let info = new informacao(listStr[Math.floor(Math.random() * 10)]);
      info.setID(n);
      list.push(info);
    }
    return list;
  }
}
