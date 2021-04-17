const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].pack.js',
        path: path.resolve(__dirname, './src/build/'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                ],
            },
        ],
    },
    resolve: {
        alias: {
            'paper$': 'paper/dist/paper-full.js',
            'js-angusj-clipper$': 'js-angusj-clipper/web/index.js'
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: "development",
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    reuseExistingChunk: true,
                },
            }
        },
    }
};