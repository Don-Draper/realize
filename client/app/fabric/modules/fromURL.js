'use strict';


fabric.util.mediaRoot = "";
fabric.util.addNoCache = false;

fabric.util._loadImage_overwritten = fabric.util.loadImage;


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
