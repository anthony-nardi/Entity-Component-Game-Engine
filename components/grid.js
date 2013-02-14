/*======================================================================================
-------------------------------------------GRID----------------------------------------
======================================================================================*/
moduleLoader.imports("grid", ['canvas'], function (canvas) {

/*======================================================================================
-------------------------------------------DATA----------------------------------------
======================================================================================*/
	var prototype = Object.create(canvas);

	prototype.tileMap = undefined;
	prototype.tile    = undefined;
	prototype.width   = undefined;
	prototype.height  = undefined;
	prototype.scroll  = undefined;
	prototype.zoom    = undefined;
	prototype.gridId  = undefined;
	
	prototype.initializeGrid = function (config) {
		
		if (config.height && config.width) {

			this.tileMap = [];
			this.gridId = config.id;
			delete config.id;

			for (var prop in config) {
				if (config.hasOwnProperty(prop)) {
					this[prop] = config[prop];				
				}
			}

			for (var i = 0; i < this.width; i += 1) {
				this.tileMap[i] = [];
				for (var j = 0; j < this.height; j += 1) {
					this.tileMap[i][j] = [];
				}
			}

		}

		return this;
	
	};

	prototype.getTileWidth = function () {
		return this.tile.width * this.zoom;
	};

	prototype.getTileHeight = function () {
		return this.tile.height * this.zoom;
	};

	prototype.tileOffsetX = function () {		
		return Math.floor(this.scroll.x / (this.tile.width * this.zoom));		
	};

	prototype.tileOffsetY = function () {		
		return Math.floor(this.scroll.y / this.getTileHeight());
	};

	prototype.tileOffset = function () {		
		return {
			'x' : Math.floor(this.scroll.x / this.getTileWidth()),
			'y' : Math.floor(this.scroll.y / this.getTileHeight())
		};
	};

	prototype.maxTilesInView = function () {
		if (this.tile.width === this.tile.height) {
			return Math.floor(this.getElement().width / this.getTileWidth());
		} else {
			alert("Tile width and height are not equal.");
		}
	};

	prototype.tileRowCount = function () {
		var count = this.tileOffsetX() + this.maxTilesInView() + 1;
		return count * this.getTileWidth() > this.width * this.getTileWidth() ? this.width : count;	
	};

	prototype.tileColCount = function () {
		var count = this.tileOffsetY() + this.maxTilesInView() + 1;
		return count * this.getTileHeight() > this.height * this.getTileHeight() ? this.height : count;
	};

	var grid = Object.create(prototype);

	return grid;

});