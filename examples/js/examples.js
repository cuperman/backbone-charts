$(document).ready(function() {
    'use strict';

    var barChart = new Backbone.Charts.BarChart({
        el: "#bar-chart",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150
    });
    barChart.render();

    var lineChart = new Backbone.Charts.LineChart({
        el: "#line-chart",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150
    });
    lineChart.render();
    
    var pieChart = new Backbone.Charts.PieChart({
        el: "#pie-chart",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150,
        radius: 75
    });
    pieChart.render();
    
    var ringChart = new Backbone.Charts.RingChart({
        el: "#ring-chart",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150,
        radius: 75,
        innerRadius: 37.5
    });
    ringChart.render();
    
    var barWithAxes = new Backbone.Charts.BarChart({
        el: "#bar-with-axes",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150,
        columnPadding: 0.1,
        columnOuterPadding: 0.1,
        paddingLeft: 35,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 25,
        showAxisX: true,
        showAxisY: true
    });
    barWithAxes.render();
    
    var lineWithAxes = new Backbone.Charts.LineChart({
        el: "#line-with-axes",
        data: [1, 2, 3, 4, 5],
        width: 300,
        height: 150,
        columnPadding: 0.1,
        columnOuterPadding: 0.1,
        paddingLeft: 35,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 25,
        showAxisX: true,
        showAxisY: true
    });
    lineWithAxes.render();
    
    var barCustomData = new Backbone.Charts.BarChart({
        el: "#bar-custom-data",
        data: [
            {letter: 'A', count: 102},
            {letter: 'B', count: 39},
            {letter: 'C', count: 24},
            {letter: 'D', count: 124},
            {letter: 'E', count: 98},
            {letter: 'F', count: 67},
            {letter: 'G', count: 86}
        ],
        x: function(d) {
            return d.letter;
        },
        y: function(d) {
            return d.count;
        },
        width: 300,
        height: 150,
        columnPadding: 0.1,
        columnOuterPadding: 0.1,
        paddingLeft: 35,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 25,
        showAxisX: true,
        showAxisY: true
    });
    barCustomData.render();
    
    var lineCustomData = new Backbone.Charts.LineChart({
        el: "#line-custom-data",
        data: [
            {letter: 'A', count: 102},
            {letter: 'B', count: 39},
            {letter: 'C', count: 24},
            {letter: 'D', count: 124},
            {letter: 'E', count: 98},
            {letter: 'F', count: 67},
            {letter: 'G', count: 86}
        ],
        x: function(d) {
            return d.letter;
        },
        y: function(d) {
            return d.count;
        },
        width: 300,
        height: 150,
        columnPadding: 0.1,
        columnOuterPadding: 0.1,
        paddingLeft: 35,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 25,
        showAxisX: true,
        showAxisY: true
    });
    lineCustomData.render();
});