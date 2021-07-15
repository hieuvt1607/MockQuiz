const TOKEN_KEY = 'access_token';
const TOKEN_EXPIRED_AT_KEY = 'access_token_expired_at';
const TOKEN_REFRESH_KEY = 'refresh_token';
const TOKEN_REFRESH_EXPIRED_AT_KEY = 'refresh_token_expired_at';
const USER_KEY = 'user';
const LANG_KEY = 'lang';

/**
 * Manage the how Access Tokens are being stored and received from localStorage.
 *
 * Current implementation stores to localStorage. localStorage should always be
 * accessed through this instance.
 * */
const TokenService = {
    getKeys() {
        return {
            TOKEN_KEY,
            TOKEN_EXPIRED_AT_KEY,
            TOKEN_REFRESH_KEY,
            TOKEN_REFRESH_EXPIRED_AT_KEY,
            USER_KEY,
            LANG_KEY,
        };
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getExpiredAt() {
        return localStorage.getItem(TOKEN_EXPIRED_AT_KEY);
    },

    setExpiredAt(expiredAt) {
        localStorage.setItem(TOKEN_EXPIRED_AT_KEY, expiredAt);
    },

    removeExpiredAt() {
        localStorage.removeItem(TOKEN_EXPIRED_AT_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(TOKEN_REFRESH_KEY);
    },

    setRefreshToken(refreshToken) {
        localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(TOKEN_REFRESH_KEY);
    },

    getRefreshTokenExpiredAt() {
        return localStorage.getItem(TOKEN_REFRESH_EXPIRED_AT_KEY);
    },

    setRefreshTokenExpiredAt(expiredAt) {
        localStorage.setItem(TOKEN_REFRESH_EXPIRED_AT_KEY, expiredAt);
    },

    removeRefreshTokenExpiredAt() {
        localStorage.removeItem(TOKEN_REFRESH_EXPIRED_AT_KEY);
    },

    getLang() {
        return localStorage.getItem(LANG_KEY);
    },

    setLang(lang) {
        localStorage.setItem(LANG_KEY, lang);
    },
    getUser() {
        if (localStorage.getItem(USER_KEY)) return JSON.parse(localStorage.getItem(USER_KEY));
        return {};
    },
    setUser(user = {}) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    removeUser() {
        localStorage.removeItem(USER_KEY);
    },

    getHeader() {
        return {
            Authorization: `Bearer ${this.getToken()}`,
            'Accept-Language': this.getLang() || 'ja',
        };
    },
};

export default TokenService;
