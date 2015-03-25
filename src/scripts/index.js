var angular = require('angular');

var application = angular.module('Riverwash.app', ['ui.router']);

application.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/pages/en/home.html'
    });

    $stateProvider.state('location', {
        url: '/location',
        templateUrl: '/pages/en/location.html'
    });

    $stateProvider.state('schedule', {
        url: '/schedule',
        templateUrl: '/pages/en/schedule.html'
    });

    // Travelling and accommodation
    $stateProvider.state('tickets', {
        url: '/tickets',
        templateUrl: '/pages/en/tickets.html'
    });

    // Travelling and accommodation
    $stateProvider.state('travelling', {
        url: '/travelling',
        templateUrl: '/pages/en/travelling.html'
    });

    // Rules and competitions
    $stateProvider.state('competitions', {
        url: '/competitions',
        templateUrl: '/pages/en/competitions.html'
    });

});
