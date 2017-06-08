'use strict';



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

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  _default_event_listeners: {
    "dimensions:modified": function () {
      this.centerAndZoomOut();
    },
    'viewport:scaled': function () {
      if (this.backgroundImage) {
        this.backgroundImage.updateResponsiveBorder();
      }
      for (var i in this._objects) {
        this._objects[i].updateResponsiveBorder();
      }
    },
    "background-image:loaded": function (event) {
      if (this.autoCenterAndZoomOutEnabled) {
        this.centerAndZoomOut();
      }
    },
    "loading:end": function (event) {
      if (this.autoCenterAndZoomOutEnabled && (this.originalHeight || this.originalWidth)) {
        this.centerAndZoomOut();
      }
    },
    "object:added": function (event) {
      event.target.updateResponsiveBorder()
    }
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  zoomCtrlKey: true,
  mouseWheelEnabled : false,
  _setZoomNative  : fabric.Canvas.prototype.setZoom,
  _zoomToPointNative  : fabric.Canvas.prototype.zoomToPoint,
  insertZoom: false,
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

    var vpt = this.viewportTransform.slice(0);
    vpt[0] = options.scale;
    vpt[3] = options.scale;
    vpt[4] = (_containerSize.width - options.width ) / 2;
    vpt[5] = (_containerSize.height - options.height) / 2;

    this.setViewportTransform(vpt);


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
