import PromocaoEntity from '../entities/promocao.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base
import fs from 'fs';

const filePathPromocoes = './src/models/promocoes.json';

class PromocaoRepository extends BaseRepository<PromocaoEntity> {
  constructor() {
    super('promocoes'); // Define o prefixo para promoções
  }

  public async getAllPromocoes(): Promise<PromocaoEntity[]> {
    //return await this.findAll();
    const promocoesJson = JSON.parse(fs.readFileSync('./src/models/promocoes.json', 'utf-8'));
    return promocoesJson
  }

  public async getPromocaoById(id: string): Promise<PromocaoEntity | null> {
    //return await this.findOne((promocao) => promocao.id === id);

    const promocoesJson = JSON.parse(fs.readFileSync('./src/models/promocoes.json', 'utf-8'));

    for (let index = 0; index < promocoesJson.length; index++) {
      //console.log(promocoesJson[index])
      if (promocoesJson[index].id === id) {
        return promocoesJson[index];
      }
    }
  
  return null;
  }

  public async createPromocao(data: PromocaoEntity): Promise<PromocaoEntity> {

    if(!fs.existsSync(filePathPromocoes)){
      fs.writeFileSync(filePathPromocoes, '[]');
    }
    const promocoesJson = JSON.parse(fs.readFileSync(filePathPromocoes, 'utf-8'));

    const addData = [...promocoesJson, data];

    fs.writeFileSync(filePathPromocoes, JSON.stringify(addData));

    return data;
    
  }

  public async updatePromocaoById(id: string, data: PromocaoEntity): Promise<PromocaoEntity | null> {
    return await this.update((promocao) => promocao.id === id, data);
  }

}

export default PromocaoRepository;