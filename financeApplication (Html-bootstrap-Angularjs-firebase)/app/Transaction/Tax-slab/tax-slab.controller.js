(function(){
    'use strict';

    angular
    .module('myApp.payment')
    .controller('TaxSlabController', TaxSlabController);

    TaxSlabController.$inject = ['$firebaseAuth', 'myService', '$location', '$state', '$scope'];

    function TaxSlabController($firebaseAuth, myService, $location, $state, $scope) {
        var vm = this;

    //creating array for payee role
    vm.roles = [];   
   
    //fetching all document from payee_role collection DB and pushing into vm.roles[]
    var payeeRoleRef = db.collection("payee_role");
        payeeRoleRef.get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, "=>", doc.data());
                vm.roles.push(doc.data());
            });
              $scope.$digest();
          });

    //updating tax slab in payee_role collection
    vm.updateTax = function(RoleId,value){
        console.log("updating tax slab", RoleId,value);
        
        if(RoleId==1){
        payeeRoleRef.doc('6HFBLPwCRnDkruOYlJM6')
        .set(
            {tax_slab: value},
            {merge: true}
        );
            } else if(RoleId==2) {
                payeeRoleRef.doc('bYNARicVrhGygiGu7foM')
                .set(
                    {tax_slab: value},
                    {merge: true}
                );
            }
            window.alert("Tax slab updated successfully !");        
        }
    }
    
})();