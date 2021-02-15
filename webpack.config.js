const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

// src and dist directories
const src='src';
const dist='dist';

const targets = [
    {minimize: false, name:"roguelike-pumpkin-patch.js"},
    {minimize: true, name:"roguelike-pumpkin-patch.min.js"}
]

module.exports = targets.map(target=>({
    mode: 'production',
    // Entrypoint in ./src/scripts/index.ts
    entry: `./${src}/index.ts`,
    // devtool: 'inline-source-map',
    optimization: {
        minimize: target.minimize
    },
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
                    'style-loader',
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
        filename: target.name,
        path: path.resolve(__dirname, dist),
        library: "RoguelikePumpkinPatch",
        libraryTarget: "umd"
    },
    plugins: [
    ]
}));

// Cleanup the dist directory
module.exports[0].plugins.push(new CleanWebpackPlugin());