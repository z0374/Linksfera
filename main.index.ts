import { linksferaRouter } from "./src/core/bootstrap";

export function runLinksfera(req: Request, env: Env) {
  return linksferaRouter(req, env);
}
