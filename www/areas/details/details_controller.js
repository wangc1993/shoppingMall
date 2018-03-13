/*商品详细页面功能*/
angular.module('details.controller', ['details.service'])
  .controller('DetailsCtrl',function($scope, $window,$stateParams, CommonJs,IndexdbJs, $ionicPopup, $state, $ionicHistory) {
    /*初始化购物车数量*/
    $scope.obj_cartCount = {
      count: "0"
    }

    var span = document.getElementById('guanzhu');

    $scope.$on('$ionicView.beforeEnter', function (e) {
      IndexdbJs.getAll("cart",function(data){
        /*刷新购物车数量*/
        for(var i =0; i<data.length; i++){
          $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) + parseInt(data[i].number);
          /*刷新是否关注*/
          if(data[i].goodsId){
            var goodsId = data[i].goodsId.split('-');
            if(goodsId[0] == $scope.obj_goodsInfo.goodsId){
              if(!data[i].guanzhu){
                if(span.classList.contains('actived')){
                  span.classList.remove('actived');
                }
              }else{
                if(!span.classList.contains('actived')){
                  span.classList.add('actived');
                }
              }
            }
          }
        }
      },null)

    });

    /*通过后台获取到的商品详细信息*/
    $scope.obj_goodsInfo = {
      goodsId: "200067",
      description: "若昕 韩版睡衣女冬法兰绒家居服加厚珊瑚绒女人卡通甜美睡衣秋冬套装 66651K 女 M",
      prise: "66",
      picture: [],
      guanzhu: false,
      src: "",
      isFork: false,
      colorGroup: [{name: "红色", value: "red"}, {name: "蓝色", value: "blue"}],
      sizeGroup: [{name: "s", value: "s"}, {name: "m", value: "m"}, {name: "l", value: "l"}]
    };

    /*用户选择信息，进行维护*/
    $scope.obj_goodsDetailInfo = {
      goodsId: $scope.obj_goodsInfo.goodsId,
      isFork: $scope.obj_goodsInfo.isFork,
      description: $scope.obj_goodsInfo.description,
      src: $scope.obj_goodsInfo.src,
      prise: $scope.obj_goodsInfo.prise,
      color: "",
      size: "",
      number: 1,
      guanzhu: $scope.obj_goodsInfo.guanzhu
    }

    /*数量加1*/
    $scope.add = function(){
      $scope.obj_goodsDetailInfo.number ++;
    }

    /*数量减1*/
    $scope.reduce = function(){
      if($scope.obj_goodsDetailInfo.number != 0){
        $scope.obj_goodsDetailInfo.number --;
      }
    }

    /*加入购物车方法*/
    $scope.func_addToCart = function () {

      var obj_newData = {};
      angular.copy($scope.obj_goodsDetailInfo,obj_newData);

      obj_newData.goodsId = obj_newData.goodsId + "-" + obj_newData.color + "-" + obj_newData.size;

      IndexdbJs.get(obj_newData.goodsId,"cart",
        function(data){
          if(data == null || data == undefined){
            /*不存在商品就添加*/
            IndexdbJs.add("cart", obj_newData, function () {
              /*变更购物车数量*/
              $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) + parseInt($scope.obj_goodsDetailInfo.number);
              /*在$digest循环中，watchers会被触发*/
              $scope.$digest();
            }, null);
          }
          else {
            /*存在商品*/
            /*是新增加6个数量，所以要处理一下，这个还影响下面变更购物车数量的逻辑*/
            obj_newData.number = parseInt(obj_newData.number)+parseInt(data.number);

            IndexdbJs.update("cart", obj_newData, function () {
              /*变更购物车数量*/
              $scope.obj_cartCount.count = parseInt($scope.obj_cartCount.count) + parseInt($scope.obj_goodsDetailInfo.number);
              $scope.$digest();
            }, null);
          }
        },
        null
      )
    }

    /*确认购买*/
    $scope.func_confirm = function(){

      var confirmPopup = $ionicPopup.confirm({
        title: '提示',
        template: '确认购买？',
        cancelText: '取消',
        okText: '确定'
      });
      confirmPopup.then(function (res) {
        if(res){
          $state.go('tab.home');
        }
      });
    }

    /*关注*/
    $scope.func_guanzhu = function(){
      if(span.classList.contains('actived')){
        span.classList.remove('actived');
        $scope.obj_goodsDetailInfo.guanzhu = false;
        /*匹配数据库中的商品*/
        var obj_newData = {};
        angular.copy($scope.obj_goodsDetailInfo,obj_newData);
        obj_newData.goodsId = obj_newData.goodsId + "-" + obj_newData.color + "-" + obj_newData.size;
        IndexdbJs.update('cart', obj_newData);
      }else{
        span.classList.add('actived');
        $scope.obj_goodsDetailInfo.guanzhu = true;
        /*匹配数据库中的商品*/
        var obj_newData = {};
        angular.copy($scope.obj_goodsDetailInfo,obj_newData);
        obj_newData.goodsId = obj_newData.goodsId + "-" + obj_newData.color + "-" + obj_newData.size;
        IndexdbJs.update('cart', obj_newData);
    }
  }

    /*返回前一个页面*/
    $scope.goBack = function(){
      CommonJs.GoBack();
    }
  })




