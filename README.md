#Documentação API

  npm install
  npx prisma migrate dev
  npx prisma db seed
  npm run dev

  obs: no arquivo env.example mostra como as variáveis devem ser.  

#Documentação Front
  npm install
  npm start

  obs: no arquivo env.example mostra como as variáveis devem ser.  

#Respostas para as perguntas elencadas após o desenvolvimento

1. Quais seriam as suas primeiras melhorias caso possuísse mais tempo de implementação?
R: Implementaria testes nas duas aplicações. Ainda no lado do front faria melhorias de estilização.

2. Pensando na sua solução, como seria a manutenção em caso da adição de novas
categorias de produtos? O que precisaria ser alterado?
R: Eu injetei as categorias com um seed, mas implementei as rotas para a entidade. Bastaria fazer o cadastro de categoria.

3. Caso fosse necessário, quais alterações precisariam ser feitas para suportar atualizações na
porcentagem de desconto da categoria de produto, de modo que, sempre que a porcentagem
de desconto fosse alterada, o novo preço fosse refletido em todos os produtos da mesma?
R: Toda vez q a rota de patch para categoria fosse chamada seria possível alterar os preços promocionais dos produtos.