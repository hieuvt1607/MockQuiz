import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import { respondWithError, logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { checkIfProductExist } from './productService'
import { checkIfCategoryExist } from '../categories/categoryService'
const { Op } = require("sequelize");
const models = require('../../models');

export async function searchProduct(req, res) {
    try {
        const { keywords, categoryId, sortBy, sortTypes, limit, offset } = req.query
        const categoryIdNumber = parseInt(categoryId)
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)
        const sortByConditions = []
        if (sortBy === 'Category.categoryName') {
            sortByConditions.push([{ model: 'Category' }, sortBy, sortTypes])
        }
        else {
            sortByConditions.push([sortBy, sortTypes])
        }
        const listOfProduct = await models.Products.findAndCountAll({
            include: [{ model: models.Categories }],
            where: {
                // productName: { [Op.like]: '%' + keywords + '%' }
                [Op.and]: [{ productName: { [Op.like]: '%' + keywords + '%' } }, { categoryId: categoryIdNumber }]
            },
            order: [
                sortByConditions,
            ],
            limit: limitNumber,
            offset: offsetNumber,
        })

        return res.json(respondSuccess({
            listOfProduct
        }));
    } catch (error) {
        return logSystemError(res, error, 'productController - searchProduct');
    }
}

export async function getProductList(req, res) {
    try {
        const { offset, limit, sortBy, sortTypes } = req.query
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)
        // const offset = (parseInt(page) - 1) * limit
        const sortByConditions = []
        if (sortBy === 'Category.categoryName') {
            sortByConditions.push([{ model: 'Category' }, sortBy, sortTypes])
        }
        else {
            sortByConditions.push([sortBy, sortTypes])
        }
        const listOfProduct = await models.Products.findAndCountAll({
            limit: limitNumber,
            offset: offsetNumber,
            include: [{ model: models.Categories }],
            order: [
                sortByConditions,
            ],
            // where: {
            //     [Op.or]: [{ productName: { [Op.like]: '%' + keywords + '%' } }, { 'Category.categoryName': { [Op.like]: '%' + keywords + '%' } }]

            // }
        })

        return res.json(respondSuccess({
            listOfProduct
        }));
    } catch (error) {
        return logSystemError(res, error, 'productController - getProductList');
    }
}


export async function create(req, res) {
    try {
        const { categoryId, productName } = req.body
        const { loginUser = {} } = req
        return console.log(req.body);
        const isCategoryExist = await checkIfCategoryExist(categoryId)
        const isProductExist = await checkIfProductExist(productName)
        if (!isCategoryExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Category is not exist!'));
        }
        if (isProductExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Product already exist!'));
        }
        const product = await models.Products.create({
            categoryId,
            productName,
            createdBy: loginUser.id
        })
        return res.json(respondSuccess({ product }));
    } catch (error) {
        return logSystemError(res, error, 'productController - create');
    }
}

export async function updateProduct(req, res) {
    try {
        const { id, categoryId, productName } = req.body
        const { loginUser = {} } = req
        const isCategoryExist = await checkIfCategoryExist(categoryId)
        const isProductExist = await checkIfProductExist(productName)
        if (!isCategoryExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Category is not exist!'));
        }
        if (isProductExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Product already exist!'));
        }
        const result = await models.Products.update({
            categoryId,
            productName,
            createdBy: loginUser.id
        }, {
            where: {
                id
            }
        })

        if (result == 0) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Product is not exist!'));
        }
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return logSystemError(res, error, 'productController - updateProduct');
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const product = await models.Products.findOne({
            where: { id }
        })
        if (!product) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'Product is not exist!'));
        }
        const result = await product.destroy()
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return logSystemError(res, error, 'productController - deleteProduct');
    }
}


export async function image(req, res) {
    try {
        const a = req.body
        return res.json(respondSuccess({ a }));

    } catch (error) {
        return logSystemError(res, error, 'productController - deleteProduct');
    }
}
