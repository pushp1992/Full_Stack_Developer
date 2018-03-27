(function () {
  'use strict';

  angular

    .module('myApp.login')

    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$state', '$firebaseAuth', 'myService'];

  function LoginController($scope, $state, $firebaseAuth, myService) {

    var vm = this;

    vm.login = function () {
      console.log("testing login button");
    }

    vm.username = myService.getUser();
    if (vm.username) {
      $state.go('paymentInfo');
    }

    //calling login() when login button is clicked
    vm.login = function () {

      //fetching org mail and password from login page and storing into a variable
      var organizationMail = vm.orgMail;
      var organizationPassword = vm.orgPwd;

      //authenticating email and password
      var auth = $firebaseAuth();
      //calling promise
      auth.$signInWithEmailAndPassword(organizationMail, organizationPassword)
        //return promose
        .then(function (user) {
          console.log("user.uid" + user.uid);
          myService.setUser(vm.orgMail);

          //once user is authenticated, redirect him to payment page
          $state.go('paymentInfo');

          //hide error message on successful login
          vm.errMsg = false;

        })

        //throw exception
        .catch(function (error) {
          console.log("error message" + error);

          //show error message on unsuccessful login
          vm.errMsg = true;
          vm.errMessage = error.message;

        });

    }

    // calling service here
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        console.log("logged in as" + firebaseUser.uid);
      } else {
        console.log("signed out !");
      }

    });

  }
})();