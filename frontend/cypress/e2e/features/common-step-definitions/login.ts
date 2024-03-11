import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Scenario: Login com sucesso
Given("que eu tenho um usuário cadastrado com o CPF {string}, o email {string}, o login {string} e com a senha {string} e que eu estou na página de login", (cpf:string, email:string, login:string, senha:string) => {
  cy.visit("/create-user");
  cy.getDataCy('input-name').type('Mateus');
  cy.getDataCy('input-cpf').type(cpf);
  cy.getDataCy('input-birthdate').type('24031993');
  cy.getDataCy('input-email').type(email);
  cy.getDataCy('input-login').type(login);
  cy.getDataCy('input-password').type(senha);
  cy.getDataCy('create').click();
});

When("eu preencho o campo login com {string} e eu preencho o campo senha com {string} e clico no botão {string}", (login:string, senha:string, botao:string) => {
  cy.getDataCy('input-login').type(login);
  cy.getDataCy("input-password").type(senha);
  cy.getDataCy(botao).click();
});

Then("devo conseguir logar no sistema e receber uma mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});


//Scenario: Login com falha por usuário não encontrado

Then("o login deve falhar", () => {
  cy.url().should("include", "/login");
});

//Scenario: Login com falha por senha incorreta

//Scenario: Acessar página de login
Given("que estou na página inicial", () => {
  cy.visit("/home"); // Visita a página inicial
});

When("eu clico no botão {string}", (buttonText:string) => {
  cy.contains(buttonText).click(); // Clica no botão especificado
});

Then("devo ser redirecionado para a página de login", () => {
  // Verifica se a URL foi redirecionada para a página de login
  cy.url().should("include", "/login");
});
