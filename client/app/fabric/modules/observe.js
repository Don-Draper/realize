'use strict';


/**
 * @private
 * @param {String} eventName
 * @param {Function} handler
 */
function _removeEventListener(eventName, handler) {
  if (!this.__eventListeners[eventName]) {
    return;
  }
  var eventListener = this.__eventListeners[eventName];
  if (handler) {
    eventListener.splice(eventListener.indexOf(handler), 1)
  }
  else {
    eventListener.length = 0;
  }
}

fabric.Canvas.prototype.stopObserving = fabric.Object.prototype.stopObserving = function stopObserving(eventName, handler) {
  if (!this.__eventListeners) {
    return;
  }

  // remove all key/value pairs (event name -> event handler)
  if (arguments.length === 0) {
    for (eventName in this.__eventListeners) {
      _removeEventListener.call(this, eventName);
    }
  }
  // one object with key/value pairs was passed
  else if (arguments.length === 1 && typeof arguments[0] === 'object') {
    for (var prop in eventName) {
      _removeEventListener.call(this, prop, eventName[prop]);
    }
  }
  else {
    _removeEventListener.call(this, eventName, handler);
  }
  return this;
}


fabric.Observable.on = fabric.Canvas.prototype.on = fabric.Object.prototype.on = function (eventName, handler,priority) {
  if (eventName.constructor == Object) {
    for (var i in eventName) {
      this.on(i, eventName[i],priority)
    }
    return this;
  }
  var events = eventName.split(" ");
  for (var i in events) {
    eventName = events[i];
    this.observe(eventName, handler);
    if(priority){
      this.__eventListeners[eventName].unshift(this.__eventListeners[eventName].pop());
    }
  }
  return this;
};
fabric.Canvas.prototype.off = fabric.Object.prototype.off = function (eventName, handler) {
  var events = eventName.split(" ");
  for (var i in events) {
    this.stopObserving(events[i], handler)
  }
  return this;
};


fabric.Canvas.prototype.fire = fabric.Object.prototype.fire = function fire(eventName, options) {
  if (!this.__eventListeners) {
    return;
  }

  var listenersForEvent = this.__eventListeners[eventName];
  if (listenersForEvent) {
    for (var i = 0, len = listenersForEvent.length; i < len; i++) {
      listenersForEvent[i].call(this, options || {});
    }
  }

  var listenersForEventAll = this.__eventListeners['*'];
  if (listenersForEventAll) {
    options = options || {};
    options.eventName = eventName;
    options.listeners = listenersForEvent;
    for (i = 0, len = listenersForEventAll.length; i < len; i++) {
      listenersForEventAll[i].call(this, options);
    }
  }

  return this;
};
