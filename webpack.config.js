
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = {
    entry: './src/client/index.tsx',
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js',
    },
    devServer: {
        contentBase: BUILD_DIR
        //   port: 9001,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    },
    module: {
        loaders: [
            {
                test: /.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react', 'env',]
                    }
                }
            },
            {
                test: /.scss$/,
                loader: ExtractTextPlugin.extract(({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { alias: { '../img': '../../public/img' } }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }))
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        // loader: 'url-loader'
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            publicPath: './',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './public/index.html'
            }
        ),
        new CopyWebpackPlugin([
            { from: './public/img', to: 'img' }
        ],
            { copyUnmodified: false }
        )
    ]
}

module.exports = webpack;