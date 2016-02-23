'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, submitPlantService) {
    this.searchResults = undefined;
    this.submitPlantService = submitPlantService;
    this.theSearch = '';
    this.mainResults = undefined;
    this.mainSearch();

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  };

  search(theSearch) {
    let that = this;

    let searchThat = that.submitPlantService.search(theSearch);

    searchThat.then(function(response){
      that.searchResults = response;
      console.log('search results', response);
    })
    .catch(function(err){
      console.log(err);
    });    
  };

  mainSearch() {
    let that = this;

    let searchMain = that.submitPlantService.mainSearch();

    searchMain.then(function(response){
      that.searchResults = response;
      console.log('main results', that.searchResults)
    })
    .catch(function(err){
      console.log(err)
    });
  };
};

angular.module('catalogoApp')
  .controller('MainController', MainController);

})();
