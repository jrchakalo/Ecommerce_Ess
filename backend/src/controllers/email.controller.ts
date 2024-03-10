import { Router, Request, Response } from 'express';
import EmailService from '../services/email.service';
import EmailEntity from '../entities/email.entity';
import { SuccessResult } from '../utils/result';
import fs from 'fs';
const emailJson = './src/models/emails.json'

class EmailController {
  private prefix: string = '/emails';
  public router: Router;
  private emailService: EmailService;
  private idCount: number = 1;

  /*constructor(router: Router, emailService: EmailService) {
    this.router = router;
    this.emailService = emailService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.prefix}/enviarEmail`, (req: Request, res: Response) =>
      this.sendEmails(req, res));

    this.router.get(`${this.prefix}/emailEnviado/:id`, (req: Request, res: Response) =>
      this.checkEmailDeliverySuccess(req, res));

    this.router.get(`${this.prefix}/spam/:id`, (req: Request, res: Response) =>
      this.checkEmailInSpamFolder(req, res));

    this.router.get(`${this.prefix}/semComprovante/`, (req: Request, res: Response) =>
      this.sendEmailWithoutReceipt(req, res));

    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getAllEmails(req, res));

    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getSpamEmails(req, res));
  }

  private async sendEmails(req: Request, res: Response) {
    req.body.id = this.generateId();
  
    // Enviar e-mail com os dados fornecidos
    const email = await this.emailService.sendEmails(new EmailEntity(req.body));

    return new SuccessResult({
      msg: 'E-mail enviado com sucesso',
      data: email
    }).handle(res);
  }

  private async checkEmailDeliverySuccess(req: Request, res: Response) {
    const id = req.params.id;

    const checkEmail = await this.emailService.checkEmailDeliverySuccess(id);

    if (!checkEmail) {
      return new SuccessResult({
        msg: 'Email não encontrado',
        data: null,
        msgCode: 'email_not_found',
        code: 404
      }).handle(res);
    }

    if(checkEmail.isDelivered === false){
      return new SuccessResult({
        msg: 'Email não foi entregue',
        data: checkEmail
      }).handle(res);
    }else{
      return new SuccessResult({
        msg: 'E-mail entregue com sucesso',
        data: checkEmail
      }).handle(res);
    }
  }

  private async checkEmailInSpamFolder(req: Request, res: Response) {
    const id = req.params.id;

    const checkEmail = await this.emailService.checkEmailInSpamFolder(id);

    if (!checkEmail) {
      return new SuccessResult({
        msg: 'Email não esta na caixa de Spam',
        data: null,
        msgCode: 'email_not_found',
        code: 404
      }).handle(res);
  }

    return new SuccessResult({
      msg: 'E-mail está na caixa de Spam',
      data: checkEmail
    }).handle(res);
  }

  private async sendEmailWithoutReceipt(req: Request, res: Response) {
    req.body.id = this.generateId();
  
    // Enviar e-mail com os dados fornecidos
    const email = await this.emailService.sendEmailWithoutReceipt(new EmailEntity(req.body));

    return new SuccessResult({
      msg: 'E-mail enviado sem o comprovante',
      data: email
    }).handle(res);
  }

  private async getAllEmails(req: Request, res: Response) {
    // Busca todos os usuários
    const emails = await this.emailService.getAllEmails();

    if (!emails) {
        // Retorna um erro caso não haja usuários
        return new SuccessResult({
            msg: 'Nenhum email encontrado',
            data: null,
            msgCode: 'emails_not_found',
            code: 404
        }).handle(res);
    } 
    // Retorna todos os usuários
    return new SuccessResult({
        msg: 'Todos os Emails',
        data: emails,
    }).handle(res);
  }

  private async getSpamEmails(req: Request, res: Response) {
    // Busca todos os usuários
    const emailsSpam = await this.emailService.getSpamEmails();

    if (!emailsSpam) {
        // Retorna um erro caso não haja usuários
        return new SuccessResult({
            msg: 'Nenhum email marcado como spam encontrado',
            data: null,
            msgCode: 'spamEmails_not_found',
            code: 404
        }).handle(res);
    } 
    // Retorna todos os usuários
    return new SuccessResult({
        msg: 'Todos os Emails marcados como Spam',
        data: emailsSpam,
    }).handle(res);
  }

  private generateId(): string {
    let id: string;
    try{
      const data = fs.readFileSync(emailJson, 'utf-8');
      const lastId = JSON.parse(data).pop();
      id = lastId.id.toString();
    }catch(err){
      id = '0';
    }
    
    this.idCount = parseInt(id) + 1;
    return this.idCount.toString();
  }*/
}

export default EmailController;
