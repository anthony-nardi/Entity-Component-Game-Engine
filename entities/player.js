moduleLoader.imports('player', ['unit', 'ec', 'mainView'], function (unit, ec, mainView) {
console.log(moduleLoader.list.unit.position.x)
  var player = ec(unit).extend({
    
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

    'handle': {

      'click': function (event) {
        
        this.state.moving = true;
      
      }

    }
  
  })
console.log(moduleLoader.list.unit.position.x)
  var move = function (event) {

    this.moveTo.x = (mainView.getCurrentPointerPosition().x 
                  + mainView.scroll.x) / mainView.zoom;
    this.moveTo.y = (mainView.getCurrentPointerPosition().y 
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
  
  };

  player.inputs();
  
  player.on('update', function () {
    if (this.state.moving) {
      console.log('hey')
     //move.call(this);
    }
  });

  player.on('render', function () {

    if (this.state.render) {

      var ctx = mainView.getContext();
      
      ctx.fillStyle = this.color;
      
      ctx.fillRect(
        this.position.x * mainView.zoom - mainView.scroll.x, 
        this.position.y * mainView.zoom - mainView.scroll.y, 
        this.width * mainView.zoom, 
        this.height * mainView.zoom
      );
    }

  });

  return player;

});