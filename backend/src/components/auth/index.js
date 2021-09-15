import { authenticate, REFRESH_TYPE } from '../../middleware/auth';
import {
    login, signup, logout, getProfile, updateProfile, changePassword, refreshToken, disableAccount
} from './authController';
import {
    loginValidator, logoutValidator, profileValidator, passwordValidator, disableAccountValidator
} from './authValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.post('/login', loginValidator, login);
    router.post('/logout', logoutValidator, logout);
    router.post('/signup', loginValidator, signup);
    router.get('/disable-account/:id', authenticate(), disableAccountValidator, disableAccount);
    router.post('/refresh-token', authenticate(REFRESH_TYPE), refreshToken);
    router.get('/profile', authenticate(), getProfile);
    router.post('/profile', authenticate(), profileValidator, updateProfile);
    router.post('/profile/change-password', authenticate(), passwordValidator, changePassword);
    app.use('/api', router);
};
