<?php

if (basename(__FILE__) === basename($_SERVER["SCRIPT_FILENAME"])) {
    http_response_code(403);
    exit("Acesso direto proibido.");
}

$envFile = dirname(ROOT_PATH_LINKSFERA, 4) . "/src/config/.env";
if (!file_exists($envFile)) {
    $envFile = ROOT_PATH_LINKSFERA . "/src/config/.env";
}
if (!file_exists($envFile)) {
    throw new Exception("Arquivo de configuração ausente.");
}

loadEnv($envFile);

$dataLinks = getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['assets', 'link'],
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
);

// 1. Define a primeira constante
define('DATA_CONFIG', getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['config', 'linksfera'],
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
));

// 2. Usa a primeira constante para definir a segunda
// Note que para acessar constant, não se usa $
define('LOGO', getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['assets', DATA_CONFIG["logo"]], // Acessa DATA_CONFIG direto
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
));
define('LINK1', getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['assets', DATA_CONFIG["links1"]], // Acessa DATA_CONFIG direto
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
));

define('LINK2', getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['assets', DATA_CONFIG["links2"]], // Acessa DATA_CONFIG direto
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
));

define('LINK3', getJsonData(
    url: $_ENV["config_url"] ?? '',
    parametro: ['assets', DATA_CONFIG["links3"]], // Acessa DATA_CONFIG direto
    authToken: $_ENV["config_auth"] ?? '',
    pageToken: $_ENV["config_page"] ?? null
));

define('TEXT_FOOTER', DATA_CONFIG["text"]);
define('COLOR1', DATA_CONFIG["colorP"]);
define('COLOR2', DATA_CONFIG["colorS"]);
define('COLOR3', DATA_CONFIG["colorD"]);
unsetEnv($envFile);
//var_dump(DATA_CONFIG);
/**
 * Normalização dos dados para sempre virar:
 * [
 *   [ 'titulo' => ..., 'visible' => ..., ... ],
 *   [ ... ],
 * ]
 */
$items = []; $config =[];
//var_dump($logo);
if (is_string($dataLinks)) {
    // Caso especial: vários JSONs concatenados por [|]
    if (str_contains($dataLinks, '[|]')) {
        $parts = explode('[|]', $dataLinks);

        foreach ($parts as $json) {
            $item = json_decode($json, true);
            if (is_array($item)) {
                $items[] = $item;
            }
        }
    } else {
        // JSON único
        $decoded = json_decode($dataLinks, true);
        if (is_array($decoded)) {
            // Se for associativo, vira lista
            $items = array_keys($decoded) !== range(0, count($decoded) - 1)
                ? [$decoded]
                : $decoded;
        }
    }
}
elseif (is_array($dataLinks)) {
    // Já veio em formato array
    $items = array_keys($dataLinks) !== range(0, count($dataLinks) - 1)
        ? [$dataLinks]
        : $dataLinks;
}

$dataLinks = $items;

// Filtros
$fixed = array_values(array_filter($dataLinks, fn($i) => ($i['visible'] ?? null) === 'pin'));
$hidden = array_values(array_filter($dataLinks, fn($i) => ($i['visible'] ?? null) === 'hidden'));
$show   = array_values(array_filter($dataLinks, fn($i) => ($i['visible'] ?? null) === 'show'));


//[
//    ['ttl'=>'Instagram','lgd'=>'Instagram pessoal','anc'=>'https://instagram.com/victor.macedo2001','cnt'=>'victor.macedo2001','tags'=>'instagram,pessoal,blog,fotos,familia'],
//    ['ttl'=>'TELLONYM','lgd'=>'me pergunte anonimamente','anc'=>'https://tellonym.me/victor.macedo2001','cnt'=>'victor.macedo2001','tags'=>'perguntas,familia,anonimo,anonimas,conversa,feedback'],
//    ['ttl'=>'Twitter','lgd'=>'novo X','anc'=>'https://twitter.com/Victor_AM2001?t=8Xe_3trKoSr64lpC8F-VOw&s=09','cnt'=>'victor_am2001','tags'=>'twitter'],
//    ['ttl'=>'Catalogar Arquivos','lgd'=>'assistente que te ajuda a catalogar arquivos do seu aparelho','anc'=>'/catalogarArquivos','cnt'=>'Catalogar agora','tags'=>'catalogar, arquivos'],
//];
//    $lnksAbsconditus=[
//        ['ttl'=>'Curriculo Vitae','lgd'=>'Meus Cursos e experiências acadêmicas e profissionais','anc'=>'/curriculo','cnt'=>'Meu Curriculo','tags'=>'curriculo,profissional,cursos,certificados']
//    ];
//    $lnksData=array_merge($lnksRevelatus, $lnksAbsconditus);
//$lnks = [['ttl'=>'Portifólio','lgd'=>'conheça um pouco do meu trabalho','anc'=>'/portifolio','cnt'=>'meu portifolio'],];