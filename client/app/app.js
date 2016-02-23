'use strict';

angular.module('catalogoApp', [
  'catalogoApp.auth',
  'catalogoApp.admin',
  'catalogoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ngFileUpload',
  'ngMaterial',
  'ngAria',
  'ngMessages',
  'ngAnimate'  
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-green')
      .accentPalette('green');
  });
