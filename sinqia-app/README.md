# sinqia-app

Aplicação frontend desenvolvida em [Next.js](https://nextjs.org) para cadastro e consulta de pontos turísticos, cidades, estados e regiões do Brasil.

---

## Sumário

- [sinqia-app](#sinqia-app)
  - [Sumário](#sumário)
  - [Visão Geral](#visão-geral)
  - [Requisitos](#requisitos)
  - [Configuração](#configuração)
  - [Passo a Passo para Rodar o Projeto](#passo-a-passo-para-rodar-o-projeto)
  - [Comandos Úteis](#comandos-úteis)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Referências](#referências)

---

## Visão Geral

Este frontend consome a API [`Sinqia.Api`](../Sinqia.Api/README.md) para exibir, cadastrar, editar e remover pontos turísticos, além de listar cidades, estados e regiões do Brasil.

---

## Requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## Configuração

1. Certifique-se de que a API [`Sinqia.Api`](../Sinqia.Api/README.md) está rodando em `http://localhost:5101` (ou ajuste as URLs nos arquivos de serviço em `src/services/` se necessário).
2. Instale as dependências do projeto:

   ```sh
   npm install
   # ou
   yarn install
   ```

---

## Passo a Passo para Rodar o Projeto

1. **Clone o repositório (se ainda não fez):**
   ```sh
   git clone https://github.com/FernandoPorfirio/sinqia-teste-pratico
   cd sinqia-teste-pratico/sinqia-app
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação:**  
   Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Comandos Úteis

- **Rodar em desenvolvimento:**  
  ```sh
  npm run dev
  # ou
  yarn dev
  ```
- **Build de produção:**  
  ```sh
  npm run build
  # ou
  yarn build
  ```
- **Rodar build de produção:**  
  ```sh
  npm start
  # ou
  yarn start
  ```

---

## Estrutura de Pastas

- `src/app/` — Páginas e containers principais da aplicação.
- `src/app/pontos-turisticos/` — Tela principal de pontos turísticos.
- `src/services/` — Serviços para comunicação com a API.
- `src/components/base/` — Componentes reutilizáveis (Header, Footer, Sidebar).
- `public/` — Arquivos estáticos.

---

## Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI](https://mui.com/)
- [Sinqia.Api (backend)](../Sinqia.Api/README.md)
