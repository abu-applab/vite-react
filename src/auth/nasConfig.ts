export const NAS_OIDC_CONFIG = {
    authorizationEndpoint: 'https://www.stgnas.gov.qa/idp/public/oidc/core/authorize',
    endSessionEndpoint: 'https://www.stgnas.gov.qa/idp/public/oidc/core/end_session',
    clientId: 'MANATEQ-INVESTOR-PORTAL-DEV',
    redirectUri: 'https://manateq-investor-portal-dev.manateq.qa/nas-login',
    postLogoutRedirectUri: 'https://manateq-investor-portal-dev.manateq.qa/nas-logout',
    scope: 'openid+profile'
};