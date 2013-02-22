moduleLoader.imports("canvas", [], function () {
	
	var list = [],
	
			returnObject = function () {};

	var createCanvas = function (id, parent) {

		if (!list[id]) {
		
			list[id] = document.createElement('canvas');
		
			if (parent) {
				parent.appendChild(list[id]);
			} else {
				document.body.appendChild(list[id]);
			}
			
			list[id].id = id;		
			list[id].canvas = this;

			this.element = list[id];
			this.canvasId = id;

			return this;			

		}
	
	};

	var getCenterCoordinates = function () {
		var canvas = this.getElement(),
		    width  = canvas.width / 2,
		    height = canvas.height / 2;

		return {
			'x':width,
			'y':height
		};

	};

	var getCanvas = function (id) { return list[id || this.canvasId].canvas };

	var getElement = function (id) { return list[id || this.canvasId] };

	var getContext = function (id) { return getElement	(id || this.canvasId).getContext('2d') };

	var setStyle = function (config) {
		
		var canvasElement = this.getElement();

		for (var prop in config) {

			if (config.hasOwnProperty(prop)) {
				canvasElement.style[prop] = config[prop];				
			}

		}

		if (config.width && config.height) {
			canvasElement.width = config.width.split('px')[0] * 1;
			canvasElement.height = config.height.split('px')[0] * 1;
		}
		
		return this;
	
	};

	var getCurrentPointerPosition = function () {
	
			return {
				'x' : this.currentPointerPosition.x,
				'y' : this.currentPointerPosition.y
			}

	};

	var setCurrentPointerPosition = function (coordinate) {

		this.currentPointerPosition.x = coordinate.x;
		this.currentPointerPosition.y = coordinate.y;

		return this;

	};

	var translateEventToPointerPosition = function (e) {

		return {
			'x' : Math.floor(e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - getElement(e.target.id).offsetLeft),
			'y' : Math.floor(e.clientY + document.body.scrollTop + document.documentElement.scrollTop - getElement(e.target.id).offsetTop)
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

		this.createCanvas(config.id, config.parent);
		
		this.setStyle(config.style);

		moduleLoader.list.inputs.registerCanvas(this.getElement().id);

		return this;

	};
	
	returnObject.prototype.lastPointerPosition             = {'x':undefined,'y':undefined};
	returnObject.prototype.currentPointerPosition          = {'x':undefined,'y':undefined};
	returnObject.prototype.getContext 	                   = function (id) { return getContext.call(this, id) };
	returnObject.prototype.getElement                      = function (id) { return getElement.call(this, id) };
	returnObject.prototype.getCanvas                       = function (id) { return getCanvas.call(this, id) };
	returnObject.prototype.createCanvas                    = function (id, parent) { return createCanvas.call(this, id, parent) }; 
	returnObject.prototype.setStyle                        = function (config) { return setStyle.call(this, config) };
	returnObject.prototype.setCurrentPointerPosition       = function (coordinate) { return setCurrentPointerPosition.call(this, coordinate) };
	returnObject.prototype.getCurrentPointerPosition       = function (e) { return getCurrentPointerPosition.call(this, e) };
	returnObject.prototype.setLastPointerPosition          = function (x, y) { return setLastPointerPosition.call(this, x, y) };
	returnObject.prototype.getLastPointerPosition          = function () { return getLastPointerPosition.call(this) };
	returnObject.prototype.translateEventToPointerPosition = function (e) { return translateEventToPointerPosition.call(this, e) };
	returnObject.prototype.initializeCanvas                = function (config) { return initializeCanvas.call(this, config) };
	
	var canvas = Object.create(returnObject.prototype);

	return canvas;

});