import {
  css,
  CSSResult,
  customElement,
  html,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import { TPAppBase } from "@tp/core";
import "@uxland/uxl-content-switcher";
import "./views/login";
import "./views/shell";
import styles from "./styles.scss";

@customElement("tp-app")
export default class TPApp extends TPAppBase {
  render(): TemplateResult {
    return html`<uxl-content-switcher
      id="pages"
      attrForSelected="name"
      selected="${this.currentView}"
    >
      <tp-login name="login"></tp-login>
      <tp-shell name="shell"></tp-shell>
    </uxl-content-switcher>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }
}
