moduleLoader.imports('player', ['unit', 'mainView'], function (unit, mainView) {

  var player = Object.create(unit).extend({
    
    'position': {
      'x': 0,
      'y': 0
    },
    
    'height': 100,
    'width' : 100,
    'color' : '#000000',
    'speed' : 3,
    'state' : {
      'moving': false,
      'render': true
    },
    'moveTo': {
      'x': 0,
      'y': 0
    },

    'getWidth': function () {
      return this.width * mainView.zoom;
    },

    'getHeight': function () {
      return this.height * mainView.zoom;
    },

    'handle': {

      'click': function (event) {
        
        this.state.moving = true;
        this.state.render = true;
        this.moveTo.x = undefined;
        this.moveTo.y = undefined;

      }

    }
  
  });

  mainView.place(player); //puts player in the grid

  var move = function (event) {

    var oldTile   = mainView.getTile(this.position.x, this.position.y),
        newTile   = undefined,
        touchedTiles = undefined;

    this.moveTo.x = this.moveTo.x || (mainView.getCurrentPointerPosition().x 
                  + mainView.scroll.x)  / mainView.zoom;
    this.moveTo.y = this.moveTo.y || (mainView.getCurrentPointerPosition().y 
                  + mainView.scroll.y) / mainView.zoom;

    this.vector(this.position.x - this.moveTo.x, this.position.y - this.moveTo.y);
    this.normalize();
    this.scale(this.speed);

    if (this.position.x === this.moveTo.x 
    && this.position.y === this.moveTo.y) {
      
      this.state.moving = false;
      this.sub(this.vx, this.vy);
      return;      
    
    }
    
    if (this.position.x !== this.moveTo.x) {
      if (Math.abs(Math.round(this.position.x - this.moveTo.x)) < this.speed) {
        this.position.x = this.moveTo.x;
      } else {
        this.position.x -= this.vx;
      }
    }
    
    if (this.position.y !== this.moveTo.y) {
      if (Math.abs(Math.round(this.position.y - this.moveTo.y)) < this.speed) {
        this.position.y = this.moveTo.y;
      } else {
        this.position.y -= this.vy;
      }
    }

    newTile = mainView.getTile(this.position.x, this.position.y);
    mainView.outline = [];
    touchedTiles = mainView.getTouchedTiles(this);
    
    for (var tile in touchedTiles) {
      if (touchedTiles.hasOwnProperty(tile)) {
        mainView.outline.push(touchedTiles[tile]);
      }
    }
    
    if ((newTile.x - oldTile.x) !== 0 || (newTile.y - oldTile.y) !== 0) {
      mainView.remove(this, oldTile).place(this, newTile);
    }

  };

  player.inputs();
  
  player.on('update', function () {
    if (this.state.moving) {
      move.call(this);
      mainView.state.render = true;
    }
  });

  player.on('render', function () {

    if (this.state.render) {
      
      var ctx = mainView.getContext();
      
      ctx.fillStyle = this.color;
      
      ctx.fillRect(
        this.position.x * mainView.zoom - mainView.scroll.x - this.getWidth() / 2, 
        this.position.y * mainView.zoom - mainView.scroll.y - this.getHeight() / 2, 
        this.width * mainView.zoom, 
        this.height * mainView.zoom
      );
    }

  });

  return player;

});