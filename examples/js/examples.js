$(document).ready(function() {
    'use strict';

    var barChart = new Backbone.Charts.BarChart({
        el: "#bar-chart",
        data: [1, 2, 3, 4, 5],
        width: 400,
        height: 200
    });
    barChart.render();

    var lineChart = new Backbone.Charts.LineChart({
        el: "#line-chart",
        data: [1, 2, 3, 4, 5],
        width: 400,
        height: 200
    });
    lineChart.render();
});