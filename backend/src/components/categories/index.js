import { authenticate } from '../../middleware/auth';
import {
    getCateList, getAllCate, create, updateCategory, deleteCategory ,searchCategories
} from './categoryController';
import { paginationValidator , createCategoryValidator } from './categoryValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/get-categories', authenticate(), paginationValidator, getCateList);
    router.get('/get-all-categories', authenticate(), getAllCate);
    router.get('/search-categories', authenticate(), searchCategories);
    router.post('/create-new-category', authenticate(),createCategoryValidator, create);
    router.put('/update-category', authenticate(), updateCategory);
    router.get('/delete-category/:id', authenticate(), deleteCategory)
    // router.post('/refresh-token', (req, res, next) => { req.authorization_type = 'refresh'; next(); }, authenticate, refreshToken);
    // router.get('/profile', authenticate(), getProfile);
    // router.post('/profile', authenticate(), profileValidator, updateProfile);
    // router.post('/profile/change-password', authenticate(), passwordValidator, changePassword);
    app.use('/api/categories', router);
};
