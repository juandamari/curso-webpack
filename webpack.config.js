const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//agregando el plugin webpack con html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//agregando el plugin de css mini

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
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl/i, //expresión regular 
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'], //el "use" se puede usar con un objeto {} o un arreglo []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }), //es configuracion del plugin de html
        new MiniCssExtractPlugin(),    
    ]
}
