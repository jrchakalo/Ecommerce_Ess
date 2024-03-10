import { defineFeature, loadFeature } from 'jest-cucumber';
import app from '../../src/app';
import supertest from 'supertest';
import { di } from '../../src/di';
import LoginRepository from '../../src/repositories/login.repository';
import LoginService from '../../src/services/login.service';
import UserService from '../../src/services/user.service';
import UserModel from '../../src/models/user.model';
import { mock } from 'node:test';
import fs from 'fs';
import LoginEntity from '../../src/entities/login.entity';
import exp from 'constants';

const feature = loadFeature('./tests/features/login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockLoginRepository: LoginRepository;
  let response: supertest.Response;
  const loginRepository = new LoginRepository();
  const mockUserTest = new UserModel({
    id: '1',
    nome: 'Júnior',
    cpf: '11111111111',
    dataNascimento: '09/09/2003',
    email: 'jisj@cin.ufpe.br',
    login: 'jrchakalo',
    senha: 'senha123',
    logado: false
  });

  beforeEach(() => {
    mockLoginRepository = di.getRepository<LoginRepository>(LoginRepository);
    fs.writeFileSync('./src/models/users.json', JSON.stringify([]));
  });

  test('Login com sucesso', ({ given, when, then , and }) => {
    given(/^que eu tenho um usuário cadastrado com o login "(.*)" com a senha "(.*)"$/, async (login, senha) => {
      response = await request.post('/api/users/cadastro').send(mockUserTest);
    });

    when(/^eu realizo um post para o endpoint "(.*)" com os dados "(.*)" e "(.*)"$/, async (endpoint, login, senha) => {
      response = await request.post(endpoint).send(new LoginEntity({ login, senha }));
    });

    then(/^devo receber o status 200$/, () => {
      expect(response.status).toBe(200);
    });

    and(/^uma mensagem "(.*)"$/, async (mensagem) => {
      expect(response.body.msg).toBe(mensagem);
    });
  });

  test('Login com falha por usuario não encontrado', ({ given, when, then, and }) => {
    given(/^que eu tenho um usuário cadastrado com o login "(.*)" com a senha "(.*)"$/, async (login, senha) => {
      response = await request.post('/api/users/cadastro').send(mockUserTest);
    });

    when(/^eu realizo um post para o endpoint "(.*)" com os dados "(.*)" e "(.*)"$/, async (endpoint, login, senha) => {
      response = await request.post(endpoint).send(new LoginEntity({ login, senha }));
    });

    then(/^devo receber o status 400$/, () => {
      expect(response.status).toBe(400);
    });

    and(/^uma mensagem "(.*)"$/, (mensagem) => {
      expect(response.body.msg).toBe(mensagem);
    });
  });

  test('Login com falha por senha incorreta', ({ given, when, then, and }) => {
    given(/^que eu tenho um usuário cadastrado com o login "(.*)" com a senha "(.*)"$/, async (login, senha) => {
      response = await request.post('/api/users/cadastro').send(mockUserTest);
    });

    when(/^eu realizo um post para o endpoint "(.*)" com os dados "(.*)" e "(.*)"$/, async (endpoint, login, senha) => {
      response = await request.post(endpoint).send(new LoginEntity({ login, senha }));
    });

    then(/^devo receber o status 400$/, () => {
      expect(response.status).toBe(400);
    });

    and(/^uma mensagem "(.*)"$/, (mensagem) => {
      expect(response.body.msg).toBe(mensagem);
    });
  });
});
