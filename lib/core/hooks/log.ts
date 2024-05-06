import log4js from "log4js";
import path from "path";

export default async (app) => {
  const logConfig = app.config.log;
  const dir = logConfig.dir;
  log4js.configure({
    appenders: {
      out: { type: "stdout" },
      access: {
        type: "dateFile",
        filename: path.join(dir, "access"),
        pattern: "yyyy-MM-dd-hh.log",
        alwaysIncludePattern: true,
      },
      error: {
        type: "dateFile",
        filename: path.join(dir, "error"),
        pattern: "yyyy-MM-dd-hh.log",
        alwaysIncludePattern: true,
      },
      application: {
        type: "dateFile",
        filename: path.join(dir, "application"),
        pattern: "yyyy-MM-dd-hh.log",
        alwaysIncludePattern: true,
      },
    },
    categories: {
      default: { appenders: ["out"], level: "info" },
      access: { appenders: ["access"], level: "info" },
      error: { appenders: ["error"], level: "error" },
      application: { appenders: ["application"], level: "info" },
    },
  });

  process.on("access", (msg) => {
    log4js.getLogger("access").info(msg);
  });

  process.on("error", (msg) => {
    log4js.getLogger("error").error(msg);
  });

  process.on("application", (msg) => {
    log4js.getLogger("application").info(msg);
  });

  app.use((ctx, next) => {
    (process as any).emit("access", JSON.stringify(ctx));
    ctx.log = (...arg) => {
      (process as any).emit("application", arg);
    };

    ctx.error = (...arg) => {
      (process as any).emit("error", arg);
    };
    return next();
  });
};
