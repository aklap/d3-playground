var w = 500,
    h = 50;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var dataset = [5, 10, 15, 20, 25];

var circles = svg.selectAll('circle') //don't exist yet
   .data(dataset) // iterate over dataset
   .enter() // bind elements that don't exist to data pt
   .append('circle'); // append the circle w/data to svg

// Note: The callback below function like a for loop. The variable is
// equivalent to i in a for loop and stands for the current index value
// of the current element.

circles.attr('cx', function(d, i) { // can't get i w/o d
  return (i * 50)  + 25; // multiple the index by 50 and +25
})
        .attr('cy', h/2)
        .attr('r', function(d) {
          return d;
        })
        .attr('fill', 'yellow')
        .attr('stroke', 'orange')
        .attr('stroke-width', function(d) {
          return d/2;
        });



