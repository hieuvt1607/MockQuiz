import { authenticate, REFRESH_TYPE } from '../../middleware/auth';
import {
    login, logout, getProfile, updateProfile, changePassword, refreshToken,
} from './authController';
import {
    loginValidator, logoutValidator, profileValidator, passwordValidator,
} from './authValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.post('/login', loginValidator, login);
    router.post('/logout', logoutValidator, logout);
    router.post('/refresh-token', authenticate(REFRESH_TYPE), refreshToken);
    router.get('/profile', authenticate(), getProfile);
    router.post('/profile', authenticate(), profileValidator, updateProfile);
    router.post('/profile/change-password', authenticate(), passwordValidator, changePassword);
    app.use('/api', router);
};
