import { RegisteredViews } from "@tp/core";
import { ModuleInfo } from "@uxland/uxl-prism";
import { regionManager } from "@uxland/uxl-regions";
import { registeredViews } from "./views";
import "./store";

export const initialize = (mi: ModuleInfo) => {
  console.log("Initialize: ", mi);
  registeredViews.forEach((view: RegisteredViews) => {
    regionManager.registerViewWithRegion(view.region, view.key, view.view);
  });
};

export const dispose = (mi: ModuleInfo) => {
  console.log("Dispose: ", mi);
};
