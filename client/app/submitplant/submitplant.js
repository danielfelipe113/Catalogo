'use strict';

angular.module('catalogoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submitplant', {
        url: '/submitplant',
        templateUrl: 'app/submitplant/submitplant.html',
        controller: 'SubmitplantCtrl',
        controllerAs: 'submitPlant'
      });
  });
