'use strict';

angular.module('hiloApp')
  .controller('MylinksCtrl', function ($scope, $rootScope, $state, $modal, $http, Auth) {

    // Kick out those who don't belong
    var currentUser = Auth.getCurrentUser();
    if (!currentUser.name) {
      $state.go('main');
      return;
    }

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
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $rootScope.$on('rootScope:newLink', function (event, args) {
      fetchLinks();
    });

    /**
     * Returns src settings for this shortcode
     */
    function fetchLinks() {
      $scope.loading = true;
      $http.get('/api/srcsettings/list/' + Auth.getCurrentUser()._id)
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
