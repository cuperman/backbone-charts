Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.MultiLineChart = Backbone.Charts.Chart.extend({
    options: {
        y: [],
        scaleTypeX: "ordinalPoints",
        scaleTypeY: "linear",
        showAxisX: false,
        showAxisY: false,
        showGridHorizontal: false
    },

    minY: function() {
        return d3.min(this.data, function(d) {
            return d3.min(_.map(this.y, function(y) {
                return y(d);
            }));
        });
    },

    maxY: function() {
        var self = this;
        return d3.max(this.data, function(d) {
            return d3.max(_.map(self.y, function(y) {
                return y(d);
            }));
        });
    },

    render: function() {
        this.renderSvg();

        if (this.showGridHorizontal) {
            this.renderGridHorizontal();
        }

        _.each(this.y, function(y, i) {
            var self = this,
                count = i + 1;

            var line = d3.svg.line()
                .x(function(d, i) {
                    return self.scaleX(self.x(d, i));
                })
                .y(function(d, i) {
                    return self.scaleY(y(d, i));
                });

            this.svg.append("path")
                .datum(this.data)
                .attr("d", line)
                .attr("class", "line line-y" + count);
        }, this);

        if (this.showAxisX) {
            this.renderAxisX();
        }

        if (this.showAxisY) {
            this.renderAxisY();
        }

        return this;
    }
});
