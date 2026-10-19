import { linksferaRouter } from "./src/core/bootstrap";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return await linksferaRouter(request, env);
  },
};
