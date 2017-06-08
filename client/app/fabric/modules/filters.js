'use strict';

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
  actions : fabric.util.object.extend(fabric.Image.prototype.actions || {}, {
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
          fabric.util.drawFilter($canvas[0], data.target.src, state.id, {
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
  var ctx =element.getContext("2d");
  fabric.util.loadImage(src,function(el){

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
  })
};


