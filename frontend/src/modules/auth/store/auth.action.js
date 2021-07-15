import { authMutations } from '../constants';
import authService from '../services/index';
import TokenService from '../../../helpers/token';

const authAction = {
    async login(_context, loginBody) {
        let success = false;
        try {
            const result = await authService.login(loginBody.username, loginBody.password);
            if (result) {
                // set value to localStorage
                TokenService.setUser(result.profile);
                TokenService.setToken(result.accessToken);
                TokenService.setExpiredAt(result.expiredAt);
                TokenService.setRefreshToken(result.refreshToken);
                TokenService.setRefreshTokenExpiredAt(result.refreshTokenExpriedAt);
                success = true;
                _context.commit(authMutations.SET_LOGIN_RESULT, {
                    loginSuccess: true,
                    loginErrorMessage: '',
                    user: result.profile,
                });
            }
        } catch (error) {
            console.log(error);
        }
        return success;
    },

    async logout(context) {
        let success = false;
        try {
            const { data } = await authService.logout();
            if (data.data === 1) {
                // success then remove token
                context.commit(authMutations.LOGOUT);
                // remove from localStorage
                TokenService.removeToken();
                TokenService.removeExpiredAt();
                TokenService.removeRefreshToken();
                TokenService.removeRefreshTokenExpiredAt();
                TokenService.removeUser();
                success = true;
            } else {
                success = false;
            }
        } catch (error) {
            console.log(error);
        }
        return success;
    },
};
export default authAction;
