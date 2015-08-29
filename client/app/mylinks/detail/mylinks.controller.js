'use strict';

angular.module('hiloApp')
  .controller('MylinksDetailCtrl', function ($scope, $sce, $location, $state, $http) {

    var path = $location.path();
    $scope.shortCode = (path.split('/'))[path.split('/').length - 1];


    $scope.templates = {
      shareUrl: false
    };

    $scope.toggleShowOption = function(elemId) {
      console.log(elemId);
      $scope.templates[elemId] = !$scope.templates[elemId];
    };


    /**
     * Returns the trusted src for jade to parse
     */
    $scope.trustSrc = function(src) {
      // strip https, http
      if (src) {
        src = src.replace('https://', '//').replace('http://', '//');
        return $sce.trustAsResourceUrl(src);
      } else {
        return;
      }
    };


    /**
     * Returns src settings for this shortcode
     */
    function fetchLink() {
      $scope.loading = true;
      $http.get('/api/srcsettings/' + $scope.shortCode)
        .success(function (result) {
          $scope.link = result;

          console.log('result', $scope.link);
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

    fetchLink();

  });
