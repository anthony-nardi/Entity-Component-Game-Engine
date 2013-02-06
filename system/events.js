moduleLoader.imports("events", [], function () {

  var returnObject = {},
      list = [];

  var on = function (name, callback) {
  
    if (typeof list[name] === "undefined") {
    
      if (this instanceof Node) {

        this.addEventListener(name, fire);

      } else {

        window.addEventListener(name, fire);
      
      }
      
      list.push(name);
      list[name] = [];
      list[name].push([this, callback]);
    
    } else { list[name].push([this, callback]); }

    return this;
  };

  var off = function (name, callback, opt) {

    var event = list[name],
        i = 0;

    if (opt) { window.removeEventListener(name, fire); }

    if (event.length) {

      for (i; i < event.length; i += 1) {
        if (event[i][0] === this && event[i][1] === callback) {
          event.splice(i, 1);
          i -= 1;
        } 
      }
    
    }

    return this;

  };

  var fire = function (e) {

    var event = undefined,
        data = undefined,
        events = undefined,
        current = undefined,
        i = 0;

    if (typeof e === "string") {

      name = e;
      data = arguments[1];
    
    } else {
      
      name = e.type;
      data = e;
     
    }

    event = list[name];

    if (event && event.length) {
       
      events = event.length;

      for (i; i < events; i += 1) {

        current = event[i];
        current[1].apply(current[0], [data]);
       
      }
    }

    return this;

  };

  returnObject = function(name, callback) { return on(name, callback) };
  
  returnObject.list = list;
  returnObject.on = on;
  returnObject.off = off;
  returnObject.fire = fire;

  return returnObject;

});