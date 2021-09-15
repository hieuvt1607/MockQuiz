import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import { respondWithError, logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { checkIfCategoryExist , createNewQuestion } from './questionsService'
const { Op } = require("sequelize");
const { Sequelize } = require('sequelize');
const models = require('../../models');


export async function getRandomQuestions(req, res) {
    try {
        const listOfCate = await models.Questions.findAll({
            order: Sequelize.literal('rand()')
            ,
            limit: 15
        })

        return res.json(respondSuccess({
            listOfCate
        }));
    } catch (error) {
        return logSystemError(res, error, 'categoryController - getCateList');
    }
}

export async function create(req, res) {
    try {
        const { question, correctAnswer, answer1, answer2, answer3, answer4 } = req.body
        const { loginUser = {} } = req
        if (loginUser.role !== 'admin') {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'You do not have permission to perform this operation!'));
        }
        if (correctAnswer !== answer1 && correctAnswer !== answer2 && correctAnswer !== answer3 && correctAnswer !== answer4) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Correct answer must be one of answer!'));
        }
        const result = await createNewQuestion({
            question,
            correctAnswer,
            answer1,
            answer2,
            answer3,
            answer4,
            createdBy: loginUser.id
        })
        return res.json(respondSuccess({ result }));
    } catch (error) {
        return logSystemError(res, error, 'questionController - create');
    }
}

export async function handleExam(req, res) {
    try {
        const answers = req.body
        const { loginUser = {} } = req
        let numOfRightAnswer = 0
        answers.map(item => {
            if (item.correctAnswer === item.answerChoosen) {
                numOfRightAnswer = numOfRightAnswer + 1
            }
        })
        const examResult = Math.round(numOfRightAnswer / answers.length * 100)

        await models.ScoreBoard.create({
            score: examResult,
            userId: loginUser.id,
            createdBy: loginUser.id
        })
        return res.json(respondSuccess({ examResult }));
    } catch (error) {
        return logSystemError(res, error, 'questionController - handleExam');
    }
}

export async function getScoreBoard(req, res) {
    try {
        const listOfCate = await models.ScoreBoard.findAll({
            order: [
                ['score', 'ASC'],
            ],
            limit: 5
        })

        return res.json(respondSuccess({
            listOfCate
        }));
    } catch (error) {
        return logSystemError(res, error, 'questionController - getCateList');
    }
}

export async function updateQuestion(req, res) {
    try {
        const { id, question, correctAnswer, answer1, answer2, answer3, answer4 } = req.body
        const { loginUser = {} } = req
        if (loginUser.role !== 'admin') {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'You do not have permission to perform this operation!'));
        }
        if (correctAnswer !== answer1 && correctAnswer !== answer2 && correctAnswer !== answer3 && correctAnswer !== answer4) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Correct answer must be one of answer!'));
        }
        const result = await models.Questions.update({
            questions: question,
            correctAnswer,
            answer1,
            answer2,
            answer3,
            answer4,
            createdBy: loginUser.id
        }, {
            where: {
                id
            }
        })
        if (result == 0) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Question is not exist!'));
        }
        return res.json(respondSuccess({}));

    } catch (error) {
        return logSystemError(res, error, 'questionController - updateQuestion');
    }
}

export async function deleteQuestion(req, res) {
    try {
        if (req.loginUser?.role !== 'admin') {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'You do not have permission to perform this operation!'));
        }
        const { id } = req.params
        const question = await models.Questions.findOne({
            where: { id }
        })
        if (!question) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Question is not exist!'));
        }
        const result = await question.destroy()
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return logSystemError(res, error, 'questionController - deleteQuestion');
    }
}

