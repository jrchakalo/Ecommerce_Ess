import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

//Scenario: Login com sucesso
Given("que eu tenho um usuário cadastrado com o login {string} com a senha {string}", (login, senha) => {
  
});

When("eu preencho os campos com os dados {string} e {string}", (login, senha) => {
  cy.get("[data-cy=input-login]").type(login);
  cy.get("[data-cy=input-password]").type(senha);
  cy.get("[data-cy=login-button]").click();
});

Then("devo conseguir logar no sistema", () => {
  cy.url().should("include", "/home");
});

And("uma mensagem {string}", (message) => {
  cy.contains(message).should("be.visible");
});


//Scenario: falha no login por usuário incorreto
Given("que eu tenho um usuário cadastrado com o login {string} com a senha {string}", (login, senha) => {
  
});

When("eu preencho o login com os dados {string} e {string}", (login, senha) => {
  cy.get("[data-cy=input-login]").type(login);
  cy.get("[data-cy=input-password]").type(senha);
  cy.get("[data-cy=login-button]").click();
});

Then("o login deve falhar", () => {
  cy.url().should("not.include", "/home");
});

//And("eu recebo uma mensagem {string}", (message) => {
//  cy.contains(message).should("be.visible");
//});


//Scenario: falha no login por senha incorreta
Given("que eu tenho um usuário cadastrado com o login {string} com a senha {string}", (login, senha) => {
  
});

When("eu preencho o login com os dados {string} e {string}", (login, senha) => {
  cy.get("[data-cy=input-login]").type(login);
  cy.get("[data-cy=input-password]").type(senha);
  cy.get("[data-cy=login-button]").click();
});

Then("o login deve falhar", () => {
  cy.url().should("not.include", "/home");
});

//And("uma mensagem {string}", (message) => {
//  cy.contains(message).should("be.visible");
//});
