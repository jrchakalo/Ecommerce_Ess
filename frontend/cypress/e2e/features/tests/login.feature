Feature: Login
    As a Usuário
    I want to fazer login no sistema
    So that eu possa realizar ações no site de acordo com minha credencial

Scenario: Login com sucesso
    Given que eu tenho um usuário cadastrado com o CPF "12345678934", o email "mateus@email.com", o login "matheuscarvalho" e com a senha "senha123" e que eu estou na página de login
    When eu preencho o campo login com "mateuscarvalho" e eu preencho o campo senha com "senha123" e clico no botão "login-button"
    Then devo conseguir logar no sistema e receber uma mensagem "Login realizado com sucesso!"

Scenario: Login com falha por usuário não encontrado
    Given que eu tenho um usuário cadastrado com o CPF "12345678943", o email "amado@email.com", o login "amadobatista" e com a senha "senha123" e que eu estou na página de login
    When eu preencho o campo login com "odiadobatista" e eu preencho o campo senha com "senha123" e clico no botão "login-button"
    Then o login deve falhar 

Scenario: Login com falha por senha incorreta
    Given que eu tenho um usuário cadastrado com o CPF "12345678999", o email "canetaazul@email.com", o login "manoelgomees" e com a senha "senha123" e que eu estou na página de login
    When eu preencho o campo login com "jrchakalo" e eu preencho o campo senha com "senha1234" e clico no botão "login-button"
    Then o login deve falhar

Scenario: Redirecionamento para página de login ao clicar em "Login"
    Given que estou na página inicial
    When eu clico no botão "Login"
    Then devo ser redirecionado para a página de login
