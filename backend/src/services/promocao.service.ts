import PromocaoEntity from '../entities/promocao.entity'; // Importa a entidade de promoção
import PromocaoModel from '../models/promocao.model'; // Importa o modelo de promoção
import PromocaoRepository from '../repositories/promocao.repository'; // Importa o repositório de promoção
import { HttpNotFoundError } from '../utils/errors/http.error'; // Importa o erro de não encontrado HTTP
import { SuccessResult } from '../utils/result'; // Importe o objeto de resultado de sucesso, se necessário
class PromocaoServiceMessageCode {
    public static readonly promocao_not_found = 'promocao_not_found';
}

class PromocaoService {
  private promocaoRepository: PromocaoRepository;

  constructor(promocaoRepository: PromocaoRepository) {
    this.promocaoRepository = promocaoRepository;
  }

public async getAllPromocoes(): Promise<PromocaoModel[]> {
    const promocoesEntity = await this.promocaoRepository.getAllPromocoes();

    const promocoesModel = promocoesEntity.map((promocao: PromocaoEntity) => new PromocaoModel(promocao));

    return promocoesModel;
}

  public async getPromocaoById(id: string): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.getPromocaoById(id);

    if (!promocaoEntity) {
      throw new HttpNotFoundError({
        msg: 'Promocao not found',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async createPromocao(data: PromocaoEntity): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.createPromocao(data);
    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async createPromocao2(data: PromocaoEntity): Promise<SuccessResult> {
    let promocao = new PromocaoModel(data);
    if (this.validaPromocao(promocao).status == 200){
      const promocaoEntity = await this.promocaoRepository.createPromocao(data);
      promocao = new PromocaoModel(promocaoEntity);
    }

    return new SuccessResult({
      msg: this.validaPromocao(promocao).msg,
      data: promocao,
      code: this.validaPromocao(promocao).status
    });
  }

  public async updatePromocaoById(id: string, data: PromocaoEntity): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.updatePromocaoById(id, data);

    if (!promocaoEntity) {
      throw new HttpNotFoundError({
        msg: 'Promocao not found',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  private validaPromocao (promocaoData: PromocaoModel){
    //const promocaoData = new PromocaoModel(promocao);
    let returnData = {
      status: 400,
      msg: ""
    };
    const verifBranco = promocaoData.verificarBranco(promocaoData);
    if(promocaoData.verificarExistente(promocaoData.id)) {
        console.log("Id: " + promocaoData.id);
        console.log("Nome: " + promocaoData.nome);
        returnData.status = 400;
        returnData.msg = "Promoção com ID existente";
        console.log('1.1 '+ JSON.stringify(returnData) + "Id: " + promocaoData.id);
  
    } else if(verifBranco == 1) {
        returnData.status = 400;
        returnData.msg = "Campos em branco";
        console.log('1.2 '+ JSON.stringify(returnData));
  
    } else if(verifBranco == 2) {
        returnData.status = 200;
        returnData.msg ="Cadastro de promoção concluído com sucesso!"
        promocaoData.valor = '10';
        //response = await request.post('/api/promocoes/cadastro').send(JSON.stringify(promocaoData));
        //console.log('1 '+ JSON.stringify(response));
  
    } else if(!promocaoData.verificarValor()) {
        returnData.status = 400;
        returnData.msg = "Valor inválido";
        console.log('1 '+ JSON.stringify(returnData));
        
    } else {
        returnData.status = 200;
        returnData.msg ="Cadastro de promoção concluído com sucesso!"  ;
        //response = await request.post('/api/promocoes/cadastro').send(JSON.stringify(promocaoData));
        console.log('2 '+ JSON.stringify(returnData));
    }

    return returnData;
}

  
}

export default PromocaoService;