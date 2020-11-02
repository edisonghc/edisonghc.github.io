var table_svg;
var columnNames = ['state','cases']
var onState = 'Ohio';

function draw_table(casesByState, dataset) {
    table_svg = d3.select('#space_svg').append('svg')
    .attr("width", 500)
    .attr("height", 50)

    var table = d3.select("#table_svg").append('table');
    var thead = table.append('thead');
    var	tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(columnNames)
      .enter()
      .append('th')
      .text(function (d) { 
          return d; 
      });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
      .data(casesByState)
      .enter()
      .append('tr')
      .on("click", function(d) {
        // store the selected state name
        selected_state = d.state;
        // change the highlighting product names
        update_state(dataset);
    });

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (row) {
        return columnNames.map(function (columnName) {
          return {
              key: columnName, 
              value: row[columnName]
          };
        });
      })
      .enter()
      .append('td')
      .text(function (d) { 
          return d.value; 
      });

  return table;
}

// function drawMapCircle(casesByState) {

//     // // Draw Bar & Pie charts with a default state
//     // update_barChart(getMonCasesByState(onState));
//     // update_pieChart(getMonCasesByState(onState));

//     d3.json("./data/usa_mainland.json", drawUSA);

//     function drawUSA(error, states) {

//         // Draw US map
//         var projection = d3.geoEquirectangular()
//             .fitExtent([[0, 0], [width_map, height_map]], states);

//         var geoGenerator = d3.geoPath()
//             .projection(projection);

//         map_svg = d3.select('#map_svg')
//             .append('svg')
//             .attr('width', width_map)
//             .attr('height', height_map);

//         paths = map_svg.selectAll('path')
//             .data(states.features).enter()
//             .append('path')
//             .attr('d', geoGenerator)
//             .style('fill', '#ddd')
//             .style('stroke', '#aaa');

//         var texts = map_svg.selectAll('text')
//             .data(states.features).enter()
//             .append('text')
//             .attr('text-anchor', 'middle')
//             .attr('alignment-baseline', 'middle')
//             .attr('opacity', 0.5)
//             .text(function (d) { return d.properties.STUSPS10; })
//             .attr('transform', function (d) {
//                 var center = geoGenerator.centroid(d);
//                 return 'translate (' + center + ')';
//             });

//         function get_radius(state) {
//             var num = 0;
//             for (const row of casesByState) {
//                 if (row.state == state) {
//                     num = row.cases;
//                 }
//             }
//             return num / 1500000;
//         }

//         // Draw circles on Map
//         map_svg.selectAll('circle')
//             .data(states.features).enter()
//             .append('circle')
//             .attr('cx', function (d) {
//                 var center = geoGenerator.centroid(d);
//                 return center[0];
//             })
//             .attr('cy', function (d) {
//                 var center = geoGenerator.centroid(d);
//                 return center[1];
//             })
//             .attr('id', function (d) {
//                 var state = d.properties.NAME10;
//                 // state = abbrState(state, 'name');
//                 return state;
//             })
//             .attr('r', function (d) {
//                 var state = d.properties.NAME10;
//                 // state = abbrState(state, 'name');
//                 return get_radius(state);
//             })
//             .attr('fill', 'steelblue')
//             .attr('opacity', '0.55');
//             // .on('mouseover', selectOnState)
//             // .on('mouseout', handleMouseOut);

//     }

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

