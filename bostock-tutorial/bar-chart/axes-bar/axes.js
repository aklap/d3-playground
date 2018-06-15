var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand() // this replaces deprecated .rangeBands()
          .range([0, width])
          .round(true) // otherwise the width of ea. bar is a float
          .padding(.1); // add space around ea. bar

var y = d3.scaleLinear()
          .range([height, 0]);

// d3.axisBottom(scale): Constructs a new bottom-oriented axis
// generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3. In this orientation, ticks are drawn below the horizontal domain path.

var xAxis = d3.axisBottom(x);

// d3.axisLeft(scale): Constructs a new left-oriented axis generator
// for the given scale, with empty tick arguments, a tick size of 6 and padding of 3. In this orientation, ticks are drawn to the left of the vertical domain path.

var yAxis = d3.axisLeft(y)
              .ticks(10, '%'); // this changes the numbers from floats
              // to percentages with % delim

var chart = d3.select('svg') // select the svg element in HTML
            .attr('width', width + margin.left + margin.right) // set
            // width
            .attr('height', height + margin.top + margin.bottom) // set
            // height
            .append('g') // create a g element within the svg element
            .attr('transform', 'translate(' + margin.left + ',' +
                  margin.top + ')'); // position the g element

d3.tsv('data.tsv', type, function(error, data) {
  // error handling
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; })); // inputs
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
 // outputs

 // Create an x axis
  chart.append('g')
       .attr('class', 'x axis')
       .attr('transform', 'translate(0,' + height + ')')
       .call(xAxis);

  // Create a y axis
  chart.append('g')
       .attr('class', 'y axis')
       .call(yAxis)
       .append('text') // From here down: Adding label to axis
       .attr('transform', 'rotate(-90)')
       .attr('y', 6)
       .attr('dy', '.71em')
       .style('text-anchor', 'start')
       .text('Frequency'); // Note: this never displays! tutorial bug

  // Create bars
  chart.selectAll('.bar')
       .data(data)
       .enter().append('rect')
       .attr('class', 'bar')
       .attr('x', function(d) { return x(d.letter); })
       .attr('width',  x.bandwidth()) // replaces ordinal.rangeBand()
       // and returns the width of each band which is always the same
       // in this chart
       .attr('y', function(d) { return y(d.frequency); })
       .attr('height', function(d) { return height - y(d.frequency); });
});

// Helper function, coerce to int
function type(d) {
  d.frequency = +d.frequency;
  return d;
}
