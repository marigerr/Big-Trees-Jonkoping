const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: "cheap-eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname),
        watchOptions: { poll: true },
        compress: true,
        port: 8080
    },
});
