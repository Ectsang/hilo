'use strict';

angular.module('hiloApp')
  .controller('SCtrl', function ($scope, $location, $sce, $http, $state) {
    var path = $location.path();
    $scope.shortCode = (path.split('/'))[path.split('/').length - 1];

    /**
     * Subscribes the email to list in mailchimp
     */
    $scope.subscribe = function() {

      var listId = $scope.srcSettings.mailchimp.listId;
      var doubleOptin = false;

      console.log($scope.theEmail, listId, doubleOptin);

      var apiPath = '/api/mailchimp/lists/'+listId+'/subscribe';
      $http.post(apiPath, { listId: listId, email: $scope.theEmail, doubleOptin: doubleOptin }, {})
        .success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer);
          console.log(config);
        })
        .error(function (err) {
          console.log('error subscribing', err);
        });
    }


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
    }

    /**
     * Builds shareUrl for display
     */
    function buildShareUrl(link) {
      var url = '';
      if (link.owner.provider === 'facebook') {
        url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link.facebook.share.url);

      } else if (link.owner.provider === 'twitter') {
        // https://twitter.com/intent/tweet?text=Hi%2C you have something in your teeth&hashtags=joking,idiot&via=ectsang
        url = 'https://twitter.com/intent/tweet?';
        var shareUrl = link.twitter.share;
        var queryStringArr = [];
        if (shareUrl.text) queryStringArr.push('text=' + shareUrl.text);
        if (shareUrl.url) queryStringArr.push('url=' + encodeURIComponent(shareUrl.url));
        if (shareUrl.hashtags.length) queryStringArr.push('hashtags=' + shareUrl.hashtags.join(','));
        if (shareUrl.via) queryStringArr.push('via=' + shareUrl.via);

        url += queryStringArr.join('&');
      }

      return url;
    }

    /**
     * Builds profileUrl for display
     */
    function buildProfileUrl(link) {
      var url;
      if (link.owner.provider === 'facebook') {
        url = link.facebook.profileUrl;
      } else if (link.owner.provider === 'twitter') {
        url = link.twitter.profileUrl;
      }
      return url;
    }

    /**
     * Returns src settings for this shortcode
     */
    function fetchSiteByShortcode() {
      $http.get('/api/srcsettings/' + $scope.shortCode)
        .success(function (result) {
          $scope.srcSettings = result;
          $scope.srcSettings.shareUrl_ = buildShareUrl($scope.srcSettings);
          $scope.srcSettings.profileUrl_ = buildProfileUrl($scope.srcSettings);

          console.log('result', $scope.srcSettings);
        })
        .error(function (err) {
          console.error('err', err);
          if (err && err.code === 404) {
            $state.go('main');
            return;
          }
        });
    }

    fetchSiteByShortcode();

  });
