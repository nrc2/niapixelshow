Feature: Histórico de Pedidos do Usuário
As a usuário
I want to ser capaz de ver o meu histórico de pedidos
So that eu possa ter controle dos produtos que comprei e de quanto eu gastei, bem como saber a situação dos meus pedidos.

Scenario: Acesso ao histórico de pedidos com pedidos cadastrados
Given eu estou logado como “Usuário” com login “user1” e senha “user1234”
And eu tenho o pedido do produto “Camisa CIN” na quantidade “2” na cor “Vermelha” na data “14/05/2024” com status “Entregue” com preço de “R$ 50,00” para o endereço “Rua Altamira, 500” cadastrado
And eu tenho o pedido do produto “Camisa CIN” na quantidade “4” na cor “Preta” na data “13/05/2024” com status “Enviado” com preço de “100,00” reais para o endereço “Av. Polidoro, 40” cadastrado
And estou na página “Usuário”
When eu seleciono a opção de ir para a página “Histórico de Pedidos”
Then eu posso ver na lista de pedidos o pedido “Camisa CIN” com data “14/05/2024” com status “Entregue” no valor de “50,00” reais
And eu posso ver na lista de pedidos o pedido “Camisa CIN” com data “13/05/2024” com status “Enviado” no valor de “100,00” reais

Scenario: Acesso ao histórico de pedidos sem pedidos cadastrados
Given eu estou logado como “Usuário” com login “user1” e senha “user1234”
And estou na página “Usuário”
And não tenho pedidos cadastrados
When eu seleciono a opção de ir para a página “Histórico de Pedidos”
Then eu vejo uma mensagem de aviso que ”não existem pedidos”

Scenario: Filtrar produtos no histórico de pedidos com pedidos cadastrados
Given eu estou logado como “Usuário” com login “user1” e senha “user1234”
And estou na página “Histórico de Pedidos”
And eu tenho o pedido do produto “Camisa CIN” na quantidade “2” na cor “Vermelha” na data “14/05/2024” com status “Entregue” com preço de “R$ 50,00” para o endereço “Rua Altamira, 500” cadastrado
And eu tenho o pedido do produto “Camisa CIN” na quantidade “4” na cor “Preta” na data “13/05/2024” com status “Enviado” com preço de “100,00” reais para o endereço “Av. Polidoro, 40” cadastrado
When eu seleciono a opção de filtrar por “<FILTRO>”
And selecionar o critério “<CRITERIO>” do filtro
Then eu posso ver na lista de pedidos o pedido “Camisa CIN” com data “14/05/2024” com status “Entregue” no valor de “50,00” reais

Examples:
FILTRO   |   CRITERIO
  Nome   |   Camisa CIN
  Data     |    14/05/2024
  Preço    |   Acima de R$ 30,00

Scenario: Tentar filtrar produtos no histórico de pedidos sem pedidos cadastrados
Given eu estou logado como “Usuário” com login “user1” e senha “user1234”
And estou na página “Histórico de Pedidos”
When eu tento selecionar um filtro
Then eu vejo uma mensagem de aviso que ”não existem pedidos”

Scenario: Abrir detalhamento de um pedido
Given eu estou logado como “Usuário” com login “user1” e senha “user1234”
And estou na página “Histórico de Pedidos”
And eu tenho o pedido do produto “Camisa CIN” na quantidade “2” na cor “Vermelha” na data “14/05/2024” com status “Entregue” com preço de “R$ 50,00” para o endereço “Rua Altamira, 500” cadastrado
When eu seleciono a opção de “Detalhar Pedido”
Then estou na página “Detalhamento do Pedido”
And eu vejo o pedido do produto “Camisa CIN” na quantidade “2” na cor “Vermelha” na data “14/05/2024” com status “Entregue” com preço de “R$ 50,00” para o endereço “Rua Altamira, 500”

Scenario: Retornar pedidos no histórico de pedidos com pedidos cadastrados
Given usuário de login “user1”
And está na página “Usuário”
And tem cadastrado o pedido pedido “Camisa CIN” na quantidade “2” na cor “Vermelha” na data “14/05/2024” com status “Entregue” com preço de “R$ 50,00” para o endereço “Rua Altamira, 500”
When acessar a página de “Histórico de Pedidos”
Then é retornado o pedido “Camisa CIN” com data “14/05/2024” com status “Entregue” no valor de “50,00” reais

Scenario: Retornar mensagem no histórico de pedidos sem pedidos cadastrados
Given usuário de login “user1”
And está na página “Usuário”
And não tem cadastrado nenhum pedido
When acessar a página de “Histórico de Pedidos”
Then é retornada uma mensagem informando que não há pedidos cadastrados
