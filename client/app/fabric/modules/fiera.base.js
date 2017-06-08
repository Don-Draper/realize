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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = fabric;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(4);

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

/***/ 116:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczpuczE9Imh0dHA6Ly9zb3ppLmJhaWVyb3VnZS5mciIKICAgIGlkPSJzdmc0ODg4IgogICAgc29kaXBvZGk6ZG9jbmFtZT0id2FybmluZ19idXR0b24uc3ZnIgogICAgdmlld0JveD0iMCAwIDQwMCA0MDAiCiAgICB2ZXJzaW9uPSIxLjEiCiAgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjAgcjk2NTQiCiAgPgogIDxkZWZzCiAgICAgIGlkPSJkZWZzNDg5MCIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTEiCiAgICAgICAgeTI9IjM2Ny44OCIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMjg3LjQ5IgogICAgICAgIHgyPSIzMTUuNDciCiAgICAgICAgeDE9IjI0MS40MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNDE1OCIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNjAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPGZpbHRlcgogICAgICAgIGlkPSJmaWx0ZXI2MTI2IgogICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPGZlR2F1c3NpYW5CbHVyCiAgICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI2MTI4IgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIwLjUzMDM1NzEzIgogICAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAvPgogICAgPC9maWx0ZXIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTMiCiAgICAgICAgeTI9IjM5MS40NSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMzAwLjg2IgogICAgICAgIHgyPSIzNDIiCiAgICAgICAgeDE9IjI3NS42MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNzIwMSIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM1NTAwMDAiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcyMDMiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPHJhZGlhbEdyYWRpZW50CiAgICAgICAgaWQ9InJhZGlhbEdyYWRpZW50ODQxNSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICBjeD0iMzEyLjc4IgogICAgICAgIGN5PSIzODYuNTciCiAgICAgICAgcj0iNTMuMDM2IgogICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS41OTMyNyAtLjU5MzI3IC43MTUwNSAtLjcxNTA1IDI0My4yNyA4NDkuMDMpIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A3MTEzLTciCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTouNDA4MTYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcxMTUtNyIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjAiCiAgICAgICAgICBvZmZzZXQ9IjEiCiAgICAgIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50CiAgICA+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDQ0OSIKICAgICAgICB5Mj0iMzM4LjgyIgogICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgIHkxPSIyODYuNjciCiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguOTU1MzQgMCAwIC45NTUzNCAxMzYuMTIgMTQuMDU1KSIKICAgICAgICB4Mj0iMzAwLjI3IgogICAgICAgIHgxPSIyNTUuMzIiCiAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICA+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNTAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmIgogICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAvPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A0MTUyIgogICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MCIKICAgICAgICAgIG9mZnNldD0iMSIKICAgICAgLz4KICAgIDwvbGluZWFyR3JhZGllbnQKICAgID4KICAgIDxmaWx0ZXIKICAgICAgICBpZD0iZmlsdGVyMTE0MjgiCiAgICAgICAgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjExNDMwIgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIxLjI0MzQ2NzgiCiAgICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgIC8+CiAgICA8L2ZpbHRlcgogICAgPgogIDwvZGVmcwogID4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgIGlkPSJiYXNlIgogICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk4OCIKICAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICAgaW5rc2NhcGU6em9vbT0iMC43MDcxMDY3OCIKICAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgICBpbmtzY2FwZTpjeD0iMzA0Ljg5NDA5IgogICAgICBpbmtzY2FwZTpjeT0iMzQxLjUyMTg2IgogICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2ODAiCiAgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAvPgogIDxnCiAgICAgIGlkPSJsYXllcjEiCiAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC02NTIuMzYpIgogICAgPgogICAgPGcKICAgICAgICBpZD0iZzExNDMyIgogICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSI5MCIKICAgICAgICBpbmtzY2FwZTpleHBvcnQteGRwaT0iOTAiCiAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMi45MDUxIDAgMCAyLjkwNTEgLTEwMDEuOSAtNzguOTYxKSIKICAgICAgPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjc2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5IgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTczNTQgMCAwIC45NzM1NCAxMjAuMDkgLTEyLjYyOCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI3OCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTEpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTU5NjAgMCAwIC45NTk2MCAxMjQuMzMgLTcuODAxNCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6I2VjZWNlYyIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjg3MzU1IDAgMCAuODczNTUgMTUwLjQ3IDIxLjk4MSkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MiIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6Izk5OTk5OSIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjgzODM4IDAgMCAuODM4MzggMTYxLjE1IDM0LjE1MikiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4NCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTMpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguODA1ODcgMCAwIC44MDU4NyAxNzEuMDMgNDUuNDA1KSIKICAgICAgICAgIHNvZGlwb2RpOmN5PSIzNDYuMTEyMTgiCiAgICAgICAgICBzb2RpcG9kaTpjeD0iMzAzLjc1IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjg2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI3JhZGlhbEdyYWRpZW50ODQxNSkiCiAgICAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICAgICBkPSJtMzU2Ljc5IDM0Ni4xMWMwIDI5LjI5MS0yMy43NDUgNTMuMDM2LTUzLjAzNiA1My4wMzZzLTUzLjAzNi0yMy43NDUtNTMuMDM2LTUzLjAzNiAyMy43NDUtNTMuMDM2IDUzLjAzNi01My4wMzYgNTMuMDM2IDIzLjc0NSA1My4wMzYgNTMuMDM2eiIKICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC43NTgyNSAwIDAgLjc1ODI1IDE4Ni43NSA2My45MDYpIgogICAgICAgICAgc29kaXBvZGk6Y3k9IjM0Ni4xMTIxOCIKICAgICAgICAgIHNvZGlwb2RpOmN4PSIzMDMuNzUiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDcyODgiCiAgICAgICAgICBzdHlsZT0ib3BhY2l0eTouMzE3NzE7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA0NDkpIgogICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgIGQ9Im00MTQuOCAyODQuMTVjLTEzLjMzMSAwLjMwMDY5LTI2LjE4NiA3LjM1OC0zMy4zMzYgMTkuNzQyLTcuNjkwMyAxMy4zMi02LjcxMzkgMjkuMjY2IDEuMTU0NSA0MS4zMzEgMC44NTMwNi0yNi41MzIgMjEuMTMyLTQ2LjUxNSA0Ni4zMjQtNDUuMDU0IDguMjU4OSAwLjQ3OTA3IDE2LjA1NCAzLjIwMDEgMjIuODU5IDcuNTkwOC0zLjI1NzgtNy40NDk4LTguODE3MS0xMy45NTMtMTYuMzk0LTE4LjMyNy02LjQ4NjctMy43NDUxLTEzLjYyNS01LjQzOTMtMjAuNjA4LTUuMjgxOHoiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icmVjdDczNzAiCiAgICAgICAgICBkPSJtNDAyLjg4IDMwMC4wOS0xMS41ODEgMTEuNTgxIDEzLjI5NSAxMy4yOTUtMTMuMjk1IDEzLjI4MSAxMS41ODEgMTEuNTgxIDEzLjI4MS0xMy4yOTUgMTMuMjk1IDEzLjI5NSAxMS41ODEtMTEuNTgxLTEzLjI4MS0xMy4yODEgMTMuMjgxLTEzLjI5NS0xMS41ODEtMTEuNTgxLTEzLjI5NSAxMy4yODEtMTMuMjgxLTEzLjI4MXoiCiAgICAgICAgICBzdHlsZT0iZmlsdGVyOnVybCgjZmlsdGVyMTE0MjgpO2ZpbGw6IzFhMWExYSIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDEwNDU3IgogICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgICBkPSJtNDAzLjQ1IDMwMS4xNS0xMS4wODcgMTEuMDg3IDEyLjcyOCAxMi43MjgtMTIuNzI4IDEyLjcxNCAxMS4wODcgMTEuMDg3IDEyLjcxNC0xMi43MjggMTIuNzI4IDEyLjcyOCAxMS4wODctMTEuMDg3LTEyLjcxNC0xMi43MTQgMTIuNzE0LTEyLjcyOC0xMS4wODctMTEuMDg3LTEyLjcyOCAxMi43MTQtMTIuNzE0LTEyLjcxNHoiCiAgICAgIC8+CiAgICA8L2cKICAgID4KICA8L2cKICA+CiAgPG1ldGFkYXRhCiAgICA+CiAgICA8cmRmOlJERgogICAgICA+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgPgogICAgICAgIDxkYzpmb3JtYXQKICAgICAgICAgID5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQKICAgICAgICA+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIKICAgICAgICAvPgogICAgICAgIDxjYzpsaWNlbnNlCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICAvPgogICAgICAgIDxkYzpwdWJsaXNoZXIKICAgICAgICAgID4KICAgICAgICAgIDxjYzpBZ2VudAogICAgICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL29wZW5jbGlwYXJ0Lm9yZy8iCiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPk9wZW5jbGlwYXJ0PC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpwdWJsaXNoZXIKICAgICAgICA+CiAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICA+ZXJyb3IgYnV0dG9uPC9kYzp0aXRsZQogICAgICAgID4KICAgICAgICA8ZGM6ZGF0ZQogICAgICAgICAgPjIwMTEtMDItMjRUMTc6NDU6NDU8L2RjOmRhdGUKICAgICAgICA+CiAgICAgICAgPGRjOmRlc2NyaXB0aW9uCiAgICAgICAgLz4KICAgICAgICA8ZGM6c291cmNlCiAgICAgICAgICA+aHR0cHM6Ly9vcGVuY2xpcGFydC5vcmcvZGV0YWlsLzEyMjQyNS9lcnJvci1idXR0b24tYnktcmljYXJkb21haWE8L2RjOnNvdXJjZQogICAgICAgID4KICAgICAgICA8ZGM6Y3JlYXRvcgogICAgICAgICAgPgogICAgICAgICAgPGNjOkFnZW50CiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPnJpY2FyZG9tYWlhPC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpjcmVhdG9yCiAgICAgICAgPgogICAgICAgIDxkYzpzdWJqZWN0CiAgICAgICAgICA+CiAgICAgICAgICA8cmRmOkJhZwogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+YnV0dG9uPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPmNhbmNlbDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5jaXJjbGU8L3JkZjpsaQogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+ZGVsZXRlPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPnJlZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5yb3VuZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgIDwvcmRmOkJhZwogICAgICAgICAgPgogICAgICAgIDwvZGM6c3ViamVjdAogICAgICAgID4KICAgICAgPC9jYzpXb3JrCiAgICAgID4KICAgICAgPGNjOkxpY2Vuc2UKICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICA+CiAgICAgICAgPGNjOnBlcm1pdHMKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNSZXByb2R1Y3Rpb24iCiAgICAgICAgLz4KICAgICAgICA8Y2M6cGVybWl0cwogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiIKICAgICAgICAvPgogICAgICAgIDxjYzpwZXJtaXRzCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjRGVyaXZhdGl2ZVdvcmtzIgogICAgICAgIC8+CiAgICAgIDwvY2M6TGljZW5zZQogICAgICA+CiAgICA8L3JkZjpSREYKICAgID4KICA8L21ldGFkYXRhCiAgPgo8L3N2Zwo+Cg=="

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {


var path = __webpack_require__(6);
var util = __webpack_require__(2);
var object = __webpack_require__(1);

function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}


if (isServer()) {
  var fs = __webpack_require__(116);
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

if (typeof _ === 'undefined' && typeof exports !== 'undefined') {
  _ = __webpack_require__(4);
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var objectUtils = __webpack_require__(1)
_ = __webpack_require__(4);

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

/***/ 4:
/***/ (function(module, exports) {

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.


  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });


  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  module.exports = _;


/***/ }),

/***/ 5:
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

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.debug = true;

fabric.util.data = __webpack_require__(18);
fabric.util.path = __webpack_require__(6);
fabric.util.compile = __webpack_require__(5);
fabric.util.loader = __webpack_require__(19);
fabric.util.object.extend(fabric.util.object,__webpack_require__(1));
fabric.util.object.extend(fabric.util,__webpack_require__(2));

//require('./modules');


if(!fabric.isLikelyNode){
  /**
   * inline script images
   * @type {{error: string}}
   */
  fabric.media = {
    /**
     * replace images loaded with errors
     */
    error: 'data:image/svg+xml;base64,' + __webpack_require__(16)
  };
}

module.exports  = fabric;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 6:
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllcmEuZGV2LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDAwNzhlNGRmNGZmZWQyODRmZDlhIiwid2VicGFjazovLy9leHRlcm5hbCBcImZhYnJpY1wiIiwid2VicGFjazovLy8uL3V0aWwvb2JqZWN0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvZXJyb3ItYnV0dG9uLnN2ZyIsIndlYnBhY2s6Ly8vLi91dGlsL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC91dGlsLmpzIiwid2VicGFjazovLy8uL3BsdWdpbnMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi91dGlsL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vZmllcmEuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbC9wYXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAwNzhlNGRmNGZmZWQyODRmZDlhIiwibW9kdWxlLmV4cG9ydHMgPSBmYWJyaWM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmYWJyaWNcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgXyA9IHJlcXVpcmUoXCIuLi9wbHVnaW5zL3VuZGVyc2NvcmVcIik7XG5cbnZhciB1dGlscyA9IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBhcnJcbiAgICogQHBhcmFtIGFycjJcbiAgICogQHJldHVybnMge3t9fVxuICAgKiBAZXhhbXBsZVxuICAgKiAgICB4ID0ge2E6IDEgLGI6IDEsIGM6IFsxLDJdfVxuICAgKiAgICB5ID0ge2E6IDIgLCAgYyA6IDMgLCBkIDogMX1cbiAgICpcbiAgICogICAgZXh0ZW5kQXJyYXlzT2JqZWN0KHgseSkgPSB7YTogWzEsMl0gYiA6IFsxXSBjIDogWzEsMiwzXSwgZCBbMV0gfVxuICAgKi9cbiAgZXh0ZW5kQXJyYXlzT2JqZWN0IDogZnVuY3Rpb24oYXJyLGFycjIpe1xuICAgIHZhciBuZXdBcnJheSA9IHt9O1xuXG4gICAgZm9yKHZhciBpIGluIGFycil7XG4gICAgICBpZihhcnJbaV0uY29uc3RydWN0b3IgPT0gQXJyYXkpe1xuICAgICAgICBuZXdBcnJheVtpXSAgPSBbXS5jb25jYXQoYXJyW2ldKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBuZXdBcnJheVtpXSA9IFthcnJbaV1dO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvcih2YXIgaSBpbiBhcnIyKXtcbiAgICAgIGlmKG5ld0FycmF5W2ldKXtcbiAgICAgICAgbmV3QXJyYXlbaV0ucHVzaChhcnIyW2ldKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBuZXdBcnJheVtpXSA9IFthcnIyW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0FycmF5O1xuICB9LFxuICBmaWx0ZXJWYWx1ZXM6IGZ1bmN0aW9uIChhcnJheSwgdmFsdWVzKSB7XG4gICAgdmFyIG5ld19hcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgaW4gYXJyYXkpIHtcbiAgICAgIHZhciBfbmV3X29iamVjdCA9IHt9O1xuICAgICAgZm9yICh2YXIgaiBpbiB2YWx1ZXMpIHtcbiAgICAgICAgX25ld19vYmplY3RbdmFsdWVzW2pdXSA9IGFycmF5W2ldW3ZhbHVlc1tqXV1cbiAgICAgIH1cbiAgICAgIG5ld19hcnJheS5wdXNoKF9uZXdfb2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld19hcnJheTtcbiAgfSxcblxuICAvKipcbiAgICogINCi0LDRgdC+0LLQsNC90LjQtSDQpNC40YjQtdGA0LDigJPQmdC10YLRgdCwLNGB0LvRg9GH0LDQudC90L7QtSDRgtCw0YHQvtCy0LDQvdC40LUg0LzQvdC+0LbQtdGB0YLQstCwXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzaHVmZmxlOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKCFvYmplY3QubGVuZ3RoKSByZXR1cm47XG4gICAgdmFyIGkgPSBvYmplY3QubGVuZ3RoO1xuICAgIHdoaWxlICgtLWkpIHtcbiAgICAgIHZhciBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICB2YXIgdGVtcCA9IG9iamVjdFtpXTtcbiAgICAgIG9iamVjdFtpXSA9IG9iamVjdFtqXTtcbiAgICAgIG9iamVjdFtqXSA9IHRlbXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDsgLy8gZm9yIGNvbnZlbmllbmNlLCBpbiBjYXNlIHdlIHdhbnQgYSByZWZlcmVuY2UgdG8gdGhlIGFycmF5XG4gIH0sXG4gIC8qKlxuICAgKiBEZXBlbmRlbmN5OiB1bmRlcnNjb3JlLmpzICggaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlLyApXG4gICAqXG4gICAqIE1peCBpdCBpbiB3aXRoIHVuZGVyc2NvcmUuanM6XG4gICAqIF8ubWl4aW4oe2RlZXBFeHRlbmQ6IGRlZXBFeHRlbmR9KTtcbiAgICpcbiAgICogQ2FsbCBpdCBsaWtlIHRoaXM6XG4gICAqIHZhciBteU9iaiA9IHV0aWxzLmRlZXBFeHRlbmQoZ3JhbmRwYXJlbnQsIGNoaWxkLCBncmFuZGNoaWxkLCBncmVhdGdyYW5kY2hpbGQpXG4gICAqXG4gICAqIE5vdGVzOlxuICAgKiBLZWVwIGl0IERSWS5cbiAgICogVGhpcyBmdW5jdGlvbiBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBpZiB5b3UncmUgd29ya2luZyB3aXRoIEpTT04gY29uZmlnIGRvY3VtZW50cy4gSXQgYWxsb3dzIHlvdSB0byBjcmVhdGUgYSBkZWZhdWx0XG4gICAqIGNvbmZpZyBkb2N1bWVudCB3aXRoIHRoZSBtb3N0IGNvbW1vbiBzZXR0aW5ncywgdGhlbiBvdmVycmlkZSB0aG9zZSBzZXR0aW5ncyBmb3Igc3BlY2lmaWMgY2FzZXMuIEl0IGFjY2VwdHMgYW55XG4gICAqIG51bWJlciBvZiBvYmplY3RzIGFzIGFyZ3VtZW50cywgZ2l2aW5nIHlvdSBmaW5lLWdyYWluZWQgY29udHJvbCBvdmVyIHlvdXIgY29uZmlnIGRvY3VtZW50IGhpZXJhcmNoeS5cbiAgICpcbiAgICogU3BlY2lhbCBGZWF0dXJlcyBhbmQgQ29uc2lkZXJhdGlvbnM6XG4gICAqIC0gcGFyZW50UkUgYWxsb3dzIHlvdSB0byBjb25jYXRlbmF0ZSBzdHJpbmdzLiBleGFtcGxlOlxuICAgKiAgIHZhciBvYmogPSB1dGlscy5kZWVwRXh0ZW5kKHt1cmw6IFwid3d3LmV4YW1wbGUuY29tXCJ9LCB7dXJsOiBcImh0dHA6Ly8je199L3BhdGgvdG8vZmlsZS5odG1sXCJ9KTtcbiAgICogICBjb25zb2xlLmxvZyhvYmoudXJsKTtcbiAgICogICBvdXRwdXQ6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL2ZpbGUuaHRtbFwiXG4gICAqXG4gICAqIC0gcGFyZW50UkUgYWxzbyBhY3RzIGFzIGEgcGxhY2Vob2xkZXIsIHdoaWNoIGNhbiBiZSB1c2VmdWwgd2hlbiB5b3UgbmVlZCB0byBjaGFuZ2Ugb25lIHZhbHVlIGluIGFuIGFycmF5LCB3aGlsZVxuICAgKiAgIGxlYXZpbmcgdGhlIG90aGVycyB1bnRvdWNoZWQuIGV4YW1wbGU6XG4gICAqICAgdmFyIGFyciA9IHV0aWxzLmRlZXBFeHRlbmQoWzEwMCwgICAge2lkOiAxMjM0fSwgdHJ1ZSwgIFwiZm9vXCIsICBbMjUwLCA1MDBdXSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIFtcIiN7X31cIiwgXCIje199XCIsICAgICBmYWxzZSwgXCIje199XCIsIFwiI3tffVwiXSk7XG4gICAqICAgY29uc29sZS5sb2coYXJyKTtcbiAgICogICBvdXRwdXQ6IFsxMDAsIHtpZDogMTIzNH0sIGZhbHNlLCBcImZvb1wiLCBbMjUwLCA1MDBdXVxuICAgKlxuICAgKiAtIFRoZSBwcmV2aW91cyBleGFtcGxlIGNhbiBhbHNvIGJlIHdyaXR0ZW4gbGlrZSB0aGlzOlxuICAgKiAgIHZhciBhcnIgPSB1dGlscy5kZWVwRXh0ZW5kKFsxMDAsICAgIHtpZDoxMjM0fSwgICB0cnVlLCAgXCJmb29cIiwgIFsyNTAsIDUwMF1dLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiI3tffVwiLCB7fSwgICAgICAgICAgZmFsc2UsIFwiI3tffVwiLCBbXV0pO1xuICAgKiAgIGNvbnNvbGUubG9nKGFycik7XG4gICAqICAgb3V0cHV0OiBbMTAwLCB7aWQ6IDEyMzR9LCBmYWxzZSwgXCJmb29cIiwgWzI1MCwgNTAwXV1cbiAgICpcbiAgICogLSBBbmQgYWxzbyBsaWtlIHRoaXM6XG4gICAqICAgdmFyIGFyciA9IHV0aWxzLmRlZXBFeHRlbmQoWzEwMCwgICAge2lkOjEyMzR9LCAgIHRydWUsICBcImZvb1wiLCAgWzI1MCwgNTAwXV0sXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBbXCIje199XCIsIHt9LCAgICAgICAgICBmYWxzZV0pO1xuICAgKiAgIGNvbnNvbGUubG9nKGFycik7XG4gICAqICAgb3V0cHV0OiBbMTAwLCB7aWQ6IDEyMzR9LCBmYWxzZSwgXCJmb29cIiwgWzI1MCwgNTAwXV1cbiAgICpcbiAgICogLSBBcnJheSBvcmRlciBpcyBpbXBvcnRhbnQuIGV4YW1wbGU6XG4gICAqICAgdmFyIGFyciA9IHV0aWxzLmRlZXBFeHRlbmQoWzEsIDIsIDMsIDRdLCBbMSwgNCwgMywgMl0pO1xuICAgKiAgIGNvbnNvbGUubG9nKGFycik7XG4gICAqICAgb3V0cHV0OiBbMSwgNCwgMywgMl1cbiAgICpcbiAgICogLSBZb3UgY2FuIHJlbW92ZSBhbiBhcnJheSBlbGVtZW50IHNldCBpbiBhIHBhcmVudCBvYmplY3QgYnkgc2V0dGluZyB0aGUgc2FtZSBpbmRleCB2YWx1ZSB0byBudWxsIGluIGEgY2hpbGQgb2JqZWN0LlxuICAgKiAgIGV4YW1wbGU6XG4gICAqICAgdmFyIG9iaiA9IHV0aWxzLmRlZXBFeHRlbmQoe2FycjogWzEsIDIsIDMsIDRdfSwge2FycjogW1wiI3tffVwiLCBudWxsXX0pO1xuICAgKiAgIGNvbnNvbGUubG9nKG9iai5hcnIpO1xuICAgKiAgIG91dHB1dDogWzEsIDMsIDRdXG4gICAqXG4gICAqKi9cbiAgZGVlcEV4dGVuZDogZnVuY3Rpb24gKC8qb2JqXzEsIFtvYmpfMl0sIFtvYmpfTl0qLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIGFyZ3VtZW50c1swXTtcblxuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cbiAgICAvLyBjb252ZXJ0IGFyZ3VtZW50cyB0byBhcnJheSBhbmQgY3V0IG9mZiB0YXJnZXQgb2JqZWN0XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGtleSwgdmFsLCBzcmMsIGNsb25lLCB0bXBCdWY7XG5cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSByZXR1cm47XG5cbiAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICBpZiAoIShrZXkgaW4gb2JqKSkgY29udGludWU7XG5cbiAgICAgICAgc3JjID0gdGFyZ2V0W2tleV07XG4gICAgICAgIHZhbCA9IHV0aWxzLmNsb25lRGVlcChvYmpba2V5XSk7XG5cblxuICAgICAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ29iamVjdCcgfHwgc3JjID09PSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICAgIH1lbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICBjbG9uZSA9IChBcnJheS5pc0FycmF5KHNyYykpID8gc3JjIDogW107XG5cbiAgICAgICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGNsb25lLnB1c2godXRpbHMuY2xvbmVEZWVwKGl0ZW0pKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRhcmdldFtrZXldID0gY2xvbmU7XG4gICAgICAgICAgLy90b2RvICDQtdGB0LvQuCDQt9Cw0LjQvNGB0YLQstGD0LXQvCDQvNCw0YHRgdC40LIgLCDRgtC+INGB0YHQvtGF0YDQsNC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0LjQtyDQvtCx0L7QuNGFINC80LDRgdGB0LjQstC+0LJcbiAgICAgICAgICAvL3RhcmdldFtrZXldID0gdXRpbHMuZGVlcEV4dGVuZChjbG9uZSwgdmFsKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb25lID0gKCFBcnJheS5pc0FycmF5KHNyYykpID8gc3JjIDoge307XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB1dGlscy5kZWVwRXh0ZW5kKGNsb25lLCB2YWwpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG4gIGNsb25lRGVlcDogZnVuY3Rpb24gKHZhbCkge1xuXG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbC5nZXRUaW1lKCkpO1xuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCh2YWwpO1xuICAgIH1cblxuICAgIGlmKHZhbC5jbG9uZVN5bmMpe1xuICAgICAgcmV0dXJuIHZhbC5jbG9uZVN5bmMoKTtcbiAgICB9ZWxzZSBpZih2YWwuY29uc3RydWN0b3IgPT0gT2JqZWN0KXtcbiAgICAgIHJldHVybiB1dGlscy5kZWVwRXh0ZW5kKHt9LCB2YWwpO1xuICAgIH1lbHNlIGlmKHZhbC5jb25zdHJ1Y3RvciA9PSBBcnJheSl7XG4gICAgICB2YXIgY2xvbmUgPSBbXTtcbiAgICAgIGZvcih2YXIgaSA9MCA7aSA8IHZhbC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGNsb25lLnB1c2godXRpbHMuY2xvbmVEZWVwKHZhbFtpXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH1lbHNle1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gIH0sXG4gIHJlYXJyYW5nZTogZnVuY3Rpb24gKG9iamVjdCwga2V5cykge1xuICAgIHZhciBfbmV3T3JkZXIgPSB7fTtcbiAgICBmb3IgKHZhciBpIGluIGtleXMpIHtcbiAgICAgIGlmKG9iamVjdFtrZXlzW2ldXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgX25ld09yZGVyW2tleXNbaV1dID0gb2JqZWN0W2tleXNbaV1dXG4gICAgICB9XG4gICAgfVxuICAgIC8vIGZvciAoaSBpbiBvYmplY3QpIHtcbiAgICAvLyAgIGRlbGV0ZSBvYmplY3RbaV07XG4gICAgLy8gfVxuICAgIC8vIGZvciAoaSBpbiBfbmV3T3JkZXIpIHtcbiAgICAvLyAgIG9iamVjdFtpXSA9IF9uZXdPcmRlcltpXTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIF9uZXdPcmRlcjtcbiAgfSxcbiAgc29ydEJ5OiBfLnNvcnRCeSxcbiAgZGVmYXVsdHM6IF8uZGVmYXVsdHMsXG4gIHdoZXJlOiBfLndoZXJlLFxuICBmaW5kV2hlcmU6IF8uZmluZFdoZXJlLFxuICBmaWx0ZXI6IF8uZmlsdGVyLFxuICBwaWNrOiBfLnBpY2ssXG4gIGV4dGVuZDogZnVuY3Rpb24gKGRlc3RpbmF0aW9uKSB7XG4gICAgLy8gSlNjcmlwdCBEb250RW51bSBidWcgaXMgbm90IHRha2VuIGNhcmUgb2ZcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9ICB1dGlscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC9vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIlBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlWVlJHTFRnaUlITjBZVzVrWVd4dmJtVTlJbTV2SWo4K0Nqd2hMUzBnUTNKbFlYUmxaQ0IzYVhSb0lFbHVhM05qWVhCbElDaG9kSFJ3T2k4dmQzZDNMbWx1YTNOallYQmxMbTl5Wnk4cElDMHRQZ284YzNabkNpQWdJQ0I0Yld4dWN6cHBibXR6WTJGd1pUMGlhSFIwY0RvdkwzZDNkeTVwYm10elkyRndaUzV2Y21jdmJtRnRaWE53WVdObGN5OXBibXR6WTJGd1pTSUtJQ0FnSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJS0lDQWdJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SUtJQ0FnSUhodGJHNXpPbk52Wkdsd2IyUnBQU0pvZEhSd09pOHZjMjlrYVhCdlpHa3VjMjkxY21ObFptOXlaMlV1Ym1WMEwwUlVSQzl6YjJScGNHOWthUzB3TG1SMFpDSUtJQ0FnSUhodGJHNXpPbU5qUFNKb2RIUndPaTh2WTNKbFlYUnBkbVZqYjIxdGIyNXpMbTl5Wnk5dWN5TWlDaUFnSUNCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlLSUNBZ0lIaHRiRzV6T21SalBTSm9kSFJ3T2k4dmNIVnliQzV2Y21jdlpHTXZaV3hsYldWdWRITXZNUzR4THlJS0lDQWdJSGh0Ykc1ek9uTjJaejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpQ2lBZ0lDQjRiV3h1Y3pwdWN6RTlJbWgwZEhBNkx5OXpiM3BwTG1KaGFXVnliM1ZuWlM1bWNpSUtJQ0FnSUdsa1BTSnpkbWMwT0RnNElnb2dJQ0FnYzI5a2FYQnZaR2s2Wkc5amJtRnRaVDBpZDJGeWJtbHVaMTlpZFhSMGIyNHVjM1puSWdvZ0lDQWdkbWxsZDBKdmVEMGlNQ0F3SURRd01DQTBNREFpQ2lBZ0lDQjJaWEp6YVc5dVBTSXhMakVpQ2lBZ0lDQnBibXR6WTJGd1pUcDJaWEp6YVc5dVBTSXdMalE0TGpBZ2NqazJOVFFpQ2lBZ1Bnb2dJRHhrWldaekNpQWdJQ0FnSUdsa1BTSmtaV1p6TkRnNU1DSUtJQ0FnSUQ0S0lDQWdJRHhzYVc1bFlYSkhjbUZrYVdWdWRBb2dJQ0FnSUNBZ0lHbGtQU0pzYVc1bFlYSkhjbUZrYVdWdWREZzBNVEVpQ2lBZ0lDQWdJQ0FnZVRJOUlqTTJOeTQ0T0NJS0lDQWdJQ0FnSUNCbmNtRmthV1Z1ZEZWdWFYUnpQU0oxYzJWeVUzQmhZMlZQYmxWelpTSUtJQ0FnSUNBZ0lDQjVNVDBpTWpnM0xqUTVJZ29nSUNBZ0lDQWdJSGd5UFNJek1UVXVORGNpQ2lBZ0lDQWdJQ0FnZURFOUlqSTBNUzQwTVNJS0lDQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyeHNaV04wUFNKaGJIZGhlWE1pQ2lBZ0lDQWdJRDRLSUNBZ0lDQWdQSE4wYjNBS0lDQWdJQ0FnSUNBZ0lHbGtQU0p6ZEc5d05ERTFPQ0lLSUNBZ0lDQWdJQ0FnSUhOMGVXeGxQU0p6ZEc5d0xXTnZiRzl5T2lObVptWm1abVlpQ2lBZ0lDQWdJQ0FnSUNCdlptWnpaWFE5SWpBaUNpQWdJQ0FnSUM4K0NpQWdJQ0FnSUR4emRHOXdDaUFnSUNBZ0lDQWdJQ0JwWkQwaWMzUnZjRFF4TmpBaUNpQWdJQ0FnSUNBZ0lDQnpkSGxzWlQwaWMzUnZjQzFqYjJ4dmNqb2pabVptWm1abU8zTjBiM0F0YjNCaFkybDBlVG93SWdvZ0lDQWdJQ0FnSUNBZ2IyWm1jMlYwUFNJeElnb2dJQ0FnSUNBdlBnb2dJQ0FnUEM5c2FXNWxZWEpIY21Ga2FXVnVkQW9nSUNBZ1Bnb2dJQ0FnUEdacGJIUmxjZ29nSUNBZ0lDQWdJR2xrUFNKbWFXeDBaWEkyTVRJMklnb2dJQ0FnSUNBZ0lHTnZiRzl5TFdsdWRHVnljRzlzWVhScGIyNHRabWxzZEdWeWN6MGljMUpIUWlJS0lDQWdJQ0FnSUNCcGJtdHpZMkZ3WlRwamIyeHNaV04wUFNKaGJIZGhlWE1pQ2lBZ0lDQWdJRDRLSUNBZ0lDQWdQR1psUjJGMWMzTnBZVzVDYkhWeUNpQWdJQ0FnSUNBZ0lDQnBaRDBpWm1WSFlYVnpjMmxoYmtKc2RYSTJNVEk0SWdvZ0lDQWdJQ0FnSUNBZ2MzUmtSR1YyYVdGMGFXOXVQU0l3TGpVek1ETTFOekV6SWdvZ0lDQWdJQ0FnSUNBZ2FXNXJjMk5oY0dVNlkyOXNiR1ZqZEQwaVlXeDNZWGx6SWdvZ0lDQWdJQ0F2UGdvZ0lDQWdQQzltYVd4MFpYSUtJQ0FnSUQ0S0lDQWdJRHhzYVc1bFlYSkhjbUZrYVdWdWRBb2dJQ0FnSUNBZ0lHbGtQU0pzYVc1bFlYSkhjbUZrYVdWdWREZzBNVE1pQ2lBZ0lDQWdJQ0FnZVRJOUlqTTVNUzQwTlNJS0lDQWdJQ0FnSUNCbmNtRmthV1Z1ZEZWdWFYUnpQU0oxYzJWeVUzQmhZMlZQYmxWelpTSUtJQ0FnSUNBZ0lDQjVNVDBpTXpBd0xqZzJJZ29nSUNBZ0lDQWdJSGd5UFNJek5ESWlDaUFnSUNBZ0lDQWdlREU5SWpJM05TNDJNU0lLSUNBZ0lDQWdJQ0JwYm10elkyRndaVHBqYjJ4c1pXTjBQU0poYkhkaGVYTWlDaUFnSUNBZ0lENEtJQ0FnSUNBZ1BITjBiM0FLSUNBZ0lDQWdJQ0FnSUdsa1BTSnpkRzl3TnpJd01TSUtJQ0FnSUNBZ0lDQWdJSE4wZVd4bFBTSnpkRzl3TFdOdmJHOXlPaU0xTlRBd01EQWlDaUFnSUNBZ0lDQWdJQ0J2Wm1aelpYUTlJakFpQ2lBZ0lDQWdJQzgrQ2lBZ0lDQWdJRHh6ZEc5d0NpQWdJQ0FnSUNBZ0lDQnBaRDBpYzNSdmNEY3lNRE1pQ2lBZ0lDQWdJQ0FnSUNCemRIbHNaVDBpYzNSdmNDMWpiMnh2Y2pvalptWXdNREF3SWdvZ0lDQWdJQ0FnSUNBZ2IyWm1jMlYwUFNJeElnb2dJQ0FnSUNBdlBnb2dJQ0FnUEM5c2FXNWxZWEpIY21Ga2FXVnVkQW9nSUNBZ1Bnb2dJQ0FnUEhKaFpHbGhiRWR5WVdScFpXNTBDaUFnSUNBZ0lDQWdhV1E5SW5KaFpHbGhiRWR5WVdScFpXNTBPRFF4TlNJS0lDQWdJQ0FnSUNCbmNtRmthV1Z1ZEZWdWFYUnpQU0oxYzJWeVUzQmhZMlZQYmxWelpTSUtJQ0FnSUNBZ0lDQmplRDBpTXpFeUxqYzRJZ29nSUNBZ0lDQWdJR041UFNJek9EWXVOVGNpQ2lBZ0lDQWdJQ0FnY2owaU5UTXVNRE0ySWdvZ0lDQWdJQ0FnSUdkeVlXUnBaVzUwVkhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTFM0MU9UTXlOeUF0TGpVNU16STNJQzQzTVRVd05TQXRMamN4TlRBMUlESTBNeTR5TnlBNE5Ea3VNRE1wSWdvZ0lDQWdJQ0FnSUdsdWEzTmpZWEJsT21OdmJHeGxZM1E5SW1Gc2QyRjVjeUlLSUNBZ0lDQWdQZ29nSUNBZ0lDQThjM1J2Y0FvZ0lDQWdJQ0FnSUNBZ2FXUTlJbk4wYjNBM01URXpMVGNpQ2lBZ0lDQWdJQ0FnSUNCemRIbHNaVDBpYzNSdmNDMWpiMnh2Y2pvalptWm1abVptTzNOMGIzQXRiM0JoWTJsMGVUb3VOREE0TVRZaUNpQWdJQ0FnSUNBZ0lDQnZabVp6WlhROUlqQWlDaUFnSUNBZ0lDOCtDaUFnSUNBZ0lEeHpkRzl3Q2lBZ0lDQWdJQ0FnSUNCcFpEMGljM1J2Y0RjeE1UVXROeUlLSUNBZ0lDQWdJQ0FnSUhOMGVXeGxQU0p6ZEc5d0xXTnZiRzl5T2lObVptWm1abVk3YzNSdmNDMXZjR0ZqYVhSNU9qQWlDaUFnSUNBZ0lDQWdJQ0J2Wm1aelpYUTlJakVpQ2lBZ0lDQWdJQzgrQ2lBZ0lDQThMM0poWkdsaGJFZHlZV1JwWlc1MENpQWdJQ0ErQ2lBZ0lDQThiR2x1WldGeVIzSmhaR2xsYm5RS0lDQWdJQ0FnSUNCcFpEMGliR2x1WldGeVIzSmhaR2xsYm5ReE1EUTBPU0lLSUNBZ0lDQWdJQ0I1TWowaU16TTRMamd5SWdvZ0lDQWdJQ0FnSUdkeVlXUnBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElnb2dJQ0FnSUNBZ0lIa3hQU0l5T0RZdU5qY2lDaUFnSUNBZ0lDQWdaM0poWkdsbGJuUlVjbUZ1YzJadmNtMDlJbTFoZEhKcGVDZ3VPVFUxTXpRZ01DQXdJQzQ1TlRVek5DQXhNell1TVRJZ01UUXVNRFUxS1NJS0lDQWdJQ0FnSUNCNE1qMGlNekF3TGpJM0lnb2dJQ0FnSUNBZ0lIZ3hQU0l5TlRVdU16SWlDaUFnSUNBZ0lDQWdhVzVyYzJOaGNHVTZZMjlzYkdWamREMGlZV3gzWVhseklnb2dJQ0FnSUNBK0NpQWdJQ0FnSUR4emRHOXdDaUFnSUNBZ0lDQWdJQ0JwWkQwaWMzUnZjRFF4TlRBaUNpQWdJQ0FnSUNBZ0lDQnpkSGxzWlQwaWMzUnZjQzFqYjJ4dmNqb2pabVptWm1abUlnb2dJQ0FnSUNBZ0lDQWdiMlptYzJWMFBTSXdJZ29nSUNBZ0lDQXZQZ29nSUNBZ0lDQThjM1J2Y0FvZ0lDQWdJQ0FnSUNBZ2FXUTlJbk4wYjNBME1UVXlJZ29nSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbk4wYjNBdFkyOXNiM0k2STJabVptWm1aanR6ZEc5d0xXOXdZV05wZEhrNk1DSUtJQ0FnSUNBZ0lDQWdJRzltWm5ObGREMGlNU0lLSUNBZ0lDQWdMejRLSUNBZ0lEd3ZiR2x1WldGeVIzSmhaR2xsYm5RS0lDQWdJRDRLSUNBZ0lEeG1hV3gwWlhJS0lDQWdJQ0FnSUNCcFpEMGlabWxzZEdWeU1URTBNamdpQ2lBZ0lDQWdJQ0FnWTI5c2IzSXRhVzUwWlhKd2IyeGhkR2x2YmkxbWFXeDBaWEp6UFNKelVrZENJZ29nSUNBZ0lDQWdJR2x1YTNOallYQmxPbU52Ykd4bFkzUTlJbUZzZDJGNWN5SUtJQ0FnSUNBZ1Bnb2dJQ0FnSUNBOFptVkhZWFZ6YzJsaGJrSnNkWElLSUNBZ0lDQWdJQ0FnSUdsa1BTSm1aVWRoZFhOemFXRnVRbXgxY2pFeE5ETXdJZ29nSUNBZ0lDQWdJQ0FnYzNSa1JHVjJhV0YwYVc5dVBTSXhMakkwTXpRMk56Z2lDaUFnSUNBZ0lDQWdJQ0JwYm10elkyRndaVHBqYjJ4c1pXTjBQU0poYkhkaGVYTWlDaUFnSUNBZ0lDOCtDaUFnSUNBOEwyWnBiSFJsY2dvZ0lDQWdQZ29nSUR3dlpHVm1jd29nSUQ0S0lDQThjMjlrYVhCdlpHazZibUZ0WldSMmFXVjNDaUFnSUNBZ0lHbGtQU0ppWVhObElnb2dJQ0FnSUNCaWIzSmtaWEpqYjJ4dmNqMGlJelkyTmpZMk5pSUtJQ0FnSUNBZ2FXNXJjMk5oY0dVNmNHRm5aWE5vWVdSdmR6MGlNaUlLSUNBZ0lDQWdhVzVyYzJOaGNHVTZkMmx1Wkc5M0xYazlJaTA0SWdvZ0lDQWdJQ0J3WVdkbFkyOXNiM0k5SWlObVptWm1abVlpQ2lBZ0lDQWdJR2x1YTNOallYQmxPbmRwYm1SdmR5MW9aV2xuYUhROUlqazRPQ0lLSUNBZ0lDQWdhVzVyYzJOaGNHVTZkMmx1Wkc5M0xXMWhlR2x0YVhwbFpEMGlNU0lLSUNBZ0lDQWdhVzVyYzJOaGNHVTZlbTl2YlQwaU1DNDNNRGN4TURZM09DSUtJQ0FnSUNBZ2FXNXJjMk5oY0dVNmQybHVaRzkzTFhnOUlpMDRJZ29nSUNBZ0lDQnphRzkzWjNKcFpEMGlabUZzYzJVaUNpQWdJQ0FnSUdKdmNtUmxjbTl3WVdOcGRIazlJakV1TUNJS0lDQWdJQ0FnYVc1cmMyTmhjR1U2WTNWeWNtVnVkQzFzWVhsbGNqMGliR0Y1WlhJeElnb2dJQ0FnSUNCcGJtdHpZMkZ3WlRwamVEMGlNekEwTGpnNU5EQTVJZ29nSUNBZ0lDQnBibXR6WTJGd1pUcGplVDBpTXpReExqVXlNVGcySWdvZ0lDQWdJQ0JwYm10elkyRndaVHAzYVc1a2IzY3RkMmxrZEdnOUlqRTJPREFpQ2lBZ0lDQWdJR2x1YTNOallYQmxPbkJoWjJWdmNHRmphWFI1UFNJd0xqQWlDaUFnSUNBZ0lHbHVhM05qWVhCbE9tUnZZM1Z0Wlc1MExYVnVhWFJ6UFNKd2VDSUtJQ0F2UGdvZ0lEeG5DaUFnSUNBZ0lHbGtQU0pzWVhsbGNqRWlDaUFnSUNBZ0lHbHVhM05qWVhCbE9teGhZbVZzUFNKTVlYbGxjaUF4SWdvZ0lDQWdJQ0JwYm10elkyRndaVHBuY205MWNHMXZaR1U5SW14aGVXVnlJZ29nSUNBZ0lDQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d3SUMwMk5USXVNellwSWdvZ0lDQWdQZ29nSUNBZ1BHY0tJQ0FnSUNBZ0lDQnBaRDBpWnpFeE5ETXlJZ29nSUNBZ0lDQWdJR2x1YTNOallYQmxPbVY0Y0c5eWRDMTVaSEJwUFNJNU1DSUtJQ0FnSUNBZ0lDQnBibXR6WTJGd1pUcGxlSEJ2Y25RdGVHUndhVDBpT1RBaUNpQWdJQ0FnSUNBZ2RISmhibk5tYjNKdFBTSnRZWFJ5YVhnb01pNDVNRFV4SURBZ01DQXlMamt3TlRFZ0xURXdNREV1T1NBdE56Z3VPVFl4S1NJS0lDQWdJQ0FnUGdvZ0lDQWdJQ0E4Y0dGMGFBb2dJQ0FnSUNBZ0lDQWdhV1E5SW5CaGRHZzNNamMySWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNmNuZzlJalV6TGpBek5UY3hNeUlLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNVBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGlabWxzYkRvak9UazVPVGs1SWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNmRIbHdaVDBpWVhKaklnb2dJQ0FnSUNBZ0lDQWdaRDBpYlRNMU5pNDNPU0F6TkRZdU1URmpNQ0F5T1M0eU9URXRNak11TnpRMUlEVXpMakF6TmkwMU15NHdNellnTlRNdU1ETTJjeTAxTXk0d016WXRNak11TnpRMUxUVXpMakF6TmkwMU15NHdNellnTWpNdU56UTFMVFV6TGpBek5pQTFNeTR3TXpZdE5UTXVNRE0ySURVekxqQXpOaUF5TXk0M05EVWdOVE11TURNMklEVXpMakF6Tm5vaUNpQWdJQ0FnSUNBZ0lDQjBjbUZ1YzJadmNtMDlJbTFoZEhKcGVDZ3VPVGN6TlRRZ01DQXdJQzQ1TnpNMU5DQXhNakF1TURrZ0xURXlMall5T0NraUNpQWdJQ0FnSUNBZ0lDQnpiMlJwY0c5a2FUcGplVDBpTXpRMkxqRXhNakU0SWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNlkzZzlJak13TXk0M05TSUtJQ0FnSUNBZ0x6NEtJQ0FnSUNBZ1BIQmhkR2dLSUNBZ0lDQWdJQ0FnSUdsa1BTSndZWFJvTnpJM09DSUtJQ0FnSUNBZ0lDQWdJSE52Wkdsd2IyUnBPbko0UFNJMU15NHdNelUzTVRNaUNpQWdJQ0FnSUNBZ0lDQnpiMlJwY0c5a2FUcHllVDBpTlRNdU1ETTFOekV6SWdvZ0lDQWdJQ0FnSUNBZ2MzUjViR1U5SW1acGJHdzZkWEpzS0NOc2FXNWxZWEpIY21Ga2FXVnVkRGcwTVRFcElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZkSGx3WlQwaVlYSmpJZ29nSUNBZ0lDQWdJQ0FnWkQwaWJUTTFOaTQzT1NBek5EWXVNVEZqTUNBeU9TNHlPVEV0TWpNdU56UTFJRFV6TGpBek5pMDFNeTR3TXpZZ05UTXVNRE0yY3kwMU15NHdNell0TWpNdU56UTFMVFV6TGpBek5pMDFNeTR3TXpZZ01qTXVOelExTFRVekxqQXpOaUExTXk0d016WXROVE11TURNMklEVXpMakF6TmlBeU15NDNORFVnTlRNdU1ETTJJRFV6TGpBek5ub2lDaUFnSUNBZ0lDQWdJQ0IwY21GdWMyWnZjbTA5SW0xaGRISnBlQ2d1T1RVNU5qQWdNQ0F3SUM0NU5UazJNQ0F4TWpRdU16TWdMVGN1T0RBeE5Da2lDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHBqZVQwaU16UTJMakV4TWpFNElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZZM2c5SWpNd015NDNOU0lLSUNBZ0lDQWdMejRLSUNBZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUNBZ0lHbGtQU0p3WVhSb056STRNQ0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNFBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHB5ZVQwaU5UTXVNRE0xTnpFeklnb2dJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiSFJsY2pwMWNtd29JMlpwYkhSbGNqWXhNallwTzJacGJHdzZJMlZqWldObFl5SUtJQ0FnSUNBZ0lDQWdJSE52Wkdsd2IyUnBPblI1Y0dVOUltRnlZeUlLSUNBZ0lDQWdJQ0FnSUdROUltMHpOVFl1TnprZ016UTJMakV4WXpBZ01qa3VNamt4TFRJekxqYzBOU0ExTXk0d016WXROVE11TURNMklEVXpMakF6Tm5NdE5UTXVNRE0yTFRJekxqYzBOUzAxTXk0d016WXROVE11TURNMklESXpMamMwTlMwMU15NHdNellnTlRNdU1ETTJMVFV6TGpBek5pQTFNeTR3TXpZZ01qTXVOelExSURVekxqQXpOaUExTXk0d016WjZJZ29nSUNBZ0lDQWdJQ0FnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTGpnM016VTFJREFnTUNBdU9EY3pOVFVnTVRVd0xqUTNJREl4TGprNE1Ta2lDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHBqZVQwaU16UTJMakV4TWpFNElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZZM2c5SWpNd015NDNOU0lLSUNBZ0lDQWdMejRLSUNBZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUNBZ0lHbGtQU0p3WVhSb056STRNaUlLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNFBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHB5ZVQwaU5UTXVNRE0xTnpFeklnb2dJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiSFJsY2pwMWNtd29JMlpwYkhSbGNqWXhNallwTzJacGJHdzZJems1T1RrNU9TSUtJQ0FnSUNBZ0lDQWdJSE52Wkdsd2IyUnBPblI1Y0dVOUltRnlZeUlLSUNBZ0lDQWdJQ0FnSUdROUltMHpOVFl1TnprZ016UTJMakV4WXpBZ01qa3VNamt4TFRJekxqYzBOU0ExTXk0d016WXROVE11TURNMklEVXpMakF6Tm5NdE5UTXVNRE0yTFRJekxqYzBOUzAxTXk0d016WXROVE11TURNMklESXpMamMwTlMwMU15NHdNellnTlRNdU1ETTJMVFV6TGpBek5pQTFNeTR3TXpZZ01qTXVOelExSURVekxqQXpOaUExTXk0d016WjZJZ29nSUNBZ0lDQWdJQ0FnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTGpnek9ETTRJREFnTUNBdU9ETTRNemdnTVRZeExqRTFJRE0wTGpFMU1pa2lDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHBqZVQwaU16UTJMakV4TWpFNElnb2dJQ0FnSUNBZ0lDQWdjMjlrYVhCdlpHazZZM2c5SWpNd015NDNOU0lLSUNBZ0lDQWdMejRLSUNBZ0lDQWdQSEJoZEdnS0lDQWdJQ0FnSUNBZ0lHbGtQU0p3WVhSb056STROQ0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNFBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHB5ZVQwaU5UTXVNRE0xTnpFeklnb2dJQ0FnSUNBZ0lDQWdjM1I1YkdVOUltWnBiR3c2ZFhKc0tDTnNhVzVsWVhKSGNtRmthV1Z1ZERnME1UTXBJZ29nSUNBZ0lDQWdJQ0FnYzI5a2FYQnZaR2s2ZEhsd1pUMGlZWEpqSWdvZ0lDQWdJQ0FnSUNBZ1pEMGliVE0xTmk0M09TQXpORFl1TVRGak1DQXlPUzR5T1RFdE1qTXVOelExSURVekxqQXpOaTAxTXk0d016WWdOVE11TURNMmN5MDFNeTR3TXpZdE1qTXVOelExTFRVekxqQXpOaTAxTXk0d016WWdNak11TnpRMUxUVXpMakF6TmlBMU15NHdNell0TlRNdU1ETTJJRFV6TGpBek5pQXlNeTQzTkRVZ05UTXVNRE0ySURVekxqQXpObm9pQ2lBZ0lDQWdJQ0FnSUNCMGNtRnVjMlp2Y20wOUltMWhkSEpwZUNndU9EQTFPRGNnTUNBd0lDNDRNRFU0TnlBeE56RXVNRE1nTkRVdU5EQTFLU0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT21ONVBTSXpORFl1TVRFeU1UZ2lDaUFnSUNBZ0lDQWdJQ0J6YjJScGNHOWthVHBqZUQwaU16QXpMamMxSWdvZ0lDQWdJQ0F2UGdvZ0lDQWdJQ0E4Y0dGMGFBb2dJQ0FnSUNBZ0lDQWdhV1E5SW5CaGRHZzNNamcySWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNmNuZzlJalV6TGpBek5UY3hNeUlLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT25KNVBTSTFNeTR3TXpVM01UTWlDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGlabWxzYkRwMWNtd29JM0poWkdsaGJFZHlZV1JwWlc1ME9EUXhOU2tpQ2lBZ0lDQWdJQ0FnSUNCemIyUnBjRzlrYVRwMGVYQmxQU0poY21NaUNpQWdJQ0FnSUNBZ0lDQmtQU0p0TXpVMkxqYzVJRE0wTmk0eE1XTXdJREk1TGpJNU1TMHlNeTQzTkRVZ05UTXVNRE0yTFRVekxqQXpOaUExTXk0d016WnpMVFV6TGpBek5pMHlNeTQzTkRVdE5UTXVNRE0yTFRVekxqQXpOaUF5TXk0M05EVXROVE11TURNMklEVXpMakF6TmkwMU15NHdNellnTlRNdU1ETTJJREl6TGpjME5TQTFNeTR3TXpZZ05UTXVNRE0yZWlJS0lDQWdJQ0FnSUNBZ0lIUnlZVzV6Wm05eWJUMGliV0YwY21sNEtDNDNOVGd5TlNBd0lEQWdMamMxT0RJMUlERTROaTQzTlNBMk15NDVNRFlwSWdvZ0lDQWdJQ0FnSUNBZ2MyOWthWEJ2WkdrNlkzazlJak0wTmk0eE1USXhPQ0lLSUNBZ0lDQWdJQ0FnSUhOdlpHbHdiMlJwT21ONFBTSXpNRE11TnpVaUNpQWdJQ0FnSUM4K0NpQWdJQ0FnSUR4d1lYUm9DaUFnSUNBZ0lDQWdJQ0JwWkQwaWNHRjBhRGN5T0RnaUNpQWdJQ0FnSUNBZ0lDQnpkSGxzWlQwaWIzQmhZMmwwZVRvdU16RTNOekU3Wm1sc2JEcDFjbXdvSTJ4cGJtVmhja2R5WVdScFpXNTBNVEEwTkRrcElnb2dJQ0FnSUNBZ0lDQWdhVzVyYzJOaGNHVTZZMjl1Ym1WamRHOXlMV04xY25aaGRIVnlaVDBpTUNJS0lDQWdJQ0FnSUNBZ0lHUTlJbTAwTVRRdU9DQXlPRFF1TVRWakxURXpMak16TVNBd0xqTXdNRFk1TFRJMkxqRTROaUEzTGpNMU9DMHpNeTR6TXpZZ01Ua3VOelF5TFRjdU5qa3dNeUF4TXk0ek1pMDJMamN4TXprZ01qa3VNalkySURFdU1UVTBOU0EwTVM0ek16RWdNQzQ0TlRNd05pMHlOaTQxTXpJZ01qRXVNVE15TFRRMkxqVXhOU0EwTmk0ek1qUXRORFV1TURVMElEZ3VNalU0T1NBd0xqUTNPVEEzSURFMkxqQTFOQ0F6TGpJd01ERWdNakl1T0RVNUlEY3VOVGt3T0MwekxqSTFOemd0Tnk0ME5EazRMVGd1T0RFM01TMHhNeTQ1TlRNdE1UWXVNemswTFRFNExqTXlOeTAyTGpRNE5qY3RNeTQzTkRVeExURXpMall5TlMwMUxqUXpPVE10TWpBdU5qQTRMVFV1TWpneE9Ib2lDaUFnSUNBZ0lDOCtDaUFnSUNBZ0lEeHdZWFJvQ2lBZ0lDQWdJQ0FnSUNCcFpEMGljbVZqZERjek56QWlDaUFnSUNBZ0lDQWdJQ0JrUFNKdE5EQXlMamc0SURNd01DNHdPUzB4TVM0MU9ERWdNVEV1TlRneElERXpMakk1TlNBeE15NHlPVFV0TVRNdU1qazFJREV6TGpJNE1TQXhNUzQxT0RFZ01URXVOVGd4SURFekxqSTRNUzB4TXk0eU9UVWdNVE11TWprMUlERXpMakk1TlNBeE1TNDFPREV0TVRFdU5UZ3hMVEV6TGpJNE1TMHhNeTR5T0RFZ01UTXVNamd4TFRFekxqSTVOUzB4TVM0MU9ERXRNVEV1TlRneExURXpMakk1TlNBeE15NHlPREV0TVRNdU1qZ3hMVEV6TGpJNE1Yb2lDaUFnSUNBZ0lDQWdJQ0J6ZEhsc1pUMGlabWxzZEdWeU9uVnliQ2dqWm1sc2RHVnlNVEUwTWpncE8yWnBiR3c2SXpGaE1XRXhZU0lLSUNBZ0lDQWdJQ0FnSUdsdWEzTmpZWEJsT21OdmJtNWxZM1J2Y2kxamRYSjJZWFIxY21VOUlqQWlDaUFnSUNBZ0lDOCtDaUFnSUNBZ0lEeHdZWFJvQ2lBZ0lDQWdJQ0FnSUNCcFpEMGljR0YwYURFd05EVTNJZ29nSUNBZ0lDQWdJQ0FnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmlJS0lDQWdJQ0FnSUNBZ0lHbHVhM05qWVhCbE9tTnZibTVsWTNSdmNpMWpkWEoyWVhSMWNtVTlJakFpQ2lBZ0lDQWdJQ0FnSUNCa1BTSnROREF6TGpRMUlETXdNUzR4TlMweE1TNHdPRGNnTVRFdU1EZzNJREV5TGpjeU9DQXhNaTQzTWpndE1USXVOekk0SURFeUxqY3hOQ0F4TVM0d09EY2dNVEV1TURnM0lERXlMamN4TkMweE1pNDNNamdnTVRJdU56STRJREV5TGpjeU9DQXhNUzR3T0RjdE1URXVNRGczTFRFeUxqY3hOQzB4TWk0M01UUWdNVEl1TnpFMExURXlMamN5T0MweE1TNHdPRGN0TVRFdU1EZzNMVEV5TGpjeU9DQXhNaTQzTVRRdE1USXVOekUwTFRFeUxqY3hOSG9pQ2lBZ0lDQWdJQzgrQ2lBZ0lDQThMMmNLSUNBZ0lENEtJQ0E4TDJjS0lDQStDaUFnUEcxbGRHRmtZWFJoQ2lBZ0lDQStDaUFnSUNBOGNtUm1PbEpFUmdvZ0lDQWdJQ0ErQ2lBZ0lDQWdJRHhqWXpwWGIzSnJDaUFnSUNBZ0lDQWdQZ29nSUNBZ0lDQWdJRHhrWXpwbWIzSnRZWFFLSUNBZ0lDQWdJQ0FnSUQ1cGJXRm5aUzl6ZG1jcmVHMXNQQzlrWXpwbWIzSnRZWFFLSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnUEdSak9uUjVjR1VLSUNBZ0lDQWdJQ0FnSUNBZ2NtUm1PbkpsYzI5MWNtTmxQU0pvZEhSd09pOHZjSFZ5YkM1dmNtY3ZaR012WkdOdGFYUjVjR1V2VTNScGJHeEpiV0ZuWlNJS0lDQWdJQ0FnSUNBdlBnb2dJQ0FnSUNBZ0lEeGpZenBzYVdObGJuTmxDaUFnSUNBZ0lDQWdJQ0FnSUhKa1pqcHlaWE52ZFhKalpUMGlhSFIwY0RvdkwyTnlaV0YwYVhabFkyOXRiVzl1Y3k1dmNtY3ZiR2xqWlc1elpYTXZjSFZpYkdsalpHOXRZV2x1THlJS0lDQWdJQ0FnSUNBdlBnb2dJQ0FnSUNBZ0lEeGtZenB3ZFdKc2FYTm9aWElLSUNBZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBZ0lEeGpZenBCWjJWdWRBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUhKa1pqcGhZbTkxZEQwaWFIUjBjRG92TDI5d1pXNWpiR2x3WVhKMExtOXlaeThpQ2lBZ0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJQ0FnUEdSak9uUnBkR3hsQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdQazl3Wlc1amJHbHdZWEowUEM5a1l6cDBhWFJzWlFvZ0lDQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdJQ0E4TDJOak9rRm5aVzUwQ2lBZ0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BDOWtZenB3ZFdKc2FYTm9aWElLSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnUEdSak9uUnBkR3hsQ2lBZ0lDQWdJQ0FnSUNBK1pYSnliM0lnWW5WMGRHOXVQQzlrWXpwMGFYUnNaUW9nSUNBZ0lDQWdJRDRLSUNBZ0lDQWdJQ0E4WkdNNlpHRjBaUW9nSUNBZ0lDQWdJQ0FnUGpJd01URXRNREl0TWpSVU1UYzZORFU2TkRVOEwyUmpPbVJoZEdVS0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BHUmpPbVJsYzJOeWFYQjBhVzl1Q2lBZ0lDQWdJQ0FnTHo0S0lDQWdJQ0FnSUNBOFpHTTZjMjkxY21ObENpQWdJQ0FnSUNBZ0lDQSthSFIwY0hNNkx5OXZjR1Z1WTJ4cGNHRnlkQzV2Y21jdlpHVjBZV2xzTHpFeU1qUXlOUzlsY25KdmNpMWlkWFIwYjI0dFlua3RjbWxqWVhKa2IyMWhhV0U4TDJSak9uTnZkWEpqWlFvZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBOFpHTTZZM0psWVhSdmNnb2dJQ0FnSUNBZ0lDQWdQZ29nSUNBZ0lDQWdJQ0FnUEdOak9rRm5aVzUwQ2lBZ0lDQWdJQ0FnSUNBZ0lENEtJQ0FnSUNBZ0lDQWdJQ0FnUEdSak9uUnBkR3hsQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdQbkpwWTJGeVpHOXRZV2xoUEM5a1l6cDBhWFJzWlFvZ0lDQWdJQ0FnSUNBZ0lDQStDaUFnSUNBZ0lDQWdJQ0E4TDJOak9rRm5aVzUwQ2lBZ0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ1BDOWtZenBqY21WaGRHOXlDaUFnSUNBZ0lDQWdQZ29nSUNBZ0lDQWdJRHhrWXpwemRXSnFaV04wQ2lBZ0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ0lDQThjbVJtT2tKaFp3b2dJQ0FnSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnSUNBZ0lEeHlaR1k2YkdrS0lDQWdJQ0FnSUNBZ0lDQWdJQ0ErWW5WMGRHOXVQQzl5WkdZNmJHa0tJQ0FnSUNBZ0lDQWdJQ0FnUGdvZ0lDQWdJQ0FnSUNBZ0lDQThjbVJtT214cENpQWdJQ0FnSUNBZ0lDQWdJQ0FnUG1OaGJtTmxiRHd2Y21SbU9teHBDaUFnSUNBZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBZ0lDQWdQSEprWmpwc2FRb2dJQ0FnSUNBZ0lDQWdJQ0FnSUQ1amFYSmpiR1U4TDNKa1pqcHNhUW9nSUNBZ0lDQWdJQ0FnSUNBK0NpQWdJQ0FnSUNBZ0lDQWdJRHh5WkdZNmJHa0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBK1pHVnNaWFJsUEM5eVpHWTZiR2tLSUNBZ0lDQWdJQ0FnSUNBZ1Bnb2dJQ0FnSUNBZ0lDQWdJQ0E4Y21SbU9teHBDaUFnSUNBZ0lDQWdJQ0FnSUNBZ1BuSmxaRHd2Y21SbU9teHBDaUFnSUNBZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBZ0lDQWdQSEprWmpwc2FRb2dJQ0FnSUNBZ0lDQWdJQ0FnSUQ1eWIzVnVaRHd2Y21SbU9teHBDaUFnSUNBZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnSUNBZ0lEd3ZjbVJtT2tKaFp3b2dJQ0FnSUNBZ0lDQWdQZ29nSUNBZ0lDQWdJRHd2WkdNNmMzVmlhbVZqZEFvZ0lDQWdJQ0FnSUQ0S0lDQWdJQ0FnUEM5all6cFhiM0pyQ2lBZ0lDQWdJRDRLSUNBZ0lDQWdQR05qT2t4cFkyVnVjMlVLSUNBZ0lDQWdJQ0FnSUhKa1pqcGhZbTkxZEQwaWFIUjBjRG92TDJOeVpXRjBhWFpsWTI5dGJXOXVjeTV2Y21jdmJHbGpaVzV6WlhNdmNIVmliR2xqWkc5dFlXbHVMeUlLSUNBZ0lDQWdJQ0ErQ2lBZ0lDQWdJQ0FnUEdOak9uQmxjbTFwZEhNS0lDQWdJQ0FnSUNBZ0lDQWdjbVJtT25KbGMyOTFjbU5sUFNKb2RIUndPaTh2WTNKbFlYUnBkbVZqYjIxdGIyNXpMbTl5Wnk5dWN5TlNaWEJ5YjJSMVkzUnBiMjRpQ2lBZ0lDQWdJQ0FnTHo0S0lDQWdJQ0FnSUNBOFkyTTZjR1Z5YldsMGN3b2dJQ0FnSUNBZ0lDQWdJQ0J5WkdZNmNtVnpiM1Z5WTJVOUltaDBkSEE2THk5amNtVmhkR2wyWldOdmJXMXZibk11YjNKbkwyNXpJMFJwYzNSeWFXSjFkR2x2YmlJS0lDQWdJQ0FnSUNBdlBnb2dJQ0FnSUNBZ0lEeGpZenB3WlhKdGFYUnpDaUFnSUNBZ0lDQWdJQ0FnSUhKa1pqcHlaWE52ZFhKalpUMGlhSFIwY0RvdkwyTnlaV0YwYVhabFkyOXRiVzl1Y3k1dmNtY3Zibk1qUkdWeWFYWmhkR2wyWlZkdmNtdHpJZ29nSUNBZ0lDQWdJQzgrQ2lBZ0lDQWdJRHd2WTJNNlRHbGpaVzV6WlFvZ0lDQWdJQ0ErQ2lBZ0lDQThMM0prWmpwU1JFWUtJQ0FnSUQ0S0lDQThMMjFsZEdGa1lYUmhDaUFnUGdvOEwzTjJad28rQ2c9PVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9iYXNlNjQtbG9hZGVyIS4vbWVkaWEvZXJyb3ItYnV0dG9uLnN2Z1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG52YXIgcGF0aCA9IHJlcXVpcmUoXCIuL3BhdGhcIik7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgb2JqZWN0ID0gcmVxdWlyZShcIi4vb2JqZWN0XCIpO1xuXG5mdW5jdGlvbiBpc1NlcnZlcigpIHtcbiAgcmV0dXJuICEgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KTtcbn1cblxuXG5pZiAoaXNTZXJ2ZXIoKSkge1xuICB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xufVxuXG5cbmZ1bmN0aW9uIF9sb2FkX2pzb24gKHZhbHVlLCBjYWxsYmFja19zdWNjZXNzLCBjYWxsYmFja19lcnJvcil7XG5cbiAgdmFyIG91dHB1dCA9IG51bGw7XG4gIHZhciBlcnJvcnMgPSBbXTtcblxuICBpZiAodmFsdWUuY29uc3RydWN0b3IgPT0gU3RyaW5nKSB7XG5cbiAgICB2YXIgZmlsZW5hbWUsIHJlZ2V4X2RhdGEsIGluaXRfcHJvcGVydHk7XG4gICAgcmVnZXhfZGF0YSA9IC9eKFteI10qKSM/KC4qKSQvLmV4ZWModmFsdWUpO1xuXG4gICAgZmlsZW5hbWUgPSByZWdleF9kYXRhWzFdO1xuICAgIGluaXRfcHJvcGVydHkgPSByZWdleF9kYXRhWzJdO1xuICAgIHV0aWxzLmdldElubGluZUpzb24oZmlsZW5hbWUsIFwianNvblwiLCBfbG9hZEpzb25fZGF0YSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBlcnJvcnMucHVzaChlcnJvcik7XG4gICAgICBpZiAoY2FsbGJhY2tfZXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2tfZXJyb3IoZXJyb3IpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiZmlsZTogXFxcIlwiICsgZmlsZW5hbWUgKyBcIlxcXCIuIFwiICsgZXJyb3IubWVzc2FnZSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBfbG9hZEpzb25fZGF0YSh2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEpzb25fZGF0YShkYXRhKSB7XG4gICAgLypcbiAgICAg0LfQsNC80LXQvdCwINC30LDQv9C40YHQtdC5IFwidXJsKC4vcGF0aC90by9maWxlKSAg0L3QsCBcIi4uLy4uL3BhdGgvdG8vZmlsZVwiXG4gICAgIHVybCDQvdCw0YfQuNC90LDRjtGJ0LjQtdGB0Y8g0YEgLi8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INGA0L7QtNC40YLQtdC70YzQutC+0LPQviBqc29uINGE0LDQudC70LBcblxuICAgICB1cmwg0YEgXCIvXCIg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyBBUFBfU1RBVElDX1BBVEhcbiAgICAgKi9cbiAgICB1dGlscy5yZWNvdXJzaXZlKGRhdGEsXG4gICAgICBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlLCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKC9edXJsXFwoLipcXCkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgIHZhciByZWdleF9kYXRhID0gL151cmxcXCgoXFwuP1xcLyk/KC4qKVxcKSQvLmV4ZWModmFsdWUpO1xuICAgICAgICAgIHZhciB1cmwgPSByZWdleF9kYXRhWzJdO1xuXG4gICAgICAgICAgaWYgKHJlZ2V4X2RhdGFbMV0gPT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHVybCA9IHdpbmRvdy5BUFBfU1RBVElDX1BBVEggKyB1cmw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZWdleF9kYXRhWzFdID09IFwiLi9cIikge1xuICAgICAgICAgICAgdXJsID0gcGF0aC5nZXRQYXJlbnREaXJlY3RvcnlVcmwoZmlsZW5hbWUpICsgdXJsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcmVudFtwcm9wZXJ0eV0gPSBwYXRoLnJlc29sdmUodXJsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cblxuICAgIHZhciBsb2FkZXIgPSB1dGlsLnF1ZXVlTG9hZCgxLCBmdW5jdGlvbiBmaW5hbGl6ZSgpIHtcblxuICAgICAgaWYgKGluaXRfcHJvcGVydHkpIHtcbiAgICAgICAgdmFyIHByb3BfYXJyID0gaW5pdF9wcm9wZXJ0eS5zcGxpdChcIi9cIik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkYXRhID0gZGF0YVtwcm9wX2FycltpXV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrX2Vycm9yKSBjYWxsYmFja19lcnJvcihlcnJvcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrX3N1Y2Nlc3MpIGNhbGxiYWNrX3N1Y2Nlc3MoZGF0YSk7XG4gICAgICAgIG91dHB1dCA9IGRhdGE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgY29tbWVudHNcbiAgICAgKi9cbiAgICB1dGlscy5yZWNvdXJzaXZlKGRhdGEsIGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUsIHBhcmVudCkge1xuICAgICAgLypcbiAgICAgICByZW1vdmUgY29tbWVudHMgbGlrZVxuICAgICAgIFtcIkBjb21tZW50KClcIl1cbiAgICAgICBcIkBjb21tZW50XCI6IHt9XG4gICAgICAgKi9cbiAgICAgIGlmICgvXlxcL1xcLy4qJC8udGVzdCh2YWx1ZSkgfHwgL15AY29tbWVudFxcKC4qXFwpJC8udGVzdCh2YWx1ZSkgfHwgcHJvcGVydHkgPT0gXCJAY29tbWVudFwiKSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29uc3RydWN0b3IgPT0gQXJyYXkpIHtcbiAgICAgICAgICBwYXJlbnQuc3BsaWNlKHByb3BlcnR5LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgcGFyZW50W3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgvXkBleHRlbmQuKiQvLnRlc3QocHJvcGVydHkpKSB7XG5cbiAgICAgICAgbG9hZGVyLnRvdGFsKys7XG4gICAgICAgIF9sb2FkX2pzb24odmFsdWUsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdmFyIGV4dF9kYXRhID0gb2JqZWN0LmRlZXBFeHRlbmQoZGF0YSwgcGFyZW50KTtcbiAgICAgICAgICBvYmplY3QuZGVlcEV4dGVuZChwYXJlbnQsIGV4dF9kYXRhKTtcbiAgICAgICAgICBkZWxldGUgcGFyZW50W1wiQGV4dGVuZFwiXTtcbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEsIGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoL15AZXh0ZW5kXFwoLipcXCkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YXIgX3JlZ19kYXRhID0gL15AZXh0ZW5kXFwoKFxcLlxcLyk/KC4qKVxcKSQvLmV4ZWModmFsdWUpO1xuICAgICAgICB2YXIgdXJsID0gX3JlZ19kYXRhWzJdO1xuICAgICAgICBpZiAoX3JlZ19kYXRhWzFdKSB7XG4gICAgICAgICAgdXJsID0gcGF0aC5nZXRQYXJlbnREaXJlY3RvcnlVcmwoZmlsZW5hbWUpICsgdXJsO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlci50b3RhbCsrO1xuICAgICAgICBfbG9hZF9qc29uKHVybCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICBwYXJlbnRbcHJvcGVydHldID0gZGF0YTtcbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEsIGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgIGxvYWRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoL15AbWl4aW5cXCguKlxcKSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhciBfcmVnX2RhdGEgPSAvXkBtaXhpblxcKChcXC5cXC8pPyguKilcXCkkLy5leGVjKHZhbHVlKTtcbiAgICAgICAgdmFyIHVybCA9IF9yZWdfZGF0YVsyXTtcbiAgICAgICAgaWYgKF9yZWdfZGF0YVsxXSkge1xuICAgICAgICAgIHVybCA9IHBhdGguZ2V0UGFyZW50RGlyZWN0b3J5VXJsKGZpbGVuYW1lKSArIHVybDtcbiAgICAgICAgfVxuICAgICAgICBsb2FkZXIudG90YWwrKztcbiAgICAgICAgX2xvYWRfanNvbih1cmwsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgaWYgKHBhcmVudC5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xuICAgICAgICAgICAgcGFyZW50LnNwbGljZShwcm9wZXJ0eSwgMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgcGFyZW50LnB1c2goZGF0YVtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHBhcmVudFtwcm9wZXJ0eV07XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgcGFyZW50W2ldID0gZGF0YVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbG9hZGVyKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhLCBlcnJvcikge1xuICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKC9eQGxvYWRcXCgoLiopXFwpJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIF9yZWdfZGF0YSA9IC9eQGxvYWRcXCgoXFwuP1xcLyk/KC4qKVxcKSQvLmV4ZWModmFsdWUpO1xuICAgICAgICB2YXIgdXJsID0gX3JlZ19kYXRhWzJdO1xuICAgICAgICBpZiAoX3JlZ19kYXRhWzFdID09IFwiL1wiKSB7XG4gICAgICAgICAgdXJsID0gd2luZG93LkFQUF9TVEFUSUNfUEFUSCArIHVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX3JlZ19kYXRhWzFdID09IFwiLi9cIikge1xuICAgICAgICAgIHVybCA9IHBhdGguZ2V0UGFyZW50RGlyZWN0b3J5VXJsKGZpbGVuYW1lKSArIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRlci50b3RhbCsrO1xuICAgICAgICB1dGlscy5nZXRJbmxpbmVKc29uKHVybCwgXCJodG1sXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgcGFyZW50W3Byb3BlcnR5XSA9IGRhdGE7XG4gICAgICAgICAgbG9hZGVyKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhLCBlcnJvcikge1xuICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICBsb2FkZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICBsb2FkZXIoKTtcblxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxudmFyIHV0aWxzID0ge1xuICBDQUNIRURfSlNPTiA6IHt9LFxuICBsb2FkSnNvblN5bmM6IGZ1bmN0aW9uKHNyYyl7XG4gICAgdmFyIGRhdGE7XG4gICAgX2xvYWRfanNvbihzcmMsZnVuY3Rpb24oX2RhdGEpe1xuICAgICAgZGF0YSA9IF9kYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9LFxuXG4gIC8qKlxuICAg0L/QvtC30LLQvtC70Y/QtdGCINC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQutC+0L3RgdGC0YDRg9C60YbQuNC4INCy0LjQtNCwXG4gICDRgNCw0YHRiNC40YDQuNGC0Ywg0LTQsNC90L3Ri9C1INC40Lcg0YTQsNC50LvQsCB0ZW1wbGF0ZS5qc29uXG4gICBcIkBleHRlbmRcIiA6IFwidXJsKGRhdGEvdGVtcGxhdGUuanNvbilcIixcbiAgIFwiQGV4dGVuZFwiIDogXCJ1cmwoZGF0YS90ZW1wbGF0ZS5qc29uI3NldHRpbmdzL3N0YWdlcylcIixcblxuICAgLy/Qt9Cw0LzQtdC90LjRgtGMINGB0YLRgNC+0LrRgyDQvdCw0LTQsNC90L3Ri9C1INC40Lcg0YTQsNC50LvQsFxuICAgXCJzdGFnZXNcIjogICAgICAgXCJ1cmwoZGF0YS90ZW1wbGF0ZS5qc29uI3NldHRpbmdzL3N0YWdlcylcIixcblxuICAgKiBAcGFyYW0gZmlsZW5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrX3N1Y2Nlc3NcbiAgICogQHBhcmFtIGNhbGxiYWNrX2Vycm9yXG4gICAqL1xuICBsb2FkSnNvbjogZnVuY3Rpb24gKHZhbHVlLHJlc29sdmVfY2IsZmFpbF9jYikge1xuICAgICAgcmV0dXJuIF9sb2FkX2pzb24odmFsdWUsZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHJlc29sdmVfY2IgJiYgcmVzb2x2ZV9jYihkYXRhKTtcbiAgICAgIH0sZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgZmFpbF9jYiAmJiBmYWlsX2NiKGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICByZW1vdmVDb21tZW50czogZnVuY3Rpb24gKHN0cikge1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9eXFxzKihcXC9cXC8uKnwoPzpcXC9cXCpbXFxzXFxTXSo/KVxcKlxcL1xccyopJC9nbSxcIlwiKTtcbiAgICByZXR1cm4gc3RyO1xuICB9LFxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gY3JpdGVyaWEgLSDQstGL0L/QvtC70L3Rj9GC0Ywg0YTRg9C90LrRhtC40Y4g0YHQviDQstGB0LXQvNC4INC+0LHRitC10LrRgtCw0LzQuFxuICAgKi9cbiAgcmVjb3Vyc2l2ZTogZnVuY3Rpb24gKG9iamVjdCwgY3JpdGVyaWEpIHtcbiAgICB2YXIgcmVhZGVkID0gW107XG4gICAgaWYgKCFvYmplY3QpIHJldHVybjtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN1Yl9yZWNvdXJzaXZlKG9iamVjdCkge1xuICAgICAgaWYgKHJlYWRlZC5pbmRleE9mKG9iamVjdCkgIT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVhZGVkLnB1c2gob2JqZWN0KTtcblxuXG4gICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCA9IG9iamVjdC5sZW5ndGg7IHByb3AtLTspIHtcbiAgICAgICAgICBpZiAob2JqZWN0W3Byb3BdICYmIChvYmplY3RbcHJvcF0uY29uc3RydWN0b3IgPT0gT2JqZWN0IHx8IG9iamVjdFtwcm9wXS5jb25zdHJ1Y3RvciA9PSBBcnJheSkpIHtcbiAgICAgICAgICAgIHN1Yl9yZWNvdXJzaXZlKG9iamVjdFtwcm9wXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBicmVha18gPSBjcml0ZXJpYShwcm9wLCBvYmplY3RbcHJvcF0sIG9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdCkge1xuICAgICAgICAgIGlmIChvYmplY3RbcHJvcF0gJiYgKG9iamVjdFtwcm9wXS5jb25zdHJ1Y3RvciA9PSBPYmplY3QgfHwgb2JqZWN0W3Byb3BdLmNvbnN0cnVjdG9yID09IEFycmF5KSkge1xuICAgICAgICAgICAgc3ViX3JlY291cnNpdmUob2JqZWN0W3Byb3BdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJyZWFrXyA9IGNyaXRlcmlhKHByb3AsIG9iamVjdFtwcm9wXSwgb2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KShvYmplY3QpO1xuICB9LFxuXG4gIHBhcnNlQ1NWOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciByb3dzID0gZGF0YS5zcGxpdCgvXFxuLyk7XG4gICAgdmFyIGNvbHVtbnMgPSByb3dzWzBdLnNwbGl0KCcsJyk7XG4gICAgcm93cy5zcGxpY2UoMCwgMSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvdXRwdXRfcm93X2RhdGEgPSB7fTtcbiAgICAgIHZhciByb3dfZGF0YSA9IFtdO1xuXG5cbiAgICAgIHZhciBfcXVvdGUgPSBmYWxzZSwgbGFzdCA9IC0xO1xuICAgICAgdmFyIGogPSAtMTtcbiAgICAgIHZhciBzdHIgPSByb3dzW2ldO1xuICAgICAgd2hpbGUgKCsraiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFfcXVvdGUpIHtcbiAgICAgICAgICBpZiAoc3RyW2pdID09ICdcXCcnIHx8IHN0cltqXSA9PSAnXFxcIicpIHtcbiAgICAgICAgICAgIF9xdW90ZSA9IHN0cltqXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0cltqXSA9PSBcIixcIikge1xuICAgICAgICAgICAgdmFyIF92YWwgPSBzdHIuc3Vic3RyaW5nKGxhc3QsIGopO1xuICAgICAgICAgICAgaWYgKF92YWxbMF0gPT0gJ1xcXCInICYmIF92YWxbX3ZhbC5sZW5ndGggLSAxXSA9PSAnXFxcIicpIHtcbiAgICAgICAgICAgICAgX3ZhbCA9IF92YWwuc3Vic3RyaW5nKDEsIF92YWwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3dfZGF0YS5wdXNoKF92YWwpO1xuICAgICAgICAgICAgbGFzdCA9IGogKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc3RyW2pdID09IF9xdW90ZSkge1xuICAgICAgICAgICAgX3F1b3RlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogaW4gcm93X2RhdGEpIHtcbiAgICAgICAgb3V0cHV0X3Jvd19kYXRhW2NvbHVtbnNbal1dID0gcm93X2RhdGFbal07XG4gICAgICB9XG4gICAgICByb3dzW2ldID0gb3V0cHV0X3Jvd19kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gcm93cztcbiAgfSxcbiAgcGFyc2VEYXRhOiBmdW5jdGlvbiAoZGF0YSwgZGF0YVR5cGUpIHtcbiAgICB2YXIgX3BhcnNlZDtcbiAgICBpZiAoZGF0YVR5cGUgPT0gXCJjc3ZcIikge1xuICAgICAgX3BhcnNlZCA9IHV0aWxzLnBhcnNlQ1NWKGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT0gXCJqc29uXCIpIHtcbiAgICAgIF9wYXJzZWQgPSBkYXRhLnRyaW0oKTtcbiAgICAgIC8vaWYgKGRhdGFbMF0gIT0gXCJ7XCIgJiYgZGF0YVswXSAhPSBcIltcIikge1xuICAgICAgLy8gIHJldHVybiBmYWxzZTtcbiAgICAgIC8vfVxuXG4gICAgICBfcGFyc2VkID0gdXRpbHMucmVtb3ZlQ29tbWVudHMoX3BhcnNlZCk7XG4gICAgICAvL2RhdGEgID0gZGF0YS5yZXBsYWNlKC9cXG4vZyxcIlwiKVxuXG4gICAgICB0cnl7XG4gICAgICAgIHZhciBfcGFyc2VkID0gSlNPTi5wYXJzZShfcGFyc2VkKTsvLz0gSlNPTi5wYXJzZShkYXRhLnJlcGxhY2UoL1xcL1xcKltcXHNcXFNdKj9cXCpcXC98XFwvXFwvLiovZyxcIlwiKSk7XG4gICAgICB9Y2F0Y2goZSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZTogZS50b1N0cmluZygpLFxuICAgICAgICAgIGRhdGE6ICBkYXRhXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvL3ZhciBzY3JpcHQgPSAkKFwiPHNjcmlwdCB0eXBlPSd0ZXh0L2pzb24nIGlkPSdcIiArIHVybCArIFwiJz5cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpICsgXCI8L3NjcmlwdD5cIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgZGF0YTogX3BhcnNlZFxuICAgIH07XG4gIH0sXG4gIGxvYWQ6IGZ1bmN0aW9uICh1cmwsIGRhdGFUeXBlLCBjYWxsYmFja19zdWNjZXNzLCBjYWxsYmFja19lcnJvcikge1xuICAgIC8vdG9kb1xuICAgIGlmIChpc1NlcnZlcigpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyh1cmwsICd1dGY4Jyk7XG4gICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHVGRUZGLywgJycpO1xuICAgICAgICB2YXIgX3BhcnNlZCA9IHV0aWxzLnBhcnNlRGF0YShkYXRhLCBkYXRhVHlwZSk7XG4gICAgICAgIGlmKF9wYXJzZWQuc3RhdHVzID09IFwiZXJyb3JcIil7XG4gICAgICAgICAgY2FsbGJhY2tfZXJyb3Ioe1xuICAgICAgICAgICAgc3RhdHVzOiAgIFwiZXJyb3JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6ICBfcGFyc2VkLm1lc3NhZ2UsXG4gICAgICAgICAgICBkYXRhOiAgICAgX3BhcnNlZC5kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrX3N1Y2Nlc3MoX3BhcnNlZC5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICBpZiAoZS5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdGaWxlIG5vdCBmb3VuZCEnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrX2Vycm9yKGRhdGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBodHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHZhciBfcGFyc2VkID0gdXRpbHMucGFyc2VEYXRhKGRhdGEsIGRhdGFUeXBlKTtcbiAgICAgICAgICAgIGlmKF9wYXJzZWQuc3RhdHVzID09IFwiZXJyb3JcIil7XG4gICAgICAgICAgICAgIGNhbGxiYWNrX2Vycm9yKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGh0dHBSZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAgX3BhcnNlZC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBodHRwUmVxdWVzdC5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrX3N1Y2Nlc3MoX3BhcnNlZC5kYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2tfZXJyb3IodXJsLCBodHRwUmVxdWVzdClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgaHR0cFJlcXVlc3Quc2VuZCgpO1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqINCf0L7Qt9Cy0L7Qu9GP0LXRgtC30LDQs9GA0YPQttCw0YLRjCBqc29uINGE0LDQudC70YsgLCDRgdC+0LTQtdGA0LbQsNGJ0LjQtSDRgdGB0YvQu9C60Lgg0L3QsCDQtNGA0YPQs9C40LUganNvbiDRhNCw0LnQu9GLLlxuICAgKiDQstC80LXRgdGC0L4g0YHRgdGL0LvQvtC6INGC0LjQv9CwXG4gICAqICBcInByb3BlcnR5XCIgOiBcInVybChjaHVuay5qc29uKVwiXG4gICAqICDQsdGD0LTQtdGCINC30LDQs9GA0YPQttC10L3QviDRgdC+0LTQtdGA0LbQuNC80L7QtSDRhNCw0LnQu9CwXG4gICAqICBcInByb3BlcnR5XCIgOiB7Li4ufVxuICAgKlxuICAgKiAg0LXRgdC70Lgg0YPQutCw0LfQsNGC0Ywg0Y/QutC+0YDRjFxuICAgKiAgXCJwcm9wZXJ0eVwiIDogXCJ1cmwoY2h1bmsuanNvbiNzZXR0aW5ncy9jaHVuay8wL3RleHQpXCJcbiAgICpcbiAgICog0YLQviDQsdGD0LTQtdGCINC30LDQs9GA0YPQttC10L3QviDRgdC+0LTQtdGA0LbQuNC80L7QtSDQv9C+0LvRjyBzZXR0aW5ncy5jaHVua1swXS50ZXh0INC40Lcg0YTQsNC50LvQsCBjaHVuay5qc29uXG4gICAqXG4gICAqXG4gICAqIEBwYXJhbSBmaWxlbmFtZSAg0L/Rg9GC0Ywg0Log0L7RgdC90L7QstC90L7QvNGDIGpzb24g0YTQsNC50LvRg1xuICAgKiBAcGFyYW0gY2FsbGJhY2sgINCx0YPQtNC10YIg0LLRi9C30LLQsNC9INC/0L7RgdC70LUg0L7QutC+0L3Rh9Cw0L3QuNGPINC30LDQs9GA0YPQt9C60Lgg0LLRgdC10YUg0YTQsNC50LvQvtCyXG4gICAqL1xuICBnZXRJbmxpbmVKc29uOiBmdW5jdGlvbiAodXJsLCBkYXRhVHlwZSwgY2FsbGJhY2tfc3VjY2VzcywgY2FsbGJhY2tfZXJyb3IpIHtcblxuICAgIGlmIChkYXRhVHlwZS5jb25zdHJ1Y3RvciAhPSBTdHJpbmcpIHtcbiAgICAgIGNhbGxiYWNrX2Vycm9yID0gY2FsbGJhY2tfc3VjY2VzcztcbiAgICAgIGNhbGxiYWNrX3N1Y2Nlc3MgPSBkYXRhVHlwZTtcbiAgICAgIGRhdGFUeXBlID0gXCJqc29uXCI7XG4gICAgfVxuXG5cbiAgICBpZiAodHlwZW9mIHV0aWxzLkNBQ0hFRF9KU09OICE9PSBcInVuZGVmaW5lZFwiICYmIHV0aWxzLkNBQ0hFRF9KU09OICYmIHV0aWxzLkNBQ0hFRF9KU09OW3VybF0pIHtcbiAgICAgIGNhbGxiYWNrX3N1Y2Nlc3ModXRpbHMuQ0FDSEVEX0pTT05bdXJsXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgJCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YXIgaW5saW5lID0gJChcInNjcmlwdFtpZD0nXCIgKyB1cmwgKyBcIiddXCIpO1xuICAgICAgICBpZiAoaW5saW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgX2RhdGEgPVxuICAgICAgICAgICAgaW5saW5lWzBdLmlubmVyVGV4dCB8fCAvL2FsbFxuICAgICAgICAgICAgaW5saW5lWzBdLnRleHRDb250ZW50IHx8IC8vZmlyZWZveFxuICAgICAgICAgICAgaW5saW5lWzBdLnRleHQ7IC8vaWU4XG4gICAgICAgICAgaWYgKGRhdGFUeXBlID09IFwianNvblwiKSB7XG5cbiAgICAgICAgICAgIHZhciBfZGF0YSA9IHV0aWxzLnJlbW92ZUNvbW1lbnRzKF9kYXRhKTtcbiAgICAgICAgICAgIGNhbGxiYWNrX3N1Y2Nlc3MoSlNPTi5wYXJzZShfZGF0YSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFja19zdWNjZXNzKF9kYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHV0aWxzLmxvYWQodXJsLCBkYXRhVHlwZSwgY2FsbGJhY2tfc3VjY2VzcywgY2FsbGJhY2tfZXJyb3IpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlsL2RhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmICh0eXBlb2YgXyA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIF8gPSByZXF1aXJlKFwiLi4vcGx1Z2lucy91bmRlcnNjb3JlXCIpO1xuICBtb2R1bGUuZXhwb3J0cyA9IF87XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGxvYWRTY3JpcHQ6IGZ1bmN0aW9uIChyZXF1aXJlbWVudCwgaGVscGVyLCBlcnJvcikge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQub25lcnJvciA9IGVycm9yO1xuICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgaGVscGVyKHNjcmlwdCwgX19zcmMpO1xuICAgICAgfVxuICAgIH07XG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGhlbHBlciwgdHJ1ZSk7XG4gICAgc2NyaXB0LnNyYyA9IHJlcXVpcmVtZW50O1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfSxcbiAgc2NyaXB0VVJMOiBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuICAgIH1cbiAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxOyBpLS07KSB7XG4gICAgICBpZiAoc2NyaXB0c1tpXS5zcmMpIHtcbiAgICAgICAgcmV0dXJuIHNjcmlwdHNbaV0uc3JjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwvbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgb2JqZWN0VXRpbHMgPSByZXF1aXJlKFwiLi9vYmplY3RcIilcbl8gPSByZXF1aXJlKFwiLi4vcGx1Z2lucy91bmRlcnNjb3JlXCIpO1xuXG52YXIgdXRpbHMgPSB7XG4gIC8qKlxuICAgKiB3aWxsIGRpdmlkZSB0b3RhbCB3aWR0aCBmb3IgZXZlcnkgb2JqZWN0IGluIGNvbHVtbnRzIGFycmF5XG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICAgICB2YXIgX2ZsZXhBcnJheSA9IGZhYnJpYy51dGlsLmZsZXgoMjAwICwgW3tmbGV4OiAwfSx7dmFsdWU6IDEwMCwgZmxleDogMX0se2ZsZXg6IDB9XSApO1xuICAgKiBAcGFyYW0gdG90YWxcbiAgICogQHBhcmFtIGNvbHVtbnNcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKiBAZXhhbXBsZSBbNTAsMTAwLDUwXVxuICAgKi9cbiAgZmxleDogZnVuY3Rpb24gKHRvdGFsLGNvbHVtbnMpe1xuICAgIHZhciBfcmV0dXJuID0gW107XG4gICAgdmFyIHNwbGl0ID0gMDtcbiAgICBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uLCBpbmRleCl7XG4gICAgICBpZihjb2x1bW4udmFsdWUgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNwbGl0Kys7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdG90YWwgLT0gY29sdW1uLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBfdyA9IHRvdGFsIC8gc3BsaXQ7XG4gICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbHVtbil7XG4gICAgICBfcmV0dXJuLnB1c2goY29sdW1uLnZhbHVlID09PSB1bmRlZmluZWQgPyBfdyA6ICBjb2x1bW4udmFsdWUgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3JldHVybjtcbiAgfSxcbiAgd29ya2VyOiBmdW5jdGlvbiAoZm9vKSB7XG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcbiAgICAgIHZhciBzdHIgPSBmb28udG9TdHJpbmcoKTtcbiAgICAgIHZhciBldmVudEFyZyA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCIoXCIpICsgMSxzdHIuaW5kZXhPZihcIixcIikpO1xuICAgICAgdmFyIHBvc3RNZXNzYWdlQXJnID0gc3RyLnN1YnN0cmluZyhzdHIuaW5kZXhPZihcIixcIikgKyAxLHN0ci5pbmRleE9mKFwiKVwiKSk7XG4gICAgICB2YXIgX2Z1bmN0aW9uQm9keSA9IHN0ci5zdWJzdHJpbmcoc3RyLmluZGV4T2YoXCJ7XCIpICsgMSk7XG4gICAgICBzdHIgPSBcIm9ubWVzc2FnZT1mdW5jdGlvbihcIiArIGV2ZW50QXJnICsgXCIpe1wiICsgcG9zdE1lc3NhZ2VBcmcgKyBcIj0gcG9zdE1lc3NhZ2U7XCIgKyBfZnVuY3Rpb25Cb2R5O1xuICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbc3RyXSk7XG4gICAgICAvL1wib25tZXNzYWdlID0gZnVuY3Rpb24oZSkgeyBwb3N0TWVzc2FnZSgnbXNnIGZyb20gd29ya2VyJyk7IH1cIl0pO1xuICAgICAgdmFyIGJsb2JVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIHJldHVybiBuZXcgV29ya2VyKGJsb2JVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgd29ya2VyID0ge1xuICAgICAgICB0ZXJtaW5hdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgcG9zdE1lc3NhZ2U6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb28oe2RhdGE6IGRhdGF9LCBmdW5jdGlvbiAocmVzcG9uc2VEYXRhKSB7XG4gICAgICAgICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgJiYgd29ya2VyLm9ubWVzc2FnZSh7ZGF0YTogcmVzcG9uc2VEYXRhfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9XG4gIH0sXG4gIG9ic2VydmFibGU6IGZ1bmN0aW9uIChvYmopIHtcbiAgICBfLmV4dGVuZChvYmosIHtcblxuICAgICAgZmlyZTogZnVuY3Rpb24gZmlyZShldmVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyc0ZvckV2ZW50ID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzRm9yRXZlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RlbmVyc0ZvckV2ZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGlzdGVuZXJzRm9yRXZlbnRbaV0uY2FsbCh0aGlzLCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnROYW1lLmNvbnN0cnVjdG9yID09IE9iamVjdCkge1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm9uKGksIGV2ZW50TmFtZVtpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlKGV2ZW50c1tpXSwgaGFuZGxlcilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBvYnNlcnZlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdGhpcy5vbihwcm9wLCBldmVudE5hbWVbcHJvcF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIG9mZjogZnVuY3Rpb24gc3RvcE9ic2VydmluZyhldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBldmVudE5hbWUpIHtcbiAgICAgICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgcHJvcCwgZXZlbnROYW1lW3Byb3BdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgX3JlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGluT3JkZXI6IGZ1bmN0aW9uIChhcnJheSwgZm9vLCBjYWxsYmFjaykge1xuICAgIHZhciBfaW5kZXggPSAwO1xuICAgIGZ1bmN0aW9uIF9pbk9yZGVySW5kZXgoKSB7XG4gICAgICBpZiAoKytfaW5kZXggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgZm9vKGFycmF5W19pbmRleF0sIF9pbmRleCwgX2luT3JkZXJJbmRleClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvbyhhcnJheVtfaW5kZXhdLCBfaW5kZXgsIF9pbk9yZGVySW5kZXgpXG4gIH0sXG4gIC8qKlxuICAgKiDQstC+0LfQstGA0LDRidCw0LXRgiDQvtCx0YrQtdC60YIg0YEg0LrQu9GO0YfQsNC80Lgg0YHRgtGA0L7QutC4IHVybFxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBxdWVyeVN0cmluZzogZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgaWYocXVlcnkpIHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuc3Vic3RyKHF1ZXJ5LmluZGV4T2YoXCI/XCIpICsgMSkgO1xuICAgIH1lbHNle1xuICAgICAgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBfbGVuZ3RoID0gMDtcbiAgICBpZiAoIXF1ZXJ5KXJldHVybiBvYmo7XG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgdmFyIF92bmFtZSA9IHBhaXJbMF0sIHZhbCA9IHBhaXJbMV07XG4gICAgICBpZiAodHlwZW9mIG9ialtfdm5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIG9ialtfdm5hbWVdID0gdmFsIHx8IFwiXCI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICAgIC8vIElmIHNlY29uZCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW192bmFtZV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGFyciA9IFtvYmpbX3ZuYW1lXSwgdmFsXTtcbiAgICAgICAgb2JqW192bmFtZV0gPSBhcnI7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpbX3ZuYW1lXS5wdXNoKHZhbCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIF9sZW5ndGgsIHt2YWx1ZTogX3ZuYW1lLCBlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgICAgICBfbGVuZ3RoKys7XG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFwibGVuZ3RoXCIsIHt2YWx1ZTogX2xlbmd0aCwgZW51bWVyYWJsZTogZmFsc2V9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9LFxuICBjb3B5VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHN3aXRjaCAodmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICByZXR1cm4gb2JqZWN0VXRpbHMuZGVlcEV4dGVuZCh7fSwgdmFsdWUpO1xuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgcmV0dXJuIG9iamVjdFV0aWxzLmRlZXBFeHRlbmQoW10sIHZhbHVlKTtcbiAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vY29uc29sZS5sb2codmFsdWUuY29uc3RydWN0b3IpO1xuICAgICAgICByZXR1cm4gb2JqZWN0VXRpbHMuZGVlcEV4dGVuZCh7fSwgdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgY2xlYXJWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgc3dpdGNoICh2YWx1ZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiB2YWx1ZSkgZGVsZXRlIHZhbHVlW21lbWJlcl07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBkZWxldGUgdmFsdWU7XG4gICAgfVxuICB9LFxuICBvYmplY3RzRGlmZmVyZW5jZTogZnVuY3Rpb24gKHByZXYsIG5vdykge1xuICAgIHZhciBjaGFuZ2VzID0ge307XG4gICAgZm9yICh2YXIgcHJvcCBpbiBub3cpIHtcbiAgICAgIGlmICghcHJldiB8fCBwcmV2W3Byb3BdICE9PSBub3dbcHJvcF0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3dbcHJvcF0gPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHZhciBjID0gdXRpbHMub2JqZWN0c0RpZmZlcmVuY2UocHJldltwcm9wXSwgbm93W3Byb3BdKTtcbiAgICAgICAgICBpZiAoIV8uaXNFbXB0eShjKSkgLy8gdW5kZXJzY29yZVxuICAgICAgICAgICAgY2hhbmdlc1twcm9wXSA9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlc1twcm9wXSA9IG5vd1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhbmdlcztcbiAgfSxcbiAgc3BsaXRCeTogZnVuY3Rpb24gKHF1ZXJ5LCBkZWxpbWl0ZXIpIHtcbiAgICB2YXIgdHJhY2VRdWVyaWVzID0gW107XG4gICAgdmFyIHIgPSAwLFxuICAgICAgZiA9IDAsXG4gICAgICBfcF9zdGFydCA9IDA7XG4gICAgaWYgKHF1ZXJ5ID09IFwiXCIpIHJldHVybiBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHF1ZXJ5W2ldO1xuICAgICAgaWYgKGMgPT0gXCIoXCIpIHtcbiAgICAgICAgcisrO1xuICAgICAgICBmID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PSBcIilcIikge1xuICAgICAgICByLS07XG4gICAgICB9XG4gICAgICBpZiAociA9PSAwICYmIGYgPT0gMSkgZiA9IDA7XG4gICAgICBpZiAoZGVsaW1pdGVyLmluZGV4T2YoYykgIT0gLTEgJiYgciA9PSAwICYmIGYgPT0gMCkge1xuICAgICAgICB0cmFjZVF1ZXJpZXMucHVzaChxdWVyeS5zdWJzdHJpbmcoX3Bfc3RhcnQsIGkpKTtcbiAgICAgICAgX3Bfc3RhcnQgPSBpICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdHJhY2VRdWVyaWVzLnB1c2gocXVlcnkuc3Vic3RyaW5nKF9wX3N0YXJ0KSk7XG4gICAgcmV0dXJuIHRyYWNlUXVlcmllcztcbiAgfSxcbiAgcXVldWVMb2FkOiBmdW5jdGlvbiAodG90YWwsIGNvbXBsZXRlQ0IsIHByb2dyZXNzQ0IpIHtcbiAgICB2YXIgbG9hZGVyID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICBsb2FkZXIubG9hZGVkLnB1c2goZWwpO1xuICAgICAgbG9hZGVyLnByb2dyZXNzQ0IgJiYgbG9hZGVyLnByb2dyZXNzQ0IobG9hZGVyLmxvYWRlZC5sZW5ndGgsIGxvYWRlci50b3RhbCwgZWwsIGxvYWRlci5sb2FkZWQpO1xuXG4gICAgICBpZiAobG9hZGVyLmxvYWRlZC5sZW5ndGggPT0gbG9hZGVyLnRvdGFsKSB7XG4gICAgICAgIGxvYWRlci5jb21wbGV0ZUNCICYmIGxvYWRlci5jb21wbGV0ZUNCKGxvYWRlci5sb2FkZWQpO1xuICAgICAgICBsb2FkZXIuZmlyZShcImxvYWRlZFwiKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxvYWRlci5jb21wbGV0ZUNCID0gY29tcGxldGVDQjtcbiAgICBsb2FkZXIucHJvZ3Jlc3NDQiA9IHByb2dyZXNzQ0I7XG4gICAgbG9hZGVyLnRvdGFsID0gdG90YWw7XG4gICAgbG9hZGVyLmxvYWRlZCA9IFtdO1xuICAgIHV0aWxzLm9ic2VydmFibGUobG9hZGVyKTtcblxuICAgIHJldHVybiBsb2FkZXI7XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9ICB1dGlscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOC4zXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuXG4gIC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIChidXQgbm90IGd6aXBwZWQpIHZlcnNpb246XG4gIHZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBPYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGUsIEZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cbiAgdmFyXG4gICAgcHVzaCAgICAgICAgICAgICA9IEFycmF5UHJvdG8ucHVzaCxcbiAgICBzbGljZSAgICAgICAgICAgID0gQXJyYXlQcm90by5zbGljZSxcbiAgICB0b1N0cmluZyAgICAgICAgID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgaGFzT3duUHJvcGVydHkgICA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyXG4gICAgbmF0aXZlSXNBcnJheSAgICAgID0gQXJyYXkuaXNBcnJheSxcbiAgICBuYXRpdmVLZXlzICAgICAgICAgPSBPYmplY3Qua2V5cyxcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZCxcbiAgICBuYXRpdmVDcmVhdGUgICAgICAgPSBPYmplY3QuY3JlYXRlO1xuXG4gIC8vIE5ha2VkIGZ1bmN0aW9uIHJlZmVyZW5jZSBmb3Igc3Vycm9nYXRlLXByb3RvdHlwZS1zd2FwcGluZy5cbiAgdmFyIEN0b3IgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlIGEgc2FmZSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciB1c2UgYmVsb3cuXG4gIHZhciBfID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8pIHJldHVybiBvYmo7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcbiAgICB0aGlzLl93cmFwcGVkID0gb2JqO1xuICB9O1xuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4zJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBwcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBwcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICBmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XG4gICAgLy8gT3B0aW1pemVkIGl0ZXJhdG9yIGZ1bmN0aW9uIGFzIHVzaW5nIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAvLyBpbiB0aGUgbWFpbiBmdW5jdGlvbiB3aWxsIGRlb3B0aW1pemUgdGhlLCBzZWUgIzE5OTEuXG4gICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBpbml0aWFsIHZhbHVlIGlmIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGtleSA9IF8uZmluZEluZGV4KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0gXy5maW5kS2V5KG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXTtcbiAgICAgIHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBzdGFydEluZGV4KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLCBpZHggPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvL2ZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0XG4gICAgICAgIGlmICghc2hhbGxvdykgdmFsdWUgPSBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QpO1xuICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgb3V0cHV0Lmxlbmd0aCArPSBsZW47XG4gICAgICAgIHdoaWxlIChqIDwgbGVuKSB7XG4gICAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBfID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICBmdW5jdGlvbiBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gKF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlKSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdFxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICByZXN1bHRzID0ge30sXG4gICAgICAgICAgY3VycmVudEtleTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqZWN0LCBvaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIG9iaiA9IG9iamVjdCwgaXRlcmF0ZWUsIGtleXM7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24ob2l0ZXJhdGVlKSkge1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7IHJldHVybiBrZXkgaW4gb2JqOyB9O1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cblxuICAvLyBPcHRpbWl6ZSBgaXNGdW5jdGlvbmAgaWYgYXBwcm9wcmlhdGUuIFdvcmsgYXJvdW5kIHNvbWUgdHlwZW9mIGJ1Z3MgaW4gb2xkIHY4LFxuICAvLyBJRSAxMSAoIzE2MjEpLCBhbmQgaW4gU2FmYXJpIDggKCMxOTI5KS5cbiAgaWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xuICBfLmlzTnVsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG4gIH07XG5cbiAgLy8gU2hvcnRjdXQgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBwcm9wZXJ0eSBkaXJlY3RseVxuICAvLyBvbiBpdHNlbGYgKGluIG90aGVyIHdvcmRzLCBub3Qgb24gYSBwcm90b3R5cGUpLlxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9O1xuXG4gIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRlZXMuXG4gIF8uaWRlbnRpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvLyBQcmVkaWNhdGUtZ2VuZXJhdGluZyBmdW5jdGlvbnMuIE9mdGVuIHVzZWZ1bCBvdXRzaWRlIG9mIFVuZGVyc2NvcmUuXG4gIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIF8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcblxuICBfLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgLy8gR2VuZXJhdGVzIGEgZnVuY3Rpb24gZm9yIGEgZ2l2ZW4gb2JqZWN0IHRoYXQgcmV0dXJucyBhIGdpdmVuIHByb3BlcnR5LlxuICBfLnByb3BlcnR5T2YgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBmdW5jdGlvbigpe30gOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZlxuICAvLyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5tYXRjaGVyID0gXy5tYXRjaGVzID0gZnVuY3Rpb24oYXR0cnMpIHtcbiAgICBhdHRycyA9IF8uZXh0ZW5kT3duKHt9LCBhdHRycyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIF8uaXNNYXRjaChvYmosIGF0dHJzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJ1biBhIGZ1bmN0aW9uICoqbioqIHRpbWVzLlxuICBfLnRpbWVzID0gZnVuY3Rpb24obiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykgYWNjdW1baV0gPSBpdGVyYXRlZShpKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH07XG5cbiAgLy8gQSAocG9zc2libHkgZmFzdGVyKSB3YXkgdG8gZ2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBhbiBpbnRlZ2VyLlxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfTtcblxuICAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGVzY2FwZU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmI3gyNzsnLFxuICAgICdgJzogJyYjeDYwOydcbiAgfTtcbiAgdmFyIHVuZXNjYXBlTWFwID0gXy5pbnZlcnQoZXNjYXBlTWFwKTtcblxuICAvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXG4gIHZhciBjcmVhdGVFc2NhcGVyID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGVzY2FwZXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hcFttYXRjaF07XG4gICAgfTtcbiAgICAvLyBSZWdleGVzIGZvciBpZGVudGlmeWluZyBhIGtleSB0aGF0IG5lZWRzIHRvIGJlIGVzY2FwZWRcbiAgICB2YXIgc291cmNlID0gJyg/OicgKyBfLmtleXMobWFwKS5qb2luKCd8JykgKyAnKSc7XG4gICAgdmFyIHRlc3RSZWdleHAgPSBSZWdFeHAoc291cmNlKTtcbiAgICB2YXIgcmVwbGFjZVJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UsICdnJyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nID09IG51bGwgPyAnJyA6ICcnICsgc3RyaW5nO1xuICAgICAgcmV0dXJuIHRlc3RSZWdleHAudGVzdChzdHJpbmcpID8gc3RyaW5nLnJlcGxhY2UocmVwbGFjZVJlZ2V4cCwgZXNjYXBlcikgOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgXy5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKGVzY2FwZU1hcCk7XG4gIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcblxuICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIG5hbWVkIGBwcm9wZXJ0eWAgaXMgYSBmdW5jdGlvbiB0aGVuIGludm9rZSBpdCB3aXRoIHRoZVxuICAvLyBgb2JqZWN0YCBhcyBjb250ZXh0OyBvdGhlcndpc2UsIHJldHVybiBpdC5cbiAgXy5yZXN1bHQgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBmYWxsYmFjaykge1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdm9pZCAwIDogb2JqZWN0W3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgdmFsdWUgPSBmYWxsYmFjaztcbiAgICB9XG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZS5jYWxsKG9iamVjdCkgOiB2YWx1ZTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG4gIHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gJ1xcXFwnICsgZXNjYXBlc1ttYXRjaF07XG4gIH07XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgLy8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncyAmJiBvbGRTZXR0aW5ncykgc2V0dGluZ3MgPSBvbGRTZXR0aW5ncztcbiAgICBzZXR0aW5ncyA9IF8uZGVmYXVsdHMoe30sIHNldHRpbmdzLCBfLnRlbXBsYXRlU2V0dGluZ3MpO1xuXG4gICAgLy8gQ29tYmluZSBkZWxpbWl0ZXJzIGludG8gb25lIHJlZ3VsYXIgZXhwcmVzc2lvbiB2aWEgYWx0ZXJuYXRpb24uXG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UoZXNjYXBlciwgZXNjYXBlQ2hhcik7XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2ZmZXN0LlxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHZhciBhcmd1bWVudCA9IHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonO1xuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgYXJndW1lbnQgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIC8vIEFkZCBhIFwiY2hhaW5cIiBmdW5jdGlvbi4gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGluc3RhbmNlID0gXyhvYmopO1xuICAgIGluc3RhbmNlLl9jaGFpbiA9IHRydWU7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciByZXN1bHQgPSBmdW5jdGlvbihpbnN0YW5jZSwgb2JqKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIF8uZWFjaChfLmZ1bmN0aW9ucyhvYmopLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IF9bbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XG4gICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKChuYW1lID09PSAnc2hpZnQnIHx8IG5hbWUgPT09ICdzcGxpY2UnKSAmJiBvYmoubGVuZ3RoID09PSAwKSBkZWxldGUgb2JqWzBdO1xuICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBvYmopO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEFkZCBhbGwgYWNjZXNzb3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydjb25jYXQnLCAnam9pbicsICdzbGljZSddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByZXN1bHQodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxuICBfLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIFByb3ZpZGUgdW53cmFwcGluZyBwcm94eSBmb3Igc29tZSBtZXRob2RzIHVzZWQgaW4gZW5naW5lIG9wZXJhdGlvbnNcbiAgLy8gc3VjaCBhcyBhcml0aG1ldGljIGFuZCBKU09OIHN0cmluZ2lmaWNhdGlvbi5cbiAgXy5wcm90b3R5cGUudmFsdWVPZiA9IF8ucHJvdG90eXBlLnRvSlNPTiA9IF8ucHJvdG90eXBlLnZhbHVlO1xuXG4gIF8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IF87XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BsdWdpbnMvdW5kZXJzY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcblN0cmluZy5wcm90b3R5cGUuZm9ybWF0ICA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0ciA9IHRoaXMudG9TdHJpbmcoKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBhcmd1bWVudHNbMF1cbiAgICAgICwgYXJncyA9IHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF1cbiAgICAvL1xuICAgIC8vIGZvciAodmFyIGFyZyBpbiBhcmdzKSBzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxceycgKyBhcmcgKyAnXFxcXH0nLCAnZ2knKSwgYXJnc1thcmddKVxuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xceyhbXn1dKilcXH0vZyxmdW5jdGlvbihhLGIpe1xuICAgICAgcmV0dXJuIHV0aWxzLmV2YWxJbkNvbnRleHQoYixhcmdzKVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gc3RyXG59O1xuXG51dGlscyA9IHtcbiAgZXh0cmFjdFZhcmlhYmxlczogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIubWF0Y2goLyg/ISg/OmRvfGlmfGlufGZvcnxsZXR8bmV3fHRyeXx2YXJ8Y2FzZXxlbHNlfGVudW18ZXZhbHxmYWxzZXxudWxsfHRoaXN8dHJ1ZXx2b2lkfHdpdGh8YnJlYWt8Y2F0Y2h8Y2xhc3N8Y29uc3R8c3VwZXJ8dGhyb3d8d2hpbGV8eWllbGR8ZGVsZXRlfGV4cG9ydHxpbXBvcnR8cHVibGljfHJldHVybnxzdGF0aWN8c3dpdGNofHR5cGVvZnxkZWZhdWx0fGV4dGVuZHN8ZmluYWxseXxwYWNrYWdlfHByaXZhdGV8Y29udGludWV8ZGVidWdnZXJ8ZnVuY3Rpb258YXJndW1lbnRzfGludGVyZmFjZXxwcm90ZWN0ZWR8aW1wbGVtZW50c3xpbnN0YW5jZW9mKSQpWyRBLVpcXF9hLXpcXHhhYVxceGI1XFx4YmFcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx1MDJjMVxcdTAyYzYtXFx1MDJkMVxcdTAyZTAtXFx1MDJlNFxcdTAyZWNcXHUwMmVlXFx1MDM3MC1cXHUwMzc0XFx1MDM3NlxcdTAzNzdcXHUwMzdhLVxcdTAzN2RcXHUwMzg2XFx1MDM4OC1cXHUwMzhhXFx1MDM4Y1xcdTAzOGUtXFx1MDNhMVxcdTAzYTMtXFx1MDNmNVxcdTAzZjctXFx1MDQ4MVxcdTA0OGEtXFx1MDUyN1xcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYxLVxcdTA1ODdcXHUwNWQwLVxcdTA1ZWFcXHUwNWYwLVxcdTA1ZjJcXHUwNjIwLVxcdTA2NGFcXHUwNjZlXFx1MDY2ZlxcdTA2NzEtXFx1MDZkM1xcdTA2ZDVcXHUwNmU1XFx1MDZlNlxcdTA2ZWVcXHUwNmVmXFx1MDZmYS1cXHUwNmZjXFx1MDZmZlxcdTA3MTBcXHUwNzEyLVxcdTA3MmZcXHUwNzRkLVxcdTA3YTVcXHUwN2IxXFx1MDdjYS1cXHUwN2VhXFx1MDdmNFxcdTA3ZjVcXHUwN2ZhXFx1MDgwMC1cXHUwODE1XFx1MDgxYVxcdTA4MjRcXHUwODI4XFx1MDg0MC1cXHUwODU4XFx1MDhhMFxcdTA4YTItXFx1MDhhY1xcdTA5MDQtXFx1MDkzOVxcdTA5M2RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3MS1cXHUwOTc3XFx1MDk3OS1cXHUwOTdmXFx1MDk4NS1cXHUwOThjXFx1MDk4ZlxcdTA5OTBcXHUwOTkzLVxcdTA5YThcXHUwOWFhLVxcdTA5YjBcXHUwOWIyXFx1MDliNi1cXHUwOWI5XFx1MDliZFxcdTA5Y2VcXHUwOWRjXFx1MDlkZFxcdTA5ZGYtXFx1MDllMVxcdTA5ZjBcXHUwOWYxXFx1MGEwNS1cXHUwYTBhXFx1MGEwZlxcdTBhMTBcXHUwYTEzLVxcdTBhMjhcXHUwYTJhLVxcdTBhMzBcXHUwYTMyXFx1MGEzM1xcdTBhMzVcXHUwYTM2XFx1MGEzOFxcdTBhMzlcXHUwYTU5LVxcdTBhNWNcXHUwYTVlXFx1MGE3Mi1cXHUwYTc0XFx1MGE4NS1cXHUwYThkXFx1MGE4Zi1cXHUwYTkxXFx1MGE5My1cXHUwYWE4XFx1MGFhYS1cXHUwYWIwXFx1MGFiMlxcdTBhYjNcXHUwYWI1LVxcdTBhYjlcXHUwYWJkXFx1MGFkMFxcdTBhZTBcXHUwYWUxXFx1MGIwNS1cXHUwYjBjXFx1MGIwZlxcdTBiMTBcXHUwYjEzLVxcdTBiMjhcXHUwYjJhLVxcdTBiMzBcXHUwYjMyXFx1MGIzM1xcdTBiMzUtXFx1MGIzOVxcdTBiM2RcXHUwYjVjXFx1MGI1ZFxcdTBiNWYtXFx1MGI2MVxcdTBiNzFcXHUwYjgzXFx1MGI4NS1cXHUwYjhhXFx1MGI4ZS1cXHUwYjkwXFx1MGI5Mi1cXHUwYjk1XFx1MGI5OVxcdTBiOWFcXHUwYjljXFx1MGI5ZVxcdTBiOWZcXHUwYmEzXFx1MGJhNFxcdTBiYTgtXFx1MGJhYVxcdTBiYWUtXFx1MGJiOVxcdTBiZDBcXHUwYzA1LVxcdTBjMGNcXHUwYzBlLVxcdTBjMTBcXHUwYzEyLVxcdTBjMjhcXHUwYzJhLVxcdTBjMzNcXHUwYzM1LVxcdTBjMzlcXHUwYzNkXFx1MGM1OFxcdTBjNTlcXHUwYzYwXFx1MGM2MVxcdTBjODUtXFx1MGM4Y1xcdTBjOGUtXFx1MGM5MFxcdTBjOTItXFx1MGNhOFxcdTBjYWEtXFx1MGNiM1xcdTBjYjUtXFx1MGNiOVxcdTBjYmRcXHUwY2RlXFx1MGNlMFxcdTBjZTFcXHUwY2YxXFx1MGNmMlxcdTBkMDUtXFx1MGQwY1xcdTBkMGUtXFx1MGQxMFxcdTBkMTItXFx1MGQzYVxcdTBkM2RcXHUwZDRlXFx1MGQ2MFxcdTBkNjFcXHUwZDdhLVxcdTBkN2ZcXHUwZDg1LVxcdTBkOTZcXHUwZDlhLVxcdTBkYjFcXHUwZGIzLVxcdTBkYmJcXHUwZGJkXFx1MGRjMC1cXHUwZGM2XFx1MGUwMS1cXHUwZTMwXFx1MGUzMlxcdTBlMzNcXHUwZTQwLVxcdTBlNDZcXHUwZTgxXFx1MGU4MlxcdTBlODRcXHUwZTg3XFx1MGU4OFxcdTBlOGFcXHUwZThkXFx1MGU5NC1cXHUwZTk3XFx1MGU5OS1cXHUwZTlmXFx1MGVhMS1cXHUwZWEzXFx1MGVhNVxcdTBlYTdcXHUwZWFhXFx1MGVhYlxcdTBlYWQtXFx1MGViMFxcdTBlYjJcXHUwZWIzXFx1MGViZFxcdTBlYzAtXFx1MGVjNFxcdTBlYzZcXHUwZWRjLVxcdTBlZGZcXHUwZjAwXFx1MGY0MC1cXHUwZjQ3XFx1MGY0OS1cXHUwZjZjXFx1MGY4OC1cXHUwZjhjXFx1MTAwMC1cXHUxMDJhXFx1MTAzZlxcdTEwNTAtXFx1MTA1NVxcdTEwNWEtXFx1MTA1ZFxcdTEwNjFcXHUxMDY1XFx1MTA2NlxcdTEwNmUtXFx1MTA3MFxcdTEwNzUtXFx1MTA4MVxcdTEwOGVcXHUxMGEwLVxcdTEwYzVcXHUxMGM3XFx1MTBjZFxcdTEwZDAtXFx1MTBmYVxcdTEwZmMtXFx1MTI0OFxcdTEyNGEtXFx1MTI0ZFxcdTEyNTAtXFx1MTI1NlxcdTEyNThcXHUxMjVhLVxcdTEyNWRcXHUxMjYwLVxcdTEyODhcXHUxMjhhLVxcdTEyOGRcXHUxMjkwLVxcdTEyYjBcXHUxMmIyLVxcdTEyYjVcXHUxMmI4LVxcdTEyYmVcXHUxMmMwXFx1MTJjMi1cXHUxMmM1XFx1MTJjOC1cXHUxMmQ2XFx1MTJkOC1cXHUxMzEwXFx1MTMxMi1cXHUxMzE1XFx1MTMxOC1cXHUxMzVhXFx1MTM4MC1cXHUxMzhmXFx1MTNhMC1cXHUxM2Y0XFx1MTQwMS1cXHUxNjZjXFx1MTY2Zi1cXHUxNjdmXFx1MTY4MS1cXHUxNjlhXFx1MTZhMC1cXHUxNmVhXFx1MTZlZS1cXHUxNmYwXFx1MTcwMC1cXHUxNzBjXFx1MTcwZS1cXHUxNzExXFx1MTcyMC1cXHUxNzMxXFx1MTc0MC1cXHUxNzUxXFx1MTc2MC1cXHUxNzZjXFx1MTc2ZS1cXHUxNzcwXFx1MTc4MC1cXHUxN2IzXFx1MTdkN1xcdTE3ZGNcXHUxODIwLVxcdTE4NzdcXHUxODgwLVxcdTE4YThcXHUxOGFhXFx1MThiMC1cXHUxOGY1XFx1MTkwMC1cXHUxOTFjXFx1MTk1MC1cXHUxOTZkXFx1MTk3MC1cXHUxOTc0XFx1MTk4MC1cXHUxOWFiXFx1MTljMS1cXHUxOWM3XFx1MWEwMC1cXHUxYTE2XFx1MWEyMC1cXHUxYTU0XFx1MWFhN1xcdTFiMDUtXFx1MWIzM1xcdTFiNDUtXFx1MWI0YlxcdTFiODMtXFx1MWJhMFxcdTFiYWVcXHUxYmFmXFx1MWJiYS1cXHUxYmU1XFx1MWMwMC1cXHUxYzIzXFx1MWM0ZC1cXHUxYzRmXFx1MWM1YS1cXHUxYzdkXFx1MWNlOS1cXHUxY2VjXFx1MWNlZS1cXHUxY2YxXFx1MWNmNVxcdTFjZjZcXHUxZDAwLVxcdTFkYmZcXHUxZTAwLVxcdTFmMTVcXHUxZjE4LVxcdTFmMWRcXHUxZjIwLVxcdTFmNDVcXHUxZjQ4LVxcdTFmNGRcXHUxZjUwLVxcdTFmNTdcXHUxZjU5XFx1MWY1YlxcdTFmNWRcXHUxZjVmLVxcdTFmN2RcXHUxZjgwLVxcdTFmYjRcXHUxZmI2LVxcdTFmYmNcXHUxZmJlXFx1MWZjMi1cXHUxZmM0XFx1MWZjNi1cXHUxZmNjXFx1MWZkMC1cXHUxZmQzXFx1MWZkNi1cXHUxZmRiXFx1MWZlMC1cXHUxZmVjXFx1MWZmMi1cXHUxZmY0XFx1MWZmNi1cXHUxZmZjXFx1MjA3MVxcdTIwN2ZcXHUyMDkwLVxcdTIwOWNcXHUyMTAyXFx1MjEwN1xcdTIxMGEtXFx1MjExM1xcdTIxMTVcXHUyMTE5LVxcdTIxMWRcXHUyMTI0XFx1MjEyNlxcdTIxMjhcXHUyMTJhLVxcdTIxMmRcXHUyMTJmLVxcdTIxMzlcXHUyMTNjLVxcdTIxM2ZcXHUyMTQ1LVxcdTIxNDlcXHUyMTRlXFx1MjE2MC1cXHUyMTg4XFx1MmMwMC1cXHUyYzJlXFx1MmMzMC1cXHUyYzVlXFx1MmM2MC1cXHUyY2U0XFx1MmNlYi1cXHUyY2VlXFx1MmNmMlxcdTJjZjNcXHUyZDAwLVxcdTJkMjVcXHUyZDI3XFx1MmQyZFxcdTJkMzAtXFx1MmQ2N1xcdTJkNmZcXHUyZDgwLVxcdTJkOTZcXHUyZGEwLVxcdTJkYTZcXHUyZGE4LVxcdTJkYWVcXHUyZGIwLVxcdTJkYjZcXHUyZGI4LVxcdTJkYmVcXHUyZGMwLVxcdTJkYzZcXHUyZGM4LVxcdTJkY2VcXHUyZGQwLVxcdTJkZDZcXHUyZGQ4LVxcdTJkZGVcXHUyZTJmXFx1MzAwNS1cXHUzMDA3XFx1MzAyMS1cXHUzMDI5XFx1MzAzMS1cXHUzMDM1XFx1MzAzOC1cXHUzMDNjXFx1MzA0MS1cXHUzMDk2XFx1MzA5ZC1cXHUzMDlmXFx1MzBhMS1cXHUzMGZhXFx1MzBmYy1cXHUzMGZmXFx1MzEwNS1cXHUzMTJkXFx1MzEzMS1cXHUzMThlXFx1MzFhMC1cXHUzMWJhXFx1MzFmMC1cXHUzMWZmXFx1MzQwMC1cXHU0ZGI1XFx1NGUwMC1cXHU5ZmNjXFx1YTAwMC1cXHVhNDhjXFx1YTRkMC1cXHVhNGZkXFx1YTUwMC1cXHVhNjBjXFx1YTYxMC1cXHVhNjFmXFx1YTYyYVxcdWE2MmJcXHVhNjQwLVxcdWE2NmVcXHVhNjdmLVxcdWE2OTdcXHVhNmEwLVxcdWE2ZWZcXHVhNzE3LVxcdWE3MWZcXHVhNzIyLVxcdWE3ODhcXHVhNzhiLVxcdWE3OGVcXHVhNzkwLVxcdWE3OTNcXHVhN2EwLVxcdWE3YWFcXHVhN2Y4LVxcdWE4MDFcXHVhODAzLVxcdWE4MDVcXHVhODA3LVxcdWE4MGFcXHVhODBjLVxcdWE4MjJcXHVhODQwLVxcdWE4NzNcXHVhODgyLVxcdWE4YjNcXHVhOGYyLVxcdWE4ZjdcXHVhOGZiXFx1YTkwYS1cXHVhOTI1XFx1YTkzMC1cXHVhOTQ2XFx1YTk2MC1cXHVhOTdjXFx1YTk4NC1cXHVhOWIyXFx1YTljZlxcdWFhMDAtXFx1YWEyOFxcdWFhNDAtXFx1YWE0MlxcdWFhNDQtXFx1YWE0YlxcdWFhNjAtXFx1YWE3NlxcdWFhN2FcXHVhYTgwLVxcdWFhYWZcXHVhYWIxXFx1YWFiNVxcdWFhYjZcXHVhYWI5LVxcdWFhYmRcXHVhYWMwXFx1YWFjMlxcdWFhZGItXFx1YWFkZFxcdWFhZTAtXFx1YWFlYVxcdWFhZjItXFx1YWFmNFxcdWFiMDEtXFx1YWIwNlxcdWFiMDktXFx1YWIwZVxcdWFiMTEtXFx1YWIxNlxcdWFiMjAtXFx1YWIyNlxcdWFiMjgtXFx1YWIyZVxcdWFiYzAtXFx1YWJlMlxcdWFjMDAtXFx1ZDdhM1xcdWQ3YjAtXFx1ZDdjNlxcdWQ3Y2ItXFx1ZDdmYlxcdWY5MDAtXFx1ZmE2ZFxcdWZhNzAtXFx1ZmFkOVxcdWZiMDAtXFx1ZmIwNlxcdWZiMTMtXFx1ZmIxN1xcdWZiMWRcXHVmYjFmLVxcdWZiMjhcXHVmYjJhLVxcdWZiMzZcXHVmYjM4LVxcdWZiM2NcXHVmYjNlXFx1ZmI0MFxcdWZiNDFcXHVmYjQzXFx1ZmI0NFxcdWZiNDYtXFx1ZmJiMVxcdWZiZDMtXFx1ZmQzZFxcdWZkNTAtXFx1ZmQ4ZlxcdWZkOTItXFx1ZmRjN1xcdWZkZjAtXFx1ZmRmYlxcdWZlNzAtXFx1ZmU3NFxcdWZlNzYtXFx1ZmVmY1xcdWZmMjEtXFx1ZmYzYVxcdWZmNDEtXFx1ZmY1YVxcdWZmNjYtXFx1ZmZiZVxcdWZmYzItXFx1ZmZjN1xcdWZmY2EtXFx1ZmZjZlxcdWZmZDItXFx1ZmZkN1xcdWZmZGEtXFx1ZmZkY11bJEEtWlxcX2EtelxceGFhXFx4YjVcXHhiYVxceGMwLVxceGQ2XFx4ZDgtXFx4ZjZcXHhmOC1cXHUwMmMxXFx1MDJjNi1cXHUwMmQxXFx1MDJlMC1cXHUwMmU0XFx1MDJlY1xcdTAyZWVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN2EtXFx1MDM3ZFxcdTAzODZcXHUwMzg4LVxcdTAzOGFcXHUwMzhjXFx1MDM4ZS1cXHUwM2ExXFx1MDNhMy1cXHUwM2Y1XFx1MDNmNy1cXHUwNDgxXFx1MDQ4YS1cXHUwNTI3XFx1MDUzMS1cXHUwNTU2XFx1MDU1OVxcdTA1NjEtXFx1MDU4N1xcdTA1ZDAtXFx1MDVlYVxcdTA1ZjAtXFx1MDVmMlxcdTA2MjAtXFx1MDY0YVxcdTA2NmVcXHUwNjZmXFx1MDY3MS1cXHUwNmQzXFx1MDZkNVxcdTA2ZTVcXHUwNmU2XFx1MDZlZVxcdTA2ZWZcXHUwNmZhLVxcdTA2ZmNcXHUwNmZmXFx1MDcxMFxcdTA3MTItXFx1MDcyZlxcdTA3NGQtXFx1MDdhNVxcdTA3YjFcXHUwN2NhLVxcdTA3ZWFcXHUwN2Y0XFx1MDdmNVxcdTA3ZmFcXHUwODAwLVxcdTA4MTVcXHUwODFhXFx1MDgyNFxcdTA4MjhcXHUwODQwLVxcdTA4NThcXHUwOGEwXFx1MDhhMi1cXHUwOGFjXFx1MDkwNC1cXHUwOTM5XFx1MDkzZFxcdTA5NTBcXHUwOTU4LVxcdTA5NjFcXHUwOTcxLVxcdTA5NzdcXHUwOTc5LVxcdTA5N2ZcXHUwOTg1LVxcdTA5OGNcXHUwOThmXFx1MDk5MFxcdTA5OTMtXFx1MDlhOFxcdTA5YWEtXFx1MDliMFxcdTA5YjJcXHUwOWI2LVxcdTA5YjlcXHUwOWJkXFx1MDljZVxcdTA5ZGNcXHUwOWRkXFx1MDlkZi1cXHUwOWUxXFx1MDlmMFxcdTA5ZjFcXHUwYTA1LVxcdTBhMGFcXHUwYTBmXFx1MGExMFxcdTBhMTMtXFx1MGEyOFxcdTBhMmEtXFx1MGEzMFxcdTBhMzJcXHUwYTMzXFx1MGEzNVxcdTBhMzZcXHUwYTM4XFx1MGEzOVxcdTBhNTktXFx1MGE1Y1xcdTBhNWVcXHUwYTcyLVxcdTBhNzRcXHUwYTg1LVxcdTBhOGRcXHUwYThmLVxcdTBhOTFcXHUwYTkzLVxcdTBhYThcXHUwYWFhLVxcdTBhYjBcXHUwYWIyXFx1MGFiM1xcdTBhYjUtXFx1MGFiOVxcdTBhYmRcXHUwYWQwXFx1MGFlMFxcdTBhZTFcXHUwYjA1LVxcdTBiMGNcXHUwYjBmXFx1MGIxMFxcdTBiMTMtXFx1MGIyOFxcdTBiMmEtXFx1MGIzMFxcdTBiMzJcXHUwYjMzXFx1MGIzNS1cXHUwYjM5XFx1MGIzZFxcdTBiNWNcXHUwYjVkXFx1MGI1Zi1cXHUwYjYxXFx1MGI3MVxcdTBiODNcXHUwYjg1LVxcdTBiOGFcXHUwYjhlLVxcdTBiOTBcXHUwYjkyLVxcdTBiOTVcXHUwYjk5XFx1MGI5YVxcdTBiOWNcXHUwYjllXFx1MGI5ZlxcdTBiYTNcXHUwYmE0XFx1MGJhOC1cXHUwYmFhXFx1MGJhZS1cXHUwYmI5XFx1MGJkMFxcdTBjMDUtXFx1MGMwY1xcdTBjMGUtXFx1MGMxMFxcdTBjMTItXFx1MGMyOFxcdTBjMmEtXFx1MGMzM1xcdTBjMzUtXFx1MGMzOVxcdTBjM2RcXHUwYzU4XFx1MGM1OVxcdTBjNjBcXHUwYzYxXFx1MGM4NS1cXHUwYzhjXFx1MGM4ZS1cXHUwYzkwXFx1MGM5Mi1cXHUwY2E4XFx1MGNhYS1cXHUwY2IzXFx1MGNiNS1cXHUwY2I5XFx1MGNiZFxcdTBjZGVcXHUwY2UwXFx1MGNlMVxcdTBjZjFcXHUwY2YyXFx1MGQwNS1cXHUwZDBjXFx1MGQwZS1cXHUwZDEwXFx1MGQxMi1cXHUwZDNhXFx1MGQzZFxcdTBkNGVcXHUwZDYwXFx1MGQ2MVxcdTBkN2EtXFx1MGQ3ZlxcdTBkODUtXFx1MGQ5NlxcdTBkOWEtXFx1MGRiMVxcdTBkYjMtXFx1MGRiYlxcdTBkYmRcXHUwZGMwLVxcdTBkYzZcXHUwZTAxLVxcdTBlMzBcXHUwZTMyXFx1MGUzM1xcdTBlNDAtXFx1MGU0NlxcdTBlODFcXHUwZTgyXFx1MGU4NFxcdTBlODdcXHUwZTg4XFx1MGU4YVxcdTBlOGRcXHUwZTk0LVxcdTBlOTdcXHUwZTk5LVxcdTBlOWZcXHUwZWExLVxcdTBlYTNcXHUwZWE1XFx1MGVhN1xcdTBlYWFcXHUwZWFiXFx1MGVhZC1cXHUwZWIwXFx1MGViMlxcdTBlYjNcXHUwZWJkXFx1MGVjMC1cXHUwZWM0XFx1MGVjNlxcdTBlZGMtXFx1MGVkZlxcdTBmMDBcXHUwZjQwLVxcdTBmNDdcXHUwZjQ5LVxcdTBmNmNcXHUwZjg4LVxcdTBmOGNcXHUxMDAwLVxcdTEwMmFcXHUxMDNmXFx1MTA1MC1cXHUxMDU1XFx1MTA1YS1cXHUxMDVkXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2ZS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4ZVxcdTEwYTAtXFx1MTBjNVxcdTEwYzdcXHUxMGNkXFx1MTBkMC1cXHUxMGZhXFx1MTBmYy1cXHUxMjQ4XFx1MTI0YS1cXHUxMjRkXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNWEtXFx1MTI1ZFxcdTEyNjAtXFx1MTI4OFxcdTEyOGEtXFx1MTI4ZFxcdTEyOTAtXFx1MTJiMFxcdTEyYjItXFx1MTJiNVxcdTEyYjgtXFx1MTJiZVxcdTEyYzBcXHUxMmMyLVxcdTEyYzVcXHUxMmM4LVxcdTEyZDZcXHUxMmQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNWFcXHUxMzgwLVxcdTEzOGZcXHUxM2EwLVxcdTEzZjRcXHUxNDAxLVxcdTE2NmNcXHUxNjZmLVxcdTE2N2ZcXHUxNjgxLVxcdTE2OWFcXHUxNmEwLVxcdTE2ZWFcXHUxNmVlLVxcdTE2ZjBcXHUxNzAwLVxcdTE3MGNcXHUxNzBlLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NmNcXHUxNzZlLVxcdTE3NzBcXHUxNzgwLVxcdTE3YjNcXHUxN2Q3XFx1MTdkY1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThhOFxcdTE4YWFcXHUxOGIwLVxcdTE4ZjVcXHUxOTAwLVxcdTE5MWNcXHUxOTUwLVxcdTE5NmRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5YWJcXHUxOWMxLVxcdTE5YzdcXHUxYTAwLVxcdTFhMTZcXHUxYTIwLVxcdTFhNTRcXHUxYWE3XFx1MWIwNS1cXHUxYjMzXFx1MWI0NS1cXHUxYjRiXFx1MWI4My1cXHUxYmEwXFx1MWJhZVxcdTFiYWZcXHUxYmJhLVxcdTFiZTVcXHUxYzAwLVxcdTFjMjNcXHUxYzRkLVxcdTFjNGZcXHUxYzVhLVxcdTFjN2RcXHUxY2U5LVxcdTFjZWNcXHUxY2VlLVxcdTFjZjFcXHUxY2Y1XFx1MWNmNlxcdTFkMDAtXFx1MWRiZlxcdTFlMDAtXFx1MWYxNVxcdTFmMTgtXFx1MWYxZFxcdTFmMjAtXFx1MWY0NVxcdTFmNDgtXFx1MWY0ZFxcdTFmNTAtXFx1MWY1N1xcdTFmNTlcXHUxZjViXFx1MWY1ZFxcdTFmNWYtXFx1MWY3ZFxcdTFmODAtXFx1MWZiNFxcdTFmYjYtXFx1MWZiY1xcdTFmYmVcXHUxZmMyLVxcdTFmYzRcXHUxZmM2LVxcdTFmY2NcXHUxZmQwLVxcdTFmZDNcXHUxZmQ2LVxcdTFmZGJcXHUxZmUwLVxcdTFmZWNcXHUxZmYyLVxcdTFmZjRcXHUxZmY2LVxcdTFmZmNcXHUyMDcxXFx1MjA3ZlxcdTIwOTAtXFx1MjA5Y1xcdTIxMDJcXHUyMTA3XFx1MjEwYS1cXHUyMTEzXFx1MjExNVxcdTIxMTktXFx1MjExZFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMmEtXFx1MjEyZFxcdTIxMmYtXFx1MjEzOVxcdTIxM2MtXFx1MjEzZlxcdTIxNDUtXFx1MjE0OVxcdTIxNGVcXHUyMTYwLVxcdTIxODhcXHUyYzAwLVxcdTJjMmVcXHUyYzMwLVxcdTJjNWVcXHUyYzYwLVxcdTJjZTRcXHUyY2ViLVxcdTJjZWVcXHUyY2YyXFx1MmNmM1xcdTJkMDAtXFx1MmQyNVxcdTJkMjdcXHUyZDJkXFx1MmQzMC1cXHUyZDY3XFx1MmQ2ZlxcdTJkODAtXFx1MmQ5NlxcdTJkYTAtXFx1MmRhNlxcdTJkYTgtXFx1MmRhZVxcdTJkYjAtXFx1MmRiNlxcdTJkYjgtXFx1MmRiZVxcdTJkYzAtXFx1MmRjNlxcdTJkYzgtXFx1MmRjZVxcdTJkZDAtXFx1MmRkNlxcdTJkZDgtXFx1MmRkZVxcdTJlMmZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMjlcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM2NcXHUzMDQxLVxcdTMwOTZcXHUzMDlkLVxcdTMwOWZcXHUzMGExLVxcdTMwZmFcXHUzMGZjLVxcdTMwZmZcXHUzMTA1LVxcdTMxMmRcXHUzMTMxLVxcdTMxOGVcXHUzMWEwLVxcdTMxYmFcXHUzMWYwLVxcdTMxZmZcXHUzNDAwLVxcdTRkYjVcXHU0ZTAwLVxcdTlmY2NcXHVhMDAwLVxcdWE0OGNcXHVhNGQwLVxcdWE0ZmRcXHVhNTAwLVxcdWE2MGNcXHVhNjEwLVxcdWE2MWZcXHVhNjJhXFx1YTYyYlxcdWE2NDAtXFx1YTY2ZVxcdWE2N2YtXFx1YTY5N1xcdWE2YTAtXFx1YTZlZlxcdWE3MTctXFx1YTcxZlxcdWE3MjItXFx1YTc4OFxcdWE3OGItXFx1YTc4ZVxcdWE3OTAtXFx1YTc5M1xcdWE3YTAtXFx1YTdhYVxcdWE3ZjgtXFx1YTgwMVxcdWE4MDMtXFx1YTgwNVxcdWE4MDctXFx1YTgwYVxcdWE4MGMtXFx1YTgyMlxcdWE4NDAtXFx1YTg3M1xcdWE4ODItXFx1YThiM1xcdWE4ZjItXFx1YThmN1xcdWE4ZmJcXHVhOTBhLVxcdWE5MjVcXHVhOTMwLVxcdWE5NDZcXHVhOTYwLVxcdWE5N2NcXHVhOTg0LVxcdWE5YjJcXHVhOWNmXFx1YWEwMC1cXHVhYTI4XFx1YWE0MC1cXHVhYTQyXFx1YWE0NC1cXHVhYTRiXFx1YWE2MC1cXHVhYTc2XFx1YWE3YVxcdWFhODAtXFx1YWFhZlxcdWFhYjFcXHVhYWI1XFx1YWFiNlxcdWFhYjktXFx1YWFiZFxcdWFhYzBcXHVhYWMyXFx1YWFkYi1cXHVhYWRkXFx1YWFlMC1cXHVhYWVhXFx1YWFmMi1cXHVhYWY0XFx1YWIwMS1cXHVhYjA2XFx1YWIwOS1cXHVhYjBlXFx1YWIxMS1cXHVhYjE2XFx1YWIyMC1cXHVhYjI2XFx1YWIyOC1cXHVhYjJlXFx1YWJjMC1cXHVhYmUyXFx1YWMwMC1cXHVkN2EzXFx1ZDdiMC1cXHVkN2M2XFx1ZDdjYi1cXHVkN2ZiXFx1ZjkwMC1cXHVmYTZkXFx1ZmE3MC1cXHVmYWQ5XFx1ZmIwMC1cXHVmYjA2XFx1ZmIxMy1cXHVmYjE3XFx1ZmIxZFxcdWZiMWYtXFx1ZmIyOFxcdWZiMmEtXFx1ZmIzNlxcdWZiMzgtXFx1ZmIzY1xcdWZiM2VcXHVmYjQwXFx1ZmI0MVxcdWZiNDNcXHVmYjQ0XFx1ZmI0Ni1cXHVmYmIxXFx1ZmJkMy1cXHVmZDNkXFx1ZmQ1MC1cXHVmZDhmXFx1ZmQ5Mi1cXHVmZGM3XFx1ZmRmMC1cXHVmZGZiXFx1ZmU3MC1cXHVmZTc0XFx1ZmU3Ni1cXHVmZWZjXFx1ZmYyMS1cXHVmZjNhXFx1ZmY0MS1cXHVmZjVhXFx1ZmY2Ni1cXHVmZmJlXFx1ZmZjMi1cXHVmZmM3XFx1ZmZjYS1cXHVmZmNmXFx1ZmZkMi1cXHVmZmQ3XFx1ZmZkYS1cXHVmZmRjMC05XFx1MDMwMC1cXHUwMzZmXFx1MDQ4My1cXHUwNDg3XFx1MDU5MS1cXHUwNWJkXFx1MDViZlxcdTA1YzFcXHUwNWMyXFx1MDVjNFxcdTA1YzVcXHUwNWM3XFx1MDYxMC1cXHUwNjFhXFx1MDY0Yi1cXHUwNjY5XFx1MDY3MFxcdTA2ZDYtXFx1MDZkY1xcdTA2ZGYtXFx1MDZlNFxcdTA2ZTdcXHUwNmU4XFx1MDZlYS1cXHUwNmVkXFx1MDZmMC1cXHUwNmY5XFx1MDcxMVxcdTA3MzAtXFx1MDc0YVxcdTA3YTYtXFx1MDdiMFxcdTA3YzAtXFx1MDdjOVxcdTA3ZWItXFx1MDdmM1xcdTA4MTYtXFx1MDgxOVxcdTA4MWItXFx1MDgyM1xcdTA4MjUtXFx1MDgyN1xcdTA4MjktXFx1MDgyZFxcdTA4NTktXFx1MDg1YlxcdTA4ZTQtXFx1MDhmZVxcdTA5MDAtXFx1MDkwM1xcdTA5M2EtXFx1MDkzY1xcdTA5M2UtXFx1MDk0ZlxcdTA5NTEtXFx1MDk1N1xcdTA5NjJcXHUwOTYzXFx1MDk2Ni1cXHUwOTZmXFx1MDk4MS1cXHUwOTgzXFx1MDliY1xcdTA5YmUtXFx1MDljNFxcdTA5YzdcXHUwOWM4XFx1MDljYi1cXHUwOWNkXFx1MDlkN1xcdTA5ZTJcXHUwOWUzXFx1MDllNi1cXHUwOWVmXFx1MGEwMS1cXHUwYTAzXFx1MGEzY1xcdTBhM2UtXFx1MGE0MlxcdTBhNDdcXHUwYTQ4XFx1MGE0Yi1cXHUwYTRkXFx1MGE1MVxcdTBhNjYtXFx1MGE3MVxcdTBhNzVcXHUwYTgxLVxcdTBhODNcXHUwYWJjXFx1MGFiZS1cXHUwYWM1XFx1MGFjNy1cXHUwYWM5XFx1MGFjYi1cXHUwYWNkXFx1MGFlMlxcdTBhZTNcXHUwYWU2LVxcdTBhZWZcXHUwYjAxLVxcdTBiMDNcXHUwYjNjXFx1MGIzZS1cXHUwYjQ0XFx1MGI0N1xcdTBiNDhcXHUwYjRiLVxcdTBiNGRcXHUwYjU2XFx1MGI1N1xcdTBiNjJcXHUwYjYzXFx1MGI2Ni1cXHUwYjZmXFx1MGI4MlxcdTBiYmUtXFx1MGJjMlxcdTBiYzYtXFx1MGJjOFxcdTBiY2EtXFx1MGJjZFxcdTBiZDdcXHUwYmU2LVxcdTBiZWZcXHUwYzAxLVxcdTBjMDNcXHUwYzNlLVxcdTBjNDRcXHUwYzQ2LVxcdTBjNDhcXHUwYzRhLVxcdTBjNGRcXHUwYzU1XFx1MGM1NlxcdTBjNjJcXHUwYzYzXFx1MGM2Ni1cXHUwYzZmXFx1MGM4MlxcdTBjODNcXHUwY2JjXFx1MGNiZS1cXHUwY2M0XFx1MGNjNi1cXHUwY2M4XFx1MGNjYS1cXHUwY2NkXFx1MGNkNVxcdTBjZDZcXHUwY2UyXFx1MGNlM1xcdTBjZTYtXFx1MGNlZlxcdTBkMDJcXHUwZDAzXFx1MGQzZS1cXHUwZDQ0XFx1MGQ0Ni1cXHUwZDQ4XFx1MGQ0YS1cXHUwZDRkXFx1MGQ1N1xcdTBkNjJcXHUwZDYzXFx1MGQ2Ni1cXHUwZDZmXFx1MGQ4MlxcdTBkODNcXHUwZGNhXFx1MGRjZi1cXHUwZGQ0XFx1MGRkNlxcdTBkZDgtXFx1MGRkZlxcdTBkZjJcXHUwZGYzXFx1MGUzMVxcdTBlMzQtXFx1MGUzYVxcdTBlNDctXFx1MGU0ZVxcdTBlNTAtXFx1MGU1OVxcdTBlYjFcXHUwZWI0LVxcdTBlYjlcXHUwZWJiXFx1MGViY1xcdTBlYzgtXFx1MGVjZFxcdTBlZDAtXFx1MGVkOVxcdTBmMThcXHUwZjE5XFx1MGYyMC1cXHUwZjI5XFx1MGYzNVxcdTBmMzdcXHUwZjM5XFx1MGYzZVxcdTBmM2ZcXHUwZjcxLVxcdTBmODRcXHUwZjg2XFx1MGY4N1xcdTBmOGQtXFx1MGY5N1xcdTBmOTktXFx1MGZiY1xcdTBmYzZcXHUxMDJiLVxcdTEwM2VcXHUxMDQwLVxcdTEwNDlcXHUxMDU2LVxcdTEwNTlcXHUxMDVlLVxcdTEwNjBcXHUxMDYyLVxcdTEwNjRcXHUxMDY3LVxcdTEwNmRcXHUxMDcxLVxcdTEwNzRcXHUxMDgyLVxcdTEwOGRcXHUxMDhmLVxcdTEwOWRcXHUxMzVkLVxcdTEzNWZcXHUxNzEyLVxcdTE3MTRcXHUxNzMyLVxcdTE3MzRcXHUxNzUyXFx1MTc1M1xcdTE3NzJcXHUxNzczXFx1MTdiNC1cXHUxN2QzXFx1MTdkZFxcdTE3ZTAtXFx1MTdlOVxcdTE4MGItXFx1MTgwZFxcdTE4MTAtXFx1MTgxOVxcdTE4YTlcXHUxOTIwLVxcdTE5MmJcXHUxOTMwLVxcdTE5M2JcXHUxOTQ2LVxcdTE5NGZcXHUxOWIwLVxcdTE5YzBcXHUxOWM4XFx1MTljOVxcdTE5ZDAtXFx1MTlkOVxcdTFhMTctXFx1MWExYlxcdTFhNTUtXFx1MWE1ZVxcdTFhNjAtXFx1MWE3Y1xcdTFhN2YtXFx1MWE4OVxcdTFhOTAtXFx1MWE5OVxcdTFiMDAtXFx1MWIwNFxcdTFiMzQtXFx1MWI0NFxcdTFiNTAtXFx1MWI1OVxcdTFiNmItXFx1MWI3M1xcdTFiODAtXFx1MWI4MlxcdTFiYTEtXFx1MWJhZFxcdTFiYjAtXFx1MWJiOVxcdTFiZTYtXFx1MWJmM1xcdTFjMjQtXFx1MWMzN1xcdTFjNDAtXFx1MWM0OVxcdTFjNTAtXFx1MWM1OVxcdTFjZDAtXFx1MWNkMlxcdTFjZDQtXFx1MWNlOFxcdTFjZWRcXHUxY2YyLVxcdTFjZjRcXHUxZGMwLVxcdTFkZTZcXHUxZGZjLVxcdTFkZmZcXHUyMDBjXFx1MjAwZFxcdTIwM2ZcXHUyMDQwXFx1MjA1NFxcdTIwZDAtXFx1MjBkY1xcdTIwZTFcXHUyMGU1LVxcdTIwZjBcXHUyY2VmLVxcdTJjZjFcXHUyZDdmXFx1MmRlMC1cXHUyZGZmXFx1MzAyYS1cXHUzMDJmXFx1MzA5OVxcdTMwOWFcXHVhNjIwLVxcdWE2MjlcXHVhNjZmXFx1YTY3NC1cXHVhNjdkXFx1YTY5ZlxcdWE2ZjBcXHVhNmYxXFx1YTgwMlxcdWE4MDZcXHVhODBiXFx1YTgyMy1cXHVhODI3XFx1YTg4MFxcdWE4ODFcXHVhOGI0LVxcdWE4YzRcXHVhOGQwLVxcdWE4ZDlcXHVhOGUwLVxcdWE4ZjFcXHVhOTAwLVxcdWE5MDlcXHVhOTI2LVxcdWE5MmRcXHVhOTQ3LVxcdWE5NTNcXHVhOTgwLVxcdWE5ODNcXHVhOWIzLVxcdWE5YzBcXHVhOWQwLVxcdWE5ZDlcXHVhYTI5LVxcdWFhMzZcXHVhYTQzXFx1YWE0Y1xcdWFhNGRcXHVhYTUwLVxcdWFhNTlcXHVhYTdiXFx1YWFiMFxcdWFhYjItXFx1YWFiNFxcdWFhYjdcXHVhYWI4XFx1YWFiZVxcdWFhYmZcXHVhYWMxXFx1YWFlYi1cXHVhYWVmXFx1YWFmNVxcdWFhZjZcXHVhYmUzLVxcdWFiZWFcXHVhYmVjXFx1YWJlZFxcdWFiZjAtXFx1YWJmOVxcdWZiMWVcXHVmZTAwLVxcdWZlMGZcXHVmZTIwLVxcdWZlMjZcXHVmZTMzXFx1ZmUzNFxcdWZlNGQtXFx1ZmU0ZlxcdWZmMTAtXFx1ZmYxOVxcdWZmM2ZdKi9naSk7XG4gIH0sXG4gIGV2YWxJbkNvbnRleHQ6IGZ1bmN0aW9uIChqcykge1xuICAgIGpzID0ganMucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG5cblxuICAgIHZhciBrZXlzID0gW10sIHZhbHVlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3Qua2V5cyhhcmd1bWVudHNbaV0pKTtcbiAgICAgIGZvciAodmFyIGogaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKGFyZ3VtZW50c1tpXVtqXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL2lmKF8uaXNDb3JyZWN0VmFyaWFibGVOYW1lKGpzKSAmJiBrZXlzLmluZGV4T2YoanMpID09PSAtMSl7XG4gICAgLy8gIGtleXMucHVzaChqcyk7XG4gICAgLy8gIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgLy99XG5cbiAgICB2YXIgYXJyID0gdXRpbHMuZXh0cmFjdFZhcmlhYmxlcyhqcyk7XG4gICAgLy9jb25zb2xlLmxvZyhhcnIpO1xuICAgIGZvciAodmFyIGkgaW4gYXJyKSB7XG4gICAgICBpZiAoa2V5cy5pbmRleE9mKGFycltpXSkgPT09IC0xKSB7XG4gICAgICAgIGtleXMucHVzaChhcnJbaV0pO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBqcyA9IFwidmFyIGZvbyA9IGZ1bmN0aW9uKFwiICsga2V5cy5qb2luKFwiLFwiKSArIFwiKXsgdmFyIF9fcmV0dXJuX192YWx1ZSA9IFwiICsganMgKyBcIiA7cmV0dXJuIF9fcmV0dXJuX192YWx1ZTt9OyBmb287XCI7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBmb28gPSBldmFsKGpzKTtcbiAgICAgIHJldHVybiBmb28uYXBwbHkodGhpcywgdmFsdWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICB9LFxuICBjb21waWxlRWxlbWVudDogZnVuY3Rpb24gKCRpdGVtLCBzY29wZSkge1xuXG4gICAgZnVuY3Rpb24gX2VhY2hTZWxmKGVsLCBzZWxlY3RvciwgZm9vKSB7XG4gICAgICBlbC5maW5kKHNlbGVjdG9yKS5lYWNoKGZvbyk7XG4gICAgICBpZiAoZWwuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGZvby5jYWxsKGVsWzBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy5hZGRCYWNrKCdzZWxlY3RvcicpXG4gICAgX2VhY2hTZWxmKCRpdGVtLCBcIltvbmNsaWNrXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb25DbGljayA9ICQodGhpcykuYXR0cihcIm9uY2xpY2tcIik7XG4gICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoXCJvbmNsaWNrXCIpO1xuICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdXRpbHMuZXZhbEluQ29udGV4dChvbkNsaWNrLCBzY29wZSwge2V2ZW50OiBldmVudH0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgICBfZWFjaFNlbGYoJGl0ZW0sIFwiW29uY2hhbmdlXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb25DaGFuZ2UgPSAkKHRoaXMpLmF0dHIoXCJvbmNoYW5nZVwiKTtcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cihcIm9uY2hhbmdlXCIpO1xuICAgICAgJCh0aGlzKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHV0aWxzLmV2YWxJbkNvbnRleHQob25DaGFuZ2UsIHNjb3BlLCB7ZXZlbnQ6IGV2ZW50fSk7XG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgX2VhY2hTZWxmKCRpdGVtLCBcIltkcC1jaGVja2VkXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbCA9ICQodGhpcykuYXR0cihcImRwLWNoZWNrZWRcIik7XG4gICAgICB2YXIgdmFsID0gdXRpbHMuZXZhbEluQ29udGV4dChfdmFsLCBzY29wZSk7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgICQodGhpcykuYXR0cihcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiKTtcbiAgICAgIH1cblxuICAgIH0pO1xuICAgIF9lYWNoU2VsZigkaXRlbSwgXCJbZHAtc3JjXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbCA9ICQodGhpcykuYXR0cihcImRwLXNyY1wiKTtcbiAgICAgIHZhciB2YWwgPSB1dGlscy5ldmFsSW5Db250ZXh0KF92YWwsIHNjb3BlKTtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKFwic3JjXCIsIHZhbCk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICBfZWFjaFNlbGYoJGl0ZW0sIFwiW2RwLWlmXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ZhbCA9ICQodGhpcykuYXR0cihcImRwLWlmXCIpO1xuICAgICAgaWYgKF92YWwgPT09IFwiZmFsc2VcIikge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKF92YWwgPT09IFwidHJ1ZVwiKSB7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB2YWwgPSB1dGlscy5ldmFsSW5Db250ZXh0KF92YWwsIHNjb3BlKTtcbiAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgX2VhY2hTZWxmKCRpdGVtLCBcIltkcC1pbmNsdWRlXVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2VsID0gJCh0aGlzKTtcbiAgICAgIHZhciBfdmFsID0gX2VsLmF0dHIoXCJkcC1pbmNsdWRlXCIpO1xuICAgICAgdmFyIHZhbCA9IHV0aWxzLmV2YWxJbkNvbnRleHQoX3ZhbCwgc2NvcGUpO1xuICAgICAgX2VsLmxvYWQodmFsKTtcbiAgICB9KTtcbiAgfSxcbiAgcGFyc2VUZW1wbGF0ZTogZnVuY3Rpb24gKHRwbCwgc2NvcGUpIHtcbiAgICB2YXIgJGl0ZW0gPSAkKHRwbC5mb3JtYXQoc2NvcGUpKTtcbiAgICBfLmNvbXBpbGVFbGVtZW50KCRpdGVtLCBzY29wZSk7XG4gICAgcmV0dXJuICRpdGVtO1xuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC9jb21waWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZmFicmljLmRlYnVnID0gREVWRUxPUE1FTlQ7XG5cbmZhYnJpYy51dGlsLmRhdGEgPSByZXF1aXJlKCcuL3V0aWwvZGF0YS5qcycpO1xuZmFicmljLnV0aWwucGF0aCA9IHJlcXVpcmUoJy4vdXRpbC9wYXRoLmpzJyk7XG5mYWJyaWMudXRpbC5jb21waWxlID0gcmVxdWlyZSgnLi91dGlsL2NvbXBpbGUuanMnKTtcbmZhYnJpYy51dGlsLmxvYWRlciA9IHJlcXVpcmUoJy4vdXRpbC9sb2FkZXIuanMnKTtcbmZhYnJpYy51dGlsLm9iamVjdC5leHRlbmQoZmFicmljLnV0aWwub2JqZWN0LHJlcXVpcmUoJy4vdXRpbC9vYmplY3QuanMnKSk7XG5mYWJyaWMudXRpbC5vYmplY3QuZXh0ZW5kKGZhYnJpYy51dGlsLHJlcXVpcmUoJy4vdXRpbC91dGlsLmpzJykpO1xuXG4vL3JlcXVpcmUoJy4vbW9kdWxlcycpO1xuXG5cbmlmKCFmYWJyaWMuaXNMaWtlbHlOb2RlKXtcbiAgLyoqXG4gICAqIGlubGluZSBzY3JpcHQgaW1hZ2VzXG4gICAqIEB0eXBlIHt7ZXJyb3I6IHN0cmluZ319XG4gICAqL1xuICBmYWJyaWMubWVkaWEgPSB7XG4gICAgLyoqXG4gICAgICogcmVwbGFjZSBpbWFnZXMgbG9hZGVkIHdpdGggZXJyb3JzXG4gICAgICovXG4gICAgZXJyb3I6ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcgKyByZXF1aXJlKCdiYXNlNjQtbG9hZGVyIS4vbWVkaWEvZXJyb3ItYnV0dG9uLnN2ZycpXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzICA9IGZhYnJpYztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZmllcmEuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXNvbHZlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHZhciBjaHVua3MgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgICB2YXIgcHJldiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IGNodW5rcy5sZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAoY2h1bmtzW2ldID09IFwiLi5cIikge1xuICAgICAgICBwcmV2Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAocHJldiA+IDApIHtcbiAgICAgICAgICBjaHVua3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGNodW5rcy5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgICBwcmV2LS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNodW5rcy5qb2luKFwiL1wiKTtcbiAgfSxcbiAgZ2V0UGFyZW50RGlyZWN0b3J5VXJsOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgcmV0dXJuIHVybC5zdWJzdHIoMCwgdXJsLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWwvcGF0aC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7OztBQ2hFQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlOQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4OUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=