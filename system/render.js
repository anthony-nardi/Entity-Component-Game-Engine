moduleLoader.imports("render", ["ec"], function (ec) {

	var returnObject = {};

	var render = function () {

		var gameObjects = ec.list,
     	totalGameObjects = gameObjects.length;

		for (var i = 0; i < totalGameObjects; i += 1) {

			if (gameObjects[i].render) {

				gameObjects[i].render();
				
			}

		}

	};

	returnObject = function () { return render() };
	return returnObject;

});