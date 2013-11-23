Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.LineChart = Backbone.Charts.Chart.extend({
    render: function() {
        var self = this;
        
        var svg = d3.select(this.el)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
            
        var line = d3.svg.line()
            .x(function(d, i) {
                return self.scaleX(i);
            })
            .y(function(d) {
                return self.height - self.scaleY(d);
            });
            
        svg.append("path")
            .datum(this.data)
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black");
                
        return this;
    },
    
    setScaleX: function() {
        this.scaleX = d3.scale.ordinal()
            .domain(d3.range(this.data.length))
            .rangePoints([0, this.width]);
        
        return this;
    }
});