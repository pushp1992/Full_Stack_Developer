(function(){
    'use strict';

    angular
        .module('myApp', [

            //adding ui.router module as a dependency for myApp module
            'ui.router',

            //adding material as a dependency to myApp module
           

            //adding firebase module as a dependency for myApp module for signin authentication
            'firebase',

            //adding siginin module as a dependency for myApp module
            'myApp.login',

            //adding profile as a dependency for myApp module
            'myApp.post'
            
        ])
        .config(appConfig);

        //injecting dependecy in appConfig
        appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        //using appConfig()
        function appConfig($stateProvider, $urlRouterProvider){

            //uisng state
            $urlRouterProvider.otherwise('/signin');

        }
})();