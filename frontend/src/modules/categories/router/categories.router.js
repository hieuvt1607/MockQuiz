import MainLayout from '../../../layouts/MainLayout.vue';

export default {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '/categories/list',
            name: 'CategoryListPage',
            component: () => import('../pages/CategoryListPage.vue'),
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
