# 📂 Estrutura do Projeto - Linksfera

Este documento mapeia a organização de pastas e arquivos do projeto, facilitando a navegação e o entendimento do fluxo de dados entre o Frontend (PHP) e o Backend (Cloudflare Worker).

## 🗺️ Visão Geral

A estrutura foi pensada para separar arquivos públicos (assets), documentação e lógica de negócios.

```plaintext
linksfera/
├── assets/                 # Arquivos estáticos públicos
│   ├── css/                # Estilos (Tailwind/Custom)
│   ├── js/                 # Scripts de interação (Front-end)
│   └── svg/                # Ícones e vetores
│
├── docs/                   # Documentação do Desenvolvedor
│   ├── INSTALL.md          # Guia de instalação e deploy
│   ├── ENV.md              # Modelo de configuração de ambiente
│   └── STRUCTURE.md        # Este arquivo (Mapa do projeto)
│
├── src/                    # Código fonte da aplicação
│   ├── config/             # Configurações e Conexão de Dados
│   │   ├── .env            # Credenciais (Protegido via PHP)
│   │   └── data.php        # Script de Fetch na API do Worker
│   │
│   └── core/               # Lógica de Renderização
│       ├── render.php      # Montagem do HTML
│       └── components/     # Fragmentos de view (Header, Footer, Cards)
│
├── index.php               # Entry Point (Ponto de Entrada)
└── README.md               # Visão geral rápida (para o GitHub)
