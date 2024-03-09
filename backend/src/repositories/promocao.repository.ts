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
    const promocoesJson = JSON.parse(fs.readFileSync(filePathPromocoes, 'utf-8'));

    // Encontra o usuário no array pelo ID
    const promocaoToUpdate = promocoesJson.find((promocao: PromocaoEntity) => promocao.id === id);

    if (promocaoToUpdate) {
        // Atualiza os campos da promoção
        promocaoToUpdate.nome = data.nome ?? promocaoToUpdate.nome;
        promocaoToUpdate.valor = data.valor ?? promocaoToUpdate.valor;
        promocaoToUpdate.tipo = data.tipo ?? promocaoToUpdate.tipo;
        promocaoToUpdate.validade = data.validade ?? promocaoToUpdate.validade;

        // Escreve a lista atualizada de promoções de volta no arquivo JSON
        fs.writeFileSync(filePathPromocoes, JSON.stringify(promocoesJson));

        return promocaoToUpdate; // Retorna a promoção atualizada
    }
    return null; // Promoção não encontrada
  }

  public async deletePromocaoById(id: string): Promise<PromocaoEntity | null> {
    const promocoesJson = JSON.parse(fs.readFileSync(filePathPromocoes, 'utf-8'));

    // Encontra o índice da promoção a ser deletada no array pelo ID
    const indexToDelete = promocoesJson.findIndex((promocao: PromocaoEntity) => promocao.id === id);

    if (indexToDelete !== -1) {
        // Remove a promoção do array
        const promocaoDeletada = promocoesJson.splice(indexToDelete, 1)[0];

        // Escreve o array de promoções atualizado de volta no arquivo JSON
        fs.writeFileSync(filePathPromocoes, JSON.stringify(promocoesJson));

        return promocaoDeletada; // Retorna a promoção deletada
    }

    return null; // Promoção não encontrada
}

   
}

export default PromocaoRepository;