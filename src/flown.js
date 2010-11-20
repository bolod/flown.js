/*** FLOWN ***/

(function() {
	function Flown(paper, options){
        this.paper = paper;
        this.paper.canvas.raphael = this.paper; // .raphael is set for elements but not for the canvas
        this.paper.name = "paper";
        
        this.h_step = options.grid_h_step || 1;
        this.v_step = options.grid_v_step || 1;
		
		
	    
		//setup pattern
        //...
        
		    var elements = this.elements = {data: [], func: [], conn: []};
	
        this.setDataBoxStyle = function (opts) {
          DataBox.prototype.style = opts;
        },
        
        this.setFuncBoxStyle = function (opts) {
          FuncBox.prototype.style = opts;
        },
        
        this.addBox = function (box) {
          this.elements[box.type].push(box);
        },
        
        this.removeBox = function (box) {
          this.elements[box.type].removeByElement(box);
        },
        
        this.addConnection = function (conn) {
          this.elements['conn'].push();
        }
        
        this.dataBox = function () {
          var box = new DataBox(this.paper, this.dataBoxStyle);
          this.addBox(box);
          return box;
        },
        
        this.funcBox = function () {
          var box = new FuncBox(this.paper, this.funcBoxStyle);
          this.addBox(box);
          return box;
        },
        
        this.connect = function(from_box, to_box) {
          //...
        }
		
		/********************/
		
      	var init_lBox = function (paper, opts) {		
      		this.box = paper[opts.box.type]().attr(opts.box.attr);
      		this.label = paper.text().attr(opts.label.attr);
      		//input
      		var inConnAreas = InputConnectionAreas.init(paper, opts.conns.inputs, this);
      		
      		//output
      		var outConnAreas = OutputConnectionAreas.init(paper,opts.conns.outputs, this);
      	
      		
      		/*** DRAG'N'DROP ***/
      		this.dragger = paper.dragger([this.box, this.label], 
      		  inConnAreas.map(ConnectionArea.getAreaNode).concat(outConnAreas.map(ConnectionArea.getAreaNode)), 
      		  function(dx, dy) {
      		    var i = 0;
      		    for (i=inConnAreas.length; i--; ){
      		      inConnAreas[i].move(dx, dy);
      		    }
      		    
      		    for (i=outConnAreas.length; i--; ){
      		      outConnAreas[i].move(dx, dy);
      		    }
      		  });
      		
      		/*** SELECTION ***/
      		this.onSelection = function () {
      		/* save_state */
      		/*...*/
      		};
      		
      		this.onUnselection = function (){
      		/* restore state */
      		/*...*/
      		};
      		
      	};
      	
      	var DataBox = function DataBox(paper){
      		this.type = 'data';
      		//defaults
      		var defaults_style = {
      			box: {
      				type: 'rect',
      				attr: {
      					x: 10,
      					y: 10,
      					width: 80,
      					height: 40,
      					r: 10,
      					fill: 'blue',
      					'fill-opacity': .7,
      					'stroke-width': 1,
      					cursor: 'move'
      				}
      			},
      			label: {
      				type: 'text',
      				attr: {
      					text: 'Data',
      					x: 50,
      					y: 30,
      					fill: 'white',
      					'font-size': '24 px',
      					cursor: 'move'
      				}
      			},
      			conns: {
      				inputs: [{
      					type: 'circle',
      					attr: {
      						cx: 50,
      						cy: 10,
      						r: 4,
      						fill: 'black'
      					}
      				}],
      				outputs: [{
      					type: 'circle',
      					attr: {
      						cx: 50,
      						cy: 50,
      						r: 4,
      						fill: 'black'
      					}
      				}]
      			}
      		};
      		
      		init_lBox.call(this, paper, this.hasOwnProperty("style") ? this.style : defaults_style);			
      	};
      	
      	var FuncBox = function FuncBox(label, x, y, width, height) {
      		this.type = 'func';
      		
      		//defaults
      		var defaults_style = {
      			box: {
      				type: 'rect',
      				attr: {
      					x: 10,
      					y: 10,
      					width: 120,
      					height: 80,
      					rx: 40,
      					ry: 10,
      					fill: 'grey',
      					'fill-opacity': .7,
      					'stroke-width': 1,
      					cursor: 'move'
      				}
      			},
      			label: {
      				type: 'text',
      				attr: {
      					text: 'FUNC',
      					x: 70,
      					y: 52,
      					fill: 'white',
      					'font-size': '24 px',
      					cursor: 'move'
      				}
      			},
      			conns: {
      				inputs: [{
      					type: 'circle',
      					attr: {
      						cx: 70,
      						cy: 10,
      						r: 4,
      						fill: 'black'
      					}
      				},
      				{
      					type: 'circle',
      					attr: {
      						cx: 10,
      						cy: 50,
      						r: 4,
      						fill: 'black'
      					}
      				}],
      				outputs: [{
      					type: 'circle',
      					attr: {
      						cx: 70,
      						cy: 90,
      						r: 4,
      						fill: 'black'
      					}
      				},
      				{
      					type: 'circle',
      					attr: {
      						cx: 130,
      						cy: 50,
      						r: 4,
      						fill: 'black'
      					}
      				}]
      			}
      		};
      	
      		init_lBox.call(this, paper, this.hasOwnProperty("style") ? this.style : defaults_style);
      	};
      
      
      	var InputConnectionAreas = {
      		init: function (paper, inputs, lbox) {
      			var i = 0,
      				ica = [];
      			
      			for (i=inputs.length; i--; ) {
      				ica.push(new InputConnectionArea(paper, inputs[i], lbox));
      			}
      			
      			return ica;
      		}
      	}, 
      	OutputConnectionAreas = {
      		init: function (paper, outputs, lbox) {
      			var i = 0,
      			oca = [];
      			
      			for (i=outputs.length; i--; ) {
      				oca.push(new OutputConnectionArea(paper, outputs[i], lbox));
      			}
      			
      			return oca;
      		}
      	}, ConnectionArea = {
      		getAreaNode: function(ca) {
      				return ca.area;
      		}
      	};
      	
      	
      	
      	var InputConnectionArea = function InputConnectionArea(paper, opts, lbox){
      		this.type = 'InputConnectionArea';
      		var area = this.area = paper[opts.type]().attr(opts.attr);
      		this.lbox = lbox;
      		this.area.node.flown = this;
      		this.connections = [];
      	};
      	
      	InputConnectionArea.prototype = {
      	  move: function(dx, dy) {
            for (var i=this.connections.length; i--; ) {
              this.connections[i].translateEnd(dx, dy);
            }
          }
      	};
      	
      	var OutputConnectionArea = function OutputConnectionArea(paper, opts, lbox){
      	  this.type = 'OutputConnectionArea';
      		var area = this.area = paper[opts.type]().attr(opts.attr);
      		var lbox = this.lbox = lbox;
      		this.area.node.flown = this;
      		var connections = this.connections = [];
      		
      		var ox = null,
      		oy = null,
      		svg_path_node = null,
      		drawConnection = function(dx, dy){
      			svg_path_node.attr("path", "M" + ox + "," + oy + " l" + dx + "," + dy);
      		},
      		setupConnection = function() {
      			ox = area.attr("cx");
      			oy = area.attr("cy");
      			svg_path_node = paper.path("");
      			svg_path_node.toBack();
      		},
      		validateConnection = function(event) {
      			if (event.target.hasOwnProperty('flown') && event.target.flown.type == 'InputConnectionArea') {
      			  //aggiungi un oggetto conneciton
      			  var conn = new Connection(svg_path_node, this.node.flown, event.target.flown);
      			  elements.conn.push(conn);
      			  connections.push(conn);
      			  event.target.flown.connections.push(conn);
      			  
      			} else {
      			  svg_path_node.remove();
      			}
      		};
      		this.area.drag(drawConnection, setupConnection, validateConnection);
      	};
      	
      	OutputConnectionArea.prototype = {
          move: function(dx, dy) {
            for (var i=this.connections.length; i--; ) {
              this.connections[i].translateBeginning(dx, dy);
            }
          }
      	};
      	
      	var Connection = function Connection(svg_path_node, from_conn_area, to_conn_area) {
      	  this.type = 'conn';
      	  this.cord = svg_path_node;
      	  this.from_conn_area = from_conn_area;
      	  this.to_conn_area = to_conn_area;
      	  
      	  this.cord.attr("path", 
      	  "M" + this.from_conn_area.area.attr("cx") + "," + 
      	        this.from_conn_area.area.attr("cy") + 
      	  " L" + this.to_conn_area.area.attr("cx") + "," + 
      	         this.to_conn_area.area.attr("cy"));
      	         
      	  this.translateBeginning = function (dx, dy) {
      	    var path = this.cord.attr("path");
      	    //path.replace(/M([0-9]+),([0-9]+)/, (+"$1" + dx + "") + "," + (+"$2" + dy + "")); NON E' UNA STRINGA!!!
      	    path[0][1] += dx;
      	    path[0][2] += dy;
      	    this.cord.attr("path", path);
      	  };
      	  
      	  this.translateEnd = function (dx, dy) {
      	    var path = this.cord.attr("path");
            //path.replace(/M([0-9]+),([0-9]+)/, (+"$1" + dx + "") + "," + (+"$2" + dy + "")); NON E' UNA STRINGA!!!
            path[1][1] += dx;
            path[1][2] += dy;
            this.cord.attr("path", path);
      	  };
      	
      	};
	
	};
	
	
	
	
	
	/**********DA SISTEMARE***********/
	
	
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
	
	
	this.Flown = Flown; 
}) ();