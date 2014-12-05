'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('ngApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should pass an empty test', function () {
    expect(scope.results).toBeDefined();
  });

});
