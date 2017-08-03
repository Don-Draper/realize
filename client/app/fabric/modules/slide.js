'use strict';

require("./static-canvas.ext");

/**
 * # SlideCanvas
 * Inherited from fabric.Canvas
 *
 *

 ## method: load

Mathod allows to add new objects and set new attributes of canvas.

 ```javascript
 load : ({
    backgroundImage: string,
    objects: [FabricShapeOptions],
    customSyncOption: any,
    customAsyncOption: any
  },callback) : void
 ```

 To extend loading behavior and use custom options it is possible to define **set fucntions** in Canvas prototype.

 ```javascript
 // Canvas Prototype
 setCustomAsyncOption: function(val,callback){
  this.doAsyncMethod(val,callback)
}
 setCustomSyncOption: function(val){
  this.customSyncOtion = val;
}
 ```

 ### attribute: backgroundImageProperties

 default attributes for background image

 ### freeDrawingBrush

 default active drawing brush

 ```
 freeDrawingBrush: "PaintBucketBrush" | "PaintPenBrush" | "PencilBrush"
 ```

 ### attribute: onSlideLoaded

 onSlideLoaded calls as a callback for load fucntion

 ### attribute: backgroundPosition

 onSlideLoaded calls as a callback for load fucntion

 ```
 backgroundPosition: 'manual' | 'resize' | 'fit' | 'cover' | 'center'
 ```

 - manual - background will ne not scaled and put at left top corner
 - resize - canvas will be resized according to image size
 - fit - will be scaled to fit canvas size
 - cover - will be scaled to cover all canvas size
 - center - backogrund will be not scaled but put in the middle

 ### method: setInteractiveMode

 switch between drawing and hand( moving cunvas by mouse) modes

 ```javascript
 canvas.setInteractiveMode( mode : "hand" | "mixed") : void
 ```

 ### drawingColor

 drawing color using by brushes

 */
fabric.SlideCanvas = fabric.util.createClass(fabric.Canvas,fabric.PluginsMixin, {
  type: 'slide-canvas',
  /**
   * initialized width of the canvas
   */
  width: 160 ,
  /**
   * initialized height of the canvas
   */
  height: 90,
  /**
   * output quality
   */
  dotsPerUnit: 1,
  scale: 1,
  loaded: false,
  /**
   * allow user to interact with canvas
   */
  interactive: true,
  /**
   * fill not the slide area, but whole canvas with background color
   */
  insertBackgroundColor: false,
  uploadClass: 'Image',
  uploadImageTool: false,
  addTextTool: false,
  insertAddText: false,
  insertUploadImage: false,
  defaultText: "text",
  defaultTextType: "text",
  thumbSize: {
    width: 50,
    height: 100
  },
  storeProperties: ['*','backgroundImage','width','height'],
  contextTopImageSmoothingEnabled: true,
  plugins: {
    initialize: [
    ],
    preloaders: [
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
  setBackgroundColor: function(backgroundColor, callback) {
    return this.__setBgOverlayColor('backgroundColor', backgroundColor, function(){
      this.renderAll();
      callback && callback()
    }.bind(this));
  },
  setInteractive: function (value) {
    this.interactive = value;
  },
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
  _createUpperCanvas: function () {
    fabric.Canvas.prototype._createUpperCanvas.call(this);
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
  /**
   * Additional Event Listeners
   *  - loading:end
   *  - target:modified - couldbe used to detect active object changes
   *  - target:changed
   *  - target:cleared
   */
  eventListeners: {
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
  }
});
fabric.SlideCanvas.__idcounter = 0;
fabric.SlideCanvas.fromJson = function(url,callback , element){
  fabric.util.data.loadJson(url,function(data){
    new fabric.SlideCanvas(element,data,callback)
  })
};

fabric.SlideCanvas.prototype.actions = fabric.util.object.extend({}, {
  selectAll: {
   title: 'selectAll',
   type: 'key'
  },
  backgroundColor : {
    type: "color"
  },
  addText: {
    className:  'fa fa-font',
    title: 'text',
    action: function () {
      this.addText(this.defaultText,{});
    }
  }
});

fabric.util.object.extend(fabric.Application.prototype, {
  setSlide: function (value, callback) {
    var _canvas = this.canvas;
    if (_canvas.load) {
      _canvas.load(value, callback);
    } else {
      _canvas.createObjects(value, callback);
    }
  }
});

fabric.Application.prototype.canvasClass = 'SlideCanvas';
