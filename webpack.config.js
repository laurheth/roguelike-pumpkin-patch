const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

// src and dist directories
const src='src';
const dist='dist';
const assets='assets';

// App title
const title='Webpack/TS/Sass Boilerplate';
const shortName = title;
const description = title;

module.exports = {
    // Entrypoint in ./src/scripts/index.ts
    entry: `./${src}/index.ts`,
    devtool: 'inline-source-map',
    module: {
        rules: [
            // Use ts-loader for TypeScript
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // Load SCSS
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer using dart-sass over node-sass
                            implementation: require('sass'),
                        }
                    }
                ]
            },
        ],
    },
    // Recognize both .ts and .js extensions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    // Where to put the output
    output: {
        filename: 'roguelike-pumpkin-patch.js',
        path: path.resolve(__dirname, dist),
        // publicPath: path.resolve(__dirname,dist)
    },
    plugins: [
        // Cleanup the dist directory
        new CleanWebpackPlugin(),
        // Plugin to extract css into external files
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};