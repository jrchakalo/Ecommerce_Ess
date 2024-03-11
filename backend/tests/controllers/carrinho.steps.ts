/*import {loadFeature, defineFeature} from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import {di} from '../../src/di';
import ProductService from '../../src/services/product.service';
import CarrinhoModel from '../../src/models/carrinho.model';
import UserModel from '../../src/models/user.model';
import ProductModel from '../../src/models/product.model';
import UserService from '../../src/services/user.service';
import UserRepository from '../../src/repositories/user.repository';
import ProductRepository from '../../src/repositories/product.repository';
import CarrinhoRepository from '../../src/repositories/carrinho.repository';
import CarrinhoService from '../../src/services/carrinho.service';
import fs from 'fs';
import LoginEntity from '../../src/entities/login.entity';

const feature = loadFeature('tests/features/carrinho.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let mockProductRepository: ProductRepository;
    let mockCarrinhoRepository: CarrinhoRepository;
    let response: supertest.Response;
    let userService: UserService;
    let productService: ProductService;
    let carrinhoService: CarrinhoService;

    const mockProductData = new ProductModel({
        nome: 'Piada Mortal',
        id: '1',
        quantidade: 7,
        preco: 20.00,
        local: 'São Paulo',
    });
    const userData = new UserModel({
        id: "1",
        nome: 'Teste',
        cpf: '123.456.789-01',
        dataNascimento: '25/10/1999',
        email: '',
        login: 'teste',
        senha: 'senhateste',
        logado: false
    });

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        mockProductRepository = di.getRepository<ProductRepository>(ProductRepository);
        mockCarrinhoRepository = di.getRepository<CarrinhoRepository>(CarrinhoRepository);

        const user = new UserModel({
            id: "1",
            nome: 'Teste',
            cpf: '123.456.789-01',
            dataNascimento: '25/10/1999',
            email: '',
            login: 'teste',
            senha: 'senhateste',
            logado: false
        })
        const userCart = new CarrinhoModel({
            id: "123",
            id_produtos: [],
            quantidade: 0,
            data_criacao: new Date(),
            data_atualizacao: new Date()
        })
        const product = new ProductModel({
            nome: 'Piada Mortal',
            id: '123.456.789-01',
            quantidade: 7,
            preco: 20.00,
            local: 'São Paulo',
        })

        userService = new UserService(mockUserRepository);
        userService.createUser(user);
        productService = new ProductService(mockProductRepository);
        productService.createProduct(product);
        carrinhoService = new CarrinhoService(mockCarrinhoRepository);
        carrinhoService.createCarrinho(userCart);
    });

    test('Adicionar item ao carrinho', ({given, when, then, and}) => {

        given(/^Estou logado com o usuário de login "(.*)" e senha "(.*)"$/, async (login, senha) => {
            response = await request.post('/api/users/cadastro').send(mockUserData);
            expect(response.status).toBe(200);
            response = await request.post('/api/users/login').send(new LoginEntity({ login, senha }));
            expect(response.status).toBe(200);
        });

        when(/^eu o adiciono ao carrinho o produto de id "(.*)"$/, async (id) => {  
            response = await request.post('/api/cart/addProduct').send({ });
            expect(response.status).toBe(200);
        });
    
        then('apenas o item adicionado estará presente na lista do carrinho', async () => {
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id_produtos).toContain(productData.id);
            expect(response.body.data.id).toBe(userData.cpf);
        });
    });
    });*/