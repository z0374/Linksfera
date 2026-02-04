# 🔐 Configuração de Variáveis de Ambiente (.env)

O sistema utiliza um arquivo de configuração protegido para armazenar credenciais e endpoints. 

Este arquivo possui um **cabeçalho PHP de segurança** que impede a leitura direta via navegador, seguido pelas definições de variáveis no formato `chave = "valor"`.

## 📍 Localização
O arquivo deve ser criado em:
`src/config/.env`

## 📝 Variáveis Necessárias

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `config_url` | URL do Cloudflare Worker (API Backend). | `https://api.user.workers.dev` |
| `config_auth` | Token de segurança para validar a requisição (Server-to-Server). | `seu_token_secreto` |
| `config_page` | Identificador único da página que este template deve renderizar. | `minha-landing-page` |

## 📄 Modelo de Arquivo (.env)

Copie o código abaixo **exatamente como está** (incluindo a tag `<?php`) e preencha os valores dentro das aspas:

```php
<?php
    http_response_code(403);
    exit("Acesso negado.");
?>

#Config Tokens

config_url = "[https://seu-worker.seu-usuario.workers.dev](https://seu-worker.seu-usuario.workers.dev)"
config_auth = "seu_token_de_autenticacao"
config_page = "identificador_da_pagina"
