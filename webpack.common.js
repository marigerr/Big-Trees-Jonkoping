var path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' });


module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: { app: './app.js' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname)
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, 'src'),
            Map: path.resolve(__dirname, 'src/components/map'),
            Sidebar: path.resolve(__dirname, 'src/components/sidebar'),
            Data: path.resolve(__dirname, 'src/data/'),
            Utilities: path.resolve(__dirname, 'src/utilities/'),
            Stylesheets: path.resolve(__dirname, 'src/stylesheets/')
        }
        // modules: [path.resolve(__dirname, "./src"), "node_modules"]},
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    }
                    , 'css-loader'
                ],
            },
            {
                test: /\.js$/,
                enforce: "pre", // preload the eshint loader before transpile
                exclude: [/node_modules/, /selectCtrl/],
                use: [{
                    loader: "eslint-loader",
                    // options: { emitErrors: false, failOnHint: false, esversion: 6 }
                }]
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /selectCtrl/],
                use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }],
            },
            // {
            //     test: /\.(woff2?|ttf|eot|jpe?g|png|gif|svg)$/,
            //     use: [{loader: 'file-loader?name=img/[name].[ext]'}] 
            // }                                           
        ]
    }
};
