moduleLoader.imports('inputs', ['events', 'canvas'], function (events, canvas) {

/***************************************************************************************

        This module registers important DOM event.  When input events are fired,
        they are augmented and put into a list which represents the current 
        state of inputs.  This list is then dispatched during each game loop.  

***************************************************************************************/
  var list = [],

      returnObject,

      inputMap = {
        'UP' : 38,
        'DOWN': 40,
        'LEFT':37,
        'RIGHT':39,
        'PAUSE':80
      };

  var handleKeyDown = function (e) {
      
    list['keydown'] = [];

    switch(e.keyCode) {
    
          case inputMap.UP:
            list['keydown']['UP'] = true;
            break;
        
          case inputMap.DOWN:
            list['keydown']['DOWN'] = true;
            break;
        
          case inputMap.LEFT:
            list['keydown']['LEFT'] = true;
            break;
        
          case inputMap.RIGHT:
            list['keydown']['RIGHT'] = true;
            break;
        
          default:
            break;
        }
  };

  var handleMouseClick = function (e) {

    var c = canvas.getCanvas(e.target.id);
    
    if (this === c.element) {
    
      c.setLastPointerPosition(c.getCurrentPointerPosition());
      c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));
      
    }

    list['click'] = e;
    
  };

  var handleMouseUp = function (e) {

    var c = canvas.getCanvas(e.target.id);

    if (this === c.element) {
    
      c.setLastPointerPosition(c.getCurrentPointerPosition());
      c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));

    }
    
    list['mouseup'] = e;
  
  };

  var handleMouseDown = function (e) {
    
    var c = canvas.getCanvas(e.target.id);

    if (this === c.element) {

      c.setLastPointerPosition(c.getCurrentPointerPosition());
      c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));

    }

    list['mousedown'] = e;

  };

  var handleMouseMove = function (e) {

    var c = canvas.getCanvas(e.target.id);

    if (this === c.element) {

      c.setLastPointerPosition(c.getCurrentPointerPosition());
      c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));
            
    }

    list['mousemove'] = e;

  };

  var handleScroll = function (e) {
    
    if (e.preventDefault) {
  
      e.preventDefault();
  
    }
    
    e.returnValue = false;
    
    list['mousewheel'] = e;

  };

  var dispatch = function () {
  
    if (Object.keys(list).length) {

      events.fire('inputs', list);

    }
  
  };

  var clear = function () {
    list = [];
  };

  var registerCanvas = function (id) {

    var canvasElement = canvas.getElement(id);
    
    events.on.call(canvasElement, 'click', handleMouseClick);
    events.on.call(canvasElement, 'mouseup', handleMouseUp);
    events.on.call(canvasElement, 'mousedown', handleMouseDown);
    events.on.call(canvasElement, 'mousemove', handleMouseMove);
  
  };

  var inputs = function (object) {
    
    events.on.call(object, 'inputs', function (eventList) {
    
      for (event in eventList) {
        
          if (!eventList.hasOwnProperty(event) || !this.handle[event]) continue;
          
          this.handle[event].call(this, eventList[event]);
        
        }
    
    });

    return this;
  
  };

  returnObject                 = function () { return dispatch() };
  returnObject.clear           = function () { clear() };
  returnObject.registerCanvas = function (id) { return registerCanvas(id) };
  returnObject.dispatch       = function () { dispatch() };
  returnObject.inputs = function (object) { return inputs(object) };
  
  events.on('keydown', handleKeyDown);

  events.on.call(window, 'mousewheel', handleScroll);

  returnObject.list   = list;
  
  return returnObject;

});