Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.Chart = Backbone.View.extend({
    baseOptions: {
        data: [],
        x: function(d, i) {
            return i;
        },
        y: function(d) {
            return d;
        },
        width: 400,
        height: 200,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        scaleTypeX: "linear",
        scaleTypeY: "linear",
        tickCountX: null,
        tickCountY: null,
        tickFormatX: null,
        tickFormatY: null,
        gridTickCount: 4
    },

    options: {},

    initialize: function(options) {
        _.chain({})
            .extend(this.baseOptions, this.options, options)
            .pick(_.union(Object.keys(this.baseOptions), Object.keys(this.options)))
            .each(function(value, key) {
                this[key] = value;
            }, this);

        this.setScales();
        this.setAxes();
    },

    chartWidth: function() {
        return this.width - this.paddingLeft - this.paddingRight;
    },
    
    chartHeight: function() {
        return this.height - this.paddingTop - this.paddingBottom;
    },

    minX: function() {
        return d3.min(this.data, this.x);
    },

    minY: function() {
        return d3.min(this.data, this.y);
    },
    
    maxX: function() {
        return d3.max(this.data, this.x);
    },
    
    maxY: function() {
        return d3.max(this.data, this.y);
    },
    
    chartLeft: function() {
        return this.paddingLeft;
    },
    
    chartRight: function() {
        return this.paddingLeft + this.chartWidth();
    },
    
    chartTop: function() {
        return this.paddingTop;
    },
    
    chartBottom: function() {
        return this.paddingTop + this.chartHeight();
    },
    
    scaleXOrdinalPoints: function() {
        return d3.scale.ordinal()
            .domain(this.data.map(this.x))
            .rangePoints([this.chartLeft(), this.chartRight()]);
    },
    
    scaleXOrdinalBands: function() {
        return d3.scale.ordinal()
            .domain(this.data.map(this.x))
            .rangeRoundBands(
                [this.chartLeft(), this.chartRight()],
                this.columnPadding,
                this.columnOuterPadding
            );
    },

    scaleXLinear: function() {
        return d3.scale.linear()
            .domain([0, this.maxX()])
            .range([this.chartLeft(), this.chartRight()]);
    },

    scaleXTime: function() {
        return d3.time.scale()
            .domain([this.minX(), this.maxX()])
            .range([this.chartLeft(), this.chartRight()]);
    },
    
    scaleYLinear: function() {
        return d3.scale.linear()
            .domain([0, this.maxY()])
            .range([this.chartBottom(), this.chartTop()]);
    },

    setScaleX: function() {
        switch(this.scaleTypeX) {
            case "linear":
                this.scaleX = this.scaleXLinear();
                break;
            case "ordinalPoints":
                this.scaleX = this.scaleXOrdinalPoints();
                break;
            case "ordinalBands":
                this.scaleX = this.scaleXOrdinalBands();
                break;
            case "time":
                this.scaleX = this.scaleXTime();
                break;
        }
        
        return this;
    },
    
    setScaleY: function() {
        switch(this.scaleTypeY) {
            case "linear":
                this.scaleY = this.scaleYLinear();
                break;
        }
            
        return this;
    },

    setScales: function() {
        this.setScaleX();
        this.setScaleY();
        
        return this;
    },

    setAxisX: function() {
        this.axisX = d3.svg.axis()
            .scale(this.scaleX)
            .orient("bottom");
            
        if (this.tickCountX) {
            this.axisX.ticks(this.tickCountX);
        }
        
        if (this.tickFormatX) {
            this.axisX.tickFormat(this.tickFormatX);
        }
            
        return this;
    },

    setAxisY: function() {
        this.axisY = d3.svg.axis()
            .scale(this.scaleY)
            .orient("left");
            
        if (this.tickCountY) {
            this.axisY.ticks(this.tickCountY);
        }
    
        if (this.tickFormatY) {
            this.axisY.tickFormat(this.tickFormatY);
        }
            
        return this;
    },

    setAxes: function() {
        this.setAxisX();
        this.setAxisY();
        
        return this;
    },
    
    invertX: function(value) {
        if (this.scaleTypeX.match(/^ordinal.*/)) {
            var offset = value - this.chartLeft(),
                normal = offset / this.chartWidth();
                
            return normal * this.data.length;
        } else {
            return this.scaleX.invert(value);
        }
    },
    
    // returns the datum closest to the specified x value
    findClosestDatum: function(x) {
        return _.find(this.data, function(datum) {
            return x < this.x(datum);
        }, this);
    },
    
    renderSvg: function() {
        this.svg = d3.select(this.el)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
            
        this.bindSvgListeners();
            
        return this;
    },
    
    renderAxisX: function() {
        this.svg.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + this.chartBottom() + ")")
            .call(this.axisX);
        
        return this;
    },
    
    renderAxisY: function() {
        this.svg.append("g")
            .attr("class", "axis axis-y")
            .attr("transform", "translate(" + this.chartLeft() + ",0)")
            .call(this.axisY);

        return this;
    },

    renderGridHorizontal: function() {
        var self = this,
            ticks = this.scaleY.ticks(this.gridTickCount);

        var gridScaleY = d3.scale.linear()
            .domain([d3.min(ticks), d3.max(ticks)])
            .range([this.chartTop(), this.chartBottom()]);

        this.svg.selectAll("line.grid")
            .data(this.scaleY.ticks(this.gridTickCount))
            .enter()
            .append("line")
                .attr("class", "grid")
                .attr("x1", this.chartLeft())
                .attr("x2", this.chartRight())
                .attr("y1", function(d, i) {
                    return gridScaleY(d);
                })
                .attr("y2", function(d, i) {
                    return gridScaleY(d);
                });

        return this;
    },

    render: function() {
        return this;
    },
    
    bindSvgListeners: function() {
        var self = this;
        
        if (this.svg) {
            this.svg.on("mouseover", function() {
                var mouse = d3.mouse(this),
                    coords = {x: mouse[0], y: mouse[1]};
                
                self.trigger("svg:mouse:over", coords);
            });
        
            this.svg.on("mousemove", function() {
                var mouse = d3.mouse(this),
                    coords = {x: mouse[0], y: mouse[1]};
                
                self.trigger("svg:mouse:move", coords);
            });
        
            this.svg.on("mouseout", function() {
                var mouse = d3.mouse(this),
                    coords = {x: mouse[0], y: mouse[1]};
                
                self.trigger("svg:mouse:out", coords);
            });
        }
    }
});
