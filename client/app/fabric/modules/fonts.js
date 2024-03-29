if(typeof WebFont == "undefined"){
  fabric.webFontsLoader = require("./../../plugins/webfont.js");
}else{
  fabric.webFontsLoader = WebFont;
}

//интересная библиотека
// http://opentype.js.org/index.html
//todo add step
//
// fabric.Application.prototype.steps.splice(3,0,"loadWebfonts");

fabric.util.object.extend(fabric.Application.prototype, {
  loadWebfonts: function (callback) {
    if(fabric.isLikelyNode){
      //todo шрифты не грузятся на сервере
      return callback();
    }
    if(this.options.fonts){
      if(!this.fonts)this.fonts = {};
      this.fonts = fabric.util.object.extend(this.fonts,this.options.fonts);
    }
    if(!this.fonts){
      return callback();
    }
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
}

fabric.Application.addPlugin("postloaders","loadWebfonts");
