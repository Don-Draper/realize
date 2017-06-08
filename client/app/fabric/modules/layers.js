'use strict';


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
