var data = [4, 8, 15, 16, 23, 42]; // our data
// Set dimensions our chart
var width = 420,
    barHeight = 20;

var x = d3.scaleLinear()
          .domain([0, d3.max(data)]) // inputs
          .range([0, width]); // outputs

// Select and set chart attributes
var chart = d3.select('.chart')
              .attr('width', width)
              .attr('height', barHeight * data.length);

// Create bars in chart svg, needs a g and rect for ea bar
var bar = chart.selectAll('g')
    .data(data) // join data to bar
  .enter().append('g')
    .attr('transform', function(d, i) { return 'translate(0,' + i *
          barHeight + ')'; });

bar.append('rect')
   .attr('width', x)
   .attr('height', barHeight - 1);

bar.append('text')
.attr('x', function(d) { return x(d) - 3; })
.attr('y', barHeight / 2)
.attr('dy', '.35em')
.text(function(d) { return d; });