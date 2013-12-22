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
    
    scaleXOrdinalPoints: function() {
        return d3.scale.ordinal()
            .domain(this.data.map(this.x))
            .rangePoints([this.paddingLeft, this.paddingLeft + this.chartWidth()]);
    },
    
    scaleXOrdinalBands: function() {
        return d3.scale.ordinal()
            .domain(this.data.map(this.x))
            .rangeRoundBands(
                [this.paddingLeft, this.paddingLeft + this.chartWidth()],
                this.columnPadding,
                this.columnOuterPadding
            );
    },

    scaleXLinear: function() {
        return d3.scale.linear()
            .domain([0, this.maxX()])
            .range([this.paddingLeft, this.paddingLeft + this.chartWidth()]);
    },

    scaleXTime: function() {
        return d3.time.scale()
            .domain([this.minX(), this.maxX()])
            .range([this.paddingLeft, this.paddingLeft + this.chartWidth()]);
    },
    
    scaleYLinear: function() {
        return d3.scale.linear()
            .domain([0, this.maxY()])
            .range([this.paddingTop + this.chartHeight(), this.paddingTop]);
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
    
    renderSvg: function() {
        this.svg = d3.select(this.el)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
            
        return this;
    },
    
    renderAxisX: function() {
        this.svg.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + (this.paddingTop + this.chartHeight()) + ")")
            .call(this.axisX);
        
        return this;
    },
    
    renderAxisY: function() {
        this.svg.append("g")
            .attr("class", "axis axis-y")
            .attr("transform", "translate(" + this.paddingLeft + ",0)")
            .call(this.axisY);

        return this;
    },

    renderGridHorizontal: function() {
        var self = this,
            ticks = this.scaleY.ticks(this.gridTickCount);

        var gridScaleY = d3.scale.linear()
            .domain([d3.min(ticks), d3.max(ticks)])
            .range([this.paddingTop, this.paddingTop + this.chartHeight()]);

        this.svg.selectAll("line.grid")
            .data(this.scaleY.ticks(this.gridTickCount))
            .enter()
            .append("line")
                .attr("class", "grid")
                .attr("x1", this.paddingLeft)
                .attr("x2", this.paddingLeft + this.chartWidth())
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
    }
});

Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.ArcChart = Backbone.View.extend({
    baseOptions: {
        data: [],
        width: 400,
        height: 200,
        radius: 100,
        innerRadius: 0
    },

    options: {},

    initialize: function(options) {
        _.chain(this.baseOptions)
            .extend(this.options)
            .extend(options)
            .pick(_.union(Object.keys(this.baseOptions), Object.keys(this.options)))
            .each(function(value, key) {
                if (_.isFunction(value)) {
                    this[key] = value.call(this);
                } else {
                    this[key] = value;
                }
            }, this);

        this.setLayout();
        this.setArc();
    },

    setLayout: function() {
        this.layout = d3.layout.pie()
            .value(function(d) {
                return d;
            });
    },

    setArc: function() {
        this.arc = d3.svg.arc()
            .outerRadius(this.radius)
            .innerRadius(this.innerRadius);
    },

    render: function() {
        return this;
    }
});

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
Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.LineChart = Backbone.Charts.Chart.extend({
    options: {
        scaleTypeX: "ordinalPoints",
        scaleTypeY: "linear",
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

        _.each(this.y, function(y) {
            var self = this;

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
                .attr("class", "line");
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
Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.RingChart = Backbone.Charts.ArcChart.extend({
    options: {
        innerRadius: 50
    },
    
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