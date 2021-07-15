import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import { respondWithError, logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { checkIfCategoryExist } from './categoryService'
const models = require('../../models');


export async function getCateList(req, res) {
    try {
        const listOfCate = await models.Categories.findAll()
        // if (!listOfCate) {
        //     return res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_USERNAME_OR_PASSWORD));
        // }
        return res.json(respondSuccess({
            listOfCate
        }));
    } catch (error) {
        return logSystemError(res, error, 'categoryController - getCateList');
    }
}

export async function create(req, res) {
    try {
        const { categoryName } = req.body
        const { loginUser = {} } = req
        const isCategoryExist = await checkIfCategoryExist(categoryName)
        if (isCategoryExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Category already Exist!'));
        }
        await models.Categories.create({
            categoryName,
            createdBy: loginUser.id
        })
        return res.json(respondSuccess({}));
    } catch (error) {
        return logSystemError(res, error, 'categoryController - create');
    }
}

export async function updateCategory(req, res) {
    try {
        const { id, categoryName } = req.body
        const { loginUser = {} } = req
        const isCategoryExist = await checkIfCategoryExist(categoryName)
        if (isCategoryExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Category name already exist!'));
        }
        const result = await models.Categories.update({
            categoryName,
            createdBy: loginUser.id
        }, {
            where: {
                id
            }
        })
        if (result == 0) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Category is not exist!'));
        }
        return res.json(respondSuccess({}));

    } catch (error) {
        return logSystemError(res, error, 'categoryController - updateCategory');
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params
        const category = await models.Categories.findOne({
            where: { id }
        })
        if (!category) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Category is not exist!'));
        }
        await category.destroy()
        return res.json(respondSuccess({}));

    } catch (error) {
        return logSystemError(res, error, 'categoryController - deleteCategory');
    }
}

