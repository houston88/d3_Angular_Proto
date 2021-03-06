/*jshint -W065 */
'use strict';

angular.module('d3AngularProtoApp')
    .controller('Example2Ctrl', ["$scope", function ($scope) {

        var w = 300,                        // width
        h = 300,                            // height
        r = Math.min(w, h) / 2,             // radius
        color = d3.scale.category20c();     // builtin range of colors

        var data = [{"label":"one", "value":20},
                {"label":"two", "value":50},
                {"label":"three", "value":30}];

        // not used yet...
        //$scope.pieData = [];

        $scope.pieRenderer = function(el) {
            var vis = el.data([data])
                .attr("transform", "translate(" + r + "," + r + ")");   //move the center of the pie chart from 0, 0 to radius, radius

            var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
                .outerRadius(r);

            var pie = d3.layout.pie()           //this will create arc data for us given a list of values
                .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

            var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
                .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
                .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                .append("svg:g")                    //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");            //allow us to style things in the slices (like text)

            arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

            arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                        //set the label's origin to the center of the arc
                    //we have to make sure to set these before calling arc.centroid
                    d.innerRadius = 0;
                    d.outerRadius = r;
                    return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                })
                .attr("text-anchor", "middle")                          //center the text on it's origin
                .text(function(d, i) { return data[i].label; });        //get the label from our original data array
        };





    }]);
