Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.LineChart = Backbone.Charts.Chart.extend({
    options: {
        scaleTypeX: "ordinalPoints",
        scaleTypeY: "linear",
        showAxisX: false,
        showAxisY: false,
        showGridHorizontal: false,
        showMarker: false,
        markerFormat: function(x, y) {
            return "x: " + x.toString() + ", y: " + y.toString();
        }
    },
    
    initialize: function() {
        Backbone.Charts.Chart.prototype.initialize.apply(this, arguments);
        
        if (this.showMarker) {
            this.listenTo(this, "svg:mouse:over", this.markerShow);
            this.listenTo(this, "svg:mouse:move", this.markerMove);
            this.listenTo(this, "svg:mouse:out", this.markerHide);
        }
    },
    
    renderMarker: function() {
        this.marker = this.svg.append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", 3)
                    .attr("class", "marker")
                    .style("display", "none");
                    
        this.markerText = this.svg.append("text")
                    //.attr("x", width - margin.right)  
                    .attr("y", 0)
                    .attr("dy", "1em")
                    .attr("text-anchor", "end")
                    .attr("class", "marker-text")
                    .style("display", "none");
                    
        return this;
    },
    
    render: function() {
        var self = this;
            
        this.renderSvg();
        
        if (this.showGridHorizontal) {
            this.renderGridHorizontal();
        }
            
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
        
        if (this.showMarker) {
            this.renderMarker();
        }
                
        return this;
    },
    
    markerShow: function(mouse) {
        if (this.marker) { this.marker.style("display", "block"); }
        if (this.markerText) { this.markerText.style("display", "block"); }
        
        return false;
    },
    
    markerHide: function(mouse) {
        if (this.marker) { this.marker.style("display", "none"); }
        if (this.markerText) { this.markerText.style("display", "none"); }
        
        return false;
    },
    
    markerMove: function(mouse) {
        var targetX = this.scaleX(Math.round(this.invertX(mouse.x))),
            closest = this.findClosestDatum(this.invertX(targetX)),
            closestX = this.x(closest),
            closestY = this.y(closest);
        
        if (closestX && closestY && this.marker) {
            this.marker.attr("cx", this.scaleX(closestX));
            this.marker.attr("cy", this.scaleY(closestY));
        }
        
        if (closestX && closestY && this.markerText) {
            this.markerText.text(this.markerFormat(closestX, closestY));
        }
        
        return false;
    }
});
