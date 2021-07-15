<template>
    <v-app>
        <auth-layout-body />
    </v-app>
</template>

<script>
import AuthLayoutBody from './components/AuthLayoutBody.vue';

export default {
    name: 'AuthLayout',

    components: {
        AuthLayoutBody,
    },

    created() {
        this.$vuetify.theme.dark = true;
    },

    beforeDestroy() {
        this.$vuetify.theme.dark = false;
    },
};
</script>
