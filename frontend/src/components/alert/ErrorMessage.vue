<template>
    <div class="error--text " :class="{ text: !!text, small: !!small }">
        {{ message }}
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        small: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss" scoped>
.error--text {
    color: red;
    border: 0.0625rem solid red;
    border-radius: 0.25rem;
    padding: 0.5rem;
    animation: fadeIn 0.5s linear;
    animation-iteration-count: 1;
}
.small {
}
.text {
    border: none !important;
    padding: 0 !important;
}
</style>
