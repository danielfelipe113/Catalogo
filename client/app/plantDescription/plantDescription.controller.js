'use strict';

angular.module('catalogoApp')
  .controller('PlantDescriptionCtrl', function ($http, $stateParams) {
    var vm = this;

    vm.plantId = $stateParams.id;
    vm.plant = undefined;

    $http.get('api/Catalogos/'+vm.plantId)
        .then(function(response){
            vm.plant = response.data;    
            console.log(vm.plant);
        })
        .catch(function(err){
            console.log(err);
        });

  });
