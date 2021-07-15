import axios from 'axios';
import moment from 'moment';
import TokenService from '../helpers/token';

const baseUrl = 'http://localhost:3000/';
const options = {
    baseURL: baseUrl,
    headers: {},
};

if (TokenService.getToken() !== null) {
    options.headers = TokenService.getHeader();
}

async function logout() {
    const { data: res } = await axios.post(
        `${baseUrl}api/logout`, {
        refreshToken: TokenService.getRefreshToken(),
        loginUser: TokenService.getUser(),
    },
);
    // delete refresh token success in database
    if (res.data) {
        TokenService.removeToken();
        TokenService.removeExpiredAt();
        TokenService.removeRefreshToken();
        TokenService.removeRefreshTokenExpiredAt();
        TokenService.removeUser();
        window.location.href = '/login';
    }
}

const axiosInstance = axios.create(options);
axiosInstance.interceptors.request.use(async (request) => {
    // check refresh token, if expried , remove token in database and delete localstorage
    if (TokenService.getRefreshToken() && moment.now() > TokenService.getRefreshTokenExpiredAt()) {
        await logout();
    }
    if (TokenService.getExpiredAt() && moment.now() > TokenService.getExpiredAt()) {
        const { data: res } = await axios.post(
            `${baseUrl}api/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${TokenService.getRefreshToken()}`,
            },
        },
        );
        if (res.code === 200) {
            TokenService.setUser(res.data?.profile);
            TokenService.setToken(res.data?.accessToken?.token);
            TokenService.setExpiredAt(res.data?.accessToken?.expiredAt);
            TokenService.setRefreshToken(res.data?.refreshToken?.token);
            TokenService.setRefreshTokenExpiredAt(res.data?.refreshToken?.expiredAt);
        } else {
            await logout();
        }
    }
    if (TokenService.getToken() !== null) {
        request.headers = { ...request.headers };
        request.headers.Authorization = `Bearer ${TokenService.getToken()}`;
    }
    return request;
});

axiosInstance.interceptors.response.use((response) => response);

export default axiosInstance;
