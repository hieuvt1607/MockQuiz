const mutations = {
    SET_LOGIN_RESULT(state, { loginSuccess, loginErrorMessage, user }) {
        state.loginSuccess = loginSuccess;
        state.loginErrorMessage = loginErrorMessage;
        state.user = user;
    },
    LOGOUT(state) {
        state.loginSuccess = false;
        state.loginErrorMessage = '';
        state.user = {};
    },
};

export default mutations;
