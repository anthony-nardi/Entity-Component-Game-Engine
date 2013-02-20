moduleLoader.imports('viewport', ['grid'], function (grid) {
	
	var prototype = Object.create(grid);
  
  /*
    STATES:
     -zooming
     -moving
  */
	prototype.state = prototype.state || {};
	prototype.state.zooming = 0; // -1 Zoom Out 1 Zoom In
	prototype.state.moving  = false;
	
	prototype.scroll = {
		'x' : 0,
		'y' : 0
	};

	prototype.zoom   = 0;
  


	prototype.getClickedTile = function (event) { //viewport
		var coordinates = this.translateEventToPointerPosition(event);
		return {
			'x': Math.floor((coordinates.x + this.scroll.x) / this.getTileWidth()),
			'y': Math.floor((coordinates.y + this.scroll.y) / this.getTileHeight())
		};
	};

	prototype.getTileWidth = function () { //viewport
		return this.tile.width * this.zoom;
	};

	prototype.getTileHeight = function () { //viewport
		return this.tile.height * this.zoom;
	};

	prototype.tileOffsetX = function () {		//viewport
		return Math.floor(this.scroll.x / this.getTileWidth());		
	};

	prototype.tileOffsetY = function () {		//viewport
		return Math.floor(this.scroll.y / this.getTileHeight());
	};

	prototype.tileOffset = function () {		//viewport
		return {
			'x' : Math.floor(this.scroll.x / this.getTileWidth()),
			'y' : Math.floor(this.scroll.y / this.getTileHeight())
		};
	};

	prototype.getScrollX = function () { //viewport
		return this.scroll.x + this.getTileWidth() * this.getWidth() / 2;
	};

	prototype.getScrollY = function () {
		return this.scroll.y + this.getTileHeight() * this.getTileHeight / 2;
	};

	prototype.maxTilesInView = function () { //viewport
		return this.maxTilesInRow() * this.maxTilesInCol();
	};

	prototype.maxTilesInRow = function () {
		return Math.floor(this.getElement().width / this.getTileWidth());
	}

	prototype.maxTilesInCol = function () {
		return Math.floor(this.getElement().height / this.getTileHeight());
	}

	prototype.tileRowCount = function () { //viewport
		var count = this.tileOffsetX() + this.maxTilesInRow() + 1;
		return count * this.getTileWidth() > this.width * this.getTileWidth() ? this.width : count;	
	};

	prototype.tileColCount = function () { //viewport
		var count = this.tileOffsetY() + this.maxTilesInCol() + 1;
		return count * this.getTileHeight() > this.height * this.getTileHeight() ? this.height : count;
	};

	var viewport = Object.create(prototype);

	return viewport;

});