moduleLoader.imports("update", ["ec"], function (ec) {

	var returnObject = {},
			gameObjects = ec.list, 
      updates = 0;
    
  var update = function () {

    var i = 0, j = 0;

  	for (i; i < gameObjects.length; i += 1) {
      
      if (gameObjects[i]["update"].length) {
            
        for (j; j < gameObjects[i]["update"].length; j += 1) {
                
          gameObjects[i]["update"][j].call(gameObjects[i]);
            
        }
          
	      updates = true;

      }
    
    }
    
    if (!updates) {
    
      returnObject.update = false;
    
    } else {
    
      returnObject.update = true;
    
    }

	}

  returnObject = function () { return update() };
  returnObject.update = true;
    
  return returnObject;

});