// Width and height
var w = 800,
    h = 300,
    padding = 40;

var dataset, xScale, yScale, line;

// Parse each row and format
var rowConverter = function(d) {
  return {
    date: new Date(+d.year, (+d.month - 1)), // +d forces values to be
    // typed as numbers not strings; -1 to adjust for zero starting value
    average: parseFloat(d.average)
  }
}

d3.csv("co2_mm_mlo-txt_edited.csv", rowConverter, function(data) {
  var dataset = data;

  console.table(dataset, ["date", "average"]);
});

// Set scales

xScale =  d3.scaleTime()
            .domain([
                    d3.min(dataset, function(d) { return d.date; }),
                    d3.max(dataset, function(d) { return d.date; })
                    ])
            .range([0, w]);

yScale = d3.scaleLinear()
           .domain([0, d3.max(dataset, function(d) { return
            d.average })])
           .range([h, 0]); // invert to display properly

// Define line generator
var line = d3.line()
             .x(function(d) { return xScale(d.date); })
             .y(function(d) { return yScale(d.average); });

// Create SVG
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);
