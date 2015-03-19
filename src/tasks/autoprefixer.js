'use strict';

module.exports = {

    options: {
        browsers: ['last 1 version', 'ie 10', 'ie 11'],
        map: false
    },

    dev: {
        expand: true,
        flatten: true,
        src: '<%= config.tmp %>/styles/*.css',
        dest: '<%= config.tmp %>/styles'
    },

    dist: {
        expand: true,
        flatten: true,
        src: '<%= config.dist %>/styles/*.css',
        dest: '<%= config.dist %>/styles'
    }
};
