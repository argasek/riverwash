'use strict';

module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    src: [
        '<%= config.scripts/{,*/}*.js',
        '<%= config.tasks/*.js',
        'Gruntfile.js'
    ]
};