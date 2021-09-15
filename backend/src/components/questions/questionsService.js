import { logger } from '../../helpers/logger';
const models = require('../../models');
const { Op } = require("sequelize");



export async function checkIfCategoryExist(val) {
    try {
        const categoryData = await models.Categories.findOne({
            where: {
                [Op.or]: [{ id: val }, { categoryName: val }]
            },
        });
        return categoryData;
    } catch (e) {
        logger.error(`Error in checkIfCategoryExist ${e.message}`);
        throw e;
    }
}

export async function createNewQuestion(question) {
    try {
        const newQuestion = await models.Questions.create({
            questions: question.question,
            correctAnswer: question.correctAnswer,
            answer1: question.answer1,
            answer2: question.answer2,
            answer3: question.answer3,
            answer4: question.answer4,
            createdBy: question.createdBy
        })
        return newQuestion;
    } catch (e) {
        logger.error(`Error in checkIfCategoryExist ${e.message}`);
        throw e;
    }
}