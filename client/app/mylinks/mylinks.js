'use strict';

angular.module('hiloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mylinks', {
        url: '/mylinks',
        templateUrl: 'app/mylinks/list/mylinks.html',
        controller: 'MylinksCtrl'
      })
      .state('mylinksDetail', {
        url: '/mylinks/:id',
        templateUrl: 'app/mylinks/detail/mylinks.html',
        controller: 'MylinksDetailCtrl'
      });
  });