<template>
    <div class="text-center d-flex justify-end">
        <div class="empty-div" />
        <div class="move-start mr-12">
            <v-icon :disabled="activePage === 1" @click="moveToStart" class="v-pagination__item">
                mdi-page-first
            </v-icon>
        </div>
        <v-pagination
            v-model="activePage"
            :length="length"
            :total-visible="totalVisible"
            :style="{ width: calculateWidth() }"
        />
        <div class="move-end ml-12 mr-2">
            <v-icon :disabled="activePage === length" @click="moveToEnd" class="v-pagination__item">
                mdi-page-last
            </v-icon>
        </div>
    </div>
</template>

<script>
import { DEFAULT_TOTAL_VISIBLE_ITEM, WIDTH_ITEM_PAGINATION } from '@/helpers/constants';

export default {
    props: {
        value: {
            type: Number,
            default: 1,
        },
        length: {
            type: Number,
            default: 0,
        },
        totalVisible: {
            type: Number,
            default: DEFAULT_TOTAL_VISIBLE_ITEM,
        },
    },
    methods: {
        moveToStart() {
            this.$emit('input', 1);
        },
        moveToEnd() {
            this.$emit('input', this.length);
        },
        calculateWidth() {
            let countItem = this.totalVisible < this.length ? this.totalVisible : this.length;
            // Add count arrow item (prev, start...)
            countItem += 2;
            return `${(countItem * WIDTH_ITEM_PAGINATION) / 18}rem`;
        },
    },
    computed: {
        activePage: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
<style lang="scss" scoped>
.empty-div {
    width: 12rem;
}
.move-start,
.move-end {
    display: flex;
    align-items: center;
}
</style>
