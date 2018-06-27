// var dataset = [5, 10, 15, 20, 25];

// Make dataset messy:
// var dataset = [25, 7, 5, 26, 11];

// Add lots of data points, .data() will expand chart
// var dataset = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29,
// 11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3];

// Random Data
var dataset = [];

for(var i = 0; i < 25; i++) {
  var newNumber = Math.floor(Math.random() * 30);
  dataset.push(newNumber);
}



// Draw column chart:
// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class', 'bar');

// Directly style elements, == inline styling
// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class', 'bar')
//   .style('height', function(d) {
//     return d + 'px';
//   });

// Increase height of bars by a factor of 5
d3.select('body').selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', function(d) {
    var barHeight = d * 5;
    return barHeight + 'px';
  });
