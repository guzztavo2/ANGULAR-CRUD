export class informacao {

    private id!: number | string;
    private informacao!: string;
    private dataCriacao!: Date;
    private dataAtualizacao!: Date;

    constructor(informacao: string | undefined) {
        if (informacao !== undefined) {
            this.setInformacao(informacao);
            this.verificarData();
        }
    }
    private verificarData() {
        if (this.dataCriacao == undefined)
            this.setDataCriacao(Date.now());
        else
            this.SetDataAtualizacao(Date.now());
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
}