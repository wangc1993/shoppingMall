// 商品详细页面路由模块
angular.module('details.route', ['details.controller'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('details', {
        url: '/details/:productId',
        templateUrl: 'areas/details/details.html',
        controller: 'DetailsCtrl'
      })
  });
