# Gerenciador de notícias

Aplicação de back-end para gerenciamento de notícias.

## Como funciona?

Este projeto é uma API REST para atender a aplicação de notícias rápidas. Ela possui apenas uma entidade: `news`. Foram criadas cinco rotas:

- GET `/news`
- GET `/news/:id`

#### Parâmetros de Query String

- `page` (opcional): Número da página para paginação. O padrão é `1`.
- `order` (opcional): Ordenação por data de publicação. Valores possíveis:
  - `asc`: Ordem crescente.
  - `desc` (padrão): Ordem decrescente.
- `title` (opcional): Filtro para buscar notícias cujo título contenha a string especificada (case insensitive).

#### Exemplo de uso

```http GET http://localhost:5000/news?page=2&order=asc&title=Driven````

- POST `/news`
- PUT `/news/:id`
- DELETE `/news/:id`

Cada uma das rotas contemplam as convenções de respostas para APIs REST.

## Tecnologias utilizadas

Para este projeto, foram utilizadas:

- Node
- Express
- Typescript
- Prisma
- Postgres
- Jest e Supertest
