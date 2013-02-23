moduleLoader.imports('player', ['ec', 'mainView'], function (ec, mainView) {
	
	var player = ec();

	player.extend({
		'position': {
			'x': 0,
			'y': 0
		},
		'size': {
			'height': 2,
			'width': 2
		}
	});

  player.on('render', function () {
  	var ctx = mainView.getContext();
  	ctx.fillStyle = '#37FDFC';
  	ctx.fillRect(this.position.x, this.position.y, this.size.height, this.size.width);
  })

  return player;

});