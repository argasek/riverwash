var angular = require('angular');

var application = angular.module('Riverwash.app', ['ui.router', 'uiGmapgoogle-maps', 'pascalprecht.translate']);

// tries to determine the browsers language
var getDefaultLanguage = function ($windowProvider) {
    var nav = $windowProvider.$get().navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return 'en';
};

var getSupportedLanguage = function (lang, defaultLanguage) {
    return (['en', 'pl'].indexOf(lang) !== -1 ? lang : defaultLanguage);
};

application.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $translateProvider, $windowProvider) {
    var defaultLanguage;

    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    defaultLanguage = getDefaultLanguage($windowProvider).substring(0, 2);
    defaultLanguage = getSupportedLanguage(defaultLanguage, 'en');

    $translateProvider.translations('en', {
        HOME: 'Home',
        ABOUT: 'About',
        COMPETITIONS: 'Competitions & rules',
        SCHEDULE: 'Schedule',
        TICKETS: 'Tickets',
        TRAVELLING: 'Travelling & Accommodation',
        CONTACT: 'Contact'
    });
    $translateProvider.translations('pl', {
        HOME: 'Start',
        ABOUT: 'O party',
        COMPETITIONS: 'Compoty i zasady',
        SCHEDULE: 'Plan imprezy',
        TICKETS: 'Bilety',
        TRAVELLING: 'Lokalizacja i nocleg',
        CONTACT: 'Kontakt'
    });

    $translateProvider.registerAvailableLanguageKeys(['en', 'pl'], {
        'en_US': 'en',
        'en_UK': 'en',
        'pl_PL': 'pl'
    });

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage(defaultLanguage);

    $urlRouterProvider.when('/', '/' + defaultLanguage);
    $urlRouterProvider.otherwise('/' + defaultLanguage);

    function languageTemplateUrl(template) {
        return function ($stateParams) {
            var lang = getSupportedLanguage($stateParams.lang, defaultLanguage);
            return '/pages/' + lang + '/' + template + '.html';
        }
    }

    $stateProvider.state('app', {
        abstract: true,
        url: '/{lang}',
        templateUrl: '/pages/inner.html',
        controller: 'applicationController'
    });

    $stateProvider.state('app.home', {
        url: '',
        templateUrl: languageTemplateUrl('home')
    });

    var states = [
        //'about',
        'contact',
        'schedule',
        'tickets',
        'travelling',
        'competitions'
    ];

    states.forEach(function (state) {
        $stateProvider.state('app.' + state, {url: '/' + state, templateUrl: languageTemplateUrl(state)});
    });

    $stateProvider.state('app.about', {
        url: '/' + 'about',
        templateUrl: languageTemplateUrl('about'),
        controller: function ($scope, $timeout) {
            console.info('yay');
            var $container = $('.gallery');
            $container.find('img').addClass('animation-fade');
            $timeout(function() {
                $container.imagesLoaded( function() {
                    console.info($container.find('img'));
                    $container.find('img').addClass('animation-faded');
                });

            });
        }
    });

});

application.controller('applicationController', function ($scope, $stateParams, $state, $rootScope, $translate) {
    var coords = {
        latitude: 50.059667,
        longitude: 19.957932
    };

    var i, pad;

    $scope.bricks = [];

    for (i = 1; i <= 38; i++) {
        pad = ('000' + i).slice(-3);
        $scope.bricks.push({
            src: 'images/photos/' + pad + '.jpg'
        });
    }


    $scope.map = {center: coords, zoom: 16};
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 50.059667,
            longitude: 19.957932
        }
    };

    $translate.use($stateParams.lang);

    $rootScope.setLanguage = function (lang) {
        $translate.use(lang);
        $state.go($state.current, {lang: lang}, {
            location: true,
            reload: true,
            inherit: true
        }).then(function () {
        });
    };
});

application.directive('navbarMainCollapse', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'C',
        link: function (scope, element) {
            var navbar = element.find('.navbar-collapse');
            $rootScope.$on('$stateChangeSuccess', function () {
                if (navbar.hasClass('collapse in')) {
                    navbar.collapse('hide');
                }
            });
        }
    };
}]);

application.run(
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
);

