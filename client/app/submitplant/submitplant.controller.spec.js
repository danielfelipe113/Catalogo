'use strict';

describe('Controller: SubmitplantCtrl', function () {

  // load the controller's module
  beforeEach(module('catalogoApp'));

  var SubmitplantCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitplantCtrl = $controller('SubmitplantCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
