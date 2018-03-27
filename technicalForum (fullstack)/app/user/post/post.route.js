(function () {
    'use strict';

    angular
        .module('myApp.post')

        .config(postConfig);

    //injecting dependency intto profileConfig
    postConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    //using profileConfig as a function
    function postConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            // .when('/profile', '/profile/home')
            .otherwise('/post/home');

        //creating state
        $stateProvider
            .state('post', {
                url: '/post',
                templateUrl: 'app/user/post/post.tpl.html',
                controller: 'PostController',
                controllerAs: 'proCtrl'
            })
            .state('mypost', {
                url: '/myPost',
                parent: 'post',
                templateUrl: 'app/user/post/my-posts/my-post.tpl.html',
                controller: 'MyPostCtrl',
                controllerAs: 'vm'
            })
            .state('publicpost', {
                url: '/publicPost',
                parent: 'post',
                templateUrl: 'app/user/post/all-posts/public-post.tpl.html',
                controller: 'PublicPostCtrl',
                controllerAs: 'vm'
            });

    }
})();

