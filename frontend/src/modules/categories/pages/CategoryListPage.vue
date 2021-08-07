<template>
    <div>
        <v-container fluid tag="section" class="mx-5" />
        <CategoryTable />
    </div>
</template>

<script>
import CategoryTable from '../components/CategoryTable.vue';

export default {
    name: 'CategoryListPage',

    components: {
        CategoryTable,
    },
};
</script>

<style scoped></style>
