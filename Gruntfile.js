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

    grunt.registerTask('serve', 'Compile and run', function(target) {
        target = target || 'dev';
        if (target === 'dev') {
            grunt.task.run([
                'clean:dev',
                'jshint:dev',
                'compass:dev',
                'autoprefixer',
                'webpack:dev',
                'connect:dev'
            ]);
        } else {
            grunt.task.run([
                'clean:dist',
                'jshint:dist',
                'compass:dist',
                'autoprefixer',
                'webpack:dist',
                'connect:dist'
            ]);
        }
    });

};