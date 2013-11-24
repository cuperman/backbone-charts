Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.LineChart = Backbone.Charts.Chart.extend({
    options: {
        showAxisX: false,
        showAxisY: false
    },
    
    render: function() {
        var self = this;
            
        this.renderSvg();
            
        var line = d3.svg.line()
            .x(function(d, i) {
                return self.scaleX(i);
            })
            .y(function(d) {
                return self.scaleY(d);
            });
            
        this.svg.append("path")
            .datum(this.data)
            .attr("d", line)
            .attr("class", "line");
            
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
            .rangePoints([this.paddingLeft, this.paddingLeft + this.chartWidth]);
        
        return this;
    }
});