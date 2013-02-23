moduleLoader.imports('player', ['ec', 'mainView'], function (ec, mainView) {
	
	var player = ec();
	
	player.extend({
		'position': {
			'x': 0,
			'y': 0
		}
	});

  player.on('render', function () {
  	var ctx = mainView.getContext();
  	ctx.fillStyle = '#37FDFC';
  	ctx.fillRect(this.position.x, this.position.y, 50, 50);
  })

  return player;

});