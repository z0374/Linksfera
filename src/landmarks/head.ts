import { doItElement, head, headAssets } from "waranas";
import type { LoadConfig } from "../core/config/data";

export function buildHead(data: LoadConfig) {
headAssets.title = data.title;
  headAssets.favicon = data.favicon;
  const scriptSVG = doItElement("script")
    .setAttr("src", "https://waranasjs.victormacedo.dev.br/js/loadSVG.js")
    .setAttr("defer");
  head.add(scriptSVG);
}
