export default (app) => {
  return (ctx, next) => {
    console.log("this is two");
    return next();
  };
};
