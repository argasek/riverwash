'use strict';

module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    dev: {
        src: [
            '<%= config.scripts/{,*/}*.js',
            '<%= config.tasks/*.js',
            'Gruntfile.js'
        ]
    },
    dist: {}
};