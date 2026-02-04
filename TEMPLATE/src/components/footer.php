<?php

array_push(
    $css_files,
    ROOT_PATH_LINKSFERA . "/assets/css/footer.css"
);



$link1 = getSVG(strtolower(LINK1["titulo"]), 'svg' . strtolower(LINK1["titulo"]));
$link2 = getSVG(strtolower(LINK2["titulo"]), 'svg' . strtolower(LINK2["titulo"]));
$link3 = getSVG(strtolower(LINK3["titulo"]), 'svg' . strtolower(LINK3["titulo"]));

$styleVar[] = "
    --colorFooterPL:" . colorTone(COLOR1, 54, 'lighten') . ";
    --colorFooterP:" . COLOR1 . ";
    --colorFooterD:" . COLOR3 . ";
    ";

$rodape = '
    <li id="i01">
        <h2 id="titulo">' . TEXT_FOOTER . '</h2>
    </li>
    <li id="i02">
        <a id="link1" href="' . LINK1["url"] . '" target = "_blank">
            '. $link1 .'
            ' . LINK1["texto"] . '
        </a>
    </li>    
    <li id="i03">
        <a id="link2" href="' . LINK2["url"] . '" target = "_blank">
            '. $link2.'
            ' . LINK2["texto"] . '
        </a> | <a id="link3" href="' . LINK3["url"] . '" target = "_blank">
            ' . $link3 . '
            ' . LINK3["texto"] . ' 
        </a>
    </li>
        ';

$footer[] = "<ul>". $rodape ."</ul>";