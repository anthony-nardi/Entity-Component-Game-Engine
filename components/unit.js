moduleLoader.imports('unit', ['inputs', 'events', 'vector'], function (inputs, events, vector) {
  
  var prototype = {
    
    'position': {
      'x': undefined,
      'y': undefined
    },
    
    'height': undefined,
    'width' : undefined,
    'color' : undefined,
    'speed' : undefined,
    'state' : {},
    'handle': {},
    'inputs': function () {
      inputs.inputs(this);
    }

  }.extend(events).extend(vector);
  
  var unit = Object.create(prototype);
  console.log(unit.position.x)
  return unit;

});