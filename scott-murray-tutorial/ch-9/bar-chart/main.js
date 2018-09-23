var dataset = [5, 10, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18,
               17, 16, 18, 23, 25];

// Set dimensions of svg
var w = 600,
    h = 250;

// Create svg
var svg = d3.select('body')
                        .append('svg')
                        .attr('width', w)
                        .attr('height', h);

 // Creates an ordinal scale. Note: Ordinal scales have some kind of
 // order, can be numeric, but typically are not. They also have a
 // discrete, or finite, range of outputs unlike a linear scale
 // which is continuous.

 // Here, we want to get the index of ea item in dataset. Then we'll
 // map each data point's position in the dataset to a part of the bar
 // chart, which we divided into even 'bands'.
var xScale = d3.scaleBand() // creates an ordinal scale
               .domain(d3.range(dataset.length)) // generates an array
               // for us from 0 until dataset's length as inputs
               .rangeRound([0, w]) // output will be the width of the
               // chart
               .paddingInner(0.02); // put some space between the bars;
               // arg is a %

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, h]);

// Create bars
 svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
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

// Interaction via Event Listeners

d3.select('p')
   .on('click', function() {
      dataset.shift();

      // Update scales with new dataset
      xScale.domain(d3.range(dataset.length));
      yScale.domain([0, d3.max(dataset)]);

      // Update bars
      var bars = svg.selectAll('rect')
                     .data(dataset);

      bars.exit()
          .transition()
          .duration(500)
          .style('opacity', '0') // Make bar disappearance a little
          // nicer
          .remove();

      // Update labels
      var labels = svg.selectAll('text').data(dataset);

      labels.enter()
            .append('text')
            .text(function(d) {
               return d;
            })
            .merge(labels)
            .transition()
            .duration(2000)
            .text(function(d) {
               return d;
            })
            .attr('x', function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr('y', function(d) {
               return h - yScale(d) + 14;
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', 'white')
            .attr('text-anchor', 'middle');
   });


