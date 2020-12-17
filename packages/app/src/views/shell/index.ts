import { mainRegions, TP } from "@tp/core";
import { IRegion, RegionHost } from "@uxland/uxl-regions";
import { routerRegion } from "@uxland/uxl-routed-region";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import { shellContentId } from "./constants";
import styles from "./styles.scss";

@customElement(`${TP}-shell`)
export class Shell extends RegionHost(LitElement) {
  @routerRegion({
    name: mainRegions.shellContent,
    targetId: shellContentId,
    route: "",
  })
  shellContent: IRegion;

  render(): TemplateResult {
    return html`<uxl-content-switcher
      id=${shellContentId}
      router-region
    ></uxl-content-switcher>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }
}
