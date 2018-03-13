/*第一个页面的控制器*/
angular.module('guidePage.controller', [])
  .controller('GuidePageCtrl', function($scope,$state) {
    /*引导页slide初始化*/
    var guideSlide = new Swiper('#guideSlide', {
      pagination: '.swiper-pagination',
      onSlideChangeEnd: function(swiper){
        /*为了回滑效果依然存在*/
        var items = $('.animate');
        for(var i=0; i<3; i++){
          if(items[i].classList.contains('guide-show')){
            items[i].classList.remove('guide-show')
            items[i].classList.add("hidden");
          }
        }
        /*滑动到另一个页面后，页面出现动画*/
        var index = guideSlide.activeIndex +1;
        var item = $("#tips-"+ index);
        if(item.hasClass("hidden")){
          item.removeClass("hidden");
          item.addClass("guide-show");
        }
        /*var index = guideSlide.activeIndex + 1;
        if(index == 1 || index == 2|| index == 3 || index == 4){
          var items = $('.animate');
          for(var i=0; i<3; i++){
            if(items[i].classList.contains('guide-show')){
              items[i].classList.remove('guide-show')
              items[i].classList.add("hidden");
            }
          }
          var item = $("#tips-"+ index);
          if(item.hasClass("hidden")){
            item.removeClass("hidden");
            item.addClass("guide-show");
          }
        }*/
      }
    });

    /*跳转到首页*/
    $scope.func_goHome = function(){
      $state.go('tab.home');
    }
  })
