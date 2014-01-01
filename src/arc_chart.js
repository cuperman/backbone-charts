Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.ArcChart = Backbone.View.extend({
    baseOptions: {
        data: [],
        value: function(d) {
            return d;
        },
        width: 400,
        height: 200,
        radius: 100,
        innerRadius: 0
    },

    options: {},

    initialize: function(options) {
        _.chain({})
            .extend(this.baseOptions, this.options, options)
            .pick(_.union(Object.keys(this.baseOptions), Object.keys(this.options)))
            .each(function(value, key) {
                this[key] = value;
            }, this);

        this.setLayout();
        this.setArc();
    },

    setLayout: function() {
        this.layout = d3.layout.pie()
            .value(this.value);
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
