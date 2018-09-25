var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
              11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

// Set dimensions of svg
var w = 600,
    h = 250;

// Create svg
var svg = d3.select('body')
                        .append('svg')
                        .attr('width', w)
                        .attr('height', h);

var xScale = d3.scaleBand() // creates an ordinal scale
               .domain(d3.range(dataset.length))
               .rangeRound([0, w])
               .paddingInner(0.02);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                  return d;
               })])
               .range([0, h]);

// Create bars
 svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .on('click', function(d) {
      console.log(d);
   })
   .attr('x', function(d, i) {
      return xScale(i); //
   }) // prevents bars from overlapping -- spaces evenly
   .attr('y', function(d) {
      return h - yScale(d); // turns bar right side up
   })
   .attr('width', xScale.bandwidth())
   .attr('height', function(d) {
      return yScale(d);
   })
   .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
   }); // fill with a color

// Create labels
svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) {
      return d;
   })
   .attr('x', function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
   }) // center in the middle of the bar
   .attr('y', function(d) {
      return h - yScale(d) + 14;
   })
   .attr('font-family', 'sans-serif')
   .attr('font-size', '11px')
   .attr('fill', 'white')
   .attr('text-anchor', 'middle'); // anchor text in middle of bar

