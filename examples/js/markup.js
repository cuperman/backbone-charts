$(document).ready(function() {
    'use strict';

    var datasets = {
        simple: [1, 2, 3, 4, 5],
        multi: [
            { y1:  4, y2:  1 },
            { y1:  8, y2:  4 },
            { y1: 12, y2:  9 },
            { y1: 16, y2: 16 },
            { y1: 20, y2: 25 }
        ]
    }

    $(".markup-chart").each(function(index, el) {
        var $el = $(el),
            chartType = $el.data("type"),
            dataset = $el.data("set"),
            attrX = $el.data("attr-x"),
            attrY = $el.data("attr-y"),
            width = $el.data("width"),
            height = $el.data("height"),
            radius = $el.data("radius"),
            innerRadius = $el.data("radius-inner");

        var options = {
            data: datasets[dataset],
            width: width,
            height: height,
            radius: radius,
            innerRadius: innerRadius
        };

        if (attrX) {
            options.x = function(d) {
                return d[attrX];
            }
        }
        if (attrY) {
            if (chartType === "multi-line") {
                options.y = _.map(attrY.split(","), function(key) {
                    return function(d) {
                        return d[key];
                    };
                });
            } else {
                options.y = function(d) {
                    return d[attrY];
                }
            }
        }

        console.debug("options", options);

        var chart;
        switch(chartType) {
            case "bar":
                chart = new Backbone.Charts.BarChart(options);
                break;
            case "line":
                chart = new Backbone.Charts.LineChart(options);
                break;
            case "multi-line":
                chart = new Backbone.Charts.MultiLineChart(options);
                break;
            case "pie":
                chart = new Backbone.Charts.PieChart(options);
                break;
        }

        if (chart) {
            $el.append(chart.render().$el);
        }
    });

    /*
    new Backbone.Charts.BarChart({
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
    }).render();

    new Backbone.Charts.LineChart({
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
    }).render();
    
    new Backbone.Charts.BarChart({
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
    }).render();
    
    new Backbone.Charts.LineChart({
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
    }).render();

    new Backbone.Charts.LineChart({
        el: "#line-with-dates",
        data: [
            {date: new Date(2013, 11, 1), count: 102},
            {date: new Date(2013, 11, 2), count: 39},
            {date: new Date(2013, 11, 3), count: 24},
            {date: new Date(2013, 11, 4), count: 124},
            {date: new Date(2013, 11, 5), count: 98},
            {date: new Date(2013, 11, 6), count: 67},
            {date: new Date(2013, 11, 7), count: 86}
        ],
        x: function(d) {
            return d.date;
        },
        y: function(d) {
            return d.count;
        },
        width: 300,
        height: 150,
        scaleTypeX: "time",
        columnPadding: 0.1,
        columnOuterPadding: 0.1,
        paddingLeft: 35,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 25,
        showAxisX: true,
        showAxisY: true,
        tickCountX: 3,
        tickFormatX: d3.time.format("%x")
    }).render();

    new Backbone.Charts.BarChart({
        el: "#bar-with-grid",
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
        showAxisY: true,
        showGridHorizontal: true
    }).render();

    new Backbone.Charts.LineChart({
        el: "#line-with-grid",
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
        showAxisY: true,
        showGridHorizontal: true
    }).render();
    */

});
