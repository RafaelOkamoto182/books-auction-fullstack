# Leilao de Livros
Esta é uma aplicação web desenvolvida como desafio de programação full stack.


# Clonagem do repositório
Para começar, é necessário clonar o repositório github. Um tutorial detalhado pode ser encontrado no site do próprio github:
https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository

## Variáveis ambiente
Para o correto funcionamento da API, é necessário configurar as variáveis de ambiente.
Para isso, navegue até a pasta "backend" e, dentro dela, crie um arquivo com o nome ".env".
O nestJS é responsável por ler automaticamente as variáveis contidas nesse arquivo.
Após criado, insira as seguintes linhas no arquivo:

    DB_HOST=localhost
    DB_USERNAME=
    DB_PASSWORD=
    DB_PORT=
    DB_DATABASE=



# Inicialização
## Instalação do Docker
Primeiramente é necessário ter o docker instalado no computador, o qual pode ser adquirido da seguinte página:
https://www.docker.com/get-started/

## Inicialização dos containers
Após a instalação, basta abrir um prompt de comando na mesma pasta na qual está localizado o arquivo docker-compose.yml.

Nele, digite "docker-compose up --build".

Após isso a aplicação web deve estar rodando em http://localhost:5000. Basta abrir o navegador e copiar o endereço anterior.
O backend em NestJS estará rodando em http://localhost:3000.
A base de dados estará acessível na porta 5432.

