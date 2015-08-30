'use strict';

angular.module('hiloApp')
  .controller('MylinksCtrl', function ($scope, $state, $modal, $http) {


    /**
     * Open modal
     */
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'app/mylinks/create/create.html',
        controller: 'CreateCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        },
        // windowClass: 'modal-center'
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };


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
