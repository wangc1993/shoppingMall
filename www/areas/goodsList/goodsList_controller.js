// 商品列表页面功能
angular.module('goodsList.controller', ['goodsList.service'])
  .controller('GoodsListCtrl',function($scope,$window,GoodsListFty,$stateParams,$ionicLoading,CommonJs) {
    /*列表数据*/
    $scope.obj_goodsListData = [];

    // 分页查询对象（保存一些分页信息和查询条件）
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      pageNum: 1,
      pageSize: 10,
      sortFlag: "0",
      sortType: "desc",
      typeNumber:""
    };
    /*是否还有数据（默认有）*/
    $scope.pms_isMoreItemsAvailable = true;

    /*事件监听（在进入视图页面时调用刷新方法）*/
    $scope.$on('$ionicView.beforeEnter', function (e) {
      $scope.func_refreshGoodsList();
    });

    /*获取最新数据方法*/
    $scope.func_refreshGoodsList = function(){
      /*每次刷新页码值变为1，增强代码的健壮性*/
      $scope.obj_pagingInfo.pageNum = 1;
      /*将商品编号传入分页信息中*/
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;
      /*将分页信息转化为字符串对象*/
      var message = JSON.stringify($scope.obj_pagingInfo);
      /*通过方法获取promise对象*/
      var promise = GoodsListFty.refreshGoodsList(message);
      /*通过then方法触发状态监听*/
      promise.then(
        /*成功的回调函数*/
        function(data){
          if(data == null){
            $scope.pms_isMoreItemsAvailable = false;
          }else {
            $scope.obj_goodsListData = data;
          }
        },
        /*失败的回调函数*/
        function(reason){
        }
      ).finally(function(){
        /*停止广播ion-refresher*/
        $scope.$broadcast('scroll.refreshComplete');
        /*刷新过后，默认让他可以加载更多数据*/
        $scope.pms_isMoreItemsAvailable = true;
      });
    }

    /*加载更多数据方法*/
    $scope.func_loadMoreGoodsList=function(){
      /*用户友好：遮罩层*/
      $ionicLoading.show({
        template: "正在载入数据，请稍后..."
      });

      $scope.obj_pagingInfo.pageNum = $scope.obj_pagingInfo.pageNum + 1;
      /*将商品编号传入分页信息中*/
      $scope.obj_pagingInfo.typeNumber = $stateParams.typeNumber;
      /*将分页信息转化为字符串对象*/
      var message = JSON.stringify($scope.obj_pagingInfo);
      /*通过方法获取promise对象*/
      var promise = GoodsListFty.refreshGoodsList(message);
      /*通过then方法触发状态监听*/
      promise.then(
        function(data){
          if($scope.obj_pagingInfo.pageNum == 4){
            $scope.pms_isMoreItemsAvailable = false;
          }
          if(data == null){
            $scope.pms_isMoreItemsAvailable = false;
          }else {
            /*jquery中的each方法进行新数据遍历*/
            $.each(data,function(i,item){
              $scope.obj_goodsListData.push(item);
            })
          }
        },
        function(reason){
        }
      ).finally(function(){
        /*停止广播*/
        $scope.$broadcast('scroll.infiniteScrollComplete');
        /*去掉遮罩层*/
        setTimeout(function(){
          $ionicLoading.hide();
        },1000);
      });
    }

    /*返回前一个页面*/
    $scope.goBack = function(){
      CommonJs.GoBack();
    }
  })




