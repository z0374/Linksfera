<?php
require_once(ROOT_PATH_LINKSFERA . "/src/config/data.php");

$css_files[] = ROOT_PATH_LINKSFERA . "/assets/css/main.css";

$styleVar[] = "
    --colorMainP:" . COLOR1 . ";
    --colorMainS:" . COLOR2 . ";
    --colorMainSDark:" . colorTone(COLOR2, 30, 'darken') . ";
    --colorMainDDark:" . colorTone(COLOR2, 60, 'darken') . ";
    ";

$li = [];

$fixed = is_array($fixed ?? null) ? array_values($fixed) : [];
$show  = is_array($show  ?? null) ? array_values($show)  : [];

// Completa fixed com itens de show até ter 3
if (count($fixed) < 3 && count($show) > 0) {
    shuffle($show);

    foreach ($show as $item) {
        // evita duplicar itens já fixados (por URL, por exemplo)
        $exists = false;
        foreach ($fixed as $f) {
            if (($f['url'] ?? null) === ($item['url'] ?? null)) {
                $exists = true;
                break;
            }
        }

        if (!$exists) {
            $fixed[] = $item;
        }

        if (count($fixed) >= 3) {
            break;
        }
    }
}

// Se ainda estiver vazio, não renderiza nada
if (count($fixed) === 0) {
    return;
}

$arrow = getSVG("arrow", "arrowClick");

foreach ($fixed as $item) {
    $ttl = "<h1>" . ($item['titulo']  ?? '') . "</h1>";
    $lgd = "<h2>" . ($item['legenda'] ?? '') . "</h2>";
    $anc = "<a href='" . ($item['url'] ?? '#') . "'>" .
           ($item['texto'] ?? '') . " " . $arrow . "</a>";

    $li[] = "<li class='mainItem'>{$ttl}{$lgd}{$anc}</li>";
}

if (!empty($li)) {
    $main[] = '<ul>' . implode('', $li) . '</ul>';
}