import { PrismAppBase } from "@uxland/uxl-prism";
import { locales } from "./locales";
import { TPBootstrapper } from "./bootstrapper";
import { TPUserInfo } from "./domain";

export class TPAppBase extends PrismAppBase {
  constructor() {
    super();
    this.options = {
      ...this.options,
      language: "ca",
      locales: locales,
      fetchUser: () => this.doFetchUser() as any,
    };
  }

  protected initApp(): Promise<any> {
    return new TPBootstrapper(this.options).run();
  }

  private doFetchUser(): Promise<TPUserInfo> {
    return Promise.resolve({
      name: "dummy",
      modules: [
        {
          folder: "calculator",
          moduleId: "calculator",
          type: "local",
        },
      ],
    });
  }
}
