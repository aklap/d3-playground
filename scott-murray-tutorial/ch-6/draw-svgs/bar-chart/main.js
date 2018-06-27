// Note: Original code with divs

var dataset = [5, 10, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18,
17, 16, 18, 23, 25];

// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class', 'bar')
//   .style('height', function(d) {
//     var barHeight = d * 5;
//     return barHeight + 'px';
//   });

// Set dimensions of svg
var w = 500,
    h = 100;

// Create svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', 0)
//    .attr('y', 0)
//    .attr('width', 20)
//    .attr('height', 100);

// svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', function(d, i) {
//       return i * 21;
//    }) // prevents bars from overlapping
//    .attr('y', 0)
//    .attr('width', 20)
//    .attr('height', 100);

// Space bars evenly
// svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', function(d, i) {
//       return i * (w / dataset.length);
//    }) // prevents bars from overlapping -- spaces evenly
//    .attr('y', 0)
//    .attr('width', 20)
//    .attr('height', 100);

// Space bars proportionally
// var barPadding = 1;

//  svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', function(d, i) {
//       return i * (w / dataset.length);
//    }) // prevents bars from overlapping -- spaces evenly
//    .attr('y', 0)
//    .attr('width', w/dataset.length - barPadding) // grow or shrink bar
//    // proportionally
//    .attr('height', function(d){
//       return d * 4;
//    });

// grow bars from bottom of svg: y val is always upper left
// var barPadding = 1;

//  svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', function(d, i) {
//       return i * (w / dataset.length);
//    }) // prevents bars from overlapping -- spaces evenly
//    .attr('y', function(d) {
//       return h - (d * 4); // turns bar right side up
//    })
//    .attr('width', w / dataset.length - barPadding)
//    .attr('height', function(d) {
//       return d * 4;
//    })
//    .attr('fill', 'teal'); // fill with a color

// Encode data values as a color
// var barPadding = 1;

//  svg.selectAll('rect')
//    .data(dataset)
//    .enter()
//    .append('rect')
//    .attr('x', function(d, i) {
//       return i * (w / dataset.length);
//    }) // prevents bars from overlapping -- spaces evenly
//    .attr('y', function(d) {
//       return h - (d * 4); // turns bar right side up
//    })
//    .attr('width', w / dataset.length - barPadding)
//    .attr('height', function(d) {
//       return d * 4;
//    })
//    .attr('fill', function(d) {
//       return "rgb(0, 0, " + Math.round(d * 10) + ")";
//    }); // fill with a color


// Add labels to bars

var barPadding = 1;

 svg.selectAll('rect')
   .data(dataset)
   .enter()
   .append('rect')
   .attr('x', function(d, i) {
      return i * (w / dataset.length);
   }) // prevents bars from overlapping -- spaces evenly
   .attr('y', function(d) {
      return h - (d * 4); // turns bar right side up
   })
   .attr('width', w / dataset.length - barPadding)
   .attr('height', function(d) {
      return d * 4;
   })
   .attr('fill', function(d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
   }); // fill with a color

// svg.selectAll('text')
//    .data(dataset)
//    .enter()
//    .append('text')
//    .text(function(d) {
//       return d;
//    })
//    .attr('x', function(d, i) {
//       return i * (w /dataset.length);
//    })
//    .attr('y', function(d) {
//       return h - (d * 4);
//    });

// Move labels down into bar

svg.selectAll('text')
   .data(dataset)
   .enter()
   .append('text')
   .text(function(d) {
      return d;
   })
   .attr('x', function(d, i) {
      return i * (w /dataset.length) + (w / dataset.length -
                                        barPadding) / 2;
   }) // center in the middle of the bar
   .attr('y', function(d) {
      return h - (d * 4) + 14;
   })
   .attr('font-family', 'sans-serif')
   .attr('font-size', '11px')
   .attr('fill', 'white')
   .attr('text-anchor', 'middle'); // anchor text in middle of bar
