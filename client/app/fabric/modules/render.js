'use strict';


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
