Backbone.Charts = Backbone.Charts || {};

Backbone.Charts.Chart = Backbone.View.extend({
    initialize: function(options) {
        this.data = options.data || [];
        this.width = options.width || 400;
        this.height = options.height || 200;
        
        this.setScales();
    },

    setScaleX: function() {
        return this;
    },

    setScaleY: function() {
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
