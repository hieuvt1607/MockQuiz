import AuthLayout from '../../../layouts/AuthLayout.vue';
import LoginPage from '../pages/LoginPage.vue';

const externalRouters = {
    path: '/',
    component: AuthLayout,
    children: [
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
                onlyWhenLoggedOut: true,
                public: true,
            },
        },
    ],
};

export default [externalRouters];
