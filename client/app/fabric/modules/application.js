'use strict';


/**
 * Точка запуска приложенич
 */
fabric.Application = function(options) {
  this.init(options);
};

fabric.Application.prototype = fabric.util.object.extend({},fabric.Observable,fabric.PluginsMixin,{
  init: function(options){

    options = options || {};
    this.options =  fabric.util.object.clone(options);
    if(this.options.callback){
      this.callback = this.options.callback;
      delete this.options.callback;
    }
    if(this.options.initialize){
      this.initialize = this.options.initialize;
    }

    if(this.options.prototypes){
      fabric.util.object.deepExtend(this.prototypes, this.options.prototypes);
      delete this.options.prototypes;
    }

    if(this.options.plugins){
      fabric.util.object.extend(this.plugins, this.options.plugins);
      delete this.options.plugins;
    }

    if(this.options.canvasContainer){
      this.canvasContainer = this.options.canvasContainer;
      delete this.options.canvasContainer;
    }

    this.initEventListeners();

    if(this.options.loaderTemplate){
      this.setLoaderTemplate(this.loaderTemplate || this.options.loaderTemplate);
    }

    if(this.options.credentials || this.credentials){
      this.printBanner();
    }

    this.fire("loading:begin",{});

    $( document ).ready(function(){
      fabric.util.order([
        this.runPlugins.bind(this,"preloaders"),
        this.preloader,
        this.loadConfiguration,
        this.runPlugins.bind(this,"configuration"),
        this.createApp,
        this.initialize,
        // this.loadSlide,
        this.runPlugins.bind(this,"postloaders"),
        this.onApplicationCreated,
        this.postloader,
        this.callback && function(){
          setTimeout(this.callback.bind(this),0)
        }
      ],this)
    }.bind(this))

  },
  credentials: false,
  ready : false,
  onApplicationCreated: function(){
    this.ready = true;
    this.fire("loading:end",{});
  },
  canvasClass: 'Canvas',
  resizable: false,
  history: true,
  /**
   * functions will be called on different application creation stages
   */
  plugins: {
    preloaders: [],
    configuration: [],
    canvas: [],
    postloaders: []
  },
  printBanner: function(){
    if(this.credentials){
      console.info("%cFiera Canvas Editor%c by %cDenis Ponomarev%c %c%6$s%c / %c%9$s%c", "color: #ffa500", "color: #202020", "color: #2EC06C", "color: #202020", "color: #337ab7", "www.hometlt.ru", "color: #202020", "color: #337ab7", "ponomarevtlt@gmail.com", "color: #202020");
    }
  },
  eventListeners: {
    "canvas:created": function(){

      if(this.options.onResize){
        this.onResize = this.options.onResize;
        delete this.options.onResize;
      }
      if(this.options.resizable){
        this.resizable = this.options.resizable;
        delete this.options.resizable;
      }
      if (this.resizable) {
        this.setResizable(this.canvas);
      }
    },
    "entity:created": []
  },
  onSlideLoaded: function () {},
  onCanvasCreated: function () {},
  callback: function () {},
  loadConfiguration: function (resolve,error) {
    if(!this.options.configuration){
      return resolve();
    }
    var _app = this;
    fabric.util.promise
      .map(
        this.options.configuration,
        function(value){
          return new Promise(function(resolve,fail) {
            fabric.util.data.loadJson(value,resolve,fail);
          });
        }
      )
      .then(function(results){
        fabric.util.object.extend(_app,results)
      })
      .then(resolve,error);
  },
  setCanvasContainer: function (id) {
    if(this._appCreated){
      this.createCanvas(this.canvasContainer, this.canvas);
      this.project.setCanvas(this.canvas);
    }else{
      this.canvasContainer = id;
    }
  },
  createApp: function (callback) {

    fabric.util.object.extend(this, this.options);
    this.createCanvas();
    // this.runPlugins.bind(this,"canvas"),

    var _canvas = this.canvas;


    if (this.project) {
      var _project = this.project;

      this.project = new fabric.Project({application: this});
      this.fire("project:changed");

      _canvas && this.project.setCanvas(_canvas);

      if (_project !== true) {
        this.project.load(_project);
      }
    }

    this.fire("created", {canvas: _canvas , project : this.project});
    callback();
  },
  createCanvas: function () {
    if(this.canvasContainer){

      if (this.canvasContainer.constructor == String) {
        var el = document.getElementById(this.canvasContainer);
      } else {
        el = this.canvasContainer;
      }
      this.canvas = new fabric[this.canvasClass](el, {application: this});
    }else{
      this.canvas = new fabric[this.canvasClass]({application: this});
    }

    // if(_canvas_options){
    //   this.canvas.load(_canvas_options);
    // }
    this.fire("canvas:created");
    this.onCanvasCreated();
  },
  dispose: function(){
    this.canvas.dispose();
  },
  setResizable: function(canvas){
    canvas = canvas || this.canvas;

    if (!canvas.virtual) {
      canvas.onResize = function () {
        var _parent = $(this.wrapperEl.parentNode);

        var _offset = $(this.wrapperEl).position();
        var _margin  = this.application.widthMargin || 0;
        var _w =  _parent.width() - _margin, _h = _parent.height();
        if (this.application.onResize) {
          this.application.onResize({
            width: _w ,
            height: _h
          }, {
            width: this.originalWidth ,
            height: this.originalHeight
          });
          this.calcOffset();
        } else {
          this.setDimensions({
            width: _w - _offset.left  - _margin,
            height: _h - _offset.top
          });
        }
      }
      canvas.onResize();
    }
  }
});

fabric.Application.addPlugin = fabric.PluginsMixin.addPlugin.bind(fabric.Application);

fabric.app = function(options){
  return new fabric.Application(options);
};

