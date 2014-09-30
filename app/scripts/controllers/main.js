'use strict';

/**
 * @ngdoc function
 * @name shipmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shipmeApp
 */

var url = 'https://api.github.com/repos/dlapiduz/govcode.org/deployments';

angular.module('shipmeApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.next = function(repo) {
      $location.path('/envs').search('repo=' + repo);
    };

}]);
