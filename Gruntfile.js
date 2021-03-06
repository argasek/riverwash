'use strict';

module.exports = function(grunt) {

    var path = require('path');
    var config = {
        scripts: 'src/scripts',
        tasks: 'src/tasks',
        styles: 'src/styles',
        images: 'src/images',
        modules: 'node_modules',
        app: 'src',
        dist: 'dist',
        tmp: '.tmp'
    };

    require('load-grunt-config')(grunt, {
        // Tasks path
        configPath: path.join(process.cwd(), config.tasks),

        // Runt grunt.initConfig
        init: true,

        // Expose <%= config.vars %>
        data: {
            config: config
        },

        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });

    grunt.registerTask('build', 'Compile', function(target) {
        target = target || 'dev';
        if (target === 'dev') {
            grunt.task.run([
                'clean:dev',
                'jshint',
                'compass:dev',
                'autoprefixer:dev',
                'webpack:dev'
            ]);
        } else {
            grunt.task.run([
                'clean:dist',
                'jshint',
                'compass:dist',
                'useminPrepare',
                'copy:dist',
                'cssmin:generated',
                'autoprefixer:dist',
                'webpack:dist',
                'filerev',
                'usemin'
            ]);
        }
    });

    grunt.registerTask('serve', 'Compile and run', function(target) {
        target = target || 'dev';
        if (target === 'dev') {
            grunt.task.run([
                'build:dev',
                'connect:dev',
                'watch'
            ]);
        } else {
            grunt.task.run([
                'build:dist',
                'connect:dist'
            ]);
        }
    });

};