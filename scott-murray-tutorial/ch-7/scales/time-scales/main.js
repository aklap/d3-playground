// Set up time scale

// NOTE: The book shows a chart as a final result but the code doesn't
// match.

var w = 500,
    h = 300,
    padding = 20;

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
});


