'use strict';

angular.module('hiloApp')
  .controller('AlertsaveCtrl', function ($scope, $http, $modalInstance, link, next) {

    $scope.ok = function() {
      // save
      console.log('link', link);
      $modalInstance.close(next);
    };

    $scope.cancel = function() {
      console.log('discard changes and go back');
      $modalInstance.close(next);
    };

  });
