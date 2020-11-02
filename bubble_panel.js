var bubble_svg;

function draw_bubbleChart(casesByState, dataset) {

    // Set up: margins
    // var margin = { top: 10, right: 20, bottom: 135, left: 60 },
    //     width = 600 - margin.left - margin.right,
    //     height = 400 - margin.top - margin.bottom;

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

    var hier_data = { "children": [] };
    for (const obj of casesByState) {
        hier_data["children"].push(obj);
    }
    console.log(hier_data);

    var diameter = 400;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var bubble = d3.pack(hier_data)
        .size([diameter, diameter])
        .padding(1.5);

    svg_bubble = d3.select("#bubble_svg")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(hier_data)
        .sum(function (d) { return d.cases; });

    console.log(bubble(nodes).descendants());

    var node = svg_bubble.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children
        }) // filter out the outer bubble
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // node.append("title")
    //     .text(function (d) {
    //         return d.state + ": " + d.Count;
    //     });



    node.append("circle")
        .attr("r", function (d) { return d.r; })
        .style("fill", function (d, i) { return color(i); })
        .on("click", function(d) {
            // store the selected state name
            selected_state = d.data.state;
            // change the highlighting product names
            update_state(dataset);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            // console.log(d)
            return d.data["state"];
        })
        .attr("font-size", function (d) {
            return d.r / 3;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.cases;
        })
        .attr("font-size", function (d) {
            return d.r / 4;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");








    //     // append x axis
    //     bar_svg.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0," + height + ")")
    //         .call(xAxis)
    //         .selectAll("text")
    //         .style("text-anchor", "end")
    //         .attr("dx", "-.8em")
    //         .attr("dy", "-.6em")
    //         .attr("transform", "rotate(-80)");

    //     // append y axis
    //     bar_svg.append("g")
    //         .attr("class", "y axis")
    //         .attr("transform", "translate(0," + 0 + ")")
    //         .call(yAxis)
    //         .append("text");

    //     // Create rect bars
    //     bar_svg.selectAll()
    //         .data(state_data)
    //         .enter().append("rect")
    //         .attr("id", function (d, i) { return d['month']; })
    //         .style("fill", "steelblue")
    //         .attr("x", function (d) { return xScale(d['month']); })
    //         .attr("width", xScale.bandwidth())
    //         .attr("y", function (d) { return yScale(d['cases']); })
    //         .attr("height", function (d) { return height - yScale(d['cases']) });
    // }

    // Update for the selected state
    // function update_barChart(selected_state) {
    //     draw_barChart(dataset, selected_state);
    // 
}
