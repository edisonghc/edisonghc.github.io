var pie_svg;

function draw_pieChart(state_data) {

    // Set up: margins
    var margin = { top: 10, right: 20, bottom: 135, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var xScale = d3.scaleBand()
    //     .domain(state_data.map(function (d) { return d['month']; }))
    //     .range([0, width])
    //     .padding(0.065);

    // var yScale = d3.scaleLinear()
    //     .domain([0,
    //         d3.max(state_data, function (d) {
    //             return d.cases;
    //         })]
    //     )
    //     .rangeRound([height, 0]);

    // var xAxis = d3.axisBottom().scale(xScale);
    // var yAxis = d3.axisLeft().scale(yScale);

    // Create as svg canvas
    // bar_svg = d3.select("#bar_svg").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g").enter()
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    pie_svg = d3.select('#pie_svg').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 300 + "," + 180 + ")");


    // append x axis
    // bar_svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis)
    //     .selectAll("text")
    //     .style("text-anchor", "end")
    //     .attr("dx", "-.8em")
    //     .attr("dy", "-.6em")
    //     .attr("transform", "rotate(-80)");

    // // append y axis
    // bar_svg.append("g")
    //     .attr("class", "y axis")
    //     .attr("transform", "translate(0," + 0 + ")")
    //     .call(yAxis)
    //     .append("text");


    var pieGenerator = d3.pie()
        .value(function (d) {
            return d.cases;
        });

    var arcData = pieGenerator(state_data);
    var color = d3.scaleOrdinal(d3.schemeCategory10)
    //console.log(arcData);


    var arcGenerator = d3.arc()
        .innerRadius(60)
        .outerRadius(160);


    pie_svg.selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr("id", function (d, i) { return d.data.month })
        .attr('d', arcGenerator)
        .attr("fill", function (d, i) { return color(i); });


    // Labels
    pie_svg.append('g').selectAll('text')
        .data(arcData)
        .enter()
        .append('text')
        .each(function (d) {
            var centroid = arcGenerator.centroid(d);
            d3.select(this)
                .attr('x', centroid[0])
                .attr('y', centroid[1])
                .attr('dy', '0.2em')
                .text(d.data.month);
        })
        .attr('fill', 'white')
        .attr('text-anchor', 'middle');

    pie_svg.append('g').selectAll('text')
        .data(arcData)
        .enter()
        .append('text')
        .each(function (d) {
            var centroid = arcGenerator.centroid(d);
            d3.select(this)
                .attr('x', centroid[0])
                .attr('y', centroid[1])
                .attr('dy', '1.2em')
                .text(d.data.cases);
        })
        .attr('fill', 'white')
        .attr('text-anchor', 'middle');
    
    pie_svg.append('g')

        .append('text')
        .text(selected_state)
        .style("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("font-size", 20)
        .attr('fill', 'black');
}

// Update for the selected state
function update_pieChart(state_data) {
    d3.select('#pie_svg')
        .select('svg')
        .remove();
    draw_pieChart(state_data);
}
