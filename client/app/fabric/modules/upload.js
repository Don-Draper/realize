'use strict';


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

  uploadAction: function (img) {
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
        fabric.util.uploadImage(this.uploadAction.bind(this))
      }
    }
  })
});
