import { customElement, html, TemplateResult } from "lit-element";
import { TPAppBase } from "@tp/core";
import "@uxland/uxl-content-switcher";
import "./views/shell";

@customElement("tp-app")
export default class TPApp extends TPAppBase {
  render(): TemplateResult {
    return html`<uxl-content-switcher
      id="pages"
      attrForSelected="name"
      selected="${this.currentView}"
    >
      <tp-shell name="shell"></tp-shell>
    </uxl-content-switcher>`;
  }
}
