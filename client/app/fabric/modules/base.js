


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
    var middleIndex = this.optionsOrder.indexOf("*") || -1;

    var i = middleIndex, prop , keyIndex;

    while((prop = this.optionsOrder[--i])){
      if((keyIndex = keys.indexOf(prop)) !== -1){
        keys.splice(keyIndex, 1);
        keys.unshift(prop);
      }
    }
    i = middleIndex;
    while(prop = this.optionsOrder[++i]){
      if((keyIndex = keys.indexOf(prop)) !== -1){
        keys.splice(keyIndex, 1);
        keys.push(prop);
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
  _finalizeCurrentTransform: function () {

    var transform = this._currentTransform,
      target = transform.target;

    if (target._scaling) {
      target._scaling = false;
    }

    target.setCoords();

    this._restoreOriginXY(target);
    // only fire :modified event if target coordinates were changed during mousedown-mouseup
    this.fireModifiedIfChanged(target);
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
  // _set: function (key, value,callback) {
  //   if (this.specialProperties.indexOf(key) !== -1) {
  //     this["set" + fabric.util.string.capitalize(key, true)](value,callback);
  //   } else {
  //     fabric.Object.prototype._set.call(this, key, value);
  //   }
  //   return this;
  // },
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
