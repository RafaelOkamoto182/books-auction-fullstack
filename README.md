# Leilao de Livros
Esta é uma aplicação web desenvolvida como desafio de programação full stack.


# Clonagem do repositório
Para começar, é necessário clonar o repositório github. Um tutorial detalhado pode ser encontrado no site do próprio github:
https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository

# Criação de arquivos
Para prover a aplicação com as variáveis de ambiente necessárias, é preciso criar os seguintes arquivos:
## .docker.env


## .env
Dentro da pasta backend, crie um arquivo com o nome ".env".
O nestJS é responsável por ler automaticamente as variáveis contidas nesse arquivo.
Dentro dele, copie a seguinte estrutura:

    POSTGRES_HOST=localhost
    POSTGRES_USERNAME=
    POSTGRES_PASSWORD=
    POSTGRES_PORT=
    POSTGRES_DB=

Os espaços em branco devem ser preenchidos de forma compatível com os valores escolhidos no arquivo anterior "docker.env".
> Exemplo



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

