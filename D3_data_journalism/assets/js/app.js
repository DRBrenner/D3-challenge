// Define SVG area dimensions
var svgWidth = innerWidth;
var svgHeight = innerHeight;

// Define the chart's margins as an object
var margin = {
    top: 60,
    right: 260,
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
    });


    // // Set the domain for the xLinearScale function (min and max of obesity data +/-3)
    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([d3.extent(obesity)[0] - 3, d3.extent(obesity)[1] + 3]);

    // // Configure a linear scale with a range between the chartHeight and 0
    // // Set the domain for the yLinearScale function (min and max of poverty data +/-3)
    var yLinearScale = d3.scaleLinear()
        .domain([d3.extent(poverty)[0] - 3, d3.extent(poverty)[1] + 3])
        .range([chartHeight, 0]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // Draw circles to represent each state
    svg.selectAll("circle")
        .data(healthData) // assign csv data to correspond to each node
        .enter().append("circle")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("cx", d => xLinearScale(+d.obesity))
        .attr("cy", d => yLinearScale(+d.poverty))
        .attr("r", 15)
        .attr("fill", "blue")
        .attr("stroke", "black")
        .style("stroke-width", 2)
        .attr("opacity", ".4");

    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    //Create y axis label
    chartGroup.append("g")
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("transform", "translate(200, 925)")
        .attr("y", -40)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Poverty");

    //Create x axis label    
    chartGroup.append("g")
        .append("text")
        .attr("fill", "black")
        .attr("transform", "translate(530, 525)")
        .text("Obesity")
        ;

    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);

    // Appending a label to each data circle
    chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
        .attr("x", function (data) {
            return xLinearScale(data.obesity - 0);
        })
        .attr("y", function (data) {
            return yLinearScale(data.poverty - 0.2);
        })
        .text(function (data) {
            return data.abbr
        });
})
