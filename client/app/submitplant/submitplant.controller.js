'use strict';

angular.module('catalogoApp')
  .controller('SubmitplantCtrl', function (User, Auth, $http, $state, submitPlantService, Upload, $timeout, $q) {
    var vm = this;
//variables    
    vm.user = Auth.getCurrentUser();
    vm.userVerification = User.query();
    vm.sedes = ['Facatativá', 'Ubaté', 'Chía', 'Fusagasugá'];
    vm.sedeSelected = [];
    vm.plantImages = [];
    vm.imagess = [];
    vm.progress = '';

//functions

    vm.hasImage = function() {
      if (vm.plantImages.length === 0) {
        return false;
      } else {
        return true;
      }
    };

    vm.uploadImages = function() {
      if (vm.imagess && vm.imagess.length) {
        for (var i = 0; i < vm.imagess.length; i++) {
           vm.plantImages.push(vm.imagess[i]);
        };
      }
    };

    vm.deleteImage = function (idx) {
      vm.plantImages.splice(idx, 1)
    };

    vm.coord = {
      'lat': '',
      'lng': ''
    };

    vm.uses = '';

    vm.existsInSede = function(sede) {
      return vm.sedeSelected.indexOf(sede) > -1;
    };

   vm.existsInSede.toggleSelection = function (sede) {
      var idx = vm.sedeSelected.indexOf(sede);
      //is currently selected
      if (idx > -1) {
        vm.sedeSelected.splice(idx, 1);
      } //is newly selected
        else {
          vm.sedeSelected.push(sede);
        }
    };

//catalogo Model

    vm.plant = {
      'identificacion': {
        'familia': '',
        'genero': '',
        'epiteto': '',
        'autor': '',
        'nombreComun': ''
      },
      'foto': {
        'imagenUrl': [],
        'creditoFoto': ''
      },
      'descripcion': '',
      'usos': [],
      'distribucion': [{
        'lat': undefined,
        'lng': undefined
      }],
      'sede': vm.sedeSelected,
      'usuario': {
        'nombre': vm.user.name,
        'id' : vm.user._id,
        'correo': vm.user.email
      }
    };

    

    

//
// Submit images and data
//
  
  vm.get_signed_request = function (file) {
    var deferred = $q.defer();
    $http.get("/api/catalogos/sign_s3?file_name=" + file.name + "&file_type=" + file.type)
      .then(function(response){
        vm.putObject(response.data.url, file)
          .then(function(response) {
            deferred.resolve();
          });

      }), function(err){
        deferred.reject(err);
        console.log(err);
      };
      return deferred.promise;
  }

  
  
  vm.putObject = function(signedReq, file) {
    var deferred = $q.defer();
    $http.put(signedReq, file, {headers: {'x-amz-acl': 'public-read-write'}}).then(function(response){
      vm.plant.foto.imagenUrl.push(response.config.url);
      deferred.resolve(response)
    }, function(err) {
      console.log('funcion err desde putObject', err)
      deferred.reject(err)
    })
    return deferred.promise;
  }

  vm.uploadFiles = function (files) {
    var deferred = $q.defer();
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        vm.get_signed_request(file)
          .then(function() {
            if (files.length === vm.plant.foto.imagenUrl.length) {
              deferred.resolve();
            }             
          })
          .catch(function(err){
            console.log(err);
            deferred.reject(err);
          });
         
      }
    }
    return deferred.promise;
  };

function submit(){
  vm.progress = 'indeterminate';
  var latitude = vm.coord.lat.split(',');
  var longitude = vm.coord.lng.split(',');
  var plantUses = vm.uses.split(',');

  for (var i = 0; i < latitude.length && latitude.length; i++) {
    vm.plant.distribucion.push({lat:latitude[i], lng:longitude[i]});
    console.log(vm.plant.distribucion)
  };

  for (var i = 0; i < plantUses.length; i++) {
    vm.plant.usos.push(plantUses[i]);
  }

  vm.uploadFiles(vm.plantImages)
  .then(function(response){
    var submitThat = submitPlantService.submit(vm.plant);
    submitThat
      .then(function(response){
        console.log(response);
        $state.transitionTo('main');
      })
      .catch(function(err){
        console.log(err);
      });
  })
  .then(function(){ //limpiar las imagenes
    vm.plantImages = [];
    console.log("Paso final, limpiar:", vm.plantImages)
  })
  .catch(function(err){
    console.log(err.data);
  });
}

    angular.extend(this, {
            submit: submit
        });

});
