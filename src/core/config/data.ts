import {
  clearKV,
  getJsonData,
  headAssets,
  recoveryKV,
  sleepFetch,
} from "waranas";

interface ConfigData {
  favicon: string;
  logo: string;
  links1: string;
  links2: string;
  links3: string;
  title: string;
  text: string;
  colorP: string;
  colorS: string;
  colorD: string;
}

export interface LoadConfig {
  logo?: [string, boolean];
  favicon?: string;
  links: {
    fixed: Record<string, unknown>[];
    hidden: Record<string, unknown>[];
    show: Record<string, unknown>[];
  };

  links1?: string;
  links2?: string;
  links3?: string;

  title?: string;
  text?: string;

  colorP?: string;
  colorS?: string;
  colorD?: string;
}

export async function loadConfig(env: Env): Promise<LoadConfig> {
  /*
   * Verifica se precisamos atualizar a configuração.
   *
   * 5 minutos = 300000 ms
   */
  const sleep = await sleepFetch("linksfera", 5 * 60 * 1000, env.CORE);

  /*
   * Ainda dentro do período de validade.
   * Recupera a última configuração diretamente do CORE.
   */
  if (!sleep.run) {
    const stored = await env.CORE.get("configLinksfera");

    if (stored) {
      try {
        return JSON.parse(stored) as LoadConfig;
      } catch {
        // Se o conteúdo estiver inválido,
        // continuamos para reconstruir a configuração.
      }
    }
  }

  /*
   * A partir daqui somente executamos quando
   * a configuração precisa ser atualizada.
   */

  const [config_url, config_auth, config_page] = env.configsTokens.split(",");

  const dataConfigText = new TextDecoder().decode(
    await recoveryKV(
      env.ASSETS,
      await getJsonData(
        config_url,
        ["config", "linksfera"],
        config_auth,
        env,
        config_page,
      ),
    ),
  );

  const dataConfig: ConfigData = JSON.parse(dataConfigText);

  const data: LoadConfig = {
    links: {
      fixed: [],
      hidden: [],
      show: [],
    },
  };

  if (dataConfig) {
    clearKV(env.ASSETS);
    /*
     * FAVICON
     */
    data.favicon =
      "/assets/" +
      (await getJsonData(
        config_url,
        ["assets", dataConfig.favicon],
        config_auth,
        env,
        config_page,
      ));

    /*
     * LOGO
     */
    const logo = await getJsonData(
      config_url,
      ["assets", dataConfig.logo],
      config_auth,
      env,
      config_page,
    );

    if (logo?.startsWith("svg/")) {
      const svgBuffer = await recoveryKV(env.ASSETS, logo);

      if (svgBuffer.byteLength > 0) {
        data.logo = [new TextDecoder().decode(svgBuffer), true];
      }
    } else {
      data.logo = [logo ?? "", false];
    }

    /*
     * LINKS 1
     */
    const links1 = await getJsonData(
      config_url,
      ["assets", dataConfig.links1],
      config_auth,
      env,
      config_page,
    );

    data.links1 = JSON.parse(
      new TextDecoder().decode(await recoveryKV(env.ASSETS, links1)),
    );

    /*
     * LINKS 2
     */
    const links2 = await getJsonData(
      config_url,
      ["assets", dataConfig.links2],
      config_auth,
      env,
      config_page,
    );

    data.links2 = JSON.parse(
      new TextDecoder().decode(await recoveryKV(env.ASSETS, links2)),
    );

    /*
     * LINKS 3
     */
    const links3 = await getJsonData(
      config_url,
      ["assets", dataConfig.links3],
      config_auth,
      env,
      config_page,
    );

    data.links3 = JSON.parse(
      new TextDecoder().decode(await recoveryKV(env.ASSETS, links3)),
    );

    /*
     * DADOS GERAIS
     */
    headAssets.title = dataConfig.title;

    data.text = dataConfig.text;

    data.colorP = dataConfig.colorP ?? "#000000";

    data.colorS = dataConfig.colorS ?? "#FFFFFF";

    data.colorD = dataConfig.colorD ?? "#363636";
  }

  /*
   * LINKS
   */
  const dataLinksKey = await getJsonData(
    config_url,
    ["assets", "link"],
    config_auth,
    env,
    config_page,
  );

  const dataLinks = new TextDecoder().decode(
    await recoveryKV(env.ASSETS, dataLinksKey),
  );

  let items: Record<string, unknown>[] = [];

  if (typeof dataLinks === "string") {
    if (dataLinks.includes("[|]")) {
      for (const json of dataLinks.split("[|]")) {
        try {
          const item = JSON.parse(json);

          if (item && typeof item === "object") {
            items.push(item);
          }
        } catch {}
      }
    } else {
      try {
        const decoded = JSON.parse(dataLinks);

        if (Array.isArray(decoded)) {
          items = decoded;
        } else if (decoded && typeof decoded === "object") {
          items = [decoded];
        }
      } catch {}
    }
  } else if (Array.isArray(dataLinks)) {
    items = dataLinks;
  } else if (dataLinks && typeof dataLinks === "object") {
    items = [dataLinks];
  }

  /*
   * ORGANIZA OS LINKS
   */
  data.links = {
    fixed: items.filter((item) => item.visible === "pin"),

    hidden: items.filter((item) => item.visible === "hidden"),

    show: items.filter((item) => item.visible === "show"),
  };

  /*
   * SALVA A CONFIGURAÇÃO COMPLETA
   * para as próximas requisições.
   */
  await env.CORE.put("configLinksfera", JSON.stringify(data));

  return data;
}
