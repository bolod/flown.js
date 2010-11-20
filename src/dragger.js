Raphael.fn.dragger = function(active, passive, callbackfun) {
	
	var Dragger_obj = function(active, passive, callbackfun){
	
		var callback = callbackfun || function() {},
			active_elements = active,
			passive_elements = passive,
			ox = 0, 
			oy = 0,
			
			elem_move = function(dx, dy, clientX, clientY, event) {
				var i = 0,
					actual_dx = this._drag.x + dx - ox,
					actual_dy = this._drag.y + dy - oy;
					
				ox += actual_dx;	
				oy += actual_dy;
				
				for(i=active_elements.length; i--; ) {
					active_elements[i].translate(actual_dx, actual_dy);
				}
				
				for(i=passive_elements.length; i--; ) {
					passive_elements[i].translate(actual_dx, actual_dy);
				}
				
				callback(actual_dx, actual_dy); 
			},
		
			elem_start = function(event) {
				ox = this._drag.x;
				oy = this._drag.y;
			},
		
			elem_up = function() {
			
			};
		
		for (var i=active_elements.length; i--;) {
			active_elements[i].drag(elem_move, elem_start, elem_up);
		}
	};
	
	return new Dragger_obj(active, passive, callbackfun);
};
