// To use a key function and keep track of the values binded to certain
// DOM elements rather than reassign new values to DOM elements on bar
// removal, we need to use objects that have a 'key' property with
// value.

// NOTE: 'key' property here is just the index pos. of the value
var dataset = [
               { key: 0, value: 5 },
               { key: 1, value: 10 },
               { key: 2, value: 13 },
               { key: 3, value: 19 },
               { key: 4, value: 21 },
               { key: 5, value: 25 },
               { key: 6, value: 22 },
               { key: 7, value: 18 },
               { key: 8, value: 15 },
               { key: 9, value: 13 },
               { key: 10, value: 11 },
               { key: 11, value: 12 },
               { key: 12, value: 15 },
               { key: 13, value: 20 },
               { key: 14, value: 18 },
               { key: 15, value: 17 },
               { key: 16, value: 16 },
               { key: 17, value: 18 },
               { key: 18, value: 23 },
               { key: 19, value: 25 }
            ];

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
               .domain([0, d3.max(dataset, function(d) {
                  return d.value;
               })]) // max accepts a callback to access the prop
               // 'value', i.e., an 'accessor function'
               .range([0, h]);

// Define the key function
var key = function(d) {
   return d.key;
}

// Create bars
 svg.selectAll('rect')
   .data(dataset, key)
   .enter()
   .append('rect')
   .attr('x', function(d, i) {
      return xScale(i); //
   }) // prevents bars from overlapping -- spaces evenly
   .attr('y', function(d) {
      return h - yScale(d.value); // turns bar right side up
   })
   .attr('width', xScale.bandwidth())
   .attr('height', function(d) {
      return yScale(d.value);
   })
   .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.round(d.value * 10) + ")";
   }); // fill with a color

// Create labels
svg.selectAll('text')
   .data(dataset, key)
   .enter()
   .append('text')
   .text(function(d) {
      return d.value;
   })
   .attr('x', function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
   }) // center in the middle of the bar
   .attr('y', function(d) {
      return h - yScale(d.value) + 14;
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
      yScale.domain([0, d3.max(dataset, function(d) {
         return d.value;
      })]);

      // Update bars: Necessary to redraw bars to scale, fill svg, and
      // change color of bars.

      var bars = svg.selectAll('rect')
                     .data(dataset, key)
                     .attr('x', function(d, i) {
                        return xScale(i); //
                     })
                     .attr('y', function(d) {
                        return h - yScale(d.value);
                     })
                     .attr('width', xScale.bandwidth())
                     .attr('height', function(d) {
                        return yScale(d.value);
                     })
                     .attr('fill', function(d) { return "rgb(0, 0, " +
                           Math.round(d.value * 10) + ")"; });

      bars.exit()
          .transition()
          .duration(500)
          .attr('x', -xScale.bandwidth()) // this makes the bars shift
          // to the left instead of the right
          .remove();

      // Update labels
      var labels = svg.selectAll('text').data(dataset, key);

      labels.enter()
            .append('text')
            .text(function(d) {
               return d.value;
            })
            .merge(labels)
            .transition()
            .duration(2000)
            .text(function(d) {
               return d.value;
            })
            .attr('x', function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr('y', function(d) {
               return h - yScale(d.value) + 14;
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', 'white')
            .attr('text-anchor', 'middle');

      // Fixes labels stacking on removal of bar.
      labels.exit()
            .transition()
            .duration(500)
            .style('opacity', '0')
            .remove()
   });


