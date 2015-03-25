// Copies remaining files to places other tasks can use

'use strict';

module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: ['*.{html,ico,png,txt}', '.htaccess']
            },
            {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/pages',
                dest: '<%= config.dist %>/pages',
                src: '**/*'
            },
            // Images
            {
                expand: true,
                cwd: '<%= config.images %>',
                dest: '<%= config.dist %>/images',
                src: '{,*/}*.{png,jpg,jpeg}'
            }
        ]
    }
};
