
require("./../mixins/proportianalSizeMixin");

fabric.util.object.extend(fabric.Image.prototype,fabric.ProportinalSizeMixin, {
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
