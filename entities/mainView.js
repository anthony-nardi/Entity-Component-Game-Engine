moduleLoader.imports('mainView', ['viewport','ec','events'], function (viewport, ec, events) {

  var mainView = ec(viewport),  //inherit from (viewport <- grid <- canvas)
      handle   = mainView.handle,
      state    = mainView.state;

  mainView.initializeCanvas({    
    
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
    
    'width':20,
    'height':20,
    
    'tile': {
      'width':25,
      'height':25
    }
  
  });

  events.on('inputs', function (eventList) {  //A special event that dispatches dom events every tick.  TODO - Put this on viewport model
    
    for (event in eventList) {
    
      if (!eventList.hasOwnProperty(event) || !handle[event]) continue;
      
      handle[event](eventList[event]);
    
    }
  
  });

  handle['mousemove'] = function (event) {

    if (event.target.id === mainView.canvasId) {
      state.moving = true;
    }

  };

  handle['mouseup'] = function (event) {
    
    if (event.target.id === mainView.canvasId) {
      state.moving = false;
    }
  
  }

  handle['mousewheel'] = function (event) {
    event.wheelDelta > 0 ? state.zooming = -1 : state.zooming = 1;
  }

  handle['click'] = function (event) {
    console.log(mainView.getClickedTile(event));
  };
  
  var render = (function () {
    
    var canvasElement = mainView.getElement(),
        ctx           = mainView.getContext();
        width         = canvasElement.width,
        height        = canvasElement.height;

    return function () {

      var tileOffsetX   = this.tileOffsetX(),
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

  }());
  
  var zoom = function () {  //instance
    
    var lastTileWidth = mainView.getTileWidth(),
        lastTileHeight = mainView.getTileHeight(),
        deltaWidth = 0, deltaHeight = 0;

      state['zooming'] === 1   ? 
        mainView.zoom    <   4   ? mainView.zoom    +=  .01 : mainView.zoom    =   4   : 
        mainView.zoom    <=  .25 ? 
          mainView.zoom    =   .25 : 
          mainView.zoom    -=  .01;
      
      state['zooming'] =   0;

      deltaWidth = mainView.getTileWidth() - lastTileWidth;
      deltaHeight = mainView.getTileHeight() - lastTileHeight;

      mainView.scroll.x += deltaWidth * ((mainView.scroll.x + mainView.getElement().width / 2) / mainView.getTileWidth());
      mainView.scroll.y += deltaHeight * ((mainView.scroll.y + mainView.getElement().height / 2) / mainView.getTileHeight());
      
  };

  var move = function () {  //instance
    mainView.scroll.x -= (mainView.getCurrentPointerPosition().x - mainView.getLastPointerPosition().x);
    mainView.scroll.y -= (mainView.getCurrentPointerPosition().y - mainView.getLastPointerPosition().y);
    state.moving = false;
  };

  mainView.update.push(function () {  //instance    
    if (state['moving']) move();
    if (state['zooming']) zoom();  
  });
  
  mainView.render.push(render);

  return mainView;

});