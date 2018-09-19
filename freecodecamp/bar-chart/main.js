var dataset,
    h = 460,
    padding = 20,
    url ='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
    w = 900,
    xScale,
    yScale;

// Append an SVG for our bar chart
const svg = d3.select('body')
              .append('svg')
              .attr('width', 900)
              .attr('height', 460);

// Define x axis - get min max, set scale
var parseTime = d3.timeParse("%Y-%m-%d");

// Fetch data for dataset as json with key-value of year and GDP in
// billions of USD $
d3.json(url, function(err, data) {
  if(err) { // error handling
    console.log(err);
  }

  return JSON.parse(res); // Turn JSON from string into JS object
}).then(function(res) {
  dataset = res.data;

 // Set scales
  xScale = d3.scaleTime().domain([
                                  d3.min(dataset, function(d) {
                                   return parseTime(d[0]);
                                  }),
                                  d3.max(dataset, function(d) {
                                   return parseTime(d[0]);
                                  })
                                 ])
                                 .range([padding, w + padding]);

  yScale = d3.scaleTime().domain([
                              d3.min(dataset, function(d) {
                               return parseInt(d[1]);
                              }),
                              d3.max(dataset, function(d) {
                                return parseInt(d[1]);
                              })
                              ]).range([padding, h - padding * 2]);
  // Build basic bar chart, scaled
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return i * ((w - padding) / dataset.length) + padding;
    })
    .attr('y', function(d) {
      return h - (yScale(d[1]) + padding); // change to + padding
    })
    .attr('width', w / dataset.length - 1)
    .attr('height', function(d) {
      return yScale(d[1]);
    })
    .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.round(d[1] * 10) + ")";
    });

    // Create axes
    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale);

    svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate(-' + padding * 2  + ', ' + (h - padding) + ')')
       .attr('id', 'x-axis')
       .call(xAxis);

    svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate('+  padding + ',0)')
       .call(yAxis);

    // Add a title
    d3.select('body')
        .append('h1')
        .attr('id', 'title')
        .text(res.name);

});
