import lodash from "lodash";
import path from "path";
function customizer(objValue: any, srcValue: any) {
  if (lodash.isObject(objValue)) {
    return srcValue;
  }
}

//深度合并
export const deepMerge = (targe: any, source: any) => {
  const assgin = Object.assign({}, lodash.mergeWith(targe, source, customizer));
  return assgin;
};

export const getHooks = async (hooks: string[]) => {
  const len = hooks.length;
  const result: any[] = [];
  for (let i = 0; i < len; i++) {
    const hook = await import(path.join(__dirname, "../hooks", hooks[i]));
    result.push(hook);
  }
  return result;
};
