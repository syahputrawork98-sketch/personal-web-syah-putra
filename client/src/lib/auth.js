// Helper penyimpan token (Catatan F08C.1: belum memvalidasi payload JWT, murni localStorage)
const TOKEN_KEY = 'admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const isLoggedIn = () => !!getToken();
