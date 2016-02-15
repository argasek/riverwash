'use strict';

var webpack = require('webpack');
var comments = require('uglify-save-license');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var plugins = [
    new ngAnnotatePlugin({ add: true }),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
];

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
                    loader: 'exports?window.angular'
                },
                //{
                //    test: require.resolve('angular'),
                //    loader: 'imports?jquery!exports?window.angular'
                //},
                //{
                //    test: require.resolve('jquery'),
                //    loader: 'expose?jQuery'
                //},
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /bootstrap\.js$/,
                    loader: 'imports?jQuery=jquery'
                }
                //{
                //    test: /imagesloaded/,
                //    loader: 'imports?define=>false&this=>window'
                //}
            ],
            noParse: /\.min\.js$/
        },

        resolve: {
            alias: {
                'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap',
                'imagesloaded': 'imagesloaded/imagesloaded.pkgd'
            },
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
        plugins: plugins
    },

    dist: {
        output: {
            path: '<%= config.dist %>/scripts',
            filename: '[name].js'
        },

        plugins: plugins.concat(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true
            },
            beautify: false,
            comments: comments
        }))
    }
};