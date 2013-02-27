moduleLoader.imports('mainView', ['viewport', 'events'], function (viewport, events) {

  var mainView = Object.create(viewport).extend(events),  //inherit from (viewport <- grid <- canvas)
      handle   = mainView.handle,
      state    = mainView.state,
      render   = state.render = true;

  mainView.initializeCanvas({    
    
    'id':'viewport',
    
    'parent':document.getElementById('container'),
    
    'style': {
      
      'width':'100%',
      'height':'100%',
      'margin':'auto',
      'border':'1px solid black',
      'display':'block'
    
    }
  
  }).initializeGrid({
    
    'id':'viewport',
    
    'width':20,
    'height':20,
    
    'tile': {
      'width':100,
      'height':100
    }
  
  }).extend({
    
    'place': function (object, coordinates) { //put object in tile

      var x = coordinates ? coordinates.x
                          : this.getTile(object.position.x, object.position.y).x,
          y = coordinates ? coordinates.y
                          : this.getTile(object.position.x, object.position.y).y;

      if (mainView.tileMap[x] && mainView.tileMap[y]) {
        mainView.tileMap[x][y].push(object);
      }
      
      return this;

    },
    
    'remove': function (object, coordinates) { //remove object in tile
   
      var x = coordinates ? coordinates.x
                         : this.getTile(object.position.x, object.position.y).x,
          y = coordinates ? coordinates.y
                         : this.getTile(object.position.x, object.position.y).y;

      if (mainView.tileMap[x] && mainView.tileMap[y]) {
        mainView.tileMap[x][y].splice(mainView.tileMap[x][y].indexOf(object), 1);
      }

      return this;

    },

    'outline': [],
    
    'outlineTiles' : function (tileWidth, tileHeight, scrollX, scrollY) {
      
      var ctx = this.getContext();
      
      ctx.strokeStyle = '#000000';

      if (this.outline.length) {
        for (var i = 0; i < this.outline.length; i += 1) {
          ctx.strokeRect(
            tileWidth * this.outline[i].x - scrollX,
            tileHeight * this.outline[i].y - scrollY, 
            tileWidth, 
            tileHeight
          ); 
        }
      }
    }

  });

  handle['mousemove'] = function (event) {
    
    var tile = undefined;
    
    if (event.target.id === mainView.canvasId && event.which) {
      state.moving = true;
      state.render = true;
    } else {
      mainView.outline.push(
        mainView.getTile(
          (mainView.getCurrentPointerPosition().x + mainView.scroll.x) / mainView.zoom,
          (mainView.getCurrentPointerPosition().y + mainView.scroll.y) / mainView.zoom
        )
      );
      state.render = true;
    }

  };

  handle['mouseup'] = function (event) {
    
    if (event.target.id === mainView.canvasId) {
      state.moving = false;
    }
  
  }

  handle['mousewheel'] = function (event) {
    event.wheelDelta > 0 ? state.zooming = -1 : state.zooming = 1;
    state.render = true;
  }

  handle['click'] = function (event) {
  };
 
  var render = (function () {
    
    var canvasElement = mainView.getElement(),
        ctx           = mainView.getContext();
        width         = canvasElement.width,
        height        = canvasElement.height;

    return function () {
      
      if (state.render) {
       
       var tileOffsetX   = this.tileOffsetX(),
           tileOffsetY   = this.tileOffsetY(),
           tileRowCount  = this.tileRowCount(),
           tileColCount  = this.tileColCount(),
           tileWidth     = this.getTileWidth(),
           tileHeight    = this.getTileHeight(),
           scrollX       = this.scroll.x,
           scrollY       = this.scroll.y;

        ctx.fillStyle = '#E093FF';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = '#EEEf00';
        
        for (var x = tileOffsetX < 0 ? 0 : tileOffsetX; x < tileRowCount + 1; x += 1) {
          for (var y = tileOffsetY < 0 ? 0 : tileOffsetY; y < tileColCount + 1; y += 1) {
            if (this.tileMap[x] && this.tileMap[x][y]) {
              ctx.strokeRect(
                tileWidth * x - scrollX, 
                tileHeight * y - scrollY, 
                tileWidth, 
                tileHeight
              );
            }
          }
        }
        this.outlineTiles(tileWidth, tileHeight, scrollX, scrollY);
        this.outline = []
      }

      state.render = false;

    };

  }());
  
  var update = function () {
    if (state['moving']) {
      move();
      state.render = true;
    }
    if (state['zooming']) {
      zoom();
      state.render = true;
    }
  };  
  
  mainView.on('render', render);
  mainView.on('update', update)


  
  var zoom = function () {  //instance
    
    var lastTileWidth = mainView.getTileWidth(),
        lastTileHeight = mainView.getTileHeight(),
        tilesX = ((mainView.getElement().width / 2) + mainView.scroll.x) / mainView.getTileWidth(),
        tilesY = ((mainView.getElement().height / 2) + mainView.scroll.y) / mainView.getTileHeight(),
        deltaWidth = 0, deltaHeight = 0;

      state['zooming'] === 1   ? 
        mainView.zoom < 4 ? mainView.zoom += .1 : mainView.zoom = 4 : 
        mainView.zoom <= .5 ? 
          mainView.zoom = .5 : 
          mainView.zoom -= .1;

      deltaWidth = mainView.getTileWidth() - lastTileWidth;
      deltaHeight = mainView.getTileHeight() - lastTileHeight;

      mainView.scroll.x += deltaWidth * tilesX;
      mainView.scroll.y += deltaHeight * tilesY;
      state.zooming = 0;
      
  };

  var move = function () {  //instance
    mainView.scroll.x -= (mainView.getCurrentPointerPosition().x - mainView.getLastPointerPosition().x);
    mainView.scroll.y -= (mainView.getCurrentPointerPosition().y - mainView.getLastPointerPosition().y);
    state.moving = false;
  };

  return mainView;

}); 