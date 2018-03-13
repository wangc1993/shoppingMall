angular.module('cart.route', ['cart.controller'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab.cart', {
        url: '/cart',
        views: {
          'tab-cart': {
            templateUrl: 'areas/cart/cart.html',
            controller: 'CartCtrl'
          }
        }
      })
  });
