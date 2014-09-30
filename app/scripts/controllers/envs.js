'use strict';

/**
 * @ngdoc function
 * @name shipmeApp.controller:EnvCtrl
 * @description
 * # EnvCtrl
 * Controller of the shipmeApp
 */

angular.module('shipmeApp')
  .controller('EnvCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.repo = $location.search().repo;

    var url = 'https://api.github.com/repos/' + $scope.repo + '/deployments';

    $http.get(url, {
      headers: {'Accept': 'application/vnd.github.cannonball-preview+json'}
    }).success(function (data) {
      $scope.environments = $.unique($.map(data, function (o, i) { return o.environment }));
      $scope.deployments = data;
      for (var i = 0; i < $scope.deployments.length; i++) {
        (function(i) {
          $http.get(url + '/' + $scope.deployments[i].id + '/statuses', {
            headers: {'Accept': 'application/vnd.github.cannonball-preview+json'}
          }).success(function (statuses) {
            var result = {};
            $.each(statuses, function(i, status) {
              // is the server already in results
              try {
                var server = JSON.parse(status.description.toLowerCase()).server;
                if (result[server] === undefined) {
                  status.server = server;
                  result[server] = status;
                }
              } catch (e) {
                console.log(e);
              }
            });
            $scope.deployments[i].statuses = $.map(result, function(o, i) { return o});
            console.log($scope.deployments[i].statuses);
          });
        })(i);
      }
    });;

}]);
