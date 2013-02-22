moduleLoader.imports('viewport', ['grid'], function (grid) {
	
	var prototype = Object.create(grid);
	 
	prototype.extend({
   	
   	'state' : {
			'zooming' : 0,
			'moving'  : false
		},
		
		'handle': {},
		
		'zoom' : 1,
		
		'scroll' : {
			'x' : 0,
			'y' : 0
		},

		'getClickedTile' : function (event) { //viewport
			
			var coordinates = this.translateEventToPointerPosition(event);
			
			return {
				'x': Math.floor((coordinates.x + this.scroll.x) / this.getTileWidth()),
				'y': Math.floor((coordinates.y + this.scroll.y) / this.getTileHeight())
			};
		
		},

		'getTileWidth' : function () { //viewport
		  
		  return this.tile.width * this.zoom;
	  },
		
		'getTileHeight' : function () { //viewport
		
		  return this.tile.height * this.zoom;
	  
	  },
		
		'tileOffsetX' : function () {		//viewport
		
		  return Math.floor(this.scroll.x / this.getTileWidth());		
	  
	  },
		
		'tileOffsetY' : function () {		//viewport
		  
		  return Math.floor(this.scroll.y / this.getTileHeight());
	
	  },
		
		'tileOffset' : function () {		//viewport
		
			return {
				'x' : Math.floor(this.scroll.x / this.getTileWidth()),
				'y' : Math.floor(this.scroll.y / this.getTileHeight())
			};
	  
	  },
		
		'getScrollX' : function () { //viewport
		  
		  return this.scroll.x + this.getTileWidth() * this.getWidth() / 2;
	
	  },
		
		'getScrollY' : function () {
		
		  return this.scroll.y + this.getTileHeight() * this.getTileHeight / 2;
	
	  },
		
		'maxTilesInView' : function () { //viewport
		
		  return this.maxTilesInRow() * this.maxTilesInCol();
	 
	  },
		
		'maxTilesInRow' : function () {
		
		  return Math.floor(this.getElement().width / this.getTileWidth());
	
	  },
		
		'maxTilesInCol' : function () {
		  
		  return Math.floor(this.getElement().height / this.getTileHeight());
	  
	  },
		
		'tileRowCount' : function () { //viewport
		
		  var count = this.tileOffsetX() + this.maxTilesInRow() + 1;
		
			return count * this.getTileWidth() > this.width * this.getTileWidth() ? 

						 this.width : count;	
	  },
		
		'tileColCount' : function () { //viewport
		
			var count = this.tileOffsetY() + this.maxTilesInCol() + 1;
			
			return count * this.getTileHeight() > this.height * this.getTileHeight() ? 

						 this.height : count;
    }
	
	});

	var viewport = Object.create(prototype);

	return viewport;

});