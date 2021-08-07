import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import { respondWithError, logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { checkIfCategoryExist } from './categoryService'
const { Op } = require("sequelize");
const models = require('../../models');



export async function searchCategories(req, res) {
    try {
        const { keywords, sortBy, sortTypes, limit, offset } = req.query
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)
        const listOfCate = await models.Categories.findAndCountAll({
            where: {
                categoryName: { [Op.like]: '%' + keywords + '%' }
            },
            order: [
                [sortBy, sortTypes]
            ],
            limit: limitNumber,
            offset: offsetNumber,
        })

        return res.json(respondSuccess({
            listOfCate
        }));
    } catch (error) {
        return logSystemError(res, error, 'categoryController - searchCategories');
    }
}

export async function getAllCate(req, res) {
    try {

        const listOfCate = await models.Categories.findAll()

        return res.json(respondSuccess({
            listOfCate
        }));
    } catch (error) {
        return logSystemError(res, error, 'categoryController - getCateList');
    }
}

export async function getCateList(req, res) {
    try {
        const { offset, limit, sortBy, sortTypes } = req.query
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)

        const listOfCate = await models.Categories.findAndCountAll({
            limit: limitNumber,
            offset: offsetNumber,
            order: [
                [sortBy, sortTypes]
            ],
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
        const { categoryName } = req.body
        const { loginUser = {} } = req
        const isCategoryExist = await checkIfCategoryExist(categoryName)
        if (isCategoryExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Category already Exist!'));
        }
        const category = await models.Categories.create({
            categoryName,
            createdBy: loginUser.id
        })
        return res.json(respondSuccess({ category }));
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
        return res.json(respondSuccess({ result }));

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
        const result = await category.destroy()
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return logSystemError(res, error, 'categoryController - deleteCategory');
    }
}

