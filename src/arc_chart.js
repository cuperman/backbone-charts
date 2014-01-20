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
        innerRadius: 0,
        showGradient: false
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

        // set lightness scale used for gradients
        this.lightness = d3.scale.linear()
            .domain([0, this.data.length - 1])
            .range([0.25, 0.85]);
    },

    gradient: function(d, i) {
        var pixVal = Math.round(255 * this.lightness(i));
        return d3.rgb(pixVal, pixVal, pixVal);
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

    renderGradient: function() {
        if (this.svg) {
            this.svg.selectAll("g.arc path")
                .attr("fill", this.gradient.bind(this));
        }

        return this;
    },

    render: function() {
        return this;
    }
});
