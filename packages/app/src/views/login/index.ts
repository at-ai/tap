import { TP } from "@tp/core";
import { locale, login } from "@uxland/uxl-prism";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import "@vaadin/vaadin-button";
import styles from "./styles.scss";

@customElement(`${TP}-login`)
export class Login extends locale(LitElement) {
  render(): TemplateResult {
    return html`<div class="login">
      <vaadin-button @click=${this.doLogin.bind(this)}> LOGIN </vaadin-button>
    </div>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  private async doLogin() {
    await login(undefined, undefined);
  }
}
