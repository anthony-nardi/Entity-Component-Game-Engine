moduleLoader.imports('viewport', ['grid','ec','inputs', 'events'], function (grid, ec, inputs, events) {

  var viewport = ec(grid),  //inherit from (grid <- canvas)
      
      handle   = [], //dom event handlers k -> v
      
      state    = { //state of viewport
        'moving' : false,
        'zooming' : 0
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
    'width':50,
    'height':50,
    'tile': {
      'width':100,
      'height':100
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

    if (event.target.id === viewport.canvasId) {
      state.moving = true;
    }

  };

  handle['mouseup'] = function (event) {
    
    if (event.target.id === viewport.canvasId) {
      state.moving = false;
    }
  
  }

  handle['mousewheel'] = function (event) {
    if (event.wheelDelta > 0) {
      state.zooming = -1;
    } else {
      state.zooming = 1;
    }
  }

  handle['click'] = function (event) {
    console.log(viewport.getClickedTile(event));
  };
  
  var render = function () {

    var canvasElement = viewport.getElement(),
        ctx           = viewport.getContext();
        width         = canvasElement.width,
        height        = canvasElement.height,
        tileOffsetX   = this.tileOffsetX(),
        tileOffsetY   = this.tileOffsetY(),
        tileRowCount  = this.tileRowCount(),
        tileColCount  = this.tileColCount();

    ctx.fillStyle = '#E093FF';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#EEEf00';
    
    for (var x = tileOffsetX < 0 ? 0 : tileOffsetX; x < tileRowCount + 1; x += 1) {
      for (var y = tileOffsetY < 0 ? 0 : tileOffsetY; y < tileColCount + 1; y += 1) {
        ctx.strokeRect(this.getTileWidth() * x - this.scroll.x, this.getTileHeight() * y - this.scroll.y, this.getTileWidth(), this.getTileHeight());
      }
    }

  };
  

  
  viewport.update = [];
  
  var zoom = function () {
    var lastTileWidth = viewport.getTileWidth(),
        lastTileHeight = viewport.getTileHeight(),
        deltaWidth = 0, deltaHeight = 0;

      state['zooming'] === 1   ? 
        viewport.zoom    <   4   ? viewport.zoom    +=  .01 : viewport.zoom    =   4   : 
        viewport.zoom    <=  .25 ? 
          viewport.zoom    =   .25 : 
          viewport.zoom    -=  .01;
      
      state['zooming'] =   0;

      deltaWidth = viewport.getTileWidth() - lastTileWidth;
      deltaHeight = viewport.getTileHeight() - lastTileHeight;

      viewport.scroll.x += deltaWidth * ((viewport.scroll.x + viewport.getElement().width / 2) / viewport.getTileWidth());
      viewport.scroll.y += deltaHeight * ((viewport.scroll.y + viewport.getElement().height / 2) / viewport.getTileHeight());
      
  };

  var move = function () {
    viewport.scroll.x -= (viewport.getCurrentPointerPosition().x - viewport.getLastPointerPosition().x);
    viewport.scroll.y -= (viewport.getCurrentPointerPosition().y - viewport.getLastPointerPosition().y);
    state.moving = false;
  };

  viewport.update.push(function () {
    
    if (state['moving']) move();
    if (state['zooming']) zoom();
  
  });


	viewport.render = render;
  return viewport;

});