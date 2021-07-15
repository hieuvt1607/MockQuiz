<template>
    <div class="bg-loader noselect" v-if="showLoadingIndicator">
        <div class="wrapper-loader">
            <img src="@/assets/images/loading.gif" draggable="false" class="img-loader">
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        showLoadingIndicator() {
            return this.$store.state.showLoadingIndicator || false;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '@/sass/variables.scss';
.img-loader {
    width: 5rem;
    margin: auto;
}
.bg-loader:before {
    animation: waitThenFadeInForBackdrop 1.2s;
    content: '';
    z-index: map-get($zIndex, loadingOverlay);
    background: #ffffff;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    opacity: 0.3;
}
.wrapper-loader {
    animation: waitThenFadeIn 1.2s;
    width: 5rem;
    height: 5rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    z-index: map-get($zIndex, loadingOverlay);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.625rem;
}
.loader-title {
    color: #fff;
    margin-bottom: 1rem;
}
.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
</style>
