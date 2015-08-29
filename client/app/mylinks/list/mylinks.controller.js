'use strict';

angular.module('hiloApp')
  .controller('MylinksCtrl', function ($scope, $state, $http) {

    /**
     * Returns src settings for this shortcode
     */
    function fetchLinks() {
      $scope.loading = true;
      $http.get('/api/srcsettings')
        .success(function (result) {
          $scope.links = result;

          console.log('result', $scope.links);
        })
        .error(function (err) {
          console.error('err', err);
          if (err && err.code === 404) {
            $state.go('main');
            return;
          }
        })
        .finally(function() {
          $scope.loading = false;
        });
    }

    fetchLinks();

  });
