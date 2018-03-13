/*总路由模块*/
angular.module('route',
  ['guidePage.route',
  'home.route',
  'category.route',
  'goodsList.route',
  'details.route',
  'account.route',
  'cart.route',
  'tabs.route'])
/*配置启动页面*/
.config(function($stateProvider, $urlRouterProvider) {
  if(localStorage["isFirst"])
  {
    $urlRouterProvider.otherwise('/tab/home');
  }
  else {
    $urlRouterProvider.otherwise('/guidePage');
  }

});
