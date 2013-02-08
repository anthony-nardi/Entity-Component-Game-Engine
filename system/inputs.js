/*======================================================================================
--------------------------------------------INPUTS--------------------------------------
======================================================================================*/
moduleLoader.imports('inputs', ['events', 'canvas'], function (events, canvas) {

/***************************************************************************************

				This module registers important DOM event.  When input events are fired,
				they are augmented and put into a list which represents the current 
				state of inputs.  This list is then dispatched during each game loop.	

***************************************************************************************/

/*======================================================================================
--------------------------------------------DATA----------------------------------------
======================================================================================*/
	var list = [],

			returnObject,

			keyMap  = {
				8 : 'backspace',
				9 : 'tab',
				13 : 'enter',
				16 : 'shift',
				17 : 'ctrl',
				18 : 'alt',
				19 : 'pause/break',
				20 : 'caps lock',
				27 : 'escape',
				33 : 'page up',
				34 : 'page down',
				35 : 'end',
				36 : 'home',
				37 : 'left arrow',
				38 : 'up arrow',
				39 : 'right arrow',
				40 : 'down arrow',
				45 : 'insert',
				46 : 'delete',
				48 : '0',
				49 : '1',
				50 : '2',
				51 : '3',
				52 : '4',
				53 : '5',
				54 : '6',
				55 : '7',
				56 : '8',
				57 : '9',
				65 : 'a',
				66 : 'b',
				67 : 'c',
				68 : 'd',
				69 : 'e',
				70 : 'f',
				71 : 'g',
				72 : 'h',
				73 : 'i',
				74 : 'j',
				75 : 'k',
				76 : 'l',
				77 : 'm',
				78 : 'n',
				79 : 'o',
				80 : 'p',
				81 : 'q',
				82 : 'r',
				83 : 's',
				84 : 't',
				85 : 'u',
				86 : 'v',
				87 : 'w',
				88 : 'x',
				89 : 'y',
				90 : 'z',
				91 : 'left window key',
				92 : 'right window key',
				93 : 'select key',
				96 : 'numpad 0',
				97 : 'numpad 1',
				98 : 'numpad 2',
				99 : 'numpad 3',
				100 : 'numpad 4',
				101 : 'numpad 5',
				102 : 'numpad 6',
				103 : 'numpad 7',
				104 : 'numpad 8',
				105 : 'numpad 9',
				106 : 'multiply',
				107 : 'add',
				109 : 'subtract',
				110 : 'decimal point',
				111 : 'divide',
				112 : 'f1',
				113 : 'f2',
				114 : 'f3',
				115 : 'f4',
				116 : 'f5',
				117 : 'f6',
				118 : 'f7',
				119 : 'f8',
				120 : 'f9',
				121 : 'f10',
				122 : 'f11',
				123 : 'f12',
				144 : 'num lock',
				145 : 'scroll lock',
				186 : 'semi-colon',
				187 : 'equal sign',
				188 : 'comma',
				189 : 'dash',
				190 : 'period',
				191 : 'forward slash',
				192 : 'grave accent',
				219 : 'open bracket',
				220 : 'back slash',
				221 : 'close bracket',
				222 : 'single quote'
			},

			inputMap = {
				'UP' : 38,
				'DOWN': 40,
				'LEFT':37,
				'RIGHT':39,
				'PAUSE':80
			};

/*======================================================================================
----------------------------------------EVENT CALLBACKS----------------------------------
======================================================================================*/
	var handleKeyDown = function (e) {
			
		list['keydown'] = [];

		switch(e.keyCode) {
		
					case inputMap.UP:
						list['keydown']['UP'] = true;
						break;
				
					case inputMap.DOWN:
						list['keydown']['DOWN'] = true;
						break;
				
					case inputMap.LEFT:
						list['keydown']['LEFT'] = true;
						break;
				
					case inputMap.RIGHT:
						list['keydown']['RIGHT'] = true;
						break;
				
					default:
						break;
				}
	};

	var handleMouseClick = function (e) {

		var c = canvas.getCanvas(e.target.id);
		
		if (this === c.element) {
		
			c.setLastPointerPosition(c.getCurrentPointerPosition());
			c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));
			
		}

		list['click'] = e;
		
	};

	var handleMouseUp = function (e) {

		var c = canvas.getCanvas(e.target.id);

		if (this === c.element) {
		
			c.setLastPointerPosition(c.getCurrentPointerPosition());
			c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));

			events.off.call(c.element, 'mousemove', handleMouseMove);

		}
		
		list['mouseup'] = e;
	
	};

	var handleMouseDown = function (e) {

		var c = canvas.getCanvas(e.target.id);

		if (this === c.element) {

			c.setLastPointerPosition(c.getCurrentPointerPosition());
			c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));
			
			events.on.call(c.element, 'mousemove', handleMouseMove);

		}

		list['mousedown'] = e;

	};

	var handleMouseMove = function (e) {

		var c = canvas.getCanvas(e.target.id);

		if (this === c.element) {
			
			c.setLastPointerPosition(c.getCurrentPointerPosition());
			c.setCurrentPointerPosition(c.translateEventToPointerPosition(e));
						
		}

		list['mousemove'] = e;

	};

	var handleScroll = function (e) {
		
		if (e.preventDefault) {
	
			e.preventDefault();
	
		}
		
		e.returnValue = false;
		
		list['mousewheel'] = e;

	};
/*======================================================================================
-------------------------------------------PUBLIC METHODS--------------------------------
======================================================================================*/
	var dispatch = function () {
  
	  if (Object.keys(list).length) {

		  events.fire('inputs', list);

		}
	
	};

	var clear = function () {
		list = [];
	};

	var registerCanvas = function (id) {

		var canvasElement = canvas.getElement(id);
		
		events.on.call(canvasElement, 'click', handleMouseClick);
		events.on.call(canvasElement, 'mouseup', handleMouseUp);
		events.on.call(canvasElement, 'mousedown', handleMouseDown);
	
	};

	returnObject 				        = function () { return dispatch() };
	returnObject.clear 	        = function () { clear() };
	returnObject.registerCanvas = function (id) { return registerCanvas(id) };
	returnObject.dispatch       = function () { dispatch() };
/*======================================================================================
----------------------------------------EVENT REGISTRATION------------------------------
======================================================================================*/
	events.on('keydown', handleKeyDown);

	events.on.call(window, 'mousewheel', handleScroll);

	returnObject.list   = list;
	
	return returnObject;

});