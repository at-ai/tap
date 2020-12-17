import { logout, mainRegions, navigate, TP, TPUserInfo } from "@tp/core";
import { timeOut } from "@uxland/functional-utilities";
import { watch } from "@uxland/lit-redux-connect";
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
import { shellContentId, shellHeaderId } from "./constants";
import styles from "./styles.scss";
import { userInfoSelector, store, locale } from "@uxland/uxl-prism";
import "@vaadin/vaadin-details";
import "@vaadin/vaadin-item";

@customElement(`${TP}-shell`)
export class Shell extends locale(RegionHost(LitElement)) {
  @routerRegion({
    name: mainRegions.shellHeader,
    targetId: shellHeaderId,
    route: "",
  })
  shellHeader: IRegion;

  @routerRegion({
    name: mainRegions.shellContent,
    targetId: shellContentId,
    route: "",
  })
  shellContent: IRegion;

  connectedCallback(): void {
    super.connectedCallback();
    // NOTE: this workaround is temporal only for unique module
    timeOut.run(() => {
      if (document.location.pathname.indexOf("calculator") == -1)
        navigate(`/calculator`);
    }, 10);
  }

  @watch(userInfoSelector, { store })
  userInfo: TPUserInfo;

  render(): TemplateResult {
    return html`<div class="header">
        <uxl-content-switcher
          id=${shellHeaderId}
          router-region
        ></uxl-content-switcher>
        <vaadin-details>
          <div slot="summary">
            <div class="user-info">
              <div class="user-info_name">${this.userInfo?.displayName}</div>
              <img class="user-info_avatar" src=${this.userInfo?.photoURL} />
            </div>
          </div>
          <vaadin-button
            id="selectable"
            tabindex="0"
            @click=${this.logout.bind(this)}
          >
            Logout
          </vaadin-button>
        </vaadin-details>
      </div>
      <uxl-content-switcher
        id=${shellContentId}
        router-region
      ></uxl-content-switcher>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  private async logout() {
    await logout();
  }
}
