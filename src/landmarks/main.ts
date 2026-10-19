import {
  COLORS,
  colorTone,
  doItElement,
  main,
  script,
  style,
  styleVar,
} from "waranas";
import { mainStyle } from "../css/main";
import type { LoadConfig } from "../core/config/data";

export function buildMain(
  links: { fixed: unknown[]; show: unknown[] },
  data: LoadConfig,
) {
  const fixed = Array.isArray(links.fixed ?? null) ? [...links.fixed] : [];

  const show = Array.isArray(links.show ?? null) ? [...links.show] : [];

  const dataLinks = JSON.stringify([...fixed, ...show]);

  const scriptLinks = `
    document.addEventListener("DOMContentLoaded", () => {
      renderizarLinks(${dataLinks});
    });

    function renderizarLinks(links) {
      const mainContainer = document.querySelector("main ul");
      if (!mainContainer) return;

      mainContainer.innerHTML = "";

      const pins = links.filter(
        (item) => item.visible === "pin"
      );

      let shows = links.filter(
        (item) => item.visible === "show"
      );

      shows = shows.sort(
        () => Math.random() - 0.5
      );

      const linksParaExibir = [
        ...pins,
        ...shows
      ].slice(0, 3);

      linksParaExibir.forEach((item) => {
        const li = document.createElement("li");

        li.className = "mainItem";

        if (item.visible === "pin") {
          li.classList.add("pinned");
        }

        li.innerHTML = \`
          <h1>\${item.titulo || ""}</h1>
          <h2>\${item.legenda || ""}</h2>

          <a
            href="\${item.url || item.anc || "#"}"
            target="_blank"
          >
            \${item.texto || item.text || "Visitar"}&nbsp;

            <svg
              class="icon arrowClick"
              style="width: 1em; height: 1em;"
            >
              <use href="#arrow"></use>
            </svg>
          </a>
        \`;

        mainContainer.appendChild(li);
      });
    }
  `;
  const styleVarMain = `
      --colorMainP:${data.colorP};
      --colorMainS:${data.colorS};
      --colorMainSDark:${colorTone(data.colorS ?? "#000000", 30, "darken")};
      --colorMainDDark:${colorTone(data.colorS ?? "#000000", 60, "darken")};
  `;
  script.add(scriptLinks);

  main.push(doItElement("ul"));
  styleVar.push(styleVarMain);
  style.add(mainStyle());
}
