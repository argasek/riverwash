// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them

'use strict';

module.exports = {
    html: '<%= config.app %>/index.html',

    options: {
        dest: '<%= config.dist %>',
        staging: '<%= config.tmp %>',
        flow: {
            html: {
                steps: {
                    css: ['cssmin']
                },
                post: {}
            }
        }
    }
};
