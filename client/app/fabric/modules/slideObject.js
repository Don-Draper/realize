
fabric.util.object.extend(fabric.Object.prototype, {
  hasBoundsControls: true,
  flipTools:     false,
  orderTools:    false,
  stroke: "transparent",
  onTop: function () {
    return this.canvas._objects.indexOf(this) == this.canvas._objects.length - 1;
  },
  flop: function () {
    this.flipY = !this.flipY;
    this.canvas.renderAll();
  },
  flip: function () {
    this.flipX = !this.flipX;
    this.canvas.renderAll();
  },
  onBottom: function () {
    return this.canvas._objects.indexOf(this) == 0;
  },
  duplicate: function() {
    var _object = this.toObject(fabric.INCLUDE_ALL);
    _object.active = true;

    var _clone = _object.cloneSync && _object.cloneSync() || this.canvas.createObject(_object);
    return _clone;
  },
  insertDuplicate: false,
  insertRemove: false,
  insertBoundingRect: false,
  insertDimensions: false,
  insertPosition: false,
  minStrokeWidth: 0,
  maxStrokeWidth: function(){
    return Math.min(this.width,this.height) / 2;
  },
  actions: {
    boundingRect: {
      type: 'label',
      template: '<dt>L:</dt><dd class="{leftClass}" title="{left}">{roundLeft}</dd><dt>T:</dt><dd class="{topClass}"  title="{top}">{roundTop}</dd><dt>R:</dt><dd class="{rightClass}" title="{right}">{roundRight}</dd><dt>B:</dt><dd class="{bottomClass}"  title="{bottom}">{roundBottom}</dd>',
      value: {
        observe: "modified scaling moving rotating",
        get: function(){
          var _rect = this.getBoundingRect();

          if(this.movementLimits) {

            if (this.movementLimits == this.canvas) {
              var _v = this.canvas.viewportTransform;
              var _mlr = {
                left: _v[4],
                top: _v[5],
                width: (this.canvas.originalWidth || this.canvas.width) * _v[0],
                height: (this.canvas.originalHeight || this.canvas.height)  * _v[3],
                right: 0,
                bottom: 0
              }
            }else{
              _mlr = this.movementLimits.getBoundingRect();
            }


            _rect.bottom = this.movementLimits.height - _rect.height;
            var _t = _rect.top - _mlr.top;
            var _l = _rect.left - _mlr.left;
            var _r = _mlr.width - _rect.width - _l;
            var _b = _mlr.height - _rect.height - _t;
          }else{
            _t = _rect.top;
            _l = _rect.left;
            _b = this.canvas.height - _rect.height - _rect.top;
            _r  = this.canvas.width - _rect.width - _rect.left;
          }

          return {
            topClass: _t > 0 ? "positive" : _t < 0 ? "negative" : "zero",
            bottomClass: _b > 0 ? "positive" : _b < 0 ? "negative" : "zero",
            leftClass: _l > 0 ? "positive" : _l < 0 ? "negative" : "zero",
            rightClass: _r > 0 ? "positive" : _r < 0 ? "negative" : "zero",
            top:    _t,
            left:   _l,
            bottom: _b,
            right:  _r,
            roundTop:    Math.round(_t),
            roundLeft:   Math.round(_l),
            roundBottom: Math.round(_b),
            roundRight:  Math.round(_r)
          }
        }
      }
    },
    position: {
      title: 'position',
      type: 'menu',
      menu: {
        objectLeft: {
          type:   'number',
          title:  'left',
          value: {
            set: function (val) {
              this.left = val;
              this.fire("modified");
              this.canvas.fire("object:modified", {target: this});
              this.canvas.renderAll();
            },
            get: function () {
              return this.left;
            },
            observe: "modified"
          }
        },
        objectTop: {
          type:   'number',
          title:  'top',
          value: {
            set: function (val) {
              this.top = val;
              this.fire("modified");
              this.canvas.fire("object:modified", {target: this});
              this.canvas.renderAll();
            },
            get: function () {
              return this.top;
            },
            observe: "modified"
          }
        }
      }
    },
    dimensions: {
      title: 'dimensions',
      type: 'menu',
      menu:{
        objectWidth: {
          type:   'number',
          title:  'width',
          value: {
            set: function(val){
              this.saveState();
              this.dimensionsWidthValue = val;
              this.scaleToWidth(val *  this.canvas.getZoom());
              this.canvas.fireModifiedIfChanged(this);
              this.canvas.renderAll();
              delete this.dimensionsWidthValue;
            },
            get: function(){
              if(this.dimensionsWidthValue){
                return this.dimensionsWidthValue;
              }
              return Math.round(this.getBoundingRect().width / this.canvas.getZoom());
            },
            observe: "modified"
          }
        },
        objectHeight: {
          type:   'number',
          title:  'height',
          value: {
            set: function(val){
              this.saveState();
              this.scaleToHeight(val *  this.canvas.getZoom());
              this.dimensionsHeightValue = val;
              this.canvas.fireModifiedIfChanged(this);
              this.canvas.renderAll();
              delete this.dimensionsHeightValue;
            },
            get: function(){
              if(this.dimensionsHeightValue){
                return this.dimensionsHeightValue;
              }
              return Math.round(this.getBoundingRect().height / this.canvas.getZoom());
            },
            observe: "modified"
          }
        }
      }
    },
    center: {
      className:  'fa fa-bullseye',
      title: 'Center',
      action: function(){
        this.center();
        this.setCoords();
      }
    },
    objectFlip: {
      className:  'fa fa-arrows-h',
      insert:     'flipTools',
      title:      'flip',
      action:     'flip'
    },
    flop: {
      className:  'fa fa-arrows-v',
      insert:     'flipTools',
      title:      'flop'
    },
    bringForward: {
      insert:     'orderTools',
      title:      'bring forward',
      className:  'fa fa-level-up',
      disabled:   'onTop'
    },
    sendBackwards: {
      insert:     'orderTools',
      title:      'send backwards',
      className:  'fa fa-level-down',
      disabled:   'onBottom'
    },
    remove: {
      className:  'fa fa-trash',
      title:      'remove',
      key:        "Delete"
    },
    duplicate: {
      className:  'fa fa-clone',
      title:      'duplicate'
    }
  }
})
