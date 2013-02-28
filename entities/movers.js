moduleLoader.imports('movers', ['unit', 'mainView'], function (unit, mainView) {

	var move = function (event) {

    this.vector(this.position.x - this.moveTo.x, this.position.y - this.moveTo.y);
    this.normalize();
    this.scale(this.speed);

    if (this.position.x === this.moveTo.x 
    && this.position.y === this.moveTo.y) {
      
      this.moveTo.x = Math.getRandomInt(1, 2000);
    	this.moveTo.y = Math.getRandomInt(1, 2000);
    	
      this.height *= .9;
    	this.width *= .9;

      if (this.height < 1 || this.width < 1) {
        this.state.grow = true;
      }

      if (this.height > 200 || this.width > 200) {
        this.state.grow = false;
      }

      this.speed = Math.getRandomInt(1, 10);
      
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

	var movers = Object.create(unit).extend({
		'position': {
      'x': 0,
      'y': 0
    },
    'moveTo': {
    	'x': 0,
    	'y': 0
    },
    'height': 1000,
    'width': 1000,
    'color': '#000000',
    'speed': 0,
    'state': {
    	'render': true,
    	'moving': true,
      'grow'  : false
    }
	});
	
  var dm = 0;
	
  for (var i = 0; i < 2000; i += 1) {
	
  	dm = Math.getRandomInt(25, 100);
	
  	Object.create(movers).extend({
	
  		'position': {
				'x': Math.getRandomInt(1, 2000),
				'y': Math.getRandomInt(1, 2000)
			},
	
  		'moveTo': {
				'x': Math.getRandomInt(1, 2000),
				'y': Math.getRandomInt(1, 2000)
			},
	
  		'speed': Math.getRandomInt(1, 10),
	
  		'height': 100,
	
  		'width': 100,
  
      'alpha': 1,
	
  		'color': '#'+Math.floor(Math.random()*16777215).toString(16),
	
  	}).on('update', function () {
	
  		if (this.state.moving) {
	
  			move.call(this);
				mainView.state.render = true;
	
  		}
	
  	}).on('render', function () {

			if (this.state.render || false) {

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
	
  }

	return movers;

});