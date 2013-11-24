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
                    this[key] = value.call(this)
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