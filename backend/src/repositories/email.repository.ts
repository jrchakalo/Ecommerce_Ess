import EmailEntity from '../entities/email.entity';
import EmailModel from '../models/email.model';
import fs from 'fs';
import BaseRepository from './base.repository';
const emailJsonPath = './src/models/emails.json';

class EmailRepository extends BaseRepository<EmailEntity> {
  constructor() {
    super('users');
  }

  public async sendEmails(data: EmailEntity): Promise<EmailEntity> {
    if(!fs.existsSync(emailJsonPath)){
      fs.writeFileSync(emailJsonPath, '[]');
    }
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const addData = [...emailJson, data];

    fs.writeFileSync(emailJsonPath, JSON.stringify(addData));

    return data;
  }

  public async checkEmailDeliverySuccess(id: string): Promise<EmailEntity | null> {
    // Verificar se o e-mail foi entregue
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

      for (let index = 0; index < emailJson.length; index++) {
        if (emailJson[index].id === id) {
          return emailJson[index];
        }
      }
    
    return null;
  }

  public async checkEmailInSpamFolder(id: string): Promise<boolean> {
    // Verificar se o e-mail foi enviado para a caixa de spam
    const emailJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    const email = emailJson.find((email: any) => email.id === id);

    if (!email) {
        throw new Error(`Email com o ID: ${id} não encontrado`);
    }

    return !email.isSpam;
}

  public async getAllEmails(): Promise<EmailModel[]> {
    const emailsJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    return emailsJson;
  }

  public async getAllSpamEmails(): Promise<EmailModel[]> {
    const emailsJson = JSON.parse(fs.readFileSync(emailJsonPath, 'utf-8'));

    // Filtrar apenas os emails marcados como spam
    const spamEmails = emailsJson.filter((email: EmailModel) => email.isSpam);

    return spamEmails;
}

}

export default EmailRepository;
