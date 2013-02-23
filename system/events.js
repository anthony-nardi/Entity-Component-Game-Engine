moduleLoader.imports("events", [], function () {

  var list = [],
  
  on = function (type, callback) {
      
    if (list[type]) {

      list[type].push([this, callback]);
    
    } else {
    
      if (this instanceof Node) {
        this.addEventListener(type, fire);
      } else {
        window.addEventListener(type, fire);
      }

      list[type] = [];
      list[type].push([this, callback]);
    
    }
  
    return this;
  
  },

  off = function (type, callback, opt) {
  
    var event = list[type];

    if (opt) removeListener(this, type, fire);
    
    if (event.length) {
      
      for (var i = 0; i < event.length; i += 1) {
        if (event[i][0] === this && event[i][1] === callback) {
          event.splice(i, 1);
          i -= 1;
        }
      }
    
    }
  
    return this;
  
  },

  fire = function (event) {
      
    var type = typeof event === "string" ?
          event : event.type,
        
        data = typeof event === "string" ?
          arguments[1] : event;
        
        listeners = list[type],

        listenersCount = listeners.length,

        listener = undefined;

    if (listenersCount) {
      for (var i = 0; i < listenersCount; i += 1) {
        listener = listeners[i];
        listener[1].call(listener[0], data);
      }
    }

    return this;       
  
  },

  prototype = {

    'on': on,
    
    'off': off,

    'fire': fire,

    'list': list

  },

  events = Object.create(prototype);

  return events;

});