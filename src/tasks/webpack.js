'use strict';

var webpack = require('webpack');
var comments = require('uglify-save-license');

module.exports = {
    options: {
        failOnError: true,

        entry: {
            common: './<%= config.scripts %>/common.js',
            index: './<%= config.scripts %>/index.js'
        },

        output: {
            path: '<%= config.tmp %>/scripts',
            filename: '[name].js'
        },

        module: {
            loaders: [
                {
                    test: require.resolve('angular'),
                    loader: 'imports?jquery!exports?window.angular'
                },
                {
                    test: require.resolve('jquery'),
                    loader: 'expose?jQuery'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ],
            noParse: /\.min\.js$/
        },

        resolve: {
            modulesDirectories: [
                '<%= config.modules %>'
            ]
        },

        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        progress: false
    },


    dev: {
        watch: true,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
        ]
    },

    dist: {
        output: {
            path: '<%= config.dist %>/scripts',
            filename: '[name].js'
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                mangle: {
                    screw_ie8: true
                },
                beautify: false,
                comments: comments
            })

        ]
    }

};