// Define SVG area dimensions
var svgWidth = innerWidth;
var svgHeight = innerHeight;

// Define the chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

console.log(chartWidth)
console.log(chartHeight)

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
var obesity = []
var poverty = []
d3.csv("data.csv").then(function (healthData) {

    // Print the healthData
    console.log(healthData);
    healthData.forEach(function (data) {

        console.log(`State: ${data.abbr}, Obesity: ${data.obesity}, Poverty: ${data.poverty}`)
        obesity.push(+data.obesity)
        poverty.push(+data.poverty)

        console.log(obesity)
    });


    // // Set the domain for the xLinearScale function (min and max of obesity data)
    var xLinearScale = d3.scaleLinear()
        // .range([0, chartWidth])
        // .domain([0, d3.max(obesity)]);
        .range([0, 100])
        .domain([0, 100]);

    console.log("obesity", d3.extent(obesity))

    // // Configure a linear scale with a range between the chartHeight and 0


    // // Set the domain for the yLinearScale function (0 to max of poverty data)
    var yLinearScale = d3.scaleLinear()
        // .domain([0, d3.max(poverty)])
        // .range([chartHeight, 0]);
        .domain([0, 100])
        .range([100, 0]);

    console.log("poverty", d3.max(poverty))

    console.log("xScale", xLinearScale);
    console.log("yScale", yLinearScale);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    console.log(bottomAxis)

    // Draw circles to represent each state
    svg.selectAll("circle")
        .data(healthData) // assign csv data to correspond to each node
        .enter().append("circle")
        .attr("cx", d=> xLinearScale(+d.obesity))
        .attr("cy", d=> yLinearScale(+d.poverty))
        .attr("r", 2.5);

    // var drawLine = d3
    // .line()
    // .x(data => xTimeScale(data.date))
    // .y(data => yLinearScale(data.miles));







    // .enter().append("svg:circle")
    // .attr("class", "little")
    // // arbritrary position of x value corresponding to index of node
    // .attr("cx", function (d, i) {
    //     return (i + 1) * 50;
    // })
    // .attr("cy", 90)
    // // radius = log of population
    // .attr("r", function (d) {
    //     return Math.pow(size(parseInt(d["population"])), 2);
    // })
    // // color = log of GDP
    // .attr("fill", function (d) {
    //     return color(parseInt(d["gdp"]));
    // });
    //     // Draw circles to represent each "node" or country
    //     svg.selectAll("text")
    //         .data(nodes)
    //         .enter().append("svg:text")
    //         .text(function (d) {
    //             return d["name"];
    //         })
    //         .attr("text-anchor", "middle")
    //         .attr("x", function (d, i) {
    //             return (i + 1) * 150;
    //         })
    //         .attr("y", 90)
    // });

})

// Inside function need to loop through each row
// create circle element from
// x = poverty
// y = obesity
// c = smokes
// circle label = state abbr


//d3.csv("data.csv", function (healthData) {


    // // Get min and max smokes to use in color function
    // var smokes_min = d3.min(nodes, function(d){
    // 	return d.smokes;
    // });
    // var smokes_max = d3.max(nodes, function(d){
    //     return parseInt(d["smokes"]);
    // });
    // console.log(smokes_min);
    // console.log(smokes_max);

    // Size and Color will correspond to the log of GDP and Population
//     var size = d3.scale.log();
//     var color = d3.scale.log()
//         .domain([gdp_min, gdp_max])
//         .interpolate(d3.interpolateRgb)
//         .range(["skyblue", "steelblue"]);

//     
//</script>
//</body>
//</html>