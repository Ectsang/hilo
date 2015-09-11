'use strict';

angular.module('hiloApp')
  .controller('MylinksDetailCtrl', function ($scope, $sce, $location, $state, $http, $rootScope, $modal, Auth, cfpLoadingBar) {

    var path = $location.path();
    $scope.shortCode = (path.split('/'))[path.split('/').length - 1];

    $scope.showGuides = true;

    $scope.confirmed = false;

    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
      // re-show hint
      $scope.toggleShowOption('hint');
    };

    $scope.templates = {
      hint: true,

      shareUrl: false,
      twitterProfilePicUrl: false,
      author: false,
      theMessage: false,
      actionBtn: false,
      ctaText: false,
      inputPlaceholder: false,
      submitBtnText: false
    };


    $scope.toggleShowOption = function(elemId) {
      // hide all other templates
      for (var x in $scope.templates) { $scope.templates[x] = false; }

      // show only template of elemId
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
     * Catches back button globally
     */
    $scope.$on('$locationChangeStart', function(event, next, current) {
      if (!$scope.isAuthenticated && !$scope.confirmed) {

        event.preventDefault();

        var size = 'md';
        var modalInstance = $modal.open({
          templateUrl: 'app/mylinks/detail/modals/alertsave/alertsave.html',
          controller: 'AlertsaveCtrl',
          size: size,
          resolve: {
            link: function () {
              return $scope.link;
            },
            next: function () {
              return next;
            }
          }
        });

        modalInstance.result.then(function (result) {
          // if result is a link
          if (result && result.length) {
            $scope.confirmed = !$scope.confirmed;
            $location.path('/mylinks');
          }

        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }
    });



    /**
     * Patches link with updated data
     */
    $scope.updateLink = function() {
      cfpLoadingBar.start();
      $http.put('/api/srcsettings/' + $scope.shortCode, $scope.link)
        .success(function (result) {
          console.log('updated link', result);
        })
        .error(function (err){
          console.log('error', err);
        })
        .finally(function() {
          cfpLoadingBar.complete();
        });
    }


    /**
     * Returns src settings for this shortCode
     */
    function fetchLink() {
      cfpLoadingBar.start();
      $http.get('/api/srcsettings/' + $scope.shortCode)
        .success(function (result) {
          // if result.owner is not === logged in user,
          if (Auth.getCurrentUser()._id !== result.owner._id) {
            $state.go('main');
            return;
          }

          $scope.link = result;

          console.log('fetched link', $scope.link);
        })
        .error(function (err) {
          console.error('err', err);
          if (err) {
            $state.go('main');
            return;
          }
        })
        .finally(function() {
          cfpLoadingBar.complete();
        });
    }

    fetchLink();

  });
