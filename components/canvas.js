moduleLoader.imports("canvas", [], function () {
	
	var list = [],			
	
			returnObject = function () {};

	var createCanvas = function (id, parent) {
		
		var newCanvas = Object.create(canvas);

		if (!list[id]) {
		
			list[id] = document.createElement('canvas');
		
			if (parent) {
				parent.appendChild(list[id]);
			} else {
				document.body.appendChild(list[id]);
			}
			
			list[id].canvasId = id;
			list[id].canvas = newCanvas;
			newCanvas.canvasId = id;
			newCanvas.element = list[id];

			return newCanvas;			

		}
	
	};

	var getCanvas = function (id) { return list[id] };

	var getContext = function (id) { return getCanvas(id).getContext('2d') };

	var setStyles = function (config) {
		
		for (var prop in config) {
			if (config.hasOwnProperty(prop)) {
				this.element.style[prop] = config[prop];				
			}
		}
		
		return this;
	
	};

	var getCurrentPointerPosition = function (e) {
		return {
			'x' : Math.floor(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas(e.target.id).offsetLeft),
			'y' : Math.floor(e.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas(e.target.id).offsetTop)
		};
	};

	var setLastPointerPosition = function (coordinate) {
		this.lastPointerPosition.x = coordinate.x;
		this.lastPointerPosition.y = coordinate.y;
		return this;
	};

	var getLastPointerPosition = function () {
		return this.lastPointerPosition;
	};

	var initializeCanvas = function (config) {
		console.log(this)
		var canvas = createCanvas(config.id, config.parent);
		
		canvas.setStyles(config.style);

		this.ctx = canvas.getContext(config.id);
		console.log(this)
		return this;

	};

	returnObject.prototype.getContext 	             = function (id) { return getContext(id) };
	returnObject.prototype.createCanvas              = function (id, parent) { return createCanvas(id, parent) }; 
	returnObject.prototype.setStyles                 = function (config) { return setStyles.call(this, config) };
	returnObject.prototype.getCurrentPointerPosition = function (e) { return getCoordinates(e) };
	returnObject.prototype.lastPointerPosition       = {'x':undefined,'y':undefined};
	returnObject.prototype.setLastPointerPosition    = function (x, y) { return setLastPointerPosition.call(this, x, y) };
	returnObject.prototype.getLastPointerPosition    = function () { return getLastPointerPosition.call(this) };
	returnObject.prototype.initializeCanvas          = function (config) { return initializeCanvas.call(this, config) };
	returnObject.prototype.list 				             = list;

	var canvas = Object.create(returnObject.prototype);

	return canvas;

});