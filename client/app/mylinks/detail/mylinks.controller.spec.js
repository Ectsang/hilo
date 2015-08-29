'use strict';

describe('Controller: MylinksDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('hiloApp'));

  var MylinksDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MylinksDetailCtrl = $controller('MylinksDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
