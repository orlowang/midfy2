
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let _ = require('lodash');

module.exports = (option) => ({
    entry: option.entry,
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: option.output.path
    },
    module: option.module,
    resolve: option.resolve,
    plugins: option.plugins
    
});