import {
  append,
  colorTone,
  doItElement,
  footer,
  style,
  styleVar,
} from "waranas";
import { footerStyle } from "../css/footer";
import type { LoadConfig } from "../core/config/data";

export function buildFooter(data: LoadConfig) {
  const _data = {
    link1: data.links1 ?? JSON.parse("{}"),
    link2: data.links2 ?? JSON.parse("{}"),
    link3: data.links3 ?? JSON.parse("{}"),
  };
  //console.log("--DATA-- : " + JSON.stringify(_data));
  const listElement = doItElement("ul");
  const i01 = doItElement("li").setAttr("id", "i01");
  const h2Footer = doItElement("h2").setAttr("id", "titulo");
  append(i01, h2Footer);

  console.log("--TITLE-- : " + data.text);
  const svgFooter: [string, string, string] = [
    `<svg
      class="icon arrowClick"
      style="width: 1em; height: 1em;"
        >
        <use href="#`,
    _data.link1.titulo.toLowerCase() ?? "",
    `"></use>
  </svg>&nbsp;`,
  ];
  h2Footer.textContent = data.text ?? "";
  const i02 = doItElement("li").setAttr("id", "i02");
  const i02a = doItElement("a").setAttr("id", "i02a");
  i02a.textContent = svgFooter.join("") + (_data.link1.texto ?? "");
  i02a.setAttr("href", _data.link1.url ?? "");
  append(i02, i02a);

  const i03 = doItElement("li").setAttr("id", "i03");
  const i03a = doItElement("a").setAttr("id", "i03a");
  svgFooter[1] = _data.link2.titulo.toLowerCase() ?? "";
  i03a.textContent = svgFooter.join("") + (_data.link2.texto ?? "");
  i03a.setAttr("href", _data.link2.url ?? "");
  const i03p = doItElement("p");
  i03p.textContent = ` | `;
  const i03b = doItElement("a").setAttr("id", "i03b");
  svgFooter[1] = _data.link3.titulo.toLowerCase() ?? "";
  i03b.textContent = svgFooter.join("") + (_data.link3.texto ?? "");
  i03b.setAttr("href", _data.link3.url ?? "");
  append(i03, i03a, i03p, i03b);

  const listItems = [i01, i02, i03];

  append(listElement, ...listItems);

  footer.push(listElement);
  styleVar.push(
    `--colorFooterPL: ${colorTone(data.colorP ?? "#FFF", 54, "lighten")};`,
    `--colorFooterP: ${data.colorP};`,
    `--colorFooterD: ${data.colorD};`,
  );
  style.add(footerStyle());
}

/*<?php

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

$footer[] = "<ul>". $rodape ."</ul>";*/
