<template>
    <v-btn :disabled="disabled" @click="click" :color="color">
        <v-icon left dark v-if="icon && iconPosition === 'left'">
            {{ icon }}
        </v-icon>
        <span :style="textStyles">{{ text }}</span>
        <v-icon right class="right" dark v-if="icon && iconPosition === 'right'">
            {{ icon }}
        </v-icon>
    </v-btn>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        iconPosition: {
            type: String,
            default: 'left',
        },
        textStyles: {
            type: Object,
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'success',
        },
    },
    methods: {
        click() {
            this.$emit('click');
        },
    },
};
</script>
<style lang="scss" scoped></style>
