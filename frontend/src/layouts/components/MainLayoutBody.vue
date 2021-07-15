<template>
    <v-main>
        <router-view />
    </v-main>
</template>

<script>
export default {
    name: 'MainLayoutBody',
    components: {},
};
</script>

<style scoped lang="scss">
::v-deep.v-main {
    background-color: #eeeeee;
    .v-main__wrap > .container {
        max-height: calc(100vh - 64px);
        overflow-y: auto;
        padding-top: 0;
    }
}
</style>
