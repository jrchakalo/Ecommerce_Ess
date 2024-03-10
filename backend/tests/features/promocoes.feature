Feature: Cadastro e Manutenção de Promoções
    As a usuário cadastrado como administrador
    I want to adicionar, remover e atualizar promoções no sitema
    So that possa disponibilizar promoções para os demais usuários


Scenario: Cadastro de promoção com sucesso Serviço
     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
     And o sistema possui o cupom de promoção "JULIOVERNE10"
     And o sistema possui o cupom de promoção "JULIOVERNE70"
     And está na página "/api/promocoes/cadastro"
     When preenche o campo "nome" com "JULIOVERNEBLACK"
     And preenche o campo "valor" com "20"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com "Usuário com 3 meses ou menos no sistema"
     And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
     Then uma mensagem de confirmação é enviada "Cadastro de promoção concluído com sucesso!"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE70" 
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"



Scenario: Cadastro de promoção com sucesso com campo valor em branco Serviço
    Given que o usuário "Júlio Vierne" está logado no sistema como "administrador"
    And está na página "/api/promocoes/cadastro"
    When preenche o campo "nome" com "JULIOVERNE10"
    And preenche o campo "tipo" com "Livro"
    And preenche o campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
    And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
    Then uma mensagem de confirmação é enviada "Cadastro de promoção concluído com sucesso!"
    And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
    And o cupom "JULIOVERNE10" tem campo "nome" com "JULIOVERNE10"
    And o cupom "JULIOVERNE10" tem campo "valor" com "10"
    And o cupom "JULIOVERNE10" tem campo "tipo" com "Livro"
    And o cupom "JULIOVERNE10" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"



Scenario: Falha no cadastro de promoção por Valor inválido Serviço
    Given que o usuário "Júlio Vierne" está logado no sistema como "administrador"
    And está na página "/api/promocoes/cadastro"
    When preenche o campo "nome" com "JULIOVERNE80"
    And preenche o campo "valor" com "80"
    And preenche o campo "tipo" com "Geral"
    And preenche o campo "validade" com "usuário com 3 meses ou menos no sistema"
    And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
    Then uma mensagem de aviso é enviada "Valor inválido"
    And o sistema não tem armazenado em  "Cupons cadastrados" o cupom "JULIOVERNE80"


Scenario: Falha no cadastro de promoção por Nome inválido Serviço
     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
     And o sistema possui o cupom de promoção "JULIOVERNE10"
     And o sistema possui o cupom de promoção "JULIOVERNE60"
     And o sistema possui o cupom de promoção "JULIOVERNE70"
     And está na página "/api/promocoes/cadastro"
     When preenche o campo "nome" com "JULIOVERNE60"
     And preenche o campo "valor" com "59"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com "Usuário com 3 meses ou menos no sistema"
     And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
     Then uma mensagem de aviso é enviada "Promoção com ID existente"
     #And o sistema permanece com apenas "3" cupons cadastrados
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE60"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE70"
     And o cupom "JULIOVERNE60" tem campo "nome" com "JULIOVERNE60"
     And o cupom "JULIOVERNE60" tem campo "valor" com "60"
     And o cupom "JULIOVERNE60" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNE60" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"

Scenario: Falha no cadastro de promoção por campo nome em branco Serviço
     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
     And o sistema possui o cupom de promoção "JULIOVERNE10"
     And o sistema possui o cupom de promoção "JULIOVERNE60"
     And o sistema possui o cupom de promoção "JULIOVERNE70"
     And está na página "/api/promocoes/cadastro"
     When preenche o campo "nome" com ""
     And preenche o campo "valor" com "59"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com "Usuário com 3 meses ou menos no sistema"
     And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
     Then uma mensagem de aviso é enviada "Promoção com ID existente"
     #And o sistema permanece com apenas "3" cupons cadastrados
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE60"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE70"
     And o cupom "JULIOVERNE60" tem campo "nome" com "JULIOVERNE60"
     And o cupom "JULIOVERNE60" tem campo "valor" com "60"
     And o cupom "JULIOVERNE60" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNE60" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"

Scenario: Falha no cadastro de promoção por campo tipo em branco serviço
     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
     And o sistema possui o cupom de promoção "JULIOVERNE10"
     And o sistema possui o cupom de promoção "JULIOVERNE60"
     And o sistema possui o cupom de promoção "JULIOVERNE70"
     And está na página "/api/promocoes/cadastro"
     When preenche o campo "nome" com "JULIOVERNE59"
     And preenche o campo "valor" com "59"
     And preenche o campo "tipo" com ""
     And preenche o campo "validade" com "Usuário com 3 meses ou menos no sistema"
     And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
     Then uma mensagem de aviso é enviada "Campo(s) em branco"
     #And o sistema permanece com apenas "3" cupons cadastrados
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE60"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE70"
     And o cupom "JULIOVERNE60" tem campo "nome" com "JULIOVERNE60"
     And o cupom "JULIOVERNE60" tem campo "valor" com "60"
     And o cupom "JULIOVERNE60" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNE60" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras" 

Scenario: Falha no cadastro de promoção por campo validade em branco serviço
     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
     And o sistema possui o cupom de promoção "JULIOVERNE10"
     And o sistema possui o cupom de promoção "JULIOVERNE60"
     And o sistema possui o cupom de promoção "JULIOVERNE70"
     And está na página "/api/promocoes/cadastro"
     When preenche o campo "nome" com "JULIOVERNE59"
     And preenche o campo "valor" com "59"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com ""
     And uma requisição POST for enviada para "/api/promocoes/cadastro" enviando os dados do novo cupom
     Then uma mensagem de aviso é enviada "Campo(s) em branco"
     #And o sistema permanece com apenas "3" cupons cadastrados
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE60"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE70"
     And o cupom "JULIOVERNE60" tem campo "nome" com "JULIOVERNE60"
     And o cupom "JULIOVERNE60" tem campo "valor" com "60"
     And o cupom "JULIOVERNE60" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNE60" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"

Scenario: Atualização de promoção com sucesso Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
     And está na página "/api/promocoes/" 
     When seleciona o cupom "JULIOVERNEBLACK"
     And preenche o campo "valor" com "20"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "As Informações foram atualizadas com sucesso"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "20"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Geral"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"

Scenario: Atualização de promoção com sucesso com valor em branco Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
     And está na página "/api/promocoes/" 
     When seleciona o cupom "JULIOVERNEBLACK"
     And preenche o campo "valor" com "20"
     And preenche o campo "tipo" com "Geral"
     And preenche o campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "As Informações foram atualizadas com sucesso"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "20"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Geral"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "Usuário com mais de 12 meses no sistema ou mais de 12 compras"

Scenario: Falha na atualização de promoção por promoção não encontrada Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
     When um json é enviado com o corpo contendo novos dados para o cupom de nome "JULIOVERNEBLACK20"
     And o campo "valor" tem "20"
     And o campo "tipo" tem "Geral"
     And o campo "validade" tem "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK20" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "Promoção não encontrada"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"

Scenario: Falha na atualização de promoção por Valor inválido Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
    When um json é enviado com o corpo contendo novos dados para o cupom de nome "JULIOVERNEBLACK"
     And o campo "valor" tem "90"
     And o campo "tipo" tem "Geral"
     And o campo "validade" tem "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "Valor inválido"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"

Scenario: Falha na atualização de promoção por campo tipo em branco Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
     When um json é enviado com o corpo contendo novos dados para o cupom de nome "JULIOVERNEBLACK"
     And o campo "valor" tem "70"
     And o campo "tipo" tem ""
     And o campo "validade" tem "Usuário com mais de 12 meses no sistema ou mais de 12 compras"
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "Campo(s) em branco"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"

Scenario: Falha na atualização de promoção por campo validade em branco Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"
     When um json é enviado com o corpo contendo novos dados para o cupom de nome "JULIOVERNEBLACK"
     And o campo "valor" tem "70"
     And o campo "tipo" tem "Geral"
     And o campo "validade" tem ""
     And uma requisição PUT é enviada para "/api/promocoes/JULIOVERNEBLACK" enviando os novos dados do cupom
     Then uma mensagem de aviso é enviada "Campo(s) em branco"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "nome" com "JULIOVERNEBLACK"
     And o cupom "JULIOVERNEBLACK" tem campo "valor" com "60"
     And o cupom "JULIOVERNEBLACK" tem campo "tipo" com "Livro"
     And o cupom "JULIOVERNEBLACK" tem campo "validade" com "usuário com mais de 3 meses no sistema"

Scenario: Apagar promoção com sucesso Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNE10"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     When uma requisição DELETE é enviada para "/api/promocoes/JULIOVERNEBLACK"
     Then uma mensagem de aviso é enviada "Promoção removida com sucesso"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema não tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"

Scenario: Falha ao apagar promoção por promoção não encontrada Serviço
     Given que o usuário "Naruto" está logado no sistema como "administrador"
     And o sistema possui o cupom "JULIOVERNE10"
     And o sistema possui o cupom "JULIOVERNEBLACK"
     When uma requisição DELETE é enviada para "/api/promocoes/JULIOVERNEBLACK2"
     Then uma mensagem de aviso é enviada "Promoção não encontrada"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNE10"
     And o sistema tem armazenado em "Cupons cadastrados" o cupom "JULIOVERNEBLACK"

# Scenario: Cadastro de promoção com sucesso com campo valor em branco GUI
#     Given que o usuário "Cora Coralina" está logado no sistema como "administrador"
#     And está na página "Cadastro de Promoções"
#     When preenche os campos:
#     | Nome            | Tipo   | Condições de validade                                        |
#     | JULIOVERNE10    | Livros | usuário com mais de 12 meses no sistema ou mais de 12 compras|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de confirmação é exibida "Cadastro de promoção concluído com sucesso!"
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadastrados e dentre eles está o cupom "JULIOVERNE10"

# Scenario: Falha no cadastro de promoção por valor inválido GUI
#     Given que o usuário "Viajante" está logado no sistema como "administrador"
#     And está na página "Cadastro de Promoções"
#     When preenche os campos:
#     | Nome            | Valor   | Tipo  | Condições de validade                  |
#     | JULIOVERNE80    | 80      | Geral | usuário com 3 meses ou menos no sistema|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de aviso é exibida "O valor inserido é inválido. Informe um valor de 10 a 70."
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadatrados e dentre eles não está "JULIOVERNE80"

# Scenario: Falha no cadastro de promoção por Nome inválido GUI
#     Given que o usuário "Viajante" está logado no sistema como "administrador"
#     And o sistema possui os cupons de promoção "JULIOVERNE10", "JULIOVERNE70" e "JULIOVERNE60"
#     And o cupom "JULIOVERNE60" possui "Valor" igual a "60", "Tipo" igual a "Livro" e "Condições de validade" igual a "usuário com 3 meses ou menos no sistema"
#     And está na página "Cadastro de Promoções"
#     When preenche os campos:
#     | Nome            | Valor   | Tipo  | Condições de validade                                        |
#     | JULIOVERNE60    | 59      | Geral | usuário com mais de 12 meses no sistema ou mais de 12 compras|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de aviso é exibida "Já existe um cupom com este nome. Informe um outro nome para este cupom."
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadatrasdos nessa ordem "JULIOVERNE10", "JULIOVERNE60" e "JULIOVERNE70" 

#Scenario: Cadastro de promoção com sucesso GUI
#     Given que o usuário "Júlio Vierne" está logado no sistema como "administrador"
#     And está na página "Cadastro de Promoções"
#     When preenche os campos:
#     | Nome            | Valor   | Tipo  | Condições de validade                  |
#     | JULIOVERNEBLACK | 20      | Geral | usuário com 3 meses ou menos no sistema|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de confirmação é exibida "Cadastro de promoção concluído com sucesso!"
#     And a pagina "Cupons cadastrados" é exibida contendo os cupons de promoção cadatrados que inclui o cupom "JULIOVERNEBLACK"

# Scenario: Atualização de cupom de promoção com sucesso GUI
#     Given que o usuário "Naruto" está logado no sistema como "administrador"
#     And e o sistema possui o cupom "JULIOVERNEBLACK" com "Valor" igual a "60", "Tipo" igual a "Livro" e "Condições de validade" igual a "usuário com mais de 3 meses no sistema"
#     And está na página "Cupons cadastrados"
#     When seleciona o cupom  "JULIOVERNEBLACK"
#     And atualiza o conteúdo do campo "Valor" com "40"
#     And seleciona "Atualizar promoção"
#     Then uma mensagem de confirmação é exibida "Promoção atualizada com sucesso!"
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadastrados que inclui o cupom "JULIOVERNEBLACK"
#     And o cupom "JULIOVERNEBLACK" possui campo "Valor" igual a "40", "Tipo" igual a "Livro" e "Condições de validade" igual a "usuário com mais de 3 meses no sistema"

# Scenario: Remoção do cupom de promoção GUI
#     Given que o usuário "Viajante" está logado no sistema como "administrador"
#     And está na página "Cupons cadastrados"
#     And a página exibe os cupons "JULIOVERNE10", "JULIOVERNE60" e "JULIOVERNE70"
#     When seleciono o cupom "JULIOVERNE60"
#     And seleciono "Excluir cupom"
#     Then uma mensagem de aviso é exibida "Tem certeza que quer excluir este cupom?"
#     And Seleciono "Sim"
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadastrados nessa ordem "JULIOVERNE10" e "JULIOVERNE70" 



# Scenario: Cadastro de promoção teste de seleção Tipo GUI
#     Given que o usuário "Naruto" está logado no sistema como "administrador"
#     And está na página "Cadastro de Promoções"
#     When tenta preencher o "Tipo" 
#     And lhe é dada a possibilidade de escolher dentre "Livro", "HQ", "Mangá", "Revista" e "Geral"
#     And preenche os campos com:
#     | Nome            | Valor   | Tipo    | Condições de validade                                        |
#     | JULIOVERNE70    | 70      | Revista | usuário com mais de 12 meses no sistema ou mais de 12 compras|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de confirmação é exibida "Cadastro de promoção concluído com sucesso!"
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadastrados que inclui o cupom "JULIOVERNE70"
#     And o cupom "JULIOVERNE70" possui campo "Valor" igual a "70", "Tipo" igual a "Revista" e "usuário com mais de 12 meses no sistema ou mais de 12 compras"

# Scenario: Cadastro de promoção teste de seleção GUI
#     Given que o usuário "Risoflora" está logado no sistema como "administrador"
#     And está na página "Cadastro de Promoções"
#     When tenta preencher o "Condições de validade" 
#     And lhe é dada a possibilidade de escolher dentre "usuário com 3 meses ou menos no sistema", "usuário com mais de 3 meses no sistema" e "usuário com mais de 12 meses no sistema ou mais de 12 compras"
#     And preenche os campos com:
#     | Nome            | Valor   | Tipo    | Condições de validade                 |
#     | JULIOVERNE40    | 40      | Revista | usuário com mais de 3 meses no sistema|
#     And seleciona "Cadastrar promoção"
#     Then uma mensagem de confirmação é exibida "Cadastro de promoção concluído com sucesso!"
#     And a página "Cupons cadastrados" é exibida contendo os cupons de promoção cadastrados que inclui o cupom "JULIOVERNE70"
#     And o cupom "JULIOVERNE70" possui campo "Valor" igual a "70", "Tipo" igual a "Revista" e "usuário com mais de 12 meses no sistema ou mais de 12 compras"