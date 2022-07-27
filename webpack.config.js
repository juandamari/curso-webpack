const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//agregando el plugin webpack con html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//agregando el plugin de css mini
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cssMinimazerplugin = require('css-minimizer-webpack-plugin');//comprimir archivos css
const terserPlugin = require('terser-webpack-plugin');//comprimir archivos js
const dontenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //tener cuidado con el nombre para que el plugin funcione 

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js'],
        alias: { //para darle una mejor ubicaciòn a los archivos con import, identificar cuales son las que necesitan esta funcion
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }//cuando webpack lo prepare, va identificar las rutas1º
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
                test: /\.(woff|woff2)$/, //revisar porque el font no esta cargando
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }), //es configuracion del plugin de html
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }
            ]
        }),
        new dontenv(),
        new CleanWebpackPlugin(), 
    ],
    optimization: { //se agrega otro paquete donde son plugins de optimizaciòn
        minimize: true,
        minimizer: [
            new cssMinimazerplugin(),
            new terserPlugin(),
        ]
    }
}
