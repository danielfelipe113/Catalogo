'use strict';

angular.module('catalogoApp.auth', [
  'catalogoApp.constants',
  'catalogoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
