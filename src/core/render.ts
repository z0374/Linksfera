import { headAssets, header, html, style } from "waranas";
import { buildHeader } from "../landmarks/header";
import { bodyStyle } from "../css/body";
import { buildMain } from "../landmarks/main";
import type { LoadConfig } from "./config/data";
import { buildFooter } from "../landmarks/footer";
import { buildHead } from "../landmarks/head";

export function render(data: LoadConfig): Response {
  buildHead(data);
  buildHeader(data);
  const links = data.links;
  buildMain(links, data);
  style.add(bodyStyle());
  buildFooter(data);
  return html();
}
