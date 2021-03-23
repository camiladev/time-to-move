# TimeToMove 1.0

Este projeto é a evolução do projeto Move.it que iniciei durante a realização do Next Level Week 4º realizado pela Rocketseat :rocket:.

**Telas**
:hourglass_flowing_sand: Em construção

### :page_with_curl: Informações sobre o Projeto

A ideia surgiu da necessidade de ajudar as milhares de pessoas que trabalham usando o computador a evitar futuros problemas de saúde, como:

- Tendinite;
- Dores nas costas;
- Má circulação nas pernas;
- Problemas de visão.

E ajudar a manter o foco e melhorar a produtividade de forma que não prejudique a saúde.

Para isso juntamos a técnica de gestão do tempo Pomodoro, como exercícios para o corpo e para os olhos e para dar aquela estimulada aplicamos a ideia de level que nos jogos online são usados para definir a experiência do personagem.

### :clipboard: Resolução

**Pomodoro - Técnica de gestão do tempo**

Para realizar o controle do tempo foi criado um componente de cronometro, que chamamos de Countdown. Com variáveis de controle de estado recebe o tempo de 25 min convertido em segundos, e quando o relógio é inicializado o tempo inicial é atualizado em um intervalo de 1 segundo, sempre diminuindo um segundo até que o contador chegue a zero.

**Desafios Aleatórios**

A dada termino de ciclo do Pomodoro é sugerido ao usuário um desafio para o corpo ou para os olhos, a escolha do desafio é realizada de forma aleatória. A lista de desafios é passada em um documento JSON, e para garantir a aleatoriedade é realizado uma multiplicação entre um numero randômico e a quantidade de itens no JSON.

**Subir de Nível**

Sempre que o usuário recebe a sugestão do desafio, já possível visualizar quanto de experiencia que ira ganhar, e quando o usuário receber a quantidade necessária de experiencia, ele passa para o  próximo nível. Para saber o valor necessário de xp foi realizado um calculo de potencia que os jogos usam para definir a dificuldade do desafio.

Para que o usuário não perca as informações de nível atual e desafios realizados, caso ele decida fechar o navegador, foi utilizado os cookies do browser para salvar as informações de nível, experiência e desafios concluídos, assim quando o usuário retornar vai poder voltar onde parou.

**Autenticação de Usuário**
Para realizar o login do usuário optei por apenas consultar a api do github e pegar os dados do usuário que tiver conta no github.

Utilizei o axios para fazer a requisição no servidor do github e retornar os dados que utilizei.

Optei por realizar desta forma pois não estou fazendo a estrutura de backend.

**Ranking**
Para listar o ranking dos usuários alguns dados são salvos na api da aplicação salvos em outro projeto privado.

Para consultar utilizei fecth para consultar os dados na api fake em json.

Os usuários são listados em ordem decrescente de valor total de xp.

**Responsividade**
:hourglass_flowing_sand: Em construção



### :hammer_and_wrench: Tecnologias usadas

- Next.js
- React.js
- TypeScript
- CSS3
- HTML5
- Biblioteca Js-Cookies
- Biblioteca React-Icons
- API Rest Json Server

### :computer: Execução

Para você rodar o projeto localmente é necessário que realize o clone do projeto e executar o comando:

```bash
npm install
```

E para executar a aplicação de o seguinte comando:

```bash
npm run dev
```

Agora no navegar acesse [http://localhost:3000/](http://localhost:3000/)

### :octocat: Deploy

:hourglass_flowing_sand: Em construção