'use strict';

fabric.util.object.extend(fabric,{
  debugTimeout: 0
});

fabric.Application.prototype.enableDebugging = function(){
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
};
fabric.Application.addPlugin("postloaders","enableDebugging");

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



