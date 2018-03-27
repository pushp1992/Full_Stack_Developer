(function () {
    'use strict';

    angular
        .module('myApp.post')
        .controller('PublicPostCtrl', PublicPostCtrl);

    PublicPostCtrl.$inject = ['$firebaseAuth', 'myService', '$location', '$state', 'PostService'];

    function PublicPostCtrl($firebaseAuth, myService, $location, $state, PostService) {

        var vm = this,
            postCount = 0;

        //using signin service username
    
        function activate() {

            vm.username = myService.getUser();

            if (vm.username) {
                PostService.getAllPosts().then(function (posts) {
                    vm.pubPosts = posts;
                }, function (reason) {
                    // alert('Failed: ' + reason);
                });
            }
            else {
                $location.path('/publicPost');
            }
        }
        activate();

        vm.uname = vm.username.slice(0, 5);
        if (!vm.username) {
            $location.path('/signin');
        }

        vm.logout = function () {
            myService.logoutUser();
        };


        vm.doUpdate = function (postCount, user, action) {
            var starCountRef = firebase.database().ref('Posts/' + user + '/' + postCount + '/' + action);
            starCountRef.once('value', function (snapshot) {
                updateContent(postCount, user, action, snapshot.val());
                activate();
            });
        }

        function updateContent(postCount, user, action, data) {
            var updates = {};
            if (action == 'likes' || action == 'dislikes') {
                 data = data + 1;
                } 
                
            else if (action == 'Post') {
                data = vm.updatePost;
            }
            updates['Posts/' + user + '/' + postCount + "/" + action] = data;
            firebase.database().ref().update(updates);
        }

    }

})();


           