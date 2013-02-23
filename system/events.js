moduleLoader.imports("events", [], function () {

  var list = [],
  
  isNode = function () {
  
    return this instanceof Node;
  
  },

  addListener = function (context, type, callback) {
    context instanceof Node ? 
      context.addEventListener(type, callback) : window.addEventListener(type, callback);
  },

  removeListener = function (context, type, callback) {
    context instanceof Node ? 
      context.removeEventListener(type, callback) : window.removeEventListener(type, callback);
  },

  prototype = {

    'on': function (type, callback) {
      
      if (list[type]) {

        list[type].push([this, callback]);
      
      } else {
      
        addListener(this, type, callback);
        
        list[type] = [];
        list[type].push([this, callback]);
      
      }
    
      return this;
    
    },
    
    'off': function (type, callback, opt) {
    
      var event = list[type];

      if (opt) removeListener(this, type, callback);
      
      if (event.length) {
        for (var i = 0; i < event.length; i += 1) {
          if (event[i][0] === this && event[i][1] === callback) {
            event.splice(i, 1);
            i -= 1;
            console.log('spliced:' + type);
            console.log(event)
          }
        }
      }
    
      return this;
    
    },

    'fire': function (event) {
      
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

    'list': list

  },

  events = Object.create(prototype);

  return events;

});