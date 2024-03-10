Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de usuário com sucesso
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Vitor Aleixo" e preenche o campo "input-cpf" com "12345678918" e preenche o campo "input-birthdate" com "04102001" e preenche o campo "input-email" com "vitoraleixo@email.com" e preenche o campo "input-login" com "vitoraleixo" e preenche o campo "input-password" com "senha123" e clica no botão "create"
    Then o usuário deve ver a mensagem "Usuário criado com sucesso! Você será rediriceionado para a página de login."

Scenario: Cadastro de usuário com falha por nome na senha
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Junior Silva" e preenche o campo "input-cpf" com "12345678927" e preenche o campo "input-birthdate" com "25102000" e preenche o campo "input-email" com "junior@email.com" e preenche o campo "input-login" com "juniorsilva" e preenche o campo "input-password" com "juniorsilva" e clica no botão "create"
    Then o usuário deve ver a mensagem "Erro ao criar usuário! Tente novamente."

Scenario: Cadastro de usuário com falha por data de nascimento na senha
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Junior Silva" e preenche o campo "input-cpf" com "12345678927" e preenche o campo "input-birthdate" com "25102000" e preenche o campo "input-email" com "junior@email.com" e preenche o campo "input-login" com "25102000" e preenche o campo "input-password" com "25102000" e clica no botão "create"
    Then o usuário deve ver a mensagem "Erro ao criar usuário! Tente novamente."

Scenario: Cadastro de usuário com falha por login existente
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Junior Silva" e preenche o campo "input-cpf" com "12345678927" e preenche o campo "input-birthdate" com "25102000" e preenche o campo "input-email" com "junior@email.com" e preenche o campo "input-login" com "jrchakalo" e preenche o campo "input-password" com "senha123" e clica no botão "create"
    Then o usuário deve ver a mensagem "Erro ao criar usuário! Tente novamente."

Scenario: Cadastro de usuário com falha por CPF existente
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Junior Silva" e preenche o campo "input-cpf" com "13222020442" e preenche o campo "input-birthdate" com "25102000" e preenche o campo "input-email" com "junior@email.com" e preenche o campo "input-login" com "juniorsilva" e preenche o campo "input-password" com "senha123" e clica no botão "create"
    Then o usuário deve ver a mensagem "Erro ao criar usuário! Tente novamente."

Scenario: Cadastro de usuário com falha por email existente
    Given o usuário está na página "create-user"
    When o usuário preenche o campo "input-name" com "Junior Silva" e preenche o campo "input-cpf" com "12345678927" e preenche o campo "input-birthdate" com "25102000" e preenche o campo "input-email" com "jisj@cin.ufpe.br" e preenche o campo "input-login" com "juniorsilva" e preenche o campo "input-password" com "senha123" e clica no botão "create"
    Then o usuário deve ver a mensagem "Erro ao criar usuário! Tente novamente."

Scenario: Atualização de usuário com sucesso
    Given o usuário de login "jrchakalo" e senha "senha123" está logado
    When o usuário clica no botão "profile-button" e clica no botão "update-button" e preenche o campo "input-name" com "Júnior Chakalo" e preenche o campo "input-login" com "jrchakalo" e preenche o campo "input-password" com "senha123" e clica no botão "update-button"
    Then o usuário deve ver a mensagem "Usuário atualizado com sucesso!"

Scenario: Atualização de usuário com falha por nome na senha
    Given o usuário de login "jrchakalo" e senha "senha123" está logado
    When o usuário clica no botão "profile-button" e clica no botão "update-button" e preenche o campo "input-name" com "Manoel Gomes" e preenche o campo "input-login" com "jrchakalo" e preenche o campo "input-password" com "manoelgomes" e clica no botão "update-button"
    Then o usuário deve ver a mensagem "Erro ao atualizar usuário!"

Scenario: Atualização de usuário com falha por data de nascimento na senha
    Given o usuário de login "jrchakalo" e senha "senha123" está logado
    When o usuário clica no botão "profile-button" e clica no botão "update-button" e preenche o campo "input-name" com "Júnior Chakalo" e preenche o campo "input-login" com "jrchakalo" e preenche o campo "input-password" com "25102000" e clica no botão "update-button"
    Then o usuário deve ver a mensagem "Erro ao atualizar usuário!"

Scenario: Atualização de usuário com falha por login existente
    Given o usuário de login "jrchakalo" e senha "senha123" está logado
    When o usuário clica no botão "profile-button" e clica no botão "update-button" e preenche o campo "input-name" com "Júnior Chakalo" e preenche o campo "input-login" com "vitoraleixo" e preenche o campo "input-password" com "senha123" e clica no botão "update-button"
    Then o usuário deve ver a mensagem "Erro ao atualizar usuário!"