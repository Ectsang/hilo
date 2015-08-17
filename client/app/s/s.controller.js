'use strict';

angular.module('hiloApp')
  .controller('SCtrl', function ($scope) {
    var path = $location.path();
    $scope.shortCode = (path.split('/'))[path.split('/').length - 1];

    $scope.srcSettings = {
      delay: 0,
      twitterUrl: '//twitter.com/ectsang',
      twitterProfilePicUrl: '//pbs.twimg.com/profile_images/546840198848315392/dBcij4uc_bigger.jpeg',
      author: 'Eric Tsang',
      theMessage: 'Keep this message short and succinct. under 100 characters long and not really much longer than that.',
      actionBtnText: '   >>',
      ctaText: 'Where to send your free bonus?',
      inputPlaceholder: 'Your Email',
      submitBtnText: 'Go',
      destUrl: $sce.trustAsResourceUrl('//lenglead.com')
    };
  });
