'use strict';

describe('Controller: MylinksCtrl', function () {

  // load the controller's module
  beforeEach(module('hiloApp'));

  var MylinksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MylinksCtrl = $controller('MylinksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
