const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [ {
            test: /\.m?js$/, /* expresion regular */
            exclude: /node_modules/, /* indicandole que no use esa informacion */
            use: {
                loader: 'babel-loader'
            }
        }
        ]
    },
}