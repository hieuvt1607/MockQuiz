<template>
    <v-app>
        <app-bar v-model="expandOnHover" />

        <drawer :expand-on-hover.sync="expandOnHover" />

        <main-layout-body />
    </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import Drawer from './components/Drawer.vue';
import MainLayoutBody from './components/MainLayoutBody.vue';

export default {
    name: 'MainLayout',

    components: {
        AppBar,
        Drawer,
        MainLayoutBody,
    },

    data: () => ({
        expandOnHover: false,
    }),
};
</script>
