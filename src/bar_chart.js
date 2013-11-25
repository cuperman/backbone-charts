Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.BarChart = Backbone.Charts.Chart.extend({
    options: {
        scaleTypeX: "ordinalBands",
        scaleTypeY: "linear",
        columnPadding: 0.1,
        columnOuterPadding: 0,
        showAxisX: false,
        showAxisY: false,
        showGridHorizontal: false
    },
    
    render: function() {
        var self = this;
        
        this.renderSvg();
        
        if (this.showGridHorizontal) {
            this.renderGridHorizontal();
        }
            
        this.svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
                .attr("x", function(d, i) {
                    return self.scaleX(self.x(d, i));
                })
                .attr("y", function(d, i) {
                    return self.scaleY(self.y(d, i));
                })
                .attr("width", self.scaleX.rangeBand())
                .attr("height", function(d, i) {
                    return self.paddingTop + self.chartHeight() - self.scaleY(self.y(d, i));
                });
                
        if (this.showAxisX) {
            this.renderAxisX();
        }
        
        if (this.showAxisY) {
            this.renderAxisY();
        }
               
        return this;
    }
});