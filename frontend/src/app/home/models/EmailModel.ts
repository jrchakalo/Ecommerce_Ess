export default class EmailModel {
    id: string;
    remetente: string;
    destinatario: string;
    assunto: string;
    corpoEmail: string;
    comprovante?: string;
    isSpam: boolean;
    isDelivered: boolean;

    constructor (data: EmailModel){
        this.id = data.id;
        this.remetente = data.remetente;
        this.destinatario = data.destinatario;
        this.assunto = data.assunto;
        this.corpoEmail = data.corpoEmail;
        this.comprovante = data.comprovante;
        this.isSpam = data.isSpam;
        this.isDelivered = data.isDelivered;
    }
}