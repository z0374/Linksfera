# 🚀 Linksfera-GPL

> Portal de links inteligente, vertical e gerenciável em tempo real via Telegram.

[![Status](https://img.shields.io/badge/Status-Online-brightgreen)](https://victormacedo.dev.br/)
[![License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Serverless--PHP-orange)](#-tecnologias)

O **Linksfera** é uma solução avançada para centralização de presença digital. Diferente de listas estáticas, ele oferece um ecossistema dinâmico onde você gerencia seus links e identidade visual através de um bot, com entrega via Cloudflare Workers.

**🔗 Demo Online:** [victormacedo.dev.br](https://victormacedo.dev.br/)

## ✨ Destaques

* **🔍 Busca em Tempo Real:** Filtro instantâneo de links no frontend.
* **🤖 Gestão via Bot:** CRUD completo de links e configurações via Telegram.
* **📸 Cloud Storage:** Integração nativa com Google Drive para imagens.
* **⚡ Performance:** Arquitetura Serverless com banco de dados D1 (SQL).

## 📂 Estrutura do Projeto

O repositório é dividido em dois módulos principais:
* [`BOT/`](./BOT/engine): O "cérebro" do projeto (API, Worker e lógica do Bot).
* [`TEMPLATE/`](./TEMPLATE): A interface web (PHP/CSS) que consome os dados.

## 🛠️ Tecnologias

* **Backend:** Cloudflare Workers (JS), D1 Database, KV Storage.
* **Frontend:** PHP 8.x, Vanilla JS, CSS3 (Mobile-First).
* **Integrações:** Telegram Bot API, Google Drive API.

## 📖 Documentação Detalhada

1.  **[Guia de Instalação (INSTALL.md)](./docs/DEPLOY.md)**: Como configurar o Worker, D1 e o ambiente PHP.
2.  **[Variáveis de Ambiente (ENV.md)](./docs/ENV.md)**: Lista de tokens e IDs necessários.
3.  **[Guia de Contribuição (CONTRIBUTING.md)](./CONTRIBUTING.md)**: Como ajudar a melhorar o projeto.

## 📝 Licença

Distribuído sob a licença **GPL v3**. Veja o arquivo `LICENSE` para mais informações.

---
Desenvolvido por [Victor Macedo](https://victormacedo.dev.br/)
