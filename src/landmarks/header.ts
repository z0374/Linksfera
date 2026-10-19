import { header, linkLogo, publicSearch, style } from "waranas";
import { headerStyle } from "../css/header";
import type { LoadConfig } from "../core/config/data";

export function buildHeader(data: LoadConfig): void {
  const image = data.logo ?? [
    "https://assets.victormacedo.dev.br/png/favicon/linksfera.png",
    false,
  ];
  console.log("--IMAGE HEADER-- : " + image);
  header.push(linkLogo(image[0], image[1]));
  header.push(publicSearch([], "main"));

  style.add(headerStyle());
}
