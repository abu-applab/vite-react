
const clientId = import.meta.env.VITE_CLIENT_ID
const tenantId = import.meta.env.VITE_TENANT_ID


export const msalConfig = {
    auth: {
        clientId: clientId, // Replace with your Azure AD App Client ID
        authority: `https://login.microsoftonline.com/${tenantId}`, // Replace with your Tenant ID
        // redirectUri: `/`,
        redirectUri: `${document.location.origin}`,
    },
    cache: {
        cacheLocation: "localStorage", // or "localStorage" | "sessionStorage"
        storeAuthStateInCookie: false, // Recommended for IE11
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};
