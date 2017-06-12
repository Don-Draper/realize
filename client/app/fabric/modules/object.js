'use strict';

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
    initProportinalSize : true,
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
    /**
     * @private
     * @param {Object} [options] Object with width/height properties
     */
    _setWidthHeight: function(options) {
      if('width' in options){
        this.width = options.width;
      }else{
        var _el = this.getElement();
        if(!_el || !_el.width){
          this.width = 0;
        }else{
          if(this.initProportinalSize && 'height' in options){
            this.width = (options.height  / _el.height ) * _el.width;
          } else {
            this.width = _el.width;
          }
        }
      }

      if('height' in options){
        this.height = options.height;
      }else{
        var _el = this.getElement();
        if(!_el || !_el.height){
          this.height = 0;
        }else{
          if(this.initProportinalSize && 'width' in options){
            this.height = (options.width  / _el.width ) * _el.height;
          } else {
            this.height = _el.height;
          }
        }
      }
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
    if (object.image) {
      var img = object.image;
      delete object.src;
      delete object.image;
      fabric.util.initFilters(img, object, callback);
    }
    if (object.src) {
      fabric.util.loadImage(object.src, function (img) {
        //delete object.src;
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
  fabric.Image.prototype.setSrc = function (opt) {
    console.log(opt);
  };

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
