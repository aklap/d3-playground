var w = 500,
    h = 100;

var dataset = [
                [5, 20],
                [480, 90],
                [250, 50],
                [100, 33],
                [330, 95],
                [410, 12],
                [475, 44],
                [25, 67],
                [85, 21],
                [220, 88]
              ]; // treat these as sets of coordinates

// Create svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Make a scatterplot
// svg.selectAll('circle') // each data point will be a circle
//    .data(dataset)
//    .enter()
//    .append('circle')
//    .attr('cx', function(d) {
//       return d[0]; // take the first val as x
//    })
//    .attr('cy', function(d) {
//       return d[1]; // take second val as y
//    })
//    .attr('r', 5); // set a uniform radius

/*
Note: Size; for circles, encode values as _area_, and not radius.

Formula for area: A = pi*r^2

There is no area attribute for SVG circles, so we need to 1) find
the area 2) use that to find the radius.

So: r = sqrt(A/pi)
*/

// Scatterplot with hierarchical size

svg.selectAll('circle') // each data point will be a circle
   .data(dataset)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
      return d[0]; // take the first val as x
   })
   .attr('cy', function(d) {
      return d[1]; // take second val as y
   })
   // .attr('r', function(d) {
   //    return Math.sqrt((h - d[1]) / Math.PI);
   // });// subtracting the val from height will make some circles appear
   // // larger than others

   .attr('r', function(d) {
      return Math.sqrt((h - d[1]));
   }); //NOTE: We can omit the pi here since we do not care
 // about the _actual_ area of the circle, we only care about the _relative_ area between circles

// Add labels
  svg.selectAll('text')
     .data(dataset)
     .enter()
     .append('text')
     .text(function(d) {
        return d[0] + ',' + d[1];
     })
     .attr('x', function(d) {
        return d[0];
     })
     .attr('y', function(d) {
        return d[1];
     })
     .attr('font-family', 'sans-serif')
     .attr('font-size', '11px')
     .attr('fill', 'red');


