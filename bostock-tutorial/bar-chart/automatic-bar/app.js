var data = [4, 8, 15, 16, 23, 42];

// Remove magic number 10
var x = d3.scaleLinear()
          .domain([0, d3.max(data)]) // inputs 0..42
          .range([0, 420]); // outputs

d3.select('.chart')
  .selectAll('div')
    .data(data) // join an el in data to a bar div
  .enter().append('div')
    // .style('width', function(d) { return d * 10 + 'px'; })
    .style('width', function(d) { return x(d) + 'px'; })
    .text(function(d) { return d; });
