// Each object is a stack of bars, i.e. a column
var dataset = [
                { apples: 5, oranges: 10, grapes: 22 },
                { apples: 4, oranges: 12, grapes: 28 },
                { apples: 2, oranges: 19, grapes: 32 },
                { apples: 7, oranges: 23, grapes: 35 },
                { apples: 23, oranges: 17, grapes: 43 }
              ];

var colors = d3.scaleOrdinal(d3.schemeCategory10);
var w = 500,
    h = 300;
// Create SVG
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Define scales
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length)) // let d3 populate
               .range([0, w])
               .paddingInner(0.05);

var yScale = d3.scaleLinear()
               .domain([0,
                       d3.max(dataset, function(d) {
                        return d.apples + d.oranges + d.grapes; //
                        // whatever is the tallest bar
                       })
                      ])
                      .range([h, 0]);

// NOTE: the data set is columns, the chart is categories.

// Set up stack method
var stack = d3.stack()
              .keys(['apples', 'oranges', 'grapes'])
              .order(d3.stackOrderDescending);

// Stacked data
var series = stack(dataset);

// Add a group for each row of data
var groups = svg.selectAll('g')
                .data(series)
                .enter()
                .append('g')
                .style('fill', function(d, i) {
                  return colors(i);
                });

// Add a rect for each data value
var rects = groups.selectAll('rect')
                  .data(function(d) {
                    return d;
                  })
                  .enter()
                  .append('rect')
                  .attr('x', function(d, i) {
                    return xScale(i); // however many stacked bars
                    // there are
                  })
                  .attr('y', function(d) {
                    return yScale(d[1]); // topline val
                  })
                  .attr('height', function(d) {
                    return  yScale(d[0]) - yScale(d[1]); // diff
                  // top line and baseline vals
                  })
                  .attr('width', xScale.bandwidth());