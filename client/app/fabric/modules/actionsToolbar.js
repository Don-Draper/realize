
var Toolbar =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var utils = __webpack_require__(10);
utils.object = __webpack_require__(1);
utils.compile = __webpack_require__(9);

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
  this.actions = Toolbar.makeActions(PARENT, menu);

  if(el.constructor == String){
    el = $(document.getElementById(el));
  }
  if(el.length && Object.keys(this.actions).length){
    this.generateMenu(PARENT, el, options, this.actions);
    this.onCreate();
    el.show();
  }
  Toolbar.initKeys(this.actions);
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

Toolbar.makeActions = function (PARENT, actions) {
  if (!PARENT._actionsReady) {

    actions = actions || PARENT.actions;

    var result = {};

    for (var i in actions) {
      var _action = this.makeAction(i, actions[i], PARENT);
      if(_action){
        result[i] = _action;
      }
    }
    PARENT._actionsReady = true;
    PARENT.actions = result;
  }
  return PARENT.actions;
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


  var _insert = _ORIGINAL.insert;
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

  if(!_insert)return;

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
      template: '<div class="object-menu-item object-menu-label" title="{title}">',
      render: function ($item, data, options, tool, val) {
        var scope = fabric.util.object.defaults(tool.scope.call(this, data, options),data);
        $item.html(data.template.format(data.value.get()));
        utils.compile.compileElement($item,scope);
      }
    },
    "select": {
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
      template: '<div class="object-menu-item object-menu-number" title="{title}">' +
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
      template: '<div class="object-menu-item object-menu-range" title="{title}">' +
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
      '<div class="object-menu-item object-menu-checkbox" title="{title}">' +
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
    "effect": {
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


        var foo = function () {

          if (data.effectTpl) {
            var $tpl = $(data.effectTpl);
            transclude.html($tpl);
          }

          if (data.actionParametersId) {
            var $tpl = $("#" + data.actionParametersId).clone();
            transclude.html($tpl);
          }
          return data.actionParameters.call(data.target, transclude, data, options);
        }


        this.toggleByButton($item, transclude, foo ,data);
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
      '<div class="object-menu-item" title="{title}">' +
      '<button class="btn button-{id} {className} {buttonscClassName}"  onclick="!disabled && action(option)">' +
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
            tool.post.call(this,$item, scope, options, transclude.length ? transclude : null);
          }
          if(tool.render){
            tool.render.call(this, $item, data, options, tool, val);
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





/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(3);

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
/* 2 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

if(!$.minicolors){
    __webpack_require__(8);
}

if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(0);
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
      defaultValue: 'rgb(0,0,0,1)',//data.value.defaultValue || data.value.get(),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


if(!$.fontSelector){
  __webpack_require__(7);
}

if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(0);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

;
if(typeof Toolbar === "undefined"){
  var Toolbar = __webpack_require__(0);
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
/* 7 */
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
    module.exports = factory(__webpack_require__(2));
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
/* 8 */
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
    module.exports = factory(__webpack_require__(2));
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
/* 9 */
/***/ (function(module, exports) {


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
module.exports = utils;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var objectUtils = __webpack_require__(1)
_ = __webpack_require__(3);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Toolbar = __webpack_require__(0);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);

module.exports = Toolbar;


/***/ })
/******/ ]);