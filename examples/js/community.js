$(document).ready(function() {
    'use strict';

    var communityChart = function(el, data) {
        new Backbone.Charts.LineChart({
            el: el,
            data: data,
            x: function(d, i) {
                var split = d.Date.split('-');
                return new Date(
                    parseInt(split[0], 10),
                    parseInt(split[1], 10) - 1,
                    parseInt(split[2]), 10);
            },
            y: function(d) {
                return d["WAM Rank"];
            },
            width: 540,
            height: 150,
            scaleTypeX: "time",
            paddingLeft: 35,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 25,
            showAxisX: true,
            showAxisY: true,
            tickCountX: 3,
            tickCountY: 5,
            tickFormatX: d3.time.format("%b"),
            tickFormatY: d3.format("d"),
            showGridHorizontal: true
        }).render();
    };

    var wamData = [
        {"Date":"2013-01-01","WAM Rank":1},
        {"Date":"2012-12-31","WAM Rank":1},
        {"Date":"2012-11-30","WAM Rank":1},
        {"Date":"2012-10-29","WAM Rank":1},
        {"Date":"2012-09-28","WAM Rank":1},
        {"Date":"2012-08-27","WAM Rank":1},
        {"Date":"2012-07-26","WAM Rank":1},
        {"Date":"2012-06-25","WAM Rank":1},
        {"Date":"2012-05-24","WAM Rank":1},
        {"Date":"2012-04-23","WAM Rank":2},
        {"Date":"2012-03-22","WAM Rank":2},
        {"Date":"2012-02-21","WAM Rank":2},
        {"Date":"2012-01-20","WAM Rank":2},
    ];

    communityChart("#wam-chart", wamData);

    communityChart("#pageviews-chart", []);

    communityChart("#contributions-chart", []);
});
