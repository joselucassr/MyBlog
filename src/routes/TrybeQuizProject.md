<script>
  import '../style/prism-material-oceanic.css'
</script>

# Trybe Quiz Project

## Observações do momento inicial

Imagem trazida pelo Gravatar.
renderWithRouterAndRedux já pronto.

[Estratégias](/estrategias)

## Meu desenvolvimento

### Primeiro contato com o requisito e planejamento

Fiquei responsável por criar a tela de jogo, para realizar ela preciso primeiro ter acesso a um código de token válido. Como o token só vem do login, precisarei usar uma função temporária que gere um token novo e adicione ele ao local storage.

Acredito que eu possa usar a função `fetchQuestionsThunk` que já faz isso, e dar um dispatch nela por enquanto.

Acabei de perceber que tem um problema nela, na verdade, o fluxo pede que:

1. Seja efetuado o login e gerado um código que ficará salvo;
2. Usar esse código ao entrar na tela de jogo para buscar as perguntas.

Atualmente a `fetchQuestionsThunk` faz essas duas coisas, e dependendo do projeto isso seria ok, mas nesse caso precisarei separar o fetch do token do fetch das perguntas. Farei isso depois, já que a função atual me permite testar o código melhor.

Trabalharei agora no requisito 6 que é a construção da exibição de perguntas e respostas.

### Requisito 6

Olhando para o texto do requisito consigo perceber que precisarei fazer um mapState para pegar os dados das questões do state do redux.

Para mostrar as perguntas uma por vez acredito que posso usar o índice do array delas para ir avançando. A parte mais desafiadora deve ser mostrar as perguntas de forma embaralhada.

_A resposta da API vem nesse formato:_

```json
{
	"response_code": 0,
	"results": [
		{
			"category": "General Knowledge",
			"type": "multiple",
			"difficulty": "easy",
			"question": "Which of the following presidents is not on Mount Rushmore?",
			"correct_answer": "John F. Kennedy",
			"incorrect_answers": ["Theodore Roosevelt", "Abraham Lincoln", "Thomas Jefferson"]
		},
		{
			"category": "Entertainment: Video Games",
			"type": "multiple",
			"difficulty": "medium",
			"question": "What element does the Zinogre use in Monster Hunter?",
			"correct_answer": "Thunder",
			"incorrect_answers": ["Ice", "Fire", "Water"]
		}
	]
}
```

Desse JSON usarei o array `results` apenas.

Para deixar aleatório, estou pensando em:

1. Criar um array com 4 números: `[0, 1, 2, 3]`.
2. Gerar um número aleatório de 0 a 3, e a partir desse número pegar o item do índice correspondente e retirar do array e colocar em outro.
3. Gerar um número aleatório de 0 a 2 e repetir isso até todos os números estarem no novo array.
4. Usar esses números para organizar as respostas na página.

Para verificar se a resposta está correta estou pensando em só comparar o texto clicado com a resposta correta que veio da API. Talvez isso não dê certo, e se for o caso estou pensando em fazer um map nas respostas antes de embaralhar e colocar uma chave `true` na resposta correta.

Começarei a programar agora para ver se minhas ideias se sustentam.

#### Programando

A escolha entre começar com a lógica ou com a estrutura da página às vezes pode ser de preferência pessoa, hoje estou com mais vontade de realizar a lógica primeiro.

Começarei fazendo o setup para o redux rodar corretamente. Coloquei o `connect` e um `componentDidMount` com um `dispatch` contendo o `fetchQuestionsThunk` para já checar se as perguntas são enviadas para o redux corretamente.

Coloquei um `propTypes` básico para o lint não reclamar.

A action está sendo disparada corretamente, mas o redux não tem um reducer para realizar a operação, criarei um agora.

Com os dados corretamente no state do redux, agora preciso realizar o mapState para pegar esses dados na página.

Criarei um state contendo a posição atual no array de perguntas e um array vazio que armazenará as perguntas randomizadas.

Construí embaralhamento e estou conseguindo ter um array randomizado com as respostas. Mostrarei os dados na tela agora, uma lista simples, para testar se a checagem de respostas com regex funciona.

Pensando melhor acredito que comparação direta pode funcionar bem `===` também. Parece estar funcionando corretamente.

Com a lógica funcionando bem passarei para a construção da página com um CSS mínimo para facilitar o desenvolvimento.

Para colocar o `data-testid` decidi criar uma função que verifica se o texto da resposta é o mesmo do texto do botão e coloca a propriedade de acordo.
