moduleLoader.imports("ec", ['events'], function (events) {

  var list = [],
      returnObject = {};

  var uid = (function () {
  
    var counter = 0;

    return function () {

      return counter++;
  
    };

  }());

  var addComponent = function (component) {

  for (property in component) {

    if (!component.hasOwnProperty(property)) continue;
  
    this[property] = component[property];

  }

  return this;

  };

  var removeComponent = function (component) {

    for (property in component) {

       if (!component.hasOwnProperty(property) || !this.hasOwnProperty(property)) continue;

    delete this[property];

  }

  return this;

  };

  var createEntity = function (prototype) {

    var entityInstance = Object.create(prototype || {}).extend(events);

    entityInstance.addComponent = addComponent;
    entityInstance.removeComponent = removeComponent;
    entityInstance.update = [];
    entityInstance.render = [];
    entityInstance.entityId = uid();
    list[entityInstance.entityId] = entityInstance;

    return entityInstance;

  };

  returnObject = function (prototype) { return createEntity(prototype) };

  returnObject.list = list;

  return returnObject;

});