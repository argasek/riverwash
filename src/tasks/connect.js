'use strict';

var modRewrite = require('connect-modrewrite');

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
                    connect.static(options.config.tmp),
                    connect.static(options.config.app),
                    connect().use('/node_modules', connect.static('./' + options.config.modules))
                );

                // Allow to browse directory
                middleWares.push(connect.directory(directory));

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
                middleWares.push(connect.static(directory));

                return middleWares;
            }
        }
    }
};