export default {
  method: "GET",
  handler: async (ctx) => {
    // process.emit("error", "this is an error");
    ctx.body = `welcome, ${ctx.user.username}`;
    // try {
    //   throw new Error("This is an Error");
    // } catch (error) {
    //   await ctx.render("500", { error });
    // }
  },
};
