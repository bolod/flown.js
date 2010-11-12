/*** FLOWN ***/

(function() {
	function Flown(div_id, dimX, dimY, grid_h_step, grid_v_step){
		this.dimX = dimX;
		this.dimY = dimY;
	    this.div_id = div_id;
	    
	    //setup Raphael[le]
	    var paper = Raphael(div_id, dimX, dimY);
		paper.canvas.raphael = this.paper; // .raphael is set for elements but not for the canvas
		paper.name = "paper";
		
	    this.h_step = h_step || 10;
	    this.v_step = v_step || 10;
	    
	    this.elements = {data: [], func: [], conn: []};
	};
	
	Flown.prototype = {
		addBox(): function(box) {
			this.elements[box.type].push(box);
		},
		
		removeBox(): function(box) {
			this.elements[box.type].removeByElement(box);
		},
		
		getDataBox(): function(opts) {
			return new DataBox(opts);
		},
		
		getFuncBox(): function(label) {
			return new FuncBox(opts);
		}	
	};

function LabeledBox(opts) {
    //default values
    this.width = width || 100;
    this.height = heght || 40;
    this.x = x || paper.width / 2 - this.width / 2;
    this.y = y || paper.height / 2 - this.height / 2;
    
    //input
    this.inConnAreas = {};
    
    //output
    this.outConnAreas = {};
    
    this.box = new  /* svg.Rect() ...set fill="#57C" */
    this.label = new /* svg.Text(label) */
    this.boxLayer = new /* svg.Layer() */
    this.boxLayer.addElement(this.box);
    this.boxLayer.addElement(this.label);
    
    this.globalLayer = new /* svg.Layer() */
    this.globalLayer.addElement(this.boxLayer);

    
    /*** DRAG'N'DROP ***/
    this.globalLayer.drag(
	function start_move(){
	    this.ox = x;
	    this.oy = y;
	}
	
	function move(dx, dy){
	    this.translate(dx, dy);
	}
	
	function end_move(){
	    
	}
    );
    
    /*** SELECTION ***/
    this.onSelection(){
	/* save_state */
	/*...*/
    }
    
    this.onUnselection(){
	/* restore state */
	/*...*/
    }
    
}

function DataBox(label, x, y, widht, heght){
    /* "... a data box is a rounded-corner-square */
    this.box./*...set rounded corner rx="20" ry="100"*/
    
    
    //input
    this.inConnAreas["up"] =  new InputConnectionArea(this.x, this.y, this.width, this.height, "up");
    
    //output
	this.outConnAreas["down"] = new OutputConnectionArea(this.x, this.y, this.width, this.height, "down");
    
    this.globalLayer.addElement(this.inConnArea.up.getFlownElem());
    this.globalLayer.addElement(this.outConnArea.down.getFlownElem());
    
    
}

function FuncBox(label, x, y, width, height) {
	/* "... a function box is a simple square */
	
    //inputs
    this.inConnAreas["left"] =  new InputConnectionArea(this.x, this.y, this.width, this.height, "left");
    
    //outputs
	this.outConnAreas["right"] = new OutputConnectionArea(this.x, this.y, this.width, this.height, "right");
    
    this.globalLayer.addElement(this.inConnArea.left.flownEl);
    this.globalLayer.addElement(this.outConnArea.right.flownEl);
}

function ConnectionArea(box_x, box_y, box_width, box_hieght, position){
	//default
	this.max_dim = 40;
	this.min_dim = 6;
	
	this.position = position;
	
	
	switch (position) {
		case "up":
			this.width = this.max_dim;
			this.height = this.min_dim;

			this.x = box_x+box_width/2-this.width/2;
			this.y = box_y-this.height/2;
			break;
			
		case "left":
			this.width = this.min_dim;
			this.height = this.max_dim;
			
			this. = box_x-this.width/2;;
			this.y = box_y+box_height/2-this.height/2;
			break;
		case "down":
			this.width = this.max_dim;
			this.height = this.min_dim;
			
			this.x = box_x+box_width/2-this.width/2;
			this.y = box_y+box_height-this.height/2;
			break;
		case "right":
			this.width = this.min_dim;
			this.height = this.max_dim;
			
			this.x = box_x+box_width-this.width/2;
			this.y = box_y+box_height/2-this.height/2;
			break;
		default:
			console.warn("Error in ConnectionArea placement: <"+position+"> not recognized.");
			break;
	}
	
	
	
	
	this.flownEl = new /* svg.rect */
    
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

extend(DataBox, LabeledBox);
extend(FuncBox, DataBox);
extend(InputConnectionArea, ConnectionArea);
extend(OutputConnectionArea, ConnectionArea);
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
}) ();