(function () {
    'use strict';

    angular
        .module('myApp.post')
        .controller('MyPostCtrl', MyPostCtrl);

    MyPostCtrl.$inject = ['$firebaseAuth', 'myService', '$location', '$state', 'PostService', '$scope'];

    function MyPostCtrl($firebaseAuth, myService, $location, $state, PostService, $scope) {

        var vm = this,
            postCount = 0;

        // to update my posts
        $scope.$on('reloadMyPost', function () {
            activate();
        });

        function activate() {

            vm.username = myService.getUser();

            if (vm.username) {
                
                PostService.getPosts(vm.username)
                .then(function (posts) {
                    vm.posts = posts;
                    console.log('Posts: ', vm.posts);
                },
                    function (reason) {
                        // alert('Failed: ' + reason);
                    });
            } else {
                $location.path('/signin');
            }
        }

            activate();

            //end user session
            vm.logout = function () {
                myService.logoutUser();
            };

            vm.doUpdate = function (postCount, user, post_msg, post) {
                vm.updatePostCount = postCount;
                vm.updateUser = user;
                vm.updatePostMsg = post_msg;
                vm.updatePostModel = post;
            }

            vm.updatePost = function () {
                var updates = {};
                vm.updatePostModel.Post = vm.updatePostMsg;
                updates['Posts/' + vm.updateUser + '/' + vm.updatePostCount] = vm.updatePostModel;
                firebase.database().ref().update(updates)
                vm.showHide();
                activate();
            }

            // Show hide the editable text box
            vm.showHide = function () {
                vm.showEditPost = !vm.showEditPost;
            }
    }

})();
