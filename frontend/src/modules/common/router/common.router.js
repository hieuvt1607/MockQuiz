import AuthLayout from '../../../layouts/AuthLayout.vue';

export default {
    path: '/',
    component: AuthLayout,
    children: [
        {
            path: '/error/404',
            name: 'Error404Page',
            component: () => import('../pages/Error404Page.vue'),
            meta: {
                public: true,
            },
        },
        {
            path: '/error/403',
            name: 'Error403Page',
            component: () => import('../pages/Error403Page.vue'),
            meta: {
                public: true,
            },
        },
        {
            path: '/error',
            name: 'ErrorPage',
            // lazy load
            component: () => import('../pages/ErrorPage.vue'),
            meta: {
                public: true,
            },
        },
    ],
};
