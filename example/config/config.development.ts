import path from "path";

export default () => {
  return {
    devServer: {
      port: 8888,
    },
    //路由类型 file|koa-router
    router: "file",
    //koa-static中间件配置
    static: {},
    //cors配置
    cors: {
      origin: "http://localhost:3000",
      maxAge: 0,
    },
    //自定义中间件，从左到右顺序执行
    middlewares: ["two", "one"],
    //登录配置
    login: {
      needLogin: true, //是否需要登录
      secret: "my_secret", //JWT的加密secret
      // cookieOption: {
      //   path: "/user/getinfo",
      //   domain: "http://localhost",
      // },
    },
    //koa-view模版配置
    view: {
      // extension: "ejs",
    },
    //mysql配置
    mysql: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "test",
    },
    //配置日志
    log: {
      dir: path.join(__dirname, "../log"),
    },
  };
};
