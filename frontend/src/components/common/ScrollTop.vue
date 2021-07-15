<template>
    <v-btn
        v-show="show"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
    >
            <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
</template>
<script>
export default {
    props: {
        targetRef: {
            type: HTMLElement,
            default: null,
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toTop() {
            this.$vuetify.goTo(0, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
                container: this.targetRef,
            });
        },
    },
};
</script>
