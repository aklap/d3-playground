// Set dimensions our chart
var width = 420,
    barHeight = 20;

var x = d3.scaleLinear()
          .range([0, width]); // outputs

// Select and set chart attributes
var chart = d3.select('.chart')
              .attr('width', width)

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
.text(function(d) { return d; });// Set dimensions our chart
var width = 420,
    barHeight = 20;

var x = d3.scaleLinear()
          .range([0, width]); // outputs, no inputs yet bc we don't
          // know how many we have

// Select and set chart attributes
var chart = d3.select('.chart')
              .attr('width', width) // no height, we don't know how
              // many elements are in our dataset

// Create bars in chart svg, needs a g and rect for ea bar
d3.tsv('http://localhost:8080/bar-chart/axes-bar/data.tsv', type,
       function(err, data) {

  if (err) { return err; } // error handling

  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.attr('height', barHeight * data.length);

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
});

// Helper function
function type(d) {
  d.value = +d.value; //coerce to integer
  return d;
}