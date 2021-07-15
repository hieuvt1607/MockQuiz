import moment from 'moment';
import TokenService from '../../../helpers/token';
import axios from '../../../plugins/axios';

const login = async (username, password) => {
    const res = await axios.post('/api/login', { email: username, password });
    if (res) {
        const { data } = res.data;
        return {
            email: data.profile.email,
            accessToken: data.accessToken.token,
            expiredAt: data.accessToken.expiredAt,
            refreshToken: data.refreshToken.token,
            refreshTokenExpriedAt: data.refreshToken.expiredAt,
            profile: data.profile,
        };
    }
    return null;
    // if (username === 'admin' && password === 'tt@1234') {
    //     return {
    //         username: 'admin',
    //         token: 'token1234567',
    //         refreshToken: 'token1234567',
    //         expiredAt: moment().add(1, 'hours').unix(),
    //     };
    // }
    // return null;
};

const logout = async () => {
    const res = await axios.post('/api/logout', {
        refreshToken: TokenService.getRefreshToken(),
        loginUser: TokenService.getUser(),
    });
    console.log(res);
    return res;
};

const refreshAccessToken = async (username, refreshToken) => ({
    username,
    token: 'token1234567',
    refreshToken,
    expiredAt: moment().add(1, 'hours').unix(),
});

const authService = {
    login,
    logout,
    refreshAccessToken,
};

export default authService;
