
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Criar um usuário com sucesso
Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

When(
  "o usuário preenche o campo {string} com {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e clica no botão {string}",
  (nome: string, valorNome:string, cpf: string, valorCpf:string, dataNascimento: string, valorData: string,
     email: string, valorEmail: string, login: string, valorLogin: string, senha: string, valorSenha: string,
     button: string) => {
    cy.getDataCy(nome).type(valorNome);
    cy.getDataCy(cpf).type(valorCpf);
    cy.getDataCy(dataNascimento).type(valorData);
    cy.getDataCy(email).type(valorEmail);
    cy.getDataCy(login).type(valorLogin);
    cy.getDataCy(senha).type(valorSenha);
    cy.getDataCy(button).click();
  }
);

Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});

// Scenario: Criar um usuário com falha por nome na senha

// Scenario: Criar um usuário com falha por data de nascimento na senha

// Scenario: Criar um usuário com falha por login existente

// Scenario: Criar um usuário com falha por CPF existente

// Scenario: Criar um usuário com falha por email existente

// Scenario: Atualização de usuário com sucesso
Given("o usuário de login {string} e senha {string} está logado", (login: string, senha: string) => {
  cy.visit("/login");
  cy.getDataCy('input-login').type(login);
  cy.getDataCy('input-password').type(senha);
  cy.getDataCy('login-button').click();
});

When("o usuário clica no botão {string} e clica no botão {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e preenche o campo {string} com {string} e clica no botão {string}", 
  (profileButton: string, updateUserButton: string, nome: string, valorNome: string, login: string, valorLogin: string, senha: string, valorSenha: string, updateButton: string) => {
    cy.getDataCy(profileButton).click();
    cy.getDataCy(updateUserButton).click();
    cy.getDataCy(nome).type(valorNome);
    cy.getDataCy(login).type(valorLogin);
    cy.getDataCy(senha).type(valorSenha);
    cy.getDataCy(updateButton).click();
});

// Scenario: Atualização de usuário com falha por nome na senha

// Scenario: Atualização de usuário com falha por data de nascimento na senha

// Scenario: Atualização de usuário com falha por login existente


