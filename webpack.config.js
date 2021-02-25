const path = require('path');

// src and dist directories
const src='src';
const lib='lib';
const dist='dist';
const docs='docs';

const targets = [
    {minimize: false, name:"roguelike-pumpkin-patch.js"},
    {minimize: true, name:"roguelike-pumpkin-patch.min.js"}
]

// Builds
module.exports = targets.map(target=>({
    mode: 'production',
    entry: `./${lib}/index.js`,
    optimization: {
        minimize: target.minimize
    },
    resolve: {
        extensions: [ '.js' ],
    },
    // Where to put the output
    output: {
        filename: target.name,
        path: path.resolve(__dirname, dist),
        library: "RPP",
        libraryTarget: "umd",
    },
}));

// Docs.
module.exports.push({
    mode: 'production',
    entry: `./${docs}/script.ts`,
    resolve: {
        extensions: [ '.js', '.ts' ],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, docs)
    }
});