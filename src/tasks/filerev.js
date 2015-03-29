// Add file revisions

'use strict';

module.exports = {
    options: {
        algorithm: 'md5',
        length: 8
    },
    assets: {
        src: [
            '<%= config.dist %>/scripts/*.js',
            '<%= config.dist %>/styles/*.css'
        ]
    }
};
