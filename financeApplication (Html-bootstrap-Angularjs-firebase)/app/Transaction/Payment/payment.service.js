(function(){
    'use strict';

    angular

    .module("myApp.payment")
    .service('PaymentService', PaymentService);

    PaymentService.$inject = ['$q']

    /**@nginject */
  function PaymentService() {

  }
 
})();