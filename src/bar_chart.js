Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.BarChart = Backbone.Charts.Chart.extend({
    options: {
        columnPadding: 0.1
    },
    
    render: function() {
        var self = this;
        
        var svg = d3.select(this.el)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
            
        svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("x", function(d, i) {
                    return self.scaleX(i);
                })
                .attr("y", function(d) {
                    return self.height - self.scaleY(d);
                })
                .attr("width", self.scaleX.rangeBand())
                .attr("height", function(d) {
                    return self.scaleY(d);
                });
                
        return this;
    },
    
    setScaleX: function() {
        this.scaleX = d3.scale.ordinal()
            .domain(d3.range(this.data.length))
            .rangeRoundBands([0, this.width], this.columnPadding);
        
        return this;
    }
});