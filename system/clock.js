/*======================================================================================
--------------------------------------------CLOCK--------------------------------------
======================================================================================*/
moduleLoader.imports('clock', ['inputs', 'events', 'fps'], function (inputs, events, fps) {
   
  var returnObject = {},
  
  getNow = Date.now,
  now = 0, last = 0,
  delta = 0,
  dtBuffer = 0,
  
  looping = false,
  SIM_RES = 10,

  renderOpsPerSec = Object.create(fps);

  var loop = function () {
  
    now = getNow();
    delta = (now - last);
    dtBuffer += delta;

    inputs();

    while (dtBuffer >= SIM_RES) {
      //update(SIM_RES);
      events.fire('update');
      dtBuffer -= SIM_RES;
    }
    
    renderOpsPerSec.start();
    //render();
    events.fire('render');
    renderOpsPerSec.end();
    inputs.clear();
    last = now;

    if (looping) setTimeout(loop, 1);

  };

  var start = function () {
  
    if (!looping) {
      
      looping = true;
      last = getNow();
      loop();
    
    }
    
  };

  var stop = function () {
    
    clearTimeout(loop);
    looping = false;

  };

  returnObject.start = start;
  returnObject.stop = stop;
  returnObject.SIM_RES = SIM_RES;

  return returnObject;

});
