import { logger } from '../../helpers/logger';
const models = require('../../models');


export async function checkIfProductExist(productName, categoryId) {
    try {
        const productData = await models.Products.findOne({
            attributes: ['productName'],
            where: {
                productName
            },
        });
        return productData;
    } catch (e) {
        logger.error(`Error in checkIfProductExist ${e.message}`);
        throw e;
    }
}