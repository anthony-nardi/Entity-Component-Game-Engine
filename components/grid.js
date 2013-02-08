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

	prototype.tileOffset = function () {
		
		return {
			'x' : Math.floor(this.scroll.x / this.tile.width),
			'y' : Math.floor(this.scroll.y / this.tile.height)
		};

	};

	prototype.tileOffsetX = function () {
		
		return Math.floor(this.scroll.x / this.tile.width);
		
	};

	prototype.tileOffsetY = function () {
		
		return Math.floor(this.scroll.y / this.tile.height);

	};

	prototype.tileRowCount = function () {

		var count = this.tileOffsetX() + Math.floor(this.getElement().width / this.tile.width) + 1;

		return count * this.tile.width > this.width * this.tile.width ? grid.width : count;
	
	};

	prototype.tileColCount = function () {

		var count = this.tileOffsetY() + Math.floor(this.getElement().height / this.tile.height) + 1;

		return count * this.tile.height > this.height * this.tile.height ? grid.height : count;

	};

	var grid = Object.create(prototype);

	return grid;

});