<template>
    <div>
        <v-container fluid tag="section" class="mx-5" />
        <ProductTable />
    </div>
</template>

<script>
import ProductTable from '../components/ProductTable.vue';

export default {
    name: 'ProductListPage',

    components: {
        ProductTable,
    },
};
</script>

<style scoped></style>
