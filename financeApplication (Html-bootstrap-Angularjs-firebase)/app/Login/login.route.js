(function(){
  'use strict';

  angular

  .module('myApp.login')

  .config(loginConfig);

  loginConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function loginConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('login', {
      url: '/loginPage',
      templateUrl: 'app/Login/login.tpl.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'

    });

  }
})();