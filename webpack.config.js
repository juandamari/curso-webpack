const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//agregando el plugin webpack con html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//agregando el plugin de css mini
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
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
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },

            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "./assets/fonts/",
                        esModule: false,
                    },
                }
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
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }
            ]
        })
    ]
}
