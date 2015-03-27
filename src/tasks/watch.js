// Watches files for changes and runs tasks based on the changed files

'use strict';

module.exports = {
    sass: {
        options: {
            livereload: false
        },

        files: [
            '<%= config.styles %>/*.scss'
        ],
        tasks: ['compass:dev', 'autoprefixer:dev']
    },

    livereload: {
        options: {
            livereload: true
        },
        files: [
            '<%= config.app %>/index.html',
            '<%= config.app %>/pages/{,*/}*.html',
            '<%= config.app %>/images/{,*/}*.*',
            '<%= config.tmp %>/styles/*.css',
            '<%= config.tmp %>/scripts/*.js'
        ]
    }
};
