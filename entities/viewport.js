moduleLoader.imports('viewport', ['grid','ec','inputs', 'events'], function (grid, ec, inputs, events) {

  var viewport = ec(grid),
      handle   = [],
      state    = {
        'moving' : false,
        'zooming' : false
      };

  viewport.initializeCanvas({    
    'id':'viewport',
    'parent':document.getElementById('container'),
    'style': {
      'width':'640px',
      'height':'480px',
      'margin':'auto',
      'border':'1px solid black',
      'display':'block'
    }
  }).initializeGrid({
    'id':'viewport',
    'width':100,
    'height':100,
    'tile': {
      'width':10,
      'height':10
    },
    'scroll': {
      'x':0,
      'y':0
    },
    'zoom':1
  });

  inputs.registerCanvas(viewport.canvasId);  //registers click, mouseup, and mousedown events

  events.on('inputs', function (eventList) {  //A special event that dispatches dom events every tick.
    
    for (event in eventList) {
    
      if (!eventList.hasOwnProperty(event) || !handle[event]) continue;
      
      handle[event](eventList[event]);
    
    }
  
  });

  handle['mousemove'] = function (event) {
    console.log(event)
    if (event.target.id === viewport.canvasId) {
      state.moving = true;
    }

  };

  handle['mouseup'] = function (event) {
    
    if (event.target.id === viewport.canvasId) {
      state.moving = false;
    }
  
  }
  
  var render = function () {

    var canvasElement = viewport.getElement(),
        ctx           = viewport.getContext();
        width         = canvasElement.width,
        height        = canvasElement.height,
        tileOffsetX   = this.tileOffsetX(),
        tileOffsetY   = this.tileOffsetY(),
        tileRowCount  = this.tileRowCount(),
        tileColCount  = this.tileColCount();

    ctx.fillStyle = '#E093FF  ';
    ctx.fillRect(0, 0, width, height);

    for (var x = tileOffsetX; x < tileRowCount; x += 1) {
      for (var y = tileOffsetY; y < tileColCount; y += 1) {
        ctx.strokeRect(this.tile.width * x - this.tileOffsetX(), this.tile.height * y - this.tileOffsetY(), this.tile.width, this.tile.height);
      }
    }

  };
  

  
  viewport.update = [];
  
  viewport.update.push(function () {
    
    if (state['moving']) {
      viewport.scroll.x += (viewport.getCurrentPointerPosition().x - viewport.getLastPointerPosition().x);
      viewport.scroll.y += (viewport.getCurrentPointerPosition().y - viewport.getLastPointerPosition().y);
      console.log(viewport.getCurrentPointerPosition())
      console.log(viewport.getLastPointerPosition())
    }
    state.moving = false;
  
  });


	viewport.render = render;
  return viewport;

});