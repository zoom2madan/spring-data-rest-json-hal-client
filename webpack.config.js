const path = require('path');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
        ]
    }
};