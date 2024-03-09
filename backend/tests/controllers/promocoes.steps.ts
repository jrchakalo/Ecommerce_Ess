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
                tipo: 'Livro',
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

    test('Atualização de promoção com sucesso Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^o sistema possui o cupom "(.*)"$/, async (nome) => {
            promocaoData.preencherCampo("nome", nome);
        });

        // and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
        //     // console.log("CAMPO: " + campo);
        //     // console.log("VALOR: " + valor);
        //     promocaoData.preencherCampo(campo, valor);
        // });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
            console.log("PROMOCAODATA: " + JSON.stringify(promocaoData));
            promocaoData.salvarPromocao(promocaoData);
        });

        and(/^está na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            //expect(response.status).toBe(200);
            //expect(response.body.text).toBe('Atualização de promoção');
        });

        when(/^seleciona o cupom "(.*)"$/, async (id) => {
            expect(promocaoData.verificarExistente(id)).toBe(true);
        });

        // and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
        //     promocaoData.preencherCampo(campo, valor);
        // });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^preenche o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição PUT é enviada para "(.*)" enviando os novos dados do cupom$/, async (rota) => {
            response = await request.put(rota).send(promocaoData);
        });

        then(/^uma mensagem de aviso é enviada "(.*)"$/, async(expectedMessage) => {
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
            console.log("ID: " + id);
            console.log("CAMPO: " + campo);
            console.log("DATA: " + data);
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id,campo,data) => {
            expect(promocaoData.verificarPromocaoByCampo(id,campo,data)).toBe(true);

        });
    });

    test('Falha na atualização de promoção por promoção não encontrada Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^o sistema possui o cupom "(.*)"$/, async (nome) => {
            promocaoData.preencherCampo("nome", nome);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
            console.log("PROMOCAODATA: " + JSON.stringify(promocaoData));
            promocaoData.salvarPromocao(promocaoData);
        });

        when(/^um json é enviado com o corpo contendo novos dados para o cupom de nome "(.*)"$/, async ( valor) => {
            promocaoData.preencherCampo("nome", valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição PUT é enviada para "(.*)" enviando os novos dados do cupom$/, async (rota) => {
            response = await request.put(rota).send(promocaoData);
        });

        then(/^uma mensagem de aviso é enviada "(.*)"$/, async(expectedMessage) => {

            console.log("MENSAGEM: " + response.body.msg);

            expect(response.status).toBe(404);
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


    test('Falha na atualização de promoção por Valor inválido Serviço', ({ given, when, then, and }) => {
        given(/^que o usuário "(.*)" está logado no sistema como "(.*)"$/, async (name,userType ) => {
            if (!(userType == 'administrador')) {
                response.status = 400;
            }
        });

        and(/^o sistema possui o cupom "(.*)"$/, async (nome) => {
            promocaoData.preencherCampo("nome", nome);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o cupom "(.*)" tem campo "(.*)" com "(.*)"$/, async (id, campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
            console.log("PROMOCAODATA: " + JSON.stringify(promocaoData));
            promocaoData.salvarPromocao(promocaoData);
        });

        when(/^um json é enviado com o corpo contendo novos dados para o cupom de nome "(.*)"$/, async ( valor) => {
            promocaoData.preencherCampo("nome", valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and(/^o campo "(.*)" tem "(.*)"$/, async (campo, valor) => {
            promocaoData.preencherCampo(campo, valor);
        });

        and (/^uma requisição PUT é enviada para "(.*)" enviando os novos dados do cupom$/, async (rota) => {
            response = await request.put(rota).send(promocaoData);
        });

        then(/^uma mensagem de aviso é enviada "(.*)"$/, async(expectedMessage) => {

            console.log("MENSAGEM: " + response.body.msg);

            expect(response.status).toBe(400);
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

});