# cloud-native-backend-nodejs

Expor uma coleção de usuários

Com esta aplicação conseguirei inserir, alterar, buscar e deletar um usuário, além de visualizar dados do perfil.


# Tecnologias utilizadas
- Para o backend foi utilizado a ferramenta NodeJS;

- Para o banco de dados onde será armazenado os usuários da aplicação foi utilizado o MongoDB;

- Para documentação da API, foi utilizado o swagger;


# Estratégia utilizada
- A autenticação na api é realizada via token jwt, que é gerado ao realizar login na aplicação;
- Implementada collection de usuário contendo os métodos:
> - GET by id -> busca o usuário pelo id (não exige autenticação);

> - GET all -> busca todos os usuários (não exige autenticação);

> - POST -> insere um usuário (não exige autenticação);

> - DELETE -> exclui o usuário (exige autenticação);

> - PATCH -> altera os dados do usuário (exige autenticação);

- Os usuários da aplicação são armazenados no banco de dados MongoDB;


#### Para a arquitetura do projeto foi utilizado o seguinte contexto de pastas:

> > **cloud-native-backend-nodejs** (pasta pai de todo o projeto)

> > > **node_modules** (pasta onde contém todas bibliotecas e dependências instaladas e utilizadas no projeto)

> > > **logs** (pasta onde contém o log de todas as requisições feitas para a api)

> > > **src** (pasta onde contém a arquitetura da api)

> > > > **middlewares** (contém os middlewares da aplicação com o logger para log das requisições da api, swagger para documentação, auth para validação de token jwt válido)

> > > > **views** (contém as views da aplicação como usuario que retorna o modelo "json padrão" de usuario para retorno no response da requisição de usuario para status 200)

> > > > **controllers** (contém os controllers da aplicação, ou seja onde fica toda regra de negócio para cada método/endpoint a ser consumido/publicado, isso inclui tratativas de erros, lógica de negócio, regras, e define a resposta e status do response a ser encaminhada para o client)

> > > > **models** (contém os modelos/estruturas dos objetos que teram vinculo e serão armazenados no banco de dados, exemplo model de usuário, contém a definiçao dos campos requiridos, tipagem, tamanho, e também regras como não trazer a senha do usuário do banco de dados e criptografar a mesma antes de ser inserida na base)

> > > > **helpers** (contém funções auxiliares que serão utilizadas em diversos lugares da aplicação, exemplo isNotEmpty que valida se um valor não é indefinido, nulo ou vazio)

> > > > **database** (contém a classe que instancia as configurações de conexão com o banco de dados e export um objeto de conexão criado e pronto para uso)

> > > > **config** (contém arquivos de configuração da aplicação, como database onde fica toda configuração de conexão com o banco de dados e auth onde fica o segredo para geração do token jwt e o tempo de expiração)

> > > > **routes.js** (define as rotas da api e também a partir de qual rota o token jwt é obrigatório)

> > > > **app.js** (define toda configuração e funcionalidades que o server utilizara para rodar a aplicação, sendo isso, express, middlewares, cors, routes, e instancia um server novo)

> > > > **server.js** (define a porta em que a aplicação será executada e mais algumas funcionalidades)


# Requisitos para a execução do projeto
- Ter o NodeJS instalado de preferência a última versão ou superior a v12.16.1;
> [Instalando o Node](https://nodejs.org/pt-br/download/package-manager/ "Clique aqui para aprender a instalar o Node!")

- Ter o gerenciador de dependências yarn instalado (npm também funciona, porém recomendo fortemente o yarn)
> [Instalando o yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable "Clique aqui para aprender a instalar o yarn!")

- Criar um arquivo **.env** e copie o conteudo do arquivo **.env.example** para setar as variaveis de configuracao do sistema.


## Documentação da API offline
> [Documentação da API offline](https://app.swaggerhub.com/apis/murilloborgessquads/user-collection_api/1.0.0 "Clique aqui para ver a documentação!")


## Configurando o docker na máquina
> [Tutorial para configuração](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt
 "Clique aqui para ver o tutorial!")


## Executando o projeto
1. Acessar a pasta cloud-native-backend-nodejs e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta backend: copiar conteúdo do .env.example)

> com a api no ar, consulte a documentação, acessando o endpoint: http://localhost:3333/api-docs/

> usuário para testes da aplicação (porém você poderá cadastrar um usuário)

> > murilloborges@squads.gs

> > 123456

> divirta-se com as funcionalidades


## Executando o projeto através de docker run
1. Executar os seguintes comandos
> Criar uma imagem

> > sudo docker build -t nodejs .

> Listando as imagens

> > sudo docker images

> Remover imagens paradas

> > sudo docker image prune

> Criar um container com a imagem criada acima

> > sudo docker run --name nodejs -p 3333:3333 -d nodejs

> Ativar um container

> > sudo docker start nodejs

> Estatisticas do container

> > sudo docker stats nodejs

> Listando o container

> > sudo docker ps -a

> Parar o container

> > sudo docker stop nodejs

> Finalizar o container

> > sudo docker kill nodejs

> Remover containers parados

> > sudo docker container prune

> Ver log do container

> > sudo docker logs ${id container}


## Executando o projeto através de docker-compose
1. Executar os seguintes comandos
> Subir o ambiente mongo e server

> > sudo docker-compose up

> Derrubar o ambiente

> > ctrl + c


# Referências
> [Documentação docker](https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt
 "Clique aqui para ver a documentação!")

> [Documentação docker](https://www.hostinger.com.br/tutoriais/container-docker/
 "Clique aqui para ver a documentação!")

> [Comandos docker](https://woliveiras.com.br/posts/comandos-mais-utilizados-no-docker/
 "Clique aqui para ver os comandos!")

> [Documentação docker](https://docs.docker.com/config/containers/container-networking/
 "Clique aqui para ver a documentação!")
