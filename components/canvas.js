moduleLoader.imports("canvas", [], function () {
  
  var list = [],
  
  prototype = {
    
    'currentPointerPosition': {
      'x': undefined,
      'y': undefined
    },
    
    'lastPointerPosition': {
      'x': undefined,
      'y': undefined
    },
    
    'createCanvas': function (id, parent) {

      if (!list[id]) {
      
        list[id] = document.createElement('canvas');
      
        if (parent) {
          parent.appendChild(list[id]);
        } else {
          document.body.appendChild(list[id]);
        }
        
        list[id].id = id;    
        list[id].canvas = this;

        this.element = list[id];
        this.canvasId = id;

        return this;      

      }
    
    },

    'getCenterCoordinates': function () {
      
      var canvas = this.getElement(),
          width  = canvas.width / 2,
          height = canvas.height / 2;

      return {
        'x':width,
        'y':height
      };

    },

    'getCanvas': function (id) { 
      
      return list[id || this.canvasId].canvas;
    
    },
    
    'getElement': function (id) { 
    
      return list[id || this.canvasId];
    
    },
    
    'getContext': function (id) { 
    
      return  this.getElement(id || this.canvasId).getContext('2d');
    
    },
    
    'setStyle': function (config) {
      
      var canvasElement = this.getElement();

      for (var prop in config) {

        if (config.hasOwnProperty(prop)) {
          canvasElement.style[prop] = config[prop];        
        }

      }

      if (config.width && config.height) {
        canvasElement.width = config.width.split('px')[0] * 1;
        canvasElement.height = config.height.split('px')[0] * 1;
      }
      
      return this;
    
    },
    
    'getCurrentPointerPosition':  function () {

      return {
        'x' : this.currentPointerPosition.x,
        'y' : this.currentPointerPosition.y
      }

    },

    'setCurrentPointerPosition': function (coordinate) {

      this.currentPointerPosition.x = coordinate.x;
      this.currentPointerPosition.y = coordinate.y;

      return this;

    },

    'translateEventToPointerPosition': function (e) {

      return {

        'x' : Math.floor(
            e.clientX 
          + document.body.scrollLeft 
          + document.documentElement.scrollLeft 
          - this.getElement(e.target.id).offsetLeft
          ),

        'y' : Math.floor(
            e.clientY 
          + document.body.scrollTop 
          + document.documentElement.scrollTop 
          - this.getElement(e.target.id).offsetTop
          )
      };

    },
    
    'setLastPointerPosition': function (coordinate) {
      
      this.lastPointerPosition.x = coordinate.x;
      this.lastPointerPosition.y = coordinate.y;
      
      return this;
    
    },
    
    'getLastPointerPosition': function () {
    
      return this.lastPointerPosition;
    
    },

    'initializeCanvas': function (config) {

      var events = moduleLoader.list.events,
          inputs = moduleLoader.list.inputs;

      this.createCanvas(config.id, config.parent);
      
      this.setStyle(config.style);

      inputs.registerCanvas(this.getElement().id);

      events.on.call(this, 'inputs', function (eventList) {  //A special event that dispatches dom events every tick.  TODO - Put this on viewport model
      
        for (event in eventList) {
        
          if (!eventList.hasOwnProperty(event) || !this.handle[event]) continue;
          
          this.handle[event].call(this, eventList[event]);
        
        }
    
      });

      return this;

    }

  };

  var canvas = Object.create(prototype);

  return canvas;

});