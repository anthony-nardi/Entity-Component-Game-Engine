moduleLoader.imports("render", ["ec"], function (ec) {

  var returnObject = {};

  var render = function () {

    var gameObjects = ec.list,
       totalGameObjects = gameObjects.length;

    for (var i = 0; i < totalGameObjects; i += 1) {

      if (gameObjects[i].render.length) {

        for (var j = 0; j < gameObjects[i].render.length; j += 1) {
          gameObjects[i].render[j].call(gameObjects[i]);
        }
        
      }

    }

  };

  returnObject = function () { return render() };
  return returnObject;

});