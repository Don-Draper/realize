/**
 * # Prototypes

 Prototypes allows to define **prototypes** property in Application configuration.

 ```javascript
 Application ({
  prototypes: {
    ClassName: options
  }
 })
 ```

 If prototype is defined every new Object created by application will have this properties by default.

 ```javascript
   NewClass: {
    $super: "ParentClass",
    type: "new-class",
    \/*other properties and methods*\/
   }
  ```

 if property **type** of Object class is defined then every object be default will have this type.

 ```javascript
   Object: {
    type: "rectangle"
   }
 ...
 //rectangle will be created
 fabric.createObject({width:100, height: 100})
 ```
*/






fabric.util.object.extend(fabric.Application.prototype, {
  optionsOrder: (function(){
    var oo = fabric.Application.prototype.optionsOrder;
    oo.splice(oo.indexOf("canvasContainer"),0,"prototypes");
    return oo;
  })(),
  getDefaultProperties: function(proto){
    if(!this.prototypes)return;

    var klassname = fabric.util.string.capitalize(fabric.util.string.camelize(proto.type),true);

    var _protoProperties = proto.__proto__ && proto.__proto__.type && this.getDefaultProperties(proto.__proto__) || {};
    var _defaultProperties = fabric.util.object.clone(this.prototypes[klassname]);

    fabric.util.object.extend(_protoProperties,_defaultProperties);

    return _protoProperties;
  },
  /**
   * default prototypes propertes for objects
   */
  prototypes: {
    Object: {
      includeDefaultValues: false
    },
    Canvas: {
      includeDefaultValues: false
    }
  },
  setUtils: function (utilsOptions) {

    if(!utilsOptions){
      return;
    }
    fabric.util.object.extend(this.util || {},utilsOptions);

    if (this.options['util']) {
      fabric.util.object.extend(fabric.util, this.options['util']);
    }
    if (this.options['fabric']) {
      fabric.util.object.extend(fabric, this.options['fabric']);
    }
    delete this.options['fabric'];
    delete this.options['util'];
  },
  setPrototypes: function (prototypes) {

    var _prototypes = fabric.util.object.deepExtend({}, this.prototypes ,prototypes);

    this.prototypes = _prototypes;
    this.klasses = {};


    if(_prototypes.eventListeners){
      _prototypes.eventListeners.$extend = 'array';
    }

    for (var klassName in _prototypes) {
      var _proto = _prototypes[klassName];

      for (var j in _proto) {
        if (_proto[j] && _proto[j]["$extend"]) {
          var _extend = _proto[j]["$extend"];
          if( _extend == "array"){
            _proto[j] = fabric.util.object.extendArraysObject(fabric[klassName].prototype[j],_proto[j]);
          } else if( _extend == "deep"){
            _proto[j] = fabric.util.object.deepExtend(fabric[klassName].prototype[j],_proto[j]);
          }else{
            _proto[j] = fabric.util.object.extend(fabric[klassName].prototype[j],_proto[j]);
          }
          delete _proto[j]["$extend"];
        }
      }


      if(_proto["$super"]){
        var _superklass = fabric[_proto["$super"] || klassName] ;
        delete _proto["$super"];

        var _fromObject = _proto.fromObject || _superklass.fromObject ;
        delete _proto.fromObject;
        var _klass = this.klasses[klassName] = fabric.util.createClass(_superklass, _proto);
        _klass.fromObject = _fromObject.bind(_klass);
      }

    //   if (klassName.actions && _proto.actions.constructor == Function) {
    //     fabric[klassName].prototype.actions = _proto.actions.call(fabric[klassName].prototype)
    //   }
    }

    if (_prototypes.Application) {
      fabric.util.object.deepExtend(this, _prototypes.Application);
    }

    // delete this.options['prototypes'];

    if (this.actions && this.actions.constructor == Function) {
      this.actions = this.actions.call(this)
    }
  },

  eventListeners: fabric.util.object.extendArraysObject(fabric.Application.prototype.eventListeners, {
    "entity:created": function (e) {
      var target = e.target;

      target.application = this;
      fabric.util.object.defaults(e.options, this.getDefaultProperties(target, e.options));

      for (var key in e.options) {
        var value = e.options[key];
        if (key[0] == "+") {
          var _key = key.substr(1);
          var _arr = target.get(_key);
          if (_arr instanceof Array) {
            _arr = _arr.slice().concat(value);
          } else {
            _arr = fabric.util.object.extend({}, _arr, value);
          }
          e.options[_key] = _arr;
          delete e.options[key];
        }
      }

      delete e.options.type;
      delete e.options.application;
    }
  })
});


