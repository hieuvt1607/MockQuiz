import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';
import TokenService from '../helpers/token';

// routers
import commonRouters from '../modules/common/router/common.router';
import authRouters from '../modules/auth/router/auth.router';
import userRouters from '../modules/user/router/user.router';
import productRouters from '../modules/products/router/products.router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/products/list',
        name: 'HomePage',
    },
    { path: '*', redirect: '/error/404' },
    commonRouters,
    ...authRouters,
    userRouters,
    productRouters,
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
    linkExactActiveClass: 'nav-item active',
});

router.beforeEach(async (to, from, next) => {
    const isPublic = to?.meta?.public || false;
    const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false;
    const loggedIn = !!TokenService.getToken()
                     && !!TokenService.getExpiredAt()
                     && parseFloat(TokenService.getExpiredAt()) > moment().unix();

    if (isPublic) {
        // Do not allow user to visit entry page if they are logged in
        if (loggedIn && onlyWhenLoggedOut) {
            return next('/');
        }
        return next();
    }
    if (!isPublic && !loggedIn) {
        return next({
            path: '/login',
            // Store the full path to redirect the user to after login
            query: { redirect: to.fullPath },
        });
    }

    // Do not allow user to visit entry page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/');
    }
    return next();
});
export default router;
