const authApiRouter = require('../components/auth');
const userApiRouter = require('../components/users');
const questionsApiRouter = require('../components/questions');

const routerManager = (app) => {
    authApiRouter(app);
    userApiRouter(app);
    questionsApiRouter(app);
};

module.exports = routerManager;
