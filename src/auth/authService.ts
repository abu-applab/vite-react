import { NAS_OIDC_CONFIG } from "./nasConfig";
import { v4 as uuidv4 } from "uuid";

export function loginWithNAS() {
  sessionStorage.clear();

  const language = localStorage.getItem("lang") || "en";
  const state = uuidv4();

  sessionStorage.setItem("nas_state", state);

  const url =
    `${NAS_OIDC_CONFIG.authorizationEndpoint}?` +
    `client_id=${NAS_OIDC_CONFIG.clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(NAS_OIDC_CONFIG.redirectUri)}` +
    `&scope=${NAS_OIDC_CONFIG.scope}` +
    `&state=${state}` +
    `&ui_locales=${language}` +
    `&prompt=login`;

  window.location.href = url;
}


export function logout() {
  const language = localStorage.getItem("MSDFLang") || "en";
  const idTokenHint = localStorage.getItem("idTokenHint") || "";

  sessionStorage.clear();
  localStorage.removeItem("MSDFToken");
  localStorage.removeItem("idTokenHint");

  const url =
    `${NAS_OIDC_CONFIG.endSessionEndpoint}?` +
    `post_logout_redirect_uri=${encodeURIComponent(
      NAS_OIDC_CONFIG.postLogoutRedirectUri
    )}` +
    `&id_token_hint=${encodeURIComponent(idTokenHint)}` +
    `&ui_locales=${language}`;

  window.location.href = url;
};
