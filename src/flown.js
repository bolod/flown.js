/*** FLOWN ***/

(function() {
	function Flown(div_id, dimX, dimY, grid_h_step, grid_v_step){
		this.dimX = dimX;
		this.dimY = dimY;
	    this.div_id = div_id;
	    
	    this.h_step = grid_h_step || 10;
	    this.v_step = grid_v_step || 10;
	    
	    //setup Raphael[le]
	    this.paper = Raphael(div_id, dimX, dimY);
		this.paper.canvas.raphael = this.paper; // .raphael is set for elements but not for the canvas
		this.paper.name = "paper";
	    
		//setup pattern
		//...
		
	    this.elements = {data: [], func: [], conn: []};
	};
	
	Flown.prototype = {	
		addBox: function(box) {
			this.elements[box.type].push(box);
		},
		
		removeBox: function(box) {
			this.elements[box.type].removeByElement(box);
		},
		
		
		getDataBox: function(opts) {
			var box = new DataBox(this.paper, opts);
			this.addBox(box);
			return box;
		},
		
		getFuncBox: function(label) {
			var box = new FuncBox(this.paper, opts);
			this.addBox(box);
			return box;
		},
		
		connect: function(from_box, to_box) {
			//...
		}
	};

	/**
	 * opts = {
	 * 	box: {...},
	 * 	label: {...},
	 * 	conns:
	 * 		up: {...},
	 * 		down: {...},
	 * 		left: {...},
	 * 		right: {...}
	 * }
	 * 
	 * box = {
	 * 	type: 'rect',
	 * 	attr: {...}
	 * }
	 * 
	 * label = {
	 * 	text: '...',
	 * 	attr: {...} 
	 * }
	 */
	
	function LabeledBox(opts) {
	    console.log('ESEGUO IL COSTRUTTORE DI LabeledBox.');
		
	    //input
	    this.inConnAreas = {};
	    
	    //output
	    this.outConnAreas = {};
	    
	    this.box = paper[box.type]().attr(opts.box.attr);
	    this.label = paper.text(opts.label.text,opts.label.attr);
	    this.boxLayer = paper.group();
	    this.boxLayer.add(this.box);
	    this.boxLayer.add(this.label);
	    
	    this.globalLayer = paper.group();
	    this.globalLayer.add(this.boxLayer);
	
	    
	    /*** DRAG'N'DROP ***/
	    this.globalLayer.draggable();
	    
	    /*** SELECTION ***/
	    this.onSelection = function () {
		/* save_state */
		/*...*/
	    };
	    
	    this.onUnselection = function (){
		/* restore state */
		/*...*/
	    };
	    
	}
	
	function DataBox(paper, opts){
		
		this.type = 'data';
	    /* "... a data box is a rounded-corner-square - ma è vero?
	     * direi piuttosto che una DataBox è diustinta dal fatto di avere un solo input e un solo output
	     * a prescindere anche dalla rispettiva posizione*/
		
			    //input
	    this.inConnAreas = {};
	    
	    //output
	    this.outConnAreas = {};
	    
	    this.box = paper[opts.box.type]().attr(opts.box.attr);
	    this.label = paper.text().attr(opts.label.attr);
	    this.boxLayer = paper.group();
	    this.boxLayer.add(this.box);
	    this.boxLayer.add(this.label);
	    
	    this.globalLayer = paper.group();
	    this.globalLayer.add(this.boxLayer);
	
	    
	    /*** DRAG'N'DROP ***/
	    this.globalLayer.draggable();
	    
	    /*** SELECTION ***/
	    this.onSelection = function () {
		/* save_state */
		/*...*/
	    };
	    
	    this.onUnselection = function (){
		/* restore state */
		/*...*/
	    };
		
		
	}
	
	function FuncBox(label, x, y, width, height) {
		this.type = 'func';
	}
	
	function ConnectionArea(box_x, box_y, box_width, box_hieght, position){
		
	}
	
	function InputConnectionArea(x ,y ,width, height, position){
	    
	}
	
	function OutputConnectionArea(x, y, width, height, position){
	    
	}
	
	
	
	
	
	
	
	/********************EXTEND********************/
	function extend(Child, Parent) {
	    var F = function(){};
	    F.prototype = Parent.prototype;
	    Child.prototype = new F();
	    Child.prototype.constructor = Child;
	    Child.uber = Parent.prototype;
	}
	
	/*
	console.log('ESTENDO...');
	extend(DataBox, LabeledBox);
	extend(FuncBox, DataBox);
	extend(InputConnectionArea, ConnectionArea);
	extend(OutputConnectionArea, ConnectionArea);
	*/
	/********************************************/
	
	
	
	
	
	/*** SELECTION ***/
	var selector  = {
	    selectedObject: [],
	    
	    addToSelection: function(args){
		for (var obj in arguments) {
		    this.selectedObject[this.selectedObject.length] = arguments[obj];
		}
	    },
	    
	    removeFromSelection: function(args){
		for (var obj in arguments) {
		    this.selectedObject.removeByElement(arguments[obj]);
		}
	    }
	}
	
	/*** AUGMENT BUILT-IN ***/
	Array.prototype.removeByElement = function(element){
	    for(var i = 0; i < this.length; i++ ){ 
		if(this[i] == element)
		    this.splice(i,1); 
	    } 
	}
	
	
	window.Flown = Flown; 
}) ();