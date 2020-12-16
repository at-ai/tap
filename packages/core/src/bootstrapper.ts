import { Bootstrapper, ModuleInfo, ModulePostFn } from "@uxland/uxl-prism";

const modules = {
  calculator: (): Promise<unknown> => import("@tp/calculator"),
};

const toCamelCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace(/-/g, "");

export class TPBootstrapper extends Bootstrapper {
  protected moduleLoader(
    postFn: ModulePostFn,
    appsBaseRout: string
  ): (moduleInfo: ModuleInfo) => Promise<any> {
    return async function (moduleInfo: ModuleInfo): Promise<any> {
      try {
        const importer = modules[toCamelCase(moduleInfo.folder)];
        const module = await importer();
        return postFn(moduleInfo)(module);
      } catch (error) {
        console.log(error);
      }
    };
  }
}
