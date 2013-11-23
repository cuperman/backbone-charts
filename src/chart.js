Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.Chart = Backbone.View.extend({
    baseOptions: {
        data: [],
        width: 400,
        height: 200
    },
    
    options: {},
    
    initialize: function(options) {
        _.chain(this.baseOptions)
            .extend(this.options)
            .extend(options)
            .pick(_.union(Object.keys(this.baseOptions), Object.keys(this.options)))
            .each(function(value, key) {
                if (_.isFunction(value)) {
                    this[key] = value.call(this)
                } else {
                    this[key] = value;
                }
            }, this);
        
        this.setScales();
    },

    setScaleX: function() {
        this.scaleX = d3.scale.linear()
            .domain([0, this.data.length - 1])
            .range([0, this.width]);
        
        return this;
    },
    
    setScaleY: function() {
        this.scaleY = d3.scale.linear()
            .domain([0, d3.max(this.data)])
            .range([0, this.height]);
            
        return this;
    },

    setScales: function() {
        this.setScaleX();
        this.setScaleY();
        return this;
    },

    setAxisX: function() {
        return this;
    },

    setAxisY: function() {
        return this;
    },

    setAxes: function() {
        this.setAxisX();
        this.setAxisY();
        return this;
    },

    render: function() {
        return this;
    }
});