import MainLayout from '../../../layouts/MainLayout.vue';
import UserListPage from '../pages/UserListPage.vue';

export default {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '/user/list',
            name: 'UserListPage',
            component: UserListPage,
            meta: {
                requiresAuth: true,
                breadcrumb: [
                    {
                        title: 'user.userList.breadcrumb.title',
                    },
                ],
            },
        },
    ],
};
