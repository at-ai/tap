import { UserInfo } from "@uxland/uxl-prism";
import { ViewDefinition as CoreViewDefinition } from "@uxland/uxl-regions";
export interface TPUserInfo
  extends UserInfo,
    firebase.default.auth.AdditionalUserInfo {
  token: string;
}

export interface ViewDefinition extends CoreViewDefinition {
  route?: string;
}

export interface RegisteredViews {
  region: string;
  key: string;
  view: ViewDefinition;
}
