import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

export function paginationValidator(req, res, next) {
    const { offset, limit, sortBy, sortTypes } = req.query
    const offsetNumber = parseInt(offset)
    const limitNumber = parseInt(limit)
    const validSchema = Joi.object().keys({
        offset: Joi.number().integer().required(),
        limit: Joi.number().integer().positive().required(),
        sortBy: Joi.string().max(255).required(),
        sortTypes: Joi.string().max(255).required(),
    });

    const result = Joi.validate({ offset: offsetNumber, limit: limitNumber, sortBy, sortTypes }, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function createCategoryValidator(req, res, next) {
    const { body } = req
    const validSchema = Joi.object().keys({
        categoryName: Joi.string().max(255).required(),
    });
    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function updateProductValidator(req, res, next) {
    const { body } = req
    const validSchema = Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        categoryId: Joi.number().integer().positive().required(),
        productName: Joi.string().max(255).required(),
    });
    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function deleteProductValidator(req, res, next) {
    const { params } = req
    const validSchema = Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    });
    const result = Joi.validate(params, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
