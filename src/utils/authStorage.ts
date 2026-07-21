const AUTH_TOKEN_KEY = "admin_auth_token";

export const getAuthToken = () => sessionStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token: string) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};
