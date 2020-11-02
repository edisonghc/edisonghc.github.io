

// Initialize global variables
var selected_state = 'Ohio'; // default state
var data_url = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var states = [];
var state_data, total_cases_by_state;

// Helper function
function unique(array) {
    return array.filter(function (a) {
        return !this[a] ? this[a] = true : false;
    }, {});
}

// Load the csv file
d3.csv(data_url, load_csvdata);

function load_csvdata(error, dataset) {

    // console.log(dataset);

    // Subset data based on default selection
    state_data = subset_data(dataset, selected_state)
    
    // Calculate monthly sums
    state_data = monthly_sum(state_data)

    // Get a list of all states
    for (var i = 0; i < dataset.length; i++) {
        states.push(dataset[i]['state']);
        // names.push(dataset[i]['Name']);
    }
    states = unique(states)
    //console.log(states);

    console.log(state_data);
    // Draw bar chart
    draw_barChart(state_data);
  

    // Draw pie chart
    draw_pieChart(state_data);

    total_cases_by_state = d3.nest()
    .key(function (d) { return d.state; })
    .rollup(function (v) {
        return {
            cases: d3.sum(v, function (d) { return d.cases; }),
            // deaths: d3.sum(v, function (d) { return d.deaths; })
        };
    })
    .entries(dataset);
    
    var formatted = [];
    for (var i = 0; i < total_cases_by_state.length; i++) {
        var temp = new Object;
        temp['state'] = total_cases_by_state[i].key;
        temp['cases'] = total_cases_by_state[i].value.cases;
        formatted.push(temp);
    }

    total_cases_by_state = formatted;


    total_cases_by_state = total_cases_by_state.slice().sort((a, b) => d3.ascending(a['state'], b['state']))

    console.log(total_cases_by_state);

    // Draw Map
    drawMapCircle(total_cases_by_state, dataset);

    // Draw bubble chart
    draw_bubbleChart(total_cases_by_state, dataset);

    // Draw Table
    draw_table(total_cases_by_state, dataset);

}

// Subset the dataset by the selected_state
function subset_data(dataset, selected_state) {

    var subset;

    subset = dataset.filter(entry => entry.state == selected_state)

    return subset;
}

// Compute the monthly totals
function monthly_sum(state_data) {
    var mapDayToMonth = state_data.map(x => ({ ...x, date: new Date(x.date).getMonth() }));

    var sum_by_state = d3.nest()
        .key(function (d) { return d.date; })
        .rollup(function (v) {
            return {
                // state: v.state,
                // fips: v.fips,
                cases: d3.sum(v, function (d) { return d.cases; }),
                // deaths: d3.sum(v, function (d) { return d.deaths; })
            };
        })
        .entries(mapDayToMonth);
    sum_by_state = sum_by_state.slice().sort((a, b) => d3.ascending(a['month'], b['month']))

    var rs = [];
    for (var i = 0; i < sum_by_state.length; i++) {
        var temp = new Object;
        temp['month'] = month[sum_by_state[i].key];
        temp['cases'] = sum_by_state[i].value.cases;
        rs.push(temp);
    }

    //console.log(rs);
    return rs;
}

function update_state(dataset) {
        // Subset data based on default selection
        state_data = subset_data(dataset, selected_state)
    
        // Calculate monthly sums
        state_data = monthly_sum(state_data)
               
        update_barChart(state_data);
             
        // Draw pie chart
        update_pieChart(state_data);
}