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
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
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
      destroy : function(options) {
        this.ul.remove();
      },
      close : function(options) {
        this.closeUl();
      },
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

        var closeUl = this.closeUl = function() {
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
        var ul = this.ul = $('<ul class="fontSelectUl"></ul>').appendTo('body');
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
