module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "@/sass/variables.scss";',
            },
        },
    },
};
