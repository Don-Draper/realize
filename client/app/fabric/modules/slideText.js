'use strict';



  //fabric.require('SlideText', ['SlideObject'], function () {

fabric.util.object.extend(fabric.Text.prototype,{
    editTool: false,
    advancedColorsTools: false,
    textFontSizeTools: false,
    textAligmentTools: false,
    advancedTextStyleTools: false,
    rasterizeTool: false,
    rasterizeKlass: fabric.Image,
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




  });

  var _TEX = fabric.IText.prototype;
  fabric.Text.prototype.actions = fabric.util.object.extend({}, fabric.Object.prototype.actions, {
      rasterizeText: {
        insert: 'rasterizeTool',
        className: 'button-easel',
        title: 'rasterizeText',
        action: _TEX.rasterizeText
      },
      fill: {
        type: 'color',
        title: 'fill',
        insert: '!advancedColorsTools',
        value: 'fill'
      },
      colors: {
        className: 'colors',
        type: 'menu',
        title: 'colors',
        toggled: true,
        insert: 'advancedColorsTools',
        menu: {
          textBgcolor: {
            type: 'color',
            title: 'bgColor',
            value: {
              get: _TEX.getBgColor,
              set: _TEX.setBgColor
            }
          },
          textTextbgcolor: {
            type: 'color',
            title: 'textBgColor',
            value: {
              get: _TEX.getTextBgColor,
              set: _TEX.setTextBgColor
            }
          },
          textFill: {
            type: 'color',
            title: 'fill',
            value: {
              get: _TEX.getFill,
              set: _TEX.setFill
            }
          }
        }
      },
      textStyle: {
        type: 'menu',
        title: 'text style',
        toggled: true,
        className: 'fa fa-font',
        style: 'generateTextStyle',
        menu: {
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
        }
      }
    }
  );
  fabric.IText.prototype.actions = fabric.util.object.extend({}, fabric.Text.prototype.actions, {
      textEdit: {
        insert:     'editTool',
        className:  'fa fa-pencil-square-o',
        title:      'edit',
        action:     _TEX.enterEditing
      }
    }
  );
/*
  fabric.Text.async = true;
  fabric.Text.fromObject = function (object, callback) {
    var _total = 0, loaded = 0;

    function create() {
      if (object.curve) {
        var f = new fabric.CurvedText(object.text, object);
      } else {
        var f = new fabric.IText(object.text, object);
      }
      callback && callback(f);
    }
    _.recoursive(object,
      function (property, value, parent) {

        if (property == 'pattern') {
          _total++;
          //  var _texture = _.findWhere(o.project.textures,{id: parent[property]});

          var _texture = fabric.texturesPath + parent[property];

          fabric.util.loadImage(_texture, function (img) {
            //this[property] = new fabric.Image(img);

            parent['fill'] = new fabric.Pattern({
              source: img,
              repeat: 'repeat'
            });
            delete parent[property];
            loaded++;
            if (_total == loaded)create();
          });

          //
          //parent['fill'] = new fabric.Pattern({
          //    source: _texture,
          //    repeat: 'repeat'
          //});
        }
      }
    );
    if (_total == loaded) {
      return create();
    }
  };*/
