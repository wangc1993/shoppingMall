angular.module('commonJs', [])
  .factory('CommonJs', ['$ionicPopup','$state','$window',function ($ionicPopup,$state,$window) {
    return {
      /*弹出提示框*/
      AlertPopup:function(message){
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: message
        });
        alertPopup.then(function(res) {
          $state.go('tab.home');
        });
      },
      /*返回上一个页面*/
      GoBack: function(){
        $window.history.go(-1);
      }
    }
  }]);
