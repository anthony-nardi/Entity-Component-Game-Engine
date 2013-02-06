moduleLoader.imports('viewport', ['grid','ec'], function (grid, ec) {

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
		'gridId':'viewport',
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

	return viewport;

});