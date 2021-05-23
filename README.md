# REST API Desafio FaleMais Vortx

Esta é uma REST API para o problema proposto no desafio "Produto FaleMais" da Seleção da Vortx.

Toda a aplicação está contida dentro do arquivo `src/common/infra/http/app`
E seus modulos, rotas, controlles e services, estão contidos debaixo da pasta `src`.

`scripts/postgres-docker.sh` faz uma configuração mínima de uma instância PostgreSQL, o RDBMS utilizado no projeto.

`scripts/run-docker-psql.sh` cria os dois DBs utilizados.

Se faz necessário a execução desses scripts ou, apenas ajustar as configurações de conexão com qualquer outra instância Postgres.

Atentar ao fato de existir duas conexões, uma para o banco padrão `fale_mais` e outra com o banco de teste `fale_mais_teste`. Conexões essas, descritas no arquivo `.env` e no `.env.test`, respectivamente.

## Install

    yarn install

## Criar modelo de dados

    yarn migrate:run

## Executar o app

    yarn run:dev

## Executar os testes

    yarn test

# REST API

A REST API aqui implementada tem o propósito de servir as rotas de CRUD para duas tabelas `pricing` e `areaCode`. Com o seguinte schema:

Pricing

| origin(char 3) | destination(char 3) | price(decimal) | enabled(bool) |    created(timetz) |    updated(timetz) |
| :------------: | :-----------------: | -------------: | :-----------: | -----------------: | -----------------: |
|      011       |         016         |            1.9 |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |
|      011       |         017         |            1.7 |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |
|      011       |         018         |            0.9 |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |

AreaCode

| ddd(char 3) | uf(char 2) | enabled(bool) |    created(timetz) |    updated(timetz) |
| :---------: | :--------: | :-----------: | -----------------: | -----------------: |
|     011     |     SP     |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |
|     031     |     MG     |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |
|     041     |     PR     |     true      | 20:01:50.058422+00 | 20:01:50.058422+00 |

## Endpoints

### Disponíneis e documentados em:

http://localhost:5555/api/docs/#/

Documentados com Swagger, podem ser testados prontamente na url acima com o app executando.
