<template>
    <div class="text-center mt-4 mb-4 no-result">
        <span>{{ $t(title) }}</span>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'common.message.noResult',
        },
    },
};
</script>
