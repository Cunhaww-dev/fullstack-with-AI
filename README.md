# Projeto: Webhooks (Fullstack) 🚀

### Resumo

Projeto fullstack com uma API em Node/TypeScript (Fastify + Drizzle) e frontend em Vite/React. O banco de dados Postgres é gerenciado via Docker.

-----

## ✨ Tecnologias Principais

  * **API:** Node.js, TypeScript, Fastify
  * **Banco de Dados:** Postgres (via Docker), Drizzle ORM
  * **Frontend:** React, Vite
  * **Validação:** Zod
  * **Gerenciador de Pacotes:** pnpm (usando workspaces)

## 📋 Pré-requisitos

  * Node.js (v18+)
  * pnpm
  * Docker & Docker Compose

-----

## ⚙️ Configuração e Instalação

Siga estes passos na ordem correta para configurar o ambiente.

### 1\. Instalar Dependências

Clone o repositório e instale todas as dependências do projeto (raiz, API e web) com um único comando na raiz do projeto:

```sh
pnpm install
```

### 2\. Subir o Banco de Dados

Navegue até a pasta da API e suba o container do Postgres com o Docker Compose:

```sh
cd api
docker compose up -d
cd ..
```

*(O arquivo `api/docker-compose.yml` será usado por padrão).*

### 3\. Configurar Variáveis de Ambiente (.env)

A API precisa saber como se conectar ao banco de dados.

1.  Vá até a pasta `api`.
2.  Adicione a URL de conexão do banco:

<!-- end list -->

```env
# api/.env
DATABASE_URL="postgresql://docker:docker@localhost:5432/webhooks"
```

*(Estes valores correspondem ao que foi definido no `docker-compose.yml`).*

### 4\. Executar as Migrations

Com o banco rodando e o `.env` configurado, precisamos criar as tabelas. O Drizzle cuida disso.

Execute o script de migration a partir da pasta `api`:

```sh
cd api
pnpm drizzle:migrate # ou o nome do script de migração no seu api/package.json
cd ..
```

-----

## 🚀 Executando Localmente

Você precisará de **dois terminais** abertos.

#### Terminal 1: API (Backend)

```sh
cd api
pnpm run dev
```

#### Terminal 2: Frontend (Web)

```sh
cd web
pnpm run dev
```

-----

## 📁 Pontos Principais no Código

  * `api/src/env.ts`: Configuração e validação das variáveis de ambiente (Zod).
  * `api/src/db/index.ts`: Ponto de entrada e conexão principal do Drizzle.
  * `api/src/db/schema/`: Definição das tabelas (ex: `webhooks.ts`).
  * `api/src/routes/`: Rotas da API (ex: `list-webhooks.ts`).
  * `api/drizzle.config.ts`: Arquivo de configuração do Drizzle (usado para migrations).

## 💡 Observações e Scripts Úteis

### Recriar o Banco (Apagar todos os dados)

Se precisar começar do zero, execute os seguintes comandos de dentro da pasta `api`:

```sh
# 1. Parar e remover o container E o volume (-v)
docker compose down -v

# 2. Subir um novo container limpo
docker compose up -d

# 3. Rodar as migrations novamente
pnpm drizzle:migrate
```
