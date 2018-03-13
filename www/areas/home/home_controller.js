// 首页功能
angular.module('home.controller', ['home.service'])
  .controller('HomeCtrl', function($scope, GuidePageFty,$window) {

    getHeaderSlideData();

    /*监听视图完全加载的事件*/
    $scope.$on('$ionicView.afterEnter', function(e) {
      initHeaderSlide();
      initToutiaoSlide()
      headerChangeColor();
      goTop();
      countdown()
    });


    /*头部滚动条数据*/
    function getHeaderSlideData(){
      $scope.headerSlideData=[
        {
          alt:"双十一预热主场会",
          src:"img/home/home-headerSlide-1.jpg"
        },
        {
          alt:"11月11天家电低价不停歇",
          src:"img/home/home-headerSlide-2.jpg"
        },
        {
          alt:"家具盛典 好货提前抢",
          src:"img/home/home-headerSlide-3.jpg"
        },
        {
          alt:"IT抢券节",
          src:"img/home/home-headerSlide-4.jpg"
        },
        {
          alt:"潮流数码 双11爽购攻略",
          src:"img/home/home-headerSlide-5.jpg"
        }
      ];
    }

    /*初始化头部swiper滚动条*/
    function initHeaderSlide(){
      /*实例化swiper组件*/
      var headerSwiper = new Swiper('#headerSlider', {
        /*点击跳转*/
        paginationClickable: true,
        autoplay: 2000,
        /*用户操作swiper之后，是否禁止autoplay*/
        autoplayDisableOnInteraction: false,
        loop: true,
        /*如果需要分页器*/
        pagination: '.swiper-pagination',
        /*改变自动更新（当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。默认false，不开启，可以使用update()方法更新。）*/
        observer:true,
        /*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
        observeParents:true
      });
    }

    /*初始化京东头条滚动条*/
    function initToutiaoSlide(){
      var toutiaoSwiper = new Swiper('#toutiaoSlider', {
        /*Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)，默认水平*/
        direction:'vertical',
        autoplay: 2000,
        loop: true,
        /*onlyExternal值为true时，slide无法拖动，只能使用扩展API函数例如slideNext() 或slidePrev()或slideTo()等改变slides滑动*/
        onlyExternal: true
      });
    }

    /*改变头部颜色*/
    function headerChangeColor(){
      var bg=$window.document.getElementById('home-content');
      var nowOpacity=0;
      bg.onscroll=function(event){
        if(this.scrollTop/250<.85){
          nowOpacity=this.scrollTop/250;
        }
        document.getElementById("headerBar-bg").style.opacity=nowOpacity;
      }
    }

    /*回到顶部*/
    function goTop(){
      var bg=window.document.getElementById('home-content');
      var goTop = document.querySelector(".back_top");

      bg.addEventListener('scroll',function(){
        var top = bg.scrollTop;
        if(top>200){
          goTop.style.opacity = 1;
        }else{
          goTop.style.opacity = 0;
        }
      },false);

      goTop.onclick = function(){
        bg.scrollTop = 0;
      }
    };

    /*秒杀计时器*/
    function countdown(){
      if($window.timer){
        clearInterval($window.timer);
      }
      /*倒计时时间对象*/
      var timeObj = {
        h:1,
        m:37,
        s:13
      };

      var timeStr = toDouble(timeObj.h) + toDouble(timeObj.m) + toDouble(timeObj.s);
      var timeList = document.getElementsByClassName('time-text');
      for(var i=0; i<timeList.length; i++){
        timeList[i].innerHTML = timeStr[i];
      }
      function toDouble(num){
        if(num<10){
          return '0'+num;
        }else{
          return ''+num;
        }
      }
      /*定义一个计时器*/
      $window.timer = setInterval(function(){
        timeObj.s--;
        if(timeObj.s == -1){
          timeObj.m--;
          timeObj.s = 59;
        }
        if(timeObj.m == -1){
          timeObj.h--;
          timeObj.m = 59;
        }
        if(timeObj.h == -1){
          timeObj.h = 0;
          timeObj.m = 0;
          timeObj.s = 0;
          clearInterval($window.timer);
        }
        timeStr = toDouble(timeObj.h) + toDouble(timeObj.m) + toDouble(timeObj.s);
        for(var i=0; i<timeList.length; i++){
          timeList[i].innerHTML = timeStr[i];
        }
      },1000)
    }
  })

