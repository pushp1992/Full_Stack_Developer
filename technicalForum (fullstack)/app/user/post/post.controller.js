(function () {
	'use strict';

	angular
		.module('myApp.post')
		.controller('PostController', PostController);

		PostController.$inject = ['$firebaseAuth', 'myService', '$location', '$state', 'PostService', '$scope'];

	function PostController($firebaseAuth, myService, $location, $state, PostService, $scope) {

		var vm = this;
		function activate() {
			$state.go('mypost');
		}

		activate();

		//using signin service username
		vm.username = myService.getUser();
		if (!vm.username) {
			$location.path('/signin');
		}

		vm.logout = function () {
			myService.logoutUser();
		};

		//calling submitPost();
		vm.submitPost = function (userName, postBody, postTitle) {
			userName = userName.slice(0, 5);
			PostService
				.createPost(userName, postBody, postTitle)
				.then(
					function (success) {
						$scope.$broadcast("reloadMyPost");
					},
					function (error) {
						//do nothing;
					}
				);

			//clearing user post data atfer submit
			updatePostForm.reset();
		}
	
	}

})();
