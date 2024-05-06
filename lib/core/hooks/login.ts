import { sign, decode } from "jsonwebtoken";

export default async (app) => {
  const loginConfig = app.config.login;
  const { secret, cookieOption } = loginConfig;
  if (loginConfig?.needLogin) {
    //检测是否已经登录
    const checkLogin = (ctx, next) => {
      const token = ctx.cookies.get("momo_token");
      console.log("token", token);

      if (!token) {
        const jwt = login();
        // console.log("jwt", jwt, ctx.url);

        ctx.cookies.set("momo_token", jwt, cookieOption);
        ctx.status = 302;
        ctx.redirect(ctx.url);
      } else {
        const user = decode(token);
        if (user) {
          ctx.user = user;
        }
      }
      return next();
    };
    const login = () => {
      const jwt = sign({ username: "mocai" }, secret, { expiresIn: "1h" });
      return jwt;
    };
    app.use(checkLogin);
  }
};
