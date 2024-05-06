export default (app) => {
  return (ctx, next) => {
    console.log("this is one");
    return next();
  };
};
