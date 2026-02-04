<?php

    require_once(ROOT_PATH_LINKSFERA . "/src/config/data.php");

// 1. Definição dos caminhos (Melhora a legibilidade)
$pathSvgLogo  = ROOT_PATH_LINKSFERA . "/" . LOGO;
$pathHtmlLogo = ROOT_PATH_LINKSFERA . "/assets/html/logo.html";

// 2. Processa o SVG (addSvg já trata internamente se o arquivo não existir)
// Retorna: <svg class="svgLogo"><use href="#svgLogo"></use></svg>
if(isSvg(($pathSvgLogo))){
    $svgLogo = addSvg($pathSvgLogo, "svgLogo");
}else{
    $svgLogo = $pathSvgLogo;
}
// 3. Empilha os arquivos CSS
array_push($css_files, 
    ROOT_PATH_LINKSFERA . "/assets/css/header.css",
    ROOT_PATH_LINKSFERA . "/assets/css/logo.css"
);

// 4. Carrega e Injeta o Logo no HTML
if (file_exists($pathHtmlLogo)) {
    $logoHTML = file_get_contents($pathHtmlLogo);
    
    // Procura id="logo" em logoHTML e coloca o <svg> dentro
if(isSvg(($pathSvgLogo))){
    $header[] = appendHTML($logoHTML, "logo", $svgLogo);
    }else{
        $header[] = $logoHTML;
        $style[] = "#logo{background:url(" . LOGO . ") no-repeat center / contain;";
    }
} else {
    // Fallback : Se o arquivo HTML sumir, não quebra o site
    // error_log("Arquivo logo.html não encontrado.");
    $header[] = "";
}
logs($dataLinks, $type = 'INFO');
// 5. Adiciona o componente de busca
// Certifique-se de que $lnksData está definido neste escopo
$header[] = search(21, $dataLinks, 'main');