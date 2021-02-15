const path = require('path');

// src and dist directories
const src='src';
const lib='lib';
const dist='dist';

const targets = [
    {minimize: false, name:"roguelike-pumpkin-patch.js"},
    {minimize: true, name:"roguelike-pumpkin-patch.min.js"}
]

module.exports = targets.map(target=>({
    mode: 'production',
    entry: `./${lib}/index.js`,
    optimization: {
        minimize: target.minimize
    },
    // Recognize both .ts and .js extensions
    resolve: {
        extensions: [ '.js' ],
    },
    // Where to put the output
    output: {
        filename: target.name,
        path: path.resolve(__dirname, dist),
        library: "RoguelikePumpkinPatch",
        libraryTarget: "umd",
    },
}));
