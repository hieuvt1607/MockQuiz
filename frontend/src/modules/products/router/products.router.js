import MainLayout from '../../../layouts/MainLayout.vue';

export default {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '/products/list',
            name: 'ProductListPage',
            component: () => import('../pages/ProductListPage.vue'),
            meta: {
                requiresAuth: true,
                breadcrumb: [
                    {
                        title: 'products.product.breadcrumb.title',
                    },
                ],
            },
        },
    ],
};
