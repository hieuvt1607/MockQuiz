import { authenticate } from '../../middleware/auth';
import {
    getRandomQuestions, getScoreBoard, create, updateQuestion, deleteQuestion, searchCategories , handleExam
} from './questionsController';
import { paginationValidator, createQuestionValidator, updateQuestionValidator , deleteQuestionValidator } from './questionsValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/get-questions', authenticate(), getRandomQuestions);
    router.get('/get-score-board', authenticate(), getScoreBoard);
    // router.get('/search-categories', authenticate(), searchCategories);
    router.post('/create-new-question', authenticate(), createQuestionValidator, create);
    router.post('/handle-exam', authenticate(), handleExam);
    router.put('/update-question', authenticate(), updateQuestionValidator, updateQuestion);
    router.get('/delete-question/:id', authenticate(),deleteQuestionValidator, deleteQuestion)
    // router.post('/refresh-token', (req, res, next) => { req.authorization_type = 'refresh'; next(); }, authenticate, refreshToken);
    // router.get('/profile', authenticate(), getProfile);
    // router.post('/profile', authenticate(), profileValidator, updateProfile);
    // router.post('/profile/change-password', authenticate(), passwordValidator, changePassword);
    app.use('/api/questions', router);
};
