'use strict';



// todo это убрать
fabric.movementsLimitsEasy = false;
var _toObject_overwritten = fabric.Object.prototype.toObject;
//todo use event "before:object";
fabric.Object.prototype.toObject = function (propertiesToInclude) {
  var obj = _toObject_overwritten.call(this,propertiesToInclude);
  var _storeAll = this.storeProperties.indexOf("*") != -1;
  if (this.clipTo && this.clipTo.id && (_storeAll || this.storeProperties.indexOf("clipTo") != -1)) {
    obj.clipTo = '#' + this.clipTo.id
  }
  if ( this.movementLimits &&  (_storeAll || this.storeProperties.indexOf("movementLimits") != -1)) {
    obj.movementLimits = this.movementLimits.id ? '#' + this.movementLimits.id : this.movementLimits;
  }
  return obj;
};

var _scaleObject_overwritten = fabric.Canvas.prototype._scaleObject;


fabric.util.object.extend(fabric.Object.prototype, {
  setWholeCoordinates: function(val){
    this.wholeCoordinates = val;
    this.on("added modified",function(){
      if(this.wholeCoordinates){
        this.set({
          left: Math.round(this.left),
          top: Math.round(this.top),
          width: Math.round(this.width),
          height: Math.round(this.height)
        })
      }
    },true)
  },
  // setTop: function(val){
  //   if(this.wholeCoordinates){
  //     val = Math.round(val);
  //   }
  //   this.top = val;
  // },
  // setLeft: function(val){
  //   if(this.wholeCoordinates){
  //     val = Math.round(val);
  //   }
  //   this.left = val;
  // },
  // setWidth: function(w){
  //   if(this.wholeCoordinates){
  //     w = Math.round(w);
  //   }
  //   this.width = w;
  // },
  // setHeight: function(h){
  //   if(this.wholeCoordinates){
  //     h = Math.round(h);
  //   }
  //   this.height = h;
  // },
  // specialProperties: fabric.Object.prototype.specialProperties.concat(["movementLimits"]),
  _setMovementLimitsString: function () {
    var val = this.movementLimits;
    if (val && val.constructor === String) {
      var val = this.movementLimits;
      if (val == 'canvas') {

        val = this.canvas;
      } else {
        var _id = this.movementLimits.substring(1);
        val = this.canvas.getObjectByID(_id);
      }
      this.movementLimits = val;
    }
    this.canvas._check_object_position(this);
    // this.canvas._check_object_position(this);
    // this.setCoords();

  },
  setMovementLimits: function (val) {


    if(!this.movementLimits){
      this.on({
        added: this._setMovementLimitsString,
        rotated: function (event) {
          var target = this;

          if (target.resizable) {
            if (pos.left !== undefined) {
              if (target.left < pos.left) {
                target.width += target.left - pos.left;
                target.left = pos.left;
              } else {
                target.width -= target.left - pos.left;
              }
            }
            if (pos.top !== undefined) {
              if (target.top < pos.top) {
                target.height += target.top - pos.top;
                target.top = pos.top;
              } else {
                target.height -= target.top - pos.top;
              }
            }
          }
          this.canvas._check_object_position(this)
        },
        modified: function (event) {
          this.canvas._check_object_after_modified(this)
        }
      });
    }
    this.movementLimits = val;

    if(this.canvas){
      this._setMovementLimitsString();
    }

  }
});

var _translateObject_overwritten = fabric.Canvas.prototype._translateObject;
var _beforeScaleTransform_overwritten = fabric.Canvas.prototype._beforeScaleTransform;
fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  specialProperties: fabric.SlideCanvas.prototype.specialProperties.concat(["movementLimits"]),
  _beforeScaleTransform_overwritten: _beforeScaleTransform_overwritten,
  _beforeScaleTransform: function (e, transform) {
    this._beforeScaleTransform_overwritten(e, transform);
    if (!this._currentTransform.original.oCoords) {
      this._currentTransform.original.oCoords = fabric.util.object.cloneDeep(this._currentTransform.target.oCoords);
    }
  },
  //fix getcenter function
  centerObject: function (object) {
    var center;
    if (object.movementLimits) {
      var _xy = object.movementLimits.getCenterPoint();
      center = {top: _xy.y, left: _xy.x};
    } else {
      center = this.getCenter();
    }
    this._centerObject(object, new fabric.Point(center.left, center.top));
    this.renderAll();
    return this;
  },
  getCenter: function () {
    return {
      top: this.originalHeight / 2 / this.getZoom(),
      left: this.originalWidth / 2 / this.getZoom()
    };
  },
  setMovementLimits: function (_offsets) {
    this.movementLimits = _offsets;

    return this;
  },
  movementLimits: {
    left: false,
    top: false,
    right: false,
    bottom: false
  },
  //content хотя бы  пиксель объекта должен быть внутри зоны
  //fit зона должно полностью находится внутри объекта
  movementLimitMode: "fit",
  getFixedPositionEasy: function (target, x, y) {
    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    if (x === undefined) {
      x = target.left;
    }
    if (y === undefined) {
      y = target.top;
    }
    var scale = this.viewportTransform[0];
    target.setCoords();
    target.right = _w - (target.left + target.width);
    target.bottom = _h - (target.top + target.height);

    var _diff, _asp, rect;
    var newPos = {
      left: x,
      top: y,
      width: target.width,
      height: target.height
    }

    if (target.width > _w) {
      newPos.width = _w;
    }
    if (target.height > _h) {
      newPos.height = _h;
    }
    if (target.left < 0) {
      newPos.width += target.left;
      newPos.left -= target.left;
    }
    if (target.right < 0) {
      newPos.width += target.right;
    }
    if (target.top < 0) {
      newPos.height += target.top;
    }
    if (target.bottom < 0) {
      newPos.height += target.bottom;
    }
    return newPos;
  },
  getMovementsLimitsRect: function(target){

    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;

    if (target.movementLimits == this) {
      return {
        left: 0,
        top: 0,
        width: _w,
        height: _h,
        right: 0,
        bottom: 0
      }
    }else{
      var _stroke_width = target.movementLimits.strokeWidth;
      target.movementLimits.strokeWidth = 0;

      target.movementLimits.setCoords();
      var rect = target.movementLimits.getBoundingRect();

      target.movementLimits.strokeWidth = _stroke_width;
      return rect;
    }
  },
  contentOffsets : 5,
  getFixedPosition: function (target, x, y) {


    var _w = this.originalWidth || this.width;
    var _h = this.originalHeight || this.height;


    if (x === undefined) {
      x = target.left;
    }
    if (y === undefined) {
      y = target.top;
    }
    var scale = this.viewportTransform[0];
    target.setCoords();
    var bounds = target.getBoundingRect();
    bounds.left /= scale;
    bounds.top /= scale;
    bounds.width /= scale;
    bounds.height /= scale;

    bounds.left -= this.viewportTransform[4] / scale;
    bounds.top -= this.viewportTransform[5] / scale;
    bounds.right = _w - (bounds.left + bounds.width);
    bounds.bottom = _h - (bounds.top + bounds.height);



    if (target.movementLimits) {
      var rect = this.getMovementsLimitsRect(target);


      if (target.movementLimits == this) {

        rect.width *= scale;
        rect.height *= scale;
      }
      else if (target.movementLimits.getBoundingRect) {


        //var sw = target.movementLimits.strokeWidth;

        rect.left /= scale;
        rect.top /= scale;
        rect.width /= scale;
        rect.height /= scale;
        rect.left -= this.viewportTransform[4] / scale;
        rect.top -= this.viewportTransform[5] / scale;

        //rect.left   += sw /2;
        //rect.top    += sw /2;
        //rect.width  -= sw;
        //rect.height -= sw;

        rect.right = _w - (rect.left + rect.width);
        rect.bottom = _h - (rect.top + rect.height);
      } else {
        rect = target.movementLimits;
      }
    }

    var limits = rect || this.movementLimits;

    var newPos = {};
    var _l = limits.left, _r = limits.right;
    var _t = limits.top, _b = limits.bottom;

    if (target.movementLimitMode == "content") {
      _l -= bounds.width - this.contentOffsets, _r -= bounds.width - this.contentOffsets;
      _t -= bounds.height - this.contentOffsets, _b -= bounds.height - this.contentOffsets;
    }

    if (target.movementLimitMode == "fit" && !target.resizable) {
      if (_l !== false && _r !== false) {
        var _w = _w - _l - _r;
        if (bounds.width > _w) {
          var _asp = _w / bounds.width;
          newPos.scaleX = _asp;
          newPos.scaleY = _asp;
        }
      }

      if (_t !== false && _b !== false) {
        var _h = _h - _t - _b;
        if (bounds.height > _h) {
          var _asp = _h / bounds.height;
          target.scaleX *= _asp;
          target.scaleY *= _asp;
        }
      }
    }

    if (target.movementLimitMode == "fit" || target.movementLimitMode == "content") {

      if (_l !== false) {
        var _diff = _l - bounds.left;
        if (_diff > 0) {
          newPos.left = x + _diff;
        }
      }

      if (!newPos.left && _r !== false) {
        var _diff = _r - bounds.right;
        if (_diff > 0) {
          newPos.left = x - _diff;
        }
      }

      if (_t !== false) {
        var _diff = _t - bounds.top;
        if (_diff > 0) {
          newPos.top = y + _diff;
        }
      }

      if (!newPos.top && _b !== false) {
        var _diff = _b - bounds.bottom;
        if (_diff > 0) {
          newPos.top = y - _diff;
        }
      }

    }

    return newPos;
  },
  /**
   * функцию можно вызвать с евентом  'after:render'. Позволяет отображать вычисления пересечений изменяемого объекта с рамкой. выделяет красными лиинияи
   * @private
   * @example
   *  eventListeners : {
    Canvas: {
      'before:render': function(){
        this.clearContext(this.contextTop);
      },
      'after:render': function(){
        this._debug_intersections()
      }
    }
  }
   */
  drawInterestionLines: function(){
    var tr = this._currentTransform;
    if (tr && tr._intersections) {
      var ctx = this.contextTop;
      ctx.beginPath();
      ctx.strokeStyle = "red";
      for(var i in tr._intersections){
        var _coord = tr._intersections[i];
        ctx.moveTo(_coord.x + 5, _coord.y);
        ctx.arc(_coord.x, _coord.y, 5, 0, 2 * Math.PI);
      }
      for(var i in tr.lines){
        var _l = tr.lines[i];
        ctx.moveTo(_l[0].x,_l[0].y);
        ctx.lineTo(_l[1].x,_l[1].y);
      }
      for(var i in tr.mlLines){
        var _l = tr.mlLines[i];
        ctx.moveTo(_l[0].x,_l[0].y);
        ctx.lineTo(_l[1].x,_l[1].y);
      }
      ctx.stroke();
    }
  },
  _scaleObjectEasy: function (x, y, by) {
    //_scaleObject_overwritten.call(this, x, y, by);
    var tr = this._currentTransform,
      target = tr.target,
      corner = tr.corner;
    if(!target.movementLimits){
      return _scaleObject_overwritten.call(this, x,y, by);
    }


    if (target.movementLimitMode !== 'fit')return;
    x = Math.min(target.movementLimits.width, Math.max(0,x));
    y = Math.min(target.movementLimits.height, Math.max(0,y));
    _scaleObject_overwritten.call(this, x,y, by);
  },
  /**
   * Scales object by invoking its scaleX/scaleY methods
   * @private
   * @param {Number} x pointer's x coordinate
   * @param {Number} y pointer's y coordinate
   * @param {String} by Either 'x' or 'y' - specifies dimension constraint by which to scale an object.
   *                    When not provided, an object is scaled by both dimensions equally
   */
  _scaleObject: function (x, y, by) {
    var _scaled = _scaleObject_overwritten.call(this, x, y, by);

    var tr = this._currentTransform,
      target = tr.target,
      corner = tr.corner;
    var _v = this.viewportTransform;

    if (!target.movementLimits || target.movementLimitMode !== "fit"){
      return _scaled;
    }
    target.setCoords();

    var _scale = this.getZoom();

    if(target.movementLimits == this){
      var _w = this.originalWidth || this.width;
      var _h = this.originalHeight || this.height;
      var _l = this.viewportTransform[4] ;
      var _t = this.viewportTransform[5] ;
      _w *= _scale;
      _h *= _scale;
      var _rc = {
        tl: {x: _l, y: _t},
        tr: {x: _l + _w, y: _t},
        bl: {x: _l, y: _t + _h},
        br: {x: _l + _w, y: _t + _h}
      }
    }else{
      target.movementLimits.setCoords();
      var _rc = target.movementLimits.oCoords;
    }


    if (!tr.pointerOffset) {
      tr.pointerOffset = {
        x: x * _v[0] - target.oCoords[corner].x,
        y: y * _v[3] - target.oCoords[corner].y
      }

      tr.pointCenter = target.getCenterPoint();
      tr.pointCenter.x *= _scale;
      tr.pointCenter.y *= _scale;
      tr.pointOriginal = tr.original.oCoords[corner];
    }

    tr.pointTranformed = target.oCoords[corner];

    tr.mlLines = [];
    tr.lines = [];
    function _intersection(corner, coordinate) {
      var _oc;
      if (coordinate == "x" && corner[0] != "m") {
        _oc = tr.original.oCoords["m" + corner[0]];
      } else if (coordinate == "y" && corner[0] != "m") {
        _oc = tr.original.oCoords["m" + corner[1]];
      } else {
        _oc = tr.pointCenter;
        _oc = {
          x: _oc.x + _v[4],
          y: _oc.y + _v[5]
        };
      }
      var _tc = target.oCoords[corner];

      tr.lines.push([_oc, _tc]);
      tr.mlLines.push([_rc.tl, _rc.tr]);
      tr.mlLines.push([_rc.tr, _rc.br]);
      tr.mlLines.push([_rc.br, _rc.bl]);
      tr.mlLines.push([_rc.bl, _rc.tl]);

      var inters = fabric.Intersection.intersectLinePolygon(_oc, _tc, [_rc.tl, _rc.tr, _rc.br, _rc.bl]);
      if (!inters.points.length) {
        return;
      }
      inters.points[0].coordinate = coordinate;
      tr._intersections.push(inters.points[0])

//         if (coordinate) {
//           var p1 = inters.points[0];

//           var corner2;
//           if (coordinate == "x") {
//             corner2 = (corner[0] == "t" ? "b" : "t") + corner[1];
//           } else {
//             corner2 = corner[0] + (corner[1] == "l" ? "r" : "l");
//           }
//           var _p2 = target.oCoords[corner2];
//           var _diff = {x: _tc.x - p1.x, y: _tc.y - p1.y};

//           var p2 = {
//             x: _p2.x - _diff.x,
//             y: _p2.y - _diff.y
//           };

//           var its = fabric.Intersection.intersectLineLine(tr.pointCenter, tr.pointTranformed, p1, p2);
//           if (!its.points[0]) {
//             return;
//           }
//           tr._intersections.push(its.points[0]);
//         } else {
//           tr._intersections.push(inters.points[0]);
//         }


      //
      //if(inters.points.length){
      //  _scaleObject_overwritten.call(this, inters.points[0].x,  inters.points[0].y, by);
      //  target.setCoords();
      //}else{
      //  _scaleObject_overwritten.call(this, x, y, by);
      //}
    }


    tr._intersection = null;
    tr._intersections = [];
    switch (corner) {
      case "tl":
        _intersection("tl");
        _intersection("bl", "x");
        _intersection("tr", "y");
        break;
      case "tr":
        _intersection("tr");
        _intersection("tl", "y");
        _intersection("br", "x");
        break;
      case "br":
        _intersection("br");
        _intersection("tr", "x");
        _intersection("bl", "y");
        break;
      case "bl":
        _intersection("bl");
        _intersection("tl", "x");
        _intersection("br", "y");
        break;
      case "mt":
        _intersection("mt");
        _intersection("tl", "y");
        _intersection("tr", "y");
        break;
      case "mb":
        _intersection("mb");
        _intersection("bl", "y");
        _intersection("br", "y");
        break;
      case "mr":
        _intersection("mr");
        _intersection("tr", "x");
        _intersection("br", "x");
        break;
      case "ml":
        _intersection("ml");
        _intersection("tl", "x");
        _intersection("bl", "x");
    }

    if (!tr._intersections.length) {
      return _scaled;
    }


    var _newXY = tr._intersections[0];
    var _l = tr._intersections[0].distanceFrom(tr.pointOriginal);

    for (var i = 1; i < tr._intersections.length; i++) {
      var _l2 = tr._intersections[i].distanceFrom(tr.pointOriginal);
      if (_l2 < _l) {
        _newXY = tr._intersections[i];
        _l = _l2;
      }
    }
    tr._intersection = _newXY;


    if (by == "equally") {
      //by = false;

      var _diff2 = {x: _newXY.x - tr.pointCenter.x, y: _newXY.y - tr.pointCenter.y};
      var _l = Math.sqrt(_diff2.x * _diff2.x + _diff2.y * _diff2.y);

      _newXY.x -= _diff2.x / _l * target.strokeWidth;
      _newXY.y -= _diff2.y / _l * target.strokeWidth;
      // scrt(x*x + y*y) = atrokewidth
      var a = 1;
    }
    //return _scaleObject_overwritten.call(this, x, y, by);
    var __x = (_newXY.x + tr.pointerOffset.x ) / _v[0];
    var __y = (_newXY.y + tr.pointerOffset.y ) / _v[3];
    return _scaleObject_overwritten.call(this, __x, __y, by);

    //
    //if (corner == "br" || corner == "tr" || corner == "mr") {
    //  if (x < target.movementXMaxLimit) {
    //    x = target.movementXMaxLimit;
    //  }
    //}
    //if (corner == "bl" || corner == "tl" || corner == "ml") {
    //  if (x > target.movementXMinLimit) {
    //    x = target.movementXMinLimit;
    //  }
    //}
    //if (corner == "bl" || corner == "br" || corner == "mb") {
    //  if (y < target.movementYMaxLimit) {
    //    y = target.movementYMaxLimit;
    //  }
    //}
    //if (corner == "tl" || corner == "tr" || corner == "mt") {
    //  if (y > target.movementYMinLimit) {
    //    y = target.movementYMinLimit;
    //  }
    //}
    //
    //_scaleObject_overwritten.call(this, x, y, by);
  },
  movementLimitsOnAddAction: 'translate',
  _check_object_after_modified: function (target) {
    if (!this._currentTransform) {
      return;
    }
    var pos = this.getFixedPosition(target, target.left, target.top);

    switch (this._currentTransform.corner) {
      case "mtr":
        if (pos.left !== undefined) {
          target.set('left', pos.left);
        }
        if (pos.top) {
          target.set('top', pos.top);
        }
        break;
      case "mr":
      case "br":
        if (pos.left !== undefined) {
          var _ldiff = target.left - pos.left;

        }
        if (pos.top !== undefined) {
          var _tdiff = target.top - pos.top;
        }

        if (_ldiff && (!_tdiff || Math.abs(_ldiff) > Math.abs(_tdiff))) {
          if (_ldiff < 0) {
            target.width += _ldiff;
          } else {
            target.width -= _ldiff;
          }
        } else if (_tdiff) {
          if (_tdiff < 0) {
            target.width += _tdiff;
          } else {
            target.width -= _tdiff;
          }
        }
      //console.log(pos,_ldiff,_tdiff)
    }
    // this._check_object_position(target)
  },
  _check_object_position: function (target) {

    var pos = this.getFixedPosition(target, target.left, target.top);
    if (this.movementLimitsOnAddAction == 'translate') {
      if (pos.left !== undefined) {
        target.set('left', pos.left);
      }
      if (pos.top !== undefined) {
        target.set('top', pos.top);
      }
    }else{

      if (pos.left !== undefined) {
        if (target.left < pos.left) {
          target.width += target.left - pos.left;
          target.left = pos.left;
        } else {
          target.width -= target.left - pos.left;
        }
      }
      if (pos.top !== undefined) {
        if (target.top < pos.top) {
          target.height += target.top - pos.top;
          target.top = pos.top;
        } else {
          target.height -= target.top - pos.top;
        }
      }
    }


    if (pos.scaleX) {
      target.scaleX = target.scaleX *= pos.scaleX;
    }
    if (pos.scaleY) {
      target.scaleY = target.scaleY *= pos.scaleY;
    }

    target.setCoords();

    this.renderAll();
    // if(target.wholeCoordinates){
    //   target.top = Math.round(target.top);
    //   target.left = Math.round(target.left);
    //   target.height = Math.round(target.height);
    //   target.width = Math.round(target.width);
    // }
  },
  _translateObject: function (x, y, limits) {
    var target = this._currentTransform.target;
    if(target.beforeTranslate){
      var _point = target.beforeTranslate(x, y);
      if(!_point)return false;
      x = _point.x;
      y = _point.y;
    }
    var _translated = _translateObject_overwritten.call(this, x, y, limits);

    var pos = this.getFixedPosition(target, x, y);

    if (pos.scaleX) {
      target.scaleX = this._currentTransform.scaleX *= pos.scaleX;
    }
    if (pos.scaleY) {
      target.scaleY = this._currentTransform.scaleY *= pos.scaleY;
    }

    if (pos.top !== undefined || pos.left !== undefined) {
      _translated = _translateObject_overwritten.call(this,
        pos.left !== undefined ? pos.left : x,
        pos.top !== undefined ? pos.top : y);
    }
    return _translated || pos.scaleX || pos.scaleY;



    /* if (!target.get('lockMovementX')) {
     var _val = x - this._currentTransform.offsetX;

     //left offset
     var lim = this.movementLimits.minX.constructor == Number ? this.movementLimits.minX : -bounds.width + 1;
     if(target.movementXMinLimit && target.movementXMinLimit.constructor == Number && target.movementXMinLimit > lim ){
     lim = target.movementXMinLimit ;
     }

     _val = Math.min(lim, _val);

     //right offset
     var lim = this.movementLimits.maxX.constructor == Number ? this.movementLimits.maxX : this.width + bounds.width - 1;
     if(target.movementXMaxLimit && target.movementXMaxLimit.constructor == Number && target.movementXMaxLimit > lim ){
     lim = target.movementXMaxLimit ;
     }
     _val = Math.max(lim  - target.width * target.scaleX, _val);
     target.set('left', _val);
     }
     if (!target.get('lockMovementY')) {
     var _val = y - this._currentTransform.offsetY;
     if(target.movementYMinLimit !== undefined)
     _val = Math.min(target.movementYMinLimit, _val);
     if(target.movementYMaxLimit !== undefined)
     _val = Math.max(target.movementYMaxLimit  - target.height, _val);

     target.set('top', _val);
     }
     */
    //movementLimits ={
    //    xmin: 0,
    //    xmax: 0,
    //    ymin: 0,
    //    ymax: 0
    //};

  }

});

//fabric.SlideCanvas.addPlugin("loaders",function(){
//    this.initMovementLimits();
//});

//todo
fabric.Rect.prototype.stateProperties   = fabric.Rect.prototype.stateProperties.concat(["movementLimits","clipTo"]);
fabric.Object.prototype.stateProperties = fabric.Object.prototype.stateProperties.concat(["movementLimits","clipTo"]);
fabric.IText.prototype.stateProperties  = fabric.IText.prototype.stateProperties.concat(["movementLimits","clipTo"]);
fabric.Image.prototype.stateProperties  = fabric.Image.prototype.stateProperties.concat(["movementLimits","clipTo"]);


var _beforeTransform_overwritten = fabric.Canvas.prototype._beforeTransform;
var _finalize_current_transform_overwritten = fabric.Canvas.prototype._finalizeCurrentTransform;
var _restoreOriginXYNative = fabric.Canvas.prototype._restoreOriginXY;
fabric.util.object.extend(fabric.Canvas.prototype, {

  _finalizeCurrentTransformNative: fabric.Canvas.prototype._finalizeCurrentTransform,
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

    // target._finalizeCurrentTransform ?
    //   target._finalizeCurrentTransform() :
    //   this._finalizeCurrentTransformNative(this);
  },
  _beforeTransform: function (e, target) {
    target && target._beforeTransform ?
      target._beforeTransform(e) :
      _beforeTransform_overwritten.call(this, e, target);
  },
  _beforeTransformNative: _beforeTransform_overwritten,
  /**
   * Translates object by "setting" its left/top
   * @private
   * @param {Number} x pointer's x coordinate
   * @param {Number} y pointer's y coordinate
   * @return {Boolean} true if the translation occurred
   */
  _translateObject: function (x, y) {
    var transform = this._currentTransform,
      target = transform.target,
      newLeft = x - transform.offsetX,
      newTop = y - transform.offsetY,
      moveX = !target.get('lockMovementX') && target.left !== newLeft,
      moveY = !target.get('lockMovementY') && target.top !== newTop;


    //round coordinates
    // if (target.wholeCoordinates) {
    //   newLeft = Math.round(newLeft);
    //   newTop = Math.round(newTop);
    // }

    moveX && target.set('left', newLeft);
    moveY && target.set('top', newTop);
    return moveX || moveY;
  },

  // _restoreOriginXYNative: _restoreOriginXYNative,
  // _restoreOriginXY: function (target) {
  //   this._restoreOriginXYNative(target);
  //
  //   // if (target.wholeCoordinates) {
  //   //   target.left = Math.round(target.left);
  //   //   target.top = Math.round(target.top);
  //   // }
  // },

  /**
   * Sets the position of the object taking into consideration the object's origin
   * @param {fabric.Point} pos The new position of the object
   * @param {String} originX Horizontal origin: 'left', 'center' or 'right'
   * @param {String} originY Vertical origin: 'top', 'center' or 'bottom'
   * @return {void}
   */
  setPositionByOrigin: function (pos, originX, originY) {
    var center = this.translateToCenterPoint(pos, originX, originY),
      position = this.translateToOriginPoint(center, this.originX, this.originY);

    // if (this.wholeCoordinates) {
    //   position.x = Math.round(position.x);
    //   position.y = Math.round(position.y);
    // }
    this.set('left', position.x);
    this.set('top', position.y);
  }
});
