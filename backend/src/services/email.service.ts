import EmailEntity from '../entities/email.entity';
import EmailModel from '../models/email.model';
import EmailRepository from '../repositories/email.repository';
import fs from 'fs';
const emailJsonPath = './src/models/emails.json';

class EmailService {
  private emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  /*public async sendEmails(data: EmailEntity): Promise<EmailModel> {

    const emailEntity = await this.emailRepository.sendEmails(data);
    const emailModel = new EmailModel(emailEntity);

    return emailModel;
  }

  public async checkEmailDeliverySuccess(id: string): Promise<EmailModel | null> {
    // Verificar se o e-mail foi entregue

    const emailEntity = await this.emailRepository.checkEmailDeliverySuccess(id);
    const emailModel = emailEntity ? new EmailModel(emailEntity) : null;

    return emailModel;
  }

  public async checkEmailInSpamFolder(id: string): Promise<boolean> {
    // Verificar se o e-mail foi enviado para a caixa de spam
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const email = emailJson.find((email: any) => email.id === id);

    if (!email) {
        throw new Error(`Email com o ID: ${id} não encontrado`);
    }

    return !email.isDelivered;
}

  public async sendEmailWithoutReceipt(data: EmailEntity): Promise<EmailModel> {
    const emailEntity = await this.emailRepository.sendEmailWithoutReceipt(data);
    const emailModel = new EmailModel(emailEntity);

    return emailModel;
  }

  public async getAllEmails(): Promise<EmailModel[]> {
    const emailEntity = await this.emailRepository.getAllEmails();
    const emailModel: EmailModel[] = [];
      
    let i = 0;
    const totalEmails = emailEntity.length;
  
      for (i = 0; i < totalEmails; i++) {
          const email = new EmailModel(emailEntity[i]);
          emailModel[i] = email;
      }
  
      return emailModel;
  }

  public async getSpamEmails(): Promise<EmailModel[]> {
    const spamEmailEntities = await this.emailRepository.getSpamEmails();
    const spamEmailModels: EmailModel[] = spamEmailEntities.map((emailEntity: EmailEntity) => new EmailModel(emailEntity));

    return spamEmailModels;
  }*/
}

export default EmailService;
