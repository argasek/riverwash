// Watches files for changes and runs tasks based on the changed files

'use strict';

module.exports = {
    options: {
        livereload: true
    },

    sass: {
        files: [
            '<%= config.styles %>/*.scss'
        ],
        tasks: ['compass:dev', 'autoprefixer:dev']
    },

    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            '<%= config.app %>/index.html',
            '<%= config.app %>/images/{,*/}*.*',
            '<%= config.tmp %>/styles/*.css',
            '<%= config.tmp %>/scripts/*.js'
        ]
    }
};
