const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/include.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'include.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html/,
            }
        ]
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            template: './src/index.html'
        }),*/
        new CopyWebpackPlugin([
            {
                from: './src/*.html',
                to: '[name].[ext]'
            }
        ])
    ]
}