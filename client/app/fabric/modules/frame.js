'use strict';

if(!fabric.StrokeMixin){
  require("./../mixins/StrokeMixin");
}

/**
 * @author Denis Ponomarev
 * @email den.ponomarev@gmail.com
 */
fabric.Frame = fabric.util.createClass(fabric.Group, fabric.StrokeMixin, {
  type: 'frame',
  //strokeActive:   "lightgreen",
  //stroke: "red",
  minWidth: 35,
  minHeight: 35,
  fill : "transparent",
  resizable: true,
  contentTools: false,
  //states : Empty / Full / Active
  specialProperties: ["element","shape","clip"],
  stateProperties: fabric.Group.prototype.stateProperties.concat(["clip"]),
  clip: {
    left: 0,
    top: 0,
    scaleX: 1,
    scaleY: 1
  },
  clippingAvailable: function(){
    return this.clipEnabled && this.element && !this._clipmode;
  },
  clipEnabled: true,
  /**
   * create clone with same image and shape as original (syncronous)
   * @param callback
   * @returns {*}
   */
  cloneSync: function(options){
    var _frame = new fabric.Frame(this);
    options && _frame.set(options);
    return _frame;
  },
  initialize: function (options) {
    options || ( options = {});

    if(options.constructor != Object){

      var _obj = options.toObject();
      if(options.element){
        _obj.element = options.element.cloneSync();
        _obj.element.clipTo = _obj._fabric_shape;
      }
      _obj.shape = options.shape;
      options = _obj;
    }

    this.on({
      "object:click":this._check_text_as_target_and_edit,
      "dblclick":this.toggleClipModeByClick,
      "scaling": this._apply_shape,
      "element:modified": function(event){
        this.updateStroke();
        this._apply_shape();
      }
    });

    this.initShape(options);
    this.callSuper('initialize', [
      this._fabric_shape
    ], options);
    this._elements_to_update = [];

  },
  toggleClipModeByClick: function(e){
    if(this._is_clipping_available(e.e)){
      if(!this._clipmode){
        this.clipPhotoStart()
      }else{
        this.clipPhotoEnd()
      }
    }
  },
  _check_text_as_target_and_edit: function(e){
    if( this.isPossibleTarget(e.e,this.text)){
      this.text.setOpacity(1);
      this._on_text_edit(e);
    }
  },
  clipPhotoEnd:function(){
    this.canvas.editingObject = null;
    this.canvas.off("target:changed target:cleared",this._endFoo);

    if(this.canvas.grid){
      this.canvas.grid.enabled = true;
    }

    //this.project.clipMode = false;


    this.canvas.remove(this.element);
    this.set({
      hasControls: false,
      evented: true,
      flipX:   this.element.flipX,
      flipY:   this.element.flipY
    });

    var to_radians = Math.PI / 180;
    var cosA = Math.cos(this.angle * to_radians);
    var sinA = Math.sin(this.angle * to_radians);
    var I = this.element, F = this;


    var _newGeometry = {
      angle: this.element.angle - this.angle,
      left: ( (I.left - F.left ) * cosA + (I.top - F.top)* sinA  - F.width/ 2) * (I.flipX ? -1 : 1),
      top:  (-(I.left - F.left ) * sinA + (I.top - F.top)* cosA  - F.height/ 2)* (I.flipY ? -1 : 1),
      flipX: false,
      flipY: false
    };

    if(this.element.originX === "center"){
      _newGeometry.left += this.element.width /2;
    }
    if(this.element.originY === "center"){
      //_newGeometry.top += this.element.height /2;
    }

    this.add(this.element);
    this.element.set(_newGeometry);
    //
    //
    this._clipmode =false;
    //рамку двигать нельзя
    this.set({
      hasControls: true,
      evented: true
    });
    this.canvas.remove(this._fabric_shape);
    this.add(this._fabric_shape);
    this.updateStroke();
    this._apply_shape();

    this.element.active = false;
    this.canvas.setActiveObject(this);
    this.canvas.renderAll();

    var w = this.width,  h = this.height, el = this.element;

    this.clip = {
      left   : (el.left) / w ,
      top    : (el.top) / h ,
      scaleX : (el.width ) / w,
      scaleY : (el.height) / h
    };

    this.fire("clipping:exited");
    this.canvas.fire('frame:clipping:exited', { target: this });
  },

  clipPhotoStart:function(){
    var _this = this;
    this._clipmode = true;
    this.updateStroke();
    this._apply_shape();
    this.canvas.discardActiveGroup();
    if(this.canvas.grid){
      this.canvas.grid.enabled = false;
    }

    /* this.fabric.set({
     originX: "center",
     originY:  "center",
     left: this.fabric.left + this.fabric.width/2,
     top: this.fabric.top + this.fabric.height/2,
     });*/

    this.element.set({
      movementLimits: this,
      movementLimitMode: "content",
      //clipTo:         this,
      flipX: this.flipX,
      flipY: this.flipY,
      //left: this.element.left* (this.flipX ? -1 : 1),
      //top:  this.element.top* (this.flipY ? -1 : 1)
    });

    this._restoreObjectState(this.element);
    this.element.set({
      hasControls: true,
      //selectable: false,
      //perPixelTargetFind: true,
      selectable: true,
      perPixelTargetFind: false
    });
    this.remove(this.element);
    this.canvas.add(this.element);

    this._restoreObjectState(this._fabric_shape);
    this.remove(this._fabric_shape);
    this.canvas.add(this._fabric_shape);

//рамка должна рисоваться над картинкой, иначе  некрасиво
//      this.slide.canvas.bringToFront(this.fabric);

    //рамку двигать нельзя
    this.set({
      hasControls: false,
      evented: false
    });


    this.canvas.setActiveObject(this.element);
    this.active = true;


    this._endFoo = function(){
      _this.clipPhotoEnd();
    };
    this.canvas.on("target:changed target:cleared",this._endFoo);

    this.fire("clipping:entered");
    this.canvas.fire('frame:clipping:entered', { target: this });

    this.canvas.editingObject = this;
    this.canvas.renderAll();
  },
  render: function(ctx, noTransform) {
    if(this._clipmode){
      var _zoom = this.canvas.getZoom();
      ctx.save();
      //  this.transform(ctx);
      ctx.globalAlpha = 0.5;
      var _clip_to = this.element.clipTo;
      this.element.clipTo = null;
      this.element.render(ctx);
      ctx.scale(_zoom,_zoom);
      this.element.clipTo = _clip_to;
      this.transform(ctx);
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = 1 / this.borderScaleFactor;
      ctx.beginPath();
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    this.callSuper('render', ctx, noTransform);
  },
  //supportedTypes: "*", // * or ["image","video",...]
  clippingSupportedTypes: "*", // * or ["image","video",...]
  _is_clipping_available : function(e){
    if(!this.clipEnabled)return false;
    if(e && this.isPossibleTarget(e,this.button)){
      return;
    }
    return this.element && (this.clippingSupportedTypes == "*" || this.clippingSupportedTypes.indexOf(this.element.type)!= -1);
  },
  _remove_element: function(){},
  drop: function(data){
    if(data.type == "frame"){
      this.setFrame(data.frame);
      this.setShape(data.shape);
    }else{
      this.setElementObject(data);
    }
  },
  droppable: {
    type: ["image","video","frame"]
  },
  setElementObject: function(options,callback){
    this._set_pending(true);
    this.fire("element:loading");
    fabric.util.createObject(options,function(el){
      this._set_pending(false);
      this.setElementKlass(el);
      callback && callback(el);
    }.bind(this));
  },
  setElement: function(el,cb){
    if(el){
      if(el.constructor == Object){
        this.setElementObject(el,cb)
      }else{
        this.setElementKlass(el);
        cb && cb();
      }
    }else{
      this.setElementKlass();
      cb && cb()
    }
  },
  dropElementMethod: "cover",//resize
  /**
   * Создание элемента фото
   * @private
   */
  setElementKlass: function(el){
    if(this.element === el)return;

    if(this.element){
      this._remove_element();
      this.element.destructor && this.element.destructor();
      this.remove(this.element);
      this.canvas && this.canvas.remove(this.element);
    }
    this.element = el;

    if(el){
      el.on("dblclick",function(e){
        this.parent.toggleClipModeByClick(e);
      });
      el.setupState();

      if(this.dropElementMethod  == "resize"){
        this.clip = {
          left: 0,
          top: 0,
          scaleX: 1,
          scaleY: 1
        }
      }

      if(this.dropElementMethod  == "cover"){
        var size = fabric.util.getProportions(el,this,'cover')
        this.clip = {
          left: 0,
          top: 0,
          scaleX: size.width /this.width,
          scaleY: size.height /this.height
        }
      }

      el.set({
        actions: {
          clipEnd: {
            className:  "fa fa-crop",
            title:      "clip end",
            action:     function(){
              this.parent.clipPhotoEnd();
            }
          }
        },
        parent: this,
        notSelectableInTheGroup : true,
        originX: "center",
        originY: "center",
        transparentCorners : false,
        resizable: true,
        clipTo: this._fabric_shape
      });

      this.add(el);

      for(var i in this._elements_to_update){
        this.remove(this._elements_to_update[i].element);
        this.add(this._elements_to_update[i].element);
      }
      this._update_element_size();
    }

    this.fire("element:modified",{element: el});
    this.canvas && this.canvas.renderAll();
  },

  /**
   * ограничиваем перемещение фотографии внутри рамки
   * @param el
   */
  _limit_moving: function(data){

    var r = this.getBoundingRect();
    var i   = this.element;
    i.on("moving", function() {
      var b = {
        l:  r.left  + i.width * i.scaleX/2,
        r:  r.left + r.width - i.width * i.scaleX/2,
        t:  r.top  + i.height * i.scaleY/2,
        b:  r.top  + r.height - i.height * i.scaleY/2
      };
      // capping logic here
      i.setLeft(Math.max(Math.min(b.l, i.left),b.r));
      i.setTop(Math.max(Math.min(b.t, i.top),b.b));
    });

    i.on("scaling", function() {
      i.set({
        width: Math.max(r.width, i.width * i.scaleX),
        height: Math.max(r.height,i.height* i.scaleY),
        scaleX : 1,
        scaleY: 1
      });

      var b = {
        l:  r.left  + i.width * i.scaleX/2,
        r:  r.left + r.width - i.width * i.scaleX/2,
        t:  r.top  + i.height * i.scaleY/2,
        b : r.top  + r.height - i.height * i.scaleY/2
      };
      //// capping logic here
      //i.setLeft(Math.min(Math.max(b.l, i.left),b.r));
      //i.setTop(Math.min(Math.max(b.t, i.top),b.b));
    });
  },

  _set_pending: function(val){
    this._pending = val;
  },

  /**
   * Создание элемента фото
   * @private
   */
  _create_remove_button: function(options){

    this.button = this._create_button({
      text: "",
      options: {
        visible: false
      },
      position:{
        top: 0,
        right: 0
      }
    });

    this.button.on('click', function(e){
      if(!this._pending){
        this.setElement(false);
      }
    }.bind(this));

  },
  _add_element_to_update: function(data){
    this._elements_to_update.push(data);

    if(data.right !== undefined){
      data.element.setOriginX("right");
    }
    if(data.left !== undefined){
      data.element.setOriginX("left");
    }
    if(data.bottom !== undefined){
      data.element.setOriginY("bottom");
    }
    if(data.top !== undefined){
      data.element.setOriginY("top");
    }

    this._update_interface_element_position(data.element,data);

  },
  setClip: function(val){
    this.clip = val;
    this._update_element_size();
  },
  _update_element_size: function(){
    this._update_element_width();
    this._update_element_height();
  },

  _update_element_width: function(){
    if(this.element){
      if(this.element.type == "ellipse"){
        this.element.set({
          rx: this.width/2 * this.clip.scaleX
        });
      }else if( this.element.type =="video" || this.element.type == "path"){

        this.element.set({
          left: 0,
          scaleX: this.width / this.element.width
        });
      }else {
        this.element.setWidth(this.width * this.clip.scaleX)
        this.element.setLeft(this.width * this.clip.left);
      }
    }
  },
  _update_element_height: function(){
    if(this.element){

      if(this.element.type == "ellipse"){
        this.element.set({
          ry:     this.height/2 * this.clip.scaleY
        });
      }else if( this.element.type =="video" || this.element.type == "path"){

        this.element.set({
          top: 0,
          scaleY: this.height / this.element.height
        });
      }else{
        this.element.setHeight(this.height * this.clip.scaleY)
        this.element.setTop( this.height * this.clip.top);
      }
    }
  },
  _update_interface_element_position: function(el,data, prop){
    if(!prop || prop == "height"){
      if (data.top !== undefined && data.bottom !== undefined) {
        el.setTop(-this.height / 2 + data.top);
        el.setHeight(this.height - data.top - data.bottom);
      }if (data.top !== undefined) {
        el.setTop(-this.height / 2 + data.top);
      } else if (data.bottom !== undefined) {
        el.setTop(this.height / 2 - data.bottom);
      }else if (data.height !== undefined) {
        el.setHeight(data.height);
      }
    }
    if(!prop || prop == "width") {
      if (data.right !== undefined && data.left !== undefined) {
        el.setLeft(-this.width / 2 + data.left);
        el.setWidth(this.width - data.left - data.right);

      }else if (data.right !== undefined) {
        el.setLeft(this.width / 2 - data.right);
      }else if (data.left !== undefined) {
        el.setLeft(-this.width / 2 + data.left);
      }else if (data.width !== undefined) {
        el.setWidth(data.width);
      }
    }
    el.setCoords();
  },
  setHeight: function(h){
    this.height = h;
    //this.set("height",w);
    for(var i in this._elements_to_update) {
      var data = this._elements_to_update[i];
      this._update_interface_element_position(data.element,data,"height");
    }
    this._update_element_height();
    this._apply_shape();
  },
  setWidth: function(w){
    this.width = w;
    //this.set("width",w);
    for(var i in this._elements_to_update){
      var data = this._elements_to_update[i];
      this._update_interface_element_position(data.element,data,"width");
    }
    this._update_element_width();
    this._apply_shape();
  },
  toObject: function(propertiesToInclude){
    propertiesToInclude = ["clip","data"].concat(propertiesToInclude);

    var object = this.callSuper('toObject', propertiesToInclude);


    if(this.shape){
      object.shape = _.clone(this.shape);
      if(object.shape.src){
        delete object.shape.paths;
        delete object.shape.height;
        delete object.shape.width;
        delete object.shape.svgUid;
        delete object.shape.toBeParsed;
      }
    }

    delete object.objects;

    if(this.element){
      var _obj2 = this.element.toObject();
      object.element = {
        type: _obj2.type,
        src: _obj2.src
      }
    }
    return object;
  },
  insertPhotoClip : false
});

var _FRA = fabric.Frame.prototype;
fabric.Frame.prototype.actions = fabric.util.object.extend({}, fabric.Object.prototype.actions, {
    clear: {
      insert:     "contentTools",
      title:      "Remove content",
      className:  "fa fa-times",
      action:     _FRA.setElement,
      visible:    "element",
      observe:    "element:modified"
    },
    photoClip: {
      title:      "обрезать",
      className:  "fa fa-crop",
      action:     _FRA.clipPhotoStart,
      visible:    _FRA.clippingAvailable,
      observe:  "clipping:entered clipping:exited element:modified"
    }
  }
);


fabric.Frame.fromObject = function(object,callback) {
  object = fabric.util.object.cloneDeep(object);

  var cb = fabric.util.queueLoad(2,function(){
    callback && callback(new fabric.Frame(object));
  });

  if(object.element){
    fabric.util.createObject(object.element,function(el){
      object.element = el;
      cb();
    });
  }else{
    cb();
  }

  if(object.shape && object.shape.src){
    fabric.loadSVGFromURL(object.shape.src,function(paths,options) {
      object.shape.paths  = paths;
      fabric.util.object.extend(object.shape,options);
      cb();
    })
  }else {
    cb();
  }
};
fabric.Frame.async = true;

fabric.util.createAccessors(fabric.Frame);
