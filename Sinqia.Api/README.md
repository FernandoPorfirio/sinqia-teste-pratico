# Sinqia.Api

API para consulta e cadastro de pontos turísticos, cidades, estados e regiões do Brasil, baseada nos dados oficiais do IBGE.

---

## Sumário

- [Sinqia.Api](#sinqiaapi)
  - [Sumário](#sumário)
  - [Visão Geral](#visão-geral)
  - [Requisitos](#requisitos)
  - [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
  - [Passo a Passo para Rodar o Projeto](#passo-a-passo-para-rodar-o-projeto)
  - [Comandos Úteis](#comandos-úteis)
  - [Seeds de Dados](#seeds-de-dados)
  - [Estrutura das Migrations](#estrutura-das-migrations)
  - [Referências](#referências)

---

## Visão Geral

Esta API foi desenvolvida para facilitar o cadastro e consulta de pontos turísticos, cidades, estados e regiões do Brasil. Os dados de regiões, estados e cidades são carregados automaticamente a partir de um arquivo JSON baseado nos dados do IBGE, utilizando o repositório [Estados-Cidades-IBGE](https://github.com/chandez/Estados-Cidades-IBGE?tab=readme-ov-file).

---

## Requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- SQL Server
- Ferramenta CLI do Entity Framework Core:  
  ```sh
  dotnet tool install --global dotnet-ef
  ```

---

## Configuração do Banco de Dados

Antes de rodar o projeto, configure a string de conexão no arquivo `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SEU_SERVIDOR;Database=NomeDoBanco;User Id=usuario;Password=senha;TrustServerCertificate=True;"
  }
}
```
> **Importante:**  
> Substitua `SEU_SERVIDOR`, `NomeDoBanco`, `usuario` e `senha` pelos dados do seu ambiente.

---

## Passo a Passo para Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/FernandoPorfirio/sinqia-teste-pratico
   cd seu-repo/Sinqia.Api
   ```

2. **Configure a string de conexão** no arquivo `appsettings.json` conforme explicado acima.

3. **Restaure os pacotes:**
   ```sh
   dotnet restore
   ```

4. **Crie as migrations iniciais (caso queira resetar ou evoluir o banco):**
   ```sh
   dotnet ef migrations add Inicial
   ```

5. **Atualize o banco de dados:**
   ```sh
   dotnet ef database update
   ```

6. **Compile o projeto:**
   ```sh
   dotnet build
   ```

7. **Rode a aplicação:**
   ```sh
   dotnet run
   ```

8. **Acesse a API:**  
   Por padrão, estará disponível em:  
   [https://localhost:5101](https://localhost:5101)  
   (ou a porta configurada no seu launchSettings.json)

---

## Comandos Úteis

- **Criar migration inicial:**
  ```sh
  dotnet ef migrations add Inicial
  ```
- **Atualizar banco de dados:**
  ```sh
  dotnet ef database update
  ```
- **Build do projeto:**
  ```sh
  dotnet build
  ```
- **Rodar o projeto:**
  ```sh
  dotnet run
  ```

---

## Seeds de Dados

Ao iniciar o projeto, caso o banco esteja vazio, os dados de regiões, estados e cidades são automaticamente carregados a partir do arquivo JSON localizado em `Data/Seeds/regioes_estados_cidades.json`.  
Esse arquivo foi gerado com base no repositório [Estados-Cidades-IBGE](https://github.com/chandez/Estados-Cidades-IBGE?tab=readme-ov-file).

---

## Estrutura das Migrations

- As migrations criam as tabelas de **Regiões**, **Estados**, **Cidades** e **Pontos Turísticos**.
- Ao rodar o projeto pela primeira vez, se não houver dados, o seed inicial será executado automaticamente.
- Não é necessário rodar comandos manuais para popular as tabelas de regiões, estados e cidades.

---

## Referências

- Dados IBGE: [https://github.com/chandez/Estados-Cidades-IBGE](https://github.com/chandez/Estados-Cidades-IBGE?tab=readme-ov-file)
- Documentação Entity Framework Core: [https://docs.microsoft.com/ef/core/](https://docs.microsoft.com/ef/core/)

---

> **Dúvidas ou problemas?**  
> Entre em contato por e-mail