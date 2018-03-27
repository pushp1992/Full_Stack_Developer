(function () {
  'use strict';

  angular

    .module('myApp.login')

    .service('myService', ['$location', '$firebaseAuth', function($location, $firebaseAuth) {

      var user = "";
      var auth = $firebaseAuth();

      return {
        //get user detail
        getUser: function () {
          if (user == "") {
            user = localStorage.getItem('userEmail');
          }
          return user;
        },

        setUser: function (value) {
          localStorage.setItem('userEmail', value);
          user = value;
        },

        logoutUser: function() {
          auth.$signOut()
            .then(function() {
              user = "";
              localStorage.removeItem('userEmail');
              localStorage.clear();
              $location.path('/loginPage');
              console.log("Successfully logged out !");
            })
            .catch(function (error) {
              console.log("error" + error);
            })
        }
      }

    }]);


})();