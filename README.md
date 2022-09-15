# FullCycle-Nginx-Node

Neste projeto temos como objetivo subir um container com o nginx e outro com o nodejs, e fazer com que o nginx faça o proxy para o nodejs.

O código do nodejs deve realizar uma conexão com o banco de dados mysql e retornar o resultado da consulta.

No projeto há alguns arquivos:

- init-db.sql: arquivo sql para criação do banco de dados e da tabela e seus dados iniciais
- default.conf: arquivo de configuração do nginx

O Código fonte do node está na pasta `node` e para construir todo o projeto você deve utilizar o docker-compose.

```bash
docker compose up -d --build
```

Para acessar o nodejs, acesse o endereço http://localhost:8080

Aproveite e bom divertimento!