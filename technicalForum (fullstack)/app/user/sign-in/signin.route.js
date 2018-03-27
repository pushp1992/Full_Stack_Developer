(function () {
    'use strict';

    angular
        .module('myApp.login')
        .config(signinConfig);

    signinConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function signinConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: '/app/user/sign-in/signin.tpl.html',
                controller: 'SigninController',
                controllerAs: 'signinCtrl'
            });
        //$urlRouterProvider.otherwise('/signin');
    }
})();