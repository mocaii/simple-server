const glob = require("glob");
import path, { extname } from "path";
import compose from "koa-compose";
import koa from "koa";
export default async (app) => {
  const { router } = app.config;
  const filePath = path.resolve(app.appPath, "./controller", `**/*${app.extName}`);
  const fileList = (glob as any).sync(filePath);

  //如果是文件路由类型
  if (router === "file") {
    //文件路由映射表
    let routerMap = {};

    for (let item of fileList) {
      const controller = await import(item);
      const { method, handler } = controller.default;
      const relative = path.relative(`${app.appPath}/controller/`, item);
      //获取文件后缀
      const extName = path.extname(item);
      const fileRouter = "/" + relative.split(extName)[0];
      const key = "_" + method + "_" + fileRouter;
      routerMap[key] = handler;
    }
    app.use(async (ctx, next) => {
      const { path, method } = ctx;
      const key = "_" + method + "_" + path;
      if (routerMap[key]) {
        await routerMap[key](ctx);
      } else {
        await ctx.render("404");
      }
      return next();
    });
  } else if (router === "koa-router") {
    const filePath = path.resolve(app.appPath, "./routers", `**/*${app.extName}`);
    const routerFiles = glob.sync(filePath);

    const registerRouter = async () => {
      let routers: any[] = [];
      for (let file of routerFiles) {
        const router = await import(file);

        routers.push(router.default.routes());
      }

      return compose(routers);
    };
    app.use(await registerRouter());
  }
};
