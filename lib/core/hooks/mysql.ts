import mysql from "mysql2";
export default async (app) => {
  const mysqlConfig = app.config.mysql;
  try {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    app.mysqlConMsg = "Mysql connect success";
    app.use((ctx, next) => {
      ctx.mysql = connection;
      return next();
    });
  } catch (error) {
    // process.emit("error", error);
  }
};
