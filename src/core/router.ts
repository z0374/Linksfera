import { routerAssets } from "waranas";
import { render } from "./render";
import { loadConfig } from "./config/data";

export async function linksferaRouter(
  request: Request,
  env: Env,
): Promise<Response> {
  const data = await loadConfig(env);
  const response = await routerAssets(env.ASSETS, request);
  console.log("--response-- : ", response);
  if (response) {
    return response;
  }
  console.log(JSON.stringify(data));
  return render(data);
}
