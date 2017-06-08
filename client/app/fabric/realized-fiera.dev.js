/*! Fiera.js Copyright 2016, www.homeTLT.ru (Denis Ponomarev <ponomarevtlt@gmail.com>) */
var fiera =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = fabric;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(3);

var utils = {
  /**
   *
   * @param arr
   * @param arr2
   * @returns {{}}
   * @example
   *    x = {a: 1 ,b: 1, c: [1,2]}
   *    y = {a: 2 ,  c : 3 , d : 1}
   *
   *    extendArraysObject(x,y) = {a: [1,2] b : [1] c : [1,2,3], d [1] }
   */
  extendArraysObject : function(arr,arr2){
    var newArray = {};

    for(var i in arr){
      if(arr[i].constructor == Array){
        newArray[i]  = [].concat(arr[i]);
      }else{
        newArray[i] = [arr[i]];
      }
    }

    for(var i in arr2){
      if(newArray[i]){
        newArray[i].push(arr2[i]);
      }else{
        newArray[i] = [arr2[i]];
      }
    }
    return newArray;
  },
  filterValues: function (array, values) {
    var new_array = [];
    for (var i in array) {
      var _new_object = {};
      for (var j in values) {
        _new_object[values[j]] = array[i][values[j]]
      }
      new_array.push(_new_object);
    }
    return new_array;
  },

  /**
   *  Тасование Фишера–Йетса,случайное тасование множества
   * @param object
   * @returns {*}
   */
  shuffle: function (object) {
    if (!object.length) return;
    var i = object.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = object[i];
      object[i] = object[j];
      object[j] = temp;
    }

    return object; // for convenience, in case we want a reference to the array
  },
  /**
   * Dependency: underscore.js ( http://documentcloud.github.com/underscore/ )
   *
   * Mix it in with underscore.js:
   * _.mixin({deepExtend: deepExtend});
   *
   * Call it like this:
   * var myObj = utils.deepExtend(grandparent, child, grandchild, greatgrandchild)
   *
   * Notes:
   * Keep it DRY.
   * This function is especially useful if you're working with JSON config documents. It allows you to create a default
   * config document with the most common settings, then override those settings for specific cases. It accepts any
   * number of objects as arguments, giving you fine-grained control over your config document hierarchy.
   *
   * Special Features and Considerations:
   * - parentRE allows you to concatenate strings. example:
   *   var obj = utils.deepExtend({url: "www.example.com"}, {url: "http://#{_}/path/to/file.html"});
   *   console.log(obj.url);
   *   output: "http://www.example.com/path/to/file.html"
   *
   * - parentRE also acts as a placeholder, which can be useful when you need to change one value in an array, while
   *   leaving the others untouched. example:
   *   var arr = utils.deepExtend([100,    {id: 1234}, true,  "foo",  [250, 500]],
   *                          ["#{_}", "#{_}",     false, "#{_}", "#{_}"]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - The previous example can also be written like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false, "#{_}", []]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - And also like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - Array order is important. example:
   *   var arr = utils.deepExtend([1, 2, 3, 4], [1, 4, 3, 2]);
   *   console.log(arr);
   *   output: [1, 4, 3, 2]
   *
   * - You can remove an array element set in a parent object by setting the same index value to null in a child object.
   *   example:
   *   var obj = utils.deepExtend({arr: [1, 2, 3, 4]}, {arr: ["#{_}", null]});
   *   console.log(obj.arr);
   *   output: [1, 3, 4]
   *
   **/
  deepExtend: function (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
      return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone, tmpBuf;

    args.forEach(function (obj) {
      if (typeof obj !== 'object') return;

      for (key in obj) {
        if (!(key in obj)) continue;

        src = target[key];
        val = utils.cloneDeep(obj[key]);


        if (typeof src !== 'object' || src === null) {
          target[key] = val;
        }else if (Array.isArray(val)) {
          clone = (Array.isArray(src)) ? src : [];

          val.forEach(function(item){
            clone.push(utils.cloneDeep(item));
          });

          target[key] = clone;
          //todo  если заимствуем массив , то ссохраняем значения из обоих массивов
          //target[key] = utils.deepExtend(clone, val);

        } else {
          clone = (!Array.isArray(src)) ? src : {};
          target[key] = utils.deepExtend(clone, val);
        }

      }
    });

    return target;
  },
  cloneDeep: function (val) {

    if (typeof val === 'undefined') {
      return undefined;
    }

    if (val === null) {
      return null;
    } else if (val instanceof Date) {
      return new Date(val.getTime());
    } else if (val instanceof RegExp) {
      return new RegExp(val);
    }

    if(val.cloneSync){
      return val.cloneSync();
    }else if(val.constructor == Object){
      return utils.deepExtend({}, val);
    }else if(val.constructor == Array){
      var clone = [];
      for(var i =0 ;i < val.length; i++){
        clone.push(utils.cloneDeep(val[i]));
      }
      return clone;
    }else{
      return val;
    }
  },
  rearrange: function (object, keys) {
    var _newOrder = {};
    for (var i in keys) {
      if(object[keys[i]] !== undefined){
        _newOrder[keys[i]] = object[keys[i]]
      }
    }
    // for (i in object) {
    //   delete object[i];
    // }
    // for (i in _newOrder) {
    //   object[i] = _newOrder[i];
    // }
    return _newOrder;
  },
  sortBy: _.sortBy,
  defaults: _.defaults,
  where: _.where,
  findWhere: _.findWhere,
  filter: _.filter,
  pick: _.pick,
  extend: function (destination) {
    // JScript DontEnum bug is not taken care of
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var property in source) {
        destination[property] = source[property];
      }
    }
    return destination;
  }
};
module.exports =  utils;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var objectUtils = __webpack_require__(1)
_ = __webpack_require__(3);

var utils = {
  /**
   * will divide total width for every object in columnts array
   *
   *
   * @example
   *     var _flexArray = fabric.util.flex(200 , [{flex: 0},{value: 100, flex: 1},{flex: 0}] );
   * @param total
   * @param columns
   * @returns {Array}
   * @example [50,100,50]
   */
  flex: function (total,columns){
    var _return = [];
    var split = 0;
    columns.forEach(function(column, index){
      if(column.value === undefined){
        split++;
      }else{
        total -= column.value;
      }
    });
    var _w = total / split;
    columns.forEach(function(column){
      _return.push(column.value === undefined ? _w :  column.value );
    });
    return _return;
  },
  worker: function (foo) {
    if (window.Worker) {
      var str = foo.toString();
      var eventArg = str.substring(str.indexOf("(") + 1,str.indexOf(","));
      var postMessageArg = str.substring(str.indexOf(",") + 1,str.indexOf(")"));
      var _functionBody = str.substring(str.indexOf("{") + 1);
      str = "onmessage=function(" + eventArg + "){" + postMessageArg + "= postMessage;" + _functionBody;
      var blob = new Blob([str]);
      //"onmessage = function(e) { postMessage('msg from worker'); }"]);
      var blobURL = window.URL.createObjectURL(blob);
      return new Worker(blobURL);
    } else {
      var worker = {
        terminate: function () {
        },
        postMessage: function (data) {
          setTimeout(function () {
            foo({data: data}, function (responseData) {
              worker.onmessage && worker.onmessage({data: responseData});
            })
          });
        }
      };
      return worker;
    }
  },
  observable: function (obj) {
    _.extend(obj, {

      fire: function fire(eventName, options) {
        if (!this.__eventListeners) {
          return;
        }
        var listenersForEvent = this.__eventListeners[eventName];
        if (!listenersForEvent) {
          return;
        }
        for (var i = 0, len = listenersForEvent.length; i < len; i++) {
          listenersForEvent[i].call(this, options || {});
        }
        return this;
      },
      on: function (eventName, handler) {
        if (eventName.constructor == Object) {
          for (var i in eventName) {
            this.on(i, eventName[i])
          }
          return this;
        }
        var events = eventName.split(" ");
        for (var i in events) {
          this.observe(events[i], handler)
        }
        return this;
      },
      observe: function (eventName, handler) {
        if (!this.__eventListeners) {
          this.__eventListeners = {};
        }
        if (arguments.length === 1) {
          for (var prop in eventName) {
            this.on(prop, eventName[prop]);
          }
        }
        else {
          if (!this.__eventListeners[eventName]) {
            this.__eventListeners[eventName] = [];
          }
          this.__eventListeners[eventName].push(handler);
        }
        return this;
      },
      off: function stopObserving(eventName, handler) {
        function _removeEventListener(eventName, handler) {
          if (!this.__eventListeners[eventName]) {
            return;
          }

          if (handler) {
            var idx = this.__eventListeners[eventName].indexOf(handler);
            if (idx !== -1) {
              this.__eventListeners[eventName].splice(idx, 1);
            }
          }
          else {
            this.__eventListeners[eventName].length = 0;
          }
        }

        if (!this.__eventListeners) {
          return;
        }
        if (arguments.length === 0) {
          this.__eventListeners = {};
        }
        else if (arguments.length === 1 && typeof arguments[0] === 'object') {
          for (var prop in eventName) {
            _removeEventListener.call(this, prop, eventName[prop]);
          }
        }
        else {
          _removeEventListener.call(this, eventName, handler);
        }
        return this;
      }
    })
  },
  inOrder: function (array, foo, callback) {
    var _index = 0;
    function _inOrderIndex() {
      if (++_index < array.length) {
        foo(array[_index], _index, _inOrderIndex)
      } else {
        callback && callback();
      }
    }
    foo(array[_index], _index, _inOrderIndex)
  },
  /**
   * возвращает объект с ключами строки url
   * @returns {{}}
   */
  queryString: function (query) {
    if(query) {
      query = query.substr(query.indexOf("?") + 1) ;
    }else{
      query = window.location.search.substring(1);
    }
    var obj = {};
    var _length = 0;
    if (!query)return obj;
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var _vname = pair[0], val = pair[1];
      if (typeof obj[_vname] === "undefined") {
        obj[_vname] = val || "";
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
        // If second entry with this name
      } else if (typeof obj[_vname] === "string") {
        var arr = [obj[_vname], val];
        obj[_vname] = arr;
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
        // If third or later entry with this name
      } else {
        obj[_vname].push(val);
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
      }
    }
    Object.defineProperty(obj, "length", {value: _length, enumerable: false});
    return obj;
  },
  copyValue: function (value) {
    if (value == null) {
      return null
    }
    if (value == undefined) {
      return undefined
    }
    switch (value.constructor) {
      case Object:
        return objectUtils.deepExtend({}, value);
      case Array:
        return objectUtils.deepExtend([], value);
      case String:
      case Number:
      case Boolean:
        return value;
      default:
        //console.log(value.constructor);
        return objectUtils.deepExtend({}, value);
    }
  },
  clearValue: function (value) {
    switch (value.constructor) {
      case Object:
        for (var member in value) delete value[member];
        break;
      case Array:
        value.length = 0;
        break;
      default:
        delete value;
    }
  },
  objectsDifference: function (prev, now) {
    var changes = {};
    for (var prop in now) {
      if (!prev || prev[prop] !== now[prop]) {
        if (typeof now[prop] == "object") {
          var c = utils.objectsDifference(prev[prop], now[prop]);
          if (!_.isEmpty(c)) // underscore
            changes[prop] = c;
        } else {
          changes[prop] = now[prop];
        }
      }
    }
    return changes;
  },
  splitBy: function (query, delimiter) {
    var traceQueries = [];
    var r = 0,
      f = 0,
      _p_start = 0;
    if (query == "") return [];
    for (var i = 0; i < query.length; i++) {
      var c = query[i];
      if (c == "(") {
        r++;
        f = 1;
      } else if (c == ")") {
        r--;
      }
      if (r == 0 && f == 1) f = 0;
      if (delimiter.indexOf(c) != -1 && r == 0 && f == 0) {
        traceQueries.push(query.substring(_p_start, i));
        _p_start = i + 1;
      }
    }
    traceQueries.push(query.substring(_p_start));
    return traceQueries;
  },
  queueLoad: function (total, completeCB, progressCB) {
    var loader = function (el) {
      loader.loaded.push(el);
      loader.progressCB && loader.progressCB(loader.loaded.length, loader.total, el, loader.loaded);

      if (loader.loaded.length == loader.total) {
        loader.completeCB && loader.completeCB(loader.loaded);
        loader.fire("loaded");
      }
    };
    loader.completeCB = completeCB;
    loader.progressCB = progressCB;
    loader.total = total;
    loader.loaded = [];
    utils.observable(loader);

    return loader;
  }
};
module.exports =  utils;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  resolve: function (path) {
    var chunks = path.split("/");
    var prev = 0;
    for (var i = chunks.length; i-- > 0;) {
      if (chunks[i] == "..") {
        prev++;
      } else {
        while (prev > 0) {
          chunks.splice(i, 1);
          chunks.splice(i--, 1);
          prev--;
        }
      }
    }
    return chunks.join("/");
  },
  getParentDirectoryUrl: function (url) {
    return url.substr(0, url.lastIndexOf("/") + 1);
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczpuczE9Imh0dHA6Ly9zb3ppLmJhaWVyb3VnZS5mciIKICAgIGlkPSJzdmc0ODg4IgogICAgc29kaXBvZGk6ZG9jbmFtZT0id2FybmluZ19idXR0b24uc3ZnIgogICAgdmlld0JveD0iMCAwIDQwMCA0MDAiCiAgICB2ZXJzaW9uPSIxLjEiCiAgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjAgcjk2NTQiCiAgPgogIDxkZWZzCiAgICAgIGlkPSJkZWZzNDg5MCIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTEiCiAgICAgICAgeTI9IjM2Ny44OCIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMjg3LjQ5IgogICAgICAgIHgyPSIzMTUuNDciCiAgICAgICAgeDE9IjI0MS40MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNDE1OCIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNjAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPGZpbHRlcgogICAgICAgIGlkPSJmaWx0ZXI2MTI2IgogICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPGZlR2F1c3NpYW5CbHVyCiAgICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI2MTI4IgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIwLjUzMDM1NzEzIgogICAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAvPgogICAgPC9maWx0ZXIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTMiCiAgICAgICAgeTI9IjM5MS40NSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMzAwLjg2IgogICAgICAgIHgyPSIzNDIiCiAgICAgICAgeDE9IjI3NS42MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNzIwMSIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM1NTAwMDAiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcyMDMiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPHJhZGlhbEdyYWRpZW50CiAgICAgICAgaWQ9InJhZGlhbEdyYWRpZW50ODQxNSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICBjeD0iMzEyLjc4IgogICAgICAgIGN5PSIzODYuNTciCiAgICAgICAgcj0iNTMuMDM2IgogICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS41OTMyNyAtLjU5MzI3IC43MTUwNSAtLjcxNTA1IDI0My4yNyA4NDkuMDMpIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A3MTEzLTciCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTouNDA4MTYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcxMTUtNyIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjAiCiAgICAgICAgICBvZmZzZXQ9IjEiCiAgICAgIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50CiAgICA+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDQ0OSIKICAgICAgICB5Mj0iMzM4LjgyIgogICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgIHkxPSIyODYuNjciCiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguOTU1MzQgMCAwIC45NTUzNCAxMzYuMTIgMTQuMDU1KSIKICAgICAgICB4Mj0iMzAwLjI3IgogICAgICAgIHgxPSIyNTUuMzIiCiAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICA+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNTAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmIgogICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAvPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A0MTUyIgogICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MCIKICAgICAgICAgIG9mZnNldD0iMSIKICAgICAgLz4KICAgIDwvbGluZWFyR3JhZGllbnQKICAgID4KICAgIDxmaWx0ZXIKICAgICAgICBpZD0iZmlsdGVyMTE0MjgiCiAgICAgICAgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjExNDMwIgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIxLjI0MzQ2NzgiCiAgICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgIC8+CiAgICA8L2ZpbHRlcgogICAgPgogIDwvZGVmcwogID4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgIGlkPSJiYXNlIgogICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk4OCIKICAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICAgaW5rc2NhcGU6em9vbT0iMC43MDcxMDY3OCIKICAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgICBpbmtzY2FwZTpjeD0iMzA0Ljg5NDA5IgogICAgICBpbmtzY2FwZTpjeT0iMzQxLjUyMTg2IgogICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2ODAiCiAgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAvPgogIDxnCiAgICAgIGlkPSJsYXllcjEiCiAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC02NTIuMzYpIgogICAgPgogICAgPGcKICAgICAgICBpZD0iZzExNDMyIgogICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSI5MCIKICAgICAgICBpbmtzY2FwZTpleHBvcnQteGRwaT0iOTAiCiAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMi45MDUxIDAgMCAyLjkwNTEgLTEwMDEuOSAtNzguOTYxKSIKICAgICAgPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjc2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5IgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTczNTQgMCAwIC45NzM1NCAxMjAuMDkgLTEyLjYyOCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI3OCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTEpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTU5NjAgMCAwIC45NTk2MCAxMjQuMzMgLTcuODAxNCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6I2VjZWNlYyIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjg3MzU1IDAgMCAuODczNTUgMTUwLjQ3IDIxLjk4MSkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MiIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6Izk5OTk5OSIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjgzODM4IDAgMCAuODM4MzggMTYxLjE1IDM0LjE1MikiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4NCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTMpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguODA1ODcgMCAwIC44MDU4NyAxNzEuMDMgNDUuNDA1KSIKICAgICAgICAgIHNvZGlwb2RpOmN5PSIzNDYuMTEyMTgiCiAgICAgICAgICBzb2RpcG9kaTpjeD0iMzAzLjc1IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjg2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI3JhZGlhbEdyYWRpZW50ODQxNSkiCiAgICAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICAgICBkPSJtMzU2Ljc5IDM0Ni4xMWMwIDI5LjI5MS0yMy43NDUgNTMuMDM2LTUzLjAzNiA1My4wMzZzLTUzLjAzNi0yMy43NDUtNTMuMDM2LTUzLjAzNiAyMy43NDUtNTMuMDM2IDUzLjAzNi01My4wMzYgNTMuMDM2IDIzLjc0NSA1My4wMzYgNTMuMDM2eiIKICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC43NTgyNSAwIDAgLjc1ODI1IDE4Ni43NSA2My45MDYpIgogICAgICAgICAgc29kaXBvZGk6Y3k9IjM0Ni4xMTIxOCIKICAgICAgICAgIHNvZGlwb2RpOmN4PSIzMDMuNzUiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDcyODgiCiAgICAgICAgICBzdHlsZT0ib3BhY2l0eTouMzE3NzE7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA0NDkpIgogICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgIGQ9Im00MTQuOCAyODQuMTVjLTEzLjMzMSAwLjMwMDY5LTI2LjE4NiA3LjM1OC0zMy4zMzYgMTkuNzQyLTcuNjkwMyAxMy4zMi02LjcxMzkgMjkuMjY2IDEuMTU0NSA0MS4zMzEgMC44NTMwNi0yNi41MzIgMjEuMTMyLTQ2LjUxNSA0Ni4zMjQtNDUuMDU0IDguMjU4OSAwLjQ3OTA3IDE2LjA1NCAzLjIwMDEgMjIuODU5IDcuNTkwOC0zLjI1NzgtNy40NDk4LTguODE3MS0xMy45NTMtMTYuMzk0LTE4LjMyNy02LjQ4NjctMy43NDUxLTEzLjYyNS01LjQzOTMtMjAuNjA4LTUuMjgxOHoiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icmVjdDczNzAiCiAgICAgICAgICBkPSJtNDAyLjg4IDMwMC4wOS0xMS41ODEgMTEuNTgxIDEzLjI5NSAxMy4yOTUtMTMuMjk1IDEzLjI4MSAxMS41ODEgMTEuNTgxIDEzLjI4MS0xMy4yOTUgMTMuMjk1IDEzLjI5NSAxMS41ODEtMTEuNTgxLTEzLjI4MS0xMy4yODEgMTMuMjgxLTEzLjI5NS0xMS41ODEtMTEuNTgxLTEzLjI5NSAxMy4yODEtMTMuMjgxLTEzLjI4MXoiCiAgICAgICAgICBzdHlsZT0iZmlsdGVyOnVybCgjZmlsdGVyMTE0MjgpO2ZpbGw6IzFhMWExYSIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDEwNDU3IgogICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgICBkPSJtNDAzLjQ1IDMwMS4xNS0xMS4wODcgMTEuMDg3IDEyLjcyOCAxMi43MjgtMTIuNzI4IDEyLjcxNCAxMS4wODcgMTEuMDg3IDEyLjcxNC0xMi43MjggMTIuNzI4IDEyLjcyOCAxMS4wODctMTEuMDg3LTEyLjcxNC0xMi43MTQgMTIuNzE0LTEyLjcyOC0xMS4wODctMTEuMDg3LTEyLjcyOCAxMi43MTQtMTIuNzE0LTEyLjcxNHoiCiAgICAgIC8+CiAgICA8L2cKICAgID4KICA8L2cKICA+CiAgPG1ldGFkYXRhCiAgICA+CiAgICA8cmRmOlJERgogICAgICA+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgPgogICAgICAgIDxkYzpmb3JtYXQKICAgICAgICAgID5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQKICAgICAgICA+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIKICAgICAgICAvPgogICAgICAgIDxjYzpsaWNlbnNlCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICAvPgogICAgICAgIDxkYzpwdWJsaXNoZXIKICAgICAgICAgID4KICAgICAgICAgIDxjYzpBZ2VudAogICAgICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL29wZW5jbGlwYXJ0Lm9yZy8iCiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPk9wZW5jbGlwYXJ0PC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpwdWJsaXNoZXIKICAgICAgICA+CiAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICA+ZXJyb3IgYnV0dG9uPC9kYzp0aXRsZQogICAgICAgID4KICAgICAgICA8ZGM6ZGF0ZQogICAgICAgICAgPjIwMTEtMDItMjRUMTc6NDU6NDU8L2RjOmRhdGUKICAgICAgICA+CiAgICAgICAgPGRjOmRlc2NyaXB0aW9uCiAgICAgICAgLz4KICAgICAgICA8ZGM6c291cmNlCiAgICAgICAgICA+aHR0cHM6Ly9vcGVuY2xpcGFydC5vcmcvZGV0YWlsLzEyMjQyNS9lcnJvci1idXR0b24tYnktcmljYXJkb21haWE8L2RjOnNvdXJjZQogICAgICAgID4KICAgICAgICA8ZGM6Y3JlYXRvcgogICAgICAgICAgPgogICAgICAgICAgPGNjOkFnZW50CiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPnJpY2FyZG9tYWlhPC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpjcmVhdG9yCiAgICAgICAgPgogICAgICAgIDxkYzpzdWJqZWN0CiAgICAgICAgICA+CiAgICAgICAgICA8cmRmOkJhZwogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+YnV0dG9uPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPmNhbmNlbDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5jaXJjbGU8L3JkZjpsaQogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+ZGVsZXRlPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPnJlZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5yb3VuZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgIDwvcmRmOkJhZwogICAgICAgICAgPgogICAgICAgIDwvZGM6c3ViamVjdAogICAgICAgID4KICAgICAgPC9jYzpXb3JrCiAgICAgID4KICAgICAgPGNjOkxpY2Vuc2UKICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICA+CiAgICAgICAgPGNjOnBlcm1pdHMKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNSZXByb2R1Y3Rpb24iCiAgICAgICAgLz4KICAgICAgICA8Y2M6cGVybWl0cwogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiIKICAgICAgICAvPgogICAgICAgIDxjYzpwZXJtaXRzCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjRGVyaXZhdGl2ZVdvcmtzIgogICAgICAgIC8+CiAgICAgIDwvY2M6TGljZW5zZQogICAgICA+CiAgICA8L3JkZjpSREYKICAgID4KICA8L21ldGFkYXRhCiAgPgo8L3N2Zwo+Cg=="

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
__webpack_require__(20);
__webpack_require__(17);
__webpack_require__(19);
__webpack_require__(14);
__webpack_require__(23);
__webpack_require__(22);
__webpack_require__(16);
__webpack_require__(21);
__webpack_require__(18);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(34);
__webpack_require__(31);
__webpack_require__(30);
__webpack_require__(32);
__webpack_require__(28);
__webpack_require__(35);
__webpack_require__(29);
__webpack_require__(25);
__webpack_require__(33);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(36);

/***/ }),
/* 7 */
/***/ (function(module, exports) {


String.prototype.format  = function () {
  var str = this.toString();
  if (arguments.length) {
    var type = typeof arguments[0]
      , args = type == 'string' || type == 'number' ? Array.prototype.slice.call(arguments) : arguments[0]
    //
    // for (var arg in args) str = str.replace(new RegExp('\\{' + arg + '\\}', 'gi'), args[arg])

    str = str.replace(/\{([^}]*)\}/g,function(a,b){
      return utils.evalInContext(b,args)
    })
  }

  return str
};

utils = {
  extractVariables: function (str) {
    return str.match(/(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*/gi);
  },
  evalInContext: function (js) {
    js = js.replace(/\s+/g, '');


    var keys = [], values = [];

    for (var i = 1; i < arguments.length; i++) {
      keys = keys.concat(Object.keys(arguments[i]));
      for (var j in arguments[i]) {
        values.push(arguments[i][j]);
      }
    }

    //
    //if(_.isCorrectVariableName(js) && keys.indexOf(js) === -1){
    //  keys.push(js);
    //  values.push(undefined);
    //}

    var arr = utils.extractVariables(js);
    //console.log(arr);
    for (var i in arr) {
      if (keys.indexOf(arr[i]) === -1) {
        keys.push(arr[i]);
        values.push(undefined);
      }
    }
    js = "var foo = function(" + keys.join(",") + "){ var __return__value = " + js + " ;return __return__value;}; foo;";
    try {
      var foo = eval(js);
      return foo.apply(this, values);
    } catch (e) {
      return undefined;
    }

  },
  compileElement: function ($item, scope) {

    function _eachSelf(el, selector, foo) {
      el.find(selector).each(foo);
      if (el.is(selector)) {
        foo.call(el[0]);
      }
    }

    //.addBack('selector')
    _eachSelf($item, "[onclick]", function () {
      var onClick = $(this).attr("onclick");
      $(this).removeAttr("onclick");
      $(this).click(function (event) {
        utils.evalInContext(onClick, scope, {event: event});
      })
    })


    _eachSelf($item, "[onchange]", function () {
      var onChange = $(this).attr("onchange");
      $(this).removeAttr("onchange");
      $(this).change(function (event) {
        utils.evalInContext(onChange, scope, {event: event});
      })
    });

    _eachSelf($item, "[dp-checked]", function () {
      var _val = $(this).attr("dp-checked");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("checked", "checked");
      } else {
        $(this).removeAttr("checked");
      }

    });
    _eachSelf($item, "[dp-src]", function () {
      var _val = $(this).attr("dp-src");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("src", val);
      }

    });
    _eachSelf($item, "[dp-if]", function () {
      var _val = $(this).attr("dp-if");
      if (_val === "false") {
        $(this).remove();
      }
      if (_val === "true") {

      } else {
        var val = utils.evalInContext(_val, scope);
        if (!val) {
          $(this).remove();
        }
      }
    });
    _eachSelf($item, "[dp-include]", function () {
      var _el = $(this);
      var _val = _el.attr("dp-include");
      var val = utils.evalInContext(_val, scope);
      _el.load(val);
    });
  },
  parseTemplate: function (tpl, scope) {
    var $item = $(tpl.format(scope));
    _.compileElement($item, scope);
    return $item;
  }
};
module.exports = utils;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var path = __webpack_require__(4);
var util = __webpack_require__(2);
var object = __webpack_require__(1);

function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}


if (isServer()) {
  var fs = __webpack_require__(41);
}


function _load_json (value, callback_success, callback_error){

  var output = null;
  var errors = [];

  if (value.constructor == String) {

    var filename, regex_data, init_property;
    regex_data = /^([^#]*)#?(.*)$/.exec(value);

    filename = regex_data[1];
    init_property = regex_data[2];
    utils.getInlineJson(filename, "json", _loadJson_data, function (error) {
      errors.push(error);
      if (callback_error) {
        callback_error(error)
      } else {
        console.error("file: \"" + filename + "\". " + error.message)
      }
    });
  } else {
    _loadJson_data(value);
  }

  function _loadJson_data(data) {
    /*
     замена записей "url(./path/to/file)  на "../../path/to/file"
     url начинающиеся с ./ относительно родителького json файла

     url с "/" добавляется APP_STATIC_PATH
     */
    utils.recoursive(data,
      function (property, value, parent) {
        if (/^url\(.*\)$/.test(value)) {
          var regex_data = /^url\((\.?\/)?(.*)\)$/.exec(value);
          var url = regex_data[2];

          if (regex_data[1] == "/") {
            url = window.APP_STATIC_PATH + url;
          }
          if (regex_data[1] == "./") {
            url = path.getParentDirectoryUrl(filename) + url;
          }

          parent[property] = path.resolve(url);
        }
      }
    );


    var loader = util.queueLoad(1, function finalize() {

      if (init_property) {
        var prop_arr = init_property.split("/");
        for (var i = 0; i < prop_arr.length; i++) {
          data = data[prop_arr[i]];
        }
      }

      if (errors.length) {
        if (callback_error) callback_error(errors);
      } else {
        if (callback_success) callback_success(data);
        output = data;
      }
    });

    /**
     * remove comments
     */
    utils.recoursive(data, function (property, value, parent) {
      /*
       remove comments like
       ["@comment()"]
       "@comment": {}
       */
      if (/^\/\/.*$/.test(value) || /^@comment\(.*\)$/.test(value) || property == "@comment") {
        if (parent.constructor == Array) {
          parent.splice(property, 1);
        } else {
          delete parent[property];
        }
      } else if (/^@extend.*$/.test(property)) {

        loader.total++;
        _load_json(value, function (data) {
          var ext_data = object.deepExtend(data, parent);
          object.deepExtend(parent, ext_data);
          delete parent["@extend"];
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@extend\(.*\)$/.test(value)) {
        var _reg_data = /^@extend\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@mixin\(.*\)$/.test(value)) {
        var _reg_data = /^@mixin\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          if (parent.constructor == Array) {
            parent.splice(property, 1);
            for (var i in data) {
              parent.push(data[i])
            }
          } else {
            delete parent[property];
            for (var i in data) {
              parent[i] = data[i];
            }
          }
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@load\((.*)\)$/.test(value)) {
        var _reg_data = /^@load\((\.?\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1] == "/") {
          url = window.APP_STATIC_PATH + url;
        }
        if (_reg_data[1] == "./") {
          url = path.getParentDirectoryUrl(filename) + url;
        }

        loader.total++;
        utils.getInlineJson(url, "html", function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      }

    });
    loader();

  }

  return output;
}

var utils = {
  CACHED_JSON : {},
  loadJsonSync: function(src){
    var data;
    _load_json(src,function(_data){
      data = _data;
    });
    return data;
  },

  /**
   позволяет использовать конструкции вида
   расширить данные из файла template.json
   "@extend" : "url(data/template.json)",
   "@extend" : "url(data/template.json#settings/stages)",

   //заменить строку наданные из файла
   "stages":       "url(data/template.json#settings/stages)",

   * @param filename
   * @param callback_success
   * @param callback_error
   */
  loadJson: function (value,resolve_cb,fail_cb) {
      return _load_json(value,function(data){
        resolve_cb && resolve_cb(data);
      },function(err){
        fail_cb && fail_cb(err);
      });
  },

  removeComments: function (str) {
    str = str.replace(/^\s*(\/\/.*|(?:\/\*[\s\S]*?)\*\/\s*)$/gm,"");
    return str;
  },
  /**
   *
   * @param object
   * @param criteria - выполнять функцию со всеми объектами
   */
  recoursive: function (object, criteria) {
    var readed = [];
    if (!object) return;
    return (function sub_recoursive(object) {
      if (readed.indexOf(object) != -1) {
        return;
      }
      readed.push(object);


      if (object instanceof Array) {
        for (var prop = object.length; prop--;) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      } else {
        for (var prop in object) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      }
    })(object);
  },

  parseCSV: function (data) {
    var rows = data.split(/\n/);
    var columns = rows[0].split(',');
    rows.splice(0, 1);

    for (var i = 0; i < rows.length; i++) {
      var output_row_data = {};
      var row_data = [];


      var _quote = false, last = -1;
      var j = -1;
      var str = rows[i];
      while (++j < str.length) {
        if (!_quote) {
          if (str[j] == '\'' || str[j] == '\"') {
            _quote = str[j];
          }
          if (str[j] == ",") {
            var _val = str.substring(last, j);
            if (_val[0] == '\"' && _val[_val.length - 1] == '\"') {
              _val = _val.substring(1, _val.length - 1);
            }
            row_data.push(_val);
            last = j + 1;
          }
        } else {
          if (str[j] == _quote) {
            _quote = false;
          }
        }
      }

      for (var j in row_data) {
        output_row_data[columns[j]] = row_data[j];
      }
      rows[i] = output_row_data;
    }
    return rows;
  },
  parseData: function (data, dataType) {
    var _parsed;
    if (dataType == "csv") {
      _parsed = utils.parseCSV(data);
    } else if (dataType == "json") {
      _parsed = data.trim();
      //if (data[0] != "{" && data[0] != "[") {
      //  return false;
      //}

      _parsed = utils.removeComments(_parsed);
      //data  = data.replace(/\n/g,"")

      try{
        var _parsed = JSON.parse(_parsed);//= JSON.parse(data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,""));
      }catch(e){
        return {
          status: "error",
          message: e.toString(),
          data:  data
        };
      }
      //var script = $("<script type='text/json' id='" + url + "'>" + JSON.stringify(data) + "</script>");
    }
    return {
      status: "success",
      data: _parsed
    };
  },
  load: function (url, dataType, callback_success, callback_error) {
    //todo
    if (isServer()) {
      try {
        var data = fs.readFileSync(url, 'utf8');
        data = data.replace(/^\uFEFF/, '');
        var _parsed = utils.parseData(data, dataType);
        if(_parsed.status == "error"){
          callback_error({
            status:   "error",
            message:  _parsed.message,
            data:     _parsed.data
          });
          return;
        }
        callback_success(_parsed.data);
      } catch (e) {

        if (e.code === 'ENOENT') {
          console.log('File not found!');
        } else {
          throw e;
        }
        callback_error(data);
      }
    } else {

      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            var data = httpRequest.responseText;
            var _parsed = utils.parseData(data, dataType);
            if(_parsed.status == "error"){
              callback_error({
                status: httpRequest.status,
                message:  _parsed.message,
                response: httpRequest.responseText
              });
              return;
            }
            callback_success(_parsed.data);
          } else {
            callback_error(url, httpRequest)
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
    }
  },
  /**
   * Позволяетзагружать json файлы , содержащие ссылки на другие json файлы.
   * вместо ссылок типа
   *  "property" : "url(chunk.json)"
   *  будет загружено содержимое файла
   *  "property" : {...}
   *
   *  если указать якорь
   *  "property" : "url(chunk.json#settings/chunk/0/text)"
   *
   * то будет загружено содержимое поля settings.chunk[0].text из файла chunk.json
   *
   *
   * @param filename  путь к основному json файлу
   * @param callback  будет вызван после окончания загрузки всех файлов
   */
  getInlineJson: function (url, dataType, callback_success, callback_error) {

    if (dataType.constructor != String) {
      callback_error = callback_success;
      callback_success = dataType;
      dataType = "json";
    }


    if (typeof utils.CACHED_JSON !== "undefined" && utils.CACHED_JSON && utils.CACHED_JSON[url]) {
      callback_success(utils.CACHED_JSON[url]);
      return;
    }
    if (typeof $ !== "undefined") {
      if (typeof document !== "undefined") {
        var inline = $("script[id='" + url + "']");
        if (inline.length > 0) {
          var _data =
            inline[0].innerText || //all
            inline[0].textContent || //firefox
            inline[0].text; //ie8
          if (dataType == "json") {

            var _data = utils.removeComments(_data);
            callback_success(JSON.parse(_data));
          } else {
            callback_success(_data);
          }
          return;
        }
      }
    }
    utils.load(url, dataType, callback_success, callback_error);
  }
};

module.exports = utils;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof _ === 'undefined' && typeof exports !== 'undefined') {
  _ = __webpack_require__(3);
  module.exports = _;
}

module.exports = {

  loadScript: function (requirement, helper, error) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = error;
    script.onreadystatechange = function () {
      if (this.readyState == 'complete') {
        helper(script, __src);
      }
    };
    script.addEventListener("load", helper, true);
    script.src = requirement;
    head.appendChild(script);
  },
  scriptURL: function () {

    if (document.currentScript) {
      return document.currentScript.src;
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i--;) {
      if (scripts[i].src) {
        return scripts[i].src;
      }
    }
    return false;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScxODhweCcgaGVpZ2h0PScxODhweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpbiI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9Im5vbmUiIGNsYXNzPSJiayI+PC9yZWN0PjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjBzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwcyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjEycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC4xMnMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDkwKSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjY2ZmZmRmIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC4yNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuMjVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgxMzUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjM3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC4zN3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE4MCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDIyNSkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuNjJzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjYycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMjcwKSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjY2ZmZmRmIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC43NXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgzMTUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjg3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC44N3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjwvZz48L3N2Zz4="

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
  function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
  function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
  function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
  function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
  function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,d){setTimeout(d,b.f)});Promise.race([e,d]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
    P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
  function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
  W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
  function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
    n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
  sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+
    d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
  function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
  var Aa={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},
    Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
    g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Z}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
 * Точка запуска приложенич
 */
fabric.Application = function(options) {
  this.init(options);
};

fabric.Application.prototype = fabric.util.object.extend({},fabric.Observable,fabric.PluginsMixin,{
  init: function(options){

    options = options || {};
    this.options =  fabric.util.object.clone(options);
    if(this.options.callback){
      this.callback = this.options.callback;
      delete this.options.callback;
    }
    if(this.options.initialize){
      this.initialize = this.options.initialize;
    }

    if(this.options.prototypes){
      fabric.util.object.deepExtend(this.prototypes, this.options.prototypes);
      delete this.options.prototypes;
    }

    if(this.options.plugins){
      fabric.util.object.extend(this.plugins, this.options.plugins);
      delete this.options.plugins;
    }

    if(this.options.canvasContainer){
      this.canvasContainer = this.options.canvasContainer;
      delete this.options.canvasContainer;
    }

    this.initEventListeners();

    if(this.options.loaderTemplate){
      this.setLoaderTemplate(this.loaderTemplate || this.options.loaderTemplate);
    }

    if(this.options.credentials || this.credentials){
      this.printBanner();
    }

    this.fire("loading:begin",{});

    $( document ).ready(function(){
      fabric.util.order([
        this.runPlugins.bind(this,"preloaders"),
        this.preloader,
        this.loadConfiguration,
        this.runPlugins.bind(this,"configuration"),
        this.createApp,
        this.initialize,
        // this.loadSlide,
        this.runPlugins.bind(this,"postloaders"),
        this.onApplicationCreated,
        this.postloader,
        this.callback && function(){
          setTimeout(this.callback.bind(this),0)
        }
      ],this)
    }.bind(this))

  },
  credentials: false,
  ready : false,
  onApplicationCreated: function(){
    this.ready = true;
    this.fire("loading:end",{});
  },
  canvasClass: 'Canvas',
  resizable: false,
  history: true,
  /**
   * functions will be called on different application creation stages
   */
  plugins: {
    preloaders: [],
    configuration: [],
    canvas: [],
    postloaders: []
  },
  printBanner: function(){
    if(this.credentials){
      console.info("%cFiera Canvas Editor%c by %cDenis Ponomarev%c %c%6$s%c / %c%9$s%c", "color: #ffa500", "color: #202020", "color: #2EC06C", "color: #202020", "color: #337ab7", "www.hometlt.ru", "color: #202020", "color: #337ab7", "ponomarevtlt@gmail.com", "color: #202020");
    }
  },
  eventListeners: {
    "canvas:created": function(){

      if(this.options.onResize){
        this.onResize = this.options.onResize;
        delete this.options.onResize;
      }
      if(this.options.resizable){
        this.resizable = this.options.resizable;
        delete this.options.resizable;
      }
      if (this.resizable) {
        this.setResizable(this.canvas);
      }
    },
    "entity:created": []
  },
  onSlideLoaded: function () {},
  onCanvasCreated: function () {},
  callback: function () {},
  loadConfiguration: function (resolve,error) {
    if(!this.options.configuration){
      return resolve();
    }
    var _app = this;
    fabric.util.promise
      .map(
        this.options.configuration,
        function(value){
          return new Promise(function(resolve,fail) {
            fabric.util.data.loadJson(value,resolve,fail);
          });
        }
      )
      .then(function(results){
        fabric.util.object.extend(_app,results)
      })
      .then(resolve,error);
  },
  setCanvasContainer: function (id) {
    if(this._appCreated){
      this.createCanvas(this.canvasContainer, this.canvas);
      this.project.setCanvas(this.canvas);
    }else{
      this.canvasContainer = id;
    }
  },
  createApp: function (callback) {

    fabric.util.object.extend(this, this.options);
    this.createCanvas();
    // this.runPlugins.bind(this,"canvas"),

    var _canvas = this.canvas;


    if (this.project) {
      var _project = this.project;

      this.project = new fabric.Project({application: this});
      this.fire("project:changed");

      _canvas && this.project.setCanvas(_canvas);

      if (_project !== true) {
        this.project.load(_project);
      }
    }

    this.fire("created", {canvas: _canvas , project : this.project});
    callback();
  },
  createCanvas: function () {
    if(this.canvasContainer){

      if (this.canvasContainer.constructor == String) {
        var el = document.getElementById(this.canvasContainer);
      } else {
        el = this.canvasContainer;
      }
      this.canvas = new fabric[this.canvasClass](el, {application: this});
    }else{
      this.canvas = new fabric[this.canvasClass]({application: this});
    }

    // if(_canvas_options){
    //   this.canvas.load(_canvas_options);
    // }
    this.fire("canvas:created");
    this.onCanvasCreated();
  },
  dispose: function(){
    this.canvas.dispose();
  },
  setResizable: function(canvas){
    canvas = canvas || this.canvas;

    if (!canvas.virtual) {
      canvas.onResize = function () {
        var _parent = $(this.wrapperEl.parentNode);

        var _offset = $(this.wrapperEl).position();
        var _margin  = this.application.widthMargin || 0;
        var _w =  _parent.width() - _margin, _h = _parent.height();
        if (this.application.onResize) {
          this.application.onResize({
            width: _w ,
            height: _h
          }, {
            width: this.originalWidth ,
            height: this.originalHeight
          });
          this.calcOffset();
        } else {
          this.setDimensions({
            width: _w - _offset.left  - _margin,
            height: _h - _offset.top
          });
        }
      }
      canvas.onResize();
    }
  }
});

fabric.Application.addPlugin = fabric.PluginsMixin.addPlugin.bind(fabric.Application);

fabric.app = function(options){
  return new fabric.Application(options);
};


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {


if(!Object.values){
  Object.defineProperty(Object, 'values', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(_object) {
      var _values = [];
      Object.keys(_object).forEach(function (key) {
        _values.push(_object[key]);
        // use val
      });
      return _values;
    }
  });
}


fabric.util.object.extend(fabric,{
  errors: []
});

fabric.util.order = function(_array,context ){
  (function _call(){
    if(!_array.length)return;
    var foo = _array.shift();
    if(foo){
      if(foo.length){
        foo.call(context,_call);
      }else{
        foo.call(context);
        _call();
      }
    }else{
      _call();
    }
  })()
};

fabric.util.promise = {
  map: function (data, foo) {

    if(data.constructor == Array){
      return Promise.all(data.map(foo))
        .then(function (results, error) {
          if (error) {
            return Promise.reject(error);
          }
          return Promise.resolve(results);
        })
    }

    var keys = Object.keys(data);
    var urls = Object.values(data);
    return Promise.all(urls.map(foo))
      .then(function (results, error) {
        if (error) {
          return Promise.reject(error);
        }
        var _map = {};

        for(var i = 0 ; i < results.length; i++){
          _map[keys[i]] = results[i];
        }
        return Promise.resolve(_map);
      })
  },
  wrap: function (context) {
    return function wrap(foo) {
      return function () {
        var options = Array.prototype.slice.call(arguments,1);
        if (!foo.length) {
          return new Promise(function (resolve, fail) {
            var _result = foo.call(context);
            (_result || _result === undefined) ? resolve() : fail();
          });
        } else {
          return new Promise(foo.bind(context));
        }
      }
    }
  }
};



fabric.Object.prototype.set = function(key, value) {
  if (typeof key === 'object') {
    this._setObject(key, value);
  }
  else {
    if (typeof value === 'function' && key !== 'clipTo') {
      this._set(key, value(this.get(key)));
    }
    else {
      this._set(key, value);
    }
  }
  return this;
};

fabric.Object.prototype._setObject = function(options,callback) {
  var keys = Object.keys(options);
  if(this.optionsOrder){
    for(var i = this.optionsOrder.length; i--;){
      var prop = this.optionsOrder[i];
      var ii = keys.indexOf(prop);
      if(ii != -1){
        keys.splice(ii, 1);
        keys.unshift(prop);
      }
    }
  }
  for (var i = 0; i < keys.length; i++) {
    var prop = keys[i];
    if(typeof options[prop] == "function"){
      keys.splice(i, 1);
      keys.unshift(prop);
    }
  }
  var queue;
  for (var i in keys) {
    var _key = keys[i];
    if(options[_key] === undefined || options[_key] === null)continue;
    var _fooName = "set" + fabric.util.string.capitalize(_key, true);
    if(this[_fooName] && this[_fooName].name && this[_fooName].name != "anonymous"){
      if(this[_fooName].length == 2){
        if(!queue){
          queue = fabric.util.queueLoad(2,callback);
        }else{
          queue.total ++;
        }
        this[_fooName](options[_key],function(_key){
          queue();
        }.bind(this,_key));
      }else{
        this[_fooName](options[_key])
      }
    } else {
      this.__set(_key, options[_key]);
    }
  }
  if(queue){
    queue()
  }else if(callback ){
    callback();
  }
};

var _get_pointer_overwritten = fabric.Canvas.prototype.getPointer;

fabric.util.object.extend(fabric.Canvas.prototype, {
  setWidth: function (value) {
    return this.setDimensions({ width: value }, {});
  },
  setHeight: function (value) {
    return this.setDimensions({ height: value }, {});
  },
  /**
   * @private
   */

  _setObject: fabric.Object.prototype._setObject,
  originalState: {},
  stateProperties: [],
  specialProperties: ["backgroundImage","objects"],
  editingObject: null,
  getObjectByID: function(_id){
    var layers = this.layers || [{objects: this._objects}];
    for (var i in layers) {
      for (var j in layers[i].objects) {
        if (layers[i].objects[j].id === _id) {
          return layers[i].objects[j];
        }
      }
    }
    return null;
  },
  /*
   Add Custom Object Tranformations
   */
  getPointer: function (e, ignoreZoom, upperCanvasEl) {
    var pointer = _get_pointer_overwritten.call(this, e, ignoreZoom, upperCanvasEl);
    if (e._group) {
      return this._normalizePointer(e._group, pointer);
    }
    return pointer;
  },
  __set : fabric.Object.prototype._set,
  getModifiedStates: function (target) {
    var states = {
      original: {},
      modified: {}
    };
    for (var prop in target.originalState) {
      if (target.originalState[prop] !== target[prop]) {
        if(target.originalState[prop] instanceof Object){
          if(JSON.stringify(target.originalState[prop]) == JSON.stringify(target[prop])){
            continue;
          }
        }
        states.original[prop] = target.originalState[prop];
        states.modified[prop] = target[prop];
      }
    }
    return states;
  },
  fireModifiedIfChanged: function (target) {
    if (this.stateful) {
      var _states = target.hasStateChanged();
      if(_states){
        this.fire('object:modified', {target: target , states: _states});
        target.fire('modified',{states: _states});
      }
    }
  },
  _set: function (key, value,callback) {
    if (this.specialProperties.indexOf(key) !== -1) {
      this["set" + fabric.util.string.capitalize(key, true)](value,callback);
    } else {
      fabric.Object.prototype._set.call(this, key, value);
    }
    return this;
  },
  get: fabric.Object.prototype.get,
  set: fabric.Object.prototype.set,
  hasStateChanged: fabric.Object.prototype.hasStateChanged,
  /** Creates a bottom canvas
   * @private
   * @param {HTMLElement} [canvasEl]
   */
  _createLowerCanvas: function (canvasEl) {
    if (typeof canvasEl == "string") {
      this.lowerCanvasEl = fabric.util.getById(canvasEl) || this._createCanvasElement();
    } else if (canvasEl) {
      this.lowerCanvasEl = canvasEl;
    } else {
      this.virtual = true;
      this.lowerCanvasEl = fabric.util.createCanvasElement();
    }

    this._initCanvasElement(this.lowerCanvasEl);

    fabric.util.addClass(this.lowerCanvasEl, 'lower-canvas');

    if (this.interactive) {
      this._applyCanvasStyle(this.lowerCanvasEl);
    }

    this.contextContainer = this.lowerCanvasEl.getContext('2d');
  },
  findTarget: function (e, skipGroup) {
    if (this.skipTargetFind) {
      return;
    }

    var ignoreZoom = true,
      pointer = this.getPointer(e, ignoreZoom),
      activeGroup = this.getActiveGroup(),
      activeObject = this.getActiveObject();
    if (activeGroup && !skipGroup && this._checkTarget(pointer, activeGroup)) {
      return activeGroup;
    }

    if (activeObject && this._checkTarget(pointer, activeObject)) {
      //added visceroid
      this._fireOverOutEvents(activeObject, e);
      return activeObject;
    }

    this.targets = [ ];

    var target = this._searchPossibleTargets(this._objects, pointer);
    this._fireOverOutEvents(target, e);
    return target;
  }
});

fabric.util.object.extend(fabric.Object.prototype, {
  setAngle: function(angle) {
    this.angle = angle;
  },
  __set : fabric.Object.prototype._set,
  get : fabric.Object.prototype.get,
  _set: function (key, value ,callback) {
    var _fooName = "set" + fabric.util.string.capitalize(key, true);
    if(this[_fooName]  && this[_fooName].name && this[_fooName].name != "anonymous"){
      // if (this.specialProperties.indexOf(key) !== -1) {
      // if(this[_fooName]){
      this[_fooName](value,callback);
    }else{
      this.__set(key, value);
    }
    return this;
  },
  disable: function () {
    this.set({
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true
    });
  },
  stored: true,
  /**
   * Saves state of an object
   * @param {Object} [options] Object with additional `stateProperties` array to include when saving state
   * @return {fabric.Object} thisArg
   */
  saveState: function(options) {
    this.stateProperties.forEach(function(prop) {
      var _val = this.get(prop);
      if(_val instanceof Object){
        this.originalState[prop] = fabric.util.object.cloneDeep(_val);
      }else{
        this.originalState[prop] = _val;
      }
    }, this);

    if (options && options.stateProperties) {
      options.stateProperties.forEach(function(prop) {
        this.originalState[prop] = this.get(prop);
      }, this);
    }
    return this;
  },
  hasStateChanged: function() {
    var modified = 0;
    var states = {
      original: {},
      modified: {}
    };
    for (var prop in this.originalState) {
      if (this.originalState[prop] !== this[prop]) {
        if(this.originalState[prop] instanceof Object){
          if(JSON.stringify(this.originalState[prop]) == JSON.stringify(this[prop])){
            continue;
          }
        }
        states.original[prop] = this.originalState[prop];
        states.modified[prop] = this[prop];
        modified++;
      }
    }
    return modified && states;
  }
});

fabric.util.getProportions = function (photo, container, mode) {
  mode = mode || 'fit';
  var _w = photo.naturalWidth || photo.width;
  var _h = photo.naturalHeight || photo.height;
  if (!container.height && !container.width) {
    return {
      scale: 1,
      width: _w,
      height: _h
    };
  }
  if (!photo.height && !photo.width) {
    return {
      scale: 0.001,
      width: container.width,
      height: container.height
    };
  }

  // var _asp = _w / _h, _c_asp = container.width / container.height;

  // if (_asp > _c_asp) {
  //   _h = container.height;
  //   _w = _h * _asp;
  //
  // } else {
  //   _w = container.width;
  //   _h = _w / _asp;
  // }
  // var scaleX = container.width / _w;
  // var scaleY = container.height / _h;
  var scaleX = container.width && container.width / _w || 999;
  var scaleY = container.height && container.height / _h || 999;

  var scale;
  if (mode === 'cover') {
    scale = Math.max(scaleX, scaleY);
  }
  if (mode === 'fit') {
    scale = Math.min(scaleX, scaleY);
  }
  if (mode === 'center') {
    scale = 1;
  }
  return {
    scale: scale,
    width: Math.floor(_w * scale),
    height: Math.floor(_h * scale)
  };
};

fabric.util.Utf8ArrayToStr = function(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c);
      break;
      case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
};

fabric.util.createObject = function (type, options, callback) {
  if(typeof type !== "string"){
    callback = options;
    options = type;
    type = null;
  }else{
    options.type = type;
  }
  var app = options.application;
  app && app.fire("entity:load",{options: options});

  var _klassName = fabric.util.string.camelize(fabric.util.string.capitalize(type || options.type || app.prototypes.Object.type,true));
  var _klass = fabric[_klassName] || app.klasses[_klassName];


  if(!_klass){
    console.error(_klassName + " is undefined");
    return callback(new fabric.Rect(options))
  }

  var el = _klass.fromObject(options, function (el) {
    callback && callback(el);
    callback = null;
  });
  if (el) {
    callback && callback(el);
    callback = null;
  }
  return el;
};

fabric.util.dataURItoBlob = function (dataURI, dataTYPE) {
  var binary = atob(dataURI.split(',')[1]), array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: dataTYPE});
};

fabric.util.blobToDataURL = function (blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
};

fabric.util.createCanvasElementWithSize = function (size) {
  var canvas = fabric.util.createCanvasElement();
  canvas.width = size.width;
  canvas.height = size.height;
  return canvas;
};

fabric.util.string.toDashed = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

fabric.util.string.uncapitalize = function(string){
  return string.charAt(0).toLowerCase() +
    (string.slice(1));
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.Application.prototype.eventListeners["entity:created"].push(function(e){
    if(e.target.eventListeners){
      for(var i in e.target.eventListeners) {
        var _listeners = e.target.eventListeners[i];
        if(_listeners.constructor == Array){
          for (var j in _listeners) {
            e.target.on(i, _listeners[j]);
          }
        }else{
          e.target.on(i, _listeners);
        }
      }
    }

    if(e.options.eventListeners){
      for(var i in e.options.eventListeners){
        e.target.on(i,e.options.eventListeners[i]);
      }
    }
    delete e.options.eventListeners;

  if(e.target._default_event_listeners){
    for(var i in e.target._default_event_listeners){
      e.target.on(i,e.target._default_event_listeners[i]);
    }
  }
});


fabric.util.object.extend(fabric.Application.prototype, {
  initEventListeners: function(){
    if(!this.__eventListeners){
      this.__eventListeners = {};
    }
    for (var event in this.eventListeners) {
      if(!this.__eventListeners[event]){
        this.__eventListeners[event] = []
      }
      this.__eventListeners[event] = this.__eventListeners[event].concat (this.eventListeners[event]);
    }

    if(this.options.eventListeners){
      this.on(this.options.eventListeners);
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


var _bindEvents = fabric.Canvas.prototype._bindEvents;
var _onMouseDown_overwritten = fabric.Canvas.prototype._onMouseDown;
var _onMouseUp_overwritten = fabric.Canvas.prototype._onMouseUp;
var _initEventListeners_overwritten = fabric.Canvas.prototype._initEventListeners;
var removeListeners_overwritten = fabric.Canvas.prototype.removeListeners;

fabric.util.object.extend(fabric.Canvas.prototype, {
  tapholdThreshold: 2000,
  _bindEvents: function () {
    _bindEvents.call(this);
    this._onClick = this._onClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onTapHold = this._onTapHold.bind(this);
  },

  _onDoubleClick: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:dblclick', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('dblclick', {
        e: e
      });
    }
  },

  _onDrop: function (e) {
    var _zoom = this.getZoom();
    e.x /= _zoom;
    e.y /= _zoom;
    e.offsetX /= _zoom;
    e.offsetY /= _zoom;
    e.width = e.helper.width() / _zoom;
    e.height = e.helper.height() / _zoom;
    var self = this;
    e.target = self.findTarget(e.originalEvent);

    self.fire('mouse:drop', e);

    if (e.target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      e.target.fire('object:drop', e);
    }
  },

  _onDragMove: function (e) {
    var self = this;

    var target = self.findTarget(e.originalEvent);
    self.fire('mouse:dragmove', {
      target: target,
      e: e,
      data: e.data
    });
    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('object:dragmove', {
        e: e,
        data: e.data
      });
    }
    if (this._last_target == target)return;
    if (this._last_target) {
      self.fire('mouse:dragleave', {
        target: this._last_target,
        e: e,
        data: e.data
      });
      this._last_target.fire('object:dragleave', {
        e: e,
        data: e.data
      });
      this._last_target = false;
    }
    if (target) {

      self.fire('mouse:dragenter', {
        target: target,
        e: e,
        data: e.data
      });
      target.fire('object:dragenter', {
        e: e,
        data: e.data
      });

      this._last_target = target;
    }

  },

  _onClick: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:click', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      if (
        target.originalState.left == target.left &&
        target.originalState.top == target.top &&
        target.originalState.scaleX == target.scaleX &&
        target.originalState.scaleY == target.scaleY &&
        target.originalState.angle == target.angle
      ) {
        // To unify the behavior, the object's double click event does not fire on drawing mode.
        target.fire('object:click', {
          e: e
        });
      }
    }
  },

  _onTapHold: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:taphold', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's tap hold event does not fire on drawing mode.
      target.fire('taphold', {
        e: e
      });
    }

    if (e.type === 'touchend' && self.touchStartTimer != null) {
      clearTimeout(self.touchStartTimer);
    }
  },

  _onMouseDown: function (e) {
    _onMouseDown_overwritten.call(this, e);
    var self = this;
    if (e.type === 'touchstart') {
      var touchStartTimer = setTimeout(function () {
        self._onTapHold(e);
        self.isLongTap = true;
      }, self.tapholdThreshold);
      self.touchStartTimer = touchStartTimer;
      return;
    }

    // Add right click support
    if (e.which === 3) {
      var target = this.findTarget(e);
      self.fire('mouse:down', {target: target, e: e});
      if (target && !self.isDrawingMode) {
        // To unify the behavior, the object's mouse down event does not fire on drawing mode.
        target.fire('mousedown', {
          e: e
        });
      }
    }
  },

  _onMouseUp: function (e) {

    _onMouseUp_overwritten.call(this, e);

    if (e.type === 'touchend') {
      // Process tap hold.
      if (this.touchStartTimer != null) {
        clearTimeout(this.touchStartTimer);
      }
      // Process long tap.
      if (this.isLongTap) {
        this._onLongTapEnd(e);
        this.isLongTap = false;
      }
      // Process double click
      var now = new Date().getTime();
      var lastTouch = this.lastTouch || now + 1;
      var delta = now - lastTouch;
      if (delta < 300 && delta > 0) {
        // After we detct a doubletap, start over
        this.lastTouch = null;

        this._onDoubleTap(e);
      } else {
        this.lastTouch = now;
      }
    }
  },

  _onDoubleTap: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:doubletap', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double tap event does not fire on drawing mode.
      target.fire('object:doubletap', {
        e: e
      });
    }
  },

  _onLongTapEnd: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:longtapend', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's long tap end event does not fire on drawing mode.
      target.fire('object:longtapend', {
        e: e
      });
    }
  },

  _initEventListeners: function () {
    var self = this;
    _initEventListeners_overwritten.call(self);

    fabric.util.addListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.addListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);

    self.on('object:scaling', function (e) {
      if (e.target && e.target._scaling_events_enabled) {
        e.target.fire("scaling", e.e);
      }
    });
    self.on('object:selected', function (e) {
      if (e.target) {
        e.target.fire("object:selected", e.e);
      }
    });
    self.on('mouse:over', function (e) {
      if (e.target) {
        e.target.fire("mouse:over", e.e);
      }
    });

    self.on('mouse:out', function (e) {
      if (e.target) {
        e.target.fire("mouse:out", e.e);
      }
    });

  },

  removeListeners: function () {
    var self = this;
    removeListeners_overwritten.call(self);


    fabric.util.removeListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.removeListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var isVML = function() { return typeof G_vmlCanvasManager !== 'undefined'; };

delete fabric.Rect.prototype.toObject;
fabric.Rect.prototype.storeProperties = ["*","rx","ry"];

fabric.INCLUDE_ALL = "*";

var _toObject_overwritten = fabric.Object.prototype.toObject;
fabric.util.object.extend(fabric.Object.prototype, {
  eventListeners: {},
  toObject: function (propertiesToInclude) {
    if (propertiesToInclude == fabric.INCLUDE_ALL) {
      propertiesToInclude = [fabric.INCLUDE_ALL];
    }

    propertiesToInclude = propertiesToInclude || [];
    propertiesToInclude = propertiesToInclude.concat(this.storeProperties);


    var obj = _toObject_overwritten.call(this, propertiesToInclude);
    if (propertiesToInclude[0] !== fabric.INCLUDE_ALL) {
      if (!this.includeDefaultValues) {
        this._removeDefaultValues(obj);
      }
    }

    if (this.storeProperties.indexOf("*") == -1) {
      for (var i in obj) {
        if (this.storeProperties.indexOf(i) == -1) {
          delete obj[i];
        }
      }
    }

    this.fire("before:object", {object: obj});
    return obj;
  },
  storeProperties: ['*'],
  optionsOrder: ["specialProperties"],

  /**
   * Sets object's properties from options
   * @param {Object} [options] Options object
   */
  setOptions: function (options) {
    this._setObject(options);
    // this._initGradient(options);
    // this._initPattern(options);
    // this._initClipping(options);
  },
  _initEntity: function (options) {
    options.application && options.application.fire("entity:created", {target: this, options: options});
  },
  initialize: function (options, callback) {
    options = options || {};
    this._initEntity(options);
    // if(options.wholeCoordinates){
    //   var coordinates = ["left","top","width","height"];
    //   for(var i in coordinates){
    //     if(options[coordinates[i]]){
    //       options[coordinates[i]] = Math.round(options[coordinates[i]]);
    //     }
    //   }
    // }
    var _self = this;
    this._setObject(options, function () {
      _self.loaded = true;
      _self.fire("loaded");
      callback && callback(_self);
    });
  },
  add: function (canvas) {
    canvas.add(this);
  },
  set: function (key, value) {
    if (typeof key === 'object') {
      this._setObject(key);
    }
    else {
      if (key[0] == "&") {
        key = key.substr(1);
        this._set(key, value(this.get(key)));
      }
      else {
        this._set(key, value);
      }
    }
    return this;
  },

});



//images
(function(){

  fabric.util.object.extend(fabric.Image.prototype, {
    async: true,
    toObjectNative: fabric.Image.prototype.toObject,
    toObject:     function(){
      var obj = fabric.Image.prototype.toObjectNative.apply(this,arguments);
      if(obj.src.indexOf(fabric.util.mediaRoot) == 0){
        obj.src = obj.src.replace(fabric.util.mediaRoot,"");
      }
      return obj;
    },
    initialize: function (element, options, callback) {
      options || (options = {});
      this.filters = [];
      this.resizeFilters = [];


      if (options.originalSrc) {
        this._edited = true;
        fabric.util.loadImage(options.originalSrc, function (img) {
          this._originalElement = img;
        }.bind(this));
      }

      this._initElement(element, options, callback && function () {
          fabric.Object.prototype.initialize.call(this, options, callback);
        }.bind(this));//adding callback
    },
    _initElement: function (element, options, callback) {
      this.setElement(fabric.util.getById(element), callback, options);
      fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS);
    },
    /**
     * Sets crossOrigin value (on an instance and corresponding image element)
     * @return {fabric.Image} thisArg
     * @chainable
     */
    setCrossOrigin: function (value) {
      this.crossOrigin = value;
      if (this._element) {
        this._element.crossOrigin = value;
      }
      return this;
    },
    setElement: function (element, callback, options) {

      var _callback, _this;

      this._element = element;
      this._originalElement = element;
      this._initConfig(options);
      // this.setOptions(options );
      // this._setWidthHeight(this);
      // if (this._element && this.crossOrigin) {
      //   this._element.crossOrigin = this.crossOrigin;
      // }


      if (this.resizeFilters.length === 0) {
        _callback = callback;
      }
      else {
        _this = this;
        _callback = function () {
          _this.applyFilters(callback, _this.resizeFilters, _this._filteredEl || _this._originalElement, true);
        };
      }

      if (this.filters.length !== 0) {
        this.applyFilters(_callback);
      }
      else if (_callback) {
        _callback(this);
      }

      return this;
    }
  });

  fabric.util.initFilters = function (img, object, callback) {

    // if (fabric.version >= 1.6) {
    fabric.Image.prototype._initFilters.call(object, object.filters, function (filters) {
      object.filters = filters || [];
      fabric.Image.prototype._initFilters.call(object, object.resizeFilters, function (resizeFilters) {
        object.resizeFilters = resizeFilters || [];
        callback(img, object);
      });
    });
    // } else {
    //   fabric.Image.prototype._initFilters.call(object, object, function (filters) {
    //     object.filters = filters || [];
    //     callback(img, object);
    //   });
    // }
  };

  fabric.util.initImageAndFilters = function (object, callback) {
    if (object.src) {
      fabric.util.loadImage(object.src, function (img) {
        delete object.src;
        fabric.util.initFilters(img, object, callback);
      }, null, object.crossOrigin);
    } else {
      fabric.util.initFilters(null, object, callback);
    }
  };

  fabric.Image.fromObject = function (object, callback) {
    fabric.util.initImageAndFilters(object, function (img, object) {
      var instance = new fabric.Image(img, object, callback);
    })
  };


  fabric.Image.prototype._to_object_overwritten = fabric.Image.prototype.toObject;
  fabric.Image.prototype.toObject = function (opt) {
    var obj = fabric.Image.prototype._to_object_overwritten.call(this, opt);


    if (this._edited) {
      obj.originalSrc = this._original_src || this._originalElement.src || this._element.src;
      obj.src = this._element.src;
    } else {
      obj.src = this._original_src || this._originalElement.src || this._element.src;
    }
    if (this.contentOffsets) {
      obj.contentOffsets = this.contentOffsets;
    }


    if (!this.includeDefaultValues) {
      if (!obj.filters.length)delete obj.filters;
    }
    //if(this._originalElement){
    //    obj.thumb = this._element.src;
    //}

    return obj;
  };

})();

(function(){

  //fabric.require('SlideText', ['SlideObject'], function () {
  var textInitialize = fabric.Text.prototype.initialize;

  fabric.util.object.extend(fabric.Text.prototype, {
    textInitialize: textInitialize,
    editTool: false,
    advancedColorsTools: false,
    textFontSizeTools: false,
    textAligmentTools: false,
    advancedTextStyleTools: false,
    rasterizeTool: false,
    rasterizeKlass: fabric.Image,


    initialize: function (text, options) {
      this._initEntity(options);
      this.textInitialize(text, options);
      // this.updateCache();
    }
  });

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
 * @private
 * @param {String} eventName
 * @param {Function} handler
 */
function _removeEventListener(eventName, handler) {
  if (!this.__eventListeners[eventName]) {
    return;
  }
  var eventListener = this.__eventListeners[eventName];
  if (handler) {
    eventListener.splice(eventListener.indexOf(handler), 1)
  }
  else {
    eventListener.length = 0;
  }
}

fabric.Canvas.prototype.stopObserving = fabric.Object.prototype.stopObserving = function stopObserving(eventName, handler) {
  if (!this.__eventListeners) {
    return;
  }

  // remove all key/value pairs (event name -> event handler)
  if (arguments.length === 0) {
    for (eventName in this.__eventListeners) {
      _removeEventListener.call(this, eventName);
    }
  }
  // one object with key/value pairs was passed
  else if (arguments.length === 1 && typeof arguments[0] === 'object') {
    for (var prop in eventName) {
      _removeEventListener.call(this, prop, eventName[prop]);
    }
  }
  else {
    _removeEventListener.call(this, eventName, handler);
  }
  return this;
}


fabric.Observable.on = fabric.Canvas.prototype.on = fabric.Object.prototype.on = function (eventName, handler,priority) {
  if (eventName.constructor == Object) {
    for (var i in eventName) {
      this.on(i, eventName[i],priority)
    }
    return this;
  }
  var events = eventName.split(" ");
  for (var i in events) {
    eventName = events[i];
    this.observe(eventName, handler);
    if(priority){
      this.__eventListeners[eventName].unshift(this.__eventListeners[eventName].pop());
    }
  }
  return this;
};
fabric.Canvas.prototype.off = fabric.Object.prototype.off = function (eventName, handler) {
  var events = eventName.split(" ");
  for (var i in events) {
    this.stopObserving(events[i], handler)
  }
  return this;
};


fabric.Canvas.prototype.fire = fabric.Object.prototype.fire = function fire(eventName, options) {
  if (!this.__eventListeners) {
    return;
  }

  var listenersForEvent = this.__eventListeners[eventName];
  if (listenersForEvent) {
    for (var i = 0, len = listenersForEvent.length; i < len; i++) {
      listenersForEvent[i].call(this, options || {});
    }
  }

  var listenersForEventAll = this.__eventListeners['*'];
  if (listenersForEventAll) {
    options = options || {};
    options.eventName = eventName;
    options.listeners = listenersForEvent;
    for (i = 0, len = listenersForEventAll.length; i < len; i++) {
      listenersForEventAll[i].call(this, options);
    }
  }

  return this;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.PluginsMixin = {
  runPlugins: function (pluginTypes, resolve, error) {

    var self = this;

    var plugins = this.plugins[pluginTypes].map(function(foo){
      var l = foo.length;
      if(!foo.length){
        var _result = foo.call(self);
        // (_result || _result === undefined) ? resolve() : fail();
        return _result;
      }else{
        return foo;
      }
    });

    for(var i = plugins.length ; i--;){
      if(typeof plugins[i] !== "function"){
        plugins.splice(i,1);
      }
    }
    if(plugins.length) {
      var wrap = fabric.util.promise.wrap(this);
      var _counter = plugins.length;
      for(var i in plugins){
        plugins[i].call(self,function(){
          if(!--_counter){
            resolve();
          }
        })
      }
    }else{
      resolve();
    }

  },
  addPlugin: function (type, name) {
    if(name.constructor == String){
      this.prototype.plugins[type].push(this.prototype[name]);
    }else{
      this.prototype.plugins[type].push(name);
    }
    return this;
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric, __dirname) {
fabric.Application.prototype.eventListeners["entity:created"].push(function(e){
  var target = e.target;

  target.application = this;
  fabric.util.object.defaults(e.options, this.getDefaultProperties(target,e.options));

  for(var key in e.options){
    var value = e.options[key];
    if(key[0] == "+"){
      var _key = key.substr(1);
      var _arr = target.get(_key);
      if(_arr instanceof Array){
        _arr = _arr.slice().concat(value);
      }else{
        _arr = fabric.util.object.extend({},_arr,value);
      }
      e.options[_key] = _arr;
      delete e.options[key];
    }
  }

  delete e.options.type;
  delete e.options.application;
});





fabric.util.object.extend(fabric.Application.prototype, {
  getDefaultProperties: function(proto){
    if(!this.prototypes)return;

    var klassname = fabric.util.string.capitalize(fabric.util.string.camelize(proto.type),true);

    var _protoProperties = proto.__proto__ && proto.__proto__.type && this.getDefaultProperties(proto.__proto__) || {};
    var _defaultProperties = fabric.util.object.clone(this.prototypes[klassname]);

    fabric.util.object.extend(_protoProperties,_defaultProperties);

    return _protoProperties;
  },
  /**
   * default prototypes propertes for objects
   */
  prototypes: {
    Object: {
      includeDefaultValues: false
    },
    Canvas: {
      includeDefaultValues: false
    }
  },
  initUtils: function () {

    if(!this.options.util){
      return;
    }
    fabric.util.object.extend(this.util || {},this.options.util);

    var _mediaRoot = this.options.util.mediaRoot;
    if(_mediaRoot){
      if((_mediaRoot.indexOf("./") == 0)){
        var _dirname;
        if(fabric.isLikelyNode){
          _dirname = __dirname;
        }else{
          _dirname = window.location.href + "/../"
        }
        _mediaRoot = fabric.util.path.resolve(_dirname + _mediaRoot);
      }
      var _last = _mediaRoot[_mediaRoot.length - 1];
      if(_last != "/" && _last != "\\"){
        _mediaRoot +="/"
      }
      _mediaRoot = fabric.util.path.resolve(_dirname + _mediaRoot);
      fabric.util.mediaRoot = _mediaRoot;
    }

    if (this.options['util']) {
      fabric.util.object.extend(fabric.util, this.options['util']);
    }
    if (this.options['fabric']) {
      fabric.util.object.extend(fabric, this.options['fabric']);
    }
    delete this.options['fabric'];
    delete this.options['util'];
  },
  initPrototypes: function () {

    var _prototypes = fabric.util.object.deepExtend({}, this.prototypes ,this.options.prototypes);

    this.prototypes = _prototypes;
    this.klasses = {};


    if(_prototypes.eventListeners){
      _prototypes.eventListeners.$extend = 'array';
    }

    for (var klassName in _prototypes) {
      var _proto = _prototypes[klassName];

      for (var j in _proto) {
        if (_proto[j] && _proto[j]["$extend"]) {
          var _extend = _proto[j]["$extend"];
          if( _extend == "array"){
            _proto[j] = fabric.util.object.extendArraysObject(fabric[klassName].prototype[j],_proto[j]);
          } else if( _extend == "deep"){
            _proto[j] = fabric.util.object.deepExtend(fabric[klassName].prototype[j],_proto[j]);
          }else{
            _proto[j] = fabric.util.object.extend(fabric[klassName].prototype[j],_proto[j]);
          }
          delete _proto[j]["$extend"];
        }
      }


      if(_proto["$super"]){
        var _superklass = fabric[_proto["$super"] || klassName] ;
        delete _proto["$super"];

        var _fromObject = _proto.fromObject || _superklass.fromObject ;
        delete _proto.fromObject;
        var _klass = this.klasses[klassName] = fabric.util.createClass(_superklass, _proto);
        _klass.fromObject = _fromObject.bind(_klass);
      }

    //   if (klassName.actions && _proto.actions.constructor == Function) {
    //     fabric[klassName].prototype.actions = _proto.actions.call(fabric[klassName].prototype)
    //   }
    }

    if (_prototypes.Application) {
      fabric.util.object.deepExtend(this, _prototypes.Application);
    }

    // delete this.options['prototypes'];

    if (this.actions && this.actions.constructor == Function) {
      this.actions = this.actions.call(this)
    }
  }
});

fabric.Application
  .addPlugin("configuration","initUtils")
  .addPlugin("configuration","initPrototypes");



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), "/"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

//require("./staticCanvas");

fabric.SlideCanvas = fabric.util.createClass(fabric.Canvas,fabric.PluginsMixin, {
  type: 'slide-canvas',
  _createUpperCanvasNative: fabric.Canvas.prototype._createUpperCanvas,
  width: 160 ,
  height: 90,
  dotsPerUnit: 1,
  scale: 1,
  loaded: false,
  insertBackgroundColor: false,
  plugins: {
    initialize: [
      function initZooming(options) {
        this.enableClipAreaZooming && this.enableClipAreaZooming();
      }
    ],
    preloaders: [
      function initTemplate(options){
        this.template && this.setTemplate(this.template);
      }
    ],
    loaders: [],
    savers : [
      function serializeThumb(propertiesToInclude, _data){
        if(propertiesToInclude.indexOf('thumb') !== -1){
          var size = fabric.util.getProportions(this.getOriginalSize(), this.thumbSize, 'fit');
          var canvas = fabric.util.createCanvasElement();
          canvas.width = size.width;
          canvas.height = size.height;
          this.renderThumb(canvas);
          _data.thumb = canvas.toDataURL();
        }
      },
      function serializeTemplate(propertiesToInclude, _data) {
        if (propertiesToInclude.indexOf('template') !== -1) {
          if (this.template) {
            for (var i in _data.template) {
              if (JSON.stringify(_data[i]) == JSON.stringify(_data.template[i])) {
                delete _data[i];
              }
            }
            _data.template = this.template.id;
          }
        }
      }
    ]
  },
  setInteractive: function (value) {
    this.interactive = value;
  }, /**
   * @private
   * @param {Object} [options] Options object
   */
  _initOptions: function (options) {
    this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0;
    this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0;

    if (!this.lowerCanvasEl.style) {
      return;
    }

    this.lowerCanvasEl.width = this.width;
    this.lowerCanvasEl.height = this.height;

    this.lowerCanvasEl.style.width = this.width + 'px';
    this.lowerCanvasEl.style.height = this.height + 'px';

    this.viewportTransform = this.viewportTransform.slice();
  },
  contextTopImageSmoothingEnabled: true,
  _createUpperCanvas: function () {
    this._createUpperCanvasNative();
    var ctx = this.contextTop;

    if(ctx.imageSmoothingEnabled){
      ctx.imageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
      return;
    }
    ctx.webkitImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
    ctx.mozImageSmoothingEnabled    = this.contextTopImageSmoothingEnabled;
    ctx.msImageSmoothingEnabled     = this.contextTopImageSmoothingEnabled;
    ctx.oImageSmoothingEnabled      = this.contextTopImageSmoothingEnabled;
  },
  /**
   * @private
   * @param {Event} e Event object fired on mouseup
   */
  _onMouseUpInDrawingMode: function(e) {
    this._isCurrentlyDrawing = false;
    if (this.clipTo) {
      this.contextTop.restore();
    }
    var pointer = this.getPointer(e);
    this.freeDrawingBrush.onMouseUp(pointer);
    this._handleEvent(e, 'up');
  },
  initialize: function (el, options,callback) {
    if(el && el.constructor == Object){
      callback= options;
      options = el;
      el = null;
    }
    options = options || {};


    if(options.project){
      if(!options.application){
        options.application = options.project.application;
      }
    }

    if(options.application){
      options.application.fire("entity:created",{target : this , options : options});
    }

    this.id = fabric.SlideCanvas.__idcounter++;

    this._objects = [];
    this._createLowerCanvas(el);


    if(!this.virtual){
      this.created = true;


      this._currentTransform = null;
      this._groupSelector = null;
      this._initWrapperElement();
      this._createUpperCanvas();
      this._initEventListeners();
      this._initRetinaScaling();
      this.calcOffset();
     this.initLayers();



      this._createCacheCanvas();
      this._setImageSmoothing();
      this._initRetinaScaling();
    }else{
      this.initLayers();
    }

    this.plugins.initialize.forEach(function(initializer){
      initializer.call(this, options);
    }.bind(this));

    if(options["+actions"]) {
      this.set("+actions", options["+actions"])
    }
    if(options.actions){
      this.set("actions",options.actions)
    }


    if(options && options.onResize){
      this.onResize = options.onResize;
    }

    if (this.requestAnimFrame) {
      this.addVideosSupport();
    }

    this._initOptions();

    this._setObject(options);

    this.calcOffset();

    this.on({
      'object:moving': function (obj) {
        this.fire('target:modified', this, obj)
      },
      'selection:cleared': function (event) {
        if(!this.target)return;
        this.target.fire('deselected', event);
        this.target = null;
        this.fire('target:cleared', event);
      },
      'object:selected': function (event) {
        event.previous = this.target;
        this.target = event.target;
        if(event.previous){
          event.previous.fire('deselected', event);
        }
        this.fire('target:changed', event);
      },
      'group:selected': function (event) {
        this.target = event.target;
        this.fire('target:changed', event);
      }
    });

    // this.load(options,callback);

    this.fire("created");
    // if(this.application){
    //   this.application.fire("canvas:created",{target : this});
    // }
  },
  initLayers: function(){
    if(this.upperCanvasEl){
      this.wrapperEl.appendChild(this.upperCanvasEl);
    }


    //todo from layers module


  },
  create: function () {
    this.created = true;
    this._initInteractive();
    this._createCacheCanvas();
  },
  storeProperties: ['*','backgroundImage','width','height'],
  toObject: function (propertiesToInclude) {

    propertiesToInclude = (propertiesToInclude || []).concat(this.storeProperties);

    var _self =  this;
    var _objs = this.getObjects();

    _objs = fabric.util.object.filter(_objs,{stored: true});
    _objs = _objs.map(function(instance) {
      return instance.toObject(_self.objectsPropertiesToInclude);
    });

    var _data = {
      objects: _objs
    };

    fabric.util.populateWithProperties(this, _data, this.propertiesToInclude);
    //
    // for(var i in propertiesToInclude){
    //   var _prop = propertiesToInclude[i];
    //   _data[_prop] = this[_prop];
    // }

    if(propertiesToInclude.indexOf('backgroundImage') !== -1){
      fabric.util.object.extend(_data, this.__serializeBgOverlay());
    }

    if(propertiesToInclude.indexOf('width') !== -1 && this.originalWidth){
      _data.width = this.originalWidth;
    }
    if(propertiesToInclude.indexOf('height') !== -1 && this.originalHeight){
      _data.height = this.originalHeight;
    }

    this.plugins.savers.forEach(function(saver){
      saver.call(this, propertiesToInclude, _data);
    }.bind(this));
    this.fire("before:object",{object: _data});

    return _data;
  },
  defaultText: "text",
  defaultTextType: "text",
  thumbSize: {
    width: 50,
    height: 100
  },
  setTemplate: function(template){

    this.template = template;
    if(!template)return;

    this.setWidth(this.slideWidth || template.width);
    this.setHeight(this.slideHeight || template.height);
    this.originalHeight = this.height;
    this.originalWidth = this.width;

    this.set(fabric.util.object.rearrange(template,["areas","helpers","offsets"]));

    this._update_clip_rect();
    this._update_background_image();
    this.fire("modified",{type: "template"});
    this.renderAll();
  },
  addText: function (text, options) {
    this.createObject({
      position: "center",
      text: text,
      type:   this.defaultTextType,
      clipTo: this.activeArea,
      movementLimits : this.activeArea
    });
  },
  uploadAction: function (img) {
    if (!img)return;
    this.createObject({
      position: "center",
      active: true,
      type:   this.uploadClass,
      image:  img,
      clipTo: this.activeArea,
      movementLimits : this.activeArea
    });
  },
  uploadClass: 'Image',
  uploadImageTool: false,
  addTextTool: false
});
fabric.SlideCanvas.__idcounter = 0;
fabric.SlideCanvas.fromJson = function(url,callback , element){
  fabric.util.data.loadJson(url,function(data){
    new fabric.SlideCanvas(element,data,callback)
  })
};

fabric.SlideCanvas.prototype.actions = fabric.util.object.extend({}, {
  //selectAll: {
  //  title: 'selectAll',
  //  type: 'key'
  //},
  backgroundColor : {
    type: "color"
  },
  addText: {
    insert: 'addTextTool',
    className:  'fa fa-font',
    title: 'text',
    action: function () {
      this.addText(this.defaultText,{});
    }
  },
  upload: {
    insert: 'uploadImageTool',
    className:  'fa fa-upload',
    key: 'U',
    title: 'upload image',
    action: function () {
      fabric.util.uploadImage(this.uploadAction.bind(this))
    }
  }
});

fabric.SlideCanvas.addPlugin = fabric.PluginsMixin.addPlugin.bind(fabric.SlideCanvas);



fabric.Application.prototype.loadSlide = function (callback) {

  var _canvas = this.canvas;
  if (this.slide) {

    if (_canvas.load) {
      _canvas.load(this.slide, callback);
    } else {
      _canvas.createObjects(this.slide, callback);
    }
  }
};

fabric.Application.addPlugin("postloaders","loadSlide");





fabric.Application.prototype.canvasClass = 'SlideCanvas';

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.util.object.extend(fabric.StaticCanvas.prototype,{
  /**
   * required to show video
   */
  addVideosSupport: function () {
    fabric.util.requestAnimFrame(function render() {
      this.renderAll();
      fabric.util.requestAnimFrame(render);
    }.bind(this));
  },
  find: function (options) {
    if (typeof options == "string"){
      options = {
        type: options
      }
    }
    return fabric.util.object.where(this._objects,options);
  },
  collection: function (type,options) {
    var classPrototype;
    var _applicationPrototype;
    if(typeof type == "function"){
      classPrototype =  type.prototype;
    }else if (typeof type == "string"){
      classPrototype = fabric[type].prototype
    }else if(type.type){
      classPrototype = fabric[type.type].prototype;
      options = type;
    }else{
      options = type;
    }
    options = options || {type: classPrototype.type};

    function makeFunction(foo){
      return function(){
        var options = arguments;
        this.forEach(function(obj){
          foo.apply(obj,options)
        });
        return this;
      }
    }

    var collectionProto;
    var _array = this.find(options);
    _array.canvas = this;
    _array.options = options;

    if(classPrototype) {
      if(this.application){
        _applicationPrototype = this.application.getDefaultProperties(classPrototype,{});
      }
      collectionProto = [];
      for(var i in classPrototype){
        if (typeof classPrototype[i] == "function") {
          collectionProto[i] = classPrototype[i];
        }
      }
      for(var i in _applicationPrototype){
        if (typeof _applicationPrototype[i] == "function") {
          collectionProto[i] = _applicationPrototype[i];
        }
      }
    }else{
      _array.forEach(function(_obj){
        if(!collectionProto) {
          collectionProto = [];
          for(var i in _obj) {
            if (typeof _obj[i] == "function") {
              collectionProto[i] = _obj[i];
            }
          }
        }else{
          for(var i in collectionProto){
            if(!_obj[i] || typeof _obj[i] !== "function"){
              delete collectionProto[i];
            }
          }
        }
      })
    }

    for(var i in collectionProto){
      collectionProto[i] = makeFunction( collectionProto[i] );
    }
    collectionProto.__proto = _array.__proto__;
    _array.__proto__ = collectionProto;


    _array.setCollection = function(_arr){
      this.length = 0;
      for(var i in _arr){
        this.push(_arr[i]);
      }
      return this;
    }
    _array.updateCollection = function(){
      var _arr = this.canvas.find(this.options);
      this.setCollection(_arr)
      return this;
    };

    _array.filter = function(){
      var _arr = this.__proto__.filter.apply(this,arguments);
      this.setCollection(_arr)
      return this;
    };

    return _array;
  },
  _update_background_image: function () {
    var photo = this.backgroundImage;
    if (!photo || photo.constructor == Object || photo.constructor == String) return;

    if (this.backgroundPosition == 'resize') {
      this.originalWidth = photo.width;
      this.originalHeight = photo.height;

    }else if (this.backgroundPosition != 'manual') {

      var _w  =  this.originalWidth || this.width,  _h = this.originalHeight || this.height;


      if(photo._originalElement){
        var size = fabric.util.getProportions(photo._originalElement, {
          width: _w,
          height: _h
        }, this.backgroundPosition);
      }else{
        size = {
          width: _w,
          height: _h
        }
      }


      var _l ;
      if(this.backgroundImage.originX == 'center'){
        _l = _w / 2;
      }else{
        _l = (_w - size.width) / 2 ;
      }
      var _t ;
      if(this.backgroundImage.originY == 'center'){
        _t = _h / 2;
      }else{
        _t = (_h - size.height) / 2 ;
      }


      this.backgroundImage.set({
        left: _l + this.viewportTransform[4],
        top:  _t + this.viewportTransform[5],
        width: size.width,
        height: size.height
      });
    } else {
      // var _orig = this.backgroundImage.getOriginalSize();
      // this.backgroundImage.set({
      //   originX: 'left',
      //   originY: 'top',
      //   left: 0, //this.viewportTransform[4],
      //   top: 0, //this.viewportTransform[5],
      //   width: _orig.width,
      //   height: _orig.height
      // });
    }
  },
  setBackgroundImage: function (bg, callback) {
    var _bgimageLoaded = function (el){

      this.backgroundImage = el;
      this.backgroundImage.canvas = this;
      this._update_background_image();
      if(!this.originalWidth && !this.originalHeight){
        this.originalWidth = el.width;
        this.originalHeight = el.height;
      }
      this.fire("background-image:loaded",{target: el});
      callback && callback();
    }


    if (!bg) {
      this.backgroundImage = null;
      return callback();
    }
    if (bg instanceof HTMLImageElement || bg instanceof Image){

      var el = new fabric.Image(bg,{
        width: bg.naturalWidth,
        height: bg.naturalHeight
      });

      _bgimageLoaded.call(this,el);
    }
    if (bg.constructor == String) {
      bg = {
        src: bg
      }
    }
    var _proto = this.application.prototypes;
    if(_proto && _proto.SlideCanvas && _proto.SlideCanvas.backgroundImageProperties){
      fabric.util.object.extend(bg,_proto.SlideCanvas.backgroundImageProperties);
    }
    bg.application = this.application;
    bg.type = bg.type || "image";
    // bg.width = bg.naturalWidth;
    // bg.height = bg.naturalHeight;
    //
    fabric.util.createObject(bg,_bgimageLoaded.bind(this));
  },
  createObjects: function(objects,callback){

    if(this.application){
      for(var i in objects){
        if(objects[i].constructor == String){
          objects[i] = this.application.objects[objects[i]];
        }
      }
    }

    var _canvas = this;

    function success(_objects) {
      _canvas.fire("progress:complete", {objects: objects});
      for (var i in _objects) {
        _canvas.add(_objects[i].object);
      }
      _canvas.renderAll();
      callback && callback.call(_canvas)
    }

    function progress(l, t) {
      _canvas.fire("progress", { loaded : l, total : t });
      if (fabric.util.loaderDebug) {
        console.log("loaded " + l + " / " + t);
      }
    }


    var _objects = [];
    if (!objects || !objects.length) {
      this.fire("progress:complete", 0);
      success(_objects);
      return;
    }

    var queueLoadCallback = fabric.util.queueLoad(objects.length, function(){
      success(_objects)
    }, progress);

    queueLoadCallback.data = (this.title || "") + "objects";

    for (var i in objects) {
      (function (options) {
        var _object_slot = {object: null, options: options};
        _objects.push(_object_slot);

        options.application = _canvas.application;
        fabric.util.createObject(options, function (el) {
          _object_slot.object = el;
          queueLoadCallback();
        });
      }).call(this, objects[i]);
    }
  },
  applyOptions: function(filter,options){
    this._objects.forEach(function(_obj){
      for(var prop in filter){
        if(_obj[prop] !==  filter[prop])return;
      }
      _obj.setOptions(options);
    })
  },
  createObject: function (type, options,callback) {
    if(typeof type !== "string"){
      callback = options;
      options = fabric.util.object.clone(type);
      type = null;
    }else{
      options = fabric.util.object.clone(options);
      options.type = type;
    }

    var _self = this;
    options.application = this.application;
    var _active = options.active;
    var _position = options.position;
    delete options.active;
    delete options.position;


    function _add(el) {
      if(el.canvas)return;
      if(_position == "center") {
        _self.center(el);
      }
      _self.add(el);

      if(_active){
        _self.setActiveObject(el);
      }
      callback && callback(el);
    }

    var el = fabric.util.createObject(options,_add );
    el && _add(el);
    return el;
  },
  onLoad: function (callback) {
    this.processing =false;
    this.loaded = true;
    this.fire("loading:end",{type: "slide", target: this});
    this.renderAll();
    callback && callback.call(this);
  },
  load: function (options,callback) {
    this.originalWidth = 0;
    this.originalHeight = 0;
    if (!options)return;

    if(!this.virtual){
      this.clear();
    }

    if(options.width){
      options.originalWidth = options.width;
      options.originalHeight = options.height;
    }

    this.processing = true;
    this.fire("loading:begin",{type: "slide", target: this});

    this.set(options,this.onLoad.bind(this,callback));


    //todo
    if(this.plugins){
      this.plugins.preloaders.forEach(function(preloader){
        preloader.call(this, options);
        this.onResize();
      }.bind(this));
    }


  },
  setObjects: function(objects,callback){

    this.createObjects(objects,function(){
      for(var i in this._objects){
        this._objects[i].setCoords();
      }
      callback();
    });
  },
  optionsOrder: ["originalWidth","originalHeight","width","height"],
  onResize: function(){
    var _scale = Math.min(1,800 /this.width );
    // this.setZoom(_scale);
    this.setDimensions({width: this.width,height: this.height});
  },
  center: function (el) {
    var _rect, maxSize, offsets;

    if(el.movementLimits && el.movementLimits.constructor !== Function){
      var lim = el.movementLimits;
      _rect = {
        left:   lim.left * lim.scaleX,
        width:  lim.width * lim.scaleX ,
        top:    lim.top * lim.scaleY,
        height: lim.height * lim.scaleY
      };
      maxSize = _rect;
      offsets = lim;
    }else{
      var _zoom = this.getZoom();
      var _w = this.originalWidth || this.width / _zoom;
      var _h = this.originalHeight || this.height / _zoom;
      _rect = {
        width: this.offsets ? (_w - this.offsets.left - this.offsets.right) : _w,
        height: this.offsets ?(_h - this.offsets.top - this.offsets.bottom) : _h
      };
      offsets = {
        left: this.offsets && this.offsets.top ||0 ,
        top:  this.offsets &&  this.offsets.left ||0
      }
    }
    maxSize = {
      width: _rect.width * this.fitIndex,
      height: _rect.height * this.fitIndex
    };
    var size = fabric.util.getProportions(el, maxSize, 'fit');

    el.setOptions({
      scaleX: size.scale,
      scaleY: size.scale,
      top: offsets.top  + _rect.height / 2 - size.height / 2,
      left:offsets.left + _rect.width / 2  - size.width / 2
    });
    el.setCoords();
  },
  fitIndex: 0.8,
  setOriginalSize: function (w, h) {
    this.originalWidth = h ? w : (w.naturalWidth || w.width);
    this.originalHeight = h ? h : (w.naturalHeight || w.height);
    return this;
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.debug = true;

fabric.util.data = __webpack_require__(8);
fabric.util.path = __webpack_require__(4);
fabric.util.compile = __webpack_require__(7);
fabric.util.loader = __webpack_require__(9);
fabric.util.object.extend(fabric.util.object,__webpack_require__(1));
fabric.util.object.extend(fabric.util,__webpack_require__(2));

__webpack_require__(6);


if(!fabric.isLikelyNode){
  /**
   * inline script images
   * @type {{error: string}}
   */
  fabric.media = {
    /**
     * replace images loaded with errors
     */
    error: 'data:image/svg+xml;base64,' + __webpack_require__(5)
  };
}

module.exports  = fabric;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
   * Draw CSS3 border image on canvas.
   * @param canvas    {HTMLCanvasElement}
   * @param img       {HTMLImageElement} border-image-source image
   * @param options   {Object}
   *      slice {Array} border-image-slice values
   *      width {Array} border-image-width values
   *      outset {Array} border-image-outset values
   *      repeat {Array} border-image-repeat values
   * @param size      {Object}
   */
   fabric.util.drawBorderImage  = function(canvas, img, options){


    var options = fabric.util.object.extend({
      "slice":        [25,25,25,25],
      "width":        [25,25,25,25],
      "fill":         false,
      "repeat":       ["round","round"],
      "outset_values"	: [0, 0, 0, 0],
      "slice_units"   : [0, 0, 0, 0],
      "width_units"	: [0, 0, 0, 0],
      "outset_units"	: [0, 0, 0, 0],
      "size"			: [canvas.width, canvas.height]
    },options)


    var w = img.width;
    var h = img.height;

    var ctx = canvas.getContext("2d");
    var slice = options.slice;
    var width = options.width;

    var w2 = options.size[0];
    var h2 = options.size[1];


    if(options.slice_units[0] == 1)slice[0] *=  h / 100;
    if(options.slice_units[1] == 1)slice[1] *=  w / 100;
    if(options.slice_units[2] == 1)slice[2] *=  h / 100;
    if(options.slice_units[3] == 1)slice[3] *=  w / 100;

    if(options.width_units[0] == 1)width[0] *= h2 / 100;
    if(options.width_units[1] == 1)width[1] *= w2 / 100;
    if(options.width_units[2] == 1)width[2] *= h2 / 100;
    if(options.width_units[3] == 1)width[3] *= w2 / 100;


    function drawSide(side,sliceOffset,sliceWidth, drawOffset,drawWidth){
      var d;
      if(side == 0) {
        d = [slice[3] + sliceOffset, 0, sliceWidth,  slice[0],
          width[3] + drawOffset, 0, drawWidth,  width[0]]
      }
      if(side == 2){
        d = [slice[3] + sliceOffset, h - slice[2] ,sliceWidth,  slice[2],
          width[3] + drawOffset, h2 - width[2],drawWidth, width[2]]
      }
      if(side == 1) {
        d = [ w - slice[1], slice[0] + sliceOffset,  slice[1], sliceWidth,
          w2 - width[1], width[0] + drawOffset,width[1], drawWidth];
      }
      if(side == 3) {
        d = [ 0, slice[0] + sliceOffset,  slice[3], sliceWidth,
          0, width[0] + drawOffset, width[3],drawWidth];
      }
      ctx.drawImage(img,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7])
    }


    function _draw_border_side(side){
      var _top_width, _top_slice, repeat;
      if(side == 0 || side == 2){
        _top_width = w2 - width[1]- width[3];
        _top_slice  =  w - slice[1] - slice[3];
        repeat = options.repeat[0];
      }else{
        _top_width = h2 - width[0]- width[2];
        _top_slice  =  h - slice[0] - slice[2];
        repeat = options.repeat[1];
      }


      if(repeat == "stretch"){
        return drawSide(side, 0,  _top_slice ,  0,     _top_width);
      }

      var _aspect =   slice[side] / width[side];
      var _one_width =  _top_slice *  width[side] / slice[side] ;
      var count = 1;
      var _left = 0;

      if(repeat == "repeat"){

        var _rest = _one_width - _top_width % _one_width / 2;
        var _rest_aspect  = _aspect * _rest;
        count =  Math.floor(_top_width / _one_width);


        if(_rest > 0){
          drawSide(side, _rest_aspect ,  _top_slice - _rest_aspect,  0,     _one_width - _rest)
        }

        _left =  _one_width - _rest;

        for(var i = 0 ; i< count;i ++){
          drawSide( side,0,   _top_slice ,  _left,     _one_width);
          _left +=_one_width;
        }

        if(_rest > 0){
          drawSide(side,  0 ,    _top_slice - _rest_aspect,  _left,    _one_width - _rest );
        }
      }
      if(repeat == "round"){

        _left = 0;
        count =  Math.max(1,Math.round(_top_width / _one_width));
        _one_width = _top_width / count;

        while(_left < _top_width){
          drawSide(side,0,     _top_slice ,  _left,     _one_width );
          _left +=_one_width;
        }
      }
    }

    _draw_border_side(0);
    _draw_border_side(2);
    _draw_border_side(1);
    _draw_border_side(3);

  //top left
    ctx.drawImage(img, 0, 0, slice[3], slice[0], 0, 0, width[3], width[0]);
  //top right
    ctx.drawImage(img, w - slice[1], 0, slice[1], slice[0],
      w2 - width[1], 0, width[1], width[0]);
  //bottom left
    ctx.drawImage(img, 0, h - slice[2], slice[3], slice[2],
      0, h2 - width[2], width[3], width[2]);

  //bottom right
    ctx.drawImage(img, w - slice[1], h - slice[2], slice[1], slice[2],
      w2 - width[1], h2 - width[2], width[1], width[2]);

  }

  /*
   var Frame = function(project,data){

   if(data.border_image){
   data.border_image = mixin( {
   "slice":          [25,25,25,25],
   "width":          [25,25,25,25],
   "fill":           false,
   "repeat":         ["round","round"],
   "outset"	:     [0, 0, 0, 0],
   "slice_units"   : [0, 0, 0, 0],
   "width_units"	: [0, 0, 0, 0],
   "outset_units"	: [0, 0, 0, 0]
   }, data.border_image)
   }


   this.superclass.constructor.call(this,project,data);
   this._add_root("mask");
   this._add_root("image");
   this.example = this._get_example();

   };*/
  fabric.util.getOffsetsClipPath = function(o) {

    return ['M', o[3], o[0], 'L', 100 - o[1], o[0], 'L', 100 - o[1], 100 - o[2], 'L', o[3], 100 - o[2], 'z'].join(" ");
  };

  fabric.util.getRadiusClipPath = function(radius,radius_units, width,height) {

  var br  = radius;
  var bru = radius_units || [1,1,1,1,1,1,1,1];



  var s = {
    "top-left-h":     br[0] * (bru[0] ? height / 100 : 1),
    "top-left-w":     br[1] * (bru[1] ? width / 100 : 1),
    "top-right-h":    br[2] * (bru[2] ? height / 100 : 1),
    "top-right-w":    br[3] * (bru[3] ? width / 100 : 1),
    "bottom-right-w": br[4] * (bru[4] ? width / 100 : 1),
    "bottom-right-h": br[5] * (bru[5] ? height / 100 : 1),
    "bottom-left-w":  br[6] * (bru[6] ? width / 100 : 1),
    "bottom-left-h":  br[7] * (bru[7] ? height / 100 : 1)
  };

  return [
    "M", 0, s["top-left-h"],
    "C", 0, s["top-left-h"], 0, 0, s["top-left-w"], 0,
    "H", width - s["top-right-w"],
    "C", width - s["top-right-w"], 0, width, 0, width, s["top-right-h"],
    "V", height - s["bottom-right-h"],
    "C", width, height - s["bottom-right-h"], width, height, width - s["bottom-right-w"], height,
    "H", s["bottom-left-w"],
    "C", s["bottom-left-w"], height, 0, height, 0, height - s["bottom-left-h"],
    "Z"
  ].join(" ");
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {if(typeof WebFont == "undefined"){
  fabric.webFontsLoader = __webpack_require__(13);
}else{
  fabric.webFontsLoader = WebFont;
}

//интересная библиотека
// http://opentype.js.org/index.html
//todo add step
//
// fabric.Application.prototype.steps.splice(3,0,"loadWebfonts");

fabric.util.object.extend(fabric.Application.prototype, {
  loadWebfonts: function (callback) {
    if(fabric.isLikelyNode){
      //todo шрифты не грузятся на сервере
      return callback();
    }
    if(this.options.fonts){
      if(!this.fonts)this.fonts = {};
      this.fonts = fabric.util.object.extend(this.fonts,this.options.fonts);
    }
    if(!this.fonts){
      return callback();
    }
    this.fire("loading",{type: "webfonts"});

    this._fonts = [];

    for(var i in this.fonts){
      this._fonts = this._fonts.concat(this.fonts[i]);
    }
    this._fonts = fabric.util.object.sortBy(this._fonts, function(font){ return font; });

    if(fabric.webFontsLoader && (this.fonts.google && this.fonts.google.length || this.fonts.custom && this.fonts.custom.length) ){
      var fonts_options = {
        active: function () {
          callback();
        }
      };
      if(this.fonts.google && this.fonts.google.length){
        fonts_options.google =  {
          families: this.fonts.google
        };
      }
      if(this.fonts.custom && this.fonts.custom.length){
        fonts_options.custom =  {
          families: this.fonts.custom
        };
      }

      fabric.webFontsLoader.load(fonts_options);
    } else {
      callback();
    }
    if (this.waitForWebfonts) {
      fabric.util.fonts.waitFor(this.waitForWebfonts, callback)
    }
  },
  fonts: {
    standart: [
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Georgia',
      'Impact',
      'Lucida Console',
      'Tahoma',
      'Times New Roman',
      'Geneva',
      'sans-serif',
      'serif',
      'monospace',
      'cursive'
    ],
    google: [],
    custom: []
  }
});


fabric.util.fonts = {
  waitFor: function (fonts, callback) {
    var loadedFonts = 0;
    for (var i = 0, l = fonts.length; i < l; ++i) {
      (function (font) {
        var node = document.createElement('span');
        // Characters that vary significantly among different fonts
        node.innerHTML = 'giItT1WQy@!-/#';
        // Visible - so we can measure it - but not on the screen
        node.style.position = 'absolute';
        node.style.left = '-10000px';
        node.style.top = '-10000px';
        // Large font size makes even subtle changes obvious
        node.style.fontSize = '300px';
        // Reset any font properties
        node.style.fontFamily = 'sans-serif';
        node.style.fontVariant = 'normal';
        node.style.fontStyle = 'normal';
        node.style.fontWeight = 'normal';
        node.style.letterSpacing = '0';
        document.body.appendChild(node);

        // Remember width with no applied web font
        var width = node.offsetWidth;

        node.style.fontFamily = font;

        var interval;

        function checkFont() {
          // Compare current width with original width
          if (node && node.offsetWidth != width) {
            ++loadedFonts;
            node.parentNode.removeChild(node);
            node = null;
          }

          // If all fonts have been loaded
          if (loadedFonts >= fonts.length) {
            if (interval) {
              clearInterval(interval);
            }
            if (loadedFonts == fonts.length) {
              setTimeout(function () {
                callback();
              }, 50)
              return true;
            }
          }
        }

        if (!checkFont()) {
          interval = setInterval(checkFont, 50);
        }
      })(fonts[i]);
    }
  }
}

fabric.Application.addPlugin("postloaders","loadWebfonts");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


fabric.util.mediaRoot = "";
fabric.util.addNoCache = false;

fabric.util._loadImage_overwritten = fabric.util.loadImage;


// if(!fabric.isLikelyNode){
//
//   var URL = require('url'),
//     HTTP = require('http'),
//     HTTPS = require('https'),
//     Image = require('canvas').Image;
//
//   /** @private */
//   var request = function (url, encoding, callback) {
//     var oURL = URL.parse(url);
//
//     // detect if http or https is used
//     if ( !oURL.port ) {
//       oURL.port = ( oURL.protocol.indexOf('https:') === 0 ) ? 443 : 80;
//     }
//
//     // assign request handler based on protocol
//     var reqHandler = (oURL.protocol.indexOf('https:') === 0 ) ? HTTPS : HTTP,
//       req = reqHandler.request({
//         hostname: oURL.hostname,
//         port: oURL.port,
//         path: oURL.path,
//         method: 'GET'
//       }, function(response) {
//         var body = '';
//         if (encoding) {
//           response.setEncoding(encoding);
//         }
//         response.on('end', function () {
//           callback(body);
//         });
//         response.on('data', function (chunk) {
//           if (response.statusCode === 200) {
//             body += chunk;
//           }
//         });
//       });
//
//     req.on('error', function(err) {
//       if (err.errno === process.ECONNREFUSED) {
//         fabric.log('ECONNREFUSED: connection refused to ' + oURL.hostname + ':' + oURL.port);
//       }
//       else {
//         fabric.log(err.message);
//       }
//       callback(null);
//     });
//
//     req.end();
//   }
//
//   /** @private */
//   var requestFs = function (path, callback) {
//     var fs = require('fs');
//     fs.readFile(path, function (err, data) {
//       if (err) {
//         fabric.log(err);
//         throw err;
//       }
//       else {
//         callback(data);
//       }
//     });
//   };
//
//   fabric.util.loadImage = function(url, callback, context) {
//
//
//     var img = new Image();
//     img.onerror = function(){
//       console.log("error");
//       callback && callback.call(context, null, true);
//     };
//     img.onload = function(){
//       console.log("success");
//       callback && callback.call(context, img);
//     };
//
//     function createImageAndCallBack(data) {
//       if (data) {
//         img.src = data;
//         // preserving original url, which seems to be lost in node-canvas
//         img._src = url;
//       }
//       else {
//         img = null;
//         callback && callback.call(context, null, true);
//       }
//     }
//
//     if (url && (url instanceof Buffer || url.indexOf('data') === 0)) {
//       img.src = img._src = url;
//     }
//     else if (url && url.indexOf('http') !== 0) {
//       var path = require("path");
//       url = fabric.util.getURL(url);
//       url =   path.resolve(fabric.util.mediaRoot, url);
//       img.src =  url;
//       // requestFs(url, createImageAndCallBack);
//     }
//     else if (url) {
//       request(url, 'binary', createImageAndCallBack);
//     }
//     else {
//       callback && callback.call(context, url);
//     }
//   };
// }else{
  fabric.util.loadResources = function (resources, callback, context, crossOrigin) {

    var loadedResources = {};
    var loader = fabric.util.queueLoad(Object.keys(resources).length,function(){
      callback(loadedResources);
    });
    for(var i in resources){
      (function(i){
        fabric.util.loadImage(resources[i], function(image){
          loadedResources[i] = image;
          loader();
        }, context, crossOrigin);
      }(i));
    }
  };

  fabric.util.loadImage = function (url, callback, context, crossOrigin) {
    url = fabric.util.getURL(url);
    function _check_errors(img){
      //изображение не было загружено
      if (img) {
        callback.call(this,img);
      } else {
        fabric.errors.push({type: "image", message: "Image was not loaded"});
        fabric.util._loadImage_overwritten(fabric.media.error, callback, context, crossOrigin || 'Anonymous');
      }
    }

    if(fabric.debugTimeout){
      setTimeout(fabric.util._loadImage_overwritten.bind(this,url, _check_errors , context, crossOrigin || 'Anonymous'),fabric.debugTimeout)
    }else{
      fabric.util._loadImage_overwritten(url, _check_errors , context, crossOrigin || 'Anonymous');
    }
  };


fabric.util.getURL = function(url){
  if (url.indexOf('blob') !== 0 && url.indexOf('data') !== 0 && url.indexOf('://') == -1) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + new Date().getTime()
  }
  return url;
};


fabric.util.loadVideo = function (sources, callback, context, crossOrigin) {

  function loadIt(url){
    video.src = fabric.util.getURL(url);
    video.addEventListener("loadeddata", function(){
      callback(video);
    }, true);
    video.load();
  }




  var video = document.createElement('video');


  //trying to find the most suitable source for current browser
  for (var type in sources) {
    if(video.canPlayType(type) == "yes"){
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  for (var type in sources) {
    if(video.canPlayType(type) == "maybe"){
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  console.warn("video sources formats is not supported")


};

fabric.util._loadSVGFromURL_overwritten = fabric.loadSVGFromURL;
fabric.loadSVGFromURL = function (url, callback, reviver) {
  if (url.indexOf('data') !== 0 && url.indexOf('://') == -1) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + moment().format('x');
  }
  fabric.util._loadSVGFromURL_overwritten(url, function(data){
     if(data){
       return callback(data);
     }

    var xml = jQuery.parseXML(atob(fabric.media.error.substr(26)));

    fabric.parseSVGDocument(xml.documentElement, function (results, options) {
      callback && callback(results, options);
    }, reviver);

  }, reviver);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var History = __webpack_require__(39);

History.prototype.insertRecords = false;
History.prototype.actions = {
  undo: {
    keyCode: 'z',
    ctrlKey:  true,
    observe: 'changed',
    className: 'fa fa-undo',
    title: 'undo',
    enabled: 'canUndo',
    action: function(){
      this.undo();
    }
  },
  records: {
    title:          "records",
    itemClassName:  "filters-selector",
    className:      "fa fa-history",
    type:           "select",
    templateSelection: function(state, container) {
      if (state.any) {
        return state.text;
      }
      return $('<span>' + state.id + ":" + state.type + '</span>');
    },
    templateResult: function(state, container,data) {
      if(!state.type)return;
      var _keys = state.originalState && Object.keys(state.originalState).join(',') || '';
      var type = state.object && state.object.type || '';
      return $("<span>{id}:{type}({otype} {keys})</span>".format(fabric.util.object.extend({keys : _keys, otype: type},state)));
      // if(state.id != "none"){
      //   var $canvas = $('<canvas>');
      //   $el.prepend($canvas);
      // }
      // return $el;
    },
    value:      {
      observe: 'changed',
      set : function(val,filtersData){
        this.goto(val);
      },
      get: function(){
        return this.records[this.current].id;
      },
      options: function(){
        return this.records;
      }
    }
  },
  redo: {
    keyCode: 'y',
    ctrlKey:  true,
    observe: 'changed',
    className: 'fa fa-repeat',
    title: 'redo',
    enabled: 'canRedo',
    action: function(){
      this.redo();
    }
  }
};

fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  history: {
    title: 'history',
    type: 'menu',
    target: function () {
      return this.history;
    },
    menu: function () {
      return this.actions;
    }
  }
});

fabric.util.object.extend(fabric.Canvas.prototype, {
  insertHistory: false,
  onObjectModified: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    var _canvas = e.target.canvas || e.target.wrapperEl && e.target;

    this.history.add({
      canvas:  e.target.canvas.originalSlide || e.target.canvas,
      originalState:  e.states.original,
      modifiedState:  e.states.modified,
      object: e.target,
      type: 'object:modified',
      undo: function (_action) {
        _action.object.set(_action.originalState);
        if(_action.canvas.mirrorSlide == this.canvas){
          _action.object.setCoords();
          var _canvas = this.canvas || this;
          _canvas.renderAll();
        }
        _action.canvas.fire('object:modified', { target: _action.object });
        _action.object.fire('modified');
        _action.canvas.renderAll();
      },
      redo: function (_action) {
        _action.object.set(_action.modifiedState);
        _action.object.setCoords();
        if(_action.canvas.mirrorSlide == this.canvas){
          _action.object.setCoords();
          var _canvas = this.canvas || this;
          _canvas.renderAll();
        }
        _action.canvas.fire('object:modified', { target: _action.object });
        _action.object.fire('modified');
        _action.canvas.renderAll();
      }
    });
  },
  clearHistory: function () {
    this.history.clear();
  },
  disableHistory: function () {
    this.history.enabled = false;
  },
  _add_object_history_action: function (_action) {
    var _canvas = this.canvas || this;
    if(this.canvas && _action.canvas.mirrorSlide == this.canvas){
      _canvas.add(_action.object);
      _canvas.setActiveObject(_action.object);
      _canvas.renderAll();
    }else{
      _action.canvas.add(_action.object);
    }
    _action.canvas.renderAll();
  },

  _remove_object_history_action: function (_action) {
    _action.canvas.remove(_action.object);
    _action.canvas.renderAll();
    if(this.canvas && _action.canvas.mirrorSlide == this.canvas){
      this.canvas.renderAll();
    }
  },

  onObjectRemoved: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add({
      canvas: e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:removed',
      redo: this._remove_object_history_action,
      undo: this._add_object_history_action
    });
  },
  onDrawAfter: function(event){
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add(this.freeDrawingBrush.getHistoryRecord(event))
  },
  onObjectAdded: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add({
      canvas:  e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:added',
      undo: this._remove_object_history_action,
      redo: this._add_object_history_action
    });
  },
  initHistory: function (history) {
    if(!history){
      history = new History(this);
      history.application = this.application;
    }

    this.history = history;
    this.on({
      'loading:begin':    this.clearHistory,
      'draw:after':       this.onDrawAfter,
      'object:modified':  this.onObjectModified,
      'object:added':     this.onObjectAdded,
      'object:removed':   this.onObjectRemoved
    });

    var _this = this;
    this.history.on('changed', function(e){
      if(this.activeAction.canvas){
        this.activeAction.canvas.moment = e.action.moment;
      }
    });
    var proto = this.application.prototypes.History;
    if(proto){
      if(proto.eventListeners){
        history.on(proto.eventListeners);
      }
    }
  },
  enableHistory: function () {
    this.history.enabled = true;
  }
});

if(fabric.Project){
  fabric.util.object.extend(fabric.Project.prototype.actions, {
    history: {
      insert: 'historyTools',
      title: 'history',
      type: 'menu',
      target: function () {
        return this.history;
      },
      menu: function () {
        return this.actions;
      }
    }
  });

  fabric.util.object.extend(fabric.Application.prototype, {
    _default_event_listeners : {
      "created": function (options) {

        if (this.history) {
          if (this.project) {
            this.project.initHistory();
            this.project.enableHistory();
          }
        } else if (this.canvas) {
          this.canvas.initHistory();
          this.canvas.enableHistory();
        }
      }
    }
  });
  fabric.util.object.extend(fabric.Project.prototype, {
    _default_event_listeners : {
      "slide:change:begin" : function(){
        this.processing = true ;
        if(this.history){
          this.history.processing = true ;
        }
      },
      "slide:changed" : function(){
        this.processing = false;
        if(this.history){
          this.history.processing = false;
        }
      }
    },
    historyTools: false,
    enableHistory: function () {
      this.history.enabled = true;
    }
  });
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {/**
* InteractiveMode mixin. Allow to switch between pan/edit/drawing canvas modes.
*/




var _mouse_down_overwritten = fabric.Canvas.prototype._onMouseDown;
var _mouse_up_overwritten = fabric.Canvas.prototype._onMouseUp;
var _mouse_move_overwritten = fabric.Canvas.prototype._onMouseMove;

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  specialProperties: fabric.SlideCanvas.prototype.specialProperties.concat(["interactiveMode"]),
  _initEventListeners_overwritten: fabric.Canvas.prototype._initEventListeners,
  _initEventListeners: function () {
    this._initEventListeners_overwritten();
    this.___onKeyDown = this._onKeyDown.bind(this);
    fabric.util.addListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _removeListeners_overwritten: fabric.Canvas.prototype.removeListeners,
  removeListeners: function () {
    this._removeListeners_overwritten();
    fabric.util.removeListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _onKeyDown: function (e) {
    return this._applyMixedMode(e);
  },
  getInteractiveMode: function () {
    return this.interactiveMode;
  },
  setInteractiveMode: function (tool) {
    //todo checkthis out
    // if (tool === 'hand') {
    //   this.setCursor('pointer');
    // }
    this.isDrawingMode = (tool === 'draw');
    this.isHandMode = (tool === 'hand');
    this.interactive = (tool !== 'disabled');
    this.isMixedMode = (tool === 'mixed');

    if (!this.interactive) {
      this.upperCanvasEl.style.cursor = 'default';
    }
    this.interactiveMode = tool;
  },

  /**
   *  current mode
   *  @values default | hand | selection
   *  @comment
   *      hand      - moving canvas
   *      draw - drawing reactangles
   *      selection - default behavior
   */
  interactiveMode: 'default',

  isHandMode: false,
  _handModeCursorMove: false,
  _handModeCursorDown: false,
  _handModeCursorPosition: {x: 0, y: 0},
  _handModeMouseMove: function (e) {
    if (this._handModeCursorDown === true) {

      if (e.pageY === this._handModeCursorPosition.y && e.pageX === this._handModeCursorPosition.x) {
        return;
      }

      this._handModeCursorMove = true;

      var scroll = {x: this.viewportTransform[4], y: this.viewportTransform[5]};

      var newScroll = {
        x: scroll.x - (this._handModeCursorPosition.x - e.pageX),
        y: scroll.y - (this._handModeCursorPosition.y - e.pageY)
      };

      var dims = {
        width: this.size.width * this.zoom - this.lowerCanvasEl.width,
        height: this.size.height * this.zoom - this.lowerCanvasEl.height
      };
      /*  todo need to add some restrictions later
       //Math.max(Math.min(0,newScroll.x),-dims.width);
       //Math.max(Math.min(0,newScroll.y),-dims.height);
       */
      this.viewportTransform[4] = newScroll.x;
      this.viewportTransform[5] = newScroll.y;

      this.fire('viewport:translate');

      this.renderAll();
      for (var i = 0, len = this._objects.length; i < len; i++) {
        this._objects[i].setCoords();
      }

      this._handModeCursorPosition.y = e.pageY;
      this._handModeCursorPosition.x = e.pageX;
    }
  },
  _handModeMouseUp: function () {
    this._handModeCursorDown = false;
    if (!this._handModeCursorMove) {

    }
  },
  _handModeMouseDown: function (e) {

    this._handModeCursorMove = false;
    this._handModeCursorDown = true;
    this._handModeCursorPosition = {
      y: e.pageY,
      x: e.pageX
    };
  },
  handModeEnabled: false,
  handModeKey: "Alt",
  _applyMixedMode: function (e) {
    this._current_target = this.findTarget(e);

    if (this.handModeEnabled && e.altKey || e.key === this.handModeKey) {
      //if shift use hand mode
      if (!this.isHandMode) {
        this.isHandMode = true;
        this.isDrawingMode = false;
        this.setCursor('pointer');
      }
    } else if (this.isMixedMode && !this._isCurrentlyDrawing && !this._currentTransform) {

      this.isHandMode = false;

      if (this._current_target) {
        if (this.freeDrawingBrush && this._current_target.allowDrawing) {
          var corner = this._current_target._findTargetCorner(this.getPointer(e, true));
          if (!corner) {
            this.isDrawingMode = true;
          } else {
            this.isDrawingMode = false;
          }
        } else if (this.isDrawingMode) {
          this.isDrawingMode = false;
        }
      } else {
        if (this.freeDrawingBrush && !this.isDrawingMode) {
          this.setCursor(this.freeDrawingCursor);
          this.isDrawingMode = true;
        }
      }
    } else {
      this.isHandMode = false;
    }

  },
  _onMouseMove: function (e) {
    if (!this.interactive) {
      return;
    }

    this._applyMixedMode(e);

    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }

      if (this._handModeActive) {
        return this._handModeMouseMove(e);
      }
      this.fire('mouse:move', {target: this._current_target, e: e});
      this._current_target && this._current_target.fire('mousemove', {e: e});
      return true;
    } else {
      return _mouse_move_overwritten.call(this, e);
    }
  }, /**
   * @private
   */
  _onScale: function (e, transform, x, y) {

    var useUniScale = e.shiftKey ^ this.shiftInverted;
    // rotate object only if shift key is not pressed
    // and if it is not a group we are transforming
    if ((useUniScale || this.uniScaleTransform) && !transform.target.get('lockUniScaling')) {
      transform.currentAction = 'scale';
      return this._scaleObject(x, y);
    }
    else {
      // Switch from a normal resize to proportional
      if (!transform.reset && transform.currentAction === 'scale') {
        this._resetCurrentTransform(e);
      }

      transform.currentAction = 'scaleEqually';
      return this._scaleObject(x, y, 'equally');
    }
  },
  shiftInverted: false,
  _setCursorFromEvent_overwritten: fabric.Canvas.prototype._setCursorFromEvent,
  _setCursorFromEvent: function (e, target) {
    if (this.isHandMode) {
      this.setCursor('pointer');
    } else {
      this._setCursorFromEvent_overwritten(e, target);
    }
  },
  _onMouseDown: function (e) {
    if (!this.interactive) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this._applyMixedMode(e);
    if (this.isHandMode && this._current_target) {
      this._current_target.selectable_overwritten = this._current_target.selectable;
      this._current_target.selectable = false;
    }

    _mouse_down_overwritten.call(this, e);


    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }
      this._handModeActive = true;
      this._handModeMouseDown(e);
    }
  },

  _onMouseUp: function (e) {
    if (!this.interactive) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    _mouse_up_overwritten.call(this, e);

    if (this.isHandMode) {
      this._handModeActive = false;
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


var _onResize_overwritten = fabric.Canvas.prototype._onResize;

var _set_dimensions_overwritten = fabric.Canvas.prototype.setDimensions;
var _renderAllNative = fabric.SlideCanvas.prototype.renderAll;
fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  _renderAllNative: _renderAllNative,
  _onResizeNative: _onResize_overwritten,

  setImageSmoothingEnabled: function(value){
    this.imageSmoothingEnabled = value;
    this._setImageSmoothing();
  },
  /**
   * @private
   * @see {@link http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-imagesmoothingenabled|WhatWG Canvas Standard}
   */
  _setImageSmoothing: function() {
    var ctx = this.getContext();

    // ctx.imageSmoothingEnabled = ctx.imageSmoothingEnabled || ctx.webkitImageSmoothingEnabled
    //   || ctx.mozImageSmoothingEnabled || ctx.msImageSmoothingEnabled || ctx.oImageSmoothingEnabled;
    ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;

    if(this.layers && this.layers.background){
      this.layers.background.context.imageSmoothingEnabled = this.imageSmoothingEnabled;
    }
  },

  _onResize: function(){
    this._onResizeNative();
    if(this.onResize){
      this.onResize();
    }
    this.fire("resize");
  },
  create: function () {
    this.created = true;
    this._initInteractive();
    this._createCacheCanvas();
    this.initLayers();
  },
  createLayer: function(zindex){
    var _canvasElement = fabric.util.createCanvasElementWithSize(this);
    _canvasElement.style.left = 0;
    _canvasElement.style.top = 0;
    _canvasElement.style.position = 'absolute';
    var _ctx = _canvasElement.getContext('2d');
    _ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;


    var layerAfter = null;
    for(var i in this.layers){

      if(this.layers[i].zindex > zindex && !layerAfter || layerAfter.zindex > this.layers[i].zindex){
        layerAfter  = this.layers[i];
      }
    }
    if(this.wrapperEl){
      if(layerAfter){
        this.wrapperEl.insertBefore(_canvasElement,layerAfter.canvas);
      }else{
        this.wrapperEl.appendChild(_canvasElement);
      }
    }


    return {
      transform: true,
      canvas: _canvasElement,
      context: _ctx,
      objects: []
    }
  },
  layersOrder: ["background","objects","selection","controls","interaction","interface"],
  initLayers: function(){

    this.layers = {
      lower: {
        zindex: 5,
        transform: true,
        objects: this._objects,
        canvas: this.lowerCanvasEl,
        context: this.contextContainer
      }
      // selection: this.createLayer(),
      // interaction: this.createLayer(),
      // overla: this.createLayer(),

    };

    this.layers.background = this.createLayer(0);



    if(this.upperCanvasEl){
      this.wrapperEl.appendChild(this.upperCanvasEl);
    }
    var layers = this.layers;
    this.layersOrder = this.layersOrder.map(function(i){
      return layers[i];
    });

    this.on("resize",function(){
      for(var i in this._backgroundLayer){
        this._backgroundLayer[i].setCoords();
      }
    });

    this.layers.upper = {
      zindex:     99,
      transform:  false,
      objects:    [],
      canvas:     this.upperCanvasEl,
      context:    this.contextTop
    };
  },
  /**
   * Helper for setting width/height
   * @private
   * @param {String} prop property (width|height)
   * @param {Number} value value to set property to
   * @return {fabric.Canvas} instance
   * @chainable true
   */
  _setBackstoreDimension: function (prop, value) {

    for(var i in this.layers){
      this.layers[i].canvas[prop] = value;
    }

    if (this.cacheCanvasEl) {
      this.cacheCanvasEl[prop] = value;
    }

    this[prop] = value;

    return this;
  },

  /**
   * Helper for setting css width/height
   * @private
   * @param {String} prop property (width|height)
   * @param {String} value value to set property to
   * @return {fabric.Canvas} instance
   * @chainable true
   */
  _setCssDimension: function (prop, value) {

    for(var i in this.layers){
      this.layers[i].canvas.style[prop] = value;
    }

    if (this.wrapperEl) {
      this.wrapperEl.style[prop] = value;
    }

    return this;
  },
  setDimensions: function (dimensions, options) {
    _set_dimensions_overwritten.call(this, dimensions, options);

    if(this.backgroundImage && this.backgroundImage.constructor !== String){
      this._update_background_image();
    }
    //this._update_clip_rect();
    this.fire("dimensions:modified");
    this.renderAll();
  },
  add: function (/*, isNewElement*/) {
    for (var i = 0, length = arguments.length; i < length; i++) {
      var obj = arguments[i];
      fabric.util.object.defaults(obj, fabric.SlideObject);

      if(obj.layer) {
        var _layer = this.layers[obj.layer];
        if(!_layer){
          _layer = this.layers[obj.layer] = this.createLayer();
        }
        _layer.objects.push(obj)
      }else{
        this._objects.push(obj);
      }
      if (this._onObjectAdded) {
        this._onObjectAdded(obj);
      }
    }

    //todo
    // if(isNewElement){
    //   this.addAlementInTheMiddle(el);
    //   this.setActiveObject(el);
    // }

    this.renderOnAddRemove && this.renderAll();
    return this;
  },
  remove: function () {
    var _objects = this.getObjects(),
      index;
    var objects;
    for (var i = 0, length = arguments.length; i < length; i++) {
      if (arguments[i].layer) {
        objects = arguments[i].layer;
      } else {
        objects = _objects;
      }

      index = objects.indexOf(arguments[i]);
      // only call onObjectRemoved if an object was actually removed
      if (index !== -1) {
        objects.splice(index, 1);
        this._onObjectRemoved(arguments[i]);
      }
    }

    this.renderOnAddRemove && this.renderAll();
    return this;
  },
  renderLayer: function (layer) {
    layer = this.layers[layer];
    if(this.processing)return false;
    var ctx = layer.context;
    ctx.save();
    this.clearContext(ctx);
    this.clipTo && fabric.util.clipContext(this, ctx);
    layer.transform &&  ctx.transform.apply(ctx, this.viewportTransform);
    this._renderObjects(layer.context,layer.objects);
    ctx.restore();
  },
  renderAll: function () {
    if(this.processing)return false;
    if (!this.virtual && this.selection && !this._groupSelector && !this.isDrawingMode) {
      this.clearContext(this.contextTop);
    }

    this.fire('before:render');

    for(var i in this.layers){
      var ctx = this.layers[i].context;
      this.clearContext(ctx);
      ctx.save();
      if (this.clipTo) {
        fabric.util.clipContext(this, ctx);
      }
      if(this.layers[i].transform){
        ctx.transform.apply(ctx, this.viewportTransform);
      }
    }

    this._renderBackground(this.layers.background.context);


    this.layers.lower._objects = this.layers.lower.objects;
    this.layers.lower.objects = this._chooseObjectsToRender();

    for(var i in this.layers){
      this._renderObjects(this.layers[i].context,this.layers[i].objects);
    }
    this.layers.lower.objects = this.layers.lower._objects;

    this.fire('render');

    if(!this.virtual){
      if (!this.controlsAboveOverlay && this.interactive ) {
        this.drawControls(this.layers.upper.context);
      }
      this._renderOverlay(this.layers.upper.context);
    }

    if (this.controlsAboveOverlay && this.interactive && !this._isCurrentlyDrawing ) {

      if(this.borderOpacityWhenMoving || !this.isMoving){
        this.drawControls(this.layers.upper.context);
      }
    }


    for(var i in this.layers) {
      var ctx = this.layers[i].context;
      ctx.restore();
    }

    this.fire('after:render');
  },
  _renderBackground: function(ctx) {
    this._renderBackgroundOrOverlay(ctx, 'background');
  },
  _renderOverlay: function(ctx) {
    this._renderBackgroundOrOverlay(ctx, 'overlay');

    // if (this._interfaceLayer) {
    //   this._renderObjects(ctx, this._interfaceLayer);
    // }
  },
  storeProperties: fabric.Object.prototype.storeProperties.concat(["layer"])
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Application.prototype, {
  // loaderTemplate: "<span class='fa fa-pulse fa-spinner canvas-load-spinner'></span>",
  loaderIcon:   'data:image/svg+xml;base64,' + __webpack_require__(12),
  loaderContainer: null,
  _showMainLoaderIndicator: function () {
    this.loaderEl.show();
    this.loaderContainer.addClass("processing");
  },
  _hideMainLoaderIndicator: function () {
    this.loaderEl.hide();
    this.loaderContainer.removeClass("processing");
  },
  setLoaderTemplate: function (val) {
    if(this.virtual) return false;
    this.loaderTemplate = val.replace("{loaderIcon}",this.loaderIcon);
    if(val) {
      this.loaderContainer = $(this.loaderContainer);
      this.loaderEl = $(this.loaderTemplate).hide();
      this.loaderContainer.append(this.loaderEl);
      // this.on("loading:begin", this._showMainLoaderIndicator);
      // this.on("loading:end", this._hideMainLoaderIndicator);


      this.on("project:changed",function(){
        this.project.on("slide:change:begin", this._showMainLoaderIndicator.bind(this));
        this.project.on("slide:changed", this._hideMainLoaderIndicator.bind(this));
      })

    }
  }
});


// fabric.util.object.extend(fabric.SlideCanvas.prototype, {
//   // loaderTemplate: "<span class='fa fa-pulse fa-spinner canvas-load-spinner'></span>",
//   setLoaderTemplate: function (val) {
//     if(this.virtual) return false;
//     this.loaderTemplate = val;
//     if(val) {
//       this.loaderEl = $(this.loaderTemplate).hide();
//       $(this.wrapperEl).append(this.loaderEl);
//       this.on("loading:begin", function () {
//         this.loaderEl.show();
//         $(this.wrapperEl).addClass("processing");
//       });
//       this.on("loading:end", function () {
//         this.loaderEl.hide();
//         $(this.wrapperEl).removeClass("processing");
//       });
//     }
//   }
// });

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


var _set_sbackground_image_overwritten = fabric.Canvas.prototype.setBackgroundImage;

fabric.util.object.extend(fabric.Canvas.prototype, {
  /**
   * backgroundPosition
   * @values manual | cover | fit
   */
  backgroundPosition: 'manual',
  setBackgroundPosition: function (src) {
    this.backgroundPosition = src;
    this._update_background_image();
    return this;
  },
  offsets: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },

  // setBackgroundImage: function (src, callback, options) {
  //
  //   _set_sbackground_image_overwritten.call(this, src, function () {
  //     this._update_background_image();
  //     callback && callback(this.backgroundImage);
  //   }.bind(this), options);
  //   return this;
  // },
  fillBackgroundColorOverCanvas: false,
  _renderBackgroundOrOverlay: function(ctx, property) {
    var object = this[property + 'Color'];
    if (object) {
      ctx.fillStyle = object.toLive
        ? object.toLive(ctx)
        : object;

      if(this.fillBackgroundColorOverCanvas){
        ctx.fillRect(
          object.offsetX || -this.viewportTransform[4]/ this.viewportTransform[0],
          object.offsetY || -this.viewportTransform[5]/ this.viewportTransform[0],
          this.width / this.viewportTransform[0],
          this.height  / this.viewportTransform[0]);
      }else{
        ctx.fillRect(
          object.offsetX || 0,
          object.offsetY || 0,
          this.originalWidth ,
          this.originalHeight);
      }
    }
    object = this[property + 'Image'];
    if(object && object.constructor !== String &&  object.constructor !== Object){
        object.render(ctx);
    }
  },
  getImageData: function (options) {
    options = fabric.util.object.extend({
      clipped_area: false,
      clipped_area_only: false,
      draw_background: true,
      format: 'png',
      quality: 0.8
    }, options || {});

    var size;
    if (options.clipped_area) {
      size = options.clipped_area.getBoundingRect();
      var _zoom = this.getZoom();
      size.left   /= _zoom;
      size.top    /= _zoom;
      size.width  /= _zoom;
      size.height /= _zoom;
      fabric.util.object.extend(options, size);
    } else {
      size = {
        width: options.width || this.originalWidth || this.width,
        height: options.height || this.originalHeight || this.height,
      };

      if (options.clipped_area_only) {
        size.width -= this.offsets.left + this.offsets.right;
        size.height -= this.offsets.top + this.offsets.bottom;
      }
    }
    if (options.zoom) {
      size.width *= options.zoom;
      size.height *= options.zoom;
    }

    var canvas = fabric.util.createCanvasElement();
    canvas.width = size.width;
    canvas.height = size.height;

    options.left = Math.floor(options.left);
    options.top = Math.floor(options.top);
    options.height = Math.ceil(options.height);
    options.width = Math.ceil(options.width);

    this.renderThumb(canvas, options);

    var src = canvas.toDataURL(options);

    var blob = fabric.util.dataURItoBlob(src, 'image/' + options.format);
    var objectURL = URL.createObjectURL(blob);
    return {
      dataURL: src,
      blob: blob,
      url: objectURL,
      canvas: canvas
    };
  },
  getOriginalSize: function () {
    return {
      width: this.originalWidth,
      height: this.originalHeight
    }
  },

  renderThumb: function (canvas, options) {

    options = options || {
        objects: true,
        clipped_area_only: false,
        draw_background: true
      };

    if (options.zoom) {
      var _zoom = options.zoom;
    } else {
      if (canvas.width) {
        var _zoom = canvas.width / (this.originalWidth || this.width)
      } else {
        var _zoom = 1;
      }
    }
    var _old_Scale = this.viewportTransform[0];
    var old_x = this.viewportTransform[4];
    var old_y = this.viewportTransform[5];
    this.viewportTransform[4] = this.viewportTransform[5] = 0;
    this.viewportTransform[0] = this.viewportTransform[3] = 1;

    this.viewportTransform[0] = this.viewportTransform[3] = _zoom;
    //this._update_clip_rect();

    if (this.clipRect) {
      this.clipRect.setOpacity(0);
    }

    var size = {
      width: this.originalWidth || this.width,
      height: this.originalHeight || this.height
    };
    size.width = Math.ceil(size.width * _zoom);
    size.height = Math.ceil(size.height * _zoom);

    var _canvas = fabric.util.createCanvasElement();
    _canvas.width = size.width;
    _canvas.height = size.height;

    var canvasToDrawOn = _canvas.getContext('2d'), objsToRender;

    this.clearContext(canvasToDrawOn);
    canvasToDrawOn.save();
    canvasToDrawOn.transform.apply(canvasToDrawOn, this.viewportTransform);

    if (options.draw_background) {
      this._renderBackground(canvasToDrawOn);
      //if (this._backgroundLayer) {
      //  this._renderObjects(canvasToDrawOn, this._backgroundLayer);
      //}
    }

    if (!options.clipped_area_only && this.clipTo) {
      fabric.util.clipContext(this, canvasToDrawOn);
    }

    var _objects;
    if (options.objects && options.objects.constructor === Array) {
      _objects = options.objects;
    } else {
      _objects = options.objects !== false ? this._objects : [];
    }
    if (options.clipped_area) {
      _objects = fabric.util.object.clone(_objects);
      for (var i = _objects.length; i--;) {
        if (_objects[i].clipTo !== options.clipped_area) {
          _objects.splice(i, 1);
        }
      }
    }
    // if (fabric.version >= 1.6) {
      this._renderObjects(canvasToDrawOn, _objects);
    // } else {
    //   for (var i = 0, length = _objects.length; i < length; ++i) {
    //     this._draw(canvasToDrawOn, _objects[i]);
    //   }
    // }


    canvasToDrawOn.restore();
    if (!options.clipped_area_only && this.clipTo) {
      canvasToDrawOn.restore();
    }
    this._renderOverlay(canvasToDrawOn);
    canvasToDrawOn.restore();
    if (this.clipRect) {
      this.clipRect.setOpacity(1);
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (options.clipped_area_only && this.clipRect) {
      var _rect = {
        left: this.clipRect.left * _zoom,
        top: this.clipRect.top * _zoom,
        width: this.clipRect.width * _zoom,
        height: this.clipRect.height * _zoom
      };
    } else {
      var _rect = {
        left: options.left * _zoom || 0,
        top: options.top * _zoom || 0,
        width: options.width * _zoom || size.width,
        height: options.height * _zoom || size.height
      };
    }
    if (options.angle) {
      ctx.rotate(-options.angle * Math.PI / 180);
      ctx.drawImage(_canvas,
        0, 0, _rect.width + _rect.left + _canvas.width, _rect.height + _rect.top + _canvas.height,
        -_rect.left, -_rect.top, canvas.width + _rect.left + _canvas.width, canvas.height + _rect.top + _canvas.height);
    } else {
      ctx.drawImage(_canvas, _rect.left, _rect.top, _rect.width, _rect.height, 0, 0, canvas.width, canvas.height);
    }

    this.viewportTransform[0] = this.viewportTransform[3] = _old_Scale;
    // this._update_background_image();
    //this._update_clip_rect();

    this.viewportTransform[4] = old_x;
    this.viewportTransform[5] = old_y;


    return canvas;
  },

  // setOffsets: function (_offsets) {
  //   this.offsets = _offsets || fabric.util.object.extend({}, fabric.SlideCanvas.prototype.offsets);
  //   //this._update_clip_rect();
  //   return this;
  // },
  getRect: function (options) {


    var rect = {};

    var _w = this.originalWidth || this.width; //this.originalWidth
    var _flexArray = fabric.util.flex(_w , [{value: options.left, flex: 0},{value: options.width, flex: 1},{value: options.right, flex: 0}] );
    rect.left = _flexArray[0];
    rect.width = _flexArray[1];
    rect.right = _flexArray[2];

    var _h = this.originalHeight|| this.height;   //this.originalHeight
    var _flexArray = fabric.util.flex(_h , [{value: options.top, flex: 0},{value: options.height, flex: 1},{value: options.bottom, flex: 0}] );
    rect.top = _flexArray[0];
    rect.height = _flexArray[1];
    rect.bottom = _flexArray[2];

    return rect;
  },
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.saveAs  = __webpack_require__(40).saveAs;

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  insertRenderArea: false,
  insertRenderFull: false,
});


fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  renderArea: {
    className: 'fa fa-download',
    title: 'Render Area',
    action: function () {
      fabric.saveAs(this.getImageData({
        clipped_area: this.activeArea,
        zoom: this.dotsPerUnit,
        clipped_area_only: true,
        draw_background: false
      }).blob, this.title);
    }
  },
  renderFull: {
    title: 'Render full',
    action: function () {
      fabric.saveAs(this.getImageData({
        zoom: this.dotsPerUnit,
        clipped_area_only: false,
        draw_background: true
      }).blob, this.title);
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


fabric.util.uploadImageMaxSize = {
  width: 400,
  height: 400
};

fabric.util.uploadImageMinSize = {
  width: 100,
  height: 100
};

fabric.util.multiUpload = false;

fabric.util.readFile = function(file,callback){

  var reader = new FileReader();
  reader.onload = function (e) {
    var result = e.target.result;
    var type = result.substr(11, result.indexOf(";") - 11);
    var img = new Image();
    img.type = type;
    img.name = file.name;
    img.onload = function () {

      if(!fabric.util.multiUpload){
        if (fabric.util.uploadPreprocessor) {
          fabric.util.uploadPreprocessor([this], function (val) {
            callback(val);
          },options)
        } else {
          callback(this);
        }
      }else{
        callback();
      }
    };
    img.src = result;
  };
  reader.readAsDataURL(file );
};


fabric.util.createUploadInput = function (options, complete, progress) {

  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", true);
  input.className = "hidden";

  $(input).change(function () {

    if(input.files && input.files.length){

      var _loader = fabric.util.queueLoad(input.files.length,function(loaded){

        if(fabric.util.multiUpload){
          if (fabric.util.uploadPreprocessor) {
            fabric.util.uploadPreprocessor(loaded, function (val) {
              complete(val,options);
            },options)
          } else {
            complete(loaded,options);
          }
        }else{
          complete(loaded[0],options);

        }
      },function(total, current, image){
        if(fabric.util.multiUpload) {
          if (progress) {
            progress(total, current, image);
          }
        }
      });



      for(var i =0; i< input.files.length; i++){
        fabric.util.readFile(input.files[i],_loader);
      }



    }

  });

  fabric.util.uploadInput = input;
};


//fabric.util.resizeImage(img, callback);
fabric.util.uploadPreprocessor = null;


fabric.util.uploadImage = function (cb,progress,options) {
  fabric.util.createUploadInput(options,cb,progress);
  $(fabric.util.uploadInput).trigger('click');
};


fabric.util.resizeUploadedImage = function (img, callback) {

  if (img.type === "svg+xml") {
    callback(img);
    return;
  }
  //Here we can put a restriction to upload a minim sized logo
  if (img.width < fabric.util.uploadImageMinSize.width || img.height < fabric.util.uploadImageMinSize.height) {
    alert("Logo is too small. MInimum size is " + fabric.util.uploadImageMinSize.width + "x" + fabric.util.uploadImageMinSize.height);
    callback(false);
    return;
  }

  if (img.width > fabric.util.uploadImageMaxSize.width || img.height > fabric.util.uploadImageMaxSize.height) {

    var size = fabric.util.getProportions(img, fabric.util.uploadImageMaxSize, "fit");

    var filter = new fabric.Image.filters.ResizeDP();

    var canvas = fabric.util.createCanvasElementWithSize(img);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    filter.applyTo(canvas, size.width, size.height);
    callback(canvas);
  } else {
    callback(img);
  }
};


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {



/////////////////module responsive borders//////////////////////////////////////////////////////////////////////////////////////////

fabric.util.object.extend(fabric.Object.prototype, {
  responsiveBorders: false
});

if(!fabric.SlideCanvas.prototype._default_event_listeners){
  fabric.SlideCanvas.prototype._default_event_listeners = {};
};

fabric.Object.prototype.updateResponsiveBorder = function(){
  if(this.responsiveBorders){
    if(!this.originalStrokeWidth){
      this.originalStrokeWidth = this.strokeWidth;
    }
    this.strokeWidth = this.canvas ? this.originalStrokeWidth / this.canvas.viewportTransform[0] : 0;
  }
};

fabric.SlideCanvas.prototype._default_event_listeners['viewport:scaled'] = function(){

  if(this.backgroundImage){
    this.backgroundImage.updateResponsiveBorder();
  }
  for(var i in this._objects){
    this._objects[i].updateResponsiveBorder();
  }
};

fabric.SlideCanvas.prototype._default_event_listeners["background-image:loaded"] = function(event){
  if(this.autoCenterAndZoomOutEnabled) {
    this.centerAndZoomOut();
  }
};

fabric.SlideCanvas.prototype._default_event_listeners["loading:end"] = function(event){
  if(this.autoCenterAndZoomOutEnabled && (this.originalHeight || this.originalWidth) ){
    this.centerAndZoomOut();
  }
};



fabric.SlideCanvas.prototype._default_event_listeners["object:added"] = function(event){
  event.target.updateResponsiveBorder()
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  zoomCtrlKey: true,
  mouseWheelEnabled : false,
  _setZoomNative  : fabric.Canvas.prototype.setZoom,
  _zoomToPointNative  : fabric.Canvas.prototype.zoomToPoint,
  insertZoomTools: false,
  insertZoomNumber: false,
  changeDimensionOnZoom: false,
  drawZoomArea : function(_ctx,left, top ,width, height ){
    _ctx.save();
    _ctx.translate(left || 0, top || 0);
    var _scale = this.getZoom();
    var _size = fabric.util.getProportions(this.backgroundImage, {width: width || 100, height: height || 100});
    _ctx.globalAlpha = 0.5;
    _ctx.fillRect(0,0,_size.width, _size.height);
    _ctx.strokeStyle = "red";

    var v = this.viewportTransform;

    var x1 = -v[4] * _size.scale / _scale;
    var y1 = -v[5] * _size.scale / _scale;
    var x2 = x1 + this.width * _size.scale / _scale;
    var y2 = y1 + this.height * _size.scale / _scale;

    x1 = Math.max(x1,0);
    y1 = Math.max(y1,0);
    x2 = Math.min(x2,_size.width);
    y2 = Math.min(y2,_size.height);

    _ctx.globalAlpha = 1;
    _ctx.beginPath();
    _ctx.moveTo(x1,y1);
    _ctx.lineTo(x2,y1);
    _ctx.lineTo(x2,y2);
    _ctx.lineTo(x1,y2);
    _ctx.lineTo(x1,y1);

    _ctx.fill();
    _ctx.clip();
    // _ctx.globalCompositeOperation = "source-in";
    _ctx.drawImage(this.backgroundImage._element,0,0,_size.width, _size.height)
    // _ctx.globalCompositeOperation = "source-over";
    // _ctx.drawImage(this.backgroundImage._element,0,0,_size.width, _size.height)
    _ctx.stroke();
    _ctx.strokeRect(0,0,_size.width, _size.height);
    _ctx.restore();
  },
  setZoom: function (_scale){
    if(this.changeDimensionOnZoom){
      var _w = Math.round(this.originalWidth * _scale);
      var _h = Math.round(this.originalHeight * _scale);
      this.setDimensions({
        width: _w,
        height: _h
      });
    }
    this._zoomToPointNative( new fabric.Point(0, 0), _scale)
    //  this._setZoomNative(_scale);
    this.fire('viewport:scaled', {scale: _scale});
  },
  zoomToPoint: function(point, newZoom){
    var _max =  this.getMaxZoom();
    var _min =  this.getMinZoom().scale;
    if(newZoom > _max){
      newZoom = _max;
    }
    if(newZoom < _min){
      newZoom = _min;
    }
    this._zoomToPointNative( point, newZoom);
    for (var i in this._objects) {
      this._objects[i].setCoords();
    }
    this.fire('viewport:scaled', {scale: newZoom});
  },
  resetViewport: function () {
    _canvas.viewportTransform[0] = 1;
    _canvas.viewportTransform[3] = 1;
    _canvas.viewportTransform[4] = 0;
    _canvas.viewportTransform[5] = 0;
    _canvas.renderAll();
    for (var i in this._objects) {
      this._objects[i].setCoords();
    }
  },
  zoomToPointEnabled: true,
  minZoomFactor: 1,
  maxZoom: 20,
  autoCenterAndZoomOutEnabled: false,
  getMaxZoom: function () {
    return this.maxZoom;
  },
  getMinZoom: function () {
    var _containerSize = {
      width: $(this.wrapperEl).width(),
      height: $(this.wrapperEl).height()
    };
    var _bgSize = {
      width: this.originalWidth,
      height: this.originalHeight
    };
    var _maxSize = {
      width: _containerSize.width * this.minZoomFactor,
      height: _containerSize.height * this.minZoomFactor
    };

    return fabric.util.getProportions(_bgSize, _maxSize, 'fit');
  },
  centerAndZoomOut: function () {

    if(this.virtual){
      return;
    }
    var options = this.getMinZoom();

    var _containerSize = {
      width: $(this.wrapperEl).width(),
      height: $(this.wrapperEl).height()
    };
    this.setZoom(options.scale);
    this.viewportTransform[4] = (_containerSize.width - options.width ) / 2;
    this.viewportTransform[5] = (_containerSize.height - options.height) / 2;
    this._update_background_image();
    // this.fire("viewport:scaled",{scale: options.scale})
    //this.renderAll();
  },
  centerOnObject: function(tag){
    var br = tag.getBoundingRect();
    var ct = this.viewportTransform;
    br.width /= ct[0];
    br.height /= ct[3];
    var size = {
      width: br.width * 1.1,
      height: br.height * 1.1
    };

    var prop = fabric.util.getProportions(size,this);
    var _w = (this.width / prop.scale - size.width ) / 2;
    var _h = (this.height / prop.scale - size.height) / 2;
    var _l = (br.left  - ct[4]) / ct[0];
    var _t = (br.top - ct[5]) / ct[3];

    var x1 = [
      prop.scale,
      0,0,
      prop.scale,
      - tag.left * prop.scale + (tag.width * 0.05 + _w) * prop.scale,
      - tag.top * prop.scale + (tag.height * 0.05 + _h )* prop.scale
    ];
    var x2 = [
      prop.scale,
      0,0,
      prop.scale,
      - _l  * prop.scale + (br.width * 0.05 + _w) * prop.scale,
      - _t  * prop.scale + (br.height * 0.05 + _h )* prop.scale
    ];

    this.setViewportTransform(x2);
    this.fire("viewport:scaled",{scale: prop.scale})
    this.renderAll();
  },

  __onMouseWheel: function (event) {

    if(!this.mouseWheelEnabled || this.zoomCtrlKey && !event.ctrlKey){
      return;
    }
//Find nearest point, that is inside image END
    var zoomStep;// = 0.1 * event.deltaY;
    if (event.deltaY < 0) {
      zoomStep = 1.1;
    } else {
      zoomStep = 0.9;
    }

    var newZoom = this.getZoom() * zoomStep;
    var minZoom = this.getMinZoom().scale;


    if(this.zoomToPointEnabled){
      var point = new fabric.Point(event.offsetX, event.offsetY);
      var _x = this.viewportTransform[4];
      var _y = this.viewportTransform[5];

      // Find nearest point, that is inside image BEGIN
      // It is needed to prevent canvas to zoom outside image
      var _w = this.originalWidth * this.getZoom() + _x;
      var _h = this.originalHeight * this.getZoom() + _y;


      if (point.x < _x) {
        point.x = _x;
      }
      if (point.y < _y) {
        point.y = _y;
      }
      if (point.x > _w) {
        point.x = _w;
      }
      if (point.y > _h) {
        point.y = _h;
      }
      if (minZoom > newZoom) {
        if(this.autoCenterAndZoomOutEnabled){
          this.centerAndZoomOut();
        }
      } else {
        this.zoomToPoint(point, newZoom);
      }
    }else{
      this.setZoom(newZoom);
    }




    for (var i in this._objects) {
      this._objects[i].setCoords();
    }
    this.renderAll();
    event.stopPropagation();
    event.preventDefault();
    return false; //preventing scroll page
  },
  scaleFactor: 1.1,
  getOrignalCenter : function(){
    var point = this.getCenter();
    point.left += this.viewportTransform[4] ;
    point.top += this.viewportTransform[5];
    return point;
  }
});


fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  zoom: {
    title: "zoom",
    menu: {
      zoomOut: {
        className: 'fa fa-search-minus',
        insert: "insertZoomTools",
        title: 'zoom-out',
        action: function (m) {
          var point = this.getOrignalCenter();
          var scaleValue = this.getZoom() / this.scaleFactor;
          this.zoomToPoint({x: point.left, y: point.top},scaleValue);
        }
      },
      zoomNumber: {
        type: 'number',
        value: {
          min:  function(){return 0.01},
          max:  function(){return 10},
          set: function (val) {
            this.setZoom(val)
          },
          get: function () {
            return this.getZoom()
          },
          observe: "viewport:scaled"
        }
      },
      zoomIn: {
        className: 'fa fa-search-plus',
        insert: "insertZoomTools",
        title: 'zoom-in',
        action: function (m) {
          var point = this.getOrignalCenter();
          var scaleValue = this.getZoom() * this.scaleFactor;
          this.zoomToPoint({x: point.left, y: point.top},scaleValue);
        }
      }
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


//fabric.require("SlideImage",["SlideObject"/*,"Pathfinder"*/],function() {

var ImageInitOverWritten = fabric.Image.prototype.initialize;
fabric.util.object.extend(fabric.Image.prototype, {
  contentOffsets: null,
  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {Boolean} noTransform
   */
  _render: function(ctx, noTransform) {
    var x, y, imageMargins = this._findMargins(), elementToDraw;

    x = (noTransform ? this.left : -this.width / 2);
    y = (noTransform ? this.top : -this.height / 2);

    if (this.meetOrSlice === 'slice') {
      ctx.beginPath();
      ctx.rect(x, y, this.width, this.height);
      ctx.clip();
    }

    if (this.isMoving === false && this.resizeFilters.length && this._needsResize()) {
      this._lastScaleX = this.scaleX;
      this._lastScaleY = this.scaleY;
      elementToDraw = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, true);
    }
    else {
      elementToDraw = this._element;
    }
    this._renderFill(ctx);
    elementToDraw && ctx.drawImage(elementToDraw,
      x + imageMargins.marginX,
      y + imageMargins.marginY,
      imageMargins.width,
      imageMargins.height
    );

    this._stroke(ctx);
    this._renderStroke(ctx);
  },
  imageTools:     false,
  photoshopTools  : false,
  cloneSync: function() {
    var _object = this.toObject();
    delete _object.filters;
    var clone = new fabric.Image(this._element,_object);
    clone._filteredEl = this._filteredEl;
    clone.filters = this.filters;
    return clone;
  },
  revertChanges: function() {
    var pathfinder = this.canvas.getPathfinder();
    if (pathfinder.target && pathfinder.target == this){
      pathfinder.hide();
    }

    if(this._element == this._originalElement){
      return;
    }

    this.filters.length = 0;
    if (this._filteredEl) {
      delete this._filteredEl;
    }
    delete this._edited;
    this._element = this._originalElement;

    this.fire("content:modified",{
      bounds: {minX: 0, minY: 0, maxX: this._element.width, maxY: this._element.height }
    });


    this.canvas.renderAll();
  },
  removeWhite: function(threshold,removeAll,callback) {


    var rwf = _.findWhere(this.filters, {type: 'RemoveWhiteDP'});

    if(rwf) {
      rwf.options.colorThreshold = threshold;
      rwf.options.fromCorners = !removeAll;
    }else{
      rwf = new fabric.Image.filters.RemoveWhiteDP({
        fromCorners: !removeAll,
        blurRadius: 2,
        colorThreshold: threshold
      });
      this.filters.push(rwf);
    }

    var _this = this;
    this.applyFilters(function(){
      //_this.width = _this._element.width;
      //_this.height = _this._element.height;
      _this.canvas.renderAll();
      _this.fire("content:modified",{filter: rwf, bounds: rwf.bounds});
      callback && callback();
    });
  },
  removeWhiteAll: true
});

var _IMG = fabric.Image.prototype;


if(_IMG.actions == fabric.Object.prototype.actions ){
  _IMG.actions = fabric.util.object.extend({},fabric.Object.prototype.actions);
}

_IMG.actions = fabric.util.object.extend(_IMG.actions,{
  removeWhiteFromBorders: {
    title: 'Remove Background',
    type: 'effect',
    className:   "fa fa-dot-circle-o",
    effectTpl:
    '<button id="select-colors-action-button" class="fa fa-check"></button>'+
    '<input id="select-colors-checkbox" type="checkbox">' +
    '<input id="select-colors-threshold" type="range"   min="1" max="255">',
    actionParameters: function(el,data){
      var
        actionChk = el.find('#select-colors-checkbox'),
        actionBtn = el.find('#select-colors-action-button');
      data.thresholdEl = el.find('#select-colors-threshold');

      data.removeWhiteAll = actionChk.is(":checked");
      actionChk.change(function(){
        data.removeWhiteAll = actionChk.is(":checked")
      });
      actionBtn.click(function(){
        data.action();
      });
      if(!data.__action){

        data.__action = data.action;
        data.action = function(){
          data.__action(parseInt(data.thresholdEl.val()),data.removeWhiteAll)
        };
      }
    },
    action: _IMG.removeWhite,
    insert:     'imageTools'
  },
  advancedTools: {
    type: 'effect',
    effectTpl:
    '<div id="editor-tools" class="inline-actions compact"></div>'+
    '<div class="checkboard" ><div id="pathfinder"></div></div>',
    className: 'fa fa-pencil-square-o',
    title: "advanced tools",
    action: function(){
      var pathfinder = this.canvas.getPathfinder();
      pathfinder.target = this;
      pathfinder.setPicture(this._element);
      pathfinder.show();
    },
    actionParameters: function(el,data){

      var pathfinder = this.canvas.getPathfinder();
      pathfinder.canvas = this.canvas;
      fabric.Toolbar.create(pathfinder, 'editor-tools');

      pathfinder.setContainer('pathfinder');

      // if (pathfinder.target)pathfinder.hide();
      pathfinder.target = this;
      pathfinder.setPicture(this._element);
      pathfinder.show();
    },
    insert:     'photoshopTools'
  },
  historyBrush: {
    className: 'fa fa-history',
    title: "revert to orignal image",
    action: _IMG.revertChanges,
    observe:  "content:modified",
    visible:     function(){
      return !!this._filteredEl || this._edited;
    },
    insert:     'imageTools'
  },
});

fabric.Image.prototype.extractColors = function () {
  var _colors = fabric.MagicWand.extractColors(this._element);
  var colors = {};
  for(var i in _colors){
    var _str = "rgb(" + _colors[i].join(",") + ")";
    colors[_str] = {};
  }
  return colors;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.util.object.extend(fabric.Object.prototype, {
  hasBoundsControls: true,
  flipTools:     false,
  orderTools:    false,
  stroke: "transparent",
  onTop: function () {
    return this.canvas._objects.indexOf(this) == this.canvas._objects.length - 1;
  },
  flop: function () {
    this.flipY = !this.flipY;
    this.canvas.renderAll();
  },
  flip: function () {
    this.flipX = !this.flipX;
    this.canvas.renderAll();
  },
  onBottom: function () {
    return this.canvas._objects.indexOf(this) == 0;
  },
  duplicate: function() {
    var _object = this.toObject(fabric.INCLUDE_ALL);
    _object.active = true;

    var _clone = _object.cloneSync && _object.cloneSync() || this.canvas.createObject(_object);
    return _clone;
  },
  insertDuplicate: false,
  insertRemove: false,
  insertBoundingRect: false,
  insertDimensions: false,
  insertPosition: false,
  minStrokeWidth: 0,
  maxStrokeWidth: function(){
    return Math.min(this.width,this.height) / 2;
  },
  actions: {
    boundingRect: {
      type: 'label',
      template: '<dt>L:</dt><dd class="{leftClass}" title="{left}">{roundLeft}</dd><dt>T:</dt><dd class="{topClass}"  title="{top}">{roundTop}</dd><dt>R:</dt><dd class="{rightClass}" title="{right}">{roundRight}</dd><dt>B:</dt><dd class="{bottomClass}"  title="{bottom}">{roundBottom}</dd>',
      value: {
        observe: "modified scaling moving rotating",
        get: function(){
          var _rect = this.getBoundingRect();

          if(this.movementLimits) {

            if (this.movementLimits == this.canvas) {
              var _v = this.canvas.viewportTransform;
              var _mlr = {
                left: _v[4],
                top: _v[5],
                width: (this.canvas.originalWidth || this.canvas.width) * _v[0],
                height: (this.canvas.originalHeight || this.canvas.height)  * _v[3],
                right: 0,
                bottom: 0
              }
            }else{
              _mlr = this.movementLimits.getBoundingRect();
            }


            _rect.bottom = this.movementLimits.height - _rect.height;
            var _t = _rect.top - _mlr.top;
            var _l = _rect.left - _mlr.left;
            var _r = _mlr.width - _rect.width - _l;
            var _b = _mlr.height - _rect.height - _t;
          }else{
            _t = _rect.top;
            _l = _rect.left;
            _b = this.canvas.height - _rect.height - _rect.top;
            _r  = this.canvas.width - _rect.width - _rect.left;
          }

          return {
            topClass: _t > 0 ? "positive" : _t < 0 ? "negative" : "zero",
            bottomClass: _b > 0 ? "positive" : _b < 0 ? "negative" : "zero",
            leftClass: _l > 0 ? "positive" : _l < 0 ? "negative" : "zero",
            rightClass: _r > 0 ? "positive" : _r < 0 ? "negative" : "zero",
            top:    _t,
            left:   _l,
            bottom: _b,
            right:  _r,
            roundTop:    Math.round(_t),
            roundLeft:   Math.round(_l),
            roundBottom: Math.round(_b),
            roundRight:  Math.round(_r)
          }
        }
      }
    },
    position: {
      title: 'position',
      type: 'menu',
      menu: {
        objectLeft: {
          type:   'number',
          title:  'left',
          value: {
            set: function (val) {
              this.left = val;
              this.fire("modified");
              this.canvas.fire("object:modified", {target: this});
              this.canvas.renderAll();
            },
            get: function () {
              return this.left;
            },
            observe: "modified"
          }
        },
        objectTop: {
          type:   'number',
          title:  'top',
          value: {
            set: function (val) {
              this.top = val;
              this.fire("modified");
              this.canvas.fire("object:modified", {target: this});
              this.canvas.renderAll();
            },
            get: function () {
              return this.top;
            },
            observe: "modified"
          }
        }
      }
    },
    dimensions: {
      title: 'dimensions',
      type: 'menu',
      menu:{
        objectWidth: {
          type:   'number',
          title:  'width',
          value: {
            set: function(val){
              this.saveState();
              this.dimensionsWidthValue = val;
              this.scaleToWidth(val *  this.canvas.getZoom());
              this.canvas.fireModifiedIfChanged(this);
              this.canvas.renderAll();
              delete this.dimensionsWidthValue;
            },
            get: function(){
              if(this.dimensionsWidthValue){
                return this.dimensionsWidthValue;
              }
              return Math.round(this.getBoundingRect().width / this.canvas.getZoom());
            },
            observe: "modified"
          }
        },
        objectHeight: {
          type:   'number',
          title:  'height',
          value: {
            set: function(val){
              this.saveState();
              this.scaleToHeight(val *  this.canvas.getZoom());
              this.dimensionsHeightValue = val;
              this.canvas.fireModifiedIfChanged(this);
              this.canvas.renderAll();
              delete this.dimensionsHeightValue;
            },
            get: function(){
              if(this.dimensionsHeightValue){
                return this.dimensionsHeightValue;
              }
              return Math.round(this.getBoundingRect().height / this.canvas.getZoom());
            },
            observe: "modified"
          }
        }
      }
    },
    center: {
      className:  'fa fa-bullseye',
      title: 'Center',
      action: function(){
        this.center();
        this.setCoords();
      }
    },
    objectFlip: {
      className:  'fa fa-arrows-h',
      insert:     'flipTools',
      title:      'flip',
      action:     'flip'
    },
    flop: {
      className:  'fa fa-arrows-v',
      insert:     'flipTools',
      title:      'flop'
    },
    bringForward: {
      insert:     'orderTools',
      title:      'bring forward',
      className:  'fa fa-level-up',
      disabled:   'onTop'
    },
    sendBackwards: {
      insert:     'orderTools',
      title:      'send backwards',
      className:  'fa fa-level-down',
      disabled:   'onBottom'
    },
    remove: {
      className:  'fa fa-trash',
      title:      'remove',
      key:        "Delete"
    },
    duplicate: {
      className:  'fa fa-clone',
      title:      'duplicate'
    }
  }
})

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {



  //fabric.require('SlideText', ['SlideObject'], function () {

fabric.util.object.extend(fabric.Text.prototype,{
    editTool: false,
    advancedColorsTools: false,
    textFontSizeTools: false,
    textAligmentTools: false,
    advancedTextStyleTools: false,
    rasterizeTool: false,
    rasterizeKlass: fabric.Image,
    _render_cache: function (ctx) {
      ctx.save();
      ctx.scale(
        this.scaleX * (this.flipX ? -1 : 1),
        this.scaleY * (this.flipY ? -1 : 1)
      );
      this.transform(ctx);
      this._setShadow(ctx);
      ctx.translate(-this.width / 2, -this.height / 2);
      ctx.drawImage(this._cache, 0, 0, this.width, this.height);
      ctx.restore();
    },
    updateCache: function () {

      var size = {
        width: this.width * this.canvas.dotsPerUnit,
        height: this.height * this.canvas.dotsPerUnit
      };

      var _clipTo = this.clipTo;
      delete this.clipTo;
      this._cache = fabric.util.createCanvasElementWithSize(size);
      var ctx = this._cache.getContext("2d");
      ctx.scale(
        this.canvas.dotsPerUnit,
        this.canvas.dotsPerUnit);
      ctx.translate(this.width / 2, this.height / 2);

      this.render(ctx, true);
      this.render = this._render_cache;
      this.clipTo = _clipTo;

    },
    rasterizeText: function () {
      this.updateCache();
      var img = fabric.util.createImage();

      img.onload = function () {
        var obj = this.toObject();
        obj.width = img.width;
        obj.height = img.height;
        obj.scaleX = this.scaleX * (this.height / img.height);
        obj.scaleY = this.scaleY * (this.width / img.width );
        obj.rasterizedType = obj.type;
        delete obj.type;

        var el = new this.rasterizeKlass(img, obj);
        this.canvas.add(el);
        this.canvas.remove(this);
        setTimeout(function () {
          this.canvas.setActiveObject(el);
          this.canvas.renderAll();
        }.bind(this))
      }.bind(this);
      img.src = this._cache.toDataURL();
      //this.on('modified',this.updateCache.bind(this));
    },
    getStyle: function (styleName) {
      var object = this;
      return (object.getSelectionStyles && object.isEditing)
        ? (object.getSelectionStyles()[styleName] || object[styleName])
        : (object[styleName] || object['__' + styleName] || '');
    },
    getPattern: function (url) {
      var _fill = this.getStyle('fill ');
      return _fill && _fill.source;
    },
    setPattern: function (url) {
      if (!url) {
        this.setStyle('fill');
      } else {
       // var _texture = _.findWhere(this.project.textures, {id: url});
        var _this = this;
        fabric.util.loadImage(url, function(img) {
          _this.setStyle('fill', new fabric.Pattern({
            source: img,
            repeat: 'repeat'
          }));
        });
      }
    },
    getOpacity: function () {
      return this.getStyle('opacity') * 100;
    },
    setOpacity: function (value) {
      this.setStyle('opacity', parseInt(value, 10) / 100);
    },
    getRadius: function () {
      return this.get('radius');
    },
    setShadow: function(options) {
      return this.setProperty('shadow', options ? new fabric.Shadow(options) : null);
    },
    setProperty: function (prop, value) {
      this[prop] = value;
      this.canvas && this.canvas.renderAll();
    },
    setRadius: function (value) {
      this.setProperty('radius', value);
    },
    getSpacing: function () {
      return this.get('spacing');
    },
    setSpacing: function (value) {
      this.setProperty('spacing', value);
    },
    getReverted: function () {
      return this.get('reverted');
    },
    setReverted: function (value) {
      this.setProperty('reverted', value);
    },
    getFill: function () {
      return this.getStyle('fill');
    },
    setFill: function (value) {
      this.setStyle('fill', value);
    },
    getText: function () {
      return this.get('text');
    },
    setText: function (value) {
      this.setProperty('text', value);
    },
    getTextAlign: function () {
      return this.get('textAlign');
    },
    setTextAlign: function (value) {
      this.setProperty('textAlign', value.toLowerCase());
    },
    getFontFamily: function () {
      return this.get('fontFamily');
    },
    setFontFamily: function (value) {
      this.setStyle('fontFamily', value);
    },
    getStyles: function(){
      return this.styles || {
          fill :                this.fill,
          fontSize :            this.fontSize,
          textBackgroundColor : this.textBackgroundColor,
          textDecoration :      this.textDecoration,
          fontFamily :          this.fontFamily,
          fontWeight :          this.fontWeight,
          fontStyle :           this.fontStyle,
          stroke :              this.stroke,
          strokeWidth :         this.strokeWidth
        };
    },
    getBgColor: function () {
      return this.get('backgroundColor');
    },
    setBgColor: function (value) {
      this.setProperty('backgroundColor', value);
    },
    getTextBgColor: function () {
      return this.get('textBackgroundColor');
    },
    setTextBgColor: function (value) {
      this.setProperty('textBackgroundColor', value);
    },
    getStroke: function () {
      return this.getStyle('stroke');
    },
    setStroke: function (value) {
      this.setStyle('stroke', value);
    },
    getStrokeWidth: function () {
      return this.getStyle('strokeWidth');
    },
    setStrokeWidth: function (value) {
      this.setStyle('strokeWidth', parseInt(value, 10));
    },
    decreaseFontSize: function () {
      this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) - 1);
    },
    increaseFontSize: function () {
      this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) + 1);
    },
    getFontSize: function () {
      return this.getStyle('fontSize');
    },
    setFontSize: function (value) {
      this.setStyle('fontSize', parseInt(value, 10));
    },
    getLineHeight: function () {
      return this.getStyle('lineHeight');
    },
    setLineHeight: function (value) {
      this.setStyle('lineHeight', parseFloat(value, 10));
    },
    addText: function (text,options) {

      var _match = this.text.match(/\n/g);
      var _lineIndex = _match && _match.length || 0;
      var charIndex = this.text.length - this.text.lastIndexOf("\n") - 1;

      if(!this.styles[_lineIndex]){
        this.styles[_lineIndex] = {}
      }

      if(!this.styles[_lineIndex][charIndex]){
        this.styles[_lineIndex][charIndex] = {}
      }
      fabric.util.object.extend(this.styles[_lineIndex][charIndex],options);
      this.text +=text;
      // this.styles;
    },
    getBold: function () {
      return this.getStyle('fontWeight') === "bold";
    },
    setBold: function (value) {
      this.setStyle('fontWeight', value ? 'bold' : '');
    },
    getItalic: function () {
      return this.getStyle('fontStyle') === 'italic';
    },
    setItalic: function (value) {
      this.setStyle('fontStyle', value ? 'italic' : '' );
    },
    getUnderline: function () {
      return this.getStyle('textDecoration').indexOf('underline') > -1;
    },
    setUnderline: function (value) {
      value = value ? (this.getStyle('textDecoration') + ' underline')
        : this.getStyle('textDecoration').replace('underline', '');

      this.setStyle('textDecoration', value);
    },
    getLinethrough: function () {
      return this.getStyle('textDecoration').indexOf('line-through') > -1;
    },
    setLinethrough: function (value) {
      value = value ? (this.getStyle('textDecoration') + ' line-through')
        : this.getStyle('textDecoration').replace('line-through', '');

      this.setStyle('textDecoration', value);
    },
    getOverline: function () {
      return this.getStyle('textDecoration').indexOf('overline') > -1;
    },
    setOverline: function (value) {
      value = value ? (this.getStyle('textDecoration') + ' overline')
        : this.getStyle('textDecoration').replace('overlin', '');

      this.setStyle('textDecoration', value);
    },
    setStyle: function (styleName, value) {
      var object = this;
      var _old = fabric.util.object.cloneDeep(object.getStyles());
      //var _old = fabric.util.object.deepExtend({}, object.getStyles);//getSelectionStyles();
      if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        if (value !== undefined) {
          style[styleName] = value;
        } else {
          delete style[styleName];
        }
        object.setSelectionStyles(style);
        object.setCoords();
      }
      else {
        if (value !== undefined) {
          object[styleName] = value;
        } else {
          delete object[styleName];
        }
        for (var i in object.styles) {
          for (var j in object.styles[i]) {
            if (object.styles[i][j][styleName] !== undefined) {
              delete object.styles[i][j][styleName];
            }
          }
        }
      }

      var styles_data = object.getStyles();

      if(this.type != "text"){
        this.styles = fabric.util.object.cloneDeep(styles_data);
      }

      this.setCoords();

      this.fire("styles:modified", {
        original: _old,
        modified: styles_data
      });
      this.canvas && this.canvas.renderAll();
      /*
       this.project.history.add({
       slide: this.slide,
       object: this,
       undo: _old,
       redo: styles_data,
       type: 'styled',
       undoFn: function(){
       this.object.data.styles = this.undo;
       this.object.fabric.set('styles',this.undo);
       this.object.fabric.setCoords();
       this.object.slide.render();
       },
       redoFn:  function(){
       this.object.data.styles = this.redo;
       this.object.fabric.set('styles',this.redo);
       this.object.fabric.setCoords();
       this.object.slide.render();
       }
       });*/
    },

    generateTextStyle: function () {
      return {
        'font-style': this.isItalic() ? 'italic' : 'normal',
        'font-weight': this.isBold() ? 700 : 400,
        'text-decoration': (this.isLinethrough() ? 'line-through ' : '' ) +
        (this.isOverline() ? 'overline ' : '' ) +
        (this.isUnderline() ? 'underline ' : '')
      }
    }
  });

  fabric.util.object.extend(fabric.IText.prototype, {
    initHiddenTextarea_native: fabric.IText.prototype.initHiddenTextarea,
    initHiddenTextarea: function(){
      this.initHiddenTextarea_native();
      this.hiddenTextarea.style.width = "9999px";
    },
    /**
     * Exits from editing state
     * @return {fabric.IText} thisArg
     * @chainable
     */
    exitEditing: function() {
      // var isTextChanged = (this._textBeforeEdit !== this.text);
      this.selected = false;
      this.isEditing = false;
      this.selectable = true;

      this.selectionEnd = this.selectionStart;
      this.hiddenTextarea && this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea);
      this.hiddenTextarea = null;

      this.abortCursorAnimation();
      this._restoreEditingProps();
      this._currentCursorOpacity = 0;

      this.fire('editing:exited');
      // isTextChanged && this.fire('modified');
      if (this.canvas) {
        this.canvas.off('mouse:move', this.mouseMoveHandler);
        this.canvas.fire('text:editing:exited', { target: this });
        this.canvas.fireModifiedIfChanged(this);
      }
      return this;
    },
    maxStrokeWidth: function(){
      return Math.ceil( this.getFontSize() / 10);
    }
  });

  var _TEX = fabric.IText.prototype;
  fabric.Text.prototype.actions = fabric.util.object.extend({}, fabric.Object.prototype.actions, {
      rasterizeText: {
        insert: 'rasterizeTool',
        className: 'button-easel',
        title: 'rasterizeText',
        action: _TEX.rasterizeText
      },
      fill: {
        type: 'color',
        title: 'fill',
        insert: '!advancedColorsTools',
        value: 'fill'
      },
      colors: {
        className: 'colors',
        type: 'menu',
        title: 'colors',
        toggled: true,
        insert: 'advancedColorsTools',
        menu: {
          textBgcolor: {
            type: 'color',
            title: 'bgColor',
            value: {
              get: _TEX.getBgColor,
              set: _TEX.setBgColor
            }
          },
          textTextbgcolor: {
            type: 'color',
            title: 'textBgColor',
            value: {
              get: _TEX.getTextBgColor,
              set: _TEX.setTextBgColor
            }
          },
          textFill: {
            type: 'color',
            title: 'fill',
            value: {
              get: _TEX.getFill,
              set: _TEX.setFill
            }
          }
        }
      },
      textStyle: {
        type: 'menu',
        title: 'text style',
        toggled: true,
        className: 'fa fa-font',
        style: 'generateTextStyle',
        menu: {
          textBold: {
            type: "checkbox",
            title: 'bold',
            value: 'bold',
            className: 'fa fa-bold'
          },
          textItalic: {
            type: "checkbox",
            title: 'italic',
            value: 'italic',
            className: 'fa fa-italic'
          },
          textUnderline: {
            type: "checkbox",
            title: 'Underline',
            value: 'underline',
            className: 'fa fa-underline'
          },
          textLinethrough: {
            type: "checkbox",
            insert: 'advancedTextStyleTools',
            title: 'Linethrough',
            value: 'linethrough',
            className: 'text-linethrough fa fa-strikethrough'
          },
          textOverline: {
            type: "checkbox",
            insert: 'advancedTextStyleTools',
            title: 'overline',
            value: 'overline',
            className: 'text-overline fa fa-overline'
          },
          textAlign: {
            type: 'options',
            title: 'text align',
            insert: 'textAligmentTools',
            value: "textAlign",
            menu: {
              textAlignCenter: {
                title: 'align center',
                option: 'center',
                className: 'fa fa-align-center'
              },
              textAlignLeft: {
                title: 'align left',
                option: 'left',
                className: 'fa fa-align-left'
              },
              textAlignRight: {
                title: 'align right',
                option: 'right',
                className: 'fa fa-align-right'
              },
              textAlignJustify: {
                title: 'align justify',
                option: 'justify',
                className: 'fa fa-align-justify'
              }
            }
          },
          fontFamily: {
            type: 'fontFamily',
            title: 'font family',
            className: 'fa fa-text',
            value: 'fontFamily',
            data: function(){
              return this.application._fonts
            }
          },
          textFontSize: {
            insert: 'textFontSizeTools',
            type: 'number',
            title: 'fontSize',
            value: 'fontSize'
          },
          /*textFont: {
            insert: 'textFontSizeTools',
            type: 'menu',
            title: 'font',
            className: 'fa fa-font',
            menu: {
              textFontSizeDecrease: {
                title: 'decreaseFontSize',
                action: _TEX.decreaseFontSize,
                className: 'fa fa-font font-size-decrease'
              },
              textFontSizeIncrease: {
                title: 'increaseFontSize',
                action: _TEX.increaseFontSize,
                className: 'fa fa-font font-size-increase'
              }
            }
          }*/
        }
      }
    }
  );
  fabric.IText.prototype.actions = fabric.util.object.extend({}, fabric.Text.prototype.actions, {
      textEdit: {
        insert:     'editTool',
        className:  'fa fa-pencil-square-o',
        title:      'edit',
        action:     _TEX.enterEditing
      }
    }
  );
/*
  fabric.Text.async = true;
  fabric.Text.fromObject = function (object, callback) {
    var _total = 0, loaded = 0;

    function create() {
      if (object.curve) {
        var f = new fabric.CurvedText(object.text, object);
      } else {
        var f = new fabric.IText(object.text, object);
      }
      callback && callback(f);
    }
    _.recoursive(object,
      function (property, value, parent) {

        if (property == 'pattern') {
          _total++;
          //  var _texture = _.findWhere(o.project.textures,{id: parent[property]});

          var _texture = fabric.texturesPath + parent[property];

          fabric.util.loadImage(_texture, function (img) {
            //this[property] = new fabric.Image(img);

            parent['fill'] = new fabric.Pattern({
              source: img,
              repeat: 'repeat'
            });
            delete parent[property];
            loaded++;
            if (_total == loaded)create();
          });

          //
          //parent['fill'] = new fabric.Pattern({
          //    source: _texture,
          //    repeat: 'repeat'
          //});
        }
      }
    );
    if (_total == loaded) {
      return create();
    }
  };*/

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


var utils = __webpack_require__(2);
utils.object = __webpack_require__(1);


/***********************************************************************************************************************
 ** DPHistory
 ***********************************************************************************************************************/


var DPHistory = function (parent, initAction) {
    this.parent = parent;
    this.clear(initAction);
};

DPHistory.prototype.setRecords = function (records,current) {
  this.canUndo = records.length;
  this.canRedo = false;

  if(!records.length){
    records = [{
      type: 'initialized',
      id: 0,
      text : 'initialized'
    }]
  }
  this.records = records;
  this.length = this.records.length ;
  this.current = current === undefined ? records.length - 1 : current;
  this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};

DPHistory.prototype.restore = function () {
  this.setRecords(this.saved.records,this.saved.current);
  return this;
};

DPHistory.prototype.save = function () {
  this.saved = {
    current: this.current,
    records: utils.object.cloneDeep(this.records)
  }
  return this;
};

DPHistory.prototype.clear = function (initAction) {
    if (initAction) {
        initAction.id = 0;
    } else {
        initAction = {
            type: 'initialized',
            id: 0,
          text : 'initialized'
        }
    }
    this.records = [initAction];
    this.current = 0;
    this.canUndo = false;
    this.canRedo = false;
    this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};


DPHistory.prototype.add = function(action){


    if (!this.enabled || this.processing) {
      return false;
    }

    action.moment = new Date().getTime();
    this.canUndo = true;
    this.canRedo = false;
    this.records.splice(this.current+ 1);
    this.records.push(action);
    this.length = this.records.length;
    action.id = this.length - 1;
    action.text = action.type || action.text;
    this.current = this.length - 1;

  this.activeAction = this.records[this.current];
  this.fire("changed",{action: action});
  return this;
};
DPHistory.prototype.disable = function(){
  this.enabled = false;
  return this;
};
DPHistory.prototype.enable = function(){
  this.enabled = true;
  return this;
};
DPHistory.prototype.undo = function(noFire){
    this.canRedo = true;
    var _action = this.records[this.current];
    this.current--;
  this.processing = true;
    _action.undo.call(this.parent,_action);
  this.processing = false;
    if(this.current == 0){
        this.canUndo = false;
    }
    if(!noFire){
      this.activeAction = this.records[this.current];
      this.fire("changed",{action: _action});
    }
  return this;
};

DPHistory.prototype.goto = function(index){
    if(index == this.current)return;
    if(index < this.current){
        for(var i = this.current - index ;i--; ){
            this.undo(true);
        }
    }if(index > this.current){
        for(var i = index - this.current ;i--; ){
            this.redo(true);
        }
    }
  this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};

DPHistory.prototype.redo = function(noFire){
    if(this.current == this.length - 1){
        return;
    }
  this.processing = true;
    this.canUndo = true;
    this.current++;
    var _action = this.records[this.current];

    _action.redo.call(this.parent,_action);

    if(this.current == this.length - 1){
        this.canRedo = false;
    }
  this.processing = false;
  if(!noFire) {
    this.activeAction = this.records[this.current];
    this.fire("changed",{action: _action});
  }
  return this;
};
utils.observable(DPHistory.prototype);
module.exports = DPHistory;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.1.20150716
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */



var isLikelyNode = typeof Buffer !== 'undefined' && typeof window === 'undefined';



var saveAs = !isLikelyNode &&  (function(view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var
            doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function() {
                return view.URL || view.webkitURL || view;
            }
            , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = "download" in save_link
            , click = function(node) {
                var event = new MouseEvent("click");
                node.dispatchEvent(event);
            }
            , webkit_req_fs = view.webkitRequestFileSystem
            , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
            , throw_outside = function(ex) {
                (view.setImmediate || view.setTimeout)(function() {
                    throw ex;
                }, 0);
            }
            , force_saveable_type = "application/octet-stream"
            , fs_min_size = 0
        // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
        // https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
        // for the reasoning behind the timeout and revocation flow
            , arbitrary_revoke_timeout = 500 // in ms
            , revoke = function(file) {
                var revoker = function() {
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                };
                if (view.chrome) {
                    revoker();
                } else {
                    setTimeout(revoker, arbitrary_revoke_timeout);
                }
            }
            , dispatch = function(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;
                while (i--) {
                    var listener = filesaver["on" + event_types[i]];
                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            }
            , auto_bom = function(blob) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                    return new Blob(["\ufeff", blob], {type: blob.type});
                }
                return blob;
            }
            , FileSaver = function(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                // First try a.download, then web filesystem, then object URLs
                var
                    filesaver = this
                    , type = blob.type
                    , blob_changed = false
                    , object_url
                    , target_view
                    , dispatch_all = function() {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    }
                // on any filesys errors revert to saving with object URLs
                    , fs_error = function() {
                        // don't create more object URLs than needed
                        if (blob_changed || !object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }
                        if (target_view) {
                            target_view.location.href = object_url;
                        } else {
                            var new_tab = view.open(object_url, "_blank");
                            if (new_tab == undefined && typeof safari !== "undefined") {
                                //Apple do not allow window.open, see http://bit.ly/1kZffRI
                                view.location.href = object_url
                            }
                        }
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    }
                    , abortable = function(func) {
                        return function() {
                            if (filesaver.readyState !== filesaver.DONE) {
                                return func.apply(this, arguments);
                            }
                        };
                    }
                    , create_if_not_found = {create: true, exclusive: false}
                    , slice
                    ;
                filesaver.readyState = filesaver.INIT;
                if (!name) {
                    name = "download";
                }
                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    save_link.href = object_url;
                    save_link.download = name;
                    setTimeout(function() {
                        click(save_link);
                        dispatch_all();
                        revoke(object_url);
                        filesaver.readyState = filesaver.DONE;
                    });
                    return;
                }
                // Object and web filesystem URLs have a problem saving in Google Chrome when
                // viewed in a tab, so I force save with application/octet-stream
                // http://code.google.com/p/chromium/issues/detail?id=91158
                // Update: Google errantly closed 91158, I submitted it again:
                // https://code.google.com/p/chromium/issues/detail?id=389642
                if (view.chrome && type && type !== force_saveable_type) {
                    slice = blob.slice || blob.webkitSlice;
                    blob = slice.call(blob, 0, blob.size, force_saveable_type);
                    blob_changed = true;
                }
                // Since I can't be sure that the guessed media type will trigger a download
                // in WebKit, I append .download to the filename.
                // https://bugs.webkit.org/show_bug.cgi?id=65440
                if (webkit_req_fs && name !== "download") {
                    name += ".download";
                }
                if (type === force_saveable_type || webkit_req_fs) {
                    target_view = view;
                }
                if (!req_fs) {
                    fs_error();
                    return;
                }
                fs_min_size += blob.size;
                req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                    fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                        var save = function() {
                            dir.getFile(name, create_if_not_found, abortable(function(file) {
                                file.createWriter(abortable(function(writer) {
                                    writer.onwriteend = function(event) {
                                        target_view.location.href = file.toURL();
                                        filesaver.readyState = filesaver.DONE;
                                        dispatch(filesaver, "writeend", event);
                                        revoke(file);
                                    };
                                    writer.onerror = function() {
                                        var error = writer.error;
                                        if (error.code !== error.ABORT_ERR) {
                                            fs_error();
                                        }
                                    };
                                    "writestart progress write abort".split(" ").forEach(function(event) {
                                        writer["on" + event] = filesaver["on" + event];
                                    });
                                    writer.write(blob);
                                    filesaver.abort = function() {
                                        writer.abort();
                                        filesaver.readyState = filesaver.DONE;
                                    };
                                    filesaver.readyState = filesaver.WRITING;
                                }), fs_error);
                            }), fs_error);
                        };
                        dir.getFile(name, {create: false}, abortable(function(file) {
                            // delete file if it already exists
                            file.remove();
                            save();
                        }), abortable(function(ex) {
                            if (ex.code === ex.NOT_FOUND_ERR) {
                                save();
                            } else {
                                fs_error();
                            }
                        }));
                    }), fs_error);
                }), fs_error);
            }
            , FS_proto = FileSaver.prototype
            , saveAs = function(blob, name, no_auto_bom) {
                return new FileSaver(blob, name, no_auto_bom);
            }
            ;
        // IE 10+ (native saveAs)
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            return function(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                return navigator.msSaveOrOpenBlob(blob, name || "download");
            };
        }

        FS_proto.abort = function() {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;

        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;

        return saveAs;
    }(
        typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content
    ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(10) !== null) && (__webpack_require__(11) != null)) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return saveAs;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbGl6ZWQtZmllcmEuZGV2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDA3M2NiNzE0NWY1NjAyODNiNWVkIiwid2VicGFjazovLy9leHRlcm5hbCBcImZhYnJpY1wiIiwid2VicGFjazovLy8uL3V0aWwvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bmRlcnNjb3JlXCIiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9wYXRoLmpzIiwid2VicGFjazovLy8uL21lZGlhL2Vycm9yLWJ1dHRvbi5zdmciLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9kYXRhLmpzIiwid2VicGFjazovLy8uL3V0aWwvbG9hZGVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9tZWRpYS9sb2FkZXIuc3ZnIiwid2VicGFjazovLy8uLi9wbHVnaW5zL3dlYmZvbnQuanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9hcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlL29ic2VydmUuanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9wbHVnaW5zTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9wcm90b3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NvcmUvc2xpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vY29yZS9zdGF0aWNDYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vZmllcmEuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9ib3JkZXJJbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2ZvbnRzLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvZnJvbVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2hpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9pbnRlcmFjdGl2ZU1vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9zYXZlQXMuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovLy8uL29iamVjdHMvU2xpZGVJbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9vYmplY3RzL1NsaWRlT2JqZWN0LmpzIiwid2VicGFjazovLy8uL29iamVjdHMvU2xpZGVUZXh0LmpzIiwid2VicGFjazovLy8uL3BsdWdpbnMvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL3NhdmVBcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA3M2NiNzE0NWY1NjAyODNiNWVkIiwibW9kdWxlLmV4cG9ydHMgPSBmYWJyaWM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmYWJyaWNcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgXyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xuXG52YXIgdXRpbHMgPSB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gYXJyXG4gICAqIEBwYXJhbSBhcnIyXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICogQGV4YW1wbGVcbiAgICogICAgeCA9IHthOiAxICxiOiAxLCBjOiBbMSwyXX1cbiAgICogICAgeSA9IHthOiAyICwgIGMgOiAzICwgZCA6IDF9XG4gICAqXG4gICAqICAgIGV4dGVuZEFycmF5c09iamVjdCh4LHkpID0ge2E6IFsxLDJdIGIgOiBbMV0gYyA6IFsxLDIsM10sIGQgWzFdIH1cbiAgICovXG4gIGV4dGVuZEFycmF5c09iamVjdCA6IGZ1bmN0aW9uKGFycixhcnIyKXtcbiAgICB2YXIgbmV3QXJyYXkgPSB7fTtcblxuICAgIGZvcih2YXIgaSBpbiBhcnIpe1xuICAgICAgaWYoYXJyW2ldLmNvbnN0cnVjdG9yID09IEFycmF5KXtcbiAgICAgICAgbmV3QXJyYXlbaV0gID0gW10uY29uY2F0KGFycltpXSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbmV3QXJyYXlbaV0gPSBbYXJyW2ldXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IodmFyIGkgaW4gYXJyMil7XG4gICAgICBpZihuZXdBcnJheVtpXSl7XG4gICAgICAgIG5ld0FycmF5W2ldLnB1c2goYXJyMltpXSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbmV3QXJyYXlbaV0gPSBbYXJyMltpXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdBcnJheTtcbiAgfSxcbiAgZmlsdGVyVmFsdWVzOiBmdW5jdGlvbiAoYXJyYXksIHZhbHVlcykge1xuICAgIHZhciBuZXdfYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpIGluIGFycmF5KSB7XG4gICAgICB2YXIgX25ld19vYmplY3QgPSB7fTtcbiAgICAgIGZvciAodmFyIGogaW4gdmFsdWVzKSB7XG4gICAgICAgIF9uZXdfb2JqZWN0W3ZhbHVlc1tqXV0gPSBhcnJheVtpXVt2YWx1ZXNbal1dXG4gICAgICB9XG4gICAgICBuZXdfYXJyYXkucHVzaChfbmV3X29iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdfYXJyYXk7XG4gIH0sXG5cbiAgLyoqXG4gICAqICDQotCw0YHQvtCy0LDQvdC40LUg0KTQuNGI0LXRgNCw4oCT0JnQtdGC0YHQsCzRgdC70YPRh9Cw0LnQvdC+0LUg0YLQsNGB0L7QstCw0L3QuNC1INC80L3QvtC20LXRgdGC0LLQsFxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc2h1ZmZsZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIGlmICghb2JqZWN0Lmxlbmd0aCkgcmV0dXJuO1xuICAgIHZhciBpID0gb2JqZWN0Lmxlbmd0aDtcbiAgICB3aGlsZSAoLS1pKSB7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgdmFyIHRlbXAgPSBvYmplY3RbaV07XG4gICAgICBvYmplY3RbaV0gPSBvYmplY3Rbal07XG4gICAgICBvYmplY3Rbal0gPSB0ZW1wO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7IC8vIGZvciBjb252ZW5pZW5jZSwgaW4gY2FzZSB3ZSB3YW50IGEgcmVmZXJlbmNlIHRvIHRoZSBhcnJheVxuICB9LFxuICAvKipcbiAgICogRGVwZW5kZW5jeTogdW5kZXJzY29yZS5qcyAoIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS8gKVxuICAgKlxuICAgKiBNaXggaXQgaW4gd2l0aCB1bmRlcnNjb3JlLmpzOlxuICAgKiBfLm1peGluKHtkZWVwRXh0ZW5kOiBkZWVwRXh0ZW5kfSk7XG4gICAqXG4gICAqIENhbGwgaXQgbGlrZSB0aGlzOlxuICAgKiB2YXIgbXlPYmogPSB1dGlscy5kZWVwRXh0ZW5kKGdyYW5kcGFyZW50LCBjaGlsZCwgZ3JhbmRjaGlsZCwgZ3JlYXRncmFuZGNoaWxkKVxuICAgKlxuICAgKiBOb3RlczpcbiAgICogS2VlcCBpdCBEUlkuXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgZXNwZWNpYWxseSB1c2VmdWwgaWYgeW91J3JlIHdvcmtpbmcgd2l0aCBKU09OIGNvbmZpZyBkb2N1bWVudHMuIEl0IGFsbG93cyB5b3UgdG8gY3JlYXRlIGEgZGVmYXVsdFxuICAgKiBjb25maWcgZG9jdW1lbnQgd2l0aCB0aGUgbW9zdCBjb21tb24gc2V0dGluZ3MsIHRoZW4gb3ZlcnJpZGUgdGhvc2Ugc2V0dGluZ3MgZm9yIHNwZWNpZmljIGNhc2VzLiBJdCBhY2NlcHRzIGFueVxuICAgKiBudW1iZXIgb2Ygb2JqZWN0cyBhcyBhcmd1bWVudHMsIGdpdmluZyB5b3UgZmluZS1ncmFpbmVkIGNvbnRyb2wgb3ZlciB5b3VyIGNvbmZpZyBkb2N1bWVudCBoaWVyYXJjaHkuXG4gICAqXG4gICAqIFNwZWNpYWwgRmVhdHVyZXMgYW5kIENvbnNpZGVyYXRpb25zOlxuICAgKiAtIHBhcmVudFJFIGFsbG93cyB5b3UgdG8gY29uY2F0ZW5hdGUgc3RyaW5ncy4gZXhhbXBsZTpcbiAgICogICB2YXIgb2JqID0gdXRpbHMuZGVlcEV4dGVuZCh7dXJsOiBcInd3dy5leGFtcGxlLmNvbVwifSwge3VybDogXCJodHRwOi8vI3tffS9wYXRoL3RvL2ZpbGUuaHRtbFwifSk7XG4gICAqICAgY29uc29sZS5sb2cob2JqLnVybCk7XG4gICAqICAgb3V0cHV0OiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by9maWxlLmh0bWxcIlxuICAgKlxuICAgKiAtIHBhcmVudFJFIGFsc28gYWN0cyBhcyBhIHBsYWNlaG9sZGVyLCB3aGljaCBjYW4gYmUgdXNlZnVsIHdoZW4geW91IG5lZWQgdG8gY2hhbmdlIG9uZSB2YWx1ZSBpbiBhbiBhcnJheSwgd2hpbGVcbiAgICogICBsZWF2aW5nIHRoZSBvdGhlcnMgdW50b3VjaGVkLiBleGFtcGxlOlxuICAgKiAgIHZhciBhcnIgPSB1dGlscy5kZWVwRXh0ZW5kKFsxMDAsICAgIHtpZDogMTIzNH0sIHRydWUsICBcImZvb1wiLCAgWzI1MCwgNTAwXV0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBbXCIje199XCIsIFwiI3tffVwiLCAgICAgZmFsc2UsIFwiI3tffVwiLCBcIiN7X31cIl0pO1xuICAgKiAgIGNvbnNvbGUubG9nKGFycik7XG4gICAqICAgb3V0cHV0OiBbMTAwLCB7aWQ6IDEyMzR9LCBmYWxzZSwgXCJmb29cIiwgWzI1MCwgNTAwXV1cbiAgICpcbiAgICogLSBUaGUgcHJldmlvdXMgZXhhbXBsZSBjYW4gYWxzbyBiZSB3cml0dGVuIGxpa2UgdGhpczpcbiAgICogICB2YXIgYXJyID0gdXRpbHMuZGVlcEV4dGVuZChbMTAwLCAgICB7aWQ6MTIzNH0sICAgdHJ1ZSwgIFwiZm9vXCIsICBbMjUwLCA1MDBdXSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIFtcIiN7X31cIiwge30sICAgICAgICAgIGZhbHNlLCBcIiN7X31cIiwgW11dKTtcbiAgICogICBjb25zb2xlLmxvZyhhcnIpO1xuICAgKiAgIG91dHB1dDogWzEwMCwge2lkOiAxMjM0fSwgZmFsc2UsIFwiZm9vXCIsIFsyNTAsIDUwMF1dXG4gICAqXG4gICAqIC0gQW5kIGFsc28gbGlrZSB0aGlzOlxuICAgKiAgIHZhciBhcnIgPSB1dGlscy5kZWVwRXh0ZW5kKFsxMDAsICAgIHtpZDoxMjM0fSwgICB0cnVlLCAgXCJmb29cIiwgIFsyNTAsIDUwMF1dLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiI3tffVwiLCB7fSwgICAgICAgICAgZmFsc2VdKTtcbiAgICogICBjb25zb2xlLmxvZyhhcnIpO1xuICAgKiAgIG91dHB1dDogWzEwMCwge2lkOiAxMjM0fSwgZmFsc2UsIFwiZm9vXCIsIFsyNTAsIDUwMF1dXG4gICAqXG4gICAqIC0gQXJyYXkgb3JkZXIgaXMgaW1wb3J0YW50LiBleGFtcGxlOlxuICAgKiAgIHZhciBhcnIgPSB1dGlscy5kZWVwRXh0ZW5kKFsxLCAyLCAzLCA0XSwgWzEsIDQsIDMsIDJdKTtcbiAgICogICBjb25zb2xlLmxvZyhhcnIpO1xuICAgKiAgIG91dHB1dDogWzEsIDQsIDMsIDJdXG4gICAqXG4gICAqIC0gWW91IGNhbiByZW1vdmUgYW4gYXJyYXkgZWxlbWVudCBzZXQgaW4gYSBwYXJlbnQgb2JqZWN0IGJ5IHNldHRpbmcgdGhlIHNhbWUgaW5kZXggdmFsdWUgdG8gbnVsbCBpbiBhIGNoaWxkIG9iamVjdC5cbiAgICogICBleGFtcGxlOlxuICAgKiAgIHZhciBvYmogPSB1dGlscy5kZWVwRXh0ZW5kKHthcnI6IFsxLCAyLCAzLCA0XX0sIHthcnI6IFtcIiN7X31cIiwgbnVsbF19KTtcbiAgICogICBjb25zb2xlLmxvZyhvYmouYXJyKTtcbiAgICogICBvdXRwdXQ6IFsxLCAzLCA0XVxuICAgKlxuICAgKiovXG4gIGRlZXBFeHRlbmQ6IGZ1bmN0aW9uICgvKm9ial8xLCBbb2JqXzJdLCBbb2JqX05dKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiBhcmd1bWVudHNbMF07XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgLy8gY29udmVydCBhcmd1bWVudHMgdG8gYXJyYXkgYW5kIGN1dCBvZmYgdGFyZ2V0IG9iamVjdFxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBrZXksIHZhbCwgc3JjLCBjbG9uZSwgdG1wQnVmO1xuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuXG4gICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIG9iaikpIGNvbnRpbnVlO1xuXG4gICAgICAgIHNyYyA9IHRhcmdldFtrZXldO1xuICAgICAgICB2YWwgPSB1dGlscy5jbG9uZURlZXAob2JqW2tleV0pO1xuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBzcmMgIT09ICdvYmplY3QnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICB9ZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgY2xvbmUgPSAoQXJyYXkuaXNBcnJheShzcmMpKSA/IHNyYyA6IFtdO1xuXG4gICAgICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBjbG9uZS5wdXNoKHV0aWxzLmNsb25lRGVlcChpdGVtKSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0YXJnZXRba2V5XSA9IGNsb25lO1xuICAgICAgICAgIC8vdG9kbyAg0LXRgdC70Lgg0LfQsNC40LzRgdGC0LLRg9C10Lwg0LzQsNGB0YHQuNCyICwg0YLQviDRgdGB0L7RhdGA0LDQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC40Lcg0L7QsdC+0LjRhSDQvNCw0YHRgdC40LLQvtCyXG4gICAgICAgICAgLy90YXJnZXRba2V5XSA9IHV0aWxzLmRlZXBFeHRlbmQoY2xvbmUsIHZhbCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbG9uZSA9ICghQXJyYXkuaXNBcnJheShzcmMpKSA/IHNyYyA6IHt9O1xuICAgICAgICAgIHRhcmdldFtrZXldID0gdXRpbHMuZGVlcEV4dGVuZChjbG9uZSwgdmFsKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuICBjbG9uZURlZXA6IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWwuZ2V0VGltZSgpKTtcbiAgICB9IGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAodmFsKTtcbiAgICB9XG5cbiAgICBpZih2YWwuY2xvbmVTeW5jKXtcbiAgICAgIHJldHVybiB2YWwuY2xvbmVTeW5jKCk7XG4gICAgfWVsc2UgaWYodmFsLmNvbnN0cnVjdG9yID09IE9iamVjdCl7XG4gICAgICByZXR1cm4gdXRpbHMuZGVlcEV4dGVuZCh7fSwgdmFsKTtcbiAgICB9ZWxzZSBpZih2YWwuY29uc3RydWN0b3IgPT0gQXJyYXkpe1xuICAgICAgdmFyIGNsb25lID0gW107XG4gICAgICBmb3IodmFyIGkgPTAgO2kgPCB2YWwubGVuZ3RoOyBpKyspe1xuICAgICAgICBjbG9uZS5wdXNoKHV0aWxzLmNsb25lRGVlcCh2YWxbaV0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9LFxuICByZWFycmFuZ2U6IGZ1bmN0aW9uIChvYmplY3QsIGtleXMpIHtcbiAgICB2YXIgX25ld09yZGVyID0ge307XG4gICAgZm9yICh2YXIgaSBpbiBrZXlzKSB7XG4gICAgICBpZihvYmplY3Rba2V5c1tpXV0gIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIF9uZXdPcmRlcltrZXlzW2ldXSA9IG9iamVjdFtrZXlzW2ldXVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBmb3IgKGkgaW4gb2JqZWN0KSB7XG4gICAgLy8gICBkZWxldGUgb2JqZWN0W2ldO1xuICAgIC8vIH1cbiAgICAvLyBmb3IgKGkgaW4gX25ld09yZGVyKSB7XG4gICAgLy8gICBvYmplY3RbaV0gPSBfbmV3T3JkZXJbaV07XG4gICAgLy8gfVxuICAgIHJldHVybiBfbmV3T3JkZXI7XG4gIH0sXG4gIHNvcnRCeTogXy5zb3J0QnksXG4gIGRlZmF1bHRzOiBfLmRlZmF1bHRzLFxuICB3aGVyZTogXy53aGVyZSxcbiAgZmluZFdoZXJlOiBfLmZpbmRXaGVyZSxcbiAgZmlsdGVyOiBfLmZpbHRlcixcbiAgcGljazogXy5waWNrLFxuICBleHRlbmQ6IGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgIC8vIEpTY3JpcHQgRG9udEVudW0gYnVnIGlzIG5vdCB0YWtlbiBjYXJlIG9mXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSAgdXRpbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwvb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBvYmplY3RVdGlscyA9IHJlcXVpcmUoXCIuL29iamVjdFwiKVxuXyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xuXG52YXIgdXRpbHMgPSB7XG4gIC8qKlxuICAgKiB3aWxsIGRpdmlkZSB0b3RhbCB3aWR0aCBmb3IgZXZlcnkgb2JqZWN0IGluIGNvbHVtbnRzIGFycmF5XG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICAgICB2YXIgX2ZsZXhBcnJheSA9IGZhYnJpYy51dGlsLmZsZXgoMjAwICwgW3tmbGV4OiAwfSx7dmFsdWU6IDEwMCwgZmxleDogMX0se2ZsZXg6IDB9XSApO1xuICAgKiBAcGFyYW0gdG90YWxcbiAgICogQHBhcmFtIGNvbHVtbnNcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKiBAZXhhbXBsZSBbNTAsMTAwLDUwXVxuICAgKi9cbiAgZmxleDogZnVuY3Rpb24gKHRvdGFsLGNvbHVtbnMpe1xuICAgIHZhciBfcmV0dXJuID0gW107XG4gICAgdmFyIHNwbGl0ID0gMDtcbiAgICBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uLCBpbmRleCl7XG4gICAgICBpZihjb2x1bW4udmFsdWUgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNwbGl0Kys7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdG90YWwgLT0gY29sdW1uLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBfdyA9IHRvdGFsIC8gc3BsaXQ7XG4gICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7XG4gICAgICBfcmV0dXJuLnB1c2goY29sdW1uLnZhbHVlID09PSB1bmRlZmluZWQgPyBfdyA6ICBjb2x1bW4udmFsdWUgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3JldHVybjtcbiAgfSxcbiAgd29ya2VyOiBmdW5jdGlvbiAoZm9vKSB7XG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcbiAgICAgIHZhciBzdHIgPSBmb28udG9TdHJpbmcoKTtcbiAgICAgIHZhciBldmVudEFyZyA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCIoXCIpICsgMSxzdHIuaW5kZXhPZihcIixcIikpO1xuICAgICAgdmFyIHBvc3RNZXNzYWdlQXJnID0gc3RyLnN1YnN0cmluZyhzdHIuaW5kZXhPZihcIixcIikgKyAxLHN0ci5pbmRleE9mKFwiKVwiKSk7XG4gICAgICB2YXIgX2Z1bmN0aW9uQm9keSA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCJ7XCIpICsgMSk7XG4gICAgICBzdHIgPSBcIm9ubWVzc2FnZT1mdW5jdGlvbihcIiArIGV2ZW50QXJnICsgXCIpe1wiICsgcG9zdE1lc3NhZ2VBcmcgKyBcIj0gcG9zdE1lc3NhZ2U7XCIgKyBfZnVuY3Rpb25Cb2R5O1xuICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbc3RyXSk7XG4gICAgICAvL1wib25tZXNzYWdlID0gZnVuY3Rpb24oZSkgeyBwb3N0TWVzc2FnZSgnbXNnIGZyb20gd29ya2VyJyk7IH1cIl0pO1xuICAgICAgdmFyIGJsb2JVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHJldHVybiBuZXcgV29ya2VyKGJsb2JVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgd29ya2VyID0ge1xuICAgICAgICB0ZXJtaW5hdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdE1lc3NhZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb28oe2RhdGE6IGRhdGF9LCBmdW5jdGlvbiAocmVzcG9uc2VEYXRhKSB7XG4gICAgICAgICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgJiYgd29ya2VyLm9ubWVzc2FnZSh7ZGF0YTogcmVzcG9uc2VEYXRhfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9XG4gIH0sXG4gIG9ic2VydmFibGU6IGZ1bmN0aW9uIChvYmopIHtcbiAgICBfLmV4dGVuZChvYmosIHtcblxuICAgICAgZmlyZTogZnVuY3Rpb24gZmlyZShldmVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyc0ZvckV2ZW50ID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzRm9yRXZlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RlbmVyc0ZvckV2ZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGlzdGVuZXJzRm9yRXZlbnRbaV0uY2FsbCh0aGlzLCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnROYW1lLmNvbnN0cnVjdG9yID09IE9iamVjdCkge1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm9uKGksIGV2ZW50TmFtZVtpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlKGV2ZW50c1tpXSwgaGFuZGxlcilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBvYnNlcnZlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdGhpcy5vbihwcm9wLCBldmVudE5hbWVbcHJvcF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIG9mZjogZnVuY3Rpb24gc3RvcE9ic2VydmluZyhldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgcHJvcCwgZXZlbnROYW1lW3Byb3BdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgX3JlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGluT3JkZXI6IGZ1bmN0aW9uIChhcnJheSwgZm9vLCBjYWxsYmFjaykge1xuICAgIHZhciBfaW5kZXggPSAwO1xuICAgIGZ1bmN0aW9uIF9pbk9yZGVySW5kZXgoKSB7XG4gICAgICBpZiAoKytfaW5kZXggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgZm9vKGFycmF5W19pbmRleF0sIF9pbmRleCwgX2luT3JkZXJJbmRleClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvbyhhcnJheVtfaW5kZXhdLCBfaW5kZXgsIF9pbk9yZGVySW5kZXgpXG4gIH0sXG4gIC8qKlxuICAgKiDQstC+0LfQstGA0LDRidCw0LXRgiDQvtCx0YrQtdC60YIg0YEg0LrQu9GO0YfQsNC80Lgg0YHRgtGA0L7QutC4IHVybFxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBxdWVyeVN0cmluZzogZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgaWYocXVlcnkpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuc3Vic3RyKHF1ZXJ5LmluZGV4T2YoXCI/XCIpICsgMSkgO1xuICAgIH1lbHNle1xuICAgICAgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBfbGVuZ3RoID0gMDtcbiAgICBpZiAoIXF1ZXJ5KXJldHVybiBvYmo7XG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgdmFyIF92bmFtZSA9IHBhaXJbMF0sIHZhbCA9IHBhaXJbMV07XG4gICAgICBpZiAodHlwZW9mIG9ialtfdm5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIG9ialtfdm5hbWVdID0gdmFsIHx8IFwiXCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICAgIC8vIElmIHNlY29uZCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW192bmFtZV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGFyciA9IFtvYmpbX3ZuYW1lXSwgdmFsXTtcbiAgICAgICAgb2JqW192bmFtZV0gPSBhcnI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpbX3ZuYW1lXS5wdXNoKHZhbCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFwibGVuZ3RoXCIsIHt2YWx1ZTogX2xlbmd0aCwgZW51bWVyYWJsZTogZmFsc2V9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9LFxuICBjb3B5VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHN3aXRjaCAodmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICByZXR1cm4gb2JqZWN0VXRpbHMuZGVlcEV4dGVuZCh7fSwgdmFsdWUpO1xuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgcmV0dXJuIG9iamVjdFV0aWxzLmRlZXBFeHRlbmQoW10sIHZhbHVlKTtcbiAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vY29uc29sZS5sb2codmFsdWUuY29uc3RydWN0b3IpO1xuICAgICAgICByZXR1cm4gb2JqZWN0VXRpbHMuZGVlcEV4dGVuZCh7fSwgdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgY2xlYXJWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgc3dpdGNoICh2YWx1ZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiB2YWx1ZSkgZGVsZXRlIHZhbHVlW21lbWJlcl07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBkZWxldGUgdmFsdWU7XG4gICAgfVxuICB9LFxuICBvYmplY3RzRGlmZmVyZW5jZTogZnVuY3Rpb24gKHByZXYsIG5vdykge1xuICAgIHZhciBjaGFuZ2VzID0ge307XG4gICAgZm9yICh2YXIgcHJvcCBpbiBub3cpIHtcbiAgICAgIGlmICghcHJldiB8fCBwcmV2W3Byb3BdICE9PSBub3dbcHJvcF0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3dbcHJvcF0gPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHZhciBjID0gdXRpbHMub2JqZWN0c0RpZmZlcmVuY2UocHJldltwcm9wXSwgbm93W3Byb3BdKTtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShjKSkgLy8gdW5kZXJzY29yZVxuICAgICAgICAgICAgY2hhbmdlc1twcm9wXSA9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlc1twcm9wXSA9IG5vd1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhbmdlcztcbiAgfSxcbiAgc3BsaXRCeTogZnVuY3Rpb24gKHF1ZXJ5LCBkZWxpbWl0ZXIpIHtcbiAgICB2YXIgdHJhY2VRdWVyaWVzID0gW107XG4gICAgdmFyIHIgPSAwLFxuICAgICAgZiA9IDAsXG4gICAgICBfcF9zdGFydCA9IDA7XG4gICAgaWYgKHF1ZXJ5ID09IFwiXCIpIHJldHVybiBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHF1ZXJ5W2ldO1xuICAgICAgaWYgKGMgPT0gXCIoXCIpIHtcbiAgICAgICAgcisrO1xuICAgICAgICBmID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PSBcIilcIikge1xuICAgICAgICByLS07XG4gICAgICB9XG4gICAgICBpZiAociA9PSAwICYmIGYgPT0gMSkgZiA9IDA7XG4gICAgICBpZiAoZGVsaW1pdGVyLmluZGV4T2YoYykgIT0gLTEgJiYgciA9PSAwICYmIGYgPT0gMCkge1xuICAgICAgICB0cmFjZVF1ZXJpZXMucHVzaChxdWVyeS5zdWJzdHJpbmcoX3Bfc3RhcnQsIGkpKTtcbiAgICAgICAgX3Bfc3RhcnQgPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdHJhY2VRdWVyaWVzLnB1c2gocXVlcnkuc3Vic3RyaW5nKF9wX3N0YXJ0KSk7XG4gICAgcmV0dXJuIHRyYWNlUXVlcmllcztcbiAgfSxcbiAgcXVldWVMb2FkOiBmdW5jdGlvbiAodG90YWwsIGNvbXBsZXRlQ0IsIHByb2dyZXNzQ0IpIHtcbiAgICB2YXIgbG9hZGVyID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICBsb2FkZXIubG9hZGVkLnB1c2goZWwpO1xuICAgICAgbG9hZGVyLnByb2dyZXNzQ0IgJiYgbG9hZGVyLnByb2dyZXNzQ0IobG9hZGVyLmxvYWRlZC5sZW5ndGgsIGxvYWRlci50b3RhbCwgZWwsIGxvYWRlci5sb2FkZWQpO1xuXG4gICAgICBpZiAobG9hZGVyLmxvYWRlZC5sZW5ndGggPT0gbG9hZGVyLnRvdGFsKSB7XG4gICAgICAgIGxvYWRlci5jb21wbGV0ZUNCICYmIGxvYWRlci5jb21wbGV0ZUNCKGxvYWRlci5sb2FkZWQpO1xuICAgICAgICBsb2FkZXIuZmlyZShcImxvYWRlZFwiKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxvYWRlci5jb21wbGV0ZUNCID0gY29tcGxldGVDQjtcbiAgICBsb2FkZXIucHJvZ3Jlc3NDQiA9IHByb2dyZXNzQ0I7XG4gICAgbG9hZGVyLnRvdGFsID0gdG90YWw7XG4gICAgbG9hZGVyLmxvYWRlZCA9IFtdO1xuICAgIHV0aWxzLm9ic2VydmFibGUobG9hZGVyKTtcblxuICAgIHJldHVybiBsb2FkZXI7XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9ICB1dGlscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bmRlcnNjb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlc29sdmU6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIGNodW5rcyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICAgIHZhciBwcmV2ID0gMDtcbiAgICBmb3IgKHZhciBpID0gY2h1bmtzLmxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChjaHVua3NbaV0gPT0gXCIuLlwiKSB7XG4gICAgICAgIHByZXYrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChwcmV2ID4gMCkge1xuICAgICAgICAgIGNodW5rcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgY2h1bmtzLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgIHByZXYtLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2h1bmtzLmpvaW4oXCIvXCIpO1xuICB9LFxuICBnZXRQYXJlbnREaXJlY3RvcnlVcmw6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnN1YnN0cigwLCB1cmwubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC9wYXRoLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpVlZSR0xUZ2lJSE4wWVc1a1lXeHZibVU5SW01dklqOCtDandoTFMwZ1EzSmxZWFJsWkNCM2FYUm9JRWx1YTNOallYQmxJQ2hvZEhSd09pOHZkM2QzTG1sdWEzTmpZWEJsTG05eVp5OHBJQzB0UGdvOGMzWm5DaUFnSUNCNGJXeHVjenBwYm10elkyRndaVDBpYUhSMGNEb3ZMM2QzZHk1cGJtdHpZMkZ3WlM1dmNtY3ZibUZ0WlhOd1lXTmxjeTlwYm10elkyRndaU0lLSUNBZ0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SUtJQ0FnSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlLSUNBZ0lIaHRiRzV6T25OdlpHbHdiMlJwUFNKb2RIUndPaTh2YzI5a2FYQnZaR2t1YzI5MWNtTmxabTl5WjJVdWJtVjBMMFJVUkM5emIyUnBjRzlrYVMwd0xtUjBaQ0lLSUNBZ0lIaHRiRzV6T21OalBTSm9kSFJ3T2k4dlkzSmxZWFJwZG1WamIyMXRiMjV6TG05eVp5OXVjeU1pQ2lBZ0lDQjRiV3h1Y3pwNGJHbHVhejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOTRiR2x1YXlJS0lDQWdJSGh0Ykc1ek9tUmpQU0pvZEhSd09pOHZjSFZ5YkM1dmNtY3ZaR012Wld4bGJXVnVkSE12TVM0eEx5SUtJQ0FnSUhodGJHNXpPbk4yWnowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUNpQWdJQ0I0Yld4dWN6cHVjekU5SW1oMGRIQTZMeTl6YjNwcExtSmhhV1Z5YjNWblpTNW1jaUlLSUNBZ0lHbGtQU0p6ZG1jME9EZzRJZ29nSUNBZ2MyOWthWEJ2WkdrNlpHOWpibUZ0WlQwaWQyRnlibWx1WjE5aWRYUjBiMjR1YzNabklnb2dJQ0FnZG1sbGQwSnZlRDBpTUNBd0lEUXdNQ0EwTURBaUNpQWdJQ0IyWlhKemFXOXVQU0l4TGpFaUNpQWdJQ0JwYm10elkyRndaVHAyWlhKemFXOXVQU0l3TGpRNExqQWdjamsyTlRRaUNpQWdQZ29nSUR4a1pXWnpDaUFnSUNBZ0lHbGtQU0prWldaek5EZzVNQ0lLSUNBZ0lENEtJQ0FnSUR4c2FXNWxZWEpIY21Ga2FXVnVkQW9nSUNBZ0lDQWdJR2xrUFNKc2FXNWxZWEpIY21Ga2FXVnVkRGcwTVRFaUNpQWdJQ0FnSUNBZ2VUSTlJak0yTnk0NE9DSUtJQ0FnSUNBZ0lDQm5jbUZrYVdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0lLSUNBZ0lDQWdJQ0I1TVQwaU1qZzNMalE1SWdvZ0lDQWdJQ0FnSUhneVBTSXpNVFV1TkRjaUNpQWdJQ0FnSUNBZ2VERTlJakkwTVM0ME1TSUtJQ0FnSUNBZ0lDQnBibXR6WTJGd1pUcGpiMnhzWldOMFBTSmhiSGRoZVhNaUNpQWdJQ0FnSUQ0S0lDQWdJQ0FnUEhOMGIzQUtJQ0FnSUNBZ0lDQWdJR2xrUFNKemRHOXdOREUxT0NJS0lDQWdJQ0FnSUNBZ0lITjBlV3hsUFNKemRHOXdMV052Ykc5eU9pTm1abVptWm1ZaUNpQWdJQ0FnSUNBZ0lDQnZabVp6WlhROUlqQWlDaUFnSUNBZ0lDOCtDaUFnSUNBZ0lEeHpkRzl3Q2lBZ0lDQWdJQ0FnSUNCcFpEMGljM1J2Y0RReE5qQWlDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGljM1J2Y0MxamIyeHZjam9qWm1abVptWm1PM04wYjNBdGIzQmhZMmwwZVRvd0lnb2dJQ0FnSUNBZ0lDQWdiMlptYzJWMFBTSXhJZ29nSUNBZ0lDQXZQZ29nSUNBZ1BDOXNhVzVsWVhKSGNtRmthV1Z1ZEFvZ0lDQWdQZ29nSUNBZ1BHWnBiSFJsY2dvZ0lDQWdJQ0FnSUdsa1BTSm1hV3gwWlhJMk1USTJJZ29nSUNBZ0lDQWdJR052Ykc5eUxXbHVkR1Z5Y0c5c1lYUnBiMjR0Wm1sc2RHVnljejBpYzFKSFFpSUtJQ0FnSUNBZ0lDQnBibXR6WTJGd1pUcGpiMnhzWldOMFBTSmhiSGRoZVhNaUNpQWdJQ0FnSUQ0S0lDQWdJQ0FnUEdabFIyRjFjM05wWVc1Q2JIVnlDaUFnSUNBZ0lDQWdJQ0JwWkQwaVptVkhZWFZ6YzJsaGJrSnNkWEkyTVRJNElnb2dJQ0FnSUNBZ0lDQWdjM1JrUkdWMmFXRjBhVzl1UFNJd0xqVXpNRE0xTnpFeklnb2dJQ0FnSUNBZ0lDQWdhVzVyYzJOaGNHVTZZMjlzYkdWamREMGlZV3gzWVhseklnb2dJQ0FnSUNBdlBnb2dJQ0FnUEM5bWFXeDBaWElLSUNBZ0lENEtJQ0FnSUR4c2FXNWxZWEpIY21Ga2FXVnVkQW9nSUNBZ0lDQWdJR2xrUFNKc2FXNWxZWEpIY21Ga2FXVnVkRGcwTVRNaUNpQWdJQ0FnSUNBZ2VUSTlJak01TVM0ME5TSUtJQ0FnSUNBZ0lDQm5jbUZrYVdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0lLSUNBZ0lDQWdJQ0I1TVQwaU16QXdMamcySWdvZ0lDQWdJQ0FnSUhneVBTSXpORElpQ2lBZ0lDQWdJQ0FnZURFOUlqSTNOUzQyTVNJS0lDQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyeHNaV04wUFNKaGJIZGhlWE1pQ2lBZ0lDQWdJRDRLSUNBZ0lDQWdQSE4wYjNBS0lDQWdJQ0FnSUNBZ0lHbGtQU0p6ZEc5d056SXdNU0lLSUNBZ0lDQWdJQ0FnSUhOMGVXeGxQU0p6ZEc5d0xXTnZiRzl5T2lNMU5UQXdNREFpQ2lBZ0lDQWdJQ0FnSUNCdlptWnpaWFE5SWpBaUNpQWdJQ0FnSUM4K0NpQWdJQ0FnSUR4emRHOXdDaUFnSUNBZ0lDQWdJQ0JwWkQwaWMzUnZjRGN5TURNaUNpQWdJQ0FnSUNBZ0lDQnpkSGxzWlQwaWMzUnZjQzFqYjJ4dmNqb2pabVl3TURBd0lnb2dJQ0FnSUNBZ0lDQWdiMlptYzJWMFBTSXhJZ29nSUNBZ0lDQXZQZ29nSUNBZ1BDOXNhVzVsWVhKSGNtRmthV1Z1ZEFvZ0lDQWdQZ29nSUNBZ1BISmhaR2xoYkVkeVlXUnBaVzUwQ2lBZ0lDQWdJQ0FnYVdROUluSmhaR2xoYkVkeVlXUnBaVzUwT0RReE5TSUtJQ0FnSUNBZ0lDQm5jbUZrYVdWdWRGVnVhWFJ6UFNKMWMyVnlVM0JoWTJWUGJsVnpaU0lLSUNBZ0lDQWdJQ0JqZUQwaU16RXlMamM0SWdvZ0lDQWdJQ0FnSUdONVBTSXpPRFl1TlRjaUNpQWdJQ0FnSUNBZ2NqMGlOVE11TURNMklnb2dJQ0FnSUNBZ0lHZHlZV1JwWlc1MFZISmhibk5tYjNKdFBTSnRZWFJ5YVhnb0xTNDFPVE15TnlBdExqVTVNekkzSUM0M01UVXdOU0F0TGpjeE5UQTFJREkwTXk0eU55QTRORGt1TURNcElnb2dJQ0FnSUNBZ0lHbHVhM05qWVhCbE9tTnZiR3hsWTNROUltRnNkMkY1Y3lJS0lDQWdJQ0FnUGdvZ0lDQWdJQ0E4YzNSdmNBb2dJQ0FnSUNBZ0lDQWdhV1E5SW5OMGIzQTNNVEV6TFRjaUNpQWdJQ0FnSUNBZ0lDQnpkSGxzWlQwaWMzUnZjQzFqYjJ4dmNqb2pabVptWm1abU8zTjBiM0F0YjNCaFkybDBlVG91TkRBNE1UWWlDaUFnSUNBZ0lDQWdJQ0J2Wm1aelpYUTlJakFpQ2lBZ0lDQWdJQzgrQ2lBZ0lDQWdJRHh6ZEc5d0NpQWdJQ0FnSUNBZ0lDQnBaRDBpYzNSdmNEY3hNVFV0TnlJS0lDQWdJQ0FnSUNBZ0lITjBlV3hsUFNKemRHOXdMV052Ykc5eU9pTm1abVptWm1ZN2MzUnZjQzF2Y0dGamFYUjVPakFpQ2lBZ0lDQWdJQ0FnSUNCdlptWnpaWFE5SWpFaUNpQWdJQ0FnSUM4K0NpQWdJQ0E4TDNKaFpHbGhiRWR5WVdScFpXNTBDaUFnSUNBK0NpQWdJQ0E4YkdsdVpXRnlSM0poWkdsbGJuUUtJQ0FnSUNBZ0lDQnBaRDBpYkdsdVpXRnlSM0poWkdsbGJuUXhNRFEwT1NJS0lDQWdJQ0FnSUNCNU1qMGlNek00TGpneUlnb2dJQ0FnSUNBZ0lHZHlZV1JwWlc1MFZXNXBkSE05SW5WelpYSlRjR0ZqWlU5dVZYTmxJZ29nSUNBZ0lDQWdJSGt4UFNJeU9EWXVOamNpQ2lBZ0lDQWdJQ0FnWjNKaFpHbGxiblJVY21GdWMyWnZjbTA5SW0xaGRISnBlQ2d1T1RVMU16UWdNQ0F3SUM0NU5UVXpOQ0F4TXpZdU1USWdNVFF1TURVMUtTSUtJQ0FnSUNBZ0lDQjRNajBpTXpBd0xqSTNJZ29nSUNBZ0lDQWdJSGd4UFNJeU5UVXVNeklpQ2lBZ0lDQWdJQ0FnYVc1cmMyTmhjR1U2WTI5c2JHVmpkRDBpWVd4M1lYbHpJZ29nSUNBZ0lDQStDaUFnSUNBZ0lEeHpkRzl3Q2lBZ0lDQWdJQ0FnSUNCcFpEMGljM1J2Y0RReE5UQWlDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGljM1J2Y0MxamIyeHZjam9qWm1abVptWm1JZ29nSUNBZ0lDQWdJQ0FnYjJabWMyVjBQU0l3SWdvZ0lDQWdJQ0F2UGdvZ0lDQWdJQ0E4YzNSdmNBb2dJQ0FnSUNBZ0lDQWdhV1E5SW5OMGIzQTBNVFV5SWdvZ0lDQWdJQ0FnSUNBZ2MzUjViR1U5SW5OMGIzQXRZMjlzYjNJNkkyWm1abVptWmp0emRHOXdMVzl3WVdOcGRIazZNQ0lLSUNBZ0lDQWdJQ0FnSUc5bVpuTmxkRDBpTVNJS0lDQWdJQ0FnTHo0S0lDQWdJRHd2YkdsdVpXRnlSM0poWkdsbGJuUUtJQ0FnSUQ0S0lDQWdJRHhtYVd4MFpYSUtJQ0FnSUNBZ0lDQnBaRDBpWm1sc2RHVnlNVEUwTWpnaUNpQWdJQ0FnSUNBZ1kyOXNiM0l0YVc1MFpYSndiMnhoZEdsdmJpMW1hV3gwWlhKelBTSnpVa2RDSWdvZ0lDQWdJQ0FnSUdsdWEzTmpZWEJsT21OdmJHeGxZM1E5SW1Gc2QyRjVjeUlLSUNBZ0lDQWdQZ29nSUNBZ0lDQThabVZIWVhWemMybGhia0pzZFhJS0lDQWdJQ0FnSUNBZ0lHbGtQU0ptWlVkaGRYTnphV0Z1UW14MWNqRXhORE13SWdvZ0lDQWdJQ0FnSUNBZ2MzUmtSR1YyYVdGMGFXOXVQU0l4TGpJME16UTJOemdpQ2lBZ0lDQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyeHNaV04wUFNKaGJIZGhlWE1pQ2lBZ0lDQWdJQzgrQ2lBZ0lDQThMMlpwYkhSbGNnb2dJQ0FnUGdvZ0lEd3ZaR1ZtY3dvZ0lENEtJQ0E4YzI5a2FYQnZaR2s2Ym1GdFpXUjJhV1YzQ2lBZ0lDQWdJR2xrUFNKaVlYTmxJZ29nSUNBZ0lDQmliM0prWlhKamIyeHZjajBpSXpZMk5qWTJOaUlLSUNBZ0lDQWdhVzVyYzJOaGNHVTZjR0ZuWlhOb1lXUnZkejBpTWlJS0lDQWdJQ0FnYVc1cmMyTmhjR1U2ZDJsdVpHOTNMWGs5SWkwNElnb2dJQ0FnSUNCd1lXZGxZMjlzYjNJOUlpTm1abVptWm1ZaUNpQWdJQ0FnSUdsdWEzTmpZWEJsT25kcGJtUnZkeTFvWldsbmFIUTlJams0T0NJS0lDQWdJQ0FnYVc1cmMyTmhjR1U2ZDJsdVpHOTNMVzFoZUdsdGFYcGxaRDBpTVNJS0lDQWdJQ0FnYVc1cmMyTmhjR1U2ZW05dmJUMGlNQzQzTURjeE1EWTNPQ0lLSUNBZ0lDQWdhVzVyYzJOaGNHVTZkMmx1Wkc5M0xYZzlJaTA0SWdvZ0lDQWdJQ0J6YUc5M1ozSnBaRDBpWm1Gc2MyVWlDaUFnSUNBZ0lHSnZjbVJsY205d1lXTnBkSGs5SWpFdU1DSUtJQ0FnSUNBZ2FXNXJjMk5oY0dVNlkzVnljbVZ1ZEMxc1lYbGxjajBpYkdGNVpYSXhJZ29nSUNBZ0lDQnBibXR6WTJGd1pUcGplRDBpTXpBMExqZzVOREE1SWdvZ0lDQWdJQ0JwYm10elkyRndaVHBqZVQwaU16UXhMalV5TVRnMklnb2dJQ0FnSUNCcGJtdHpZMkZ3WlRwM2FXNWtiM2N0ZDJsa2RHZzlJakUyT0RBaUNpQWdJQ0FnSUdsdWEzTmpZWEJsT25CaFoyVnZjR0ZqYVhSNVBTSXdMakFpQ2lBZ0lDQWdJR2x1YTNOallYQmxPbVJ2WTNWdFpXNTBMWFZ1YVhSelBTSndlQ0lLSUNBdlBnb2dJRHhuQ2lBZ0lDQWdJR2xrUFNKc1lYbGxjakVpQ2lBZ0lDQWdJR2x1YTNOallYQmxPbXhoWW1Wc1BTSk1ZWGxsY2lBeElnb2dJQ0FnSUNCcGJtdHpZMkZ3WlRwbmNtOTFjRzF2WkdVOUlteGhlV1Z5SWdvZ0lDQWdJQ0IwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNnd0lDMDJOVEl1TXpZcElnb2dJQ0FnUGdvZ0lDQWdQR2NLSUNBZ0lDQWdJQ0JwWkQwaVp6RXhORE15SWdvZ0lDQWdJQ0FnSUdsdWEzTmpZWEJsT21WNGNHOXlkQzE1WkhCcFBTSTVNQ0lLSUNBZ0lDQWdJQ0JwYm10elkyRndaVHBsZUhCdmNuUXRlR1J3YVQwaU9UQWlDaUFnSUNBZ0lDQWdkSEpoYm5ObWIzSnRQU0p0WVhSeWFYZ29NaTQ1TURVeElEQWdNQ0F5TGprd05URWdMVEV3TURFdU9TQXROemd1T1RZeEtTSUtJQ0FnSUNBZ1Bnb2dJQ0FnSUNBOGNHRjBhQW9nSUNBZ0lDQWdJQ0FnYVdROUluQmhkR2czTWpjMklnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZjbmc5SWpVekxqQXpOVGN4TXlJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9uSjVQU0kxTXk0d016VTNNVE1pQ2lBZ0lDQWdJQ0FnSUNCemRIbHNaVDBpWm1sc2JEb2pPVGs1T1RrNUlnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZkSGx3WlQwaVlYSmpJZ29nSUNBZ0lDQWdJQ0FnWkQwaWJUTTFOaTQzT1NBek5EWXVNVEZqTUNBeU9TNHlPVEV0TWpNdU56UTFJRFV6TGpBek5pMDFNeTR3TXpZZ05UTXVNRE0yY3kwMU15NHdNell0TWpNdU56UTFMVFV6TGpBek5pMDFNeTR3TXpZZ01qTXVOelExTFRVekxqQXpOaUExTXk0d016WXROVE11TURNMklEVXpMakF6TmlBeU15NDNORFVnTlRNdU1ETTJJRFV6TGpBek5ub2lDaUFnSUNBZ0lDQWdJQ0IwY21GdWMyWnZjbTA5SW0xaGRISnBlQ2d1T1Rjek5UUWdNQ0F3SUM0NU56TTFOQ0F4TWpBdU1Ea2dMVEV5TGpZeU9Da2lDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHBqZVQwaU16UTJMakV4TWpFNElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZZM2c5SWpNd015NDNOU0lLSUNBZ0lDQWdMejRLSUNBZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUNBZ0lHbGtQU0p3WVhSb056STNPQ0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNFBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHB5ZVQwaU5UTXVNRE0xTnpFeklnb2dJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2ZFhKc0tDTnNhVzVsWVhKSGNtRmthV1Z1ZERnME1URXBJZ29nSUNBZ0lDQWdJQ0FnYzI5a2FYQnZaR2s2ZEhsd1pUMGlZWEpqSWdvZ0lDQWdJQ0FnSUNBZ1pEMGliVE0xTmk0M09TQXpORFl1TVRGak1DQXlPUzR5T1RFdE1qTXVOelExSURVekxqQXpOaTAxTXk0d016WWdOVE11TURNMmN5MDFNeTR3TXpZdE1qTXVOelExTFRVekxqQXpOaTAxTXk0d016WWdNak11TnpRMUxUVXpMakF6TmlBMU15NHdNell0TlRNdU1ETTJJRFV6TGpBek5pQXlNeTQzTkRVZ05UTXVNRE0ySURVekxqQXpObm9pQ2lBZ0lDQWdJQ0FnSUNCMGNtRnVjMlp2Y20wOUltMWhkSEpwZUNndU9UVTVOakFnTUNBd0lDNDVOVGsyTUNBeE1qUXVNek1nTFRjdU9EQXhOQ2tpQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRwamVUMGlNelEyTGpFeE1qRTRJZ29nSUNBZ0lDQWdJQ0FnYzI5a2FYQnZaR2s2WTNnOUlqTXdNeTQzTlNJS0lDQWdJQ0FnTHo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdJR2xrUFNKd1lYUm9Oekk0TUNJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9uSjRQU0kxTXk0d016VTNNVE1pQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRweWVUMGlOVE11TURNMU56RXpJZ29nSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkhSbGNqcDFjbXdvSTJacGJIUmxjall4TWpZcE8yWnBiR3c2STJWalpXTmxZeUlLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25SNWNHVTlJbUZ5WXlJS0lDQWdJQ0FnSUNBZ0lHUTlJbTB6TlRZdU56a2dNelEyTGpFeFl6QWdNamt1TWpreExUSXpMamMwTlNBMU15NHdNell0TlRNdU1ETTJJRFV6TGpBek5uTXROVE11TURNMkxUSXpMamMwTlMwMU15NHdNell0TlRNdU1ETTJJREl6TGpjME5TMDFNeTR3TXpZZ05UTXVNRE0yTFRVekxqQXpOaUExTXk0d016WWdNak11TnpRMUlEVXpMakF6TmlBMU15NHdNelo2SWdvZ0lDQWdJQ0FnSUNBZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb0xqZzNNelUxSURBZ01DQXVPRGN6TlRVZ01UVXdMalEzSURJeExqazRNU2tpQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRwamVUMGlNelEyTGpFeE1qRTRJZ29nSUNBZ0lDQWdJQ0FnYzI5a2FYQnZaR2s2WTNnOUlqTXdNeTQzTlNJS0lDQWdJQ0FnTHo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdJR2xrUFNKd1lYUm9Oekk0TWlJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9uSjRQU0kxTXk0d016VTNNVE1pQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRweWVUMGlOVE11TURNMU56RXpJZ29nSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkhSbGNqcDFjbXdvSTJacGJIUmxjall4TWpZcE8yWnBiR3c2SXprNU9UazVPU0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25SNWNHVTlJbUZ5WXlJS0lDQWdJQ0FnSUNBZ0lHUTlJbTB6TlRZdU56a2dNelEyTGpFeFl6QWdNamt1TWpreExUSXpMamMwTlNBMU15NHdNell0TlRNdU1ETTJJRFV6TGpBek5uTXROVE11TURNMkxUSXpMamMwTlMwMU15NHdNell0TlRNdU1ETTJJREl6TGpjME5TMDFNeTR3TXpZZ05UTXVNRE0yTFRVekxqQXpOaUExTXk0d016WWdNak11TnpRMUlEVXpMakF6TmlBMU15NHdNelo2SWdvZ0lDQWdJQ0FnSUNBZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb0xqZ3pPRE00SURBZ01DQXVPRE00TXpnZ01UWXhMakUxSURNMExqRTFNaWtpQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRwamVUMGlNelEyTGpFeE1qRTRJZ29nSUNBZ0lDQWdJQ0FnYzI5a2FYQnZaR2s2WTNnOUlqTXdNeTQzTlNJS0lDQWdJQ0FnTHo0S0lDQWdJQ0FnUEhCaGRHZ0tJQ0FnSUNBZ0lDQWdJR2xrUFNKd1lYUm9Oekk0TkNJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9uSjRQU0kxTXk0d016VTNNVE1pQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRweWVUMGlOVE11TURNMU56RXpJZ29nSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkd3NmRYSnNLQ05zYVc1bFlYSkhjbUZrYVdWdWREZzBNVE1wSWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNmRIbHdaVDBpWVhKaklnb2dJQ0FnSUNBZ0lDQWdaRDBpYlRNMU5pNDNPU0F6TkRZdU1URmpNQ0F5T1M0eU9URXRNak11TnpRMUlEVXpMakF6TmkwMU15NHdNellnTlRNdU1ETTJjeTAxTXk0d016WXRNak11TnpRMUxUVXpMakF6TmkwMU15NHdNellnTWpNdU56UTFMVFV6TGpBek5pQTFNeTR3TXpZdE5UTXVNRE0ySURVekxqQXpOaUF5TXk0M05EVWdOVE11TURNMklEVXpMakF6Tm5vaUNpQWdJQ0FnSUNBZ0lDQjBjbUZ1YzJadmNtMDlJbTFoZEhKcGVDZ3VPREExT0RjZ01DQXdJQzQ0TURVNE55QXhOekV1TURNZ05EVXVOREExS1NJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9tTjVQU0l6TkRZdU1URXlNVGdpQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRwamVEMGlNekF6TGpjMUlnb2dJQ0FnSUNBdlBnb2dJQ0FnSUNBOGNHRjBhQW9nSUNBZ0lDQWdJQ0FnYVdROUluQmhkR2czTWpnMklnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZjbmc5SWpVekxqQXpOVGN4TXlJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9uSjVQU0kxTXk0d016VTNNVE1pQ2lBZ0lDQWdJQ0FnSUNCemRIbHNaVDBpWm1sc2JEcDFjbXdvSTNKaFpHbGhiRWR5WVdScFpXNTBPRFF4TlNraUNpQWdJQ0FnSUNBZ0lDQnpiMlJwY0c5a2FUcDBlWEJsUFNKaGNtTWlDaUFnSUNBZ0lDQWdJQ0JrUFNKdE16VTJMamM1SURNME5pNHhNV013SURJNUxqSTVNUzB5TXk0M05EVWdOVE11TURNMkxUVXpMakF6TmlBMU15NHdNelp6TFRVekxqQXpOaTB5TXk0M05EVXROVE11TURNMkxUVXpMakF6TmlBeU15NDNORFV0TlRNdU1ETTJJRFV6TGpBek5pMDFNeTR3TXpZZ05UTXVNRE0ySURJekxqYzBOU0ExTXk0d016WWdOVE11TURNMmVpSUtJQ0FnSUNBZ0lDQWdJSFJ5WVc1elptOXliVDBpYldGMGNtbDRLQzQzTlRneU5TQXdJREFnTGpjMU9ESTFJREU0Tmk0M05TQTJNeTQ1TURZcElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZZM2s5SWpNME5pNHhNVEl4T0NJS0lDQWdJQ0FnSUNBZ0lITnZaR2x3YjJScE9tTjRQU0l6TURNdU56VWlDaUFnSUNBZ0lDOCtDaUFnSUNBZ0lEeHdZWFJvQ2lBZ0lDQWdJQ0FnSUNCcFpEMGljR0YwYURjeU9EZ2lDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGliM0JoWTJsMGVUb3VNekUzTnpFN1ptbHNiRHAxY213b0kyeHBibVZoY2tkeVlXUnBaVzUwTVRBME5Ea3BJZ29nSUNBZ0lDQWdJQ0FnYVc1cmMyTmhjR1U2WTI5dWJtVmpkRzl5TFdOMWNuWmhkSFZ5WlQwaU1DSUtJQ0FnSUNBZ0lDQWdJR1E5SW0wME1UUXVPQ0F5T0RRdU1UVmpMVEV6TGpNek1TQXdMak13TURZNUxUSTJMakU0TmlBM0xqTTFPQzB6TXk0ek16WWdNVGt1TnpReUxUY3VOamt3TXlBeE15NHpNaTAyTGpjeE16a2dNamt1TWpZMklERXVNVFUwTlNBME1TNHpNekVnTUM0NE5UTXdOaTB5Tmk0MU16SWdNakV1TVRNeUxUUTJMalV4TlNBME5pNHpNalF0TkRVdU1EVTBJRGd1TWpVNE9TQXdMalEzT1RBM0lERTJMakExTkNBekxqSXdNREVnTWpJdU9EVTVJRGN1TlRrd09DMHpMakkxTnpndE55NDBORGs0TFRndU9ERTNNUzB4TXk0NU5UTXRNVFl1TXprMExURTRMak15TnkwMkxqUTROamN0TXk0M05EVXhMVEV6TGpZeU5TMDFMalF6T1RNdE1qQXVOakE0TFRVdU1qZ3hPSG9pQ2lBZ0lDQWdJQzgrQ2lBZ0lDQWdJRHh3WVhSb0NpQWdJQ0FnSUNBZ0lDQnBaRDBpY21WamREY3pOekFpQ2lBZ0lDQWdJQ0FnSUNCa1BTSnROREF5TGpnNElETXdNQzR3T1MweE1TNDFPREVnTVRFdU5UZ3hJREV6TGpJNU5TQXhNeTR5T1RVdE1UTXVNamsxSURFekxqSTRNU0F4TVM0MU9ERWdNVEV1TlRneElERXpMakk0TVMweE15NHlPVFVnTVRNdU1qazFJREV6TGpJNU5TQXhNUzQxT0RFdE1URXVOVGd4TFRFekxqSTRNUzB4TXk0eU9ERWdNVE11TWpneExURXpMakk1TlMweE1TNDFPREV0TVRFdU5UZ3hMVEV6TGpJNU5TQXhNeTR5T0RFdE1UTXVNamd4TFRFekxqSTRNWG9pQ2lBZ0lDQWdJQ0FnSUNCemRIbHNaVDBpWm1sc2RHVnlPblZ5YkNnalptbHNkR1Z5TVRFME1qZ3BPMlpwYkd3Nkl6RmhNV0V4WVNJS0lDQWdJQ0FnSUNBZ0lHbHVhM05qWVhCbE9tTnZibTVsWTNSdmNpMWpkWEoyWVhSMWNtVTlJakFpQ2lBZ0lDQWdJQzgrQ2lBZ0lDQWdJRHh3WVhSb0NpQWdJQ0FnSUNBZ0lDQnBaRDBpY0dGMGFERXdORFUzSWdvZ0lDQWdJQ0FnSUNBZ2MzUjViR1U5SW1acGJHdzZJMlptWm1abVppSUtJQ0FnSUNBZ0lDQWdJR2x1YTNOallYQmxPbU52Ym01bFkzUnZjaTFqZFhKMllYUjFjbVU5SWpBaUNpQWdJQ0FnSUNBZ0lDQmtQU0p0TkRBekxqUTFJRE13TVM0eE5TMHhNUzR3T0RjZ01URXVNRGczSURFeUxqY3lPQ0F4TWk0M01qZ3RNVEl1TnpJNElERXlMamN4TkNBeE1TNHdPRGNnTVRFdU1EZzNJREV5TGpjeE5DMHhNaTQzTWpnZ01USXVOekk0SURFeUxqY3lPQ0F4TVM0d09EY3RNVEV1TURnM0xURXlMamN4TkMweE1pNDNNVFFnTVRJdU56RTBMVEV5TGpjeU9DMHhNUzR3T0RjdE1URXVNRGczTFRFeUxqY3lPQ0F4TWk0M01UUXRNVEl1TnpFMExURXlMamN4TkhvaUNpQWdJQ0FnSUM4K0NpQWdJQ0E4TDJjS0lDQWdJRDRLSUNBOEwyY0tJQ0ErQ2lBZ1BHMWxkR0ZrWVhSaENpQWdJQ0ErQ2lBZ0lDQThjbVJtT2xKRVJnb2dJQ0FnSUNBK0NpQWdJQ0FnSUR4all6cFhiM0pyQ2lBZ0lDQWdJQ0FnUGdvZ0lDQWdJQ0FnSUR4a1l6cG1iM0p0WVhRS0lDQWdJQ0FnSUNBZ0lENXBiV0ZuWlM5emRtY3JlRzFzUEM5a1l6cG1iM0p0WVhRS0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BHUmpPblI1Y0dVS0lDQWdJQ0FnSUNBZ0lDQWdjbVJtT25KbGMyOTFjbU5sUFNKb2RIUndPaTh2Y0hWeWJDNXZjbWN2WkdNdlpHTnRhWFI1Y0dVdlUzUnBiR3hKYldGblpTSUtJQ0FnSUNBZ0lDQXZQZ29nSUNBZ0lDQWdJRHhqWXpwc2FXTmxibk5sQ2lBZ0lDQWdJQ0FnSUNBZ0lISmtaanB5WlhOdmRYSmpaVDBpYUhSMGNEb3ZMMk55WldGMGFYWmxZMjl0Ylc5dWN5NXZjbWN2YkdsalpXNXpaWE12Y0hWaWJHbGpaRzl0WVdsdUx5SUtJQ0FnSUNBZ0lDQXZQZ29nSUNBZ0lDQWdJRHhrWXpwd2RXSnNhWE5vWlhJS0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJRHhqWXpwQloyVnVkQW9nSUNBZ0lDQWdJQ0FnSUNBZ0lISmtaanBoWW05MWREMGlhSFIwY0RvdkwyOXdaVzVqYkdsd1lYSjBMbTl5Wnk4aUNpQWdJQ0FnSUNBZ0lDQWdJRDRLSUNBZ0lDQWdJQ0FnSUNBZ1BHUmpPblJwZEd4bENpQWdJQ0FnSUNBZ0lDQWdJQ0FnUGs5d1pXNWpiR2x3WVhKMFBDOWtZenAwYVhSc1pRb2dJQ0FnSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnSUNBOEwyTmpPa0ZuWlc1MENpQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdQQzlrWXpwd2RXSnNhWE5vWlhJS0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BHUmpPblJwZEd4bENpQWdJQ0FnSUNBZ0lDQStaWEp5YjNJZ1luVjBkRzl1UEM5a1l6cDBhWFJzWlFvZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBOFpHTTZaR0YwWlFvZ0lDQWdJQ0FnSUNBZ1BqSXdNVEV0TURJdE1qUlVNVGM2TkRVNk5EVThMMlJqT21SaGRHVUtJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdQR1JqT21SbGMyTnlhWEIwYVc5dUNpQWdJQ0FnSUNBZ0x6NEtJQ0FnSUNBZ0lDQThaR002YzI5MWNtTmxDaUFnSUNBZ0lDQWdJQ0ErYUhSMGNITTZMeTl2Y0dWdVkyeHBjR0Z5ZEM1dmNtY3ZaR1YwWVdsc0x6RXlNalF5TlM5bGNuSnZjaTFpZFhSMGIyNHRZbmt0Y21sallYSmtiMjFoYVdFOEwyUmpPbk52ZFhKalpRb2dJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQThaR002WTNKbFlYUnZjZ29nSUNBZ0lDQWdJQ0FnUGdvZ0lDQWdJQ0FnSUNBZ1BHTmpPa0ZuWlc1MENpQWdJQ0FnSUNBZ0lDQWdJRDRLSUNBZ0lDQWdJQ0FnSUNBZ1BHUmpPblJwZEd4bENpQWdJQ0FnSUNBZ0lDQWdJQ0FnUG5KcFkyRnlaRzl0WVdsaFBDOWtZenAwYVhSc1pRb2dJQ0FnSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnSUNBOEwyTmpPa0ZuWlc1MENpQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdQQzlrWXpwamNtVmhkRzl5Q2lBZ0lDQWdJQ0FnUGdvZ0lDQWdJQ0FnSUR4a1l6cHpkV0pxWldOMENpQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdJQ0E4Y21SbU9rSmhad29nSUNBZ0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ0lDQWdJRHh5WkdZNmJHa0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBK1luVjBkRzl1UEM5eVpHWTZiR2tLSUNBZ0lDQWdJQ0FnSUNBZ1Bnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21SbU9teHBDaUFnSUNBZ0lDQWdJQ0FnSUNBZ1BtTmhibU5sYkR3dmNtUm1PbXhwQ2lBZ0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJQ0FnUEhKa1pqcHNhUW9nSUNBZ0lDQWdJQ0FnSUNBZ0lENWphWEpqYkdVOEwzSmtaanBzYVFvZ0lDQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdJQ0FnSUR4eVpHWTZiR2tLSUNBZ0lDQWdJQ0FnSUNBZ0lDQStaR1ZzWlhSbFBDOXlaR1k2YkdrS0lDQWdJQ0FnSUNBZ0lDQWdQZ29nSUNBZ0lDQWdJQ0FnSUNBOGNtUm1PbXhwQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdQbkpsWkR3dmNtUm1PbXhwQ2lBZ0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJQ0FnUEhKa1pqcHNhUW9nSUNBZ0lDQWdJQ0FnSUNBZ0lENXliM1Z1WkR3dmNtUm1PbXhwQ2lBZ0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJRHd2Y21SbU9rSmhad29nSUNBZ0lDQWdJQ0FnUGdvZ0lDQWdJQ0FnSUR3dlpHTTZjM1ZpYW1WamRBb2dJQ0FnSUNBZ0lENEtJQ0FnSUNBZ1BDOWpZenBYYjNKckNpQWdJQ0FnSUQ0S0lDQWdJQ0FnUEdOak9reHBZMlZ1YzJVS0lDQWdJQ0FnSUNBZ0lISmtaanBoWW05MWREMGlhSFIwY0RvdkwyTnlaV0YwYVhabFkyOXRiVzl1Y3k1dmNtY3ZiR2xqWlc1elpYTXZjSFZpYkdsalpHOXRZV2x1THlJS0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BHTmpPbkJsY20xcGRITUtJQ0FnSUNBZ0lDQWdJQ0FnY21SbU9uSmxjMjkxY21ObFBTSm9kSFJ3T2k4dlkzSmxZWFJwZG1WamIyMXRiMjV6TG05eVp5OXVjeU5TWlhCeWIyUjFZM1JwYjI0aUNpQWdJQ0FnSUNBZ0x6NEtJQ0FnSUNBZ0lDQThZMk02Y0dWeWJXbDBjd29nSUNBZ0lDQWdJQ0FnSUNCeVpHWTZjbVZ6YjNWeVkyVTlJbWgwZEhBNkx5OWpjbVZoZEdsMlpXTnZiVzF2Ym5NdWIzSm5MMjV6STBScGMzUnlhV0oxZEdsdmJpSUtJQ0FnSUNBZ0lDQXZQZ29nSUNBZ0lDQWdJRHhqWXpwd1pYSnRhWFJ6Q2lBZ0lDQWdJQ0FnSUNBZ0lISmtaanB5WlhOdmRYSmpaVDBpYUhSMGNEb3ZMMk55WldGMGFYWmxZMjl0Ylc5dWN5NXZjbWN2Ym5NalJHVnlhWFpoZEdsMlpWZHZjbXR6SWdvZ0lDQWdJQ0FnSUM4K0NpQWdJQ0FnSUR3dlkyTTZUR2xqWlc1elpRb2dJQ0FnSUNBK0NpQWdJQ0E4TDNKa1pqcFNSRVlLSUNBZ0lENEtJQ0E4TDIxbGRHRmtZWFJoQ2lBZ1BnbzhMM04yWndvK0NnPT1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vYmFzZTY0LWxvYWRlciEuL21lZGlhL2Vycm9yLWJ1dHRvbi5zdmdcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9jb3JlL2Jhc2UuanMnKTtcbnJlcXVpcmUoJy4vY29yZS9wbHVnaW5zTWl4aW4uanMnKTtcbnJlcXVpcmUoJy4vY29yZS9ldmVudHMuanMnKTtcbnJlcXVpcmUoJy4vY29yZS9vYnNlcnZlLmpzJyk7XG5yZXF1aXJlKCcuL2NvcmUvYXBwbGljYXRpb24uanMnKTtcbnJlcXVpcmUoJy4vY29yZS9zdGF0aWNDYW52YXMuanMnKTtcbnJlcXVpcmUoJy4vY29yZS9zbGlkZS5qcycpO1xucmVxdWlyZSgnLi9jb3JlL2V2ZW50TGlzdGVuZXJzLmpzJyk7XG5yZXF1aXJlKCcuL2NvcmUvcHJvdG90eXBlcy5qcycpO1xucmVxdWlyZSgnLi9jb3JlL29iamVjdC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2ZvbnRzLmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZnJvbVVSTC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3VwbG9hZC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2xvYWRlci5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2xheWVycy5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3JlbmRlci5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2hpc3RvcnkuanMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy96b29tLmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvaW50ZXJhY3RpdmVNb2RlLmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvYm9yZGVySW1hZ2UuanMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9zYXZlQXMuanMnKTtcbnJlcXVpcmUoJy4vb2JqZWN0cy9TbGlkZU9iamVjdC5qcycpO1xucmVxdWlyZSgnLi9vYmplY3RzL1NsaWRlVGV4dC5qcycpO1xucmVxdWlyZSgnLi9vYmplY3RzL1NsaWRlSW1hZ2UuanMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21vZHVsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdCAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHIgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgYXJndW1lbnRzWzBdXG4gICAgICAsIGFyZ3MgPSB0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdXG4gICAgLy9cbiAgICAvLyBmb3IgKHZhciBhcmcgaW4gYXJncykgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXHsnICsgYXJnICsgJ1xcXFx9JywgJ2dpJyksIGFyZ3NbYXJnXSlcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXHsoW159XSopXFx9L2csZnVuY3Rpb24oYSxiKXtcbiAgICAgIHJldHVybiB1dGlscy5ldmFsSW5Db250ZXh0KGIsYXJncylcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHN0clxufTtcblxudXRpbHMgPSB7XG4gIGV4dHJhY3RWYXJpYWJsZXM6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLm1hdGNoKC8oPyEoPzpkb3xpZnxpbnxmb3J8bGV0fG5ld3x0cnl8dmFyfGNhc2V8ZWxzZXxlbnVtfGV2YWx8ZmFsc2V8bnVsbHx0aGlzfHRydWV8dm9pZHx3aXRofGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxleHBvcnR8aW1wb3J0fHB1YmxpY3xyZXR1cm58c3RhdGljfHN3aXRjaHx0eXBlb2Z8ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufGFyZ3VtZW50c3xpbnRlcmZhY2V8cHJvdGVjdGVkfGltcGxlbWVudHN8aW5zdGFuY2VvZikkKVskQS1aXFxfYS16XFx4YWFcXHhiNVxceGJhXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxcdTAyYzFcXHUwMmM2LVxcdTAyZDFcXHUwMmUwLVxcdTAyZTRcXHUwMmVjXFx1MDJlZVxcdTAzNzAtXFx1MDM3NFxcdTAzNzZcXHUwMzc3XFx1MDM3YS1cXHUwMzdkXFx1MDM4NlxcdTAzODgtXFx1MDM4YVxcdTAzOGNcXHUwMzhlLVxcdTAzYTFcXHUwM2EzLVxcdTAzZjVcXHUwM2Y3LVxcdTA0ODFcXHUwNDhhLVxcdTA1MjdcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDVkMC1cXHUwNWVhXFx1MDVmMC1cXHUwNWYyXFx1MDYyMC1cXHUwNjRhXFx1MDY2ZVxcdTA2NmZcXHUwNjcxLVxcdTA2ZDNcXHUwNmQ1XFx1MDZlNVxcdTA2ZTZcXHUwNmVlXFx1MDZlZlxcdTA2ZmEtXFx1MDZmY1xcdTA2ZmZcXHUwNzEwXFx1MDcxMi1cXHUwNzJmXFx1MDc0ZC1cXHUwN2E1XFx1MDdiMVxcdTA3Y2EtXFx1MDdlYVxcdTA3ZjRcXHUwN2Y1XFx1MDdmYVxcdTA4MDAtXFx1MDgxNVxcdTA4MWFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4YTBcXHUwOGEyLVxcdTA4YWNcXHUwOTA0LVxcdTA5MzlcXHUwOTNkXFx1MDk1MFxcdTA5NTgtXFx1MDk2MVxcdTA5NzEtXFx1MDk3N1xcdTA5NzktXFx1MDk3ZlxcdTA5ODUtXFx1MDk4Y1xcdTA5OGZcXHUwOTkwXFx1MDk5My1cXHUwOWE4XFx1MDlhYS1cXHUwOWIwXFx1MDliMlxcdTA5YjYtXFx1MDliOVxcdTA5YmRcXHUwOWNlXFx1MDlkY1xcdTA5ZGRcXHUwOWRmLVxcdTA5ZTFcXHUwOWYwXFx1MDlmMVxcdTBhMDUtXFx1MGEwYVxcdTBhMGZcXHUwYTEwXFx1MGExMy1cXHUwYTI4XFx1MGEyYS1cXHUwYTMwXFx1MGEzMlxcdTBhMzNcXHUwYTM1XFx1MGEzNlxcdTBhMzhcXHUwYTM5XFx1MGE1OS1cXHUwYTVjXFx1MGE1ZVxcdTBhNzItXFx1MGE3NFxcdTBhODUtXFx1MGE4ZFxcdTBhOGYtXFx1MGE5MVxcdTBhOTMtXFx1MGFhOFxcdTBhYWEtXFx1MGFiMFxcdTBhYjJcXHUwYWIzXFx1MGFiNS1cXHUwYWI5XFx1MGFiZFxcdTBhZDBcXHUwYWUwXFx1MGFlMVxcdTBiMDUtXFx1MGIwY1xcdTBiMGZcXHUwYjEwXFx1MGIxMy1cXHUwYjI4XFx1MGIyYS1cXHUwYjMwXFx1MGIzMlxcdTBiMzNcXHUwYjM1LVxcdTBiMzlcXHUwYjNkXFx1MGI1Y1xcdTBiNWRcXHUwYjVmLVxcdTBiNjFcXHUwYjcxXFx1MGI4M1xcdTBiODUtXFx1MGI4YVxcdTBiOGUtXFx1MGI5MFxcdTBiOTItXFx1MGI5NVxcdTBiOTlcXHUwYjlhXFx1MGI5Y1xcdTBiOWVcXHUwYjlmXFx1MGJhM1xcdTBiYTRcXHUwYmE4LVxcdTBiYWFcXHUwYmFlLVxcdTBiYjlcXHUwYmQwXFx1MGMwNS1cXHUwYzBjXFx1MGMwZS1cXHUwYzEwXFx1MGMxMi1cXHUwYzI4XFx1MGMyYS1cXHUwYzMzXFx1MGMzNS1cXHUwYzM5XFx1MGMzZFxcdTBjNThcXHUwYzU5XFx1MGM2MFxcdTBjNjFcXHUwYzg1LVxcdTBjOGNcXHUwYzhlLVxcdTBjOTBcXHUwYzkyLVxcdTBjYThcXHUwY2FhLVxcdTBjYjNcXHUwY2I1LVxcdTBjYjlcXHUwY2JkXFx1MGNkZVxcdTBjZTBcXHUwY2UxXFx1MGNmMVxcdTBjZjJcXHUwZDA1LVxcdTBkMGNcXHUwZDBlLVxcdTBkMTBcXHUwZDEyLVxcdTBkM2FcXHUwZDNkXFx1MGQ0ZVxcdTBkNjBcXHUwZDYxXFx1MGQ3YS1cXHUwZDdmXFx1MGQ4NS1cXHUwZDk2XFx1MGQ5YS1cXHUwZGIxXFx1MGRiMy1cXHUwZGJiXFx1MGRiZFxcdTBkYzAtXFx1MGRjNlxcdTBlMDEtXFx1MGUzMFxcdTBlMzJcXHUwZTMzXFx1MGU0MC1cXHUwZTQ2XFx1MGU4MVxcdTBlODJcXHUwZTg0XFx1MGU4N1xcdTBlODhcXHUwZThhXFx1MGU4ZFxcdTBlOTQtXFx1MGU5N1xcdTBlOTktXFx1MGU5ZlxcdTBlYTEtXFx1MGVhM1xcdTBlYTVcXHUwZWE3XFx1MGVhYVxcdTBlYWJcXHUwZWFkLVxcdTBlYjBcXHUwZWIyXFx1MGViM1xcdTBlYmRcXHUwZWMwLVxcdTBlYzRcXHUwZWM2XFx1MGVkYy1cXHUwZWRmXFx1MGYwMFxcdTBmNDAtXFx1MGY0N1xcdTBmNDktXFx1MGY2Y1xcdTBmODgtXFx1MGY4Y1xcdTEwMDAtXFx1MTAyYVxcdTEwM2ZcXHUxMDUwLVxcdTEwNTVcXHUxMDVhLVxcdTEwNWRcXHUxMDYxXFx1MTA2NVxcdTEwNjZcXHUxMDZlLVxcdTEwNzBcXHUxMDc1LVxcdTEwODFcXHUxMDhlXFx1MTBhMC1cXHUxMGM1XFx1MTBjN1xcdTEwY2RcXHUxMGQwLVxcdTEwZmFcXHUxMGZjLVxcdTEyNDhcXHUxMjRhLVxcdTEyNGRcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1YS1cXHUxMjVkXFx1MTI2MC1cXHUxMjg4XFx1MTI4YS1cXHUxMjhkXFx1MTI5MC1cXHUxMmIwXFx1MTJiMi1cXHUxMmI1XFx1MTJiOC1cXHUxMmJlXFx1MTJjMFxcdTEyYzItXFx1MTJjNVxcdTEyYzgtXFx1MTJkNlxcdTEyZDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1YVxcdTEzODAtXFx1MTM4ZlxcdTEzYTAtXFx1MTNmNFxcdTE0MDEtXFx1MTY2Y1xcdTE2NmYtXFx1MTY3ZlxcdTE2ODEtXFx1MTY5YVxcdTE2YTAtXFx1MTZlYVxcdTE2ZWUtXFx1MTZmMFxcdTE3MDAtXFx1MTcwY1xcdTE3MGUtXFx1MTcxMVxcdTE3MjAtXFx1MTczMVxcdTE3NDAtXFx1MTc1MVxcdTE3NjAtXFx1MTc2Y1xcdTE3NmUtXFx1MTc3MFxcdTE3ODAtXFx1MTdiM1xcdTE3ZDdcXHUxN2RjXFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOGE4XFx1MThhYVxcdTE4YjAtXFx1MThmNVxcdTE5MDAtXFx1MTkxY1xcdTE5NTAtXFx1MTk2ZFxcdTE5NzAtXFx1MTk3NFxcdTE5ODAtXFx1MTlhYlxcdTE5YzEtXFx1MTljN1xcdTFhMDAtXFx1MWExNlxcdTFhMjAtXFx1MWE1NFxcdTFhYTdcXHUxYjA1LVxcdTFiMzNcXHUxYjQ1LVxcdTFiNGJcXHUxYjgzLVxcdTFiYTBcXHUxYmFlXFx1MWJhZlxcdTFiYmEtXFx1MWJlNVxcdTFjMDAtXFx1MWMyM1xcdTFjNGQtXFx1MWM0ZlxcdTFjNWEtXFx1MWM3ZFxcdTFjZTktXFx1MWNlY1xcdTFjZWUtXFx1MWNmMVxcdTFjZjVcXHUxY2Y2XFx1MWQwMC1cXHUxZGJmXFx1MWUwMC1cXHUxZjE1XFx1MWYxOC1cXHUxZjFkXFx1MWYyMC1cXHUxZjQ1XFx1MWY0OC1cXHUxZjRkXFx1MWY1MC1cXHUxZjU3XFx1MWY1OVxcdTFmNWJcXHUxZjVkXFx1MWY1Zi1cXHUxZjdkXFx1MWY4MC1cXHUxZmI0XFx1MWZiNi1cXHUxZmJjXFx1MWZiZVxcdTFmYzItXFx1MWZjNFxcdTFmYzYtXFx1MWZjY1xcdTFmZDAtXFx1MWZkM1xcdTFmZDYtXFx1MWZkYlxcdTFmZTAtXFx1MWZlY1xcdTFmZjItXFx1MWZmNFxcdTFmZjYtXFx1MWZmY1xcdTIwNzFcXHUyMDdmXFx1MjA5MC1cXHUyMDljXFx1MjEwMlxcdTIxMDdcXHUyMTBhLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFkXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyYS1cXHUyMTJkXFx1MjEyZi1cXHUyMTM5XFx1MjEzYy1cXHUyMTNmXFx1MjE0NS1cXHUyMTQ5XFx1MjE0ZVxcdTIxNjAtXFx1MjE4OFxcdTJjMDAtXFx1MmMyZVxcdTJjMzAtXFx1MmM1ZVxcdTJjNjAtXFx1MmNlNFxcdTJjZWItXFx1MmNlZVxcdTJjZjJcXHUyY2YzXFx1MmQwMC1cXHUyZDI1XFx1MmQyN1xcdTJkMmRcXHUyZDMwLVxcdTJkNjdcXHUyZDZmXFx1MmQ4MC1cXHUyZDk2XFx1MmRhMC1cXHUyZGE2XFx1MmRhOC1cXHUyZGFlXFx1MmRiMC1cXHUyZGI2XFx1MmRiOC1cXHUyZGJlXFx1MmRjMC1cXHUyZGM2XFx1MmRjOC1cXHUyZGNlXFx1MmRkMC1cXHUyZGQ2XFx1MmRkOC1cXHUyZGRlXFx1MmUyZlxcdTMwMDUtXFx1MzAwN1xcdTMwMjEtXFx1MzAyOVxcdTMwMzEtXFx1MzAzNVxcdTMwMzgtXFx1MzAzY1xcdTMwNDEtXFx1MzA5NlxcdTMwOWQtXFx1MzA5ZlxcdTMwYTEtXFx1MzBmYVxcdTMwZmMtXFx1MzBmZlxcdTMxMDUtXFx1MzEyZFxcdTMxMzEtXFx1MzE4ZVxcdTMxYTAtXFx1MzFiYVxcdTMxZjAtXFx1MzFmZlxcdTM0MDAtXFx1NGRiNVxcdTRlMDAtXFx1OWZjY1xcdWEwMDAtXFx1YTQ4Y1xcdWE0ZDAtXFx1YTRmZFxcdWE1MDAtXFx1YTYwY1xcdWE2MTAtXFx1YTYxZlxcdWE2MmFcXHVhNjJiXFx1YTY0MC1cXHVhNjZlXFx1YTY3Zi1cXHVhNjk3XFx1YTZhMC1cXHVhNmVmXFx1YTcxNy1cXHVhNzFmXFx1YTcyMi1cXHVhNzg4XFx1YTc4Yi1cXHVhNzhlXFx1YTc5MC1cXHVhNzkzXFx1YTdhMC1cXHVhN2FhXFx1YTdmOC1cXHVhODAxXFx1YTgwMy1cXHVhODA1XFx1YTgwNy1cXHVhODBhXFx1YTgwYy1cXHVhODIyXFx1YTg0MC1cXHVhODczXFx1YTg4Mi1cXHVhOGIzXFx1YThmMi1cXHVhOGY3XFx1YThmYlxcdWE5MGEtXFx1YTkyNVxcdWE5MzAtXFx1YTk0NlxcdWE5NjAtXFx1YTk3Y1xcdWE5ODQtXFx1YTliMlxcdWE5Y2ZcXHVhYTAwLVxcdWFhMjhcXHVhYTQwLVxcdWFhNDJcXHVhYTQ0LVxcdWFhNGJcXHVhYTYwLVxcdWFhNzZcXHVhYTdhXFx1YWE4MC1cXHVhYWFmXFx1YWFiMVxcdWFhYjVcXHVhYWI2XFx1YWFiOS1cXHVhYWJkXFx1YWFjMFxcdWFhYzJcXHVhYWRiLVxcdWFhZGRcXHVhYWUwLVxcdWFhZWFcXHVhYWYyLVxcdWFhZjRcXHVhYjAxLVxcdWFiMDZcXHVhYjA5LVxcdWFiMGVcXHVhYjExLVxcdWFiMTZcXHVhYjIwLVxcdWFiMjZcXHVhYjI4LVxcdWFiMmVcXHVhYmMwLVxcdWFiZTJcXHVhYzAwLVxcdWQ3YTNcXHVkN2IwLVxcdWQ3YzZcXHVkN2NiLVxcdWQ3ZmJcXHVmOTAwLVxcdWZhNmRcXHVmYTcwLVxcdWZhZDlcXHVmYjAwLVxcdWZiMDZcXHVmYjEzLVxcdWZiMTdcXHVmYjFkXFx1ZmIxZi1cXHVmYjI4XFx1ZmIyYS1cXHVmYjM2XFx1ZmIzOC1cXHVmYjNjXFx1ZmIzZVxcdWZiNDBcXHVmYjQxXFx1ZmI0M1xcdWZiNDRcXHVmYjQ2LVxcdWZiYjFcXHVmYmQzLVxcdWZkM2RcXHVmZDUwLVxcdWZkOGZcXHVmZDkyLVxcdWZkYzdcXHVmZGYwLVxcdWZkZmJcXHVmZTcwLVxcdWZlNzRcXHVmZTc2LVxcdWZlZmNcXHVmZjIxLVxcdWZmM2FcXHVmZjQxLVxcdWZmNWFcXHVmZjY2LVxcdWZmYmVcXHVmZmMyLVxcdWZmYzdcXHVmZmNhLVxcdWZmY2ZcXHVmZmQyLVxcdWZmZDdcXHVmZmRhLVxcdWZmZGNdWyRBLVpcXF9hLXpcXHhhYVxceGI1XFx4YmFcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx1MDJjMVxcdTAyYzYtXFx1MDJkMVxcdTAyZTAtXFx1MDJlNFxcdTAyZWNcXHUwMmVlXFx1MDM3MC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdhLVxcdTAzN2RcXHUwMzg2XFx1MDM4OC1cXHUwMzhhXFx1MDM4Y1xcdTAzOGUtXFx1MDNhMVxcdTAzYTMtXFx1MDNmNVxcdTAzZjctXFx1MDQ4MVxcdTA0OGEtXFx1MDUyN1xcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNWQwLVxcdTA1ZWFcXHUwNWYwLVxcdTA1ZjJcXHUwNjIwLVxcdTA2NGFcXHUwNjZlXFx1MDY2ZlxcdTA2NzEtXFx1MDZkM1xcdTA2ZDVcXHUwNmU1XFx1MDZlNlxcdTA2ZWVcXHUwNmVmXFx1MDZmYS1cXHUwNmZjXFx1MDZmZlxcdTA3MTBcXHUwNzEyLVxcdTA3MmZcXHUwNzRkLVxcdTA3YTVcXHUwN2IxXFx1MDdjYS1cXHUwN2VhXFx1MDdmNFxcdTA3ZjVcXHUwN2ZhXFx1MDgwMC1cXHUwODE1XFx1MDgxYVxcdTA4MjRcXHUwODI4XFx1MDg0MC1cXHUwODU4XFx1MDhhMFxcdTA4YTItXFx1MDhhY1xcdTA5MDQtXFx1MDkzOVxcdTA5M2RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3MS1cXHUwOTc3XFx1MDk3OS1cXHUwOTdmXFx1MDk4NS1cXHUwOThjXFx1MDk4ZlxcdTA5OTBcXHUwOTkzLVxcdTA5YThcXHUwOWFhLVxcdTA5YjBcXHUwOWIyXFx1MDliNi1cXHUwOWI5XFx1MDliZFxcdTA5Y2VcXHUwOWRjXFx1MDlkZFxcdTA5ZGYtXFx1MDllMVxcdTA5ZjBcXHUwOWYxXFx1MGEwNS1cXHUwYTBhXFx1MGEwZlxcdTBhMTBcXHUwYTEzLVxcdTBhMjhcXHUwYTJhLVxcdTBhMzBcXHUwYTMyXFx1MGEzM1xcdTBhMzVcXHUwYTM2XFx1MGEzOFxcdTBhMzlcXHUwYTU5LVxcdTBhNWNcXHUwYTVlXFx1MGE3Mi1cXHUwYTc0XFx1MGE4NS1cXHUwYThkXFx1MGE4Zi1cXHUwYTkxXFx1MGE5My1cXHUwYWE4XFx1MGFhYS1cXHUwYWIwXFx1MGFiMlxcdTBhYjNcXHUwYWI1LVxcdTBhYjlcXHUwYWJkXFx1MGFkMFxcdTBhZTBcXHUwYWUxXFx1MGIwNS1cXHUwYjBjXFx1MGIwZlxcdTBiMTBcXHUwYjEzLVxcdTBiMjhcXHUwYjJhLVxcdTBiMzBcXHUwYjMyXFx1MGIzM1xcdTBiMzUtXFx1MGIzOVxcdTBiM2RcXHUwYjVjXFx1MGI1ZFxcdTBiNWYtXFx1MGI2MVxcdTBiNzFcXHUwYjgzXFx1MGI4NS1cXHUwYjhhXFx1MGI4ZS1cXHUwYjkwXFx1MGI5Mi1cXHUwYjk1XFx1MGI5OVxcdTBiOWFcXHUwYjljXFx1MGI5ZVxcdTBiOWZcXHUwYmEzXFx1MGJhNFxcdTBiYTgtXFx1MGJhYVxcdTBiYWUtXFx1MGJiOVxcdTBiZDBcXHUwYzA1LVxcdTBjMGNcXHUwYzBlLVxcdTBjMTBcXHUwYzEyLVxcdTBjMjhcXHUwYzJhLVxcdTBjMzNcXHUwYzM1LVxcdTBjMzlcXHUwYzNkXFx1MGM1OFxcdTBjNTlcXHUwYzYwXFx1MGM2MVxcdTBjODUtXFx1MGM4Y1xcdTBjOGUtXFx1MGM5MFxcdTBjOTItXFx1MGNhOFxcdTBjYWEtXFx1MGNiM1xcdTBjYjUtXFx1MGNiOVxcdTBjYmRcXHUwY2RlXFx1MGNlMFxcdTBjZTFcXHUwY2YxXFx1MGNmMlxcdTBkMDUtXFx1MGQwY1xcdTBkMGUtXFx1MGQxMFxcdTBkMTItXFx1MGQzYVxcdTBkM2RcXHUwZDRlXFx1MGQ2MFxcdTBkNjFcXHUwZDdhLVxcdTBkN2ZcXHUwZDg1LVxcdTBkOTZcXHUwZDlhLVxcdTBkYjFcXHUwZGIzLVxcdTBkYmJcXHUwZGJkXFx1MGRjMC1cXHUwZGM2XFx1MGUwMS1cXHUwZTMwXFx1MGUzMlxcdTBlMzNcXHUwZTQwLVxcdTBlNDZcXHUwZTgxXFx1MGU4MlxcdTBlODRcXHUwZTg3XFx1MGU4OFxcdTBlOGFcXHUwZThkXFx1MGU5NC1cXHUwZTk3XFx1MGU5OS1cXHUwZTlmXFx1MGVhMS1cXHUwZWEzXFx1MGVhNVxcdTBlYTdcXHUwZWFhXFx1MGVhYlxcdTBlYWQtXFx1MGViMFxcdTBlYjJcXHUwZWIzXFx1MGViZFxcdTBlYzAtXFx1MGVjNFxcdTBlYzZcXHUwZWRjLVxcdTBlZGZcXHUwZjAwXFx1MGY0MC1cXHUwZjQ3XFx1MGY0OS1cXHUwZjZjXFx1MGY4OC1cXHUwZjhjXFx1MTAwMC1cXHUxMDJhXFx1MTAzZlxcdTEwNTAtXFx1MTA1NVxcdTEwNWEtXFx1MTA1ZFxcdTEwNjFcXHUxMDY1XFx1MTA2NlxcdTEwNmUtXFx1MTA3MFxcdTEwNzUtXFx1MTA4MVxcdTEwOGVcXHUxMGEwLVxcdTEwYzVcXHUxMGM3XFx1MTBjZFxcdTEwZDAtXFx1MTBmYVxcdTEwZmMtXFx1MTI0OFxcdTEyNGEtXFx1MTI0ZFxcdTEyNTAtXFx1MTI1NlxcdTEyNThcXHUxMjVhLVxcdTEyNWRcXHUxMjYwLVxcdTEyODhcXHUxMjhhLVxcdTEyOGRcXHUxMjkwLVxcdTEyYjBcXHUxMmIyLVxcdTEyYjVcXHUxMmI4LVxcdTEyYmVcXHUxMmMwXFx1MTJjMi1cXHUxMmM1XFx1MTJjOC1cXHUxMmQ2XFx1MTJkOC1cXHUxMzEwXFx1MTMxMi1cXHUxMzE1XFx1MTMxOC1cXHUxMzVhXFx1MTM4MC1cXHUxMzhmXFx1MTNhMC1cXHUxM2Y0XFx1MTQwMS1cXHUxNjZjXFx1MTY2Zi1cXHUxNjdmXFx1MTY4MS1cXHUxNjlhXFx1MTZhMC1cXHUxNmVhXFx1MTZlZS1cXHUxNmYwXFx1MTcwMC1cXHUxNzBjXFx1MTcwZS1cXHUxNzExXFx1MTcyMC1cXHUxNzMxXFx1MTc0MC1cXHUxNzUxXFx1MTc2MC1cXHUxNzZjXFx1MTc2ZS1cXHUxNzcwXFx1MTc4MC1cXHUxN2IzXFx1MTdkN1xcdTE3ZGNcXHUxODIwLVxcdTE4NzdcXHUxODgwLVxcdTE4YThcXHUxOGFhXFx1MThiMC1cXHUxOGY1XFx1MTkwMC1cXHUxOTFjXFx1MTk1MC1cXHUxOTZkXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOWFiXFx1MTljMS1cXHUxOWM3XFx1MWEwMC1cXHUxYTE2XFx1MWEyMC1cXHUxYTU0XFx1MWFhN1xcdTFiMDUtXFx1MWIzM1xcdTFiNDUtXFx1MWI0YlxcdTFiODMtXFx1MWJhMFxcdTFiYWVcXHUxYmFmXFx1MWJiYS1cXHUxYmU1XFx1MWMwMC1cXHUxYzIzXFx1MWM0ZC1cXHUxYzRmXFx1MWM1YS1cXHUxYzdkXFx1MWNlOS1cXHUxY2VjXFx1MWNlZS1cXHUxY2YxXFx1MWNmNVxcdTFjZjZcXHUxZDAwLVxcdTFkYmZcXHUxZTAwLVxcdTFmMTVcXHUxZjE4LVxcdTFmMWRcXHUxZjIwLVxcdTFmNDVcXHUxZjQ4LVxcdTFmNGRcXHUxZjUwLVxcdTFmNTdcXHUxZjU5XFx1MWY1YlxcdTFmNWRcXHUxZjVmLVxcdTFmN2RcXHUxZjgwLVxcdTFmYjRcXHUxZmI2LVxcdTFmYmNcXHUxZmJlXFx1MWZjMi1cXHUxZmM0XFx1MWZjNi1cXHUxZmNjXFx1MWZkMC1cXHUxZmQzXFx1MWZkNi1cXHUxZmRiXFx1MWZlMC1cXHUxZmVjXFx1MWZmMi1cXHUxZmY0XFx1MWZmNi1cXHUxZmZjXFx1MjA3MVxcdTIwN2ZcXHUyMDkwLVxcdTIwOWNcXHUyMTAyXFx1MjEwN1xcdTIxMGEtXFx1MjExM1xcdTIxMTVcXHUyMTE5LVxcdTIxMWRcXHUyMTI0XFx1MjEyNlxcdTIxMjhcXHUyMTJhLVxcdTIxMmRcXHUyMTJmLVxcdTIxMzlcXHUyMTNjLVxcdTIxM2ZcXHUyMTQ1LVxcdTIxNDlcXHUyMTRlXFx1MjE2MC1cXHUyMTg4XFx1MmMwMC1cXHUyYzJlXFx1MmMzMC1cXHUyYzVlXFx1MmM2MC1cXHUyY2U0XFx1MmNlYi1cXHUyY2VlXFx1MmNmMlxcdTJjZjNcXHUyZDAwLVxcdTJkMjVcXHUyZDI3XFx1MmQyZFxcdTJkMzAtXFx1MmQ2N1xcdTJkNmZcXHUyZDgwLVxcdTJkOTZcXHUyZGEwLVxcdTJkYTZcXHUyZGE4LVxcdTJkYWVcXHUyZGIwLVxcdTJkYjZcXHUyZGI4LVxcdTJkYmVcXHUyZGMwLVxcdTJkYzZcXHUyZGM4LVxcdTJkY2VcXHUyZGQwLVxcdTJkZDZcXHUyZGQ4LVxcdTJkZGVcXHUyZTJmXFx1MzAwNS1cXHUzMDA3XFx1MzAyMS1cXHUzMDI5XFx1MzAzMS1cXHUzMDM1XFx1MzAzOC1cXHUzMDNjXFx1MzA0MS1cXHUzMDk2XFx1MzA5ZC1cXHUzMDlmXFx1MzBhMS1cXHUzMGZhXFx1MzBmYy1cXHUzMGZmXFx1MzEwNS1cXHUzMTJkXFx1MzEzMS1cXHUzMThlXFx1MzFhMC1cXHUzMWJhXFx1MzFmMC1cXHUzMWZmXFx1MzQwMC1cXHU0ZGI1XFx1NGUwMC1cXHU5ZmNjXFx1YTAwMC1cXHVhNDhjXFx1YTRkMC1cXHVhNGZkXFx1YTUwMC1cXHVhNjBjXFx1YTYxMC1cXHVhNjFmXFx1YTYyYVxcdWE2MmJcXHVhNjQwLVxcdWE2NmVcXHVhNjdmLVxcdWE2OTdcXHVhNmEwLVxcdWE2ZWZcXHVhNzE3LVxcdWE3MWZcXHVhNzIyLVxcdWE3ODhcXHVhNzhiLVxcdWE3OGVcXHVhNzkwLVxcdWE3OTNcXHVhN2EwLVxcdWE3YWFcXHVhN2Y4LVxcdWE4MDFcXHVhODAzLVxcdWE4MDVcXHVhODA3LVxcdWE4MGFcXHVhODBjLVxcdWE4MjJcXHVhODQwLVxcdWE4NzNcXHVhODgyLVxcdWE4YjNcXHVhOGYyLVxcdWE4ZjdcXHVhOGZiXFx1YTkwYS1cXHVhOTI1XFx1YTkzMC1cXHVhOTQ2XFx1YTk2MC1cXHVhOTdjXFx1YTk4NC1cXHVhOWIyXFx1YTljZlxcdWFhMDAtXFx1YWEyOFxcdWFhNDAtXFx1YWE0MlxcdWFhNDQtXFx1YWE0YlxcdWFhNjAtXFx1YWE3NlxcdWFhN2FcXHVhYTgwLVxcdWFhYWZcXHVhYWIxXFx1YWFiNVxcdWFhYjZcXHVhYWI5LVxcdWFhYmRcXHVhYWMwXFx1YWFjMlxcdWFhZGItXFx1YWFkZFxcdWFhZTAtXFx1YWFlYVxcdWFhZjItXFx1YWFmNFxcdWFiMDEtXFx1YWIwNlxcdWFiMDktXFx1YWIwZVxcdWFiMTEtXFx1YWIxNlxcdWFiMjAtXFx1YWIyNlxcdWFiMjgtXFx1YWIyZVxcdWFiYzAtXFx1YWJlMlxcdWFjMDAtXFx1ZDdhM1xcdWQ3YjAtXFx1ZDdjNlxcdWQ3Y2ItXFx1ZDdmYlxcdWY5MDAtXFx1ZmE2ZFxcdWZhNzAtXFx1ZmFkOVxcdWZiMDAtXFx1ZmIwNlxcdWZiMTMtXFx1ZmIxN1xcdWZiMWRcXHVmYjFmLVxcdWZiMjhcXHVmYjJhLVxcdWZiMzZcXHVmYjM4LVxcdWZiM2NcXHVmYjNlXFx1ZmI0MFxcdWZiNDFcXHVmYjQzXFx1ZmI0NFxcdWZiNDYtXFx1ZmJiMVxcdWZiZDMtXFx1ZmQzZFxcdWZkNTAtXFx1ZmQ4ZlxcdWZkOTItXFx1ZmRjN1xcdWZkZjAtXFx1ZmRmYlxcdWZlNzAtXFx1ZmU3NFxcdWZlNzYtXFx1ZmVmY1xcdWZmMjEtXFx1ZmYzYVxcdWZmNDEtXFx1ZmY1YVxcdWZmNjYtXFx1ZmZiZVxcdWZmYzItXFx1ZmZjN1xcdWZmY2EtXFx1ZmZjZlxcdWZmZDItXFx1ZmZkN1xcdWZmZGEtXFx1ZmZkYzAtOVxcdTAzMDAtXFx1MDM2ZlxcdTA0ODMtXFx1MDQ4N1xcdTA1OTEtXFx1MDViZFxcdTA1YmZcXHUwNWMxXFx1MDVjMlxcdTA1YzRcXHUwNWM1XFx1MDVjN1xcdTA2MTAtXFx1MDYxYVxcdTA2NGItXFx1MDY2OVxcdTA2NzBcXHUwNmQ2LVxcdTA2ZGNcXHUwNmRmLVxcdTA2ZTRcXHUwNmU3XFx1MDZlOFxcdTA2ZWEtXFx1MDZlZFxcdTA2ZjAtXFx1MDZmOVxcdTA3MTFcXHUwNzMwLVxcdTA3NGFcXHUwN2E2LVxcdTA3YjBcXHUwN2MwLVxcdTA3YzlcXHUwN2ViLVxcdTA3ZjNcXHUwODE2LVxcdTA4MTlcXHUwODFiLVxcdTA4MjNcXHUwODI1LVxcdTA4MjdcXHUwODI5LVxcdTA4MmRcXHUwODU5LVxcdTA4NWJcXHUwOGU0LVxcdTA4ZmVcXHUwOTAwLVxcdTA5MDNcXHUwOTNhLVxcdTA5M2NcXHUwOTNlLVxcdTA5NGZcXHUwOTUxLVxcdTA5NTdcXHUwOTYyXFx1MDk2M1xcdTA5NjYtXFx1MDk2ZlxcdTA5ODEtXFx1MDk4M1xcdTA5YmNcXHUwOWJlLVxcdTA5YzRcXHUwOWM3XFx1MDljOFxcdTA5Y2ItXFx1MDljZFxcdTA5ZDdcXHUwOWUyXFx1MDllM1xcdTA5ZTYtXFx1MDllZlxcdTBhMDEtXFx1MGEwM1xcdTBhM2NcXHUwYTNlLVxcdTBhNDJcXHUwYTQ3XFx1MGE0OFxcdTBhNGItXFx1MGE0ZFxcdTBhNTFcXHUwYTY2LVxcdTBhNzFcXHUwYTc1XFx1MGE4MS1cXHUwYTgzXFx1MGFiY1xcdTBhYmUtXFx1MGFjNVxcdTBhYzctXFx1MGFjOVxcdTBhY2ItXFx1MGFjZFxcdTBhZTJcXHUwYWUzXFx1MGFlNi1cXHUwYWVmXFx1MGIwMS1cXHUwYjAzXFx1MGIzY1xcdTBiM2UtXFx1MGI0NFxcdTBiNDdcXHUwYjQ4XFx1MGI0Yi1cXHUwYjRkXFx1MGI1NlxcdTBiNTdcXHUwYjYyXFx1MGI2M1xcdTBiNjYtXFx1MGI2ZlxcdTBiODJcXHUwYmJlLVxcdTBiYzJcXHUwYmM2LVxcdTBiYzhcXHUwYmNhLVxcdTBiY2RcXHUwYmQ3XFx1MGJlNi1cXHUwYmVmXFx1MGMwMS1cXHUwYzAzXFx1MGMzZS1cXHUwYzQ0XFx1MGM0Ni1cXHUwYzQ4XFx1MGM0YS1cXHUwYzRkXFx1MGM1NVxcdTBjNTZcXHUwYzYyXFx1MGM2M1xcdTBjNjYtXFx1MGM2ZlxcdTBjODJcXHUwYzgzXFx1MGNiY1xcdTBjYmUtXFx1MGNjNFxcdTBjYzYtXFx1MGNjOFxcdTBjY2EtXFx1MGNjZFxcdTBjZDVcXHUwY2Q2XFx1MGNlMlxcdTBjZTNcXHUwY2U2LVxcdTBjZWZcXHUwZDAyXFx1MGQwM1xcdTBkM2UtXFx1MGQ0NFxcdTBkNDYtXFx1MGQ0OFxcdTBkNGEtXFx1MGQ0ZFxcdTBkNTdcXHUwZDYyXFx1MGQ2M1xcdTBkNjYtXFx1MGQ2ZlxcdTBkODJcXHUwZDgzXFx1MGRjYVxcdTBkY2YtXFx1MGRkNFxcdTBkZDZcXHUwZGQ4LVxcdTBkZGZcXHUwZGYyXFx1MGRmM1xcdTBlMzFcXHUwZTM0LVxcdTBlM2FcXHUwZTQ3LVxcdTBlNGVcXHUwZTUwLVxcdTBlNTlcXHUwZWIxXFx1MGViNC1cXHUwZWI5XFx1MGViYlxcdTBlYmNcXHUwZWM4LVxcdTBlY2RcXHUwZWQwLVxcdTBlZDlcXHUwZjE4XFx1MGYxOVxcdTBmMjAtXFx1MGYyOVxcdTBmMzVcXHUwZjM3XFx1MGYzOVxcdTBmM2VcXHUwZjNmXFx1MGY3MS1cXHUwZjg0XFx1MGY4NlxcdTBmODdcXHUwZjhkLVxcdTBmOTdcXHUwZjk5LVxcdTBmYmNcXHUwZmM2XFx1MTAyYi1cXHUxMDNlXFx1MTA0MC1cXHUxMDQ5XFx1MTA1Ni1cXHUxMDU5XFx1MTA1ZS1cXHUxMDYwXFx1MTA2Mi1cXHUxMDY0XFx1MTA2Ny1cXHUxMDZkXFx1MTA3MS1cXHUxMDc0XFx1MTA4Mi1cXHUxMDhkXFx1MTA4Zi1cXHUxMDlkXFx1MTM1ZC1cXHUxMzVmXFx1MTcxMi1cXHUxNzE0XFx1MTczMi1cXHUxNzM0XFx1MTc1MlxcdTE3NTNcXHUxNzcyXFx1MTc3M1xcdTE3YjQtXFx1MTdkM1xcdTE3ZGRcXHUxN2UwLVxcdTE3ZTlcXHUxODBiLVxcdTE4MGRcXHUxODEwLVxcdTE4MTlcXHUxOGE5XFx1MTkyMC1cXHUxOTJiXFx1MTkzMC1cXHUxOTNiXFx1MTk0Ni1cXHUxOTRmXFx1MTliMC1cXHUxOWMwXFx1MTljOFxcdTE5YzlcXHUxOWQwLVxcdTE5ZDlcXHUxYTE3LVxcdTFhMWJcXHUxYTU1LVxcdTFhNWVcXHUxYTYwLVxcdTFhN2NcXHUxYTdmLVxcdTFhODlcXHUxYTkwLVxcdTFhOTlcXHUxYjAwLVxcdTFiMDRcXHUxYjM0LVxcdTFiNDRcXHUxYjUwLVxcdTFiNTlcXHUxYjZiLVxcdTFiNzNcXHUxYjgwLVxcdTFiODJcXHUxYmExLVxcdTFiYWRcXHUxYmIwLVxcdTFiYjlcXHUxYmU2LVxcdTFiZjNcXHUxYzI0LVxcdTFjMzdcXHUxYzQwLVxcdTFjNDlcXHUxYzUwLVxcdTFjNTlcXHUxY2QwLVxcdTFjZDJcXHUxY2Q0LVxcdTFjZThcXHUxY2VkXFx1MWNmMi1cXHUxY2Y0XFx1MWRjMC1cXHUxZGU2XFx1MWRmYy1cXHUxZGZmXFx1MjAwY1xcdTIwMGRcXHUyMDNmXFx1MjA0MFxcdTIwNTRcXHUyMGQwLVxcdTIwZGNcXHUyMGUxXFx1MjBlNS1cXHUyMGYwXFx1MmNlZi1cXHUyY2YxXFx1MmQ3ZlxcdTJkZTAtXFx1MmRmZlxcdTMwMmEtXFx1MzAyZlxcdTMwOTlcXHUzMDlhXFx1YTYyMC1cXHVhNjI5XFx1YTY2ZlxcdWE2NzQtXFx1YTY3ZFxcdWE2OWZcXHVhNmYwXFx1YTZmMVxcdWE4MDJcXHVhODA2XFx1YTgwYlxcdWE4MjMtXFx1YTgyN1xcdWE4ODBcXHVhODgxXFx1YThiNC1cXHVhOGM0XFx1YThkMC1cXHVhOGQ5XFx1YThlMC1cXHVhOGYxXFx1YTkwMC1cXHVhOTA5XFx1YTkyNi1cXHVhOTJkXFx1YTk0Ny1cXHVhOTUzXFx1YTk4MC1cXHVhOTgzXFx1YTliMy1cXHVhOWMwXFx1YTlkMC1cXHVhOWQ5XFx1YWEyOS1cXHVhYTM2XFx1YWE0M1xcdWFhNGNcXHVhYTRkXFx1YWE1MC1cXHVhYTU5XFx1YWE3YlxcdWFhYjBcXHVhYWIyLVxcdWFhYjRcXHVhYWI3XFx1YWFiOFxcdWFhYmVcXHVhYWJmXFx1YWFjMVxcdWFhZWItXFx1YWFlZlxcdWFhZjVcXHVhYWY2XFx1YWJlMy1cXHVhYmVhXFx1YWJlY1xcdWFiZWRcXHVhYmYwLVxcdWFiZjlcXHVmYjFlXFx1ZmUwMC1cXHVmZTBmXFx1ZmUyMC1cXHVmZTI2XFx1ZmUzM1xcdWZlMzRcXHVmZTRkLVxcdWZlNGZcXHVmZjEwLVxcdWZmMTlcXHVmZjNmXSovZ2kpO1xuICB9LFxuICBldmFsSW5Db250ZXh0OiBmdW5jdGlvbiAoanMpIHtcbiAgICBqcyA9IGpzLnJlcGxhY2UoL1xccysvZywgJycpO1xuXG5cbiAgICB2YXIga2V5cyA9IFtdLCB2YWx1ZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmtleXMoYXJndW1lbnRzW2ldKSk7XG4gICAgICBmb3IgKHZhciBqIGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgICB2YWx1ZXMucHVzaChhcmd1bWVudHNbaV1bal0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy9pZihfLmlzQ29ycmVjdFZhcmlhYmxlTmFtZShqcykgJiYga2V5cy5pbmRleE9mKGpzKSA9PT0gLTEpe1xuICAgIC8vICBrZXlzLnB1c2goanMpO1xuICAgIC8vICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgIC8vfVxuXG4gICAgdmFyIGFyciA9IHV0aWxzLmV4dHJhY3RWYXJpYWJsZXMoanMpO1xuICAgIC8vY29uc29sZS5sb2coYXJyKTtcbiAgICBmb3IgKHZhciBpIGluIGFycikge1xuICAgICAgaWYgKGtleXMuaW5kZXhPZihhcnJbaV0pID09PSAtMSkge1xuICAgICAgICBrZXlzLnB1c2goYXJyW2ldKTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAganMgPSBcInZhciBmb28gPSBmdW5jdGlvbihcIiArIGtleXMuam9pbihcIixcIikgKyBcIil7IHZhciBfX3JldHVybl9fdmFsdWUgPSBcIiArIGpzICsgXCIgO3JldHVybiBfX3JldHVybl9fdmFsdWU7fTsgZm9vO1wiO1xuICAgIHRyeSB7XG4gICAgICB2YXIgZm9vID0gZXZhbChqcyk7XG4gICAgICByZXR1cm4gZm9vLmFwcGx5KHRoaXMsIHZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgfSxcbiAgY29tcGlsZUVsZW1lbnQ6IGZ1bmN0aW9uICgkaXRlbSwgc2NvcGUpIHtcblxuICAgIGZ1bmN0aW9uIF9lYWNoU2VsZihlbCwgc2VsZWN0b3IsIGZvbykge1xuICAgICAgZWwuZmluZChzZWxlY3RvcikuZWFjaChmb28pO1xuICAgICAgaWYgKGVsLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICBmb28uY2FsbChlbFswXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8uYWRkQmFjaygnc2VsZWN0b3InKVxuICAgIF9lYWNoU2VsZigkaXRlbSwgXCJbb25jbGlja11cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9uQ2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJvbmNsaWNrXCIpO1xuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKFwib25jbGlja1wiKTtcbiAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHV0aWxzLmV2YWxJbkNvbnRleHQob25DbGljaywgc2NvcGUsIHtldmVudDogZXZlbnR9KTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gICAgX2VhY2hTZWxmKCRpdGVtLCBcIltvbmNoYW5nZV1cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9uQ2hhbmdlID0gJCh0aGlzKS5hdHRyKFwib25jaGFuZ2VcIik7XG4gICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoXCJvbmNoYW5nZVwiKTtcbiAgICAgICQodGhpcykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB1dGlscy5ldmFsSW5Db250ZXh0KG9uQ2hhbmdlLCBzY29wZSwge2V2ZW50OiBldmVudH0pO1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIF9lYWNoU2VsZigkaXRlbSwgXCJbZHAtY2hlY2tlZF1cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWwgPSAkKHRoaXMpLmF0dHIoXCJkcC1jaGVja2VkXCIpO1xuICAgICAgdmFyIHZhbCA9IHV0aWxzLmV2YWxJbkNvbnRleHQoX3ZhbCwgc2NvcGUpO1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICAkKHRoaXMpLmF0dHIoXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQXR0cihcImNoZWNrZWRcIik7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICBfZWFjaFNlbGYoJGl0ZW0sIFwiW2RwLXNyY11cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWwgPSAkKHRoaXMpLmF0dHIoXCJkcC1zcmNcIik7XG4gICAgICB2YXIgdmFsID0gdXRpbHMuZXZhbEluQ29udGV4dChfdmFsLCBzY29wZSk7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgICQodGhpcykuYXR0cihcInNyY1wiLCB2YWwpO1xuICAgICAgfVxuXG4gICAgfSk7XG4gICAgX2VhY2hTZWxmKCRpdGVtLCBcIltkcC1pZl1cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF92YWwgPSAkKHRoaXMpLmF0dHIoXCJkcC1pZlwiKTtcbiAgICAgIGlmIChfdmFsID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChfdmFsID09PSBcInRydWVcIikge1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdmFsID0gdXRpbHMuZXZhbEluQ29udGV4dChfdmFsLCBzY29wZSk7XG4gICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIF9lYWNoU2VsZigkaXRlbSwgXCJbZHAtaW5jbHVkZV1cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9lbCA9ICQodGhpcyk7XG4gICAgICB2YXIgX3ZhbCA9IF9lbC5hdHRyKFwiZHAtaW5jbHVkZVwiKTtcbiAgICAgIHZhciB2YWwgPSB1dGlscy5ldmFsSW5Db250ZXh0KF92YWwsIHNjb3BlKTtcbiAgICAgIF9lbC5sb2FkKHZhbCk7XG4gICAgfSk7XG4gIH0sXG4gIHBhcnNlVGVtcGxhdGU6IGZ1bmN0aW9uICh0cGwsIHNjb3BlKSB7XG4gICAgdmFyICRpdGVtID0gJCh0cGwuZm9ybWF0KHNjb3BlKSk7XG4gICAgXy5jb21waWxlRWxlbWVudCgkaXRlbSwgc2NvcGUpO1xuICAgIHJldHVybiAkaXRlbTtcbiAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gdXRpbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwvY29tcGlsZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbnZhciBwYXRoID0gcmVxdWlyZShcIi4vcGF0aFwiKTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBvYmplY3QgPSByZXF1aXJlKFwiLi9vYmplY3RcIik7XG5cbmZ1bmN0aW9uIGlzU2VydmVyKCkge1xuICByZXR1cm4gISAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpO1xufVxuXG5cbmlmIChpc1NlcnZlcigpKSB7XG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG59XG5cblxuZnVuY3Rpb24gX2xvYWRfanNvbiAodmFsdWUsIGNhbGxiYWNrX3N1Y2Nlc3MsIGNhbGxiYWNrX2Vycm9yKXtcblxuICB2YXIgb3V0cHV0ID0gbnVsbDtcbiAgdmFyIGVycm9ycyA9IFtdO1xuXG4gIGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpIHtcblxuICAgIHZhciBmaWxlbmFtZSwgcmVnZXhfZGF0YSwgaW5pdF9wcm9wZXJ0eTtcbiAgICByZWdleF9kYXRhID0gL14oW14jXSopIz8oLiopJC8uZXhlYyh2YWx1ZSk7XG5cbiAgICBmaWxlbmFtZSA9IHJlZ2V4X2RhdGFbMV07XG4gICAgaW5pdF9wcm9wZXJ0eSA9IHJlZ2V4X2RhdGFbMl07XG4gICAgdXRpbHMuZ2V0SW5saW5lSnNvbihmaWxlbmFtZSwgXCJqc29uXCIsIF9sb2FkSnNvbl9kYXRhLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIGlmIChjYWxsYmFja19lcnJvcikge1xuICAgICAgICBjYWxsYmFja19lcnJvcihlcnJvcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJmaWxlOiBcXFwiXCIgKyBmaWxlbmFtZSArIFwiXFxcIi4gXCIgKyBlcnJvci5tZXNzYWdlKVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIF9sb2FkSnNvbl9kYXRhKHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9sb2FkSnNvbl9kYXRhKGRhdGEpIHtcbiAgICAvKlxuICAgICDQt9Cw0LzQtdC90LAg0LfQsNC/0LjRgdC10LkgXCJ1cmwoLi9wYXRoL3RvL2ZpbGUpICDQvdCwIFwiLi4vLi4vcGF0aC90by9maWxlXCJcbiAgICAgdXJsINC90LDRh9C40L3QsNGO0YnQuNC10YHRjyDRgSAuLyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0YDQvtC00LjRgtC10LvRjNC60L7Qs9C+IGpzb24g0YTQsNC50LvQsFxuXG4gICAgIHVybCDRgSBcIi9cIiDQtNC+0LHQsNCy0LvRj9C10YLRgdGPIEFQUF9TVEFUSUNfUEFUSFxuICAgICAqL1xuICAgIHV0aWxzLnJlY291cnNpdmUoZGF0YSxcbiAgICAgIGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUsIHBhcmVudCkge1xuICAgICAgICBpZiAoL151cmxcXCguKlxcKSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgdmFyIHJlZ2V4X2RhdGEgPSAvXnVybFxcKChcXC4/XFwvKT8oLiopXFwpJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgdmFyIHVybCA9IHJlZ2V4X2RhdGFbMl07XG5cbiAgICAgICAgICBpZiAocmVnZXhfZGF0YVsxXSA9PSBcIi9cIikge1xuICAgICAgICAgICAgdXJsID0gd2luZG93LkFQUF9TVEFUSUNfUEFUSCArIHVybDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlZ2V4X2RhdGFbMV0gPT0gXCIuL1wiKSB7XG4gICAgICAgICAgICB1cmwgPSBwYXRoLmdldFBhcmVudERpcmVjdG9yeVVybChmaWxlbmFtZSkgKyB1cmw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGFyZW50W3Byb3BlcnR5XSA9IHBhdGgucmVzb2x2ZSh1cmwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuXG4gICAgdmFyIGxvYWRlciA9IHV0aWwucXVldWVMb2FkKDEsIGZ1bmN0aW9uIGZpbmFsaXplKCkge1xuXG4gICAgICBpZiAoaW5pdF9wcm9wZXJ0eSkge1xuICAgICAgICB2YXIgcHJvcF9hcnIgPSBpbml0X3Byb3BlcnR5LnNwbGl0KFwiL1wiKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wX2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRhdGEgPSBkYXRhW3Byb3BfYXJyW2ldXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICBpZiAoY2FsbGJhY2tfZXJyb3IpIGNhbGxiYWNrX2Vycm9yKGVycm9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2FsbGJhY2tfc3VjY2VzcykgY2FsbGJhY2tfc3VjY2VzcyhkYXRhKTtcbiAgICAgICAgb3V0cHV0ID0gZGF0YTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBjb21tZW50c1xuICAgICAqL1xuICAgIHV0aWxzLnJlY291cnNpdmUoZGF0YSwgZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSwgcGFyZW50KSB7XG4gICAgICAvKlxuICAgICAgIHJlbW92ZSBjb21tZW50cyBsaWtlXG4gICAgICAgW1wiQGNvbW1lbnQoKVwiXVxuICAgICAgIFwiQGNvbW1lbnRcIjoge31cbiAgICAgICAqL1xuICAgICAgaWYgKC9eXFwvXFwvLiokLy50ZXN0KHZhbHVlKSB8fCAvXkBjb21tZW50XFwoLipcXCkkLy50ZXN0KHZhbHVlKSB8fCBwcm9wZXJ0eSA9PSBcIkBjb21tZW50XCIpIHtcbiAgICAgICAgaWYgKHBhcmVudC5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xuICAgICAgICAgIHBhcmVudC5zcGxpY2UocHJvcGVydHksIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBwYXJlbnRbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKC9eQGV4dGVuZC4qJC8udGVzdChwcm9wZXJ0eSkpIHtcblxuICAgICAgICBsb2FkZXIudG90YWwrKztcbiAgICAgICAgX2xvYWRfanNvbih2YWx1ZSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB2YXIgZXh0X2RhdGEgPSBvYmplY3QuZGVlcEV4dGVuZChkYXRhLCBwYXJlbnQpO1xuICAgICAgICAgIG9iamVjdC5kZWVwRXh0ZW5kKHBhcmVudCwgZXh0X2RhdGEpO1xuICAgICAgICAgIGRlbGV0ZSBwYXJlbnRbXCJAZXh0ZW5kXCJdO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSwgZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgbG9hZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICgvXkBleHRlbmRcXCguKlxcKSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhciBfcmVnX2RhdGEgPSAvXkBleHRlbmRcXCgoXFwuXFwvKT8oLiopXFwpJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgIHZhciB1cmwgPSBfcmVnX2RhdGFbMl07XG4gICAgICAgIGlmIChfcmVnX2RhdGFbMV0pIHtcbiAgICAgICAgICB1cmwgPSBwYXRoLmdldFBhcmVudERpcmVjdG9yeVVybChmaWxlbmFtZSkgKyB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZGVyLnRvdGFsKys7XG4gICAgICAgIF9sb2FkX2pzb24odXJsLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHBhcmVudFtwcm9wZXJ0eV0gPSBkYXRhO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSwgZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgbG9hZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICgvXkBtaXhpblxcKC4qXFwpJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIF9yZWdfZGF0YSA9IC9eQG1peGluXFwoKFxcLlxcLyk/KC4qKVxcKSQvLmV4ZWModmFsdWUpO1xuICAgICAgICB2YXIgdXJsID0gX3JlZ19kYXRhWzJdO1xuICAgICAgICBpZiAoX3JlZ19kYXRhWzFdKSB7XG4gICAgICAgICAgdXJsID0gcGF0aC5nZXRQYXJlbnREaXJlY3RvcnlVcmwoZmlsZW5hbWUpICsgdXJsO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlci50b3RhbCsrO1xuICAgICAgICBfbG9hZF9qc29uKHVybCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBpZiAocGFyZW50LmNvbnN0cnVjdG9yID09IEFycmF5KSB7XG4gICAgICAgICAgICBwYXJlbnQuc3BsaWNlKHByb3BlcnR5LCAxKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICBwYXJlbnQucHVzaChkYXRhW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgcGFyZW50W3Byb3BlcnR5XTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICBwYXJlbnRbaV0gPSBkYXRhW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEsIGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoL15AbG9hZFxcKCguKilcXCkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YXIgX3JlZ19kYXRhID0gL15AbG9hZFxcKChcXC4/XFwvKT8oLiopXFwpJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgIHZhciB1cmwgPSBfcmVnX2RhdGFbMl07XG4gICAgICAgIGlmIChfcmVnX2RhdGFbMV0gPT0gXCIvXCIpIHtcbiAgICAgICAgICB1cmwgPSB3aW5kb3cuQVBQX1NUQVRJQ19QQVRIICsgdXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfcmVnX2RhdGFbMV0gPT0gXCIuL1wiKSB7XG4gICAgICAgICAgdXJsID0gcGF0aC5nZXRQYXJlbnREaXJlY3RvcnlVcmwoZmlsZW5hbWUpICsgdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGVyLnRvdGFsKys7XG4gICAgICAgIHV0aWxzLmdldElubGluZUpzb24odXJsLCBcImh0bWxcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBwYXJlbnRbcHJvcGVydHldID0gZGF0YTtcbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEsIGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuICAgIGxvYWRlcigpO1xuXG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG52YXIgdXRpbHMgPSB7XG4gIENBQ0hFRF9KU09OIDoge30sXG4gIGxvYWRKc29uU3luYzogZnVuY3Rpb24oc3JjKXtcbiAgICB2YXIgZGF0YTtcbiAgICBfbG9hZF9qc29uKHNyYyxmdW5jdGlvbihfZGF0YSl7XG4gICAgICBkYXRhID0gX2RhdGE7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sXG5cbiAgLyoqXG4gICDQv9C+0LfQstC+0LvRj9C10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC60L7QvdGB0YLRgNGD0LrRhtC40Lgg0LLQuNC00LBcbiAgINGA0LDRgdGI0LjRgNC40YLRjCDQtNCw0L3QvdGL0LUg0LjQtyDRhNCw0LnQu9CwIHRlbXBsYXRlLmpzb25cbiAgIFwiQGV4dGVuZFwiIDogXCJ1cmwoZGF0YS90ZW1wbGF0ZS5qc29uKVwiLFxuICAgXCJAZXh0ZW5kXCIgOiBcInVybChkYXRhL3RlbXBsYXRlLmpzb24jc2V0dGluZ3Mvc3RhZ2VzKVwiLFxuXG4gICAvL9C30LDQvNC10L3QuNGC0Ywg0YHRgtGA0L7QutGDINC90LDQtNCw0L3QvdGL0LUg0LjQtyDRhNCw0LnQu9CwXG4gICBcInN0YWdlc1wiOiAgICAgICBcInVybChkYXRhL3RlbXBsYXRlLmpzb24jc2V0dGluZ3Mvc3RhZ2VzKVwiLFxuXG4gICAqIEBwYXJhbSBmaWxlbmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tfc3VjY2Vzc1xuICAgKiBAcGFyYW0gY2FsbGJhY2tfZXJyb3JcbiAgICovXG4gIGxvYWRKc29uOiBmdW5jdGlvbiAodmFsdWUscmVzb2x2ZV9jYixmYWlsX2NiKSB7XG4gICAgICByZXR1cm4gX2xvYWRfanNvbih2YWx1ZSxmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgcmVzb2x2ZV9jYiAmJiByZXNvbHZlX2NiKGRhdGEpO1xuICAgICAgfSxmdW5jdGlvbihlcnIpe1xuICAgICAgICBmYWlsX2NiICYmIGZhaWxfY2IoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIHJlbW92ZUNvbW1lbnRzOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL15cXHMqKFxcL1xcLy4qfCg/OlxcL1xcKltcXHNcXFNdKj8pXFwqXFwvXFxzKikkL2dtLFwiXCIpO1xuICAgIHJldHVybiBzdHI7XG4gIH0sXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBjcml0ZXJpYSAtINCy0YvQv9C+0LvQvdGP0YLRjCDRhNGD0L3QutGG0LjRjiDRgdC+INCy0YHQtdC80Lgg0L7QsdGK0LXQutGC0LDQvNC4XG4gICAqL1xuICByZWNvdXJzaXZlOiBmdW5jdGlvbiAob2JqZWN0LCBjcml0ZXJpYSkge1xuICAgIHZhciByZWFkZWQgPSBbXTtcbiAgICBpZiAoIW9iamVjdCkgcmV0dXJuO1xuICAgIHJldHVybiAoZnVuY3Rpb24gc3ViX3JlY291cnNpdmUob2JqZWN0KSB7XG4gICAgICBpZiAocmVhZGVkLmluZGV4T2Yob2JqZWN0KSAhPSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZWFkZWQucHVzaChvYmplY3QpO1xuXG5cbiAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKHZhciBwcm9wID0gb2JqZWN0Lmxlbmd0aDsgcHJvcC0tOykge1xuICAgICAgICAgIGlmIChvYmplY3RbcHJvcF0gJiYgKG9iamVjdFtwcm9wXS5jb25zdHJ1Y3RvciA9PSBPYmplY3QgfHwgb2JqZWN0W3Byb3BdLmNvbnN0cnVjdG9yID09IEFycmF5KSkge1xuICAgICAgICAgICAgc3ViX3JlY291cnNpdmUob2JqZWN0W3Byb3BdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJyZWFrXyA9IGNyaXRlcmlhKHByb3AsIG9iamVjdFtwcm9wXSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgaWYgKG9iamVjdFtwcm9wXSAmJiAob2JqZWN0W3Byb3BdLmNvbnN0cnVjdG9yID09IE9iamVjdCB8fCBvYmplY3RbcHJvcF0uY29uc3RydWN0b3IgPT0gQXJyYXkpKSB7XG4gICAgICAgICAgICBzdWJfcmVjb3Vyc2l2ZShvYmplY3RbcHJvcF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYnJlYWtfID0gY3JpdGVyaWEocHJvcCwgb2JqZWN0W3Byb3BdLCBvYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKG9iamVjdCk7XG4gIH0sXG5cbiAgcGFyc2VDU1Y6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHJvd3MgPSBkYXRhLnNwbGl0KC9cXG4vKTtcbiAgICB2YXIgY29sdW1ucyA9IHJvd3NbMF0uc3BsaXQoJywnKTtcbiAgICByb3dzLnNwbGljZSgwLCAxKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG91dHB1dF9yb3dfZGF0YSA9IHt9O1xuICAgICAgdmFyIHJvd19kYXRhID0gW107XG5cblxuICAgICAgdmFyIF9xdW90ZSA9IGZhbHNlLCBsYXN0ID0gLTE7XG4gICAgICB2YXIgaiA9IC0xO1xuICAgICAgdmFyIHN0ciA9IHJvd3NbaV07XG4gICAgICB3aGlsZSAoKytqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIV9xdW90ZSkge1xuICAgICAgICAgIGlmIChzdHJbal0gPT0gJ1xcJycgfHwgc3RyW2pdID09ICdcXFwiJykge1xuICAgICAgICAgICAgX3F1b3RlID0gc3RyW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RyW2pdID09IFwiLFwiKSB7XG4gICAgICAgICAgICB2YXIgX3ZhbCA9IHN0ci5zdWJzdHJpbmcobGFzdCwgaik7XG4gICAgICAgICAgICBpZiAoX3ZhbFswXSA9PSAnXFxcIicgJiYgX3ZhbFtfdmFsLmxlbmd0aCAtIDFdID09ICdcXFwiJykge1xuICAgICAgICAgICAgICBfdmFsID0gX3ZhbC5zdWJzdHJpbmcoMSwgX3ZhbC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvd19kYXRhLnB1c2goX3ZhbCk7XG4gICAgICAgICAgICBsYXN0ID0gaiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzdHJbal0gPT0gX3F1b3RlKSB7XG4gICAgICAgICAgICBfcXVvdGUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaiBpbiByb3dfZGF0YSkge1xuICAgICAgICBvdXRwdXRfcm93X2RhdGFbY29sdW1uc1tqXV0gPSByb3dfZGF0YVtqXTtcbiAgICAgIH1cbiAgICAgIHJvd3NbaV0gPSBvdXRwdXRfcm93X2RhdGE7XG4gICAgfVxuICAgIHJldHVybiByb3dzO1xuICB9LFxuICBwYXJzZURhdGE6IGZ1bmN0aW9uIChkYXRhLCBkYXRhVHlwZSkge1xuICAgIHZhciBfcGFyc2VkO1xuICAgIGlmIChkYXRhVHlwZSA9PSBcImNzdlwiKSB7XG4gICAgICBfcGFyc2VkID0gdXRpbHMucGFyc2VDU1YoZGF0YSk7XG4gICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PSBcImpzb25cIikge1xuICAgICAgX3BhcnNlZCA9IGRhdGEudHJpbSgpO1xuICAgICAgLy9pZiAoZGF0YVswXSAhPSBcIntcIiAmJiBkYXRhWzBdICE9IFwiW1wiKSB7XG4gICAgICAvLyAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy99XG5cbiAgICAgIF9wYXJzZWQgPSB1dGlscy5yZW1vdmVDb21tZW50cyhfcGFyc2VkKTtcbiAgICAgIC8vZGF0YSAgPSBkYXRhLnJlcGxhY2UoL1xcbi9nLFwiXCIpXG5cbiAgICAgIHRyeXtcbiAgICAgICAgdmFyIF9wYXJzZWQgPSBKU09OLnBhcnNlKF9wYXJzZWQpOy8vPSBKU09OLnBhcnNlKGRhdGEucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3xcXC9cXC8uKi9nLFwiXCIpKTtcbiAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICBtZXNzYWdlOiBlLnRvU3RyaW5nKCksXG4gICAgICAgICAgZGF0YTogIGRhdGFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vdmFyIHNjcmlwdCA9ICQoXCI8c2NyaXB0IHR5cGU9J3RleHQvanNvbicgaWQ9J1wiICsgdXJsICsgXCInPlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyBcIjwvc2NyaXB0PlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICBkYXRhOiBfcGFyc2VkXG4gICAgfTtcbiAgfSxcbiAgbG9hZDogZnVuY3Rpb24gKHVybCwgZGF0YVR5cGUsIGNhbGxiYWNrX3N1Y2Nlc3MsIGNhbGxiYWNrX2Vycm9yKSB7XG4gICAgLy90b2RvXG4gICAgaWYgKGlzU2VydmVyKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHVybCwgJ3V0ZjgnKTtcbiAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxcdUZFRkYvLCAnJyk7XG4gICAgICAgIHZhciBfcGFyc2VkID0gdXRpbHMucGFyc2VEYXRhKGRhdGEsIGRhdGFUeXBlKTtcbiAgICAgICAgaWYoX3BhcnNlZC5zdGF0dXMgPT0gXCJlcnJvclwiKXtcbiAgICAgICAgICBjYWxsYmFja19lcnJvcih7XG4gICAgICAgICAgICBzdGF0dXM6ICAgXCJlcnJvclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogIF9wYXJzZWQubWVzc2FnZSxcbiAgICAgICAgICAgIGRhdGE6ICAgICBfcGFyc2VkLmRhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2tfc3VjY2VzcyhfcGFyc2VkLmRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIGlmIChlLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZpbGUgbm90IGZvdW5kIScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2tfZXJyb3IoZGF0YSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdmFyIF9wYXJzZWQgPSB1dGlscy5wYXJzZURhdGEoZGF0YSwgZGF0YVR5cGUpO1xuICAgICAgICAgICAgaWYoX3BhcnNlZC5zdGF0dXMgPT0gXCJlcnJvclwiKXtcbiAgICAgICAgICAgICAgY2FsbGJhY2tfZXJyb3Ioe1xuICAgICAgICAgICAgICAgIHN0YXR1czogaHR0cFJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICBfcGFyc2VkLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2tfc3VjY2VzcyhfcGFyc2VkLmRhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFja19lcnJvcih1cmwsIGh0dHBSZXF1ZXN0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICBodHRwUmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICog0J/QvtC30LLQvtC70Y/QtdGC0LfQsNCz0YDRg9C20LDRgtGMIGpzb24g0YTQsNC50LvRiyAsINGB0L7QtNC10YDQttCw0YnQuNC1INGB0YHRi9C70LrQuCDQvdCwINC00YDRg9Cz0LjQtSBqc29uINGE0LDQudC70YsuXG4gICAqINCy0LzQtdGB0YLQviDRgdGB0YvQu9C+0Log0YLQuNC/0LBcbiAgICogIFwicHJvcGVydHlcIiA6IFwidXJsKGNodW5rLmpzb24pXCJcbiAgICogINCx0YPQtNC10YIg0LfQsNCz0YDRg9C20LXQvdC+INGB0L7QtNC10YDQttC40LzQvtC1INGE0LDQudC70LBcbiAgICogIFwicHJvcGVydHlcIiA6IHsuLi59XG4gICAqXG4gICAqICDQtdGB0LvQuCDRg9C60LDQt9Cw0YLRjCDRj9C60L7RgNGMXG4gICAqICBcInByb3BlcnR5XCIgOiBcInVybChjaHVuay5qc29uI3NldHRpbmdzL2NodW5rLzAvdGV4dClcIlxuICAgKlxuICAgKiDRgtC+INCx0YPQtNC10YIg0LfQsNCz0YDRg9C20LXQvdC+INGB0L7QtNC10YDQttC40LzQvtC1INC/0L7Qu9GPIHNldHRpbmdzLmNodW5rWzBdLnRleHQg0LjQtyDRhNCw0LnQu9CwIGNodW5rLmpzb25cbiAgICpcbiAgICpcbiAgICogQHBhcmFtIGZpbGVuYW1lICDQv9GD0YLRjCDQuiDQvtGB0L3QvtCy0L3QvtC80YMganNvbiDRhNCw0LnQu9GDXG4gICAqIEBwYXJhbSBjYWxsYmFjayAg0LHRg9C00LXRgiDQstGL0LfQstCw0L0g0L/QvtGB0LvQtSDQvtC60L7QvdGH0LDQvdC40Y8g0LfQsNCz0YDRg9C30LrQuCDQstGB0LXRhSDRhNCw0LnQu9C+0LJcbiAgICovXG4gIGdldElubGluZUpzb246IGZ1bmN0aW9uICh1cmwsIGRhdGFUeXBlLCBjYWxsYmFja19zdWNjZXNzLCBjYWxsYmFja19lcnJvcikge1xuXG4gICAgaWYgKGRhdGFUeXBlLmNvbnN0cnVjdG9yICE9IFN0cmluZykge1xuICAgICAgY2FsbGJhY2tfZXJyb3IgPSBjYWxsYmFja19zdWNjZXNzO1xuICAgICAgY2FsbGJhY2tfc3VjY2VzcyA9IGRhdGFUeXBlO1xuICAgICAgZGF0YVR5cGUgPSBcImpzb25cIjtcbiAgICB9XG5cblxuICAgIGlmICh0eXBlb2YgdXRpbHMuQ0FDSEVEX0pTT04gIT09IFwidW5kZWZpbmVkXCIgJiYgdXRpbHMuQ0FDSEVEX0pTT04gJiYgdXRpbHMuQ0FDSEVEX0pTT05bdXJsXSkge1xuICAgICAgY2FsbGJhY2tfc3VjY2Vzcyh1dGlscy5DQUNIRURfSlNPTlt1cmxdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAkICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhciBpbmxpbmUgPSAkKFwic2NyaXB0W2lkPSdcIiArIHVybCArIFwiJ11cIik7XG4gICAgICAgIGlmIChpbmxpbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBfZGF0YSA9XG4gICAgICAgICAgICBpbmxpbmVbMF0uaW5uZXJUZXh0IHx8IC8vYWxsXG4gICAgICAgICAgICBpbmxpbmVbMF0udGV4dENvbnRlbnQgfHwgLy9maXJlZm94XG4gICAgICAgICAgICBpbmxpbmVbMF0udGV4dDsgLy9pZThcbiAgICAgICAgICBpZiAoZGF0YVR5cGUgPT0gXCJqc29uXCIpIHtcblxuICAgICAgICAgICAgdmFyIF9kYXRhID0gdXRpbHMucmVtb3ZlQ29tbWVudHMoX2RhdGEpO1xuICAgICAgICAgICAgY2FsbGJhY2tfc3VjY2VzcyhKU09OLnBhcnNlKF9kYXRhKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrX3N1Y2Nlc3MoX2RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdXRpbHMubG9hZCh1cmwsIGRhdGFUeXBlLCBjYWxsYmFja19zdWNjZXNzLCBjYWxsYmFja19lcnJvcik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwvZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAodHlwZW9mIF8gPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICBfID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XG4gIG1vZHVsZS5leHBvcnRzID0gXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgbG9hZFNjcmlwdDogZnVuY3Rpb24gKHJlcXVpcmVtZW50LCBoZWxwZXIsIGVycm9yKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5vbmVycm9yID0gZXJyb3I7XG4gICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBoZWxwZXIoc2NyaXB0LCBfX3NyYyk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaGVscGVyLCB0cnVlKTtcbiAgICBzY3JpcHQuc3JjID0gcmVxdWlyZW1lbnQ7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9LFxuICBzY3JpcHRVUkw6IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG4gICAgfVxuICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIGZvciAodmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7IGktLTspIHtcbiAgICAgIGlmIChzY3JpcHRzW2ldLnNyYykge1xuICAgICAgICByZXR1cm4gc2NyaXB0c1tpXS5zcmM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC9sb2FkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCJQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpZFhSbUxUZ2lQejQ4YzNabklIZHBaSFJvUFNjeE9EaHdlQ2NnYUdWcFoyaDBQU2N4T0Rod2VDY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjJhV1YzUW05NFBTSXdJREFnTVRBd0lERXdNQ0lnY0hKbGMyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRaUlHTnNZWE56UFNKMWFXd3RjM0JwYmlJK1BISmxZM1FnZUQwaU1DSWdlVDBpTUNJZ2QybGtkR2c5SWpFd01DSWdhR1ZwWjJoMFBTSXhNREFpSUdacGJHdzlJbTV2Ym1VaUlHTnNZWE56UFNKaWF5SStQQzl5WldOMFBqeG5JSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RVd0lEVXdLU0krUEdjZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb01Da2dkSEpoYm5Oc1lYUmxLRE0wSURBcElqNDhZMmx5WTJ4bElHTjRQU0l3SWlCamVUMGlNQ0lnY2owaU9DSWdabWxzYkQwaUkyTm1abVprWmlJK1BHRnVhVzFoZEdVZ1lYUjBjbWxpZFhSbFRtRnRaVDBpYjNCaFkybDBlU0lnWm5KdmJUMGlNU0lnZEc4OUlqQXVNU0lnWW1WbmFXNDlJakJ6SWlCa2RYSTlJakZ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0krUEM5aGJtbHRZWFJsUGp4aGJtbHRZWFJsVkhKaGJuTm1iM0p0SUdGMGRISnBZblYwWlU1aGJXVTlJblJ5WVc1elptOXliU0lnZEhsd1pUMGljMk5oYkdVaUlHWnliMjA5SWpFdU5TSWdkRzg5SWpFaUlHSmxaMmx1UFNJd2N5SWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaVBqd3ZZVzVwYldGMFpWUnlZVzV6Wm05eWJUNDhMMk5wY21Oc1pUNDhMMmMrUEdjZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb05EVXBJSFJ5WVc1emJHRjBaU2d6TkNBd0tTSStQR05wY21Oc1pTQmplRDBpTUNJZ1kzazlJakFpSUhJOUlqZ2lJR1pwYkd3OUlpTmpabVptWkdZaVBqeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SW05d1lXTnBkSGtpSUdaeWIyMDlJakVpSUhSdlBTSXdMakVpSUdKbFoybHVQU0l3TGpFeWN5SWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaVBqd3ZZVzVwYldGMFpUNDhZVzVwYldGMFpWUnlZVzV6Wm05eWJTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKMGNtRnVjMlp2Y20waUlIUjVjR1U5SW5OallXeGxJaUJtY205dFBTSXhMalVpSUhSdlBTSXhJaUJpWldkcGJqMGlNQzR4TW5NaUlHUjFjajBpTVhNaUlISmxjR1ZoZEVOdmRXNTBQU0pwYm1SbFptbHVhWFJsSWo0OEwyRnVhVzFoZEdWVWNtRnVjMlp2Y20wK1BDOWphWEpqYkdVK1BDOW5QanhuSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0Rrd0tTQjBjbUZ1YzJ4aGRHVW9NelFnTUNraVBqeGphWEpqYkdVZ1kzZzlJakFpSUdONVBTSXdJaUJ5UFNJNElpQm1hV3hzUFNJalkyWm1abVJtSWo0OFlXNXBiV0YwWlNCaGRIUnlhV0oxZEdWT1lXMWxQU0p2Y0dGamFYUjVJaUJtY205dFBTSXhJaUIwYnowaU1DNHhJaUJpWldkcGJqMGlNQzR5TlhNaUlHUjFjajBpTVhNaUlISmxjR1ZoZEVOdmRXNTBQU0pwYm1SbFptbHVhWFJsSWo0OEwyRnVhVzFoZEdVK1BHRnVhVzFoZEdWVWNtRnVjMlp2Y20wZ1lYUjBjbWxpZFhSbFRtRnRaVDBpZEhKaGJuTm1iM0p0SWlCMGVYQmxQU0p6WTJGc1pTSWdabkp2YlQwaU1TNDFJaUIwYnowaU1TSWdZbVZuYVc0OUlqQXVNalZ6SWlCa2RYSTlJakZ6SWlCeVpYQmxZWFJEYjNWdWREMGlhVzVrWldacGJtbDBaU0krUEM5aGJtbHRZWFJsVkhKaGJuTm1iM0p0UGp3dlkybHlZMnhsUGp3dlp6NDhaeUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d4TXpVcElIUnlZVzV6YkdGMFpTZ3pOQ0F3S1NJK1BHTnBjbU5zWlNCamVEMGlNQ0lnWTNrOUlqQWlJSEk5SWpnaUlHWnBiR3c5SWlOalptWm1aR1lpUGp4aGJtbHRZWFJsSUdGMGRISnBZblYwWlU1aGJXVTlJbTl3WVdOcGRIa2lJR1p5YjIwOUlqRWlJSFJ2UFNJd0xqRWlJR0psWjJsdVBTSXdMak0zY3lJZ1pIVnlQU0l4Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpUGp3dllXNXBiV0YwWlQ0OFlXNXBiV0YwWlZSeVlXNXpabTl5YlNCaGRIUnlhV0oxZEdWT1lXMWxQU0owY21GdWMyWnZjbTBpSUhSNWNHVTlJbk5qWVd4bElpQm1jbTl0UFNJeExqVWlJSFJ2UFNJeElpQmlaV2RwYmowaU1DNHpOM01pSUdSMWNqMGlNWE1pSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJajQ4TDJGdWFXMWhkR1ZVY21GdWMyWnZjbTArUEM5amFYSmpiR1UrUEM5blBqeG5JSFJ5WVc1elptOXliVDBpY205MFlYUmxLREU0TUNrZ2RISmhibk5zWVhSbEtETTBJREFwSWo0OFkybHlZMnhsSUdONFBTSXdJaUJqZVQwaU1DSWdjajBpT0NJZ1ptbHNiRDBpSTJObVptWmtaaUkrUEdGdWFXMWhkR1VnWVhSMGNtbGlkWFJsVG1GdFpUMGliM0JoWTJsMGVTSWdabkp2YlQwaU1TSWdkRzg5SWpBdU1TSWdZbVZuYVc0OUlqQXVOWE1pSUdSMWNqMGlNWE1pSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJajQ4TDJGdWFXMWhkR1UrUEdGdWFXMWhkR1ZVY21GdWMyWnZjbTBnWVhSMGNtbGlkWFJsVG1GdFpUMGlkSEpoYm5ObWIzSnRJaUIwZVhCbFBTSnpZMkZzWlNJZ1puSnZiVDBpTVM0MUlpQjBiejBpTVNJZ1ltVm5hVzQ5SWpBdU5YTWlJR1IxY2owaU1YTWlJSEpsY0dWaGRFTnZkVzUwUFNKcGJtUmxabWx1YVhSbElqNDhMMkZ1YVcxaGRHVlVjbUZ1YzJadmNtMCtQQzlqYVhKamJHVStQQzluUGp4bklIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtESXlOU2tnZEhKaGJuTnNZWFJsS0RNMElEQXBJajQ4WTJseVkyeGxJR040UFNJd0lpQmplVDBpTUNJZ2NqMGlPQ0lnWm1sc2JEMGlJMk5tWm1aa1ppSStQR0Z1YVcxaGRHVWdZWFIwY21saWRYUmxUbUZ0WlQwaWIzQmhZMmwwZVNJZ1puSnZiVDBpTVNJZ2RHODlJakF1TVNJZ1ltVm5hVzQ5SWpBdU5qSnpJaUJrZFhJOUlqRnpJaUJ5WlhCbFlYUkRiM1Z1ZEQwaWFXNWtaV1pwYm1sMFpTSStQQzloYm1sdFlYUmxQanhoYm1sdFlYUmxWSEpoYm5ObWIzSnRJR0YwZEhKcFluVjBaVTVoYldVOUluUnlZVzV6Wm05eWJTSWdkSGx3WlQwaWMyTmhiR1VpSUdaeWIyMDlJakV1TlNJZ2RHODlJakVpSUdKbFoybHVQU0l3TGpZeWN5SWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaVBqd3ZZVzVwYldGMFpWUnlZVzV6Wm05eWJUNDhMMk5wY21Oc1pUNDhMMmMrUEdjZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb01qY3dLU0IwY21GdWMyeGhkR1VvTXpRZ01Da2lQanhqYVhKamJHVWdZM2c5SWpBaUlHTjVQU0l3SWlCeVBTSTRJaUJtYVd4c1BTSWpZMlptWm1SbUlqNDhZVzVwYldGMFpTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKdmNHRmphWFI1SWlCbWNtOXRQU0l4SWlCMGJ6MGlNQzR4SWlCaVpXZHBiajBpTUM0M05YTWlJR1IxY2owaU1YTWlJSEpsY0dWaGRFTnZkVzUwUFNKcGJtUmxabWx1YVhSbElqNDhMMkZ1YVcxaGRHVStQR0Z1YVcxaGRHVlVjbUZ1YzJadmNtMGdZWFIwY21saWRYUmxUbUZ0WlQwaWRISmhibk5tYjNKdElpQjBlWEJsUFNKelkyRnNaU0lnWm5KdmJUMGlNUzQxSWlCMGJ6MGlNU0lnWW1WbmFXNDlJakF1TnpWeklpQmtkWEk5SWpGeklpQnlaWEJsWVhSRGIzVnVkRDBpYVc1a1pXWnBibWwwWlNJK1BDOWhibWx0WVhSbFZISmhibk5tYjNKdFBqd3ZZMmx5WTJ4bFBqd3ZaejQ4WnlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnek1UVXBJSFJ5WVc1emJHRjBaU2d6TkNBd0tTSStQR05wY21Oc1pTQmplRDBpTUNJZ1kzazlJakFpSUhJOUlqZ2lJR1pwYkd3OUlpTmpabVptWkdZaVBqeGhibWx0WVhSbElHRjBkSEpwWW5WMFpVNWhiV1U5SW05d1lXTnBkSGtpSUdaeWIyMDlJakVpSUhSdlBTSXdMakVpSUdKbFoybHVQU0l3TGpnM2N5SWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaVBqd3ZZVzVwYldGMFpUNDhZVzVwYldGMFpWUnlZVzV6Wm05eWJTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKMGNtRnVjMlp2Y20waUlIUjVjR1U5SW5OallXeGxJaUJtY205dFBTSXhMalVpSUhSdlBTSXhJaUJpWldkcGJqMGlNQzQ0TjNNaUlHUjFjajBpTVhNaUlISmxjR1ZoZEVOdmRXNTBQU0pwYm1SbFptbHVhWFJsSWo0OEwyRnVhVzFoZEdWVWNtRnVjMlp2Y20wK1BDOWphWEpqYkdVK1BDOW5Qand2Wno0OEwzTjJaejQ9XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2Jhc2U2NC1sb2FkZXIhLi9tZWRpYS9sb2FkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBXZWIgRm9udCBMb2FkZXIgdjEuNi4yNiAtIChjKSBBZG9iZSBTeXN0ZW1zLCBHb29nbGUuIExpY2Vuc2U6IEFwYWNoZSAyLjAgKi8oZnVuY3Rpb24oKXtmdW5jdGlvbiBhYShhLGIsYyl7cmV0dXJuIGEuY2FsbC5hcHBseShhLmJpbmQsYXJndW1lbnRzKX1mdW5jdGlvbiBiYShhLGIsYyl7aWYoIWEpdGhyb3cgRXJyb3IoKTtpZigyPGFyZ3VtZW50cy5sZW5ndGgpe3ZhciBkPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywyKTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO0FycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGMsZCk7cmV0dXJuIGEuYXBwbHkoYixjKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkoYixhcmd1bWVudHMpfX1mdW5jdGlvbiBwKGEsYixjKXtwPUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kJiYtMSE9RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQudG9TdHJpbmcoKS5pbmRleE9mKFwibmF0aXZlIGNvZGVcIik/YWE6YmE7cmV0dXJuIHAuYXBwbHkobnVsbCxhcmd1bWVudHMpfXZhciBxPURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybituZXcgRGF0ZX07ZnVuY3Rpb24gY2EoYSxiKXt0aGlzLmE9YTt0aGlzLm09Ynx8YTt0aGlzLmM9dGhpcy5tLmRvY3VtZW50fXZhciBkYT0hIXdpbmRvdy5Gb250RmFjZTtmdW5jdGlvbiB0KGEsYixjLGQpe2I9YS5jLmNyZWF0ZUVsZW1lbnQoYik7aWYoYylmb3IodmFyIGUgaW4gYyljLmhhc093blByb3BlcnR5KGUpJiYoXCJzdHlsZVwiPT1lP2Iuc3R5bGUuY3NzVGV4dD1jW2VdOmIuc2V0QXR0cmlidXRlKGUsY1tlXSkpO2QmJmIuYXBwZW5kQ2hpbGQoYS5jLmNyZWF0ZVRleHROb2RlKGQpKTtyZXR1cm4gYn1mdW5jdGlvbiB1KGEsYixjKXthPWEuYy5nZXRFbGVtZW50c0J5VGFnTmFtZShiKVswXTthfHwoYT1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO2EuaW5zZXJ0QmVmb3JlKGMsYS5sYXN0Q2hpbGQpfWZ1bmN0aW9uIHYoYSl7YS5wYXJlbnROb2RlJiZhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSl9XG4gIGZ1bmN0aW9uIHcoYSxiLGMpe2I9Ynx8W107Yz1jfHxbXTtmb3IodmFyIGQ9YS5jbGFzc05hbWUuc3BsaXQoL1xccysvKSxlPTA7ZTxiLmxlbmd0aDtlKz0xKXtmb3IodmFyIGY9ITEsZz0wO2c8ZC5sZW5ndGg7Zys9MSlpZihiW2VdPT09ZFtnXSl7Zj0hMDticmVha31mfHxkLnB1c2goYltlXSl9Yj1bXTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSs9MSl7Zj0hMTtmb3IoZz0wO2c8Yy5sZW5ndGg7Zys9MSlpZihkW2VdPT09Y1tnXSl7Zj0hMDticmVha31mfHxiLnB1c2goZFtlXSl9YS5jbGFzc05hbWU9Yi5qb2luKFwiIFwiKS5yZXBsYWNlKC9cXHMrL2csXCIgXCIpLnJlcGxhY2UoL15cXHMrfFxccyskLyxcIlwiKX1mdW5jdGlvbiB5KGEsYil7Zm9yKHZhciBjPWEuY2xhc3NOYW1lLnNwbGl0KC9cXHMrLyksZD0wLGU9Yy5sZW5ndGg7ZDxlO2QrKylpZihjW2RdPT1iKXJldHVybiEwO3JldHVybiExfVxuICBmdW5jdGlvbiB6KGEpe2lmKFwic3RyaW5nXCI9PT10eXBlb2YgYS5mKXJldHVybiBhLmY7dmFyIGI9YS5tLmxvY2F0aW9uLnByb3RvY29sO1wiYWJvdXQ6XCI9PWImJihiPWEuYS5sb2NhdGlvbi5wcm90b2NvbCk7cmV0dXJuXCJodHRwczpcIj09Yj9cImh0dHBzOlwiOlwiaHR0cDpcIn1mdW5jdGlvbiBlYShhKXtyZXR1cm4gYS5tLmxvY2F0aW9uLmhvc3RuYW1lfHxhLmEubG9jYXRpb24uaG9zdG5hbWV9XG4gIGZ1bmN0aW9uIEEoYSxiLGMpe2Z1bmN0aW9uIGQoKXtrJiZlJiZmJiYoayhnKSxrPW51bGwpfWI9dChhLFwibGlua1wiLHtyZWw6XCJzdHlsZXNoZWV0XCIsaHJlZjpiLG1lZGlhOlwiYWxsXCJ9KTt2YXIgZT0hMSxmPSEwLGc9bnVsbCxrPWN8fG51bGw7ZGE/KGIub25sb2FkPWZ1bmN0aW9uKCl7ZT0hMDtkKCl9LGIub25lcnJvcj1mdW5jdGlvbigpe2U9ITA7Zz1FcnJvcihcIlN0eWxlc2hlZXQgZmFpbGVkIHRvIGxvYWRcIik7ZCgpfSk6c2V0VGltZW91dChmdW5jdGlvbigpe2U9ITA7ZCgpfSwwKTt1KGEsXCJoZWFkXCIsYil9XG4gIGZ1bmN0aW9uIEIoYSxiLGMsZCl7dmFyIGU9YS5jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtpZihlKXt2YXIgZj10KGEsXCJzY3JpcHRcIix7c3JjOmJ9KSxnPSExO2Yub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7Z3x8dGhpcy5yZWFkeVN0YXRlJiZcImxvYWRlZFwiIT10aGlzLnJlYWR5U3RhdGUmJlwiY29tcGxldGVcIiE9dGhpcy5yZWFkeVN0YXRlfHwoZz0hMCxjJiZjKG51bGwpLGYub25sb2FkPWYub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsXCJIRUFEXCI9PWYucGFyZW50Tm9kZS50YWdOYW1lJiZlLnJlbW92ZUNoaWxkKGYpKX07ZS5hcHBlbmRDaGlsZChmKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Z3x8KGc9ITAsYyYmYyhFcnJvcihcIlNjcmlwdCBsb2FkIHRpbWVvdXRcIikpKX0sZHx8NUUzKTtyZXR1cm4gZn1yZXR1cm4gbnVsbH07ZnVuY3Rpb24gQygpe3RoaXMuYT0wO3RoaXMuYz1udWxsfWZ1bmN0aW9uIEQoYSl7YS5hKys7cmV0dXJuIGZ1bmN0aW9uKCl7YS5hLS07RShhKX19ZnVuY3Rpb24gRihhLGIpe2EuYz1iO0UoYSl9ZnVuY3Rpb24gRShhKXswPT1hLmEmJmEuYyYmKGEuYygpLGEuYz1udWxsKX07ZnVuY3Rpb24gRyhhKXt0aGlzLmE9YXx8XCItXCJ9Ry5wcm90b3R5cGUuYz1mdW5jdGlvbihhKXtmb3IodmFyIGI9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspYi5wdXNoKGFyZ3VtZW50c1tjXS5yZXBsYWNlKC9bXFxXX10rL2csXCJcIikudG9Mb3dlckNhc2UoKSk7cmV0dXJuIGIuam9pbih0aGlzLmEpfTtmdW5jdGlvbiBIKGEsYil7dGhpcy5jPWE7dGhpcy5mPTQ7dGhpcy5hPVwiblwiO3ZhciBjPShifHxcIm40XCIpLm1hdGNoKC9eKFtuaW9dKShbMS05XSkkL2kpO2MmJih0aGlzLmE9Y1sxXSx0aGlzLmY9cGFyc2VJbnQoY1syXSwxMCkpfWZ1bmN0aW9uIGZhKGEpe3JldHVybiBJKGEpK1wiIFwiKyhhLmYrXCIwMFwiKStcIiAzMDBweCBcIitKKGEuYyl9ZnVuY3Rpb24gSihhKXt2YXIgYj1bXTthPWEuc3BsaXQoLyxcXHMqLyk7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspe3ZhciBkPWFbY10ucmVwbGFjZSgvWydcIl0vZyxcIlwiKTstMSE9ZC5pbmRleE9mKFwiIFwiKXx8L15cXGQvLnRlc3QoZCk/Yi5wdXNoKFwiJ1wiK2QrXCInXCIpOmIucHVzaChkKX1yZXR1cm4gYi5qb2luKFwiLFwiKX1mdW5jdGlvbiBLKGEpe3JldHVybiBhLmErYS5mfWZ1bmN0aW9uIEkoYSl7dmFyIGI9XCJub3JtYWxcIjtcIm9cIj09PWEuYT9iPVwib2JsaXF1ZVwiOlwiaVwiPT09YS5hJiYoYj1cIml0YWxpY1wiKTtyZXR1cm4gYn1cbiAgZnVuY3Rpb24gZ2EoYSl7dmFyIGI9NCxjPVwiblwiLGQ9bnVsbDthJiYoKGQ9YS5tYXRjaCgvKG5vcm1hbHxvYmxpcXVlfGl0YWxpYykvaSkpJiZkWzFdJiYoYz1kWzFdLnN1YnN0cigwLDEpLnRvTG93ZXJDYXNlKCkpLChkPWEubWF0Y2goLyhbMS05XTAwfG5vcm1hbHxib2xkKS9pKSkmJmRbMV0mJigvYm9sZC9pLnRlc3QoZFsxXSk/Yj03Oi9bMS05XTAwLy50ZXN0KGRbMV0pJiYoYj1wYXJzZUludChkWzFdLnN1YnN0cigwLDEpLDEwKSkpKTtyZXR1cm4gYytifTtmdW5jdGlvbiBoYShhLGIpe3RoaXMuYz1hO3RoaXMuZj1hLm0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O3RoaXMuaD1iO3RoaXMuYT1uZXcgRyhcIi1cIik7dGhpcy5qPSExIT09Yi5ldmVudHM7dGhpcy5nPSExIT09Yi5jbGFzc2VzfWZ1bmN0aW9uIGlhKGEpe2EuZyYmdyhhLmYsW2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIildKTtMKGEsXCJsb2FkaW5nXCIpfWZ1bmN0aW9uIE0oYSl7aWYoYS5nKXt2YXIgYj15KGEuZixhLmEuYyhcIndmXCIsXCJhY3RpdmVcIikpLGM9W10sZD1bYS5hLmMoXCJ3ZlwiLFwibG9hZGluZ1wiKV07Ynx8Yy5wdXNoKGEuYS5jKFwid2ZcIixcImluYWN0aXZlXCIpKTt3KGEuZixjLGQpfUwoYSxcImluYWN0aXZlXCIpfWZ1bmN0aW9uIEwoYSxiLGMpe2lmKGEuaiYmYS5oW2JdKWlmKGMpYS5oW2JdKGMuYyxLKGMpKTtlbHNlIGEuaFtiXSgpfTtmdW5jdGlvbiBqYSgpe3RoaXMuYz17fX1mdW5jdGlvbiBrYShhLGIsYyl7dmFyIGQ9W10sZTtmb3IoZSBpbiBiKWlmKGIuaGFzT3duUHJvcGVydHkoZSkpe3ZhciBmPWEuY1tlXTtmJiZkLnB1c2goZihiW2VdLGMpKX1yZXR1cm4gZH07ZnVuY3Rpb24gTihhLGIpe3RoaXMuYz1hO3RoaXMuZj1iO3RoaXMuYT10KHRoaXMuYyxcInNwYW5cIix7XCJhcmlhLWhpZGRlblwiOlwidHJ1ZVwifSx0aGlzLmYpfWZ1bmN0aW9uIE8oYSl7dShhLmMsXCJib2R5XCIsYS5hKX1mdW5jdGlvbiBQKGEpe3JldHVyblwiZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTk5OTlweDtsZWZ0Oi05OTk5cHg7Zm9udC1zaXplOjMwMHB4O3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87bGluZS1oZWlnaHQ6bm9ybWFsO21hcmdpbjowO3BhZGRpbmc6MDtmb250LXZhcmlhbnQ6bm9ybWFsO3doaXRlLXNwYWNlOm5vd3JhcDtmb250LWZhbWlseTpcIitKKGEuYykrXCI7XCIrKFwiZm9udC1zdHlsZTpcIitJKGEpK1wiO2ZvbnQtd2VpZ2h0OlwiKyhhLmYrXCIwMFwiKStcIjtcIil9O2Z1bmN0aW9uIFEoYSxiLGMsZCxlLGYpe3RoaXMuZz1hO3RoaXMuaj1iO3RoaXMuYT1kO3RoaXMuYz1jO3RoaXMuZj1lfHwzRTM7dGhpcy5oPWZ8fHZvaWQgMH1RLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuYy5tLmRvY3VtZW50LGI9dGhpcyxjPXEoKSxkPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGQsZSl7ZnVuY3Rpb24gaygpe3EoKS1jPj1iLmY/ZSgpOmEuZm9udHMubG9hZChmYShiLmEpLGIuaCkudGhlbihmdW5jdGlvbihhKXsxPD1hLmxlbmd0aD9kKCk6c2V0VGltZW91dChrLDI1KX0sZnVuY3Rpb24oKXtlKCl9KX1rKCl9KSxlPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGEsZCl7c2V0VGltZW91dChkLGIuZil9KTtQcm9taXNlLnJhY2UoW2UsZF0pLnRoZW4oZnVuY3Rpb24oKXtiLmcoYi5hKX0sZnVuY3Rpb24oKXtiLmooYi5hKX0pfTtmdW5jdGlvbiBSKGEsYixjLGQsZSxmLGcpe3RoaXMudj1hO3RoaXMuQj1iO3RoaXMuYz1jO3RoaXMuYT1kO3RoaXMucz1nfHxcIkJFU2Jzd3lcIjt0aGlzLmY9e307dGhpcy53PWV8fDNFMzt0aGlzLnU9Znx8bnVsbDt0aGlzLm89dGhpcy5qPXRoaXMuaD10aGlzLmc9bnVsbDt0aGlzLmc9bmV3IE4odGhpcy5jLHRoaXMucyk7dGhpcy5oPW5ldyBOKHRoaXMuYyx0aGlzLnMpO3RoaXMuaj1uZXcgTih0aGlzLmMsdGhpcy5zKTt0aGlzLm89bmV3IE4odGhpcy5jLHRoaXMucyk7YT1uZXcgSCh0aGlzLmEuYytcIixzZXJpZlwiLEsodGhpcy5hKSk7YT1QKGEpO3RoaXMuZy5hLnN0eWxlLmNzc1RleHQ9YTthPW5ldyBIKHRoaXMuYS5jK1wiLHNhbnMtc2VyaWZcIixLKHRoaXMuYSkpO2E9UChhKTt0aGlzLmguYS5zdHlsZS5jc3NUZXh0PWE7YT1uZXcgSChcInNlcmlmXCIsSyh0aGlzLmEpKTthPVAoYSk7dGhpcy5qLmEuc3R5bGUuY3NzVGV4dD1hO2E9bmV3IEgoXCJzYW5zLXNlcmlmXCIsSyh0aGlzLmEpKTthPVxuICAgIFAoYSk7dGhpcy5vLmEuc3R5bGUuY3NzVGV4dD1hO08odGhpcy5nKTtPKHRoaXMuaCk7Tyh0aGlzLmopO08odGhpcy5vKX12YXIgUz17RDpcInNlcmlmXCIsQzpcInNhbnMtc2VyaWZcIn0sVD1udWxsO2Z1bmN0aW9uIFUoKXtpZihudWxsPT09VCl7dmFyIGE9L0FwcGxlV2ViS2l0XFwvKFswLTldKykoPzpcXC4oWzAtOV0rKSkvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1Q9ISFhJiYoNTM2PnBhcnNlSW50KGFbMV0sMTApfHw1MzY9PT1wYXJzZUludChhWzFdLDEwKSYmMTE+PXBhcnNlSW50KGFbMl0sMTApKX1yZXR1cm4gVH1SLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3RoaXMuZi5zZXJpZj10aGlzLmouYS5vZmZzZXRXaWR0aDt0aGlzLmZbXCJzYW5zLXNlcmlmXCJdPXRoaXMuby5hLm9mZnNldFdpZHRoO3RoaXMuQT1xKCk7bGEodGhpcyl9O1xuICBmdW5jdGlvbiBtYShhLGIsYyl7Zm9yKHZhciBkIGluIFMpaWYoUy5oYXNPd25Qcm9wZXJ0eShkKSYmYj09PWEuZltTW2RdXSYmYz09PWEuZltTW2RdXSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBsYShhKXt2YXIgYj1hLmcuYS5vZmZzZXRXaWR0aCxjPWEuaC5hLm9mZnNldFdpZHRoLGQ7KGQ9Yj09PWEuZi5zZXJpZiYmYz09PWEuZltcInNhbnMtc2VyaWZcIl0pfHwoZD1VKCkmJm1hKGEsYixjKSk7ZD9xKCktYS5BPj1hLnc/VSgpJiZtYShhLGIsYykmJihudWxsPT09YS51fHxhLnUuaGFzT3duUHJvcGVydHkoYS5hLmMpKT9WKGEsYS52KTpWKGEsYS5CKTpuYShhKTpWKGEsYS52KX1mdW5jdGlvbiBuYShhKXtzZXRUaW1lb3V0KHAoZnVuY3Rpb24oKXtsYSh0aGlzKX0sYSksNTApfWZ1bmN0aW9uIFYoYSxiKXtzZXRUaW1lb3V0KHAoZnVuY3Rpb24oKXt2KHRoaXMuZy5hKTt2KHRoaXMuaC5hKTt2KHRoaXMuai5hKTt2KHRoaXMuby5hKTtiKHRoaXMuYSl9LGEpLDApfTtmdW5jdGlvbiBXKGEsYixjKXt0aGlzLmM9YTt0aGlzLmE9Yjt0aGlzLmY9MDt0aGlzLm89dGhpcy5qPSExO3RoaXMucz1jfXZhciBYPW51bGw7Vy5wcm90b3R5cGUuZz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmE7Yi5nJiZ3KGIuZixbYi5hLmMoXCJ3ZlwiLGEuYyxLKGEpLnRvU3RyaW5nKCksXCJhY3RpdmVcIildLFtiLmEuYyhcIndmXCIsYS5jLEsoYSkudG9TdHJpbmcoKSxcImxvYWRpbmdcIiksYi5hLmMoXCJ3ZlwiLGEuYyxLKGEpLnRvU3RyaW5nKCksXCJpbmFjdGl2ZVwiKV0pO0woYixcImZvbnRhY3RpdmVcIixhKTt0aGlzLm89ITA7b2EodGhpcyl9O1xuICBXLnByb3RvdHlwZS5oPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYTtpZihiLmcpe3ZhciBjPXkoYi5mLGIuYS5jKFwid2ZcIixhLmMsSyhhKS50b1N0cmluZygpLFwiYWN0aXZlXCIpKSxkPVtdLGU9W2IuYS5jKFwid2ZcIixhLmMsSyhhKS50b1N0cmluZygpLFwibG9hZGluZ1wiKV07Y3x8ZC5wdXNoKGIuYS5jKFwid2ZcIixhLmMsSyhhKS50b1N0cmluZygpLFwiaW5hY3RpdmVcIikpO3coYi5mLGQsZSl9TChiLFwiZm9udGluYWN0aXZlXCIsYSk7b2EodGhpcyl9O2Z1bmN0aW9uIG9hKGEpezA9PS0tYS5mJiZhLmomJihhLm8/KGE9YS5hLGEuZyYmdyhhLmYsW2EuYS5jKFwid2ZcIixcImFjdGl2ZVwiKV0sW2EuYS5jKFwid2ZcIixcImxvYWRpbmdcIiksYS5hLmMoXCJ3ZlwiLFwiaW5hY3RpdmVcIildKSxMKGEsXCJhY3RpdmVcIikpOk0oYS5hKSl9O2Z1bmN0aW9uIHBhKGEpe3RoaXMuaj1hO3RoaXMuYT1uZXcgamE7dGhpcy5oPTA7dGhpcy5mPXRoaXMuZz0hMH1wYS5wcm90b3R5cGUubG9hZD1mdW5jdGlvbihhKXt0aGlzLmM9bmV3IGNhKHRoaXMuaixhLmNvbnRleHR8fHRoaXMuaik7dGhpcy5nPSExIT09YS5ldmVudHM7dGhpcy5mPSExIT09YS5jbGFzc2VzO3FhKHRoaXMsbmV3IGhhKHRoaXMuYyxhKSxhKX07XG4gIGZ1bmN0aW9uIHJhKGEsYixjLGQsZSl7dmFyIGY9MD09LS1hLmg7KGEuZnx8YS5nKSYmc2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBhPWV8fG51bGwsaz1kfHxudWxsfHx7fTtpZigwPT09Yy5sZW5ndGgmJmYpTShiLmEpO2Vsc2V7Yi5mKz1jLmxlbmd0aDtmJiYoYi5qPWYpO3ZhciBoLG09W107Zm9yKGg9MDtoPGMubGVuZ3RoO2grKyl7dmFyIGw9Y1toXSxuPWtbbC5jXSxyPWIuYSx4PWw7ci5nJiZ3KHIuZixbci5hLmMoXCJ3ZlwiLHguYyxLKHgpLnRvU3RyaW5nKCksXCJsb2FkaW5nXCIpXSk7TChyLFwiZm9udGxvYWRpbmdcIix4KTtyPW51bGw7bnVsbD09PVgmJihYPXdpbmRvdy5Gb250RmFjZT8oeD0vR2Vja28uKkZpcmVmb3hcXC8oXFxkKykvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpKT80MjxwYXJzZUludCh4WzFdLDEwKTohMDohMSk7WD9yPW5ldyBRKHAoYi5nLGIpLHAoYi5oLGIpLGIuYyxsLGIucyxuKTpyPW5ldyBSKHAoYi5nLGIpLHAoYi5oLGIpLGIuYyxsLGIucyxhLFxuICAgIG4pO20ucHVzaChyKX1mb3IoaD0wO2g8bS5sZW5ndGg7aCsrKW1baF0uc3RhcnQoKX19LDApfWZ1bmN0aW9uIHFhKGEsYixjKXt2YXIgZD1bXSxlPWMudGltZW91dDtpYShiKTt2YXIgZD1rYShhLmEsYyxhLmMpLGY9bmV3IFcoYS5jLGIsZSk7YS5oPWQubGVuZ3RoO2I9MDtmb3IoYz1kLmxlbmd0aDtiPGM7YisrKWRbYl0ubG9hZChmdW5jdGlvbihiLGQsYyl7cmEoYSxmLGIsZCxjKX0pfTtmdW5jdGlvbiBzYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifWZ1bmN0aW9uIHRhKGEsYixjKXt2YXIgZD16KGEuYyk7YT0oYS5hLmFwaXx8XCJmYXN0LmZvbnRzLm5ldC9qc2FwaVwiKS5yZXBsYWNlKC9eLipodHRwKHM/KTooXFwvXFwvKT8vLFwiXCIpO3JldHVybiBkK1wiLy9cIithK1wiL1wiK2IrXCIuanNcIisoYz9cIj92PVwiK2M6XCJcIil9XG4gIHNhLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoKXtpZihmW1wiX19tdGlfZm50THN0XCIrZF0pe3ZhciBjPWZbXCJfX210aV9mbnRMc3RcIitkXSgpLGU9W10saDtpZihjKWZvcih2YXIgbT0wO208Yy5sZW5ndGg7bSsrKXt2YXIgbD1jW21dLmZvbnRmYW1pbHk7dm9pZCAwIT1jW21dLmZvbnRTdHlsZSYmdm9pZCAwIT1jW21dLmZvbnRXZWlnaHQ/KGg9Y1ttXS5mb250U3R5bGUrY1ttXS5mb250V2VpZ2h0LGUucHVzaChuZXcgSChsLGgpKSk6ZS5wdXNoKG5ldyBIKGwpKX1hKGUpfWVsc2Ugc2V0VGltZW91dChmdW5jdGlvbigpe2IoKX0sNTApfXZhciBjPXRoaXMsZD1jLmEucHJvamVjdElkLGU9Yy5hLnZlcnNpb247aWYoZCl7dmFyIGY9Yy5jLm07Qih0aGlzLmMsdGEoYyxkLGUpLGZ1bmN0aW9uKGUpe2U/YShbXSk6KGZbXCJfX01vbm90eXBlQ29uZmlndXJhdGlvbl9fXCIrZF09ZnVuY3Rpb24oKXtyZXR1cm4gYy5hfSxiKCkpfSkuaWQ9XCJfX01vbm90eXBlQVBJU2NyaXB0X19cIitcbiAgICBkfWVsc2UgYShbXSl9O2Z1bmN0aW9uIHVhKGEsYil7dGhpcy5jPWE7dGhpcy5hPWJ9dWEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGIsYyxkPXRoaXMuYS51cmxzfHxbXSxlPXRoaXMuYS5mYW1pbGllc3x8W10sZj10aGlzLmEudGVzdFN0cmluZ3N8fHt9LGc9bmV3IEM7Yj0wO2ZvcihjPWQubGVuZ3RoO2I8YztiKyspQSh0aGlzLmMsZFtiXSxEKGcpKTt2YXIgaz1bXTtiPTA7Zm9yKGM9ZS5sZW5ndGg7YjxjO2IrKylpZihkPWVbYl0uc3BsaXQoXCI6XCIpLGRbMV0pZm9yKHZhciBoPWRbMV0uc3BsaXQoXCIsXCIpLG09MDttPGgubGVuZ3RoO20rPTEpay5wdXNoKG5ldyBIKGRbMF0saFttXSkpO2Vsc2Ugay5wdXNoKG5ldyBIKGRbMF0pKTtGKGcsZnVuY3Rpb24oKXthKGssZil9KX07ZnVuY3Rpb24gdmEoYSxiLGMpe2E/dGhpcy5jPWE6dGhpcy5jPWIrd2E7dGhpcy5hPVtdO3RoaXMuZj1bXTt0aGlzLmc9Y3x8XCJcIn12YXIgd2E9XCIvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzc1wiO2Z1bmN0aW9uIHhhKGEsYil7Zm9yKHZhciBjPWIubGVuZ3RoLGQ9MDtkPGM7ZCsrKXt2YXIgZT1iW2RdLnNwbGl0KFwiOlwiKTszPT1lLmxlbmd0aCYmYS5mLnB1c2goZS5wb3AoKSk7dmFyIGY9XCJcIjsyPT1lLmxlbmd0aCYmXCJcIiE9ZVsxXSYmKGY9XCI6XCIpO2EuYS5wdXNoKGUuam9pbihmKSl9fVxuICBmdW5jdGlvbiB5YShhKXtpZigwPT1hLmEubGVuZ3RoKXRocm93IEVycm9yKFwiTm8gZm9udHMgdG8gbG9hZCFcIik7aWYoLTEhPWEuYy5pbmRleE9mKFwia2l0PVwiKSlyZXR1cm4gYS5jO2Zvcih2YXIgYj1hLmEubGVuZ3RoLGM9W10sZD0wO2Q8YjtkKyspYy5wdXNoKGEuYVtkXS5yZXBsYWNlKC8gL2csXCIrXCIpKTtiPWEuYytcIj9mYW1pbHk9XCIrYy5qb2luKFwiJTdDXCIpOzA8YS5mLmxlbmd0aCYmKGIrPVwiJnN1YnNldD1cIithLmYuam9pbihcIixcIikpOzA8YS5nLmxlbmd0aCYmKGIrPVwiJnRleHQ9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGEuZykpO3JldHVybiBifTtmdW5jdGlvbiB6YShhKXt0aGlzLmY9YTt0aGlzLmE9W107dGhpcy5jPXt9fVxuICB2YXIgQWE9e2xhdGluOlwiQkVTYnN3eVwiLFwibGF0aW4tZXh0XCI6XCJcXHUwMGU3XFx1MDBmNlxcdTAwZmNcXHUwMTFmXFx1MDE1ZlwiLGN5cmlsbGljOlwiXFx1MDQzOVxcdTA0NGZcXHUwNDE2XCIsZ3JlZWs6XCJcXHUwM2IxXFx1MDNiMlxcdTAzYTNcIixraG1lcjpcIlxcdTE3ODBcXHUxNzgxXFx1MTc4MlwiLEhhbnVtYW46XCJcXHUxNzgwXFx1MTc4MVxcdTE3ODJcIn0sQmE9e3RoaW46XCIxXCIsZXh0cmFsaWdodDpcIjJcIixcImV4dHJhLWxpZ2h0XCI6XCIyXCIsdWx0cmFsaWdodDpcIjJcIixcInVsdHJhLWxpZ2h0XCI6XCIyXCIsbGlnaHQ6XCIzXCIscmVndWxhcjpcIjRcIixib29rOlwiNFwiLG1lZGl1bTpcIjVcIixcInNlbWktYm9sZFwiOlwiNlwiLHNlbWlib2xkOlwiNlwiLFwiZGVtaS1ib2xkXCI6XCI2XCIsZGVtaWJvbGQ6XCI2XCIsYm9sZDpcIjdcIixcImV4dHJhLWJvbGRcIjpcIjhcIixleHRyYWJvbGQ6XCI4XCIsXCJ1bHRyYS1ib2xkXCI6XCI4XCIsdWx0cmFib2xkOlwiOFwiLGJsYWNrOlwiOVwiLGhlYXZ5OlwiOVwiLGw6XCIzXCIscjpcIjRcIixiOlwiN1wifSxDYT17aTpcImlcIixpdGFsaWM6XCJpXCIsbjpcIm5cIixub3JtYWw6XCJuXCJ9LFxuICAgIERhPS9eKHRoaW58KD86KD86ZXh0cmF8dWx0cmEpLT8pP2xpZ2h0fHJlZ3VsYXJ8Ym9va3xtZWRpdW18KD86KD86c2VtaXxkZW1pfGV4dHJhfHVsdHJhKS0/KT9ib2xkfGJsYWNrfGhlYXZ5fGx8cnxifFsxLTldMDApPyhufGl8bm9ybWFsfGl0YWxpYyk/JC87XG4gIGZ1bmN0aW9uIEVhKGEpe2Zvcih2YXIgYj1hLmYubGVuZ3RoLGM9MDtjPGI7YysrKXt2YXIgZD1hLmZbY10uc3BsaXQoXCI6XCIpLGU9ZFswXS5yZXBsYWNlKC9cXCsvZyxcIiBcIiksZj1bXCJuNFwiXTtpZigyPD1kLmxlbmd0aCl7dmFyIGc7dmFyIGs9ZFsxXTtnPVtdO2lmKGspZm9yKHZhciBrPWsuc3BsaXQoXCIsXCIpLGg9ay5sZW5ndGgsbT0wO208aDttKyspe3ZhciBsO2w9a1ttXTtpZihsLm1hdGNoKC9eW1xcdy1dKyQvKSl7dmFyIG49RGEuZXhlYyhsLnRvTG93ZXJDYXNlKCkpO2lmKG51bGw9PW4pbD1cIlwiO2Vsc2V7bD1uWzJdO2w9bnVsbD09bHx8XCJcIj09bD9cIm5cIjpDYVtsXTtuPW5bMV07aWYobnVsbD09bnx8XCJcIj09biluPVwiNFwiO2Vsc2UgdmFyIHI9QmFbbl0sbj1yP3I6aXNOYU4obik/XCI0XCI6bi5zdWJzdHIoMCwxKTtsPVtsLG5dLmpvaW4oXCJcIil9fWVsc2UgbD1cIlwiO2wmJmcucHVzaChsKX0wPGcubGVuZ3RoJiYoZj1nKTszPT1kLmxlbmd0aCYmKGQ9ZFsyXSxnPVtdLGQ9ZD9kLnNwbGl0KFwiLFwiKTpcbiAgICBnLDA8ZC5sZW5ndGgmJihkPUFhW2RbMF1dKSYmKGEuY1tlXT1kKSl9YS5jW2VdfHwoZD1BYVtlXSkmJihhLmNbZV09ZCk7Zm9yKGQ9MDtkPGYubGVuZ3RoO2QrPTEpYS5hLnB1c2gobmV3IEgoZSxmW2RdKSl9fTtmdW5jdGlvbiBGYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifXZhciBHYT17QXJpbW86ITAsQ291c2luZTohMCxUaW5vczohMH07RmEucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9bmV3IEMsYz10aGlzLmMsZD1uZXcgdmEodGhpcy5hLmFwaSx6KGMpLHRoaXMuYS50ZXh0KSxlPXRoaXMuYS5mYW1pbGllczt4YShkLGUpO3ZhciBmPW5ldyB6YShlKTtFYShmKTtBKGMseWEoZCksRChiKSk7RihiLGZ1bmN0aW9uKCl7YShmLmEsZi5jLEdhKX0pfTtmdW5jdGlvbiBIYShhLGIpe3RoaXMuYz1hO3RoaXMuYT1ifUhhLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuYS5pZCxjPXRoaXMuYy5tO2I/Qih0aGlzLmMsKHRoaXMuYS5hcGl8fFwiaHR0cHM6Ly91c2UudHlwZWtpdC5uZXRcIikrXCIvXCIrYitcIi5qc1wiLGZ1bmN0aW9uKGIpe2lmKGIpYShbXSk7ZWxzZSBpZihjLlR5cGVraXQmJmMuVHlwZWtpdC5jb25maWcmJmMuVHlwZWtpdC5jb25maWcuZm4pe2I9Yy5UeXBla2l0LmNvbmZpZy5mbjtmb3IodmFyIGU9W10sZj0wO2Y8Yi5sZW5ndGg7Zis9Milmb3IodmFyIGc9YltmXSxrPWJbZisxXSxoPTA7aDxrLmxlbmd0aDtoKyspZS5wdXNoKG5ldyBIKGcsa1toXSkpO3RyeXtjLlR5cGVraXQubG9hZCh7ZXZlbnRzOiExLGNsYXNzZXM6ITEsYXN5bmM6ITB9KX1jYXRjaChtKXt9YShlKX19LDJFMyk6YShbXSl9O2Z1bmN0aW9uIElhKGEsYil7dGhpcy5jPWE7dGhpcy5mPWI7dGhpcy5hPVtdfUlhLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuZi5pZCxjPXRoaXMuYy5tLGQ9dGhpcztiPyhjLl9fd2ViZm9udGZvbnRkZWNrbW9kdWxlX198fChjLl9fd2ViZm9udGZvbnRkZWNrbW9kdWxlX189e30pLGMuX193ZWJmb250Zm9udGRlY2ttb2R1bGVfX1tiXT1mdW5jdGlvbihiLGMpe2Zvcih2YXIgZz0wLGs9Yy5mb250cy5sZW5ndGg7ZzxrOysrZyl7dmFyIGg9Yy5mb250c1tnXTtkLmEucHVzaChuZXcgSChoLm5hbWUsZ2EoXCJmb250LXdlaWdodDpcIitoLndlaWdodCtcIjtmb250LXN0eWxlOlwiK2guc3R5bGUpKSl9YShkLmEpfSxCKHRoaXMuYyx6KHRoaXMuYykrKHRoaXMuZi5hcGl8fFwiLy9mLmZvbnRkZWNrLmNvbS9zL2Nzcy9qcy9cIikrZWEodGhpcy5jKStcIi9cIitiK1wiLmpzXCIsZnVuY3Rpb24oYil7YiYmYShbXSl9KSk6YShbXSl9O3ZhciBZPW5ldyBwYSh3aW5kb3cpO1kuYS5jLmN1c3RvbT1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgdWEoYixhKX07WS5hLmMuZm9udGRlY2s9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IElhKGIsYSl9O1kuYS5jLm1vbm90eXBlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBzYShiLGEpfTtZLmEuYy50eXBla2l0PWZ1bmN0aW9uKGEsYil7cmV0dXJuIG5ldyBIYShiLGEpfTtZLmEuYy5nb29nbGU9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IEZhKGIsYSl9O3ZhciBaPXtsb2FkOnAoWS5sb2FkLFkpfTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBafSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPVo6KHdpbmRvdy5XZWJGb250PVosd2luZG93LldlYkZvbnRDb25maWcmJlkubG9hZCh3aW5kb3cuV2ViRm9udENvbmZpZykpO30oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9wbHVnaW5zL3dlYmZvbnQuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiAqINCi0L7Rh9C60LAg0LfQsNC/0YPRgdC60LAg0L/RgNC40LvQvtC20LXQvdC40YdcbiAqL1xuZmFicmljLkFwcGxpY2F0aW9uID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB0aGlzLmluaXQob3B0aW9ucyk7XG59O1xuXG5mYWJyaWMuQXBwbGljYXRpb24ucHJvdG90eXBlID0gZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZCh7fSxmYWJyaWMuT2JzZXJ2YWJsZSxmYWJyaWMuUGx1Z2luc01peGluLHtcbiAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLm9wdGlvbnMgPSAgZmFicmljLnV0aWwub2JqZWN0LmNsb25lKG9wdGlvbnMpO1xuICAgIGlmKHRoaXMub3B0aW9ucy5jYWxsYmFjayl7XG4gICAgICB0aGlzLmNhbGxiYWNrID0gdGhpcy5vcHRpb25zLmNhbGxiYWNrO1xuICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5jYWxsYmFjaztcbiAgICB9XG4gICAgaWYodGhpcy5vcHRpb25zLmluaXRpYWxpemUpe1xuICAgICAgdGhpcy5pbml0aWFsaXplID0gdGhpcy5vcHRpb25zLmluaXRpYWxpemU7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLnByb3RvdHlwZXMpe1xuICAgICAgZmFicmljLnV0aWwub2JqZWN0LmRlZXBFeHRlbmQodGhpcy5wcm90b3R5cGVzLCB0aGlzLm9wdGlvbnMucHJvdG90eXBlcyk7XG4gICAgICBkZWxldGUgdGhpcy5vcHRpb25zLnByb3RvdHlwZXM7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLnBsdWdpbnMpe1xuICAgICAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZCh0aGlzLnBsdWdpbnMsIHRoaXMub3B0aW9ucy5wbHVnaW5zKTtcbiAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMucGx1Z2lucztcbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY2FudmFzQ29udGFpbmVyKXtcbiAgICAgIHRoaXMuY2FudmFzQ29udGFpbmVyID0gdGhpcy5vcHRpb25zLmNhbnZhc0NvbnRhaW5lcjtcbiAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMuY2FudmFzQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMubG9hZGVyVGVtcGxhdGUpe1xuICAgICAgdGhpcy5zZXRMb2FkZXJUZW1wbGF0ZSh0aGlzLmxvYWRlclRlbXBsYXRlIHx8IHRoaXMub3B0aW9ucy5sb2FkZXJUZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMpe1xuICAgICAgdGhpcy5wcmludEJhbm5lcigpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZShcImxvYWRpbmc6YmVnaW5cIix7fSk7XG5cbiAgICAkKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICBmYWJyaWMudXRpbC5vcmRlcihbXG4gICAgICAgIHRoaXMucnVuUGx1Z2lucy5iaW5kKHRoaXMsXCJwcmVsb2FkZXJzXCIpLFxuICAgICAgICB0aGlzLnByZWxvYWRlcixcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlndXJhdGlvbixcbiAgICAgICAgdGhpcy5ydW5QbHVnaW5zLmJpbmQodGhpcyxcImNvbmZpZ3VyYXRpb25cIiksXG4gICAgICAgIHRoaXMuY3JlYXRlQXBwLFxuICAgICAgICB0aGlzLmluaXRpYWxpemUsXG4gICAgICAgIC8vIHRoaXMubG9hZFNsaWRlLFxuICAgICAgICB0aGlzLnJ1blBsdWdpbnMuYmluZCh0aGlzLFwicG9zdGxvYWRlcnNcIiksXG4gICAgICAgIHRoaXMub25BcHBsaWNhdGlvbkNyZWF0ZWQsXG4gICAgICAgIHRoaXMucG9zdGxvYWRlcixcbiAgICAgICAgdGhpcy5jYWxsYmFjayAmJiBmdW5jdGlvbigpe1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jYWxsYmFjay5iaW5kKHRoaXMpLDApXG4gICAgICAgIH1cbiAgICAgIF0sdGhpcylcbiAgICB9LmJpbmQodGhpcykpXG5cbiAgfSxcbiAgY3JlZGVudGlhbHM6IGZhbHNlLFxuICByZWFkeSA6IGZhbHNlLFxuICBvbkFwcGxpY2F0aW9uQ3JlYXRlZDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLmZpcmUoXCJsb2FkaW5nOmVuZFwiLHt9KTtcbiAgfSxcbiAgY2FudmFzQ2xhc3M6ICdDYW52YXMnLFxuICByZXNpemFibGU6IGZhbHNlLFxuICBoaXN0b3J5OiB0cnVlLFxuICAvKipcbiAgICogZnVuY3Rpb25zIHdpbGwgYmUgY2FsbGVkIG9uIGRpZmZlcmVudCBhcHBsaWNhdGlvbiBjcmVhdGlvbiBzdGFnZXNcbiAgICovXG4gIHBsdWdpbnM6IHtcbiAgICBwcmVsb2FkZXJzOiBbXSxcbiAgICBjb25maWd1cmF0aW9uOiBbXSxcbiAgICBjYW52YXM6IFtdLFxuICAgIHBvc3Rsb2FkZXJzOiBbXVxuICB9LFxuICBwcmludEJhbm5lcjogZnVuY3Rpb24oKXtcbiAgICBpZih0aGlzLmNyZWRlbnRpYWxzKXtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIiVjRmllcmEgQ2FudmFzIEVkaXRvciVjIGJ5ICVjRGVuaXMgUG9ub21hcmV2JWMgJWMlNiRzJWMgLyAlYyU5JHMlY1wiLCBcImNvbG9yOiAjZmZhNTAwXCIsIFwiY29sb3I6ICMyMDIwMjBcIiwgXCJjb2xvcjogIzJFQzA2Q1wiLCBcImNvbG9yOiAjMjAyMDIwXCIsIFwiY29sb3I6ICMzMzdhYjdcIiwgXCJ3d3cuaG9tZXRsdC5ydVwiLCBcImNvbG9yOiAjMjAyMDIwXCIsIFwiY29sb3I6ICMzMzdhYjdcIiwgXCJwb25vbWFyZXZ0bHRAZ21haWwuY29tXCIsIFwiY29sb3I6ICMyMDIwMjBcIik7XG4gICAgfVxuICB9LFxuICBldmVudExpc3RlbmVyczoge1xuICAgIFwiY2FudmFzOmNyZWF0ZWRcIjogZnVuY3Rpb24oKXtcblxuICAgICAgaWYodGhpcy5vcHRpb25zLm9uUmVzaXplKXtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSA9IHRoaXMub3B0aW9ucy5vblJlc2l6ZTtcbiAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5vblJlc2l6ZTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMub3B0aW9ucy5yZXNpemFibGUpe1xuICAgICAgICB0aGlzLnJlc2l6YWJsZSA9IHRoaXMub3B0aW9ucy5yZXNpemFibGU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnMucmVzaXphYmxlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmVzaXphYmxlKSB7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlKHRoaXMuY2FudmFzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZW50aXR5OmNyZWF0ZWRcIjogW11cbiAgfSxcbiAgb25TbGlkZUxvYWRlZDogZnVuY3Rpb24gKCkge30sXG4gIG9uQ2FudmFzQ3JlYXRlZDogZnVuY3Rpb24gKCkge30sXG4gIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7fSxcbiAgbG9hZENvbmZpZ3VyYXRpb246IGZ1bmN0aW9uIChyZXNvbHZlLGVycm9yKSB7XG4gICAgaWYoIXRoaXMub3B0aW9ucy5jb25maWd1cmF0aW9uKXtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfVxuICAgIHZhciBfYXBwID0gdGhpcztcbiAgICBmYWJyaWMudXRpbC5wcm9taXNlXG4gICAgICAubWFwKFxuICAgICAgICB0aGlzLm9wdGlvbnMuY29uZmlndXJhdGlvbixcbiAgICAgICAgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLGZhaWwpIHtcbiAgICAgICAgICAgIGZhYnJpYy51dGlsLmRhdGEubG9hZEpzb24odmFsdWUscmVzb2x2ZSxmYWlsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgIGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoX2FwcCxyZXN1bHRzKVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc29sdmUsZXJyb3IpO1xuICB9LFxuICBzZXRDYW52YXNDb250YWluZXI6IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmKHRoaXMuX2FwcENyZWF0ZWQpe1xuICAgICAgdGhpcy5jcmVhdGVDYW52YXModGhpcy5jYW52YXNDb250YWluZXIsIHRoaXMuY2FudmFzKTtcbiAgICAgIHRoaXMucHJvamVjdC5zZXRDYW52YXModGhpcy5jYW52YXMpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5jYW52YXNDb250YWluZXIgPSBpZDtcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZUFwcDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cbiAgICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHRoaXMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5jcmVhdGVDYW52YXMoKTtcbiAgICAvLyB0aGlzLnJ1blBsdWdpbnMuYmluZCh0aGlzLFwiY2FudmFzXCIpLFxuXG4gICAgdmFyIF9jYW52YXMgPSB0aGlzLmNhbnZhcztcblxuXG4gICAgaWYgKHRoaXMucHJvamVjdCkge1xuICAgICAgdmFyIF9wcm9qZWN0ID0gdGhpcy5wcm9qZWN0O1xuXG4gICAgICB0aGlzLnByb2plY3QgPSBuZXcgZmFicmljLlByb2plY3Qoe2FwcGxpY2F0aW9uOiB0aGlzfSk7XG4gICAgICB0aGlzLmZpcmUoXCJwcm9qZWN0OmNoYW5nZWRcIik7XG5cbiAgICAgIF9jYW52YXMgJiYgdGhpcy5wcm9qZWN0LnNldENhbnZhcyhfY2FudmFzKTtcblxuICAgICAgaWYgKF9wcm9qZWN0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucHJvamVjdC5sb2FkKF9wcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpcmUoXCJjcmVhdGVkXCIsIHtjYW52YXM6IF9jYW52YXMgLCBwcm9qZWN0IDogdGhpcy5wcm9qZWN0fSk7XG4gICAgY2FsbGJhY2soKTtcbiAgfSxcbiAgY3JlYXRlQ2FudmFzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYodGhpcy5jYW52YXNDb250YWluZXIpe1xuXG4gICAgICBpZiAodGhpcy5jYW52YXNDb250YWluZXIuY29uc3RydWN0b3IgPT0gU3RyaW5nKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuY2FudmFzQ29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsID0gdGhpcy5jYW52YXNDb250YWluZXI7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbnZhcyA9IG5ldyBmYWJyaWNbdGhpcy5jYW52YXNDbGFzc10oZWwsIHthcHBsaWNhdGlvbjogdGhpc30pO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5jYW52YXMgPSBuZXcgZmFicmljW3RoaXMuY2FudmFzQ2xhc3NdKHthcHBsaWNhdGlvbjogdGhpc30pO1xuICAgIH1cblxuICAgIC8vIGlmKF9jYW52YXNfb3B0aW9ucyl7XG4gICAgLy8gICB0aGlzLmNhbnZhcy5sb2FkKF9jYW52YXNfb3B0aW9ucyk7XG4gICAgLy8gfVxuICAgIHRoaXMuZmlyZShcImNhbnZhczpjcmVhdGVkXCIpO1xuICAgIHRoaXMub25DYW52YXNDcmVhdGVkKCk7XG4gIH0sXG4gIGRpc3Bvc2U6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5jYW52YXMuZGlzcG9zZSgpO1xuICB9LFxuICBzZXRSZXNpemFibGU6IGZ1bmN0aW9uKGNhbnZhcyl7XG4gICAgY2FudmFzID0gY2FudmFzIHx8IHRoaXMuY2FudmFzO1xuXG4gICAgaWYgKCFjYW52YXMudmlydHVhbCkge1xuICAgICAgY2FudmFzLm9uUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3BhcmVudCA9ICQodGhpcy53cmFwcGVyRWwucGFyZW50Tm9kZSk7XG5cbiAgICAgICAgdmFyIF9vZmZzZXQgPSAkKHRoaXMud3JhcHBlckVsKS5wb3NpdGlvbigpO1xuICAgICAgICB2YXIgX21hcmdpbiAgPSB0aGlzLmFwcGxpY2F0aW9uLndpZHRoTWFyZ2luIHx8IDA7XG4gICAgICAgIHZhciBfdyA9ICBfcGFyZW50LndpZHRoKCkgLSBfbWFyZ2luLCBfaCA9IF9wYXJlbnQuaGVpZ2h0KCk7XG4gICAgICAgIGlmICh0aGlzLmFwcGxpY2F0aW9uLm9uUmVzaXplKSB7XG4gICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5vblJlc2l6ZSh7XG4gICAgICAgICAgICB3aWR0aDogX3cgLFxuICAgICAgICAgICAgaGVpZ2h0OiBfaFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLm9yaWdpbmFsV2lkdGggLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLm9yaWdpbmFsSGVpZ2h0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jYWxjT2Zmc2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHtcbiAgICAgICAgICAgIHdpZHRoOiBfdyAtIF9vZmZzZXQubGVmdCAgLSBfbWFyZ2luLFxuICAgICAgICAgICAgaGVpZ2h0OiBfaCAtIF9vZmZzZXQudG9wXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbnZhcy5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfVxufSk7XG5cbmZhYnJpYy5BcHBsaWNhdGlvbi5hZGRQbHVnaW4gPSBmYWJyaWMuUGx1Z2luc01peGluLmFkZFBsdWdpbi5iaW5kKGZhYnJpYy5BcHBsaWNhdGlvbik7XG5cbmZhYnJpYy5hcHAgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgcmV0dXJuIG5ldyBmYWJyaWMuQXBwbGljYXRpb24ob3B0aW9ucyk7XG59O1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvcmUvYXBwbGljYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuXG5cbmlmKCFPYmplY3QudmFsdWVzKXtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgJ3ZhbHVlcycsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24oX29iamVjdCkge1xuICAgICAgdmFyIF92YWx1ZXMgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKF9vYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfdmFsdWVzLnB1c2goX29iamVjdFtrZXldKTtcbiAgICAgICAgLy8gdXNlIHZhbFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gX3ZhbHVlcztcbiAgICB9XG4gIH0pO1xufVxuXG5cbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLHtcbiAgZXJyb3JzOiBbXVxufSk7XG5cbmZhYnJpYy51dGlsLm9yZGVyID0gZnVuY3Rpb24oX2FycmF5LGNvbnRleHQgKXtcbiAgKGZ1bmN0aW9uIF9jYWxsKCl7XG4gICAgaWYoIV9hcnJheS5sZW5ndGgpcmV0dXJuO1xuICAgIHZhciBmb28gPSBfYXJyYXkuc2hpZnQoKTtcbiAgICBpZihmb28pe1xuICAgICAgaWYoZm9vLmxlbmd0aCl7XG4gICAgICAgIGZvby5jYWxsKGNvbnRleHQsX2NhbGwpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGZvby5jYWxsKGNvbnRleHQpO1xuICAgICAgICBfY2FsbCgpO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgX2NhbGwoKTtcbiAgICB9XG4gIH0pKClcbn07XG5cbmZhYnJpYy51dGlsLnByb21pc2UgPSB7XG4gIG1hcDogZnVuY3Rpb24gKGRhdGEsIGZvbykge1xuXG4gICAgaWYoZGF0YS5jb25zdHJ1Y3RvciA9PSBBcnJheSl7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZGF0YS5tYXAoZm9vKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMsIGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgdmFyIHVybHMgPSBPYmplY3QudmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh1cmxzLm1hcChmb28pKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMsIGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9tYXAgPSB7fTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwIDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIF9tYXBba2V5c1tpXV0gPSByZXN1bHRzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX21hcCk7XG4gICAgICB9KVxuICB9LFxuICB3cmFwOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwKGZvbykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7XG4gICAgICAgIGlmICghZm9vLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgZmFpbCkge1xuICAgICAgICAgICAgdmFyIF9yZXN1bHQgPSBmb28uY2FsbChjb250ZXh0KTtcbiAgICAgICAgICAgIChfcmVzdWx0IHx8IF9yZXN1bHQgPT09IHVuZGVmaW5lZCkgPyByZXNvbHZlKCkgOiBmYWlsKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZvby5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbmZhYnJpYy5PYmplY3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5fc2V0T2JqZWN0KGtleSwgdmFsdWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYga2V5ICE9PSAnY2xpcFRvJykge1xuICAgICAgdGhpcy5fc2V0KGtleSwgdmFsdWUodGhpcy5nZXQoa2V5KSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX3NldChrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5fc2V0T2JqZWN0ID0gZnVuY3Rpb24ob3B0aW9ucyxjYWxsYmFjaykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBpZih0aGlzLm9wdGlvbnNPcmRlcil7XG4gICAgZm9yKHZhciBpID0gdGhpcy5vcHRpb25zT3JkZXIubGVuZ3RoOyBpLS07KXtcbiAgICAgIHZhciBwcm9wID0gdGhpcy5vcHRpb25zT3JkZXJbaV07XG4gICAgICB2YXIgaWkgPSBrZXlzLmluZGV4T2YocHJvcCk7XG4gICAgICBpZihpaSAhPSAtMSl7XG4gICAgICAgIGtleXMuc3BsaWNlKGlpLCAxKTtcbiAgICAgICAga2V5cy51bnNoaWZ0KHByb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJvcCA9IGtleXNbaV07XG4gICAgaWYodHlwZW9mIG9wdGlvbnNbcHJvcF0gPT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGtleXMuc3BsaWNlKGksIDEpO1xuICAgICAga2V5cy51bnNoaWZ0KHByb3ApO1xuICAgIH1cbiAgfVxuICB2YXIgcXVldWU7XG4gIGZvciAodmFyIGkgaW4ga2V5cykge1xuICAgIHZhciBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZihvcHRpb25zW19rZXldID09PSB1bmRlZmluZWQgfHwgb3B0aW9uc1tfa2V5XSA9PT0gbnVsbCljb250aW51ZTtcbiAgICB2YXIgX2Zvb05hbWUgPSBcInNldFwiICsgZmFicmljLnV0aWwuc3RyaW5nLmNhcGl0YWxpemUoX2tleSwgdHJ1ZSk7XG4gICAgaWYodGhpc1tfZm9vTmFtZV0gJiYgdGhpc1tfZm9vTmFtZV0ubmFtZSAmJiB0aGlzW19mb29OYW1lXS5uYW1lICE9IFwiYW5vbnltb3VzXCIpe1xuICAgICAgaWYodGhpc1tfZm9vTmFtZV0ubGVuZ3RoID09IDIpe1xuICAgICAgICBpZighcXVldWUpe1xuICAgICAgICAgIHF1ZXVlID0gZmFicmljLnV0aWwucXVldWVMb2FkKDIsY2FsbGJhY2spO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBxdWV1ZS50b3RhbCArKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzW19mb29OYW1lXShvcHRpb25zW19rZXldLGZ1bmN0aW9uKF9rZXkpe1xuICAgICAgICAgIHF1ZXVlKCk7XG4gICAgICAgIH0uYmluZCh0aGlzLF9rZXkpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzW19mb29OYW1lXShvcHRpb25zW19rZXldKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9fc2V0KF9rZXksIG9wdGlvbnNbX2tleV0pO1xuICAgIH1cbiAgfVxuICBpZihxdWV1ZSl7XG4gICAgcXVldWUoKVxuICB9ZWxzZSBpZihjYWxsYmFjayApe1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn07XG5cbnZhciBfZ2V0X3BvaW50ZXJfb3ZlcndyaXR0ZW4gPSBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5nZXRQb2ludGVyO1xuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5DYW52YXMucHJvdG90eXBlLCB7XG4gIHNldFdpZHRoOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXREaW1lbnNpb25zKHsgd2lkdGg6IHZhbHVlIH0sIHt9KTtcbiAgfSxcbiAgc2V0SGVpZ2h0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXREaW1lbnNpb25zKHsgaGVpZ2h0OiB2YWx1ZSB9LCB7fSk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBfc2V0T2JqZWN0OiBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5fc2V0T2JqZWN0LFxuICBvcmlnaW5hbFN0YXRlOiB7fSxcbiAgc3RhdGVQcm9wZXJ0aWVzOiBbXSxcbiAgc3BlY2lhbFByb3BlcnRpZXM6IFtcImJhY2tncm91bmRJbWFnZVwiLFwib2JqZWN0c1wiXSxcbiAgZWRpdGluZ09iamVjdDogbnVsbCxcbiAgZ2V0T2JqZWN0QnlJRDogZnVuY3Rpb24oX2lkKXtcbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5sYXllcnMgfHwgW3tvYmplY3RzOiB0aGlzLl9vYmplY3RzfV07XG4gICAgZm9yICh2YXIgaSBpbiBsYXllcnMpIHtcbiAgICAgIGZvciAodmFyIGogaW4gbGF5ZXJzW2ldLm9iamVjdHMpIHtcbiAgICAgICAgaWYgKGxheWVyc1tpXS5vYmplY3RzW2pdLmlkID09PSBfaWQpIHtcbiAgICAgICAgICByZXR1cm4gbGF5ZXJzW2ldLm9iamVjdHNbal07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIC8qXG4gICBBZGQgQ3VzdG9tIE9iamVjdCBUcmFuZm9ybWF0aW9uc1xuICAgKi9cbiAgZ2V0UG9pbnRlcjogZnVuY3Rpb24gKGUsIGlnbm9yZVpvb20sIHVwcGVyQ2FudmFzRWwpIHtcbiAgICB2YXIgcG9pbnRlciA9IF9nZXRfcG9pbnRlcl9vdmVyd3JpdHRlbi5jYWxsKHRoaXMsIGUsIGlnbm9yZVpvb20sIHVwcGVyQ2FudmFzRWwpO1xuICAgIGlmIChlLl9ncm91cCkge1xuICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZVBvaW50ZXIoZS5fZ3JvdXAsIHBvaW50ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfSxcbiAgX19zZXQgOiBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5fc2V0LFxuICBnZXRNb2RpZmllZFN0YXRlczogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICBvcmlnaW5hbDoge30sXG4gICAgICBtb2RpZmllZDoge31cbiAgICB9O1xuICAgIGZvciAodmFyIHByb3AgaW4gdGFyZ2V0Lm9yaWdpbmFsU3RhdGUpIHtcbiAgICAgIGlmICh0YXJnZXQub3JpZ2luYWxTdGF0ZVtwcm9wXSAhPT0gdGFyZ2V0W3Byb3BdKSB7XG4gICAgICAgIGlmKHRhcmdldC5vcmlnaW5hbFN0YXRlW3Byb3BdIGluc3RhbmNlb2YgT2JqZWN0KXtcbiAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeSh0YXJnZXQub3JpZ2luYWxTdGF0ZVtwcm9wXSkgPT0gSlNPTi5zdHJpbmdpZnkodGFyZ2V0W3Byb3BdKSl7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGVzLm9yaWdpbmFsW3Byb3BdID0gdGFyZ2V0Lm9yaWdpbmFsU3RhdGVbcHJvcF07XG4gICAgICAgIHN0YXRlcy5tb2RpZmllZFtwcm9wXSA9IHRhcmdldFtwcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlcztcbiAgfSxcbiAgZmlyZU1vZGlmaWVkSWZDaGFuZ2VkOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuc3RhdGVmdWwpIHtcbiAgICAgIHZhciBfc3RhdGVzID0gdGFyZ2V0Lmhhc1N0YXRlQ2hhbmdlZCgpO1xuICAgICAgaWYoX3N0YXRlcyl7XG4gICAgICAgIHRoaXMuZmlyZSgnb2JqZWN0Om1vZGlmaWVkJywge3RhcmdldDogdGFyZ2V0ICwgc3RhdGVzOiBfc3RhdGVzfSk7XG4gICAgICAgIHRhcmdldC5maXJlKCdtb2RpZmllZCcse3N0YXRlczogX3N0YXRlc30pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX3NldDogZnVuY3Rpb24gKGtleSwgdmFsdWUsY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5zcGVjaWFsUHJvcGVydGllcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICB0aGlzW1wic2V0XCIgKyBmYWJyaWMudXRpbC5zdHJpbmcuY2FwaXRhbGl6ZShrZXksIHRydWUpXSh2YWx1ZSxjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLl9zZXQuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGdldDogZmFicmljLk9iamVjdC5wcm90b3R5cGUuZ2V0LFxuICBzZXQ6IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnNldCxcbiAgaGFzU3RhdGVDaGFuZ2VkOiBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5oYXNTdGF0ZUNoYW5nZWQsXG4gIC8qKiBDcmVhdGVzIGEgYm90dG9tIGNhbnZhc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbY2FudmFzRWxdXG4gICAqL1xuICBfY3JlYXRlTG93ZXJDYW52YXM6IGZ1bmN0aW9uIChjYW52YXNFbCkge1xuICAgIGlmICh0eXBlb2YgY2FudmFzRWwgPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5sb3dlckNhbnZhc0VsID0gZmFicmljLnV0aWwuZ2V0QnlJZChjYW52YXNFbCkgfHwgdGhpcy5fY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgIH0gZWxzZSBpZiAoY2FudmFzRWwpIHtcbiAgICAgIHRoaXMubG93ZXJDYW52YXNFbCA9IGNhbnZhc0VsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpcnR1YWwgPSB0cnVlO1xuICAgICAgdGhpcy5sb3dlckNhbnZhc0VsID0gZmFicmljLnV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRDYW52YXNFbGVtZW50KHRoaXMubG93ZXJDYW52YXNFbCk7XG5cbiAgICBmYWJyaWMudXRpbC5hZGRDbGFzcyh0aGlzLmxvd2VyQ2FudmFzRWwsICdsb3dlci1jYW52YXMnKTtcblxuICAgIGlmICh0aGlzLmludGVyYWN0aXZlKSB7XG4gICAgICB0aGlzLl9hcHBseUNhbnZhc1N0eWxlKHRoaXMubG93ZXJDYW52YXNFbCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0Q29udGFpbmVyID0gdGhpcy5sb3dlckNhbnZhc0VsLmdldENvbnRleHQoJzJkJyk7XG4gIH0sXG4gIGZpbmRUYXJnZXQ6IGZ1bmN0aW9uIChlLCBza2lwR3JvdXApIHtcbiAgICBpZiAodGhpcy5za2lwVGFyZ2V0RmluZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpZ25vcmVab29tID0gdHJ1ZSxcbiAgICAgIHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXIoZSwgaWdub3JlWm9vbSksXG4gICAgICBhY3RpdmVHcm91cCA9IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKSxcbiAgICAgIGFjdGl2ZU9iamVjdCA9IHRoaXMuZ2V0QWN0aXZlT2JqZWN0KCk7XG4gICAgaWYgKGFjdGl2ZUdyb3VwICYmICFza2lwR3JvdXAgJiYgdGhpcy5fY2hlY2tUYXJnZXQocG9pbnRlciwgYWN0aXZlR3JvdXApKSB7XG4gICAgICByZXR1cm4gYWN0aXZlR3JvdXA7XG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZU9iamVjdCAmJiB0aGlzLl9jaGVja1RhcmdldChwb2ludGVyLCBhY3RpdmVPYmplY3QpKSB7XG4gICAgICAvL2FkZGVkIHZpc2Nlcm9pZFxuICAgICAgdGhpcy5fZmlyZU92ZXJPdXRFdmVudHMoYWN0aXZlT2JqZWN0LCBlKTtcbiAgICAgIHJldHVybiBhY3RpdmVPYmplY3Q7XG4gICAgfVxuXG4gICAgdGhpcy50YXJnZXRzID0gWyBdO1xuXG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3NlYXJjaFBvc3NpYmxlVGFyZ2V0cyh0aGlzLl9vYmplY3RzLCBwb2ludGVyKTtcbiAgICB0aGlzLl9maXJlT3Zlck91dEV2ZW50cyh0YXJnZXQsIGUpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn0pO1xuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5PYmplY3QucHJvdG90eXBlLCB7XG4gIHNldEFuZ2xlOiBmdW5jdGlvbihhbmdsZSkge1xuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgfSxcbiAgX19zZXQgOiBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5fc2V0LFxuICBnZXQgOiBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5nZXQsXG4gIF9zZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlICxjYWxsYmFjaykge1xuICAgIHZhciBfZm9vTmFtZSA9IFwic2V0XCIgKyBmYWJyaWMudXRpbC5zdHJpbmcuY2FwaXRhbGl6ZShrZXksIHRydWUpO1xuICAgIGlmKHRoaXNbX2Zvb05hbWVdICAmJiB0aGlzW19mb29OYW1lXS5uYW1lICYmIHRoaXNbX2Zvb05hbWVdLm5hbWUgIT0gXCJhbm9ueW1vdXNcIil7XG4gICAgICAvLyBpZiAodGhpcy5zcGVjaWFsUHJvcGVydGllcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAvLyBpZih0aGlzW19mb29OYW1lXSl7XG4gICAgICB0aGlzW19mb29OYW1lXSh2YWx1ZSxjYWxsYmFjayk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLl9fc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgICAgZXZlbnRlZDogZmFsc2UsXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXG4gICAgICBsb2NrTW92ZW1lbnRYOiB0cnVlLFxuICAgICAgbG9ja01vdmVtZW50WTogdHJ1ZVxuICAgIH0pO1xuICB9LFxuICBzdG9yZWQ6IHRydWUsXG4gIC8qKlxuICAgKiBTYXZlcyBzdGF0ZSBvZiBhbiBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBPYmplY3Qgd2l0aCBhZGRpdGlvbmFsIGBzdGF0ZVByb3BlcnRpZXNgIGFycmF5IHRvIGluY2x1ZGUgd2hlbiBzYXZpbmcgc3RhdGVcbiAgICogQHJldHVybiB7ZmFicmljLk9iamVjdH0gdGhpc0FyZ1xuICAgKi9cbiAgc2F2ZVN0YXRlOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5zdGF0ZVByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICB2YXIgX3ZhbCA9IHRoaXMuZ2V0KHByb3ApO1xuICAgICAgaWYoX3ZhbCBpbnN0YW5jZW9mIE9iamVjdCl7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdGF0ZVtwcm9wXSA9IGZhYnJpYy51dGlsLm9iamVjdC5jbG9uZURlZXAoX3ZhbCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXRlW3Byb3BdID0gX3ZhbDtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcblxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc3RhdGVQcm9wZXJ0aWVzKSB7XG4gICAgICBvcHRpb25zLnN0YXRlUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXRlW3Byb3BdID0gdGhpcy5nZXQocHJvcCk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGhhc1N0YXRlQ2hhbmdlZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGlmaWVkID0gMDtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgb3JpZ2luYWw6IHt9LFxuICAgICAgbW9kaWZpZWQ6IHt9XG4gICAgfTtcbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMub3JpZ2luYWxTdGF0ZSkge1xuICAgICAgaWYgKHRoaXMub3JpZ2luYWxTdGF0ZVtwcm9wXSAhPT0gdGhpc1twcm9wXSkge1xuICAgICAgICBpZih0aGlzLm9yaWdpbmFsU3RhdGVbcHJvcF0gaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgIGlmKEpTT04uc3RyaW5naWZ5KHRoaXMub3JpZ2luYWxTdGF0ZVtwcm9wXSkgPT0gSlNPTi5zdHJpbmdpZnkodGhpc1twcm9wXSkpe1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRlcy5vcmlnaW5hbFtwcm9wXSA9IHRoaXMub3JpZ2luYWxTdGF0ZVtwcm9wXTtcbiAgICAgICAgc3RhdGVzLm1vZGlmaWVkW3Byb3BdID0gdGhpc1twcm9wXTtcbiAgICAgICAgbW9kaWZpZWQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGlmaWVkICYmIHN0YXRlcztcbiAgfVxufSk7XG5cbmZhYnJpYy51dGlsLmdldFByb3BvcnRpb25zID0gZnVuY3Rpb24gKHBob3RvLCBjb250YWluZXIsIG1vZGUpIHtcbiAgbW9kZSA9IG1vZGUgfHwgJ2ZpdCc7XG4gIHZhciBfdyA9IHBob3RvLm5hdHVyYWxXaWR0aCB8fCBwaG90by53aWR0aDtcbiAgdmFyIF9oID0gcGhvdG8ubmF0dXJhbEhlaWdodCB8fCBwaG90by5oZWlnaHQ7XG4gIGlmICghY29udGFpbmVyLmhlaWdodCAmJiAhY29udGFpbmVyLndpZHRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiAxLFxuICAgICAgd2lkdGg6IF93LFxuICAgICAgaGVpZ2h0OiBfaFxuICAgIH07XG4gIH1cbiAgaWYgKCFwaG90by5oZWlnaHQgJiYgIXBob3RvLndpZHRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiAwLjAwMSxcbiAgICAgIHdpZHRoOiBjb250YWluZXIud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNvbnRhaW5lci5oZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgLy8gdmFyIF9hc3AgPSBfdyAvIF9oLCBfY19hc3AgPSBjb250YWluZXIud2lkdGggLyBjb250YWluZXIuaGVpZ2h0O1xuXG4gIC8vIGlmIChfYXNwID4gX2NfYXNwKSB7XG4gIC8vICAgX2ggPSBjb250YWluZXIuaGVpZ2h0O1xuICAvLyAgIF93ID0gX2ggKiBfYXNwO1xuICAvL1xuICAvLyB9IGVsc2Uge1xuICAvLyAgIF93ID0gY29udGFpbmVyLndpZHRoO1xuICAvLyAgIF9oID0gX3cgLyBfYXNwO1xuICAvLyB9XG4gIC8vIHZhciBzY2FsZVggPSBjb250YWluZXIud2lkdGggLyBfdztcbiAgLy8gdmFyIHNjYWxlWSA9IGNvbnRhaW5lci5oZWlnaHQgLyBfaDtcbiAgdmFyIHNjYWxlWCA9IGNvbnRhaW5lci53aWR0aCAmJiBjb250YWluZXIud2lkdGggLyBfdyB8fCA5OTk7XG4gIHZhciBzY2FsZVkgPSBjb250YWluZXIuaGVpZ2h0ICYmIGNvbnRhaW5lci5oZWlnaHQgLyBfaCB8fCA5OTk7XG5cbiAgdmFyIHNjYWxlO1xuICBpZiAobW9kZSA9PT0gJ2NvdmVyJykge1xuICAgIHNjYWxlID0gTWF0aC5tYXgoc2NhbGVYLCBzY2FsZVkpO1xuICB9XG4gIGlmIChtb2RlID09PSAnZml0Jykge1xuICAgIHNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpO1xuICB9XG4gIGlmIChtb2RlID09PSAnY2VudGVyJykge1xuICAgIHNjYWxlID0gMTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHNjYWxlOiBzY2FsZSxcbiAgICB3aWR0aDogTWF0aC5mbG9vcihfdyAqIHNjYWxlKSxcbiAgICBoZWlnaHQ6IE1hdGguZmxvb3IoX2ggKiBzY2FsZSlcbiAgfTtcbn07XG5cbmZhYnJpYy51dGlsLlV0ZjhBcnJheVRvU3RyID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgdmFyIG91dCwgaSwgbGVuLCBjO1xuICB2YXIgY2hhcjIsIGNoYXIzO1xuXG4gIG91dCA9IFwiXCI7XG4gIGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgaSA9IDA7XG4gIHdoaWxlKGkgPCBsZW4pIHtcbiAgICBjID0gYXJyYXlbaSsrXTtcbiAgICBzd2l0Y2goYyA+PiA0KVxuICAgIHtcbiAgICAgIGNhc2UgMDogY2FzZSAxOiBjYXNlIDI6IGNhc2UgMzogY2FzZSA0OiBjYXNlIDU6IGNhc2UgNjogY2FzZSA3OlxuICAgICAgLy8gMHh4eHh4eHhcbiAgICAgIG91dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDEyOiBjYXNlIDEzOlxuICAgICAgLy8gMTEweCB4eHh4ICAgMTB4eCB4eHh4XG4gICAgICBjaGFyMiA9IGFycmF5W2krK107XG4gICAgICBvdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDFGKSA8PCA2KSB8IChjaGFyMiAmIDB4M0YpKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxNDpcbiAgICAgICAgLy8gMTExMCB4eHh4ICAxMHh4IHh4eHggIDEweHggeHh4eFxuICAgICAgICBjaGFyMiA9IGFycmF5W2krK107XG4gICAgICAgIGNoYXIzID0gYXJyYXlbaSsrXTtcbiAgICAgICAgb3V0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMHgwRikgPDwgMTIpIHxcbiAgICAgICAgICAoKGNoYXIyICYgMHgzRikgPDwgNikgfFxuICAgICAgICAgICgoY2hhcjMgJiAweDNGKSA8PCAwKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG5mYWJyaWMudXRpbC5jcmVhdGVPYmplY3QgPSBmdW5jdGlvbiAodHlwZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYodHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIpe1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gdHlwZTtcbiAgICB0eXBlID0gbnVsbDtcbiAgfWVsc2V7XG4gICAgb3B0aW9ucy50eXBlID0gdHlwZTtcbiAgfVxuICB2YXIgYXBwID0gb3B0aW9ucy5hcHBsaWNhdGlvbjtcbiAgYXBwICYmIGFwcC5maXJlKFwiZW50aXR5OmxvYWRcIix7b3B0aW9uczogb3B0aW9uc30pO1xuXG4gIHZhciBfa2xhc3NOYW1lID0gZmFicmljLnV0aWwuc3RyaW5nLmNhbWVsaXplKGZhYnJpYy51dGlsLnN0cmluZy5jYXBpdGFsaXplKHR5cGUgfHwgb3B0aW9ucy50eXBlIHx8IGFwcC5wcm90b3R5cGVzLk9iamVjdC50eXBlLHRydWUpKTtcbiAgdmFyIF9rbGFzcyA9IGZhYnJpY1tfa2xhc3NOYW1lXSB8fCBhcHAua2xhc3Nlc1tfa2xhc3NOYW1lXTtcblxuXG4gIGlmKCFfa2xhc3Mpe1xuICAgIGNvbnNvbGUuZXJyb3IoX2tsYXNzTmFtZSArIFwiIGlzIHVuZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IGZhYnJpYy5SZWN0KG9wdGlvbnMpKVxuICB9XG5cbiAgdmFyIGVsID0gX2tsYXNzLmZyb21PYmplY3Qob3B0aW9ucywgZnVuY3Rpb24gKGVsKSB7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZWwpO1xuICAgIGNhbGxiYWNrID0gbnVsbDtcbiAgfSk7XG4gIGlmIChlbCkge1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVsKTtcbiAgICBjYWxsYmFjayA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIGVsO1xufTtcblxuZmFicmljLnV0aWwuZGF0YVVSSXRvQmxvYiA9IGZ1bmN0aW9uIChkYXRhVVJJLCBkYXRhVFlQRSkge1xuICB2YXIgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pLCBhcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xuICAgIGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xuICB9XG4gIHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6IGRhdGFUWVBFfSk7XG59O1xuXG5mYWJyaWMudXRpbC5ibG9iVG9EYXRhVVJMID0gZnVuY3Rpb24gKGJsb2IsIGNhbGxiYWNrKSB7XG4gIHZhciBhID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgYS5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNhbGxiYWNrKGUudGFyZ2V0LnJlc3VsdCk7XG4gIH07XG4gIGEucmVhZEFzRGF0YVVSTChibG9iKTtcbn07XG5cbmZhYnJpYy51dGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnRXaXRoU2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHZhciBjYW52YXMgPSBmYWJyaWMudXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gIGNhbnZhcy53aWR0aCA9IHNpemUud2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgcmV0dXJuIGNhbnZhcztcbn07XG5cbmZhYnJpYy51dGlsLnN0cmluZy50b0Rhc2hlZCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuZmFicmljLnV0aWwuc3RyaW5nLnVuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZyl7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgK1xuICAgIChzdHJpbmcuc2xpY2UoMSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29yZS9iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmZhYnJpYy5BcHBsaWNhdGlvbi5wcm90b3R5cGUuZXZlbnRMaXN0ZW5lcnNbXCJlbnRpdHk6Y3JlYXRlZFwiXS5wdXNoKGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUudGFyZ2V0LmV2ZW50TGlzdGVuZXJzKXtcbiAgICAgIGZvcih2YXIgaSBpbiBlLnRhcmdldC5ldmVudExpc3RlbmVycykge1xuICAgICAgICB2YXIgX2xpc3RlbmVycyA9IGUudGFyZ2V0LmV2ZW50TGlzdGVuZXJzW2ldO1xuICAgICAgICBpZihfbGlzdGVuZXJzLmNvbnN0cnVjdG9yID09IEFycmF5KXtcbiAgICAgICAgICBmb3IgKHZhciBqIGluIF9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0Lm9uKGksIF9saXN0ZW5lcnNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZS50YXJnZXQub24oaSwgX2xpc3RlbmVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihlLm9wdGlvbnMuZXZlbnRMaXN0ZW5lcnMpe1xuICAgICAgZm9yKHZhciBpIGluIGUub3B0aW9ucy5ldmVudExpc3RlbmVycyl7XG4gICAgICAgIGUudGFyZ2V0Lm9uKGksZS5vcHRpb25zLmV2ZW50TGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlIGUub3B0aW9ucy5ldmVudExpc3RlbmVycztcblxuICBpZihlLnRhcmdldC5fZGVmYXVsdF9ldmVudF9saXN0ZW5lcnMpe1xuICAgIGZvcih2YXIgaSBpbiBlLnRhcmdldC5fZGVmYXVsdF9ldmVudF9saXN0ZW5lcnMpe1xuICAgICAgZS50YXJnZXQub24oaSxlLnRhcmdldC5fZGVmYXVsdF9ldmVudF9saXN0ZW5lcnNbaV0pO1xuICAgIH1cbiAgfVxufSk7XG5cblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuQXBwbGljYXRpb24ucHJvdG90eXBlLCB7XG4gIGluaXRFdmVudExpc3RlbmVyczogZnVuY3Rpb24oKXtcbiAgICBpZighdGhpcy5fX2V2ZW50TGlzdGVuZXJzKXtcbiAgICAgIHRoaXMuX19ldmVudExpc3RlbmVycyA9IHt9O1xuICAgIH1cbiAgICBmb3IgKHZhciBldmVudCBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICBpZighdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50XSl7XG4gICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXVxuICAgICAgfVxuICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50XSA9IHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudF0uY29uY2F0ICh0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50XSk7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmV2ZW50TGlzdGVuZXJzKXtcbiAgICAgIHRoaXMub24odGhpcy5vcHRpb25zLmV2ZW50TGlzdGVuZXJzKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL2V2ZW50TGlzdGVuZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxudmFyIF9iaW5kRXZlbnRzID0gZmFicmljLkNhbnZhcy5wcm90b3R5cGUuX2JpbmRFdmVudHM7XG52YXIgX29uTW91c2VEb3duX292ZXJ3cml0dGVuID0gZmFicmljLkNhbnZhcy5wcm90b3R5cGUuX29uTW91c2VEb3duO1xudmFyIF9vbk1vdXNlVXBfb3ZlcndyaXR0ZW4gPSBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5fb25Nb3VzZVVwO1xudmFyIF9pbml0RXZlbnRMaXN0ZW5lcnNfb3ZlcndyaXR0ZW4gPSBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5faW5pdEV2ZW50TGlzdGVuZXJzO1xudmFyIHJlbW92ZUxpc3RlbmVyc19vdmVyd3JpdHRlbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVycztcblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuQ2FudmFzLnByb3RvdHlwZSwge1xuICB0YXBob2xkVGhyZXNob2xkOiAyMDAwLFxuICBfYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgIF9iaW5kRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkRvdWJsZUNsaWNrID0gdGhpcy5fb25Eb3VibGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uVGFwSG9sZCA9IHRoaXMuX29uVGFwSG9sZC5iaW5kKHRoaXMpO1xuICB9LFxuXG4gIF9vbkRvdWJsZUNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciB0YXJnZXQgPSBzZWxmLmZpbmRUYXJnZXQoZSk7XG4gICAgc2VsZi5maXJlKCdtb3VzZTpkYmxjbGljaycsIHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgZTogZVxuICAgIH0pO1xuXG4gICAgaWYgKHRhcmdldCAmJiAhc2VsZi5pc0RyYXdpbmdNb2RlKSB7XG4gICAgICAvLyBUbyB1bmlmeSB0aGUgYmVoYXZpb3IsIHRoZSBvYmplY3QncyBkb3VibGUgY2xpY2sgZXZlbnQgZG9lcyBub3QgZmlyZSBvbiBkcmF3aW5nIG1vZGUuXG4gICAgICB0YXJnZXQuZmlyZSgnZGJsY2xpY2snLCB7XG4gICAgICAgIGU6IGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBfb25Ecm9wOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBfem9vbSA9IHRoaXMuZ2V0Wm9vbSgpO1xuICAgIGUueCAvPSBfem9vbTtcbiAgICBlLnkgLz0gX3pvb207XG4gICAgZS5vZmZzZXRYIC89IF96b29tO1xuICAgIGUub2Zmc2V0WSAvPSBfem9vbTtcbiAgICBlLndpZHRoID0gZS5oZWxwZXIud2lkdGgoKSAvIF96b29tO1xuICAgIGUuaGVpZ2h0ID0gZS5oZWxwZXIuaGVpZ2h0KCkgLyBfem9vbTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZS50YXJnZXQgPSBzZWxmLmZpbmRUYXJnZXQoZS5vcmlnaW5hbEV2ZW50KTtcblxuICAgIHNlbGYuZmlyZSgnbW91c2U6ZHJvcCcsIGUpO1xuXG4gICAgaWYgKGUudGFyZ2V0ICYmICFzZWxmLmlzRHJhd2luZ01vZGUpIHtcbiAgICAgIC8vIFRvIHVuaWZ5IHRoZSBiZWhhdmlvciwgdGhlIG9iamVjdCdzIGRvdWJsZSBjbGljayBldmVudCBkb2VzIG5vdCBmaXJlIG9uIGRyYXdpbmcgbW9kZS5cbiAgICAgIGUudGFyZ2V0LmZpcmUoJ29iamVjdDpkcm9wJywgZSk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkRyYWdNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciB0YXJnZXQgPSBzZWxmLmZpbmRUYXJnZXQoZS5vcmlnaW5hbEV2ZW50KTtcbiAgICBzZWxmLmZpcmUoJ21vdXNlOmRyYWdtb3ZlJywge1xuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBlOiBlLFxuICAgICAgZGF0YTogZS5kYXRhXG4gICAgfSk7XG4gICAgaWYgKHRhcmdldCAmJiAhc2VsZi5pc0RyYXdpbmdNb2RlKSB7XG4gICAgICAvLyBUbyB1bmlmeSB0aGUgYmVoYXZpb3IsIHRoZSBvYmplY3QncyBkb3VibGUgY2xpY2sgZXZlbnQgZG9lcyBub3QgZmlyZSBvbiBkcmF3aW5nIG1vZGUuXG4gICAgICB0YXJnZXQuZmlyZSgnb2JqZWN0OmRyYWdtb3ZlJywge1xuICAgICAgICBlOiBlLFxuICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGFzdF90YXJnZXQgPT0gdGFyZ2V0KXJldHVybjtcbiAgICBpZiAodGhpcy5fbGFzdF90YXJnZXQpIHtcbiAgICAgIHNlbGYuZmlyZSgnbW91c2U6ZHJhZ2xlYXZlJywge1xuICAgICAgICB0YXJnZXQ6IHRoaXMuX2xhc3RfdGFyZ2V0LFxuICAgICAgICBlOiBlLFxuICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fbGFzdF90YXJnZXQuZmlyZSgnb2JqZWN0OmRyYWdsZWF2ZScsIHtcbiAgICAgICAgZTogZSxcbiAgICAgICAgZGF0YTogZS5kYXRhXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2xhc3RfdGFyZ2V0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0YXJnZXQpIHtcblxuICAgICAgc2VsZi5maXJlKCdtb3VzZTpkcmFnZW50ZXInLCB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBlOiBlLFxuICAgICAgICBkYXRhOiBlLmRhdGFcbiAgICAgIH0pO1xuICAgICAgdGFyZ2V0LmZpcmUoJ29iamVjdDpkcmFnZW50ZXInLCB7XG4gICAgICAgIGU6IGUsXG4gICAgICAgIGRhdGE6IGUuZGF0YVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2xhc3RfdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICB9LFxuXG4gIF9vbkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciB0YXJnZXQgPSBzZWxmLmZpbmRUYXJnZXQoZSk7XG4gICAgc2VsZi5maXJlKCdtb3VzZTpjbGljaycsIHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgZTogZVxuICAgIH0pO1xuXG4gICAgaWYgKHRhcmdldCAmJiAhc2VsZi5pc0RyYXdpbmdNb2RlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5vcmlnaW5hbFN0YXRlLmxlZnQgPT0gdGFyZ2V0LmxlZnQgJiZcbiAgICAgICAgdGFyZ2V0Lm9yaWdpbmFsU3RhdGUudG9wID09IHRhcmdldC50b3AgJiZcbiAgICAgICAgdGFyZ2V0Lm9yaWdpbmFsU3RhdGUuc2NhbGVYID09IHRhcmdldC5zY2FsZVggJiZcbiAgICAgICAgdGFyZ2V0Lm9yaWdpbmFsU3RhdGUuc2NhbGVZID09IHRhcmdldC5zY2FsZVkgJiZcbiAgICAgICAgdGFyZ2V0Lm9yaWdpbmFsU3RhdGUuYW5nbGUgPT0gdGFyZ2V0LmFuZ2xlXG4gICAgICApIHtcbiAgICAgICAgLy8gVG8gdW5pZnkgdGhlIGJlaGF2aW9yLCB0aGUgb2JqZWN0J3MgZG91YmxlIGNsaWNrIGV2ZW50IGRvZXMgbm90IGZpcmUgb24gZHJhd2luZyBtb2RlLlxuICAgICAgICB0YXJnZXQuZmlyZSgnb2JqZWN0OmNsaWNrJywge1xuICAgICAgICAgIGU6IGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9vblRhcEhvbGQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHRhcmdldCA9IHNlbGYuZmluZFRhcmdldChlKTtcbiAgICBzZWxmLmZpcmUoJ3RvdWNoOnRhcGhvbGQnLCB7XG4gICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgIGU6IGVcbiAgICB9KTtcblxuICAgIGlmICh0YXJnZXQgJiYgIXNlbGYuaXNEcmF3aW5nTW9kZSkge1xuICAgICAgLy8gVG8gdW5pZnkgdGhlIGJlaGF2aW9yLCB0aGUgb2JqZWN0J3MgdGFwIGhvbGQgZXZlbnQgZG9lcyBub3QgZmlyZSBvbiBkcmF3aW5nIG1vZGUuXG4gICAgICB0YXJnZXQuZmlyZSgndGFwaG9sZCcsIHtcbiAgICAgICAgZTogZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNoZW5kJyAmJiBzZWxmLnRvdWNoU3RhcnRUaW1lciAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi50b3VjaFN0YXJ0VGltZXIpO1xuICAgIH1cbiAgfSxcblxuICBfb25Nb3VzZURvd246IGZ1bmN0aW9uIChlKSB7XG4gICAgX29uTW91c2VEb3duX292ZXJ3cml0dGVuLmNhbGwodGhpcywgZSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgdmFyIHRvdWNoU3RhcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9vblRhcEhvbGQoZSk7XG4gICAgICAgIHNlbGYuaXNMb25nVGFwID0gdHJ1ZTtcbiAgICAgIH0sIHNlbGYudGFwaG9sZFRocmVzaG9sZCk7XG4gICAgICBzZWxmLnRvdWNoU3RhcnRUaW1lciA9IHRvdWNoU3RhcnRUaW1lcjtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmlnaHQgY2xpY2sgc3VwcG9ydFxuICAgIGlmIChlLndoaWNoID09PSAzKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5maW5kVGFyZ2V0KGUpO1xuICAgICAgc2VsZi5maXJlKCdtb3VzZTpkb3duJywge3RhcmdldDogdGFyZ2V0LCBlOiBlfSk7XG4gICAgICBpZiAodGFyZ2V0ICYmICFzZWxmLmlzRHJhd2luZ01vZGUpIHtcbiAgICAgICAgLy8gVG8gdW5pZnkgdGhlIGJlaGF2aW9yLCB0aGUgb2JqZWN0J3MgbW91c2UgZG93biBldmVudCBkb2VzIG5vdCBmaXJlIG9uIGRyYXdpbmcgbW9kZS5cbiAgICAgICAgdGFyZ2V0LmZpcmUoJ21vdXNlZG93bicsIHtcbiAgICAgICAgICBlOiBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfb25Nb3VzZVVwOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgX29uTW91c2VVcF9vdmVyd3JpdHRlbi5jYWxsKHRoaXMsIGUpO1xuXG4gICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuICAgICAgLy8gUHJvY2VzcyB0YXAgaG9sZC5cbiAgICAgIGlmICh0aGlzLnRvdWNoU3RhcnRUaW1lciAhPSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoU3RhcnRUaW1lcik7XG4gICAgICB9XG4gICAgICAvLyBQcm9jZXNzIGxvbmcgdGFwLlxuICAgICAgaWYgKHRoaXMuaXNMb25nVGFwKSB7XG4gICAgICAgIHRoaXMuX29uTG9uZ1RhcEVuZChlKTtcbiAgICAgICAgdGhpcy5pc0xvbmdUYXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIFByb2Nlc3MgZG91YmxlIGNsaWNrXG4gICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgbGFzdFRvdWNoID0gdGhpcy5sYXN0VG91Y2ggfHwgbm93ICsgMTtcbiAgICAgIHZhciBkZWx0YSA9IG5vdyAtIGxhc3RUb3VjaDtcbiAgICAgIGlmIChkZWx0YSA8IDMwMCAmJiBkZWx0YSA+IDApIHtcbiAgICAgICAgLy8gQWZ0ZXIgd2UgZGV0Y3QgYSBkb3VibGV0YXAsIHN0YXJ0IG92ZXJcbiAgICAgICAgdGhpcy5sYXN0VG91Y2ggPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX29uRG91YmxlVGFwKGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2ggPSBub3c7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9vbkRvdWJsZVRhcDogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgdGFyZ2V0ID0gc2VsZi5maW5kVGFyZ2V0KGUpO1xuICAgIHNlbGYuZmlyZSgndG91Y2g6ZG91YmxldGFwJywge1xuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBlOiBlXG4gICAgfSk7XG5cbiAgICBpZiAodGFyZ2V0ICYmICFzZWxmLmlzRHJhd2luZ01vZGUpIHtcbiAgICAgIC8vIFRvIHVuaWZ5IHRoZSBiZWhhdmlvciwgdGhlIG9iamVjdCdzIGRvdWJsZSB0YXAgZXZlbnQgZG9lcyBub3QgZmlyZSBvbiBkcmF3aW5nIG1vZGUuXG4gICAgICB0YXJnZXQuZmlyZSgnb2JqZWN0OmRvdWJsZXRhcCcsIHtcbiAgICAgICAgZTogZVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkxvbmdUYXBFbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHRhcmdldCA9IHNlbGYuZmluZFRhcmdldChlKTtcbiAgICBzZWxmLmZpcmUoJ3RvdWNoOmxvbmd0YXBlbmQnLCB7XG4gICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgIGU6IGVcbiAgICB9KTtcblxuICAgIGlmICh0YXJnZXQgJiYgIXNlbGYuaXNEcmF3aW5nTW9kZSkge1xuICAgICAgLy8gVG8gdW5pZnkgdGhlIGJlaGF2aW9yLCB0aGUgb2JqZWN0J3MgbG9uZyB0YXAgZW5kIGV2ZW50IGRvZXMgbm90IGZpcmUgb24gZHJhd2luZyBtb2RlLlxuICAgICAgdGFyZ2V0LmZpcmUoJ29iamVjdDpsb25ndGFwZW5kJywge1xuICAgICAgICBlOiBlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgX2luaXRFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBfaW5pdEV2ZW50TGlzdGVuZXJzX292ZXJ3cml0dGVuLmNhbGwoc2VsZik7XG5cbiAgICBmYWJyaWMudXRpbC5hZGRMaXN0ZW5lcihzZWxmLnVwcGVyQ2FudmFzRWwsICdjbGljaycsIHNlbGYuX29uQ2xpY2spO1xuICAgIGZhYnJpYy51dGlsLmFkZExpc3RlbmVyKHNlbGYudXBwZXJDYW52YXNFbCwgJ2RibGNsaWNrJywgc2VsZi5fb25Eb3VibGVDbGljayk7XG5cbiAgICBzZWxmLm9uKCdvYmplY3Q6c2NhbGluZycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuX3NjYWxpbmdfZXZlbnRzX2VuYWJsZWQpIHtcbiAgICAgICAgZS50YXJnZXQuZmlyZShcInNjYWxpbmdcIiwgZS5lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZWxmLm9uKCdvYmplY3Q6c2VsZWN0ZWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0KSB7XG4gICAgICAgIGUudGFyZ2V0LmZpcmUoXCJvYmplY3Q6c2VsZWN0ZWRcIiwgZS5lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZWxmLm9uKCdtb3VzZTpvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCkge1xuICAgICAgICBlLnRhcmdldC5maXJlKFwibW91c2U6b3ZlclwiLCBlLmUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VsZi5vbignbW91c2U6b3V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCkge1xuICAgICAgICBlLnRhcmdldC5maXJlKFwibW91c2U6b3V0XCIsIGUuZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSxcblxuICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmVtb3ZlTGlzdGVuZXJzX292ZXJ3cml0dGVuLmNhbGwoc2VsZik7XG5cblxuICAgIGZhYnJpYy51dGlsLnJlbW92ZUxpc3RlbmVyKHNlbGYudXBwZXJDYW52YXNFbCwgJ2NsaWNrJywgc2VsZi5fb25DbGljayk7XG4gICAgZmFicmljLnV0aWwucmVtb3ZlTGlzdGVuZXIoc2VsZi51cHBlckNhbnZhc0VsLCAnZGJsY2xpY2snLCBzZWxmLl9vbkRvdWJsZUNsaWNrKTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvcmUvZXZlbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc1ZNTCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHlwZW9mIEdfdm1sQ2FudmFzTWFuYWdlciAhPT0gJ3VuZGVmaW5lZCc7IH07XG5cbmRlbGV0ZSBmYWJyaWMuUmVjdC5wcm90b3R5cGUudG9PYmplY3Q7XG5mYWJyaWMuUmVjdC5wcm90b3R5cGUuc3RvcmVQcm9wZXJ0aWVzID0gW1wiKlwiLFwicnhcIixcInJ5XCJdO1xuXG5mYWJyaWMuSU5DTFVERV9BTEwgPSBcIipcIjtcblxudmFyIF90b09iamVjdF9vdmVyd3JpdHRlbiA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnRvT2JqZWN0O1xuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuT2JqZWN0LnByb3RvdHlwZSwge1xuICBldmVudExpc3RlbmVyczoge30sXG4gIHRvT2JqZWN0OiBmdW5jdGlvbiAocHJvcGVydGllc1RvSW5jbHVkZSkge1xuICAgIGlmIChwcm9wZXJ0aWVzVG9JbmNsdWRlID09IGZhYnJpYy5JTkNMVURFX0FMTCkge1xuICAgICAgcHJvcGVydGllc1RvSW5jbHVkZSA9IFtmYWJyaWMuSU5DTFVERV9BTExdO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXNUb0luY2x1ZGUgPSBwcm9wZXJ0aWVzVG9JbmNsdWRlIHx8IFtdO1xuICAgIHByb3BlcnRpZXNUb0luY2x1ZGUgPSBwcm9wZXJ0aWVzVG9JbmNsdWRlLmNvbmNhdCh0aGlzLnN0b3JlUHJvcGVydGllcyk7XG5cblxuICAgIHZhciBvYmogPSBfdG9PYmplY3Rfb3ZlcndyaXR0ZW4uY2FsbCh0aGlzLCBwcm9wZXJ0aWVzVG9JbmNsdWRlKTtcbiAgICBpZiAocHJvcGVydGllc1RvSW5jbHVkZVswXSAhPT0gZmFicmljLklOQ0xVREVfQUxMKSB7XG4gICAgICBpZiAoIXRoaXMuaW5jbHVkZURlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRGVmYXVsdFZhbHVlcyhvYmopO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnN0b3JlUHJvcGVydGllcy5pbmRleE9mKFwiKlwiKSA9PSAtMSkge1xuICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVQcm9wZXJ0aWVzLmluZGV4T2YoaSkgPT0gLTEpIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maXJlKFwiYmVmb3JlOm9iamVjdFwiLCB7b2JqZWN0OiBvYmp9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9LFxuICBzdG9yZVByb3BlcnRpZXM6IFsnKiddLFxuICBvcHRpb25zT3JkZXI6IFtcInNwZWNpYWxQcm9wZXJ0aWVzXCJdLFxuXG4gIC8qKlxuICAgKiBTZXRzIG9iamVjdCdzIHByb3BlcnRpZXMgZnJvbSBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyBvYmplY3RcbiAgICovXG4gIHNldE9wdGlvbnM6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdGhpcy5fc2V0T2JqZWN0KG9wdGlvbnMpO1xuICAgIC8vIHRoaXMuX2luaXRHcmFkaWVudChvcHRpb25zKTtcbiAgICAvLyB0aGlzLl9pbml0UGF0dGVybihvcHRpb25zKTtcbiAgICAvLyB0aGlzLl9pbml0Q2xpcHBpbmcob3B0aW9ucyk7XG4gIH0sXG4gIF9pbml0RW50aXR5OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMuYXBwbGljYXRpb24gJiYgb3B0aW9ucy5hcHBsaWNhdGlvbi5maXJlKFwiZW50aXR5OmNyZWF0ZWRcIiwge3RhcmdldDogdGhpcywgb3B0aW9uczogb3B0aW9uc30pO1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9pbml0RW50aXR5KG9wdGlvbnMpO1xuICAgIC8vIGlmKG9wdGlvbnMud2hvbGVDb29yZGluYXRlcyl7XG4gICAgLy8gICB2YXIgY29vcmRpbmF0ZXMgPSBbXCJsZWZ0XCIsXCJ0b3BcIixcIndpZHRoXCIsXCJoZWlnaHRcIl07XG4gICAgLy8gICBmb3IodmFyIGkgaW4gY29vcmRpbmF0ZXMpe1xuICAgIC8vICAgICBpZihvcHRpb25zW2Nvb3JkaW5hdGVzW2ldXSl7XG4gICAgLy8gICAgICAgb3B0aW9uc1tjb29yZGluYXRlc1tpXV0gPSBNYXRoLnJvdW5kKG9wdGlvbnNbY29vcmRpbmF0ZXNbaV1dKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3NldE9iamVjdChvcHRpb25zLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfc2VsZi5sb2FkZWQgPSB0cnVlO1xuICAgICAgX3NlbGYuZmlyZShcImxvYWRlZFwiKTtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKF9zZWxmKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkOiBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgY2FudmFzLmFkZCh0aGlzKTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5fc2V0T2JqZWN0KGtleSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGtleVswXSA9PSBcIiZcIikge1xuICAgICAgICBrZXkgPSBrZXkuc3Vic3RyKDEpO1xuICAgICAgICB0aGlzLl9zZXQoa2V5LCB2YWx1ZSh0aGlzLmdldChrZXkpKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0KGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxufSk7XG5cblxuXG4vL2ltYWdlc1xuKGZ1bmN0aW9uKCl7XG5cbiAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuSW1hZ2UucHJvdG90eXBlLCB7XG4gICAgYXN5bmM6IHRydWUsXG4gICAgdG9PYmplY3ROYXRpdmU6IGZhYnJpYy5JbWFnZS5wcm90b3R5cGUudG9PYmplY3QsXG4gICAgdG9PYmplY3Q6ICAgICBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9iaiA9IGZhYnJpYy5JbWFnZS5wcm90b3R5cGUudG9PYmplY3ROYXRpdmUuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICAgICAgaWYob2JqLnNyYy5pbmRleE9mKGZhYnJpYy51dGlsLm1lZGlhUm9vdCkgPT0gMCl7XG4gICAgICAgIG9iai5zcmMgPSBvYmouc3JjLnJlcGxhY2UoZmFicmljLnV0aWwubWVkaWFSb290LFwiXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIHRoaXMuZmlsdGVycyA9IFtdO1xuICAgICAgdGhpcy5yZXNpemVGaWx0ZXJzID0gW107XG5cblxuICAgICAgaWYgKG9wdGlvbnMub3JpZ2luYWxTcmMpIHtcbiAgICAgICAgdGhpcy5fZWRpdGVkID0gdHJ1ZTtcbiAgICAgICAgZmFicmljLnV0aWwubG9hZEltYWdlKG9wdGlvbnMub3JpZ2luYWxTcmMsIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnQgPSBpbWc7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2luaXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMsIGNhbGxiYWNrICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgICB9LmJpbmQodGhpcykpOy8vYWRkaW5nIGNhbGxiYWNrXG4gICAgfSxcbiAgICBfaW5pdEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KGZhYnJpYy51dGlsLmdldEJ5SWQoZWxlbWVudCksIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgIGZhYnJpYy51dGlsLmFkZENsYXNzKHRoaXMuZ2V0RWxlbWVudCgpLCBmYWJyaWMuSW1hZ2UuQ1NTX0NBTlZBUyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBTZXRzIGNyb3NzT3JpZ2luIHZhbHVlIChvbiBhbiBpbnN0YW5jZSBhbmQgY29ycmVzcG9uZGluZyBpbWFnZSBlbGVtZW50KVxuICAgICAqIEByZXR1cm4ge2ZhYnJpYy5JbWFnZX0gdGhpc0FyZ1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzZXRDcm9zc09yaWdpbjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLmNyb3NzT3JpZ2luID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNyb3NzT3JpZ2luID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHNldEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucykge1xuXG4gICAgICB2YXIgX2NhbGxiYWNrLCBfdGhpcztcblxuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgdGhpcy5faW5pdENvbmZpZyhvcHRpb25zKTtcbiAgICAgIC8vIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zICk7XG4gICAgICAvLyB0aGlzLl9zZXRXaWR0aEhlaWdodCh0aGlzKTtcbiAgICAgIC8vIGlmICh0aGlzLl9lbGVtZW50ICYmIHRoaXMuY3Jvc3NPcmlnaW4pIHtcbiAgICAgIC8vICAgdGhpcy5fZWxlbWVudC5jcm9zc09yaWdpbiA9IHRoaXMuY3Jvc3NPcmlnaW47XG4gICAgICAvLyB9XG5cblxuICAgICAgaWYgKHRoaXMucmVzaXplRmlsdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgICBfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuYXBwbHlGaWx0ZXJzKGNhbGxiYWNrLCBfdGhpcy5yZXNpemVGaWx0ZXJzLCBfdGhpcy5fZmlsdGVyZWRFbCB8fCBfdGhpcy5fb3JpZ2luYWxFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoX2NhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9jYWxsYmFjaykge1xuICAgICAgICBfY2FsbGJhY2sodGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSk7XG5cbiAgZmFicmljLnV0aWwuaW5pdEZpbHRlcnMgPSBmdW5jdGlvbiAoaW1nLCBvYmplY3QsIGNhbGxiYWNrKSB7XG5cbiAgICAvLyBpZiAoZmFicmljLnZlcnNpb24gPj0gMS42KSB7XG4gICAgZmFicmljLkltYWdlLnByb3RvdHlwZS5faW5pdEZpbHRlcnMuY2FsbChvYmplY3QsIG9iamVjdC5maWx0ZXJzLCBmdW5jdGlvbiAoZmlsdGVycykge1xuICAgICAgb2JqZWN0LmZpbHRlcnMgPSBmaWx0ZXJzIHx8IFtdO1xuICAgICAgZmFicmljLkltYWdlLnByb3RvdHlwZS5faW5pdEZpbHRlcnMuY2FsbChvYmplY3QsIG9iamVjdC5yZXNpemVGaWx0ZXJzLCBmdW5jdGlvbiAocmVzaXplRmlsdGVycykge1xuICAgICAgICBvYmplY3QucmVzaXplRmlsdGVycyA9IHJlc2l6ZUZpbHRlcnMgfHwgW107XG4gICAgICAgIGNhbGxiYWNrKGltZywgb2JqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBmYWJyaWMuSW1hZ2UucHJvdG90eXBlLl9pbml0RmlsdGVycy5jYWxsKG9iamVjdCwgb2JqZWN0LCBmdW5jdGlvbiAoZmlsdGVycykge1xuICAgIC8vICAgICBvYmplY3QuZmlsdGVycyA9IGZpbHRlcnMgfHwgW107XG4gICAgLy8gICAgIGNhbGxiYWNrKGltZywgb2JqZWN0KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgfTtcblxuICBmYWJyaWMudXRpbC5pbml0SW1hZ2VBbmRGaWx0ZXJzID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICBpZiAob2JqZWN0LnNyYykge1xuICAgICAgZmFicmljLnV0aWwubG9hZEltYWdlKG9iamVjdC5zcmMsIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgZGVsZXRlIG9iamVjdC5zcmM7XG4gICAgICAgIGZhYnJpYy51dGlsLmluaXRGaWx0ZXJzKGltZywgb2JqZWN0LCBjYWxsYmFjayk7XG4gICAgICB9LCBudWxsLCBvYmplY3QuY3Jvc3NPcmlnaW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWJyaWMudXRpbC5pbml0RmlsdGVycyhudWxsLCBvYmplY3QsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgZmFicmljLkltYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgIGZhYnJpYy51dGlsLmluaXRJbWFnZUFuZEZpbHRlcnMob2JqZWN0LCBmdW5jdGlvbiAoaW1nLCBvYmplY3QpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBmYWJyaWMuSW1hZ2UoaW1nLCBvYmplY3QsIGNhbGxiYWNrKTtcbiAgICB9KVxuICB9O1xuXG5cbiAgZmFicmljLkltYWdlLnByb3RvdHlwZS5fdG9fb2JqZWN0X292ZXJ3cml0dGVuID0gZmFicmljLkltYWdlLnByb3RvdHlwZS50b09iamVjdDtcbiAgZmFicmljLkltYWdlLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uIChvcHQpIHtcbiAgICB2YXIgb2JqID0gZmFicmljLkltYWdlLnByb3RvdHlwZS5fdG9fb2JqZWN0X292ZXJ3cml0dGVuLmNhbGwodGhpcywgb3B0KTtcblxuXG4gICAgaWYgKHRoaXMuX2VkaXRlZCkge1xuICAgICAgb2JqLm9yaWdpbmFsU3JjID0gdGhpcy5fb3JpZ2luYWxfc3JjIHx8IHRoaXMuX29yaWdpbmFsRWxlbWVudC5zcmMgfHwgdGhpcy5fZWxlbWVudC5zcmM7XG4gICAgICBvYmouc3JjID0gdGhpcy5fZWxlbWVudC5zcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iai5zcmMgPSB0aGlzLl9vcmlnaW5hbF9zcmMgfHwgdGhpcy5fb3JpZ2luYWxFbGVtZW50LnNyYyB8fCB0aGlzLl9lbGVtZW50LnNyYztcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udGVudE9mZnNldHMpIHtcbiAgICAgIG9iai5jb250ZW50T2Zmc2V0cyA9IHRoaXMuY29udGVudE9mZnNldHM7XG4gICAgfVxuXG5cbiAgICBpZiAoIXRoaXMuaW5jbHVkZURlZmF1bHRWYWx1ZXMpIHtcbiAgICAgIGlmICghb2JqLmZpbHRlcnMubGVuZ3RoKWRlbGV0ZSBvYmouZmlsdGVycztcbiAgICB9XG4gICAgLy9pZih0aGlzLl9vcmlnaW5hbEVsZW1lbnQpe1xuICAgIC8vICAgIG9iai50aHVtYiA9IHRoaXMuX2VsZW1lbnQuc3JjO1xuICAgIC8vfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxufSkoKTtcblxuKGZ1bmN0aW9uKCl7XG5cbiAgLy9mYWJyaWMucmVxdWlyZSgnU2xpZGVUZXh0JywgWydTbGlkZU9iamVjdCddLCBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0SW5pdGlhbGl6ZSA9IGZhYnJpYy5UZXh0LnByb3RvdHlwZS5pbml0aWFsaXplO1xuXG4gIGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLlRleHQucHJvdG90eXBlLCB7XG4gICAgdGV4dEluaXRpYWxpemU6IHRleHRJbml0aWFsaXplLFxuICAgIGVkaXRUb29sOiBmYWxzZSxcbiAgICBhZHZhbmNlZENvbG9yc1Rvb2xzOiBmYWxzZSxcbiAgICB0ZXh0Rm9udFNpemVUb29sczogZmFsc2UsXG4gICAgdGV4dEFsaWdtZW50VG9vbHM6IGZhbHNlLFxuICAgIGFkdmFuY2VkVGV4dFN0eWxlVG9vbHM6IGZhbHNlLFxuICAgIHJhc3Rlcml6ZVRvb2w6IGZhbHNlLFxuICAgIHJhc3Rlcml6ZUtsYXNzOiBmYWJyaWMuSW1hZ2UsXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICh0ZXh0LCBvcHRpb25zKSB7XG4gICAgICB0aGlzLl9pbml0RW50aXR5KG9wdGlvbnMpO1xuICAgICAgdGhpcy50ZXh0SW5pdGlhbGl6ZSh0ZXh0LCBvcHRpb25zKTtcbiAgICAgIC8vIHRoaXMudXBkYXRlQ2FjaGUoKTtcbiAgICB9XG4gIH0pO1xuXG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL29iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGV2ZW50TGlzdGVuZXIgPSB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgaWYgKGhhbmRsZXIpIHtcbiAgICBldmVudExpc3RlbmVyLnNwbGljZShldmVudExpc3RlbmVyLmluZGV4T2YoaGFuZGxlciksIDEpXG4gIH1cbiAgZWxzZSB7XG4gICAgZXZlbnRMaXN0ZW5lci5sZW5ndGggPSAwO1xuICB9XG59XG5cbmZhYnJpYy5DYW52YXMucHJvdG90eXBlLnN0b3BPYnNlcnZpbmcgPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5zdG9wT2JzZXJ2aW5nID0gZnVuY3Rpb24gc3RvcE9ic2VydmluZyhldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyByZW1vdmUgYWxsIGtleS92YWx1ZSBwYWlycyAoZXZlbnQgbmFtZSAtPiBldmVudCBoYW5kbGVyKVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoZXZlbnROYW1lIGluIHRoaXMuX19ldmVudExpc3RlbmVycykge1xuICAgICAgX3JlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudE5hbWUpO1xuICAgIH1cbiAgfVxuICAvLyBvbmUgb2JqZWN0IHdpdGgga2V5L3ZhbHVlIHBhaXJzIHdhcyBwYXNzZWRcbiAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIHByb3AgaW4gZXZlbnROYW1lKSB7XG4gICAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIHByb3AsIGV2ZW50TmFtZVtwcm9wXSk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIF9yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuXG5mYWJyaWMuT2JzZXJ2YWJsZS5vbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLm9uID0gZmFicmljLk9iamVjdC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyLHByaW9yaXR5KSB7XG4gIGlmIChldmVudE5hbWUuY29uc3RydWN0b3IgPT0gT2JqZWN0KSB7XG4gICAgZm9yICh2YXIgaSBpbiBldmVudE5hbWUpIHtcbiAgICAgIHRoaXMub24oaSwgZXZlbnROYW1lW2ldLHByaW9yaXR5KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgZXZlbnRzID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgZm9yICh2YXIgaSBpbiBldmVudHMpIHtcbiAgICBldmVudE5hbWUgPSBldmVudHNbaV07XG4gICAgdGhpcy5vYnNlcnZlKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgaWYocHJpb3JpdHkpe1xuICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0udW5zaGlmdCh0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5wb3AoKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcbmZhYnJpYy5DYW52YXMucHJvdG90eXBlLm9mZiA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gIGZvciAodmFyIGkgaW4gZXZlbnRzKSB7XG4gICAgdGhpcy5zdG9wT2JzZXJ2aW5nKGV2ZW50c1tpXSwgaGFuZGxlcilcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblxuZmFicmljLkNhbnZhcy5wcm90b3R5cGUuZmlyZSA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiBmaXJlKGV2ZW50TmFtZSwgb3B0aW9ucykge1xuICBpZiAoIXRoaXMuX19ldmVudExpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnNGb3JFdmVudCA9IHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdO1xuICBpZiAobGlzdGVuZXJzRm9yRXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGlzdGVuZXJzRm9yRXZlbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc0ZvckV2ZW50W2ldLmNhbGwodGhpcywgb3B0aW9ucyB8fCB7fSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxpc3RlbmVyc0ZvckV2ZW50QWxsID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzWycqJ107XG4gIGlmIChsaXN0ZW5lcnNGb3JFdmVudEFsbCkge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgIG9wdGlvbnMubGlzdGVuZXJzID0gbGlzdGVuZXJzRm9yRXZlbnQ7XG4gICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzRm9yRXZlbnRBbGwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc0ZvckV2ZW50QWxsW2ldLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL29ic2VydmUuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZhYnJpYy5QbHVnaW5zTWl4aW4gPSB7XG4gIHJ1blBsdWdpbnM6IGZ1bmN0aW9uIChwbHVnaW5UeXBlcywgcmVzb2x2ZSwgZXJyb3IpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwbHVnaW5zID0gdGhpcy5wbHVnaW5zW3BsdWdpblR5cGVzXS5tYXAoZnVuY3Rpb24oZm9vKXtcbiAgICAgIHZhciBsID0gZm9vLmxlbmd0aDtcbiAgICAgIGlmKCFmb28ubGVuZ3RoKXtcbiAgICAgICAgdmFyIF9yZXN1bHQgPSBmb28uY2FsbChzZWxmKTtcbiAgICAgICAgLy8gKF9yZXN1bHQgfHwgX3Jlc3VsdCA9PT0gdW5kZWZpbmVkKSA/IHJlc29sdmUoKSA6IGZhaWwoKTtcbiAgICAgICAgcmV0dXJuIF9yZXN1bHQ7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZvbztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvcih2YXIgaSA9IHBsdWdpbnMubGVuZ3RoIDsgaS0tOyl7XG4gICAgICBpZih0eXBlb2YgcGx1Z2luc1tpXSAhPT0gXCJmdW5jdGlvblwiKXtcbiAgICAgICAgcGx1Z2lucy5zcGxpY2UoaSwxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocGx1Z2lucy5sZW5ndGgpIHtcbiAgICAgIHZhciB3cmFwID0gZmFicmljLnV0aWwucHJvbWlzZS53cmFwKHRoaXMpO1xuICAgICAgdmFyIF9jb3VudGVyID0gcGx1Z2lucy5sZW5ndGg7XG4gICAgICBmb3IodmFyIGkgaW4gcGx1Z2lucyl7XG4gICAgICAgIHBsdWdpbnNbaV0uY2FsbChzZWxmLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYoIS0tX2NvdW50ZXIpe1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9XG5cbiAgfSxcbiAgYWRkUGx1Z2luOiBmdW5jdGlvbiAodHlwZSwgbmFtZSkge1xuICAgIGlmKG5hbWUuY29uc3RydWN0b3IgPT0gU3RyaW5nKXtcbiAgICAgIHRoaXMucHJvdG90eXBlLnBsdWdpbnNbdHlwZV0ucHVzaCh0aGlzLnByb3RvdHlwZVtuYW1lXSk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLnByb3RvdHlwZS5wbHVnaW5zW3R5cGVdLnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL3BsdWdpbnNNaXhpbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5mYWJyaWMuQXBwbGljYXRpb24ucHJvdG90eXBlLmV2ZW50TGlzdGVuZXJzW1wiZW50aXR5OmNyZWF0ZWRcIl0ucHVzaChmdW5jdGlvbihlKXtcbiAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXG4gIHRhcmdldC5hcHBsaWNhdGlvbiA9IHRoaXM7XG4gIGZhYnJpYy51dGlsLm9iamVjdC5kZWZhdWx0cyhlLm9wdGlvbnMsIHRoaXMuZ2V0RGVmYXVsdFByb3BlcnRpZXModGFyZ2V0LGUub3B0aW9ucykpO1xuXG4gIGZvcih2YXIga2V5IGluIGUub3B0aW9ucyl7XG4gICAgdmFyIHZhbHVlID0gZS5vcHRpb25zW2tleV07XG4gICAgaWYoa2V5WzBdID09IFwiK1wiKXtcbiAgICAgIHZhciBfa2V5ID0ga2V5LnN1YnN0cigxKTtcbiAgICAgIHZhciBfYXJyID0gdGFyZ2V0LmdldChfa2V5KTtcbiAgICAgIGlmKF9hcnIgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgIF9hcnIgPSBfYXJyLnNsaWNlKCkuY29uY2F0KHZhbHVlKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBfYXJyID0gZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZCh7fSxfYXJyLHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGUub3B0aW9uc1tfa2V5XSA9IF9hcnI7XG4gICAgICBkZWxldGUgZS5vcHRpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlIGUub3B0aW9ucy50eXBlO1xuICBkZWxldGUgZS5vcHRpb25zLmFwcGxpY2F0aW9uO1xufSk7XG5cblxuXG5cblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuQXBwbGljYXRpb24ucHJvdG90eXBlLCB7XG4gIGdldERlZmF1bHRQcm9wZXJ0aWVzOiBmdW5jdGlvbihwcm90byl7XG4gICAgaWYoIXRoaXMucHJvdG90eXBlcylyZXR1cm47XG5cbiAgICB2YXIga2xhc3NuYW1lID0gZmFicmljLnV0aWwuc3RyaW5nLmNhcGl0YWxpemUoZmFicmljLnV0aWwuc3RyaW5nLmNhbWVsaXplKHByb3RvLnR5cGUpLHRydWUpO1xuXG4gICAgdmFyIF9wcm90b1Byb3BlcnRpZXMgPSBwcm90by5fX3Byb3RvX18gJiYgcHJvdG8uX19wcm90b19fLnR5cGUgJiYgdGhpcy5nZXREZWZhdWx0UHJvcGVydGllcyhwcm90by5fX3Byb3RvX18pIHx8IHt9O1xuICAgIHZhciBfZGVmYXVsdFByb3BlcnRpZXMgPSBmYWJyaWMudXRpbC5vYmplY3QuY2xvbmUodGhpcy5wcm90b3R5cGVzW2tsYXNzbmFtZV0pO1xuXG4gICAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChfcHJvdG9Qcm9wZXJ0aWVzLF9kZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgICByZXR1cm4gX3Byb3RvUHJvcGVydGllcztcbiAgfSxcbiAgLyoqXG4gICAqIGRlZmF1bHQgcHJvdG90eXBlcyBwcm9wZXJ0ZXMgZm9yIG9iamVjdHNcbiAgICovXG4gIHByb3RvdHlwZXM6IHtcbiAgICBPYmplY3Q6IHtcbiAgICAgIGluY2x1ZGVEZWZhdWx0VmFsdWVzOiBmYWxzZVxuICAgIH0sXG4gICAgQ2FudmFzOiB7XG4gICAgICBpbmNsdWRlRGVmYXVsdFZhbHVlczogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGluaXRVdGlsczogZnVuY3Rpb24gKCkge1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy51dGlsKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZCh0aGlzLnV0aWwgfHwge30sdGhpcy5vcHRpb25zLnV0aWwpO1xuXG4gICAgdmFyIF9tZWRpYVJvb3QgPSB0aGlzLm9wdGlvbnMudXRpbC5tZWRpYVJvb3Q7XG4gICAgaWYoX21lZGlhUm9vdCl7XG4gICAgICBpZigoX21lZGlhUm9vdC5pbmRleE9mKFwiLi9cIikgPT0gMCkpe1xuICAgICAgICB2YXIgX2Rpcm5hbWU7XG4gICAgICAgIGlmKGZhYnJpYy5pc0xpa2VseU5vZGUpe1xuICAgICAgICAgIF9kaXJuYW1lID0gX19kaXJuYW1lO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBfZGlybmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIvLi4vXCJcbiAgICAgICAgfVxuICAgICAgICBfbWVkaWFSb290ID0gZmFicmljLnV0aWwucGF0aC5yZXNvbHZlKF9kaXJuYW1lICsgX21lZGlhUm9vdCk7XG4gICAgICB9XG4gICAgICB2YXIgX2xhc3QgPSBfbWVkaWFSb290W19tZWRpYVJvb3QubGVuZ3RoIC0gMV07XG4gICAgICBpZihfbGFzdCAhPSBcIi9cIiAmJiBfbGFzdCAhPSBcIlxcXFxcIil7XG4gICAgICAgIF9tZWRpYVJvb3QgKz1cIi9cIlxuICAgICAgfVxuICAgICAgX21lZGlhUm9vdCA9IGZhYnJpYy51dGlsLnBhdGgucmVzb2x2ZShfZGlybmFtZSArIF9tZWRpYVJvb3QpO1xuICAgICAgZmFicmljLnV0aWwubWVkaWFSb290ID0gX21lZGlhUm9vdDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zWyd1dGlsJ10pIHtcbiAgICAgIGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLnV0aWwsIHRoaXMub3B0aW9uc1sndXRpbCddKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9uc1snZmFicmljJ10pIHtcbiAgICAgIGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLCB0aGlzLm9wdGlvbnNbJ2ZhYnJpYyddKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMub3B0aW9uc1snZmFicmljJ107XG4gICAgZGVsZXRlIHRoaXMub3B0aW9uc1sndXRpbCddO1xuICB9LFxuICBpbml0UHJvdG90eXBlczogZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIF9wcm90b3R5cGVzID0gZmFicmljLnV0aWwub2JqZWN0LmRlZXBFeHRlbmQoe30sIHRoaXMucHJvdG90eXBlcyAsdGhpcy5vcHRpb25zLnByb3RvdHlwZXMpO1xuXG4gICAgdGhpcy5wcm90b3R5cGVzID0gX3Byb3RvdHlwZXM7XG4gICAgdGhpcy5rbGFzc2VzID0ge307XG5cblxuICAgIGlmKF9wcm90b3R5cGVzLmV2ZW50TGlzdGVuZXJzKXtcbiAgICAgIF9wcm90b3R5cGVzLmV2ZW50TGlzdGVuZXJzLiRleHRlbmQgPSAnYXJyYXknO1xuICAgIH1cblxuICAgIGZvciAodmFyIGtsYXNzTmFtZSBpbiBfcHJvdG90eXBlcykge1xuICAgICAgdmFyIF9wcm90byA9IF9wcm90b3R5cGVzW2tsYXNzTmFtZV07XG5cbiAgICAgIGZvciAodmFyIGogaW4gX3Byb3RvKSB7XG4gICAgICAgIGlmIChfcHJvdG9bal0gJiYgX3Byb3RvW2pdW1wiJGV4dGVuZFwiXSkge1xuICAgICAgICAgIHZhciBfZXh0ZW5kID0gX3Byb3RvW2pdW1wiJGV4dGVuZFwiXTtcbiAgICAgICAgICBpZiggX2V4dGVuZCA9PSBcImFycmF5XCIpe1xuICAgICAgICAgICAgX3Byb3RvW2pdID0gZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZEFycmF5c09iamVjdChmYWJyaWNba2xhc3NOYW1lXS5wcm90b3R5cGVbal0sX3Byb3RvW2pdKTtcbiAgICAgICAgICB9IGVsc2UgaWYoIF9leHRlbmQgPT0gXCJkZWVwXCIpe1xuICAgICAgICAgICAgX3Byb3RvW2pdID0gZmFicmljLnV0aWwub2JqZWN0LmRlZXBFeHRlbmQoZmFicmljW2tsYXNzTmFtZV0ucHJvdG90eXBlW2pdLF9wcm90b1tqXSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBfcHJvdG9bal0gPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpY1trbGFzc05hbWVdLnByb3RvdHlwZVtqXSxfcHJvdG9bal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgX3Byb3RvW2pdW1wiJGV4dGVuZFwiXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIGlmKF9wcm90b1tcIiRzdXBlclwiXSl7XG4gICAgICAgIHZhciBfc3VwZXJrbGFzcyA9IGZhYnJpY1tfcHJvdG9bXCIkc3VwZXJcIl0gfHwga2xhc3NOYW1lXSA7XG4gICAgICAgIGRlbGV0ZSBfcHJvdG9bXCIkc3VwZXJcIl07XG5cbiAgICAgICAgdmFyIF9mcm9tT2JqZWN0ID0gX3Byb3RvLmZyb21PYmplY3QgfHwgX3N1cGVya2xhc3MuZnJvbU9iamVjdCA7XG4gICAgICAgIGRlbGV0ZSBfcHJvdG8uZnJvbU9iamVjdDtcbiAgICAgICAgdmFyIF9rbGFzcyA9IHRoaXMua2xhc3Nlc1trbGFzc05hbWVdID0gZmFicmljLnV0aWwuY3JlYXRlQ2xhc3MoX3N1cGVya2xhc3MsIF9wcm90byk7XG4gICAgICAgIF9rbGFzcy5mcm9tT2JqZWN0ID0gX2Zyb21PYmplY3QuYmluZChfa2xhc3MpO1xuICAgICAgfVxuXG4gICAgLy8gICBpZiAoa2xhc3NOYW1lLmFjdGlvbnMgJiYgX3Byb3RvLmFjdGlvbnMuY29uc3RydWN0b3IgPT0gRnVuY3Rpb24pIHtcbiAgICAvLyAgICAgZmFicmljW2tsYXNzTmFtZV0ucHJvdG90eXBlLmFjdGlvbnMgPSBfcHJvdG8uYWN0aW9ucy5jYWxsKGZhYnJpY1trbGFzc05hbWVdLnByb3RvdHlwZSlcbiAgICAvLyAgIH1cbiAgICB9XG5cbiAgICBpZiAoX3Byb3RvdHlwZXMuQXBwbGljYXRpb24pIHtcbiAgICAgIGZhYnJpYy51dGlsLm9iamVjdC5kZWVwRXh0ZW5kKHRoaXMsIF9wcm90b3R5cGVzLkFwcGxpY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBkZWxldGUgdGhpcy5vcHRpb25zWydwcm90b3R5cGVzJ107XG5cbiAgICBpZiAodGhpcy5hY3Rpb25zICYmIHRoaXMuYWN0aW9ucy5jb25zdHJ1Y3RvciA9PSBGdW5jdGlvbikge1xuICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5hY3Rpb25zLmNhbGwodGhpcylcbiAgICB9XG4gIH1cbn0pO1xuXG5mYWJyaWMuQXBwbGljYXRpb25cbiAgLmFkZFBsdWdpbihcImNvbmZpZ3VyYXRpb25cIixcImluaXRVdGlsc1wiKVxuICAuYWRkUGx1Z2luKFwiY29uZmlndXJhdGlvblwiLFwiaW5pdFByb3RvdHlwZXNcIik7XG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL3Byb3RvdHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy9yZXF1aXJlKFwiLi9zdGF0aWNDYW52YXNcIik7XG5cbmZhYnJpYy5TbGlkZUNhbnZhcyA9IGZhYnJpYy51dGlsLmNyZWF0ZUNsYXNzKGZhYnJpYy5DYW52YXMsZmFicmljLlBsdWdpbnNNaXhpbiwge1xuICB0eXBlOiAnc2xpZGUtY2FudmFzJyxcbiAgX2NyZWF0ZVVwcGVyQ2FudmFzTmF0aXZlOiBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5fY3JlYXRlVXBwZXJDYW52YXMsXG4gIHdpZHRoOiAxNjAgLFxuICBoZWlnaHQ6IDkwLFxuICBkb3RzUGVyVW5pdDogMSxcbiAgc2NhbGU6IDEsXG4gIGxvYWRlZDogZmFsc2UsXG4gIGluc2VydEJhY2tncm91bmRDb2xvcjogZmFsc2UsXG4gIHBsdWdpbnM6IHtcbiAgICBpbml0aWFsaXplOiBbXG4gICAgICBmdW5jdGlvbiBpbml0Wm9vbWluZyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlQ2xpcEFyZWFab29taW5nICYmIHRoaXMuZW5hYmxlQ2xpcEFyZWFab29taW5nKCk7XG4gICAgICB9XG4gICAgXSxcbiAgICBwcmVsb2FkZXJzOiBbXG4gICAgICBmdW5jdGlvbiBpbml0VGVtcGxhdGUob3B0aW9ucyl7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgJiYgdGhpcy5zZXRUZW1wbGF0ZSh0aGlzLnRlbXBsYXRlKTtcbiAgICAgIH1cbiAgICBdLFxuICAgIGxvYWRlcnM6IFtdLFxuICAgIHNhdmVycyA6IFtcbiAgICAgIGZ1bmN0aW9uIHNlcmlhbGl6ZVRodW1iKHByb3BlcnRpZXNUb0luY2x1ZGUsIF9kYXRhKXtcbiAgICAgICAgaWYocHJvcGVydGllc1RvSW5jbHVkZS5pbmRleE9mKCd0aHVtYicpICE9PSAtMSl7XG4gICAgICAgICAgdmFyIHNpemUgPSBmYWJyaWMudXRpbC5nZXRQcm9wb3J0aW9ucyh0aGlzLmdldE9yaWdpbmFsU2l6ZSgpLCB0aGlzLnRodW1iU2l6ZSwgJ2ZpdCcpO1xuICAgICAgICAgIHZhciBjYW52YXMgPSBmYWJyaWMudXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgICAgICAgY2FudmFzLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgdGhpcy5yZW5kZXJUaHVtYihjYW52YXMpO1xuICAgICAgICAgIF9kYXRhLnRodW1iID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gc2VyaWFsaXplVGVtcGxhdGUocHJvcGVydGllc1RvSW5jbHVkZSwgX2RhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb0luY2x1ZGUuaW5kZXhPZigndGVtcGxhdGUnKSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBfZGF0YS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoX2RhdGFbaV0pID09IEpTT04uc3RyaW5naWZ5KF9kYXRhLnRlbXBsYXRlW2ldKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfZGF0YVtpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2RhdGEudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlLmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgc2V0SW50ZXJhY3RpdmU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB2YWx1ZTtcbiAgfSwgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyBvYmplY3RcbiAgICovXG4gIF9pbml0T3B0aW9uczogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLndpZHRoID0gdGhpcy53aWR0aCB8fCBwYXJzZUludCh0aGlzLmxvd2VyQ2FudmFzRWwud2lkdGgsIDEwKSB8fCAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgfHwgcGFyc2VJbnQodGhpcy5sb3dlckNhbnZhc0VsLmhlaWdodCwgMTApIHx8IDA7XG5cbiAgICBpZiAoIXRoaXMubG93ZXJDYW52YXNFbC5zdHlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG93ZXJDYW52YXNFbC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgdGhpcy5sb3dlckNhbnZhc0VsLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5sb3dlckNhbnZhc0VsLnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XG4gICAgdGhpcy5sb3dlckNhbnZhc0VsLnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJ3B4JztcblxuICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm0gPSB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLnNsaWNlKCk7XG4gIH0sXG4gIGNvbnRleHRUb3BJbWFnZVNtb290aGluZ0VuYWJsZWQ6IHRydWUsXG4gIF9jcmVhdGVVcHBlckNhbnZhczogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NyZWF0ZVVwcGVyQ2FudmFzTmF0aXZlKCk7XG4gICAgdmFyIGN0eCA9IHRoaXMuY29udGV4dFRvcDtcblxuICAgIGlmKGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQpe1xuICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuY29udGV4dFRvcEltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3R4LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRoaXMuY29udGV4dFRvcEltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICBjdHgubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkICAgID0gdGhpcy5jb250ZXh0VG9wSW1hZ2VTbW9vdGhpbmdFbmFibGVkO1xuICAgIGN0eC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCAgICAgPSB0aGlzLmNvbnRleHRUb3BJbWFnZVNtb290aGluZ0VuYWJsZWQ7XG4gICAgY3R4Lm9JbWFnZVNtb290aGluZ0VuYWJsZWQgICAgICA9IHRoaXMuY29udGV4dFRvcEltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgfSxcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgRXZlbnQgb2JqZWN0IGZpcmVkIG9uIG1vdXNldXBcbiAgICovXG4gIF9vbk1vdXNlVXBJbkRyYXdpbmdNb2RlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5faXNDdXJyZW50bHlEcmF3aW5nID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY2xpcFRvKSB7XG4gICAgICB0aGlzLmNvbnRleHRUb3AucmVzdG9yZSgpO1xuICAgIH1cbiAgICB2YXIgcG9pbnRlciA9IHRoaXMuZ2V0UG9pbnRlcihlKTtcbiAgICB0aGlzLmZyZWVEcmF3aW5nQnJ1c2gub25Nb3VzZVVwKHBvaW50ZXIpO1xuICAgIHRoaXMuX2hhbmRsZUV2ZW50KGUsICd1cCcpO1xuICB9LFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoZWwsIG9wdGlvbnMsY2FsbGJhY2spIHtcbiAgICBpZihlbCAmJiBlbC5jb25zdHJ1Y3RvciA9PSBPYmplY3Qpe1xuICAgICAgY2FsbGJhY2s9IG9wdGlvbnM7XG4gICAgICBvcHRpb25zID0gZWw7XG4gICAgICBlbCA9IG51bGw7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cbiAgICBpZihvcHRpb25zLnByb2plY3Qpe1xuICAgICAgaWYoIW9wdGlvbnMuYXBwbGljYXRpb24pe1xuICAgICAgICBvcHRpb25zLmFwcGxpY2F0aW9uID0gb3B0aW9ucy5wcm9qZWN0LmFwcGxpY2F0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKG9wdGlvbnMuYXBwbGljYXRpb24pe1xuICAgICAgb3B0aW9ucy5hcHBsaWNhdGlvbi5maXJlKFwiZW50aXR5OmNyZWF0ZWRcIix7dGFyZ2V0IDogdGhpcyAsIG9wdGlvbnMgOiBvcHRpb25zfSk7XG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IGZhYnJpYy5TbGlkZUNhbnZhcy5fX2lkY291bnRlcisrO1xuXG4gICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuX2NyZWF0ZUxvd2VyQ2FudmFzKGVsKTtcblxuXG4gICAgaWYoIXRoaXMudmlydHVhbCl7XG4gICAgICB0aGlzLmNyZWF0ZWQgPSB0cnVlO1xuXG5cbiAgICAgIHRoaXMuX2N1cnJlbnRUcmFuc2Zvcm0gPSBudWxsO1xuICAgICAgdGhpcy5fZ3JvdXBTZWxlY3RvciA9IG51bGw7XG4gICAgICB0aGlzLl9pbml0V3JhcHBlckVsZW1lbnQoKTtcbiAgICAgIHRoaXMuX2NyZWF0ZVVwcGVyQ2FudmFzKCk7XG4gICAgICB0aGlzLl9pbml0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuX2luaXRSZXRpbmFTY2FsaW5nKCk7XG4gICAgICB0aGlzLmNhbGNPZmZzZXQoKTtcbiAgICAgdGhpcy5pbml0TGF5ZXJzKCk7XG5cblxuXG4gICAgICB0aGlzLl9jcmVhdGVDYWNoZUNhbnZhcygpO1xuICAgICAgdGhpcy5fc2V0SW1hZ2VTbW9vdGhpbmcoKTtcbiAgICAgIHRoaXMuX2luaXRSZXRpbmFTY2FsaW5nKCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmluaXRMYXllcnMoKTtcbiAgICB9XG5cbiAgICB0aGlzLnBsdWdpbnMuaW5pdGlhbGl6ZS5mb3JFYWNoKGZ1bmN0aW9uKGluaXRpYWxpemVyKXtcbiAgICAgIGluaXRpYWxpemVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIGlmKG9wdGlvbnNbXCIrYWN0aW9uc1wiXSkge1xuICAgICAgdGhpcy5zZXQoXCIrYWN0aW9uc1wiLCBvcHRpb25zW1wiK2FjdGlvbnNcIl0pXG4gICAgfVxuICAgIGlmKG9wdGlvbnMuYWN0aW9ucyl7XG4gICAgICB0aGlzLnNldChcImFjdGlvbnNcIixvcHRpb25zLmFjdGlvbnMpXG4gICAgfVxuXG5cbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMub25SZXNpemUpe1xuICAgICAgdGhpcy5vblJlc2l6ZSA9IG9wdGlvbnMub25SZXNpemU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdEFuaW1GcmFtZSkge1xuICAgICAgdGhpcy5hZGRWaWRlb3NTdXBwb3J0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdE9wdGlvbnMoKTtcblxuICAgIHRoaXMuX3NldE9iamVjdChvcHRpb25zKTtcblxuICAgIHRoaXMuY2FsY09mZnNldCgpO1xuXG4gICAgdGhpcy5vbih7XG4gICAgICAnb2JqZWN0Om1vdmluZyc6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdGhpcy5maXJlKCd0YXJnZXQ6bW9kaWZpZWQnLCB0aGlzLCBvYmopXG4gICAgICB9LFxuICAgICAgJ3NlbGVjdGlvbjpjbGVhcmVkJzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmKCF0aGlzLnRhcmdldClyZXR1cm47XG4gICAgICAgIHRoaXMudGFyZ2V0LmZpcmUoJ2Rlc2VsZWN0ZWQnLCBldmVudCk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5maXJlKCd0YXJnZXQ6Y2xlYXJlZCcsIGV2ZW50KTtcbiAgICAgIH0sXG4gICAgICAnb2JqZWN0OnNlbGVjdGVkJzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZpb3VzID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihldmVudC5wcmV2aW91cyl7XG4gICAgICAgICAgZXZlbnQucHJldmlvdXMuZmlyZSgnZGVzZWxlY3RlZCcsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpcmUoJ3RhcmdldDpjaGFuZ2VkJywgZXZlbnQpO1xuICAgICAgfSxcbiAgICAgICdncm91cDpzZWxlY3RlZCc6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5maXJlKCd0YXJnZXQ6Y2hhbmdlZCcsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHRoaXMubG9hZChvcHRpb25zLGNhbGxiYWNrKTtcblxuICAgIHRoaXMuZmlyZShcImNyZWF0ZWRcIik7XG4gICAgLy8gaWYodGhpcy5hcHBsaWNhdGlvbil7XG4gICAgLy8gICB0aGlzLmFwcGxpY2F0aW9uLmZpcmUoXCJjYW52YXM6Y3JlYXRlZFwiLHt0YXJnZXQgOiB0aGlzfSk7XG4gICAgLy8gfVxuICB9LFxuICBpbml0TGF5ZXJzOiBmdW5jdGlvbigpe1xuICAgIGlmKHRoaXMudXBwZXJDYW52YXNFbCl7XG4gICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnVwcGVyQ2FudmFzRWwpO1xuICAgIH1cblxuXG4gICAgLy90b2RvIGZyb20gbGF5ZXJzIG1vZHVsZVxuXG5cbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jcmVhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbml0SW50ZXJhY3RpdmUoKTtcbiAgICB0aGlzLl9jcmVhdGVDYWNoZUNhbnZhcygpO1xuICB9LFxuICBzdG9yZVByb3BlcnRpZXM6IFsnKicsJ2JhY2tncm91bmRJbWFnZScsJ3dpZHRoJywnaGVpZ2h0J10sXG4gIHRvT2JqZWN0OiBmdW5jdGlvbiAocHJvcGVydGllc1RvSW5jbHVkZSkge1xuXG4gICAgcHJvcGVydGllc1RvSW5jbHVkZSA9IChwcm9wZXJ0aWVzVG9JbmNsdWRlIHx8IFtdKS5jb25jYXQodGhpcy5zdG9yZVByb3BlcnRpZXMpO1xuXG4gICAgdmFyIF9zZWxmID0gIHRoaXM7XG4gICAgdmFyIF9vYmpzID0gdGhpcy5nZXRPYmplY3RzKCk7XG5cbiAgICBfb2JqcyA9IGZhYnJpYy51dGlsLm9iamVjdC5maWx0ZXIoX29ianMse3N0b3JlZDogdHJ1ZX0pO1xuICAgIF9vYmpzID0gX29ianMubWFwKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2UudG9PYmplY3QoX3NlbGYub2JqZWN0c1Byb3BlcnRpZXNUb0luY2x1ZGUpO1xuICAgIH0pO1xuXG4gICAgdmFyIF9kYXRhID0ge1xuICAgICAgb2JqZWN0czogX29ianNcbiAgICB9O1xuXG4gICAgZmFicmljLnV0aWwucG9wdWxhdGVXaXRoUHJvcGVydGllcyh0aGlzLCBfZGF0YSwgdGhpcy5wcm9wZXJ0aWVzVG9JbmNsdWRlKTtcbiAgICAvL1xuICAgIC8vIGZvcih2YXIgaSBpbiBwcm9wZXJ0aWVzVG9JbmNsdWRlKXtcbiAgICAvLyAgIHZhciBfcHJvcCA9IHByb3BlcnRpZXNUb0luY2x1ZGVbaV07XG4gICAgLy8gICBfZGF0YVtfcHJvcF0gPSB0aGlzW19wcm9wXTtcbiAgICAvLyB9XG5cbiAgICBpZihwcm9wZXJ0aWVzVG9JbmNsdWRlLmluZGV4T2YoJ2JhY2tncm91bmRJbWFnZScpICE9PSAtMSl7XG4gICAgICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKF9kYXRhLCB0aGlzLl9fc2VyaWFsaXplQmdPdmVybGF5KCkpO1xuICAgIH1cblxuICAgIGlmKHByb3BlcnRpZXNUb0luY2x1ZGUuaW5kZXhPZignd2lkdGgnKSAhPT0gLTEgJiYgdGhpcy5vcmlnaW5hbFdpZHRoKXtcbiAgICAgIF9kYXRhLndpZHRoID0gdGhpcy5vcmlnaW5hbFdpZHRoO1xuICAgIH1cbiAgICBpZihwcm9wZXJ0aWVzVG9JbmNsdWRlLmluZGV4T2YoJ2hlaWdodCcpICE9PSAtMSAmJiB0aGlzLm9yaWdpbmFsSGVpZ2h0KXtcbiAgICAgIF9kYXRhLmhlaWdodCA9IHRoaXMub3JpZ2luYWxIZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5wbHVnaW5zLnNhdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHNhdmVyKXtcbiAgICAgIHNhdmVyLmNhbGwodGhpcywgcHJvcGVydGllc1RvSW5jbHVkZSwgX2RhdGEpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5maXJlKFwiYmVmb3JlOm9iamVjdFwiLHtvYmplY3Q6IF9kYXRhfSk7XG5cbiAgICByZXR1cm4gX2RhdGE7XG4gIH0sXG4gIGRlZmF1bHRUZXh0OiBcInRleHRcIixcbiAgZGVmYXVsdFRleHRUeXBlOiBcInRleHRcIixcbiAgdGh1bWJTaXplOiB7XG4gICAgd2lkdGg6IDUwLFxuICAgIGhlaWdodDogMTAwXG4gIH0sXG4gIHNldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSl7XG5cbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgaWYoIXRlbXBsYXRlKXJldHVybjtcblxuICAgIHRoaXMuc2V0V2lkdGgodGhpcy5zbGlkZVdpZHRoIHx8IHRlbXBsYXRlLndpZHRoKTtcbiAgICB0aGlzLnNldEhlaWdodCh0aGlzLnNsaWRlSGVpZ2h0IHx8IHRlbXBsYXRlLmhlaWdodCk7XG4gICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICB0aGlzLnNldChmYWJyaWMudXRpbC5vYmplY3QucmVhcnJhbmdlKHRlbXBsYXRlLFtcImFyZWFzXCIsXCJoZWxwZXJzXCIsXCJvZmZzZXRzXCJdKSk7XG5cbiAgICB0aGlzLl91cGRhdGVfY2xpcF9yZWN0KCk7XG4gICAgdGhpcy5fdXBkYXRlX2JhY2tncm91bmRfaW1hZ2UoKTtcbiAgICB0aGlzLmZpcmUoXCJtb2RpZmllZFwiLHt0eXBlOiBcInRlbXBsYXRlXCJ9KTtcbiAgICB0aGlzLnJlbmRlckFsbCgpO1xuICB9LFxuICBhZGRUZXh0OiBmdW5jdGlvbiAodGV4dCwgb3B0aW9ucykge1xuICAgIHRoaXMuY3JlYXRlT2JqZWN0KHtcbiAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgdGV4dDogdGV4dCxcbiAgICAgIHR5cGU6ICAgdGhpcy5kZWZhdWx0VGV4dFR5cGUsXG4gICAgICBjbGlwVG86IHRoaXMuYWN0aXZlQXJlYSxcbiAgICAgIG1vdmVtZW50TGltaXRzIDogdGhpcy5hY3RpdmVBcmVhXG4gICAgfSk7XG4gIH0sXG4gIHVwbG9hZEFjdGlvbjogZnVuY3Rpb24gKGltZykge1xuICAgIGlmICghaW1nKXJldHVybjtcbiAgICB0aGlzLmNyZWF0ZU9iamVjdCh7XG4gICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIHR5cGU6ICAgdGhpcy51cGxvYWRDbGFzcyxcbiAgICAgIGltYWdlOiAgaW1nLFxuICAgICAgY2xpcFRvOiB0aGlzLmFjdGl2ZUFyZWEsXG4gICAgICBtb3ZlbWVudExpbWl0cyA6IHRoaXMuYWN0aXZlQXJlYVxuICAgIH0pO1xuICB9LFxuICB1cGxvYWRDbGFzczogJ0ltYWdlJyxcbiAgdXBsb2FkSW1hZ2VUb29sOiBmYWxzZSxcbiAgYWRkVGV4dFRvb2w6IGZhbHNlXG59KTtcbmZhYnJpYy5TbGlkZUNhbnZhcy5fX2lkY291bnRlciA9IDA7XG5mYWJyaWMuU2xpZGVDYW52YXMuZnJvbUpzb24gPSBmdW5jdGlvbih1cmwsY2FsbGJhY2sgLCBlbGVtZW50KXtcbiAgZmFicmljLnV0aWwuZGF0YS5sb2FkSnNvbih1cmwsZnVuY3Rpb24oZGF0YSl7XG4gICAgbmV3IGZhYnJpYy5TbGlkZUNhbnZhcyhlbGVtZW50LGRhdGEsY2FsbGJhY2spXG4gIH0pXG59O1xuXG5mYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLmFjdGlvbnMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHt9LCB7XG4gIC8vc2VsZWN0QWxsOiB7XG4gIC8vICB0aXRsZTogJ3NlbGVjdEFsbCcsXG4gIC8vICB0eXBlOiAna2V5J1xuICAvL30sXG4gIGJhY2tncm91bmRDb2xvciA6IHtcbiAgICB0eXBlOiBcImNvbG9yXCJcbiAgfSxcbiAgYWRkVGV4dDoge1xuICAgIGluc2VydDogJ2FkZFRleHRUb29sJyxcbiAgICBjbGFzc05hbWU6ICAnZmEgZmEtZm9udCcsXG4gICAgdGl0bGU6ICd0ZXh0JyxcbiAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuYWRkVGV4dCh0aGlzLmRlZmF1bHRUZXh0LHt9KTtcbiAgICB9XG4gIH0sXG4gIHVwbG9hZDoge1xuICAgIGluc2VydDogJ3VwbG9hZEltYWdlVG9vbCcsXG4gICAgY2xhc3NOYW1lOiAgJ2ZhIGZhLXVwbG9hZCcsXG4gICAga2V5OiAnVScsXG4gICAgdGl0bGU6ICd1cGxvYWQgaW1hZ2UnLFxuICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgZmFicmljLnV0aWwudXBsb2FkSW1hZ2UodGhpcy51cGxvYWRBY3Rpb24uYmluZCh0aGlzKSlcbiAgICB9XG4gIH1cbn0pO1xuXG5mYWJyaWMuU2xpZGVDYW52YXMuYWRkUGx1Z2luID0gZmFicmljLlBsdWdpbnNNaXhpbi5hZGRQbHVnaW4uYmluZChmYWJyaWMuU2xpZGVDYW52YXMpO1xuXG5cblxuZmFicmljLkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkU2xpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuICB2YXIgX2NhbnZhcyA9IHRoaXMuY2FudmFzO1xuICBpZiAodGhpcy5zbGlkZSkge1xuXG4gICAgaWYgKF9jYW52YXMubG9hZCkge1xuICAgICAgX2NhbnZhcy5sb2FkKHRoaXMuc2xpZGUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2NhbnZhcy5jcmVhdGVPYmplY3RzKHRoaXMuc2xpZGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cbn07XG5cbmZhYnJpYy5BcHBsaWNhdGlvbi5hZGRQbHVnaW4oXCJwb3N0bG9hZGVyc1wiLFwibG9hZFNsaWRlXCIpO1xuXG5cblxuXG5cbmZhYnJpYy5BcHBsaWNhdGlvbi5wcm90b3R5cGUuY2FudmFzQ2xhc3MgPSAnU2xpZGVDYW52YXMnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL3NsaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLlN0YXRpY0NhbnZhcy5wcm90b3R5cGUse1xuICAvKipcbiAgICogcmVxdWlyZWQgdG8gc2hvdyB2aWRlb1xuICAgKi9cbiAgYWRkVmlkZW9zU3VwcG9ydDogZnVuY3Rpb24gKCkge1xuICAgIGZhYnJpYy51dGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdGhpcy5yZW5kZXJBbGwoKTtcbiAgICAgIGZhYnJpYy51dGlsLnJlcXVlc3RBbmltRnJhbWUocmVuZGVyKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuICBmaW5kOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcInN0cmluZ1wiKXtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIHR5cGU6IG9wdGlvbnNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhYnJpYy51dGlsLm9iamVjdC53aGVyZSh0aGlzLl9vYmplY3RzLG9wdGlvbnMpO1xuICB9LFxuICBjb2xsZWN0aW9uOiBmdW5jdGlvbiAodHlwZSxvcHRpb25zKSB7XG4gICAgdmFyIGNsYXNzUHJvdG90eXBlO1xuICAgIHZhciBfYXBwbGljYXRpb25Qcm90b3R5cGU7XG4gICAgaWYodHlwZW9mIHR5cGUgPT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGNsYXNzUHJvdG90eXBlID0gIHR5cGUucHJvdG90eXBlO1xuICAgIH1lbHNlIGlmICh0eXBlb2YgdHlwZSA9PSBcInN0cmluZ1wiKXtcbiAgICAgIGNsYXNzUHJvdG90eXBlID0gZmFicmljW3R5cGVdLnByb3RvdHlwZVxuICAgIH1lbHNlIGlmKHR5cGUudHlwZSl7XG4gICAgICBjbGFzc1Byb3RvdHlwZSA9IGZhYnJpY1t0eXBlLnR5cGVdLnByb3RvdHlwZTtcbiAgICAgIG9wdGlvbnMgPSB0eXBlO1xuICAgIH1lbHNle1xuICAgICAgb3B0aW9ucyA9IHR5cGU7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt0eXBlOiBjbGFzc1Byb3RvdHlwZS50eXBlfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VGdW5jdGlvbihmb28pe1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICBmb28uYXBwbHkob2JqLG9wdGlvbnMpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY29sbGVjdGlvblByb3RvO1xuICAgIHZhciBfYXJyYXkgPSB0aGlzLmZpbmQob3B0aW9ucyk7XG4gICAgX2FycmF5LmNhbnZhcyA9IHRoaXM7XG4gICAgX2FycmF5Lm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgaWYoY2xhc3NQcm90b3R5cGUpIHtcbiAgICAgIGlmKHRoaXMuYXBwbGljYXRpb24pe1xuICAgICAgICBfYXBwbGljYXRpb25Qcm90b3R5cGUgPSB0aGlzLmFwcGxpY2F0aW9uLmdldERlZmF1bHRQcm9wZXJ0aWVzKGNsYXNzUHJvdG90eXBlLHt9KTtcbiAgICAgIH1cbiAgICAgIGNvbGxlY3Rpb25Qcm90byA9IFtdO1xuICAgICAgZm9yKHZhciBpIGluIGNsYXNzUHJvdG90eXBlKXtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc1Byb3RvdHlwZVtpXSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb2xsZWN0aW9uUHJvdG9baV0gPSBjbGFzc1Byb3RvdHlwZVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yKHZhciBpIGluIF9hcHBsaWNhdGlvblByb3RvdHlwZSl7XG4gICAgICAgIGlmICh0eXBlb2YgX2FwcGxpY2F0aW9uUHJvdG90eXBlW2ldID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbGxlY3Rpb25Qcm90b1tpXSA9IF9hcHBsaWNhdGlvblByb3RvdHlwZVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgX2FycmF5LmZvckVhY2goZnVuY3Rpb24oX29iail7XG4gICAgICAgIGlmKCFjb2xsZWN0aW9uUHJvdG8pIHtcbiAgICAgICAgICBjb2xsZWN0aW9uUHJvdG8gPSBbXTtcbiAgICAgICAgICBmb3IodmFyIGkgaW4gX29iaikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBfb2JqW2ldID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICBjb2xsZWN0aW9uUHJvdG9baV0gPSBfb2JqW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZm9yKHZhciBpIGluIGNvbGxlY3Rpb25Qcm90byl7XG4gICAgICAgICAgICBpZighX29ialtpXSB8fCB0eXBlb2YgX29ialtpXSAhPT0gXCJmdW5jdGlvblwiKXtcbiAgICAgICAgICAgICAgZGVsZXRlIGNvbGxlY3Rpb25Qcm90b1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZm9yKHZhciBpIGluIGNvbGxlY3Rpb25Qcm90byl7XG4gICAgICBjb2xsZWN0aW9uUHJvdG9baV0gPSBtYWtlRnVuY3Rpb24oIGNvbGxlY3Rpb25Qcm90b1tpXSApO1xuICAgIH1cbiAgICBjb2xsZWN0aW9uUHJvdG8uX19wcm90byA9IF9hcnJheS5fX3Byb3RvX187XG4gICAgX2FycmF5Ll9fcHJvdG9fXyA9IGNvbGxlY3Rpb25Qcm90bztcblxuXG4gICAgX2FycmF5LnNldENvbGxlY3Rpb24gPSBmdW5jdGlvbihfYXJyKXtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgIGZvcih2YXIgaSBpbiBfYXJyKXtcbiAgICAgICAgdGhpcy5wdXNoKF9hcnJbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9hcnJheS51cGRhdGVDb2xsZWN0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgIHZhciBfYXJyID0gdGhpcy5jYW52YXMuZmluZCh0aGlzLm9wdGlvbnMpO1xuICAgICAgdGhpcy5zZXRDb2xsZWN0aW9uKF9hcnIpXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX2FycmF5LmZpbHRlciA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgX2FyciA9IHRoaXMuX19wcm90b19fLmZpbHRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLnNldENvbGxlY3Rpb24oX2FycilcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gX2FycmF5O1xuICB9LFxuICBfdXBkYXRlX2JhY2tncm91bmRfaW1hZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGhvdG8gPSB0aGlzLmJhY2tncm91bmRJbWFnZTtcbiAgICBpZiAoIXBob3RvIHx8IHBob3RvLmNvbnN0cnVjdG9yID09IE9iamVjdCB8fCBwaG90by5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmJhY2tncm91bmRQb3NpdGlvbiA9PSAncmVzaXplJykge1xuICAgICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gcGhvdG8ud2lkdGg7XG4gICAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gcGhvdG8uaGVpZ2h0O1xuXG4gICAgfWVsc2UgaWYgKHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uICE9ICdtYW51YWwnKSB7XG5cbiAgICAgIHZhciBfdyAgPSAgdGhpcy5vcmlnaW5hbFdpZHRoIHx8IHRoaXMud2lkdGgsICBfaCA9IHRoaXMub3JpZ2luYWxIZWlnaHQgfHwgdGhpcy5oZWlnaHQ7XG5cblxuICAgICAgaWYocGhvdG8uX29yaWdpbmFsRWxlbWVudCl7XG4gICAgICAgIHZhciBzaXplID0gZmFicmljLnV0aWwuZ2V0UHJvcG9ydGlvbnMocGhvdG8uX29yaWdpbmFsRWxlbWVudCwge1xuICAgICAgICAgIHdpZHRoOiBfdyxcbiAgICAgICAgICBoZWlnaHQ6IF9oXG4gICAgICAgIH0sIHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBzaXplID0ge1xuICAgICAgICAgIHdpZHRoOiBfdyxcbiAgICAgICAgICBoZWlnaHQ6IF9oXG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICB2YXIgX2wgO1xuICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kSW1hZ2Uub3JpZ2luWCA9PSAnY2VudGVyJyl7XG4gICAgICAgIF9sID0gX3cgLyAyO1xuICAgICAgfWVsc2V7XG4gICAgICAgIF9sID0gKF93IC0gc2l6ZS53aWR0aCkgLyAyIDtcbiAgICAgIH1cbiAgICAgIHZhciBfdCA7XG4gICAgICBpZih0aGlzLmJhY2tncm91bmRJbWFnZS5vcmlnaW5ZID09ICdjZW50ZXInKXtcbiAgICAgICAgX3QgPSBfaCAvIDI7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgX3QgPSAoX2ggLSBzaXplLmhlaWdodCkgLyAyIDtcbiAgICAgIH1cblxuXG4gICAgICB0aGlzLmJhY2tncm91bmRJbWFnZS5zZXQoe1xuICAgICAgICBsZWZ0OiBfbCArIHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNF0sXG4gICAgICAgIHRvcDogIF90ICsgdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XSxcbiAgICAgICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB2YXIgX29yaWcgPSB0aGlzLmJhY2tncm91bmRJbWFnZS5nZXRPcmlnaW5hbFNpemUoKTtcbiAgICAgIC8vIHRoaXMuYmFja2dyb3VuZEltYWdlLnNldCh7XG4gICAgICAvLyAgIG9yaWdpblg6ICdsZWZ0JyxcbiAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAvLyAgIGxlZnQ6IDAsIC8vdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs0XSxcbiAgICAgIC8vICAgdG9wOiAwLCAvL3RoaXMudmlld3BvcnRUcmFuc2Zvcm1bNV0sXG4gICAgICAvLyAgIHdpZHRoOiBfb3JpZy53aWR0aCxcbiAgICAgIC8vICAgaGVpZ2h0OiBfb3JpZy5oZWlnaHRcbiAgICAgIC8vIH0pO1xuICAgIH1cbiAgfSxcbiAgc2V0QmFja2dyb3VuZEltYWdlOiBmdW5jdGlvbiAoYmcsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF9iZ2ltYWdlTG9hZGVkID0gZnVuY3Rpb24gKGVsKXtcblxuICAgICAgdGhpcy5iYWNrZ3JvdW5kSW1hZ2UgPSBlbDtcbiAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLmNhbnZhcyA9IHRoaXM7XG4gICAgICB0aGlzLl91cGRhdGVfYmFja2dyb3VuZF9pbWFnZSgpO1xuICAgICAgaWYoIXRoaXMub3JpZ2luYWxXaWR0aCAmJiAhdGhpcy5vcmlnaW5hbEhlaWdodCl7XG4gICAgICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IGVsLndpZHRoO1xuICAgICAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gZWwuaGVpZ2h0O1xuICAgICAgfVxuICAgICAgdGhpcy5maXJlKFwiYmFja2dyb3VuZC1pbWFnZTpsb2FkZWRcIix7dGFyZ2V0OiBlbH0pO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9XG5cblxuICAgIGlmICghYmcpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlID0gbnVsbDtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAoYmcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50IHx8IGJnIGluc3RhbmNlb2YgSW1hZ2Upe1xuXG4gICAgICB2YXIgZWwgPSBuZXcgZmFicmljLkltYWdlKGJnLHtcbiAgICAgICAgd2lkdGg6IGJnLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBiZy5uYXR1cmFsSGVpZ2h0XG4gICAgICB9KTtcblxuICAgICAgX2JnaW1hZ2VMb2FkZWQuY2FsbCh0aGlzLGVsKTtcbiAgICB9XG4gICAgaWYgKGJnLmNvbnN0cnVjdG9yID09IFN0cmluZykge1xuICAgICAgYmcgPSB7XG4gICAgICAgIHNyYzogYmdcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIF9wcm90byA9IHRoaXMuYXBwbGljYXRpb24ucHJvdG90eXBlcztcbiAgICBpZihfcHJvdG8gJiYgX3Byb3RvLlNsaWRlQ2FudmFzICYmIF9wcm90by5TbGlkZUNhbnZhcy5iYWNrZ3JvdW5kSW1hZ2VQcm9wZXJ0aWVzKXtcbiAgICAgIGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoYmcsX3Byb3RvLlNsaWRlQ2FudmFzLmJhY2tncm91bmRJbWFnZVByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBiZy5hcHBsaWNhdGlvbiA9IHRoaXMuYXBwbGljYXRpb247XG4gICAgYmcudHlwZSA9IGJnLnR5cGUgfHwgXCJpbWFnZVwiO1xuICAgIC8vIGJnLndpZHRoID0gYmcubmF0dXJhbFdpZHRoO1xuICAgIC8vIGJnLmhlaWdodCA9IGJnLm5hdHVyYWxIZWlnaHQ7XG4gICAgLy9cbiAgICBmYWJyaWMudXRpbC5jcmVhdGVPYmplY3QoYmcsX2JnaW1hZ2VMb2FkZWQuYmluZCh0aGlzKSk7XG4gIH0sXG4gIGNyZWF0ZU9iamVjdHM6IGZ1bmN0aW9uKG9iamVjdHMsY2FsbGJhY2spe1xuXG4gICAgaWYodGhpcy5hcHBsaWNhdGlvbil7XG4gICAgICBmb3IodmFyIGkgaW4gb2JqZWN0cyl7XG4gICAgICAgIGlmKG9iamVjdHNbaV0uY29uc3RydWN0b3IgPT0gU3RyaW5nKXtcbiAgICAgICAgICBvYmplY3RzW2ldID0gdGhpcy5hcHBsaWNhdGlvbi5vYmplY3RzW29iamVjdHNbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9jYW52YXMgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc3VjY2Vzcyhfb2JqZWN0cykge1xuICAgICAgX2NhbnZhcy5maXJlKFwicHJvZ3Jlc3M6Y29tcGxldGVcIiwge29iamVjdHM6IG9iamVjdHN9KTtcbiAgICAgIGZvciAodmFyIGkgaW4gX29iamVjdHMpIHtcbiAgICAgICAgX2NhbnZhcy5hZGQoX29iamVjdHNbaV0ub2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIF9jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKF9jYW52YXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvZ3Jlc3MobCwgdCkge1xuICAgICAgX2NhbnZhcy5maXJlKFwicHJvZ3Jlc3NcIiwgeyBsb2FkZWQgOiBsLCB0b3RhbCA6IHQgfSk7XG4gICAgICBpZiAoZmFicmljLnV0aWwubG9hZGVyRGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkZWQgXCIgKyBsICsgXCIgLyBcIiArIHQpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgdmFyIF9vYmplY3RzID0gW107XG4gICAgaWYgKCFvYmplY3RzIHx8ICFvYmplY3RzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maXJlKFwicHJvZ3Jlc3M6Y29tcGxldGVcIiwgMCk7XG4gICAgICBzdWNjZXNzKF9vYmplY3RzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcXVldWVMb2FkQ2FsbGJhY2sgPSBmYWJyaWMudXRpbC5xdWV1ZUxvYWQob2JqZWN0cy5sZW5ndGgsIGZ1bmN0aW9uKCl7XG4gICAgICBzdWNjZXNzKF9vYmplY3RzKVxuICAgIH0sIHByb2dyZXNzKTtcblxuICAgIHF1ZXVlTG9hZENhbGxiYWNrLmRhdGEgPSAodGhpcy50aXRsZSB8fCBcIlwiKSArIFwib2JqZWN0c1wiO1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3RzKSB7XG4gICAgICAoZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9vYmplY3Rfc2xvdCA9IHtvYmplY3Q6IG51bGwsIG9wdGlvbnM6IG9wdGlvbnN9O1xuICAgICAgICBfb2JqZWN0cy5wdXNoKF9vYmplY3Rfc2xvdCk7XG5cbiAgICAgICAgb3B0aW9ucy5hcHBsaWNhdGlvbiA9IF9jYW52YXMuYXBwbGljYXRpb247XG4gICAgICAgIGZhYnJpYy51dGlsLmNyZWF0ZU9iamVjdChvcHRpb25zLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICBfb2JqZWN0X3Nsb3Qub2JqZWN0ID0gZWw7XG4gICAgICAgICAgcXVldWVMb2FkQ2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYWxsKHRoaXMsIG9iamVjdHNbaV0pO1xuICAgIH1cbiAgfSxcbiAgYXBwbHlPcHRpb25zOiBmdW5jdGlvbihmaWx0ZXIsb3B0aW9ucyl7XG4gICAgdGhpcy5fb2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uKF9vYmope1xuICAgICAgZm9yKHZhciBwcm9wIGluIGZpbHRlcil7XG4gICAgICAgIGlmKF9vYmpbcHJvcF0gIT09ICBmaWx0ZXJbcHJvcF0pcmV0dXJuO1xuICAgICAgfVxuICAgICAgX29iai5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH0pXG4gIH0sXG4gIGNyZWF0ZU9iamVjdDogZnVuY3Rpb24gKHR5cGUsIG9wdGlvbnMsY2FsbGJhY2spIHtcbiAgICBpZih0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIil7XG4gICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICBvcHRpb25zID0gZmFicmljLnV0aWwub2JqZWN0LmNsb25lKHR5cGUpO1xuICAgICAgdHlwZSA9IG51bGw7XG4gICAgfWVsc2V7XG4gICAgICBvcHRpb25zID0gZmFicmljLnV0aWwub2JqZWN0LmNsb25lKG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIG9wdGlvbnMuYXBwbGljYXRpb24gPSB0aGlzLmFwcGxpY2F0aW9uO1xuICAgIHZhciBfYWN0aXZlID0gb3B0aW9ucy5hY3RpdmU7XG4gICAgdmFyIF9wb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb247XG4gICAgZGVsZXRlIG9wdGlvbnMuYWN0aXZlO1xuICAgIGRlbGV0ZSBvcHRpb25zLnBvc2l0aW9uO1xuXG5cbiAgICBmdW5jdGlvbiBfYWRkKGVsKSB7XG4gICAgICBpZihlbC5jYW52YXMpcmV0dXJuO1xuICAgICAgaWYoX3Bvc2l0aW9uID09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgX3NlbGYuY2VudGVyKGVsKTtcbiAgICAgIH1cbiAgICAgIF9zZWxmLmFkZChlbCk7XG5cbiAgICAgIGlmKF9hY3RpdmUpe1xuICAgICAgICBfc2VsZi5zZXRBY3RpdmVPYmplY3QoZWwpO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZWwpO1xuICAgIH1cblxuICAgIHZhciBlbCA9IGZhYnJpYy51dGlsLmNyZWF0ZU9iamVjdChvcHRpb25zLF9hZGQgKTtcbiAgICBlbCAmJiBfYWRkKGVsKTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wcm9jZXNzaW5nID1mYWxzZTtcbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5maXJlKFwibG9hZGluZzplbmRcIix7dHlwZTogXCJzbGlkZVwiLCB0YXJnZXQ6IHRoaXN9KTtcbiAgICB0aGlzLnJlbmRlckFsbCgpO1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gIH0sXG4gIGxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zLGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gMDtcbiAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gMDtcbiAgICBpZiAoIW9wdGlvbnMpcmV0dXJuO1xuXG4gICAgaWYoIXRoaXMudmlydHVhbCl7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYob3B0aW9ucy53aWR0aCl7XG4gICAgICBvcHRpb25zLm9yaWdpbmFsV2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgb3B0aW9ucy5vcmlnaW5hbEhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgdGhpcy5maXJlKFwibG9hZGluZzpiZWdpblwiLHt0eXBlOiBcInNsaWRlXCIsIHRhcmdldDogdGhpc30pO1xuXG4gICAgdGhpcy5zZXQob3B0aW9ucyx0aGlzLm9uTG9hZC5iaW5kKHRoaXMsY2FsbGJhY2spKTtcblxuXG4gICAgLy90b2RvXG4gICAgaWYodGhpcy5wbHVnaW5zKXtcbiAgICAgIHRoaXMucGx1Z2lucy5wcmVsb2FkZXJzLmZvckVhY2goZnVuY3Rpb24ocHJlbG9hZGVyKXtcbiAgICAgICAgcHJlbG9hZGVyLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG5cbiAgfSxcbiAgc2V0T2JqZWN0czogZnVuY3Rpb24ob2JqZWN0cyxjYWxsYmFjayl7XG5cbiAgICB0aGlzLmNyZWF0ZU9iamVjdHMob2JqZWN0cyxmdW5jdGlvbigpe1xuICAgICAgZm9yKHZhciBpIGluIHRoaXMuX29iamVjdHMpe1xuICAgICAgICB0aGlzLl9vYmplY3RzW2ldLnNldENvb3JkcygpO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfSxcbiAgb3B0aW9uc09yZGVyOiBbXCJvcmlnaW5hbFdpZHRoXCIsXCJvcmlnaW5hbEhlaWdodFwiLFwid2lkdGhcIixcImhlaWdodFwiXSxcbiAgb25SZXNpemU6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIF9zY2FsZSA9IE1hdGgubWluKDEsODAwIC90aGlzLndpZHRoICk7XG4gICAgLy8gdGhpcy5zZXRab29tKF9zY2FsZSk7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zKHt3aWR0aDogdGhpcy53aWR0aCxoZWlnaHQ6IHRoaXMuaGVpZ2h0fSk7XG4gIH0sXG4gIGNlbnRlcjogZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIF9yZWN0LCBtYXhTaXplLCBvZmZzZXRzO1xuXG4gICAgaWYoZWwubW92ZW1lbnRMaW1pdHMgJiYgZWwubW92ZW1lbnRMaW1pdHMuY29uc3RydWN0b3IgIT09IEZ1bmN0aW9uKXtcbiAgICAgIHZhciBsaW0gPSBlbC5tb3ZlbWVudExpbWl0cztcbiAgICAgIF9yZWN0ID0ge1xuICAgICAgICBsZWZ0OiAgIGxpbS5sZWZ0ICogbGltLnNjYWxlWCxcbiAgICAgICAgd2lkdGg6ICBsaW0ud2lkdGggKiBsaW0uc2NhbGVYICxcbiAgICAgICAgdG9wOiAgICBsaW0udG9wICogbGltLnNjYWxlWSxcbiAgICAgICAgaGVpZ2h0OiBsaW0uaGVpZ2h0ICogbGltLnNjYWxlWVxuICAgICAgfTtcbiAgICAgIG1heFNpemUgPSBfcmVjdDtcbiAgICAgIG9mZnNldHMgPSBsaW07XG4gICAgfWVsc2V7XG4gICAgICB2YXIgX3pvb20gPSB0aGlzLmdldFpvb20oKTtcbiAgICAgIHZhciBfdyA9IHRoaXMub3JpZ2luYWxXaWR0aCB8fCB0aGlzLndpZHRoIC8gX3pvb207XG4gICAgICB2YXIgX2ggPSB0aGlzLm9yaWdpbmFsSGVpZ2h0IHx8IHRoaXMuaGVpZ2h0IC8gX3pvb207XG4gICAgICBfcmVjdCA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMub2Zmc2V0cyA/IChfdyAtIHRoaXMub2Zmc2V0cy5sZWZ0IC0gdGhpcy5vZmZzZXRzLnJpZ2h0KSA6IF93LFxuICAgICAgICBoZWlnaHQ6IHRoaXMub2Zmc2V0cyA/KF9oIC0gdGhpcy5vZmZzZXRzLnRvcCAtIHRoaXMub2Zmc2V0cy5ib3R0b20pIDogX2hcbiAgICAgIH07XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICBsZWZ0OiB0aGlzLm9mZnNldHMgJiYgdGhpcy5vZmZzZXRzLnRvcCB8fDAgLFxuICAgICAgICB0b3A6ICB0aGlzLm9mZnNldHMgJiYgIHRoaXMub2Zmc2V0cy5sZWZ0IHx8MFxuICAgICAgfVxuICAgIH1cbiAgICBtYXhTaXplID0ge1xuICAgICAgd2lkdGg6IF9yZWN0LndpZHRoICogdGhpcy5maXRJbmRleCxcbiAgICAgIGhlaWdodDogX3JlY3QuaGVpZ2h0ICogdGhpcy5maXRJbmRleFxuICAgIH07XG4gICAgdmFyIHNpemUgPSBmYWJyaWMudXRpbC5nZXRQcm9wb3J0aW9ucyhlbCwgbWF4U2l6ZSwgJ2ZpdCcpO1xuXG4gICAgZWwuc2V0T3B0aW9ucyh7XG4gICAgICBzY2FsZVg6IHNpemUuc2NhbGUsXG4gICAgICBzY2FsZVk6IHNpemUuc2NhbGUsXG4gICAgICB0b3A6IG9mZnNldHMudG9wICArIF9yZWN0LmhlaWdodCAvIDIgLSBzaXplLmhlaWdodCAvIDIsXG4gICAgICBsZWZ0Om9mZnNldHMubGVmdCArIF9yZWN0LndpZHRoIC8gMiAgLSBzaXplLndpZHRoIC8gMlxuICAgIH0pO1xuICAgIGVsLnNldENvb3JkcygpO1xuICB9LFxuICBmaXRJbmRleDogMC44LFxuICBzZXRPcmlnaW5hbFNpemU6IGZ1bmN0aW9uICh3LCBoKSB7XG4gICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gaCA/IHcgOiAody5uYXR1cmFsV2lkdGggfHwgdy53aWR0aCk7XG4gICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IGggPyBoIDogKHcubmF0dXJhbEhlaWdodCB8fCB3LmhlaWdodCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlL3N0YXRpY0NhbnZhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZmFicmljLmRlYnVnID0gREVWRUxPUE1FTlQ7XG5cbmZhYnJpYy51dGlsLmRhdGEgPSByZXF1aXJlKCcuL3V0aWwvZGF0YS5qcycpO1xuZmFicmljLnV0aWwucGF0aCA9IHJlcXVpcmUoJy4vdXRpbC9wYXRoLmpzJyk7XG5mYWJyaWMudXRpbC5jb21waWxlID0gcmVxdWlyZSgnLi91dGlsL2NvbXBpbGUuanMnKTtcbmZhYnJpYy51dGlsLmxvYWRlciA9IHJlcXVpcmUoJy4vdXRpbC9sb2FkZXIuanMnKTtcbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLnV0aWwub2JqZWN0LHJlcXVpcmUoJy4vdXRpbC9vYmplY3QuanMnKSk7XG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy51dGlsLHJlcXVpcmUoJy4vdXRpbC91dGlsLmpzJykpO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMnKTtcblxuXG5pZighZmFicmljLmlzTGlrZWx5Tm9kZSl7XG4gIC8qKlxuICAgKiBpbmxpbmUgc2NyaXB0IGltYWdlc1xuICAgKiBAdHlwZSB7e2Vycm9yOiBzdHJpbmd9fVxuICAgKi9cbiAgZmFicmljLm1lZGlhID0ge1xuICAgIC8qKlxuICAgICAqIHJlcGxhY2UgaW1hZ2VzIGxvYWRlZCB3aXRoIGVycm9yc1xuICAgICAqL1xuICAgIGVycm9yOiAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwnICsgcmVxdWlyZSgnYmFzZTY0LWxvYWRlciEuL21lZGlhL2Vycm9yLWJ1dHRvbi5zdmcnKVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyAgPSBmYWJyaWM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2ZpZXJhLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxuLyoqXG4gICAqIERyYXcgQ1NTMyBib3JkZXIgaW1hZ2Ugb24gY2FudmFzLlxuICAgKiBAcGFyYW0gY2FudmFzICAgIHtIVE1MQ2FudmFzRWxlbWVudH1cbiAgICogQHBhcmFtIGltZyAgICAgICB7SFRNTEltYWdlRWxlbWVudH0gYm9yZGVyLWltYWdlLXNvdXJjZSBpbWFnZVxuICAgKiBAcGFyYW0gb3B0aW9ucyAgIHtPYmplY3R9XG4gICAqICAgICAgc2xpY2Uge0FycmF5fSBib3JkZXItaW1hZ2Utc2xpY2UgdmFsdWVzXG4gICAqICAgICAgd2lkdGgge0FycmF5fSBib3JkZXItaW1hZ2Utd2lkdGggdmFsdWVzXG4gICAqICAgICAgb3V0c2V0IHtBcnJheX0gYm9yZGVyLWltYWdlLW91dHNldCB2YWx1ZXNcbiAgICogICAgICByZXBlYXQge0FycmF5fSBib3JkZXItaW1hZ2UtcmVwZWF0IHZhbHVlc1xuICAgKiBAcGFyYW0gc2l6ZSAgICAgIHtPYmplY3R9XG4gICAqL1xuICAgZmFicmljLnV0aWwuZHJhd0JvcmRlckltYWdlICA9IGZ1bmN0aW9uKGNhbnZhcywgaW1nLCBvcHRpb25zKXtcblxuXG4gICAgdmFyIG9wdGlvbnMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHtcbiAgICAgIFwic2xpY2VcIjogICAgICAgIFsyNSwyNSwyNSwyNV0sXG4gICAgICBcIndpZHRoXCI6ICAgICAgICBbMjUsMjUsMjUsMjVdLFxuICAgICAgXCJmaWxsXCI6ICAgICAgICAgZmFsc2UsXG4gICAgICBcInJlcGVhdFwiOiAgICAgICBbXCJyb3VuZFwiLFwicm91bmRcIl0sXG4gICAgICBcIm91dHNldF92YWx1ZXNcIlx0OiBbMCwgMCwgMCwgMF0sXG4gICAgICBcInNsaWNlX3VuaXRzXCIgICA6IFswLCAwLCAwLCAwXSxcbiAgICAgIFwid2lkdGhfdW5pdHNcIlx0OiBbMCwgMCwgMCwgMF0sXG4gICAgICBcIm91dHNldF91bml0c1wiXHQ6IFswLCAwLCAwLCAwXSxcbiAgICAgIFwic2l6ZVwiXHRcdFx0OiBbY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XVxuICAgIH0sb3B0aW9ucylcblxuXG4gICAgdmFyIHcgPSBpbWcud2lkdGg7XG4gICAgdmFyIGggPSBpbWcuaGVpZ2h0O1xuXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdmFyIHNsaWNlID0gb3B0aW9ucy5zbGljZTtcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuXG4gICAgdmFyIHcyID0gb3B0aW9ucy5zaXplWzBdO1xuICAgIHZhciBoMiA9IG9wdGlvbnMuc2l6ZVsxXTtcblxuXG4gICAgaWYob3B0aW9ucy5zbGljZV91bml0c1swXSA9PSAxKXNsaWNlWzBdICo9ICBoIC8gMTAwO1xuICAgIGlmKG9wdGlvbnMuc2xpY2VfdW5pdHNbMV0gPT0gMSlzbGljZVsxXSAqPSAgdyAvIDEwMDtcbiAgICBpZihvcHRpb25zLnNsaWNlX3VuaXRzWzJdID09IDEpc2xpY2VbMl0gKj0gIGggLyAxMDA7XG4gICAgaWYob3B0aW9ucy5zbGljZV91bml0c1szXSA9PSAxKXNsaWNlWzNdICo9ICB3IC8gMTAwO1xuXG4gICAgaWYob3B0aW9ucy53aWR0aF91bml0c1swXSA9PSAxKXdpZHRoWzBdICo9IGgyIC8gMTAwO1xuICAgIGlmKG9wdGlvbnMud2lkdGhfdW5pdHNbMV0gPT0gMSl3aWR0aFsxXSAqPSB3MiAvIDEwMDtcbiAgICBpZihvcHRpb25zLndpZHRoX3VuaXRzWzJdID09IDEpd2lkdGhbMl0gKj0gaDIgLyAxMDA7XG4gICAgaWYob3B0aW9ucy53aWR0aF91bml0c1szXSA9PSAxKXdpZHRoWzNdICo9IHcyIC8gMTAwO1xuXG5cbiAgICBmdW5jdGlvbiBkcmF3U2lkZShzaWRlLHNsaWNlT2Zmc2V0LHNsaWNlV2lkdGgsIGRyYXdPZmZzZXQsZHJhd1dpZHRoKXtcbiAgICAgIHZhciBkO1xuICAgICAgaWYoc2lkZSA9PSAwKSB7XG4gICAgICAgIGQgPSBbc2xpY2VbM10gKyBzbGljZU9mZnNldCwgMCwgc2xpY2VXaWR0aCwgIHNsaWNlWzBdLFxuICAgICAgICAgIHdpZHRoWzNdICsgZHJhd09mZnNldCwgMCwgZHJhd1dpZHRoLCAgd2lkdGhbMF1dXG4gICAgICB9XG4gICAgICBpZihzaWRlID09IDIpe1xuICAgICAgICBkID0gW3NsaWNlWzNdICsgc2xpY2VPZmZzZXQsIGggLSBzbGljZVsyXSAsc2xpY2VXaWR0aCwgIHNsaWNlWzJdLFxuICAgICAgICAgIHdpZHRoWzNdICsgZHJhd09mZnNldCwgaDIgLSB3aWR0aFsyXSxkcmF3V2lkdGgsIHdpZHRoWzJdXVxuICAgICAgfVxuICAgICAgaWYoc2lkZSA9PSAxKSB7XG4gICAgICAgIGQgPSBbIHcgLSBzbGljZVsxXSwgc2xpY2VbMF0gKyBzbGljZU9mZnNldCwgIHNsaWNlWzFdLCBzbGljZVdpZHRoLFxuICAgICAgICAgIHcyIC0gd2lkdGhbMV0sIHdpZHRoWzBdICsgZHJhd09mZnNldCx3aWR0aFsxXSwgZHJhd1dpZHRoXTtcbiAgICAgIH1cbiAgICAgIGlmKHNpZGUgPT0gMykge1xuICAgICAgICBkID0gWyAwLCBzbGljZVswXSArIHNsaWNlT2Zmc2V0LCAgc2xpY2VbM10sIHNsaWNlV2lkdGgsXG4gICAgICAgICAgMCwgd2lkdGhbMF0gKyBkcmF3T2Zmc2V0LCB3aWR0aFszXSxkcmF3V2lkdGhdO1xuICAgICAgfVxuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsZFswXSxkWzFdLGRbMl0sZFszXSxkWzRdLGRbNV0sZFs2XSxkWzddKVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gX2RyYXdfYm9yZGVyX3NpZGUoc2lkZSl7XG4gICAgICB2YXIgX3RvcF93aWR0aCwgX3RvcF9zbGljZSwgcmVwZWF0O1xuICAgICAgaWYoc2lkZSA9PSAwIHx8IHNpZGUgPT0gMil7XG4gICAgICAgIF90b3Bfd2lkdGggPSB3MiAtIHdpZHRoWzFdLSB3aWR0aFszXTtcbiAgICAgICAgX3RvcF9zbGljZSAgPSAgdyAtIHNsaWNlWzFdIC0gc2xpY2VbM107XG4gICAgICAgIHJlcGVhdCA9IG9wdGlvbnMucmVwZWF0WzBdO1xuICAgICAgfWVsc2V7XG4gICAgICAgIF90b3Bfd2lkdGggPSBoMiAtIHdpZHRoWzBdLSB3aWR0aFsyXTtcbiAgICAgICAgX3RvcF9zbGljZSAgPSAgaCAtIHNsaWNlWzBdIC0gc2xpY2VbMl07XG4gICAgICAgIHJlcGVhdCA9IG9wdGlvbnMucmVwZWF0WzFdO1xuICAgICAgfVxuXG5cbiAgICAgIGlmKHJlcGVhdCA9PSBcInN0cmV0Y2hcIil7XG4gICAgICAgIHJldHVybiBkcmF3U2lkZShzaWRlLCAwLCAgX3RvcF9zbGljZSAsICAwLCAgICAgX3RvcF93aWR0aCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBfYXNwZWN0ID0gICBzbGljZVtzaWRlXSAvIHdpZHRoW3NpZGVdO1xuICAgICAgdmFyIF9vbmVfd2lkdGggPSAgX3RvcF9zbGljZSAqICB3aWR0aFtzaWRlXSAvIHNsaWNlW3NpZGVdIDtcbiAgICAgIHZhciBjb3VudCA9IDE7XG4gICAgICB2YXIgX2xlZnQgPSAwO1xuXG4gICAgICBpZihyZXBlYXQgPT0gXCJyZXBlYXRcIil7XG5cbiAgICAgICAgdmFyIF9yZXN0ID0gX29uZV93aWR0aCAtIF90b3Bfd2lkdGggJSBfb25lX3dpZHRoIC8gMjtcbiAgICAgICAgdmFyIF9yZXN0X2FzcGVjdCAgPSBfYXNwZWN0ICogX3Jlc3Q7XG4gICAgICAgIGNvdW50ID0gIE1hdGguZmxvb3IoX3RvcF93aWR0aCAvIF9vbmVfd2lkdGgpO1xuXG5cbiAgICAgICAgaWYoX3Jlc3QgPiAwKXtcbiAgICAgICAgICBkcmF3U2lkZShzaWRlLCBfcmVzdF9hc3BlY3QgLCAgX3RvcF9zbGljZSAtIF9yZXN0X2FzcGVjdCwgIDAsICAgICBfb25lX3dpZHRoIC0gX3Jlc3QpXG4gICAgICAgIH1cblxuICAgICAgICBfbGVmdCA9ICBfb25lX3dpZHRoIC0gX3Jlc3Q7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMCA7IGk8IGNvdW50O2kgKyspe1xuICAgICAgICAgIGRyYXdTaWRlKCBzaWRlLDAsICAgX3RvcF9zbGljZSAsICBfbGVmdCwgICAgIF9vbmVfd2lkdGgpO1xuICAgICAgICAgIF9sZWZ0ICs9X29uZV93aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKF9yZXN0ID4gMCl7XG4gICAgICAgICAgZHJhd1NpZGUoc2lkZSwgIDAgLCAgICBfdG9wX3NsaWNlIC0gX3Jlc3RfYXNwZWN0LCAgX2xlZnQsICAgIF9vbmVfd2lkdGggLSBfcmVzdCApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihyZXBlYXQgPT0gXCJyb3VuZFwiKXtcblxuICAgICAgICBfbGVmdCA9IDA7XG4gICAgICAgIGNvdW50ID0gIE1hdGgubWF4KDEsTWF0aC5yb3VuZChfdG9wX3dpZHRoIC8gX29uZV93aWR0aCkpO1xuICAgICAgICBfb25lX3dpZHRoID0gX3RvcF93aWR0aCAvIGNvdW50O1xuXG4gICAgICAgIHdoaWxlKF9sZWZ0IDwgX3RvcF93aWR0aCl7XG4gICAgICAgICAgZHJhd1NpZGUoc2lkZSwwLCAgICAgX3RvcF9zbGljZSAsICBfbGVmdCwgICAgIF9vbmVfd2lkdGggKTtcbiAgICAgICAgICBfbGVmdCArPV9vbmVfd2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZHJhd19ib3JkZXJfc2lkZSgwKTtcbiAgICBfZHJhd19ib3JkZXJfc2lkZSgyKTtcbiAgICBfZHJhd19ib3JkZXJfc2lkZSgxKTtcbiAgICBfZHJhd19ib3JkZXJfc2lkZSgzKTtcblxuICAvL3RvcCBsZWZ0XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHNsaWNlWzNdLCBzbGljZVswXSwgMCwgMCwgd2lkdGhbM10sIHdpZHRoWzBdKTtcbiAgLy90b3AgcmlnaHRcbiAgICBjdHguZHJhd0ltYWdlKGltZywgdyAtIHNsaWNlWzFdLCAwLCBzbGljZVsxXSwgc2xpY2VbMF0sXG4gICAgICB3MiAtIHdpZHRoWzFdLCAwLCB3aWR0aFsxXSwgd2lkdGhbMF0pO1xuICAvL2JvdHRvbSBsZWZ0XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIGggLSBzbGljZVsyXSwgc2xpY2VbM10sIHNsaWNlWzJdLFxuICAgICAgMCwgaDIgLSB3aWR0aFsyXSwgd2lkdGhbM10sIHdpZHRoWzJdKTtcblxuICAvL2JvdHRvbSByaWdodFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCB3IC0gc2xpY2VbMV0sIGggLSBzbGljZVsyXSwgc2xpY2VbMV0sIHNsaWNlWzJdLFxuICAgICAgdzIgLSB3aWR0aFsxXSwgaDIgLSB3aWR0aFsyXSwgd2lkdGhbMV0sIHdpZHRoWzJdKTtcblxuICB9XG5cbiAgLypcbiAgIHZhciBGcmFtZSA9IGZ1bmN0aW9uKHByb2plY3QsZGF0YSl7XG5cbiAgIGlmKGRhdGEuYm9yZGVyX2ltYWdlKXtcbiAgIGRhdGEuYm9yZGVyX2ltYWdlID0gbWl4aW4oIHtcbiAgIFwic2xpY2VcIjogICAgICAgICAgWzI1LDI1LDI1LDI1XSxcbiAgIFwid2lkdGhcIjogICAgICAgICAgWzI1LDI1LDI1LDI1XSxcbiAgIFwiZmlsbFwiOiAgICAgICAgICAgZmFsc2UsXG4gICBcInJlcGVhdFwiOiAgICAgICAgIFtcInJvdW5kXCIsXCJyb3VuZFwiXSxcbiAgIFwib3V0c2V0XCJcdDogICAgIFswLCAwLCAwLCAwXSxcbiAgIFwic2xpY2VfdW5pdHNcIiAgIDogWzAsIDAsIDAsIDBdLFxuICAgXCJ3aWR0aF91bml0c1wiXHQ6IFswLCAwLCAwLCAwXSxcbiAgIFwib3V0c2V0X3VuaXRzXCJcdDogWzAsIDAsIDAsIDBdXG4gICB9LCBkYXRhLmJvcmRlcl9pbWFnZSlcbiAgIH1cblxuXG4gICB0aGlzLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLHByb2plY3QsZGF0YSk7XG4gICB0aGlzLl9hZGRfcm9vdChcIm1hc2tcIik7XG4gICB0aGlzLl9hZGRfcm9vdChcImltYWdlXCIpO1xuICAgdGhpcy5leGFtcGxlID0gdGhpcy5fZ2V0X2V4YW1wbGUoKTtcblxuICAgfTsqL1xuICBmYWJyaWMudXRpbC5nZXRPZmZzZXRzQ2xpcFBhdGggPSBmdW5jdGlvbihvKSB7XG5cbiAgICByZXR1cm4gWydNJywgb1szXSwgb1swXSwgJ0wnLCAxMDAgLSBvWzFdLCBvWzBdLCAnTCcsIDEwMCAtIG9bMV0sIDEwMCAtIG9bMl0sICdMJywgb1szXSwgMTAwIC0gb1syXSwgJ3onXS5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBmYWJyaWMudXRpbC5nZXRSYWRpdXNDbGlwUGF0aCA9IGZ1bmN0aW9uKHJhZGl1cyxyYWRpdXNfdW5pdHMsIHdpZHRoLGhlaWdodCkge1xuXG4gIHZhciBiciAgPSByYWRpdXM7XG4gIHZhciBicnUgPSByYWRpdXNfdW5pdHMgfHwgWzEsMSwxLDEsMSwxLDEsMV07XG5cblxuXG4gIHZhciBzID0ge1xuICAgIFwidG9wLWxlZnQtaFwiOiAgICAgYnJbMF0gKiAoYnJ1WzBdID8gaGVpZ2h0IC8gMTAwIDogMSksXG4gICAgXCJ0b3AtbGVmdC13XCI6ICAgICBiclsxXSAqIChicnVbMV0gPyB3aWR0aCAvIDEwMCA6IDEpLFxuICAgIFwidG9wLXJpZ2h0LWhcIjogICAgYnJbMl0gKiAoYnJ1WzJdID8gaGVpZ2h0IC8gMTAwIDogMSksXG4gICAgXCJ0b3AtcmlnaHQtd1wiOiAgICBiclszXSAqIChicnVbM10gPyB3aWR0aCAvIDEwMCA6IDEpLFxuICAgIFwiYm90dG9tLXJpZ2h0LXdcIjogYnJbNF0gKiAoYnJ1WzRdID8gd2lkdGggLyAxMDAgOiAxKSxcbiAgICBcImJvdHRvbS1yaWdodC1oXCI6IGJyWzVdICogKGJydVs1XSA/IGhlaWdodCAvIDEwMCA6IDEpLFxuICAgIFwiYm90dG9tLWxlZnQtd1wiOiAgYnJbNl0gKiAoYnJ1WzZdID8gd2lkdGggLyAxMDAgOiAxKSxcbiAgICBcImJvdHRvbS1sZWZ0LWhcIjogIGJyWzddICogKGJydVs3XSA/IGhlaWdodCAvIDEwMCA6IDEpXG4gIH07XG5cbiAgcmV0dXJuIFtcbiAgICBcIk1cIiwgMCwgc1tcInRvcC1sZWZ0LWhcIl0sXG4gICAgXCJDXCIsIDAsIHNbXCJ0b3AtbGVmdC1oXCJdLCAwLCAwLCBzW1widG9wLWxlZnQtd1wiXSwgMCxcbiAgICBcIkhcIiwgd2lkdGggLSBzW1widG9wLXJpZ2h0LXdcIl0sXG4gICAgXCJDXCIsIHdpZHRoIC0gc1tcInRvcC1yaWdodC13XCJdLCAwLCB3aWR0aCwgMCwgd2lkdGgsIHNbXCJ0b3AtcmlnaHQtaFwiXSxcbiAgICBcIlZcIiwgaGVpZ2h0IC0gc1tcImJvdHRvbS1yaWdodC1oXCJdLFxuICAgIFwiQ1wiLCB3aWR0aCwgaGVpZ2h0IC0gc1tcImJvdHRvbS1yaWdodC1oXCJdLCB3aWR0aCwgaGVpZ2h0LCB3aWR0aCAtIHNbXCJib3R0b20tcmlnaHQtd1wiXSwgaGVpZ2h0LFxuICAgIFwiSFwiLCBzW1wiYm90dG9tLWxlZnQtd1wiXSxcbiAgICBcIkNcIiwgc1tcImJvdHRvbS1sZWZ0LXdcIl0sIGhlaWdodCwgMCwgaGVpZ2h0LCAwLCBoZWlnaHQgLSBzW1wiYm90dG9tLWxlZnQtaFwiXSxcbiAgICBcIlpcIlxuICBdLmpvaW4oXCIgXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy9ib3JkZXJJbWFnZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYodHlwZW9mIFdlYkZvbnQgPT0gXCJ1bmRlZmluZWRcIil7XG4gIGZhYnJpYy53ZWJGb250c0xvYWRlciA9IHJlcXVpcmUoXCIuLy4uLy4uL3BsdWdpbnMvd2ViZm9udC5qc1wiKTtcbn1lbHNle1xuICBmYWJyaWMud2ViRm9udHNMb2FkZXIgPSBXZWJGb250O1xufVxuXG4vL9C40L3RgtC10YDQtdGB0L3QsNGPINCx0LjQsdC70LjQvtGC0LXQutCwXG4vLyBodHRwOi8vb3BlbnR5cGUuanMub3JnL2luZGV4Lmh0bWxcbi8vdG9kbyBhZGQgc3RlcFxuLy9cbi8vIGZhYnJpYy5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RlcHMuc3BsaWNlKDMsMCxcImxvYWRXZWJmb250c1wiKTtcblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuQXBwbGljYXRpb24ucHJvdG90eXBlLCB7XG4gIGxvYWRXZWJmb250czogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYoZmFicmljLmlzTGlrZWx5Tm9kZSl7XG4gICAgICAvL3RvZG8g0YjRgNC40YTRgtGLINC90LUg0LPRgNGD0LfRj9GC0YHRjyDQvdCwINGB0LXRgNCy0LXRgNC1XG4gICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICB9XG4gICAgaWYodGhpcy5vcHRpb25zLmZvbnRzKXtcbiAgICAgIGlmKCF0aGlzLmZvbnRzKXRoaXMuZm9udHMgPSB7fTtcbiAgICAgIHRoaXMuZm9udHMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHRoaXMuZm9udHMsdGhpcy5vcHRpb25zLmZvbnRzKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuZm9udHMpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuZmlyZShcImxvYWRpbmdcIix7dHlwZTogXCJ3ZWJmb250c1wifSk7XG5cbiAgICB0aGlzLl9mb250cyA9IFtdO1xuXG4gICAgZm9yKHZhciBpIGluIHRoaXMuZm9udHMpe1xuICAgICAgdGhpcy5fZm9udHMgPSB0aGlzLl9mb250cy5jb25jYXQodGhpcy5mb250c1tpXSk7XG4gICAgfVxuICAgIHRoaXMuX2ZvbnRzID0gZmFicmljLnV0aWwub2JqZWN0LnNvcnRCeSh0aGlzLl9mb250cywgZnVuY3Rpb24oZm9udCl7IHJldHVybiBmb250OyB9KTtcblxuICAgIGlmKGZhYnJpYy53ZWJGb250c0xvYWRlciAmJiAodGhpcy5mb250cy5nb29nbGUgJiYgdGhpcy5mb250cy5nb29nbGUubGVuZ3RoIHx8IHRoaXMuZm9udHMuY3VzdG9tICYmIHRoaXMuZm9udHMuY3VzdG9tLmxlbmd0aCkgKXtcbiAgICAgIHZhciBmb250c19vcHRpb25zID0ge1xuICAgICAgICBhY3RpdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYodGhpcy5mb250cy5nb29nbGUgJiYgdGhpcy5mb250cy5nb29nbGUubGVuZ3RoKXtcbiAgICAgICAgZm9udHNfb3B0aW9ucy5nb29nbGUgPSAge1xuICAgICAgICAgIGZhbWlsaWVzOiB0aGlzLmZvbnRzLmdvb2dsZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYodGhpcy5mb250cy5jdXN0b20gJiYgdGhpcy5mb250cy5jdXN0b20ubGVuZ3RoKXtcbiAgICAgICAgZm9udHNfb3B0aW9ucy5jdXN0b20gPSAge1xuICAgICAgICAgIGZhbWlsaWVzOiB0aGlzLmZvbnRzLmN1c3RvbVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBmYWJyaWMud2ViRm9udHNMb2FkZXIubG9hZChmb250c19vcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgaWYgKHRoaXMud2FpdEZvcldlYmZvbnRzKSB7XG4gICAgICBmYWJyaWMudXRpbC5mb250cy53YWl0Rm9yKHRoaXMud2FpdEZvcldlYmZvbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gIH0sXG4gIGZvbnRzOiB7XG4gICAgc3RhbmRhcnQ6IFtcbiAgICAgICdBcmlhbCcsXG4gICAgICAnQXJpYWwgQmxhY2snLFxuICAgICAgJ0NvbWljIFNhbnMgTVMnLFxuICAgICAgJ0NvdXJpZXIgTmV3JyxcbiAgICAgICdHZW9yZ2lhJyxcbiAgICAgICdJbXBhY3QnLFxuICAgICAgJ0x1Y2lkYSBDb25zb2xlJyxcbiAgICAgICdUYWhvbWEnLFxuICAgICAgJ1RpbWVzIE5ldyBSb21hbicsXG4gICAgICAnR2VuZXZhJyxcbiAgICAgICdzYW5zLXNlcmlmJyxcbiAgICAgICdzZXJpZicsXG4gICAgICAnbW9ub3NwYWNlJyxcbiAgICAgICdjdXJzaXZlJ1xuICAgIF0sXG4gICAgZ29vZ2xlOiBbXSxcbiAgICBjdXN0b206IFtdXG4gIH1cbn0pO1xuXG5cbmZhYnJpYy51dGlsLmZvbnRzID0ge1xuICB3YWl0Rm9yOiBmdW5jdGlvbiAoZm9udHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGxvYWRlZEZvbnRzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGZvbnRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgKGZ1bmN0aW9uIChmb250KSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgdmFyeSBzaWduaWZpY2FudGx5IGFtb25nIGRpZmZlcmVudCBmb250c1xuICAgICAgICBub2RlLmlubmVySFRNTCA9ICdnaUl0VDFXUXlAIS0vIyc7XG4gICAgICAgIC8vIFZpc2libGUgLSBzbyB3ZSBjYW4gbWVhc3VyZSBpdCAtIGJ1dCBub3Qgb24gdGhlIHNjcmVlblxuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0gJy0xMDAwMHB4JztcbiAgICAgICAgbm9kZS5zdHlsZS50b3AgPSAnLTEwMDAwcHgnO1xuICAgICAgICAvLyBMYXJnZSBmb250IHNpemUgbWFrZXMgZXZlbiBzdWJ0bGUgY2hhbmdlcyBvYnZpb3VzXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udFNpemUgPSAnMzAwcHgnO1xuICAgICAgICAvLyBSZXNldCBhbnkgZm9udCBwcm9wZXJ0aWVzXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJztcbiAgICAgICAgbm9kZS5zdHlsZS5mb250VmFyaWFudCA9ICdub3JtYWwnO1xuICAgICAgICBub2RlLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnO1xuICAgICAgICBub2RlLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICAgICAgbm9kZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gJzAnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gICAgICAgIC8vIFJlbWVtYmVyIHdpZHRoIHdpdGggbm8gYXBwbGllZCB3ZWIgZm9udFxuICAgICAgICB2YXIgd2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuXG4gICAgICAgIG5vZGUuc3R5bGUuZm9udEZhbWlseSA9IGZvbnQ7XG5cbiAgICAgICAgdmFyIGludGVydmFsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRm9udCgpIHtcbiAgICAgICAgICAvLyBDb21wYXJlIGN1cnJlbnQgd2lkdGggd2l0aCBvcmlnaW5hbCB3aWR0aFxuICAgICAgICAgIGlmIChub2RlICYmIG5vZGUub2Zmc2V0V2lkdGggIT0gd2lkdGgpIHtcbiAgICAgICAgICAgICsrbG9hZGVkRm9udHM7XG4gICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICBub2RlID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiBhbGwgZm9udHMgaGF2ZSBiZWVuIGxvYWRlZFxuICAgICAgICAgIGlmIChsb2FkZWRGb250cyA+PSBmb250cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb2FkZWRGb250cyA9PSBmb250cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgfSwgNTApXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hlY2tGb250KCkpIHtcbiAgICAgICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGNoZWNrRm9udCwgNTApO1xuICAgICAgICB9XG4gICAgICB9KShmb250c1tpXSk7XG4gICAgfVxuICB9XG59XG5cbmZhYnJpYy5BcHBsaWNhdGlvbi5hZGRQbHVnaW4oXCJwb3N0bG9hZGVyc1wiLFwibG9hZFdlYmZvbnRzXCIpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tb2R1bGVzL2ZvbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxuZmFicmljLnV0aWwubWVkaWFSb290ID0gXCJcIjtcbmZhYnJpYy51dGlsLmFkZE5vQ2FjaGUgPSBmYWxzZTtcblxuZmFicmljLnV0aWwuX2xvYWRJbWFnZV9vdmVyd3JpdHRlbiA9IGZhYnJpYy51dGlsLmxvYWRJbWFnZTtcblxuXG4vLyBpZighZmFicmljLmlzTGlrZWx5Tm9kZSl7XG4vL1xuLy8gICB2YXIgVVJMID0gcmVxdWlyZSgndXJsJyksXG4vLyAgICAgSFRUUCA9IHJlcXVpcmUoJ2h0dHAnKSxcbi8vICAgICBIVFRQUyA9IHJlcXVpcmUoJ2h0dHBzJyksXG4vLyAgICAgSW1hZ2UgPSByZXF1aXJlKCdjYW52YXMnKS5JbWFnZTtcbi8vXG4vLyAgIC8qKiBAcHJpdmF0ZSAqL1xuLy8gICB2YXIgcmVxdWVzdCA9IGZ1bmN0aW9uICh1cmwsIGVuY29kaW5nLCBjYWxsYmFjaykge1xuLy8gICAgIHZhciBvVVJMID0gVVJMLnBhcnNlKHVybCk7XG4vL1xuLy8gICAgIC8vIGRldGVjdCBpZiBodHRwIG9yIGh0dHBzIGlzIHVzZWRcbi8vICAgICBpZiAoICFvVVJMLnBvcnQgKSB7XG4vLyAgICAgICBvVVJMLnBvcnQgPSAoIG9VUkwucHJvdG9jb2wuaW5kZXhPZignaHR0cHM6JykgPT09IDAgKSA/IDQ0MyA6IDgwO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLy8gYXNzaWduIHJlcXVlc3QgaGFuZGxlciBiYXNlZCBvbiBwcm90b2NvbFxuLy8gICAgIHZhciByZXFIYW5kbGVyID0gKG9VUkwucHJvdG9jb2wuaW5kZXhPZignaHR0cHM6JykgPT09IDAgKSA/IEhUVFBTIDogSFRUUCxcbi8vICAgICAgIHJlcSA9IHJlcUhhbmRsZXIucmVxdWVzdCh7XG4vLyAgICAgICAgIGhvc3RuYW1lOiBvVVJMLmhvc3RuYW1lLFxuLy8gICAgICAgICBwb3J0OiBvVVJMLnBvcnQsXG4vLyAgICAgICAgIHBhdGg6IG9VUkwucGF0aCxcbi8vICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuLy8gICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgdmFyIGJvZHkgPSAnJztcbi8vICAgICAgICAgaWYgKGVuY29kaW5nKSB7XG4vLyAgICAgICAgICAgcmVzcG9uc2Uuc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgY2FsbGJhY2soYm9keSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICByZXNwb25zZS5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuLy8gICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbi8vICAgICAgICAgICAgIGJvZHkgKz0gY2h1bms7XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgIH0pO1xuLy9cbi8vICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4vLyAgICAgICBpZiAoZXJyLmVycm5vID09PSBwcm9jZXNzLkVDT05OUkVGVVNFRCkge1xuLy8gICAgICAgICBmYWJyaWMubG9nKCdFQ09OTlJFRlVTRUQ6IGNvbm5lY3Rpb24gcmVmdXNlZCB0byAnICsgb1VSTC5ob3N0bmFtZSArICc6JyArIG9VUkwucG9ydCk7XG4vLyAgICAgICB9XG4vLyAgICAgICBlbHNlIHtcbi8vICAgICAgICAgZmFicmljLmxvZyhlcnIubWVzc2FnZSk7XG4vLyAgICAgICB9XG4vLyAgICAgICBjYWxsYmFjayhudWxsKTtcbi8vICAgICB9KTtcbi8vXG4vLyAgICAgcmVxLmVuZCgpO1xuLy8gICB9XG4vL1xuLy8gICAvKiogQHByaXZhdGUgKi9cbi8vICAgdmFyIHJlcXVlc3RGcyA9IGZ1bmN0aW9uIChwYXRoLCBjYWxsYmFjaykge1xuLy8gICAgIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4vLyAgICAgZnMucmVhZEZpbGUocGF0aCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuLy8gICAgICAgaWYgKGVycikge1xuLy8gICAgICAgICBmYWJyaWMubG9nKGVycik7XG4vLyAgICAgICAgIHRocm93IGVycjtcbi8vICAgICAgIH1cbi8vICAgICAgIGVsc2Uge1xuLy8gICAgICAgICBjYWxsYmFjayhkYXRhKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcbi8vICAgfTtcbi8vXG4vLyAgIGZhYnJpYy51dGlsLmxvYWRJbWFnZSA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbi8vXG4vL1xuLy8gICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbi8vICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuLy8gICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChjb250ZXh0LCBudWxsLCB0cnVlKTtcbi8vICAgICB9O1xuLy8gICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuLy8gICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuLy8gICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChjb250ZXh0LCBpbWcpO1xuLy8gICAgIH07XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGNyZWF0ZUltYWdlQW5kQ2FsbEJhY2soZGF0YSkge1xuLy8gICAgICAgaWYgKGRhdGEpIHtcbi8vICAgICAgICAgaW1nLnNyYyA9IGRhdGE7XG4vLyAgICAgICAgIC8vIHByZXNlcnZpbmcgb3JpZ2luYWwgdXJsLCB3aGljaCBzZWVtcyB0byBiZSBsb3N0IGluIG5vZGUtY2FudmFzXG4vLyAgICAgICAgIGltZy5fc3JjID0gdXJsO1xuLy8gICAgICAgfVxuLy8gICAgICAgZWxzZSB7XG4vLyAgICAgICAgIGltZyA9IG51bGw7XG4vLyAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgbnVsbCwgdHJ1ZSk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBpZiAodXJsICYmICh1cmwgaW5zdGFuY2VvZiBCdWZmZXIgfHwgdXJsLmluZGV4T2YoJ2RhdGEnKSA9PT0gMCkpIHtcbi8vICAgICAgIGltZy5zcmMgPSBpbWcuX3NyYyA9IHVybDtcbi8vICAgICB9XG4vLyAgICAgZWxzZSBpZiAodXJsICYmIHVybC5pbmRleE9mKCdodHRwJykgIT09IDApIHtcbi8vICAgICAgIHZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG4vLyAgICAgICB1cmwgPSBmYWJyaWMudXRpbC5nZXRVUkwodXJsKTtcbi8vICAgICAgIHVybCA9ICAgcGF0aC5yZXNvbHZlKGZhYnJpYy51dGlsLm1lZGlhUm9vdCwgdXJsKTtcbi8vICAgICAgIGltZy5zcmMgPSAgdXJsO1xuLy8gICAgICAgLy8gcmVxdWVzdEZzKHVybCwgY3JlYXRlSW1hZ2VBbmRDYWxsQmFjayk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYgKHVybCkge1xuLy8gICAgICAgcmVxdWVzdCh1cmwsICdiaW5hcnknLCBjcmVhdGVJbWFnZUFuZENhbGxCYWNrKTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSB7XG4vLyAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHVybCk7XG4vLyAgICAgfVxuLy8gICB9O1xuLy8gfWVsc2V7XG4gIGZhYnJpYy51dGlsLmxvYWRSZXNvdXJjZXMgPSBmdW5jdGlvbiAocmVzb3VyY2VzLCBjYWxsYmFjaywgY29udGV4dCwgY3Jvc3NPcmlnaW4pIHtcblxuICAgIHZhciBsb2FkZWRSZXNvdXJjZXMgPSB7fTtcbiAgICB2YXIgbG9hZGVyID0gZmFicmljLnV0aWwucXVldWVMb2FkKE9iamVjdC5rZXlzKHJlc291cmNlcykubGVuZ3RoLGZ1bmN0aW9uKCl7XG4gICAgICBjYWxsYmFjayhsb2FkZWRSZXNvdXJjZXMpO1xuICAgIH0pO1xuICAgIGZvcih2YXIgaSBpbiByZXNvdXJjZXMpe1xuICAgICAgKGZ1bmN0aW9uKGkpe1xuICAgICAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UocmVzb3VyY2VzW2ldLCBmdW5jdGlvbihpbWFnZSl7XG4gICAgICAgICAgbG9hZGVkUmVzb3VyY2VzW2ldID0gaW1hZ2U7XG4gICAgICAgICAgbG9hZGVyKCk7XG4gICAgICAgIH0sIGNvbnRleHQsIGNyb3NzT3JpZ2luKTtcbiAgICAgIH0oaSkpO1xuICAgIH1cbiAgfTtcblxuICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaywgY29udGV4dCwgY3Jvc3NPcmlnaW4pIHtcbiAgICB1cmwgPSBmYWJyaWMudXRpbC5nZXRVUkwodXJsKTtcbiAgICBmdW5jdGlvbiBfY2hlY2tfZXJyb3JzKGltZyl7XG4gICAgICAvL9C40LfQvtCx0YDQsNC20LXQvdC40LUg0L3QtSDQsdGL0LvQviDQt9Cw0LPRgNGD0LbQtdC90L5cbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLGltZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWJyaWMuZXJyb3JzLnB1c2goe3R5cGU6IFwiaW1hZ2VcIiwgbWVzc2FnZTogXCJJbWFnZSB3YXMgbm90IGxvYWRlZFwifSk7XG4gICAgICAgIGZhYnJpYy51dGlsLl9sb2FkSW1hZ2Vfb3ZlcndyaXR0ZW4oZmFicmljLm1lZGlhLmVycm9yLCBjYWxsYmFjaywgY29udGV4dCwgY3Jvc3NPcmlnaW4gfHwgJ0Fub255bW91cycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGZhYnJpYy5kZWJ1Z1RpbWVvdXQpe1xuICAgICAgc2V0VGltZW91dChmYWJyaWMudXRpbC5fbG9hZEltYWdlX292ZXJ3cml0dGVuLmJpbmQodGhpcyx1cmwsIF9jaGVja19lcnJvcnMgLCBjb250ZXh0LCBjcm9zc09yaWdpbiB8fCAnQW5vbnltb3VzJyksZmFicmljLmRlYnVnVGltZW91dClcbiAgICB9ZWxzZXtcbiAgICAgIGZhYnJpYy51dGlsLl9sb2FkSW1hZ2Vfb3ZlcndyaXR0ZW4odXJsLCBfY2hlY2tfZXJyb3JzICwgY29udGV4dCwgY3Jvc3NPcmlnaW4gfHwgJ0Fub255bW91cycpO1xuICAgIH1cbiAgfTtcblxuXG5mYWJyaWMudXRpbC5nZXRVUkwgPSBmdW5jdGlvbih1cmwpe1xuICBpZiAodXJsLmluZGV4T2YoJ2Jsb2InKSAhPT0gMCAmJiB1cmwuaW5kZXhPZignZGF0YScpICE9PSAwICYmIHVybC5pbmRleE9mKCc6Ly8nKSA9PSAtMSkge1xuICAgIHVybCA9IGZhYnJpYy51dGlsLm1lZGlhUm9vdCArIHVybDtcbiAgfVxuICBpZiAoZmFicmljLnV0aWwuYWRkTm9DYWNoZSAmJiAvXihodHRwfGh0dHBzKVxcOlxcL1xcLy8udGVzdCh1cmwpKSB7XG4gICAgdXJsICs9ICc/bm8tY2FjaGU9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cblxuZmFicmljLnV0aWwubG9hZFZpZGVvID0gZnVuY3Rpb24gKHNvdXJjZXMsIGNhbGxiYWNrLCBjb250ZXh0LCBjcm9zc09yaWdpbikge1xuXG4gIGZ1bmN0aW9uIGxvYWRJdCh1cmwpe1xuICAgIHZpZGVvLnNyYyA9IGZhYnJpYy51dGlsLmdldFVSTCh1cmwpO1xuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBjYWxsYmFjayh2aWRlbyk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgdmlkZW8ubG9hZCgpO1xuICB9XG5cblxuXG5cbiAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcblxuXG4gIC8vdHJ5aW5nIHRvIGZpbmQgdGhlIG1vc3Qgc3VpdGFibGUgc291cmNlIGZvciBjdXJyZW50IGJyb3dzZXJcbiAgZm9yICh2YXIgdHlwZSBpbiBzb3VyY2VzKSB7XG4gICAgaWYodmlkZW8uY2FuUGxheVR5cGUodHlwZSkgPT0gXCJ5ZXNcIil7XG4gICAgICB0aGlzLm1lZGlhVHlwZSA9IHR5cGU7XG4gICAgICBsb2FkSXQoc291cmNlc1t0eXBlXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGZvciAodmFyIHR5cGUgaW4gc291cmNlcykge1xuICAgIGlmKHZpZGVvLmNhblBsYXlUeXBlKHR5cGUpID09IFwibWF5YmVcIil7XG4gICAgICB0aGlzLm1lZGlhVHlwZSA9IHR5cGU7XG4gICAgICBsb2FkSXQoc291cmNlc1t0eXBlXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGNvbnNvbGUud2FybihcInZpZGVvIHNvdXJjZXMgZm9ybWF0cyBpcyBub3Qgc3VwcG9ydGVkXCIpXG5cblxufTtcblxuZmFicmljLnV0aWwuX2xvYWRTVkdGcm9tVVJMX292ZXJ3cml0dGVuID0gZmFicmljLmxvYWRTVkdGcm9tVVJMO1xuZmFicmljLmxvYWRTVkdGcm9tVVJMID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2ssIHJldml2ZXIpIHtcbiAgaWYgKHVybC5pbmRleE9mKCdkYXRhJykgIT09IDAgJiYgdXJsLmluZGV4T2YoJzovLycpID09IC0xKSB7XG4gICAgdXJsID0gZmFicmljLnV0aWwubWVkaWFSb290ICsgdXJsO1xuICB9XG4gIGlmIChmYWJyaWMudXRpbC5hZGROb0NhY2hlICYmIC9eKGh0dHB8aHR0cHMpXFw6XFwvXFwvLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgKz0gJz9uby1jYWNoZT0nICsgbW9tZW50KCkuZm9ybWF0KCd4Jyk7XG4gIH1cbiAgZmFicmljLnV0aWwuX2xvYWRTVkdGcm9tVVJMX292ZXJ3cml0dGVuKHVybCwgZnVuY3Rpb24oZGF0YSl7XG4gICAgIGlmKGRhdGEpe1xuICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgfVxuXG4gICAgdmFyIHhtbCA9IGpRdWVyeS5wYXJzZVhNTChhdG9iKGZhYnJpYy5tZWRpYS5lcnJvci5zdWJzdHIoMjYpKSk7XG5cbiAgICBmYWJyaWMucGFyc2VTVkdEb2N1bWVudCh4bWwuZG9jdW1lbnRFbGVtZW50LCBmdW5jdGlvbiAocmVzdWx0cywgb3B0aW9ucykge1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzdWx0cywgb3B0aW9ucyk7XG4gICAgfSwgcmV2aXZlcik7XG5cbiAgfSwgcmV2aXZlcik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tb2R1bGVzL2Zyb21VUkwuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIEhpc3RvcnkgPSByZXF1aXJlKCcuLy4uL3BsdWdpbnMvaGlzdG9yeScpO1xuXG5IaXN0b3J5LnByb3RvdHlwZS5pbnNlcnRSZWNvcmRzID0gZmFsc2U7XG5IaXN0b3J5LnByb3RvdHlwZS5hY3Rpb25zID0ge1xuICB1bmRvOiB7XG4gICAga2V5Q29kZTogJ3onLFxuICAgIGN0cmxLZXk6ICB0cnVlLFxuICAgIG9ic2VydmU6ICdjaGFuZ2VkJyxcbiAgICBjbGFzc05hbWU6ICdmYSBmYS11bmRvJyxcbiAgICB0aXRsZTogJ3VuZG8nLFxuICAgIGVuYWJsZWQ6ICdjYW5VbmRvJyxcbiAgICBhY3Rpb246IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnVuZG8oKTtcbiAgICB9XG4gIH0sXG4gIHJlY29yZHM6IHtcbiAgICB0aXRsZTogICAgICAgICAgXCJyZWNvcmRzXCIsXG4gICAgaXRlbUNsYXNzTmFtZTogIFwiZmlsdGVycy1zZWxlY3RvclwiLFxuICAgIGNsYXNzTmFtZTogICAgICBcImZhIGZhLWhpc3RvcnlcIixcbiAgICB0eXBlOiAgICAgICAgICAgXCJzZWxlY3RcIixcbiAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24oc3RhdGUsIGNvbnRhaW5lcikge1xuICAgICAgaWYgKHN0YXRlLmFueSkge1xuICAgICAgICByZXR1cm4gc3RhdGUudGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKCc8c3Bhbj4nICsgc3RhdGUuaWQgKyBcIjpcIiArIHN0YXRlLnR5cGUgKyAnPC9zcGFuPicpO1xuICAgIH0sXG4gICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uKHN0YXRlLCBjb250YWluZXIsZGF0YSkge1xuICAgICAgaWYoIXN0YXRlLnR5cGUpcmV0dXJuO1xuICAgICAgdmFyIF9rZXlzID0gc3RhdGUub3JpZ2luYWxTdGF0ZSAmJiBPYmplY3Qua2V5cyhzdGF0ZS5vcmlnaW5hbFN0YXRlKS5qb2luKCcsJykgfHwgJyc7XG4gICAgICB2YXIgdHlwZSA9IHN0YXRlLm9iamVjdCAmJiBzdGF0ZS5vYmplY3QudHlwZSB8fCAnJztcbiAgICAgIHJldHVybiAkKFwiPHNwYW4+e2lkfTp7dHlwZX0oe290eXBlfSB7a2V5c30pPC9zcGFuPlwiLmZvcm1hdChmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHtrZXlzIDogX2tleXMsIG90eXBlOiB0eXBlfSxzdGF0ZSkpKTtcbiAgICAgIC8vIGlmKHN0YXRlLmlkICE9IFwibm9uZVwiKXtcbiAgICAgIC8vICAgdmFyICRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuICAgICAgLy8gICAkZWwucHJlcGVuZCgkY2FudmFzKTtcbiAgICAgIC8vIH1cbiAgICAgIC8vIHJldHVybiAkZWw7XG4gICAgfSxcbiAgICB2YWx1ZTogICAgICB7XG4gICAgICBvYnNlcnZlOiAnY2hhbmdlZCcsXG4gICAgICBzZXQgOiBmdW5jdGlvbih2YWwsZmlsdGVyc0RhdGEpe1xuICAgICAgICB0aGlzLmdvdG8odmFsKTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY29yZHNbdGhpcy5jdXJyZW50XS5pZDtcbiAgICAgIH0sXG4gICAgICBvcHRpb25zOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNvcmRzO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVkbzoge1xuICAgIGtleUNvZGU6ICd5JyxcbiAgICBjdHJsS2V5OiAgdHJ1ZSxcbiAgICBvYnNlcnZlOiAnY2hhbmdlZCcsXG4gICAgY2xhc3NOYW1lOiAnZmEgZmEtcmVwZWF0JyxcbiAgICB0aXRsZTogJ3JlZG8nLFxuICAgIGVuYWJsZWQ6ICdjYW5SZWRvJyxcbiAgICBhY3Rpb246IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnJlZG8oKTtcbiAgICB9XG4gIH1cbn07XG5cbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLlNsaWRlQ2FudmFzLnByb3RvdHlwZS5hY3Rpb25zLCB7XG4gIGhpc3Rvcnk6IHtcbiAgICB0aXRsZTogJ2hpc3RvcnknLFxuICAgIHR5cGU6ICdtZW51JyxcbiAgICB0YXJnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpc3Rvcnk7XG4gICAgfSxcbiAgICBtZW51OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3Rpb25zO1xuICAgIH1cbiAgfVxufSk7XG5cbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLkNhbnZhcy5wcm90b3R5cGUsIHtcbiAgaW5zZXJ0SGlzdG9yeTogZmFsc2UsXG4gIG9uT2JqZWN0TW9kaWZpZWQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCF0aGlzLmhpc3RvcnkuZW5hYmxlZCB8fCB0aGlzLnByb2Nlc3NpbmcgfHwgdGhpcy5oaXN0b3J5LnByb2Nlc3NpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIF9jYW52YXMgPSBlLnRhcmdldC5jYW52YXMgfHwgZS50YXJnZXQud3JhcHBlckVsICYmIGUudGFyZ2V0O1xuXG4gICAgdGhpcy5oaXN0b3J5LmFkZCh7XG4gICAgICBjYW52YXM6ICBlLnRhcmdldC5jYW52YXMub3JpZ2luYWxTbGlkZSB8fCBlLnRhcmdldC5jYW52YXMsXG4gICAgICBvcmlnaW5hbFN0YXRlOiAgZS5zdGF0ZXMub3JpZ2luYWwsXG4gICAgICBtb2RpZmllZFN0YXRlOiAgZS5zdGF0ZXMubW9kaWZpZWQsXG4gICAgICBvYmplY3Q6IGUudGFyZ2V0LFxuICAgICAgdHlwZTogJ29iamVjdDptb2RpZmllZCcsXG4gICAgICB1bmRvOiBmdW5jdGlvbiAoX2FjdGlvbikge1xuICAgICAgICBfYWN0aW9uLm9iamVjdC5zZXQoX2FjdGlvbi5vcmlnaW5hbFN0YXRlKTtcbiAgICAgICAgaWYoX2FjdGlvbi5jYW52YXMubWlycm9yU2xpZGUgPT0gdGhpcy5jYW52YXMpe1xuICAgICAgICAgIF9hY3Rpb24ub2JqZWN0LnNldENvb3JkcygpO1xuICAgICAgICAgIHZhciBfY2FudmFzID0gdGhpcy5jYW52YXMgfHwgdGhpcztcbiAgICAgICAgICBfY2FudmFzLnJlbmRlckFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIF9hY3Rpb24uY2FudmFzLmZpcmUoJ29iamVjdDptb2RpZmllZCcsIHsgdGFyZ2V0OiBfYWN0aW9uLm9iamVjdCB9KTtcbiAgICAgICAgX2FjdGlvbi5vYmplY3QuZmlyZSgnbW9kaWZpZWQnKTtcbiAgICAgICAgX2FjdGlvbi5jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24gKF9hY3Rpb24pIHtcbiAgICAgICAgX2FjdGlvbi5vYmplY3Quc2V0KF9hY3Rpb24ubW9kaWZpZWRTdGF0ZSk7XG4gICAgICAgIF9hY3Rpb24ub2JqZWN0LnNldENvb3JkcygpO1xuICAgICAgICBpZihfYWN0aW9uLmNhbnZhcy5taXJyb3JTbGlkZSA9PSB0aGlzLmNhbnZhcyl7XG4gICAgICAgICAgX2FjdGlvbi5vYmplY3Quc2V0Q29vcmRzKCk7XG4gICAgICAgICAgdmFyIF9jYW52YXMgPSB0aGlzLmNhbnZhcyB8fCB0aGlzO1xuICAgICAgICAgIF9jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgX2FjdGlvbi5jYW52YXMuZmlyZSgnb2JqZWN0Om1vZGlmaWVkJywgeyB0YXJnZXQ6IF9hY3Rpb24ub2JqZWN0IH0pO1xuICAgICAgICBfYWN0aW9uLm9iamVjdC5maXJlKCdtb2RpZmllZCcpO1xuICAgICAgICBfYWN0aW9uLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgY2xlYXJIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gIH0sXG4gIGRpc2FibGVIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXN0b3J5LmVuYWJsZWQgPSBmYWxzZTtcbiAgfSxcbiAgX2FkZF9vYmplY3RfaGlzdG9yeV9hY3Rpb246IGZ1bmN0aW9uIChfYWN0aW9uKSB7XG4gICAgdmFyIF9jYW52YXMgPSB0aGlzLmNhbnZhcyB8fCB0aGlzO1xuICAgIGlmKHRoaXMuY2FudmFzICYmIF9hY3Rpb24uY2FudmFzLm1pcnJvclNsaWRlID09IHRoaXMuY2FudmFzKXtcbiAgICAgIF9jYW52YXMuYWRkKF9hY3Rpb24ub2JqZWN0KTtcbiAgICAgIF9jYW52YXMuc2V0QWN0aXZlT2JqZWN0KF9hY3Rpb24ub2JqZWN0KTtcbiAgICAgIF9jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgfWVsc2V7XG4gICAgICBfYWN0aW9uLmNhbnZhcy5hZGQoX2FjdGlvbi5vYmplY3QpO1xuICAgIH1cbiAgICBfYWN0aW9uLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgfSxcblxuICBfcmVtb3ZlX29iamVjdF9oaXN0b3J5X2FjdGlvbjogZnVuY3Rpb24gKF9hY3Rpb24pIHtcbiAgICBfYWN0aW9uLmNhbnZhcy5yZW1vdmUoX2FjdGlvbi5vYmplY3QpO1xuICAgIF9hY3Rpb24uY2FudmFzLnJlbmRlckFsbCgpO1xuICAgIGlmKHRoaXMuY2FudmFzICYmIF9hY3Rpb24uY2FudmFzLm1pcnJvclNsaWRlID09IHRoaXMuY2FudmFzKXtcbiAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xuICAgIH1cbiAgfSxcblxuICBvbk9iamVjdFJlbW92ZWQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKCF0aGlzLmhpc3RvcnkuZW5hYmxlZCB8fCB0aGlzLnByb2Nlc3NpbmcgfHwgdGhpcy5oaXN0b3J5LnByb2Nlc3NpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5oaXN0b3J5LmFkZCh7XG4gICAgICBjYW52YXM6IGUudGFyZ2V0LmNhbnZhcy5vcmlnaW5hbFNsaWRlIHx8IGUudGFyZ2V0LmNhbnZhcyxcbiAgICAgIG9iamVjdDogZS50YXJnZXQsXG4gICAgICB0eXBlOiAnb2JqZWN0OnJlbW92ZWQnLFxuICAgICAgcmVkbzogdGhpcy5fcmVtb3ZlX29iamVjdF9oaXN0b3J5X2FjdGlvbixcbiAgICAgIHVuZG86IHRoaXMuX2FkZF9vYmplY3RfaGlzdG9yeV9hY3Rpb25cbiAgICB9KTtcbiAgfSxcbiAgb25EcmF3QWZ0ZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBpZiAoIXRoaXMuaGlzdG9yeS5lbmFibGVkIHx8IHRoaXMucHJvY2Vzc2luZyB8fCB0aGlzLmhpc3RvcnkucHJvY2Vzc2luZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnkuYWRkKHRoaXMuZnJlZURyYXdpbmdCcnVzaC5nZXRIaXN0b3J5UmVjb3JkKGV2ZW50KSlcbiAgfSxcbiAgb25PYmplY3RBZGRlZDogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIXRoaXMuaGlzdG9yeS5lbmFibGVkIHx8IHRoaXMucHJvY2Vzc2luZyB8fCB0aGlzLmhpc3RvcnkucHJvY2Vzc2luZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmhpc3RvcnkuYWRkKHtcbiAgICAgIGNhbnZhczogIGUudGFyZ2V0LmNhbnZhcy5vcmlnaW5hbFNsaWRlIHx8IGUudGFyZ2V0LmNhbnZhcyxcbiAgICAgIG9iamVjdDogZS50YXJnZXQsXG4gICAgICB0eXBlOiAnb2JqZWN0OmFkZGVkJyxcbiAgICAgIHVuZG86IHRoaXMuX3JlbW92ZV9vYmplY3RfaGlzdG9yeV9hY3Rpb24sXG4gICAgICByZWRvOiB0aGlzLl9hZGRfb2JqZWN0X2hpc3RvcnlfYWN0aW9uXG4gICAgfSk7XG4gIH0sXG4gIGluaXRIaXN0b3J5OiBmdW5jdGlvbiAoaGlzdG9yeSkge1xuICAgIGlmKCFoaXN0b3J5KXtcbiAgICAgIGhpc3RvcnkgPSBuZXcgSGlzdG9yeSh0aGlzKTtcbiAgICAgIGhpc3RvcnkuYXBwbGljYXRpb24gPSB0aGlzLmFwcGxpY2F0aW9uO1xuICAgIH1cblxuICAgIHRoaXMuaGlzdG9yeSA9IGhpc3Rvcnk7XG4gICAgdGhpcy5vbih7XG4gICAgICAnbG9hZGluZzpiZWdpbic6ICAgIHRoaXMuY2xlYXJIaXN0b3J5LFxuICAgICAgJ2RyYXc6YWZ0ZXInOiAgICAgICB0aGlzLm9uRHJhd0FmdGVyLFxuICAgICAgJ29iamVjdDptb2RpZmllZCc6ICB0aGlzLm9uT2JqZWN0TW9kaWZpZWQsXG4gICAgICAnb2JqZWN0OmFkZGVkJzogICAgIHRoaXMub25PYmplY3RBZGRlZCxcbiAgICAgICdvYmplY3Q6cmVtb3ZlZCc6ICAgdGhpcy5vbk9iamVjdFJlbW92ZWRcbiAgICB9KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5oaXN0b3J5Lm9uKCdjaGFuZ2VkJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZih0aGlzLmFjdGl2ZUFjdGlvbi5jYW52YXMpe1xuICAgICAgICB0aGlzLmFjdGl2ZUFjdGlvbi5jYW52YXMubW9tZW50ID0gZS5hY3Rpb24ubW9tZW50O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBwcm90byA9IHRoaXMuYXBwbGljYXRpb24ucHJvdG90eXBlcy5IaXN0b3J5O1xuICAgIGlmKHByb3RvKXtcbiAgICAgIGlmKHByb3RvLmV2ZW50TGlzdGVuZXJzKXtcbiAgICAgICAgaGlzdG9yeS5vbihwcm90by5ldmVudExpc3RlbmVycyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBlbmFibGVIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXN0b3J5LmVuYWJsZWQgPSB0cnVlO1xuICB9XG59KTtcblxuaWYoZmFicmljLlByb2plY3Qpe1xuICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5Qcm9qZWN0LnByb3RvdHlwZS5hY3Rpb25zLCB7XG4gICAgaGlzdG9yeToge1xuICAgICAgaW5zZXJ0OiAnaGlzdG9yeVRvb2xzJyxcbiAgICAgIHRpdGxlOiAnaGlzdG9yeScsXG4gICAgICB0eXBlOiAnbWVudScsXG4gICAgICB0YXJnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlzdG9yeTtcbiAgICAgIH0sXG4gICAgICBtZW51OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5BcHBsaWNhdGlvbi5wcm90b3R5cGUsIHtcbiAgICBfZGVmYXVsdF9ldmVudF9saXN0ZW5lcnMgOiB7XG4gICAgICBcImNyZWF0ZWRcIjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5KSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvamVjdCkge1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmluaXRIaXN0b3J5KCk7XG4gICAgICAgICAgICB0aGlzLnByb2plY3QuZW5hYmxlSGlzdG9yeSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbnZhcykge1xuICAgICAgICAgIHRoaXMuY2FudmFzLmluaXRIaXN0b3J5KCk7XG4gICAgICAgICAgdGhpcy5jYW52YXMuZW5hYmxlSGlzdG9yeSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuUHJvamVjdC5wcm90b3R5cGUsIHtcbiAgICBfZGVmYXVsdF9ldmVudF9saXN0ZW5lcnMgOiB7XG4gICAgICBcInNsaWRlOmNoYW5nZTpiZWdpblwiIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gdHJ1ZSA7XG4gICAgICAgIGlmKHRoaXMuaGlzdG9yeSl7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5LnByb2Nlc3NpbmcgPSB0cnVlIDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwic2xpZGU6Y2hhbmdlZFwiIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuaGlzdG9yeSl7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5LnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaGlzdG9yeVRvb2xzOiBmYWxzZSxcbiAgICBlbmFibGVIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmhpc3RvcnkuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy9oaXN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogSW50ZXJhY3RpdmVNb2RlIG1peGluLiBBbGxvdyB0byBzd2l0Y2ggYmV0d2VlbiBwYW4vZWRpdC9kcmF3aW5nIGNhbnZhcyBtb2Rlcy5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgX21vdXNlX2Rvd25fb3ZlcndyaXR0ZW4gPSBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5fb25Nb3VzZURvd247XG52YXIgX21vdXNlX3VwX292ZXJ3cml0dGVuID0gZmFicmljLkNhbnZhcy5wcm90b3R5cGUuX29uTW91c2VVcDtcbnZhciBfbW91c2VfbW92ZV9vdmVyd3JpdHRlbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLl9vbk1vdXNlTW92ZTtcblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLCB7XG4gIHNwZWNpYWxQcm9wZXJ0aWVzOiBmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLnNwZWNpYWxQcm9wZXJ0aWVzLmNvbmNhdChbXCJpbnRlcmFjdGl2ZU1vZGVcIl0pLFxuICBfaW5pdEV2ZW50TGlzdGVuZXJzX292ZXJ3cml0dGVuOiBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5faW5pdEV2ZW50TGlzdGVuZXJzLFxuICBfaW5pdEV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5pdEV2ZW50TGlzdGVuZXJzX292ZXJ3cml0dGVuKCk7XG4gICAgdGhpcy5fX19vbktleURvd24gPSB0aGlzLl9vbktleURvd24uYmluZCh0aGlzKTtcbiAgICBmYWJyaWMudXRpbC5hZGRMaXN0ZW5lcihmYWJyaWMud2luZG93LCAna2V5ZG93bicsIHRoaXMuX19fb25LZXlEb3duKTtcbiAgfSxcbiAgX3JlbW92ZUxpc3RlbmVyc19vdmVyd3JpdHRlbjogZmFicmljLkNhbnZhcy5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXJzLFxuICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnNfb3ZlcndyaXR0ZW4oKTtcbiAgICBmYWJyaWMudXRpbC5yZW1vdmVMaXN0ZW5lcihmYWJyaWMud2luZG93LCAna2V5ZG93bicsIHRoaXMuX19fb25LZXlEb3duKTtcbiAgfSxcbiAgX29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNaXhlZE1vZGUoZSk7XG4gIH0sXG4gIGdldEludGVyYWN0aXZlTW9kZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmludGVyYWN0aXZlTW9kZTtcbiAgfSxcbiAgc2V0SW50ZXJhY3RpdmVNb2RlOiBmdW5jdGlvbiAodG9vbCkge1xuICAgIC8vdG9kbyBjaGVja3RoaXMgb3V0XG4gICAgLy8gaWYgKHRvb2wgPT09ICdoYW5kJykge1xuICAgIC8vICAgdGhpcy5zZXRDdXJzb3IoJ3BvaW50ZXInKTtcbiAgICAvLyB9XG4gICAgdGhpcy5pc0RyYXdpbmdNb2RlID0gKHRvb2wgPT09ICdkcmF3Jyk7XG4gICAgdGhpcy5pc0hhbmRNb2RlID0gKHRvb2wgPT09ICdoYW5kJyk7XG4gICAgdGhpcy5pbnRlcmFjdGl2ZSA9ICh0b29sICE9PSAnZGlzYWJsZWQnKTtcbiAgICB0aGlzLmlzTWl4ZWRNb2RlID0gKHRvb2wgPT09ICdtaXhlZCcpO1xuXG4gICAgaWYgKCF0aGlzLmludGVyYWN0aXZlKSB7XG4gICAgICB0aGlzLnVwcGVyQ2FudmFzRWwuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICB0aGlzLmludGVyYWN0aXZlTW9kZSA9IHRvb2w7XG4gIH0sXG5cbiAgLyoqXG4gICAqICBjdXJyZW50IG1vZGVcbiAgICogIEB2YWx1ZXMgZGVmYXVsdCB8IGhhbmQgfCBzZWxlY3Rpb25cbiAgICogIEBjb21tZW50XG4gICAqICAgICAgaGFuZCAgICAgIC0gbW92aW5nIGNhbnZhc1xuICAgKiAgICAgIGRyYXcgLSBkcmF3aW5nIHJlYWN0YW5nbGVzXG4gICAqICAgICAgc2VsZWN0aW9uIC0gZGVmYXVsdCBiZWhhdmlvclxuICAgKi9cbiAgaW50ZXJhY3RpdmVNb2RlOiAnZGVmYXVsdCcsXG5cbiAgaXNIYW5kTW9kZTogZmFsc2UsXG4gIF9oYW5kTW9kZUN1cnNvck1vdmU6IGZhbHNlLFxuICBfaGFuZE1vZGVDdXJzb3JEb3duOiBmYWxzZSxcbiAgX2hhbmRNb2RlQ3Vyc29yUG9zaXRpb246IHt4OiAwLCB5OiAwfSxcbiAgX2hhbmRNb2RlTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgIGlmICh0aGlzLl9oYW5kTW9kZUN1cnNvckRvd24gPT09IHRydWUpIHtcblxuICAgICAgaWYgKGUucGFnZVkgPT09IHRoaXMuX2hhbmRNb2RlQ3Vyc29yUG9zaXRpb24ueSAmJiBlLnBhZ2VYID09PSB0aGlzLl9oYW5kTW9kZUN1cnNvclBvc2l0aW9uLngpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9oYW5kTW9kZUN1cnNvck1vdmUgPSB0cnVlO1xuXG4gICAgICB2YXIgc2Nyb2xsID0ge3g6IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNF0sIHk6IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNV19O1xuXG4gICAgICB2YXIgbmV3U2Nyb2xsID0ge1xuICAgICAgICB4OiBzY3JvbGwueCAtICh0aGlzLl9oYW5kTW9kZUN1cnNvclBvc2l0aW9uLnggLSBlLnBhZ2VYKSxcbiAgICAgICAgeTogc2Nyb2xsLnkgLSAodGhpcy5faGFuZE1vZGVDdXJzb3JQb3NpdGlvbi55IC0gZS5wYWdlWSlcbiAgICAgIH07XG5cbiAgICAgIHZhciBkaW1zID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5zaXplLndpZHRoICogdGhpcy56b29tIC0gdGhpcy5sb3dlckNhbnZhc0VsLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuc2l6ZS5oZWlnaHQgKiB0aGlzLnpvb20gLSB0aGlzLmxvd2VyQ2FudmFzRWwuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgLyogIHRvZG8gbmVlZCB0byBhZGQgc29tZSByZXN0cmljdGlvbnMgbGF0ZXJcbiAgICAgICAvL01hdGgubWF4KE1hdGgubWluKDAsbmV3U2Nyb2xsLngpLC1kaW1zLndpZHRoKTtcbiAgICAgICAvL01hdGgubWF4KE1hdGgubWluKDAsbmV3U2Nyb2xsLnkpLC1kaW1zLmhlaWdodCk7XG4gICAgICAgKi9cbiAgICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNF0gPSBuZXdTY3JvbGwueDtcbiAgICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNV0gPSBuZXdTY3JvbGwueTtcblxuICAgICAgdGhpcy5maXJlKCd2aWV3cG9ydDp0cmFuc2xhdGUnKTtcblxuICAgICAgdGhpcy5yZW5kZXJBbGwoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9vYmplY3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuX29iamVjdHNbaV0uc2V0Q29vcmRzKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hhbmRNb2RlQ3Vyc29yUG9zaXRpb24ueSA9IGUucGFnZVk7XG4gICAgICB0aGlzLl9oYW5kTW9kZUN1cnNvclBvc2l0aW9uLnggPSBlLnBhZ2VYO1xuICAgIH1cbiAgfSxcbiAgX2hhbmRNb2RlTW91c2VVcDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2hhbmRNb2RlQ3Vyc29yRG93biA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5faGFuZE1vZGVDdXJzb3JNb3ZlKSB7XG5cbiAgICB9XG4gIH0sXG4gIF9oYW5kTW9kZU1vdXNlRG93bjogZnVuY3Rpb24gKGUpIHtcblxuICAgIHRoaXMuX2hhbmRNb2RlQ3Vyc29yTW92ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhbmRNb2RlQ3Vyc29yRG93biA9IHRydWU7XG4gICAgdGhpcy5faGFuZE1vZGVDdXJzb3JQb3NpdGlvbiA9IHtcbiAgICAgIHk6IGUucGFnZVksXG4gICAgICB4OiBlLnBhZ2VYXG4gICAgfTtcbiAgfSxcbiAgaGFuZE1vZGVFbmFibGVkOiBmYWxzZSxcbiAgaGFuZE1vZGVLZXk6IFwiQWx0XCIsXG4gIF9hcHBseU1peGVkTW9kZTogZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLl9jdXJyZW50X3RhcmdldCA9IHRoaXMuZmluZFRhcmdldChlKTtcblxuICAgIGlmICh0aGlzLmhhbmRNb2RlRW5hYmxlZCAmJiBlLmFsdEtleSB8fCBlLmtleSA9PT0gdGhpcy5oYW5kTW9kZUtleSkge1xuICAgICAgLy9pZiBzaGlmdCB1c2UgaGFuZCBtb2RlXG4gICAgICBpZiAoIXRoaXMuaXNIYW5kTW9kZSkge1xuICAgICAgICB0aGlzLmlzSGFuZE1vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzRHJhd2luZ01vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IoJ3BvaW50ZXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNNaXhlZE1vZGUgJiYgIXRoaXMuX2lzQ3VycmVudGx5RHJhd2luZyAmJiAhdGhpcy5fY3VycmVudFRyYW5zZm9ybSkge1xuXG4gICAgICB0aGlzLmlzSGFuZE1vZGUgPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnRfdGFyZ2V0KSB7XG4gICAgICAgIGlmICh0aGlzLmZyZWVEcmF3aW5nQnJ1c2ggJiYgdGhpcy5fY3VycmVudF90YXJnZXQuYWxsb3dEcmF3aW5nKSB7XG4gICAgICAgICAgdmFyIGNvcm5lciA9IHRoaXMuX2N1cnJlbnRfdGFyZ2V0Ll9maW5kVGFyZ2V0Q29ybmVyKHRoaXMuZ2V0UG9pbnRlcihlLCB0cnVlKSk7XG4gICAgICAgICAgaWYgKCFjb3JuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEcmF3aW5nTW9kZSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNEcmF3aW5nTW9kZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhd2luZ01vZGUpIHtcbiAgICAgICAgICB0aGlzLmlzRHJhd2luZ01vZGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZnJlZURyYXdpbmdCcnVzaCAmJiAhdGhpcy5pc0RyYXdpbmdNb2RlKSB7XG4gICAgICAgICAgdGhpcy5zZXRDdXJzb3IodGhpcy5mcmVlRHJhd2luZ0N1cnNvcik7XG4gICAgICAgICAgdGhpcy5pc0RyYXdpbmdNb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSGFuZE1vZGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgfSxcbiAgX29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghdGhpcy5pbnRlcmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2FwcGx5TWl4ZWRNb2RlKGUpO1xuXG4gICAgaWYgKHRoaXMuaXNIYW5kTW9kZSkge1xuXG4gICAgICBpZiAodGhpcy5fY3VycmVudF90YXJnZXQgJiYgdGhpcy5fY3VycmVudF90YXJnZXQuc2VsZWN0YWJsZV9vdmVyd3JpdHRlbikge1xuICAgICAgICB0aGlzLl9jdXJyZW50X3RhcmdldC5zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2hhbmRNb2RlQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kTW9kZU1vdXNlTW92ZShlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyZSgnbW91c2U6bW92ZScsIHt0YXJnZXQ6IHRoaXMuX2N1cnJlbnRfdGFyZ2V0LCBlOiBlfSk7XG4gICAgICB0aGlzLl9jdXJyZW50X3RhcmdldCAmJiB0aGlzLl9jdXJyZW50X3RhcmdldC5maXJlKCdtb3VzZW1vdmUnLCB7ZTogZX0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfbW91c2VfbW92ZV9vdmVyd3JpdHRlbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfSwgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfb25TY2FsZTogZnVuY3Rpb24gKGUsIHRyYW5zZm9ybSwgeCwgeSkge1xuXG4gICAgdmFyIHVzZVVuaVNjYWxlID0gZS5zaGlmdEtleSBeIHRoaXMuc2hpZnRJbnZlcnRlZDtcbiAgICAvLyByb3RhdGUgb2JqZWN0IG9ubHkgaWYgc2hpZnQga2V5IGlzIG5vdCBwcmVzc2VkXG4gICAgLy8gYW5kIGlmIGl0IGlzIG5vdCBhIGdyb3VwIHdlIGFyZSB0cmFuc2Zvcm1pbmdcbiAgICBpZiAoKHVzZVVuaVNjYWxlIHx8IHRoaXMudW5pU2NhbGVUcmFuc2Zvcm0pICYmICF0cmFuc2Zvcm0udGFyZ2V0LmdldCgnbG9ja1VuaVNjYWxpbmcnKSkge1xuICAgICAgdHJhbnNmb3JtLmN1cnJlbnRBY3Rpb24gPSAnc2NhbGUnO1xuICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlT2JqZWN0KHgsIHkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFN3aXRjaCBmcm9tIGEgbm9ybWFsIHJlc2l6ZSB0byBwcm9wb3J0aW9uYWxcbiAgICAgIGlmICghdHJhbnNmb3JtLnJlc2V0ICYmIHRyYW5zZm9ybS5jdXJyZW50QWN0aW9uID09PSAnc2NhbGUnKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudFRyYW5zZm9ybShlKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNmb3JtLmN1cnJlbnRBY3Rpb24gPSAnc2NhbGVFcXVhbGx5JztcbiAgICAgIHJldHVybiB0aGlzLl9zY2FsZU9iamVjdCh4LCB5LCAnZXF1YWxseScpO1xuICAgIH1cbiAgfSxcbiAgc2hpZnRJbnZlcnRlZDogZmFsc2UsXG4gIF9zZXRDdXJzb3JGcm9tRXZlbnRfb3ZlcndyaXR0ZW46IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLl9zZXRDdXJzb3JGcm9tRXZlbnQsXG4gIF9zZXRDdXJzb3JGcm9tRXZlbnQ6IGZ1bmN0aW9uIChlLCB0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5pc0hhbmRNb2RlKSB7XG4gICAgICB0aGlzLnNldEN1cnNvcigncG9pbnRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDdXJzb3JGcm9tRXZlbnRfb3ZlcndyaXR0ZW4oZSwgdGFyZ2V0KTtcbiAgICB9XG4gIH0sXG4gIF9vbk1vdXNlRG93bjogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIXRoaXMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX2FwcGx5TWl4ZWRNb2RlKGUpO1xuICAgIGlmICh0aGlzLmlzSGFuZE1vZGUgJiYgdGhpcy5fY3VycmVudF90YXJnZXQpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRfdGFyZ2V0LnNlbGVjdGFibGVfb3ZlcndyaXR0ZW4gPSB0aGlzLl9jdXJyZW50X3RhcmdldC5zZWxlY3RhYmxlO1xuICAgICAgdGhpcy5fY3VycmVudF90YXJnZXQuc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIF9tb3VzZV9kb3duX292ZXJ3cml0dGVuLmNhbGwodGhpcywgZSk7XG5cblxuICAgIGlmICh0aGlzLmlzSGFuZE1vZGUpIHtcblxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnRfdGFyZ2V0ICYmIHRoaXMuX2N1cnJlbnRfdGFyZ2V0LnNlbGVjdGFibGVfb3ZlcndyaXR0ZW4pIHtcbiAgICAgICAgdGhpcy5fY3VycmVudF90YXJnZXQuc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLl9oYW5kTW9kZUFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9oYW5kTW9kZU1vdXNlRG93bihlKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uTW91c2VVcDogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIXRoaXMuaW50ZXJhY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgX21vdXNlX3VwX292ZXJ3cml0dGVuLmNhbGwodGhpcywgZSk7XG5cbiAgICBpZiAodGhpcy5pc0hhbmRNb2RlKSB7XG4gICAgICB0aGlzLl9oYW5kTW9kZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21vZHVsZXMvaW50ZXJhY3RpdmVNb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxudmFyIF9vblJlc2l6ZV9vdmVyd3JpdHRlbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLl9vblJlc2l6ZTtcblxudmFyIF9zZXRfZGltZW5zaW9uc19vdmVyd3JpdHRlbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLnNldERpbWVuc2lvbnM7XG52YXIgX3JlbmRlckFsbE5hdGl2ZSA9IGZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUucmVuZGVyQWxsO1xuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLCB7XG4gIF9yZW5kZXJBbGxOYXRpdmU6IF9yZW5kZXJBbGxOYXRpdmUsXG4gIF9vblJlc2l6ZU5hdGl2ZTogX29uUmVzaXplX292ZXJ3cml0dGVuLFxuXG4gIHNldEltYWdlU21vb3RoaW5nRW5hYmxlZDogZnVuY3Rpb24odmFsdWUpe1xuICAgIHRoaXMuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdmFsdWU7XG4gICAgdGhpcy5fc2V0SW1hZ2VTbW9vdGhpbmcoKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBzZWUge0BsaW5rIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS1jYW52YXMtZWxlbWVudC5odG1sI2RvbS1jb250ZXh0LTJkLWltYWdlc21vb3RoaW5nZW5hYmxlZHxXaGF0V0cgQ2FudmFzIFN0YW5kYXJkfVxuICAgKi9cbiAgX3NldEltYWdlU21vb3RoaW5nOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XG5cbiAgICAvLyBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCB8fCBjdHgud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXG4gICAgLy8gICB8fCBjdHgubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkIHx8IGN0eC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCB8fCBjdHgub0ltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG5cbiAgICBpZih0aGlzLmxheWVycyAmJiB0aGlzLmxheWVycy5iYWNrZ3JvdW5kKXtcbiAgICAgIHRoaXMubGF5ZXJzLmJhY2tncm91bmQuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0aGlzLmltYWdlU21vb3RoaW5nRW5hYmxlZDtcbiAgICB9XG4gIH0sXG5cbiAgX29uUmVzaXplOiBmdW5jdGlvbigpe1xuICAgIHRoaXMuX29uUmVzaXplTmF0aXZlKCk7XG4gICAgaWYodGhpcy5vblJlc2l6ZSl7XG4gICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgfVxuICAgIHRoaXMuZmlyZShcInJlc2l6ZVwiKTtcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jcmVhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbml0SW50ZXJhY3RpdmUoKTtcbiAgICB0aGlzLl9jcmVhdGVDYWNoZUNhbnZhcygpO1xuICAgIHRoaXMuaW5pdExheWVycygpO1xuICB9LFxuICBjcmVhdGVMYXllcjogZnVuY3Rpb24oemluZGV4KXtcbiAgICB2YXIgX2NhbnZhc0VsZW1lbnQgPSBmYWJyaWMudXRpbC5jcmVhdGVDYW52YXNFbGVtZW50V2l0aFNpemUodGhpcyk7XG4gICAgX2NhbnZhc0VsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgX2NhbnZhc0VsZW1lbnQuc3R5bGUudG9wID0gMDtcbiAgICBfY2FudmFzRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgdmFyIF9jdHggPSBfY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIF9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQ7XG5cblxuICAgIHZhciBsYXllckFmdGVyID0gbnVsbDtcbiAgICBmb3IodmFyIGkgaW4gdGhpcy5sYXllcnMpe1xuXG4gICAgICBpZih0aGlzLmxheWVyc1tpXS56aW5kZXggPiB6aW5kZXggJiYgIWxheWVyQWZ0ZXIgfHwgbGF5ZXJBZnRlci56aW5kZXggPiB0aGlzLmxheWVyc1tpXS56aW5kZXgpe1xuICAgICAgICBsYXllckFmdGVyICA9IHRoaXMubGF5ZXJzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLndyYXBwZXJFbCl7XG4gICAgICBpZihsYXllckFmdGVyKXtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwuaW5zZXJ0QmVmb3JlKF9jYW52YXNFbGVtZW50LGxheWVyQWZ0ZXIuY2FudmFzKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZChfY2FudmFzRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgICAgY2FudmFzOiBfY2FudmFzRWxlbWVudCxcbiAgICAgIGNvbnRleHQ6IF9jdHgsXG4gICAgICBvYmplY3RzOiBbXVxuICAgIH1cbiAgfSxcbiAgbGF5ZXJzT3JkZXI6IFtcImJhY2tncm91bmRcIixcIm9iamVjdHNcIixcInNlbGVjdGlvblwiLFwiY29udHJvbHNcIixcImludGVyYWN0aW9uXCIsXCJpbnRlcmZhY2VcIl0sXG4gIGluaXRMYXllcnM6IGZ1bmN0aW9uKCl7XG5cbiAgICB0aGlzLmxheWVycyA9IHtcbiAgICAgIGxvd2VyOiB7XG4gICAgICAgIHppbmRleDogNSxcbiAgICAgICAgdHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICBvYmplY3RzOiB0aGlzLl9vYmplY3RzLFxuICAgICAgICBjYW52YXM6IHRoaXMubG93ZXJDYW52YXNFbCxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0Q29udGFpbmVyXG4gICAgICB9XG4gICAgICAvLyBzZWxlY3Rpb246IHRoaXMuY3JlYXRlTGF5ZXIoKSxcbiAgICAgIC8vIGludGVyYWN0aW9uOiB0aGlzLmNyZWF0ZUxheWVyKCksXG4gICAgICAvLyBvdmVybGE6IHRoaXMuY3JlYXRlTGF5ZXIoKSxcblxuICAgIH07XG5cbiAgICB0aGlzLmxheWVycy5iYWNrZ3JvdW5kID0gdGhpcy5jcmVhdGVMYXllcigwKTtcblxuXG5cbiAgICBpZih0aGlzLnVwcGVyQ2FudmFzRWwpe1xuICAgICAgdGhpcy53cmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy51cHBlckNhbnZhc0VsKTtcbiAgICB9XG4gICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzO1xuICAgIHRoaXMubGF5ZXJzT3JkZXIgPSB0aGlzLmxheWVyc09yZGVyLm1hcChmdW5jdGlvbihpKXtcbiAgICAgIHJldHVybiBsYXllcnNbaV07XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKFwicmVzaXplXCIsZnVuY3Rpb24oKXtcbiAgICAgIGZvcih2YXIgaSBpbiB0aGlzLl9iYWNrZ3JvdW5kTGF5ZXIpe1xuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kTGF5ZXJbaV0uc2V0Q29vcmRzKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheWVycy51cHBlciA9IHtcbiAgICAgIHppbmRleDogICAgIDk5LFxuICAgICAgdHJhbnNmb3JtOiAgZmFsc2UsXG4gICAgICBvYmplY3RzOiAgICBbXSxcbiAgICAgIGNhbnZhczogICAgIHRoaXMudXBwZXJDYW52YXNFbCxcbiAgICAgIGNvbnRleHQ6ICAgIHRoaXMuY29udGV4dFRvcFxuICAgIH07XG4gIH0sXG4gIC8qKlxuICAgKiBIZWxwZXIgZm9yIHNldHRpbmcgd2lkdGgvaGVpZ2h0XG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIHByb3BlcnR5ICh3aWR0aHxoZWlnaHQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byBzZXQgcHJvcGVydHkgdG9cbiAgICogQHJldHVybiB7ZmFicmljLkNhbnZhc30gaW5zdGFuY2VcbiAgICogQGNoYWluYWJsZSB0cnVlXG4gICAqL1xuICBfc2V0QmFja3N0b3JlRGltZW5zaW9uOiBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcblxuICAgIGZvcih2YXIgaSBpbiB0aGlzLmxheWVycyl7XG4gICAgICB0aGlzLmxheWVyc1tpXS5jYW52YXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYWNoZUNhbnZhc0VsKSB7XG4gICAgICB0aGlzLmNhY2hlQ2FudmFzRWxbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogSGVscGVyIGZvciBzZXR0aW5nIGNzcyB3aWR0aC9oZWlnaHRcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgcHJvcGVydHkgKHdpZHRofGhlaWdodClcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIHZhbHVlIHRvIHNldCBwcm9wZXJ0eSB0b1xuICAgKiBAcmV0dXJuIHtmYWJyaWMuQ2FudmFzfSBpbnN0YW5jZVxuICAgKiBAY2hhaW5hYmxlIHRydWVcbiAgICovXG4gIF9zZXRDc3NEaW1lbnNpb246IGZ1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xuXG4gICAgZm9yKHZhciBpIGluIHRoaXMubGF5ZXJzKXtcbiAgICAgIHRoaXMubGF5ZXJzW2ldLmNhbnZhcy5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLndyYXBwZXJFbCkge1xuICAgICAgdGhpcy53cmFwcGVyRWwuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc2V0RGltZW5zaW9uczogZnVuY3Rpb24gKGRpbWVuc2lvbnMsIG9wdGlvbnMpIHtcbiAgICBfc2V0X2RpbWVuc2lvbnNfb3ZlcndyaXR0ZW4uY2FsbCh0aGlzLCBkaW1lbnNpb25zLCBvcHRpb25zKTtcblxuICAgIGlmKHRoaXMuYmFja2dyb3VuZEltYWdlICYmIHRoaXMuYmFja2dyb3VuZEltYWdlLmNvbnN0cnVjdG9yICE9PSBTdHJpbmcpe1xuICAgICAgdGhpcy5fdXBkYXRlX2JhY2tncm91bmRfaW1hZ2UoKTtcbiAgICB9XG4gICAgLy90aGlzLl91cGRhdGVfY2xpcF9yZWN0KCk7XG4gICAgdGhpcy5maXJlKFwiZGltZW5zaW9uczptb2RpZmllZFwiKTtcbiAgICB0aGlzLnJlbmRlckFsbCgpO1xuICB9LFxuICBhZGQ6IGZ1bmN0aW9uICgvKiwgaXNOZXdFbGVtZW50Ki8pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgZmFicmljLnV0aWwub2JqZWN0LmRlZmF1bHRzKG9iaiwgZmFicmljLlNsaWRlT2JqZWN0KTtcblxuICAgICAgaWYob2JqLmxheWVyKSB7XG4gICAgICAgIHZhciBfbGF5ZXIgPSB0aGlzLmxheWVyc1tvYmoubGF5ZXJdO1xuICAgICAgICBpZighX2xheWVyKXtcbiAgICAgICAgICBfbGF5ZXIgPSB0aGlzLmxheWVyc1tvYmoubGF5ZXJdID0gdGhpcy5jcmVhdGVMYXllcigpO1xuICAgICAgICB9XG4gICAgICAgIF9sYXllci5vYmplY3RzLnB1c2gob2JqKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuX29iamVjdHMucHVzaChvYmopO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX29uT2JqZWN0QWRkZWQpIHtcbiAgICAgICAgdGhpcy5fb25PYmplY3RBZGRlZChvYmopO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vdG9kb1xuICAgIC8vIGlmKGlzTmV3RWxlbWVudCl7XG4gICAgLy8gICB0aGlzLmFkZEFsZW1lbnRJblRoZU1pZGRsZShlbCk7XG4gICAgLy8gICB0aGlzLnNldEFjdGl2ZU9iamVjdChlbCk7XG4gICAgLy8gfVxuXG4gICAgdGhpcy5yZW5kZXJPbkFkZFJlbW92ZSAmJiB0aGlzLnJlbmRlckFsbCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX29iamVjdHMgPSB0aGlzLmdldE9iamVjdHMoKSxcbiAgICAgIGluZGV4O1xuICAgIHZhciBvYmplY3RzO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcmd1bWVudHNbaV0ubGF5ZXIpIHtcbiAgICAgICAgb2JqZWN0cyA9IGFyZ3VtZW50c1tpXS5sYXllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdHMgPSBfb2JqZWN0cztcbiAgICAgIH1cblxuICAgICAgaW5kZXggPSBvYmplY3RzLmluZGV4T2YoYXJndW1lbnRzW2ldKTtcbiAgICAgIC8vIG9ubHkgY2FsbCBvbk9iamVjdFJlbW92ZWQgaWYgYW4gb2JqZWN0IHdhcyBhY3R1YWxseSByZW1vdmVkXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIG9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fb25PYmplY3RSZW1vdmVkKGFyZ3VtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJPbkFkZFJlbW92ZSAmJiB0aGlzLnJlbmRlckFsbCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICByZW5kZXJMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgbGF5ZXIgPSB0aGlzLmxheWVyc1tsYXllcl07XG4gICAgaWYodGhpcy5wcm9jZXNzaW5nKXJldHVybiBmYWxzZTtcbiAgICB2YXIgY3R4ID0gbGF5ZXIuY29udGV4dDtcbiAgICBjdHguc2F2ZSgpO1xuICAgIHRoaXMuY2xlYXJDb250ZXh0KGN0eCk7XG4gICAgdGhpcy5jbGlwVG8gJiYgZmFicmljLnV0aWwuY2xpcENvbnRleHQodGhpcywgY3R4KTtcbiAgICBsYXllci50cmFuc2Zvcm0gJiYgIGN0eC50cmFuc2Zvcm0uYXBwbHkoY3R4LCB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtKTtcbiAgICB0aGlzLl9yZW5kZXJPYmplY3RzKGxheWVyLmNvbnRleHQsbGF5ZXIub2JqZWN0cyk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfSxcbiAgcmVuZGVyQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYodGhpcy5wcm9jZXNzaW5nKXJldHVybiBmYWxzZTtcbiAgICBpZiAoIXRoaXMudmlydHVhbCAmJiB0aGlzLnNlbGVjdGlvbiAmJiAhdGhpcy5fZ3JvdXBTZWxlY3RvciAmJiAhdGhpcy5pc0RyYXdpbmdNb2RlKSB7XG4gICAgICB0aGlzLmNsZWFyQ29udGV4dCh0aGlzLmNvbnRleHRUb3ApO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZSgnYmVmb3JlOnJlbmRlcicpO1xuXG4gICAgZm9yKHZhciBpIGluIHRoaXMubGF5ZXJzKXtcbiAgICAgIHZhciBjdHggPSB0aGlzLmxheWVyc1tpXS5jb250ZXh0O1xuICAgICAgdGhpcy5jbGVhckNvbnRleHQoY3R4KTtcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBpZiAodGhpcy5jbGlwVG8pIHtcbiAgICAgICAgZmFicmljLnV0aWwuY2xpcENvbnRleHQodGhpcywgY3R4KTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMubGF5ZXJzW2ldLnRyYW5zZm9ybSl7XG4gICAgICAgIGN0eC50cmFuc2Zvcm0uYXBwbHkoY3R4LCB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJCYWNrZ3JvdW5kKHRoaXMubGF5ZXJzLmJhY2tncm91bmQuY29udGV4dCk7XG5cblxuICAgIHRoaXMubGF5ZXJzLmxvd2VyLl9vYmplY3RzID0gdGhpcy5sYXllcnMubG93ZXIub2JqZWN0cztcbiAgICB0aGlzLmxheWVycy5sb3dlci5vYmplY3RzID0gdGhpcy5fY2hvb3NlT2JqZWN0c1RvUmVuZGVyKCk7XG5cbiAgICBmb3IodmFyIGkgaW4gdGhpcy5sYXllcnMpe1xuICAgICAgdGhpcy5fcmVuZGVyT2JqZWN0cyh0aGlzLmxheWVyc1tpXS5jb250ZXh0LHRoaXMubGF5ZXJzW2ldLm9iamVjdHMpO1xuICAgIH1cbiAgICB0aGlzLmxheWVycy5sb3dlci5vYmplY3RzID0gdGhpcy5sYXllcnMubG93ZXIuX29iamVjdHM7XG5cbiAgICB0aGlzLmZpcmUoJ3JlbmRlcicpO1xuXG4gICAgaWYoIXRoaXMudmlydHVhbCl7XG4gICAgICBpZiAoIXRoaXMuY29udHJvbHNBYm92ZU92ZXJsYXkgJiYgdGhpcy5pbnRlcmFjdGl2ZSApIHtcbiAgICAgICAgdGhpcy5kcmF3Q29udHJvbHModGhpcy5sYXllcnMudXBwZXIuY29udGV4dCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZW5kZXJPdmVybGF5KHRoaXMubGF5ZXJzLnVwcGVyLmNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRyb2xzQWJvdmVPdmVybGF5ICYmIHRoaXMuaW50ZXJhY3RpdmUgJiYgIXRoaXMuX2lzQ3VycmVudGx5RHJhd2luZyApIHtcblxuICAgICAgaWYodGhpcy5ib3JkZXJPcGFjaXR5V2hlbk1vdmluZyB8fCAhdGhpcy5pc01vdmluZyl7XG4gICAgICAgIHRoaXMuZHJhd0NvbnRyb2xzKHRoaXMubGF5ZXJzLnVwcGVyLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgZm9yKHZhciBpIGluIHRoaXMubGF5ZXJzKSB7XG4gICAgICB2YXIgY3R4ID0gdGhpcy5sYXllcnNbaV0uY29udGV4dDtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlKCdhZnRlcjpyZW5kZXInKTtcbiAgfSxcbiAgX3JlbmRlckJhY2tncm91bmQ6IGZ1bmN0aW9uKGN0eCkge1xuICAgIHRoaXMuX3JlbmRlckJhY2tncm91bmRPck92ZXJsYXkoY3R4LCAnYmFja2dyb3VuZCcpO1xuICB9LFxuICBfcmVuZGVyT3ZlcmxheTogZnVuY3Rpb24oY3R4KSB7XG4gICAgdGhpcy5fcmVuZGVyQmFja2dyb3VuZE9yT3ZlcmxheShjdHgsICdvdmVybGF5Jyk7XG5cbiAgICAvLyBpZiAodGhpcy5faW50ZXJmYWNlTGF5ZXIpIHtcbiAgICAvLyAgIHRoaXMuX3JlbmRlck9iamVjdHMoY3R4LCB0aGlzLl9pbnRlcmZhY2VMYXllcik7XG4gICAgLy8gfVxuICB9LFxuICBzdG9yZVByb3BlcnRpZXM6IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnN0b3JlUHJvcGVydGllcy5jb25jYXQoW1wibGF5ZXJcIl0pXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy9sYXllcnMuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5BcHBsaWNhdGlvbi5wcm90b3R5cGUsIHtcbiAgLy8gbG9hZGVyVGVtcGxhdGU6IFwiPHNwYW4gY2xhc3M9J2ZhIGZhLXB1bHNlIGZhLXNwaW5uZXIgY2FudmFzLWxvYWQtc3Bpbm5lcic+PC9zcGFuPlwiLFxuICBsb2FkZXJJY29uOiAgICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcgKyByZXF1aXJlKCdiYXNlNjQtbG9hZGVyIS4vLi4vbWVkaWEvbG9hZGVyLnN2ZycpLFxuICBsb2FkZXJDb250YWluZXI6IG51bGwsXG4gIF9zaG93TWFpbkxvYWRlckluZGljYXRvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9hZGVyRWwuc2hvdygpO1xuICAgIHRoaXMubG9hZGVyQ29udGFpbmVyLmFkZENsYXNzKFwicHJvY2Vzc2luZ1wiKTtcbiAgfSxcbiAgX2hpZGVNYWluTG9hZGVySW5kaWNhdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5sb2FkZXJFbC5oaWRlKCk7XG4gICAgdGhpcy5sb2FkZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJwcm9jZXNzaW5nXCIpO1xuICB9LFxuICBzZXRMb2FkZXJUZW1wbGF0ZTogZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmKHRoaXMudmlydHVhbCkgcmV0dXJuIGZhbHNlO1xuICAgIHRoaXMubG9hZGVyVGVtcGxhdGUgPSB2YWwucmVwbGFjZShcIntsb2FkZXJJY29ufVwiLHRoaXMubG9hZGVySWNvbik7XG4gICAgaWYodmFsKSB7XG4gICAgICB0aGlzLmxvYWRlckNvbnRhaW5lciA9ICQodGhpcy5sb2FkZXJDb250YWluZXIpO1xuICAgICAgdGhpcy5sb2FkZXJFbCA9ICQodGhpcy5sb2FkZXJUZW1wbGF0ZSkuaGlkZSgpO1xuICAgICAgdGhpcy5sb2FkZXJDb250YWluZXIuYXBwZW5kKHRoaXMubG9hZGVyRWwpO1xuICAgICAgLy8gdGhpcy5vbihcImxvYWRpbmc6YmVnaW5cIiwgdGhpcy5fc2hvd01haW5Mb2FkZXJJbmRpY2F0b3IpO1xuICAgICAgLy8gdGhpcy5vbihcImxvYWRpbmc6ZW5kXCIsIHRoaXMuX2hpZGVNYWluTG9hZGVySW5kaWNhdG9yKTtcblxuXG4gICAgICB0aGlzLm9uKFwicHJvamVjdDpjaGFuZ2VkXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5wcm9qZWN0Lm9uKFwic2xpZGU6Y2hhbmdlOmJlZ2luXCIsIHRoaXMuX3Nob3dNYWluTG9hZGVySW5kaWNhdG9yLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnByb2plY3Qub24oXCJzbGlkZTpjaGFuZ2VkXCIsIHRoaXMuX2hpZGVNYWluTG9hZGVySW5kaWNhdG9yLmJpbmQodGhpcykpO1xuICAgICAgfSlcblxuICAgIH1cbiAgfVxufSk7XG5cblxuLy8gZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLCB7XG4vLyAgIC8vIGxvYWRlclRlbXBsYXRlOiBcIjxzcGFuIGNsYXNzPSdmYSBmYS1wdWxzZSBmYS1zcGlubmVyIGNhbnZhcy1sb2FkLXNwaW5uZXInPjwvc3Bhbj5cIixcbi8vICAgc2V0TG9hZGVyVGVtcGxhdGU6IGZ1bmN0aW9uICh2YWwpIHtcbi8vICAgICBpZih0aGlzLnZpcnR1YWwpIHJldHVybiBmYWxzZTtcbi8vICAgICB0aGlzLmxvYWRlclRlbXBsYXRlID0gdmFsO1xuLy8gICAgIGlmKHZhbCkge1xuLy8gICAgICAgdGhpcy5sb2FkZXJFbCA9ICQodGhpcy5sb2FkZXJUZW1wbGF0ZSkuaGlkZSgpO1xuLy8gICAgICAgJCh0aGlzLndyYXBwZXJFbCkuYXBwZW5kKHRoaXMubG9hZGVyRWwpO1xuLy8gICAgICAgdGhpcy5vbihcImxvYWRpbmc6YmVnaW5cIiwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICB0aGlzLmxvYWRlckVsLnNob3coKTtcbi8vICAgICAgICAgJCh0aGlzLndyYXBwZXJFbCkuYWRkQ2xhc3MoXCJwcm9jZXNzaW5nXCIpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgICB0aGlzLm9uKFwibG9hZGluZzplbmRcIiwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICB0aGlzLmxvYWRlckVsLmhpZGUoKTtcbi8vICAgICAgICAgJCh0aGlzLndyYXBwZXJFbCkucmVtb3ZlQ2xhc3MoXCJwcm9jZXNzaW5nXCIpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy9sb2FkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgX3NldF9zYmFja2dyb3VuZF9pbWFnZV9vdmVyd3JpdHRlbiA9IGZhYnJpYy5DYW52YXMucHJvdG90eXBlLnNldEJhY2tncm91bmRJbWFnZTtcblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuQ2FudmFzLnByb3RvdHlwZSwge1xuICAvKipcbiAgICogYmFja2dyb3VuZFBvc2l0aW9uXG4gICAqIEB2YWx1ZXMgbWFudWFsIHwgY292ZXIgfCBmaXRcbiAgICovXG4gIGJhY2tncm91bmRQb3NpdGlvbjogJ21hbnVhbCcsXG4gIHNldEJhY2tncm91bmRQb3NpdGlvbjogZnVuY3Rpb24gKHNyYykge1xuICAgIHRoaXMuYmFja2dyb3VuZFBvc2l0aW9uID0gc3JjO1xuICAgIHRoaXMuX3VwZGF0ZV9iYWNrZ3JvdW5kX2ltYWdlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIG9mZnNldHM6IHtcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICB0b3A6IDBcbiAgfSxcblxuICAvLyBzZXRCYWNrZ3JvdW5kSW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIC8vXG4gIC8vICAgX3NldF9zYmFja2dyb3VuZF9pbWFnZV9vdmVyd3JpdHRlbi5jYWxsKHRoaXMsIHNyYywgZnVuY3Rpb24gKCkge1xuICAvLyAgICAgdGhpcy5fdXBkYXRlX2JhY2tncm91bmRfaW1hZ2UoKTtcbiAgLy8gICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRoaXMuYmFja2dyb3VuZEltYWdlKTtcbiAgLy8gICB9LmJpbmQodGhpcyksIG9wdGlvbnMpO1xuICAvLyAgIHJldHVybiB0aGlzO1xuICAvLyB9LFxuICBmaWxsQmFja2dyb3VuZENvbG9yT3ZlckNhbnZhczogZmFsc2UsXG4gIF9yZW5kZXJCYWNrZ3JvdW5kT3JPdmVybGF5OiBmdW5jdGlvbihjdHgsIHByb3BlcnR5KSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXNbcHJvcGVydHkgKyAnQ29sb3InXTtcbiAgICBpZiAob2JqZWN0KSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gb2JqZWN0LnRvTGl2ZVxuICAgICAgICA/IG9iamVjdC50b0xpdmUoY3R4KVxuICAgICAgICA6IG9iamVjdDtcblxuICAgICAgaWYodGhpcy5maWxsQmFja2dyb3VuZENvbG9yT3ZlckNhbnZhcyl7XG4gICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICBvYmplY3Qub2Zmc2V0WCB8fCAtdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs0XS8gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVswXSxcbiAgICAgICAgICBvYmplY3Qub2Zmc2V0WSB8fCAtdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XS8gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVswXSxcbiAgICAgICAgICB0aGlzLndpZHRoIC8gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVswXSxcbiAgICAgICAgICB0aGlzLmhlaWdodCAgLyB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzBdKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgb2JqZWN0Lm9mZnNldFggfHwgMCxcbiAgICAgICAgICBvYmplY3Qub2Zmc2V0WSB8fCAwLFxuICAgICAgICAgIHRoaXMub3JpZ2luYWxXaWR0aCAsXG4gICAgICAgICAgdGhpcy5vcmlnaW5hbEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICAgIG9iamVjdCA9IHRoaXNbcHJvcGVydHkgKyAnSW1hZ2UnXTtcbiAgICBpZihvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yICE9PSBTdHJpbmcgJiYgIG9iamVjdC5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KXtcbiAgICAgICAgb2JqZWN0LnJlbmRlcihjdHgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0SW1hZ2VEYXRhOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHtcbiAgICAgIGNsaXBwZWRfYXJlYTogZmFsc2UsXG4gICAgICBjbGlwcGVkX2FyZWFfb25seTogZmFsc2UsXG4gICAgICBkcmF3X2JhY2tncm91bmQ6IHRydWUsXG4gICAgICBmb3JtYXQ6ICdwbmcnLFxuICAgICAgcXVhbGl0eTogMC44XG4gICAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB2YXIgc2l6ZTtcbiAgICBpZiAob3B0aW9ucy5jbGlwcGVkX2FyZWEpIHtcbiAgICAgIHNpemUgPSBvcHRpb25zLmNsaXBwZWRfYXJlYS5nZXRCb3VuZGluZ1JlY3QoKTtcbiAgICAgIHZhciBfem9vbSA9IHRoaXMuZ2V0Wm9vbSgpO1xuICAgICAgc2l6ZS5sZWZ0ICAgLz0gX3pvb207XG4gICAgICBzaXplLnRvcCAgICAvPSBfem9vbTtcbiAgICAgIHNpemUud2lkdGggIC89IF96b29tO1xuICAgICAgc2l6ZS5oZWlnaHQgLz0gX3pvb207XG4gICAgICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKG9wdGlvbnMsIHNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaXplID0ge1xuICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCB8fCB0aGlzLm9yaWdpbmFsV2lkdGggfHwgdGhpcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCB8fCB0aGlzLm9yaWdpbmFsSGVpZ2h0IHx8IHRoaXMuaGVpZ2h0LFxuICAgICAgfTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2xpcHBlZF9hcmVhX29ubHkpIHtcbiAgICAgICAgc2l6ZS53aWR0aCAtPSB0aGlzLm9mZnNldHMubGVmdCArIHRoaXMub2Zmc2V0cy5yaWdodDtcbiAgICAgICAgc2l6ZS5oZWlnaHQgLT0gdGhpcy5vZmZzZXRzLnRvcCArIHRoaXMub2Zmc2V0cy5ib3R0b207XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnpvb20pIHtcbiAgICAgIHNpemUud2lkdGggKj0gb3B0aW9ucy56b29tO1xuICAgICAgc2l6ZS5oZWlnaHQgKj0gb3B0aW9ucy56b29tO1xuICAgIH1cblxuICAgIHZhciBjYW52YXMgPSBmYWJyaWMudXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgY2FudmFzLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG5cbiAgICBvcHRpb25zLmxlZnQgPSBNYXRoLmZsb29yKG9wdGlvbnMubGVmdCk7XG4gICAgb3B0aW9ucy50b3AgPSBNYXRoLmZsb29yKG9wdGlvbnMudG9wKTtcbiAgICBvcHRpb25zLmhlaWdodCA9IE1hdGguY2VpbChvcHRpb25zLmhlaWdodCk7XG4gICAgb3B0aW9ucy53aWR0aCA9IE1hdGguY2VpbChvcHRpb25zLndpZHRoKTtcblxuICAgIHRoaXMucmVuZGVyVGh1bWIoY2FudmFzLCBvcHRpb25zKTtcblxuICAgIHZhciBzcmMgPSBjYW52YXMudG9EYXRhVVJMKG9wdGlvbnMpO1xuXG4gICAgdmFyIGJsb2IgPSBmYWJyaWMudXRpbC5kYXRhVVJJdG9CbG9iKHNyYywgJ2ltYWdlLycgKyBvcHRpb25zLmZvcm1hdCk7XG4gICAgdmFyIG9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFVUkw6IHNyYyxcbiAgICAgIGJsb2I6IGJsb2IsXG4gICAgICB1cmw6IG9iamVjdFVSTCxcbiAgICAgIGNhbnZhczogY2FudmFzXG4gICAgfTtcbiAgfSxcbiAgZ2V0T3JpZ2luYWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB0aGlzLm9yaWdpbmFsV2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxIZWlnaHRcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyVGh1bWI6IGZ1bmN0aW9uIChjYW52YXMsIG9wdGlvbnMpIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHtcbiAgICAgICAgb2JqZWN0czogdHJ1ZSxcbiAgICAgICAgY2xpcHBlZF9hcmVhX29ubHk6IGZhbHNlLFxuICAgICAgICBkcmF3X2JhY2tncm91bmQ6IHRydWVcbiAgICAgIH07XG5cbiAgICBpZiAob3B0aW9ucy56b29tKSB7XG4gICAgICB2YXIgX3pvb20gPSBvcHRpb25zLnpvb207XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjYW52YXMud2lkdGgpIHtcbiAgICAgICAgdmFyIF96b29tID0gY2FudmFzLndpZHRoIC8gKHRoaXMub3JpZ2luYWxXaWR0aCB8fCB0aGlzLndpZHRoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF96b29tID0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIF9vbGRfU2NhbGUgPSB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzBdO1xuICAgIHZhciBvbGRfeCA9IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNF07XG4gICAgdmFyIG9sZF95ID0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XTtcbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzRdID0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XSA9IDA7XG4gICAgdGhpcy52aWV3cG9ydFRyYW5zZm9ybVswXSA9IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bM10gPSAxO1xuXG4gICAgdGhpcy52aWV3cG9ydFRyYW5zZm9ybVswXSA9IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bM10gPSBfem9vbTtcbiAgICAvL3RoaXMuX3VwZGF0ZV9jbGlwX3JlY3QoKTtcblxuICAgIGlmICh0aGlzLmNsaXBSZWN0KSB7XG4gICAgICB0aGlzLmNsaXBSZWN0LnNldE9wYWNpdHkoMCk7XG4gICAgfVxuXG4gICAgdmFyIHNpemUgPSB7XG4gICAgICB3aWR0aDogdGhpcy5vcmlnaW5hbFdpZHRoIHx8IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxIZWlnaHQgfHwgdGhpcy5oZWlnaHRcbiAgICB9O1xuICAgIHNpemUud2lkdGggPSBNYXRoLmNlaWwoc2l6ZS53aWR0aCAqIF96b29tKTtcbiAgICBzaXplLmhlaWdodCA9IE1hdGguY2VpbChzaXplLmhlaWdodCAqIF96b29tKTtcblxuICAgIHZhciBfY2FudmFzID0gZmFicmljLnV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgIF9jYW52YXMud2lkdGggPSBzaXplLndpZHRoO1xuICAgIF9jYW52YXMuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG5cbiAgICB2YXIgY2FudmFzVG9EcmF3T24gPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyksIG9ianNUb1JlbmRlcjtcblxuICAgIHRoaXMuY2xlYXJDb250ZXh0KGNhbnZhc1RvRHJhd09uKTtcbiAgICBjYW52YXNUb0RyYXdPbi5zYXZlKCk7XG4gICAgY2FudmFzVG9EcmF3T24udHJhbnNmb3JtLmFwcGx5KGNhbnZhc1RvRHJhd09uLCB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtKTtcblxuICAgIGlmIChvcHRpb25zLmRyYXdfYmFja2dyb3VuZCkge1xuICAgICAgdGhpcy5fcmVuZGVyQmFja2dyb3VuZChjYW52YXNUb0RyYXdPbik7XG4gICAgICAvL2lmICh0aGlzLl9iYWNrZ3JvdW5kTGF5ZXIpIHtcbiAgICAgIC8vICB0aGlzLl9yZW5kZXJPYmplY3RzKGNhbnZhc1RvRHJhd09uLCB0aGlzLl9iYWNrZ3JvdW5kTGF5ZXIpO1xuICAgICAgLy99XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmNsaXBwZWRfYXJlYV9vbmx5ICYmIHRoaXMuY2xpcFRvKSB7XG4gICAgICBmYWJyaWMudXRpbC5jbGlwQ29udGV4dCh0aGlzLCBjYW52YXNUb0RyYXdPbik7XG4gICAgfVxuXG4gICAgdmFyIF9vYmplY3RzO1xuICAgIGlmIChvcHRpb25zLm9iamVjdHMgJiYgb3B0aW9ucy5vYmplY3RzLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgX29iamVjdHMgPSBvcHRpb25zLm9iamVjdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9vYmplY3RzID0gb3B0aW9ucy5vYmplY3RzICE9PSBmYWxzZSA/IHRoaXMuX29iamVjdHMgOiBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY2xpcHBlZF9hcmVhKSB7XG4gICAgICBfb2JqZWN0cyA9IGZhYnJpYy51dGlsLm9iamVjdC5jbG9uZShfb2JqZWN0cyk7XG4gICAgICBmb3IgKHZhciBpID0gX29iamVjdHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIGlmIChfb2JqZWN0c1tpXS5jbGlwVG8gIT09IG9wdGlvbnMuY2xpcHBlZF9hcmVhKSB7XG4gICAgICAgICAgX29iamVjdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGlmIChmYWJyaWMudmVyc2lvbiA+PSAxLjYpIHtcbiAgICAgIHRoaXMuX3JlbmRlck9iamVjdHMoY2FudmFzVG9EcmF3T24sIF9vYmplY3RzKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IF9vYmplY3RzLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgLy8gICAgIHRoaXMuX2RyYXcoY2FudmFzVG9EcmF3T24sIF9vYmplY3RzW2ldKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cblxuICAgIGNhbnZhc1RvRHJhd09uLnJlc3RvcmUoKTtcbiAgICBpZiAoIW9wdGlvbnMuY2xpcHBlZF9hcmVhX29ubHkgJiYgdGhpcy5jbGlwVG8pIHtcbiAgICAgIGNhbnZhc1RvRHJhd09uLnJlc3RvcmUoKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyT3ZlcmxheShjYW52YXNUb0RyYXdPbik7XG4gICAgY2FudmFzVG9EcmF3T24ucmVzdG9yZSgpO1xuICAgIGlmICh0aGlzLmNsaXBSZWN0KSB7XG4gICAgICB0aGlzLmNsaXBSZWN0LnNldE9wYWNpdHkoMSk7XG4gICAgfVxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgaWYgKG9wdGlvbnMuY2xpcHBlZF9hcmVhX29ubHkgJiYgdGhpcy5jbGlwUmVjdCkge1xuICAgICAgdmFyIF9yZWN0ID0ge1xuICAgICAgICBsZWZ0OiB0aGlzLmNsaXBSZWN0LmxlZnQgKiBfem9vbSxcbiAgICAgICAgdG9wOiB0aGlzLmNsaXBSZWN0LnRvcCAqIF96b29tLFxuICAgICAgICB3aWR0aDogdGhpcy5jbGlwUmVjdC53aWR0aCAqIF96b29tLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuY2xpcFJlY3QuaGVpZ2h0ICogX3pvb21cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfcmVjdCA9IHtcbiAgICAgICAgbGVmdDogb3B0aW9ucy5sZWZ0ICogX3pvb20gfHwgMCxcbiAgICAgICAgdG9wOiBvcHRpb25zLnRvcCAqIF96b29tIHx8IDAsXG4gICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoICogX3pvb20gfHwgc2l6ZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCAqIF96b29tIHx8IHNpemUuaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hbmdsZSkge1xuICAgICAgY3R4LnJvdGF0ZSgtb3B0aW9ucy5hbmdsZSAqIE1hdGguUEkgLyAxODApO1xuICAgICAgY3R4LmRyYXdJbWFnZShfY2FudmFzLFxuICAgICAgICAwLCAwLCBfcmVjdC53aWR0aCArIF9yZWN0LmxlZnQgKyBfY2FudmFzLndpZHRoLCBfcmVjdC5oZWlnaHQgKyBfcmVjdC50b3AgKyBfY2FudmFzLmhlaWdodCxcbiAgICAgICAgLV9yZWN0LmxlZnQsIC1fcmVjdC50b3AsIGNhbnZhcy53aWR0aCArIF9yZWN0LmxlZnQgKyBfY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0ICsgX3JlY3QudG9wICsgX2NhbnZhcy5oZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHguZHJhd0ltYWdlKF9jYW52YXMsIF9yZWN0LmxlZnQsIF9yZWN0LnRvcCwgX3JlY3Qud2lkdGgsIF9yZWN0LmhlaWdodCwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzBdID0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVszXSA9IF9vbGRfU2NhbGU7XG4gICAgLy8gdGhpcy5fdXBkYXRlX2JhY2tncm91bmRfaW1hZ2UoKTtcbiAgICAvL3RoaXMuX3VwZGF0ZV9jbGlwX3JlY3QoKTtcblxuICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNF0gPSBvbGRfeDtcbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzVdID0gb2xkX3k7XG5cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH0sXG5cbiAgLy8gc2V0T2Zmc2V0czogZnVuY3Rpb24gKF9vZmZzZXRzKSB7XG4gIC8vICAgdGhpcy5vZmZzZXRzID0gX29mZnNldHMgfHwgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZCh7fSwgZmFicmljLlNsaWRlQ2FudmFzLnByb3RvdHlwZS5vZmZzZXRzKTtcbiAgLy8gICAvL3RoaXMuX3VwZGF0ZV9jbGlwX3JlY3QoKTtcbiAgLy8gICByZXR1cm4gdGhpcztcbiAgLy8gfSxcbiAgZ2V0UmVjdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXG4gICAgdmFyIHJlY3QgPSB7fTtcblxuICAgIHZhciBfdyA9IHRoaXMub3JpZ2luYWxXaWR0aCB8fCB0aGlzLndpZHRoOyAvL3RoaXMub3JpZ2luYWxXaWR0aFxuICAgIHZhciBfZmxleEFycmF5ID0gZmFicmljLnV0aWwuZmxleChfdyAsIFt7dmFsdWU6IG9wdGlvbnMubGVmdCwgZmxleDogMH0se3ZhbHVlOiBvcHRpb25zLndpZHRoLCBmbGV4OiAxfSx7dmFsdWU6IG9wdGlvbnMucmlnaHQsIGZsZXg6IDB9XSApO1xuICAgIHJlY3QubGVmdCA9IF9mbGV4QXJyYXlbMF07XG4gICAgcmVjdC53aWR0aCA9IF9mbGV4QXJyYXlbMV07XG4gICAgcmVjdC5yaWdodCA9IF9mbGV4QXJyYXlbMl07XG5cbiAgICB2YXIgX2ggPSB0aGlzLm9yaWdpbmFsSGVpZ2h0fHwgdGhpcy5oZWlnaHQ7ICAgLy90aGlzLm9yaWdpbmFsSGVpZ2h0XG4gICAgdmFyIF9mbGV4QXJyYXkgPSBmYWJyaWMudXRpbC5mbGV4KF9oICwgW3t2YWx1ZTogb3B0aW9ucy50b3AsIGZsZXg6IDB9LHt2YWx1ZTogb3B0aW9ucy5oZWlnaHQsIGZsZXg6IDF9LHt2YWx1ZTogb3B0aW9ucy5ib3R0b20sIGZsZXg6IDB9XSApO1xuICAgIHJlY3QudG9wID0gX2ZsZXhBcnJheVswXTtcbiAgICByZWN0LmhlaWdodCA9IF9mbGV4QXJyYXlbMV07XG4gICAgcmVjdC5ib3R0b20gPSBfZmxleEFycmF5WzJdO1xuXG4gICAgcmV0dXJuIHJlY3Q7XG4gIH0sXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy9yZW5kZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZmFicmljLnNhdmVBcyAgPSByZXF1aXJlKFwiLi8uLi9wbHVnaW5zL3NhdmVBcy5qc1wiKS5zYXZlQXM7XG5cbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLlNsaWRlQ2FudmFzLnByb3RvdHlwZSwge1xuICBpbnNlcnRSZW5kZXJBcmVhOiBmYWxzZSxcbiAgaW5zZXJ0UmVuZGVyRnVsbDogZmFsc2UsXG59KTtcblxuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuYWN0aW9ucywge1xuICByZW5kZXJBcmVhOiB7XG4gICAgY2xhc3NOYW1lOiAnZmEgZmEtZG93bmxvYWQnLFxuICAgIHRpdGxlOiAnUmVuZGVyIEFyZWEnLFxuICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgZmFicmljLnNhdmVBcyh0aGlzLmdldEltYWdlRGF0YSh7XG4gICAgICAgIGNsaXBwZWRfYXJlYTogdGhpcy5hY3RpdmVBcmVhLFxuICAgICAgICB6b29tOiB0aGlzLmRvdHNQZXJVbml0LFxuICAgICAgICBjbGlwcGVkX2FyZWFfb25seTogdHJ1ZSxcbiAgICAgICAgZHJhd19iYWNrZ3JvdW5kOiBmYWxzZVxuICAgICAgfSkuYmxvYiwgdGhpcy50aXRsZSk7XG4gICAgfVxuICB9LFxuICByZW5kZXJGdWxsOiB7XG4gICAgdGl0bGU6ICdSZW5kZXIgZnVsbCcsXG4gICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmYWJyaWMuc2F2ZUFzKHRoaXMuZ2V0SW1hZ2VEYXRhKHtcbiAgICAgICAgem9vbTogdGhpcy5kb3RzUGVyVW5pdCxcbiAgICAgICAgY2xpcHBlZF9hcmVhX29ubHk6IGZhbHNlLFxuICAgICAgICBkcmF3X2JhY2tncm91bmQ6IHRydWVcbiAgICAgIH0pLmJsb2IsIHRoaXMudGl0bGUpO1xuICAgIH1cbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21vZHVsZXMvc2F2ZUFzLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxuZmFicmljLnV0aWwudXBsb2FkSW1hZ2VNYXhTaXplID0ge1xuICB3aWR0aDogNDAwLFxuICBoZWlnaHQ6IDQwMFxufTtcblxuZmFicmljLnV0aWwudXBsb2FkSW1hZ2VNaW5TaXplID0ge1xuICB3aWR0aDogMTAwLFxuICBoZWlnaHQ6IDEwMFxufTtcblxuZmFicmljLnV0aWwubXVsdGlVcGxvYWQgPSBmYWxzZTtcblxuZmFicmljLnV0aWwucmVhZEZpbGUgPSBmdW5jdGlvbihmaWxlLGNhbGxiYWNrKXtcblxuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICB2YXIgdHlwZSA9IHJlc3VsdC5zdWJzdHIoMTEsIHJlc3VsdC5pbmRleE9mKFwiO1wiKSAtIDExKTtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnR5cGUgPSB0eXBlO1xuICAgIGltZy5uYW1lID0gZmlsZS5uYW1lO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIGlmKCFmYWJyaWMudXRpbC5tdWx0aVVwbG9hZCl7XG4gICAgICAgIGlmIChmYWJyaWMudXRpbC51cGxvYWRQcmVwcm9jZXNzb3IpIHtcbiAgICAgICAgICBmYWJyaWMudXRpbC51cGxvYWRQcmVwcm9jZXNzb3IoW3RoaXNdLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh2YWwpO1xuICAgICAgICAgIH0sb3B0aW9ucylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpbWcuc3JjID0gcmVzdWx0O1xuICB9O1xuICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlICk7XG59O1xuXG5cbmZhYnJpYy51dGlsLmNyZWF0ZVVwbG9hZElucHV0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbXBsZXRlLCBwcm9ncmVzcykge1xuXG4gIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImZpbGVcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIsIHRydWUpO1xuICBpbnB1dC5jbGFzc05hbWUgPSBcImhpZGRlblwiO1xuXG4gICQoaW5wdXQpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbiAgICBpZihpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlcy5sZW5ndGgpe1xuXG4gICAgICB2YXIgX2xvYWRlciA9IGZhYnJpYy51dGlsLnF1ZXVlTG9hZChpbnB1dC5maWxlcy5sZW5ndGgsZnVuY3Rpb24obG9hZGVkKXtcblxuICAgICAgICBpZihmYWJyaWMudXRpbC5tdWx0aVVwbG9hZCl7XG4gICAgICAgICAgaWYgKGZhYnJpYy51dGlsLnVwbG9hZFByZXByb2Nlc3Nvcikge1xuICAgICAgICAgICAgZmFicmljLnV0aWwudXBsb2FkUHJlcHJvY2Vzc29yKGxvYWRlZCwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICBjb21wbGV0ZSh2YWwsb3B0aW9ucyk7XG4gICAgICAgICAgICB9LG9wdGlvbnMpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlKGxvYWRlZCxvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGNvbXBsZXRlKGxvYWRlZFswXSxvcHRpb25zKTtcblxuICAgICAgICB9XG4gICAgICB9LGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50LCBpbWFnZSl7XG4gICAgICAgIGlmKGZhYnJpYy51dGlsLm11bHRpVXBsb2FkKSB7XG4gICAgICAgICAgaWYgKHByb2dyZXNzKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyh0b3RhbCwgY3VycmVudCwgaW1hZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuXG4gICAgICBmb3IodmFyIGkgPTA7IGk8IGlucHV0LmZpbGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZmFicmljLnV0aWwucmVhZEZpbGUoaW5wdXQuZmlsZXNbaV0sX2xvYWRlcik7XG4gICAgICB9XG5cblxuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZhYnJpYy51dGlsLnVwbG9hZElucHV0ID0gaW5wdXQ7XG59O1xuXG5cbi8vZmFicmljLnV0aWwucmVzaXplSW1hZ2UoaW1nLCBjYWxsYmFjayk7XG5mYWJyaWMudXRpbC51cGxvYWRQcmVwcm9jZXNzb3IgPSBudWxsO1xuXG5cbmZhYnJpYy51dGlsLnVwbG9hZEltYWdlID0gZnVuY3Rpb24gKGNiLHByb2dyZXNzLG9wdGlvbnMpIHtcbiAgZmFicmljLnV0aWwuY3JlYXRlVXBsb2FkSW5wdXQob3B0aW9ucyxjYixwcm9ncmVzcyk7XG4gICQoZmFicmljLnV0aWwudXBsb2FkSW5wdXQpLnRyaWdnZXIoJ2NsaWNrJyk7XG59O1xuXG5cbmZhYnJpYy51dGlsLnJlc2l6ZVVwbG9hZGVkSW1hZ2UgPSBmdW5jdGlvbiAoaW1nLCBjYWxsYmFjaykge1xuXG4gIGlmIChpbWcudHlwZSA9PT0gXCJzdmcreG1sXCIpIHtcbiAgICBjYWxsYmFjayhpbWcpO1xuICAgIHJldHVybjtcbiAgfVxuICAvL0hlcmUgd2UgY2FuIHB1dCBhIHJlc3RyaWN0aW9uIHRvIHVwbG9hZCBhIG1pbmltIHNpemVkIGxvZ29cbiAgaWYgKGltZy53aWR0aCA8IGZhYnJpYy51dGlsLnVwbG9hZEltYWdlTWluU2l6ZS53aWR0aCB8fCBpbWcuaGVpZ2h0IDwgZmFicmljLnV0aWwudXBsb2FkSW1hZ2VNaW5TaXplLmhlaWdodCkge1xuICAgIGFsZXJ0KFwiTG9nbyBpcyB0b28gc21hbGwuIE1JbmltdW0gc2l6ZSBpcyBcIiArIGZhYnJpYy51dGlsLnVwbG9hZEltYWdlTWluU2l6ZS53aWR0aCArIFwieFwiICsgZmFicmljLnV0aWwudXBsb2FkSW1hZ2VNaW5TaXplLmhlaWdodCk7XG4gICAgY2FsbGJhY2soZmFsc2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbWcud2lkdGggPiBmYWJyaWMudXRpbC51cGxvYWRJbWFnZU1heFNpemUud2lkdGggfHwgaW1nLmhlaWdodCA+IGZhYnJpYy51dGlsLnVwbG9hZEltYWdlTWF4U2l6ZS5oZWlnaHQpIHtcblxuICAgIHZhciBzaXplID0gZmFicmljLnV0aWwuZ2V0UHJvcG9ydGlvbnMoaW1nLCBmYWJyaWMudXRpbC51cGxvYWRJbWFnZU1heFNpemUsIFwiZml0XCIpO1xuXG4gICAgdmFyIGZpbHRlciA9IG5ldyBmYWJyaWMuSW1hZ2UuZmlsdGVycy5SZXNpemVEUCgpO1xuXG4gICAgdmFyIGNhbnZhcyA9IGZhYnJpYy51dGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnRXaXRoU2l6ZShpbWcpO1xuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICBmaWx0ZXIuYXBwbHlUbyhjYW52YXMsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICBjYWxsYmFjayhjYW52YXMpO1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKGltZyk7XG4gIH1cbn07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy91cGxvYWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vbW9kdWxlIHJlc3BvbnNpdmUgYm9yZGVycy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5PYmplY3QucHJvdG90eXBlLCB7XG4gIHJlc3BvbnNpdmVCb3JkZXJzOiBmYWxzZVxufSk7XG5cbmlmKCFmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLl9kZWZhdWx0X2V2ZW50X2xpc3RlbmVycyl7XG4gIGZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuX2RlZmF1bHRfZXZlbnRfbGlzdGVuZXJzID0ge307XG59O1xuXG5mYWJyaWMuT2JqZWN0LnByb3RvdHlwZS51cGRhdGVSZXNwb25zaXZlQm9yZGVyID0gZnVuY3Rpb24oKXtcbiAgaWYodGhpcy5yZXNwb25zaXZlQm9yZGVycyl7XG4gICAgaWYoIXRoaXMub3JpZ2luYWxTdHJva2VXaWR0aCl7XG4gICAgICB0aGlzLm9yaWdpbmFsU3Ryb2tlV2lkdGggPSB0aGlzLnN0cm9rZVdpZHRoO1xuICAgIH1cbiAgICB0aGlzLnN0cm9rZVdpZHRoID0gdGhpcy5jYW52YXMgPyB0aGlzLm9yaWdpbmFsU3Ryb2tlV2lkdGggLyB0aGlzLmNhbnZhcy52aWV3cG9ydFRyYW5zZm9ybVswXSA6IDA7XG4gIH1cbn07XG5cbmZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuX2RlZmF1bHRfZXZlbnRfbGlzdGVuZXJzWyd2aWV3cG9ydDpzY2FsZWQnXSA9IGZ1bmN0aW9uKCl7XG5cbiAgaWYodGhpcy5iYWNrZ3JvdW5kSW1hZ2Upe1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLnVwZGF0ZVJlc3BvbnNpdmVCb3JkZXIoKTtcbiAgfVxuICBmb3IodmFyIGkgaW4gdGhpcy5fb2JqZWN0cyl7XG4gICAgdGhpcy5fb2JqZWN0c1tpXS51cGRhdGVSZXNwb25zaXZlQm9yZGVyKCk7XG4gIH1cbn07XG5cbmZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuX2RlZmF1bHRfZXZlbnRfbGlzdGVuZXJzW1wiYmFja2dyb3VuZC1pbWFnZTpsb2FkZWRcIl0gPSBmdW5jdGlvbihldmVudCl7XG4gIGlmKHRoaXMuYXV0b0NlbnRlckFuZFpvb21PdXRFbmFibGVkKSB7XG4gICAgdGhpcy5jZW50ZXJBbmRab29tT3V0KCk7XG4gIH1cbn07XG5cbmZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuX2RlZmF1bHRfZXZlbnRfbGlzdGVuZXJzW1wibG9hZGluZzplbmRcIl0gPSBmdW5jdGlvbihldmVudCl7XG4gIGlmKHRoaXMuYXV0b0NlbnRlckFuZFpvb21PdXRFbmFibGVkICYmICh0aGlzLm9yaWdpbmFsSGVpZ2h0IHx8IHRoaXMub3JpZ2luYWxXaWR0aCkgKXtcbiAgICB0aGlzLmNlbnRlckFuZFpvb21PdXQoKTtcbiAgfVxufTtcblxuXG5cbmZhYnJpYy5TbGlkZUNhbnZhcy5wcm90b3R5cGUuX2RlZmF1bHRfZXZlbnRfbGlzdGVuZXJzW1wib2JqZWN0OmFkZGVkXCJdID0gZnVuY3Rpb24oZXZlbnQpe1xuICBldmVudC50YXJnZXQudXBkYXRlUmVzcG9uc2l2ZUJvcmRlcigpXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuU2xpZGVDYW52YXMucHJvdG90eXBlLCB7XG4gIHpvb21DdHJsS2V5OiB0cnVlLFxuICBtb3VzZVdoZWVsRW5hYmxlZCA6IGZhbHNlLFxuICBfc2V0Wm9vbU5hdGl2ZSAgOiBmYWJyaWMuQ2FudmFzLnByb3RvdHlwZS5zZXRab29tLFxuICBfem9vbVRvUG9pbnROYXRpdmUgIDogZmFicmljLkNhbnZhcy5wcm90b3R5cGUuem9vbVRvUG9pbnQsXG4gIGluc2VydFpvb21Ub29sczogZmFsc2UsXG4gIGluc2VydFpvb21OdW1iZXI6IGZhbHNlLFxuICBjaGFuZ2VEaW1lbnNpb25Pblpvb206IGZhbHNlLFxuICBkcmF3Wm9vbUFyZWEgOiBmdW5jdGlvbihfY3R4LGxlZnQsIHRvcCAsd2lkdGgsIGhlaWdodCApe1xuICAgIF9jdHguc2F2ZSgpO1xuICAgIF9jdHgudHJhbnNsYXRlKGxlZnQgfHwgMCwgdG9wIHx8IDApO1xuICAgIHZhciBfc2NhbGUgPSB0aGlzLmdldFpvb20oKTtcbiAgICB2YXIgX3NpemUgPSBmYWJyaWMudXRpbC5nZXRQcm9wb3J0aW9ucyh0aGlzLmJhY2tncm91bmRJbWFnZSwge3dpZHRoOiB3aWR0aCB8fCAxMDAsIGhlaWdodDogaGVpZ2h0IHx8IDEwMH0pO1xuICAgIF9jdHguZ2xvYmFsQWxwaGEgPSAwLjU7XG4gICAgX2N0eC5maWxsUmVjdCgwLDAsX3NpemUud2lkdGgsIF9zaXplLmhlaWdodCk7XG4gICAgX2N0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG5cbiAgICB2YXIgdiA9IHRoaXMudmlld3BvcnRUcmFuc2Zvcm07XG5cbiAgICB2YXIgeDEgPSAtdls0XSAqIF9zaXplLnNjYWxlIC8gX3NjYWxlO1xuICAgIHZhciB5MSA9IC12WzVdICogX3NpemUuc2NhbGUgLyBfc2NhbGU7XG4gICAgdmFyIHgyID0geDEgKyB0aGlzLndpZHRoICogX3NpemUuc2NhbGUgLyBfc2NhbGU7XG4gICAgdmFyIHkyID0geTEgKyB0aGlzLmhlaWdodCAqIF9zaXplLnNjYWxlIC8gX3NjYWxlO1xuXG4gICAgeDEgPSBNYXRoLm1heCh4MSwwKTtcbiAgICB5MSA9IE1hdGgubWF4KHkxLDApO1xuICAgIHgyID0gTWF0aC5taW4oeDIsX3NpemUud2lkdGgpO1xuICAgIHkyID0gTWF0aC5taW4oeTIsX3NpemUuaGVpZ2h0KTtcblxuICAgIF9jdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgIF9jdHguYmVnaW5QYXRoKCk7XG4gICAgX2N0eC5tb3ZlVG8oeDEseTEpO1xuICAgIF9jdHgubGluZVRvKHgyLHkxKTtcbiAgICBfY3R4LmxpbmVUbyh4Mix5Mik7XG4gICAgX2N0eC5saW5lVG8oeDEseTIpO1xuICAgIF9jdHgubGluZVRvKHgxLHkxKTtcblxuICAgIF9jdHguZmlsbCgpO1xuICAgIF9jdHguY2xpcCgpO1xuICAgIC8vIF9jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtaW5cIjtcbiAgICBfY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmRJbWFnZS5fZWxlbWVudCwwLDAsX3NpemUud2lkdGgsIF9zaXplLmhlaWdodClcbiAgICAvLyBfY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAvLyBfY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmRJbWFnZS5fZWxlbWVudCwwLDAsX3NpemUud2lkdGgsIF9zaXplLmhlaWdodClcbiAgICBfY3R4LnN0cm9rZSgpO1xuICAgIF9jdHguc3Ryb2tlUmVjdCgwLDAsX3NpemUud2lkdGgsIF9zaXplLmhlaWdodCk7XG4gICAgX2N0eC5yZXN0b3JlKCk7XG4gIH0sXG4gIHNldFpvb206IGZ1bmN0aW9uIChfc2NhbGUpe1xuICAgIGlmKHRoaXMuY2hhbmdlRGltZW5zaW9uT25ab29tKXtcbiAgICAgIHZhciBfdyA9IE1hdGgucm91bmQodGhpcy5vcmlnaW5hbFdpZHRoICogX3NjYWxlKTtcbiAgICAgIHZhciBfaCA9IE1hdGgucm91bmQodGhpcy5vcmlnaW5hbEhlaWdodCAqIF9zY2FsZSk7XG4gICAgICB0aGlzLnNldERpbWVuc2lvbnMoe1xuICAgICAgICB3aWR0aDogX3csXG4gICAgICAgIGhlaWdodDogX2hcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl96b29tVG9Qb2ludE5hdGl2ZSggbmV3IGZhYnJpYy5Qb2ludCgwLCAwKSwgX3NjYWxlKVxuICAgIC8vICB0aGlzLl9zZXRab29tTmF0aXZlKF9zY2FsZSk7XG4gICAgdGhpcy5maXJlKCd2aWV3cG9ydDpzY2FsZWQnLCB7c2NhbGU6IF9zY2FsZX0pO1xuICB9LFxuICB6b29tVG9Qb2ludDogZnVuY3Rpb24ocG9pbnQsIG5ld1pvb20pe1xuICAgIHZhciBfbWF4ID0gIHRoaXMuZ2V0TWF4Wm9vbSgpO1xuICAgIHZhciBfbWluID0gIHRoaXMuZ2V0TWluWm9vbSgpLnNjYWxlO1xuICAgIGlmKG5ld1pvb20gPiBfbWF4KXtcbiAgICAgIG5ld1pvb20gPSBfbWF4O1xuICAgIH1cbiAgICBpZihuZXdab29tIDwgX21pbil7XG4gICAgICBuZXdab29tID0gX21pbjtcbiAgICB9XG4gICAgdGhpcy5fem9vbVRvUG9pbnROYXRpdmUoIHBvaW50LCBuZXdab29tKTtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX29iamVjdHMpIHtcbiAgICAgIHRoaXMuX29iamVjdHNbaV0uc2V0Q29vcmRzKCk7XG4gICAgfVxuICAgIHRoaXMuZmlyZSgndmlld3BvcnQ6c2NhbGVkJywge3NjYWxlOiBuZXdab29tfSk7XG4gIH0sXG4gIHJlc2V0Vmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBfY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtWzBdID0gMTtcbiAgICBfY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtWzNdID0gMTtcbiAgICBfY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtWzRdID0gMDtcbiAgICBfY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtWzVdID0gMDtcbiAgICBfY2FudmFzLnJlbmRlckFsbCgpO1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fb2JqZWN0cykge1xuICAgICAgdGhpcy5fb2JqZWN0c1tpXS5zZXRDb29yZHMoKTtcbiAgICB9XG4gIH0sXG4gIHpvb21Ub1BvaW50RW5hYmxlZDogdHJ1ZSxcbiAgbWluWm9vbUZhY3RvcjogMSxcbiAgbWF4Wm9vbTogMjAsXG4gIGF1dG9DZW50ZXJBbmRab29tT3V0RW5hYmxlZDogZmFsc2UsXG4gIGdldE1heFpvb206IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXhab29tO1xuICB9LFxuICBnZXRNaW5ab29tOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9jb250YWluZXJTaXplID0ge1xuICAgICAgd2lkdGg6ICQodGhpcy53cmFwcGVyRWwpLndpZHRoKCksXG4gICAgICBoZWlnaHQ6ICQodGhpcy53cmFwcGVyRWwpLmhlaWdodCgpXG4gICAgfTtcbiAgICB2YXIgX2JnU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLm9yaWdpbmFsV2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luYWxIZWlnaHRcbiAgICB9O1xuICAgIHZhciBfbWF4U2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBfY29udGFpbmVyU2l6ZS53aWR0aCAqIHRoaXMubWluWm9vbUZhY3RvcixcbiAgICAgIGhlaWdodDogX2NvbnRhaW5lclNpemUuaGVpZ2h0ICogdGhpcy5taW5ab29tRmFjdG9yXG4gICAgfTtcblxuICAgIHJldHVybiBmYWJyaWMudXRpbC5nZXRQcm9wb3J0aW9ucyhfYmdTaXplLCBfbWF4U2l6ZSwgJ2ZpdCcpO1xuICB9LFxuICBjZW50ZXJBbmRab29tT3V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZih0aGlzLnZpcnR1YWwpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMuZ2V0TWluWm9vbSgpO1xuXG4gICAgdmFyIF9jb250YWluZXJTaXplID0ge1xuICAgICAgd2lkdGg6ICQodGhpcy53cmFwcGVyRWwpLndpZHRoKCksXG4gICAgICBoZWlnaHQ6ICQodGhpcy53cmFwcGVyRWwpLmhlaWdodCgpXG4gICAgfTtcbiAgICB0aGlzLnNldFpvb20ob3B0aW9ucy5zY2FsZSk7XG4gICAgdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs0XSA9IChfY29udGFpbmVyU2l6ZS53aWR0aCAtIG9wdGlvbnMud2lkdGggKSAvIDI7XG4gICAgdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XSA9IChfY29udGFpbmVyU2l6ZS5oZWlnaHQgLSBvcHRpb25zLmhlaWdodCkgLyAyO1xuICAgIHRoaXMuX3VwZGF0ZV9iYWNrZ3JvdW5kX2ltYWdlKCk7XG4gICAgLy8gdGhpcy5maXJlKFwidmlld3BvcnQ6c2NhbGVkXCIse3NjYWxlOiBvcHRpb25zLnNjYWxlfSlcbiAgICAvL3RoaXMucmVuZGVyQWxsKCk7XG4gIH0sXG4gIGNlbnRlck9uT2JqZWN0OiBmdW5jdGlvbih0YWcpe1xuICAgIHZhciBiciA9IHRhZy5nZXRCb3VuZGluZ1JlY3QoKTtcbiAgICB2YXIgY3QgPSB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtO1xuICAgIGJyLndpZHRoIC89IGN0WzBdO1xuICAgIGJyLmhlaWdodCAvPSBjdFszXTtcbiAgICB2YXIgc2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBici53aWR0aCAqIDEuMSxcbiAgICAgIGhlaWdodDogYnIuaGVpZ2h0ICogMS4xXG4gICAgfTtcblxuICAgIHZhciBwcm9wID0gZmFicmljLnV0aWwuZ2V0UHJvcG9ydGlvbnMoc2l6ZSx0aGlzKTtcbiAgICB2YXIgX3cgPSAodGhpcy53aWR0aCAvIHByb3Auc2NhbGUgLSBzaXplLndpZHRoICkgLyAyO1xuICAgIHZhciBfaCA9ICh0aGlzLmhlaWdodCAvIHByb3Auc2NhbGUgLSBzaXplLmhlaWdodCkgLyAyO1xuICAgIHZhciBfbCA9IChici5sZWZ0ICAtIGN0WzRdKSAvIGN0WzBdO1xuICAgIHZhciBfdCA9IChici50b3AgLSBjdFs1XSkgLyBjdFszXTtcblxuICAgIHZhciB4MSA9IFtcbiAgICAgIHByb3Auc2NhbGUsXG4gICAgICAwLDAsXG4gICAgICBwcm9wLnNjYWxlLFxuICAgICAgLSB0YWcubGVmdCAqIHByb3Auc2NhbGUgKyAodGFnLndpZHRoICogMC4wNSArIF93KSAqIHByb3Auc2NhbGUsXG4gICAgICAtIHRhZy50b3AgKiBwcm9wLnNjYWxlICsgKHRhZy5oZWlnaHQgKiAwLjA1ICsgX2ggKSogcHJvcC5zY2FsZVxuICAgIF07XG4gICAgdmFyIHgyID0gW1xuICAgICAgcHJvcC5zY2FsZSxcbiAgICAgIDAsMCxcbiAgICAgIHByb3Auc2NhbGUsXG4gICAgICAtIF9sICAqIHByb3Auc2NhbGUgKyAoYnIud2lkdGggKiAwLjA1ICsgX3cpICogcHJvcC5zY2FsZSxcbiAgICAgIC0gX3QgICogcHJvcC5zY2FsZSArIChici5oZWlnaHQgKiAwLjA1ICsgX2ggKSogcHJvcC5zY2FsZVxuICAgIF07XG5cbiAgICB0aGlzLnNldFZpZXdwb3J0VHJhbnNmb3JtKHgyKTtcbiAgICB0aGlzLmZpcmUoXCJ2aWV3cG9ydDpzY2FsZWRcIix7c2NhbGU6IHByb3Auc2NhbGV9KVxuICAgIHRoaXMucmVuZGVyQWxsKCk7XG4gIH0sXG5cbiAgX19vbk1vdXNlV2hlZWw6IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgaWYoIXRoaXMubW91c2VXaGVlbEVuYWJsZWQgfHwgdGhpcy56b29tQ3RybEtleSAmJiAhZXZlbnQuY3RybEtleSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuLy9GaW5kIG5lYXJlc3QgcG9pbnQsIHRoYXQgaXMgaW5zaWRlIGltYWdlIEVORFxuICAgIHZhciB6b29tU3RlcDsvLyA9IDAuMSAqIGV2ZW50LmRlbHRhWTtcbiAgICBpZiAoZXZlbnQuZGVsdGFZIDwgMCkge1xuICAgICAgem9vbVN0ZXAgPSAxLjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHpvb21TdGVwID0gMC45O1xuICAgIH1cblxuICAgIHZhciBuZXdab29tID0gdGhpcy5nZXRab29tKCkgKiB6b29tU3RlcDtcbiAgICB2YXIgbWluWm9vbSA9IHRoaXMuZ2V0TWluWm9vbSgpLnNjYWxlO1xuXG5cbiAgICBpZih0aGlzLnpvb21Ub1BvaW50RW5hYmxlZCl7XG4gICAgICB2YXIgcG9pbnQgPSBuZXcgZmFicmljLlBvaW50KGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgdmFyIF94ID0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs0XTtcbiAgICAgIHZhciBfeSA9IHRoaXMudmlld3BvcnRUcmFuc2Zvcm1bNV07XG5cbiAgICAgIC8vIEZpbmQgbmVhcmVzdCBwb2ludCwgdGhhdCBpcyBpbnNpZGUgaW1hZ2UgQkVHSU5cbiAgICAgIC8vIEl0IGlzIG5lZWRlZCB0byBwcmV2ZW50IGNhbnZhcyB0byB6b29tIG91dHNpZGUgaW1hZ2VcbiAgICAgIHZhciBfdyA9IHRoaXMub3JpZ2luYWxXaWR0aCAqIHRoaXMuZ2V0Wm9vbSgpICsgX3g7XG4gICAgICB2YXIgX2ggPSB0aGlzLm9yaWdpbmFsSGVpZ2h0ICogdGhpcy5nZXRab29tKCkgKyBfeTtcblxuXG4gICAgICBpZiAocG9pbnQueCA8IF94KSB7XG4gICAgICAgIHBvaW50LnggPSBfeDtcbiAgICAgIH1cbiAgICAgIGlmIChwb2ludC55IDwgX3kpIHtcbiAgICAgICAgcG9pbnQueSA9IF95O1xuICAgICAgfVxuICAgICAgaWYgKHBvaW50LnggPiBfdykge1xuICAgICAgICBwb2ludC54ID0gX3c7XG4gICAgICB9XG4gICAgICBpZiAocG9pbnQueSA+IF9oKSB7XG4gICAgICAgIHBvaW50LnkgPSBfaDtcbiAgICAgIH1cbiAgICAgIGlmIChtaW5ab29tID4gbmV3Wm9vbSkge1xuICAgICAgICBpZih0aGlzLmF1dG9DZW50ZXJBbmRab29tT3V0RW5hYmxlZCl7XG4gICAgICAgICAgdGhpcy5jZW50ZXJBbmRab29tT3V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVRvUG9pbnQocG9pbnQsIG5ld1pvb20pO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgdGhpcy5zZXRab29tKG5ld1pvb20pO1xuICAgIH1cblxuXG5cblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fb2JqZWN0cykge1xuICAgICAgdGhpcy5fb2JqZWN0c1tpXS5zZXRDb29yZHMoKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJBbGwoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTsgLy9wcmV2ZW50aW5nIHNjcm9sbCBwYWdlXG4gIH0sXG4gIHNjYWxlRmFjdG9yOiAxLjEsXG4gIGdldE9yaWduYWxDZW50ZXIgOiBmdW5jdGlvbigpe1xuICAgIHZhciBwb2ludCA9IHRoaXMuZ2V0Q2VudGVyKCk7XG4gICAgcG9pbnQubGVmdCArPSB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtWzRdIDtcbiAgICBwb2ludC50b3AgKz0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybVs1XTtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cbn0pO1xuXG5cbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLlNsaWRlQ2FudmFzLnByb3RvdHlwZS5hY3Rpb25zLCB7XG4gIHpvb206IHtcbiAgICB0aXRsZTogXCJ6b29tXCIsXG4gICAgbWVudToge1xuICAgICAgem9vbU91dDoge1xuICAgICAgICBjbGFzc05hbWU6ICdmYSBmYS1zZWFyY2gtbWludXMnLFxuICAgICAgICBpbnNlcnQ6IFwiaW5zZXJ0Wm9vbVRvb2xzXCIsXG4gICAgICAgIHRpdGxlOiAnem9vbS1vdXQnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5nZXRPcmlnbmFsQ2VudGVyKCk7XG4gICAgICAgICAgdmFyIHNjYWxlVmFsdWUgPSB0aGlzLmdldFpvb20oKSAvIHRoaXMuc2NhbGVGYWN0b3I7XG4gICAgICAgICAgdGhpcy56b29tVG9Qb2ludCh7eDogcG9pbnQubGVmdCwgeTogcG9pbnQudG9wfSxzY2FsZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHpvb21OdW1iZXI6IHtcbiAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWluOiAgZnVuY3Rpb24oKXtyZXR1cm4gMC4wMX0sXG4gICAgICAgICAgbWF4OiAgZnVuY3Rpb24oKXtyZXR1cm4gMTB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRab29tKHZhbClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Wm9vbSgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvYnNlcnZlOiBcInZpZXdwb3J0OnNjYWxlZFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB6b29tSW46IHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtc2VhcmNoLXBsdXMnLFxuICAgICAgICBpbnNlcnQ6IFwiaW5zZXJ0Wm9vbVRvb2xzXCIsXG4gICAgICAgIHRpdGxlOiAnem9vbS1pbicsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLmdldE9yaWduYWxDZW50ZXIoKTtcbiAgICAgICAgICB2YXIgc2NhbGVWYWx1ZSA9IHRoaXMuZ2V0Wm9vbSgpICogdGhpcy5zY2FsZUZhY3RvcjtcbiAgICAgICAgICB0aGlzLnpvb21Ub1BvaW50KHt4OiBwb2ludC5sZWZ0LCB5OiBwb2ludC50b3B9LHNjYWxlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW9kdWxlcy96b29tLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxuLy9mYWJyaWMucmVxdWlyZShcIlNsaWRlSW1hZ2VcIixbXCJTbGlkZU9iamVjdFwiLyosXCJQYXRoZmluZGVyXCIqL10sZnVuY3Rpb24oKSB7XG5cbnZhciBJbWFnZUluaXRPdmVyV3JpdHRlbiA9IGZhYnJpYy5JbWFnZS5wcm90b3R5cGUuaW5pdGlhbGl6ZTtcbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLkltYWdlLnByb3RvdHlwZSwge1xuICBjb250ZW50T2Zmc2V0czogbnVsbCxcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjdHggQ29udGV4dCB0byByZW5kZXIgb25cbiAgICogQHBhcmFtIHtCb29sZWFufSBub1RyYW5zZm9ybVxuICAgKi9cbiAgX3JlbmRlcjogZnVuY3Rpb24oY3R4LCBub1RyYW5zZm9ybSkge1xuICAgIHZhciB4LCB5LCBpbWFnZU1hcmdpbnMgPSB0aGlzLl9maW5kTWFyZ2lucygpLCBlbGVtZW50VG9EcmF3O1xuXG4gICAgeCA9IChub1RyYW5zZm9ybSA/IHRoaXMubGVmdCA6IC10aGlzLndpZHRoIC8gMik7XG4gICAgeSA9IChub1RyYW5zZm9ybSA/IHRoaXMudG9wIDogLXRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICBpZiAodGhpcy5tZWV0T3JTbGljZSA9PT0gJ3NsaWNlJykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QoeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgY3R4LmNsaXAoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc01vdmluZyA9PT0gZmFsc2UgJiYgdGhpcy5yZXNpemVGaWx0ZXJzLmxlbmd0aCAmJiB0aGlzLl9uZWVkc1Jlc2l6ZSgpKSB7XG4gICAgICB0aGlzLl9sYXN0U2NhbGVYID0gdGhpcy5zY2FsZVg7XG4gICAgICB0aGlzLl9sYXN0U2NhbGVZID0gdGhpcy5zY2FsZVk7XG4gICAgICBlbGVtZW50VG9EcmF3ID0gdGhpcy5hcHBseUZpbHRlcnMobnVsbCwgdGhpcy5yZXNpemVGaWx0ZXJzLCB0aGlzLl9maWx0ZXJlZEVsIHx8IHRoaXMuX29yaWdpbmFsRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWxlbWVudFRvRHJhdyA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlckZpbGwoY3R4KTtcbiAgICBlbGVtZW50VG9EcmF3ICYmIGN0eC5kcmF3SW1hZ2UoZWxlbWVudFRvRHJhdyxcbiAgICAgIHggKyBpbWFnZU1hcmdpbnMubWFyZ2luWCxcbiAgICAgIHkgKyBpbWFnZU1hcmdpbnMubWFyZ2luWSxcbiAgICAgIGltYWdlTWFyZ2lucy53aWR0aCxcbiAgICAgIGltYWdlTWFyZ2lucy5oZWlnaHRcbiAgICApO1xuXG4gICAgdGhpcy5fc3Ryb2tlKGN0eCk7XG4gICAgdGhpcy5fcmVuZGVyU3Ryb2tlKGN0eCk7XG4gIH0sXG4gIGltYWdlVG9vbHM6ICAgICBmYWxzZSxcbiAgcGhvdG9zaG9wVG9vbHMgIDogZmFsc2UsXG4gIGNsb25lU3luYzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9vYmplY3QgPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgZGVsZXRlIF9vYmplY3QuZmlsdGVycztcbiAgICB2YXIgY2xvbmUgPSBuZXcgZmFicmljLkltYWdlKHRoaXMuX2VsZW1lbnQsX29iamVjdCk7XG4gICAgY2xvbmUuX2ZpbHRlcmVkRWwgPSB0aGlzLl9maWx0ZXJlZEVsO1xuICAgIGNsb25lLmZpbHRlcnMgPSB0aGlzLmZpbHRlcnM7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9LFxuICByZXZlcnRDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGF0aGZpbmRlciA9IHRoaXMuY2FudmFzLmdldFBhdGhmaW5kZXIoKTtcbiAgICBpZiAocGF0aGZpbmRlci50YXJnZXQgJiYgcGF0aGZpbmRlci50YXJnZXQgPT0gdGhpcyl7XG4gICAgICBwYXRoZmluZGVyLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLl9lbGVtZW50ID09IHRoaXMuX29yaWdpbmFsRWxlbWVudCl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJzLmxlbmd0aCA9IDA7XG4gICAgaWYgKHRoaXMuX2ZpbHRlcmVkRWwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9maWx0ZXJlZEVsO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5fZWRpdGVkO1xuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnQ7XG5cbiAgICB0aGlzLmZpcmUoXCJjb250ZW50Om1vZGlmaWVkXCIse1xuICAgICAgYm91bmRzOiB7bWluWDogMCwgbWluWTogMCwgbWF4WDogdGhpcy5fZWxlbWVudC53aWR0aCwgbWF4WTogdGhpcy5fZWxlbWVudC5oZWlnaHQgfVxuICAgIH0pO1xuXG5cbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgfSxcbiAgcmVtb3ZlV2hpdGU6IGZ1bmN0aW9uKHRocmVzaG9sZCxyZW1vdmVBbGwsY2FsbGJhY2spIHtcblxuXG4gICAgdmFyIHJ3ZiA9IF8uZmluZFdoZXJlKHRoaXMuZmlsdGVycywge3R5cGU6ICdSZW1vdmVXaGl0ZURQJ30pO1xuXG4gICAgaWYocndmKSB7XG4gICAgICByd2Yub3B0aW9ucy5jb2xvclRocmVzaG9sZCA9IHRocmVzaG9sZDtcbiAgICAgIHJ3Zi5vcHRpb25zLmZyb21Db3JuZXJzID0gIXJlbW92ZUFsbDtcbiAgICB9ZWxzZXtcbiAgICAgIHJ3ZiA9IG5ldyBmYWJyaWMuSW1hZ2UuZmlsdGVycy5SZW1vdmVXaGl0ZURQKHtcbiAgICAgICAgZnJvbUNvcm5lcnM6ICFyZW1vdmVBbGwsXG4gICAgICAgIGJsdXJSYWRpdXM6IDIsXG4gICAgICAgIGNvbG9yVGhyZXNob2xkOiB0aHJlc2hvbGRcbiAgICAgIH0pO1xuICAgICAgdGhpcy5maWx0ZXJzLnB1c2gocndmKTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuYXBwbHlGaWx0ZXJzKGZ1bmN0aW9uKCl7XG4gICAgICAvL190aGlzLndpZHRoID0gX3RoaXMuX2VsZW1lbnQud2lkdGg7XG4gICAgICAvL190aGlzLmhlaWdodCA9IF90aGlzLl9lbGVtZW50LmhlaWdodDtcbiAgICAgIF90aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgICAgIF90aGlzLmZpcmUoXCJjb250ZW50Om1vZGlmaWVkXCIse2ZpbHRlcjogcndmLCBib3VuZHM6IHJ3Zi5ib3VuZHN9KTtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH0sXG4gIHJlbW92ZVdoaXRlQWxsOiB0cnVlXG59KTtcblxudmFyIF9JTUcgPSBmYWJyaWMuSW1hZ2UucHJvdG90eXBlO1xuXG5cbmlmKF9JTUcuYWN0aW9ucyA9PSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5hY3Rpb25zICl7XG4gIF9JTUcuYWN0aW9ucyA9IGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoe30sZmFicmljLk9iamVjdC5wcm90b3R5cGUuYWN0aW9ucyk7XG59XG5cbl9JTUcuYWN0aW9ucyA9IGZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoX0lNRy5hY3Rpb25zLHtcbiAgcmVtb3ZlV2hpdGVGcm9tQm9yZGVyczoge1xuICAgIHRpdGxlOiAnUmVtb3ZlIEJhY2tncm91bmQnLFxuICAgIHR5cGU6ICdlZmZlY3QnLFxuICAgIGNsYXNzTmFtZTogICBcImZhIGZhLWRvdC1jaXJjbGUtb1wiLFxuICAgIGVmZmVjdFRwbDpcbiAgICAnPGJ1dHRvbiBpZD1cInNlbGVjdC1jb2xvcnMtYWN0aW9uLWJ1dHRvblwiIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2J1dHRvbj4nK1xuICAgICc8aW5wdXQgaWQ9XCJzZWxlY3QtY29sb3JzLWNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCI+JyArXG4gICAgJzxpbnB1dCBpZD1cInNlbGVjdC1jb2xvcnMtdGhyZXNob2xkXCIgdHlwZT1cInJhbmdlXCIgICBtaW49XCIxXCIgbWF4PVwiMjU1XCI+JyxcbiAgICBhY3Rpb25QYXJhbWV0ZXJzOiBmdW5jdGlvbihlbCxkYXRhKXtcbiAgICAgIHZhclxuICAgICAgICBhY3Rpb25DaGsgPSBlbC5maW5kKCcjc2VsZWN0LWNvbG9ycy1jaGVja2JveCcpLFxuICAgICAgICBhY3Rpb25CdG4gPSBlbC5maW5kKCcjc2VsZWN0LWNvbG9ycy1hY3Rpb24tYnV0dG9uJyk7XG4gICAgICBkYXRhLnRocmVzaG9sZEVsID0gZWwuZmluZCgnI3NlbGVjdC1jb2xvcnMtdGhyZXNob2xkJyk7XG5cbiAgICAgIGRhdGEucmVtb3ZlV2hpdGVBbGwgPSBhY3Rpb25DaGsuaXMoXCI6Y2hlY2tlZFwiKTtcbiAgICAgIGFjdGlvbkNoay5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgZGF0YS5yZW1vdmVXaGl0ZUFsbCA9IGFjdGlvbkNoay5pcyhcIjpjaGVja2VkXCIpXG4gICAgICB9KTtcbiAgICAgIGFjdGlvbkJ0bi5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBkYXRhLmFjdGlvbigpO1xuICAgICAgfSk7XG4gICAgICBpZighZGF0YS5fX2FjdGlvbil7XG5cbiAgICAgICAgZGF0YS5fX2FjdGlvbiA9IGRhdGEuYWN0aW9uO1xuICAgICAgICBkYXRhLmFjdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZGF0YS5fX2FjdGlvbihwYXJzZUludChkYXRhLnRocmVzaG9sZEVsLnZhbCgpKSxkYXRhLnJlbW92ZVdoaXRlQWxsKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgYWN0aW9uOiBfSU1HLnJlbW92ZVdoaXRlLFxuICAgIGluc2VydDogICAgICdpbWFnZVRvb2xzJ1xuICB9LFxuICBhZHZhbmNlZFRvb2xzOiB7XG4gICAgdHlwZTogJ2VmZmVjdCcsXG4gICAgZWZmZWN0VHBsOlxuICAgICc8ZGl2IGlkPVwiZWRpdG9yLXRvb2xzXCIgY2xhc3M9XCJpbmxpbmUtYWN0aW9ucyBjb21wYWN0XCI+PC9kaXY+JytcbiAgICAnPGRpdiBjbGFzcz1cImNoZWNrYm9hcmRcIiA+PGRpdiBpZD1cInBhdGhmaW5kZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIGNsYXNzTmFtZTogJ2ZhIGZhLXBlbmNpbC1zcXVhcmUtbycsXG4gICAgdGl0bGU6IFwiYWR2YW5jZWQgdG9vbHNcIixcbiAgICBhY3Rpb246IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcGF0aGZpbmRlciA9IHRoaXMuY2FudmFzLmdldFBhdGhmaW5kZXIoKTtcbiAgICAgIHBhdGhmaW5kZXIudGFyZ2V0ID0gdGhpcztcbiAgICAgIHBhdGhmaW5kZXIuc2V0UGljdHVyZSh0aGlzLl9lbGVtZW50KTtcbiAgICAgIHBhdGhmaW5kZXIuc2hvdygpO1xuICAgIH0sXG4gICAgYWN0aW9uUGFyYW1ldGVyczogZnVuY3Rpb24oZWwsZGF0YSl7XG5cbiAgICAgIHZhciBwYXRoZmluZGVyID0gdGhpcy5jYW52YXMuZ2V0UGF0aGZpbmRlcigpO1xuICAgICAgcGF0aGZpbmRlci5jYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICAgIGZhYnJpYy5Ub29sYmFyLmNyZWF0ZShwYXRoZmluZGVyLCAnZWRpdG9yLXRvb2xzJyk7XG5cbiAgICAgIHBhdGhmaW5kZXIuc2V0Q29udGFpbmVyKCdwYXRoZmluZGVyJyk7XG5cbiAgICAgIC8vIGlmIChwYXRoZmluZGVyLnRhcmdldClwYXRoZmluZGVyLmhpZGUoKTtcbiAgICAgIHBhdGhmaW5kZXIudGFyZ2V0ID0gdGhpcztcbiAgICAgIHBhdGhmaW5kZXIuc2V0UGljdHVyZSh0aGlzLl9lbGVtZW50KTtcbiAgICAgIHBhdGhmaW5kZXIuc2hvdygpO1xuICAgIH0sXG4gICAgaW5zZXJ0OiAgICAgJ3Bob3Rvc2hvcFRvb2xzJ1xuICB9LFxuICBoaXN0b3J5QnJ1c2g6IHtcbiAgICBjbGFzc05hbWU6ICdmYSBmYS1oaXN0b3J5JyxcbiAgICB0aXRsZTogXCJyZXZlcnQgdG8gb3JpZ25hbCBpbWFnZVwiLFxuICAgIGFjdGlvbjogX0lNRy5yZXZlcnRDaGFuZ2VzLFxuICAgIG9ic2VydmU6ICBcImNvbnRlbnQ6bW9kaWZpZWRcIixcbiAgICB2aXNpYmxlOiAgICAgZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAhIXRoaXMuX2ZpbHRlcmVkRWwgfHwgdGhpcy5fZWRpdGVkO1xuICAgIH0sXG4gICAgaW5zZXJ0OiAgICAgJ2ltYWdlVG9vbHMnXG4gIH0sXG59KTtcblxuZmFicmljLkltYWdlLnByb3RvdHlwZS5leHRyYWN0Q29sb3JzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX2NvbG9ycyA9IGZhYnJpYy5NYWdpY1dhbmQuZXh0cmFjdENvbG9ycyh0aGlzLl9lbGVtZW50KTtcbiAgdmFyIGNvbG9ycyA9IHt9O1xuICBmb3IodmFyIGkgaW4gX2NvbG9ycyl7XG4gICAgdmFyIF9zdHIgPSBcInJnYihcIiArIF9jb2xvcnNbaV0uam9pbihcIixcIikgKyBcIilcIjtcbiAgICBjb2xvcnNbX3N0cl0gPSB7fTtcbiAgfVxuICByZXR1cm4gY29sb3JzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb2JqZWN0cy9TbGlkZUltYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLk9iamVjdC5wcm90b3R5cGUsIHtcbiAgaGFzQm91bmRzQ29udHJvbHM6IHRydWUsXG4gIGZsaXBUb29sczogICAgIGZhbHNlLFxuICBvcmRlclRvb2xzOiAgICBmYWxzZSxcbiAgc3Ryb2tlOiBcInRyYW5zcGFyZW50XCIsXG4gIG9uVG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FudmFzLl9vYmplY3RzLmluZGV4T2YodGhpcykgPT0gdGhpcy5jYW52YXMuX29iamVjdHMubGVuZ3RoIC0gMTtcbiAgfSxcbiAgZmxvcDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmxpcFkgPSAhdGhpcy5mbGlwWTtcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgfSxcbiAgZmxpcDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmxpcFggPSAhdGhpcy5mbGlwWDtcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgfSxcbiAgb25Cb3R0b206IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jYW52YXMuX29iamVjdHMuaW5kZXhPZih0aGlzKSA9PSAwO1xuICB9LFxuICBkdXBsaWNhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfb2JqZWN0ID0gdGhpcy50b09iamVjdChmYWJyaWMuSU5DTFVERV9BTEwpO1xuICAgIF9vYmplY3QuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHZhciBfY2xvbmUgPSBfb2JqZWN0LmNsb25lU3luYyAmJiBfb2JqZWN0LmNsb25lU3luYygpIHx8IHRoaXMuY2FudmFzLmNyZWF0ZU9iamVjdChfb2JqZWN0KTtcbiAgICByZXR1cm4gX2Nsb25lO1xuICB9LFxuICBpbnNlcnREdXBsaWNhdGU6IGZhbHNlLFxuICBpbnNlcnRSZW1vdmU6IGZhbHNlLFxuICBpbnNlcnRCb3VuZGluZ1JlY3Q6IGZhbHNlLFxuICBpbnNlcnREaW1lbnNpb25zOiBmYWxzZSxcbiAgaW5zZXJ0UG9zaXRpb246IGZhbHNlLFxuICBtaW5TdHJva2VXaWR0aDogMCxcbiAgbWF4U3Ryb2tlV2lkdGg6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIE1hdGgubWluKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpIC8gMjtcbiAgfSxcbiAgYWN0aW9uczoge1xuICAgIGJvdW5kaW5nUmVjdDoge1xuICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgIHRlbXBsYXRlOiAnPGR0Pkw6PC9kdD48ZGQgY2xhc3M9XCJ7bGVmdENsYXNzfVwiIHRpdGxlPVwie2xlZnR9XCI+e3JvdW5kTGVmdH08L2RkPjxkdD5UOjwvZHQ+PGRkIGNsYXNzPVwie3RvcENsYXNzfVwiICB0aXRsZT1cInt0b3B9XCI+e3JvdW5kVG9wfTwvZGQ+PGR0PlI6PC9kdD48ZGQgY2xhc3M9XCJ7cmlnaHRDbGFzc31cIiB0aXRsZT1cIntyaWdodH1cIj57cm91bmRSaWdodH08L2RkPjxkdD5COjwvZHQ+PGRkIGNsYXNzPVwie2JvdHRvbUNsYXNzfVwiICB0aXRsZT1cIntib3R0b219XCI+e3JvdW5kQm90dG9tfTwvZGQ+JyxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIG9ic2VydmU6IFwibW9kaWZpZWQgc2NhbGluZyBtb3Zpbmcgcm90YXRpbmdcIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBfcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdSZWN0KCk7XG5cbiAgICAgICAgICBpZih0aGlzLm1vdmVtZW50TGltaXRzKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVtZW50TGltaXRzID09IHRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICAgIHZhciBfdiA9IHRoaXMuY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtO1xuICAgICAgICAgICAgICB2YXIgX21sciA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBfdls0XSxcbiAgICAgICAgICAgICAgICB0b3A6IF92WzVdLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAodGhpcy5jYW52YXMub3JpZ2luYWxXaWR0aCB8fCB0aGlzLmNhbnZhcy53aWR0aCkgKiBfdlswXSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICh0aGlzLmNhbnZhcy5vcmlnaW5hbEhlaWdodCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQpICAqIF92WzNdLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgX21sciA9IHRoaXMubW92ZW1lbnRMaW1pdHMuZ2V0Qm91bmRpbmdSZWN0KCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgX3JlY3QuYm90dG9tID0gdGhpcy5tb3ZlbWVudExpbWl0cy5oZWlnaHQgLSBfcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgX3QgPSBfcmVjdC50b3AgLSBfbWxyLnRvcDtcbiAgICAgICAgICAgIHZhciBfbCA9IF9yZWN0LmxlZnQgLSBfbWxyLmxlZnQ7XG4gICAgICAgICAgICB2YXIgX3IgPSBfbWxyLndpZHRoIC0gX3JlY3Qud2lkdGggLSBfbDtcbiAgICAgICAgICAgIHZhciBfYiA9IF9tbHIuaGVpZ2h0IC0gX3JlY3QuaGVpZ2h0IC0gX3Q7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBfdCA9IF9yZWN0LnRvcDtcbiAgICAgICAgICAgIF9sID0gX3JlY3QubGVmdDtcbiAgICAgICAgICAgIF9iID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gX3JlY3QuaGVpZ2h0IC0gX3JlY3QudG9wO1xuICAgICAgICAgICAgX3IgID0gdGhpcy5jYW52YXMud2lkdGggLSBfcmVjdC53aWR0aCAtIF9yZWN0LmxlZnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcENsYXNzOiBfdCA+IDAgPyBcInBvc2l0aXZlXCIgOiBfdCA8IDAgPyBcIm5lZ2F0aXZlXCIgOiBcInplcm9cIixcbiAgICAgICAgICAgIGJvdHRvbUNsYXNzOiBfYiA+IDAgPyBcInBvc2l0aXZlXCIgOiBfYiA8IDAgPyBcIm5lZ2F0aXZlXCIgOiBcInplcm9cIixcbiAgICAgICAgICAgIGxlZnRDbGFzczogX2wgPiAwID8gXCJwb3NpdGl2ZVwiIDogX2wgPCAwID8gXCJuZWdhdGl2ZVwiIDogXCJ6ZXJvXCIsXG4gICAgICAgICAgICByaWdodENsYXNzOiBfciA+IDAgPyBcInBvc2l0aXZlXCIgOiBfciA8IDAgPyBcIm5lZ2F0aXZlXCIgOiBcInplcm9cIixcbiAgICAgICAgICAgIHRvcDogICAgX3QsXG4gICAgICAgICAgICBsZWZ0OiAgIF9sLFxuICAgICAgICAgICAgYm90dG9tOiBfYixcbiAgICAgICAgICAgIHJpZ2h0OiAgX3IsXG4gICAgICAgICAgICByb3VuZFRvcDogICAgTWF0aC5yb3VuZChfdCksXG4gICAgICAgICAgICByb3VuZExlZnQ6ICAgTWF0aC5yb3VuZChfbCksXG4gICAgICAgICAgICByb3VuZEJvdHRvbTogTWF0aC5yb3VuZChfYiksXG4gICAgICAgICAgICByb3VuZFJpZ2h0OiAgTWF0aC5yb3VuZChfcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0aXRsZTogJ3Bvc2l0aW9uJyxcbiAgICAgIHR5cGU6ICdtZW51JyxcbiAgICAgIG1lbnU6IHtcbiAgICAgICAgb2JqZWN0TGVmdDoge1xuICAgICAgICAgIHR5cGU6ICAgJ251bWJlcicsXG4gICAgICAgICAgdGl0bGU6ICAnbGVmdCcsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICB0aGlzLmxlZnQgPSB2YWw7XG4gICAgICAgICAgICAgIHRoaXMuZmlyZShcIm1vZGlmaWVkXCIpO1xuICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5maXJlKFwib2JqZWN0Om1vZGlmaWVkXCIsIHt0YXJnZXQ6IHRoaXN9KTtcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2JzZXJ2ZTogXCJtb2RpZmllZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvYmplY3RUb3A6IHtcbiAgICAgICAgICB0eXBlOiAgICdudW1iZXInLFxuICAgICAgICAgIHRpdGxlOiAgJ3RvcCcsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICB0aGlzLnRvcCA9IHZhbDtcbiAgICAgICAgICAgICAgdGhpcy5maXJlKFwibW9kaWZpZWRcIik7XG4gICAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpcmUoXCJvYmplY3Q6bW9kaWZpZWRcIiwge3RhcmdldDogdGhpc30pO1xuICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9ic2VydmU6IFwibW9kaWZpZWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGltZW5zaW9uczoge1xuICAgICAgdGl0bGU6ICdkaW1lbnNpb25zJyxcbiAgICAgIHR5cGU6ICdtZW51JyxcbiAgICAgIG1lbnU6e1xuICAgICAgICBvYmplY3RXaWR0aDoge1xuICAgICAgICAgIHR5cGU6ICAgJ251bWJlcicsXG4gICAgICAgICAgdGl0bGU6ICAnd2lkdGgnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICAgIHRoaXMuZGltZW5zaW9uc1dpZHRoVmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgIHRoaXMuc2NhbGVUb1dpZHRoKHZhbCAqICB0aGlzLmNhbnZhcy5nZXRab29tKCkpO1xuICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5maXJlTW9kaWZpZWRJZkNoYW5nZWQodGhpcyk7XG4gICAgICAgICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kaW1lbnNpb25zV2lkdGhWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGlmKHRoaXMuZGltZW5zaW9uc1dpZHRoVmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpbWVuc2lvbnNXaWR0aFZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMuZ2V0Qm91bmRpbmdSZWN0KCkud2lkdGggLyB0aGlzLmNhbnZhcy5nZXRab29tKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9ic2VydmU6IFwibW9kaWZpZWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2JqZWN0SGVpZ2h0OiB7XG4gICAgICAgICAgdHlwZTogICAnbnVtYmVyJyxcbiAgICAgICAgICB0aXRsZTogICdoZWlnaHQnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICAgIHRoaXMuc2NhbGVUb0hlaWdodCh2YWwgKiAgdGhpcy5jYW52YXMuZ2V0Wm9vbSgpKTtcbiAgICAgICAgICAgICAgdGhpcy5kaW1lbnNpb25zSGVpZ2h0VmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgIHRoaXMuY2FudmFzLmZpcmVNb2RpZmllZElmQ2hhbmdlZCh0aGlzKTtcbiAgICAgICAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRpbWVuc2lvbnNIZWlnaHRWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGlmKHRoaXMuZGltZW5zaW9uc0hlaWdodFZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaW1lbnNpb25zSGVpZ2h0VmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5nZXRCb3VuZGluZ1JlY3QoKS5oZWlnaHQgLyB0aGlzLmNhbnZhcy5nZXRab29tKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9ic2VydmU6IFwibW9kaWZpZWRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2VudGVyOiB7XG4gICAgICBjbGFzc05hbWU6ICAnZmEgZmEtYnVsbHNleWUnLFxuICAgICAgdGl0bGU6ICdDZW50ZXInLFxuICAgICAgYWN0aW9uOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmNlbnRlcigpO1xuICAgICAgICB0aGlzLnNldENvb3JkcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb2JqZWN0RmxpcDoge1xuICAgICAgY2xhc3NOYW1lOiAgJ2ZhIGZhLWFycm93cy1oJyxcbiAgICAgIGluc2VydDogICAgICdmbGlwVG9vbHMnLFxuICAgICAgdGl0bGU6ICAgICAgJ2ZsaXAnLFxuICAgICAgYWN0aW9uOiAgICAgJ2ZsaXAnXG4gICAgfSxcbiAgICBmbG9wOiB7XG4gICAgICBjbGFzc05hbWU6ICAnZmEgZmEtYXJyb3dzLXYnLFxuICAgICAgaW5zZXJ0OiAgICAgJ2ZsaXBUb29scycsXG4gICAgICB0aXRsZTogICAgICAnZmxvcCdcbiAgICB9LFxuICAgIGJyaW5nRm9yd2FyZDoge1xuICAgICAgaW5zZXJ0OiAgICAgJ29yZGVyVG9vbHMnLFxuICAgICAgdGl0bGU6ICAgICAgJ2JyaW5nIGZvcndhcmQnLFxuICAgICAgY2xhc3NOYW1lOiAgJ2ZhIGZhLWxldmVsLXVwJyxcbiAgICAgIGRpc2FibGVkOiAgICdvblRvcCdcbiAgICB9LFxuICAgIHNlbmRCYWNrd2FyZHM6IHtcbiAgICAgIGluc2VydDogICAgICdvcmRlclRvb2xzJyxcbiAgICAgIHRpdGxlOiAgICAgICdzZW5kIGJhY2t3YXJkcycsXG4gICAgICBjbGFzc05hbWU6ICAnZmEgZmEtbGV2ZWwtZG93bicsXG4gICAgICBkaXNhYmxlZDogICAnb25Cb3R0b20nXG4gICAgfSxcbiAgICByZW1vdmU6IHtcbiAgICAgIGNsYXNzTmFtZTogICdmYSBmYS10cmFzaCcsXG4gICAgICB0aXRsZTogICAgICAncmVtb3ZlJyxcbiAgICAgIGtleTogICAgICAgIFwiRGVsZXRlXCJcbiAgICB9LFxuICAgIGR1cGxpY2F0ZToge1xuICAgICAgY2xhc3NOYW1lOiAgJ2ZhIGZhLWNsb25lJyxcbiAgICAgIHRpdGxlOiAgICAgICdkdXBsaWNhdGUnXG4gICAgfVxuICB9XG59KVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vYmplY3RzL1NsaWRlT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cblxuXG4gIC8vZmFicmljLnJlcXVpcmUoJ1NsaWRlVGV4dCcsIFsnU2xpZGVPYmplY3QnXSwgZnVuY3Rpb24gKCkge1xuXG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy5UZXh0LnByb3RvdHlwZSx7XG4gICAgZWRpdFRvb2w6IGZhbHNlLFxuICAgIGFkdmFuY2VkQ29sb3JzVG9vbHM6IGZhbHNlLFxuICAgIHRleHRGb250U2l6ZVRvb2xzOiBmYWxzZSxcbiAgICB0ZXh0QWxpZ21lbnRUb29sczogZmFsc2UsXG4gICAgYWR2YW5jZWRUZXh0U3R5bGVUb29sczogZmFsc2UsXG4gICAgcmFzdGVyaXplVG9vbDogZmFsc2UsXG4gICAgcmFzdGVyaXplS2xhc3M6IGZhYnJpYy5JbWFnZSxcbiAgICBfcmVuZGVyX2NhY2hlOiBmdW5jdGlvbiAoY3R4KSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LnNjYWxlKFxuICAgICAgICB0aGlzLnNjYWxlWCAqICh0aGlzLmZsaXBYID8gLTEgOiAxKSxcbiAgICAgICAgdGhpcy5zY2FsZVkgKiAodGhpcy5mbGlwWSA/IC0xIDogMSlcbiAgICAgICk7XG4gICAgICB0aGlzLnRyYW5zZm9ybShjdHgpO1xuICAgICAgdGhpcy5fc2V0U2hhZG93KGN0eCk7XG4gICAgICBjdHgudHJhbnNsYXRlKC10aGlzLndpZHRoIC8gMiwgLXRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2NhY2hlLCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlQ2FjaGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgdmFyIHNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoICogdGhpcy5jYW52YXMuZG90c1BlclVuaXQsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKiB0aGlzLmNhbnZhcy5kb3RzUGVyVW5pdFxuICAgICAgfTtcblxuICAgICAgdmFyIF9jbGlwVG8gPSB0aGlzLmNsaXBUbztcbiAgICAgIGRlbGV0ZSB0aGlzLmNsaXBUbztcbiAgICAgIHRoaXMuX2NhY2hlID0gZmFicmljLnV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudFdpdGhTaXplKHNpemUpO1xuICAgICAgdmFyIGN0eCA9IHRoaXMuX2NhY2hlLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGN0eC5zY2FsZShcbiAgICAgICAgdGhpcy5jYW52YXMuZG90c1BlclVuaXQsXG4gICAgICAgIHRoaXMuY2FudmFzLmRvdHNQZXJVbml0KTtcbiAgICAgIGN0eC50cmFuc2xhdGUodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgIHRoaXMucmVuZGVyKGN0eCwgdHJ1ZSk7XG4gICAgICB0aGlzLnJlbmRlciA9IHRoaXMuX3JlbmRlcl9jYWNoZTtcbiAgICAgIHRoaXMuY2xpcFRvID0gX2NsaXBUbztcblxuICAgIH0sXG4gICAgcmFzdGVyaXplVGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy51cGRhdGVDYWNoZSgpO1xuICAgICAgdmFyIGltZyA9IGZhYnJpYy51dGlsLmNyZWF0ZUltYWdlKCk7XG5cbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYmogPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgICAgIG9iai53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgb2JqLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIG9iai5zY2FsZVggPSB0aGlzLnNjYWxlWCAqICh0aGlzLmhlaWdodCAvIGltZy5oZWlnaHQpO1xuICAgICAgICBvYmouc2NhbGVZID0gdGhpcy5zY2FsZVkgKiAodGhpcy53aWR0aCAvIGltZy53aWR0aCApO1xuICAgICAgICBvYmoucmFzdGVyaXplZFR5cGUgPSBvYmoudHlwZTtcbiAgICAgICAgZGVsZXRlIG9iai50eXBlO1xuXG4gICAgICAgIHZhciBlbCA9IG5ldyB0aGlzLnJhc3Rlcml6ZUtsYXNzKGltZywgb2JqKTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkKGVsKTtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmNhbnZhcy5zZXRBY3RpdmVPYmplY3QoZWwpO1xuICAgICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICB9LmJpbmQodGhpcyk7XG4gICAgICBpbWcuc3JjID0gdGhpcy5fY2FjaGUudG9EYXRhVVJMKCk7XG4gICAgICAvL3RoaXMub24oJ21vZGlmaWVkJyx0aGlzLnVwZGF0ZUNhY2hlLmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZU5hbWUpIHtcbiAgICAgIHZhciBvYmplY3QgPSB0aGlzO1xuICAgICAgcmV0dXJuIChvYmplY3QuZ2V0U2VsZWN0aW9uU3R5bGVzICYmIG9iamVjdC5pc0VkaXRpbmcpXG4gICAgICAgID8gKG9iamVjdC5nZXRTZWxlY3Rpb25TdHlsZXMoKVtzdHlsZU5hbWVdIHx8IG9iamVjdFtzdHlsZU5hbWVdKVxuICAgICAgICA6IChvYmplY3Rbc3R5bGVOYW1lXSB8fCBvYmplY3RbJ19fJyArIHN0eWxlTmFtZV0gfHwgJycpO1xuICAgIH0sXG4gICAgZ2V0UGF0dGVybjogZnVuY3Rpb24gKHVybCkge1xuICAgICAgdmFyIF9maWxsID0gdGhpcy5nZXRTdHlsZSgnZmlsbCAnKTtcbiAgICAgIHJldHVybiBfZmlsbCAmJiBfZmlsbC5zb3VyY2U7XG4gICAgfSxcbiAgICBzZXRQYXR0ZXJuOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB0aGlzLnNldFN0eWxlKCdmaWxsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgIC8vIHZhciBfdGV4dHVyZSA9IF8uZmluZFdoZXJlKHRoaXMucHJvamVjdC50ZXh0dXJlcywge2lkOiB1cmx9KTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZmFicmljLnV0aWwubG9hZEltYWdlKHVybCwgZnVuY3Rpb24oaW1nKSB7XG4gICAgICAgICAgX3RoaXMuc2V0U3R5bGUoJ2ZpbGwnLCBuZXcgZmFicmljLlBhdHRlcm4oe1xuICAgICAgICAgICAgc291cmNlOiBpbWcsXG4gICAgICAgICAgICByZXBlYXQ6ICdyZXBlYXQnXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldE9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFN0eWxlKCdvcGFjaXR5JykgKiAxMDA7XG4gICAgfSxcbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ29wYWNpdHknLCBwYXJzZUludCh2YWx1ZSwgMTApIC8gMTAwKTtcbiAgICB9LFxuICAgIGdldFJhZGl1czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdyYWRpdXMnKTtcbiAgICB9LFxuICAgIHNldFNoYWRvdzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0UHJvcGVydHkoJ3NoYWRvdycsIG9wdGlvbnMgPyBuZXcgZmFicmljLlNoYWRvdyhvcHRpb25zKSA6IG51bGwpO1xuICAgIH0sXG4gICAgc2V0UHJvcGVydHk6IGZ1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xuICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgICAgdGhpcy5jYW52YXMgJiYgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgfSxcbiAgICBzZXRSYWRpdXM6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0eSgncmFkaXVzJywgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0U3BhY2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdzcGFjaW5nJyk7XG4gICAgfSxcbiAgICBzZXRTcGFjaW5nOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0UHJvcGVydHkoJ3NwYWNpbmcnLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRSZXZlcnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdyZXZlcnRlZCcpO1xuICAgIH0sXG4gICAgc2V0UmV2ZXJ0ZWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0eSgncmV2ZXJ0ZWQnLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRGaWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnZmlsbCcpO1xuICAgIH0sXG4gICAgc2V0RmlsbDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0eWxlKCdmaWxsJywgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0VGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd0ZXh0Jyk7XG4gICAgfSxcbiAgICBzZXRUZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0UHJvcGVydHkoJ3RleHQnLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRUZXh0QWxpZ246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCgndGV4dEFsaWduJyk7XG4gICAgfSxcbiAgICBzZXRUZXh0QWxpZ246IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0eSgndGV4dEFsaWduJywgdmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgfSxcbiAgICBnZXRGb250RmFtaWx5OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2ZvbnRGYW1pbHknKTtcbiAgICB9LFxuICAgIHNldEZvbnRGYW1pbHk6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdHlsZSgnZm9udEZhbWlseScsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldFN0eWxlczogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlcyB8fCB7XG4gICAgICAgICAgZmlsbCA6ICAgICAgICAgICAgICAgIHRoaXMuZmlsbCxcbiAgICAgICAgICBmb250U2l6ZSA6ICAgICAgICAgICAgdGhpcy5mb250U2l6ZSxcbiAgICAgICAgICB0ZXh0QmFja2dyb3VuZENvbG9yIDogdGhpcy50ZXh0QmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgIHRleHREZWNvcmF0aW9uIDogICAgICB0aGlzLnRleHREZWNvcmF0aW9uLFxuICAgICAgICAgIGZvbnRGYW1pbHkgOiAgICAgICAgICB0aGlzLmZvbnRGYW1pbHksXG4gICAgICAgICAgZm9udFdlaWdodCA6ICAgICAgICAgIHRoaXMuZm9udFdlaWdodCxcbiAgICAgICAgICBmb250U3R5bGUgOiAgICAgICAgICAgdGhpcy5mb250U3R5bGUsXG4gICAgICAgICAgc3Ryb2tlIDogICAgICAgICAgICAgIHRoaXMuc3Ryb2tlLFxuICAgICAgICAgIHN0cm9rZVdpZHRoIDogICAgICAgICB0aGlzLnN0cm9rZVdpZHRoXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCZ0NvbG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoJ2JhY2tncm91bmRDb2xvcicpO1xuICAgIH0sXG4gICAgc2V0QmdDb2xvcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldFByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRUZXh0QmdDb2xvcjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KCd0ZXh0QmFja2dyb3VuZENvbG9yJyk7XG4gICAgfSxcbiAgICBzZXRUZXh0QmdDb2xvcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldFByb3BlcnR5KCd0ZXh0QmFja2dyb3VuZENvbG9yJywgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0U3Ryb2tlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnc3Ryb2tlJyk7XG4gICAgfSxcbiAgICBzZXRTdHJva2U6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdHlsZSgnc3Ryb2tlJywgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0U3Ryb2tlV2lkdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFN0eWxlKCdzdHJva2VXaWR0aCcpO1xuICAgIH0sXG4gICAgc2V0U3Ryb2tlV2lkdGg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdHlsZSgnc3Ryb2tlV2lkdGgnLCBwYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICB9LFxuICAgIGRlY3JlYXNlRm9udFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ2ZvbnRTaXplJywgcGFyc2VJbnQodGhpcy5nZXRTdHlsZSgnZm9udFNpemUnKSkgLSAxKTtcbiAgICB9LFxuICAgIGluY3JlYXNlRm9udFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ2ZvbnRTaXplJywgcGFyc2VJbnQodGhpcy5nZXRTdHlsZSgnZm9udFNpemUnKSkgKyAxKTtcbiAgICB9LFxuICAgIGdldEZvbnRTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnZm9udFNpemUnKTtcbiAgICB9LFxuICAgIHNldEZvbnRTaXplOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ2ZvbnRTaXplJywgcGFyc2VJbnQodmFsdWUsIDEwKSk7XG4gICAgfSxcbiAgICBnZXRMaW5lSGVpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnbGluZUhlaWdodCcpO1xuICAgIH0sXG4gICAgc2V0TGluZUhlaWdodDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0eWxlKCdsaW5lSGVpZ2h0JywgcGFyc2VGbG9hdCh2YWx1ZSwgMTApKTtcbiAgICB9LFxuICAgIGFkZFRleHQ6IGZ1bmN0aW9uICh0ZXh0LG9wdGlvbnMpIHtcblxuICAgICAgdmFyIF9tYXRjaCA9IHRoaXMudGV4dC5tYXRjaCgvXFxuL2cpO1xuICAgICAgdmFyIF9saW5lSW5kZXggPSBfbWF0Y2ggJiYgX21hdGNoLmxlbmd0aCB8fCAwO1xuICAgICAgdmFyIGNoYXJJbmRleCA9IHRoaXMudGV4dC5sZW5ndGggLSB0aGlzLnRleHQubGFzdEluZGV4T2YoXCJcXG5cIikgLSAxO1xuXG4gICAgICBpZighdGhpcy5zdHlsZXNbX2xpbmVJbmRleF0pe1xuICAgICAgICB0aGlzLnN0eWxlc1tfbGluZUluZGV4XSA9IHt9XG4gICAgICB9XG5cbiAgICAgIGlmKCF0aGlzLnN0eWxlc1tfbGluZUluZGV4XVtjaGFySW5kZXhdKXtcbiAgICAgICAgdGhpcy5zdHlsZXNbX2xpbmVJbmRleF1bY2hhckluZGV4XSA9IHt9XG4gICAgICB9XG4gICAgICBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHRoaXMuc3R5bGVzW19saW5lSW5kZXhdW2NoYXJJbmRleF0sb3B0aW9ucyk7XG4gICAgICB0aGlzLnRleHQgKz10ZXh0O1xuICAgICAgLy8gdGhpcy5zdHlsZXM7XG4gICAgfSxcbiAgICBnZXRCb2xkOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnZm9udFdlaWdodCcpID09PSBcImJvbGRcIjtcbiAgICB9LFxuICAgIHNldEJvbGQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdHlsZSgnZm9udFdlaWdodCcsIHZhbHVlID8gJ2JvbGQnIDogJycpO1xuICAgIH0sXG4gICAgZ2V0SXRhbGljOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnO1xuICAgIH0sXG4gICAgc2V0SXRhbGljOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ2ZvbnRTdHlsZScsIHZhbHVlID8gJ2l0YWxpYycgOiAnJyApO1xuICAgIH0sXG4gICAgZ2V0VW5kZXJsaW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTdHlsZSgndGV4dERlY29yYXRpb24nKS5pbmRleE9mKCd1bmRlcmxpbmUnKSA+IC0xO1xuICAgIH0sXG4gICAgc2V0VW5kZXJsaW5lOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgPyAodGhpcy5nZXRTdHlsZSgndGV4dERlY29yYXRpb24nKSArICcgdW5kZXJsaW5lJylcbiAgICAgICAgOiB0aGlzLmdldFN0eWxlKCd0ZXh0RGVjb3JhdGlvbicpLnJlcGxhY2UoJ3VuZGVybGluZScsICcnKTtcblxuICAgICAgdGhpcy5zZXRTdHlsZSgndGV4dERlY29yYXRpb24nLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRMaW5ldGhyb3VnaDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3R5bGUoJ3RleHREZWNvcmF0aW9uJykuaW5kZXhPZignbGluZS10aHJvdWdoJykgPiAtMTtcbiAgICB9LFxuICAgIHNldExpbmV0aHJvdWdoOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgPyAodGhpcy5nZXRTdHlsZSgndGV4dERlY29yYXRpb24nKSArICcgbGluZS10aHJvdWdoJylcbiAgICAgICAgOiB0aGlzLmdldFN0eWxlKCd0ZXh0RGVjb3JhdGlvbicpLnJlcGxhY2UoJ2xpbmUtdGhyb3VnaCcsICcnKTtcblxuICAgICAgdGhpcy5zZXRTdHlsZSgndGV4dERlY29yYXRpb24nLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXRPdmVybGluZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3R5bGUoJ3RleHREZWNvcmF0aW9uJykuaW5kZXhPZignb3ZlcmxpbmUnKSA+IC0xO1xuICAgIH0sXG4gICAgc2V0T3ZlcmxpbmU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZSA/ICh0aGlzLmdldFN0eWxlKCd0ZXh0RGVjb3JhdGlvbicpICsgJyBvdmVybGluZScpXG4gICAgICAgIDogdGhpcy5nZXRTdHlsZSgndGV4dERlY29yYXRpb24nKS5yZXBsYWNlKCdvdmVybGluJywgJycpO1xuXG4gICAgICB0aGlzLnNldFN0eWxlKCd0ZXh0RGVjb3JhdGlvbicsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGVOYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIG9iamVjdCA9IHRoaXM7XG4gICAgICB2YXIgX29sZCA9IGZhYnJpYy51dGlsLm9iamVjdC5jbG9uZURlZXAob2JqZWN0LmdldFN0eWxlcygpKTtcbiAgICAgIC8vdmFyIF9vbGQgPSBmYWJyaWMudXRpbC5vYmplY3QuZGVlcEV4dGVuZCh7fSwgb2JqZWN0LmdldFN0eWxlcyk7Ly9nZXRTZWxlY3Rpb25TdHlsZXMoKTtcbiAgICAgIGlmIChvYmplY3Quc2V0U2VsZWN0aW9uU3R5bGVzICYmIG9iamVjdC5pc0VkaXRpbmcpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge307XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3R5bGVbc3R5bGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBzdHlsZVtzdHlsZU5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdC5zZXRTZWxlY3Rpb25TdHlsZXMoc3R5bGUpO1xuICAgICAgICBvYmplY3Quc2V0Q29vcmRzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBvYmplY3Rbc3R5bGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3Rbc3R5bGVOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIG9iamVjdC5zdHlsZXMpIHtcbiAgICAgICAgICBmb3IgKHZhciBqIGluIG9iamVjdC5zdHlsZXNbaV0pIHtcbiAgICAgICAgICAgIGlmIChvYmplY3Quc3R5bGVzW2ldW2pdW3N0eWxlTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0LnN0eWxlc1tpXVtqXVtzdHlsZU5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3R5bGVzX2RhdGEgPSBvYmplY3QuZ2V0U3R5bGVzKCk7XG5cbiAgICAgIGlmKHRoaXMudHlwZSAhPSBcInRleHRcIil7XG4gICAgICAgIHRoaXMuc3R5bGVzID0gZmFicmljLnV0aWwub2JqZWN0LmNsb25lRGVlcChzdHlsZXNfZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Q29vcmRzKCk7XG5cbiAgICAgIHRoaXMuZmlyZShcInN0eWxlczptb2RpZmllZFwiLCB7XG4gICAgICAgIG9yaWdpbmFsOiBfb2xkLFxuICAgICAgICBtb2RpZmllZDogc3R5bGVzX2RhdGFcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jYW52YXMgJiYgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XG4gICAgICAvKlxuICAgICAgIHRoaXMucHJvamVjdC5oaXN0b3J5LmFkZCh7XG4gICAgICAgc2xpZGU6IHRoaXMuc2xpZGUsXG4gICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgIHVuZG86IF9vbGQsXG4gICAgICAgcmVkbzogc3R5bGVzX2RhdGEsXG4gICAgICAgdHlwZTogJ3N0eWxlZCcsXG4gICAgICAgdW5kb0ZuOiBmdW5jdGlvbigpe1xuICAgICAgIHRoaXMub2JqZWN0LmRhdGEuc3R5bGVzID0gdGhpcy51bmRvO1xuICAgICAgIHRoaXMub2JqZWN0LmZhYnJpYy5zZXQoJ3N0eWxlcycsdGhpcy51bmRvKTtcbiAgICAgICB0aGlzLm9iamVjdC5mYWJyaWMuc2V0Q29vcmRzKCk7XG4gICAgICAgdGhpcy5vYmplY3Quc2xpZGUucmVuZGVyKCk7XG4gICAgICAgfSxcbiAgICAgICByZWRvRm46ICBmdW5jdGlvbigpe1xuICAgICAgIHRoaXMub2JqZWN0LmRhdGEuc3R5bGVzID0gdGhpcy5yZWRvO1xuICAgICAgIHRoaXMub2JqZWN0LmZhYnJpYy5zZXQoJ3N0eWxlcycsdGhpcy5yZWRvKTtcbiAgICAgICB0aGlzLm9iamVjdC5mYWJyaWMuc2V0Q29vcmRzKCk7XG4gICAgICAgdGhpcy5vYmplY3Quc2xpZGUucmVuZGVyKCk7XG4gICAgICAgfVxuICAgICAgIH0pOyovXG4gICAgfSxcblxuICAgIGdlbmVyYXRlVGV4dFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnZm9udC1zdHlsZSc6IHRoaXMuaXNJdGFsaWMoKSA/ICdpdGFsaWMnIDogJ25vcm1hbCcsXG4gICAgICAgICdmb250LXdlaWdodCc6IHRoaXMuaXNCb2xkKCkgPyA3MDAgOiA0MDAsXG4gICAgICAgICd0ZXh0LWRlY29yYXRpb24nOiAodGhpcy5pc0xpbmV0aHJvdWdoKCkgPyAnbGluZS10aHJvdWdoICcgOiAnJyApICtcbiAgICAgICAgKHRoaXMuaXNPdmVybGluZSgpID8gJ292ZXJsaW5lICcgOiAnJyApICtcbiAgICAgICAgKHRoaXMuaXNVbmRlcmxpbmUoKSA/ICd1bmRlcmxpbmUgJyA6ICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZmFicmljLnV0aWwub2JqZWN0LmV4dGVuZChmYWJyaWMuSVRleHQucHJvdG90eXBlLCB7XG4gICAgaW5pdEhpZGRlblRleHRhcmVhX25hdGl2ZTogZmFicmljLklUZXh0LnByb3RvdHlwZS5pbml0SGlkZGVuVGV4dGFyZWEsXG4gICAgaW5pdEhpZGRlblRleHRhcmVhOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5pbml0SGlkZGVuVGV4dGFyZWFfbmF0aXZlKCk7XG4gICAgICB0aGlzLmhpZGRlblRleHRhcmVhLnN0eWxlLndpZHRoID0gXCI5OTk5cHhcIjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEV4aXRzIGZyb20gZWRpdGluZyBzdGF0ZVxuICAgICAqIEByZXR1cm4ge2ZhYnJpYy5JVGV4dH0gdGhpc0FyZ1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBleGl0RWRpdGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAvLyB2YXIgaXNUZXh0Q2hhbmdlZCA9ICh0aGlzLl90ZXh0QmVmb3JlRWRpdCAhPT0gdGhpcy50ZXh0KTtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNlbGVjdGFibGUgPSB0cnVlO1xuXG4gICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICB0aGlzLmhpZGRlblRleHRhcmVhICYmIHRoaXMuY2FudmFzICYmIHRoaXMuaGlkZGVuVGV4dGFyZWEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlblRleHRhcmVhKTtcbiAgICAgIHRoaXMuaGlkZGVuVGV4dGFyZWEgPSBudWxsO1xuXG4gICAgICB0aGlzLmFib3J0Q3Vyc29yQW5pbWF0aW9uKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlRWRpdGluZ1Byb3BzKCk7XG4gICAgICB0aGlzLl9jdXJyZW50Q3Vyc29yT3BhY2l0eSA9IDA7XG5cbiAgICAgIHRoaXMuZmlyZSgnZWRpdGluZzpleGl0ZWQnKTtcbiAgICAgIC8vIGlzVGV4dENoYW5nZWQgJiYgdGhpcy5maXJlKCdtb2RpZmllZCcpO1xuICAgICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLm9mZignbW91c2U6bW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICAgIHRoaXMuY2FudmFzLmZpcmUoJ3RleHQ6ZWRpdGluZzpleGl0ZWQnLCB7IHRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgdGhpcy5jYW52YXMuZmlyZU1vZGlmaWVkSWZDaGFuZ2VkKHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBtYXhTdHJva2VXaWR0aDogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwoIHRoaXMuZ2V0Rm9udFNpemUoKSAvIDEwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBfVEVYID0gZmFicmljLklUZXh0LnByb3RvdHlwZTtcbiAgZmFicmljLlRleHQucHJvdG90eXBlLmFjdGlvbnMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHt9LCBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5hY3Rpb25zLCB7XG4gICAgICByYXN0ZXJpemVUZXh0OiB7XG4gICAgICAgIGluc2VydDogJ3Jhc3Rlcml6ZVRvb2wnLFxuICAgICAgICBjbGFzc05hbWU6ICdidXR0b24tZWFzZWwnLFxuICAgICAgICB0aXRsZTogJ3Jhc3Rlcml6ZVRleHQnLFxuICAgICAgICBhY3Rpb246IF9URVgucmFzdGVyaXplVGV4dFxuICAgICAgfSxcbiAgICAgIGZpbGw6IHtcbiAgICAgICAgdHlwZTogJ2NvbG9yJyxcbiAgICAgICAgdGl0bGU6ICdmaWxsJyxcbiAgICAgICAgaW5zZXJ0OiAnIWFkdmFuY2VkQ29sb3JzVG9vbHMnLFxuICAgICAgICB2YWx1ZTogJ2ZpbGwnXG4gICAgICB9LFxuICAgICAgY29sb3JzOiB7XG4gICAgICAgIGNsYXNzTmFtZTogJ2NvbG9ycycsXG4gICAgICAgIHR5cGU6ICdtZW51JyxcbiAgICAgICAgdGl0bGU6ICdjb2xvcnMnLFxuICAgICAgICB0b2dnbGVkOiB0cnVlLFxuICAgICAgICBpbnNlcnQ6ICdhZHZhbmNlZENvbG9yc1Rvb2xzJyxcbiAgICAgICAgbWVudToge1xuICAgICAgICAgIHRleHRCZ2NvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiAnY29sb3InLFxuICAgICAgICAgICAgdGl0bGU6ICdiZ0NvbG9yJyxcbiAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgIGdldDogX1RFWC5nZXRCZ0NvbG9yLFxuICAgICAgICAgICAgICBzZXQ6IF9URVguc2V0QmdDb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dFRleHRiZ2NvbG9yOiB7XG4gICAgICAgICAgICB0eXBlOiAnY29sb3InLFxuICAgICAgICAgICAgdGl0bGU6ICd0ZXh0QmdDb2xvcicsXG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICBnZXQ6IF9URVguZ2V0VGV4dEJnQ29sb3IsXG4gICAgICAgICAgICAgIHNldDogX1RFWC5zZXRUZXh0QmdDb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dEZpbGw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICB0aXRsZTogJ2ZpbGwnLFxuICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgZ2V0OiBfVEVYLmdldEZpbGwsXG4gICAgICAgICAgICAgIHNldDogX1RFWC5zZXRGaWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdGV4dFN0eWxlOiB7XG4gICAgICAgIHR5cGU6ICdtZW51JyxcbiAgICAgICAgdGl0bGU6ICd0ZXh0IHN0eWxlJyxcbiAgICAgICAgdG9nZ2xlZDogdHJ1ZSxcbiAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtZm9udCcsXG4gICAgICAgIHN0eWxlOiAnZ2VuZXJhdGVUZXh0U3R5bGUnLFxuICAgICAgICBtZW51OiB7XG4gICAgICAgICAgdGV4dEJvbGQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIHRpdGxlOiAnYm9sZCcsXG4gICAgICAgICAgICB2YWx1ZTogJ2JvbGQnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtYm9sZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHRJdGFsaWM6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIHRpdGxlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIHZhbHVlOiAnaXRhbGljJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhIGZhLWl0YWxpYydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHRVbmRlcmxpbmU6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIHRpdGxlOiAnVW5kZXJsaW5lJyxcbiAgICAgICAgICAgIHZhbHVlOiAndW5kZXJsaW5lJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhIGZhLXVuZGVybGluZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHRMaW5ldGhyb3VnaDoge1xuICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgaW5zZXJ0OiAnYWR2YW5jZWRUZXh0U3R5bGVUb29scycsXG4gICAgICAgICAgICB0aXRsZTogJ0xpbmV0aHJvdWdoJyxcbiAgICAgICAgICAgIHZhbHVlOiAnbGluZXRocm91Z2gnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndGV4dC1saW5ldGhyb3VnaCBmYSBmYS1zdHJpa2V0aHJvdWdoJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dE92ZXJsaW5lOiB7XG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICBpbnNlcnQ6ICdhZHZhbmNlZFRleHRTdHlsZVRvb2xzJyxcbiAgICAgICAgICAgIHRpdGxlOiAnb3ZlcmxpbmUnLFxuICAgICAgICAgICAgdmFsdWU6ICdvdmVybGluZScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd0ZXh0LW92ZXJsaW5lIGZhIGZhLW92ZXJsaW5lJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dEFsaWduOiB7XG4gICAgICAgICAgICB0eXBlOiAnb3B0aW9ucycsXG4gICAgICAgICAgICB0aXRsZTogJ3RleHQgYWxpZ24nLFxuICAgICAgICAgICAgaW5zZXJ0OiAndGV4dEFsaWdtZW50VG9vbHMnLFxuICAgICAgICAgICAgdmFsdWU6IFwidGV4dEFsaWduXCIsXG4gICAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbkNlbnRlcjoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnYWxpZ24gY2VudGVyJyxcbiAgICAgICAgICAgICAgICBvcHRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhIGZhLWFsaWduLWNlbnRlcidcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGV4dEFsaWduTGVmdDoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnYWxpZ24gbGVmdCcsXG4gICAgICAgICAgICAgICAgb3B0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtYWxpZ24tbGVmdCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGV4dEFsaWduUmlnaHQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ2FsaWduIHJpZ2h0JyxcbiAgICAgICAgICAgICAgICBvcHRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtYWxpZ24tcmlnaHQnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRleHRBbGlnbkp1c3RpZnk6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ2FsaWduIGp1c3RpZnknLFxuICAgICAgICAgICAgICAgIG9wdGlvbjogJ2p1c3RpZnknLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhIGZhLWFsaWduLWp1c3RpZnknXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZvbnRGYW1pbHk6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmb250RmFtaWx5JyxcbiAgICAgICAgICAgIHRpdGxlOiAnZm9udCBmYW1pbHknLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtdGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogJ2ZvbnRGYW1pbHknLFxuICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24uX2ZvbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0ZXh0Rm9udFNpemU6IHtcbiAgICAgICAgICAgIGluc2VydDogJ3RleHRGb250U2l6ZVRvb2xzJyxcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgdGl0bGU6ICdmb250U2l6ZScsXG4gICAgICAgICAgICB2YWx1ZTogJ2ZvbnRTaXplJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLyp0ZXh0Rm9udDoge1xuICAgICAgICAgICAgaW5zZXJ0OiAndGV4dEZvbnRTaXplVG9vbHMnLFxuICAgICAgICAgICAgdHlwZTogJ21lbnUnLFxuICAgICAgICAgICAgdGl0bGU6ICdmb250JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2ZhIGZhLWZvbnQnLFxuICAgICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgICB0ZXh0Rm9udFNpemVEZWNyZWFzZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnZGVjcmVhc2VGb250U2l6ZScsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBfVEVYLmRlY3JlYXNlRm9udFNpemUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZmEgZmEtZm9udCBmb250LXNpemUtZGVjcmVhc2UnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRleHRGb250U2l6ZUluY3JlYXNlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdpbmNyZWFzZUZvbnRTaXplJyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IF9URVguaW5jcmVhc2VGb250U2l6ZSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmYSBmYS1mb250IGZvbnQtc2l6ZS1pbmNyZWFzZSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICApO1xuICBmYWJyaWMuSVRleHQucHJvdG90eXBlLmFjdGlvbnMgPSBmYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKHt9LCBmYWJyaWMuVGV4dC5wcm90b3R5cGUuYWN0aW9ucywge1xuICAgICAgdGV4dEVkaXQ6IHtcbiAgICAgICAgaW5zZXJ0OiAgICAgJ2VkaXRUb29sJyxcbiAgICAgICAgY2xhc3NOYW1lOiAgJ2ZhIGZhLXBlbmNpbC1zcXVhcmUtbycsXG4gICAgICAgIHRpdGxlOiAgICAgICdlZGl0JyxcbiAgICAgICAgYWN0aW9uOiAgICAgX1RFWC5lbnRlckVkaXRpbmdcbiAgICAgIH1cbiAgICB9XG4gICk7XG4vKlxuICBmYWJyaWMuVGV4dC5hc3luYyA9IHRydWU7XG4gIGZhYnJpYy5UZXh0LmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgIHZhciBfdG90YWwgPSAwLCBsb2FkZWQgPSAwO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgaWYgKG9iamVjdC5jdXJ2ZSkge1xuICAgICAgICB2YXIgZiA9IG5ldyBmYWJyaWMuQ3VydmVkVGV4dChvYmplY3QudGV4dCwgb2JqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBmID0gbmV3IGZhYnJpYy5JVGV4dChvYmplY3QudGV4dCwgb2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGYpO1xuICAgIH1cbiAgICBfLnJlY291cnNpdmUob2JqZWN0LFxuICAgICAgZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSwgcGFyZW50KSB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ID09ICdwYXR0ZXJuJykge1xuICAgICAgICAgIF90b3RhbCsrO1xuICAgICAgICAgIC8vICB2YXIgX3RleHR1cmUgPSBfLmZpbmRXaGVyZShvLnByb2plY3QudGV4dHVyZXMse2lkOiBwYXJlbnRbcHJvcGVydHldfSk7XG5cbiAgICAgICAgICB2YXIgX3RleHR1cmUgPSBmYWJyaWMudGV4dHVyZXNQYXRoICsgcGFyZW50W3Byb3BlcnR5XTtcblxuICAgICAgICAgIGZhYnJpYy51dGlsLmxvYWRJbWFnZShfdGV4dHVyZSwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgLy90aGlzW3Byb3BlcnR5XSA9IG5ldyBmYWJyaWMuSW1hZ2UoaW1nKTtcblxuICAgICAgICAgICAgcGFyZW50WydmaWxsJ10gPSBuZXcgZmFicmljLlBhdHRlcm4oe1xuICAgICAgICAgICAgICBzb3VyY2U6IGltZyxcbiAgICAgICAgICAgICAgcmVwZWF0OiAncmVwZWF0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyZW50W3Byb3BlcnR5XTtcbiAgICAgICAgICAgIGxvYWRlZCsrO1xuICAgICAgICAgICAgaWYgKF90b3RhbCA9PSBsb2FkZWQpY3JlYXRlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vcGFyZW50WydmaWxsJ10gPSBuZXcgZmFicmljLlBhdHRlcm4oe1xuICAgICAgICAgIC8vICAgIHNvdXJjZTogX3RleHR1cmUsXG4gICAgICAgICAgLy8gICAgcmVwZWF0OiAncmVwZWF0J1xuICAgICAgICAgIC8vfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIGlmIChfdG90YWwgPT0gbG9hZGVkKSB7XG4gICAgICByZXR1cm4gY3JlYXRlKCk7XG4gICAgfVxuICB9OyovXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL29iamVjdHMvU2xpZGVUZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbC91dGlsLmpzJyk7XG51dGlscy5vYmplY3QgPSByZXF1aXJlKCcuLy4uL3V0aWwvb2JqZWN0LmpzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiogRFBIaXN0b3J5XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxudmFyIERQSGlzdG9yeSA9IGZ1bmN0aW9uIChwYXJlbnQsIGluaXRBY3Rpb24pIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmNsZWFyKGluaXRBY3Rpb24pO1xufTtcblxuRFBIaXN0b3J5LnByb3RvdHlwZS5zZXRSZWNvcmRzID0gZnVuY3Rpb24gKHJlY29yZHMsY3VycmVudCkge1xuICB0aGlzLmNhblVuZG8gPSByZWNvcmRzLmxlbmd0aDtcbiAgdGhpcy5jYW5SZWRvID0gZmFsc2U7XG5cbiAgaWYoIXJlY29yZHMubGVuZ3RoKXtcbiAgICByZWNvcmRzID0gW3tcbiAgICAgIHR5cGU6ICdpbml0aWFsaXplZCcsXG4gICAgICBpZDogMCxcbiAgICAgIHRleHQgOiAnaW5pdGlhbGl6ZWQnXG4gICAgfV1cbiAgfVxuICB0aGlzLnJlY29yZHMgPSByZWNvcmRzO1xuICB0aGlzLmxlbmd0aCA9IHRoaXMucmVjb3Jkcy5sZW5ndGggO1xuICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50ID09PSB1bmRlZmluZWQgPyByZWNvcmRzLmxlbmd0aCAtIDEgOiBjdXJyZW50O1xuICB0aGlzLmFjdGl2ZUFjdGlvbiA9IHRoaXMucmVjb3Jkc1t0aGlzLmN1cnJlbnRdO1xuICB0aGlzLmZpcmUoXCJjaGFuZ2VkXCIse2FjdGlvbjogdGhpcy5hY3RpdmVBY3Rpb259KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5EUEhpc3RvcnkucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2V0UmVjb3Jkcyh0aGlzLnNhdmVkLnJlY29yZHMsdGhpcy5zYXZlZC5jdXJyZW50KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5EUEhpc3RvcnkucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2F2ZWQgPSB7XG4gICAgY3VycmVudDogdGhpcy5jdXJyZW50LFxuICAgIHJlY29yZHM6IHV0aWxzLm9iamVjdC5jbG9uZURlZXAodGhpcy5yZWNvcmRzKVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuRFBIaXN0b3J5LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChpbml0QWN0aW9uKSB7XG4gICAgaWYgKGluaXRBY3Rpb24pIHtcbiAgICAgICAgaW5pdEFjdGlvbi5pZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdEFjdGlvbiA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbml0aWFsaXplZCcsXG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICB0ZXh0IDogJ2luaXRpYWxpemVkJ1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVjb3JkcyA9IFtpbml0QWN0aW9uXTtcbiAgICB0aGlzLmN1cnJlbnQgPSAwO1xuICAgIHRoaXMuY2FuVW5kbyA9IGZhbHNlO1xuICAgIHRoaXMuY2FuUmVkbyA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aXZlQWN0aW9uID0gdGhpcy5yZWNvcmRzW3RoaXMuY3VycmVudF07XG4gIHRoaXMuZmlyZShcImNoYW5nZWRcIix7YWN0aW9uOiB0aGlzLmFjdGl2ZUFjdGlvbn0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuRFBIaXN0b3J5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihhY3Rpb24pe1xuXG5cbiAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhY3Rpb24ubW9tZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5jYW5VbmRvID0gdHJ1ZTtcbiAgICB0aGlzLmNhblJlZG8gPSBmYWxzZTtcbiAgICB0aGlzLnJlY29yZHMuc3BsaWNlKHRoaXMuY3VycmVudCsgMSk7XG4gICAgdGhpcy5yZWNvcmRzLnB1c2goYWN0aW9uKTtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMucmVjb3Jkcy5sZW5ndGg7XG4gICAgYWN0aW9uLmlkID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIGFjdGlvbi50ZXh0ID0gYWN0aW9uLnR5cGUgfHwgYWN0aW9uLnRleHQ7XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5sZW5ndGggLSAxO1xuXG4gIHRoaXMuYWN0aXZlQWN0aW9uID0gdGhpcy5yZWNvcmRzW3RoaXMuY3VycmVudF07XG4gIHRoaXMuZmlyZShcImNoYW5nZWRcIix7YWN0aW9uOiBhY3Rpb259KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuRFBIaXN0b3J5LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gIHJldHVybiB0aGlzO1xufTtcbkRQSGlzdG9yeS5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuRFBIaXN0b3J5LnByb3RvdHlwZS51bmRvID0gZnVuY3Rpb24obm9GaXJlKXtcbiAgICB0aGlzLmNhblJlZG8gPSB0cnVlO1xuICAgIHZhciBfYWN0aW9uID0gdGhpcy5yZWNvcmRzW3RoaXMuY3VycmVudF07XG4gICAgdGhpcy5jdXJyZW50LS07XG4gIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgX2FjdGlvbi51bmRvLmNhbGwodGhpcy5wYXJlbnQsX2FjdGlvbik7XG4gIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIGlmKHRoaXMuY3VycmVudCA9PSAwKXtcbiAgICAgICAgdGhpcy5jYW5VbmRvID0gZmFsc2U7XG4gICAgfVxuICAgIGlmKCFub0ZpcmUpe1xuICAgICAgdGhpcy5hY3RpdmVBY3Rpb24gPSB0aGlzLnJlY29yZHNbdGhpcy5jdXJyZW50XTtcbiAgICAgIHRoaXMuZmlyZShcImNoYW5nZWRcIix7YWN0aW9uOiBfYWN0aW9ufSk7XG4gICAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbkRQSGlzdG9yeS5wcm90b3R5cGUuZ290byA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICBpZihpbmRleCA9PSB0aGlzLmN1cnJlbnQpcmV0dXJuO1xuICAgIGlmKGluZGV4IDwgdGhpcy5jdXJyZW50KXtcbiAgICAgICAgZm9yKHZhciBpID0gdGhpcy5jdXJyZW50IC0gaW5kZXggO2ktLTsgKXtcbiAgICAgICAgICAgIHRoaXMudW5kbyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1pZihpbmRleCA+IHRoaXMuY3VycmVudCl7XG4gICAgICAgIGZvcih2YXIgaSA9IGluZGV4IC0gdGhpcy5jdXJyZW50IDtpLS07ICl7XG4gICAgICAgICAgICB0aGlzLnJlZG8odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gIHRoaXMuYWN0aXZlQWN0aW9uID0gdGhpcy5yZWNvcmRzW3RoaXMuY3VycmVudF07XG4gIHRoaXMuZmlyZShcImNoYW5nZWRcIix7YWN0aW9uOiB0aGlzLmFjdGl2ZUFjdGlvbn0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkRQSGlzdG9yeS5wcm90b3R5cGUucmVkbyA9IGZ1bmN0aW9uKG5vRmlyZSl7XG4gICAgaWYodGhpcy5jdXJyZW50ID09IHRoaXMubGVuZ3RoIC0gMSl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgdGhpcy5jYW5VbmRvID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB2YXIgX2FjdGlvbiA9IHRoaXMucmVjb3Jkc1t0aGlzLmN1cnJlbnRdO1xuXG4gICAgX2FjdGlvbi5yZWRvLmNhbGwodGhpcy5wYXJlbnQsX2FjdGlvbik7XG5cbiAgICBpZih0aGlzLmN1cnJlbnQgPT0gdGhpcy5sZW5ndGggLSAxKXtcbiAgICAgICAgdGhpcy5jYW5SZWRvID0gZmFsc2U7XG4gICAgfVxuICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgaWYoIW5vRmlyZSkge1xuICAgIHRoaXMuYWN0aXZlQWN0aW9uID0gdGhpcy5yZWNvcmRzW3RoaXMuY3VycmVudF07XG4gICAgdGhpcy5maXJlKFwiY2hhbmdlZFwiLHthY3Rpb246IF9hY3Rpb259KTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG51dGlscy5vYnNlcnZhYmxlKERQSGlzdG9yeS5wcm90b3R5cGUpO1xubW9kdWxlLmV4cG9ydHMgPSBEUEhpc3Rvcnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BsdWdpbnMvaGlzdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogRmlsZVNhdmVyLmpzXG4gKiBBIHNhdmVBcygpIEZpbGVTYXZlciBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE1MDcxNlxuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IFgxMS9NSVRcbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSwgaW5kZW50OiA0LCBsYXhicmVhazogdHJ1ZSwgbGF4Y29tbWE6IHRydWUsIHNtYXJ0dGFiczogdHJ1ZSwgcGx1c3BsdXM6IHRydWUgKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL0ZpbGVTYXZlci5qcy9ibG9iL21hc3Rlci9GaWxlU2F2ZXIuanMgKi9cblxuXG5cbnZhciBpc0xpa2VseU5vZGUgPSB0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJztcblxuXG5cbnZhciBzYXZlQXMgPSAhaXNMaWtlbHlOb2RlICYmICAoZnVuY3Rpb24odmlldykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgLy8gSUUgPDEwIGlzIGV4cGxpY2l0bHkgdW5zdXBwb3J0ZWRcbiAgICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgL01TSUUgWzEtOV1cXC4vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXJcbiAgICAgICAgICAgIGRvYyA9IHZpZXcuZG9jdW1lbnRcbiAgICAgICAgLy8gb25seSBnZXQgVVJMIHdoZW4gbmVjZXNzYXJ5IGluIGNhc2UgQmxvYi5qcyBoYXNuJ3Qgb3ZlcnJpZGRlbiBpdCB5ZXRcbiAgICAgICAgICAgICwgZ2V0X1VSTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2aWV3LlVSTCB8fCB2aWV3LndlYmtpdFVSTCB8fCB2aWV3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLCBzYXZlX2xpbmsgPSBkb2MuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLCBcImFcIilcbiAgICAgICAgICAgICwgY2FuX3VzZV9zYXZlX2xpbmsgPSBcImRvd25sb2FkXCIgaW4gc2F2ZV9saW5rXG4gICAgICAgICAgICAsIGNsaWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICwgd2Via2l0X3JlcV9mcyA9IHZpZXcud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW1cbiAgICAgICAgICAgICwgcmVxX2ZzID0gdmlldy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3ZWJraXRfcmVxX2ZzIHx8IHZpZXcubW96UmVxdWVzdEZpbGVTeXN0ZW1cbiAgICAgICAgICAgICwgdGhyb3dfb3V0c2lkZSA9IGZ1bmN0aW9uKGV4KSB7XG4gICAgICAgICAgICAgICAgKHZpZXcuc2V0SW1tZWRpYXRlIHx8IHZpZXcuc2V0VGltZW91dCkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGV4O1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLCBmb3JjZV9zYXZlYWJsZV90eXBlID0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICAgICAgICAgICAgLCBmc19taW5fc2l6ZSA9IDBcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzUyOTcjYzcgYW5kXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L0ZpbGVTYXZlci5qcy9jb21taXQvNDg1OTMwYSNjb21taXRjb21tZW50LTg3NjgwNDdcbiAgICAgICAgLy8gZm9yIHRoZSByZWFzb25pbmcgYmVoaW5kIHRoZSB0aW1lb3V0IGFuZCByZXZvY2F0aW9uIGZsb3dcbiAgICAgICAgICAgICwgYXJiaXRyYXJ5X3Jldm9rZV90aW1lb3V0ID0gNTAwIC8vIGluIG1zXG4gICAgICAgICAgICAsIHJldm9rZSA9IGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV2b2tlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbGUgPT09IFwic3RyaW5nXCIpIHsgLy8gZmlsZSBpcyBhbiBvYmplY3QgVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRfVVJMKCkucmV2b2tlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBmaWxlIGlzIGEgRmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHZpZXcuY2hyb21lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldm9rZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJldm9rZXIsIGFyYml0cmFyeV9yZXZva2VfdGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLCBkaXNwYXRjaCA9IGZ1bmN0aW9uKGZpbGVzYXZlciwgZXZlbnRfdHlwZXMsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnRfdHlwZXMgPSBbXS5jb25jYXQoZXZlbnRfdHlwZXMpO1xuICAgICAgICAgICAgICAgIHZhciBpID0gZXZlbnRfdHlwZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZmlsZXNhdmVyW1wib25cIiArIGV2ZW50X3R5cGVzW2ldXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwoZmlsZXNhdmVyLCBldmVudCB8fCBmaWxlc2F2ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd19vdXRzaWRlKGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICwgYXV0b19ib20gPSBmdW5jdGlvbihibG9iKSB7XG4gICAgICAgICAgICAgICAgLy8gcHJlcGVuZCBCT00gZm9yIFVURi04IFhNTCBhbmQgdGV4dC8qIHR5cGVzIChpbmNsdWRpbmcgSFRNTClcbiAgICAgICAgICAgICAgICBpZiAoL15cXHMqKD86dGV4dFxcL1xcUyp8YXBwbGljYXRpb25cXC94bWx8XFxTKlxcL1xcUypcXCt4bWwpXFxzKjsuKmNoYXJzZXRcXHMqPVxccyp1dGYtOC9pLnRlc3QoYmxvYi50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsb2IoW1wiXFx1ZmVmZlwiLCBibG9iXSwge3R5cGU6IGJsb2IudHlwZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmxvYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICwgRmlsZVNhdmVyID0gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5vX2F1dG9fYm9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGEuZG93bmxvYWQsIHRoZW4gd2ViIGZpbGVzeXN0ZW0sIHRoZW4gb2JqZWN0IFVSTHNcbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNhdmVyID0gdGhpc1xuICAgICAgICAgICAgICAgICAgICAsIHR5cGUgPSBibG9iLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgLCBibG9iX2NoYW5nZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAsIG9iamVjdF91cmxcbiAgICAgICAgICAgICAgICAgICAgLCB0YXJnZXRfdmlld1xuICAgICAgICAgICAgICAgICAgICAsIGRpc3BhdGNoX2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCBcIndyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgd3JpdGVlbmRcIi5zcGxpdChcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gb24gYW55IGZpbGVzeXMgZXJyb3JzIHJldmVydCB0byBzYXZpbmcgd2l0aCBvYmplY3QgVVJMc1xuICAgICAgICAgICAgICAgICAgICAsIGZzX2Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBjcmVhdGUgbW9yZSBvYmplY3QgVVJMcyB0aGFuIG5lZWRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2JfY2hhbmdlZCB8fCAhb2JqZWN0X3VybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldF92aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X3ZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdfdGFiID0gdmlldy5vcGVuKG9iamVjdF91cmwsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdfdGFiID09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygc2FmYXJpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXBwbGUgZG8gbm90IGFsbG93IHdpbmRvdy5vcGVuLCBzZWUgaHR0cDovL2JpdC5seS8xa1pmZlJJXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubG9jYXRpb24uaHJlZiA9IG9iamVjdF91cmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLCBhYm9ydGFibGUgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVzYXZlci5yZWFkeVN0YXRlICE9PSBmaWxlc2F2ZXIuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLCBjcmVhdGVfaWZfbm90X2ZvdW5kID0ge2NyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgLCBzbGljZVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgZmlsZXNhdmVyLnJlYWR5U3RhdGUgPSBmaWxlc2F2ZXIuSU5JVDtcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFwiZG93bmxvYWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNhbl91c2Vfc2F2ZV9saW5rKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdF91cmwgPSBnZXRfVVJMKCkuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgICBzYXZlX2xpbmsuaHJlZiA9IG9iamVjdF91cmw7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVfbGluay5kb3dubG9hZCA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayhzYXZlX2xpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hfYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZva2Uob2JqZWN0X3VybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPYmplY3QgYW5kIHdlYiBmaWxlc3lzdGVtIFVSTHMgaGF2ZSBhIHByb2JsZW0gc2F2aW5nIGluIEdvb2dsZSBDaHJvbWUgd2hlblxuICAgICAgICAgICAgICAgIC8vIHZpZXdlZCBpbiBhIHRhYiwgc28gSSBmb3JjZSBzYXZlIHdpdGggYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTExNThcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGU6IEdvb2dsZSBlcnJhbnRseSBjbG9zZWQgOTExNTgsIEkgc3VibWl0dGVkIGl0IGFnYWluOlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zODk2NDJcbiAgICAgICAgICAgICAgICBpZiAodmlldy5jaHJvbWUgJiYgdHlwZSAmJiB0eXBlICE9PSBmb3JjZV9zYXZlYWJsZV90eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlID0gYmxvYi5zbGljZSB8fCBibG9iLndlYmtpdFNsaWNlO1xuICAgICAgICAgICAgICAgICAgICBibG9iID0gc2xpY2UuY2FsbChibG9iLCAwLCBibG9iLnNpemUsIGZvcmNlX3NhdmVhYmxlX3R5cGUpO1xuICAgICAgICAgICAgICAgICAgICBibG9iX2NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTaW5jZSBJIGNhbid0IGJlIHN1cmUgdGhhdCB0aGUgZ3Vlc3NlZCBtZWRpYSB0eXBlIHdpbGwgdHJpZ2dlciBhIGRvd25sb2FkXG4gICAgICAgICAgICAgICAgLy8gaW4gV2ViS2l0LCBJIGFwcGVuZCAuZG93bmxvYWQgdG8gdGhlIGZpbGVuYW1lLlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NTQ0MFxuICAgICAgICAgICAgICAgIGlmICh3ZWJraXRfcmVxX2ZzICYmIG5hbWUgIT09IFwiZG93bmxvYWRcIikge1xuICAgICAgICAgICAgICAgICAgICBuYW1lICs9IFwiLmRvd25sb2FkXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBmb3JjZV9zYXZlYWJsZV90eXBlIHx8IHdlYmtpdF9yZXFfZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X3ZpZXcgPSB2aWV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlcV9mcykge1xuICAgICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZzX21pbl9zaXplICs9IGJsb2Iuc2l6ZTtcbiAgICAgICAgICAgICAgICByZXFfZnModmlldy5URU1QT1JBUlksIGZzX21pbl9zaXplLCBhYm9ydGFibGUoZnVuY3Rpb24oZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZnMucm9vdC5nZXREaXJlY3RvcnkoXCJzYXZlZFwiLCBjcmVhdGVfaWZfbm90X2ZvdW5kLCBhYm9ydGFibGUoZnVuY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpci5nZXRGaWxlKG5hbWUsIGNyZWF0ZV9pZl9ub3RfZm91bmQsIGFib3J0YWJsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY3JlYXRlV3JpdGVyKGFib3J0YWJsZShmdW5jdGlvbih3cml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlci5vbndyaXRlZW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRfdmlldy5sb2NhdGlvbi5ocmVmID0gZmlsZS50b1VSTCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLkRPTkU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCBcIndyaXRlZW5kXCIsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZva2UoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB3cml0ZXIuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgIT09IGVycm9yLkFCT1JUX0VSUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmc19lcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndyaXRlc3RhcnQgcHJvZ3Jlc3Mgd3JpdGUgYWJvcnRcIi5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlcltcIm9uXCIgKyBldmVudF0gPSBmaWxlc2F2ZXJbXCJvblwiICsgZXZlbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIud3JpdGUoYmxvYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc2F2ZXIuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzYXZlci5yZWFkeVN0YXRlID0gZmlsZXNhdmVyLldSSVRJTkc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXIuZ2V0RmlsZShuYW1lLCB7Y3JlYXRlOiBmYWxzZX0sIGFib3J0YWJsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIGZpbGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBhYm9ydGFibGUoZnVuY3Rpb24oZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXguY29kZSA9PT0gZXguTk9UX0ZPVU5EX0VSUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnNfZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLCBmc19lcnJvcik7XG4gICAgICAgICAgICAgICAgfSksIGZzX2Vycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICwgRlNfcHJvdG8gPSBGaWxlU2F2ZXIucHJvdG90eXBlXG4gICAgICAgICAgICAsIHNhdmVBcyA9IGZ1bmN0aW9uKGJsb2IsIG5hbWUsIG5vX2F1dG9fYm9tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGaWxlU2F2ZXIoYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICAvLyBJRSAxMCsgKG5hdGl2ZSBzYXZlQXMpXG4gICAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYmxvYiwgbmFtZSwgbm9fYXV0b19ib20pIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5vX2F1dG9fYm9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2IgPSBhdXRvX2JvbShibG9iKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG5hbWUgfHwgXCJkb3dubG9hZFwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBGU19wcm90by5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZpbGVzYXZlciA9IHRoaXM7XG4gICAgICAgICAgICBmaWxlc2F2ZXIucmVhZHlTdGF0ZSA9IGZpbGVzYXZlci5ET05FO1xuICAgICAgICAgICAgZGlzcGF0Y2goZmlsZXNhdmVyLCBcImFib3J0XCIpO1xuICAgICAgICB9O1xuICAgICAgICBGU19wcm90by5yZWFkeVN0YXRlID0gRlNfcHJvdG8uSU5JVCA9IDA7XG4gICAgICAgIEZTX3Byb3RvLldSSVRJTkcgPSAxO1xuICAgICAgICBGU19wcm90by5ET05FID0gMjtcblxuICAgICAgICBGU19wcm90by5lcnJvciA9XG4gICAgICAgICAgICBGU19wcm90by5vbndyaXRlc3RhcnQgPVxuICAgICAgICAgICAgICAgIEZTX3Byb3RvLm9ucHJvZ3Jlc3MgPVxuICAgICAgICAgICAgICAgICAgICBGU19wcm90by5vbndyaXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIEZTX3Byb3RvLm9uYWJvcnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZTX3Byb3RvLm9uZXJyb3IgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGU19wcm90by5vbndyaXRlZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHNhdmVBcztcbiAgICB9KFxuICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmXG4gICAgICAgIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93XG4gICAgICAgIHx8IHRoaXMuY29udGVudFxuICAgICkpO1xuLy8gYHNlbGZgIGlzIHVuZGVmaW5lZCBpbiBGaXJlZm94IGZvciBBbmRyb2lkIGNvbnRlbnQgc2NyaXB0IGNvbnRleHRcbi8vIHdoaWxlIGB0aGlzYCBpcyBuc0lDb250ZW50RnJhbWVNZXNzYWdlTWFuYWdlclxuLy8gd2l0aCBhbiBhdHRyaWJ1dGUgYGNvbnRlbnRgIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHdpbmRvd1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzLnNhdmVBcyA9IHNhdmVBcztcbn0gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsKSAmJiAoZGVmaW5lLmFtZCAhPSBudWxsKSkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzYXZlQXM7XG4gICAgfSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BsdWdpbnMvc2F2ZUFzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7QUNoRUE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcFJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBOzs7Ozs7OztBQ0RBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3hRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNuUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcGtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7QUNyUUE7OztBIiwic291cmNlUm9vdCI6IiJ9