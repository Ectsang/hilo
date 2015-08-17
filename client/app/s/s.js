'use strict';

angular.module('hiloApp')
  .config(function ($stateProvider) {
    $stateProvider
      // .state('s', {
      //   url: '/s',
      //   templateUrl: 'app/s/s.html',
      //   controller: 'SCtrl'
      // })
      .state('s', {
        url: '/s/:id',
        templateUrl: 'app/s/s.html',
        controller: 'SCtrl'
      });
  });