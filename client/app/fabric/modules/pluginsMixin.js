fabric.PluginsMixin = {
  runPlugins: function (pluginTypes, resolve, error) {

    var self = this;

    var plugins = this.plugins[pluginTypes].map(function(foo){
      var l = foo.length;
      if(!foo.length){
        var _result = foo.call(self);
        // (_result || _result === undefined) ? resolve() : fail();
        return _result;
      }else{
        return foo;
      }
    });

    for(var i = plugins.length ; i--;){
      if(typeof plugins[i] !== "function"){
        plugins.splice(i,1);
      }
    }
    if(plugins.length) {
      var wrap = fabric.util.promise.wrap(this);
      var _counter = plugins.length;
      for(var i in plugins){
        plugins[i].call(self,function(){
          if(!--_counter){
            resolve();
          }
        })
      }
    }else{
      resolve();
    }

  },
  addPlugin: function (type, name) {
    if(name.constructor == String){
      this.prototype.plugins[type].push(this.prototype[name]);
    }else{
      this.prototype.plugins[type].push(name);
    }
    return this;
  }
};
