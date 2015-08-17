'use strict';

angular.module('hiloApp')
  .controller('SCtrl', function ($scope, $location, $sce, $http, $state) {
    var path = $location.path();
    $scope.shortCode = (path.split('/'))[path.split('/').length - 1];

    // $scope.srcSettings = {
    //   delay: 0,
    //   twitterUrl: '//twitter.com/ectsang',
    //   twitterProfilePicUrl: '//pbs.twimg.com/profile_images/546840198848315392/dBcij4uc_bigger.jpeg',
    //   author: 'Eric Tsang',
    //   theMessage: 'Keep this message short and succinct. under 100 characters long and not really much longer than that.',
    //   actionBtnText: '   >>',
    //   ctaText: 'Where to send your free bonus?',
    //   inputPlaceholder: 'Your Email',
    //   submitBtnText: 'Go',
    //   destUrl: $sce.trustAsResourceUrl('http://lenglead.com')
    // };

    /**
     * Returns the trusted src for jade to parse
     */
    $scope.trustSrc = function (src) {
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
    function buildShareUrl(shareUrl) {
      // https://twitter.com/intent/tweet?text=Hi%2C you have something in your teeth&hashtags=joking,idiot&via=ectsang
      var url = 'https://twitter.com/intent/tweet?';
      var queryStringArr = [];
      if (shareUrl.text) queryStringArr.push('text=' + shareUrl.text);
      if (shareUrl.url) queryStringArr.push('url=' + encodeURIComponent(shareUrl.url));
      if (shareUrl.hashtags.length) queryStringArr.push('hashtags=' + shareUrl.hashtags.join(','));
      if (shareUrl.via) queryStringArr.push('via=' + shareUrl.via);

      url += queryStringArr.join('&');
      return url;
    }

    /**
     * Returns src settings for this shortcode
     */
    function fetchSiteByShortcode () {
      $http.get('/api/srcsettings/' + $scope.shortCode)
        .success(function (result) {
          $scope.srcSettings = result;
          $scope.srcSettings.shareUrl_ = buildShareUrl($scope.srcSettings.shareUrl);

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
