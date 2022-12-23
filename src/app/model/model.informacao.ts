export class informacao {
  public id!: number;
  public informacao!: string;
  public dataCriacao!: Date;
  public dataAtualizacao!: Date;

  constructor(informacao: string | undefined) {
    if (informacao !== undefined) {
      this.setInformacao(informacao);
      this.verificarData();
    }
  }
  public getID(): number {
    return this.id;
  }
  public getInformacao(fullInformacao: boolean | undefined): string {
    if(this.informacao.length > 30){
      if(fullInformacao === undefined || fullInformacao === false)
        return this.informacao.substring(0, 30) + '...';
    }
    return this.informacao;
  }
  private verificarData() {
    if (this.dataCriacao === undefined) this.setDataCriacao(Date.now());
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
    this.dataCriacao = new Date(dataCriacao);
  }
  private SetDataAtualizacao(dataAtualizacao: string | number) {
    this.dataAtualizacao = new Date(dataAtualizacao);
  }
  public static compare(objeto: informacao[], asc: boolean) {
    //console.log(objeto);

    if (asc) objeto.sort((a, b) => compareFn(b.informacao, a.informacao));
    else objeto.sort((a, b) => compareFn(a.informacao, b.informacao));

    return objeto;

    function compareFn(a: any, b: any) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
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
  static reorganizarID(item: informacao[]): informacao[] {
    let resultado: informacao[] = [];
    let cont = 1;
    item.forEach(function (info) {
      info.id = cont;
      resultado.push(info);
      cont++;
    });
    return resultado;
  }
}
