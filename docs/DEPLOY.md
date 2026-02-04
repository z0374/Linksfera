# ⚙️ Guia de Instalação - Linksfera TEMPLATE

Este guia detalha como configurar o ambiente, integrar a biblioteca
dependente e automatizar o deploy da interface PHP utilizando GitHub
Actions e FTP.

## 1. Requisitos Prévios

-   Servidor com suporte a **PHP 8.x**.
-   Biblioteca PHP **`waranas_library`**.
-   Repositório configurado com os submódulos da engine.
-   Worker do backend já publicado e funcional.

## 2. Estratégia de Deploy (Recomendada)

Para manter o projeto organizado e facilitar atualizações, recomenda-se
a seguinte abordagem:

1.  **Repositório Principal:** Crie um novo repositório (ex:
    `meu-portal`) para ser a raiz do seu servidor.
2.  **Submódulo:** Adicione o `Linksfera Template` como um submódulo
    dentro deste repositório.
3.  **Entry Point:** Crie um `index.php` na raiz que aponte para o
    diretório do Linksfera ou configure seu servidor para servir a pasta
    do submódulo.

## 3. Configuração da Biblioteca e Caminhos

A biblioteca `waranas_library` é uma dependência obrigatória. Ela deve
residir em um diretório acessível pelo script principal.

### Estrutura de Pastas Sugerida

O padrão recomendado é manter a biblioteca fora da pasta pública do
template ou em um diretório de bibliotecas compartilhado (`/root/lib`):

``` plaintext
/root/ (Raiz do Servidor)
├── lib/
│   └── waranas_library/   # Biblioteca PHP Core
├── pages/
│   └── linksfera/         # Este Template (Submódulo)
│       ├── src/
│       └── index.php      # Arquivo a ser editado
└── index.php              # (Opcional) Redireciona para pages/linksfera/
```

### Ajustando o `index.php`

Você deve informar ao Linksfera onde encontrar a `waranas_library`.

1.  Abra o arquivo `linksfera/index.php`.
2.  Localize a linha de inclusão da biblioteca e ajuste o caminho
    relativo conforme sua estrutura de pastas.

Exemplo se a lib estiver em `../../lib/`:

``` php
require_once __DIR__ . '/../../lib/waranas_library/init.php';
```

## 4. Configuração Local (`.env`)

Antes do deploy, garanta que a comunicação com a API esteja configurada:

1.  Navegue até `src/config/`.
2.  Renomeie (ou crie) o arquivo `.env` baseando-se no exemplo abaixo:

``` env
WORKER_URL=https://seu-worker.seu-usuario.workers.dev
AUTH_TOKEN=seu_token_de_seguranca
```

O arquivo `data.php` utilizará estas variáveis para buscar os links no
Cloudflare D1.

## 5. Deploy Automatizado (CI/CD)

O deploy é realizado via GitHub Actions utilizando o protocolo FTP. A
pipeline está configurada para tratar a estrutura de submódulos,
ignorando os arquivos pesados do bot.

### Configurando as Secrets no GitHub

Adicione as chaves em `Settings > Secrets and variables > Actions`:

  -----------------------------------------------------------------------
  Secret                        Descrição
  ----------------------------- -----------------------------------------
  FTP_HOST                      Endereço do seu servidor FTP.

  FTP_USER                      Usuário de acesso ao FTP.

  FTP_PASSWORD                  Senha de acesso ao FTP.

  FTP_DIRECTORY_TEMPLATE        Caminho da pasta raiz no servidor (ex:
                                `/public_html` ou
                                `/root/pages/linksfera`).
  -----------------------------------------------------------------------

### Estrutura da Pipeline (`.github/workflows/deploy-ftp.yml`)

A pipeline realiza os seguintes passos:

-   **Limpeza de Submódulos:** Remove referências a submódulos de
    desenvolvimento.
-   **Sincronização Seletiva:** Inicializa apenas os componentes
    necessários.
-   **LFTP Mirror:** Sincroniza arquivos locais com o servidor,
    excluindo pastas `.git`.

## 6. Troubleshooting

-   **Erro "Class not found" ou "Failed to open stream":** Verifique se
    o caminho definido no `require_once` do `index.php` aponta
    corretamente para a pasta onde a `waranas_library` foi instalada no
    servidor.
-   **Erro de Conexão:** Verifique se o `AUTH_TOKEN` no `.env` é
    idêntico ao `tokenSite` configurado no Cloudflare Worker.

##7. Modelo de pipeline a ser utilizado

``` pipeline
name: Deploy via FTP

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do repositório (sem submódulos)
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          submodules: false

      - name: Limpar submódulo quebrado (linksfera)
        run: |
          git submodule deinit -f assets/js/bot/comands/linksfera || true
          git rm -f assets/js/bot/comands/linksfera || true
          rm -rf .git/modules/assets/js/bot/comands/linksfera || true

          git config -f .gitmodules --remove-section submodule."assets/js/bot/comands/linksfera" || true
          git submodule sync --recursive

      - name: Inicializar apenas submódulos válidos
        run: |
          git submodule update --init assets/js/bot/engine lib

      - name: Instalar lftp
        run: |
          sudo apt-get update
          sudo apt-get install -y lftp

      - name: Deploy via FTP
        run: |
          echo "Transferindo arquivos via lftp..."
          lftp -u "${{ secrets.FTP_USER }},${{ secrets.FTP_PASSWORD }}" ftp://${{ secrets.FTP_HOST }} -e "
            set ftp:use-feat no;
            mirror -R ./ ${{ secrets.FTP_DIRECTORY_TEMPLATE }}/linksfera \
              --exclude-glob .git* \
              --exclude-glob **/.git/** \
              --exclude ^assets/js/bot(/.*)?$;
            quit
          "
          ```
