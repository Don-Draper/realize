angular.module('dp.fabric-angular',[])
  .service('Fabric', [function() {
    return window.fiera;
  }])
  .directive('ffGallery',  function() {
    return {
      restrict: 'A',
      scope: {
        elements: "&",
        target: "=",
        app: "="
      },
      link: function (scope, element) {

        var app = scope.app;

        if(app.ready){
          scope.elements().then(function(data){
            app.createElementsList(element, data );
          });

        }else{
          app.on("ready",function(){

            scope.elements().then(function(data){
              app.createElementsList(element, data );
            });
          });
        }
      }
    }
  })
  .directive('ffThumb',  function() {
    return {
      restrict: 'A',
      scope: {
        ffThumb: "="
      },
      link: function (scope, element, attrs) {

        var _canvas;

        var currentSlide = null;
        var firstDraw = true;
        var modified;

        //scope.$watch("ffThumb",updateThumb);
        scope.$watch(function(){
          return scope.ffThumb;
        },function(){
          updateThumb();
        });

        function renderThumb(){
          if(_canvas.processing || !_canvas.loaded){
            return false;
          }
          _canvas.renderThumb(element[0]);
          modified = _canvas.modified;
        }


        function forceRenderThumb(){
          if(this.canvas){
            if(this.canvas.loaded) {
              this.canvas.renderThumb(element[0]);
            }
            return;
          }
          if(firstDraw && this.data.thumb){
            var img = new Image();
            img.onload = function(){
              var ctx =element[0].getContext("2d");
              ctx.clearRect(0,0,element[0].width,element[0].height);
              ctx.drawImage(img,0,0,element[0].width,element[0].height);
              modified = this.modified;
            };
            img.src = this.data.thumb;
            return;
          }

          if(attrs.force !== "true")return;
          var canvas = new fabric.SlideCanvas(null, this.data,function(){
            canvas.renderThumb(element[0]);
            //modified = slide.modified;
          });
        }


        var _w = attrs.width;
        var _h = attrs.height;
        if(_h){
          element.height(element[0].height);
        }
        function scaleThumb(){
          var slide = scope.ffThumb;
          if(!_w && _h){
            var __w = slide.canvas.originalWidth || slide.canvas.width;
            var __h = slide.canvas.originalHeight || slide.canvas.height;
            var _aspect = __w / __h;
            element[0].width = _aspect * element[0].height;
            element.width(element[0].width);
            element.height(element[0].height);
            renderThumb();
          }
        }

        function canvasChanged(){
          _canvas && _canvas.off('after:render',renderThumb);
          if(this.canvas){
            _canvas = scope.ffThumb.canvas;
            this.canvas.on('after:render',renderThumb);
            this.canvas.on("dimensions:modified",scaleThumb);
            this.canvas.on("loading:end",scaleThumb);
          }
        }

        function updateThumb(){
          var slide = scope.ffThumb;
          if(!slide)return;
          currentSlide = slide;
          _canvas = scope.ffThumb.canvas;

          element.attr("title",slide.title);

          slide.on('canvas:changed',canvasChanged);
          //slide.on('scaled',scaleThumb);
          slide.on('modified',forceRenderThumb);

          scaleThumb.call(slide);
          forceRenderThumb.call(slide);
          canvasChanged.call(slide);
        }
        updateThumb();
      }
    }
  })
  .directive('applyFilter', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        applyFilter: '=',
        applyFilterImage: '='
      },
      link: function (scope, element, attrs) {
        fabric.util.drawFilter(element[0],scope.applyFilterImage,scope.applyFilter );
      }
    };
  })
  .directive('ffCanvas',  function() {
    return {
      restrict: 'A',
      //templateUrl: config.templatesRoot + "canvas.html",
      scope: {
        ffCanvas:   "="
      },
      link: function(scope, element, attrs) {
        console.log(scope.canvas);
        /*    var canvas = scope.canvas = new fabric.SlideCanvas(element[0]);
         scope.$emit('canvas:created', {element:  canvas});
         Toolbar.makeActions( canvas );*/
        /*
         Toolbar.makeActions( canvas );
         canvas._onResize = function(){
         updateBack();
         $timeout(function(){})
         };
         canvas.project.on("slide:changed",function(event){
         slide = event.slide;
         });
         if(scope.ffIde){

         scope.ffIde.on("scale",function(scale){
         canvas.setZoom(scale);
         });
         }

         function updateBack(){
         var scale = 1;// slide.scaleValue;

         if(!slide || !slide.canvas)return;

         if(slide.canvas.sheet){
         var _sheet = slide.canvas.sheet;
         scope.paperStyle = {
         "top":   _sheet.data.top * scale,
         "left":  _sheet.data.left * scale
         };


         scope.backCoverStyle = {

         "background-image": "url(" + _sheet.image.src +  ")",
         width:  _sheet.data.width * scale,
         height:  _sheet.data.height * scale
         };
         }else {
         scope.paperStyle = {};
         }

         scope.slideStyle = {
         width: canvas.width * scale,
         height: canvas.height * scale
         };

         }


         scope.$watch(function(){
         return canvas  && canvas.width;
         },updateBack);

         scope.$watch(function(){
         return canvas  && canvas.height;
         },updateBack);

         //scope.$watch(function(){
         //    return scope.ffCanvas.resources.sheet;
         //},updateBack);

         scope.$watch(function(){
         return canvas  && canvas.zoom;
         },updateBack);

         scope.ceil = Math.ceil;


         function left(event){
         return (event.pageX - offset().left )/ slide.scaleValue;
         }

         function top(event){
         return (event.pageY - offset().top) / slide.scaleValue;
         }

         function offset(){
         return $("#editor-paper").offset();
         }

         scope.createHRule = function(event){
         new GuideLine(slide,{y: top(event) });
         };

         scope.createVRule = function(event){
         new GuideLine(slide,{x: left(event) });
         };

         scope.setGuideValue = function(guide,event){
         var value = guide.x ? left(event)  : top(event);
         guide.setValue(value );
         scope.$apply();
         };*/
      }
    };
  })
  .directive('albumSlide',  function() {
    return {
      restrict: 'A',
      scope: {
        albumSlide: '='
      },
      link: function(scope, element, attrs) {
        var data = _.extend({},scope.albumSlide);

        //scope.$watch('albumSlide',function(_new,_old){
        data.offsets = {
          left:0 ,
          right: 0,
          bottom:0,
          top:0
        };
        data.scale = 1;

        var canvas = new fabric.SlideCanvas(null, data,function(){
          var _canvas = element[0];
          if(_canvas.toDataURL){
            this.renderThumb(_canvas);
          }else{
            var _canvas = fabric.util.createCanvasElementWithSize(element[0]);
            this.renderThumb(_canvas);
            element[0].src = _canvas.toDataURL()
          }
          //modified = slide.modified;
        });
        //});
      }
    };
  })
  .directive('albumObject',  function() {
    return {
      restrict: 'A',
      scope: {
        albumObject: '='
      },
      link: function(scope, element, attrs) {

        scope.$watch(function(){
          return Fotofiera.activeProject.loaded;
        }, function (projectLoaded) {
          if (!projectLoaded)return;

          scope.$watch('albumObject',function(value){

            if(!value ) {
              delete element[0].src;
              return;
            }
            if(!value.length){
              value = [value];
            }

            for(var i in value){
              if(!value[i].geometry){
                value[i].geometry = {
                  width: 100,
                  height: 100,
                  left: 0,
                  top: 0
                };
              }else{
                value[i].geometry.left = 0;
                value[i].geometry.top = 0;
              }
              //value[i].geometry.angle = 0;
            }
            fff(value, value[0].geometry.width,value[0].geometry.height);
            element.attr("title",JSON.stringify(value))



          });


          function fff(objects,w,h){

            var  _example = {

              scale: Math.min(element[0].width / w,element[0].height / h),
              offsets: {
                left:0 ,
                right: 0,
                bottom:0,
                top:0
              },
              dpi: false,
              width: w,
              height: h,
              "objects": objects
            };

            var slide = new Slide(Fotofiera.activeProject,_example);
            slide.updateThumb({width: element[0].width , height: element[0].height},function(){
              element[0].src = slide.thumb;
            });
          }
        });

      }
    };
  })
