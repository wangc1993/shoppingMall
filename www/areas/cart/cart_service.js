angular.module('cart.service', [])
  .factory('CartFty', ['$http', '$q','$window','IndexdbJs', function ($http, $q,$window,IndexdbJs) {
    return {
      /*获取对应表中所有数据*/
      getAllData: function () {
        /*定义一个延迟对象*/
        var deferred = $q.defer();
        IndexdbJs.getAll("cart",function(data){
          deferred.resolve(data);
        },function(e){
          deferred.reject(e);
        })
        return deferred.promise;
      },
      /*获取对应数据*/
      get: function (id) {
        var deferred = $q.defer();
        IndexdbJs.get(id,"cart",function(data){
          deferred.resolve(data);
        },function(e){
          deferred.reject(e);
        })
        return deferred.promise;
      },
      /*更新数据*/
      updateData: function (data) {
        var deferred = $q.defer();
        IndexdbJs.update("cart",data,function(){
          deferred.resolve();
        },function(e){
          deferred.reject(e);
        })
        return deferred.promise;
      },
      delete: function (id) {
        var deferred = $q.defer();
        IndexdbJs.delete(id,"cart",function(data){
          deferred.resolve(data);
        },function(e){
          deferred.reject(e);
        })
        return deferred.promise;
      },
      deleteAll: function(objectStoreName){
        var deferred = $q.defer();
        IndexdbJs.deleteAll(objectStoreName,function(data){
          deferred.resolve(data);
        },function(e){
          deferred.reject(e);
        })
      }
    }
  }]);
