'use strict';

describe('Controller: AlertsaveCtrl', function () {

  // load the controller's module
  beforeEach(module('hiloApp'));

  var AlertsaveCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertsaveCtrl = $controller('AlertsaveCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
