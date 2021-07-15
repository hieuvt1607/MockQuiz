<template>
    <span class="outline-label" :class="{ [type]: type }">
        {{ message }}
    </span>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'outline-primary',
        },
    },
};
</script>

<style lang="scss" scoped>
.outline-label {
    font-size: 0.8125rem;
    padding: 0.5rem 1rem;
    border-radius: 0.1875rem;
}
.outline-primary {
}
.outline-danger {
}
.outline-warning {
}
.outline-secondary {
}
</style>
