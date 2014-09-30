'use strict';

/**
 * @ngdoc overview
 * @name shipmeApp
 * @description
 * # shipmeApp
 *
 * Main module of the application.
 */
angular
  .module('shipmeApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/envs', {
        templateUrl: 'views/envs.html',
        controller: 'EnvCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
