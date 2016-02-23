'use strict';

angular.module('catalogoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plantDescription', {
        url: '/plantDescription/:id',
        templateUrl: 'app/plantDescription/plantDescription.html',
        controller: 'PlantDescriptionCtrl',
        controllerAs: 'plantDescription'
      });
  });
