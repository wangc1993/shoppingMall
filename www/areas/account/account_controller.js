// 我的页面
angular.module('account.controller', ['account.service'])
/*$ionicActionSheet；操作表；$ionicPopup：弹出窗口*/
  .controller('AccountCtrl',function($scope,$state,$window,AccountFty,$cordovaCamera,$ionicPopup,$ionicActionSheet) {

    $scope.AlertPopup = function(message) {
      var alertPopup = $ionicPopup.alert({
        /*String (可选)。弹窗的子标题。*/
        title: '提示',
        /*String (可选)。放在弹窗body内的html模板。*/
        template: message,
        /* String (默认: 'OK')。OK按钮的文字。*/
        okText: '好的'
      });
      alertPopup.then(function (res) {
      });
    }

    /*调用摄像头功能*/
    $scope.func_showAction=function(){

      /*显示操作表*/
      $ionicActionSheet.show({
        buttons: [
          { text: '照相机' },
          { text: '图库' },
        ],
        titleText: '请选择文件源',
        cancelText: '取消',
        buttonClicked: function(index) {
          switch(index){
            case 0:
              func_getPicFromCamera();
              break;
            case 1:
              func_getPicFromPicture();
              break;
          }
          return true;
        }
      });
    }


    /*从摄像头获取图片*/
    var func_getPicFromCamera = function(){
      $scope.AlertPopup('程序想要打开你的摄像头');
      /*var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('touxiang');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        $scope.AlertPopup(err);
      });*/
    }

    /*从图库获取图片*/
    var func_getPicFromPicture=function(){
      $scope.AlertPopup('程序想要打开你的图片');
      /*var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('touxiang');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        //$scope.AlertPopup(err);
      });*/
    }

    /*打电话*/
    $scope.callPhone=function(number){
      $scope.AlertPopup('打电话给 '+number);
      /*$window.location.href="tel:"+number;*/
    }

    /*退出*/
    $scope.func_exitApp = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: '提示',
        template: '确认退出？',
        cancelText: '取消',
        okText: '确定'
      });
      confirmPopup.then(function (res) {
        $state.go('tab.home');
        /*res返回一个布尔对象*/
        /*if(res){
          ionic.Platform.exitApp();
        }*/
      });
    }
  })




