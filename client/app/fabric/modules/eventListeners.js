
fabric.Application.prototype.eventListeners["entity:created"].push(function(e){
    if(e.target.eventListeners){
      for(var i in e.target.eventListeners) {
        var _listeners = e.target.eventListeners[i];
        if(_listeners.constructor == Array){
          for (var j in _listeners) {
            e.target.on(i, _listeners[j]);
          }
        }else{
          e.target.on(i, _listeners);
        }
      }
    }

    if(e.options.eventListeners){
      for(var i in e.options.eventListeners){
        e.target.on(i,e.options.eventListeners[i]);
      }
    }
    delete e.options.eventListeners;

  if(e.target._default_event_listeners){
    for(var i in e.target._default_event_listeners){
      e.target.on(i,e.target._default_event_listeners[i]);
    }
  }
});


fabric.util.object.extend(fabric.Application.prototype, {
  initEventListeners: function(){
    if(!this.__eventListeners){
      this.__eventListeners = {};
    }
    for (var event in this.eventListeners) {
      if(!this.__eventListeners[event]){
        this.__eventListeners[event] = []
      }
      this.__eventListeners[event] = this.__eventListeners[event].concat (this.eventListeners[event]);
    }

    if(this.options.eventListeners){
      this.on(this.options.eventListeners);
    }
  }
});
