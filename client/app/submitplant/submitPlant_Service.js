(function(){
    'use strict';
    angular
        .module('catalogoApp')
            .factory('submitPlantService', submitPlantService);

    function submitPlantService ($http, $q) {

        var _functions_ = {};

        _functions_.submit = function(data){
            var deferred = $q.defer();
            $http.post('/api/catalogos', data).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        _functions_.search = function(theSearch){
            var deferred = $q.defer();

            $http.get('/api/catalogos/', {params: {'search': theSearch, 'limit': 0} }).then(function(response){
                deferred.resolve(response.data);
            }).catch(function(err){
                deferred.reject(err);
            });


            return deferred.promise;
        };

        _functions_.mainSearch = function(){
            var deferred = $q.defer();

            $http.get('api/catalogos/', {params: {'search': '', 'limit': 10}})
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(err){
                    deferred.reject(err);
                });
            return deferred.promise;
        }



        return _functions_;

    }

})();