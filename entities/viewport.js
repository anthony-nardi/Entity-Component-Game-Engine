moduleLoader.imports('viewport', ['grid','ec','inputs'], function (grid, ec, inputs) {

	var viewport = ec(grid);

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
		'width':100,
		'height':100,
		'tile': {
			'width':10,
			'height':10
		},
		'scroll': {
			'x':0,
			'y':0
		},
		'zoom':1
	});

	inputs.registerCanvas(viewport.canvasId);

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

		for (var x = tileOffsetX; x < tileRowCount; x += 1) {
			for (var y = tileOffsetY; y < tileColCount; y += 1) {
				ctx.strokeRect(this.tile.width * x - this.tileOffsetX(), this.tile.height * y - this.tileOffsetY(), this.tile.width, this.tile.height);
			}
		}

	};

	viewport.render = render;

	return viewport;

});