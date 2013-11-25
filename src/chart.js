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
        tickFormatY: null
    },
    
    options: {},
    
    initialize: function(options) {
        _.chain(this.baseOptions)
            .extend(this.options)
            .extend(options)
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
            .domain([0, d3.max(this.data, this.x)])
            .range([this.paddingLeft, this.paddingLeft + this.chartWidth()]);
    },
    
    scaleXTime: function() {
        return d3.time.scale()
            .domain([d3.min(this.data, this.x), d3.max(this.data, this.x)])
            .range([this.paddingLeft, this.paddingLeft + this.chartWidth()]);
    },
    
    scaleYLinear: function() {
        return d3.scale.linear()
            .domain([0, d3.max(this.data, this.y)])
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
            .orient("left")
            
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
    
    render: function() {
        return this;
    }
});