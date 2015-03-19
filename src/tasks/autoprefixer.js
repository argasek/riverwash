'use strict';

module.exports = {

   options: {
      browsers: ['last 1 version', 'ie 10', 'ie 11'],
      map: false
   },

   all: {
      expand: true,
      flatten: true,
      src: '<%= config.tmp %>/styles/*.css',
      dest: '<%= config.tmp %>/styles'
   }
};
