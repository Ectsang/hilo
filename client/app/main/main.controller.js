'use strict';

angular.module('hiloApp')
  .controller('MainCtrl', function ($scope, Auth) {

    $scope.user = Auth.getCurrentUser();
    console.log($scope.user);

  });
