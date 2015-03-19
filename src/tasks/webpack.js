'use strict';

var webpack = require('webpack');

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
        }
    },


    dev: {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
        ]
    },

    dist: {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
        ]
    }


};