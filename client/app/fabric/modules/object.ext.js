'use strict';

var isVML = function() { return typeof G_vmlCanvasManager !== 'undefined'; }

//weird stuff
// delete fabric.Rect.prototype.toObject;
// fabric.Rect.prototype.storeProperties = ["*","rx","ry"];

fabric.INCLUDE_ALL = "*";

var _toObject_overwritten = fabric.Object.prototype.toObject;
fabric.util.object.extend(fabric.Object.prototype, {
  storeProperties: ['*'],
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
  }
});
