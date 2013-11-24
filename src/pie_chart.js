Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.PieChart = Backbone.Charts.ArcChart.extend({
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
            .attr("d", this.arc);
        
        return this;
    }
});