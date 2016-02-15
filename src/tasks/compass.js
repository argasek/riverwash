'use strict';

module.exports = {
    options: {
        sassDir: '<%= config.styles %>',
        cacheDir: '<%= config.tmp %>/.sass-cache',
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
        raw: 'Sass::Script::Number.precision = 10\n',
        outputStyle: 'compressed',
        debugInfo: false,
        importPath: '<%= config.modules %>/bootstrap-sass/assets/stylesheets'
    },
    dev: {
        options: {
            outputStyle: 'expanded',
            debugInfo: true
        }
    },
    dist: {
        options: {
            // If you want to go without usemin, uncomment this block. This way the CSS files are being
            // output directly to the final ('dist') directory instead of intermediate one ('.tmp');
            //cssDir: '<%= config.dist %>/styles',
            //generatedImagesDir: '<%= config.dist %>/images/generated',
        }
    }
};