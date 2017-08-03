/*! Fiera.js Copyright 2016, www.homeTLT.ru (Denis Ponomarev <ponomarevtlt@gmail.com>) */
var fiera =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = fabric;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
var utils = __webpack_require__(3);
utils.object = __webpack_require__(2);
utils.compile = __webpack_require__(4);

function capitalize(string, firstLetterOnly) {
  return string.charAt(0).toUpperCase() +
    (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
}

function toDashed (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


var Toolbar = function(PARENT, el, options, menu){
  this.buttons = [];
  //todo это не совсем хорошо. нельзя создать улбраы с разными конфигами кнопок
  // this.tools = utils.object.cloneDeep(this.tools);

  if (options) {
    if (options.button) {
      utils.object.extend(this.tools.button, options.button);
    }
  }
  if (!PARENT.generatedActions) {
    Toolbar.makeActions(PARENT, menu);
  }

  if(el.constructor === String){
    el = $(document.getElementById(el));
  }
  if(el.length && Object.keys(PARENT.generatedActions).length){
    this.generateMenu(PARENT, el, options, PARENT.generatedActions);
    this.onCreate();
    el.show();
  }
  Toolbar.initKeys(PARENT.generatedActions);
};


Toolbar._getKeyString = function (config) {
  var string = "";

  if (config.ctrlKey)string += "Ctrl + ";
  if (config.altKey)string += "Alt + ";
  if (config.shiftKey)string += "Shift + ";

  var _code = config.key;
  if(_code){
    string += config.key;
  }
  return string;
};

Toolbar._getActionValue = function (object, property) {
  do{
    if(object.actions && object.actions[property]){
      return object.actions[property];
    }
  }while(object = object.__proto__);
  return null;
};

Toolbar.makeActions = function (PARENT, actions) {
    if(!actions){
      actions = {};
      _.each(PARENT.tools, function(tool){

        var _val = Toolbar._getActionValue(PARENT,tool);

        if(_val){
          actions[tool] = _val;
        }else{
          console.warn("tool " + tool + " is undefined");
        }
      });
    }

    var result = {};

    for (var i in actions) {
      var _action = this.makeAction(i, actions[i], PARENT);
      if(_action){
        result[i] = _action;
      }
    }
    PARENT.generatedActions = result;
};
Toolbar.makeAction = function (id, _ORIGINAL, parent) {

  var self = this;

  if (_ORIGINAL.constructor === Function) {
    _ORIGINAL = _ORIGINAL.call(target);
  }

  var target;

  if (_ORIGINAL.target && _ORIGINAL.target.constructor == Function) {
    target = _ORIGINAL.target.call(parent);
  } else {
    target = _ORIGINAL.target || parent;
  }

  var ___target = _ORIGINAL.target;
  var ___parent = _ORIGINAL.parent;
  delete _ORIGINAL.parent;
  delete _ORIGINAL.target;
  var RES = utils.object.cloneDeep(_ORIGINAL);
  _ORIGINAL.parent = ___parent;
  _ORIGINAL.target = ___target;


  RES.parent = ___parent;
  RES.target = target;
  RES.id = toDashed(id);


  function createGetter(property,useParent) {
    if (property.constructor == String) {
      var negative = false;
      if (property[0] == "!") {
        property = property.substr(1);
        negative = true;
      }
      if(useParent){
        return function () {
          return parent && !!parent[property] ^ negative;
        }
      }else{
        return function () {
          return target && !!target[property] ^ negative;
        }
      }
    }
    if (property.constructor == Function) {
      return property.bind(target);
    }
    return null;
  }


  /*var _insert = _ORIGINAL.insert;
  if (!_insert || _insert.constructor == String) {

    if(_ORIGINAL.parent){
      var insertproperty = fabric.util.string.capitalize(fabric.util.string.camelize(_ORIGINAL.parent.id))
    }else{
      var insertproperty = _insert || "insert" + fabric.util.string.capitalize(id,true);
    }

    if(target[insertproperty] !== undefined){
      _insert = target[insertproperty]// createGetter(insertproperty,true)()
    }else{
      _insert = true;
    }
  }

  if(!_insert)return;*/

  if (!RES.type) {
    if (RES.menu) {
      RES.type = "menu";
    }else{
      RES.type = "button";
    }
  }
  if (!RES.action) {
    if(RES.type == "button"){
      RES.action = id;
    }
  }


  if (RES.action) {
    if (RES.action.constructor == String) {
      RES.action = target[RES.action];
    }
    //RES = RES.action.bind(target);
    //RES.action = RES.action.bind(target);
    //_.extend(RES, _act);
    //arguments for action function
    if (_ORIGINAL.args) {
      RES._action = RES.action.bind(target, _ORIGINAL.args);
    } else {
      RES._action = RES.action.bind(target);
    }
    RES.action = function(){
      if(RES.disabled)return;
      RES._action.apply(this,arguments);
    }
  }


  if (_ORIGINAL.menu && _ORIGINAL.menu.constructor == Function) {
    RES.menu = _ORIGINAL.menu.bind(target);
  }
  if (_ORIGINAL.active) {
    RES.active = createGetter(_ORIGINAL.active);
  }
  if (_ORIGINAL.visible) {
    RES.visible = createGetter(_ORIGINAL.visible);
  }
  if (_ORIGINAL.enabled) {
    RES.enabled = createGetter(_ORIGINAL.enabled);
  }
  if (!_ORIGINAL.value) {
    switch(_ORIGINAL.type){
      case "color":
      case "text":
      case "number":
      case "range":
      case "label":
      case "select":
      case "checkbox":
        _ORIGINAL.value = id;
      // console.log(id, _ORIGINAL);
    }
  }
  if (_ORIGINAL.value) {
    var _set, _get, _options;
    if (_ORIGINAL.value.constructor == String) {

      var setFunctionName = "set" + capitalize(_ORIGINAL.value, true),
        getFunctionName = "get" + capitalize(_ORIGINAL.value, true),
        minName = "min" + capitalize(_ORIGINAL.value, true),
        maxName = "max" + capitalize(_ORIGINAL.value, true),
        setFoo = function(val){
          target[setFunctionName](val);
          // todo self.setFunctionCallback(target);
        },
        getFoo = target[getFunctionName],
        minFoo = target[minName],
        maxFoo = target[maxName];

      _set = setFoo || (_ORIGINAL.args ?
          function (val, args) {
            this[_ORIGINAL.value][args] = val;
          } :
          function (val) {
            this[_ORIGINAL.value] = val;
          });

      _get = getFoo || (_ORIGINAL.args ?
          function (args) {
            return this[_ORIGINAL.value][args];
          } :
          function () {
            return this[_ORIGINAL.value];
          });


      RES.value = {
        min: minFoo,
        max: maxFoo
      }

    } else {
      _set = _ORIGINAL.value.set;
      _get = _ORIGINAL.value.get;
      _options = _ORIGINAL.value.options;
    }

    if(RES.value.min !== undefined && RES.value.min.constructor == String){
      RES.value.min = target[RES.value.min];
    }
    if(RES.value.max !== undefined && RES.value.max.constructor == String){
      RES.value.max = target[RES.value.max];
    }
    if(RES.value.step !== undefined && RES.value.step.constructor == String){
      RES.value.step = target[RES.value.step];
    }
    var _min = RES.value.min, _max = RES.value.max, _step = RES.value.step;

    if (_set) {
      RES.value.set = ( _ORIGINAL.args ? _set.bind(target, _ORIGINAL.args) : _set.bind(target));
    }
    if (_get) {
      RES.value.get = ( _ORIGINAL.args ? _get.bind(target, _ORIGINAL.args) : _get.bind(target));
    }
    if (_min && _min.constructor == Function) {
      RES.value.min = ( _ORIGINAL.args ? _min.bind(target, _ORIGINAL.args) : _min.bind(target));
    }
    if (_max && _max.constructor == Function) {
      RES.value.max = ( _ORIGINAL.args ? _max.bind(target, _ORIGINAL.args) : _max.bind(target));
    }
    if (_step && _step.constructor == Function) {
      RES.value.step = ( _ORIGINAL.args ? _step.bind(target, _ORIGINAL.args) : _step.bind(target));
    }
    if (_options) {
      RES.value.options = ( _ORIGINAL.args ? _options.bind(target, _ORIGINAL.args) : _options.bind(target));
    }
  }

  if (_ORIGINAL.data) {
    RES.data = _ORIGINAL.data.call(target);
  }
  if (RES.menu) {
    if (_ORIGINAL.menu.constructor === Function){
      RES.menu =  _ORIGINAL.menu.call(target);
    }
    if (RES.type == "options") {
      for (var i in RES.menu) {
        RES.menu[i].parent = RES;
        RES.menu[i].type = "option";
        if(!RES.menu[i].title){
          RES.menu[i].title = i;
        }
        if(!RES.menu[i].option) {
          RES.menu[i].option = i;
        }
      }
    }
    for (var i in RES.menu) {
      if(RES.menu[i].constructor == String){
        RES.menu[i] = fabric.util.object.clone(RES.target.actions[RES.menu[i]]);
        RES.menu[i].parent = RES;
      }
      RES.menu[i] = Toolbar.makeAction(i, RES.menu[i], target);
      if(!RES.menu[i]){
        delete RES.menu[i];
      }
    }
  }



  if (_ORIGINAL.keyboard !== false && (_ORIGINAL.key || _ORIGINAL.shiftKey || _ORIGINAL.altKey || _ORIGINAL.ctrlKey || _ORIGINAL.metaKey)) {
    if(_ORIGINAL.keyCode && _ORIGINAL.keyCode.constructor == String){
      RES.keyCode = _ORIGINAL.keyCode.toUpperCase().charCodeAt(0);
      RES.key = String.fromCharCode(RES.keyCode);
    }
    RES.keyboard = true
  };

  return RES;
};

Toolbar.getButtons = function (actions) {
  var _buttons = [];
  for(var i in actions){
    var action = actions[i];
    if(action.keyboard){
      action.title += " (" + Toolbar._getKeyString(action) + ")";
      _buttons.push(action);
    }
    if (actions.menu) {
      _buttons = _buttons.concat(Toolbar.getButtons(actions.menu));
    }
  };

  return _buttons;
};
Toolbar.initKeys = function (actions) {

  var buttons = Toolbar.getButtons(actions);

  var self = this;
  $("body").on( "keydown",function (e) {
    for (var i in buttons) {
      var _config = buttons[i];

      if(_config.enabled && !_config.enabled()){
        continue;
      }
      if(_config.disabled || _config.disabled){
        continue;
      }
      if ((!_config.disabled && !_config.hidden) &&
        (_config.keyCode == e.keyCode || _config.key == e.key) &&
        (_config.ctrlKey === undefined || _config.ctrlKey == e.ctrlKey ) &&
        (_config.altKey === undefined || _config.altKey == e.altKey ) &&
        (_config.shiftKey === undefined || _config.shiftKey == e.shiftKey ) &&
        (_config.metaKey === undefined || _config.metaKey == e.metaKey )) {

        e.preventDefault();
        e.stopPropagation();
        if (_config.option !== undefined) {
          _config.action.call(_config.target, _config.option, e)
        } else {
          _config.action.call(_config.target, e)
        }
      }
    }
  });

  //$(window).on("mousewheel", function (event) {
  //  for (var i in self.buttons) {
  //    var data = self.buttons[i];
  //    if (!data.mousewheel)continue;
  //    if (!data.ctrlKey || data.ctrlKey && event.ctrlKey) {
  //      if (event.deltaY > 0 && data.mousewheel == ">") {
  //        data.action.call(target, data.option || event, event)
  //      }
  //      if (event.deltaY < 0 && data.mousewheel == "<") {
  //        data.action.call(target, data.option || event, event)
  //      }
  //      event.preventDefault();
  //      event.stopPropagation();
  //      return false;
  //    }
  //  }
  //});

};

Toolbar.prototype = {

  // setFunctionCallback: function(){},
  tools: {

    "label": {
      scope: function (data, options) {
        return {
          getValue: data.value.get,
          valueCurrent: data.value.get()
        }
      },
      template: '<span class="object-menu-item object-menu-label" title="{title}">',
      render: function ($item, data, options, tool, val) {
        var scope = fabric.util.object.defaults(tool.scope.call(this, data, options),data);
        $item.html(data.template.format(data.value.get()));
        utils.compile.compileElement($item,scope);
      }
    },
    "number": {
      scope: function (data, options) {
        return {
          getInputValue: function(){
            return parseFloat(data.$item.find("input").val());
          },
          getValue: data.value.get,
          setValue: data.value.set,
          minValue: data.value.min && data.value.min(),
          maxValue: data.value.max && data.value.max(),
          valueCurrent: data.value.get(),
          onchange: function (e) {
            data.value.set(parseFloat($(e.target).val()));
          }
        }
      },
      template: '<span class="object-menu-item object-menu-number" title="{title}">' +
      '<input type="number" min="{minValue}" max="{maxValue}" value="{valueCurrent}" onchange="onchange(event)">',
      render: function ($item, data, options, tool, val) {
        $item.find("input").val(data.value.get());
      }
    },
    "range": {
      scope: function (data, options) {
        return {
          minValue: data.value.min ? typeof data.value.min == "function" ? data.value.min() : data.value.min: 0,
          maxValue: data.value.max ? typeof data.value.max == "function" ? data.value.max() : data.value.max: 1,
          valueStep: data.value.step ? typeof data.value.step == "function" ? data.value.step() : data.value.step: 0.1,
          valueCurrent: data.value.get(),
          onchange: function (e) {
            data.value.set(parseFloat($(e.target).val()));
          }
        }
      },
      template: '<span class="object-menu-item object-menu-range" title="{title}">' +
      '<input type="range" step="{valueStep}" min="{minValue}" max="{maxValue}" value="{valueCurrent}" onchange="onchange(event)">',
      render: function ($item, data, options, tool, val) {
        $item.find("input").val(data.value.get());
      }
    },
    "checkbox": {
      scope: function (data, options) {
        return {
          onchange: function (e) {
            data.value.set(e.target.checked)
          },
          valueCurrent: data.value.get()
        }
      },
      template:
      '<span class="object-menu-item object-menu-checkbox" title="{title}">' +
      '<input type="checkbox" onchange="onchange(event)" dp-checked="{valueCurrent}" id="checkbox-{id}">' +
      '<label for="checkbox-{id}"  class="btn button-{id} {className}">',
      render: function ($item, data, options, tool, val) {
        $item.find("input").val(val);
      }
    },
    "menu": {
      template: '<div class="object-menu-item object-menu-menu" title="{title}">' +
      '<label dp-if="title" for="button-{id}">{title}</label>' +
      '<button class="btn button-menu-trigger button-{id} {className}" id="button-{id}"/>' +
      '<div class="object-menu submenu" transclude/>',
      post: function ($item, data, options, transclude) {
        //$item.find(".button-menu-trigger").click(function () {
        //  $item.find(".object-menu").toggle();
        //})
        if (data.hovered) {
          $item.addClass("hovered");
          this.toggleByHover($item, transclude, null, data)
        }
        if (data.toggled) {
          $item.addClass("toggled");
          this.toggleByButton($item, transclude)
        };
        this.generateMenu(data.target, transclude, options, data.menu);
      }
    },
    "button": {
      scope: function (data, options) {
        return {
          buttonsTitle: options.buttons && options.buttons.title || false,
          buttonscClassName: (options.buttons && options.buttons.className || '')
        }
      },
      template:
      '<span class="object-menu-item" title="{title}">' +
      '<button class="btn button-{id} {className} {buttonscClassName}"  onclick="!disabled && option ? action(option) : action()">' +
      '<img dp-if="icon" dp-src="icon">' +
      '<span dp-include="svg" dp-if="svg"></span>' +
      '<span dp-if="buttonsTitle" class="button-title">{title}</span>'
    }
  },
  onCreate: function () {

  },
  destroy: function (target) {
    for (var i = this.buttons.length;i--;) {
      var _config = this.buttons[i];
      if(target && _config.target != target ){
        continue;
      }
      this.buttons.splice(i,1);
    }
  },
  createInput: function ($item, data, type) {

    var target = data.target;
    var $input = $("<input>")
      .attr("type", type)
      .attr("min", data.value.min())
      .attr("max", data.value.max());

    $input.val(data.value.get());
    if (data.value.observe) {
      target.on(data.value.observe, function (val) {
        $input.val(data.value.get());
      });
    }
    $input.change(function (e) {
      data.value.set(parseFloat($input.val()))
    });
    $item.append($input);
  },
  initItem: function ($item, data) {

    if (data.active) {
      if (data.active.call(data.target, data.option)) {
        $item.addClass("active");
      }
    }

    if (data.visible !== undefined) {
      if (data.visible.constructor == Function) {
        if (!data.visible.call(data.target)) {
          $item.hide();
        }
      } else if (!data.visible) {
        $item.hide();
      }
    }

    data.disabled = false;
    if (data.enabled !== undefined) {
      if (data.enabled.constructor == Function) {
        if (!data.enabled.call(data.target)) {
          $item.attr("disabled", true);
          data.disabled = true;
        }
      }
    }

    if (data.observe) {
      //todo
      if (data.visible && data.visible.constructor == Function) {
        data.target && data.target.on(data.observe, function () {
          if (!data.visible.call(data.target)) {
            $item.hide();
            data.hidden = true;
          } else {
            $item.show();
            data.hidden = false;
          }
        });
      }

      if (data.type == "options") {
        data.target && data.target.on(data.observe, function () {
          var _val = data.value.get();
          $("[name=" + data.id + "]").prop("checked",false);
          $("[name=" + data.id + "][value=" + _val +"]").prop("checked",true);
        });
      }

      if (data.enabled && data.enabled.constructor == Function) {
        data.target && data.target.on(data.observe, function () {
          if (!data.enabled.call(data.target)) {
            $item.attr("disabled", true);
            data.disabled = true;
          } else {
            $item.removeAttr("disabled");
            data.disabled = false;
          }
        });
      }
    }
  },
  toggleByHover: function ($item, $toggleElement, foo,data) {

    var onClose;

    $toggleElement.hide();
    $item.mouseout(function () {
      $toggleElement.hide();
      onClose && onClose();
    });
    $item.mouseover(function () {
      $toggleElement.show();
      onClose = foo && foo();
    });

    $item.click(function () {
      if (data && data.immediately) {
        data.action();
      }
    });
  },
  toggleByButton: function ($item, $toggleElement, foo,data) {

    var onClose;
    var _try_hide = function (e) {
      var _parents = $(e.target).parents();
      for (var i in _parents) {
        if (_parents[i] === $item[0]) {
          return false;
        }
      }
      if ($toggleElement.css("display") !== "none") {
        $toggleElement.hide();
        onClose && onClose();
      }
    };

    $toggleElement.click(function (e) {
      e.stopPropagation();
    });
    $toggleElement.hide();
    $item.click(function () {

      if ($toggleElement.css("display") !== "none") {
        $toggleElement.hide();
        onClose && onClose();
        $(window).off("click", _try_hide);
      } else {
        $toggleElement.show();
        $(window).on("click", _try_hide);

        onClose = foo && foo();

        if(data && data.immediately){
          data.action();
        }
      }
    })
  },
  generateMenu: function (target, $el, options, menu) {

    options = options || {
        title: false
      };
    options.buttons = options.buttons || {
        className: "",
        title: false
      };

    $el.empty();

    var _this =  this;
    for (var i in menu) {
      var data = menu[i];
      if (!data || data.insert !== undefined && !data.insert) {
        continue;
      }
      data.type = data.type || "button";

      //todo непонятно зачем аргумент target в начале
      var target = data.target;

      var tool = this.tools[data.type];

      if (!tool) {
        console.warn("tool '" + data.type + "' undefined");
        continue;
      }
      var scope = data;
      if (tool.scope) {
        scope = fabric.util.object.defaults(tool.scope.call(this, data, options),data);
      }

      var $item = $(tool.template.format(scope));
      var transclude = $item.find("[transclude]");
      scope.$item = data.$item = $item;
      if(data.template){
        $item.html(data.template.format(data.value.get()));
      }

      utils.compile.compileElement($item,scope);

      if (data.value && data.value.observe) {

        target.on(data.value.observe, function (val) {

          if (tool.post) {
            tool.post.call(_this,$item, scope, options, transclude.length ? transclude : null);
          }
          if(tool.render){
            tool.render.call(_this, $item, data, options, tool, val);
          }
          //this.fire(data.type + ":render",{item: $item, data: data, options: options, tool: tool, val: val})
        });
      }

      this.initItem($item, data);

      if (tool.post) {
        tool.post.call(this,$item, scope, options, transclude.length ? transclude : null);
      }

      this.fire(data.type + ":created",{item: $item, data: data, options: options, tool: tool});

      $el.append($item);
    }
  }
};
utils.observable(Toolbar.prototype);


Toolbar.single = function(data,element){
  data.$item = element;
  data.type = data.type || "button";

  var tool = Toolbar.prototype.tools[data.type];

  Toolbar.prototype.initItem(element,data);

  if (data.value && data.value.observe) {
    data.target.on(data.value.observe, function (val) {
      tool.render( element, data, {}, tool, val)
    });
  }

  if(tool.post){
    var transclude = element.find("[transclude]");

    tool.post.call(Toolbar.prototype, element, data, {}, transclude.length ? transclude : null);
  }

  var scope = data;
  if(tool.scope){
    scope = _.defaults(data, tool.scope.call(Toolbar.prototype, data, {}));
  }

  element.eachSelf("*",function(){
    var nodes=[], values=[];
    for (var att, i = 0, atts = this.attributes, n = atts.length; i < n; i++){
      att = atts[i];
      nodes.push(att.nodeName);
      values.push(att.nodeValue);
      this.setAttribute(att.nodeName,att.nodeValue.format(scope));
    }
  });
  utils.compile.compileElement(element,scope);
};


module.exports = Toolbar;




/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var utils = {
  /**
   *
   * @param arr
   * @param arr2
   * @returns {{}}
   * @example
   *    x = {a: 1 ,b: 1, c: [1,2]}
   *    y = {a: 2 ,  c : 3 , d : 1}
   *
   *    extendArraysObject(x,y) = {a: [1,2] b : [1] c : [1,2,3], d [1] }
   */
  extendArraysObject : function(arr,arr2){
    var newArray = {};

    for(var i in arr){
      if(arr[i].constructor == Array){
        newArray[i]  = [].concat(arr[i]);
      }else{
        newArray[i] = [arr[i]];
      }
    }

    for(var i in arr2){
      if(newArray[i]){
        newArray[i].push(arr2[i]);
      }else{
        newArray[i] = [arr2[i]];
      }
    }
    return newArray;
  },
  filterValues: function (array, values) {
    var new_array = [];
    for (var i in array) {
      var _new_object = {};
      for (var j in values) {
        _new_object[values[j]] = array[i][values[j]]
      }
      new_array.push(_new_object);
    }
    return new_array;
  },

  /**
   *  Тасование Фишера–Йетса,случайное тасование множества
   * @param object
   * @returns {*}
   */
  shuffle: function (object) {
    if (!object.length) return;
    var i = object.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = object[i];
      object[i] = object[j];
      object[j] = temp;
    }

    return object; // for convenience, in case we want a reference to the array
  },
  /**
   * Dependency: underscore.js ( http://documentcloud.github.com/underscore/ )
   *
   * Mix it in with underscore.js:
   * _.mixin({deepExtend: deepExtend});
   *
   * Call it like this:
   * var myObj = utils.deepExtend(grandparent, child, grandchild, greatgrandchild)
   *
   * Notes:
   * Keep it DRY.
   * This function is especially useful if you're working with JSON config documents. It allows you to create a default
   * config document with the most common settings, then override those settings for specific cases. It accepts any
   * number of objects as arguments, giving you fine-grained control over your config document hierarchy.
   *
   * Special Features and Considerations:
   * - parentRE allows you to concatenate strings. example:
   *   var obj = utils.deepExtend({url: "www.example.com"}, {url: "http://#{_}/path/to/file.html"});
   *   console.log(obj.url);
   *   output: "http://www.example.com/path/to/file.html"
   *
   * - parentRE also acts as a placeholder, which can be useful when you need to change one value in an array, while
   *   leaving the others untouched. example:
   *   var arr = utils.deepExtend([100,    {id: 1234}, true,  "foo",  [250, 500]],
   *                          ["#{_}", "#{_}",     false, "#{_}", "#{_}"]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - The previous example can also be written like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false, "#{_}", []]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - And also like this:
   *   var arr = utils.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
   *                          ["#{_}", {},          false]);
   *   console.log(arr);
   *   output: [100, {id: 1234}, false, "foo", [250, 500]]
   *
   * - Array order is important. example:
   *   var arr = utils.deepExtend([1, 2, 3, 4], [1, 4, 3, 2]);
   *   console.log(arr);
   *   output: [1, 4, 3, 2]
   *
   * - You can remove an array element set in a parent object by setting the same index value to null in a child object.
   *   example:
   *   var obj = utils.deepExtend({arr: [1, 2, 3, 4]}, {arr: ["#{_}", null]});
   *   console.log(obj.arr);
   *   output: [1, 3, 4]
   *
   **/
  deepExtend: function (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
      return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone, tmpBuf;

    args.forEach(function (obj) {
      if (typeof obj !== 'object') return;

      for (key in obj) {
        if (!(key in obj)) continue;

        src = target[key];
        val = utils.cloneDeep(obj[key]);


        if (typeof src !== 'object' || src === null) {
          target[key] = val;
        }else if (Array.isArray(val)) {
          clone = (Array.isArray(src)) ? src : [];

          val.forEach(function(item){
            clone.push(utils.cloneDeep(item));
          });

          target[key] = clone;
          //todo  если заимствуем массив , то ссохраняем значения из обоих массивов
          //target[key] = utils.deepExtend(clone, val);

        } else {
          clone = (!Array.isArray(src)) ? src : {};
          target[key] = utils.deepExtend(clone, val);
        }

      }
    });

    return target;
  },
  cloneDeep: function (val) {

    if (typeof val === 'undefined') {
      return undefined;
    }

    if (val === null) {
      return null;
    } else if (val instanceof Date) {
      return new Date(val.getTime());
    } else if (val instanceof RegExp) {
      return new RegExp(val);
    }

    if(val.cloneSync){
      return val.cloneSync();
    }else if(val.constructor == Object){
      return utils.deepExtend({}, val);
    }else if(val.constructor == Array){
      var clone = [];
      for(var i =0 ;i < val.length; i++){
        clone.push(utils.cloneDeep(val[i]));
      }
      return clone;
    }else{
      return val;
    }
  },
  rearrange: function (object, keys) {
    var _newOrder = {};
    for (var i in keys) {
      if(object[keys[i]] !== undefined){
        _newOrder[keys[i]] = object[keys[i]]
      }
    }
    // for (i in object) {
    //   delete object[i];
    // }
    // for (i in _newOrder) {
    //   object[i] = _newOrder[i];
    // }
    return _newOrder;
  },
  sortBy: _.sortBy,
  defaults: _.defaults,
  where: _.where,
  findWhere: _.findWhere,
  filter: _.filter,
  pick: _.pick,
  extend: function (destination) {
    // JScript DontEnum bug is not taken care of
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var property in source) {
        destination[property] = source[property];
      }
    }
    return destination;
  }
};
module.exports =  utils;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var objectUtils = __webpack_require__(2)

var utils = {
  /**
   * will divide total width for every object in columnts array
   *
   *
   * @example
   *     var _flexArray = fabric.util.flex(200 , [{flex: 0},{value: 100, flex: 1},{flex: 0}] );
   * @param total
   * @param columns
   * @returns {Array}
   * @example [50,100,50]
   */
  flex: function (total,columns){
    var _return = [];
    var split = 0;
    columns.forEach(function(column, index){
      if(column.value === undefined){
        split++;
      }else{
        total -= column.value;
      }
    });
    var _w = total / split;
    columns.forEach(function(column){
      _return.push(column.value === undefined ? _w :  column.value );
    });
    return _return;
  },
  worker: function (foo) {
    if (window.Worker) {
      var str = foo.toString();
      var eventArg = str.substring(str.indexOf("(") + 1,str.indexOf(","));
      var postMessageArg = str.substring(str.indexOf(",") + 1,str.indexOf(")"));
      var _functionBody = str.substring(str.indexOf("{") + 1);
      str = "onmessage=function(" + eventArg + "){" + postMessageArg + "= postMessage;" + _functionBody;
      var blob = new Blob([str]);
      //"onmessage = function(e) { postMessage('msg from worker'); }"]);
      var blobURL = window.URL.createObjectURL(blob);
      return new Worker(blobURL);
    } else {
      var worker = {
        terminate: function () {
        },
        postMessage: function (data) {
          setTimeout(function () {
            foo({data: data}, function (responseData) {
              worker.onmessage && worker.onmessage({data: responseData});
            })
          });
        }
      };
      return worker;
    }
  },
  observable: function (obj) {
    _.extend(obj, {

      fire: function fire(eventName, options) {
        if (!this.__eventListeners) {
          return;
        }
        var listenersForEvent = this.__eventListeners[eventName];
        if (!listenersForEvent) {
          return;
        }
        for (var i = 0, len = listenersForEvent.length; i < len; i++) {
          listenersForEvent[i].call(this, options || {});
        }
        return this;
      },
      on: function (eventName, handler) {
        if (eventName.constructor == Object) {
          for (var i in eventName) {
            this.on(i, eventName[i])
          }
          return this;
        }
        var events = eventName.split(" ");
        for (var i in events) {
          this.observe(events[i], handler)
        }
        return this;
      },
      observe: function (eventName, handler) {
        if (!this.__eventListeners) {
          this.__eventListeners = {};
        }
        if (arguments.length === 1) {
          for (var prop in eventName) {
            this.on(prop, eventName[prop]);
          }
        }
        else {
          if (!this.__eventListeners[eventName]) {
            this.__eventListeners[eventName] = [];
          }
          this.__eventListeners[eventName].push(handler);
        }
        return this;
      },
      off: function stopObserving(eventName, handler) {
        function _removeEventListener(eventName, handler) {
          if (!this.__eventListeners[eventName]) {
            return;
          }

          if (handler) {
            var idx = this.__eventListeners[eventName].indexOf(handler);
            if (idx !== -1) {
              this.__eventListeners[eventName].splice(idx, 1);
            }
          }
          else {
            this.__eventListeners[eventName].length = 0;
          }
        }

        if (!this.__eventListeners) {
          return;
        }
        if (arguments.length === 0) {
          this.__eventListeners = {};
        }
        else if (arguments.length === 1 && typeof arguments[0] === 'object') {
          for (var prop in eventName) {
            _removeEventListener.call(this, prop, eventName[prop]);
          }
        }
        else {
          _removeEventListener.call(this, eventName, handler);
        }
        return this;
      }
    })
  },
  inOrder: function (array, foo, callback) {
    var _index = 0;
    function _inOrderIndex() {
      if (++_index < array.length) {
        foo(array[_index], _index, _inOrderIndex)
      } else {
        callback && callback();
      }
    }
    foo(array[_index], _index, _inOrderIndex)
  },
  /**
   * возвращает объект с ключами строки url
   * @returns {{}}
   */
  queryString: function (query) {
    if(query) {
      query = query.substr(query.indexOf("?") + 1) ;
    }else{
      query = window.location.search.substring(1);
    }
    var obj = {};
    var _length = 0;
    if (!query)return obj;
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var _vname = pair[0], val = pair[1];
      if (typeof obj[_vname] === "undefined") {
        obj[_vname] = val || "";
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
        // If second entry with this name
      } else if (typeof obj[_vname] === "string") {
        var arr = [obj[_vname], val];
        obj[_vname] = arr;
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
        // If third or later entry with this name
      } else {
        obj[_vname].push(val);
        Object.defineProperty(obj, _length, {value: _vname, enumerable: false});
        _length++;
      }
    }
    Object.defineProperty(obj, "length", {value: _length, enumerable: false});
    return obj;
  },
  copyValue: function (value) {
    if (value == null) {
      return null
    }
    if (value == undefined) {
      return undefined
    }
    switch (value.constructor) {
      case Object:
        return objectUtils.deepExtend({}, value);
      case Array:
        return objectUtils.deepExtend([], value);
      case String:
      case Number:
      case Boolean:
        return value;
      default:
        //console.log(value.constructor);
        return objectUtils.deepExtend({}, value);
    }
  },
  clearValue: function (value) {
    switch (value.constructor) {
      case Object:
        for (var member in value) delete value[member];
        break;
      case Array:
        value.length = 0;
        break;
      default:
        delete value;
    }
  },
  objectsDifference: function (prev, now) {
    var changes = {};
    for (var prop in now) {
      if (!prev || prev[prop] !== now[prop]) {
        if (typeof now[prop] == "object") {
          var c = utils.objectsDifference(prev[prop], now[prop]);
          if (!_.isEmpty(c)) // underscore
            changes[prop] = c;
        } else {
          changes[prop] = now[prop];
        }
      }
    }
    return changes;
  },
  splitBy: function (query, delimiter) {
    var traceQueries = [];
    var r = 0,
      f = 0,
      _p_start = 0;
    if (query == "") return [];
    for (var i = 0; i < query.length; i++) {
      var c = query[i];
      if (c == "(") {
        r++;
        f = 1;
      } else if (c == ")") {
        r--;
      }
      if (r == 0 && f == 1) f = 0;
      if (delimiter.indexOf(c) != -1 && r == 0 && f == 0) {
        traceQueries.push(query.substring(_p_start, i));
        _p_start = i + 1;
      }
    }
    traceQueries.push(query.substring(_p_start));
    return traceQueries;
  },
  queueLoad: function (total, completeCB, progressCB) {
    var loader = function (el) {
      loader.loaded.push(el);
      loader.progressCB && loader.progressCB(loader.loaded.length, loader.total, el, loader.loaded);

      if (loader.loaded.length == loader.total) {
        loader.completeCB && loader.completeCB(loader.loaded);
        loader.fire("loaded");
      }
    };
    loader.completeCB = completeCB;
    loader.progressCB = progressCB;
    loader.total = total;
    loader.loaded = [];
    utils.observable(loader);

    return loader;
  }
};
module.exports =  utils;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


String.prototype.format  = function () {
  var str = this.toString();
  if (arguments.length) {
    var type = typeof arguments[0]
      , args = type == 'string' || type == 'number' ? Array.prototype.slice.call(arguments) : arguments[0]
    //
    // for (var arg in args) str = str.replace(new RegExp('\\{' + arg + '\\}', 'gi'), args[arg])

    str = str.replace(/\{([^}]*)\}/g,function(a,b){
      return utils.evalInContext(b,args)
    })
  }

  return str
};

utils = {
  extractVariables: function (str) {
    return str.match(/(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*/gi);
  },
  evalInContext: function (js) {
    js = js.replace(/\s+/g, '');


    var keys = [], values = [];

    for (var i = 1; i < arguments.length; i++) {
      keys = keys.concat(Object.keys(arguments[i]));
      for (var j in arguments[i]) {
        values.push(arguments[i][j]);
      }
    }

    //
    //if(_.isCorrectVariableName(js) && keys.indexOf(js) === -1){
    //  keys.push(js);
    //  values.push(undefined);
    //}

    var arr = utils.extractVariables(js);
    //console.log(arr);
    for (var i in arr) {
      if (keys.indexOf(arr[i]) === -1) {
        keys.push(arr[i]);
        values.push(undefined);
      }
    }
    js = "var foo = function(" + keys.join(",") + "){ var __return__value = " + js + " ;return __return__value;}; foo;";
    try {
      var foo = eval(js);
      return foo.apply(this, values);
    } catch (e) {
      return undefined;
    }

  },
  compileElement: function ($item, scope) {

    function _eachSelf(el, selector, foo) {
      el.find(selector).each(foo);
      if (el.is(selector)) {
        foo.call(el[0]);
      }
    }

    //.addBack('selector')
    _eachSelf($item, "[onclick]", function () {
      var onClick = $(this).attr("onclick");
      $(this).removeAttr("onclick");
      $(this).click(function (event) {
        utils.evalInContext(onClick, scope, {event: event});
      })
    })


    _eachSelf($item, "[onchange]", function () {
      var onChange = $(this).attr("onchange");
      $(this).removeAttr("onchange");
      $(this).change(function (event) {
        utils.evalInContext(onChange, scope, {event: event});
      })
    });

    _eachSelf($item, "[dp-checked]", function () {
      var _val = $(this).attr("dp-checked");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("checked", "checked");
      } else {
        $(this).removeAttr("checked");
      }

    });
    _eachSelf($item, "[dp-src]", function () {
      var _val = $(this).attr("dp-src");
      var val = utils.evalInContext(_val, scope);
      if (val) {
        $(this).attr("src", val);
      }

    });
    _eachSelf($item, "[dp-if]", function () {
      var _val = $(this).attr("dp-if");
      if (_val === "false") {
        $(this).remove();
      }
      if (_val === "true") {

      } else {
        var val = utils.evalInContext(_val, scope);
        if (!val) {
          $(this).remove();
        }
      }
    });
    _eachSelf($item, "[dp-include]", function () {
      var _el = $(this);
      var _val = _el.attr("dp-include");
      var val = utils.evalInContext(_val, scope);
      _el.load(val);
    });
  },
  parseTemplate: function (tpl, scope) {
    var $item = $(tpl.format(scope));
    _.compileElement($item, scope);
    return $item;
  }
};
if(true){
  module.exports = utils;
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  resolve: function (path) {
    var chunks = path.split("/");
    var prev = 0;
    for (var i = chunks.length; i-- > 0;) {
      if (chunks[i] == "..") {
        prev++;
      } else {
        while (prev > 0) {
          chunks.splice(i, 1);
          chunks.splice(i--, 1);
          prev--;
        }
      }
    }
    return chunks.join("/");
  },
  getParentDirectoryUrl: function (url) {
    return url.substr(0, url.lastIndexOf("/") + 1);
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
var ExtCanvasMixin = {
  animated: false,
  fitIndex: 0.8,
  optionsOrder: ["originalWidth","originalHeight","width","height","*"],
  /**
   * required to show video
   */
  setAnimated: function (val) {
    if(!val){
      return;
    }

    fabric.util.requestAnimFrame(function render() {
      this.renderAll();
      fabric.util.requestAnimFrame(render);
    }.bind(this));
  },
  find: function (options) {
    if (typeof options == "string"){
      options = {
        type: options
      }
    }
    return fabric.util.object.where(this._objects,options);
  },
  _update_background_image: function () {
    var photo = this.backgroundImage;
    if (!photo || photo.constructor == Object || photo.constructor == String) return;

    if (this.backgroundPosition == 'resize') {
      this.originalWidth = photo.width;
      this.originalHeight = photo.height;

    }else if (this.backgroundPosition != 'manual') {

      var _w  =  this.originalWidth || this.width,  _h = this.originalHeight || this.height;

      if(photo._originalElement){
        var size = fabric.util.getProportions(photo._originalElement, {
          width: _w,
          height: _h
        }, this.backgroundPosition);
      }else{
        size = {
          width: _w,
          height: _h
        }
      }

      var _l ;
      if(this.backgroundImage.originX == 'center'){
        _l = _w / 2;
      }else{
        _l = (_w - size.width) / 2 ;
      }
      var _t ;
      if(this.backgroundImage.originY == 'center'){
        _t = _h / 2;
      }else{
        _t = (_h - size.height) / 2 ;
      }

      this.backgroundImage.set({
        left: _l + this.viewportTransform[4],
        top:  _t + this.viewportTransform[5],
        width: size.width,
        height: size.height
      });
    } else {
      // var _orig = this.backgroundImage.getOriginalSize();
      // this.backgroundImage.set({
      //   originX: 'left',
      //   originY: 'top',
      //   left: 0, //this.viewportTransform[4],
      //   top: 0, //this.viewportTransform[5],
      //   width: _orig.width,
      //   height: _orig.height
      // });
    }
  },
  setBackgroundImage: function (bg, callback) {
    var _bgimageLoaded = function (el){

      this.backgroundImage = el;
      this.backgroundImage.canvas = this;
      this._update_background_image();
      if(!this.originalWidth && !this.originalHeight){
        this.originalWidth = el.width;
        this.originalHeight = el.height;
      }
      this.fire("background-image:loaded",{target: el});
      callback && callback();
    }


    if (!bg) {
      this.backgroundImage = null;
      return callback();
    }
    if (bg instanceof HTMLImageElement || bg instanceof Image){

      var el = new fabric.Image(bg,{
        width: bg.naturalWidth,
        height: bg.naturalHeight
      });

      _bgimageLoaded.call(this,el);
    }
    if (bg.constructor == String) {
      bg = {
        src: bg
      }
    }
    var _proto = this.application.prototypes;
    if(_proto && _proto.SlideCanvas && _proto.SlideCanvas.backgroundImageProperties){
      fabric.util.object.extend(bg,_proto.SlideCanvas.backgroundImageProperties);
    }
    bg.application = this.application;
    bg.type = bg.type || "image";
    // bg.width = bg.naturalWidth;
    // bg.height = bg.naturalHeight;
    //
    fabric.util.createObject(bg,_bgimageLoaded.bind(this));
  },
  createObjects: function(objects,callback){

    if(this.application){
      for(var i in objects){
        if(objects[i].constructor == String){
          objects[i] = this.application.objects[objects[i]];
        }
      }
    }

    var _canvas = this;

    function success(_objects) {
      _canvas.fire("progress:complete", {objects: objects});
      for (var i in _objects) {
        _canvas.add(_objects[i].object);
      }
      _canvas.renderAll();
      callback && callback.call(_canvas)
    }

    function progress(l, t) {
      _canvas.fire("progress", { loaded : l, total : t });
      if (fabric.util.loaderDebug) {
        console.log("loaded " + l + " / " + t);
      }
    }


    var _objects = [];
    if (!objects || !objects.length) {
      this.fire("progress:complete", 0);
      success(_objects);
      return;
    }

    var queueLoadCallback = fabric.util.queueLoad(objects.length, function(){
      success(_objects)
    }, progress);

    queueLoadCallback.data = (this.title || "") + "objects";

    for (var i in objects) {
      (function (options) {
        var _object_slot = {object: null, options: options};
        _objects.push(_object_slot);

        options.application = _canvas.application;
        fabric.util.createObject(options, function (el) {
          _object_slot.object = el;
          queueLoadCallback();
        });
      }).call(this, objects[i]);
    }
  },
  /**
   * apply options for group of filtered objects
   * @param filter
   * @param options
   */
  applyOptions: function(filter,options){
    this._objects.forEach(function(_obj){
      for(var prop in filter){
        if(_obj[prop] !==  filter[prop])return;
      }
      _obj.setOptions(options);
    })
  },
  /**
   * Create Object by type and options
   * @param type
   * @param options
   * @param callback
   */
  createObject: function (type, options,callback) {
    if(typeof type !== "string"){
      callback = options;
      options = fabric.util.object.clone(type);
      type = null;
    }else{
      options = fabric.util.object.clone(options);
      options.type = type;
    }

    var _self = this;
    options.application = this.application;
    var _active = options.active;
    var _position = options.position;
    delete options.active;
    delete options.position;


    function _add(el) {
      if(el.canvas)return;
      if(_position == "center") {
        _self.fitObject(el);
      }
      _self.add(el);

      if(_active){
        _self.setActiveObject(el);
      }
      callback && callback(el);
    }

    var el = fabric.util.createObject(options,_add );
    el && _add(el);
    return el;
  },
  onLoad: function (callback) {
    this.processing =false;
    this.loaded = true;
    this.fire("loading:end",{type: "slide", target: this});
    this.renderAll();
    callback && callback.call(this);
  },
  load: function (options,callback) {
    this.originalWidth = 0;
    this.originalHeight = 0;
    if (!options)return;

    if(!this.virtual){
      this.clear();
    }

    if(options.width){
      options.originalWidth = options.width;
      options.originalHeight = options.height;
    }

    this.processing = true;
    this.fire("loading:begin",{type: "slide", target: this});

    this.set(options,this.onLoad.bind(this,callback));


    //todo
    if(this.plugins){
      this.plugins.preloaders.forEach(function(preloader){
        preloader.call(this, options);
        this.onResize();
      }.bind(this));
    }


  },
  setObjects: function(objects,callback){

    this.createObjects(objects,function(){
      for(var i in this._objects){
        this._objects[i].setCoords();
      }
      callback();
    });
  },
  onResize: function(){
    var _scale = Math.min(1,800 /this.width );
    // this.setZoom(_scale);
    this.setDimensions({width: this.width,height: this.height});
  },
  getCenter: function (el) {
    return {
      top: (this.originalHeight  || this.getHeight()) / 2,
      left: (this.originalWidth || this.getWidth()) / 2
    };
  },
  fitObject: function (el) {
    var _rect, maxSize, offsets;

    if(el.movementLimits && el.movementLimits.constructor !== Function){
      var lim = el.movementLimits;
      _rect = {
        left:   lim.left * lim.scaleX,
        width:  lim.width * lim.scaleX ,
        top:    lim.top * lim.scaleY,
        height: lim.height * lim.scaleY
      };
      //maxSize = _rect;
     // offsets = lim;
    }else{
      var _zoom = this.getZoom();
      var _w = this.originalWidth || this.width / _zoom;
      var _h = this.originalHeight || this.height / _zoom;
      _rect = {
        width: this.offsets ? (_w - this.offsets.left - this.offsets.right) : _w,
        height: this.offsets ?(_h - this.offsets.top - this.offsets.bottom) : _h
      };
     /* offsets = {
        left: this.offsets && this.offsets.top ||0 ,
        top:  this.offsets &&  this.offsets.left ||0
      }*/
    }
    maxSize = {
      width: _rect.width * this.fitIndex,
      height: _rect.height * this.fitIndex
    };
    var size = fabric.util.getProportions(el, maxSize, 'fit');

    if(el.resizable){
      el.setOptions({
        width: el.width * size.scale,
        height: el.height * size.scale
      });
      el.updateElement();
    }else{
      el.setOptions({
        scaleX: size.scale,
        scaleY: size.scale
      });
    }
    this.centerObject(el);
    el.setCoords();
  },
  setOriginalSize: function (w, h) {
    this.originalWidth = h ? w : (w.naturalWidth || w.width);
    this.originalHeight = h ? h : (w.naturalHeight || w.height);
    return this;
  }
};

fabric.util.object.extend(fabric.StaticCanvas.prototype,ExtCanvasMixin);
fabric.util.object.extend(fabric.Canvas.prototype,ExtCanvasMixin);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.ImageMixin = {
  setElementFromMenu : function(data){
    this.setElement(data.image)
  },
  initProportinalSize : true,
  /**
   * @private
   * @param {Object} [options] Object with width/height properties
   */
  _setWidthHeight: function(options) {
    var _size = this.getOriginalSize();
    if('width' in options){
      this.width = options.width;
    }else{
      if(!_size.width){
        this.width = 0;
      }else{
        if(this.initProportinalSize && 'height' in options){
          this.width = (options.height  / _size.height ) * _size.width;
        } else {
          this.width = _size.width;
        }
      }
    }

    if('height' in options){
      this.height = options.height;
    }else{
      if(!_size.height){
        this.height = 0;
      }else{
        if(this.initProportinalSize && 'width' in options){
          this.height = (options.width  / _size.width ) * _size.height;
        } else {
          this.height = _size.height;
        }
      }
    }
  }
};

fabric.Application.prototype.getLibraryElements = function(options){
  return [];
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {// Magic Wand (Fuzzy Selection Tool) for Javascript
//
// The MIT License (MIT)
//
// Copyright (c) 2014, Ryasnoy Paul (ryasnoypaul@gmail.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var MagicWand = (function () {
  var lib = {};
  //var canvas = document.createElement("canvas");
  //var context = canvas.getContext("2d");

  function createCanvasElement(){
    if(typeof Canvas !== "undefined"){
      return new Canvas;
    }
    return document.createElement("canvas");
  }

  function SelectionMask(w,h,data){
    if(arguments.length == 1){
      for(var i in arguments[0] ){
        this[i] = arguments[0][i];
      }
    }else{
      this.data = new Uint8Array(data || w * h);
      this.width  = w;
      this.height = h;
      this.count  = 0;
      this.bounds = {
       minX: Infinity,
       minY: Infinity,
       maxY: -1,
       maxX: -1
      };
      // this.bounds = {
      //   minX: 0,
      //   minY: 0,
      //   maxY: h,
      //   maxX: w
      // };
    }
  }
  lib.SelectionMask = SelectionMask;


  SelectionMask.prototype.debug = function(){
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    this.render(ctx,{
      fill : "#fff",
      outerFill : "#000"
    });
    ctx.debug();
  };

  SelectionMask.prototype.makeCache = function(options ){
    this.cache = createCanvasElement();
    this.cache.width = this.bounds.maxX- this.bounds.minX + 1;
    this.cache.height = this.bounds.maxY- this.bounds.minY + 1;
    this.context = this.cache.getContext('2d');

    options = options || {}
    this.render(this.context,{
      fill : "#fff",
      outerFill : "#000",
      cache: false,
      left :-this.bounds.minX,
      top :-this.bounds.minY
    });

  };

  SelectionMask.prototype.add = function (mask) {
    var index, x, y;
    for (x = mask.bounds.minX; x <= mask.bounds.maxX; x++) {
      for (y = mask.bounds.minY; y <= mask.bounds.maxY; y++) {
        index = mask.width * y + x;
        if ( mask.data[index] && !this.data[index]){
          this.data[index] = 1;
          this.count++;
        }
      }
    }

    this.bounds.minX = Math.min(mask.bounds.minX, this.bounds.minX);
    this.bounds.maxX = Math.max(mask.bounds.maxX, this.bounds.maxX);
    this.bounds.minY = Math.min(mask.bounds.minY, this.bounds.minY);
    this.bounds.maxY = Math.max(mask.bounds.maxY, this.bounds.maxY);
  };
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  SelectionMask.prototype.render = function(ctx,options ){
    if(!this.count)return;

    options             = options             || {};
    options.left        = options.left        || 0 ;
    options.top         = options.top         || 0 ;
    options.fill        = options.fill        || false ;// [0,0,0,0];
    options.intersectionColor = options.intersectionColor ||false ;//  [0,0,0,0];

    options.outerFill        = options.outerFill        || false ;// [0,0,0,0];
    options.outerIntersectionColor = options.outerIntersectionColor ||false ;//  [0,0,0,0];

    //if(this.cache && options.cache !== false){
    //
    //  var _ctx = this.context;
    //  _ctx.save();
    //  _ctx.globalCompositeOperation="source-in";
    //  _ctx.fillStyle= options.fill;
    //  _ctx.fillRect(0,0,this.cache.width,this.cache.height);
    //  _ctx.restore();
    //
    //  ctx.save();
    //  ctx.globalAlpha = options.opacity;
    //  ctx.drawImage(this.cache,this.bounds.minX,this.bounds.minY)
    //  ctx.restore();
    //  return;
    //}

    //todo do not use fabric here!
    function convertColor(color){
      if(color.constructor  == String ){
        if(color[0] == "#"){
          var _rgb = hexToRgb(color);
          return [_rgb.r,_rgb.g,_rgb.b,255];
        }
        color = new fabric.Color(color)._source;
        color[3] *= 255;
      }
      return color;
    }

    var _w = this.bounds.maxX - this.bounds.minX + 1;
    var _h = this.bounds.maxY - this.bounds.minY + 1;

    //var imgData = ctx.getImageData(options.left,options.top,_w,_h);
    var imgData = ctx.getImageData(this.bounds.minX,this.bounds.minY,_w,_h);

    var color  = convertColor(options.fill);
    var color2 = convertColor(options.intersectionColor);
    var color3 = convertColor(options.outerFill);
    var color4 = convertColor(options.outerIntersectionColor);

    for(var x = this.bounds.minX ; x <= this.bounds.maxX;x++ ){
      for(var y = this.bounds.minY ; y <= this.bounds.maxY; y++ ){
        var index = this.width * y + x;
        var index_small = _w * (y - (this.bounds.minY)) + x - (this.bounds.minX);

        if(this.data[index] ){
          var _color = imgData.data[index_small * 4 + 3]? color2 : color ;
          if(!_color)continue;

          imgData.data[index_small * 4 ]    = _color[0];
          imgData.data[index_small * 4 + 1] = _color[1];
          imgData.data[index_small * 4 + 2] = _color[2];
          imgData.data[index_small * 4 + 3] = _color[3];
        }else{
          var _color = imgData.data[index_small * 4 + 3]? color4 : color3 ;
          if(!_color)continue;

          imgData.data[index_small * 4 ]    = _color[0];
          imgData.data[index_small * 4 + 1] = _color[1];
          imgData.data[index_small * 4 + 2] = _color[2];
          imgData.data[index_small * 4 + 3] = _color[3];
        }
      }
    }

    // ctx.putImageData(imgData, options.left  , options.top  );
    ctx.putImageData(imgData, this.bounds.minX,this.bounds.minY  );
  };


  /**
   * get array with begin and end indices of filled 1 intervals
   * @param ctx
   * @param options
   * @returns {Array}
   */
  SelectionMask.prototype.getIntervalsArray = function (ctx, options) {
    var _newData = [];
    for (var i = 0, _val = 0; i < array.length; i++) {
      if (_val != array[i]) {
        _newData.push(i);
        _val = array[i];
      }
    }
    return _newData;
  };

  SelectionMask.prototype.renderBorder = function (ctx, options) {

    options             = options             || {};
    options.left        = options.left        || 0 ;
    options.top         = options.top         || 0 ;
    options.hatchOffset = options.hatchOffset || 0 ;
    options.hatchLength = options.hatchLength || 4 ;
    options.opacity = options.opacity || 1 ;

    var imgData = ctx.getImageData(0,0,this.width,this.height);

    if(!this.cacheInd){
      this.cacheInd = MagicWand.getBorderIndices(this);
    }

    var x, y, i, j, k,
      w = imgData.width,
      h = imgData.height;
    var res = imgData.data;

    var len = this.cacheInd.length;
    for (j = 0; j < len; j++) {
      i = this.cacheInd[j];
      x = i % w; // calc x by index
      y = (i - x) / w; // calc y by index
      k = (y * w + x) * 4;

      if ((x + y + options.hatchOffset) % (options.hatchLength * 2) < options.hatchLength) { // detect hatch color

        res[k] = 0;
        res[k + 1] = 0;
        res[k + 2] = 0;
        res[k + 3] = 255; // black, change only alpha
      } else {
        res[k] = 255; // white
        res[k + 1] = 255;
        res[k + 2] = 255;
        res[k + 3] = 255;
      }
    }
    ctx.save();
    ctx.globalAlpha = options.opacity;
    ctx.putImageData(imgData, options.left || 0 , options.top || 0 );
    ctx.restore();
  };


  lib.createMask = function (w, h,data) {
    return new SelectionMask(w,h,data);
  };

  lib.difference = function (a, b) {
    return Math.max(
      b[0] !== false ? Math.abs(b[0] - a[0]): 0,
      b[1] !== false ? Math.abs(b[1] - a[1]): 0,
      b[2] !== false ? Math.abs(b[2] - a[2]): 0,
      b[3] !== false ? Math.abs(b[3] - a[3]): 0);
  };

  lib.acceptable = function (x, y, image, visited, sampleColor, colorThreshold) {
// check whether the point has been visited
    if (visited[y * image.width + x] === 1) {
      return false;
    }
    var i = (y * image.width + x) * lib.bytes,
      color2 = [image.data[i], image.data[i + 1], image.data[i + 2], image.data[i + 3]];


    if (sampleColor[0] !== false && Math.abs(sampleColor[0] - color2[0]) > colorThreshold)return false;
    if (sampleColor[1] !== false && Math.abs(sampleColor[1] - color2[1]) > colorThreshold)return false;
    if (sampleColor[2] !== false && Math.abs(sampleColor[2] - color2[2]) >colorThreshold)return false;
    if (sampleColor[3] !== false && Math.abs(sampleColor[3] - color2[3]) > colorThreshold)return false;
    return true;
  };

  lib.selectAll = function (image, px, py, colorThreshold) {
    var i = (py * image.width + px) * lib.bytes,
      data = image.data,
      sampleColor = [data[i], data[i + 1], data[i + 2], data[i + 3]]; // start point color (sample)
    return lib.selectAllByColor(image, sampleColor, colorThreshold)
  };


  /**
   * Converts an RGB color value to HSL. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns h, s, and l in the set [0, 1].
   *
   * @param   Number  r       The red color value
   * @param   Number  g       The green color value
   * @param   Number  b       The blue color value
   * @return  Array           The HSL representation
   */
  lib.rgbToHsl = function(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  lib.selectColored = function (image, options) {

    var mask = new SelectionMask(image.width, image.height);

    mask.bounds = {
      minX: image.width,
      minY: image.height,
      maxY: -1,
      maxX: -1
    };

    var x, y;
    for (y = 0; y < image.height; y++) {
      for (x = 0; x < image.width; x++) {
        var index = (y * image.width + x);
        var i = index * lib.bytes;
        //if (!image.data[i + 3]) continue;


        if (options.aMin && image.data[i + 3] < options.aMin)continue;

        var hsl = rgbToHsl(image.data[i], image.data[i + 1], image.data[i + 2]);


        if (options.sMin && hsl[1] < options.sMin)continue;
        if (options.sMax && hsl[1] > options.sMax)continue;
        if (options.bMin && hsl[2] < options.bMin)continue;
        if (options.bMax && hsl[2] > options.bMax)continue;


        mask.data[index] = 1;
        mask.count++;
        mask.bounds.minX = Math.min(mask.bounds.minX, x);
        mask.bounds.maxX = Math.max(mask.bounds.maxX, x);
        mask.bounds.minY = Math.min(mask.bounds.minY, y);
        mask.bounds.maxY = Math.max(mask.bounds.maxY, y);

      }
    }
    return mask;
  };




  lib.selectAllByColor = function (ctx, sampleColor, colorThreshold) {
    var image = _getImageData(ctx);

    var mask = new SelectionMask(image.width, image.height);

    mask.bounds = {
      minX: Infinity,
      minY: Infinity,
      maxY: -1,
      maxX: -1
    };


    var visited = new Uint8Array( image.width * image.height);
    var x, y;
    for (y = 0; y < image.height; y++) {
      for (x = 0; x < image.width; x++) {
        if(lib.acceptable(x, y, image, mask.data, sampleColor, colorThreshold)){
          MagicWand.floodFill(image, x, y, colorThreshold, {
            sampleColor:    sampleColor,
            activeMask :    mask,
            visitedPoints : visited
          });
        }
      }
    }
    return mask;
  };



  lib.drawImage = function (ctx,canvas, mask ,left, top) {

    var ctx2 = canvas.getContext('2d');


    var imgData = ctx.getImageData(0, 0, mask.width, mask.height);
    var imgDataOriginal = ctx2.getImageData(left, top, mask.width, mask.height);


    var b = mask.bounds;
    for (var x = b.minX; x <= b.maxX; x++)for (var y = b.minY; y <= b.maxY; y++) {
      var i = (y * mask.width + x);// * bytes; // point index in the image data
      if (mask.data[i]) {
        imgData.data[i * 4]     = imgDataOriginal.data[i * 4];
        imgData.data[i * 4 + 1] = imgDataOriginal.data[i * 4 + 1];
        imgData.data[i * 4 + 2] = imgDataOriginal.data[i * 4 + 2];
        imgData.data[i * 4 + 3] = imgDataOriginal.data[i * 4 + 3];
      }
    }
    ctx.putImageData(imgData,0, 0);
  };

  function _getImageData(ctx){
    if(ctx.constructor.name == "ImageData"){
      return ctx;
    }else{
      return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }

  lib.fillMask = function (ctx,mask, color) {
    var imgData = _getImageData(ctx);
    var b = mask.bounds;
    var w = imgData.width,
      h = imgData.height;

    for (var x = b.minX; x <= b.maxX; x++)for (var y = b.minY; y <= b.maxY; y++) {
      var i = (y * w + x);// * bytes; // point index in the image data
      if (mask.data[i]) {
        imgData.data[i * 4]     = color[0];
        imgData.data[i * 4 + 1] = color[1];
        imgData.data[i * 4 + 2] = color[2];
        imgData.data[i * 4 + 3] = color[3];
      }
    }
    if(ctx.constructor.name != "ImageData") {
      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(imgData, 0, 0);
    }
  };

  lib.selectBackground = function (ctx, sampleColor, colorThreshold) {
    var image = _getImageData(ctx);

    colorThreshold = colorThreshold || 15;

    var mask = new SelectionMask(image.width, image.height);
    mask.bounds = {
      minX: Infinity,
      minY: Infinity,
      maxY: -1,
      maxX: -1
    };

    var data = image.data;

    sampleColor = sampleColor ||[data[0], data[1], data[2], data[3]]; // start point color (sample)

    var color = sampleColor;

    function add(x, y) {
      if (!lib.acceptable(x, y, image, mask.data, sampleColor, colorThreshold))return;
      if (!sampleColor) {
        var index = (y * image.width + x) * 4;
        color = [data[index], data[index + 1], data[index + 2], data[index + 3]];
      }
      var mask2 = MagicWand.floodFill(image, x, y, colorThreshold, null, color);
      mask = MagicWand.add(mask, mask2);
    }

    var x, y;

    for (x = 0; x < image.width; x++) {
      add(x, 0);
    }
    for (x = 0; x < image.width; x++) {
      add(x, image.height - 1);
    }
    for (y = 0; y < image.height; y++) {
      add(image.width - 1, y);
    }
    for (y = 0; y < image.height; y++) {
      add(0, y);
    }
    return mask;

  };

  lib.extractColors = function(mixedType,threshold) {
    threshold= threshold || 60;
    var imgData = lib.getImageData(mixedType);
    var _colors = [];
    var c1;
    for(var x = 1; x <imgData.width;x+=3){
      for(var y = 1; y <imgData.height;y+=3) {
        var iii = (x + y * imgData.width) * 4;
        var iiA = (x - 1 + y * imgData.width) * 4;
        var iiB = (x + 1 + y * imgData.width) * 4;
        var iiC = (x - 1 + (y + 1) * imgData.width) * 4;
        var iiD = (x + 1 + (y + 1) * imgData.width) * 4;
        if(imgData.data[iii + 3] < 255)continue;

        c1 = [ imgData.data[iii], imgData.data[iii + 1], imgData.data[iii + 2]];
        var cA = [ imgData.data[iiA], imgData.data[iiA + 1], imgData.data[iiA + 2]];
        var cB = [ imgData.data[iiB], imgData.data[iiB + 1], imgData.data[iiB + 2]];
        var cC = [ imgData.data[iiC], imgData.data[iiC + 1], imgData.data[iiC + 2]];
        var cD = [ imgData.data[iiD], imgData.data[iiD + 1], imgData.data[iiD + 2]];

        if(
          c1[0] != cA[0] || cA[0] != cB[0] || cB[0] != cC[0] || cC[0] != cD[0] ||
          c1[1] != cA[1] || cA[1] != cB[1] || cB[1] != cC[1] || cC[1] != cD[1] ||
          c1[2] != cA[2] || cA[2] != cB[2] || cB[2] != cC[2] || cC[2] != cD[2]
        ){
          continue;
        }

        var isNewColor = true;

        for(var i in _colors){
          if(MagicWand.difference(_colors[i], c1) < threshold){
            isNewColor = false;
            break;
          }
        }
        if(isNewColor){
          _colors.push(c1);
        }
      }
    }
    return _colors;
  };

  /**
   * image
   * canvas - черно блое изображение.
   *
   * mask- предыдущая маска. на нее будет накладывать новая
   * mode - способ наложения.
   */
  lib.maskSelection = function ( canvas, left, top, mask ,mode) {
    left = left || 0;
    top = top || 0;
    if(canvas.constructor.name == "HTMLImageElement"){

      var __canvas = createCanvasElement();
      __canvas.width = canvas.width;
      __canvas.height = canvas.height;
      var __ctx = __canvas.getContext('2d');
      __ctx.drawImage(canvas, 0, 0);
      canvas = __canvas;
    }


    var ctx = canvas.getContext('2d'),
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
      mask = mask || MagicWand.createMask(canvas.width, canvas.height);

    var _x1 = Math.max(0, - left),
      _y1 = Math.max(0, - top),
      _x2 = Math.min(mask.width - left,canvas.width);
    _y2 = Math.min(mask.height - top,canvas.height);

    for (var x = _x1; x < _x2; x++) {
      for (var y = _y1; y < _y2; y++) {
        var index = (canvas.width * y + x) * 4;

        if (imgData.data[index] > 20) {
          var index2 = mask.width * (y + top) + x + left;
          mask.data[index2] = 1;
          mask.count++;
        }
      }
    }
    return mask;
  },
  lib.selectRectangle = function (image, x1, y1, x2, y2) {

      var mask = new SelectionMask(image.width, image.height);
      var minX = Math.min(x1, x2);
      var maxX = Math.max(x1, x2);
      var minY = Math.min(y1, y2);
      var maxY = Math.max(y1, y2);

      var w = image.width, h = image.height;

      var data = image.data;
      for (var y = minY; y <= maxY; y++) {
        for (var x = minX; x <= maxX; x++) {
          if (data[(y * w + x) * 4 + 3]) {
            mask.data[y * w + x] = 1;
            mask.count++;
          }
        }
      }

      mask.bounds = {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };

      return mask;
    };

  lib.bytes = 4;






  lib.__floodFill = function (e,postMessage) {

    data = e.data;
    var image = data[0], px = data[1], py = data[2], colorThreshold = data[3], options = data[4];

    options = options || {};
    /*{
     visitedPointsArray,
     sampleColor,
     resultMask
     }*/

    var c, x, newY, el, xr, xl, dy, dyl, dyr, checkY,
      data = image.data, w = image.width, h = image.height, bytes = lib.bytes,
      i = py * w + px; // start point index in the mask data
    i = i * bytes; // start point index in the image data

    var visited     = options.visitedPoints || new Uint8Array( w * h), // mask of visited points
      sampleColor = options.sampleColor   || [data[i], data[i + 1], data[i + 2], data[i + 3]], // start point color (sample)
      result      = options.activeMask;

    function acceptable(x, y) {
// check whether the point has been visited
      if (visited[y * image.width + x] === 1) {
        return false;
      }
      var i = (y * image.width + x) * lib.bytes,
        color2 = [image.data[i], image.data[i + 1], image.data[i + 2], image.data[i + 3]];
      if (sampleColor[0] !== false && Math.abs(sampleColor[0] - color2[0]) > colorThreshold)return false;
      if (sampleColor[1] !== false && Math.abs(sampleColor[1] - color2[1]) > colorThreshold)return false;
      if (sampleColor[2] !== false && Math.abs(sampleColor[2] - color2[2]) > colorThreshold)return false;
      if (sampleColor[3] !== false && Math.abs(sampleColor[3] - color2[3]) > colorThreshold)return false;
      return true;
    };



    if (visited[i] === 1) return null;


    var first = true;
    var stack = [{y: py, left: px - 1, right: px + 1, dir: 1}]; // first scanning line

    var mode = 'strict';
    var _ci;
    do {
      el = stack.shift(); // get line for scanning

      checkY = false;
      for (x = el.left + 1; x < el.right; x++) {
        dy = el.y * w;

        if(mode == 'gradient' && !first) {
          _ci = (dy + x + (el.dir == -1 ? w: - w))*4;
          sampleColor = [data[_ci],data[_ci+1],data[_ci+2],data[_ci+3]];
        }
        if (!acceptable(x, el.y, image, visited, sampleColor, colorThreshold))continue;

        first = false;

        checkY = true; // if the color of the new point(x,y) is similar to the sample color need to check minmax for Y

        result.count++;

        result.data[dy + x] = 1; // mark a new point in mask
        visited[dy + x] = 1; // mark a new point as visited

        xl = x - 1;
        // walk to left side starting with the left neighbor
        while (xl > -1) {
          dyl = dy + xl;

          if(mode == 'gradient') {
            _ci = (dyl + 1)*4;
            sampleColor = [data[_ci], data[_ci + 1], data[_ci + 2], data[_ci + 3]];
          }
          if (!acceptable(xl, el.y, image, visited, sampleColor, colorThreshold)) break;

          result.count++;
          result.data[dyl] = 1;
          visited[dyl] = 1;

          xl--;
        }
        xr = x + 1;
        // walk to right side starting with the right neighbor
        while (xr < w) {
          dyr = dy + xr;

          if(mode == 'gradient') {
            _ci = (dyr - 1)*4;
            sampleColor = [data[_ci], data[_ci + 1], data[_ci + 2], data[_ci + 3]];
          }
          if (!acceptable(xr, el.y, image, visited, sampleColor, colorThreshold)){
            break;
          }

          result.count++;
          result.data[dyr] = 1;
          visited[dyr] = 1;
          xr++;
        }

        // check minmax for X
        if (xl < result.bounds.minX) result.bounds.minX = xl + 1;
        if (xr > result.bounds.maxX) result.bounds.maxX = xr - 1;

        newY = el.y - el.dir;
        if (newY >= 0 && newY < h) {
          if (xl < xr) stack.push({y: newY, left: xl, right: xr, dir: -el.dir}); // from "new left" to "new right"
          // add two scanning lines in the opposite direction (y - dir) if necessary
          // if (xl <= el.left) stack.push({y: newY, left: xl, right: el.left, dir: -el.dir}); // from "new left" to "current left"
          // if (el.right <= xr) stack.push({y: newY, left: el.right, right: xr, dir: -el.dir}); // from "current right" to "new right"
        }
        newY = el.y + el.dir;
        if (newY >= 0 && newY < h) { // add the scanning line in the direction (y + dir) if necessary
          if (xl < xr) stack.push({y: newY, left: xl, right: xr, dir: el.dir}); // from "new left" to "new right"
        }
      }
      // check minmax for Y if necessary
      if (checkY) {
        if (el.y < result.bounds.minY) result.bounds.minY = el.y;
        if (el.y > result.bounds.maxY) result.bounds.maxY = el.y;
      }
    } while (stack.length > 0);

    postMessage && postMessage(result);
    return result;
  };

  lib.extendMask = function (mask, value) {

    var mask2 = new SelectionMask(mask.width + 2, mask.height + 2);
    if(value){
      mask2.data.fill(value);
    }

    for(var y = 0;y < mask.height ; y++){
      for(var x = 0;x < mask.width ; x++){
        mask2.data[ (y + 1) * mask2.width + x + 1 ] = mask.data[y * mask.width + x ];
      }
    }
    mask2.count  = mask.count;

    if(!value) {
      mask2.bounds = {
        minX: mask.bounds.minX + 1,
        maxX: mask.bounds.maxX + 1,
        maxY: mask.bounds.maxY + 1,
        minY: mask.bounds.minY + 1
      };
    }else{
      mask2.bounds = mask.bounds;
    }

    return mask2;
  };

  /** Create a binary mask on the image by color threshold
   * Algorithm: Scanline flood fill (http://en.wikipedia.org/wiki/Flood_fill)
   * @param {Object} image: {Uint8Array} data, {int} width, {int} height, {int} bytes
   * @param {int} x of start pixel
   * @param {int} y of start pixel
   * @param {int} color threshold
   * @param {Uint8Array} mask of visited points (optional)
   * @return {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   */
  lib.floodFill = function (image, px, py, colorThreshold, options,color,callback) {
    options = options || {};
    options.activeMask = options.activeMask  || new SelectionMask(image.width, image.height);

    return lib.__floodFill({data: [image, px, py, colorThreshold, options, color]},callback);

    /*
    var worker = _.worker(lib.__floodFill);
    worker.onmessage = function(e){
      var mask = new SelectionMask(e.data);
      callback && callback(mask);
    };
    worker.postMessage([image, px, py, colorThreshold, options]);
*/

  };

  lib.substract = function (mask, mask2) {
    var minX, maxX, minY, maxY;

    var result = new SelectionMask(mask.width, mask.height);
    var bounds = mask2.bounds;

    var minX = false, minY = mask.height, maxX = false, maxY = -1;

    for (var x = bounds.minX; x <= bounds.maxX; x++) {
      for (var y = bounds.minY; y <= bounds.maxY; y++) {
        var index = mask.width * y + x;

        if (!mask.data[index] && mask2.data[index]) {
          result.data[index] = 1;
          result.count++;
          if (result.bounds.minY > y)result.bounds.minY = y;
          if (result.bounds.maxY < y)result.bounds.maxY = y;
          if (result.bounds.minX > x)result.bounds.minX = x;
          if (result.bounds.maxX < x)result.bounds.maxX = x;
        }
      }
    }

    return result;
  }

  lib.getImageData  = function(mixedType){
    var canvas;
    if (mixedType.constructor.name == "Image" || mixedType.constructor.name == "HTMLImageElement") {
      var _canvas = createCanvasElement();
      _canvas.width = mixedType.width;
      _canvas.height = mixedType.height;
      var ctx = _canvas.getContext("2d");
      ctx.drawImage(mixedType, 0, 0);
      canvas = _canvas;
    }else{
      canvas = mixedType;
    }
    if (canvas.constructor.name == "HTMLCanvasElement" || canvas.constructor.name == "Canvas") {
      var imgData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    }else{
      imgData = mixedType;
    }
    return imgData;
  };

  lib.getColoredPixels = function (mixedType) {
    var imgData = lib.getImageData(mixedType);
    var data = imgData.data;
    var pixels = 0;
    for (var i = 3; i < data.length; i += 4) {
      if (data[i]) {
        pixels+= data[i] / 255;
      }
    }
    return pixels;
  };

  lib.invertMask = function (mask) {
    var result = new SelectionMask(mask.width, mask.height);
    result.bounds = {
      minX: Infinity,
      minY: Infinity,
      maxY: -1,
      maxX: -1
    };


    for (var x = 0; x < mask.width; x++) {
      for (var y = 0; y < mask.height; y++) {
        var index = mask.width * y + x;
        if (!mask.data[index]) {
          result.data[index] = 1;
          result.count++;
          if (result.bounds.minY > y)result.bounds.minY = y;
          if (result.bounds.maxY < y)result.bounds.maxY = y;
          if (result.bounds.minX > x)result.bounds.minX = x;
          if (result.bounds.maxX < x)result.bounds.maxX = x;
        }
      }
    }
    return result;
  };

  lib.exclude = function (mask, mask2) {
    var result = new SelectionMask(mask.width, mask.height);
    var bounds = {
      minX: Math.min(mask.bounds.minX, mask2.bounds.minX),
      maxX: Math.max(mask.bounds.maxX, mask2.bounds.maxX),
      minY: Math.min(mask.bounds.minY, mask2.bounds.minY),
      maxY: Math.max(mask.bounds.maxY, mask2.bounds.maxY)
    };

    var minX = false, minY = mask.height, maxX = false, maxY = -1;

    for (var x = bounds.minX; x <= bounds.maxX; x++) {
      for (var y = bounds.minY; y <= bounds.maxY; y++) {
        var index = mask2.width * y + x;

        if (mask.data[index] ^ mask2.data[index]) {
          result.data[index] = 1;
          result.count++;
          maxX = x;
          if (minY > y)minY = y;
          if (maxY < y)maxY = y;
          if (minX === false) {
            minX = x;
          }
        }
      }
    }

    result.bounds = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY
    }

    return result;
  };

  lib.intersect = function (mask, mask2) {
    var minX, maxX, minY, maxY;

    var result = new SelectionMask(mask.width, mask.height);
    var bounds = {
      minX: Math.max(mask.bounds.minX, mask2.bounds.minX),
      maxX: Math.min(mask.bounds.maxX, mask2.bounds.maxX),
      minY: Math.max(mask.bounds.minY, mask2.bounds.minY),
      maxY: Math.min(mask.bounds.maxY, mask2.bounds.maxY)
    };

    var minX = false, minY = mask.height, maxX = false, maxY = -1;

    for (var x = bounds.minX; x <= bounds.maxX; x++) {
      for (var y = bounds.minY; y <= bounds.maxY; y++) {
        var index = mask2.width * y + x;

        if (mask.data[index] && mask2.data[index]) {
          result.data[index] = 1;
          result.count++;
          maxX = x;
          if (minY > y)minY = y;
          if (maxY < y)maxY = y;
          if (minX === false) {
            minX = x;
          }
        }
      }
    }

    result.bounds = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY
    }

    return result;
  };

  lib.add = function (mask, mask2) {
    var result = new SelectionMask(mask.width, mask.height);

    result.bounds = {
      minX: Math.min(mask.bounds.minX, mask2.bounds.minX),
      maxX: Math.max(mask.bounds.maxX, mask2.bounds.maxX),
      minY: Math.min(mask.bounds.minY, mask2.bounds.minY),
      maxY: Math.max(mask.bounds.maxY, mask2.bounds.maxY)
    };

    for (var x = result.bounds.minX; x <= result.bounds.maxX; x++) {
      for (var y = result.bounds.minY; y <= result.bounds.maxY; y++) {
        var index = mask2.width * y + x;

        if (mask.data[index] || mask2.data[index]) {
          result.data[index] = 1;
          result.count++;
        }
      }
    }

    return result;
  };

  /** Apply the gauss-blur filter to binary mask
   * Algorithms: http://blog.ivank.net/fastest-gaussian-blur.html
   * http://www.librow.com/articles/article-9
   * http://elynxsdk.free.fr/ext-docs/Blur/Fast_box_blur.pdf
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @param {int} blur radius
   * @return {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   */
  lib.gaussBlur = function (mask, radius) {

    var i, k, k1, x, y, val, start, end,
      n = radius * 2 + 1, // size of the pattern for radius-neighbors (from -r to +r with the center point)
      s2 = radius * radius,
      wg = new Float32Array(n), // weights
      total = 0, // sum of weights(used for normalization)
      w = mask.width,
      h = mask.height,
      data = mask.data,
      minX = mask.bounds.minX,
      maxX = mask.bounds.maxX,
      minY = mask.bounds.minY,
      maxY = mask.bounds.maxY,
      count = 0;

    // calc gauss weights
    for (i = 0; i < radius; i++) {
      var dsq = (radius - i) * (radius - i);
      var ww = Math.exp(-dsq / (2.0 * s2)) / (2 * Math.PI * s2);
      wg[radius + i] = wg[radius - i] = ww;
      total += 2 * ww;
    }
    // normalization weights
    for (i = 0; i < n; i++) {
      wg[i] /= total;
    }

    var result = new Uint8Array(w * h), // result mask
      endX = radius + w,
      endY = radius + h;

    //walk through all source points for blur
    for (y = minY; y < maxY + 1; y++)
      for (x = minX; x < maxX + 1; x++) {
        val = 0;
        k = y * w + x; // index of the point
        start = radius - x > 0 ? radius - x : 0;
        end = endX - x < n ? endX - x : n; // Math.min((((w - 1) - x) + radius) + 1, n);
        k1 = k - radius;
        // walk through x-neighbors
        for (i = start; i < end; i++) {
          val += data[k1 + i] * wg[i];
        }
        start = radius - y > 0 ? radius - y : 0;
        end = endY - y < n ? endY - y : n; // Math.min((((h - 1) - y) + radius) + 1, n);
        k1 = k - radius * w;
        // walk through y-neighbors
        for (i = start; i < end; i++) {
          val += data[k1 + i * w] * wg[i];
        }
        if (val > 0.5) {
          result[k] = 1;
          count++;
        } else {
          result[k] = 0;
        }
      }

    return {
      count: count,
      data: result,
      width: w,
      height: h,
      bounds: {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      }
    };
  };

  /** Create a border index array of boundary points of the mask with radius-neighbors
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @param {int} radius: blur radius
   * @param {Uint8Array} visited: mask of visited points (optional)
   * @return {Array} border index array of boundary points with radius-neighbors (only points need for blur)
   */
  function createBorderForBlur(mask, radius, visited) {

    var x, i, j, y, k, k1, k2,
      w = mask.width,
      h = mask.height,
      data = mask.data,
      visitedData = new Uint8Array(data),
      minX = mask.bounds.minX,
      maxX = mask.bounds.maxX,
      minY = mask.bounds.minY,
      maxY = mask.bounds.maxY,
      len = w * h,
      temp = new Uint8Array(len), // auxiliary array to check uniqueness
      border = [], // only border points
      x0 = Math.max(minX, 1),
      x1 = Math.min(maxX, w - 2),
      y0 = Math.max(minY, 1),
      y1 = Math.min(maxY, h - 2);

    if (visited && visited.length > 0) {
      // copy visited points (only "black")
      for (k = 0; k < len; k++) {
        if (visited[k] === 1) visitedData[k] = 1;
      }
    }

    // walk through inner values except points on the boundary of the image
    for (y = y0; y < y1 + 1; y++)
      for (x = x0; x < x1 + 1; x++) {
        k = y * w + x;
        if (data[k] === 0) continue; // "white" point isn't the border
        k1 = k + w; // y + 1
        k2 = k - w; // y - 1
        // check if any neighbor with a "white" color
        if (visitedData[k + 1] === 0 || visitedData[k - 1] === 0 ||
          visitedData[k1] === 0 || visitedData[k1 + 1] === 0 || visitedData[k1 - 1] === 0 ||
          visitedData[k2] === 0 || visitedData[k2 + 1] === 0 || visitedData[k2 - 1] === 0) {
          //if (visitedData[k + 1] + visitedData[k - 1] +
          //    visitedData[k1] + visitedData[k1 + 1] + visitedData[k1 - 1] +
          //    visitedData[k2] + visitedData[k2 + 1] + visitedData[k2 - 1] == 8) continue;
          border.push(k);
        }
      }

    // walk through points on the boundary of the image if necessary
    // if the "black" point is adjacent to the boundary of the image, it is a border point
    if (minX == 0)
      for (y = minY; y < maxY + 1; y++)
        if (data[y * w] === 1)
          border.push(y * w);

    if (maxX == w - 1)
      for (y = minY; y < maxY + 1; y++)
        if (data[y * w + maxX] === 1)
          border.push(y * w + maxX);

    if (minY == 0)
      for (x = minX; x < maxX + 1; x++)
        if (data[x] === 1)
          border.push(x);

    if (maxY == h - 1)
      for (x = minX; x < maxX + 1; x++)
        if (data[maxY * w + x] === 1)
          border.push(maxY * w + x);

    var result = [], // border points with radius-neighbors
      start, end,
      endX = radius + w,
      endY = radius + h,
      n = radius * 2 + 1; // size of the pattern for radius-neighbors (from -r to +r with the center point)

    len = border.length;
    // walk through radius-neighbors of border points and add them to the result array
    for (j = 0; j < len; j++) {
      k = border[j]; // index of the border point
      temp[k] = 1; // mark border point
      result.push(k); // save the border point
      x = k % w; // calc x by index
      y = (k - x) / w; // calc y by index
      start = radius - x > 0 ? radius - x : 0;
      end = endX - x < n ? endX - x : n; // Math.min((((w - 1) - x) + radius) + 1, n);
      k1 = k - radius;
      // walk through x-neighbors
      for (i = start; i < end; i++) {
        k2 = k1 + i;
        if (temp[k2] === 0) { // check the uniqueness
          temp[k2] = 1;
          result.push(k2);
        }
      }
      start = radius - y > 0 ? radius - y : 0;
      end = endY - y < n ? endY - y : n; // Math.min((((h - 1) - y) + radius) + 1, n);
      k1 = k - radius * w;
      // walk through y-neighbors
      for (i = start; i < end; i++) {
        k2 = k1 + i * w;
        if (temp[k2] === 0) { // check the uniqueness
          temp[k2] = 1;
          result.push(k2);
        }
      }
    }

    return result;
  };

  /** Apply the gauss-blur filter ONLY to border points with radius-neighbors
   * Algorithms: http://blog.ivank.net/fastest-gaussian-blur.html
   * http://www.librow.com/articles/article-9
   * http://elynxsdk.free.fr/ext-docs/Blur/Fast_box_blur.pdf
   * @param  {Object}     mask:     {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @param  {int}        radius:   blur radius
   * @param  {Uint8Array} visited:  mask of visited points (optional)
   * @return {Object}     mask:     {Uint8Array} data, {int} width, {int} height, {Object} bounds
   */
  lib.gaussBlurOnlyBorder = function (mask, radius, visited) {

    var border = createBorderForBlur(mask, radius, visited), // get border points with radius-neighbors
      ww, dsq, i, j, k, k1, x, y, val, start, end,
      n = radius * 2 + 1, // size of the pattern for radius-neighbors (from -r to +r with center point)
      s2 = 2 * radius * radius,
      wg = new Float32Array(n), // weights
      total = 0, // sum of weights(used for normalization)
      w = mask.width,
      h = mask.height,
      data = mask.data,
      minX = mask.bounds.minX,
      maxX = mask.bounds.maxX,
      minY = mask.bounds.minY,
      maxY = mask.bounds.maxY,
      len = border.length;

    // calc gauss weights
    for (i = 0; i < radius; i++) {
      dsq = (radius - i) * (radius - i);
      ww = Math.exp(-dsq / s2) / Math.PI;
      wg[radius + i] = wg[radius - i] = ww;
      total += 2 * ww;
    }
    // normalization weights
    for (i = 0; i < n; i++) {
      wg[i] /= total;
    }

    var result = new SelectionMask(w,h,data), // copy the source mask
      endX = radius + w,
      endY = radius + h;

    //walk through all border points for blur
    for (i = 0; i < len; i++) {
      k = border[i]; // index of the border point
      val = 0;
      x = k % w; // calc x by index
      y = (k - x) / w; // calc y by index
      start = radius - x > 0 ? radius - x : 0;
      end = endX - x < n ? endX - x : n; // Math.min((((w - 1) - x) + radius) + 1, n);
      k1 = k - radius;
      // walk through x-neighbors
      for (j = start; j < end; j++) {
        val += data[k1 + j] * wg[j];
      }
      if (val > 0.5) {
        result.data[k] = 1;
        result.count++;
        // check minmax
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        continue;
      }
      start = radius - y > 0 ? radius - y : 0;
      end = endY - y < n ? endY - y : n; // Math.min((((h - 1) - y) + radius) + 1, n);
      k1 = k - radius * w;
      // walk through y-neighbors
      for (j = start; j < end; j++) {
        val += data[k1 + j * w] * wg[j];
      }
      if (val > 0.5) {
        result.data[k] = 1;
        result.count++;
        // check minmax
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        result.data[k] = 0;
      }
    }
    result.bounds = {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };

    return result;
  };

  /** Create a border mask (only boundary points)
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @return {Object} border mask: {Uint8Array} data, {int} width, {int} height, {Object} offset
   */
  lib.createBorderMask = function (mask) {

    var x, y, k, k1, k2,
      w = mask.width,
      h = mask.height,
      data = mask.data,
      minX = mask.bounds.minX,
      maxX = mask.bounds.maxX,
      minY = mask.bounds.minY,
      maxY = mask.bounds.maxY,
      rw = maxX - minX + 1, // bounds size
      rh = maxY - minY + 1,
      result = new Uint8Array(rw * rh), // reduced mask (bounds size)
      x0 = Math.max(minX, 1),
      x1 = Math.min(maxX, w - 2),
      y0 = Math.max(minY, 1),
      y1 = Math.min(maxY, h - 2),
      count = 0;

    // walk through inner values except points on the boundary of the image
    for (y = y0; y < y1 + 1; y++)
      for (x = x0; x < x1 + 1; x++) {
        k = y * w + x;
        if (data[k] === 0) continue; // "white" point isn't the border
        k1 = k + w; // y + 1
        k2 = k - w; // y - 1
        // check if any neighbor with a "white" color
        if (data[k + 1] === 0 || data[k - 1] === 0 ||
          data[k1] === 0 || data[k1 + 1] === 0 || data[k1 - 1] === 0 ||
          data[k2] === 0 || data[k2 + 1] === 0 || data[k2 - 1] === 0) {
          //if (data[k + 1] + data[k - 1] +
          //    data[k1] + data[k1 + 1] + data[k1 - 1] +
          //    data[k2] + data[k2 + 1] + data[k2 - 1] == 8) continue;
          result[(y - minY) * rw + (x - minX)] = 1;
          count++;
        }
      }

    // walk through points on the boundary of the image if necessary
    // if the "black" point is adjacent to the boundary of the image, it is a border point
    if (minX == 0)
      for (y = minY; y < maxY + 1; y++)
        if (data[y * w] === 1) {
          result[(y - minY) * rw] = 1;
          count++;
        }

    if (maxX == w - 1)
      for (y = minY; y < maxY + 1; y++)
        if (data[y * w + maxX] === 1) {
          result[(y - minY) * rw + (maxX - minX)] = 1;
          count++;
        }

    if (minY == 0)
      for (x = minX; x < maxX + 1; x++)
        if (data[x] === 1) {
          result[x - minX] = 1;
          count++;
        }

    if (maxY == h - 1)
      for (x = minX; x < maxX + 1; x++)
        if (data[maxY * w + x] === 1) {
          result[(maxY - minY) * rw + (x - minX)] = 1;
          count++;
        }

    return {
      count: count,
      data: result,
      width: rw,
      height: rh,
      offset: {x: minX, y: minY}
    };
  };

  /** Create a border index array of boundary points of the mask
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height
   * @return {Array} border index array boundary points of the mask
   */
  lib.getBorderIndices = function (mask) {

    var x, y, k, k1, k2,
      w = mask.width,
      h = mask.height,
      data = mask.data,
      border = [], // only border points
      x1 = w - 1,
      y1 = h - 1;

    // walk through inner values except points on the boundary of the image
    for (y = 1; y < y1; y++)
      for (x = 1; x < x1; x++) {
        k = y * w + x;
        if (data[k] === 0) continue; // "white" point isn't the border
        k1 = k + w; // y + 1
        k2 = k - w; // y - 1
        // check if any neighbor with a "white" color
        if (data[k + 1] === 0 || data[k - 1] === 0 ||
          data[k1] === 0 || data[k1 + 1] === 0 || data[k1 - 1] === 0 ||
          data[k2] === 0 || data[k2 + 1] === 0 || data[k2 - 1] === 0) {
          //if (data[k + 1] + data[k - 1] +
          //    data[k1] + data[k1 + 1] + data[k1 - 1] +
          //    data[k2] + data[k2 + 1] + data[k2 - 1] == 8) continue;
          border.push(k);
        }
      }

    // walk through points on the boundary of the image if necessary
    // if the "black" point is adjacent to the boundary of the image, it is a border point
    for (y = 0; y < h; y++)
      if (data[y * w] === 1)
        border.push(y * w);

    for (x = 0; x < w; x++)
      if (data[x] === 1)
        border.push(x);

    k = w - 1;
    for (y = 0; y < h; y++)
      if (data[y * w + k] === 1)
        border.push(y * w + k);

    k = (h - 1) * w;
    for (x = 0; x < w; x++)
      if (data[k + x] === 1)
        border.push(k + x);

    return border;
  };

  /** Create a compressed mask with a "white" border (1px border with zero values) for the contour tracing
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @return {Object} border mask: {Uint8Array} data, {int} width, {int} height, {Object} offset
   */
  function prepareMask(mask) {
    var x, y,
      w = mask.width,
      data = mask.data,
      minX = mask.bounds.minX,
      maxX = mask.bounds.maxX,
      minY = mask.bounds.minY,
      maxY = mask.bounds.maxY,
      rw = maxX - minX + 3, // bounds size +1 px on each side (a "white" border)
      rh = maxY - minY + 3,
      result = new Uint8Array(rw * rh); // reduced mask (bounds size)

    // walk through inner values and copy only "black" points to the result mask
    for (y = minY; y < maxY + 1; y++)
      for (x = minX; x < maxX + 1; x++) {
        if (data[y * w + x] === 1)
          result[(y - minY + 1) * rw + (x - minX + 1)] = 1;
      }

    return {
      data: result,
      width: rw,
      height: rh,
      offset: {x: minX - 1, y: minY - 1}
    };
  };

  /** Create a contour array for the binary mask
   * Algorithm: http://www.sciencedirect.com/science/article/pii/S1077314203001401
   * @param {Object} mask: {Uint8Array} data, {int} width, {int} height, {Object} bounds
   * @return {Array} contours: {Array} points, {bool} inner, {int} label
   */
  lib.traceContours = function (mask) {
    var m = prepareMask(mask),
      contours = [],
      label = 0,
      w = m.width,
      w2 = w * 2,
      h = m.height,
      src = m.data,
      dx = m.offset.x,
      dy = m.offset.y,
      bounds,_p,
      dest = new Uint8Array(src), // label matrix
      i, j, x, y, k, k1, c, inner, dir, first, second, current, previous, next, d;

    // all [dx,dy] pairs (array index is the direction)
    // 5 6 7
    // 4 X 0
    // 3 2 1
    var directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

    for (y = 1; y < h - 1; y++)
      for (x = 1; x < w - 1; x++) {
        k = y * w + x;
        if (src[k] === 1) {
          for (i = -w; i < w2; i += w2) { // k - w: outer tracing (y - 1), k + w: inner tracing (y + 1)
            if (src[k + i] === 0 && dest[k + i] === 0) { // need contour tracing
              inner = i === w; // is inner contour tracing ?
              label++; // label for the next contour

              c = [];
              bounds = {
                minX : w,
                minY : h,
                maxX : -1,
                maxY : -1,
              };
              dir = inner ? 2 : 6; // start direction
              current = previous = first = {x: x, y: y};
              second = null;
              while (true) {
                dest[current.y * w + current.x] = label; // mark label for the current point
                // bypass all the neighbors around the current point in a clockwise
                for (j = 0; j < 8; j++) {
                  dir = (dir + 1) % 8;

                  // get the next point by new direction
                  d = directions[dir]; // index as direction
                  next = {x: current.x + d[0], y: current.y + d[1]};

                  k1 = next.y * w + next.x;
                  if (src[k1] === 1) // black boundary pixel
                  {
                    dest[k1] = label; // mark a label
                    break;
                  }
                  dest[k1] = -1; // mark a white boundary pixel
                  next = null;
                }
                if (next === null) break; // no neighbours (one-point contour)
                current = next;
                if (second) {
                  if (previous.x === first.x && previous.y === first.y && current.x === second.x && current.y === second.y) {
                    break; // creating the contour completed when returned to original position
                  }
                } else {
                  second = next;
                }
                _p = {x: previous.x + dx, y: previous.y + dy};
                if(bounds.minX > _p.x)bounds.minX = _p.x;
                if(bounds.maxX < _p.x)bounds.maxX = _p.x;
                if(bounds.minY > _p.y)bounds.minY = _p.y;
                if(bounds.maxY < _p.y)bounds.maxY = _p.y;
                c.push(_p);
                previous = current;
                dir = (dir + 4) % 8; // next dir (symmetrically to the current direction)
              }

              if (next != null) {
                _p = {x: first.x + dx, y: first.y + dy};
                if(bounds.minX >  _p.x)bounds.minX =  _p.x;
                if(bounds.maxX <  _p.x)bounds.maxX =  _p.x;
                if(bounds.minY >  _p.y)bounds.minY =  _p.y;
                if(bounds.maxY <  _p.y)bounds.maxY =  _p.y;
                c.push(_p); // close the contour
                contours.push({inner: inner, label: label, points: c,bounds : bounds}); // add contour to the list
              }
            }
          }
        }
      }

    return contours;
  };

  function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 255, s* 255, l* 255];
  }

  lib.simplifyContour = function (c, simplifyTolerant, simplifyCount) {
    var
      i, j, k, c, points, len, resPoints, lst, stack, ids,
      maxd, maxi, dist, r1, r2, r12, dx, dy, pi, pf, pl;

    points = c.points;
    len = c.points.length;

    if (len < simplifyCount) { // contour isn't simplified
      resPoints = [];
      for (k = 0; k < len; k++) {
        resPoints.push({x: points[k].x, y: points[k].y});
      }
      return {
        bounds: c.bounds, inner: c.inner, label: c.label, points: resPoints, initialCount: len};
    }

    lst = [0, len - 1]; // always add first and last points
    stack = [{first: 0, last: len - 1}]; // first processed edge

    do {
      ids = stack.shift();
      if (ids.last <= ids.first + 1) // no intermediate points
      {
        continue;
      }

      maxd = -1.0; // max distance from point to current edge
      maxi = ids.first; // index of maximally distant point

      for (i = ids.first + 1; i < ids.last; i++) // bypass intermediate points in edge
      {
        // calc the distance from current point to edge
        pi = points[i];
        pf = points[ids.first];
        pl = points[ids.last];
        dx = pi.x - pf.x;
        dy = pi.y - pf.y;
        r1 = Math.sqrt(dx * dx + dy * dy);
        dx = pi.x - pl.x;
        dy = pi.y - pl.y;
        r2 = Math.sqrt(dx * dx + dy * dy);
        dx = pf.x - pl.x;
        dy = pf.y - pl.y;
        r12 = Math.sqrt(dx * dx + dy * dy);
        if (r1 >= Math.sqrt(r2 * r2 + r12 * r12)) dist = r2;
        else if (r2 >= Math.sqrt(r1 * r1 + r12 * r12)) dist = r1;
        else dist = Math.abs((dy * pi.x - dx * pi.y + pf.x * pl.y - pl.x * pf.y) / r12);

        if (dist > maxd) {
          maxi = i; // save the index of maximally distant point
          maxd = dist;
        }
      }

      if (maxd > simplifyTolerant) // if the max "deviation" is larger than allowed then...
      {
        lst.push(maxi); // add index to the simplified list
        stack.push({first: ids.first, last: maxi}); // add the left part for processing
        stack.push({first: maxi, last: ids.last}); // add the right part for processing
      }

    } while (stack.length > 0);

    resPoints = [];
    len = lst.length;
    lst.sort(function (a, b) {
      return a - b;
    }); // restore index order
    for (k = 0; k < len; k++) {
      resPoints.push({x: points[lst[k]].x, y: points[lst[k]].y}); // add result points to the correct order
    }
    return {
      bounds: c.bounds,
      inner: c.inner, label: c.label, points: resPoints, initialCount: c.points.length
    };
  };

  /** Simplify contours
   * Algorithms: http://psimpl.sourceforge.net/douglas-peucker.html
   * http://neerc.ifmo.ru/wiki/index.php?title=%D0%A3%D0%BF%D1%80%D0%BE%D1%89%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9_%D1%86%D0%B5%D0%BF%D0%B8
   * @param {Array} contours: {Array} points, {bool} inner, {int} label
   * @param {float} simplify tolerant
   * @param {int} simplify count: min number of points when the contour is simplified
   * @return {Array} contours: {Array} points, {bool} inner, {int} label, {int} initialCount
   */
  lib.simplifyContours = function (contours, simplifyTolerant, simplifyCount) {
    var lenContours = contours.length,
      result = [];

    // walk through all contours
    for (var j = 0; j < lenContours; j++) {

      result.push(lib.simplifyContour(contours[j], simplifyTolerant, simplifyCount));
    }

    return result;
  };

  return lib;
})();
if (true) {
  module.exports = MagicWand;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczpuczE9Imh0dHA6Ly9zb3ppLmJhaWVyb3VnZS5mciIKICAgIGlkPSJzdmc0ODg4IgogICAgc29kaXBvZGk6ZG9jbmFtZT0id2FybmluZ19idXR0b24uc3ZnIgogICAgdmlld0JveD0iMCAwIDQwMCA0MDAiCiAgICB2ZXJzaW9uPSIxLjEiCiAgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjAgcjk2NTQiCiAgPgogIDxkZWZzCiAgICAgIGlkPSJkZWZzNDg5MCIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTEiCiAgICAgICAgeTI9IjM2Ny44OCIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMjg3LjQ5IgogICAgICAgIHgyPSIzMTUuNDciCiAgICAgICAgeDE9IjI0MS40MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNDE1OCIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNjAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTowIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPGZpbHRlcgogICAgICAgIGlkPSJmaWx0ZXI2MTI2IgogICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPGZlR2F1c3NpYW5CbHVyCiAgICAgICAgICBpZD0iZmVHYXVzc2lhbkJsdXI2MTI4IgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIwLjUzMDM1NzEzIgogICAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAvPgogICAgPC9maWx0ZXIKICAgID4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg0MTMiCiAgICAgICAgeTI9IjM5MS40NSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICB5MT0iMzAwLjg2IgogICAgICAgIHgyPSIzNDIiCiAgICAgICAgeDE9IjI3NS42MSIKICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgID4KICAgICAgPHN0b3AKICAgICAgICAgIGlkPSJzdG9wNzIwMSIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM1NTAwMDAiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcyMDMiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwIgogICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAvPgogICAgPC9saW5lYXJHcmFkaWVudAogICAgPgogICAgPHJhZGlhbEdyYWRpZW50CiAgICAgICAgaWQ9InJhZGlhbEdyYWRpZW50ODQxNSIKICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgICBjeD0iMzEyLjc4IgogICAgICAgIGN5PSIzODYuNTciCiAgICAgICAgcj0iNTMuMDM2IgogICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS41OTMyNyAtLjU5MzI3IC43MTUwNSAtLjcxNTA1IDI0My4yNyA4NDkuMDMpIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A3MTEzLTciCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmO3N0b3Atb3BhY2l0eTouNDA4MTYiCiAgICAgICAgICBvZmZzZXQ9IjAiCiAgICAgIC8+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDcxMTUtNyIKICAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjAiCiAgICAgICAgICBvZmZzZXQ9IjEiCiAgICAgIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50CiAgICA+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgICBpZD0ibGluZWFyR3JhZGllbnQxMDQ0OSIKICAgICAgICB5Mj0iMzM4LjgyIgogICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgIHkxPSIyODYuNjciCiAgICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguOTU1MzQgMCAwIC45NTUzNCAxMzYuMTIgMTQuMDU1KSIKICAgICAgICB4Mj0iMzAwLjI3IgogICAgICAgIHgxPSIyNTUuMzIiCiAgICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICA+CiAgICAgIDxzdG9wCiAgICAgICAgICBpZD0ic3RvcDQxNTAiCiAgICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZmZmZmZmIgogICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAvPgogICAgICA8c3RvcAogICAgICAgICAgaWQ9InN0b3A0MTUyIgogICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ZmZmZmZjtzdG9wLW9wYWNpdHk6MCIKICAgICAgICAgIG9mZnNldD0iMSIKICAgICAgLz4KICAgIDwvbGluZWFyR3JhZGllbnQKICAgID4KICAgIDxmaWx0ZXIKICAgICAgICBpZD0iZmlsdGVyMTE0MjgiCiAgICAgICAgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIgogICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgPgogICAgICA8ZmVHYXVzc2lhbkJsdXIKICAgICAgICAgIGlkPSJmZUdhdXNzaWFuQmx1cjExNDMwIgogICAgICAgICAgc3RkRGV2aWF0aW9uPSIxLjI0MzQ2NzgiCiAgICAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgIC8+CiAgICA8L2ZpbHRlcgogICAgPgogIDwvZGVmcwogID4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgIGlkPSJiYXNlIgogICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk4OCIKICAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICAgaW5rc2NhcGU6em9vbT0iMC43MDcxMDY3OCIKICAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgICBpbmtzY2FwZTpjeD0iMzA0Ljg5NDA5IgogICAgICBpbmtzY2FwZTpjeT0iMzQxLjUyMTg2IgogICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2ODAiCiAgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAvPgogIDxnCiAgICAgIGlkPSJsYXllcjEiCiAgICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC02NTIuMzYpIgogICAgPgogICAgPGcKICAgICAgICBpZD0iZzExNDMyIgogICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSI5MCIKICAgICAgICBpbmtzY2FwZTpleHBvcnQteGRwaT0iOTAiCiAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMi45MDUxIDAgMCAyLjkwNTEgLTEwMDEuOSAtNzguOTYxKSIKICAgICAgPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjc2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDojOTk5OTk5IgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTczNTQgMCAwIC45NzM1NCAxMjAuMDkgLTEyLjYyOCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI3OCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTEpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguOTU5NjAgMCAwIC45NTk2MCAxMjQuMzMgLTcuODAxNCkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6I2VjZWNlYyIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjg3MzU1IDAgMCAuODczNTUgMTUwLjQ3IDIxLjk4MSkiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4MiIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbHRlcjp1cmwoI2ZpbHRlcjYxMjYpO2ZpbGw6Izk5OTk5OSIKICAgICAgICAgIHNvZGlwb2RpOnR5cGU9ImFyYyIKICAgICAgICAgIGQ9Im0zNTYuNzkgMzQ2LjExYzAgMjkuMjkxLTIzLjc0NSA1My4wMzYtNTMuMDM2IDUzLjAzNnMtNTMuMDM2LTIzLjc0NS01My4wMzYtNTMuMDM2IDIzLjc0NS01My4wMzYgNTMuMDM2LTUzLjAzNiA1My4wMzYgMjMuNzQ1IDUzLjAzNiA1My4wMzZ6IgogICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLjgzODM4IDAgMCAuODM4MzggMTYxLjE1IDM0LjE1MikiCiAgICAgICAgICBzb2RpcG9kaTpjeT0iMzQ2LjExMjE4IgogICAgICAgICAgc29kaXBvZGk6Y3g9IjMwMy43NSIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICAgIGlkPSJwYXRoNzI4NCIKICAgICAgICAgIHNvZGlwb2RpOnJ4PSI1My4wMzU3MTMiCiAgICAgICAgICBzb2RpcG9kaTpyeT0iNTMuMDM1NzEzIgogICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg0MTMpIgogICAgICAgICAgc29kaXBvZGk6dHlwZT0iYXJjIgogICAgICAgICAgZD0ibTM1Ni43OSAzNDYuMTFjMCAyOS4yOTEtMjMuNzQ1IDUzLjAzNi01My4wMzYgNTMuMDM2cy01My4wMzYtMjMuNzQ1LTUzLjAzNi01My4wMzYgMjMuNzQ1LTUzLjAzNiA1My4wMzYtNTMuMDM2IDUzLjAzNiAyMy43NDUgNTMuMDM2IDUzLjAzNnoiCiAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCguODA1ODcgMCAwIC44MDU4NyAxNzEuMDMgNDUuNDA1KSIKICAgICAgICAgIHNvZGlwb2RpOmN5PSIzNDYuMTEyMTgiCiAgICAgICAgICBzb2RpcG9kaTpjeD0iMzAzLjc1IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgICAgaWQ9InBhdGg3Mjg2IgogICAgICAgICAgc29kaXBvZGk6cng9IjUzLjAzNTcxMyIKICAgICAgICAgIHNvZGlwb2RpOnJ5PSI1My4wMzU3MTMiCiAgICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI3JhZGlhbEdyYWRpZW50ODQxNSkiCiAgICAgICAgICBzb2RpcG9kaTp0eXBlPSJhcmMiCiAgICAgICAgICBkPSJtMzU2Ljc5IDM0Ni4xMWMwIDI5LjI5MS0yMy43NDUgNTMuMDM2LTUzLjAzNiA1My4wMzZzLTUzLjAzNi0yMy43NDUtNTMuMDM2LTUzLjAzNiAyMy43NDUtNTMuMDM2IDUzLjAzNi01My4wMzYgNTMuMDM2IDIzLjc0NSA1My4wMzYgNTMuMDM2eiIKICAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC43NTgyNSAwIDAgLjc1ODI1IDE4Ni43NSA2My45MDYpIgogICAgICAgICAgc29kaXBvZGk6Y3k9IjM0Ni4xMTIxOCIKICAgICAgICAgIHNvZGlwb2RpOmN4PSIzMDMuNzUiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDcyODgiCiAgICAgICAgICBzdHlsZT0ib3BhY2l0eTouMzE3NzE7ZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50MTA0NDkpIgogICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgIGQ9Im00MTQuOCAyODQuMTVjLTEzLjMzMSAwLjMwMDY5LTI2LjE4NiA3LjM1OC0zMy4zMzYgMTkuNzQyLTcuNjkwMyAxMy4zMi02LjcxMzkgMjkuMjY2IDEuMTU0NSA0MS4zMzEgMC44NTMwNi0yNi41MzIgMjEuMTMyLTQ2LjUxNSA0Ni4zMjQtNDUuMDU0IDguMjU4OSAwLjQ3OTA3IDE2LjA1NCAzLjIwMDEgMjIuODU5IDcuNTkwOC0zLjI1NzgtNy40NDk4LTguODE3MS0xMy45NTMtMTYuMzk0LTE4LjMyNy02LjQ4NjctMy43NDUxLTEzLjYyNS01LjQzOTMtMjAuNjA4LTUuMjgxOHoiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icmVjdDczNzAiCiAgICAgICAgICBkPSJtNDAyLjg4IDMwMC4wOS0xMS41ODEgMTEuNTgxIDEzLjI5NSAxMy4yOTUtMTMuMjk1IDEzLjI4MSAxMS41ODEgMTEuNTgxIDEzLjI4MS0xMy4yOTUgMTMuMjk1IDEzLjI5NSAxMS41ODEtMTEuNTgxLTEzLjI4MS0xMy4yODEgMTMuMjgxLTEzLjI5NS0xMS41ODEtMTEuNTgxLTEzLjI5NSAxMy4yODEtMTMuMjgxLTEzLjI4MXoiCiAgICAgICAgICBzdHlsZT0iZmlsdGVyOnVybCgjZmlsdGVyMTE0MjgpO2ZpbGw6IzFhMWExYSIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgIC8+CiAgICAgIDxwYXRoCiAgICAgICAgICBpZD0icGF0aDEwNDU3IgogICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgICBkPSJtNDAzLjQ1IDMwMS4xNS0xMS4wODcgMTEuMDg3IDEyLjcyOCAxMi43MjgtMTIuNzI4IDEyLjcxNCAxMS4wODcgMTEuMDg3IDEyLjcxNC0xMi43MjggMTIuNzI4IDEyLjcyOCAxMS4wODctMTEuMDg3LTEyLjcxNC0xMi43MTQgMTIuNzE0LTEyLjcyOC0xMS4wODctMTEuMDg3LTEyLjcyOCAxMi43MTQtMTIuNzE0LTEyLjcxNHoiCiAgICAgIC8+CiAgICA8L2cKICAgID4KICA8L2cKICA+CiAgPG1ldGFkYXRhCiAgICA+CiAgICA8cmRmOlJERgogICAgICA+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgPgogICAgICAgIDxkYzpmb3JtYXQKICAgICAgICAgID5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQKICAgICAgICA+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIKICAgICAgICAvPgogICAgICAgIDxjYzpsaWNlbnNlCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICAvPgogICAgICAgIDxkYzpwdWJsaXNoZXIKICAgICAgICAgID4KICAgICAgICAgIDxjYzpBZ2VudAogICAgICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL29wZW5jbGlwYXJ0Lm9yZy8iCiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPk9wZW5jbGlwYXJ0PC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpwdWJsaXNoZXIKICAgICAgICA+CiAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICA+ZXJyb3IgYnV0dG9uPC9kYzp0aXRsZQogICAgICAgID4KICAgICAgICA8ZGM6ZGF0ZQogICAgICAgICAgPjIwMTEtMDItMjRUMTc6NDU6NDU8L2RjOmRhdGUKICAgICAgICA+CiAgICAgICAgPGRjOmRlc2NyaXB0aW9uCiAgICAgICAgLz4KICAgICAgICA8ZGM6c291cmNlCiAgICAgICAgICA+aHR0cHM6Ly9vcGVuY2xpcGFydC5vcmcvZGV0YWlsLzEyMjQyNS9lcnJvci1idXR0b24tYnktcmljYXJkb21haWE8L2RjOnNvdXJjZQogICAgICAgID4KICAgICAgICA8ZGM6Y3JlYXRvcgogICAgICAgICAgPgogICAgICAgICAgPGNjOkFnZW50CiAgICAgICAgICAgID4KICAgICAgICAgICAgPGRjOnRpdGxlCiAgICAgICAgICAgICAgPnJpY2FyZG9tYWlhPC9kYzp0aXRsZQogICAgICAgICAgICA+CiAgICAgICAgICA8L2NjOkFnZW50CiAgICAgICAgICA+CiAgICAgICAgPC9kYzpjcmVhdG9yCiAgICAgICAgPgogICAgICAgIDxkYzpzdWJqZWN0CiAgICAgICAgICA+CiAgICAgICAgICA8cmRmOkJhZwogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+YnV0dG9uPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPmNhbmNlbDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5jaXJjbGU8L3JkZjpsaQogICAgICAgICAgICA+CiAgICAgICAgICAgIDxyZGY6bGkKICAgICAgICAgICAgICA+ZGVsZXRlPC9yZGY6bGkKICAgICAgICAgICAgPgogICAgICAgICAgICA8cmRmOmxpCiAgICAgICAgICAgICAgPnJlZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgICAgPHJkZjpsaQogICAgICAgICAgICAgID5yb3VuZDwvcmRmOmxpCiAgICAgICAgICAgID4KICAgICAgICAgIDwvcmRmOkJhZwogICAgICAgICAgPgogICAgICAgIDwvZGM6c3ViamVjdAogICAgICAgID4KICAgICAgPC9jYzpXb3JrCiAgICAgID4KICAgICAgPGNjOkxpY2Vuc2UKICAgICAgICAgIHJkZjphYm91dD0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvcHVibGljZG9tYWluLyIKICAgICAgICA+CiAgICAgICAgPGNjOnBlcm1pdHMKICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNSZXByb2R1Y3Rpb24iCiAgICAgICAgLz4KICAgICAgICA8Y2M6cGVybWl0cwogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiIKICAgICAgICAvPgogICAgICAgIDxjYzpwZXJtaXRzCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjRGVyaXZhdGl2ZVdvcmtzIgogICAgICAgIC8+CiAgICAgIDwvY2M6TGljZW5zZQogICAgICA+CiAgICA8L3JkZjpSREYKICAgID4KICA8L21ldGFkYXRhCiAgPgo8L3N2Zwo+Cg=="

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(39);
__webpack_require__(32);
__webpack_require__(6);
__webpack_require__(40);
__webpack_require__(34);
__webpack_require__(33);
__webpack_require__(38);
__webpack_require__(41);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(47);
__webpack_require__(53);
__webpack_require__(49);
__webpack_require__(51);
__webpack_require__(48);
__webpack_require__(50);
__webpack_require__(64);
__webpack_require__(56);
__webpack_require__(58);
__webpack_require__(62);
__webpack_require__(52);
__webpack_require__(65);
__webpack_require__(54);
__webpack_require__(46);
__webpack_require__(63);
__webpack_require__(60);
__webpack_require__(55);
__webpack_require__(61);
__webpack_require__(25);
__webpack_require__(28);
__webpack_require__(31);
__webpack_require__(30);
__webpack_require__(27);
__webpack_require__(26);
__webpack_require__(29);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(70);
__webpack_require__(71);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var path = __webpack_require__(5);
var util = __webpack_require__(3);
var object = __webpack_require__(2);

function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}


if (isServer()) {
  var fs = __webpack_require__(77);
}


function _load_json (value, callback_success, callback_error){

  var output = null;
  var errors = [];

  if (value.constructor == String) {

    var filename, regex_data, init_property;
    regex_data = /^([^#]*)#?(.*)$/.exec(value);

    filename = regex_data[1];
    init_property = regex_data[2];
    utils.getInlineJson(filename, "json", _loadJson_data, function (error) {
      errors.push(error);
      if (callback_error) {
        callback_error(error)
      } else {
        console.error("file: \"" + filename + "\". " + error.message)
      }
    });
  } else {
    _loadJson_data(value);
  }

  function _loadJson_data(data) {
    /*
     замена записей "url(./path/to/file)  на "../../path/to/file"
     url начинающиеся с ./ относительно родителького json файла

     url с "/" добавляется APP_STATIC_PATH
     */
    utils.recoursive(data,
      function (property, value, parent) {
        if (/^url\(.*\)$/.test(value)) {
          var regex_data = /^url\((\.?\/)?(.*)\)$/.exec(value);
          var url = regex_data[2];

          if (regex_data[1] == "/") {
            url = window.APP_STATIC_PATH + url;
          }
          if (regex_data[1] == "./") {
            url = path.getParentDirectoryUrl(filename) + url;
          }

          parent[property] = path.resolve(url);
        }
      }
    );


    var loader = util.queueLoad(1, function finalize() {

      if (init_property) {
        var prop_arr = init_property.split("/");
        for (var i = 0; i < prop_arr.length; i++) {
          data = data[prop_arr[i]];
        }
      }

      if (errors.length) {
        if (callback_error) callback_error(errors);
      } else {
        if (callback_success) callback_success(data);
        output = data;
      }
    });

    /**
     * remove comments
     */
    utils.recoursive(data, function (property, value, parent) {
      /*
       remove comments like
       ["@comment()"]
       "@comment": {}
       */
      if (/^\/\/.*$/.test(value) || /^@comment\(.*\)$/.test(value) || property == "@comment") {
        if (parent.constructor == Array) {
          parent.splice(property, 1);
        } else {
          delete parent[property];
        }
      } else if (/^@extend.*$/.test(property)) {

        loader.total++;
        _load_json(value, function (data) {
          var ext_data = object.deepExtend(data, parent);
          object.deepExtend(parent, ext_data);
          delete parent["@extend"];
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@extend\(.*\)$/.test(value)) {
        var _reg_data = /^@extend\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@mixin\(.*\)$/.test(value)) {
        var _reg_data = /^@mixin\((\.\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1]) {
          url = path.getParentDirectoryUrl(filename) + url;
        }
        loader.total++;
        _load_json(url, function (data) {
          if (parent.constructor == Array) {
            parent.splice(property, 1);
            for (var i in data) {
              parent.push(data[i])
            }
          } else {
            delete parent[property];
            for (var i in data) {
              parent[i] = data[i];
            }
          }
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      } else if (/^@load\((.*)\)$/.test(value)) {
        var _reg_data = /^@load\((\.?\/)?(.*)\)$/.exec(value);
        var url = _reg_data[2];
        if (_reg_data[1] == "/") {
          url = window.APP_STATIC_PATH + url;
        }
        if (_reg_data[1] == "./") {
          url = path.getParentDirectoryUrl(filename) + url;
        }

        loader.total++;
        utils.getInlineJson(url, "html", function (data) {
          parent[property] = data;
          loader();
        }, function (data, error) {
          errors.push(error);
          loader();
        });
      }

    });
    loader();

  }

  return output;
}

var utils = {
  CACHED_JSON : {},
  loadJsonSync: function(src){
    var data;
    _load_json(src,function(_data){
      data = _data;
    });
    return data;
  },

  /**
   позволяет использовать конструкции вида
   расширить данные из файла template.json
   "@extend" : "url(data/template.json)",
   "@extend" : "url(data/template.json#settings/stages)",

   //заменить строку наданные из файла
   "stages":       "url(data/template.json#settings/stages)",

   * @param filename
   * @param callback_success
   * @param callback_error
   */
  loadJson: function (value,resolve_cb,fail_cb) {
      return _load_json(value,function(data){
        resolve_cb && resolve_cb(data);
      },function(err){
        fail_cb && fail_cb(err);
      });
  },

  removeComments: function (str) {
    str = str.replace(/^\s*(\/\/.*|(?:\/\*[\s\S]*?)\*\/\s*)$/gm,"");
    return str;
  },
  /**
   *
   * @param object
   * @param criteria - выполнять функцию со всеми объектами
   */
  recoursive: function (object, criteria) {
    var readed = [];
    if (!object) return;
    return (function sub_recoursive(object) {
      if (readed.indexOf(object) != -1) {
        return;
      }
      readed.push(object);


      if (object instanceof Array) {
        for (var prop = object.length; prop--;) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      } else {
        for (var prop in object) {
          if (object[prop] && (object[prop].constructor == Object || object[prop].constructor == Array)) {
            sub_recoursive(object[prop]);
          } else {
            var break_ = criteria(prop, object[prop], object);
          }
        }
      }
    })(object);
  },

  parseCSV: function (data) {
    var rows = data.split(/\n/);
    var columns = rows[0].split(',');
    rows.splice(0, 1);

    for (var i = 0; i < rows.length; i++) {
      var output_row_data = {};
      var row_data = [];


      var _quote = false, last = -1;
      var j = -1;
      var str = rows[i];
      while (++j < str.length) {
        if (!_quote) {
          if (str[j] == '\'' || str[j] == '\"') {
            _quote = str[j];
          }
          if (str[j] == ",") {
            var _val = str.substring(last, j);
            if (_val[0] == '\"' && _val[_val.length - 1] == '\"') {
              _val = _val.substring(1, _val.length - 1);
            }
            row_data.push(_val);
            last = j + 1;
          }
        } else {
          if (str[j] == _quote) {
            _quote = false;
          }
        }
      }

      for (var j in row_data) {
        output_row_data[columns[j]] = row_data[j];
      }
      rows[i] = output_row_data;
    }
    return rows;
  },
  parseData: function (data, dataType) {
    var _parsed;
    if (dataType == "csv") {
      _parsed = utils.parseCSV(data);
    } else if (dataType == "json") {
      _parsed = data.trim();
      //if (data[0] != "{" && data[0] != "[") {
      //  return false;
      //}

      _parsed = utils.removeComments(_parsed);
      //data  = data.replace(/\n/g,"")

      try{
        var _parsed = JSON.parse(_parsed);//= JSON.parse(data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,""));
      }catch(e){
        return {
          status: "error",
          message: e.toString(),
          data:  data
        };
      }
      //var script = $("<script type='text/json' id='" + url + "'>" + JSON.stringify(data) + "</script>");
    }
    return {
      status: "success",
      data: _parsed
    };
  },
  load: function (url, dataType, callback_success, callback_error) {
    //todo
    if (isServer()) {
      try {
        var data = fs.readFileSync(url, 'utf8');
        data = data.replace(/^\uFEFF/, '');
        var _parsed = utils.parseData(data, dataType);
        if(_parsed.status == "error"){
          callback_error({
            status:   "error",
            message:  _parsed.message,
            data:     _parsed.data
          });
          return;
        }
        callback_success(_parsed.data);
      } catch (e) {

        if (e.code === 'ENOENT') {
          console.log('File not found!');
        } else {
          throw e;
        }
        callback_error(data);
      }
    } else {

      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            var data = httpRequest.responseText;
            var _parsed = utils.parseData(data, dataType);
            if(_parsed.status == "error"){
              callback_error({
                status: httpRequest.status,
                message:  _parsed.message,
                response: httpRequest.responseText
              });
              return;
            }
            callback_success(_parsed.data);
          } else {
            callback_error(url, httpRequest)
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
    }
  },
  /**
   * Позволяетзагружать json файлы , содержащие ссылки на другие json файлы.
   * вместо ссылок типа
   *  "property" : "url(chunk.json)"
   *  будет загружено содержимое файла
   *  "property" : {...}
   *
   *  если указать якорь
   *  "property" : "url(chunk.json#settings/chunk/0/text)"
   *
   * то будет загружено содержимое поля settings.chunk[0].text из файла chunk.json
   *
   *
   * @param filename  путь к основному json файлу
   * @param callback  будет вызван после окончания загрузки всех файлов
   */
  getInlineJson: function (url, dataType, callback_success, callback_error) {

    if (dataType.constructor != String) {
      callback_error = callback_success;
      callback_success = dataType;
      dataType = "json";
    }


    if (typeof utils.CACHED_JSON !== "undefined" && utils.CACHED_JSON && utils.CACHED_JSON[url]) {
      callback_success(utils.CACHED_JSON[url]);
      return;
    }
    if (typeof $ !== "undefined") {
      if (typeof document !== "undefined") {
        var inline = $("script[id='" + url + "']");
        if (inline.length > 0) {
          var _data =
            inline[0].innerText || //all
            inline[0].textContent || //firefox
            inline[0].text; //ie8
          if (dataType == "json") {

            var _data = utils.removeComments(_data);
            callback_success(JSON.parse(_data));
          } else {
            callback_success(_data);
          }
          return;
        }
      }
    }
    utils.load(url, dataType, callback_success, callback_error);
  }
};

module.exports = utils;


/***/ }),
/* 13 */
/***/ (function(module, exports) {



module.exports = {

  loadScript: function (requirement, helper, error) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = error;
    script.onreadystatechange = function () {
      if (this.readyState == 'complete') {
        helper(script, __src);
      }
    };
    script.addEventListener("load", helper, true);
    script.src = requirement;
    head.appendChild(script);
  },
  scriptURL: function () {

    if (document.currentScript) {
      return document.currentScript.src;
    }
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i--;) {
      if (scripts[i].src) {
        return scripts[i].src;
      }
    }
    return false;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {


var deepDiffMapper = {
  VALUE_CREATED: 'created',
  VALUE_UPDATED: 'updated',
  VALUE_DELETED: 'deleted',
  VALUE_UNCHANGED: 'unchanged',
  map: function(obj1, obj2) {
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw 'Invalid argument. Function given, object expected.';
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      return {
        '_map_type': this.compareValues(obj1, obj2),
        '_map_data': (obj2 === undefined) ? obj1 : obj2
      };
    }


    if(_.isArray(obj2)){
      var _array = true;
      var diff = [];
    }else{
      var diff = {};
    }


    for (var key in obj1) {
      if (this.isFunction(obj1[key])) {
        continue;
      }

      var value2 = undefined;
      if ('undefined' != typeof(obj2[key])) {
        value2 = obj2[key];
      }

      diff[key] = this.map(obj1[key], value2);
    }
    for (var key in obj2) {
      if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
        continue;
      }

      var _val = this.map(undefined, obj2[key]);
      if(_array){
        diff.push(_val);
      }else{
        diff[key] = _val
      }
    }

    return {
      '_map_type': '',
      '_map_data': diff
    };

  },
  compareValues: function(value1, value2) {
    if (value1 === value2) {
      return this.VALUE_UNCHANGED;
    }
    if ('undefined' == typeof(value1)) {
      return this.VALUE_CREATED;
    }
    if ('undefined' == typeof(value2)) {
      return this.VALUE_DELETED;
    }

    return this.VALUE_UPDATED;
  },
  isFunction: function(obj) {
    return {}.toString.apply(obj) === '[object Function]';
  },
  isArray: function(obj) {
    return {}.toString.apply(obj) === '[object Array]';
  },
  isObject: function(obj) {
    return {}.toString.apply(obj) === '[object Object]';
  },
  isValue: function(obj) {
    return !this.isObject(obj) && !this.isArray(obj);
  }
};

module.exports = {
  differenceMap: deepDiffMapper.map.bind(deepDiffMapper),
  syntaxHighlight: function (json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
    return json = json.replace(/[^,\n][^\n]*/g, function (match) {
      return '<span>' + match + '</span>';
    });
  },
  differenceHighlight: function  (json,output){

    if(output){
      output.empty();
    }else{
      output = $("<pre>");
    }


    function printObject(json,level,output,comma,objectIndex){
      var _el = $("<p>");

      _el.append($("<span>").addClass("object-key").append(
        $("<span>").text(new Array(level).join(' ') )
      ));
      if(objectIndex){
        _el.append(
          $("<span>").text('"').addClass("invisible"),
          $("<span>").addClass("key").text(objectIndex),
          $("<span>").text('"').addClass("invisible"),
          $("<span>").text(': ')
        );
      }

      if(json && json._map_type !== undefined){
        _el.addClass(json._map_type);

        if(_.isArray(json._map_data)){
          _el.append($("<span>").text("["));
          var _last_key = json._map_data.length - 1;
          for(var i in json._map_data){
            printObject(json._map_data[i],level + 1,_el,i != _last_key);
          }
          _el.append($("<p>").text(new Array(level ).join(' ') + "]" + (comma ? "," : "")));
        }
        else if(_.isObject(json._map_data)){
          _el.append($("<span>").text("{"));
          var _last_key = Object.keys(json._map_data).pop();
          for(var i in json._map_data){
            printObject(json._map_data[i],level + 1,_el,i != _last_key,i);
          }
          _el.append($("<p>").text(new Array(level ).join(' ') + "}" + (comma ? "," : "")));
        }
        else{

          if(_.isNull(json._map_data)){
            _el.append(
              $("<span>").text(JSON.stringify(json._map_data, null, 2))
            );
          }
          else if(json._map_data.constructor === String ){
            _el.append(
              $("<span>").text('"'),
              $("<span>").addClass('string').text(json._map_data),
              $("<span>").text('"')
            );
          }
          else if(json._map_data.constructor === Number || json._map_data.constructor === Boolean){
            _el.append(
              $("<span>").addClass('number').text(json._map_data)
            );
          }
          else{
            _el.append(
              $("<span>").text(JSON.stringify(json._map_data, null, 2))
            );
          }
          if(comma){
            _el.append(
              $("<span>").text(",")
            );
          }


        }
      }else{
        _el.append(
          $("<span>").text(JSON.stringify(json, null, 2))
        )

        if(comma){
          _el.append(
            $("<span>").text(",")
          );
        }

      }

      output.append(_el);

    }
    printObject(json,1,output);
    return output;
  }
};



/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoLjAzOTY1IDAgMCAuMDM5NjUgMS4xNjMgMS4xNjMpIiBmaWxsPSIjNGQ0ZDRkIj48cGF0aCBkPSJtMjUwLjIgODEuNjFjOTcuNDMgMCAxNzkuNzUgNDMuNDMgMTc5Ljc1IDk0LjgzIDAgMTIuNDQ5LTQuOTM0IDI0LjQ0OS0xMy42NDUgMzUuNDY1bDM1LjQwMiAxMC40MDRjOC42MTMtMTQuMjI3IDEzLjUzMy0yOS42MjkgMTMuNTMzLTQ1Ljg2OSAwLTcyLjk2NS05NC40Ni0xMzAuMTItMjE1LjA0LTEzMC4xMi0xMjAuNTcgMC0yMTUuMDQgNTcuMTYtMjE1LjA0IDEzMC4xMiAwIDI2LjkxOCAxMi45MzYgNTEuNjQzIDM1LjE5IDcyLjE3LTYuOTUxIDQuNTAyLTEzLjc1NiAxMC41MDItMTguODM2IDE4Ljk4NC0xMC40NTMgMTcuNDQ5LTEwLjY2IDM5LjA5LS42NDUgNjQuMzUgOS40MzMgMjMuNzkxIDcuMTI1IDMyLjU4MiA1LjY5MyAzNS4yNC0zLjM1NCA2LjMyMi0xOC4xMyA5LjUxNC0zMi4zODUgMTIuNTk2LTMuNDg2Ljc1OC03LjA0IDEuNTMxLTEwLjU4MiAyLjM3MS05LjQ4NCAyLjI0LTE1LjM1MyAxMS43MjUtMTMuMTMgMjEuMjMgMS45MDIgOC4xMTEgOS4xNjQgMTMuNTk2IDE3LjE2IDEzLjU5NiAxLjM0IDAgMi43MDktLjE2IDQuMDY4LS40NjcgMy4zMi0uNzkxIDYuNjU2LTEuNTE4IDkuOTMyLTIuMjI3IDIxLjExLTQuNTY0IDQ1LjAyLTkuNzQyIDU2LjA4LTMwLjQ4MiA4LjQ4Ni0xNS45MDIgNy4xOTUtMzYuNTE2LTQuMDMtNjQuODUtNS43MjUtMTQuNDM1LTYuMzg1LTI1LjU2NC0xLjk0Ny0zMy4xIDQuOTY1LTguNDUxIDE2LjE0LTEyLjIwNyAyMi4xOS0xMy40NjcgMzUuNzA1IDE5LjkwMiA4Mi44NSAzMi4zNTQgMTM1LjU5IDMzLjg2OWwtMTAuNTA0LTM1Ljc0Yy04Ny44Ny01Ljc1OC0xNTguNTYtNDYuNDUtMTU4LjU2LTk0LjA3LjAwMDEtNTEuNCA4Mi4zMi05NC44MyAxNzkuNzUtOTQuODMiLz48cGF0aCBkPSJtNDg3LjU3IDI2OS42M2wtMjIyLjA1LTY1LjI3Yy0xLjExNS0uMzM4LTIuMjQ0LS40ODItMy4zNzMtLjQ4Mi0zLjExMyAwLTYuMTU4IDEuMjI3LTguNDM0IDMuNS0zLjA5NiAzLjA4LTQuMjU4IDcuNjEzLTMuMDIgMTEuNzg5bDY1LjI3IDIyMi4xYzEuMzQgNC42MTMgNS4zNTIgNy45ODIgMTAuMTQzIDguNS40NTMuMDQ3Ljg5MS4wNjQgMS4zMjIuMDY0IDQuMzA5IDAgOC4zMDctMi4zMzggMTAuNDM5LTYuMTYybDU0LjA4LTk4LjA0IDk4LjAzLTU0LjA5YzQuMjI1LTIuMzIyIDYuNjI5LTYuOTUxIDYuMS0xMS43MjctLjUxNC00Ljc4Ny0zLjg3NC04LjgwNS04LjUwMi0xMC4xNzYiLz48L2c+PC9zdmc+Cg=="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScxODhweCcgaGVpZ2h0PScxODhweCcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpbiI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9Im5vbmUiIGNsYXNzPSJiayI+PC9yZWN0PjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwIDUwKSI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjBzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwcyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjEycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC4xMnMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDkwKSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjY2ZmZmRmIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC4yNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuMjVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgxMzUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjM3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC4zN3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE4MCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuNXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDIyNSkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iI2NmZmZkZiI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuNjJzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjYycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMjcwKSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjY2ZmZmRmIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC43NXMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgzMTUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNjZmZmZGYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjg3cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC44N3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjwvZz48L3N2Zz4="

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuMTQzIDkuNjY3Yy0uNzMzLTEuMzkyLTEuOTE0LTMuMDUtMy42MTctNC43NTMtMi45NzctMi45NzgtNS40NzgtMy45MTQtNi43ODUtMy45MTQtLjQxNCAwLS43MDguMDk0LS44Ni4yNDZsLTEuMzYxIDEuMzZjLTEuODk5LS4yMzYtMy40Mi4xMDYtNC4yOTQuOTgzLS44NzYuODc1LTEuMTY0IDIuMTU5LS43OTIgMy41MjMuNDkyIDEuODA2IDIuMzA1IDQuMDQ5IDUuOTA1IDUuMzc1LjAzOC4zMjMuMTU3LjYzOC40MDUuODg1LjU4OC41ODggMS41MzUuNTg2IDIuMTIxIDBzLjU4OC0xLjUzMy4wMDItMi4xMTljLS41ODgtLjU4Ny0xLjUzNy0uNTg4LTIuMTIzLS4wMDFsLS4xNy4yNTZjLTIuMDMxLS43NjUtMy4zOTUtMS44MjgtNC4yMzItMi45bDMuODc5LTMuODc1Yy40OTYgMi43MyA2LjQzMiA4LjY3NiA5LjE3OCA5LjE3OGwtNy4xMTUgNy4xMDdjLS4yMzQuMTUzLTIuNzk4LS4zMTYtNi4xNTYtMy42NzUtMy4zOTMtMy4zOTMtMy4xNzUtNS4yNzEtMy4wMjctNS40OThsMS44NTktMS44NTZjLS40MzktLjM1OS0uOTI1LTEuMTAzLTEuMTQxLTEuNjg5bC0yLjEzNCAyLjEzMWMtLjQ0NS40NDYtLjY4NSAxLjA2NC0uNjg1IDEuODIgMCAxLjYzNCAxLjEyMSAzLjkxNSAzLjcxMyA2LjUwNiAyLjc2NCAyLjc2NCA1LjU4IDQuMjQzIDcuNDMyIDQuMjQzLjY0OCAwIDEuMTgtLjE5NSAxLjU0Ny0uNTYybDguMDg2LTguMDc4Yy45MS44NzQtLjc3OCAzLjUzOC0uNzc4IDQuNjQ4IDAgMS4xMDQuODk2IDEuOTk5IDIgMS45OTkgMS4xMDUgMCAyLS44OTYgMi0yIDAtMy4xODQtMS40MjUtNi44MS0yLjg1Ny05LjM0em0tMTYuMjA5LTUuMzcxYy41MjctLjUzIDEuNDcxLS43OTEgMi42NTYtLjc2MWwtMy4yMDkgMy4yMDZjLS4yMzYtLjk3OC0uMDQ5LTEuODQ1LjU1My0yLjQ0NXptOS4yOTIgNC4wNzlsLS4wMy0uMDI5Yy0xLjI5Mi0xLjI5Mi0zLjgwMy00LjM1Ni0zLjA5Ni01LjA2My43MTUtLjcxNSAzLjQ4OCAxLjUyMSA1LjA2MiAzLjA5Ni44NjIuODYyIDIuMDg4IDIuMjQ3IDIuOTM3IDMuNDU4LTEuNzE3LTEuMDc0LTMuNDkxLTEuNDY5LTQuODczLTEuNDYyeiIvPjwvc3ZnPg=="

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAANlAAADZQBELD/fAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAXPSURBVHic5dt/yF5lGQfwz7U555aatpEopk6yLba16IegDCk0C0kD2woJDZr9IbUg0zYi+yMSQvtFhhG1aOI/Of/QLLEgcggzzcpBc1CT2oqsXNhqsznbrv647xffPXuf7Xmec57z7p1fuDmcc+4f1/W9r3Of+1zXdSIzvRoQEfPxucz8/GHXXw0ERMRC/ARzM/Otk+/Nmh6RukNEXIgtuHiq+yc0ARHxNkX5i/rVOWEJiIgrsRln4Yl+9U5IAiLievwYp+Jb+Fi/uiccARGxDhsxR1n11+JQv/ondSXYuBERs/ANrMX/cGNmbjxWuxOCgIiYi3uxCvuwKjMfGaTtjCcgIs7Ag7gMz+OqzHxq0PYzmoCIOBePYCmexfsyc8cwfRyxCEbE4oh4bTsijg8RsRSPK8r/GpcOqzxTW8DVuDMi/oxt+F0t2/BMZr44stQtISIuU8z+DPxUeeb3jtRZZh5WcBr+hZyiHMQOPIDbcR2W4+TefsZVlIVuf5XnHswZoM2SWv/pI+71afDl2uAp3IwNym7qP32IeRnP4D58AR/EYsxuWfm1dRKyyhgDthuagLPxEg7g3EnXA4vwfqxXXj2/nTQjvWU/nq711td2iwYVvGfciUk5iLVDth+OgNpoQ230lQEGmF1n/NpqAfcpa8bLfYjZWy3q+9XCrsQ5ffqeU019gtDVI1hOXwL6+gMi4s1Vib14Q2bumbLiURARJ1dilmJZLUtxoam34S94ZeHdpjxW6ypBe/CBzNw8ghxLsB1bs8cfcCzmfqQwt77lZ3ke3o4bcAcexk5TW0viL1jeYLzhLaAytxKP4TlckJkHhmV/GETE6YqFTLaYebguM3c16Hc0C6jkPK6wt6ZNK+iyOIoFDPI5fEc93hIRMeosHK8YhIAH8XuFxavHK073OCYBmXkIX62nt45XnO4xqEfoHvwdKyPikjHK0zkGIiAz9+OuevrZ8YnTPYbxCd6tbIquiYg3jUmezjEwAZn5Ar5X29wyNok6xrBe4a8rDscbIuKsMcjTOYYioO7Gfoi5+NRYJOoYo8QF7qzHmyLi1DaFmQ4MTUBmbsXPcCZubF2ijjFqZGhie/zpiJjRnuWRCMjMn+M3OA8fblWijtEkNjixFszo7XETAjbhT1hRQ9EzEiMTkJkH8bV6OmO3x03D4xvwT1xeszFmHBoRkCVKdHc9nZFrQRsJEnfhv1gdERe00F+naExAZj6PHyixgZub9jcmLOp7pyWn4xuViM0+LDgOnKBzcAW+iT96xb0+eGRohEE31UFumyalX4ePKB9rexweV/iD4ta7dJwEXFwH+wfmdaT0RfgMHlU+0ydHsR9TXs9LjtpHywI9WgW4aUwKz8ZK5Vtke88s/xv3K9GmhQP32bKAV00yuVkt9XmakhOwEbt7lN6p5AG+14g5Cm0TEEpgM5WsjVH7OQ+fUPJ/Xpqk8CE8iduwohWZ2ySgCv/RKuwTQxL3TnxRySeYPMsv4iF8HGe3Lm+Lii/GGsVxOiH87VjWp/48JWHiO/hrj9LP4bu4BvPbVrpVAqri91fz7Bfe/iXeoiQur1HCbft66mzFl+rbZKgMkial0Q8TNT6wBQuUbJBf4RdKbtFyvBuX4BTl1TSrmjsl/WazkoPwUGbuHFmQJmg4+xML3r14TZ86c5Uc3omZ3oTVOL2rWR7LI6DsrxO7DGCySk5Q4orpVnpyafIxNBEY2ZWDPUfP1uOZDcZsHw0s4CQlofKgY8wq3qHEFQ/h/Ome9VYegarYJxWzPqCkvF2v5hXi9fgQvl2VHyjlbkYRUBW91ZGJkn8z9WvxXdOtcG9p5b/BiDhHcYa8R/ENzFd8hU8qi9/Cai3bMnNZ4wFbROs/TtZEqgWZubvn2g4lQfL8bJDy1jZa/2kqC3b3XlN2g7Ci7TGbYDr+GjtlGsbsi04IqP/1XF5Pt3cx5qDoygLWKRunLUoS9HGDrgjYo4TRVmXbq25D/B9PLfo3EMEZiwAAAABJRU5ErkJggg=="

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Font Selector - jQuery plugin 0.1
 *
 * Copyright (c) 2012 Chris Dyer
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following
 * conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following
 * disclaimer. Redistributions in binary form must reproduce the above copyright notice, this list of conditions
 * and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 *
 */



(function (factory) {
  if (true) {
    module.exports = factory(__webpack_require__(9));
  } else {
    factory(jQuery);
  }
}(
    function( $ ) {

  'use strict';
  //if(_ && _.styleSheetContains && !_.styleSheetContains('.fontSelect')){
  //  _.linkCSS(_.scriptURL() + "/../../css/jquery.fontSelector.css");
  //}

  var settings;

  var methods = {
    init : function(options) {

      settings = $.extend( {
        'hide_fallbacks' : false,
        'selected' : function(style) {},
        'opened' : function() {},
        'closed' : function() {},
        'initial' : '',
        'fonts' : []
      }, options);

      var root = this;
      var $root = $(this);
      root.selectedCallback = settings['selected'];
      root.openedCallback = settings['opened'];
      root.closedCallback = settings['closed'];
      var visible = false;
      var selected = false;
      var openedClass = 'fontSelectOpen';

      var displayName = function(font) {
        if (settings['hide_fallbacks']){
          var index = font.indexOf(',');
          if(index == -1 )return font;
          return font.substr(0, index);
        }else
          return font;
      }


      var select = function(font,initial) {
        root.find('span').html(displayName(font).replace(/["']{1}/gi,""));
        root.css('font-family', font);
        selected = font;

        if(!initial)root.selectedCallback(selected);
      }

      var positionUl = function() {
        var left, top;
        left = $(root).offset().left;
        top = $(root).offset().top + $(root).outerHeight();

        $(ul).css({
          'position': 'absolute',
          'left': left + 'px',
          'top': top + 'px',
          'width': $(root).outerWidth() + 'px'
        });
      }

      var closeUl = function() {
        ul.slideUp('fast', function() {
          visible = false;
        });

        $root.removeClass(openedClass);

        root.closedCallback();
      }

      var openUi = function() {
        ul.slideDown('fast', function() {
          visible = true;
        });

        $root.addClass(openedClass);

        root.openedCallback();
      }

      // Setup markup
      $root.prepend('<span>' + settings['initial'].replace(/'/g,'&#039;') + '</span>');
      var ul = $('<ul class="fontSelectUl"></ul>').appendTo('body');
      ul.hide();
      positionUl();

      for (var i = 0; i < settings['fonts'].length; i++) {
        var item = $('<li>' + displayName(settings['fonts'][i]) + '</li>').appendTo(ul);
        item.css('font-family', settings['fonts'][i]);
        item[0].data = settings['fonts'][i];
      }

      if (settings['initial'] != '')
        select(settings['initial'],true);

      ul.find('li').click(function() {

        if (!visible)
          return;

        positionUl();
        closeUl();

        select(this.data);
      });

      $root.click(function(event) {

        if (visible)
          return;

        event.stopPropagation();

        positionUl();
        openUi();
      });

      $('html').click(function() {
        if (visible)
        {
          closeUl();
        }
      })
    },
    selected : function() {
      return this.data;
    },
    select : function(font) {
      this.find('span').html(font.substr(0, font.indexOf(',')).replace(/["']{1}/gi,""));
      this.css('font-family', font);
      var selected = false;
      selected = font;
    }
  };
  $.fontSelector = {

  };

  $.fn.fontSelector = function(method) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fontSelector' );
    }
  }
}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright: Cory LaViska for A Beautiful Site, LLC: http://www.abeautifulsite.net/
 *
 * Contribute: https://github.com/claviska/jquery-minicolors
 *
 * @license: http://opensource.org/licenses/MIT
 *
 */



(function (factory) {
  if (true) {
    module.exports = factory(__webpack_require__(9));
  } else {
    factory(jQuery);
  }
}(
  function ($) {

    'use strict';
    //if(_ && _.styleSheetContains && !_.styleSheetContains('.minicolors')){
    //  _.linkCSS(_.scriptURL() + "/../../css/jquery.minicolors.css");
    //}

    // Defaults
    $.minicolors = {
      defaults: {
        animationSpeed: 50,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        dataUris: true,
        defaultValue: '',
        format: 'hex',
        hide: null,
        hideSpeed: 100,
        inline: false,
        keywords: '',
        letterCase: 'lowercase',
        opacity: false,
        position: 'bottom left',
        show: null,
        showSpeed: 100,
        theme: 'default',
        swatches: []
      }
    };

    // Public methods
    $.extend($.fn, {
      minicolors: function(method, data) {

        switch(method) {

          // Destroy the control
          case 'destroy':
            $(this).each( function() {
              destroy($(this));
            });
            return $(this);

          // Hide the color picker
          case 'hide':
            hide();
            return $(this);

          // Get/set opacity
          case 'opacity':
            // Getter
            if( data === undefined ) {
              // Getter
              return $(this).attr('data-opacity');
            } else {
              // Setter
              $(this).each( function() {
                updateFromInput($(this).attr('data-opacity', data));
              });
            }
            return $(this);

          // Get an RGB(A) object based on the current color/opacity
          case 'rgbObject':
            return rgbObject($(this), method === 'rgbaObject');

          // Get an RGB(A) string based on the current color/opacity
          case 'rgbString':
          case 'rgbaString':
            return rgbString($(this), method === 'rgbaString');

          // Get/set settings on the fly
          case 'settings':
            if( data === undefined ) {
              return $(this).data('minicolors-settings');
            } else {
              // Setter
              $(this).each( function() {
                var settings = $(this).data('minicolors-settings') || {};
                destroy($(this));
                $(this).minicolors($.extend(true, settings, data));
              });
            }
            return $(this);

          // Show the color picker
          case 'show':
            show( $(this).eq(0) );
            return $(this);

          // Get/set the hex color value
          case 'value':
            if( data === undefined ) {
              // Getter
              return $(this).val();
            } else {
              // Setter
              $(this).each( function() {
                if( typeof(data) === 'object' ) {
                  if( data.opacity ) {
                    $(this).attr('data-opacity', keepWithin(data.opacity, 0, 1));
                  }
                  if( data.color ) {
                    $(this).val(data.color);
                  }
                } else {
                  $(this).val(data);
                }
                updateFromInput($(this));
              });
            }
            return $(this);

          // Initializes the control
          default:
            if( method !== 'create' ) data = method;
            $(this).each( function() {
              init($(this), data);
            });
            return $(this);

        }

      }
    });

    var inputText, globalSettings, globalTarget , globalInput ;
    // Initialize input elements
    function init(input, settings) {

      var minicolors = $('<div class="minicolors" />'),
        defaults = $.minicolors.defaults,
        size,
        swatches,
        textPanel,
        swatch,
        panel,
        globalTarget = input,
        i;

      // Do nothing if already initialized
      if( input.data('minicolors-initialized') ) return;

      // Handle settings
      globalSettings = settings = $.extend(true, {}, defaults, settings);

      // The wrapper
      minicolors
        .addClass('minicolors-theme-' + settings.theme)
        .toggleClass('minicolors-with-opacity', settings.opacity)
        .toggleClass('minicolors-no-data-uris', settings.dataUris !== true);

      // Custom positioning
      if( settings.position !== undefined ) {
        $.each(settings.position.split(' '), function() {
          minicolors.addClass('minicolors-position-' + this);
        });
      }

      // Input size
      if( settings.format === 'rgb' ) {
        size = settings.opacity ? '25' : '20';
      } else {
        size = settings.keywords ? '11' : '7';
      }
       globalInput = input;
      // The input
      input
        .addClass('minicolors-input')
        .data('minicolors-initialized', false)
        .data('minicolors-settings', settings)
        .prop('size', size)
        .wrap(minicolors)
        .after(
        '<div class="minicolors-panel minicolors-slider-' + settings.control + '">' +
        '<div class="minicolors-slider minicolors-sprite">' +
        '<div class="minicolors-picker"></div>' +
        '</div>' +
        '<div class="minicolors-opacity-slider minicolors-sprite">' +
        '<div class="minicolors-picker"></div>' +
        '</div>' +
        '<div class="minicolors-grid minicolors-sprite">' +
        '<div class="minicolors-grid-inner"></div>' +
        '<div class="minicolors-picker"><div></div></div>' +
        '</div>' +
        '</div>'
      );

      // The swatch
      if( !settings.inline ) {
        input.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>');
        input.next('.minicolors-input-swatch').on('click', function(event) {
          event.preventDefault();
          input.focus();
        });
      }

      // Prevent text selection in IE
      panel = input.parent().find('.minicolors-panel');
      panel.on('selectstart', function() { return false; }).end();

      // Swatches
      if (settings.swatches && settings.swatches.length !== 0) {
        if (settings.swatches.length > 7) {
          settings.swatches.length = 7;
        }
        panel.addClass('minicolors-with-swatches');
        swatches = $('<ul class="minicolors-swatches"></ul>')
          .appendTo(panel);
        for(i = 0; i < settings.swatches.length; ++i) {
          swatch = settings.swatches[i];
          swatch = isRgb(swatch) ? parseRgb(swatch, true) : hex2rgb(parseHex(swatch, true));
          $('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>')
            .appendTo(swatches)
            .data('swatch-color', settings.swatches[i])
            .find('.minicolors-swatch-color')
            .css({
              backgroundColor: rgb2hex(swatch),
              opacity: swatch.a
            });
          settings.swatches[i] = swatch;
        }

      }


      // Swatches
      if (settings.text) {
        panel.addClass('minicolors-with-text');
        textPanel = $('<div class="minicolors-text"></div>')
          .appendTo(panel);
        inputText = $('<input type="text">')
          .appendTo(textPanel);

        $(inputText).change(function(){
          input.val(inputText.val());
          updateFromInput(input, true);
        })

      }

      // Inline controls
      if( settings.inline ) input.parent().addClass('minicolors-inline');

      updateFromInput(input, false);

      input.data('minicolors-initialized', true);

    }

    // Returns the input back to its original state
    function destroy(input) {

      var minicolors = input.parent();

      // Revert the input element
      input
        .removeData('minicolors-initialized')
        .removeData('minicolors-settings')
        .removeProp('size')
        .removeClass('minicolors-input');

      // Remove the wrap and destroy whatever remains
      minicolors.before(input).remove();

    }

    // Shows the specified dropdown panel
    function show(input) {

      var minicolors = input.parent(),
        panel = minicolors.find('.minicolors-panel'),
        settings = input.data('minicolors-settings');

      // Do nothing if uninitialized, disabled, inline, or already open
      if( !input.data('minicolors-initialized') ||
        input.prop('disabled') ||
        minicolors.hasClass('minicolors-inline') ||
        minicolors.hasClass('minicolors-focus')
      ) return;

      hide();

      minicolors.addClass('minicolors-focus');
      panel
        .stop(true, true)
        .fadeIn(settings.showSpeed, function() {
          if( settings.show ) settings.show.call(input.get(0));
        });

    }

    // Hides all dropdown panels
    function hide() {

      $('.minicolors-focus').each( function() {

        var minicolors = $(this),
          input = minicolors.find('.minicolors-input'),
          panel = minicolors.find('.minicolors-panel'),
          settings = input.data('minicolors-settings');

        panel.fadeOut(settings.hideSpeed, function() {
          if( settings.hide ) settings.hide.call(input.get(0));
          minicolors.removeClass('minicolors-focus');
        });

      });
    }

    // Moves the selected picker
    function move(target, event, animate) {

      var input =  target.parents('.minicolors').find('.minicolors-input'),
        settings = input.data('minicolors-settings'),
        picker = target.find('[class$=-picker]'),
        offsetX = target.offset().left,
        offsetY = target.offset().top,
        x = Math.round(event.pageX - offsetX),
        y = Math.round(event.pageY - offsetY),
        duration = animate ? settings.animationSpeed : 0,
        wx, wy, r, phi;

      // Touch support
      if( event.originalEvent.changedTouches ) {
        x = event.originalEvent.changedTouches[0].pageX - offsetX;
        y = event.originalEvent.changedTouches[0].pageY - offsetY;
      }

      // Constrain picker to its container
      if( x < 0 ) x = 0;
      if( y < 0 ) y = 0;
      if( x > target.width() ) x = target.width();
      if( y > target.height() ) y = target.height();

      // Constrain color wheel values to the wheel
      if( target.parent().is('.minicolors-slider-wheel') && picker.parent().is('.minicolors-grid') ) {
        wx = 75 - x;
        wy = 75 - y;
        r = Math.sqrt(wx * wx + wy * wy);
        phi = Math.atan2(wy, wx);
        if( phi < 0 ) phi += Math.PI * 2;
        if( r > 75 ) {
          r = 75;
          x = 75 - (75 * Math.cos(phi));
          y = 75 - (75 * Math.sin(phi));
        }
        x = Math.round(x);
        y = Math.round(y);
      }

      // Move the picker
      if( target.is('.minicolors-grid') ) {
        picker
          .stop(true)
          .animate({
            top: y + 'px',
            left: x + 'px'
          }, duration, settings.animationEasing, function() {
            updateFromControl(input, target);
          });
      } else {
        picker
          .stop(true)
          .animate({
            top: y + 'px'
          }, duration, settings.animationEasing, function() {
            updateFromControl(input, target);
          });
      }

    }

    // Sets the input based on the color picker values
    function updateFromControl(input, target) {

      function getCoords(picker, container) {

        var left, top;
        if( !picker.length || !container ) return null;
        left = picker.offset().left;
        top = picker.offset().top;

        return {
          x: left - container.offset().left + (picker.outerWidth() / 2),
          y: top - container.offset().top + (picker.outerHeight() / 2)
        };

      }

      var hue, saturation, brightness, x, y, r, phi,

        hex = input.val(),
        opacity = input.attr('data-opacity'),

      // Helpful references
        minicolors = input.parent(),
        settings = input.data('minicolors-settings'),
        swatch = minicolors.find('.minicolors-input-swatch'),

      // Panel objects
        grid = minicolors.find('.minicolors-grid'),
        slider = minicolors.find('.minicolors-slider'),
        opacitySlider = minicolors.find('.minicolors-opacity-slider'),

      // Picker objects
        gridPicker = grid.find('[class$=-picker]'),
        sliderPicker = slider.find('[class$=-picker]'),
        opacityPicker = opacitySlider.find('[class$=-picker]'),

      // Picker positions
        gridPos = getCoords(gridPicker, grid),
        sliderPos = getCoords(sliderPicker, slider),
        opacityPos = getCoords(opacityPicker, opacitySlider);

      // Handle colors
      if( target.is('.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider') ) {

        // Determine HSB values
        switch(settings.control) {

          case 'wheel':
            // Calculate hue, saturation, and brightness
            x = (grid.width() / 2) - gridPos.x;
            y = (grid.height() / 2) - gridPos.y;
            r = Math.sqrt(x * x + y * y);
            phi = Math.atan2(y, x);
            if( phi < 0 ) phi += Math.PI * 2;
            if( r > 75 ) {
              r = 75;
              gridPos.x = 69 - (75 * Math.cos(phi));
              gridPos.y = 69 - (75 * Math.sin(phi));
            }
            saturation = keepWithin(r / 0.75, 0, 100);
            hue = keepWithin(phi * 180 / Math.PI, 0, 360);
            brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
            hex = hsb2hex({
              h: hue,
              s: saturation,
              b: brightness
            });

            // Update UI
            slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
            break;

          case 'saturation':
            // Calculate hue, saturation, and brightness
            hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
            saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
            brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
            hex = hsb2hex({
              h: hue,
              s: saturation,
              b: brightness
            });

            // Update UI
            slider.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: brightness }));
            minicolors.find('.minicolors-grid-inner').css('opacity', saturation / 100);
            break;

          case 'brightness':
            // Calculate hue, saturation, and brightness
            hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
            saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
            brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
            hex = hsb2hex({
              h: hue,
              s: saturation,
              b: brightness
            });

            // Update UI
            slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
            minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (brightness / 100));
            break;

          default:
            // Calculate hue, saturation, and brightness
            hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height()), 10), 0, 360);
            saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
            brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
            hex = hsb2hex({
              h: hue,
              s: saturation,
              b: brightness
            });

            // Update UI
            grid.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: 100 }));
            break;

        }

        // Handle opacity
        if( settings.opacity ) {
          opacity = parseFloat(1 - (opacityPos.y / opacitySlider.height())).toFixed(2);
        } else {
          opacity = 1;
        }

        updateInput(input, hex, opacity);
      }
      else {
        // Set swatch color
        swatch.find('span').css({
          backgroundColor: hex,
          opacity: opacity
        });

        // Handle change event
        doChange(input, hex, opacity);
      }
    }

    // Sets the value of the input and does the appropriate conversions
    // to respect settings, also updates the swatch
    function updateInput(input, value, opacity) {
      var rgb,

      // Helpful references
        minicolors = input.parent(),
        settings = input.data('minicolors-settings'),
        swatch = minicolors.find('.minicolors-input-swatch');

      if( settings.opacity ) input.attr('data-opacity', opacity);

      // Set color string
      if( settings.format === 'rgb' ) {
        // Returns RGB(A) string

        // Checks for input format and does the conversion
        if ( isRgb(value) ) {
          rgb = parseRgb(value, true);
        }
        else {
          rgb = hex2rgb(parseHex(value, true));
        }


        opacity = input.attr('data-opacity') === '' ? 1 : keepWithin( parseFloat( input.attr('data-opacity') ).toFixed(2), 0, 1 );
        if( isNaN( opacity ) || !settings.opacity ) opacity = 1;

        if( input.minicolors('rgbObject').a <= 1 && rgb && settings.opacity) {
          // Set RGBA string if alpha
          value = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat( opacity ) + ')';
        } else {
          // Set RGB string (alpha = 1)
          value = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        }
      } else {
        // Returns hex color

        // Checks for input format and does the conversion
        if ( isRgb(value) ) {
          value = rgbString2hex(value);
        }

        value = convertCase( value, settings.letterCase );
      }




      // Update value from picker
      //globalInput.val( value );
      input.val( value );

      if(inputText){
        inputText.val(value);
      }


      // Set swatch color
      swatch.find('span').css({
        backgroundColor: value,
        opacity: opacity
      });

      // Handle change event
      doChange(input, value, opacity);
    }

    // Sets the color picker values from the input
    function updateFromInput(input, preserveInputValue) {
     var  settings = globalSettings;
      var hex,
        hsb,
        opacity,
        keywords,
        alpha,
        value,
        x, y, r, phi,

      // Helpful references
        minicolors = input.parent(),
      //  settings = input.data('minicolors-settings'),
        swatch = minicolors.find('.minicolors-input-swatch'),

      // Panel objects
        grid = minicolors.find('.minicolors-grid'),
        slider = minicolors.find('.minicolors-slider'),
        opacitySlider = minicolors.find('.minicolors-opacity-slider'),

      // Picker objects
        gridPicker = grid.find('[class$=-picker]'),
        sliderPicker = slider.find('[class$=-picker]'),
        opacityPicker = opacitySlider.find('[class$=-picker]');

      // Determine hex/HSB values
      if( isRgb(input.val()) ) {
        // If input value is a rgb(a) string, convert it to hex color and update opacity
        hex = rgbString2hex(input.val());
        alpha = keepWithin(parseFloat(getAlpha(input.val())).toFixed(2), 0, 1);
        if( alpha ) {
          input.attr('data-opacity', alpha);
        }
      } else {
        hex = convertCase(parseHex(input.val(), true), settings.letterCase);
      }

      if( !hex ){
        hex = convertCase(parseInput(settings.defaultValue, true), settings.letterCase);
      }
      hsb = hex2hsb(hex);

      // Get array of lowercase keywords
      keywords = !settings.keywords ? [] : $.map(settings.keywords.split(','), function(a) {
        return $.trim(a.toLowerCase());
      });

      // Set color string
      if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
        value = convertCase(input.val());
      } else {
        value = isRgb(input.val()) ? parseRgb(input.val()) : hex;
      }

      // Update input value
      if( !preserveInputValue ){
        globalInput.val(value);

        inputText && inputText.val(value);
      }
      globalSettings = settings
      // Determine opacity value
      if( settings.opacity ) {
        // Get from data-opacity attribute and keep within 0-1 range
        opacity = input.attr('data-opacity') === '' ? 1 : keepWithin(parseFloat(input.attr('data-opacity')).toFixed(2), 0, 1);
        if( isNaN(opacity) ) opacity = 1;
        input.attr('data-opacity', opacity);
        swatch.find('span').css('opacity', opacity);

        // Set opacity picker position
        y = keepWithin(opacitySlider.height() - (opacitySlider.height() * opacity), 0, opacitySlider.height());
        opacityPicker.css('top', y + 'px');
      }

      // Set opacity to zero if input value is transparent
      if( input.val().toLowerCase() === 'transparent' ) {
        swatch.find('span').css('opacity', 0);
      }

      // Update swatch
      swatch.find('span').css('backgroundColor', hex);

      // Determine picker locations
      switch(settings.control) {

        case 'wheel':
          // Set grid position
          r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
          phi = hsb.h * Math.PI / 180;
          x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
          y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
          gridPicker.css({
            top: y + 'px',
            left: x + 'px'
          });

          // Set slider position
          y = 150 - (hsb.b / (100 / grid.height()));
          if( hex === '' ) y = 0;
          sliderPicker.css('top', y + 'px');

          // Update panel color
          slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
          break;

        case 'saturation':
          // Set grid position
          x = keepWithin((5 * hsb.h) / 12, 0, 150);
          y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
          gridPicker.css({
            top: y + 'px',
            left: x + 'px'
          });

          // Set slider position
          y = keepWithin(slider.height() - (hsb.s * (slider.height() / 100)), 0, slider.height());
          sliderPicker.css('top', y + 'px');

          // Update UI
          slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
          minicolors.find('.minicolors-grid-inner').css('opacity', hsb.s / 100);
          break;

        case 'brightness':
          // Set grid position
          x = keepWithin((5 * hsb.h) / 12, 0, 150);
          y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
          gridPicker.css({
            top: y + 'px',
            left: x + 'px'
          });

          // Set slider position
          y = keepWithin(slider.height() - (hsb.b * (slider.height() / 100)), 0, slider.height());
          sliderPicker.css('top', y + 'px');

          // Update UI
          slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
          minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (hsb.b / 100));
          break;

        default:
          // Set grid position
          x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
          y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
          gridPicker.css({
            top: y + 'px',
            left: x + 'px'
          });

          // Set slider position
          y = keepWithin(slider.height() - (hsb.h / (360 / slider.height())), 0, slider.height());
          sliderPicker.css('top', y + 'px');

          // Update panel color
          grid.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: 100 }));
          break;

      }

      // Fire change event, but only if minicolors is fully initialized
      if( input.data('minicolors-initialized') ) {
        doChange(input, value, opacity);
      }

    }

    // Runs the change and changeDelay callbacks
    function doChange(input, value, opacity) {

      var settings = input.data('minicolors-settings'),
        lastChange = input.data('minicolors-lastChange'),
        obj,
        sel,
        i;

      // Only run if it actually changed
      if( !lastChange || lastChange.value !== value || lastChange.opacity !== opacity ) {

        // Remember last-changed value
        input.data('minicolors-lastChange', {
          value: value,
          opacity: opacity
        });

        // Check and select applicable swatch
        if (settings.swatches && settings.swatches.length !== 0) {
          if(!isRgb(value)) {
            obj = hex2rgb(value);
          }
          else {
            obj = parseRgb(value, true);
          }
          sel = -1;
          for(i = 0; i < settings.swatches.length; ++i) {
            if (obj.r === settings.swatches[i].r && obj.g === settings.swatches[i].g && obj.b === settings.swatches[i].b && obj.a === settings.swatches[i].a) {
              sel = i;
              break;
            }
          }

          input.parent().find('.minicolors-swatches .minicolors-swatch').removeClass('selected');
          if (i !== -1) {
            input.parent().find('.minicolors-swatches .minicolors-swatch').eq(i).addClass('selected');
          }
        }

        // Fire change event
        if( settings.change ) {
          if( settings.changeDelay ) {
            // Call after a delay
            clearTimeout(input.data('minicolors-changeTimeout'));
            input.data('minicolors-changeTimeout', setTimeout( function() {
              settings.change.call(input.get(0), value, opacity);
            }, settings.changeDelay));
          } else {
            // Call immediately
            settings.change.call(input.get(0), value, opacity);
          }
        }
        input.trigger('change').trigger('input');
      }

    }

    // Generates an RGB(A) object based on the input's value
    function rgbObject(input) {
      var hex = parseHex($(input).val(), true),
        rgb = hex2rgb(hex),
        opacity = $(input).attr('data-opacity');
      if( !rgb ) return null;
      if( opacity !== undefined ) $.extend(rgb, { a: parseFloat(opacity) });
      return rgb;
    }

    // Generates an RGB(A) string based on the input's value
    function rgbString(input, alpha) {
      var hex = parseHex($(input).val(), true),
        rgb = hex2rgb(hex),
        opacity = $(input).attr('data-opacity');
      if( !rgb ) return null;
      if( opacity === undefined ) opacity = 1;
      if( alpha ) {
        return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
      } else {
        return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
      }
    }

    // Converts to the letter case specified in settings
    function convertCase(string, letterCase) {
      return letterCase === 'uppercase' ? string.toUpperCase() : string.toLowerCase();
    }

    // Parses a string and returns a valid hex string when possible
    function parseHex(string, expand) {
      string = string.replace(/^#/g, '');
      if( !string.match(/^[A-F0-9]{3,6}/ig) ) return '';
      if( string.length !== 3 && string.length !== 6 ) return '';
      if( string.length === 3 && expand ) {
        string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
      }
      return '#' + string;
    }

    // Parses a string and returns a valid RGB(A) string when possible
    function parseRgb(string, obj) {

      var values = string.replace(/[^\d,.]/g, ''),
        rgba = values.split(',');

      rgba[0] = keepWithin(parseInt(rgba[0], 10), 0, 255);
      rgba[1] = keepWithin(parseInt(rgba[1], 10), 0, 255);
      rgba[2] = keepWithin(parseInt(rgba[2], 10), 0, 255);
      if( rgba[3] ) {
        rgba[3] = keepWithin(parseFloat(rgba[3], 10), 0, 1);
      }

      // Return RGBA object
      if( obj ) {
        return {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3] ? rgba[3] : null
        };
      }

      // Return RGBA string
      if( typeof(rgba[3]) !== 'undefined' && rgba[3] <= 1 ) {
        return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
      } else {
        return 'rgb(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ')';
      }

    }

    // Parses a string and returns a valid color string when possible
    function parseInput(string, expand) {
      if( isRgb(string) ) {
        // Returns a valid rgb(a) string
        return parseRgb(string);
      } else {
        return parseHex(string, expand);
      }
    }

    // Keeps value within min and max
    function keepWithin(value, min, max) {
      if( value < min ) value = min;
      if( value > max ) value = max;
      return value;
    }

    // Checks if a string is a valid RGB(A) string
    function isRgb(string) {
      var rgb = string.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? true : false;
    }

    // Function to get alpha from a RGB(A) string
    function getAlpha(rgba) {
      rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i);
      return (rgba && rgba.length === 6) ? rgba[4] : '1';
    }

    // Converts an HSB object to an RGB object
    function hsb2rgb(hsb) {
      var rgb = {};
      var h = Math.round(hsb.h);
      var s = Math.round(hsb.s * 255 / 100);
      var v = Math.round(hsb.b * 255 / 100);
      if(s === 0) {
        rgb.r = rgb.g = rgb.b = v;
      } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if( h === 360 ) h = 0;
        if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
        else if( h < 120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
        else if( h < 180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
        else if( h < 240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
        else if( h < 300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
        else if( h < 360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
        else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
      }
      return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
      };
    }

    // Converts an RGB string to a hex string
    function rgbString2hex(rgb){
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    // Converts an RGB object to a hex string
    function rgb2hex(rgb) {
      var hex = [
        rgb.r.toString(16),
        rgb.g.toString(16),
        rgb.b.toString(16)
      ];
      $.each(hex, function(nr, val) {
        if (val.length === 1) hex[nr] = '0' + val;
      });
      return '#' + hex.join('');
    }

    // Converts an HSB object to a hex string
    function hsb2hex(hsb) {
      return rgb2hex(hsb2rgb(hsb));
    }

    // Converts a hex string to an HSB object
    function hex2hsb(hex) {
      var hsb = rgb2hsb(hex2rgb(hex));
      if( hsb.s === 0 ) hsb.h = 360;
      return hsb;
    }

    // Converts an RGB object to an HSB object
    function rgb2hsb(rgb) {
      var hsb = { h: 0, s: 0, b: 0 };
      var min = Math.min(rgb.r, rgb.g, rgb.b);
      var max = Math.max(rgb.r, rgb.g, rgb.b);
      var delta = max - min;
      hsb.b = max;
      hsb.s = max !== 0 ? 255 * delta / max : 0;
      if( hsb.s !== 0 ) {
        if( rgb.r === max ) {
          hsb.h = (rgb.g - rgb.b) / delta;
        } else if( rgb.g === max ) {
          hsb.h = 2 + (rgb.b - rgb.r) / delta;
        } else {
          hsb.h = 4 + (rgb.r - rgb.g) / delta;
        }
      } else {
        hsb.h = -1;
      }
      hsb.h *= 60;
      if( hsb.h < 0 ) {
        hsb.h += 360;
      }
      hsb.s *= 100/255;
      hsb.b *= 100/255;
      return hsb;
    }

    // Converts a hex string to an RGB object
    function hex2rgb(hex) {
      hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
      return {
        /* jshint ignore:start */
        r: hex >> 16,
        g: (hex & 0x00FF00) >> 8,
        b: (hex & 0x0000FF)
        /* jshint ignore:end */
      };
    }

    // Handle events
    $(document)
      // Hide on clicks outside of the control
      .on('mousedown.minicolors touchstart.minicolors', function(event) {
        if( !$(event.target).parents().add(event.target).hasClass('minicolors') ) {
          hide();
        }
      })
      // Start moving
      .on('mousedown.minicolors touchstart.minicolors', '.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider', function(event) {
        var target = $(this);
        event.preventDefault();
        $(document).data('minicolors-target', target);
        move(target, event, true);
      })
      // Move pickers
      .on('mousemove.minicolors touchmove.minicolors', function(event) {
        var target = $(document).data('minicolors-target');
        if( target ) move(target, event);
      })
      // Stop moving
      .on('mouseup.minicolors touchend.minicolors', function() {
        $(this).removeData('minicolors-target');
      })
      // Selected a swatch
      .on('click.minicolors', '.minicolors-swatches li', function(event) {
        event.preventDefault();
        var target = $(this), input = target.parents('.minicolors').find('.minicolors-input'), color = target.data('swatch-color');
        updateInput(input, color, getAlpha(color));
        updateFromInput(input);
      })
      // Show panel when swatch is clicked
      .on('mousedown.minicolors touchstart.minicolors', '.minicolors-input-swatch', function(event) {
        var input = $(this).parent().find('.minicolors-input');
        event.preventDefault();
        if( input.parent().find('.minicolors-panel').css("display") !== "none"){
          //todo
          //hide();
        }else{
          show(input);
        }
      })
      // Show on focus
      .on('focus.minicolors', '.minicolors-input', function() {
        var input = $(this);
        if( !input.data('minicolors-initialized') ) return;
        show(input);
      })
      // Update value on blur
      .on('blur.minicolors', '.minicolors-input', function() {
        var input = $(this),
          settings = input.data('minicolors-settings'),
          keywords,
          hex,
          rgba,
          swatchOpacity,
          value;

        if( !input.data('minicolors-initialized') ) return;

        // Get array of lowercase keywords
        keywords = !settings.keywords ? [] : $.map(settings.keywords.split(','), function(a) {
          return $.trim(a.toLowerCase());
        });

        // Set color string
        if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
          value = input.val();
        } else {
          // Get RGBA values for easy conversion
          if( isRgb(input.val()) ) {
            rgba = parseRgb(input.val(), true);
          } else {
            hex = parseHex(input.val(), true);
            rgba = hex ? hex2rgb(hex) : null;
          }

          // Convert to format
          if( rgba === null ) {
            value = settings.defaultValue;
          } else if( settings.format === 'rgb' ) {
            value = settings.opacity ?
              parseRgb('rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + input.attr('data-opacity') + ')') :
              parseRgb('rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')');
          } else {
            value = rgb2hex(rgba);
          }
        }

        // Update swatch opacity
        swatchOpacity = settings.opacity ? input.attr('data-opacity') : 1;
        if( value.toLowerCase() === 'transparent' ) swatchOpacity = 0;
        input
          .closest('.minicolors')
          .find('.minicolors-input-swatch > span')
          .css('opacity', swatchOpacity);

        // Set input value
        input.val(value);

        // Is it blank?
        if( input.val() === '' ) input.val(parseInput(settings.defaultValue, true));

        // Adjust case
        input.val( convertCase(input.val(), settings.letterCase) );

      })
      // Handle keypresses
      .on('keydown.minicolors', '.minicolors-input', function(event) {
        var input = $(this);
        if( !input.data('minicolors-initialized') ) return;
        switch(event.keyCode) {
          case 9: // tab
            hide();
            break;
          case 13: // enter
          case 27: // esc
            hide();
            input.blur();
            break;
        }
      })
      // Update on keyup
      .on('keyup.minicolors', '.minicolors-input', function() {
        var input = $(this);
        if( !input.data('minicolors-initialized') ) return;
        updateFromInput(input, true);
      })
      // Update on paste
      .on('paste.minicolors', '.minicolors-input', function() {
        var input = $(this);
        if( !input.data('minicolors-initialized') ) return;
        setTimeout( function() {
          updateFromInput(input, true);
        }, 1);
      });

  }));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.1.20150716
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */



var isLikelyNode = typeof Buffer !== 'undefined' && typeof window === 'undefined';



var saveAs = !isLikelyNode &&  (function(view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var
            doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function() {
                return view.URL || view.webkitURL || view;
            }
            , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = "download" in save_link
            , click = function(node) {
                var event = new MouseEvent("click");
                node.dispatchEvent(event);
            }
            , webkit_req_fs = view.webkitRequestFileSystem
            , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
            , throw_outside = function(ex) {
                (view.setImmediate || view.setTimeout)(function() {
                    throw ex;
                }, 0);
            }
            , force_saveable_type = "application/octet-stream"
            , fs_min_size = 0
        // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
        // https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
        // for the reasoning behind the timeout and revocation flow
            , arbitrary_revoke_timeout = 500 // in ms
            , revoke = function(file) {
                var revoker = function() {
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                };
                if (view.chrome) {
                    revoker();
                } else {
                    setTimeout(revoker, arbitrary_revoke_timeout);
                }
            }
            , dispatch = function(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;
                while (i--) {
                    var listener = filesaver["on" + event_types[i]];
                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            }
            , auto_bom = function(blob) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                    return new Blob(["\ufeff", blob], {type: blob.type});
                }
                return blob;
            }
            , FileSaver = function(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                // First try a.download, then web filesystem, then object URLs
                var
                    filesaver = this
                    , type = blob.type
                    , blob_changed = false
                    , object_url
                    , target_view
                    , dispatch_all = function() {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    }
                // on any filesys errors revert to saving with object URLs
                    , fs_error = function() {
                        // don't create more object URLs than needed
                        if (blob_changed || !object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }
                        if (target_view) {
                            target_view.location.href = object_url;
                        } else {
                            var new_tab = view.open(object_url, "_blank");
                            if (new_tab == undefined && typeof safari !== "undefined") {
                                //Apple do not allow window.open, see http://bit.ly/1kZffRI
                                view.location.href = object_url
                            }
                        }
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    }
                    , abortable = function(func) {
                        return function() {
                            if (filesaver.readyState !== filesaver.DONE) {
                                return func.apply(this, arguments);
                            }
                        };
                    }
                    , create_if_not_found = {create: true, exclusive: false}
                    , slice
                    ;
                filesaver.readyState = filesaver.INIT;
                if (!name) {
                    name = "download";
                }
                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    save_link.href = object_url;
                    save_link.download = name;
                    setTimeout(function() {
                        click(save_link);
                        dispatch_all();
                        revoke(object_url);
                        filesaver.readyState = filesaver.DONE;
                    });
                    return;
                }
                // Object and web filesystem URLs have a problem saving in Google Chrome when
                // viewed in a tab, so I force save with application/octet-stream
                // http://code.google.com/p/chromium/issues/detail?id=91158
                // Update: Google errantly closed 91158, I submitted it again:
                // https://code.google.com/p/chromium/issues/detail?id=389642
                if (view.chrome && type && type !== force_saveable_type) {
                    slice = blob.slice || blob.webkitSlice;
                    blob = slice.call(blob, 0, blob.size, force_saveable_type);
                    blob_changed = true;
                }
                // Since I can't be sure that the guessed media type will trigger a download
                // in WebKit, I append .download to the filename.
                // https://bugs.webkit.org/show_bug.cgi?id=65440
                if (webkit_req_fs && name !== "download") {
                    name += ".download";
                }
                if (type === force_saveable_type || webkit_req_fs) {
                    target_view = view;
                }
                if (!req_fs) {
                    fs_error();
                    return;
                }
                fs_min_size += blob.size;
                req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                    fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                        var save = function() {
                            dir.getFile(name, create_if_not_found, abortable(function(file) {
                                file.createWriter(abortable(function(writer) {
                                    writer.onwriteend = function(event) {
                                        target_view.location.href = file.toURL();
                                        filesaver.readyState = filesaver.DONE;
                                        dispatch(filesaver, "writeend", event);
                                        revoke(file);
                                    };
                                    writer.onerror = function() {
                                        var error = writer.error;
                                        if (error.code !== error.ABORT_ERR) {
                                            fs_error();
                                        }
                                    };
                                    "writestart progress write abort".split(" ").forEach(function(event) {
                                        writer["on" + event] = filesaver["on" + event];
                                    });
                                    writer.write(blob);
                                    filesaver.abort = function() {
                                        writer.abort();
                                        filesaver.readyState = filesaver.DONE;
                                    };
                                    filesaver.readyState = filesaver.WRITING;
                                }), fs_error);
                            }), fs_error);
                        };
                        dir.getFile(name, {create: false}, abortable(function(file) {
                            // delete file if it already exists
                            file.remove();
                            save();
                        }), abortable(function(ex) {
                            if (ex.code === ex.NOT_FOUND_ERR) {
                                save();
                            } else {
                                fs_error();
                            }
                        }));
                    }), fs_error);
                }), fs_error);
            }
            , FS_proto = FileSaver.prototype
            , saveAs = function(blob, name, no_auto_bom) {
                return new FileSaver(blob, name, no_auto_bom);
            }
            ;
        // IE 10+ (native saveAs)
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            return function(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                return navigator.msSaveOrOpenBlob(blob, name || "download");
            };
        }

        FS_proto.abort = function() {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;

        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;

        return saveAs;
    }(
        typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content
    ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(15) !== null) && (__webpack_require__(16) != null)) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return saveAs;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.26 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
  function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
  function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
  function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
  function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
  function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,c=q(),d=new Promise(function(d,e){function k(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,d){setTimeout(d,b.f)});Promise.race([e,d]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
    P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
  function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
  W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
  function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
    n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){ra(a,f,b,d,c)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
  sa.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var m=0;m<c.length;m++){var l=c[m].fontfamily;void 0!=c[m].fontStyle&&void 0!=c[m].fontWeight?(h=c[m].fontStyle+c[m].fontWeight,e.push(new H(l,h))):e.push(new H(l))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.m;B(this.c,ta(c,d,e),function(e){e?a([]):(f["__MonotypeConfiguration__"+d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+
    d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
  function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
  var Aa={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},
    Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
    g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return Z}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.util.object.extend(fabric.BaseBrush.prototype, {
  useDrawingColor: true,
  setOptions: function (options) {
    for (var prop in options) {
      this[prop] = options[prop];
    }
  },
  type: "base-brush",
  initialize: function (canvas, options) {
    this.canvas = canvas;
    options = options || {};
    if(this.canvas.application) {
      this.canvas.application.fire("entity:created", {target: this, options: options})
    }
    this.setOptions(options);
  },
  convertColor: function (color, type) {
    type = type || "name";
    if (color instanceof Array) {
      if (type == "source") {
        return color;
      }
      color = "#" + fabric.Color.fromSource(color).toHex();
    }
    if (type == "hex" || type == "source") {
      if (fabric.Color.colorNameMap[color]) {
        color = fabric.Color.colorNameMap[color];
      }
      if (type == "source") {
        if (color == "transparent") {
          return [0, 0, 0, 0];
        }
        var _source = fabric.Color.fromHex(color).getSource()
        _source[3] *= 255;
        return _source;
      }
    }
    return color;
  },
  getColor: function (type) {
    var color = this.useDrawingColor && this.canvas.drawingColor || this.color;
    return this.convertColor(color, type);
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


fabric.MagicWand = __webpack_require__(8);

  /**
   * PencilBrush class
   * @class fabric.PencilBrush
   * @extends fabric.BaseBrush
   */
  fabric.PaintBucketBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.PencilBrush.prototype */ {
    type: 'paint-bucket-brush',
    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {fabric.PencilBrush} Instance of a pencil brush
     */
    initialize: function(canvas) {
      this.callSuper('initialize', canvas);
      this._points = [];
    },
    getTarget: function(){
      return this.canvas.drawingContext;
    },
    onMouseUp: function() {},
    onMouseMove: function() {},
    onMouseDown: function(pointer) {
      this._fill(pointer);
    },
    _fill: function(pointer){
      pointer = {
        x: Math.floor(pointer.x),
        y: Math.floor(pointer.y)
      };

      var info = this.getTarget().getImageData(0,0,this.getTarget().canvas.width,this.getTarget().canvas.height);

      fabric.MagicWand.floodFill(info, pointer.x , pointer.y, 1,{},null,function(mask){
        var _color = this.getColor('source');
        var _target = this.getTarget();
        var _w = mask.bounds.maxX - mask.bounds.minX + 1, _h = mask.bounds.maxY - mask.bounds.minY + 1;
        var oldImageData = _target.getImageData( mask.bounds.minX,mask.bounds.minY,_w, _h);

        mask.render(_target,{
          intersectionColor : _color,
          fill : _color,
          cache: false,
          left : mask.bounds.minX,
          top : mask.bounds.minY
        });

        this.canvas.fire("draw:after",{
          target: this.getTarget() ,
          redo: _target.getImageData( mask.bounds.minX,mask.bounds.minY,_w, _h),
          undo: oldImageData ,
          left : mask.bounds.minX,
          top : mask.bounds.minY,
          color: this.getColor().slice()
        });

        this.canvas.renderAll();
      }.bind(this));
    },
    getHistoryRecord: function(event) {

      return {
        canvas:   this.canvas,
        object:   event.target ,
        type:     "draw:bucket",
        left:     event.left ,
        top:      event.top ,
        undoData: event.undo,
        redoData: event.redo,
        color:    this.convertColor(event.color,"source"  ),
        undo: function(_action){
          _action.object.putImageData(_action.undoData, _action.left,_action.top);
          _action.canvas.renderAll();
        },
        redo: function(_action){
          _action.object.putImageData(_action.redoData, _action.left,_action.top);
          _action.canvas.renderAll();
        }
      }
    }
  });

fabric.SlideCanvas.prototype.drawingTools.PaintBucketBrush = {
  icon:  'data:image/svg+xml;base64,' + __webpack_require__(19),
  title: 'Bucket Brush'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("PaintBucketBrush");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


  /**
   * PencilBrush class
   * @class fabric.PencilBrush
   * @extends fabric.BaseBrush
   */
  fabric.PaintPenBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.PencilBrush.prototype */ {
    type: 'paint-pen-brush',

    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {fabric.PencilBrush} Instance of a pencil brush
     */
    initialize: function(canvas) {
      this.callSuper('initialize', canvas);
      this._points = [];
    },
    getTarget: function(){
      return this.canvas.drawingContext;
    },
    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     */
    onMouseDown: function(pointer) {
      this._reset();
      this._fill(pointer);
    },

    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     */
    onMouseMove: function(pointer) {
      this._fill(pointer);
    },
    /**
     * Invoked on mouse up
     */
    onMouseUp: function() {
      this.canvas.fire("draw:after",{
        target: this.getTarget() ,
        points: this._points.slice() ,
        color: this.getColor('source')
      });
    },
    _fill: function(pointer){
      pointer = {
        x: Math.floor(pointer.x),
        y: Math.floor(pointer.y)
      };

      if(_.findWhere(this._points,pointer)){
        return;
      }

      // this.getTarget().fillRect(pointer.x , pointer.y  ,1,1);
      var _data = this.getTarget().getImageData(pointer.x , pointer.y  ,1,1);
      pointer.color = Array.prototype.slice.call(_data.data);
      this._points.push(pointer);
      var _color = this.getColor('source');




      _data.data[0] = _color[0];
      _data.data[1] = _color[1];
      _data.data[2] = _color[2];
      _data.data[3] = _color[3];

      this.getTarget().putImageData(_data, pointer.x , pointer.y);
      this.canvas.renderAll();
    },
    undoPaintAction: function(_action){
      var ctx = _action.object;
      for(var i in _action.points){
        var _p  =_action.points[i], _c = _action.brush.getActionColor(_p.color);
        if(_c[3] == 0) {
          ctx.clearRect(_p.x,_p.y  ,1,1);
        }else{
          ctx.fillStyle = "rgba(" + _c[0] + "," + _c[1] + "," + _c[2] + "," + _c[3] +  ")";
          ctx.fillRect(_p.x,_p.y  ,1,1);
        }
      }
      _action.canvas.renderAll();
    },
    redoPaintAction: function(_action){

      var ctx = _action.object, _c = _action.brush.getActionColor(_action.color);
      var pts = _action.points;
      if(_c[3] == 0) {
        for(var i in pts){
          ctx.clearRect(pts[i].x,pts[i].y  ,1,1);
        }
      }else{
        ctx.fillStyle = "rgba(" + _c[0] + "," + _c[1] + "," + _c[2] + "," + _c[3] + ")";
        for(var i in pts){
          ctx.fillRect(pts[i].x,pts[i].y ,1,1);
        }
      }
      _action.canvas.renderAll();
    },
    /**
     * Clear points array and set contextTop canvas style.
     * @private
     */
    _reset: function() {
      this._points.length = 0;
      this.getTarget().fillStyle = this.color;
    },
    getHistoryRecord: function(event){

      return {
        canvas:   this.canvas,
        type:     "draw:pen",
        object:   event.target ,
        points:   event.points ,
        brush:   this,
        color:    event.color,
        undo:     this.undoPaintAction,
        redo:     this.redoPaintAction
      }
    }
  });

fabric.SlideCanvas.prototype.drawingTools.PaintPenBrush = {
  className: 'fa fa-paint-brush',
  title: 'Pen Brush'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("PaintPenBrush");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.PencilBrush.prototype.initialize = function(canvas) {
  this.callSuper('initialize', canvas);
  this._points = [ ];
};
fabric.PencilBrush.prototype.type = 'pencil-brush';

fabric.PencilBrush.prototype._render = function() {
  var ctx  = this.canvas.contextTop, v = this.canvas.viewportTransform, p1 = this._points[0], p2 = this._points[1];
  ctx.save();
  ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
  ctx.beginPath();
  ctx.lineWidth = 1 / this.canvas.viewportTransform[0];
  if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
    p1.x -= 0.5 / this.canvas.viewportTransform[0];
    p2.x += 0.5 / this.canvas.viewportTransform[0];
  }
  ctx.moveTo(p1.x, p1.y);
  for (var i = 1, len = this._points.length; i < len; i++) {
    var midPoint = p1.midPointFrom(p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = this._points[i];
    p2 = this._points[i + 1];
  }
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
  ctx.restore();
};

fabric.PencilBrush.prototype.createPath = function(pathData) {
  var path = new fabric.Path(pathData, {
    stroke: this.getColor(),
    strokeWidth: this.width,
    application: this.canvas.application
  });
  if (this.shadow) {
    this.shadow.affectStroke = true;
    path.setShadow(this.shadow);
  }
  return path;
};
fabric.PencilBrush.prototype.minLength = 3;

fabric.PencilBrush.prototype.accuracy = 0;
fabric.PencilBrush.prototype._finalizeAndAddPath = function() {
  if(this._points.length < 2)return;
  var ctx = this.canvas.contextTop;
  ctx.closePath();
  this.canvas.clearContext(this.canvas.contextTop);
  if(this.accuracy){
    for(var i in this._points){
      this._points[i].x = +this._points[i].x.toFixed(this.accuracy);
      this._points[i].y = +this._points[i].y.toFixed(this.accuracy);
    }
    for(i = this._points.length - 1; i--; ){
      if(this._points[i].x == this._points[i + 1].x &&  this._points[i].y == this._points[i + 1].y){
        this._points.splice(i,1);
      }
    }
  }
  if(this._points.length < 2)return;
  var pathData = this.convertPointsToSVGPath(this._points).join('');
  if (this._points.length < this.minLength || pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
    return this.canvas.renderAll();
  }
  var path = this.createPath(pathData);
  this.canvas.add(path);
  path.setCoords();
  this._resetShadow();
  this.canvas.renderAll();
  this.canvas.fire('path:created', { path: path });
};


fabric.SlideCanvas.prototype.drawingTools.PencilBrush = {
  className: 'fa fa-pencil',
  title: 'Pencil Brush'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("PencilBrush");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.PointsBrush = fabric.util.createClass(fabric.BaseBrush, {
  type: "points-brush",
  maximumPoints : 0,
  initialize: function (canvas) {
    this.callSuper('initialize', canvas);
    this.reset();
  },
  currentPoint : 1,
  getPoints: function(){
    return fabric.util.object.where(this.canvas._objects,{type: "material-point"});
  },
  checkPosition: null,
  onMouseDown: function (pointer) {

  },
  onMouseMove: function (pointer) {
  },
  reset: function(){
  },
  onMouseUp: function (pointer) {
    var _points = this.getPoints();

    var pos = {
      left: pointer.x -0.5,
      top: pointer.y  -0.5,
    };

    var _correct = this.checkPosition ? this.checkPosition(pointer) : true ;

    if(!_correct){
      this.canvas.fire("point:rejected",{point : pointer});
      return;
    }

    if(this.maximumPoints && _points.length >= this.maximumPoints){
      if(this.currentPoint > this.maximumPoints){
        this.currentPoint = 1;
      }
      if(this.wholeCoordinates){
        pointer.x = Math.round(pointer.x) + 0.5;
        pointer.y = Math.round(pointer.y)  + 0.5;
      }

      var _obj = fabric.util.object.findWhere(_points,{number : this.currentPoint++});

      var states = {
        original : {
          left: _obj.left,
          top: _obj.top
        },
        modified:  {
          left: pointer.x - 0.5,
          top: pointer.y - 0.5
        }
      };

      _obj.set(states.modified).setCoords().fire("modified",{states: states});
      this.canvas.fire("object:modified",{target : _obj, states: states});
      this.canvas.setActiveObject(_obj);
      this.canvas.renderAll();
      return;
    }else{
      this.currentPoint = 1;
      while(fabric.util.object.findWhere(_points,{number : this.currentPoint})){
        this.currentPoint++;
      }
    }

    var _obj = new fabric.MaterialPoint({
      number: this.currentPoint ,
      application: this.canvas.application,
      left: pos.left,
      top: pos.top
    });

    this.currentPoint++;
    this.canvas.add(_obj);
    this.canvas.fire("point:created",{point : _obj})
    this.canvas.setActiveObject(_obj);
    this.canvas.renderAll();
  },
  _render: function () {
  }
});

fabric.SlideCanvas.prototype.drawingTools.PointsBrush = {
  className: 'fa fa-circle-o',
  title: 'Points Brush'
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


  /**
   * PencilBrush class
   * @class fabric.RectangleBrush
   * @extends fabric.BaseBrush
   */
  fabric.PolygonBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.RectangleBrush.prototype */ {
    resultObjectType: "Polyline",
    type: "polygon-brush",
    virtualObject: false,
    maximumPoints : 0,
    individualDrawing: true,
    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {fabric.RectangleBrush} Instance of a pencil brush
     */
    initialize: function (canvas) {
      this.callSuper('initialize', canvas);
      this.reset();
    },
    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     */
    onMouseDown: function (pointer) {


      if(this.individualDrawing || !this.target){
        var _point = {x: pointer.x, y: pointer.y};
        this.points.push(_point);
        if(!this.virtualObject){
          this.target = this.canvas.createObject(
            fabric.util.object.extend({},
              this.resultObjectProperties, {
                type: this.resultObjectType,
                points: [_point],
                active: true
              }
            )
          );
        }
      }else{
        this._create_active_point(pointer);
      }

      if(this.virtualObject) {
        this._setBrushStyles();
        this._setShadow();
        this._render();
      }else{
        this.canvas.renderAll();
      }
    },

    _create_active_point: function (pointer) {
      var _point = {x: pointer.x, y: pointer.y};
      this.activePoint =  _point;
      this.activeTargetPoint =  {x: pointer.x - this.target.left, y : pointer.y - this.target.top};
      this.points.push(this.activePoint);
      this.target.addPoint(this.activeTargetPoint);
    },
    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     */
    onMouseMove: function (pointer) {


      var _p =  {x: pointer.x - this.target.left, y : pointer.y - this.target.top};


      if(this.activePoint){
        this.activePoint.x = pointer.x;
        this.activePoint.y = pointer.y;
        var _order = this.target.points.length ;

        this.target.setPoint("p" + _order, {
          x : pointer.x - this.target.left,
          y : pointer.y - this.target.top
        });
      }else{
        var _dist = fabric.Point.prototype.distanceFrom.call(this.points[0],_p)
        if(_dist > 10){
          this._create_active_point(pointer);
        }
      }
      this.canvas.renderAll();
    },
    reset: function(){
      this.points = [];
      this.target = null;
      this.activePoint = null;
      this.activeTargetPoint = null;
    },
    /**
     * Invoked on mouse up
     */
    onMouseUp: function () {
      this.target.updateBbox();
      if(this.points.length == this.maximumPoints){
        this.reset();
      }
      this.activePoint = null;
      this.canvas.renderAll();
    },

    /**
     * Draw a smooth path on the topCanvas using quadraticCurveTo
     * @private
     */
    _render: function () {
      this.canvas.fire("before:brush:render",{target: this});

      var ctx = this.canvas.contextTop,
        v = this.canvas.viewportTransform;

      ctx.save();
      ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);

      var _klass_proto = fabric[this.resultObjectType].prototype;

      ctx.lineWidth = _klass_proto.strokeWidth;
      ctx.strokeStyle = _klass_proto.stroke;
      ctx.fillStyle = _klass_proto.fill;

      ctx.beginPath();
      ctx.moveTo(this.points[0].x,this.points[0].y);
      for(var i = 1; i < this.points.length; i++){
        ctx.lineTo(this.points[i].x,this.points[i].y)
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      this.canvas.fire("brush:render",{target: this})
    },
    drawingLimits: null, /*{
      left: 0,
      width: 0,
      height: 0,
      top: 0
    },*/
    minHeight: 50,
    minWidth: 50,
    _checkRectangle: function(_rect){


      var dl = this.drawingLimits;
      if(dl && dl == "backgroundImage"){
        dl= this.canvas.backgroundImage;
      }

      _rect = {
        left: _rect.left,
        top: _rect.top,
        width: _rect.width,
        height: _rect.height,
      };

      _rect.left  -= fabric.Rect.prototype.strokeWidth / 2;
      _rect.top   -= fabric.Rect.prototype.strokeWidth / 2;

      if(dl){
        if(_rect.left + _rect.width < dl.left ||
          _rect.top  + _rect.height < dl.top ||
          _rect.left > dl.width ||
          _rect.top > dl.height){
          return false;
        }

        if(_rect.top < dl.top){
          _rect.height +=_rect.top ;
          _rect.top = dl.top;
        }
        if(_rect.left < dl.left){
          _rect.width += _rect.left;
          _rect.left = dl.left;
        }
      }

      if(this.minWidth && _rect.width < this.minWidth){
        _rect.width = this.minWidth;
      }
      if(this.minHeight && _rect.height < this.minHeight){
        _rect.height = this.minHeight;
      }


      if(dl) {
        var _xdiff = _rect.left + _rect.width - dl.width;
        if (_xdiff > 0) {
          _rect.width -= _xdiff;
          if (this.minWidth && _rect.width < this.minWidth) {
            _rect.left -= this.minWidth - _rect.width;
            _rect.width = this.minWidth;
          }
        }
        var _ydiff = _rect.top + _rect.height - dl.height;
        if (_ydiff > 0) {
          _rect.height -= _ydiff;
          if (this.minHeight && _rect.height < this.minHeight) {
            _rect.top -= this.minHeight - _rect.height;
            _rect.height = this.minHeight;
          }
        }
      }
      return _rect;
    },
    resultObjectProperties: {}
  });


fabric.SlideCanvas.prototype.drawingTools.PolygonBrush = {
  icon: 'data:image/png;base64,'+ __webpack_require__(20),
  title: 'Polygon Brush'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("PolygonBrush");



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
 * PencilBrush class
 * @class fabric.RectangleBrush
 * @extends fabric.BaseBrush
 */
fabric.RectangleBrush = fabric.util.createClass(fabric.BaseBrush, /** @lends fabric.RectangleBrush.prototype */ {
  resultObjectType: "Rect",
  type: "rectangle-brush",
  /**
   * Constructor
   * @param {fabric.Canvas} canvas
   * @return {fabric.RectangleBrush} Instance of a pencil brush
   */
  initialize: function (canvas) {
    this.callSuper('initialize', canvas);
  },

  /**
   * Inovoked on mouse down
   * @param {Object} pointer
   */
  onMouseDown: function (pointer) {
    //prepare for drawing
    delete this.p2;

    this.p1 = new fabric.Point(pointer.x, pointer.y);
    this._setBrushStyles();
    this._setShadow();
    this.canvas.contextTop.moveTo(this.p1.x, this.p1.y);
    this._render();
  },

  /**
   * Inovoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove: function (pointer) {

    this.p2 = new fabric.Point(pointer.x, pointer.y);

    if(this.drawingObject){
      var _rect = this._getRect();
      this.drawingObject.set(_rect);
      this.drawingObject.fire("scaling");
    }else{

      if (this.p1.x === this.p2.x && this.p1.y === this.p2.y) {
        delete this.p2;
      } else {

        if(this.resultObjectType){
          var _rect = this._getRect();
          this.drawingObject = this._createRectangle(_rect);
        }
      }
    }
    this.canvas.renderLayer("lower");
  },

  /**
   * Invoked on mouse up
   */
  onMouseUp: function () {
    if(this.drawingObject){
      var _rect = this._getRect();
      var _rect2 = this._checkRectangle(_rect);

      this.canvas.layers.lower.objects.splice(this.canvas.layers.lower.objects.indexOf(this.drawingObject), 1);

      this.drawingObject.set(_rect2);
      this.canvas.add(this.drawingObject);
      this.canvas.setActiveObject(this.drawingObject);
      this.drawingObject.setCoords();
      delete this.drawingObject;
    }
    this.canvas.renderAll();
    // this._finalizeAndAddPath();
  },

  /**
   * Draw a smooth path on the topCanvas using quadraticCurveTo
   * @private
   */
  _render: function () {
    this.canvas.fire("before:brush:render",{target: this})
    if (!this.p2) {
      return;
    }
    var ctx = this.canvas.contextTop,
      v = this.canvas.viewportTransform,
      p1 = this.p1,
      p2 = this.p2;

    ctx.save();
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    ctx.beginPath();
    if(this.application){
      var _klass_proto = this.application.getDefaultProperties(fabric[this.resultObjectType].prototype) || {};
      ctx.lineWidth = _klass_proto.strokeWidth;
      ctx.strokeStyle = _klass_proto.stroke;
      ctx.fillStyle = _klass_proto.fill;
    }

    var _rect = this._getRect();
    ctx.rect(_rect.left, _rect.top, _rect.width, _rect.height);

    ctx.fill();
    ctx.stroke();
    ctx.restore();
    this.canvas.fire("brush:render",{target: this})
  },
  _getRect: function () {

    var x1, x2, y1, y2;
    if (this.p1.x < this.p2.x) {
      x1 = this.p1.x, x2 = this.p2.x;
    } else {
      x2 = this.p1.x, x1 = this.p2.x;
    }
    if (this.p1.y < this.p2.y) {
      y1 = this.p1.y, y2 = this.p2.y;
    } else {
      y2 = this.p1.y, y1 = this.p2.y;
    }
    return {
      left: x1,
      top: y1,
      width: x2 - x1,
      height: y2 - y1
    };
  },
  drawingLimits: null, /*{
   left: 0,
   width: 0,
   height: 0,
   top: 0
   },*/
  minHeight: 50,
  minWidth: 50,
  _checkRectangle: function(_rect){


    var dl = this.drawingLimits;
    if(dl && dl == "backgroundImage"){
      dl= this.canvas.backgroundImage;
    }

    _rect = {
      left: _rect.left,
      top: _rect.top,
      width: _rect.width,
      height: _rect.height,
    };

    // _rect.left  -= fabric.Rect.prototype.strokeWidth / 2;
    // _rect.top   -= fabric.Rect.prototype.strokeWidth / 2;

    if(dl){
      if(_rect.left + _rect.width < dl.left ||
        _rect.top  + _rect.height < dl.top ||
        _rect.left > dl.width ||
        _rect.top > dl.height){
        return false;
      }

      if(_rect.top < dl.top){
        _rect.height +=_rect.top ;
        _rect.top = dl.top;
      }
      if(_rect.left < dl.left){
        _rect.width += _rect.left;
        _rect.left = dl.left;
      }
    }

    if(this.minWidth && _rect.width < this.minWidth){
      _rect.width = this.minWidth;
    }
    if(this.minHeight && _rect.height < this.minHeight){
      _rect.height = this.minHeight;
    }


    if(dl) {
      var _xdiff = _rect.left + _rect.width - dl.width;
      if (_xdiff > 0) {
        _rect.width -= _xdiff;
        if (this.minWidth && _rect.width < this.minWidth) {
          _rect.left -= this.minWidth - _rect.width;
          _rect.width = this.minWidth;
        }
      }
      var _ydiff = _rect.top + _rect.height - dl.height;
      if (_ydiff > 0) {
        _rect.height -= _ydiff;
        if (this.minHeight && _rect.height < this.minHeight) {
          _rect.top -= this.minHeight - _rect.height;
          _rect.height = this.minHeight;
        }
      }
    }
    return _rect;
  },
  _createRectangle: function(rect){
    this.canvas.setActiveObject(false);
    rect.active = true;
    rect.application = this.application;
    rect.canvas = this.canvas;
    var _object = fabric.util.createObject(this.resultObjectType,rect);
    this.canvas.layers.lower.objects.push(_object);
    _object.updateResponsiveBorder();
    this.canvas.renderAll();
    return _object;
  }

  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create an new fabric rect object
   * and add it to the fabric canvas.
   */
  // _finalizeAndAddPath: function () {
  //
  //   if (!this.p2) {
  //     return false;
  //   }
  //   var ctx = this.canvas.contextTop;
  //   ctx.closePath();
  //
  //
  //   this.canvas.clearContext(this.canvas.contextTop);
  //   this._resetShadow();
  //
  //   // var _rect = this._getRect();
  //   var _rect2 = this._checkRectangle(_rect);
  //   if(_rect2){
  //     // if(this.resultObjectType){
  //     //   this._createRectangle(_rect2);
  //     // }
  //     this.canvas.fire('rect:created', {rect: _rect2, original: _rect});
  //   }else{
  //     this.canvas.fire('rect:rejected', {rect: _rect});
  //   }
  //   this.canvas.renderLayer(this.layers.lower);
  // }
});


fabric.SlideCanvas.prototype.drawingTools.RectangleBrush = {
  className: 'fa fa-pencil-square',
  title: 'select-brush'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("RectangleBrush");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

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
  optionsOrder: [
    "canvasContainer",
    "*",
    "objects",
    "slide"
  ],
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
          this.fire("ready");
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


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {/**
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



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.Slide = function(application, slide){


  if(fabric.isLikelyNode){
    // fabric.Canvas = fabric.SlideCanvas;
    var w = slide.slideWidth; //todo|| slide.template.width;
    var h = slide.slideHeight;//todo || slide.template.height;
    var zoom = fabric.SlideCanvas.prototype.zoom || 1;
    this.canvas = fabric.createCanvasForNode(w * zoom,h * zoom);
  }else{
    this.canvas =  new fabric.SlideCanvas({application: application, interactive: false});
  }

  this.object = slide;
 // this.data = slide.data;
  this.application = application;
  this.id = ++ fabric.Slide._slides_id_counter;
};

fabric.Slide.prototype = fabric.util.object.extend({},fabric.Observable,{
  title : 'Новый Слайд'
});

fabric.Slide._slides_id_counter = 1;


fabric.util.object.extend(fabric.Application.prototype, {
  defaultOptions: fabric.util.object.extend(fabric.Application.prototype.defaultOptions,{
    activeSlide: 0
  }),
  optionsOrder: (function(){
    var oo = fabric.Application.prototype.optionsOrder;
    oo.push("activeSlide","slides");
    return oo;
  })(),
  activeSlide: 0,
  /*initialize: function (options) {

   fabric.util.object.extend(this, {
   last_id: 1,
   scaleValue: 1,
   activeSlide: null,
   history: null,
   slides: [],
   canvas: null
   });

   this.aligmentLineX = false;
   this.aligmentLineY = false;

   fabric.util.object.extend(this,options);
   fabric.util.object.defaults(options,this.defultOptions);

   // this.setAccess(this.access);

   if(options.gridsnapper !== undefined) {
   this.gridsnapper = options.gridsnapper
   }
   if(options.history !== undefined) {
   this.history = options.history;
   }
   if(options.data){
   this.data = options.data;
   }
   if(this.history) {
   this.history = new History(this);
   this.history.application = this.application;
   }


   if(options.canvas){
   var _canvas = new fabric.SlideCanvas(document.getElementById(options.canvas));
   _canvas.application = this.application;
   _canvas.project = this;
   this.setCanvas(_canvas);
   }

   return this;
   },*/
  setSlides: function (slides) {
    slides = fabric.util.object.cloneDeep(slides);
    this.slides = [];

    if (this.canvas) {
      this.canvas._objects.length = 0;
    }

    slides.forEach(function(slide){
      this.addSlide(slide)
    }.bind(this));

    this.preload();
    this.lazyLoad();
  },
  setActiveSlide: function(slideId){
    // console.log("@#");
    return;

    if(this.canvas.processing)return;
    if(this.activeSlide === slide)return;

    this.fire("slide:change:begin", {canvas: this.canvas});
    if(this.activeSlide) {
      delete this.activeSlide.canvas.mirrorSlide;
    }

    this.processing =true;
    if (this.unloadUnactiveSlides && this.canvas && this.activeSlide) {
      delete this.activeSlide.canvas;
      this.activeSlide.fire("canvas:changed",{canvas: null});
      this.activeSlide.data = this.canvas.toObject();
      this.canvas.clear();
    }
    this.activeSlide = slide;
    this.activeSlide.canvas.mirrorSlide = this.canvas;



    var _this = this;
    this.canvas.processing = true;

    if(this.activeSlide.canvas.loaded){
      _this.canvas.mirror(_this.activeSlide.canvas);
      _this.canvas.processing = false;
      _this.canvas.renderAll();
      _this.fire("slide:changed", {canvas: _this.canvas});
      _this.lazyLoad();
    }else{

      // _this.canvas.fire("loading:begin",{type:"current" , target: _this.canvas});
      this.activeSlide.canvas.load(slide.object, function () {
        _this.canvas.mirror(_this.activeSlide.canvas);
        _this.canvas.processing = false;
        _this.canvas.renderAll();
        _this.fire("slide:changed", {canvas: _this.canvas});
        // _this.canvas.fire("loading:end",{type:"current" , target: _this.canvas});
        _this.lazyLoad();
      });
    }
  },
  unloadUnactiveSlides: false,
  lazyLoadEnabled: true,
  lazyLoad: function(){

    var app = this;
    if(this.lazyLoadEnabled){
      this.slides.forEach(function(slide){
        if(!slide.canvas.loaded && !slide.canvas.processing){
          slide.canvas.load(slide.object,function(){
            slide.fire("loaded");
            if(app.activeSlide == slide.id){
              this.setActiveSlide(slide);
            }

            app.fire("slide:loading:end", {target: this});

            for(var _s in app.slides){
              if(!app.slides[_s].canvas.loaded){
                return;
              }
            }
            app.fire("loading:end", {});
          }.bind(slide));
        }
      });
    }else{
      app.fire("loading:end",{});
    }
  },
  addSlide: function (options) {
    var slide = new fabric.Slide(this, options);
    this.slides.push(slide);
    return slide;
  },
  removeSlide: function (slide) {
    var _s = this.slides;
    var _curPos = _s.indexOf(slide);
    _s.splice(_curPos, 1);

    if(slide == this.activeSlide){
      delete this.activeSlide ;
    }
  },
  /**
   * move slide to another position
   * @param slide
   * @param newPosition
   */
  moveSlide: function (slide,newPosition) {
    var _s = this.slides;

    var _curPos = _s.indexOf(slide);
    newPosition = parseInt(newPosition);

    if (_curPos < newPosition) {
      _s.splice(_curPos, 1);
      _s.splice(newPosition,0, slide);
    } else {
      _s.splice(_curPos, 1);
      _s.splice(newPosition, 0, slide);
    }
  },
  /**
   * replace slide
   * @param slide
   * @param newPosition - position of the second slide
   */
  replaceSlide: function (slide,newPosition) {
    var _s = this.slides;
    var _replacedSlide = _s[newPosition];
    var _curPos = _s.indexOf(slide);
    if (_curPos < newPosition) {
      _s.splice(newPosition, 1, slide);
      _s.splice(_curPos, 1, _replacedSlide);
    } else {
      _s.splice(_curPos, 1, _replacedSlide);
      _s.splice(newPosition, 1, slide);
    }
  },

  preload: function(){
    for(var i in this.slides) {
      var _slide = this.slides[i];
      // _slide.canvas.preload(_slide.object, function () {
      //   _slide.fire("modified");
      // });
    }
  },

  setActiveSlideByIndex: function(index){
    this.setActiveSlide(this.slides[index])
  },
  setActiveSlideById: function(id){
    this.setActiveSlide(  fabric.util.object.findWhere(this.slides,{id: id}));
  },
  duplicateSlide: function (slideData) {
    slideData = slideData.canvas.toObject();
    var _slide = this.addSlide(slideData);
    _slide.canvas.load(_slide.object);
  },

  nextSlide: function () {
    var i = this.slides.indexOf(this.activeSlide);
    if (i < this.slides.length - 1) {
      this.setActiveSlide(i + 1);
    }
  },
  prevSlide: function () {
    var i = this.slides.indexOf(this.activeSlide);
    if (i > 0) {
      this.setActiveSlide(i - 1);
    }
  },
  gotoSlide: function (slide) {
    this.setActiveSlide(slide - 1);
  },
  nextSlideAvailable: function () {
    var i = this.slides.indexOf(this.activeSlide);
    return i < this.slides.length - 1
  },
  prevSlideAvailable: function () {
    var i = this.slides.indexOf(this.activeSlide);
    return i > 0
  },

});


fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  /**
   * Copy the content of active slide to main canvas.
   * @param slide
   */
  mirror: function (slide) {
    this.discardActiveGroup();
    this.discardActiveObject();
    // this.slideWidth = slide.slideWidth;
    // this.slideHeight = slide.slideHeight;
    this.setOriginalSize({width: slide.originalWidth || slide.width, height: slide.originalHeight || slide.height})
    this.backgroundImage = slide.backgroundImage;

    if(this.resizable) {
      this.originalWidth  = slide.originalWidth;
      this.originalHeight  = slide.originalHeight ;
    }else{
      this.setWidth((slide.originalWidth || slide.width)* this.viewportTransform[0]);
      this.setHeight((slide.originalHeight || slide.height)  * this.viewportTransform[0]);
    }
    this._onResize();
    this.activeArea = slide.activeArea;
    this.originalSlide = slide;

    this.template = slide.template;
    this.offsets = slide.offsets;
    // this._objects = [];
    // this.layers = slide.layers;

    if(this.backgroundImage){
      this.backgroundImage.canvas = this;
    }
    //todo
    // if(this._backgroundLayer) {
    //   for (var i in this._backgroundLayer) {
    //     this._backgroundLayer[i].canvas = this;
    //     this._backgroundLayer[i].setCoords();
    //   }
    //   this.setActiveArea(true);
    // }cd fier

    for(var layerName in slide.layers) {
      this.layers[layerName].objects = [];
    }
    this._objects = this.layers.lower.objects;

    if(slide.layers) {
      for(var layerName in slide.layers){
        for (var i in slide.layers[layerName].objects) {
          this.add(slide.layers[layerName].objects[i]);
        }
        slide.layers[layerName].objects = this.layers[layerName].objects;
      }
      slide._objects = this._objects;
    }else{
      if(slide._objects) {
        for (var i in slide._objects) {
          this.add(slide._objects[i]);
        }
      }
      slide._objects = this._objects;
    }
    var _this = this;
    slide.on('object:added',function(e){
      _this.add(e.target);
    });
    this.fire('changed', {target: slide})
  },
  project: null,
  unique: false,
  required: false,
  stateProperties: ["unique","required"],
  removeSlide: function(){
    this.project.removeSlide(this)
  },
  duplicateSlide: function(){
    this.project.duplicateSlide(this)
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {


if(!Object.values){
  Object.defineProperty(Object, 'values', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(_object) {
      var _values = [];
      Object.keys(_object).forEach(function (key) {
        _values.push(_object[key]);
        // use val
      });
      return _values;
    }
  });
}


fabric.util.object.extend(fabric,{
  errors: []
});

fabric.util.order = function(_array,context ){
  (function _call(){
    if(!_array.length)return;
    var foo = _array.shift();
    if(foo){
      if(foo.length){
        foo.call(context,_call);
      }else{
        foo.call(context);
        _call();
      }
    }else{
      _call();
    }
  })()
};

fabric.util.promise = {
  map: function (data, foo) {

    if(data.constructor == Array){
      return Promise.all(data.map(foo))
        .then(function (results, error) {
          if (error) {
            return Promise.reject(error);
          }
          return Promise.resolve(results);
        })
    }

    var keys = Object.keys(data);
    var urls = Object.values(data);
    return Promise.all(urls.map(foo))
      .then(function (results, error) {
        if (error) {
          return Promise.reject(error);
        }
        var _map = {};

        for(var i = 0 ; i < results.length; i++){
          _map[keys[i]] = results[i];
        }
        return Promise.resolve(_map);
      })
  },
  wrap: function (context) {
    return function wrap(foo) {
      return function () {
        var options = Array.prototype.slice.call(arguments,1);
        if (!foo.length) {
          return new Promise(function (resolve, fail) {
            var _result = foo.call(context);
            (_result || _result === undefined) ? resolve() : fail();
          });
        } else {
          return new Promise(foo.bind(context));
        }
      }
    }
  }
};

fabric.Object.prototype.set = function(key, value) {
  if (typeof key === 'object') {
    this._setObject(key, value);
  }
  else {
    if (typeof value === 'function' && key !== 'clipTo') {
      this._set(key, value(this.get(key)));
    }
    else {
      this._set(key, value);
    }
  }
  return this;
};

fabric.Object.prototype._setObject = function(options,callback) {
  var keys = Object.keys(options);
  if(this.optionsOrder){
    var middleIndex = this.optionsOrder.indexOf("*") || -1;

    var i = middleIndex, prop , keyIndex;

    while((prop = this.optionsOrder[--i])){
      if((keyIndex = keys.indexOf(prop)) !== -1){
        keys.splice(keyIndex, 1);
        keys.unshift(prop);
      }
    }
    i = middleIndex;
    while(prop = this.optionsOrder[++i]){
      if((keyIndex = keys.indexOf(prop)) !== -1){
        keys.splice(keyIndex, 1);
        keys.push(prop);
      }
    }

  }
  for (var i = 0; i < keys.length; i++) {
    var prop = keys[i];
    if(typeof options[prop] == "function"){
      keys.splice(i, 1);
      keys.unshift(prop);
    }
  }
  var queue;
  for (var i in keys) {
    var _key = keys[i];
    if(options[_key] === undefined || options[_key] === null)continue;
    var _fooName = "set" + fabric.util.string.capitalize(_key, true);
    if(this[_fooName] && this[_fooName].name && this[_fooName].name != "anonymous"){
      if(this[_fooName].length == 2){
        if(!queue){
          queue = fabric.util.queueLoad(2,callback);
        }else{
          queue.total ++;
        }
        this[_fooName](options[_key],function(_key){
          queue();
        }.bind(this,_key));
      }else{
        this[_fooName](options[_key])
      }
    } else {
      this.__set(_key, options[_key]);
    }
  }
  if(queue){
    queue()
  }else if(callback ){
    callback();
  }
};

var _get_pointer_overwritten = fabric.Canvas.prototype.getPointer;

fabric.util.object.extend(fabric.Canvas.prototype, {
  setWidth: function (value) {
    return this.setDimensions({ width: value }, {});
  },
  setHeight: function (value) {
    return this.setDimensions({ height: value }, {});
  },
  /**
   * @private
   */

  _setObject: fabric.Object.prototype._setObject,
  originalState: {},
  stateProperties: [],
  editingObject: null,
  getObjectByID: function(_id){
    var layers = this.layers || [{objects: this._objects}];
    for (var i in layers) {
      for (var j in layers[i].objects) {
        if (layers[i].objects[j].id === _id) {
          return layers[i].objects[j];
        }
      }
    }
    return null;
  },
  /*
   Add Custom Object Tranformations
   */
  getPointer: function (e, ignoreZoom, upperCanvasEl) {
    var pointer = _get_pointer_overwritten.call(this, e, ignoreZoom, upperCanvasEl);
    if (e._group) {
      return this._normalizePointer(e._group, pointer);
    }
    return pointer;
  },
  __set : fabric.Object.prototype._set,
  getModifiedStates: function (target) {
    var states = {
      original: {},
      modified: {}
    };
    for (var prop in target.originalState) {
      if (target.originalState[prop] !== target[prop]) {
        if(target.originalState[prop] instanceof Object){
          if(JSON.stringify(target.originalState[prop]) == JSON.stringify(target[prop])){
            continue;
          }
        }
        states.original[prop] = target.originalState[prop];
        states.modified[prop] = target[prop];
      }
    }
    return states;
  },
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
  },
  fireModifiedIfChanged: function (target) {
    if (this.stateful) {
      var _states = target.hasStateChanged();
      if(_states){
        this.fire('object:modified', {target: target , states: _states});
        target.fire('modified',{states: _states});
      }
    }
  },
  // _set: function (key, value,callback) {
  //   if (this.specialProperties.indexOf(key) !== -1) {
  //     this["set" + fabric.util.string.capitalize(key, true)](value,callback);
  //   } else {
  //     fabric.Object.prototype._set.call(this, key, value);
  //   }
  //   return this;
  // },
  get: fabric.Object.prototype.get,
  set: fabric.Object.prototype.set,
  hasStateChanged: fabric.Object.prototype.hasStateChanged,
  /** Creates a bottom canvas
   * @private
   * @param {HTMLElement} [canvasEl]
   */
  _createLowerCanvas: function (canvasEl) {
    if (typeof canvasEl == "string") {
      this.lowerCanvasEl = fabric.util.getById(canvasEl) || this._createCanvasElement();
    } else if (canvasEl) {
      this.lowerCanvasEl = canvasEl;
    } else {
      this.virtual = true;
      this.lowerCanvasEl = fabric.util.createCanvasElement();
    }

    this._initCanvasElement(this.lowerCanvasEl);

    fabric.util.addClass(this.lowerCanvasEl, 'lower-canvas');

    if (this.interactive) {
      this._applyCanvasStyle(this.lowerCanvasEl);
    }

    this.contextContainer = this.lowerCanvasEl.getContext('2d');
  },
  findTarget: function (e, skipGroup) {
    if (this.skipTargetFind) {
      return;
    }

    var ignoreZoom = true,
      pointer = this.getPointer(e, ignoreZoom),
      activeGroup = this.getActiveGroup(),
      activeObject = this.getActiveObject();
    if (activeGroup && !skipGroup && this._checkTarget(pointer, activeGroup)) {
      return activeGroup;
    }

    if (activeObject && this._checkTarget(pointer, activeObject)) {
      //added visceroid
      this._fireOverOutEvents(activeObject, e);
      return activeObject;
    }

    this.targets = [ ];

    var target = this._searchPossibleTargets(this._objects, pointer);
    this._fireOverOutEvents(target, e);
    return target;
  }
});

fabric.util.object.extend(fabric.Object.prototype, {
  setAngle: function(angle) {
    this.angle = angle;
  },
  __set : fabric.Object.prototype._set,
  get : fabric.Object.prototype.get,
  _set: function (key, value ,callback) {
    var _fooName = "set" + fabric.util.string.capitalize(key, true);
    if(this[_fooName]  && this[_fooName].name && this[_fooName].name != "anonymous"){
      // if (this.specialProperties.indexOf(key) !== -1) {
      // if(this[_fooName]){
      this[_fooName](value,callback);
    }else{
      this.__set(key, value);
    }
    return this;
  },
  disable: function () {
    this.set({
      selectable: false,
      evented: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true
    });
  },
  stored: true,
  /**
   * Saves state of an object
   * @param {Object} [options] Object with additional `stateProperties` array to include when saving state
   * @return {fabric.Object} thisArg
   */
  saveState: function(options) {
    this.stateProperties.forEach(function(prop) {
      var _val = this.get(prop);
      if(_val instanceof Object){
        this.originalState[prop] = fabric.util.object.cloneDeep(_val);
      }else{
        this.originalState[prop] = _val;
      }
    }, this);

    if (options && options.stateProperties) {
      options.stateProperties.forEach(function(prop) {
        this.originalState[prop] = this.get(prop);
      }, this);
    }
    return this;
  },
  hasStateChanged: function() {
    var modified = 0;
    var states = {
      original: {},
      modified: {}
    };
    for (var prop in this.originalState) {
      if (this.originalState[prop] !== this[prop]) {
        if(this.originalState[prop] instanceof Object){
          if(JSON.stringify(this.originalState[prop]) == JSON.stringify(this[prop])){
            continue;
          }
        }
        states.original[prop] = this.originalState[prop];
        states.modified[prop] = this[prop];
        modified++;
      }
    }
    return modified && states;
  }
});

fabric.util.getProportions = function (photo, container, mode) {
  mode = mode || 'fit';
  var _w = photo.naturalWidth || photo.width;
  var _h = photo.naturalHeight || photo.height;
  if (!container.height && !container.width) {
    return {
      scale: 1,
      width: _w,
      height: _h
    };
  }
  if (!photo.height && !photo.width) {
    return {
      scale: 0.001,
      width: container.width,
      height: container.height
    };
  }

  // var _asp = _w / _h, _c_asp = container.width / container.height;

  // if (_asp > _c_asp) {
  //   _h = container.height;
  //   _w = _h * _asp;
  //
  // } else {
  //   _w = container.width;
  //   _h = _w / _asp;
  // }
  // var scaleX = container.width / _w;
  // var scaleY = container.height / _h;
  var scaleX = container.width && container.width / _w || 999;
  var scaleY = container.height && container.height / _h || 999;

  var scale;
  if (mode === 'cover') {
    scale = Math.max(scaleX, scaleY);
  }
  if (mode === 'fit') {
    scale = Math.min(scaleX, scaleY);
  }
  if (mode === 'center') {
    scale = 1;
  }
  return {
    scale: scale,
    width: Math.floor(_w * scale),
    height: Math.floor(_h * scale)
  };
};

fabric.util.Utf8ArrayToStr = function(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c);
      break;
      case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
};

fabric.util.createObject = function (type, options, callback) {
  if(typeof type !== "string"){
    callback = options;
    options = type;
    type = null;
  }else{
    options.type = type;
  }
  var app = options.application;
  app && app.fire("entity:load",{options: options});

  var _klassName = fabric.util.string.camelize(fabric.util.string.capitalize(type || options.type || app.prototypes.Object.type,true));
  var _klass = fabric[_klassName] || app.klasses[_klassName];


  if(!_klass){
    console.error(_klassName + " is undefined");
    return callback(new fabric.Rect(options))
  }

  var el = _klass.fromObject(options, function (el) {
    callback && callback(el);
    callback = null;
  });
  if (el) {
    callback && callback(el);
    callback = null;
  }
  return el;
};

fabric.util.dataURItoBlob = function (dataURI, dataTYPE) {
  var binary = atob(dataURI.split(',')[1]), array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: dataTYPE});
};

fabric.util.blobToDataURL = function (blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
};

fabric.util.createCanvasElementWithSize = function (size) {
  var canvas = fabric.util.createCanvasElement();
  canvas.width = size.width;
  canvas.height = size.height;
  return canvas;
};

fabric.util.string.toDashed = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

fabric.util.string.uncapitalize = function(string){
  return string.charAt(0).toLowerCase() +
    (string.slice(1));
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {var _GroupRemoveNetive = fabric.Group.prototype.remove;

fabric.util.object.extend(fabric.Group.prototype, {
  /**
   * Removes object from canvas to which it was added last
   * @return {fabric.Object} thisArg
   * @chainable
   */
  remove: function () {
    if (arguments.length === 0) {
      this.canvas && this.canvas.remove(this);
    } else {
      _GroupRemoveNetive.apply(this, arguments);
    }

    return this;
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
__webpack_require__(7);

fabric.util.object.extend(fabric.Image.prototype,fabric.ImageMixin, {
  async: true,
  toObjectNative: fabric.Image.prototype.toObject,
  toObject:     function(){
    var obj = fabric.Image.prototype.toObjectNative.apply(this,arguments);
    if(obj.src.indexOf(fabric.util.mediaRoot) == 0){
      obj.src = obj.src.replace(fabric.util.mediaRoot,"");
    }
    return obj;
  },
  initialize: function (element, options, callback) {
    options || (options = {});
    this.filters = [];
    this.resizeFilters = [];


    if (options.originalSrc) {
      this._edited = true;
      fabric.util.loadImage(options.originalSrc, function (img) {
        this._originalElement = img;
      }.bind(this));
    }

    this._initElement(element, options, callback && function () {
        fabric.Object.prototype.initialize.call(this, options, callback);
      }.bind(this));//adding callback
  },

  _initElement: function (element, options, callback) {
    this.setElement(fabric.util.getById(element), callback, options);
    fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS);
  },
  /**
   * Sets crossOrigin value (on an instance and corresponding image element)
   * @return {fabric.Image} thisArg
   * @chainable
   */
  setCrossOrigin: function (value) {
    this.crossOrigin = value;
    if (this._element) {
      this._element.crossOrigin = value;
    }
    return this;
  },
  setElement: function (element, callback, options) {

    var _callback, _this;

    this._element = element;
    this._originalElement = element;
    this._initConfig(options);
    // this.setOptions(options );
    // this._setWidthHeight(this);
    // if (this._element && this.crossOrigin) {
    //   this._element.crossOrigin = this.crossOrigin;
    // }


    if (this.resizeFilters.length === 0) {
      _callback = callback;
    }
    else {
      _this = this;
      _callback = function () {
        _this.applyFilters(callback, _this.resizeFilters, _this._filteredEl || _this._originalElement, true);
      };
    }

    if (this.filters.length !== 0) {
      this.applyFilters(_callback);
    }
    else if (_callback) {
      _callback(this);
    }
    this.canvas.renderAll();
    return this;
  },
  actions : {
    source: {
      type: 'effect',
      className: 'fa fa-file-image-o',
      title: "source",
      actionParameters: function ($el, data) {
        data.target.application.createGallery(data.target, $el);
      }
    }
  }
});

fabric.util.initFilters = function (img, object, callback) {

  // if (fabric.version >= 1.6) {
  fabric.Image.prototype._initFilters.call(object, object.filters, function (filters) {
    object.filters = filters || [];
    fabric.Image.prototype._initFilters.call(object, object.resizeFilters, function (resizeFilters) {
      object.resizeFilters = resizeFilters || [];
      callback(img, object);
    });
  });
  // } else {
  //   fabric.Image.prototype._initFilters.call(object, object, function (filters) {
  //     object.filters = filters || [];
  //     callback(img, object);
  //   });
  // }
};

fabric.util.initImageAndFilters = function (object, callback) {
  if (object.image) {
    var img = object.image;
    delete object.src;
    delete object.image;
    fabric.util.initFilters(img, object, callback);
  }else if (object.src) {
    fabric.util.loadImage(object.src, function (img) {
      //delete object.src;
      fabric.util.initFilters(img, object, callback);
    }, null, object.crossOrigin);
  } else {
    fabric.util.initFilters(null, object, callback);
  }
};

fabric.Image.fromObject = function (object, callback) {
  fabric.util.initImageAndFilters(object, function (img, object) {
    var instance = new fabric.Image(img, object, callback);
  })
};


fabric.Image.prototype._to_object_overwritten = fabric.Image.prototype.toObject;
fabric.Image.prototype.setSrc = function (opt) {
  console.log(opt);
};

fabric.Image.prototype.toObject = function (opt) {
  var obj = fabric.Image.prototype._to_object_overwritten.call(this, opt);


  if (this._edited) {
    obj.originalSrc = this._original_src || this._originalElement.src || this._element.src;
    obj.src = this._element.src;
  } else {
    obj.src = this._original_src || this._originalElement.src || this._element.src;
  }
  if (this.contentOffsets) {
    obj.contentOffsets = this.contentOffsets;
  }


  if (!this.includeDefaultValues) {
    if (!obj.filters.length)delete obj.filters;
  }
  //if(this._originalElement){
  //    obj.thumb = this._element.src;
  //}

  return obj;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var isVML = function() { return typeof G_vmlCanvasManager !== 'undefined'; }

//weird stuff
// delete fabric.Rect.prototype.toObject;
// fabric.Rect.prototype.storeProperties = ["*","rx","ry"];

fabric.INCLUDE_ALL = "*";

var _toObject_overwritten = fabric.Object.prototype.toObject;
fabric.util.object.extend(fabric.Object.prototype, {
  storeProperties: ['*'],
  eventListeners: {},
  toObject: function (propertiesToInclude) {
    if (propertiesToInclude == fabric.INCLUDE_ALL) {
      propertiesToInclude = [fabric.INCLUDE_ALL];
    }

    propertiesToInclude = propertiesToInclude || [];
    propertiesToInclude = propertiesToInclude.concat(this.storeProperties);


    var obj = _toObject_overwritten.call(this, propertiesToInclude);
    if (propertiesToInclude[0] !== fabric.INCLUDE_ALL) {
      if (!this.includeDefaultValues) {
        this._removeDefaultValues(obj);
      }
    }

    if (this.storeProperties.indexOf("*") == -1) {
      for (var i in obj) {
        if (this.storeProperties.indexOf(i) == -1) {
          delete obj[i];
        }
      }
    }

    this.fire("before:object", {object: obj});
    return obj;
  },
  /**
   * Sets object's properties from options
   * @param {Object} [options] Options object
   */
  setOptions: function (options) {
    this._setObject(options);
    // this._initGradient(options);
    // this._initPattern(options);
    // this._initClipping(options);
  },
  _initEntity: function (options) {
    options.application && options.application.fire("entity:created", {target: this, options: options});
  },
  initialize: function (options, callback) {
    options = options || {};
    this._initEntity(options);
    // if(options.wholeCoordinates){
    //   var coordinates = ["left","top","width","height"];
    //   for(var i in coordinates){
    //     if(options[coordinates[i]]){
    //       options[coordinates[i]] = Math.round(options[coordinates[i]]);
    //     }
    //   }
    // }
    var _self = this;
    this._setObject(options, function () {
      _self.loaded = true;
      _self.fire("loaded");
      callback && callback(_self);
    });
  },
  add: function (canvas) {
    canvas.add(this);
  },
  set: function (key, value) {
    if (typeof key === 'object') {
      this._setObject(key);
    }
    else {
      if (key[0] == "&") {
        key = key.substr(1);
        this._set(key, value(this.get(key)));
      }
      else {
        this._set(key, value);
      }
    }
    return this;
  }
});



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
      title:      'flip',
      action:     'flip'
    },
    flop: {
      className:  'fa fa-arrows-v',
      title:      'flop'
    },
    bringForward: {
      title:      'bring forward',
      className:  'fa fa-level-up',
      disabled:   'onTop'
    },
    sendBackwards: {
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
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
 * @private
 * @param {String} eventName
 * @param {Function} handler
 */
function _removeEventListener(eventName, handler) {
  if (!this.__eventListeners[eventName]) {
    return;
  }
  var eventListener = this.__eventListeners[eventName];
  if (handler) {
    eventListener.splice(eventListener.indexOf(handler), 1)
  }
  else {
    eventListener.length = 0;
  }
}

fabric.Canvas.prototype.stopObserving = fabric.Object.prototype.stopObserving = function stopObserving(eventName, handler) {
  if (!this.__eventListeners) {
    return;
  }

  // remove all key/value pairs (event name -> event handler)
  if (arguments.length === 0) {
    for (eventName in this.__eventListeners) {
      _removeEventListener.call(this, eventName);
    }
  }
  // one object with key/value pairs was passed
  else if (arguments.length === 1 && typeof arguments[0] === 'object') {
    for (var prop in eventName) {
      _removeEventListener.call(this, prop, eventName[prop]);
    }
  }
  else {
    _removeEventListener.call(this, eventName, handler);
  }
  return this;
}


fabric.Observable.on = fabric.Canvas.prototype.on = fabric.Object.prototype.on = function (eventName, handler,priority) {
  if (eventName.constructor == Object) {
    for (var i in eventName) {
      this.on(i, eventName[i],priority)
    }
    return this;
  }
  var events = eventName.split(" ");
  for (var i in events) {
    eventName = events[i];
    this.observe(eventName, handler);
    if(priority){
      this.__eventListeners[eventName].unshift(this.__eventListeners[eventName].pop());
    }
  }
  return this;
};
fabric.Canvas.prototype.off = fabric.Object.prototype.off = function (eventName, handler) {
  var events = eventName.split(" ");
  for (var i in events) {
    this.stopObserving(events[i], handler)
  }
  return this;
};


fabric.Canvas.prototype.fire = fabric.Object.prototype.fire = function fire(eventName, options) {
  if (!this.__eventListeners) {
    return;
  }

  var listenersForEvent = this.__eventListeners[eventName];
  if (listenersForEvent) {
    for (var i = 0, len = listenersForEvent.length; i < len; i++) {
      listenersForEvent[i].call(this, options || {});
    }
  }

  var listenersForEventAll = this.__eventListeners['*'];
  if (listenersForEventAll) {
    options = options || {};
    options.eventName = eventName;
    options.listeners = listenersForEvent;
    for (i = 0, len = listenersForEventAll.length; i < len; i++) {
      listenersForEventAll[i].call(this, options);
    }
  }

  return this;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(6);

/**
 * # SlideCanvas
 * Inherited from fabric.Canvas
 *
 *

 ## method: load

Mathod allows to add new objects and set new attributes of canvas.

 ```javascript
 load : ({
    backgroundImage: string,
    objects: [FabricShapeOptions],
    customSyncOption: any,
    customAsyncOption: any
  },callback) : void
 ```

 To extend loading behavior and use custom options it is possible to define **set fucntions** in Canvas prototype.

 ```javascript
 // Canvas Prototype
 setCustomAsyncOption: function(val,callback){
  this.doAsyncMethod(val,callback)
}
 setCustomSyncOption: function(val){
  this.customSyncOtion = val;
}
 ```

 ### attribute: backgroundImageProperties

 default attributes for background image

 ### freeDrawingBrush

 default active drawing brush

 ```
 freeDrawingBrush: "PaintBucketBrush" | "PaintPenBrush" | "PencilBrush"
 ```

 ### attribute: onSlideLoaded

 onSlideLoaded calls as a callback for load fucntion

 ### attribute: backgroundPosition

 onSlideLoaded calls as a callback for load fucntion

 ```
 backgroundPosition: 'manual' | 'resize' | 'fit' | 'cover' | 'center'
 ```

 - manual - background will ne not scaled and put at left top corner
 - resize - canvas will be resized according to image size
 - fit - will be scaled to fit canvas size
 - cover - will be scaled to cover all canvas size
 - center - backogrund will be not scaled but put in the middle

 ### method: setInteractiveMode

 switch between drawing and hand( moving cunvas by mouse) modes

 ```javascript
 canvas.setInteractiveMode( mode : "hand" | "mixed") : void
 ```

 ### drawingColor

 drawing color using by brushes

 */
fabric.SlideCanvas = fabric.util.createClass(fabric.Canvas,fabric.PluginsMixin, {
  type: 'slide-canvas',
  /**
   * initialized width of the canvas
   */
  width: 160 ,
  /**
   * initialized height of the canvas
   */
  height: 90,
  /**
   * output quality
   */
  dotsPerUnit: 1,
  scale: 1,
  loaded: false,
  /**
   * allow user to interact with canvas
   */
  interactive: true,
  /**
   * fill not the slide area, but whole canvas with background color
   */
  addTextTool: false,
  defaultText: "text",
  defaultTextType: "text",
  thumbSize: {
    width: 50,
    height: 100
  },
  storeProperties: ['*','backgroundImage','width','height'],
  contextTopImageSmoothingEnabled: true,
  plugins: {
    initialize: [
    ],
    preloaders: [
    ],
    loaders: [],
    savers : [
      function serializeThumb(propertiesToInclude, _data){
        if(propertiesToInclude.indexOf('thumb') !== -1){
          var size = fabric.util.getProportions(this.getOriginalSize(), this.thumbSize, 'fit');
          var canvas = fabric.util.createCanvasElement();
          canvas.width = size.width;
          canvas.height = size.height;
          this.renderThumb(canvas);
          _data.thumb = canvas.toDataURL();
        }
      },
      function serializeTemplate(propertiesToInclude, _data) {
        if (propertiesToInclude.indexOf('template') !== -1) {
          if (this.template) {
            for (var i in _data.template) {
              if (JSON.stringify(_data[i]) == JSON.stringify(_data.template[i])) {
                delete _data[i];
              }
            }
            _data.template = this.template.id;
          }
        }
      }
    ]
  },
  setBackgroundColor: function(backgroundColor, callback) {
    return this.__setBgOverlayColor('backgroundColor', backgroundColor, function(){
      this.renderAll();
      callback && callback()
    }.bind(this));
  },
  setInteractive: function (value) {
    this.interactive = value;
  },
  _initOptions: function (options) {
    this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0;
    this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0;

    if (!this.lowerCanvasEl.style) {
      return;
    }

    this.lowerCanvasEl.width = this.width;
    this.lowerCanvasEl.height = this.height;

    this.lowerCanvasEl.style.width = this.width + 'px';
    this.lowerCanvasEl.style.height = this.height + 'px';

    this.viewportTransform = this.viewportTransform.slice();
  },
  _createUpperCanvas: function () {
    fabric.Canvas.prototype._createUpperCanvas.call(this);
    var ctx = this.contextTop;

    if(ctx.imageSmoothingEnabled){
      ctx.imageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
      return;
    }
    ctx.webkitImageSmoothingEnabled = this.contextTopImageSmoothingEnabled;
    ctx.mozImageSmoothingEnabled    = this.contextTopImageSmoothingEnabled;
    ctx.msImageSmoothingEnabled     = this.contextTopImageSmoothingEnabled;
    ctx.oImageSmoothingEnabled      = this.contextTopImageSmoothingEnabled;
  },
  _onMouseUpInDrawingMode: function(e) {
    this._isCurrentlyDrawing = false;
    if (this.clipTo) {
      this.contextTop.restore();
    }
    var pointer = this.getPointer(e);
    this.freeDrawingBrush.onMouseUp(pointer);
    this._handleEvent(e, 'up');
  },
  initialize: function (el, options,callback) {
    if(el && el.constructor == Object){
      callback= options;
      options = el;
      el = null;
    }
    options = options || {};



    if(options.application){
      options.application.fire("entity:created",{target : this , options : options});
    }

    this.id = fabric.SlideCanvas.__idcounter++;

    this._objects = [];
    this._createLowerCanvas(el);


    if(!this.virtual){
      this.created = true;


      this._currentTransform = null;
      this._groupSelector = null;
      this._initWrapperElement();
      this._createUpperCanvas();
      this._initEventListeners();
      this._initRetinaScaling();
      this.calcOffset();
      this.initLayers();



      this._createCacheCanvas();
      this._setImageSmoothing();
      this._initRetinaScaling();
    }else{
      this.initLayers();
    }

    this.plugins.initialize.forEach(function(initializer){
      initializer.call(this, options);
    }.bind(this));

    if(options["+actions"]) {
      this.set("+actions", options["+actions"])
    }
    if(options.actions){
      this.set("actions",options.actions)
    }


    if(options && options.onResize){
      this.onResize = options.onResize;
    }

    if (this.requestAnimFrame) {
      this.addVideosSupport();
    }

    this._initOptions();

    this._setObject(options);

    this.calcOffset();

    // this.load(options,callback);

    this.fire("created");
    // if(this.application){
    //   this.application.fire("canvas:created",{target : this});
    // }
  },
  initLayers: function(){
    if(this.upperCanvasEl){
      this.wrapperEl.appendChild(this.upperCanvasEl);
    }
    //todo from layers module
  },
  create: function () {
    this.created = true;
    this._initInteractive();
    this._createCacheCanvas();
  },
  toObject: function (propertiesToInclude) {

    propertiesToInclude = (propertiesToInclude || []).concat(this.storeProperties);

    var _self =  this;
    var _objs = this.getObjects();

    _objs = fabric.util.object.filter(_objs,{stored: true});
    _objs = _objs.map(function(instance) {
      return instance.toObject(_self.objectsPropertiesToInclude);
    });

    var _data = {
      objects: _objs
    };

    fabric.util.populateWithProperties(this, _data, this.propertiesToInclude);
    //
    // for(var i in propertiesToInclude){
    //   var _prop = propertiesToInclude[i];
    //   _data[_prop] = this[_prop];
    // }

    if(propertiesToInclude.indexOf('backgroundImage') !== -1){
      fabric.util.object.extend(_data, this.__serializeBgOverlay());
    }

    if(propertiesToInclude.indexOf('width') !== -1 && this.originalWidth){
      _data.width = this.originalWidth;
    }
    if(propertiesToInclude.indexOf('height') !== -1 && this.originalHeight){
      _data.height = this.originalHeight;
    }

    this.plugins.savers.forEach(function(saver){
      saver.call(this, propertiesToInclude, _data);
    }.bind(this));
    this.fire("before:object",{object: _data});

    return _data;
  },
  setTemplate: function(template){

    this.template = template;
    if(!template)return;

    this.setWidth(this.slideWidth || template.width);
    this.setHeight(this.slideHeight || template.height);
    this.originalHeight = this.height;
    this.originalWidth = this.width;

    this.set(fabric.util.object.rearrange(template,["areas","helpers","offsets"]));

    this._update_clip_rect();
    this._update_background_image();
    this.fire("modified",{type: "template"});
    this.renderAll();
  },
  addText: function (text, options) {
    this.createObject({
      position: "center",
      text: text,
      type:   this.defaultTextType,
      clipTo: this.activeArea,
      movementLimits : this.activeArea
    });
  },
  /**
   * Additional Event Listeners
   *  - loading:end
   *  - target:modified - couldbe used to detect active object changes
   *  - target:changed
   *  - target:cleared
   */
  eventListeners: {
    'object:moving': function (obj) {
      this.fire('target:modified', this, obj)
    },
    'selection:cleared': function (event) {
      if(!this.target)return;
      this.target.fire('deselected', event);
      this.target = null;
      this.fire('target:cleared', event);
    },
    'object:selected': function (event) {
      event.previous = this.target;
      this.target = event.target;
      if(event.previous){
        event.previous.fire('deselected', event);
      }
      this.fire('target:changed', event);
    },
    'group:selected': function (event) {
      this.target = event.target;
      this.fire('target:changed', event);
    }
  }
});
fabric.SlideCanvas.__idcounter = 0;
fabric.SlideCanvas.fromJson = function(url,callback , element){
  fabric.util.data.loadJson(url,function(data){
    new fabric.SlideCanvas(element,data,callback)
  })
};

fabric.SlideCanvas.prototype.actions = fabric.util.object.extend({}, {
  selectAll: {
   title: 'selectAll',
   type: 'key'
  },
  backgroundColor : {
    type: "color"
  },
  addText: {
    className:  'fa fa-font',
    title: 'text',
    action: function () {
      this.addText(this.defaultText,{});
    }
  }
});

fabric.util.object.extend(fabric.Application.prototype, {
  setSlide: function (value, callback) {
    var _canvas = this.canvas;
    if (_canvas.load) {
      _canvas.load(value, callback);
    } else {
      _canvas.createObjects(value, callback);
    }
  }
});

fabric.Application.prototype.canvasClass = 'SlideCanvas';

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {var textInitialize = fabric.Text.prototype.initialize;

fabric.util.object.extend(fabric.Text.prototype, {
  textInitialize: textInitialize,
  editTool: false,
  advancedColorsTools: false,
  textFontSizeTools: false,
  textAligmentTools: false,
  advancedTextStyleTools: false,
  rasterizeTool: false,
  rasterizeKlass: fabric.Image,
  initialize: function (text, options) {
    this._initEntity(options);
    this.textInitialize(text, options);
    // this.updateCache();
  },
    _render_cache: function (ctx) {
  ctx.save();
  ctx.scale(
    this.scaleX * (this.flipX ? -1 : 1),
    this.scaleY * (this.flipY ? -1 : 1)
  );
  this.transform(ctx);
  this._setShadow(ctx);
  ctx.translate(-this.width / 2, -this.height / 2);
  ctx.drawImage(this._cache, 0, 0, this.width, this.height);
  ctx.restore();
},
  updateCache: function () {

    var size = {
      width: this.width * this.canvas.dotsPerUnit,
      height: this.height * this.canvas.dotsPerUnit
    };

    var _clipTo = this.clipTo;
    delete this.clipTo;
    this._cache = fabric.util.createCanvasElementWithSize(size);
    var ctx = this._cache.getContext("2d");
    ctx.scale(
      this.canvas.dotsPerUnit,
      this.canvas.dotsPerUnit);
    ctx.translate(this.width / 2, this.height / 2);

    this.render(ctx, true);
    this.render = this._render_cache;
    this.clipTo = _clipTo;

  },
  rasterizeText: function () {
    this.updateCache();
    var img = fabric.util.createImage();

    img.onload = function () {
      var obj = this.toObject();
      obj.width = img.width;
      obj.height = img.height;
      obj.scaleX = this.scaleX * (this.height / img.height);
      obj.scaleY = this.scaleY * (this.width / img.width );
      obj.rasterizedType = obj.type;
      delete obj.type;

      var el = new this.rasterizeKlass(img, obj);
      this.canvas.add(el);
      this.canvas.remove(this);
      setTimeout(function () {
        this.canvas.setActiveObject(el);
        this.canvas.renderAll();
      }.bind(this))
    }.bind(this);
    img.src = this._cache.toDataURL();
    //this.on('modified',this.updateCache.bind(this));
  },
  getStyle: function (styleName) {
    var object = this;
    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || object[styleName])
      : (object[styleName] || object['__' + styleName] || '');
  },
  getPattern: function (url) {
    var _fill = this.getStyle('fill ');
    return _fill && _fill.source;
  },
  setPattern: function (url) {
    if (!url) {
      this.setStyle('fill');
    } else {
      // var _texture = _.findWhere(this.project.textures, {id: url});
      var _this = this;
      fabric.util.loadImage(url, function(img) {
        _this.setStyle('fill', new fabric.Pattern({
          source: img,
          repeat: 'repeat'
        }));
      });
    }
  },
  getOpacity: function () {
    return this.getStyle('opacity') * 100;
  },
  setOpacity: function (value) {
    this.setStyle('opacity', parseInt(value, 10) / 100);
  },
  getRadius: function () {
    return this.get('radius');
  },
  setShadow: function(options) {
    return this.setProperty('shadow', options ? new fabric.Shadow(options) : null);
  },
  setProperty: function (prop, value) {
    this[prop] = value;
    this.canvas && this.canvas.renderAll();
  },
  setRadius: function (value) {
    this.setProperty('radius', value);
  },
  getSpacing: function () {
    return this.get('spacing');
  },
  setSpacing: function (value) {
    this.setProperty('spacing', value);
  },
  getReverted: function () {
    return this.get('reverted');
  },
  setReverted: function (value) {
    this.setProperty('reverted', value);
  },
  getFill: function () {
    return this.getStyle('fill');
  },
  setFill: function (value) {
    this.setStyle('fill', value);
  },
  getText: function () {
    return this.get('text');
  },
  setText: function (value) {
    this.setProperty('text', value);
  },
  getTextAlign: function () {
    return this.get('textAlign');
  },
  setTextAlign: function (value) {
    this.setProperty('textAlign', value.toLowerCase());
  },
  getFontFamily: function () {
    return this.get('fontFamily');
  },
  setFontFamily: function (value) {
    this.setStyle('fontFamily', value);
  },
  getStyles: function(){
    return this.styles || {
        fill :                this.fill,
        fontSize :            this.fontSize,
        textBackgroundColor : this.textBackgroundColor,
        textDecoration :      this.textDecoration,
        fontFamily :          this.fontFamily,
        fontWeight :          this.fontWeight,
        fontStyle :           this.fontStyle,
        stroke :              this.stroke,
        strokeWidth :         this.strokeWidth
      };
  },
  getBgColor: function () {
    return this.get('backgroundColor');
  },
  setBgColor: function (value) {
    this.setProperty('backgroundColor', value);
  },
  getTextBgColor: function () {
    return this.get('textBackgroundColor');
  },
  setTextBgColor: function (value) {
    this.setProperty('textBackgroundColor', value);
  },
  getStroke: function () {
    return this.getStyle('stroke');
  },
  setStroke: function (value) {
    this.setStyle('stroke', value);
  },
  getStrokeWidth: function () {
    return this.getStyle('strokeWidth');
  },
  setStrokeWidth: function (value) {
    this.setStyle('strokeWidth', parseInt(value, 10));
  },
  decreaseFontSize: function () {
    this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) - 1);
  },
  increaseFontSize: function () {
    this.setStyle('fontSize', parseInt(this.getStyle('fontSize')) + 1);
  },
  getFontSize: function () {
    return this.getStyle('fontSize');
  },
  setFontSize: function (value) {
    this.setStyle('fontSize', parseInt(value, 10));
  },
  getLineHeight: function () {
    return this.getStyle('lineHeight');
  },
  setLineHeight: function (value) {
    this.setStyle('lineHeight', parseFloat(value, 10));
  },
  addText: function (text,options) {

    var _match = this.text.match(/\n/g);
    var _lineIndex = _match && _match.length || 0;
    var charIndex = this.text.length - this.text.lastIndexOf("\n") - 1;

    if(!this.styles[_lineIndex]){
      this.styles[_lineIndex] = {}
    }

    if(!this.styles[_lineIndex][charIndex]){
      this.styles[_lineIndex][charIndex] = {}
    }
    fabric.util.object.extend(this.styles[_lineIndex][charIndex],options);
    this.text +=text;
    // this.styles;
  },
  getBold: function () {
    return this.getStyle('fontWeight') === "bold";
  },
  setBold: function (value) {
    this.setStyle('fontWeight', value ? 'bold' : '');
  },
  getItalic: function () {
    return this.getStyle('fontStyle') === 'italic';
  },
  setItalic: function (value) {
    this.setStyle('fontStyle', value ? 'italic' : '' );
  },
  getUnderline: function () {
    return this.getStyle('textDecoration').indexOf('underline') > -1;
  },
  setUnderline: function (value) {
    value = value ? (this.getStyle('textDecoration') + ' underline')
      : this.getStyle('textDecoration').replace('underline', '');

    this.setStyle('textDecoration', value);
  },
  getLinethrough: function () {
    return this.getStyle('textDecoration').indexOf('line-through') > -1;
  },
  setLinethrough: function (value) {
    value = value ? (this.getStyle('textDecoration') + ' line-through')
      : this.getStyle('textDecoration').replace('line-through', '');

    this.setStyle('textDecoration', value);
  },
  getOverline: function () {
    return this.getStyle('textDecoration').indexOf('overline') > -1;
  },
  setOverline: function (value) {
    value = value ? (this.getStyle('textDecoration') + ' overline')
      : this.getStyle('textDecoration').replace('overlin', '');

    this.setStyle('textDecoration', value);
  },
  setStyle: function (styleName, value) {
    var object = this;
    var _old = fabric.util.object.cloneDeep(object.getStyles());
    //var _old = fabric.util.object.deepExtend({}, object.getStyles);//getSelectionStyles();
    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      if (value !== undefined) {
        style[styleName] = value;
      } else {
        delete style[styleName];
      }
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      if (value !== undefined) {
        object[styleName] = value;
      } else {
        delete object[styleName];
      }
      for (var i in object.styles) {
        for (var j in object.styles[i]) {
          if (object.styles[i][j][styleName] !== undefined) {
            delete object.styles[i][j][styleName];
          }
        }
      }
    }

    var styles_data = object.getStyles();

    if(this.type != "text"){
      this.styles = fabric.util.object.cloneDeep(styles_data);
    }

    this.setCoords();

    this.fire("styles:modified", {
      original: _old,
      modified: styles_data
    });
    this.canvas && this.canvas.renderAll();
    /*
     this.project.history.add({
     slide: this.slide,
     object: this,
     undo: _old,
     redo: styles_data,
     type: 'styled',
     undoFn: function(){
     this.object.data.styles = this.undo;
     this.object.fabric.set('styles',this.undo);
     this.object.fabric.setCoords();
     this.object.slide.render();
     },
     redoFn:  function(){
     this.object.data.styles = this.redo;
     this.object.fabric.set('styles',this.redo);
     this.object.fabric.setCoords();
     this.object.slide.render();
     }
     });*/
  },

  generateTextStyle: function () {
    return {
      'font-style': this.isItalic() ? 'italic' : 'normal',
      'font-weight': this.isBold() ? 700 : 400,
      'text-decoration': (this.isLinethrough() ? 'line-through ' : '' ) +
      (this.isOverline() ? 'overline ' : '' ) +
      (this.isUnderline() ? 'underline ' : '')
    }
  },
  actions: {
    rasterizeText: {
      insert: 'rasterizeTool',
      className: 'button-easel',
      title: 'rasterizeText',
   //   action: _TEX.rasterizeText
    },
    fill: {
      type: 'color',
      title: 'fill',
      insert: '!advancedColorsTools',
      value: 'fill'
    },
    textBgcolor: {
      type: 'color',
      title: 'bgColor',
      value: 'bgColor'
    },
    textTextbgcolor: {
      type: 'color',
      title: 'textBgColor',
      value: 'textBgColor'
    },
    textFill: {
      type: 'color',
      title: 'fill',
      value: 'fill'
    },
    textBold: {
      type: "checkbox",
      title: 'bold',
      value: 'bold',
      className: 'fa fa-bold'
    },
    textItalic: {
      type: "checkbox",
      title: 'italic',
      value: 'italic',
      className: 'fa fa-italic'
    },
    textUnderline: {
      type: "checkbox",
      title: 'Underline',
      value: 'underline',
      className: 'fa fa-underline'
    },
    textLinethrough: {
      type: "checkbox",
      insert: 'advancedTextStyleTools',
      title: 'Linethrough',
      value: 'linethrough',
      className: 'text-linethrough fa fa-strikethrough'
    },
    textOverline: {
      type: "checkbox",
      insert: 'advancedTextStyleTools',
      title: 'overline',
      value: 'overline',
      className: 'text-overline fa fa-overline'
    },
    textAlign: {
      type: 'options',
      title: 'text align',
      insert: 'textAligmentTools',
      value: "textAlign",
      menu: {
        textAlignCenter: {
          title: 'align center',
          option: 'center',
          className: 'fa fa-align-center'
        },
        textAlignLeft: {
          title: 'align left',
          option: 'left',
          className: 'fa fa-align-left'
        },
        textAlignRight: {
          title: 'align right',
          option: 'right',
          className: 'fa fa-align-right'
        },
        textAlignJustify: {
          title: 'align justify',
          option: 'justify',
          className: 'fa fa-align-justify'
        }
      }
    },
    fontFamily: {
      type: 'fontFamily',
      title: 'font family',
      className: 'fa fa-text',
      value: 'fontFamily',
      data: function(){
        return this.application._fonts
      }
    },
    textFontSize: {
      insert: 'textFontSizeTools',
      type: 'number',
      title: 'fontSize',
      value: 'fontSize'
    },
    /*textFont: {
     insert: 'textFontSizeTools',
     type: 'menu',
     title: 'font',
     className: 'fa fa-font',
     menu: {
     textFontSizeDecrease: {
     title: 'decreaseFontSize',
     action: _TEX.decreaseFontSize,
     className: 'fa fa-font font-size-decrease'
     },
     textFontSizeIncrease: {
     title: 'increaseFontSize',
     action: _TEX.increaseFontSize,
     className: 'fa fa-font font-size-increase'
     }
     }
     }*/
    advancedColorsTools: {
      className: 'colors',
      type: 'menu',
      title: 'colors',
      toggled: true,
      menu: ["fill","textBgcolor","textTextbgcolor","textFill"]
    },
    textStyle: {
      type: 'menu',
      title: 'text style',
      toggled: true,
      className: 'fa fa-font',
      style: 'generateTextStyle',
      menu: [
        "textBold","textItalic","textUnderline","textLinethrough",
        "textOverline","textAlign","fontFamily","textFontSize"
      ]
    }
  }
});

fabric.util.object.extend(fabric.IText.prototype, {
  initHiddenTextarea_native: fabric.IText.prototype.initHiddenTextarea,
  initHiddenTextarea: function(){
    this.initHiddenTextarea_native();
    this.hiddenTextarea.style.width = "9999px";
  },
  /**
   * Exits from editing state
   * @return {fabric.IText} thisArg
   * @chainable
   */
  exitEditing: function() {
    // var isTextChanged = (this._textBeforeEdit !== this.text);
    this.selected = false;
    this.isEditing = false;
    this.selectable = true;

    this.selectionEnd = this.selectionStart;
    this.hiddenTextarea && this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea);
    this.hiddenTextarea = null;

    this.abortCursorAnimation();
    this._restoreEditingProps();
    this._currentCursorOpacity = 0;

    this.fire('editing:exited');
    // isTextChanged && this.fire('modified');
    if (this.canvas) {
      this.canvas.off('mouse:move', this.mouseMoveHandler);
      this.canvas.fire('text:editing:exited', { target: this });
      this.canvas.fireModifiedIfChanged(this);
    }
    return this;
  },
  maxStrokeWidth: function(){
    return Math.ceil( this.getFontSize() / 10);
  },
  actions: {
    enterEditing: {
      insert:     'editTool',
      className:  'fa fa-pencil-square-o',
      title:      'edit'
      //action:     _TEX.enterEditing
    }
  }
});



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.debug = true;
fabric.extensions = [];
fabric.util.data = __webpack_require__(12);
fabric.util.path = __webpack_require__(5);
fabric.util.compile = __webpack_require__(4);
fabric.util.loader = __webpack_require__(13);
fabric.util.syntax = __webpack_require__(14);
fabric.util.object.extend(fabric.util.object,__webpack_require__(2));
fabric.util.object.extend(fabric.util,__webpack_require__(3));

__webpack_require__(11);


if(!fabric.isLikelyNode){
  /**
   * inline script images
   * @type {{error: string}}
   */
  fabric.media = {
    /**
     * replace images loaded with errors
     */
    error: 'data:image/svg+xml;base64,' + __webpack_require__(10)
  };
}

module.exports  = fabric;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


fabric.RemoveWhiteDP = fabric.Image.filters.RemoveWhiteDP =  fabric.util.createClass(fabric.Image.filters.BaseFilter,{
    type: 'RemoveWhiteDP',
    initialize: function(options) {
        if(options)delete options.type;
        this.options = fabric.util.object.defaults(options || {},{
                fromCorners : true,
                blurRadius: 2,
                colorThreshold: 32
            });
        this.pathfinder = new fabric.Pathfinder(this.options);
    },
    applyTo: function(canvasEl) {

        var pathfinder = this.pathfinder;

        pathfinder.colorThreshold = this.options.colorThreshold;
        pathfinder.setPicture(canvasEl);
        pathfinder.selectBackground(this.options.fromCorners);
        if(pathfinder.mask.count ) {
          pathfinder._fill([0, 0, 0, 0]);
          pathfinder.mask = fabric.MagicWand.invertMask(pathfinder.mask);
          //todo inverting mask

          if(pathfinder.mask.count){
            var _width = pathfinder.mask.bounds.maxX - pathfinder.mask.bounds.minX + 1;
            var _height = pathfinder.mask.bounds.maxY - pathfinder.mask.bounds.minY + 1;
            var ctx = canvasEl.getContext('2d');
            var imageData = pathfinder.editedImageCanvas.getContext('2d').getImageData(pathfinder.mask.bounds.minX, pathfinder.mask.bounds.minY, _width, _height);
            canvasEl.width  = _width;
            canvasEl.height = _height;
            ctx.putImageData(imageData, 0, 0);
            this.bounds = pathfinder.mask.bounds;
          }else{
            var ctx = canvasEl.getContext('2d');
            canvasEl.width  = 1;
            canvasEl.height = 1;
            ctx.clearRect(0,0,1,1);
            this.bounds = {
              maxX: 0,
              maxY: 0,
              minX: 0,
              minY: 0
            }
          }
        }



            //clip the image
        pathfinder.clearMemory();

    },
    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), this.options);
    }
});

fabric.Image.filters.RemoveWhiteDP.fromObject = function(object) {
    return new fabric.Image.filters.RemoveWhiteDP(object);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.CacheMixin = {
  caching: true,
  dirty: true,
  render: function ( ctx) {

    ctx.save();
    if (this.transformMatrix) {
      ctx.transform.apply(ctx, this.transformMatrix);
    }
    this.transform(ctx);

    this._setShadow(ctx);
    this.clipTo && fabric.util.clipContext(this, ctx);

    ctx.translate(-this.width / 2, -this.height / 2);

    if (this.caching) {
      if(!this._cache){
        this._cache = fabric.util.createCanvasElementWithSize(this);
      }
      if(this.dirty){
        this._cache.width = this.width;
        this._cache.height = this.height;
        var cacheCtx = this._cache.getContext("2d");
        cacheCtx.clearRect(0,0,this._cache.width,this._cache.height)
        this._render(cacheCtx);
        this.dirty = false;
      }

      ctx.drawImage(this._cache, 0, 0, this.width, this.height,0, 0, this.width, this.height);
    }else{
      this._render(ctx);
    }

    this.clipTo && ctx.restore();
    ctx.restore();
  }

};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.StrokeMixin = {
  shape: {
    strokeWidthFull: 0,
    strokeWidthEmpty: 2,
    strokeWidthActive: 2,
    strokeDashArray : [5,5],
    fill: "transparent",
    strokeEmpty:  "red",
    strokeFull:   "red",
    strokeActive: "green"
  },
  setShape: function(el,cb){

    el =  fabric.util.object.extend({
      strokeWidthFull: this.shape.strokeWidthFull,
      strokeWidthEmpty: this.shape.strokeWidthEmpty,
      strokeWidthActive: this.shape.strokeWidthActive,
      dashArray : this.shape.dashArray,
      strokeEmpty:  this.shape.strokeEmpty,
      strokeFull:  this.shape.strokeFull,
      strokeActive:this.shape.strokeActive
    },el);


    var _this = this;
    if(el && el.src && !el.paths){
      fabric.loadSVGFromURL(el.src,function(paths,options) {
        el.paths  = paths;
        fabric.util.object.extend(el,options);
        _this._set_shape(el);
        _this.add(_this._fabric_shape)
        _this._apply_shape();
        cb && cb();
      })
    }else{
      _this._set_shape(el);
      _this.add(_this._fabric_shape);
      _this._apply_shape();
      cb && cb();
    }
  },
  initShape: function(options){

    var _shapeOptions = fabric.util.object.extend(options.shape || {} , this.shape);

    this._fabric_shape =  new fabric.Rect(fabric.util.object.extend({},_shapeOptions,{
      width:            options.width,
      height:           options.height,
      stroke:           _shapeOptions.strokeEmpty,
      strokeWidth:      _shapeOptions.strokeWidthEmpty
    }));
  },

  /**
   * �������������� ����� �� ������� ������� ����
   * @private
   */
  _apply_shape: function () {
    var shape = this.shape;

    var _off = shape && shape.offsets;

    if (!_off) {
      _off = [0, 0, 0, 0];
    }

    var _off_units = shape && shape.offsets_units;

    if (!_off_units) {
      //if (frame.border_image) {todo
      //    _off_units = frame.border_image.width_units || [0, 0, 0, 0];
      //} else {
      _off_units = [1, 1, 1, 1];
      //}
    }

    /*else if(shape.offsets && shape.offsets_units){
     var s = this.slide.scaleValue;
     this._fabric_shape = new fabric.Rect({
     originX: 'center',
     originY: 'center',
     width:  (this.data.geometry.width - shape.offsets[3] - shape.offsets[1]) * s,
     height: (this.data.geometry.height -shape.offsets[0] - shape.offsets[2]) * s
     });*/

    _off = {
      top:   _off[0] * (_off_units[0] ? this.height / 100 : 1) || 0,
      right: _off[1] * (_off_units[1] ? this.width / 100 : 1) || 0,
      bottom:_off[2] * (_off_units[2] ? this.height / 100 : 1) || 0,
      left:  _off[3] * (_off_units[3] ? this.width / 100 : 1) || 0
    };


    var _w = (this.width - _off.left - _off.right );// *this.slide.scaleValue;
    var _h = (this.height - _off.top - _off.bottom);// *this.slide.scaleValue;


    //if(this.resources.frame.data.shape && this.resources.frame.data.shape.radius){
    //
    //    this._fabric_shape.set({
    //        left: -this.width/2  + _off.left ,
    //        top:  -this.height/2 + _off.top ,
    //        width: _w - _off.left -_off.right,
    //        height:  _h - _off.top -_off.bottom,
    //        scaleX:  1,
    //        scaleY:  1
    //    });
    //}else{


    if(this.shape.path || this.shape.paths || this.shape.offsets){
      var _sw = this.shape.width || this._fabric_shape.width;
      var _sh = this.shape.height || this._fabric_shape.height;

      if(this._fabric_shape.strokeWidth){
        _sw += this._fabric_shape.strokeWidth ;
        _sh += this._fabric_shape.strokeWidth ;
      }

      var options = {
        left:   -this.width / 2 + _off.left,
        top:    -this.height / 2 + _off.top,
        scaleX: _w / 100 / (_sw / 100),// * (shape.scaleX || 1),
        scaleY: _h / 100 / (_sh / 100),// * (shape.scaleY || 1)
        angle: 0
      };
    }else{
      var options = {
        left:   -this.width / 2 + _off.left,
        top:    -this.height / 2 + _off.top,
        width:    _w,// * (shape.scaleX || 1),
        height:   _h,// * (shape.scaleY || 1)
        angle: 0
      };
    }

    this._fabric_shape.set(options);

    this.updateStroke();
    this.canvas && this.canvas.renderAll();
  },
  _set_shape: function (shape) {

    if(this._fabric_shape){
      this.remove(this._fabric_shape);
      delete this._fabric_shape;
    }
    var _fabric_shape;
    var _options = {
      fill:             "transparent",
      strokeDashArray : this.shape.dashArray,
    };

    this.shape = shape;

    if(!shape){
      _fabric_shape = new fabric.Rect({
        width: this.width,
        height: this.height
      });
      _fabric_shape.set(_options)
    }else if (shape.paths) {

      for(var i in shape.paths){
        shape.paths[i].set(_options)
      }

      _fabric_shape = fabric.util.groupSVGElements(shape.paths, shape);
      //this._objects.unshift(this._objects.pop());
    }else {
      var path;

      if (shape.radius) {
        path = fabric.util.getRadiusClipPath(shape.radius, shape.radius_units, this.width, this.height);
        _fabric_shape = new fabric.Path(path, _options);
      } else if (shape.path) {
        _fabric_shape = new fabric.Path(shape.path, _options);
        //} else if(shape.offsets){
        //  path = fabric.util.getOffsetsClipPath(shape.offsets, shape.offsets_units)
      }else{
        path =  'M 0 0 L {width} 0 L {width} {height} L 0 {height} z'.format(fabric.util.object.extend({
          width:            100,
          height:           100
        },shape));

        _fabric_shape = new fabric.Path(path, _options);
        //
        //_fabric_shape =  new fabric.Rect(fabric.util.object.extend({
        //  width:            100,
        //  height:           100
        //},shape));

      }
    }


    _fabric_shape.set({
      scaleX: this.width  / _fabric_shape.width,
      scaleY: this.height / _fabric_shape.height,
      perPixelTargetFind: true,
      selectable: false,
      originX: "left",
      originY: "top"
    });



    this._fabric_shape =  _fabric_shape;


    if(this.element){
      this.element.clipTo = this._fabric_shape;
    }


    this.updateStroke();

  },

  updateStroke: function(){

    var _stroke = this.shape.stroke;
    var _sw = 0;
    if((this._activated || this._clipmode )&& this.shape.strokeWidthActive){
      _sw = this.shape.strokeWidthActive
    }else if(this.element && this.shape.strokeWidthFull){
      _sw = this.shape.strokeWidthFull;
    }else if(!this.element && this.shape.strokeWidthEmpty){
      _sw = this.shape.strokeWidthEmpty;
    }
    if((this._activated || this._clipmode) && this.shape.strokeActive){
      _stroke = this.shape.strokeActive
    }else if(this.element && this.shape.strokeFull){
      _stroke = this.shape.strokeFull;
    }else if(!this.element && this.shape.strokeEmpty){
      _stroke = this.shape.strokeEmpty;
    }


    var _strokeWidth = _sw / Math.max(this._fabric_shape.scaleX,this._fabric_shape.scaleY);

    if(this.shape){
      if(this.shape.paths ){
        for(var i in this._fabric_shape.paths){
          this._fabric_shape.paths[i].setStrokeWidth(_strokeWidth)
          this._fabric_shape.paths[i].setStroke(_stroke)
        }
      }else{
        this._fabric_shape.setStrokeWidth(_strokeWidth)
        this._fabric_shape.setStroke(_stroke)
      }
    }
  },
  /**
   * кобъект готовится к замену фото
   */
  activate: function(){
    this._activated = true;
    this._fabric_shape.setOpacity(1);
    this.updateStroke();
    this.canvas.renderAll();
  },
  /**
   * кобъект не готовится к замену фото
   */
  deactivate: function(){
    this._activated = false;
    this.updateStroke();
    this.canvas.renderAll();
  },
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


/**
   * Draw CSS3 border image on canvas.
   * @param canvas    {HTMLCanvasElement}
   * @param img       {HTMLImageElement} border-image-source image
   * @param options   {Object}
   *      slice {Array} border-image-slice values
   *      width {Array} border-image-width values
   *      outset {Array} border-image-outset values
   *      repeat {Array} border-image-repeat values
   * @param size      {Object}
   */
   fabric.util.drawBorderImage  = function(canvas, img, options){


    var options = fabric.util.object.extend({
      "slice":        [25,25,25,25],
      "width":        [25,25,25,25],
      "fill":         false,
      "repeat":       ["round","round"],
      "outset_values"	: [0, 0, 0, 0],
      "slice_units"   : [0, 0, 0, 0],
      "width_units"	: [0, 0, 0, 0],
      "outset_units"	: [0, 0, 0, 0],
      "size"			: [canvas.width, canvas.height]
    },options)


    var w = img.width;
    var h = img.height;

    var ctx = canvas.getContext("2d");
    var slice = options.slice;
    var width = options.width;

    var w2 = options.size[0];
    var h2 = options.size[1];


    if(options.slice_units[0] == 1)slice[0] *=  h / 100;
    if(options.slice_units[1] == 1)slice[1] *=  w / 100;
    if(options.slice_units[2] == 1)slice[2] *=  h / 100;
    if(options.slice_units[3] == 1)slice[3] *=  w / 100;

    if(options.width_units[0] == 1)width[0] *= h2 / 100;
    if(options.width_units[1] == 1)width[1] *= w2 / 100;
    if(options.width_units[2] == 1)width[2] *= h2 / 100;
    if(options.width_units[3] == 1)width[3] *= w2 / 100;


    function drawSide(side,sliceOffset,sliceWidth, drawOffset,drawWidth){
      var d;
      if(side == 0) {
        d = [slice[3] + sliceOffset, 0, sliceWidth,  slice[0],
          width[3] + drawOffset, 0, drawWidth,  width[0]]
      }
      if(side == 2){
        d = [slice[3] + sliceOffset, h - slice[2] ,sliceWidth,  slice[2],
          width[3] + drawOffset, h2 - width[2],drawWidth, width[2]]
      }
      if(side == 1) {
        d = [ w - slice[1], slice[0] + sliceOffset,  slice[1], sliceWidth,
          w2 - width[1], width[0] + drawOffset,width[1], drawWidth];
      }
      if(side == 3) {
        d = [ 0, slice[0] + sliceOffset,  slice[3], sliceWidth,
          0, width[0] + drawOffset, width[3],drawWidth];
      }
      ctx.drawImage(img,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7])
    }


    function _draw_border_side(side){
      var _top_width, _top_slice, repeat;
      if(side == 0 || side == 2){
        _top_width = w2 - width[1]- width[3];
        _top_slice  =  w - slice[1] - slice[3];
        repeat = options.repeat[0];
      }else{
        _top_width = h2 - width[0]- width[2];
        _top_slice  =  h - slice[0] - slice[2];
        repeat = options.repeat[1];
      }


      if(repeat == "stretch"){
        return drawSide(side, 0,  _top_slice ,  0,     _top_width);
      }

      var _aspect =   slice[side] / width[side];
      var _one_width =  _top_slice *  width[side] / slice[side] ;
      var count = 1;
      var _left = 0;

      if(repeat == "repeat"){

        var _rest = _one_width - _top_width % _one_width / 2;
        var _rest_aspect  = _aspect * _rest;
        count =  Math.floor(_top_width / _one_width);


        if(_rest > 0){
          drawSide(side, _rest_aspect ,  _top_slice - _rest_aspect,  0,     _one_width - _rest)
        }

        _left =  _one_width - _rest;

        for(var i = 0 ; i< count;i ++){
          drawSide( side,0,   _top_slice ,  _left,     _one_width);
          _left +=_one_width;
        }

        if(_rest > 0){
          drawSide(side,  0 ,    _top_slice - _rest_aspect,  _left,    _one_width - _rest );
        }
      }
      if(repeat == "round"){

        _left = 0;
        count =  Math.max(1,Math.round(_top_width / _one_width));
        _one_width = _top_width / count;

        while(_left < _top_width){
          drawSide(side,0,     _top_slice ,  _left,     _one_width );
          _left +=_one_width;
        }
      }
    }

    _draw_border_side(0);
    _draw_border_side(2);
    _draw_border_side(1);
    _draw_border_side(3);

  //top left
    ctx.drawImage(img, 0, 0, slice[3], slice[0], 0, 0, width[3], width[0]);
  //top right
    ctx.drawImage(img, w - slice[1], 0, slice[1], slice[0],
      w2 - width[1], 0, width[1], width[0]);
  //bottom left
    ctx.drawImage(img, 0, h - slice[2], slice[3], slice[2],
      0, h2 - width[2], width[3], width[2]);

  //bottom right
    ctx.drawImage(img, w - slice[1], h - slice[2], slice[1], slice[2],
      w2 - width[1], h2 - width[2], width[1], width[2]);

  }

  /*
   var Frame = function(project,data){

   if(data.border_image){
   data.border_image = mixin( {
   "slice":          [25,25,25,25],
   "width":          [25,25,25,25],
   "fill":           false,
   "repeat":         ["round","round"],
   "outset"	:     [0, 0, 0, 0],
   "slice_units"   : [0, 0, 0, 0],
   "width_units"	: [0, 0, 0, 0],
   "outset_units"	: [0, 0, 0, 0]
   }, data.border_image)
   }


   this.superclass.constructor.call(this,project,data);
   this._add_root("mask");
   this._add_root("image");
   this.example = this._get_example();

   };*/
  fabric.util.getOffsetsClipPath = function(o) {

    return ['M', o[3], o[0], 'L', 100 - o[1], o[0], 'L', 100 - o[1], 100 - o[2], 'L', o[3], 100 - o[2], 'z'].join(" ");
  };

  fabric.util.getRadiusClipPath = function(radius,radius_units, width,height) {

  var br  = radius;
  var bru = radius_units || [1,1,1,1,1,1,1,1];



  var s = {
    "top-left-h":     br[0] * (bru[0] ? height / 100 : 1),
    "top-left-w":     br[1] * (bru[1] ? width / 100 : 1),
    "top-right-h":    br[2] * (bru[2] ? height / 100 : 1),
    "top-right-w":    br[3] * (bru[3] ? width / 100 : 1),
    "bottom-right-w": br[4] * (bru[4] ? width / 100 : 1),
    "bottom-right-h": br[5] * (bru[5] ? height / 100 : 1),
    "bottom-left-w":  br[6] * (bru[6] ? width / 100 : 1),
    "bottom-left-h":  br[7] * (bru[7] ? height / 100 : 1)
  };

  return [
    "M", 0, s["top-left-h"],
    "C", 0, s["top-left-h"], 0, 0, s["top-left-w"], 0,
    "H", width - s["top-right-w"],
    "C", width - s["top-right-w"], 0, width, 0, width, s["top-right-h"],
    "V", height - s["bottom-right-h"],
    "C", width, height - s["bottom-right-h"], width, height, width - s["bottom-right-w"], height,
    "H", s["bottom-left-w"],
    "C", s["bottom-left-w"], height, 0, height, 0, height - s["bottom-left-h"],
    "Z"
  ].join(" ");
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


var _bindEvents = fabric.Canvas.prototype._bindEvents;
var _onMouseDown_overwritten = fabric.Canvas.prototype._onMouseDown;
var _onMouseUp_overwritten = fabric.Canvas.prototype._onMouseUp;
var _initEventListeners_overwritten = fabric.Canvas.prototype._initEventListeners;
var removeListeners_overwritten = fabric.Canvas.prototype.removeListeners;

fabric.util.object.extend(fabric.Canvas.prototype, {
  tapholdThreshold: 2000,
  _bindEvents: function () {
    _bindEvents.call(this);
    this._onClick = this._onClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onTapHold = this._onTapHold.bind(this);
  },

  _onDoubleClick: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:dblclick', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('dblclick', {
        e: e
      });
    }
  },

  _onDrop: function (e) {
    var _zoom = this.getZoom();
    e.x /= _zoom;
    e.y /= _zoom;
    e.offsetX /= _zoom;
    e.offsetY /= _zoom;
    e.width = e.helper.width() / _zoom;
    e.height = e.helper.height() / _zoom;
    var self = this;
    e.target = self.findTarget(e.originalEvent);

    self.fire('mouse:drop', e);

    if (e.target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      e.target.fire('object:drop', e);
    }
  },

  _onDragMove: function (e) {
    var self = this;

    var target = self.findTarget(e.originalEvent);
    self.fire('mouse:dragmove', {
      target: target,
      e: e,
      data: e.data
    });
    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double click event does not fire on drawing mode.
      target.fire('object:dragmove', {
        e: e,
        data: e.data
      });
    }
    if (this._last_target == target)return;
    if (this._last_target) {
      self.fire('mouse:dragleave', {
        target: this._last_target,
        e: e,
        data: e.data
      });
      this._last_target.fire('object:dragleave', {
        e: e,
        data: e.data
      });
      this._last_target = false;
    }
    if (target) {

      self.fire('mouse:dragenter', {
        target: target,
        e: e,
        data: e.data
      });
      target.fire('object:dragenter', {
        e: e,
        data: e.data
      });

      this._last_target = target;
    }

  },

  _onClick: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('mouse:click', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      if (
        target.originalState.left == target.left &&
        target.originalState.top == target.top &&
        target.originalState.scaleX == target.scaleX &&
        target.originalState.scaleY == target.scaleY &&
        target.originalState.angle == target.angle
      ) {
        // To unify the behavior, the object's double click event does not fire on drawing mode.
        target.fire('object:click', {
          e: e
        });
      }
    }
  },

  _onTapHold: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:taphold', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's tap hold event does not fire on drawing mode.
      target.fire('taphold', {
        e: e
      });
    }

    if (e.type === 'touchend' && self.touchStartTimer != null) {
      clearTimeout(self.touchStartTimer);
    }
  },

  _onMouseDown: function (e) {
    _onMouseDown_overwritten.call(this, e);
    var self = this;
    if (e.type === 'touchstart') {
      var touchStartTimer = setTimeout(function () {
        self._onTapHold(e);
        self.isLongTap = true;
      }, self.tapholdThreshold);
      self.touchStartTimer = touchStartTimer;
      return;
    }

    // Add right click support
    if (e.which === 3) {
      var target = this.findTarget(e);
      self.fire('mouse:down', {target: target, e: e});
      if (target && !self.isDrawingMode) {
        // To unify the behavior, the object's mouse down event does not fire on drawing mode.
        target.fire('mousedown', {
          e: e
        });
      }
    }
  },

  _onMouseUp: function (e) {

    _onMouseUp_overwritten.call(this, e);

    if (e.type === 'touchend') {
      // Process tap hold.
      if (this.touchStartTimer != null) {
        clearTimeout(this.touchStartTimer);
      }
      // Process long tap.
      if (this.isLongTap) {
        this._onLongTapEnd(e);
        this.isLongTap = false;
      }
      // Process double click
      var now = new Date().getTime();
      var lastTouch = this.lastTouch || now + 1;
      var delta = now - lastTouch;
      if (delta < 300 && delta > 0) {
        // After we detct a doubletap, start over
        this.lastTouch = null;

        this._onDoubleTap(e);
      } else {
        this.lastTouch = now;
      }
    }
  },

  _onDoubleTap: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:doubletap', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's double tap event does not fire on drawing mode.
      target.fire('object:doubletap', {
        e: e
      });
    }
  },

  _onLongTapEnd: function (e) {
    var self = this;

    var target = self.findTarget(e);
    self.fire('touch:longtapend', {
      target: target,
      e: e
    });

    if (target && !self.isDrawingMode) {
      // To unify the behavior, the object's long tap end event does not fire on drawing mode.
      target.fire('object:longtapend', {
        e: e
      });
    }
  },

  _initEventListeners: function () {
    var self = this;
    _initEventListeners_overwritten.call(self);

    fabric.util.addListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.addListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);

    self.on('object:scaling', function (e) {
      if (e.target && e.target._scaling_events_enabled) {
        e.target.fire("scaling", e.e);
      }
    });
    self.on('object:selected', function (e) {
      if (e.target) {
        e.target.fire("object:selected", e.e);
      }
    });
    self.on('mouse:over', function (e) {
      if (e.target) {
        e.target.fire("mouse:over", e.e);
      }
    });

    self.on('mouse:out', function (e) {
      if (e.target) {
        e.target.fire("mouse:out", e.e);
      }
    });

  },

  removeListeners: function () {
    var self = this;
    removeListeners_overwritten.call(self);


    fabric.util.removeListener(self.upperCanvasEl, 'click', self._onClick);
    fabric.util.removeListener(self.upperCanvasEl, 'dblclick', self._onDoubleClick);
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric,{
  debugTimeout: 0
});

fabric.util.object.extend(fabric.Application.prototype, {
  setDebug: function () {
    this.on("ready", function () {
      this.enableDebugging();
    })
  },

  enableDebugging: function(){
    if(fabric.debug){

      var _operand = "color: #2EC06C; font-style: italic;";
      console.info("debug enabled. (use %capp%c, %cproject%c, %ccanvas%c, %ctarget%c in console)",
        _operand, "color: #202020",
        _operand, "color: #202020",
        _operand, "color: #202020",
        _operand, "color: #202020");

      window.app = this;
      window.canvas = this.canvas;
      window.project = this.project;
      window.target = null;
      this.canvas && this.canvas.on("target:changed", function () {
        window.target = this.target;
      });
    }
  }
});

fabric.Object.prototype.debug = function(noBorders){
  var canvas = document.createElement("canvas");
  canvas.width = noBorders ?this.width: this.width + 2;
  canvas.height = noBorders ?this.height : this.height + 2;

  var ctx = canvas.getContext('2d');
  if(!noBorders){
    ctx.lineWidth=1;
    ctx.strokeStyle="yellow";
    ctx.strokeRect(0,0,this.width + 2,this.height+ 2);
    ctx.setLineDash([4,4]);
    ctx.strokeStyle="#000000";
    ctx.strokeRect(0,0,this.width + 2,this.height+ 2);
  }
  ctx.translate(this.width/2  + 1,this.height/2 + 1);
  var _clipTo = this.clipTo;
  delete this.clipTo;
  this.render(ctx,true);
  this.clipTo = _clipTo;
  window.open(canvas.toDataURL(),"_blank");
};


fabric.Application.prototype.logEvents = fabric.Object.prototype.logEvents = function eventsLogger(options){
  var _counter = {};
  for(var i in options){
    _counter[i] = 0;
    this.on(options[i],function(i, event) {
      console.log(i + " " + ++_counter[i],event);
    }.bind(this,i));
  }
};




/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {if(typeof WebFont == "undefined"){
  fabric.webFontsLoader = __webpack_require__(24);
}else{
  fabric.webFontsLoader = WebFont;
}

//интересная библиотека
// http://opentype.js.org/index.html
//todo add step
//
// fabric.Application.prototype.steps.splice(3,0,"loadWebfonts");

fabric.util.object.extend(fabric.Application.prototype, {
  // setWebfonts: function (callback) {
  //
  // },
  setFonts: function (fonts, callback) {
    this.fonts = fonts;
    if(fabric.isLikelyNode){
      //todo шрифты не грузятся на сервере
      return callback();
    }
    // if(!fonts || !fonts.length){
    //   return callback();
    // }
    this.fire("loading",{type: "webfonts"});

    this._fonts = [];

    for(var i in this.fonts){
      this._fonts = this._fonts.concat(this.fonts[i]);
    }
    this._fonts = fabric.util.object.sortBy(this._fonts, function(font){ return font; });

    if(fabric.webFontsLoader && (this.fonts.google && this.fonts.google.length || this.fonts.custom && this.fonts.custom.length) ){
      var fonts_options = {
        active: function () {
          callback();
        }
      };
      if(this.fonts.google && this.fonts.google.length){
        fonts_options.google =  {
          families: this.fonts.google
        };
      }
      if(this.fonts.custom && this.fonts.custom.length){
        fonts_options.custom =  {
          families: this.fonts.custom
        };
      }

      fabric.webFontsLoader.load(fonts_options);
    } else {
      callback();
    }
    if (this.waitForWebfonts) {
      fabric.util.fonts.waitFor(this.waitForWebfonts, callback)
    }
  },
  fonts: {
    standart: [
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Georgia',
      'Impact',
      'Lucida Console',
      'Tahoma',
      'Times New Roman',
      'Geneva',
      'sans-serif',
      'serif',
      'monospace',
      'cursive'
    ],
    google: [],
    custom: []
  }
});


fabric.util.fonts = {
  waitFor: function (fonts, callback) {
    var loadedFonts = 0;
    for (var i = 0, l = fonts.length; i < l; ++i) {
      (function (font) {
        var node = document.createElement('span');
        // Characters that vary significantly among different fonts
        node.innerHTML = 'giItT1WQy@!-/#';
        // Visible - so we can measure it - but not on the screen
        node.style.position = 'absolute';
        node.style.left = '-10000px';
        node.style.top = '-10000px';
        // Large font size makes even subtle changes obvious
        node.style.fontSize = '300px';
        // Reset any font properties
        node.style.fontFamily = 'sans-serif';
        node.style.fontVariant = 'normal';
        node.style.fontStyle = 'normal';
        node.style.fontWeight = 'normal';
        node.style.letterSpacing = '0';
        document.body.appendChild(node);

        // Remember width with no applied web font
        var width = node.offsetWidth;

        node.style.fontFamily = font;

        var interval;

        function checkFont() {
          // Compare current width with original width
          if (node && node.offsetWidth != width) {
            ++loadedFonts;
            node.parentNode.removeChild(node);
            node = null;
          }

          // If all fonts have been loaded
          if (loadedFonts >= fonts.length) {
            if (interval) {
              clearInterval(interval);
            }
            if (loadedFonts == fonts.length) {
              setTimeout(function () {
                callback();
              }, 50)
              return true;
            }
          }
        }

        if (!checkFont()) {
          interval = setInterval(checkFont, 50);
        }
      })(fonts[i]);
    }
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric, __dirname) {


fabric.util.mediaRoot = "";
fabric.util.addNoCache = false;

fabric.util._loadImage_overwritten = fabric.util.loadImage;


fabric.util.object.extend(fabric.Application.prototype, {
  optionsOrder: (function(){
    var oo = fabric.Application.prototype.optionsOrder;
    oo.splice(oo.indexOf("canvasContainer"),0,"mediaRoot");
    return oo;
  })(),
  setMediaRoot: function (_mediaRoot) {
    if (_mediaRoot) {
      var _dirname;
      if (fabric.isLikelyNode) {
        _dirname = __dirname;
      } else {
        _dirname = fabric.util.path.getParentDirectoryUrl(window.location.href);
      }

    //  if ((_mediaRoot.indexOf("./") == 0)) {
    //  }
      var _last = _mediaRoot[_mediaRoot.length - 1];
      if (_last != "/" && _last != "\\") {
        _mediaRoot += "/"
      }
      _mediaRoot = fabric.util.path.resolve(_dirname + _mediaRoot);
      fabric.util.mediaRoot = _mediaRoot;
    }
  }
});




// if(!fabric.isLikelyNode){
//
//   var URL = require('url'),
//     HTTP = require('http'),
//     HTTPS = require('https'),
//     Image = require('canvas').Image;
//
//   /** @private */
//   var request = function (url, encoding, callback) {
//     var oURL = URL.parse(url);
//
//     // detect if http or https is used
//     if ( !oURL.port ) {
//       oURL.port = ( oURL.protocol.indexOf('https:') === 0 ) ? 443 : 80;
//     }
//
//     // assign request handler based on protocol
//     var reqHandler = (oURL.protocol.indexOf('https:') === 0 ) ? HTTPS : HTTP,
//       req = reqHandler.request({
//         hostname: oURL.hostname,
//         port: oURL.port,
//         path: oURL.path,
//         method: 'GET'
//       }, function(response) {
//         var body = '';
//         if (encoding) {
//           response.setEncoding(encoding);
//         }
//         response.on('end', function () {
//           callback(body);
//         });
//         response.on('data', function (chunk) {
//           if (response.statusCode === 200) {
//             body += chunk;
//           }
//         });
//       });
//
//     req.on('error', function(err) {
//       if (err.errno === process.ECONNREFUSED) {
//         fabric.log('ECONNREFUSED: connection refused to ' + oURL.hostname + ':' + oURL.port);
//       }
//       else {
//         fabric.log(err.message);
//       }
//       callback(null);
//     });
//
//     req.end();
//   }
//
//   /** @private */
//   var requestFs = function (path, callback) {
//     var fs = require('fs');
//     fs.readFile(path, function (err, data) {
//       if (err) {
//         fabric.log(err);
//         throw err;
//       }
//       else {
//         callback(data);
//       }
//     });
//   };
//
//   fabric.util.loadImage = function(url, callback, context) {
//
//
//     var img = new Image();
//     img.onerror = function(){
//       console.log("error");
//       callback && callback.call(context, null, true);
//     };
//     img.onload = function(){
//       console.log("success");
//       callback && callback.call(context, img);
//     };
//
//     function createImageAndCallBack(data) {
//       if (data) {
//         img.src = data;
//         // preserving original url, which seems to be lost in node-canvas
//         img._src = url;
//       }
//       else {
//         img = null;
//         callback && callback.call(context, null, true);
//       }
//     }
//
//     if (url && (url instanceof Buffer || url.indexOf('data') === 0)) {
//       img.src = img._src = url;
//     }
//     else if (url && url.indexOf('http') !== 0) {
//       var path = require("path");
//       url = fabric.util.getURL(url);
//       url =   path.resolve(fabric.util.mediaRoot, url);
//       img.src =  url;
//       // requestFs(url, createImageAndCallBack);
//     }
//     else if (url) {
//       request(url, 'binary', createImageAndCallBack);
//     }
//     else {
//       callback && callback.call(context, url);
//     }
//   };
// }else{
  fabric.util.loadResources = function (resources, callback, context, crossOrigin) {

    var loadedResources = {};
    var loader = fabric.util.queueLoad(Object.keys(resources).length,function(){
      callback(loadedResources);
    });
    for(var i in resources){
      (function(i){
        fabric.util.loadImage(resources[i], function(image){
          loadedResources[i] = image;
          loader();
        }, context, crossOrigin);
      }(i));
    }
  };

  fabric.util.loadImage = function (url, callback, context, crossOrigin) {
    url = fabric.util.getURL(url);
    function _check_errors(img){
      //изображение не было загружено
      if (img) {
        callback.call(this,img);
      } else {
        fabric.errors.push({type: "image", message: "Image was not loaded"});
        fabric.util._loadImage_overwritten(fabric.media.error, callback, context, crossOrigin || 'Anonymous');
      }
    }

    if(fabric.debugTimeout){
      setTimeout(fabric.util._loadImage_overwritten.bind(this,url, _check_errors , context, crossOrigin || 'Anonymous'),fabric.debugTimeout)
    }else{
      fabric.util._loadImage_overwritten(url, _check_errors , context, crossOrigin || 'Anonymous');
    }
  };


fabric.util.getURL = function(url){
  if (url.indexOf('blob') !== 0 && url.indexOf('data') !== 0 && url.indexOf('://') == -1) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + new Date().getTime()
  }
  return url;
};


fabric.util.loadVideo = function (sources, callback, context, crossOrigin) {

  function loadIt(url){
    video.src = fabric.util.getURL(url);
    video.addEventListener("loadeddata", function(){
      callback(video);
    }, true);
    video.load();
  }




  var video = document.createElement('video');


  //trying to find the most suitable source for current browser
  for (var type in sources) {
    if(video.canPlayType(type) == "yes"){
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  for (var type in sources) {
    if(video.canPlayType(type) == "maybe"){
      this.mediaType = type;
      loadIt(sources[type]);
      return;
    }
  }
  console.warn("video sources formats is not supported")


};

fabric.util._loadSVGFromURL_overwritten = fabric.loadSVGFromURL;
fabric.loadSVGFromURL = function (url, callback, reviver) {
  if (url.indexOf('data') !== 0 && url.indexOf('://') == -1) {
    url = fabric.util.mediaRoot + url;
  }
  if (fabric.util.addNoCache && /^(http|https)\:\/\//.test(url)) {
    url += '?no-cache=' + moment().format('x');
  }
  fabric.util._loadSVGFromURL_overwritten(url, function(data){
     if(data){
       return callback(data);
     }

    var xml = jQuery.parseXML(atob(fabric.media.error.substr(26)));

    fabric.parseSVGDocument(xml.documentElement, function (results, options) {
      callback && callback(results, options);
    }, reviver);

  }, reviver);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), "/"))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
/*
export interface GalleryData : {
 target: fabricjs object
}
*/


fabric.Application.prototype.setElementFromMenu = function (selectedData) {
  this.canvas.createImageObject(selectedData.image, this.uploadClass);
};

fabric.Application.prototype.createGallery = function (target, $el, options) {
  if($el.constructor === String){
    $el = $("#" + $el);
  }
  options = options || {};

  if(target.galleryCategory){
    options.category = target.galleryCategory;
  }

  $el.empty();
  var library = this.getLibraryElements(options);

  _.each(library,function(libraryItem){
    var img = new Image();
    img.src = fabric.util.mediaRoot + libraryItem.src;

    var $img = $(img).width(100).height(100)
      .click(function(){

        var selectedData = {
          image: img,
          data: libraryItem,
          options: options
        };

        target.setElementFromMenu(selectedData);
      });

    $el.append($img);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

var History = __webpack_require__(66);

History.prototype.insertRecords = false;
History.prototype.actions = {
  undo: {
    keyCode: 'z',
    ctrlKey:  true,
    observe: 'changed',
    className: 'fa fa-undo',
    title: 'undo',
    enabled: 'canUndo',
    action: function(){
      this.undo();
    }
  },
  records: {
    title:          "records",
    itemClassName:  "filters-selector",
    className:      "fa fa-history",
    type:           "select",
    templateSelection: function(state, container) {
      if (state.any) {
        return state.text;
      }
      return $('<span>' + state.id + ":" + state.type + '</span>');
    },
    templateResult: function(state, container,data) {
      if(!state.type)return;
      var _keys = state.originalState && Object.keys(state.originalState).join(',') || '';
      var type = state.object && state.object.type || '';
      return $("<span>{id}:{type}({otype} {keys})</span>".format(fabric.util.object.extend({keys : _keys, otype: type},state)));
      // if(state.id != "none"){
      //   var $canvas = $('<canvas>');
      //   $el.prepend($canvas);
      // }
      // return $el;
    },
    value:      {
      observe: 'changed',
      set : function(val,filtersData){
        this.goto(val);
      },
      get: function(){
        return this.records[this.current].id;
      },
      options: function(){
        return this.records;
      }
    }
  },
  redo: {
    keyCode: 'y',
    ctrlKey:  true,
    observe: 'changed',
    className: 'fa fa-repeat',
    title: 'redo',
    enabled: 'canRedo',
    action: function(){
      this.redo();
    }
  }
};

fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  history: {
    title: 'history',
    type: 'menu',
    target: function () {
      return this.history;
    },
    menu: function () {
      return this.actions;
    }
  }
});



fabric.util.object.extend(fabric.Canvas.prototype, {
  insertHistory: false,
  onObjectModified: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    var _canvas = e.target.canvas || e.target.wrapperEl && e.target;

    this.history.add({
      canvas:  e.target.canvas.originalSlide || e.target.canvas,
      originalState:  e.states.original,
      modifiedState:  e.states.modified,
      object: e.target,
      type: 'object:modified',
      undo: function (_action) {
        _action.object.set(_action.originalState);
        if(_action.canvas.mirrorSlide == this.canvas){
          _action.object.setCoords();
          var _canvas = this.canvas || this;
          _canvas.renderAll();
        }
        _action.canvas.fire('object:modified', { target: _action.object });
        _action.object.fire('modified');
        _action.canvas.renderAll();
      },
      redo: function (_action) {
        _action.object.set(_action.modifiedState);
        _action.object.setCoords();
        if(_action.canvas.mirrorSlide == this.canvas){
          _action.object.setCoords();
          var _canvas = this.canvas || this;
          _canvas.renderAll();
        }
        _action.canvas.fire('object:modified', { target: _action.object });
        _action.object.fire('modified');
        _action.canvas.renderAll();
      }
    });
  },
  clearHistory: function () {
    this.history.clear();
  },
  disableHistory: function () {
    this.history.enabled = false;
  },
  _add_object_history_action: function (_action) {
    var _canvas = this.canvas || this;
    if(this.canvas && _action.canvas.mirrorSlide == this.canvas){
      _canvas.add(_action.object);
      _canvas.setActiveObject(_action.object);
      _canvas.renderAll();
    }else{
      _action.canvas.add(_action.object);
    }
    _action.canvas.renderAll();
  },

  _remove_object_history_action: function (_action) {
    _action.canvas.remove(_action.object);
    _action.canvas.renderAll();
    if(this.canvas && _action.canvas.mirrorSlide == this.canvas){
      this.canvas.renderAll();
    }
  },

  onObjectRemoved: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add({
      canvas: e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:removed',
      redo: this._remove_object_history_action,
      undo: this._add_object_history_action
    });
  },
  onDrawAfter: function(event){
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add(this.freeDrawingBrush.getHistoryRecord(event))
  },
  onObjectAdded: function (e) {
    if (!this.history.enabled || this.processing || this.history.processing) {
      return false;
    }
    this.history.add({
      canvas:  e.target.canvas.originalSlide || e.target.canvas,
      object: e.target,
      type: 'object:added',
      undo: this._remove_object_history_action,
      redo: this._add_object_history_action
    });
  },
  initHistory: function (history) {
    if(!history){
      history = new History(this);
      history.application = this.application;
    }

    this.history = history;
    this.on({
      'loading:begin':    this.clearHistory,
      'draw:after':       this.onDrawAfter,
      'object:modified':  this.onObjectModified,
      'object:added':     this.onObjectAdded,
      'object:removed':   this.onObjectRemoved
    });

    var _this = this;
    this.history.on('changed', function(e){
      if(this.activeAction.canvas){
        this.activeAction.canvas.moment = e.action.moment;
      }
    });
    var proto = this.application.prototypes.History;
    if(proto){
      if(proto.eventListeners){
        history.on(proto.eventListeners);
      }
    }
  },
  enableHistory: function () {
    this.history.enabled = true;
  }
});

fabric.HISTORY_OPTIONS = {
  INDIVIDUAL: 0,
  SHARED: 1
};

fabric.util.object.extend(fabric.Application.prototype, {
  history: true,
  setHistory: function(historyOption){

    if(historyOption === fabric.HISTORY_OPTIONS.SHARED){
      this.history = new History(this);
      this.enableHistory();

      this.on("ready",function(){
        if (this.canvas) {
          this.canvas.initHistory(this.history);
        }
      })

    }
    if(historyOption === fabric.HISTORY_OPTIONS.INDIVIDUAL){
      //todo unsupported
    }

  },
  actions: fabric.util.object.extend(fabric.Application.prototype.actions,{
    history: {
      insert: 'historyTools',
      title: 'history',
      type: 'menu',
      target: function () {
        return this.history;
      },
      menu: function () {
        return this.actions;
      }
    }
  }),
  _default_event_listeners : {
    "slide:change:begin" : function(){
      this.processing = true ;
      if(this.history){
        this.history.processing = true ;
      }
    },
    "slide:changed" : function(){
      this.processing = false;
      if(this.history){
        this.history.processing = false;
      }
    }
  },
  historyTools: false,
  enableHistory: function () {
    this.history.enabled = true;
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

{

  /*
   fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
   type: 'Redify',
   applyTo: function (canvasEl) {
   var context = canvasEl.getContext('2d'),
   imageData = context.getImageData(0, 0,
   canvasEl.width, canvasEl.height),
   data = imageData.data;
   for (var i = 0, len = data.length; i < len; i += 4) {
   data[i + 1] = 0;
   data[i + 2] = 0;
   }
   context.putImageData(imageData, 0, 0);
   }
   });
   fabric.Image.filters.Redify.fromObject = function (object) {
   return new fabric.Image.filters.Redify(object);
   };
   */

  fabric.Image.filters.Sharpen = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Sharpen',
    initialize: function(options) {
      options = options || { };

      this.opaque = options.opaque;
      this.matrix = options.matrix || [
          0, -1, 0,
          -1, 5, -1,
          0, -1, 0
        ];
    }
  });
  fabric.Image.filters.Sharpen.fromObject = function (object) {
    return new fabric.Image.filters.Sharpen(object);
  };

  fabric.Image.filters.Blur = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Blur',
    initialize: function(options) {
      options = options || { };

      var _v = 1 / 9;
      this.opaque = options.opaque;
      this.matrix = options.matrix || [
          _v, _v, _v,
          _v, _v, _v,
          _v, _v, _v
        ];
    }
  });
  fabric.Image.filters.Blur.fromObject = function (object) {
    return new fabric.Image.filters.Blur(object);
  };

  fabric.Image.filters.Emboss = fabric.util.createClass(fabric.Image.filters.Convolute, {
    type: 'Emboss',
    initialize: function(options) {
      options = options || { };

      this.opaque = options.opaque;
      this.matrix = options.matrix || [
          1,   1,   1,
          1, 0.7,  -1,
          -1,  -1,  -1
        ];
    }
  });
  fabric.Image.filters.Emboss.fromObject = function (object) {
    return new fabric.Image.filters.Emboss(object);
  };


  fabric.Image.filters.Mask.prototype.maskFilter = true;

  var prototypeOptions = {
    Brightness: {
      "brightness": {value: 100, min: 0, max: 255}
    },
    Noise: {
      "noise": {value: 100, min: 0, max: 1000}
    },
    Convolute: {
      "opaque": {value: true, type: "boolean" },
      "matrix": {value: [1, 1, 1, 1, 1, 1, 1, 1, 1], type: "matrix" }
    },
    Blur: {},
    Sharpen: {},
    Emboss: {},
    Multiply: {
      "color": {type: 'color', value: "#F0F"}
    },
    Pixelate: {
      "blocksize": {value: 4, min: 2, max: 20}
    },
    Tint: {
      "color":  {type: 'color', value: "#3513B0"},
      "opacity": {value: 1, min: 0, max: 1, step: 0.1}
    },
    Mask: {
      mask: {
        type: 'image',
        value: {
          src:  "photos/explosion.png"
        }
      },
      channel: { value: 0}
    },
    Blend: {
      "color": {type: 'color', value: "#3513B0"},
      "mode": {
        value: "add",
        options: [
          {value: "add", title: "Add"},
          {value: "diff", title: "Diff"},
          {value: "subtract", title: "Subtract"},
          {value: "multiply", title: "Multiply"},
          {value: "screen", title: "Screen"},
          {value: "lighten", title: "Lighten"},
          {value: "darken", title: "Darken"}
        ]
      }
    }
  };


  for(var i in prototypeOptions){
    fabric.Image.filters[i].prototype.options = prototypeOptions[i];
  }



}




fabric.Image.getFiltersList = function(el){

  el = el || fabric.Image.prototype;
  var filterList = [];
  for(var i in el.availableFilters){
    var _f = fabric.Image.filters[el.availableFilters[i]];

    var _data = {
      type:     el.availableFilters[i]
    };
    if(_f.prototype.custom){
      if(!el.customFilters){
        continue;
      }
    }
    if(_f.prototype.maskFilter){
      if(!el.maskFilter){
        continue;
      }
    }
    if(_f.prototype.caman){
      if(!el.camanFilters){
        continue;
      }
      _data.caman = true;
    }else{
      if(!el.fabricFilters){
        continue;
      }
    }
    if(_f.prototype.options){
      _data.options = fabric.util.object.clone(_f.prototype.options);
    }
    _data.text = _f.prototype.title || el.availableFilters[i];

    filterList.push(_data)
  }
  return filterList;
};

fabric.util.object.extend(fabric.Image.prototype, {
  camanFilters: false,
  fabricFilters: true,
  customFilters: false,
  maskFilter: false,
  getFiltersData : function () {
    var _filters = fabric.Image.getFiltersList(this);
    for (var i in this.filters) {
      var _f = fabric.util.object.findWhere(_filters,{type: fabric.util.string.capitalize(this.filters[i].type)})
      if(_f){
        _f.enabled = true;
      }
    }
    return _filters;
  },
  availableFilters: [
    //fabricJS
    "Grayscale",
    "Sepia",
    "Sepia2",
    "Invert",
    "Blur",
    "Sharpen",
    "Emboss",
    "Blend",
    "Tint",
    "Multiply",
    //"Convolute",
    "Noise",
    "Brightness",
    "Pixelate",
    "GradientTransparency",
    "Mask"
  ],
  getFilter: function (filterName) {
    filterName = fabric.util.string.uncapitalize(filterName);
    for(var i in this.filters){
      if(fabric.util.string.uncapitalize(this.filters[i].type) === filterName){
        return this.filters[i];
      }
    }
    return false;
  },
  setFilter: function (filter) {

    var _old_filter = false;
    if(filter.replace){
      this.filters = [];
    }else{
      _old_filter = fabric.util.object.findWhere(this.filters, {type: filter.type});
      _old_filter = _old_filter && _old_filter.toObject() || false;
    }


    if(filter.type){
      var _type = fabric.util.string.capitalize(filter.type,true);
      var _new_filter = filter.options && fabric.util.object.clone(filter.options);


    }else{
      _type = false;
      _new_filter = false;
    }

    /* this.project.history.add({
     data:   [$.extend(true, {}, this.data)],
     slide:  this.slide,
     object: this,
     redo:   filter,
     undo:   _old_filter ,
     type:   "filter",
     undoFn: function(action){
     action.object._set_filter(action.undo);
     },
     redoFn:  function(action){
     action.object._set_filter(action.redo);
     }
     });
     */
    this._set_filter(_type, _new_filter, _old_filter);

  },

  _set_filter: function (_type, _new_filter) {

    if(_type){
      var _old_filter = this.getFilter(_type);
    }

    if (_old_filter && _new_filter) {
      for (var i in _new_filter) {
        _old_filter[i] = _new_filter[i];
      }
    } else if (_old_filter && !_new_filter) {
      this.filters.splice(this.filters.indexOf(_old_filter), 1);
    }
    if (!_old_filter && _new_filter) {
      this.filters.push(new fabric.Image.filters[_type](_new_filter));
    }
    this.applyFilters(this.canvas.renderAll.bind(this.canvas));
  },

  insertImageFilters: false,
  actions : fabric.util.object.extend(fabric.Image.prototype.actions, {
    imageFilters: {
      title: "фильтр",
      itemClassName: "filters-selector",
      className: "fa fa-filter",
      type: "select",
      templateSelection: function (state, container) {
        if (state.any) {
          return state.text;
        }
        return $('<span><span class="color-span" style="background-color:' + state.text + '"></span>' + state.text + '</span>');
      },
      templateResult: function (state, container, data) {
        var $el = $('<span>' + state.text + '</span>');
        if (state.id != "none") {
          var $canvas = $('<canvas>');
          fabric.util.drawFilter($canvas[0], data.target._element, state.id, {
            height: 22
          });
          $el.prepend($canvas);
        }
        return $el;
      },
      value: {
        set: function (val, filtersData) {
          var options = false;
          if (val == "none") {
            val = false;
          } else {
            var _f = _.findWhere(filtersData, {id: val});
            _f.enabled = !_f.enabled;
            for (var i in _f.options) {
              if ($.isNumeric(_f.options[i])) {
                _f.options[i] = parseFloat(_f.options[i]);
              }
            }
            if (_f.enabled) {
              options = {};
              for (var i in _f.options) {
                options[i] = _f.options[i].value;
              }
            }


          }
          this.setFilter({
            type: val,
            options: options,
            replace: true
          });
        },
        get: function () {
          return this.filters.length ? fabric.util.string.capitalize(this.filters[0].type, true) : "none"
        },
        options: function () {

          var _filters = this.getFiltersData();
          for (var i in _filters) {
            _filters[i].id = _filters[i].type;
          }
          return [{
            id: 'none',
            text: 'original',
            enabled: !this.filters || !this.filters.length
          }].concat(_filters);

        }
      }
    }
  })
});

//
// fabric.Image.filterManager = {
//
//   //hide: function(object){
//   //
//   //},
//   show: function (object) {
//     this.activeObject = object;
//     this.fire('show', object);
//     this.on('target:changed', object)
//   }
// // };



// fabric.util.observable(fabric.Image.filterManager);

fabric.util.drawFilter = function(element,src, filterName ,options){
  if(src.constructor === String){
    fabric.util.loadImage(src,function(el){
      fabric.util._drawFilter(element, el, filterName ,options);
    })
  }else{
    fabric.util._drawFilter(element,src, filterName ,options);
  }
};

fabric.util._drawFilter = function(element, el, filterName ,options){

  var ctx =element.getContext("2d");
  if(options){
    if(options.width && options.height){
      element.width = options.width;
      element.height = options.height;
    }else if(options.width){
      element.width = options.width;
      element.height = options.width * (el.height / el.width);
    }else if(options.height){
      element.height = options.height;
      element.width = options.height * (el.width / el.height);
    }
  }

  ctx.drawImage(el,0,0,element.width,element.height);
  if(!filterName)return;
  filterName = fabric.util.string.capitalize(filterName,true);

  if(fabric.Image.filters[filterName]){
    var _filter = new fabric.Image.filters[filterName]()
  }else{
    var _filter =fabric.Image.filters[filterName].create({});
  }

  //var _filter = new fabric.Image.filters[filterName];
  if(_filter){
    var _fo = fabric.Image.filters[filterName].prototype.options;
    var filterOptions = {};
    for(var i in _fo){
      filterOptions[i] = _fo[i].value;

    }
    fabric.util.object.extend(_filter,filterOptions);
    _filter.imageData = ctx.getImageData(0,0,element.width,element.height);
    _filter.applyTo(element);
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {/**
* InteractiveMode mixin. Allow to switch between pan/edit/drawing canvas modes.
*/




var _mouse_down_overwritten = fabric.Canvas.prototype._onMouseDown;
var _mouse_up_overwritten = fabric.Canvas.prototype._onMouseUp;
var _mouse_move_overwritten = fabric.Canvas.prototype._onMouseMove;

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  _initEventListeners_overwritten: fabric.Canvas.prototype._initEventListeners,
  _initEventListeners: function () {
    this._initEventListeners_overwritten();
    this.___onKeyDown = this._onKeyDown.bind(this);
    fabric.util.addListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _removeListeners_overwritten: fabric.Canvas.prototype.removeListeners,
  removeListeners: function () {
    this._removeListeners_overwritten();
    fabric.util.removeListener(fabric.window, 'keydown', this.___onKeyDown);
  },
  _onKeyDown: function (e) {
    return this._applyMixedMode(e);
  },
  getInteractiveMode: function () {
    return this.interactiveMode;
  },
  setInteractiveMode: function (tool) {
    //todo checkthis out
    // if (tool === 'hand') {
    //   this.setCursor('pointer');
    // }
    this.isDrawingMode = (tool === 'draw');
    this.isHandMode = (tool === 'hand');
    this.interactive = (tool !== 'disabled');
    this.isMixedMode = (tool === 'mixed');

    if (!this.interactive) {
      this.upperCanvasEl.style.cursor = 'default';
    }
    this.interactiveMode = tool;
  },

  /**
   *  current mode
   *  @values default | hand | selection
   *  @comment
   *      hand      - moving canvas
   *      draw - drawing reactangles
   *      selection - default behavior
   */
  interactiveMode: 'default',

  isHandMode: false,
  _handModeCursorMove: false,
  _handModeCursorDown: false,
  _handModeCursorPosition: {x: 0, y: 0},
  _handModeMouseMove: function (e) {
    if (this._handModeCursorDown === true) {

      if (e.pageY === this._handModeCursorPosition.y && e.pageX === this._handModeCursorPosition.x) {
        return;
      }

      this._handModeCursorMove = true;

      var scroll = {x: this.viewportTransform[4], y: this.viewportTransform[5]};

      var newScroll = {
        x: scroll.x - (this._handModeCursorPosition.x - e.pageX),
        y: scroll.y - (this._handModeCursorPosition.y - e.pageY)
      };

      var dims = {
        width: this.size.width * this.zoom - this.lowerCanvasEl.width,
        height: this.size.height * this.zoom - this.lowerCanvasEl.height
      };
      /*  todo need to add some restrictions later
       //Math.max(Math.min(0,newScroll.x),-dims.width);
       //Math.max(Math.min(0,newScroll.y),-dims.height);
       */
      this.viewportTransform[4] = newScroll.x;
      this.viewportTransform[5] = newScroll.y;

      this.fire('viewport:translate');

      this.renderAll();
      for (var i = 0, len = this._objects.length; i < len; i++) {
        this._objects[i].setCoords();
      }

      this._handModeCursorPosition.y = e.pageY;
      this._handModeCursorPosition.x = e.pageX;
    }
  },
  _handModeMouseUp: function () {
    this._handModeCursorDown = false;
    if (!this._handModeCursorMove) {

    }
  },
  _handModeMouseDown: function (e) {

    this._handModeCursorMove = false;
    this._handModeCursorDown = true;
    this._handModeCursorPosition = {
      y: e.pageY,
      x: e.pageX
    };
  },
  handModeEnabled: false,
  handModeKey: "Alt",
  _applyMixedMode: function (e) {
    this._current_target = this.findTarget(e);

    if (this.handModeEnabled && e.altKey || e.key === this.handModeKey) {
      //if shift use hand mode
      if (!this.isHandMode) {
        this.isHandMode = true;
        this.isDrawingMode = false;
        this.setCursor('pointer');
      }
    } else if (this.isMixedMode && !this._isCurrentlyDrawing && !this._currentTransform) {

      this.isHandMode = false;

      if (this._current_target) {
        if (this.freeDrawingBrush && this._current_target.allowDrawing) {
          var corner = this._current_target._findTargetCorner(this.getPointer(e, true));
          if (!corner) {
            this.isDrawingMode = true;
          } else {
            this.isDrawingMode = false;
          }
        } else if (this.isDrawingMode) {
          this.isDrawingMode = false;
        }
      } else {
        if (this.freeDrawingBrush && !this.isDrawingMode) {
          this.setCursor(this.freeDrawingCursor);
          this.isDrawingMode = true;
        }
      }
    } else {
      this.isHandMode = false;
    }

  },
  _onMouseMove: function (e) {
    if (!this.interactive) {
      return;
    }

    this._applyMixedMode(e);

    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }

      if (this._handModeActive) {
        return this._handModeMouseMove(e);
      }
      this.fire('mouse:move', {target: this._current_target, e: e});
      this._current_target && this._current_target.fire('mousemove', {e: e});
      return true;
    } else {
      return _mouse_move_overwritten.call(this, e);
    }
  }, /**
   * @private
   */
  _onScale: function (e, transform, x, y) {

    var useUniScale = e.shiftKey ^ this.shiftInverted;
    // rotate object only if shift key is not pressed
    // and if it is not a group we are transforming
    if ((useUniScale || this.uniScaleTransform) && !transform.target.get('lockUniScaling')) {
      transform.currentAction = 'scale';
      return this._scaleObject(x, y);
    }
    else {
      // Switch from a normal resize to proportional
      if (!transform.reset && transform.currentAction === 'scale') {
        this._resetCurrentTransform(e);
      }

      transform.currentAction = 'scaleEqually';
      return this._scaleObject(x, y, 'equally');
    }
  },
  shiftInverted: false,
  _setCursorFromEvent_overwritten: fabric.Canvas.prototype._setCursorFromEvent,
  _setCursorFromEvent: function (e, target) {
    if (this.isHandMode) {
      this.setCursor('pointer');
    } else {
      this._setCursorFromEvent_overwritten(e, target);
    }
  },
  _onMouseDown: function (e) {
    if (!this.interactive) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this._applyMixedMode(e);
    if (this.isHandMode && this._current_target) {
      this._current_target.selectable_overwritten = this._current_target.selectable;
      this._current_target.selectable = false;
    }

    _mouse_down_overwritten.call(this, e);


    if (this.isHandMode) {

      if (this._current_target && this._current_target.selectable_overwritten) {
        this._current_target.selectable = true;
      }
      this._handModeActive = true;
      this._handModeMouseDown(e);
    }
  },

  _onMouseUp: function (e) {
    if (!this.interactive) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    _mouse_up_overwritten.call(this, e);

    if (this.isHandMode) {
      this._handModeActive = false;
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.objectsLibrary = {
  text: {
    title: "Text",
    type: "i-text",
    text: "Текст"
  },
  line: {
    type: "line",
    strokeWidth: 5,
    stroke: "black",
    scaleX: 1,
    scaleY: 1,
    x1: 0,
    x2: 100,
    y1: 0,
    y2: 50
  },
  triangle: {
    type: "triangle",
    width: function(w,h){ return Math.min(w,h) - 4},
    height: function(w,h){ return Math.min(w,h) - 4}
  },
  rectangle: {
    type: "rect",
    width: function(w,h){ return Math.min(w,h) - 4},
    height: function(w,h){ return Math.min(w,h) - 4}
  },
  polygon: {
    scaleX: 1,
    scaleY: 1,
    type: "polygon",
    points: function(w,h) {
      return [
        {x: 25, y: 1},
        {x: 31, y: 18},
        {x: 49, y: 18},
        {x: 35, y: 29},
        {x: 40, y: 46},
        {x: 25, y: 36},
        {x: 10, y: 46},
        {x: 15, y: 29},
        {x:  1, y: 18},
        {x: 19, y: 18}
      ];
    }
  },
  path: {
    "type": "path",
    "path":  "m581.077942,2.537359c-2.053223,0.047071 -4.04071,0.188348 -6.108093,0.352907c-33.05542,2.663918 -62.235901,19.640541 -77.057678,44.925953l-7.8573,19.135319c1.698822,-6.633144 4.302979,-13.065384 7.8573,-19.135319c-26.430695,-22.16293 -63.531677,-32.388445 -100.192383,-27.574373c-36.661469,4.788353 -68.503082,24.041758 -85.901978,51.935225c-49.116486,-24.490013 -110.34288,-22.999454 -157.711807,3.860092c-47.369164,26.86068 -72.61673,74.40551 -64.941162,122.38308l5.021355,19.49968c-2.263329,-6.38501 -3.960793,-12.887695 -5.021355,-19.49968l-0.761948,1.798569c-41.179165,3.625244 -74.945375,29.465134 -83.716398,64.059235c-8.771805,34.597748 9.46701,70.085876 45.185621,87.96701l55.776558,10.973114c-19.480217,1.291962 -38.915543,-2.534515 -55.776558,-10.973114c-27.5478,24.96817 -33.888516,61.935303 -15.71492,92.467834c18.173733,30.524719 56.988899,48.110687 97.030457,44.11734l24.339722,-5.21109c-7.827499,2.651611 -15.960983,4.379059 -24.339722,5.21109c22.730042,33.857269 60.428192,58.556244 104.66893,68.383514c44.2491,9.81366 91.240952,4.014771 130.425949,-16.094604c31.96701,40.793823 88.707642,62.217468 145.596313,54.99707c56.902466,-7.219666 103.833984,-41.81427 120.501343,-88.770996l5.781433,-26.239532c-0.863708,8.909546 -2.742249,17.681366 -5.781433,26.239532c39.133301,20.753662 88.353333,21.927307 128.785095,3.049316c40.439819,-18.874084 65.665771,-54.869049 66.036133,-94.078247l-14.495605,-58.580597l-57.105713,-39.630768c44.163452,22.374573 71.992615,56.467255 71.601318,98.211365c52.49707,0.448181 97.103394,-35.956573 117.112427,-77.726288c20.011597,-41.769836 12.443604,-89.396759 -19.864929,-125.164642c13.401184,-26.637695 12.609985,-56.937332 -2.183472,-83.034088c-14.786194,-26.097893 -42.065491,-45.476891 -74.873047,-53.098335c-7.341431,-34.580929 -37.602661,-62.404482 -77.600708,-71.526293c-39.998474,-9.121368 -82.584839,2.123992 -109.364807,28.926123l-16.258179,22.19817c4.157959,-8.018612 9.583923,-15.495213 16.258179,-22.19817c-18.876953,-21.060713 -48.486023,-32.954061 -79.348938,-32.155401l0,0z",
    "width": function(w,h){return w - 4 },
    "height": function(w,h){return h - 4}
  },
  ellipse: {
    "type": "ellipse",
    "rx": function(w,h){return w /2 - 4},
    "ry": function(w,h){return h/ 2 - 4}
  },
  circle: {
    type: "circle",
    radius: function(w,h){ return Math.min(w,h)/2 - 4}
  }
};

fabric.getObjectsList = function(w,h){
  var _lib = [];
  for(var i in this.objectsLibrary){
    var o = _lib[i] = fabric.util.object.cloneDeep(this.objectsLibrary[i]);
    o.title = o.title || o.type;
    if(o.width === 0 ) o.width = w;
    if(o.height === 0 ) o.height = h;
    for(var j in o){
      if(o[j].constructor == Function){
        o[j] = o[j].call(o,w,h);
      }
    }
  }
  return _lib;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.util.object.extend(fabric.Application.prototype, {
  // loaderTemplate: "<span class='fa fa-pulse fa-spinner canvas-load-spinner'></span>",
  loaderIcon:   'data:image/svg+xml;base64,' + __webpack_require__(18),
  loaderContainer: null,
  _showMainLoaderIndicator: function () {
    this.loaderEl.show();
    this.loaderContainer.addClass("processing");
  },
  _hideMainLoaderIndicator: function () {
    this.loaderEl.hide();
    this.loaderContainer.removeClass("processing");
  },
  setLoaderTemplate: function (val) {
    if(this.virtual) return false;
    this.loaderTemplate = val.replace("{loaderIcon}",this.loaderIcon);
    if(val) {
      this.loaderContainer = $(this.loaderContainer);
      this.loaderEl = $(this.loaderTemplate).hide();
      this.loaderContainer.append(this.loaderEl);
      // this.on("loading:begin", this._showMainLoaderIndicator);
      // this.on("loading:end", this._hideMainLoaderIndicator);


      this.on("project:changed",function(){
        this.project.on("slide:change:begin", this._showMainLoaderIndicator.bind(this));
        this.project.on("slide:changed", this._hideMainLoaderIndicator.bind(this));
      })

    }
  }
});


// fabric.util.object.extend(fabric.SlideCanvas.prototype, {
//   // loaderTemplate: "<span class='fa fa-pulse fa-spinner canvas-load-spinner'></span>",
//   setLoaderTemplate: function (val) {
//     if(this.virtual) return false;
//     this.loaderTemplate = val;
//     if(val) {
//       this.loaderEl = $(this.loaderTemplate).hide();
//       $(this.wrapperEl).append(this.loaderEl);
//       this.on("loading:begin", function () {
//         this.loaderEl.show();
//         $(this.wrapperEl).addClass("processing");
//       });
//       this.on("loading:end", function () {
//         this.loaderEl.hide();
//         $(this.wrapperEl).removeClass("processing");
//       });
//     }
//   }
// });

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

fabric.MagicWand = __webpack_require__(8);

var MagicWand = fabric.MagicWand ;

/**
 * Pathfinder (Pathfinder) Interface for MagicWand selection tool
 * @param options
 * @constructor
 */
function Pathfinder(options) {
  this.initialize(options);
}

Pathfinder.prototype = {
  type: 'pathfinder',
  keepOldSelection: true,
  alphaChannel: true,
  pathfinderMode: 'new',
  selectionTool: 'magic',
  adjacentPixels: true,
  async: false,
  pathfinderTools: false,
  blurRadius: 0,
  hatchLength: 4,
  colorThreshold: 15,
  simplifyTolerant: 0,
  simplifyCount: 30,
  hatchOffset: 0,
  imageInfo: null,
  mask: null,
  downPoint: null,
  allowDraw: false,
  shapeSelectionTools: false,
  initialize: function (options) {

    options.application && options.application.fire('entity:created',{target : this,options : options})

    for (var i in options) {
      this[i] = options[i];
    }
  },
  asyncronous: function (cb) {
    if (this.async) {
      setTimeout(cb);
    } else {
      cb();
    }
  },
  fillWithCurrentColor: function () {
    this.fill(this.color);
  },
  clearMemory: function () {
    delete this.resultCanvas;
    delete this.editedImageCanvas;
    delete this.test_picture;
    delete this.mask;
  },
  hide: function () {
    if (this.editedImageCanvas) {
      this.editedImageCanvas.remove();
      this.resultCanvas.remove();
      clearInterval(this.interval);
      this.clearMemory();
      this.fire('hidden');
    }
  },
  setContainer: function (container) {
    if (container.constructor === String) {
      container = document.getElementById(container);
    }
    this.container = container;

    this.test_picture = new Image();
    this.test_picture.onload = this.initCanvas.bind(this);
    return this;
  },
  getSelectionTool: function () {
    return this.selectionTool;
  },
  setSelectionTool: function (tool) {
    this.selectionTool = tool;
    this.downPoint = false ;
    this.fire('tool:changed', tool);
  },
  getThreshold: function () {
    return this.colorThreshold;
  },
  setThreshold: function (thres) {
    if(thres !== undefined){
      this.colorThreshold = thres;
    }
    if (this.downPoint) {
      this.drawMask(this.downPoint.x, this.downPoint.y, this.adjacentPixels);
    }
    this.fire('threshold:changed', {threshold: this.colorThreshold});
  },
  setPicture: function (img) {
    this.setImage(img);
    var cvs = fabric.util.createCanvasElement();

    cvs.onmouseup = this.onMouseUp.bind(this);
    cvs.onmousedown = this.onMouseDown.bind(this);
    cvs.onmousemove = this.onMouseMove.bind(this);
    cvs.oncontextmenu = function () {
      return false;
    };
    this.initCanvas(cvs);
  },
  load: function (file) {
    if (!file)return;

    if (file.constructor === String) {
      Pathfinder.test_picture.setAttribute('src',file);
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.test_picture.setAttribute('src', e.target.result);
      }.bind(this);
      reader.readAsDataURL(file);
    }
  },
  initCanvas: function (cvs) {
    var img = this.editedImageCanvas;
    if(this.resultCanvas){
      $(this.resultCanvas).remove()
    }
    this.resultCanvas = cvs;
    this.createSelectionDrawCanvas();


    this.context = cvs.getContext('2d');
    cvs.width = img.width;
    cvs.height = img.height;
    //this.setImage(img);
  },
  setImage: function (img) {
    this._test_todo_img = img;
    //this.mask = null;//MagicWand.createMask(img.width,img.height);
    this.editedImageCanvas = fabric.util.createCanvasElement();
    this.editedImageCanvas.width = img.width;
    this.editedImageCanvas.height = img.height;
    this.editedImageCanvas.getContext('2d').drawImage(img, 0, 0);
    this.initCanvas(fabric.util.createCanvasElement())
  },
  getInfo: function () {

    var ctx = this.editedImageCanvas.getContext('2d');
    var imageInfo = ctx.getImageData(0, 0, this.editedImageCanvas.width, this.editedImageCanvas.height);
    imageInfo.bytes = 4;
    return imageInfo;
  },
  getMousePosition: function (e) {
    var scale = this.resultCanvas.width / $(this.resultCanvas).width();
    var target = e.target || e.srcElement,
      rect = target.getBoundingClientRect(),
      offsetX = e.clientX - rect.left,
      offsetY = e.clientY - rect.top;
    return {x: Math.round(offsetX * scale), y: Math.round(offsetY * scale)};
  },
  radius: 20,
  resetSelectionDrawCanvas: function () {
    this.selectionDrawContext.fillStyle = "black";
    //this.selectionDrawContext(0, 0, canvas.width, canvas.height);
    this.selectionDrawContext.fillRect(0,0,this.selectionDrawCanvas.width,this.selectionDrawCanvas.height);
    this.selectionDrawContext.fillStyle = "white";
    this.selectionDrawContext.strokeStyle = "white";
  },
  createSelectionDrawCanvas: function () {

    if(this.selectionDrawCanvas ){
      $(this.selectionDrawCanvas ).remove();
    }
    this.selectionDrawCanvas = fabric.util.createCanvasElement();
    this.selectionDrawCanvas.width  = this.resultCanvas.width;
    this.selectionDrawCanvas.height = this.resultCanvas.height;
    this.selectionDrawContext = this.selectionDrawCanvas.getContext("2d");
    this.resetSelectionDrawCanvas();
  },
  _onMouseDown: function (point) {
    point.x = Math.min(Math.max(0, parseInt(point.x)), this.resultCanvas.width - 1);
    point.y = Math.min(Math.max(0, parseInt(point.y)), this.resultCanvas.height - 1);
    this.allowDraw = true;
    this.drawingTools[this.selectionTool].mouseDown.call(this,point);
  },
  onMouseDown: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this._onMouseDown(this.getMousePosition(e));

  },
  _onMouseMove: function (p) {
    p.x = Math.min(Math.max(0, parseInt(p.x)), this.resultCanvas.width - 1);
    p.y = Math.min(Math.max(0, parseInt(p.y)), this.resultCanvas.height - 1);
    this.drawingTools[this.selectionTool].mouseMove.call(this,p);
  },
  onMouseMove: function (e) {
    var p = this.getMousePosition(e);
    this._onMouseMove(p);
  },
  color: [255, 0, 0, 255],
  onMouseUp: function (e) {
    this.allowDraw = false;
    this.drawingTools[this.selectionTool].mouseUp.call(this,e);
  },
  applyMask: function (canvas, left, top) {
    if (canvas.width === 0 || canvas.height === 0) {
      delete this.mask;
      this.render();
      return;
    }
    var info = this.getInfo(),
      mask = MagicWand.maskSelection(canvas,left,top) ;

    this.mask = mask;
    this.fire('selection:changed', {mask: mask, target: this.target});
  },
  setPathfinderMode: function (value) {
    this.pathfinderMode = value;
  },
  getPathfinderMode: function () {
    return this.pathfinderMode;
  },
  modifySelection: function (mask, pathfinderMode, noEvents) {
    this.shouldModify = false;
    if(this.selectionObject){
      this.selectionObject.remove();
    }
    this.downPoint = false;
    if (mask === undefined) {
      mask = this.mask;
    }
    if (pathfinderMode === undefined) {
      pathfinderMode = this.pathfinderMode;
    }
    if (pathfinderMode !== 'new' && this.oldMask) {
      mask = MagicWand[pathfinderMode](mask, this.oldMask);
    }
    if (this.blurRadius) {
      mask = MagicWand.gaussBlurOnlyBorder(mask, this.blurRadius);
    }
    //if (pathfinderMode !== 'new' && this.oldMask || this.blurRadius) {
    //  mask.cacheInd = MagicWand.getBorderIndices(mask);
    //}

    if(mask && mask.count && this.keepOldSelection){
      mask.makeCache();
      this.oldMask = mask;
    }else{
      delete this.oldMask ;
    }


    this.mask = MagicWand.createMask(this.editedImageCanvas.width, this.editedImageCanvas.height);
    if (!noEvents) {
      this.fire('selection:changed', {mask: mask, target: this.target});
    }
    this.render();
  },
  createSelection: function (mask) {
    if (this.shouldModify) {
      this.modifySelection();
    }

    this.mask = mask || MagicWand.createMask(this.editedImageCanvas.width, this.editedImageCanvas.height);
    this.render();
  },
  setSelection: function (mask) {
    this.mask = mask;
    this.render();
    this.fire('selection:changed', {mask: mask, target: this.target});
  },
  fill: function (color, callback) {
    this.asyncronous(function () {
      this._fill(color, false);
      callback && callback.call(this);
    }.bind(this), 0);
  },
  _fill: function (color, invert, canvas) {


    if (!this.mask) return;


    canvas = canvas || this.editedImageCanvas;
    var ctx = canvas.getContext('2d');//b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY);

    MagicWand.fillMask(ctx, this.mask, color);

    this.fire('image:changed', this.editedImageCanvas);
  },
  hatchTick: function () {
    this.hatchOffset = (this.hatchOffset + 1) % (this.hatchLength * 2);
    this.render(true);
  },
  show: function () {
    while (this.container.lastChild) {
      this.container.removeChild(this.container.lastChild);
    }
    this.container.appendChild(this.editedImageCanvas);
    this.container.appendChild(this.resultCanvas);
    this.interval = setInterval(this.hatchTick.bind(this), 300);

    this.fire('show');
  },
  clear: function (invert, canvas, callback) {
    this.asyncronous(function () {
      this._fill([0, 0, 0, 0], invert, canvas);
      callback && callback.call(this);
    }.bind(this), 0);
  },
  render: function (noBorder) {
    if (!this.context || !this.mask)return;

    var ctx = this.context;
    if (!noBorder) {
      this.mask.cacheInd = MagicWand.getBorderIndices(this.mask);
    }
    ctx.clearRect(0, 0, this.mask.width, this.mask.height);

    var _new_color = (!this.oldMask || this.pathfinderMode == "new" || this.pathfinderMode == "add"|| this.pathfinderMode == "exclude")
      ? this.newMaskColor : this.removedMaskColor;

    var _intersection_color;
    if(this.pathfinderMode == "add" || this.pathfinderMode == "new"|| this.pathfinderMode == "intersect"){
      _intersection_color = this.newMaskColor;
    }else{
      _intersection_color = this.removedMaskColor ;//intersectionRemovedMaskColor;
    }
    var _old_color;
    if(this.pathfinderMode == "exclude" || this.pathfinderMode == "substract"|| this.pathfinderMode == "add"){
      _old_color = this.newMaskColor;
    }else{
      _old_color = this.removedMaskColor;
    }

    this.oldMask && this.oldMask.render(ctx,{
      fill: _old_color
    });


    this.mask.render(ctx,{
      fill: _new_color,
      intersectionColor : _intersection_color,
      outerIntersectionColor : _old_color,
      // outerFill : "rgba(0,0,0,0.5)"
    });

    if(this.renderBorder){
      this.oldMask && this.oldMask.renderBorder(ctx,{});

      this.mask.renderBorder(ctx,{
        hatchOffset: this.hatchOffset
      });
    }

  },
  renderBorder: true,
  intersectionRemovedMaskColor: '#ffaaaa',
  removedMaskColor: '#aaaaff',
  newMaskColor:  '#aaFFaa' ,
  renderMask: function (ctx, mask, color, left, top) {
    mask = mask || this.mask;
    mask && mask.render(ctx,{
      intersectionColor: '#fff',
      outerIntersectionColor: '#000',
      fill :color || '#fff',
      left : left,
      top : top
    })
  },
  getContours: function () {
    if (!this.__cs) {
      this.__cs = MagicWand.traceContours(this.mask);
      this.__cs = MagicWand.simplifyContours(this.__cs, this.simplifyTolerant, this.simplifyCount);
    }
    return this.__cs;
  },
  traceInner: function (ctx) {

    var cs = this.getContours();
    var ctx = ctx || this.context;
    ctx.beginPath();
    for (var i = 0; i < cs.length; i++) {
      if (!cs[i].inner) continue;
      var ps = cs[i].points;
      ctx.moveTo(ps[0].x, ps[0].y);
      for (var j = 1; j < ps.length; j++) {
        ctx.lineTo(ps[j].x, ps[j].y);
      }
    }
    ctx.stroke();
  },
  getColor: function () {
    return 'rgba(' + this.color.join(', ') + ')';
  },
  setColor: function (color) {
    var _arr = color.substring(color.indexOf('(') + 1, color.length - 1).split(', ');
    for (var i in _arr) {
      _arr[i] = parseFloat(_arr[i]);
    }
    _arr[3] = Math.round(_arr[3] * 255);
    this.color = _arr;
  },
  trace: function (ctx) {
    var info = this.getInfo();
    var cs = MagicWand.traceContours(this.mask);
    cs = MagicWand.simplifyContours(cs, this.simplifyTolerant, this.simplifyCount);

    // draw contours
    var ctx = ctx || this.context;
    ctx.clearRect(0, 0, info.width, info.height);
    //inner
    ctx.beginPath();
    for (var i = 0; i < cs.length; i++) {
      if (!cs[i].inner) continue;
      var ps = cs[i].points;
      ctx.moveTo(ps[0].x, ps[0].y);
      for (var j = 1; j < ps.length; j++) {
        ctx.lineTo(ps[j].x, ps[j].y);
      }
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
    //outer
    ctx.beginPath();
    for (var i = 0; i < cs.length; i++) {
      if (cs[i].inner) continue;
      var ps = cs[i].points;
      ctx.moveTo(ps[0].x, ps[0].y);
      for (var j = 1; j < ps.length; j++) {
        ctx.lineTo(ps[j].x, ps[j].y);
      }
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  },
  removeNoise: function (threshold) {

    if(!this.mask || !this.mask.count)return;
    this.createSelectionDrawCanvas();
    //this.renderMask(this.selectionDrawContext, this.mask);

    var cs = MagicWand.traceContours(this.mask);
    cs = MagicWand.simplifyContours(cs, this.simplifyTolerant, this.simplifyCount);

    var ctx = this.selectionDrawContext, v = this.canvas.viewportTransform;

    //  cs = MagicWand.simplifyContours(cs, this.simplifyTolerant, this.simplifyCount);

    ctx.save();
    ctx.translate(0.5,0.5);
    ctx.fillStyle= "#fff";
    //ctx.fillStyle= "#0f0";
    ctx.strokeStyle= "#fff";
    for (var i = 0; i < cs.length; i++) {
      if (!cs[i].inner && cs[i].points.length > threshold) {
        var ps = cs[i].points;
        ctx.beginPath();
        ctx.moveTo(ps[0].x, ps[0].y);
        for (var j = 1; j < ps.length; j++) {
          ctx.lineTo(ps[j].x, ps[j].y);
        }
        ctx.closePath();
        ctx.fill();
      }

    }
    this.mask = MagicWand.maskSelection( this.selectionDrawCanvas);
    this.setSelection(this.mask);

    ctx.restore();
  },

  tools: [
    "adjacentPixels",
    "pathfinderRadius",
    "pathfinderThreshold",
    "selectionTool",
    "pathfinder",
    "fillWithCurrentColor",
    "clear",
    "pathfinderColor"
  ],
  actions : {

    cancelSelection: {
      visible: false,
      key:  'Escape',
      action: function(){
        delete this.shouldModify;
        this.mask = MagicWand.createMask(this.editedImageCanvas.width, this.editedImageCanvas.height);
      }
    },
    modifySelection: {
      visible: false,
      key:  'Enter',
      action: function(){
        if(this.shouldModify){
          this.modifySelection();
        }
      }
    },
    adjacentPixels: {
      className: 'button-adjacent',
      title: 'selet all',
      type: 'checkbox',
      value: 'adjacentPixels',
      visible: function () {
        return this.selectionTool === 'magic';
      },
      observe: 'tool:changed'
    },
    pathfinderRadius: {
      title: 'radius',
      type: 'range',
      value: {
        get: function () {
          return this.radius
        },
        set: function (val) {
          this.radius = val;
        },
        min: 1,
        max: 255
      },
      visible: function () {
        return this.selectionTool === 'brush';
      },
      observe: 'tool:changed'
    },
    pathfinderThreshold: {
      title: 'Threshold',
      type: 'range',
      value: {
        observe: 'threshold:changed',
        get: function () {
          return this.colorThreshold
        },
        set: function (val) {
          this.setThreshold(val);
        },
        min: 0,
        max: 255
      },
      visible: function () {
        return this.selectionTool === 'magic';
      },
      observe: 'tool:changed'
    },
    selectionTool: {
      title: 'selection-tool',
      type: 'options',
      value: 'selectionTool',
      menu: {
        selectionToolBrush: {
          className: 'fa fa-paint-brush',
          title: 'select-brush',
          option: 'brush'
        },
        selectionToolRectangle: {
          className: 'fa fa-square',
          title: 'select-rectangle',
          option: 'rectangle'
        },
        selectionElliptical: {
          className: 'fa fa-circle',
          title: 'select-circle',
          option: 'circle'
        },
        selectionToolMagic: {
          className: 'fa fa-magic',
          title: 'select-magic',
          option: 'magic'
        },
        selectionToolLasso: {
          use: 'shapeSelectionTools',
          title: 'select-lasso',
          option: 'lasso',
          icon: 'data:image/svg+xml;base64,'+ __webpack_require__(17)
        }
      }
    },
    pathfinder: {
      title: 'pathfinder',
      type: 'options',
      value: 'pathfinderMode',
      menu: {
        pathfinderNew: {
          title: 'pathfinder-new',
          option: 'new'
        },
        pathfinderExclude: {
          title: 'pathfinder-exclude',
          option: 'exclude'
        },
        pathfinderSubstract: {
          title: 'pathfinder-substract',
          option: 'substract'
        },
        pathfinderAdd: {
          title: 'pathfinder-add',
          option: 'add'
        },
        pathfinderIntersect: {
          title: 'pathfinder-intersect',
          option: 'intersect'
        }
      }
    },
    fillWithCurrentColor: {
      title: 'fillWithCurrentColor',
      className: 'fa fa-paint-brush'
    },
    clear: {
      className: 'fa fa-eraser',
      id:     'Pathfinder-clear',
      title:  'clear'
    },
    pathfinderColor: {
      title:  'color',
      type:   'color',
      value:  'color'
    }
  }
};

fabric.util.observable(Pathfinder.prototype);

fabric.util.object.extend(Pathfinder.prototype, {
  selectBackground: function (fromCorners) {
    var info = this.getInfo(), mask;

    if (fromCorners) {
      var mask1 = MagicWand.selectBackground(info, [255, 255, 255, false], this.colorThreshold);
      var mask2 = MagicWand.selectBackground(info, [false, false, false, 0], this.colorThreshold);
      mask = MagicWand.add(mask1, mask2);
    } else {
      mask = MagicWand.selectAllByColor(info, [255, 255, 255, 255], this.colorThreshold);
    }

    if (this.blurRadius) {
      mask = MagicWand.gaussBlurOnlyBorder(mask, this.blurRadius);
    }
    this.setSelection(mask);
  },
  colorSelection: function (colors, threshold) {
    var info = this.getInfo(), mask2,
      mask = MagicWand.createMask(info.width, info.height);
    for (var i in colors) {
      var _color = new fabric.Color(colors[i])._source;
      _color[3] = Math.round(_color[3] * 255);
      mask2 = MagicWand.selectAllByColor(info, _color, threshold[i])
      mask = MagicWand.add(mask, mask2);
    }
    delete this.oldMask;
    this.modifySelection(mask);
  },
  smartSelection: function (threshold) {
    var info = this.getInfo(), mask;
    mask = MagicWand.selectBackground(info, null, threshold || this.colorThreshold);
    mask = MagicWand.invertMask(mask);
    delete this.oldMask;
    this.modifySelection(mask);
  }
});


Pathfinder.prototype.drawingTools = {
  brush: {
    mouseUp: function(){
      this.modifySelection();
      this.resetSelectionDrawCanvas();
    },
    mouseMove: function(p){
      if (!this.allowDraw) return;
      this.drawCircle(p.x, p.y, this.radius);
    },
    mouseDown: function(point){
      this.createSelection();
      this.downPoint = point;
      this.createSelectionDrawCanvas();
      this.drawCircle(point.x, point.y, this.radius);
    },
    utils: {
      drawCircle: function (x, y, r) {
        var ctx = this.selectionDrawContext,
          v = this.canvas.viewportTransform;
        ctx.save();
        //  ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        MagicWand.maskSelection( this.selectionDrawCanvas, 0,0, this.mask, 'add');
        this.setSelection(this.mask);
      }
    }
  },
  magic: {
    mouseUp: function(){
      this.shouldModify = true;
    },
    mouseMove: function (p){
      if (!this.allowDraw) return;
      var dist = p.x - this.downPoint.x;

      var val = this._init_thres + dist;
      var thres = Math.min(Math.max(val, 1), 255);
      if (thres != this.colorThreshold) {
        this.setThreshold(thres);
      }
    },
    mouseDown: function (point){
      if (this.shouldModify) {
        this.modifySelection();
      }
      this.downPoint = point;
      this.colorThreshold = 15;
      this.fire('threshold:changed', {threshold: this.colorThreshold});
      this._init_thres = this.colorThreshold;
      this.drawMask(this.downPoint.x, this.downPoint.y, this.adjacentPixels);
      return false;
    },
    utils:{
      drawMask: function (x, y, adjacentPixels) {
        this.asyncronous(this._drawMask.bind(this, x, y, adjacentPixels), 0);
      },
      _drawMask: function (x, y, adjacentPixels) {
        MagicWand.alphaChannel = this.alphaChannel;
        var info = this.getInfo(), mask;
        if (adjacentPixels) {
          MagicWand.floodFill(info, x, y, this.colorThreshold,{},null,function(mask){
            this.setSelection(mask);
          }.bind(this));
        } else {
          mask = MagicWand.selectAll(info, x, y, this.colorThreshold);
          this.setSelection(mask);
        }
      }
    }
  },
  rectangle: {
    mouseDown: function(point) {
      if (this.shouldModify) {
        this.modifySelection();
      }
      this.downPoint = point;
      this.shouldModify = true;
    },
    mouseUp: function(){
      //this.modifySelection();
      //this.resetSelectionDrawCanvas();
    },
    mouseMove: function(p){
      if (!this.allowDraw) return;
      this.drawRectangle(this.downPoint.x, this.downPoint.y, p.x, p.y);
    },
    utils:{
      drawRectangle: function (x, y, x2, y2) {
        var info = this.getInfo(),
          mask = MagicWand.selectRectangle(info, x, y, x2, y2);
        this.setSelection(mask);
      }
    }
  },
  circle: {
    mouseDown: function(point) {
      if (this.shouldModify) {
        this.modifySelection();
      }
      this.downPoint = point;
      this.createSelectionDrawCanvas();
      this.selectionObject = new fabric.Ellipse({
        left: point.x + this.target.left,
        top:  point.y + this.target.top,
        rx:1,
        ry:1,
        hasBorders: false,
        originX: 'center',
        originY: 'center',
        strokeWidth: 1,
        fill: 'transparent',
        stroke: 'transparent'
      });
      this.canvas.add(this.selectionObject);
      this.updateShape();
    },
    mouseUp: function(){
      this.canvas.setInteractiveMode("mixed");
      this.selectionObject.setCoords();
      var _this = this;
      this.selectionObject.on('scaling moving rotating',function(){
        _this.updateShape();
      });
      this.canvas.setActiveObject(this.selectionObject);
      this.shouldModify = true;
      //  this.modifySelection();
      //  this.resetSelectionDrawCanvas();
    },
    mouseMove: function(p){
      if (!this.allowDraw) return;
      this.selectionObject.set({
        rx: Math.abs((p.x + this.target.left -  this.selectionObject.get('left'))) ,
        ry: Math.abs((p.y + this.target.top  - this.selectionObject.get('top')))
      });

      this.updateShape();

    },
    utils:{
      updateShape: function () {
        this.resetSelectionDrawCanvas();
        this.selectionObject.fill = 'white';
        this.selectionDrawContext.save();
        this.selectionDrawContext.translate(-this.target.left, - this.target.top);
        this.selectionObject.render(this.selectionDrawContext);
        this.selectionDrawContext.restore();
        this.selectionObject.fill = 'transparent';
        this.mask = MagicWand.maskSelection( this.selectionDrawCanvas);
        this.setSelection(this.mask);
      }
    }
  },
  lasso: {
    mouseUp: function(){
      if(this.readyToClosePath) {
        this._closePath();
      }
    },
    mouseMove: function(p){
      if (!this.allowDraw) return;
      this.drawLine(this._last_point, p)
      this._points.push(p);
      this._last_point = p;
    },
    mouseDown: function(point){
      if(!this.downPoint){
        this.createSelection();
        this.createSelectionDrawCanvas();
        this._path_out = false;
        this.downPoint = point;
        this._points = [];
        this.selectionDrawContext.beginPath();
        this.canvas.on('mouse:move', this._changeCursorOverClosePoint);
      }
      if(this._last_point){
        if(this.readyToClosePath){
          this._closePath();
        }else{
          this.drawLine(this._last_point, point)
          this._last_point = point;
          this._points.push(point);
        }
      }else{

        this.drawLine({x:point.x - 0.5,y: point.y}, {x:point.x + 0.5,y: point.y })
        this._last_point = {x:point.x + 0.5,y: point.y };
        this._points.push(point);
        this.shouldModify = true;
      }
    },
    utils: {
      drawLine: function (p1 ,p2 ) {
        var ctx = this.selectionDrawContext,
          v = this.canvas.viewportTransform;
        ctx.save();
        //ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
        ctx.restore();
        MagicWand.maskSelection(this.selectionDrawCanvas,0,0,this.mask,'add');
        this.setSelection(this.mask);
      },
      _closePath:  function (e) {

        this.allowDraw = false;
        var ctx = this.selectionDrawContext;
        ctx.beginPath();
        ctx.moveTo(this._points[0].x,this._points[0].y)
        for(var i = 1 ; i < this._points.length;i ++){
          ctx.lineTo(this._points[i].x,this._points[i].y)
        }
        ctx.closePath();
        ctx.fill();
        MagicWand.maskSelection(this.selectionDrawCanvas,0,0,this.mask,'add');
        this.setSelection(this.mask);
        this.resetSelectionDrawCanvas();
        this._points = [];
        delete this.downPoint;
        delete this.readyToClosePath;
        delete this._last_point;
        this.canvas.off('mouse:move', this._changeCursorOverClosePoint);
        this.canvas.freeDrawingCursor = 'crosshair';
        this.canvas.setCursor(this.canvas.freeDrawingCursor);
        // this.drawLine(this._last_point, this.downPoint);
      },
      _changeCursorOverClosePoint:  function (e) {
        var canvas = this,
          pathfinder = canvas.pathfinder;
        if(!pathfinder.target)return;
        var ivt = fabric.util.invertTransform(canvas.viewportTransform),
          p = fabric.util.transformPoint(canvas.getPointer(e.e, true), ivt);
        p.x -= pathfinder.target.left;
        p.y -= pathfinder.target.top;
        if ( pathfinder.downPoint && pathfinder.downPoint.distanceFrom(p) < 10) {
          if(!pathfinder._path_out){
            return;
          }
          pathfinder.readyToClosePath = true;
          canvas.freeDrawingCursor = canvas.targetCursor;
          canvas.setCursor(canvas.freeDrawingCursor);
          //console.log(canvas.freeDrawingCursor);
        } else {
          pathfinder._path_out = true;
          pathfinder.readyToClosePath = false;
          canvas.freeDrawingCursor = 'crosshair';
          canvas.setCursor(canvas.freeDrawingCursor);
          // console.log(canvas.freeDrawingCursor);
        }
      }
    }
  }
};
for(var i in Pathfinder.prototype.drawingTools){
  fabric.util.object.extend(Pathfinder.prototype, Pathfinder.prototype.drawingTools[i].utils)
}
fabric.Pathfinder = Pathfinder;




fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  pathfinder: false,
  setPathfinder: function (val) {
    if (val) {
      this.pathfinder = new fabric.Pathfinder('pathfinder');
      this.pathfinder.canvas = this;
    }
  },
  getPathfinder: function () {
    return this.pathfinder || this.application && this.application.pathfinder;
  }
});

fabric.util.object.extend(fabric.Application.prototype, {
  initPathfinder: function () {
    //if(this.pathfinder){

      this.pathfinder = new fabric.Pathfinder({
        application: this
      });

      this.pathfinder.on("image:changed", function (img) {
        var dataUrl = img.toDataURL();
        if (!this.target._originalElement) {
          this.target._originalElement = this.target._element;
        }
        this.target._element = new Image();

        this.target._element.onload = function(){
          this.target.fire("content:modified")
          this.target.canvas && this.target.canvas.renderAll();
        }.bind(this);

        this.target._element.src = dataUrl;
        this.target._edited = true
        if(this.target.dirty !== "undefined"){
          this.target.dirty = true;
        }


      });
    //}
  }
});

fabric.util.object.extend(fabric.Application.prototype, {
  eventListeners: fabric.util.object.extendArraysObject(fabric.Application.prototype.eventListeners, {
    "ready": function () {
      this.initPathfinder();
    }
  })
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


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

      if(!this.fillBackgroundColorOverCanvas){
        ctx.fillRect(
          object.offsetX || this.viewportTransform[4]/ this.viewportTransform[0],
          object.offsetY || this.viewportTransform[5]/ this.viewportTransform[0],
          this.width * this.viewportTransform[0],
          this.height  * this.viewportTransform[0]);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


var _set_object_scale_overwritten = fabric.Canvas.prototype._setObjectScale;
var _setup_current_transform = fabric.Canvas.prototype._setupCurrentTransform;

fabric.util.object.extend(fabric.Canvas.prototype, {
  _setupCurrentScaleTransform: _setup_current_transform,
  _setupCurrentTransform: function (e, target) {
    if (!target)return;
    if (target.setupCurrentTransform) {
      return target.setupCurrentTransform(e);
    } else {
      if (target.resizable) {
        return this._setupCurrentResizeTransform(e, target);
      } else {
        return this._setupCurrentScaleTransform.call(this, e, target);
      }
    }
  },
  _setObjectScale: function (localMouse, transform, lockScalingX, lockScalingY, by, lockScalingFlip, _dim) {

    var t = transform.target;

    if (!_dim) {
      var strokeWidth = t.stroke ? t.strokeWidth : 0;
      _dim = {
        x: (t.width + (strokeWidth / 2)),
        y: (t.height + (strokeWidth / 2))
      }
    }

    if (t.setObjectScale) {
      return t.setObjectScale(localMouse, transform,
        lockScalingX, lockScalingY, by, lockScalingFlip, _dim);
    }
    else {
      if (t.resizable) {
        return this._setObjectSize(localMouse, transform,
          lockScalingX, lockScalingY, by, lockScalingFlip, _dim);
      } else {
        return _set_object_scale_overwritten.call(this, localMouse, transform,
          lockScalingX, lockScalingY, by, lockScalingFlip, _dim);
      }
    }
  },
  _setObjectSize: function (localMouse, transform, lockScalingX, lockScalingY, by, lockScalingFlip, _dim) {

    var target = transform.target, forbidScalingX = false, forbidScalingY = false;
    var _stroke = transform.target.strokeWidth || 0;
    transform.newWidth = this.width * ((localMouse.x / transform.scaleX) / (this.width + _stroke));
    transform.newHeight = this.height * ((localMouse.y / transform.scaleY) / (this.height + _stroke));

    if(this.wholeCoordinates || target.wholeCoordinates){
      transform.newWidth = Math.round(transform.newWidth);
      transform.newHeight = Math.round(transform.newHeight);
    }
    if(transform.newHeight < 0 ){
      target.top = transform.top - transform.newHeight;
    }
    if (target.minWidth && transform.newWidth <= target.minWidth) {
      transform.newWidth = target.minWidth;
    }
    if (target.minHeight && transform.newHeight <= target.minHeight) {
      transform.newHeight = target.minHeight;
    }
    if (lockScalingFlip && transform.newWidth < target.width) {
      forbidScalingX = true;
    }
    if (lockScalingFlip && transform.newHeight < target.height) {
      forbidScalingY = true;
    }

    if (by === 'equally') {
      forbidScalingX || forbidScalingY || this._resizeObjectEqually(localMouse, target, transform, _dim);
    }
    else if (!by) {
      forbidScalingX || target.setWidth(transform.newWidth);
      forbidScalingY || target.setHeight(transform.newHeight);
    }
    else if (by === 'x' && !target.get('lockUniScaling')) {
      forbidScalingX || target.setWidth(transform.newWidth);
    }
    else if (by === 'y' && !target.get('lockUniScaling')) {
      forbidScalingY || target.setHeight(transform.newHeight);
    }
    return !forbidScalingX && !forbidScalingY;
    //transform.newWidth -= _stroke;
    //transform.newHeight -= _stroke;
  },
  _setupCurrentResizeTransform: function (e, target) {
    this._setupCurrentScaleTransform(e, target);
    this._currentTransform.original.height = target.height;
    this._currentTransform.original.width = target.width;
  },
  _resizeObjectEqually: function (localMouse, target, transform, _dim) {

    var dist = localMouse.y + localMouse.x,
      lastDist = _dim.y * transform.original.height / target.height +
        _dim.x * transform.original.width / target.width;

    transform.newWidth = transform.original.width * dist / lastDist;
    transform.newHeight = transform.original.height * dist / lastDist;

    var ratio = transform.original.height / transform.original.width;
    if (ratio > 1) {
      if (target.minWidth && transform.newWidth <= target.minWidth) {
        transform.newWidth = target.minWidth;
        transform.newHeight = target.minHeight * ratio;
      }
    } else {
      if (target.minHeight && transform.newHeight <= target.minHeight) {
        transform.newHeight = target.minHeight;
        transform.newWidth = target.minWidth / ratio;
      }
    }

    target.setWidth(transform.newWidth);
    target.setHeight(transform.newHeight);
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
if(typeof saveAs == "undefined"){
  fabric.saveAs  = __webpack_require__(23).saveAs;
}else{
  fabric.saveAs = saveAs;
}

fabric.util.object.extend(fabric.SlideCanvas.prototype, {
  insertRenderArea: false,
  insertRenderFull: false,
});


fabric.util.object.extend(fabric.SlideCanvas.prototype.actions, {
  renderArea: {
    className: 'fa fa-download',
    title: 'download',
    action: function () {
      fabric.saveAs(this.getImageData({
        clipped_area: this.activeArea,
        zoom: this.dotsPerUnit,
        clipped_area_only: true,
        draw_background: true
      }).blob, this.title);
    }
  },
  renderFull: {
    title: 'download with background',
    action: function () {
      fabric.saveAs(this.getImageData({
        zoom: this.dotsPerUnit,
        clipped_area_only: false,
        draw_background: true
      }).blob, this.title);
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {/*todo
fabric.SlideCanvas.addPlugin("initialize",function(){
  if(typeof this.freeDrawingBrush == "string" ){
    this.setFreeDrawingBrush(this.freeDrawingBrush);
  }
});*/

fabric.util.object.extend(fabric.SlideCanvas.prototype,{
  /**
   * ['PencilBrush','RectangleBrush']
   */
  activeDrawingTools: [],
  /**
   *
     {
      BrushClassName: {
        className: 'brush className',
        title: 'brush title'
      }
    }
   */
  drawingTools: {},
  insertDrawingTool: false,
  actions: fabric.util.object.extend(fabric.SlideCanvas.prototype.actions,{
    drawingTool: {
      title: 'drawing-tool',
      type: 'options',
      value: 'freeDrawingBrush',
      menu: function(){
        var _tools = {};
        for(var i in this.activeDrawingTools){
          var _tool = this.activeDrawingTools[i];
          _tools[_tool] = fabric.util.object.extend({option: _tool},this.drawingTools[_tool]);
        }
        return _tools;
      }
    }
  }),
  freeDrawingBrush: 'PencilBrush',
  drawingColor: [0,0,0,255],
  _onMouseDownInDrawingMode: function(e) {
    this._isCurrentlyDrawing = true;
    if(!this.freeDrawingBrush.target){
      this.discardActiveObject(e).renderAll();
    }
    if (this.clipTo) {
      fabric.util.clipContext(this, this.contextTop);
    }
    var pointer = this.getPointer(e);
    this.freeDrawingBrush.onMouseDown(pointer);
    this._handleEvent(e, 'down');
  },
  getFreeDrawingBrush: function() {
    if(!this.freeDrawingBrush){
      return "Selection";
    }
    return  fabric.util.string.capitalize(fabric.util.string.camelize(this.freeDrawingBrush.type),true);
  },
  setFreeDrawingBrush: function(brush) {

    if(brush == 'Selection'){
      this.isDrawingMode = false;
      this.freeDrawingBrush = "";
      return;
    }
    var className = fabric.util.string.capitalize(fabric.util.string.camelize(brush),true);
    if(this["__" + className]){
      this.freeDrawingBrush = this["__" + className] ;
    }else{
      this.freeDrawingBrush = this["__" + className] = new  fabric[className](this);
    }
    this.fire("brush:changed",{brush: this.freeDrawingBrush});
  },
  drawZoomedArea : function(ctx,left, top ,width, height , pointer ) {

    width = width || 90;
    height = height || 90;

    ctx.save();
    ctx.translate(left || 0, top || 0);

    ctx.fillStyle = 'black';
    ctx.strokeStyle = "#fff";
    ctx.strokeWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.drawImage(this.backgroundImage._element,Math.floor(pointer.x) - 4, Math.floor(pointer.y) - 4 , 9 , 9, 0,0 , width, width );
    ctx.strokeRect(0,0 , width, width);
    ctx.strokeRect(40 , 40 , 10, 10);
    ctx.restore();
  }
});

fabric.SlideCanvas.prototype.drawingTools.Selection = {
  className: 'fa fa-mouse-pointer',
  title: 'Selection'
};
fabric.SlideCanvas.prototype.activeDrawingTools.push("Selection");

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {fabric.util.createThumb = function(slide, $el){

  var _canvas = slide.canvas,
      firstDraw = true,
      modified,
      _w = +$el.getAttribute("width"),
      _h = +$el.getAttribute("height");

  if (_h) {
    $el.style.height = $el.height;
  }

  function renderThumb() {
    if (_canvas.processing || !_canvas.loaded) {
      return false;
    }
    _canvas.renderThumb($el);
    modified = _canvas.modified;
  }

  function forceRenderThumb() {
    if (this.canvas) {
      if (this.canvas.loaded) {
        this.canvas.renderThumb($el);
      }
      return;
    }
    if (firstDraw && this.data.thumb) {
      var img = new Image();
      img.onload = function () {
        var ctx = $el.getContext("2d");
        ctx.clearRect(0, 0, $el.width, $el.height);
        ctx.drawImage(img, 0, 0, $el.width, $el.height);
        modified = this.modified;
      };
      img.src = this.data.thumb;
      return;
    }

    if (attrs.force !== "true") return;
    var canvas = new fabric.SlideCanvas(null, this.data, function () {
      canvas.renderThumb($el);
      //modified = slide.modified;
    });
  }


  function scaleThumb() {

    var _container = {
      width: _w,
      height: _h,
    };

    var size = {
      width: slide.canvas.originalWidth || slide.canvas.width,
      height: slide.canvas.originalHeight || slide.canvas.height
    };

    var _fitSize = fabric.util.getProportions( size,_container,"fit");

    $el.width = _fitSize.width;
    $el.height = _fitSize.height;


    $el.style.width = _fitSize.width + 'px';
    $el.style.height = _fitSize.height  + 'px';
    renderThumb();
  }

  function canvasChanged() {
    // _canvas && _canvas.off('after:render', renderThumb);
    // if (this.canvas) {
      // _canvas = scope.ffThumb.canvas;
      this.canvas.on('after:render', renderThumb);
      this.canvas.on("dimensions:modified", scaleThumb);
      this.canvas.on("loading:end", scaleThumb);
    // }
  }


  $el.setAttribute("title", slide.title);
  slide.on('canvas:changed', canvasChanged);
  slide.on('modified', forceRenderThumb);

  scaleThumb.call(slide);
  forceRenderThumb.call(slide);
  canvasChanged.call(slide);

};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {
if(!Toolbar){
  var Toolbar = __webpack_require__(1);
  __webpack_require__(72);
  __webpack_require__(74);
  __webpack_require__(75);
  __webpack_require__(76);
  __webpack_require__(73);
}

Toolbar.prototype.setFunctionCallback = function(target){
  if(target.canvas){
    return target.canvas.renderAll();
  }
  if(target.renderAll){
    return target.renderAll()
  }
};


fabric.util.object.extend(fabric.Object.prototype,{
  /**
   *
   * @param tools ["x", "*", "y"]
   * @param proto
   * @returns ["x", "a", "b", "c", "y"]
   * @private
   */
  _getTools: function(tools,proto){
    var indexOfStar = -1;
    if((indexOfStar = tools.indexOf("*")) == -1){
      return tools;
    }

    var klassname = fabric.util.string.capitalize(fabric.util.string.camelize(proto.type),true);
    var protoFabric = fabric[klassname].prototype;
    var protoApp = this.application.prototypes[klassname];

    var tools2 = protoApp && protoApp.tools || protoFabric.tools;
    if(tools2){
      tools.splice.apply(tools, [indexOfStar, 1].concat(tools2));
    }
    return this._getTools(tools, protoFabric.__proto__ );
  },
  setTools: function(tools){
    this.tools = this._getTools(tools , this.__proto__.__proto__);
  },
  makeActions: function(){
    Toolbar.makeActions(this)
  }
});

fabric.util.object.extend(fabric.Application.prototype,{
  toolbar: false,
  setApplicationToolbarContainer: function(containerId) {
    this.applicationToolbarContainer = containerId;
    new Toolbar(this, containerId);
  },
  setCanvasToolbarContainer: function(containerId) {
    this.canvasToolbarContainer = containerId;
    new Toolbar(this.canvas, containerId);
  },
  setObjectsToolbarOptions: function(options) {
    options = _.defaults(options || {
      originX: "left",
      originY: "top",
      marginX: 0,
      marginY: 0
    });

    this.objectsToolbarOptions = options;
  },
  setObjectsToolbarContainer: function(containerId) {
    this.objectsToolbarContainer = containerId;

    var canvas = this.canvas;

    if (containerId) {
      this.$menu = $(document.getElementById(containerId)).hide();
    } else {
      this.$menu = this.$menu || $('<div>');
      $(this.wrapperEl).prepend(this.$menu);
    }
    this.$menu.hide();

    var _last_target = canvas.target;
    canvas.on({
      'object:moving': function (event) {
        var $menu = this.getToolbarContainer();
        canvas.setToolbarCoords($menu, canvas.target, canvas.application.objectsToolbarOptions);
      },
      'target:cleared': function (event) {
        if (_last_target) {
          var $menu = this.getToolbarContainer();
          $menu.hide();
          canvas.objectToolbar.destroy();
          delete canvas.objectToolbar;
          _last_target = null;
        }
      },
      'target:changed': function (event) {
        if (_last_target) {
          canvas.objectToolbar.destroy();
        }
        canvas.createFloatedMenu(this.application.objectsToolbarOptions);
        _last_target = event.target;
      }
    });
  },
  setToolbarOptions: function(toolbarOptions){

    fabric.util.object.deepExtend(Toolbar.tools, toolbarOptions.tools);
    for (var klassName in toolbarOptions.actions) {
      var actions = toolbarOptions.actions[klassName];
      if(!fabric[klassName].prototype.actions){
        fabric[klassName].prototype.actions = {}
      }
      var protoActions = fabric[klassName].prototype.actions;

      if (actions.constructor == Function) {
        actions = actions.call(fabric[klassName].prototype)
      }else{
        actions = fabric.util.object.cloneDeep(actions);
      }
     // var $order = actions["$order"];
     // delete actions["$order"];

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
     /* if($order){
        fabric[klassName].prototype.actions = fabric.util.object.rearrange(protoActions, $order);
      }*/
    }
  },
  eventListeners: fabric.util.object.extendArraysObject(fabric.Application.prototype.eventListeners, {
   // "canvas:created" : function(){
    //  this.initTools();
   // },
   //  "canvas:created": function(){
   //    this.createToolbars();
   //  }
  })
});


fabric.Toolbar = Toolbar;

fabric.util.object.extend(fabric.Canvas.prototype, {
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
    return $(document.getElementById(this.application.objectsToolbarContainer));
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
    this.setToolbarCoords($menu, this.target, this.application.objectsToolbarOptions);
  }
});



/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


fabric.util.uploadImageMaxSize = {
  width: 400,
  height: 400
};

fabric.util.uploadImageMinSize = {
  width: 100,
  height: 100
};

fabric.util.multiUpload = false;

fabric.util.readFile = function(file,callback){

  var reader = new FileReader();
  reader.onload = function (e) {
    var result = e.target.result;
    var type = result.substr(11, result.indexOf(";") - 11);
    var img = new Image();
    img.type = type;
    img.name = file.name;
    img.onload = function () {

      if(!fabric.util.multiUpload){
        if (fabric.util.uploadPreprocessor) {
          fabric.util.uploadPreprocessor([this], function (val) {
            callback(val);
          },options)
        } else {
          callback(this);
        }
      }else{
        callback();
      }
    };
    img.src = result;
  };
  reader.readAsDataURL(file );
};


fabric.util.createUploadInput = function (options, complete, progress) {

  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", true);
  input.className = "hidden";

  $(input).change(function () {

    if(input.files && input.files.length){

      var _loader = fabric.util.queueLoad(input.files.length,function(loaded){

        if(fabric.util.multiUpload){
          if (fabric.util.uploadPreprocessor) {
            fabric.util.uploadPreprocessor(loaded, function (val) {
              complete(val,options);
            },options)
          } else {
            complete(loaded,options);
          }
        }else{
          complete(loaded[0],options);

        }
      },function(total, current, image){
        if(fabric.util.multiUpload) {
          if (progress) {
            progress(total, current, image);
          }
        }
      });



      for(var i =0; i< input.files.length; i++){
        fabric.util.readFile(input.files[i],_loader);
      }



    }

  });

  fabric.util.uploadInput = input;
};


//fabric.util.resizeImage(img, callback);
fabric.util.uploadPreprocessor = null;


fabric.util.uploadImage = function (cb,progress,options) {
  fabric.util.createUploadInput(options,cb,progress);
  $(fabric.util.uploadInput).trigger('click');
};


fabric.util.resizeUploadedImage = function (img, callback) {

  if (img.type === "svg+xml") {
    callback(img);
    return;
  }
  //Here we can put a restriction to upload a minim sized logo
  if (img.width < fabric.util.uploadImageMinSize.width || img.height < fabric.util.uploadImageMinSize.height) {
    alert("Logo is too small. MInimum size is " + fabric.util.uploadImageMinSize.width + "x" + fabric.util.uploadImageMinSize.height);
    callback(false);
    return;
  }

  if (img.width > fabric.util.uploadImageMaxSize.width || img.height > fabric.util.uploadImageMaxSize.height) {

    var size = fabric.util.getProportions(img, fabric.util.uploadImageMaxSize, "fit");

    var filter = new fabric.Image.filters.ResizeDP();

    var canvas = fabric.util.createCanvasElementWithSize(img);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    filter.applyTo(canvas, size.width, size.height);
    callback(canvas);
  } else {
    callback(img);
  }
};


fabric.util.object.extend(fabric.Canvas.prototype,{
  uploadClass: 'Image',
  uploadImageTool: false,
  createImageObject: function (img, objectType) {
    if (!img)return;
    this.createObject({
      position: "center",
      active: true,
      type: this.uploadClass,
      image: img,
      clipTo: this.activeArea,
      movementLimits: this.activeArea
    });
  },
  actions: fabric.util.object.extend(fabric.SlideCanvas.prototype.actions,{
    uploadImage: {
      className:  'fa fa-upload',
      key: 'U',
      title: 'upload image',
      action: function () {
        fabric.util.uploadImage(function(img){
          this.createImageObject(img,this.uploadClass)
        }.bind(this))
      }
    }
  })
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {



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
  // zoom: {
  //   title: "zoom",
  //   menu: zoomOut
  // }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {


var utils = __webpack_require__(3);
utils.object = __webpack_require__(2);


/***********************************************************************************************************************
 ** DPHistory
 ***********************************************************************************************************************/


var DPHistory = function (parent, initAction) {
    this.parent = parent;
    this.clear(initAction);
};

DPHistory.prototype.setRecords = function (records,current) {
  this.canUndo = records.length;
  this.canRedo = false;

  if(!records.length){
    records = [{
      type: 'initialized',
      id: 0,
      text : 'initialized'
    }]
  }
  this.records = records;
  this.length = this.records.length ;
  this.current = current === undefined ? records.length - 1 : current;
  this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};

DPHistory.prototype.restore = function () {
  this.setRecords(this.saved.records,this.saved.current);
  return this;
};

DPHistory.prototype.save = function () {
  this.saved = {
    current: this.current,
    records: utils.object.cloneDeep(this.records)
  }
  return this;
};

DPHistory.prototype.clear = function (initAction) {
    if (initAction) {
        initAction.id = 0;
    } else {
        initAction = {
            type: 'initialized',
            id: 0,
          text : 'initialized'
        }
    }
    this.records = [initAction];
    this.current = 0;
    this.canUndo = false;
    this.canRedo = false;
    this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};


DPHistory.prototype.add = function(action){


    if (!this.enabled || this.processing) {
      return false;
    }

    action.moment = new Date().getTime();
    this.canUndo = true;
    this.canRedo = false;
    this.records.splice(this.current+ 1);
    this.records.push(action);
    this.length = this.records.length;
    action.id = this.length - 1;
    action.text = action.type || action.text;
    this.current = this.length - 1;

  this.activeAction = this.records[this.current];
  this.fire("changed",{action: action});
  return this;
};
DPHistory.prototype.disable = function(){
  this.enabled = false;
  return this;
};
DPHistory.prototype.enable = function(){
  this.enabled = true;
  return this;
};
DPHistory.prototype.undo = function(noFire){
    this.canRedo = true;
    var _action = this.records[this.current];
    this.current--;
  this.processing = true;
    _action.undo.call(this.parent,_action);
  this.processing = false;
    if(this.current == 0){
        this.canUndo = false;
    }
    if(!noFire){
      this.activeAction = this.records[this.current];
      this.fire("changed",{action: _action});
    }
  return this;
};

DPHistory.prototype.goto = function(index){
    if(index == this.current)return;
    if(index < this.current){
        for(var i = this.current - index ;i--; ){
            this.undo(true);
        }
    }if(index > this.current){
        for(var i = index - this.current ;i--; ){
            this.redo(true);
        }
    }
  this.activeAction = this.records[this.current];
  this.fire("changed",{action: this.activeAction});
  return this;
};

DPHistory.prototype.redo = function(noFire){
    if(this.current == this.length - 1){
        return;
    }
  this.processing = true;
    this.canUndo = true;
    this.current++;
    var _action = this.records[this.current];

    _action.redo.call(this.parent,_action);

    if(this.current == this.length - 1){
        this.canRedo = false;
    }
  this.processing = false;
  if(!noFire) {
    this.activeAction = this.records[this.current];
    this.fire("changed",{action: _action});
  }
  return this;
};
utils.observable(DPHistory.prototype);
module.exports = DPHistory;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
fabric.util.object.extend(fabric.PathGroup.prototype,{
  initialize_overwritten: fabric.PathGroup.prototype.initialize,
  initialize: function(paths, options){

    if(paths.constructor != Array){
      options = paths.toObject();
      delete options.paths;
      paths = paths.paths;
    }

    this.initialize_overwritten(paths, options);
  },
  extractColors: function () {
    var _colors = {};
    var _paths = this.paths;
    for (var i in _paths) {
      if (_paths[i].fill.type) {
        for (var j in _paths[i].fill.colorStops) {
          var _color = _paths[i].fill.colorStops[j].color;
          if (!_colors[_color]) _colors[_color] = [];
          _colors[_color].push({object: _paths[i], stop: _paths[i].fill.colorStops[j]});
        }

      } else {
        var _color = _paths[i].fill;
        if (!_colors[_color]) _colors[_color] = [];
        _colors[_color].push({object: _paths[i], color: _paths[i]});
      }
    }
    return _colors;
  }
})

fabric.PathGroup.fromElements = function (elements, object, url) {
  var _options = {
    toBeParsed: true,
    //originX: "center",
    //originY: "center"
  };

  //смещаем элементы так, чтобы их кооринаты начинались от 0.0
  if (elements.length) {

    var minX = Infinity,
      minY = Infinity;
    for (var i in elements) {
      minX = Math.min(elements[i].left, minX);
      minY = Math.min(elements[i].top, minY);
    }


    minX = Math.max(minX, 0);
    minY = Math.max(minY, 0);
    /* for (var i in elements) {
     elements[i].translate(-minX, -minY);
     elements[i].left -= minX;
     elements[i].pathOffset.x -= minX;
     elements[i].top -= minY;
     elements[i].pathOffset.y -= minY;
     }*/
  }

  var el = fabric.util.groupSVGElements(elements, _options, url);

  var scaleX = object.width ? object.width / el.width : null,
    scaleY = object.height ? object.height / el.height : null;
  if (scaleX && !scaleY) {
    scaleY = scaleX;
  }
  if (scaleY && !scaleX) {
    scaleX = scaleY;
  }
  if (!scaleY && !scaleX) {
    scaleX = scaleY = 1;
  }

  delete object.height;
  delete object.width;
  el.set(fabric.util.object.extend(object, {
    //left: 0, top: 0,
    scaleX: scaleX,
    scaleY: scaleY
  }));
  el.setLeft(object.left);
  el.setTop(object.top);
  return el;
};

// fabric.PathGroup.prototype.render = function(ctx,noTransform) {
//   if (!this.visible) {
//     return;
//   }
//   var x = noTransform ? 0 : - this.width * this.scaleX / 2,
//     y = noTransform ? 0 : - this.height * this.scaleY / 2;
//
//   ctx.save();
//   ctx.translate(x,y);
//
//   if (this.transformMatrix) {
//     ctx.transform.apply(ctx, this.transformMatrix);
//   }
//   this.transform(ctx);
//
//   this._setShadow(ctx);
//   this.clipTo && fabric.util.clipContext(this, ctx);
//   ctx.translate(-this.width/2, -this.height/2);
//   for (var i = 0, l = this.paths.length; i < l; ++i) {
//     this.paths[i].render(ctx, true);
//   }
//   this.clipTo && ctx.restore();
//   ctx.restore();
// }






fabric.PathGroup.fromURL = function (url, callback, object) {

  fabric.loadSVGFromURL(url,function(els){

    var el = new fabric.PathGroup(els, {toBeParsed:true});

    // //смещаем элементы так, чтобы их кооринаты начинались от 0.0
    // if (el.paths.length) {
    //
    //   var minX = Infinity,
    //     minY = Infinity;
    //   var maxX = -Infinity,
    //     maxY = -Infinity;
    //
    //   for (var i in el.paths) {
    //     var _p = el.paths[i];
    //     minX = Math.min(_p.left, minX);
    //     minY = Math.min(_p.top, minY);
    //     maxX = Math.max(_p.left + _p.width, maxX);
    //     maxY = Math.max(_p.top + _p.height, maxY);
    //   }
    //
    //   var _W = maxX - minX;
    //   var _H = maxY - minY;
    //   //
    //   //
    //   // minX = Math.max(minX, 0);
    //   // minY = Math.max(minY, 0);
    //   /* for (var i in elements) {
    //    elements[i].translate(-minX, -minY);
    //    elements[i].left -= minX;
    //    elements[i].pathOffset.x -= minX;
    //    elements[i].top -= minY;
    //    elements[i].pathOffset.y -= minY;
    //    }*/
    // }else{
    //   _W = 1;
    //   _H = 1;
    // }

    var scaleX = object.width ? object.width / el.width : null,
      scaleY = object.height ? object.height / el.height : null;
    if (scaleX && !scaleY) {
      scaleY = scaleX;
    }
    if (scaleY && !scaleX) {
      scaleX = scaleY;
    }
    if (!scaleY && !scaleX) {
      scaleX = scaleY = 1;
    }
    // console.log(object.width,el.width,object.height,el.height)
    // console.log(el);
    el.set( {
      scaleX: scaleX ,
      scaleY: scaleY
    });

    callback(el);
  });

  // fabric.loadSVGFromURL(url,function(els){
  //   callback(fabric.PathGroup.fromElements(els, object));
  // });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {

__webpack_require__(45);
__webpack_require__(44);
__webpack_require__(67);
__webpack_require__(7);
__webpack_require__(59);

/**
 * @author Denis Ponomarev
 * @email den.ponomarev@gmail.com
 */
fabric.Clipart = fabric.util.createClass(
  fabric.Group,
  fabric.StrokeMixin,
  fabric.CacheMixin,
  fabric.ImageMixin, {
    type: 'clipart',
    colors: null,
    format: 'svg',
    resizable: true,
    processing: false,
    stateProperties: fabric.Group.prototype.stateProperties.concat(["colors"]),
    optionsOrder: ["*","colors","element"],
    getOriginalSize: function(){
      return {
        width: this.element.width,
        height: this.element.height
      }
    },
    initialize: function (options) {
      options || ( options = {});

      if (options.constructor != Object) {

        var _obj = options.toObject();
        if (options.element) {
          _obj.element = options.element.cloneSync();
          _obj.element.clipTo = _obj._fabric_shape;
        }
        _obj.shape = options.shape;
        options = _obj;
      }

      this.on({
        "scaling": this.updateElement
      });

      this.initShape(options);
      this._fabric_shape.set({
        opacity: 0,
        originX : 'center',
        originY : 'center',
      });

      this.callSuper('initialize', [this._fabric_shape], options);
      this._setWidthHeight(options);
    },
    setShape: function(el,cb){

      el =  fabric.util.object.extend({
        strokeWidthFull: this.shape.strokeWidthFull,
        strokeWidthEmpty: this.shape.strokeWidthEmpty,
        strokeWidthActive: this.shape.strokeWidthActive,
        dashArray : this.shape.dashArray,
        strokeEmpty:  this.shape.strokeEmpty,
        strokeFull:  this.shape.strokeFull,
        strokeActive:this.shape.strokeActive
      },el);

      var _this = this;
      if(el && el.src && !el.paths){
        fabric.loadSVGFromURL(el.src,function(paths,options) {
          el.paths  = paths;
          fabric.util.object.extend(el,options);
          _this._set_shape(el);
          _this.add(_this._fabric_shape)
          _this._apply_shape();
          cb && cb();
        })
      }else{
        _this._set_shape(el);
        _this.add(_this._fabric_shape);
        _this._apply_shape();
        cb && cb();
      }
    },
    setElement: function (element) {
      if(this.element){
        this.remove(this.element);
      }
      if(!element){
        return;
      }
      element.set({
        originX : 'center',
        originY : 'center'
      });
      this.add(element);
      this.element = element;
      if (this.format === 'png' || this.format === 'image/png' || this.format === 'jpeg' || this.format === 'image/jpeg') {
        this._cache = this.element._element;
      } else {
        this._init_color_array();
      }
      this.dirty = true;
      this.canvas && this.canvas.renderAll();
    },
    updateElement: function () {
      if(this.element){
        this.element.scaleX = this.width / this.element.width;
        this.element.scaleY = this.height / this.element.height;
      }
      if(this._fabric_shape){
        this._fabric_shape.set({
          width: this.width,
          height: this.height
        });
      }
      this.dirty = true;
    },
    _render: function (ctx) {
      ctx.save();
      ctx.scale(this.element.scaleX,this.element.scaleY)
      for (var i = 0, l = this.element.paths.length; i < l; ++i) {
        this.element.paths[i].render(ctx, true);
      }
      ctx.restore();
    },
    /**
     * кобъект готовится к замену фото
     */
    activate: function () {
      this._activated = true;
      this._fabric_shape.setOpacity(1);
      this.updateStroke();
      this.canvas.renderAll();
    },
    /**
     * кобъект не готовится к замену фото
     */
    deactivate: function () {
      this._activated = false;
      this.updateStroke();
      this.canvas.renderAll();
    },
    _init_color_array: function () {

      this.processing = true;
      this._colors = this.element.extractColors();

      this.colors = this.colors || {};

      for (var _color in this.colors) {
        this.setClipartColor(_color, this.colors[_color],true)
      }
    },
    setElementFromMenu: function(options){
      var _this = this;
      fabric.PathGroup.fromURL(options.image.src, function (el) {
        _this.setElement(el);
        _this.makeActions();
        _this.canvas.createFloatedMenu(_this.application.objectsToolbarOptions);
      },{
        width: this.width,
        height: this.height
      });
    },
    // render: function (ctx) {
    //   // var x = noTransform ? 0 : - this.width * this.scaleX / 2,
    //   //   y = noTransform ? 0 : - this.height * this.scaleY / 2;
    //   //
    //   // ctx.save();
    //   // ctx.translate(x,y);
    //   fabric.Group.prototype.render.apply(this,arguments)
    //   // ctx.restore();
    // },
    setClipartColor: function (key, value, preventCacheUpdate) {

      if (!value) {
        value = key;
        delete this.colors[key];
      } else {
        this.colors[key] = value;
      }
      var _colors = this._colors[key];
      for (var i in _colors) {
        if (_colors[i].color) {
          _colors[i].color.fill = value;
        }
        if (_colors[i].stop) {
          _colors[i].stop.color = value;
        }
      }

      this.dirty = true;
      this.canvas && this.canvas.renderAll();
    },
    toObject: function (propertiesToInclude) {
      var _obj = this.callSuper('toObject', ['src', 'colors'].concat(propertiesToInclude));
      delete _obj.objects;
      return _obj;
    },
    actions:  {
      source: {
        type: 'effect',
        className: 'fa fa-file-image-o',
        title: "source",
        actionParameters: function ($el, data) {
          data.target.application.createGallery(data.target, $el, data);
        }
      },
      colors: {
        type: 'menu',
        title: 'color menu',
        menu: function () {
          var _menu = [];
          for (var key in this._colors) {
            _menu.push({
              title: "Color (" + key + ")",
              value: {
                defaultValue: key,
                value: this.colors[key] || key,
                get: function (key) {
                  return this.colors[key] || key;
                }.bind(this, key),
                set: this.setClipartColor.bind(this, key)
              },
              type: "color"
            })
          }
          return _menu;
        }
      }
    }
  }
);

fabric.Clipart.async = true;

/**
 * Creates fabric.PathGroup instance from an object representation
 * @static
 * @memberOf fabric.PathGroup
 * @param {Object} object Object to create an instance from
 * @param {Function} callback Callback to invoke when an fabric.PathGroup instance is created
 */
fabric.Clipart.fromObject = function (object, callback) {
  if (typeof object.src === 'string') {
    if (object.format === 'png' || object.format === "image/png" || object.format === 'jpeg' || object.format === "image/jpeg") {
      fabric.Image.fromURL(object.src, function (el) {
        object.element = el;
        callback(new fabric.Clipart(object));
      }, {
        width: object.width || fabric.Clipart.prototype.width,
        height: object.height || fabric.Clipart.prototype.height
      });
    } else {
      fabric.PathGroup.fromURL(object.src, function (el) {
        object.element = el;
        callback(new fabric.Clipart(object));
      }, {
        width: object.width || fabric.Clipart.prototype.width,
        height: object.height || fabric.Clipart.prototype.height
      });
    }
  } else {
    return new fabric.Clipart(object);
  }
};

fabric.util.createAccessors(fabric.Clipart);

if (fabric.objectsLibrary) {
  fabric.util.object.extend(fabric.objectsLibrary, {
    clipart: {
      "width": function (w, h) {
        var _asp = Math.min(285 / 365, w / h);
        return w;
      },
      "height": function (w, h) {
        var _asp = Math.min(285 / 365, w / h);
        return h;
      },
      "type": "clipart",
      "src": "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkY4QzQ2OyIgZD0iTTE2My4xODksNjcuMTQ4QzEyOS42MTYsNjcuMTQ4LDEyMS4yMjIsMCw3OS4yNTUsMEM1Mi43MTMsMCwyOC44OTQsMTYuNzg3LDI4Ljg5NCw1MC4zNjEgICBzNTguNzU0LDUwLjM2MSw0MS45NjcsMTA5LjExNUwxNjMuMTg5LDY3LjE0OHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjhDNDY7IiBkPSJNMzQ3Ljg0NSw2Ny4xNDhDMzgxLjQxOSw2Ny4xNDgsMzg5LjgxMiwwLDQzMS43OCwwYzI2LjU0MiwwLDUwLjM2MSwxNi43ODcsNTAuMzYxLDUwLjM2MSAgIHMtNTguNzU0LDUwLjM2MS00MS45NjcsMTA5LjExNUwzNDcuODQ1LDY3LjE0OHoiLz4KPC9nPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkVCRDI7IiBkPSJNMzMxLjU0MSw0NjEuNjM5QzMzMS41NDEsNDg5LjQ1MywzMTEuNjI2LDUxMiwyNTYsNTEycy03NS41NDEtMjIuNTQ3LTc1LjU0MS01MC4zNjF2LTguMzkzaDE1MC41OTkgICBMMzMxLjU0MSw0NjEuNjM5eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRUJEMjsiIGQ9Ik00NTkuMzY4LDE4Mi45MWMzNC40NDYsNTYuMzAzLDQwLjA0MiwxMDIuNDY3LDQwLjA0MiwxMDIuNDY3aC0xNi43ODcgICBjMCwwLDE2Ljc4Nyw0MS40NDMsMTYuNzg3LDY3LjE0OGwtMjUuMTgtOC4zOTNjMCwwLDE2Ljc4NywzNy43NywxNi43ODcsNjcuMTQ4YzAsMC41MjUtMjUuMTgtOC4zOTMtMjUuMTgtOC4zOTMgICBzMTIuNTksMjguMzI4LDguMzkzLDQxLjk2N2MtMC4xNTQsMC41MDEtMjUuMTgtOC4zOTMtMjUuMTgtOC4zOTNzNy4zNDQsMTkuNTg1LDAsMzMuNTc0bC00MS45NjctMTYuNzg3ICAgYzAsMC03Ljg0NiwyNS42ODEtOC4zOTMsMjUuMThjLTE4LjM2MS0xNi43ODctNDEuOTY3LTI1LjE4LTQxLjk2Ny0yNS4xOEgxNTUuMjc5YzAsMC0yMy42MDcsOC4zOTMtNDEuOTY3LDI1LjE4ICAgYy0wLjU0OCwwLjUtOC4zOTMtMjUuMTgtOC4zOTMtMjUuMThsLTQxLjk2NywxNi43ODdjLTcuMzQ0LTEzLjk4OSwwLTMzLjU3NCwwLTMzLjU3NHMtMjUuMDI2LDguODk1LTI1LjE4LDguMzkzICAgYy00LjE5Ny0xMy42MzksOC4zOTMtNDEuOTY3LDguMzkzLTQxLjk2N3MtMjUuMTgsOC45MTgtMjUuMTgsOC4zOTNjMC0yOS4zNzcsMTYuNzg3LTY3LjE0OCwxNi43ODctNjcuMTQ4bC0yNS4xOCw4LjM5MyAgIGMwLTI1LjcwNSwxNi43ODctNjcuMTQ4LDE2Ljc4Ny02Ny4xNDhIMTIuNTljMCwwLDUuNTk1LTQ2LjE2NCw0MC4wNDItMTAyLjQ2N0g0NTkuMzY4eiIvPgo8L2c+CjxlbGxpcHNlIHN0eWxlPSJmaWxsOiNGRkE1NEI7IiBjeD0iMjU1LjUxNyIgY3k9IjIzMC44MiIgcng9IjIwOS44MzYiIHJ5PSIxOTcuMjQ2Ii8+CjxnPgoJCgkJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNjA0MiAtMC43OTY4IDAuNzk2OCAtMC42MDQyIDYzLjk0NzUgNDk5Ljg5MjYpIiBzdHlsZT0iZmlsbDojRkZFQkQyOyIgY3g9IjE1Ni4xMjMiIGN5PSIyMzQuMDY1IiByeD0iMzcuNzY5IiByeT0iNDYuMTYzIi8+CgkKCQk8ZWxsaXBzZSB0cmFuc2Zvcm09Im1hdHJpeCgtMC42MDQyIDAuNzk2OCAtMC43OTY4IC0wLjYwNDIgNzU1LjkyMDQgOTIuNzAzMSkiIHN0eWxlPSJmaWxsOiNGRkVCRDI7IiBjeD0iMzU0LjkzNyIgY3k9IjIzNC4wODYiIHJ4PSIzNy43NjkiIHJ5PSI0Ni4xNjMiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY4QzQ2OyIgZD0iTTI1NS41MjQsMjYwLjE5N2gtMC4wMTNjLTI4LjcxMSwwLTU1LjA0NSwxOC4yNjgtNjguNTM2LDQ3LjUxMSAgYy0xOC4xNjMsMzkuMzc0LTQwLjU3Myw5MS45OTYtNDAuNTczLDExMS45NjRoMjE4LjIyOWMwLTE5Ljk2Ny0yMi40MDktNzIuNTktNDAuNTczLTExMS45NjQgIEMzMTAuNTY5LDI3OC40NjQsMjg0LjIzNCwyNjAuMTk3LDI1NS41MjQsMjYwLjE5N3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGREVCNzsiIGQ9Ik0zMDQuNzk1LDM2OS4zMTFjLTE5LjM5MywwLTM2Ljg1NSw2LTQ5LjI3OCwxNS41ODhjLTEyLjQyMi05LjU4OC0yOS44ODUtMTUuNTg4LTQ5LjI3OC0xNS41ODggIGMtMzcuNjgyLDAtNjguMjMsMjIuNTQ3LTY4LjIzLDUwLjM2MXMzMC41NDgsNTAuMzYxLDY4LjIzLDUwLjM2MWMxNS43MjgsMCwzMC4xODctMy45NDcsNDEuNzE2LTEwLjU1NCAgYzQuNzY0LTIuNzMsMTAuMzU3LTIuNzMsMTUuMTIyLDBjMTEuNTI5LDYuNjA3LDI1Ljk4OCwxMC41NTQsNDEuNzE2LDEwLjU1NGMzNy42ODIsMCw2OC4yMy0yMi41NDcsNjguMjMtNTAuMzYxICBTMzQyLjQ3OCwzNjkuMzExLDMwNC43OTUsMzY5LjMxMXoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNDY0NjU1OyIgZD0iTTIxNS4zNDQsMzc0Ljk5MWwzMy40OCw0NC4yMzJjMy4zNTgsNC40MzcsMTAuMDI2LDQuNDM3LDEzLjM4NCwwbDMzLjQ4LTQ0LjIzMiAgIGM0LjE4NC01LjUyOCwwLjI0MS0xMy40NTktNi42OTMtMTMuNDU5aC00LjVjLTIuNTIsMC01LjAyNiwwLjM3OC03LjQzMiwxLjEyMmwtMTQuMTE2LDQuMzYxYy00Ljg0MiwxLjQ5Ni0xMC4wMjMsMS40OTYtMTQuODY1LDAgICBsLTE0LjExNi00LjM2MWMtMi40MDgtMC43NDQtNC45MTMtMS4xMjItNy40MzItMS4xMjJoLTQuNDk5QzIxNS4xMDMsMzYxLjUzMiwyMTEuMTYsMzY5LjQ2MywyMTUuMzQ0LDM3NC45OTF6Ii8+Cgk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBjeD0iMTU0Ljc5NiIgY3k9IjIzNS4wMTYiIHI9IjE2Ljc4NyIvPgoJPGNpcmNsZSBzdHlsZT0iZmlsbDojNDY0NjU1OyIgY3g9IjM1Ni4yMzkiIGN5PSIyMzUuMDE2IiByPSIxNi43ODciLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBkPSJNNzcuMzU4LDMzNS4wMDFsNDYuMjA2LTM3LjgwNWM0LjAxMi0zLjI4MywxLjEyMy05Ljc2MS00LjAwMS04Ljk2OWwtNjEuNDc4LDkuNSAgIEM2My4xMjMsMzEwLjg2LDY5LjYxOCwzMjMuMzMxLDc3LjM1OCwzMzUuMDAxeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzQ2NDY1NTsiIGQ9Ik0xMjEuNDkzLDM4Mi41NzdsMjUuMDUyLTY2LjgwN2MxLjkyMi01LjEyNS00LjQ5NC05LjI1Ni04LjM2NC01LjM4NWwtNDUuMTgzLDQ1LjE4MyAgIEMxMDEuNTU1LDM2NS40MDYsMTExLjA5OCwzNzQuNDU1LDEyMS40OTMsMzgyLjU3N3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBkPSJNMjI2LjQwNSwxMDkuMTQ5bC02LjYzMy03Mi42NjdjLTguMTA2LDEuMzA4LTE2LjA1MiwzLjA0NC0yMy44MTEsNS4yMDFsMjEuNTMyLDY5LjIzOSAgIEMyMTkuMTIsMTE2LjE1NywyMjYuOTAzLDExNC42MDksMjI2LjQwNSwxMDkuMTQ5eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzQ2NDY1NTsiIGQ9Ik0yOTEuMjYzLDM2LjQ4MmwtNi42MzMsNzIuNjY3Yy0wLjQ5OCw1LjQ2LDcuMjg0LDcuMDA3LDguOTEzLDEuNzcybDIxLjUzMi02OS4yMzkgICBDMzA3LjMxNSwzOS41MjcsMjk5LjM2OSwzNy43OSwyOTEuMjYzLDM2LjQ4MnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBkPSJNMzM3LjM4Nyw0OS4xNTZsLTIwLjUwOSw0Ny40NDljLTIuMTM3LDQuOTQ2LDQuNTQ5LDguODY4LDcuODIzLDQuNTg4bDMyLjczLTQyLjc5MSAgIEMzNTAuOTQ2LDU1LjAxLDM0NC4yNzEsNTEuOSwzMzcuMzg3LDQ5LjE1NnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBkPSJNMTk0LjE1Nyw5Ni42MDVsLTIwLjUwOS00Ny40NDljLTYuODg0LDIuNzQ1LTEzLjU1OSw1Ljg1My0yMC4wNDQsOS4yNDdsMzIuNzMsNDIuNzkgICBDMTg5LjYwOCwxMDUuNDczLDE5Ni4yOTUsMTAxLjU1MSwxOTQuMTU3LDk2LjYwNXoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NjQ2NTU7IiBkPSJNMjcyLjIyNCwzNC4yNTNjLTUuNTE4LTAuNDA4LTExLjA3Ny0wLjY3OS0xNi43MDctMC42NzljLTUuNjMsMC0xMS4xODksMC4yNzEtMTYuNzA3LDAuNjc5ICAgbDEyLjE2OSwxMDMuNDRjMC42MzMsNS4zOCw4LjQ0Miw1LjM4LDkuMDc1LDBMMjcyLjIyNCwzNC4yNTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNDY0NjU1OyIgZD0iTTQzNC44NjgsMzM1LjAwMWwtNDYuMjA2LTM3LjgwNWMtNC4wMTItMy4yODMtMS4xMjMtOS43NjEsNC4wMDEtOC45NjlsNjEuNDc4LDkuNSAgIEM0NDkuMTA0LDMxMC44Niw0NDIuNjA4LDMyMy4zMzEsNDM0Ljg2OCwzMzUuMDAxeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzQ2NDY1NTsiIGQ9Ik0zOTAuNzMzLDM4Mi41NzdsLTI1LjA1Mi02Ni44MDdjLTEuOTIyLTUuMTI1LDQuNDk0LTkuMjU2LDguMzY0LTUuMzg1bDQ1LjE4Myw0NS4xODMgICBDNDEwLjY3MSwzNjUuNDA2LDQwMS4xMjksMzc0LjQ1NSwzOTAuNzMzLDM4Mi41Nzd6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
    }
  });
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(fabric) {


__webpack_require__(57);
//fabric.require("SlideImage",["SlideObject"/*,"Pathfinder"*/],function() {

fabric.util.object.extend(fabric.Image.prototype, {
  contentOffsets: null,
  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {Boolean} noTransform
   */
  _render: function (ctx, noTransform) {
    var x, y, imageMargins = this._findMargins(), elementToDraw;

    x = (noTransform ? this.left : -this.width / 2);
    y = (noTransform ? this.top : -this.height / 2);

    if (this.meetOrSlice === 'slice') {
      ctx.beginPath();
      ctx.rect(x, y, this.width, this.height);
      ctx.clip();
    }

    if (this.isMoving === false && this.resizeFilters.length && this._needsResize()) {
      this._lastScaleX = this.scaleX;
      this._lastScaleY = this.scaleY;
      elementToDraw = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, true);
    }
    else {
      elementToDraw = this._element;
    }
    this._renderFill(ctx);
    elementToDraw && ctx.drawImage(elementToDraw,
      x + imageMargins.marginX,
      y + imageMargins.marginY,
      imageMargins.width,
      imageMargins.height
    );

    this._stroke(ctx);
    this._renderStroke(ctx);
  },
  imageTools: false,
  photoshopTools: false,
  cloneSync: function () {
    var _object = this.toObject();
    delete _object.filters;
    var clone = new fabric.Image(this._element, _object);
    clone._filteredEl = this._filteredEl;
    clone.filters = this.filters;
    return clone;
  },
  revertChanges: function () {
    var pathfinder = this.canvas.getPathfinder();
    if (pathfinder.target && pathfinder.target == this) {
      pathfinder.hide();
    }

    if (this._element == this._originalElement) {
      return;
    }

    this.filters.length = 0;
    if (this._filteredEl) {
      delete this._filteredEl;
    }
    delete this._edited;
    this._element = this._originalElement;

    this.fire("content:modified", {
      bounds: {minX: 0, minY: 0, maxX: this._element.width, maxY: this._element.height}
    });


    this.canvas.renderAll();
  },
  extractColors: function() {
    var _colors = fabric.MagicWand.extractColors(this._element);
    var colors = {};
    for(var i in _colors){
      var _str = "rgb(" + _colors[i].join(",") + ")";
      colors[_str] = {};
    }
    return colors;
  },
  actions: fabric.util.object.extend( fabric.Image.prototype.actions, {
    photoshopTools: {
      type: 'effect',
      effectTpl: '<div id="editor-tools" class="inline-actions compact"></div>' +
                    '<div class="checkboard" ><div id="pathfinder"></div></div>',
      className: 'fa fa-pencil-square-o',
      title: "advanced tools",
      action: function () {
        var pathfinder = this.canvas.getPathfinder();
        pathfinder.target = this;
        pathfinder.setPicture(this._element);
        pathfinder.show();
      },
      actionParameters: function (el, data) {

        var pathfinder = this.canvas.getPathfinder();
        pathfinder.canvas = this.canvas;

        new fabric.Toolbar(pathfinder, 'editor-tools');


        pathfinder.setContainer('pathfinder');

        // if (pathfinder.target)pathfinder.hide();
        pathfinder.target = this;
        pathfinder.setPicture(this._element);
        pathfinder.show();
      }
    },
    revertChanges: {
      className: 'fa fa-history',
      title: "revert to orignal image",
      action: "revertChanges",
      observe: "content:modified",
      visible: function () {
        return !!this._filteredEl || this._edited;
      }
    }
  })
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
// require("../modules/pathfinder");
__webpack_require__(43);

fabric.util.object.extend(fabric.Image.prototype, {
  removeWhite: function (threshold, removeAll, callback) {


    var rwf = _.findWhere(this.filters, {type: 'RemoveWhiteDP'});

    if (rwf) {
      rwf.options.colorThreshold = threshold;
      rwf.options.fromCorners = !removeAll;
    } else {
      rwf = new fabric.Image.filters.RemoveWhiteDP({
        fromCorners: !removeAll,
        blurRadius: 2,
        colorThreshold: threshold
      });
      this.filters.push(rwf);
    }

    var _this = this;
    this.applyFilters(function () {
      //_this.width = _this._element.width;
      //_this.height = _this._element.height;
      _this.canvas.renderAll();
      _this.fire("content:modified", {filter: rwf, bounds: rwf.bounds});
      callback && callback();
    });
  },
  removeWhiteAll: true,

  actions: fabric.util.object.extend(fabric.Image.prototype.actions, {
    removeWhiteFromBorders: {
      title: 'Remove Background',
      type: 'effect',
      className: "fa fa-dot-circle-o",
      effectTpl: '<button id="select-colors-action-button" class="fa fa-check"></button>' +
      '<input id="select-colors-checkbox" type="checkbox">' +
      '<input id="select-colors-threshold" type="range"   min="1" max="255">',
      actionParameters: function (el, data) {
        var
          actionChk = el.find('#select-colors-checkbox'),
          actionBtn = el.find('#select-colors-action-button');
        data.thresholdEl = el.find('#select-colors-threshold');

        data.removeWhiteAll = actionChk.is(":checked");
        actionChk.change(function () {
          data.removeWhiteAll = actionChk.is(":checked")
        });
        actionBtn.click(function () {
          data.action();
        });
        if (!data.__action) {

          data.__action = data.action;
          data.action = function () {
            data.__action(parseInt(data.thresholdEl.val()), data.removeWhiteAll)
          };
        }
      },
      action: "removeWhite",
      insert: 'imageTools'
    }
  })
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(fabric) {
//----------------------------------------------------------------------------------------------------------------------
// ListStyle

fabric.util.object.extend(fabric.Textbox.prototype, {
  listStyleType: "none",
  listStyleFormat: "N.",
  listTextPadding: 40,
  textPadding: 0,
  setTextPadding: function(val){
    this.textPadding = val;
    this._initDimensions();
  },
  setListStyleType: function(val){
    this.listStyleType = val;
    this.setTextPadding(val === "none" ? 0: this.listTextPadding);
  },
  /**
   * Wraps text using the 'width' property of Textbox. First this function
   * splits text on newlines, so we preserve newlines entered by the user.
   * Then it wraps each line using the width of the Textbox by calling
   * _wrapLine().
   * @param {CanvasRenderingContext2D} ctx Context to use for measurements
   * @param {String} text The string of text that is split into lines
   * @returns {Array} Array of lines
   */
  _wrapText: function(ctx, text) {
    var lines = text.split(this._reNewline), wrapped = [], i;


    this._paragraphs = {};

    for (i = 0; i < lines.length; i++) {
      this._paragraphs[wrapped.length] = this.listStyleFormat.replace("N",i + 1)
      wrapped = wrapped.concat(this._wrapLine(ctx, lines[i], i));
    }

    return wrapped;
  },


  /**
   * Wraps a line of text using the width of the Textbox and a context.
   * @param {CanvasRenderingContext2D} ctx Context to use for measurements
   * @param {String} text The string of text to split into lines
   * @param {Number} lineIndex
   * @returns {Array} Array of line(s) into which the given text is wrapped
   * to.
   */
  _wrapLine: function(ctx, text, lineIndex) {
    var lineWidth        = 0,
      lines            = [],
      line             = '',
      words            = text.split(' '),
      word             = '',
      offset           = 0,
      infix            = ' ',
      wordWidth        = 0,
      infixWidth       = 0,
      largestWordWidth = 0,
      lineJustStarted = true,
      additionalSpace = this._getWidthOfCharSpacing();



    var _textAreaWidth = this.width;
    if(this.textPadding){
      _textAreaWidth -= this.textPadding
    }
    for (var i = 0; i < words.length; i++) {
      word = words[i];
      wordWidth = this._measureText(ctx, word, lineIndex, offset);

      offset += word.length;

      lineWidth += infixWidth + wordWidth - additionalSpace;

      if (lineWidth >= _textAreaWidth && !lineJustStarted) {
        lines.push(line);
        line = '';
        lineWidth = wordWidth;
        lineJustStarted = true;
      }
      else {
        lineWidth += additionalSpace;
      }

      if (!lineJustStarted) {
        line += infix;
      }
      line += word;

      infixWidth = this._measureText(ctx, infix, lineIndex, offset);
      offset++;
      lineJustStarted = false;
      // keep track of largest word
      if (wordWidth > largestWordWidth) {
        largestWordWidth = wordWidth;
      }
    }

    i && lines.push(line);

    if (largestWordWidth > this.dynamicMinWidth) {
      this.dynamicMinWidth = largestWordWidth - additionalSpace;
    }

    return lines;
  },
  /**
   * @private
   * @param {Number} lineWidth Width of text line
   * @return {Number} Line left offset
   */
  _getLineLeftOffset: function(lineWidth) {
    if (this.textAlign === 'center') {
      return (this.width - lineWidth) / 2 + this.textPadding/2;
    }
    if (this.textAlign === 'right') {
      return this.width - lineWidth;
    }
    return this.textPadding;
  },
  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {String} method Method name ("fillText" or "strokeText")
   */
  _renderTextCommon: function(ctx, method) {

    var lineHeights = 0, left = this._getLeftOffset(), top = this._getTopOffset();

    for (var i = 0, len = this._textLines.length; i < len; i++) {
      var heightOfLine = this._getHeightOfLine(ctx, i),
        maxHeight = heightOfLine / this.lineHeight,
        lineWidth = this._getLineWidth(ctx, i),
        leftOffset = this._getLineLeftOffset(lineWidth);


      this._renderTextLine(
        method,
        ctx,
        this._textLines[i],
        left + leftOffset,
        top + lineHeights + maxHeight,
        i
      );
      lineHeights += heightOfLine;
    }
  },


  /**
   * @private
   * @param {String} method Method name ("fillText" or "strokeText")
   * @param {CanvasRenderingContext2D} ctx Context to render on
   * @param {String} line Text to render
   * @param {Number} left Left position of text
   * @param {Number} top Top position of text
   * @param {Number} lineIndex Index of a line in a text
   */
  _renderTextLine: function(method, ctx, line, left, top, lineIndex) {



    // lift the line by quarter of fontSize
    top -= this.fontSize * this._fontSizeFraction;

    switch(this.listStyleType){
      case "decimal":
        if( this._paragraphs[lineIndex]){
          // lift the line by quarter of fontSize
          this._renderChars(method, ctx, this._paragraphs[lineIndex] , left - this.textPadding , top  , lineIndex, 0);
        }
    }


    // short-circuit
    var lineWidth = this._getLineWidth(ctx, lineIndex);
    if (this.textAlign !== 'justify' || this.width < lineWidth) {

      this._renderChars(method, ctx, line, left, top, lineIndex);
      return;
    }


    // stretch the line
    var words = line.split(/\s+/),
      charOffset = 0,
      wordsWidth = this._getWidthOfWords(ctx, words.join(''), lineIndex, 0),
      widthDiff = this.width - wordsWidth - this.textPadding,
      numSpaces = words.length - 1,
      spaceWidth = numSpaces > 0 ? widthDiff / numSpaces : 0,
      leftOffset = 0, word;

    for (var i = 0, len = words.length; i < len; i++) {
      while (line[charOffset] === ' ' && charOffset < line.length) {
        charOffset++;
      }
      word = words[i];
      this._renderChars(method, ctx, word, left + leftOffset, top, lineIndex, charOffset);
      leftOffset += this._getWidthOfWords(ctx, word, lineIndex, charOffset) + spaceWidth;
      charOffset += word.length;
    }
  },
  toggleListStyleType: function(){
    this.setListStyleType(this.listStyleType == "none" ? "decimal" : "none");
    this.canvas.renderAll();
  },
  actions: {
    toggleListStyleType: {
      className: 'fa fa-list-ol',
      title: 'ordered list'
    }
  }

})

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

if(!$.minicolors){
    __webpack_require__(22);
}

if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.colorpicker = function (el, options) {
  options.format = 'rgb';
  options.opacity = true;
  el.minicolors(options);
};

Toolbar.prototype.tools.color = {
  template:
    '<div class="object-menu-item" title="{title}">' +
    '<div class="btn button-{id} {className}">' +
    '<input type="text" data-format="rgba" data-opacity="true" data-text="true" data-control="saturation" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|#0ff"  value="{valueCurrent}" transclude>',
  post: function ($item, data, options, transclude) {
    var target = data.target;

    var _visible = false;
    this.colorpicker(transclude, {
      // value:        data.value.get() ,//|| data.value.get(),
      defaultValue: /*data.value.defaultValue ||*/ data.value.get(),
      control:      transclude.attr('data-control') || 'hue',
      format:       transclude.attr('data-format') || 'hex',
      keywords:     transclude.attr('data-keywords') || '',
      inline:       transclude.attr('data-inline') === 'true',
      letterCase:   transclude.attr('data-letterCase') || 'lowercase',
      opacity:      transclude.attr('data-opacity'),
      position:     transclude.attr('data-position') || this.tools.color.colorpickerPosition || 'right bottom',
      swatches:     transclude.attr('data-swatches') ? transclude.attr('data-swatches').split('|') : [],
      text:     transclude.attr('data-text'),
      hide: function () {
        _visible = false
      },
      show: function () {
        _visible = true;
      },
      change: function (value, opacity) {
        data.value.set(value);
      }
    });

    var _el = $(transclude.parents()[0]).find(".minicolors-panel");

    var _HIDE = function(e){
      if(_visible && $(e.target).parents().index(_el) == -1){
        transclude.minicolors("hide");
      }
    };
    $("body").on("mousedown",_HIDE)
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {


if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.colorpicker = function (el, options) {
  options.format = 'rgb';
  options.opacity = true;
  el.minicolors(options);
};

Toolbar.prototype.tools.effect = {
  scope: function (data, options) {
    return {
      buttonsTitle: options.buttons && options.buttons.title || false,
      isParameters: !!data.actionParameters,
      buttonscClassName: (options.buttons && options.buttons.className || '')
    }
  },
  template: '<div class="object-menu-item" title="{title}">' +
      '<button class="btn button-{id} {className} {buttonscClassName}">' +
      '<span dp-if="buttonsTitle" class="button-title">{title}</span>' +
      '</button>' +
      '<div dp-if="isParameters" class="menu-action-parameters" style="display: none" transclude></div>' +
    '</div>',
    post: function ($item, data, options, transclude) {

    if(data.container){
      transclude = $(document.getElementById(data.container));
    }

    var $tpl;
    var foo = function () {
      if (data.effectTpl) {
        $tpl = $(data.effectTpl);
        transclude.html($tpl);
      }
      if (data.actionParametersId) {
        $tpl = $("#" + data.actionParametersId).clone();
        transclude.html($tpl);
      }
      return data.actionParameters.call(data.target, transclude, data, options);
    };
    this.toggleByButton($item, transclude, foo ,data);
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {


if(!$.fontSelector){
  __webpack_require__(21);
}

if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.fonts = [
  'Arial,Helvetica,sans-serif',
  'Arial Black,Gadget,sans-serif',
  'Comic Sans MS,cursive',
  'Courier New,Courier,monospace',
  'Georgia,serif',
  'Impact,Charcoal,sans-serif',
  'Lucida Console,Monaco,monospace',
  'Lucida Sans Unicode,Lucida Grande,sans-serif',
  'Palatino Linotype,Book Antiqua,Palatino,serif',
  'Tahoma,Geneva,sans-serif',
  'Times New Roman,Times,serif',
  'Trebuchet MS,Helvetica,sans-serif',
  'Verdana,Geneva,sans-serif',
  'Gill Sans,Geneva,sans-serif'
];


Toolbar.prototype.tools.fontFamily = {
  scope: function (data, options) {
    return {
      //currentValue: data.value.get(),
      onchange: function (e) {
        data.value.set(parseFloat($(e.target).val()));
      }
    }
  },
  template: '<div class="object-menu-item object-menu-font-family" title="{title}">' +
  '<div class="fontSelect" transclude><div class="arrow-down">',
    post: function ($item, data, options, transclude) {

    transclude.fontSelector({
      'hide_fallbacks': true,
      'initial': data.value.get(),//'Courier New,Courier New,Courier,monospace',
      'selected': data.value.set.bind(data.target),
      'fonts': data.data
    });
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

;
if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.updateSelectedOption = function(data){
  var $checked = data.$item.find(":checked");
  var $checkedOptionEl = $($checked.parents()[0]);


  var selOption = data.$item.find('.btn-selected-option');
  selOption.html( $checkedOptionEl.find("label")[0].outerHTML );
};

Toolbar.prototype.tools.option = {
  scope: function (data, options) {
    var _self = this;
    return {
      parentId: data.parent.id,
      valueCurrent: data.parent.value.get() === data.option,
      onchange: function () {
        //оптимизировать

        var $checked = data.$item.find(":checked");
        var _value = $checked.val();
        if (_value == data.option) {
          data.parent.value.set(_value);
        }
        _self.updateSelectedOption(data.parent);
      }
    }
  },
  template:
    '<div class="object-menu-item object-menu-option " title="{title}" >' +
    '<input type="radio" id="tool-{id}" dp-checked="{valueCurrent}" name="{parentId}" value="{option}" onchange="onchange()">' +
    '<label class="btn button-{id} {className}" for="tool-{id}">' +
      '<img dp-if="icon" dp-src="icon">' +
      '<span dp-include="svg" dp-if="svg"></span>' +
      '<span dp-if="title" class="option-title">{title}</span>'
};

Toolbar.prototype.tools.options = {
  scope: function (data, options) {
    return {
      className: data.className || 'items-column',
      buttonsTitle: options.buttons && options.buttons.title || false,
      buttonsClassName: (options.buttons.className || '')
    }
  },
  template:
  '<div class="object-menu-item object-menu-options {className}" title="{title}">' +
  '<div class="btn btn-selected-option"></div>' +
  '<div class="object-menu-options-container" transclude>',
  post: function ($item, data, options, transclude) {
    this.generateMenu(data.target, transclude, options, data.menu);
    this.updateSelectedOption(data);
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

;
if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(1);
}

Toolbar.prototype.tools.select =  {
  scope: function (data, options) {
    return {
      getInputValue: function () {
        return parseFloat(data.$item.find("input").val());
      },
      getValue: data.value.get,
      setValue: data.value.set,
      onchange: function (e,model) {
        data.value.set(e.params.data.id,model);
      }
    }
  },
  template: '<div class="object-menu-item object-menu-select {itemClassName}" title="{title}" ><label for="xxx" class="btn button-{id} {className}"></label><select id="xxx">',
  post: function ($item, data, options, tool, val) {
    var model =  data.value.options();
    var _val = data.value.get();
    var _select = $item.find("select");
    _select.dpSelect({
      minimumResultsForSearch: Infinity,
      dropdownParent: $("body"),
      data:  model,
      templateSelection: function(state, container) {
        return data.templateSelection(state, container,data);
      },
      templateResult: function(state, container){
        return data.templateResult(state, container,data);
      },
    }).on("select2:select", function(e) {
      data.onchange(e, model);
    });
    _select.dpSelect("val",[_val]);
  }
}


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);