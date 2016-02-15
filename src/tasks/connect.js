'use strict';

var modRewrite = require('connect-modrewrite');
var connectStatic = require('serve-static');
var connectDirectory = require('serve-index');

var crossOriginMiddleware = function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');
    return next();
};

var rewriteMiddleware = modRewrite(['^[^\\.]*$ /index.html [L]']);

module.exports = {
    options: {
        open: true,
        hostname: 'localhost',
        livereload: false,
        keepalive: true,
        config: '<%= config %>'
    },

    dev: {
        options: {
            livereload: true,
            keepalive: false,
            middleware: function (connect, options) {
                var middleWares = [];
                var directory = options.directory || options.base[options.base.length - 1];

                // CORS handling
                middleWares.push(crossOriginMiddleware);

                middleWares.push(rewriteMiddleware);

                // We try to search files (like CSS, JS, etc.) in ./.tmp first, then in ./app
                middleWares.push(
                    connectStatic(options.config.tmp),
                    connectStatic(options.config.app),
                    connect().use('/node_modules', connectStatic('./' + options.config.modules))
                );

                // Allow to browse directory
                middleWares.push(connectDirectory(directory));

                return middleWares;
            }
        }
    },

    dist: {
        options: {
            base: '<%= config.dist %>',
            middleware: function (connect, options) {
                var middleWares = [];
                var directory = options.directory || options.base[options.base.length - 1];

                middleWares.push(rewriteMiddleware);
                middleWares.push(connectStatic(directory));

                return middleWares;
            }
        }
    }
};