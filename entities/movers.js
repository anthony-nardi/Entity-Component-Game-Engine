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
    'height': 25,
    'width': 25,
    'color': '#000000',
    'speed': 3,
    'state': {
    	'render': true,
    	'moving': false
    }
	});
	var dm = 0;
	for (var i = 0; i <3000; i += 1) {
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
			'speed': Math.getRandomInt(1, 3),
			'height': dm,
			'width': dm,
			'color': '#'+Math.floor(Math.random()*16777215).toString(16),
			'state': {
				'moving': true,
				'render': true
			}
		}).on('update', function () {
			if (this.state.moving) {
				move.call(this);
				mainView.state.render = true;
			}
		}).on('render', function () {
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
	}

	return movers;

});