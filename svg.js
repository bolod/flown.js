var svg = {};

svg.svgns = "http://www.w3.org/2000/svg";
svg.xlink = "http://www.w3.org/1999/xlink";

svg._createElement = function(type) {

    var e = document.createElementNS("http://www.w3.org/2000/svg", type);
    return e;
};

svg.Paper = function(containerId) {
	
    this.node = svg._createElement("svg");
    this.node.setAttribute("x", "0");
    this.node.setAttribute("y", "0");
    this.node.setAttribute("width", "400");
    this.node.setAttribute("height", "300");

    var container = document.getElementById(containerId);
    container.appendChild(this.node);
};

svg.Paper.prototype = {
	
    addElement: function(element) {
		
        this.node.appendChild(element.node);
    },
	
    get x() {
        return this.node.getAttribute("x");
    },
	
    set x(value) {
        this.node.setAttribute("x", value)
    },
	
    get y() {
        return this.node.getAttribute("y")
    },
	
    set y(value) {
        this.node.setAttribute("y", value)
    },
	
    get height() {
        return this.node.getAttribute("height");
    },
	
    set height(value) {
        this.node.setAttribute("height", value);
    },

    get width() {
        return this.node.getAttribute("width");
    },
	
    set width(value) {
        this.node.setAttribute("width", value);
    },

    get style() {
        return this.node.getAttribute("style");
    }
	
};
	
svg.Rect = function(attr) {
	
    this.node = svg._createElement("rect");
    this.node.setAttribute("x", "10");
    this.node.setAttribute("y", "10");
    this.node.setAttribute("width", "20");
    this.node.setAttribute("height", "10");
    this.node.style["stroke-width"] = 1;
};

svg.Rect.prototype = {

    get x() {
        return this.node.getAttribute("x");
    },

    set x(value) {
        this.node.setAttribute("x", value);
    },

    get y() {
        return this.node.getAttribute("y");
    },
	
    set y(value) {
        this.node.setAttribute("y", value);
    },

    get height() {
        return this.node.getAttribute("height");
    },
	
    set height(value) {
        this.node.setAttribute("height", value);
    },

    get width() {
        return this.node.getAttribute("width");
    },
	
    set width(value) {
        this.node.setAttribute("width", value);
    },

    get style() {
        return this.node.style;
    }
};