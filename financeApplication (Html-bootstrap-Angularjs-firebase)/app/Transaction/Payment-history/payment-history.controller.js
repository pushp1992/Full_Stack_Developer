(function(){
  'use strict';

  angular

  .module('myApp.payment')

  .controller('PaymentHistoryController', PaymentHistoryController);

  PaymentHistoryController.$inject = ['$firebaseAuth', 'myService', '$location', '$state', '$scope'];

  function PaymentHistoryController($firebaseAuth, myService, $location, $state, $scope) {

    var vm = this;
    
    vm.paymentHistory = [];

     /*fyi
    payeeRoleRef.get()
    .then(function(querySnapshot));
    */

    //fetching employee details from employee_payout collection
    var paymentHistoryRef = db.collection("employee_payout");
        paymentHistoryRef.onSnapshot({includeDocumentMetadataChanges: true}, 
          function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                console.log("Document data: ", doc.data());
                 vm.paymentHistory.push(doc.data());
              });
              $scope.$digest();
        });
  }
})();