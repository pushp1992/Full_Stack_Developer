(function () {
  'use strict';

  angular

    .module('myApp', [

      //adding ui-router module as a dependency to main module
      'ui.router',

      //adding bootstrap dependency to main module
      'ui.bootstrap',

      //adding htmlToPdfSave module for export option to pdf
      'htmlToPdfSave',

      //adding firebase as a dependecy to main module
      'firebase',

      //adding login module as a dependency to main module
      'myApp.login',

      //adding payment module as a dependency
      'myApp.payment'

    ])

    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/loginPage');

  }

})();