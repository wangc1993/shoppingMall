angular.module('indexdb', [])
  .factory('IndexdbJs', ['$ionicPopup',function ($ionicPopup) {
    /*获取indexdb对象,为了兼容性的写法*/
    /*获取对象*/
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    window.IDBCursor=window.IDBCursor||window.webkitIDBCursor|| window.msIDBCursor;
    /*定义数据库的基本信息*/
    var db = {
      dbName: 'aptdb',
      dbVersion: 2046, //用小数会四舍五入
      dbInstance: {},

      /*创建/打开数据库*/
      open: function (func,fail) {
        var dbContent = window.indexedDB.open(db.dbName, db.dbVersion);
        /*请求数据库版本变化句柄*/
        dbContent.onupgradeneeded = db.upgrade;
        /*请求失败的回调函数句柄*/
        dbContent.onerror = db.errorHandler;
        /*请求成功的回调函数句柄*/
        dbContent.onsuccess = function (e) {
          /*获得indexedDB对象*/
          db.dbInstance = dbContent.result;
          db.dbInstance.onerror = fail;
          func();
        };
      },

      /*请求失败*/
      errorHandler: function (error) {
        console.log('error: ' + error.target.error.message);
      },

      upgrade: function (e) {
        var _db = e.target.result , names = _db.objectStoreNames;
        /*此处可以创建多个表*/
        var name = "cart";
        if (!names.contains(name)) {
          /*创建新表，createObjectStore方法有两个参数：store name和键类型*/
          _db.createObjectStore(
            name,
            {
              keyPath: 'goodsId',
              autoIncrement:false
            });
        }
      },
      /*通过某种事务获取表*/
      getObjectStore: function (objectStoreName,mode) {
        var txn, store;mode = mode || 'readonly';
        /*打开事务*/
        txn = db.dbInstance.transaction([objectStoreName], mode);
        /*获取对应objectStore（表）*/
        store = txn.objectStore(objectStoreName);
        return store;
      },
      /*向objectStore添加数据*/
      add: function (objectStoreName,data,success,fail) {
        db.open(function () {
          var store, req, mode = 'readwrite';
          store = db.getObjectStore(objectStoreName,mode),
            req = store.add(data);
            req.onsuccess = success;
            req.onerror = fail;
        },fail);
      },
      /*调用object store的put方法更新数据，会自动替换键值相同的记录，达到更新目的，没有相同的则添加*/
      update: function (objectStoreName,data,success,fail) {
        db.open(function () {
          var store, req, mode = 'readwrite';
          store = db.getObjectStore(objectStoreName,mode),
            req = store.put(data);
          req.onsuccess = success;
          req.onerror = fail;
        },fail);
      },
      getAll: function (objectStoreName,success,fail) {
        db.open(function () {
          var
            store = db.getObjectStore(objectStoreName),
            /*使用object store的openCursor()方法打开游标，利用游标遍历object store了*/
            cursor = store.openCursor(),
            data = [];

          cursor.onsuccess = function (e) {
            var result = e.target.result;
            if (result && result !== null) {
              data.push(result.value);
              /*curson.contine()会使游标下移，直到没有数据返回undefined*/
              result.continue();
            } else {
              success(data);
            }
          };
          cursor.onerror = fail;

        },fail);
      },
      /*调用object store的get方法通过键获取数据*/
      get: function (id,objectStoreName,success,fail) {
        db.open(function () {
          var
            store = db.getObjectStore(objectStoreName),
            req = store.get(id);
          req.onsuccess = function (e){
            success(e.target.result);
          };
          req.onerror = fail;
        });
      },
      /*delete是保留字，调用object store的delete方法删除记录*/
      'delete': function (id,objectStoreName,success,fail) {
        db.open(function () {
          var
            mode = 'readwrite',
            store, req;
          store = db.getObjectStore(objectStoreName,mode);
          req = store.delete(id);
          req.onsuccess = success;
          req.onerror = fail;
        });
      },
      /*调用object store的clear方法可以清空object store*/
      deleteAll: function (objectStoreName,success,fail) {
        db.open(function () {
          var mode, store, req;
          mode = 'readwrite';
          store = db.getObjectStore(objectStoreName,mode);
          req = store.clear();
          req.onsuccess = success;
          req.onerror = fail;
        });
      }
    };

    return db;
  }]);
