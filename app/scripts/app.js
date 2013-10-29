'use strict';

angular.module('d3AngularProtoApp', [
        'd3',
        'ngCookies',
        'ngResource',
        'ngSanitize'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/example1', {
                templateUrl: 'views/example1.html',
                controller: 'Example1Ctrl'
            })
            .when('/example2', {
                templateUrl: 'views/example2.html',
                controller: 'Example2Ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
