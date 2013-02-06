;/*======================================================================================
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

	var grid = Object.create(prototype);

	return grid;

});