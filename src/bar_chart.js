Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.BarChart = Backbone.Charts.Chart.extend({
    options: {
        columnPadding: 0.1,
        columnOuterPadding: 0,
        showAxisX: false,
        showAxisY: false
    },
    
    render: function() {
        var self = this;
        
        this.renderSvg();
            
        this.svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("x", function(d, i) {
                    return self.scaleX(i);
                })
                .attr("y", function(d) {
                    return self.scaleY(d);
                })
                .attr("width", self.scaleX.rangeBand())
                .attr("height", function(d) {
                    return self.paddingTop + self.chartHeight - self.scaleY(d);
                });
                
        if (this.showAxisX) {
            this.renderAxisX();
        }
        
        if (this.showAxisY) {
            this.renderAxisY();
        }
                
        return this;
    },
    
    setScaleX: function() {
        this.scaleX = d3.scale.ordinal()
            .domain(d3.range(this.data.length))
            .rangeRoundBands(
                [this.paddingLeft, this.paddingLeft + this.chartWidth],
                this.columnPadding,
                this.columnOuterPadding
            );
        
        return this;
    }
});