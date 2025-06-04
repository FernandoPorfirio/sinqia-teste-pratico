# Comandos SQL — Teste Prático

Abaixo estão os comandos SQL solicitados, baseados na estrutura das tabelas do projeto (`PontosTuristicos`, `Cidades`, `Estados`, `Regiao`).

---

## 1. SELECT com EXISTS — Nome dos pontos turísticos da cidade Tupã

```sql
SELECT pt.Nome
FROM PontosTuristicos pt
WHERE EXISTS (
    SELECT 1
    FROM Cidades c
    WHERE c.Id = pt.CidadeId
      AND c.Nome = 'Tupã'
);
```

---

## 2. SELECT — Nome do ponto turístico e nome da cidade

```sql
SELECT pt.Nome AS PontosTuristicos, c.Nome AS Cidades
FROM PontosTuristicos pt
JOIN Cidades c ON pt.CidadeId = c.Id;
```

---

## 3. SELECT — Todos os nomes e códigos dos pontos turísticos ordenados por nome

```sql
SELECT pt.Id, pt.Nome
FROM PontosTuristicos pt
ORDER BY pt.Nome;
```

---

## 4. DELETE — Excluir pontos turísticos com código entre 100 e 200

```sql
DELETE FROM PontosTuristicos
WHERE Id BETWEEN 100 AND 200;
```

---

## 5. UPDATE — Alterar estado de todas as cidades de "PR" para "SP"

```sql
UPDATE Cidades
SET EstadoId = (
    SELECT e_sp.Id FROM Estados e_sp WHERE e_sp.Sigla = 'SP'
)
WHERE EstadoId = (
    SELECT e_pr.Id FROM Estados e_pr WHERE e_pr.Sigla = 'PR'
);
```

---

## 6. INSERT — Inserir ponto turístico (exemplo)

```sql
INSERT INTO PontosTuristicos (Nome, Descricao, Localizacao, CidadeId, DataCriacao)
VALUES ('Museu India Vanuíre', 'Museu India Vanuíre – Tupã/SP', 'R. Coroados, 521 · (14) 3491-2202', 3884, GETDATE());
```

---

## 7. View para consultar cidades

```sql
CREATE OR ALTER VIEW vw_Cidades AS
SELECT c.Id, c.Nome, c.EstadoId, e.Nome AS Estado, e.Sigla
FROM Cidades c
JOIN Estados e ON c.EstadoId = e.Id;
```

### Exemplo de uso da View `vw_Cidades`

```sql
-- Consultar todas as cidades com informações do estado
SELECT * FROM vw_Cidades;

-- Filtrar cidades do estado de São Paulo
SELECT * FROM vw_Cidades WHERE Sigla = 'SP';
```
---

## 8. Procedure para INSERT, UPDATE e DELETE em cidades

```sql
CREATE OR ALTER PROCEDURE sp_OperacaoCidade
    @Operacao NVARCHAR(10),
    @Id INT = NULL,
    @Nome NVARCHAR(100) = NULL,
    @EstadoId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Operacao = 'INSERT'
    BEGIN
        INSERT INTO Cidades (Nome, EstadoId)
        VALUES (@Nome, @EstadoId);
    END
    ELSE IF @Operacao = 'UPDATE'
    BEGIN
        UPDATE Cidades
        SET Nome = @Nome, EstadoId = @EstadoId
        WHERE Id = @Id;
    END
    ELSE IF @Operacao = 'DELETE'
    BEGIN
        DELETE FROM Cidades WHERE Id = @Id;
    END
END
```

### Exemplo de uso da Procedure `sp_OperacaoCidade`

```sql
-- Inserir uma nova cidade
EXEC sp_OperacaoCidade @Operacao = 'INSERT', @Nome = 'Nova Cidade', @EstadoId = 1;

-- Atualizar o nome e estado de uma cidade existente
EXEC sp_OperacaoCidade @Operacao = 'UPDATE', @Id = 5571, @Nome = 'Cidade Atualizada', @EstadoId = 2;

-- Excluir uma cidade pelo Id
EXEC sp_OperacaoCidade @Operacao = 'DELETE', @Id = 5571;
```

---