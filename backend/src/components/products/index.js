import { authenticate } from '../../middleware/auth';
import { create, getProductList, updateProduct, deleteProduct , searchProduct } from './productController';
import { paginationValidator, createProductValidator, updateProductValidator, deleteProductValidator } from './productValidator'

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/get-products', authenticate(), paginationValidator, getProductList);
    router.get('/search-products', authenticate() , searchProduct);
    router.post('/create-new-product', authenticate(), createProductValidator, create);
    router.put('/update-product', authenticate(), updateProductValidator, updateProduct);
    router.get('/delete-product/:id', authenticate(), deleteProductValidator, deleteProduct)
    app.use('/api/products', router);
};
