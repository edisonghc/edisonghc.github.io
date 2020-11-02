var bar_svg;

function draw_barChart(state_data) {

    // Set up: margins
    var margin = { top: 0, right: 20, bottom: 135, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    var xScale = d3.scaleBand()
        .domain(state_data.map(function (d) { return d['month']; }))
        .range([0, width])
        .padding(0.065);

    var yScale = d3.scaleLinear()
        .domain([0,
            d3.max(state_data, function (d) {
                return d.cases;
            })]
        )
        .rangeRound([height, 0]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    // Create as svg canvas
    // bar_svg = d3.select("#bar_svg").append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g").enter()
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    bar_svg = d3.select('#bar_svg').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // append x axis
    bar_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.6em")
        .attr("transform", "rotate(-80)");

    // append y axis
    bar_svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(yAxis)
        .append("text");

    // Create rect bars
    bar_svg.selectAll()
        .data(state_data)
        .enter().append("rect")
        .attr("id", function (d, i) { return d['month']; })
        .style("fill", "steelblue")
        .attr("x", function (d) { return xScale(d['month']); })
        .attr("width", xScale.bandwidth())
        .attr("y", function (d) { return yScale(d['cases']); })
        .attr("height", function (d) { return height - yScale(d['cases']) });
}

// Update for the selected state
function update_barChart(state_data) {
    d3.select('#bar_svg')
        .select('svg')
        .remove();
    draw_barChart(state_data);
}
