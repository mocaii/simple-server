export default async (app: any) => {
  const port = app.config.devServer.port;
  app.listen(port, () => {
    // console.log("lift");
  });
};
