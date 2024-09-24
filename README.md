# Full Cycle - Desafio 2

Este projeto é uma aplicação que utiliza o NGINX como proxy reverso para interagir com uma aplicação Node.js. Quando um usuário acessa o NGINX, ele faz uma chamada para a aplicação Node.js, que adiciona um registro no banco de dados MySQL.

## Tecnologias Usadas

- Node.js
- Express
- MySQL
- NGINX
- Docker

## Estrutura do Projeto

- `docker-compose.yml`: Configuração do Docker Compose para orquestrar os containers.
- `nginx.conf`: Configuração do NGINX.
- `server.js`: Arquivo principal da aplicação Node.js.
- `package.json`: Contém as dependências da aplicação.
