'use strict';

module.exports = {
    options: {
        sassDir: '<%= config.styles %>',
        cssDir: '<%= config.tmp %>/styles',
        generatedImagesDir: '<%= config.tmp %>/images/generated',
        imagesDir: '<%= config.images %>',
        javascriptsDir: '<%= config.scripts %>',
        fontsDir: '<%= config.styles %>/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
    },
    dev: {
        options: {
            outputStyle: 'expanded',
            debugInfo: true
        }
    },
    dist: {
        // If you want to go without usemin, uncomment this block. This way the CSS files are being
        // output directly to the final ('dist') directory instead of intermediate one ('.tmp');
        //
        options: {
           cssDir: '<%= config.dist %>/styles',
           generatedImagesDir: '<%= config.dist %>/images/generated'
        }
        // This one is for usemin-based builds
        //options: {
        //    outputStyle: 'compressed',
        //    debugInfo: false
        //}
    }
};