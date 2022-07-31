const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//agregando el plugin webpack con html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//agregando el plugin de css mini
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dontenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: 'development', //le agrego la configuracion de este archivo y modificado en package.json le cambio la direccion de dev a esta y me dara un nuevo archivo con los codigos mas ordenados para debugear si es necesario algo
    watch: true, //con este esta pendiente de los cambios, sin necesidad de estar en la consola haciendo run
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
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3006,
    },
}
