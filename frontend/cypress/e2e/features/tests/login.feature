Feature: Login
    As a Usuário
    I want to fazer login no sistema
    So that eu possa realizar ações no site de acordo com minha credencial

Scenario: Login com sucesso
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu preencho o campo login com "jrchakalo" e eu preencho o campo senha com "senha123" e clica no botão "Login"
    Then devo conseguir logar no sistema
    And receber uma mensagem "Login realizado com sucesso!"

Scenario: Login com falha por usuário não encontrado
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu preencho o campo login com "jrchakalol" e eu preencho o campo senha com "senha123" e clica no botão "Login"
    Then o login deve falhar 
    

Scenario: Login com falha por senha incorreta
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu preencho o campo login com "jrchakalol" e eu preencho o campo senha com "senha1234" e clica no botão "Login"
    Then o login deve falhar
    

