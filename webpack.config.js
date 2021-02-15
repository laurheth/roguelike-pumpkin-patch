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
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {configFile: "tsconfig.webpack.json"}
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
        libraryTarget: "umd",
    },
    plugins: [
    ]
}));
