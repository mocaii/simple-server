import Koa from "koa";
import path from "path";
import { deepMerge, getHooks } from "./utils";
import { App, Hook } from "./types";
const hooks = [
  "bodyparser",
  "view",
  "login",
  "custom-middlewares",
  "cors",
  "static",
  "router",
  "lift",
  "mysql",
  "log",
];
type Params = {
  appPath: string;
};
export default async function Momo(params: Params) {
  const app: App = new Koa();
  const { appPath } = params;
  app.appPath = appPath;

  //获取所有的config
  const env = process.env.NODE_ENV || "development";
  const extName = (app.extName = env === "development" ? ".ts" : ".js");
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`));
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));

  //获取所有hooks
  const allHooks: Hook[] = await getHooks(hooks);

  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) {
      console.log(error);
      (process as any).emit("error", error);
    }
  }

  app.on("error", (error: Error) => {
    (process as any).emit("error", error);
  });
}
