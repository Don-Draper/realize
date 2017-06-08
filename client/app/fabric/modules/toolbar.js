'use strict';
if(!Toolbar){
  var Toolbar = require('./../plugins/toolbar');
  require('./../plugins/toolbar.colors');
  require('./../plugins/toolbar.fonts');
  require('./../plugins/toolbar.options');
}

Toolbar.prototype.setFunctionCallback = function(target){
  if(target.canvas){
    return target.canvas.renderAll();
  }
  if(target.renderAll){
    return target.renderAll()
  }
};


fabric.util.object.extend(fabric.Application.prototype,{
  toolbar: false,
  createToolbars: function(){
    if(!this.toolbar){
      return;
    }

    if(this.toolbar.application) {
      new Toolbar(this, this.toolbar.application)
    }

    if(this.canvas && this.toolbar.canvas){
      new Toolbar(this.canvas, this.toolbar.canvas);
    }
    if(this.project &&  this.toolbar.project){
      new Toolbar(this.project, this.toolbar.project);
    }

    if(this.toolbar.objects){
      if(this.toolbar.objects.constructor == Object){
        this.canvas && this.canvas.initMenuEvents(this.toolbar.objects.container,this.toolbar.objects);
      }else{
        this.canvas && this.canvas.initMenuEvents(this.toolbar.objects);
      }
    }
  },
  initTools: function(){
    if(this.options.toolbar){
      if(!this.toolbar){
        this.toolbar = this.options.toolbar;
      }else{
        fabric.util.object.deepExtend(this.toolbar,this.options.toolbar)
      }
    }
    if (this.toolbar) {
      fabric.util.object.deepExtend(Toolbar.tools, this.toolbar.tools);
      for (var klassName in this.toolbar.actions) {
        var actions = this.toolbar.actions[klassName];
        if(!fabric[klassName].prototype.actions){
          fabric[klassName].prototype.actions = {}
        }
        var protoActions = fabric[klassName].prototype.actions;

        if (actions.constructor == Function) {
          actions = actions.call(fabric[klassName].prototype)
        }else{
          actions = fabric.util.object.cloneDeep(actions);
        }
        var $order = actions["$order"];
        delete actions["$order"];

        for (var j in actions) {
          if(protoActions[j]){
            if (actions[j]["$clone"]) {
              protoActions[j] = fabric.util.object.deepExtend({}, protoActions[j]);
              delete actions[j]["$clone"];
            }
            fabric.util.object.deepExtend(protoActions[j], actions[j]);
          }else{
            protoActions[j] = actions[j];
          }
        }
        if($order){
          fabric[klassName].prototype.actions = fabric.util.object.rearrange(protoActions, $order);
        }
      }
      delete this.toolbar['tools'];
      delete this.toolbar['actions'];
      fabric.util.object.extend(Toolbar, this.toolbar);
      delete this.options.toolbar;
    }
  }
});

fabric.util.object.extend(fabric.Application.prototype,{
  eventListeners: fabric.util.object.extendArraysObject(fabric.Application.prototype.eventListeners, {
    "canvas:created" : function(){
      this.initTools();
    }
  })
});

fabric.Application
  // .addPlugin("canvas","initTools")
  .addPlugin("postloaders","createToolbars");


fabric.Toolbar = Toolbar;

fabric.util.object.extend(fabric.Canvas.prototype, {
  menuOriginX: "left",
  menuOriginY: "top",
  menuMarginX: 0,
  menuMarginY: 0,
  setToolbarCoords: function ($menu, target, options) {

    options = fabric.util.object.extend({
      originX: "left",
      originY: "top",
      marginX: 0,
      marginY: 0
    }, options);

    target.setCoords();
    var r = target.getBoundingRect();

    var _left;
    switch (options.originX) {
      case "left":
        _left = r.left;
        break;
      case "right":
        _left = r.left + r.width;
        break;
      case "center":
        _left = r.left + r.width / 2;
        break;
    }
    ;
    var _top;
    switch (options.originY) {
      case "top":
        _top = r.top - $menu.height();
        break;
      case "bottom":
        _top = r.top + r.height;
        break;
      case "center":
        _top = r.top + r.height / 2 - $menu.height() / 2;
        break;
    }
    ;


    _top += options.marginY;
    _left += options.marginX

    var _menuContainerOffset = $($menu.parents()[0]).offset();
    var _canvasOffset = $(this.wrapperEl).offset();

    _top += _canvasOffset.top - _menuContainerOffset.top;
    _left += _canvasOffset.left - _menuContainerOffset.left;

    var coords = {
      top: Math.max(3, _top),
      left: Math.min(Math.max(3, _left), $(this.wrapperEl).width() - $menu.width() - 5)
    };


    $(this.wrapperEl).offset();

    $menu.css(coords);
    return coords;
  },
  getToolbarContainer: function (id, options) {
    return $(document.getElementById(this.application.toolbar.objects.container));
  },
  initMenuEvents: function (id, options) {

    options = options || {};
    options.originX = options.originX || this.menuOriginX;
    options.originY = options.originY || this.menuOriginY;
    options.marginX = options.marginX || this.menuMarginX;
    options.marginY = options.marginY || this.menuMarginY;
    this.floatedToolbarOptions = options;
    var canvas = this;

    if (id) {
      this.$menu = $(document.getElementById(id)).hide();
    } else {

      this.$menu = this.$menu || $('<div>');
      $(this.wrapperEl).prepend(this.$menu);
    }
    this.$menu.hide();

    var _last_target = canvas.target;
    canvas
      .on('object:moving', function (event) {

        var $menu = this.getToolbarContainer();
        canvas.setToolbarCoords($menu, canvas.target, canvas.floatedToolbarOptions);
      })
      .on('target:cleared', function (event) {
        if (_last_target) {
          var $menu = this.getToolbarContainer();
          $menu.hide();
          canvas.objectToolbar.destroy();
          delete canvas.objectToolbar;
          _last_target = null;
        }
      })
      .on('target:changed', function (event) {
        if (_last_target) {
          canvas.objectToolbar.destroy();
        }
        canvas.createFloatedMenu(options);
        _last_target = event.target;
      })
  },

  createFloatedMenu: function (options) {

    var $menu = this.getToolbarContainer();

    $menu.show();
    //this.toolsContainer = this.$menu;
   /* var _tc = $menu.find(".toolbar-tools-container");
    if (_tc.length) {
      this.toolsContainer = _tc;
    }*/
   // this.toolsContainer.empty();
    if (this.target.actions) {
      this.objectToolbar = new Toolbar (this.target, $menu, options);
    }
    this.setToolbarCoords($menu, this.target, this.floatedToolbarOptions);
  }
});
