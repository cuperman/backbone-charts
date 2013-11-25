Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.LineChart = Backbone.Charts.Chart.extend({
    options: {
        scaleTypeX: "ordinalPoints",
        scaleTypeY: "linear",
        showAxisX: false,
        showAxisY: false
    },
    
    render: function() {
        var self = this;
            
        this.renderSvg();
            
        var line = d3.svg.line()
            .x(function(d, i) {
                return self.scaleX(self.x(d, i));
            })
            .y(function(d, i) {
                return self.scaleY(self.y(d, i));
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
    }
});