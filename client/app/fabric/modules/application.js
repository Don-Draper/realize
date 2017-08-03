'use strict';

/**
 * # Application
 *
 * farbic.app function is the entry point of FabricJS application.
 * Application could be initialised with configuration object. Different extensions allows to initialize special application attributes such as *object prototypes*, *resizable canvas*, *available fonts*, etc.
 *
 * ### option: util
 * mediaRoot - root directory for all media files in fabric application
 *
 * ### option: resizable
 * makes canvas responsible. Canvas will be scaled to 100% of its container size
 *
 * ### option: onResize
 * function which override deafult canvas resize behavior.
 *
 * ### option: callback
 * function calls after canvas initialized
 *
 * ### option: initialize
 * function calls before canvas initialize
 *
 * @example
 *
 * new fabric.Application({
 *      resizable: true,
 *      onResize: function(){},
 *      util: {
 *        mediaRoot: '../../media/'
 *      },
 *      canvasContainer: "fiera-canvas",
 *      prototypes: {},
 *      objects: {},
 *      eventListeners: {},
 *      callback: function(){},
 *      initialize:  function(){}
 *      customPublicApplicationFunction: function(){},
 *      customPublicApplicationAttribute: value
 *  })
 *
 */

fabric.Application = function(options) {
  this.init(options);
};

fabric.Application.prototype = fabric.util.object.extend({},fabric.Observable,{


  defaultOptions: {
    /**
     * id of target canvas element
     */
    canvasContainer: null,

  },
  credentials: false,
  ready : false,
  canvasClass: 'Canvas',
  optionsOrder: ["canvasContainer","*"],
  plugins: {
    preloaders: [],
    configuration: [],
    canvas: []
  },
  /**
   * Additional Event Listeners couldbe used to detect activeobject changes
   *  - canvas:created
   *  - entity:load - Event fired on creation of every new fabric instance(canvas,brush,object)
   *
   *  @example
   *  'entity:load' : function(e){
   *     if(e.options.boxType == 'machine') {
   *       e.options.type = "machine-mask-rectangle";
   *     }
   *   }
   */
  eventListeners: {
    "canvas:created": [],
    "entity:created": [
      function(e){
        if(e.target.eventListeners){
          for(var i in e.target.eventListeners) {
            var _listeners = e.target.eventListeners[i];
            if(_listeners.constructor == Array){
              for (var j in _listeners) {
                e.target.on(i, _listeners[j]);
              }
            }else{
              e.target.on(i, _listeners);
            }
          }
        }

        if(e.options.eventListeners){
          for(var i in e.options.eventListeners){
            e.target.on(i,e.options.eventListeners[i]);
          }
        }
        delete e.options.eventListeners;

        if(e.target._default_event_listeners){
          for(var i in e.target._default_event_listeners){
            e.target.on(i,e.target._default_event_listeners[i]);
          }
        }
      }
    ]
  },
  onSlideLoaded: function () {},
  onCanvasCreated: function () {},
  callback: function () {},

  init: function(options){
    this.initEventListeners();
    options =  fabric.util.object.deepExtend({},this.defaultOptions ,options || {});

    this.fire("loading:begin",{options : options});

    this._options = options;


    $( document ).ready(function(){
      fabric.util.order([
        this.preloader,
        this.loadConfiguration,
    //    this.createApp,
        this.initOptions,
        this.initialize,
        this.onApplicationCreated,
        this.postloader,
        this.callback && function(){
          setTimeout(this.callback.bind(this),0);
        },
        function(){
          this.fire("created");
        }.bind(this)
      ],this)
    }.bind(this))
  },
  onApplicationCreated: function(){
    this.ready = true;
    this.fire("loading:end",{});
  },
  setCredentials: function(credentials){
    if(credentials){
      console.info("%cFiera Canvas Editor%c by %cDenis Ponomarev%c %c%6$s%c / %c%9$s%c", "color: #ffa500", "color: #202020", "color: #2EC06C", "color: #202020", "color: #337ab7", "www.hometlt.ru", "color: #202020", "color: #337ab7", "ponomarevtlt@gmail.com", "color: #202020");
    }
  },
  initOptions: function (resolve,error) {
    this.set(this._options,resolve);
  },
  loadConfiguration: function (resolve,error) {
    if(!this._options.configuration){
      return resolve();
    }
    var _app = this;
    fabric.util.promise
      .map(
        this._options.configuration,
        function(value){
          return new Promise(function(resolve,fail) {
            fabric.util.data.loadJson(value,resolve,fail);
          });
        }
      )
      .then(function(results){
        fabric.util.object.extend(_app._options,results)
      })
      .then(resolve,error);
  },
  setCanvasContainer: function (canvasContainer) {
    this.canvasContainer = canvasContainer;

    if (canvasContainer.constructor == String) {
      var el = document.getElementById(canvasContainer);
    } else {
      el = canvasContainer;
    }
    this.canvas = new fabric[this.canvasClass](el, {application: this});
    // }else{
    //   this.canvas = new fabric[this.canvasClass]({application: this});
    // }

    this.fire("canvas:created");
    this.onCanvasCreated();
  },
  dispose: function(){
    this.canvas.dispose();
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Event Listeners
  //--------------------------------------------------------------------------------------------------------------------

  setEventListeners: function(val){
    this.on(val);
  },
  initEventListeners: function(){
    if(!this.__eventListeners){
      this.__eventListeners = {};
    }
    for (var event in this.eventListeners) {
      if(!this.__eventListeners[event]){
        this.__eventListeners[event] = []
      }
      this.__eventListeners[event] = this.__eventListeners[event].concat (this.eventListeners[event]);
    }
  },

  //--------------------------------------------------------------------------------------------------------------------
  //
  __set : fabric.Object.prototype.__set,
  _setObject: fabric.Object.prototype._setObject,
  set: fabric.Object.prototype.set,
  setOptions: fabric.Object.prototype.setOptions,
  actions: {
    save: {
      title: "save project",
      className: 'fa fa-floppy-o',
      action: function () {
        var data = this.toObject();
        this.application.api.save(data);
      }
    }
  }
});

// fabric.Application.addPlugin = fabric.PluginsMixin.addPlugin.bind(fabric.Application);

fabric.app = function(options){
  return new fabric.Application(options);
};

