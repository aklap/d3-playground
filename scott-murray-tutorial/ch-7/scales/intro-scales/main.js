/*
Domains are inputs
Ranges are outputs

'Normalization': the process of mapping a numeric value to a new value
between 0 and 1 based on the possible minimum and maximum values.

Ex: 310th day of the year == 310/365 --> 0.85 ==> .85% --> 85% of 365
days
*/

var w = 500,
    //h = 100,
    h = 300, // svg scales
    padding = 20;

var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

// Now add a new array and see how the circles shift!
dataset.push([650, 150]);

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

var rScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                return d[1];
               })])
               .range([2, 5]);

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
