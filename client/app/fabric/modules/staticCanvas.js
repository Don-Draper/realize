
var ExtCanvasMixin = {
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
        _self.fitObject(el);
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
  getCenter: function (el) {
    return {
      top: (this.originalHeight  || this.getHeight()) / 2,
      left: (this.originalWidth || this.getWidth()) / 2
    };
  },
  fitObject: function (el) {
    var _rect, maxSize, offsets;

    if(el.movementLimits && el.movementLimits.constructor !== Function){
      var lim = el.movementLimits;
      _rect = {
        left:   lim.left * lim.scaleX,
        width:  lim.width * lim.scaleX ,
        top:    lim.top * lim.scaleY,
        height: lim.height * lim.scaleY
      };
      //maxSize = _rect;
     // offsets = lim;
    }else{
      var _zoom = this.getZoom();
      var _w = this.originalWidth || this.width / _zoom;
      var _h = this.originalHeight || this.height / _zoom;
      _rect = {
        width: this.offsets ? (_w - this.offsets.left - this.offsets.right) : _w,
        height: this.offsets ?(_h - this.offsets.top - this.offsets.bottom) : _h
      };
     /* offsets = {
        left: this.offsets && this.offsets.top ||0 ,
        top:  this.offsets &&  this.offsets.left ||0
      }*/
    }
    maxSize = {
      width: _rect.width * this.fitIndex,
      height: _rect.height * this.fitIndex
    };
    var size = fabric.util.getProportions(el, maxSize, 'fit');

    el.setOptions({
      scaleX: size.scale,
      scaleY: size.scale
    });
    this.centerObject(el);
    el.setCoords();
  },
  fitIndex: 0.8,
  setOriginalSize: function (w, h) {
    this.originalWidth = h ? w : (w.naturalWidth || w.width);
    this.originalHeight = h ? h : (w.naturalHeight || w.height);
    return this;
  }
};

fabric.util.object.extend(fabric.StaticCanvas.prototype,ExtCanvasMixin);
fabric.util.object.extend(fabric.Canvas.prototype,ExtCanvasMixin);
