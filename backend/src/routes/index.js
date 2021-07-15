const authApiRouter = require('../components/auth');
const userApiRouter = require('../components/users');
const categoriesApiRouter = require('../components/categories');
const productsApiRouter = require('../components/products');

const routerManager = (app) => {
    authApiRouter(app);
    userApiRouter(app);
    categoriesApiRouter(app);
    productsApiRouter(app);
};

module.exports = routerManager;
