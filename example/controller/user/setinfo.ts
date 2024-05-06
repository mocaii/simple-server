export default {
  method: "POST",
  handler: async (ctx) => {
    const sql = `INSERT INTO user (name, age, sex) VALUES ('${ctx.request.body.name}', ${ctx.request.body.age}, '${ctx.request.body.sex}')`;
    ctx.mysql.query(sql, (error, results, fields) => {
      if (error) throw new error();
      console.log(results);
    });
  },
};
