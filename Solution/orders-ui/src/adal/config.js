import { AuthenticationContext, adalFetch, withAdalLogin } from "react-adal";

export const adalConfig = {
  // tenant: "e4a69758-a370-4712-98ae-826314c8c686",
  clientId: "c386fc0f-93f3-40ba-b15b-a02b79896714",
  tenant: "common",
  endpoints: {
    api: "https://ordersgrapi.azurewebsites.net/v1"
    // api: "https://localhost:44360/v1"
  },

  cacheLocation: "localStorage"
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
