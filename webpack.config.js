const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/part1.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/part2.html'
        })
    ]
}