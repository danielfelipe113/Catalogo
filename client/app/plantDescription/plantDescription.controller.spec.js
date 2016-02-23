'use strict';

describe('Controller: PlantDescriptionCtrl', function () {

  // load the controller's module
  beforeEach(module('catalogoApp'));

  var PlantDescriptionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlantDescriptionCtrl = $controller('PlantDescriptionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
