/** temporary file to provide Leonard.js-like facility **/





var Leonard = function(holder_id, width, height, x, y) {
	
	this.svgns = "http://www.w3.org/2000/svg";
	this.xlink = "http://www.w3.org/1999/xlink";
	
	
	this.width = width || 400;
	this.height = height || 300;
	this.x = x || 0;
	this.y = y || 0;
	
	this.node = svg._createElement("svg");
	this.node.setAttribute(xmlns="http://www.w3.org/2000/svg"
	this.node.setAttribute("x", this.x);
	this.node.setAttribute("y", this.y);
	this.node.setAttribute("width", this.width);
	this.node.setAttribute("height", this.height);
	
	var container = document.getElementById(containerId);
	container.appendChild(this.node);
	
	this._createElement = function(type) {
		var e = document.createElementNS("http://www.w3.org/2000/svg", type);
		return e;
	};
	
	
}