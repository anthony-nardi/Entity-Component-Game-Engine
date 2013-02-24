moduleLoader.imports('player', ['unit', 'ec', 'mainView'], function (unit, ec, mainView) {

	var player = ec(unit).extend({
		
		'position': {
			'x': 0,
			'y': 0
		},
		
		'height': 20,
		'width' : 20,
		'color' : '#000000',
		'speed' : 1,
		'state' : {
			'moving': false
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

	var move = function (event) {

		this.moveTo.x = mainView.getCurrentPointerPosition().x;
		this.moveTo.y = mainView.getCurrentPointerPosition().y;

		this.vector(this.position.x - this.moveTo.x, this.position.y - this.moveTo.y);
		this.normalize();
		this.scale(this.speed);
console.log(this.toString())
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
			move.call(this);
		}
	});

	player.on('render', function () {
		var ctx = mainView.getContext();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	})

	return player;

});