var map_svg, paths;
var height_map = 750, width_map = 750;
var onState = 'Ohio';

function drawMapCircle(casesByState, dataset) {

    // // Draw Bar & Pie charts with a default state
    // update_barChart(getMonCasesByState(onState));
    // update_pieChart(getMonCasesByState(onState));

    d3.json("./data/usa_mainland.json", drawUSA);

    function drawUSA(error, states) {

        // Draw US map
        var projection = d3.geoEquirectangular()
            .fitExtent([[0, 0], [width_map, height_map]], states);

        var geoGenerator = d3.geoPath()
            .projection(projection);

        map_svg = d3.select('#map_svg')
            .append('svg')
            .attr('width', width_map)
            .attr('height', height_map);

        paths = map_svg.selectAll('path')
            .data(states.features).enter()
            .append('path')
            .attr('d', geoGenerator)
            .style('fill', '#ddd')
            .style('stroke', '#aaa');

        var texts = map_svg.selectAll('text')
            .data(states.features).enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .attr('opacity', 0.5)
            .text(function (d) { return d.properties.STUSPS10; })
            .attr('transform', function (d) {
                var center = geoGenerator.centroid(d);
                return 'translate (' + center + ')';
            });

        function get_radius(state) {
            var num = 0;
            for (const row of casesByState) {
                if (row.state == state) {
                    num = row.cases;
                }
            }
            return num / 1500000;
        }

        // Draw circles on Map
        map_svg.selectAll('circle')
            .data(states.features).enter()
            .append('circle')
            .attr('cx', function (d) {
                var center = geoGenerator.centroid(d);
                return center[0];
            })
            .attr('cy', function (d) {
                var center = geoGenerator.centroid(d);
                return center[1];
            })
            .attr('id', function (d) {
                var state = d.properties.NAME10;
                // state = abbrState(state, 'name');
                return state;
            })
            .attr('r', function (d) {
                var state = d.properties.NAME10;
                // state = abbrState(state, 'name');
                return get_radius(state);
            })
            .attr('fill', 'steelblue')
            .attr('opacity', '0.55')        
            .on("click", function(d) {
                var state = d.properties.NAME10
                // store the selected state name
                selected_state = state;
                // change the highlighting product names
                update_state(dataset);
            });

    }

    // function getMonCasesByState(state) {
    //     var monthlyData = [];
    //     for (const row of casesByMonth) {
    //         if (row['state'] == state) {
    //             monthlyData.push(row)
    //         }
    //     }
    //     return monthlyData;
    // }

    // function selectOnState() {
    //     onState = this['id'];
    //     d3.select('[id="' + onState + '"]')
    //         .style('fill', 'orange');

    //     d3.select('#bar_svg')
    //         .select('svg')
    //         .remove();
    //     update_barChart(getMonCasesByState(onState));

    //     d3.select('#pie_svg')
    //         .select('svg')
    //         .remove();
    //     update_pieChart(getMonCasesByState(onState));

    // }

    // function handleMouseOut() {
    //     d3.select('[id="' + (this['id']) + '"]')
    //         .style('fill', 'steelblue');
    // }

}
