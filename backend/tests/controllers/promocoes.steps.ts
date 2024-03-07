import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import PromocaoRepository from '../../src/repositories/promocao.repository';
import PromocaoModel from '../../src/models/promocao.model';
import fs from 'fs';

const feature = loadFeature('tests/features/promocoes.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockPromocaoRepository: PromocaoRepository;
    let response: supertest.Response;
    let promocaoData = new PromocaoModel({
        nome: '',
        valor: '',
        tipo: '',
        validade: ''
    });


    beforeEach(() => {
        mockPromocaoRepository = di.getRepository<PromocaoRepository>(PromocaoRepository);
        
        promocaoData.deletarPromocoes();

        promocaoData.id = '';
        promocaoData.nome = '';
        promocaoData.valor = '';
        promocaoData.tipo = '';
        promocaoData.validade = '';
    });

    test('Cadastro de promoção com sucesso Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^o sistema possui o cupom de promoção "(.*)"$/, async (nome) => {
            const promocao = new PromocaoModel({
                nome: nome,
                valor: '10',
                tipo: 'Geral',
                validade: 'Usuário com 3 meses ou menos no sistema'
            });
            promocao.salvarPromocao(promocao)
        });

        and(/^o sistema possui o cupom de promoção "(.*)"$/, async (nome) => {
            const promocao = new PromocaoModel({
                nome: nome,
                valor: '70',
                tipo: 'Geral',
                validade: 'Usuário com 3 meses ou menos no sistema'
            });
            promocao.salvarPromocao(promocao)
        });

        and(/^está na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Promoção');
        });

        when(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição POST for enviada para "(.*)" enviando os dados do novo cupom$/, async (rota) => {
            response = await request.post(rota).send(promocaoData);
        });

        then(/^uma mensagem de confirmação é enviada "(.*)"$/, async(expectedMessage) => {
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe(expectedMessage);
            //promocaoData.salvarPromocao(promocaoData);
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });
     });

    test('Cadastro de promoção com sucesso com campo valor em branco Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^está na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Promoção');
        });

        when(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição POST for enviada para "(.*)" enviando os dados do novo cupom$/, async (rota) => {
            console.log("PROMOCAODATA: " + JSON.stringify(promocaoData));
            response = await request.post(rota).send(promocaoData);
        });

        then(/^uma mensagem de confirmação é enviada "(.*)"$/, async(expectedMessage) => {
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe(expectedMessage);
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,nome) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(nome)).toBe(true);
            }
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });
    });

    test('Falha no cadastro de promoção por Valor inválido Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });
        and(/^está na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Promoção');
        });
        when(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });
        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });
        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });
        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });
        and (/^uma requisição POST for enviada para "(.*)" enviando os dados do novo cupom$/, async (rota) => {
            response = await request.post(rota).send(promocaoData);
            console.log("MENSAGEM: " +JSON.stringify(response.body.msg));
        });
        then(/^uma mensagem de aviso é enviada "(.*)"$/, (expectedMessage) => {
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe(expectedMessage);
        });
        and(/^o sistema não tem armazenado em  "(.*)" o cupom "(.*)"$/, (local,nome) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(nome)).toBe(false);
            }
        });
    });

    test('Falha no cadastro de promoção por Nome inválido Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^o sistema possui o cupom de promoção "(.*)"$/, async (nome) => {
            const promocao = new PromocaoModel({
                nome: nome,
                valor: '10',
                tipo: 'Geral',
                validade: 'Usuário com 3 meses ou menos no sistema'
            });
            promocao.salvarPromocao(promocao)
        });

        and(/^o sistema possui o cupom de promoção "(.*)"$/, async (nome) => {
            const promocao = new PromocaoModel({
                nome: nome,
                valor: '60',
                tipo: 'Livros',
                validade: 'Usuário com mais de 12 meses no sistema ou mais de 12 compras'
            });
            promocao.salvarPromocao(promocao)
        });
        and(/^o sistema possui o cupom de promoção "(.*)"$/, async (nome) => {
            const promocao = new PromocaoModel({
                nome: nome,
                valor: '70',
                tipo: 'Geral',
                validade: 'Usuário com 3 meses ou menos no sistema'
            });
            promocao.salvarPromocao(promocao)
        });

        and(/^está na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Promoção');
        });

        when(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição POST for enviada para "(.*)" enviando os dados do novo cupom$/, async (rota) => {
            response = await request.post(rota).send(promocaoData);
        });

        then(/^uma mensagem de aviso é enviada "(.*)"$/, async(expectedMessage) => {
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe(expectedMessage);
            //promocaoData.salvarPromocao(promocaoData);
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });

        and(/^o sistema tem armazenado em "(.*)" o cupom "(.*)"$/, async (local,id) => {
            if (local == 'Cupons cadastrados') {
                expect(promocaoData.verificarExistente(id)).toBe(true);
            }
        });
        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });
     });

    // test ('Falha no Cadastro de promoção por Email já Cadastrado', ({ given, when, then, and }) => {
    //     given(/^estou na página "(.*)"$/, async (page) => {
    //         if (page == 'Cadastro de promoção') {
    //             page = 'api/promocaos/cadastro';
    //         }
    //         const rota = '/${page}'
    //         response = await request.get(rota);
    //     });

    //     and(/^o promoção de email "(.*)" está cadastrado no sistema$/, async (email) => {
    //         const promocao = new PromocaoModel({
    //             nome: 'Teste',
    //             cpf: '123.456.789-01',
    //             dataNascimento: new Date('25/10/2000'),
    //             email: email,
    //             login: 'teste',
    //             senha: 'senhateste'
    //         });
    //         fs.writeFileSync('./src/models/promocaos.json', JSON.stringify(promocao));
    //     });       

    //     when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and (/^realizo o cadastro do promoção$/, async () => {
    //         const verifSenha = promocaoData.verificaSenha();
    //         const verifBranco = promocaoData.verificaBranco();
    //         if(!promocaoData.verificarExistente('login', promocaoData.login) || !promocaoData.verificarExistente('cpf', promocaoData.cpf) || !promocaoData.verificarExistente('email', promocaoData.email) || !verifBranco || !verifSenha) {
    //             response = await request.post('/api/promocoes/cadastro').send(promocaoData);
    //         }else{
    //             response.status = 400;
    //         }
    //     });

    //     then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
    //         if(response.status == 400){
    //             expect(response.body.msg).toBe(expectedMessage);
    //         }else{
    //             expect(response.status).toBe(200);
    //             expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
    //         }
    //     });
    // });

    // test ('Falha no Cadastro de promoção por CPF já Cadastrado', ({ given, when, then, and }) => {
    //     given(/^estou na página "(.*)"$/, async (page) => {
    //         if (page == 'Cadastro de promoção') {
    //             page = 'api/promocoes/cadastro';
    //         }
    //         const rota = '/${page}'
    //         response = await request.get(rota);
    //     });

    //     and(/^o promoção de cpf "(.*)" está cadastrado no sistema$/, async (cpf) => {
    //         const promocao = new PromocaoModel({
    //             nome: 'teste',
    //             cpf: cpf,
    //             dataNascimento: new Date('25/10/2000'),
    //             email: 'teste@teste.com',
    //             login: 'teste',
    //             senha: 'senhateste'
    //         });
    //         PromocaoData.salvarUsuario(promocao);
    //     });       

    //     when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and (/^realizo o cadastro do promoção$/, async () => {
    //         const verifSenha = promocaoData.verificaSenha();
    //         const verifBranco = promocaoData.verificaBranco();
    //         if(!promocaoData.verificarExistente('login', promocaoData.login) || !promocaoData.verificarExistente('cpf', promocaoData.cpf) || !promocaoData.verificarExistente('email', promocaoData.email) || !verifBranco || !verifSenha){
    //             response = await request.post('/api/promocaos/cadastro').send(promocaoData);
    //         }else{
    //             response.status = 400;
    //         }
    //     });

    //     then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
    //         console.log(response.body);
    //         if(response.status == 400){
    //             expect(response.body.msg).toBe(expectedMessage);
    //         }else{
    //             expect(response.status).toBe(200);
    //             expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
    //         }
    //     });
    // });

    // test ('Falha no Cadastro de promoção por Campo em Branco', ({ given, when, then, and }) => {
    //     given(/^estou na página "(.*)"$/, async (page) => {
    //         if (page == 'Cadastro de promoção') {
    //             page = 'api/promocoes/cadastro';
    //         }
    //         const rota = '/${page}'
    //         response = await request.get(rota);
    //     });     

    //     when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and (/^realizo o cadastro do promoção$/, async () => {
    //         const verifSenha = promocaoData.verificaSenha();
    //         const verifBranco = promocaoData.verificaBranco();
    //         if(!promocaoData.verificarExistente('login', promocaoData.login) || !promocaoData.verificarExistente('cpf', promocaoData.cpf) || !promocaoData.verificarExistente('email', promocaoData.email) || !verifBranco || !verifSenha) {
    //             response = await request.post('/api/promocoess/cadastro').send(promocaoData);
    //         }else{
    //             response.status = 400;
    //         }
    //     });

    //     then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
    //         if(response.status == 400){
    //             expect(response.body.msg).toBe(expectedMessage);
    //         }else{
    //             expect(response.status).toBe(200);
    //             expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
    //         }
    //     });
    // });

    // test ('Falha no Cadastro de promoção por Senha Inválida com Nome', ({ given, when, then, and }) => {
    //     given(/^estou na página "(.*)"$/, async (page) => {
    //         if (page == 'Cadastro de promoção') {
    //             page = 'api/promocoess/cadastro';
    //         }
    //         const rota = '/${page}'
    //         response = await request.get(rota);
    //     });     

    //     when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and (/^realizo o cadastro do promoção$/, async () => {
    //         const verifSenha = promocaoData.verificaSenha();
    //         const verifBranco = promocaoData.verificaBranco();
    //         if(!promocaoData.verificarExistente('login', promocaoData.login) || !promocaoData.verificarExistente('cpf', promocaoData.cpf) || !promocaoData.verificarExistente('email', promocaoData.email) || !verifBranco || !verifSenha) {
    //             response = await request.post('/api/promocaos/cadastro').send(promocaoData);
    //         }else{
    //             response.status = 400;
    //         }
    //     });

    //     then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
    //         if(response.status == 400){
    //             expect(response.body.msg).toBe(expectedMessage);
    //         }else{
    //             expect(response.status).toBe(200);
    //             expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
    //         }
    //     });
    // });

    // test ('Falha no Cadastro de promoção por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
    //     given(/^estou na página "(.*)"$/, async (page) => {
    //         if (page == 'Cadastro de promoção') {
    //             page = 'api/promocaos/cadastro';
    //         }
    //         const rota = '/${page}'
    //         response = await request.get(rota);
    //     });     

    //     when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
    //         promocaoData.preencherCampo(campo, valor);
    //     });

    //     and (/^realizo o cadastro do promoção$/, async () => {
    //         const verifSenha = promocaoData.verificaSenha();
    //         const verifBranco = promocaoData.verificaBranco();
    //         if(!promocaoData.verificarExistente('login', promocaoData.login) || !promocaoData.verificarExistente('cpf', promocaoData.cpf) || !promocaoData.verificarExistente('email', promocaoData.email) || !verifBranco || !verifSenha) {
    //             response = await request.post('/api/promocaos/cadastro').send(promocaoData);
    //         }else{
    //             response.status = 400;
    //         }
    //     });

    //     then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
    //         if(response.status == 400){
    //             expect(response.body.msg).toBe(expectedMessage);
    //         }else{
    //             expect(response.status).toBe(200);
    //             expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
    //         }
    //     });
    // });
});