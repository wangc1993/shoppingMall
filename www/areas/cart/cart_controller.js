angular.module('cart.controller', ['cart.service'])
  .controller('CartCtrl', ['$scope', '$window','$state','$ionicHistory','IndexdbJs','CommonJs','CartFty', function ($scope, $window,$state, $ionicHistory,IndexdbJs,CommonJs,CartFty) {

    $scope.$on('$ionicView.beforeEnter', function (e) {
      func_getAllData();
    });

    /*获取indexdb的数据*/
    $scope.obj_cartDbData={
      data:"",
      total:0
    }

    /*获取全部数据*/
    function func_getAllData(){
      var promise = CartFty.getAllData();
      promise.then(
        function (data) {
          var total=0;
          $scope.obj_cartDbData.data = data;
          for(var i=0; i<data.length; i++){
            total = total + parseFloat(data[i].prise)*data[i].number*1.0;
          }
          $scope.obj_cartDbData.total = total.toFixed(2);
          //异步需要手动调用
          //$scope.$digest();
        },
        function (e) {
          CommonJs.AlertPopup(e);
        }
      ).finally(function () {
        });
    }

    /*数量加1*/
    $scope.func_jia1=function(id){
      var promise = CartFty.get(id);
      promise.then(
        function (data) {
          data.number++;
          func_updateData(data);
        },
        function (e) {
          CommonJs.AlertPopup(e);
        }
      ).finally(function () {
        });
    }

    /*数量减1*/
    $scope.func_jian1 = function(id){
      var promise = CartFty.get(id);
      promise.then(
        function (data) {
          if(data.number!=1){
            data.number--;
            func_updateData(data);
          }
        },
        function (e) {
          CommonJs.AlertPopup(e);
        }
      ).finally(function () {
        });
    }

    /*删除*/
    $scope.func_delete=function(id){
      var promise = CartFty.delete(id);
      promise.then(
        function () {
          func_updateData(data);
        },
        function (e) {
          CommonJs.AlertPopup(e);
        }
      ).finally(function () {
        });
    }

    /*更新数据*/
    function func_updateData(data){
      var promise = CartFty.updateData(data);
      promise.then(
        function () {
          func_getAllData();
        },
        function (e) {
          CommonJs.AlertPopup(e);
        }
      ).finally(function () {
        });
    }


    // 选择被选中的按钮的jquery语句
    //$("input[type='checkbox']:checked").each(function(){
    //  console.log($(this).val());
    //  $scope.batchApproveInfo.taskIDS=$scope.batchApproveInfo.taskIDS+$(this).val()+","
    //});

    // 返回按钮方法
    $scope.goBack = function () {
      /*ionicHistory起到跟踪视图的作用,在这边为什么不起作用*/
      /*$ionicHistory.goBack();*/
      $window.history.go(-1);
    };

    $scope.func_goHome= function () {
      $state.go('tab.home');
    }
  }]);
