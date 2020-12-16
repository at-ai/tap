import { moduleName } from "./constants";
import { mainRegions, RegisteredViews, viewFactory } from "@tp/core";
import { Calculator } from "./views/shell/content";
import { routes } from "./routes";

export const registeredViews: RegisteredViews[] = [
  {
    region: mainRegions.shellContent,
    key: `${moduleName}-calculator`,
    view: { factory: viewFactory(Calculator), route: routes.main },
  },
];
