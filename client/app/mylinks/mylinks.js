'use strict';

angular.module('hiloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mylinks', {
        url: '/mylinks',
        templateUrl: 'app/mylinks/mylinks.html',
        controller: 'MylinksCtrl'
      });
  });