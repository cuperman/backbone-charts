Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.PieChart = Backbone.View.extend({
    initialize: function(options) {
        this.data = options.data || [];
        this.width = options.width || 400;
        this.height = options.height || 200;
        
        this.radius = d3.min([this.width, this.height]) / 2;
        
        this.setLayout();
        this.setArc();
    },
    
    render: function() {
        var svg = d3.select(this.el)
            .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
                                        
        var arcs = svg.selectAll("g.arc")
            .data(this.layout(this.data))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + this.radius + ", " + this.radius + ")");
                    
        arcs.append("path")
            .attr("d", this.arc)
            .style("fill", "black")
            .style("stroke", "white");
        
        return this;
    },
    
    setLayout: function() {
        this.layout = d3.layout.pie()
            .value(function(d) {
                return d;
            });
    },
    
    setArc: function() {
        this.arc = d3.svg.arc()
            .outerRadius(this.radius)
            .innerRadius(0);
    }
});