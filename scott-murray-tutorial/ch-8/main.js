// Constants
var w = 500,
    h = 300,
    padding = 20;

// Our dataset
var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

// Now add a new array and see how the circles shift!
dataset.push([650, 150]);

// Set scales
// Set x axis to scale of inputs of 0-max data, outputs 0-width of svg
var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d){
                return d[0]; })])
               .range([padding, w - padding * 2]);

// Set y axis to scale of inputs 0-max data 2nd val, outputs 0-height of svg
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                  return d[1];})])
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

// Create svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Scatterplot with hierarchical size
svg.selectAll('circle') // each data point will be a circle
   .data(dataset)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
      return xScale(d[0]); //return _scaled_ value
   })
   .attr('cy', function(d) {
      return yScale(d[1]);
   })
   .attr('r', function(d) {
      return rScale(d[1]);
   });// this fixes the relative sizing of circles

// Add labels
  svg.selectAll('text')
     .data(dataset)
     .enter()
     .append('text')
     .text(function(d) {
        return d[0] + ',' + d[1];
     })
     .attr('x', function(d) {
        return xScale(d[0]);
     })
     .attr('y', function(d) {
        return yScale(d[1]);
     })
     .attr('font-family', 'sans-serif')
     .attr('font-size', '11px')
     .attr('fill', 'red');

// Call the xAxis _function_ on our svg, leaving it last so it appears
// on top of the rest of the elements

// Note: This applies a 'layer' to the SVG; try moving it up and se it
// cover the red numbers
  svg.append('g') // add group element, an invisible element
     .attr('class', 'axis')
     .attr('transform', 'translate(0,' + (h-padding) + ')') // move
     // down by certain number of pixels
     .call(xAxis); // apply a transformation to our svg
