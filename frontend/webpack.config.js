import VueLoaderPlugin from 'vue-loader/lib/plugin';

export const module = {
    rules: [
        {
            test: /\.vue$/,
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1 },
                },
                'postcss-loader',
            ],
        },

        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            ],
        },
    ],
};
export const plugins = [new VueLoaderPlugin()];
