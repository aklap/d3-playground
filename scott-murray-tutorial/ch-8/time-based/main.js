// Constants
var w = 500,
    h = 300,
    padding = 30;

// set global var for parsed data
var dataset, xScale, yScale;

// alias the d3 method and set up delimiters
var parseTime = d3.timeParse("%m/%d/%Y");

// Convert date type to string; we need this for labels
var formatTime = d3.timeFormat('%b %e');

// helper function for parsing CSV
var rowConverter = function(d) {
  return {
    Date: parseTime(d.Date),
    Amount: parseInt(d.Amount)
  }
}

// parse the CSV and use the above callback to change data type
d3.csv('./time_scale_data.csv', rowConverter, function(err, data) {
  if(err) {
    console.log(err);
  }

  dataset = data;
// Set scales
// Define a time scale with parsed data
  xScale = d3.scaleTime()
                         .domain([
                                d3.min(dataset, function(d) { return d.Date; }),
                                d3.max(dataset, function(d) { return d.Date; })
                         ])
                         .range([padding, w - padding * 2]);

  // NOTE: we use _linear_ scale below not time scale
  yScale = d3.scaleLinear()
                           .domain([
                                  d3.min(dataset, function(d) { return d.Amount; }),
                                  d3.max(dataset, function(d) { return d.Amount; })
                           ])
                           .range([h - padding, padding]);
// Change this to a sqrt scale tp take advantage of the D3's ability to
// set up a domain and a range
var rScale = d3.scaleSqrt()
               .domain([0, d3.max(dataset, function(d) {
                return d[1];
               })])
               .range([0, 10]);

// Create axes and pass in scale as argument
var xAxis = d3.axisBottom(xScale)
              .ticks(5); // suggest minimum of ticks
              // .tickValues([0, 100, 250, 600]); // set ticks manually, D3 won't override

var yAxis = d3.axisLeft(yScale)
              .ticks(5);

// Create svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

/// Define a time scale with parsed data
  xScale = d3.scaleTime()
                         .domain([
                                d3.min(dataset, function(d) { return d.Date; }),
                                d3.max(dataset, function(d) { return d.Date; })
                         ])
                         .range([padding, w - padding * 2]);

  // NOTE: we use _linear_ scale below not time scale
  yScale = d3.scaleLinear()
                           .domain([
                                  d3.min(dataset, function(d) { return d.Amount; }),
                                  d3.max(dataset, function(d) { return d.Amount; })
                           ])
                           .range([h - padding, padding]);

  // Create SVG
  var svg = d3.select('body')
                            .append('svg')
                            .attr('width', w)
                            .attr('height', h);

  // Create labels
  svg.selectAll('text')
     .data(dataset)
     .enter()
     .append('text')
     .text(function(d) {
        return formatTime(d.Date);
     })
     .attr('x', function(d) {
        return xScale(d.Date) + 4;
     })
     .attr('y', function(d) {
        return yScale(d.Amount) + 4;
     })
     .attr('font-family', 'sans-serif')
     .attr('font-size', '11px')
     .attr('fill', '#bbb');

  // Create circles
  svg.selectAll('circle')
     .data(dataset)
     .enter()
     .append('circle')
     .attr('cx', function(d) {
        return xScale(d.Date);
     })
     .attr('cy', function(d) {
        return yScale(d.Amount);
     })
     .attr('r', 2);

  // Add x axis
  svg.append('g') // add group element, an invisible element
     .attr('class', 'axis')
     .attr('transform', 'translate(0,' + (h - padding) + ')') // move
     // down by certain number of pixels
     .call(xAxis); // apply a transformation to our svg

  // Add y axis
  svg.append('g')
     .attr('class', 'axis')
     .attr('transform', 'translate(' + padding + ',0)')
     .call(yAxis);
});
