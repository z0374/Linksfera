import { loadConfig } from "./config/data";
import { render } from "./render";

export async function linksfera(env: Env) {
  const data = await loadConfig(env);
  return render(data);
}
