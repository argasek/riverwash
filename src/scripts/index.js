var angular = require('angular');

var application = angular.module('Riverwash.app', [
    'ui.router',
    'uiGmapgoogle-maps',
    'nemLogging',
    'pascalprecht.translate',
    'ngAnimate'
]);

// tries to determine the browser's language
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
        PARTY: 'Party information',
        COMPETITIONS: 'Competitions & rules',
        PARTICIPANTS: 'Participants',
        SCHEDULE: 'Schedule',
        TICKETS: 'Tickets',
        TRAVELLING: 'Travelling & Accommodation',
        CONTACT: 'Contact'
    });
    $translateProvider.translations('pl', {
        HOME: 'Start',
        ABOUT: 'O imprezie',
        PARTY: 'Najważniejsze informacje',
        COMPETITIONS: 'Compoty i zasady',
        PARTICIPANTS: 'Uczestnicy',
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
            var $container = $('.content');
            var images = $container.find('img');
            images.addClass('animation-fade');
            $timeout(function () {
                $container.imagesLoaded(function () {
                    images.addClass('animation-faded');
                });
            });
        }
    });

    $stateProvider.state('app.participants', {
        url: '/' + 'participants',
        templateUrl: languageTemplateUrl('participants'),
        controller: function ($scope, $http) {
            $scope.visitors = [];

            $scope.registrationButtonVisible = true;
            $scope.registrationFormVisible = false;

            $scope.openRegistrationForm = function() {
                $scope.registrationFormVisible = true;
                $scope.registrationButtonVisible = false;
            };

            $scope.submitRegistrationForm = function() {
                $scope.registrationFormVisible = false;
            };

            $http({
                method: 'GET',
                url: 'http://api.riverwash.org/users'
            }).then(function successCallback(response) {
                $scope.visitors = response.data.data;
            }, function errorCallback(response) {
            });
        }
    });

});

application.controller('applicationController', function ($scope, $stateParams, $state, $rootScope, $translate, $http) {
    var latitude = 50.259678;
    var longitude = 19.0168093;
    var coords = {
        latitude: latitude,
        longitude: longitude
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
            latitude: latitude,
            longitude: longitude
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

