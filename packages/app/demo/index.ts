(async () => {
  //@ts-ignore
  (() => import("@webcomponents/webcomponentsjs/webcomponents-loader"))();
  document.addEventListener("WebComponentsReady", async () => {
    console.log("WebComponentsReady");
    console.log(`TP v${process.env.appVersion}`);
    initializeResources();
    const appImporter = (): Promise<{ default: any }> => import("../src/app");
    const TPApp = await appImporter();
    const app = new TPApp.default();
    document.body.appendChild(app as HTMLElement);
  });
})();

const initializeResources = () => {
  const uxlRegions = () => import("@uxland/uxl-regions");
  uxlRegions().then(({ regionAdapterRegistry, selectableAdapterFactory }) => {
    regionAdapterRegistry.registerAdapterFactory(
      "uxl-content-switcher",
      selectableAdapterFactory
    );
  });
  const functionalUtilities = () => import("@uxland/functional-utilities");
  functionalUtilities().then(
    ({ displayLayoutSizing, displayMetaInformation }) => {
      displayLayoutSizing(true);
      displayMetaInformation();
      window.addEventListener("resize", () => displayLayoutSizing(true));
    }
  );
};
