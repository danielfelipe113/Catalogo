'use strict';

angular.module('catalogoApp')
  .directive('header', function () {
    return {
      templateUrl: 'components/header/header.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('header');
      }
    };
  });
