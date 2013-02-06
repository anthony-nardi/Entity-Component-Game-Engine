moduleLoader.imports("controller", 

(function() {

  moduleLoader.allModules.splice(moduleLoader.allModules.indexOf("controller"), 1)

  return moduleLoader.allModules;

}()), 

function() {
  
  var modules = moduleLoader.list, 
  		modulesLength = moduleLoader.list.length, 
  
  clock = modules.clock;
  
  clock.start();

});
