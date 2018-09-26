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

var xScale = d3.scaleBand() // creates an ordinal scale
               .domain(d3.range(dataset.length))
               .rangeRound([0, w])
               .paddingInner(0.02);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                  return d.value;
               })])
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
      return h - yScale(d.value); // turns bar right side up
   })
   .attr('width', xScale.bandwidth())
   .attr('height', function(d) {
      return yScale(d.value);
   })
   .attr('fill', function(d) {
      return "rgb(0, 0, " + (d.value * 10) + ")";
   })
   .on("mouseover", function(d) {
         d3.select(this)
            .attr("fill", "orange");

         // Set coordinates for a tooltip on mouseover
         var xPosition = parseFloat(d3.select(this).attr('x')) +
         xScale.bandwidth() / 2;
         var yPosition = parseFloat(d3.select(this).attr('y')) + 14;

         svg.append('text')
            .attr('id', 'tooltip')
            .attr('x', xPosition)
            .attr('y', yPosition)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', 'black')
            .text(d.value);
   })
   .on("mouseout", function(d) {
      d3.select(this)
            .transition()
            .duration(250)
         .attr("fill", "rgb(0, 0, " + (d.value * 10) + ")");

      d3.select('#tooltip').remove(); // remove tooltip when mouse
      // moves off bar
   })
   .on("click", function() {
         sortBars();
   });

// Sort bars
var sortOrder = false;

var sortBars = function() {

   sortOrder = !sortOrder; // set order to opposite Boolean value

   svg.selectAll('rect')
      .sort(function(a, b) {
         if(sortOrder === true) {
            return d3.ascending(a.value, b.value);
         } else {
            return d3.descending(a.value, b.value);
         }
      })
      .transition('sortBars')
      .delay(function(d, i) { // per-element delay, nice visually
         return i * 50;
      })
      .duration(1000)
      .attr('x', function(d, i) {
         return xScale(i);
      });

   svg.selectAll('text')
      .sort(function(a, b) {
         if(sortOrder === true) {
            return d3.ascending(a.value, b.value);
         } else {
            return d3.descending(a.value, b.value);
         }
      })
      .transition('sortLabels')
      .delay(function(d, i) { // per-element delay, nice visually
         return i * 50;
      })
      .duration(1000)
      .attr('x', function(d, i) {
         return xScale(i) + xScale.bandwidth() / 2;
      });
};


