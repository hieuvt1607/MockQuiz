<template>
    <div class="container-breadcrumb">
        <!-- <p v-for="detail in breadcrumb" :key="detail.id">{{detail.title}}</p> -->
        <ul class="d-flex">
            <li v-for="(value, index) in breadcrumb" :key="value.id">
                <router-link
                    class="linkTo"
                    v-if="index != breadcrumb.length - 1"
                    :to="{ path: value.to }"
                >
                    {{ $t(value.title) }}
                </router-link>
                <v-icon v-if="index != breadcrumb.length - 1">
                    mdi-chevron-right
                </v-icon>
                <p class="isActive mb0" v-if="index == breadcrumb.length - 1">
                    {{ $t(value.title) }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        breadcrumb: {
            type: Array,
            default: () => [],
        },
    },
    created() {},
};
</script>

<style lang="scss">
.container-breadcrumb {
    .linkTo {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.87);
        transition: all ease 0.3s;
        font-size: 17px;
        &:hover {
            color: #e91e63;
            transition: all ease 0.3s;
        }
    }
    .isActive {
        margin-bottom: 0;
        font-weight: 500;
        font-size: 17px;
    }
}
</style>
