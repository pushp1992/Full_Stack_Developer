(function () {
    'use strict';

    angular
        .module('myApp.login')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$state', '$firebaseAuth', 'myService'];

    function SigninController($scope, $state, $firebaseAuth, myService) {
        var vm = this;

        vm.username = myService.getUser();
        if (vm.username) {
            $state.go('post');
        }

        vm.authenticate = function () {
            var usermail = vm.usrMail;
            var password = vm.usrPwd;

            //creating firebaseAuth() function and storing into a variable
            var auth = $firebaseAuth();
            auth.$signInWithEmailAndPassword(usermail, password)

                //return promise
                .then(function (user) {
                    console.log(user.uid);
                    myService.setUser(vm.usrMail);

                    // Just give your routing logic ($location.path();)here if you want user to redirect to profile page.
                    $state.go('post');

                    // hiding errMsg on successful signin
                    vm.errMsg = false;
                })

                .catch(function (error) {
                    console.log(error);

                    //showing errMsg on unsuccessful siginin
                    vm.errMsg = true;
                    vm.errMessage = error.message;
                });
        }

        //using same variable as a part of service
        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                console.log('Signed in as : ', firebaseUser.uid);
            }
            else {
                // console.log('Signed out !');
            }
        });

    }

})();