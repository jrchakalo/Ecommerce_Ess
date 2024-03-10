Feature: Login
    As a Usuário
    I want to fazer login no sistema
    So that eu possa realizar ações no site de acordo com minha credencial

Scenario: Login com sucesso
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu realizo um post para o endpoint "/api/login" com os dados "jrchakalo" e "senha123"
    Then devo receber o status 200
    And uma mensagem "Usuário logado com sucesso"

Scenario: Login com falha por usuario não encontrado
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu realizo um post para o endpoint "/api/login" com os dados "jrchakalol" e "senha123"
    Then devo receber o status 400
    And uma mensagem "Usuário não encontrado"

Scenario: Login com falha por senha incorreta
    Given que eu tenho um usuário cadastrado com o login "jrchakalo" com a senha "senha123"
    When eu realizo um post para o endpoint "/api/login" com os dados "jrchakalo" e "senha1234"
    Then devo receber o status 400
    And uma mensagem "Senha incorreta"

