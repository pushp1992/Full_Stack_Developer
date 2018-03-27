(function(){
  'use strict';

  angular

  .module('myApp.payment')

  .config(paymentConfig);

  paymentConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function paymentConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/paymentInfo');

    $stateProvider
    .state('paymentInfo',
    {
      url: '/paymentPage',
      templateUrl: 'app/Transaction/Payment/payment.tpl.html',
      controller: 'PaymentController',
      controllerAs: 'paymentCtrl'
    })
    .state('paymentHistory', 
    {
      url: '/paymentHistoryPage',
      parent: 'paymentInfo',
      templateUrl: 'app/Transaction/Payment-history/payment-history.tpl.html',
      controller: 'PaymentHistoryController',
      controllerAs: 'paymentHistCtrl'
    })
    .state('taxSlab',
     {
       url: '/taxSlabPage',
       parent: 'paymentInfo',
       templateUrl: 'app/Transaction/Tax-slab/tax-slab.tpl.html',
       controller: 'TaxSlabController',
       controllerAs: 'taxSlabCtrl'
     });

  }
})();