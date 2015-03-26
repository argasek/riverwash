var angular = require('angular');

var application = angular.module('Riverwash.app', ['ui.router']);

function getDefaultLanguage() {
    var androidLang;
    var defaultLang;
    var isPolish;

    // works for earlier version of Android (2.3.x)
    if (navigator && navigator.userAgent && (androidLang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        defaultLang = androidLang[1];
    } else {
        // works for iOS and Android 4.x
        defaultLang = navigator.userLanguage || navigator.language;
    }

    isPolish = ['pl_PL', 'pl'].indexOf(defaultLang) !== -1;
    defaultLang = (isPolish ? 'pl' : 'en');

    return defaultLang;
}

application.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    var defaultLanguage;

    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    defaultLanguage = getDefaultLanguage();

    $urlRouterProvider.otherwise('/' + defaultLanguage);

    function languageTemplateUrl(template) {
        return function ($stateParams) {
            var isSupportedLanguage = ['en', 'pl'].indexOf($stateParams.lang) !== -1;
            var lang = (isSupportedLanguage ? $stateParams.lang : defaultLanguage);
            return '/pages/' + lang + '/' + template + '.html';
        }
    }

    $stateProvider.state('app', {
        abstract: true,
        url: '/{lang}',
        template: '<ui-view></ui-view>'
    });

    $stateProvider.state('app.root', {
        url: '',
        templateUrl: languageTemplateUrl('home')
    });

    var states = [
        'location',
        'schedule',
        'tickets',
        'travelling',
        'competitions'
    ];

    states.forEach(function(state) {
        $stateProvider.state('app.' + state, { url: '/' + state, templateUrl: languageTemplateUrl(state) });
    });

});

application.controller('applicationController', function ($scope, $stateParams) {
    return $scope.lang = $stateParams.lang;
});