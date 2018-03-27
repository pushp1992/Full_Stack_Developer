(function () {
  'use strict';

  angular

    .module('myApp.payment')

    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$firebaseAuth', 'myService', '$location', '$state', '$scope'];

  function PaymentController($firebaseAuth, myService, $location, $state, $scope) {

    var vm = this;

    //this function will redirect to the main page
    function refresh() {
			$state.go('paymentInfo');
		}
		refresh();

    //using login service
    vm.username = myService.getUser();
    if (!vm.username) {
      $location.path('/loginPage');
    }

    //logout user
    vm.logout = function () {
      myService.logoutUser();
    };

    //creating array for payee role
    vm.roles = [];
    
    // Creating local date and time
    var timestamp = new Date();
    var TxnDate = timestamp.toLocaleString();

    //fetching payee_role from payee_role array in DB
    var payeeRoleRef = db.collection("payee_role");
        payeeRoleRef.get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, "=>", doc.data());
               vm.roles.push(doc.data());
            });
            $scope.$digest();
          });

    //calling makePayment() function to add payee details to collection (employee_payout) in DB
    vm.makePayment = function () {
      var paymentRef = db.collection("employee_payout")
        .add({
          PaymentDate: TxnDate,
          payeeName: vm.payeeName,
          grossAmount: vm.grossAmount,
          taxComputation: vm.taxComputation,
          netAmount: vm.netAmount,
          comments: vm.comments
        })
        .then(function (paymentRef) {
          console.log("Payment is successful with ID: ", paymentRef.id);
          window.alert("Payment is successful with ID: " + paymentRef.id);
        })
        .catch(function (error) {
          console.log("Error adding Payee: ", error);
        });

        //clear form field once the detail has been submitted
        paymentForm.reset();
    }

    //calculating tax and NetAmount when 
      // the employee_role is selected from the drop down
     vm.calcTaxAndNetAmnt = function(roleId) {
      console.log("value triggered");
      console.log('userSelectedrole:',roleId)
      vm.roles.forEach(function(role){
        if(role.role_id == roleId) {
          vm.taxComputation = vm.grossAmount * role.tax_slab;
          vm.netAmount = (vm.grossAmount + vm.taxComputation);
        }
      });
    }

    // calling carousel function for slider
    $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'app/images/welcome.png'
    },
    {
      image: 'app/images/finApp2.jpg'
    },
    {
      image: 'app/images/carousel_1.jpg'
    }  
  ];


  }
})();