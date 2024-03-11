export default class CarrinhoModel {

    id: string; // o mesmo id do usuário
    id_produtos: string[];
    quantidade: number;
    data_criacao: Date;
    data_atualizacao: Date;

    constructor(data: {
        id: string,
        id_produtos: string[],
        quantidade: number,
        data_criacao: Date,
        data_atualizacao: Date
    }) {
        this.id = data.id;
        this.id_produtos = data.id_produtos;
        this.quantidade = data.quantidade;
        this.data_criacao = data.data_criacao;
        this.data_atualizacao = data.data_criacao;
    }
}