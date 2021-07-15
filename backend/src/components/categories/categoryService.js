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