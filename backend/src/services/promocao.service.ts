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
        msg: 'Promoção não encontrada.',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async createPromocao2(data: PromocaoEntity): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.createPromocao(data);
    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async createPromocao(data: PromocaoEntity): Promise<SuccessResult> {
    let promocao = new PromocaoModel(data);
    let validacao = this.validaPromocao(promocao);
    console.log("VALIDACAO: " + validacao);
    if (validacao.status == 200){
      const promocaoEntity = await this.promocaoRepository.createPromocao(validacao.promocao);
      promocao = new PromocaoModel(promocaoEntity);
    }

    return new SuccessResult({
      msg: validacao.msg,
      data: promocao,
      code: validacao.status
    });
  }

  public async updatePromocaoById(id: string, data: PromocaoEntity): Promise<SuccessResult>  {

    let promocao = new PromocaoModel(data);
    let validacao = this.validaUpdatePromocao(promocao);
    let promocaoEntity = null;

    //console.log("ValidacaoUpdate: " + validacao);
    if (validacao.status == 200){
      let promocaoEntity = await this.promocaoRepository.updatePromocaoById(id, promocao);

      if (!promocaoEntity) {
        throw new HttpNotFoundError({
          msg: 'Promoção não encontrada',
          msgCode: PromocaoServiceMessageCode.promocao_not_found,
        });
      }
    }

    return new SuccessResult({
      msg: validacao.msg,
      data: promocaoEntity,
      code: validacao.status
    });
  }

  public async deletePromocaoById(id: string): Promise<SuccessResult>  {

    //console.log("ValidacaoUpdate: " + validacao);
      let promocaoEntity = await this.promocaoRepository.deletePromocaoById(id);

    if (!promocaoEntity) {
      throw new HttpNotFoundError({
        msg: 'Promoção não encontrada',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    return new SuccessResult({
      msg: "Promoção removida com sucesso",
      // data: promocaoEntity,
      code: 200
    });
  }

  private validaPromocao (promocaoData: PromocaoModel){
    let returnData = {
      status: 400,
      msg: "",
      promocao: promocaoData
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
  
    } else if(!promocaoData.verificarValor()) {
        returnData.status = 400;
        returnData.msg = "Valor inválido";
        console.log('1 '+ JSON.stringify(returnData));
        
    } else {
        returnData.status = 200;
        returnData.msg ="Cadastro de promoção concluído com sucesso!"  ;
        console.log('2 '+ JSON.stringify(returnData));
    }

    return returnData; 
  }

  private validaUpdatePromocao (promocaoData: PromocaoModel){

    let returnData = {
      status: 400,
      msg: "",
      promocao: promocaoData
    };
    const verifBranco = promocaoData.verificarBranco(promocaoData);

    if(verifBranco == 1) {
        returnData.status = 400;
        returnData.msg = "Campos em branco";
        console.log('1.2 '+ JSON.stringify(returnData));
  
    } else if(verifBranco == 2) {
        returnData.status = 200;
        returnData.msg = "As Informações foram atualizadas com sucesso"
        promocaoData.valor = '10';
  
    } else if(!promocaoData.verificarValor()) {
        returnData.status = 400;
        returnData.msg = "Valor inválido";
        console.log('1 '+ JSON.stringify(returnData));
        
    } else {
        returnData.status = 200;
        returnData.msg = "As Informações foram atualizadas com sucesso";
        console.log('2 '+ JSON.stringify(returnData));
    }

    return returnData; 
  }
}

export default PromocaoService;