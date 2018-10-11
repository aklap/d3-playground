var w = 500,
    h = 300;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var projection = d3.geoAlbersUsa()
                   .translate([w/2, h/2])
                   .scale([2000]);

var path = d3.geoPath()
             .projection(projection);

// Set output as range of colors, adapted from Cynthia Brewer
var color = d3.scaleQuantize()
              .range([
                     "rgb(237,248,233)",
                     "rgb(186,228,179)",
                     "rgb(116,196,118)",
                     "rgb(49,163,84)",
                     "rgb(0,109,44)"
                    ]);

var formatAsThousands = d3.format(',');

// Load data
d3.csv('us-ag-productivity.csv', function(data) {
  // Map colors to inputs
  color.domain([
                d3.min(data, function(d) {
                  return d.value;
                }),
                d3.max(data, function(d) {
                  return d.value;
                })
              ]);

  // For each state's info in the csv, loop through
  d3.json('../albers-projection/us-states.json', function(json) {
    // Merge agri data and GeoJSON bc we can only map 1 dataset to
    // elements at a time

    for(var i=0; i < data.length; i++) {
      var dataState = data[i].state; // get state name

      var dataValue = parseFloat(data[i].value); // convert to float

      for(var j=0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        // search for matching state: if state in agri csv is same as
        // that in GeoJSON
        if (dataState === jsonState) {
          // set the geo map's state value to that of the agri data
          json.features[j].properties.value = dataValue;

          break;
        }
      }
    }

    // Draw paths
    svg.selectAll('path')
       .data(json.features)
       .enter()
       .append('path')
       .attr('d', path)
       .style('fill', function(d) {
                var value = d.properties.value;

                // if value is valid, color in the state
                if(value) {
                  return color(value);
                } else {
                  return '#ccc';
                }
              });

      // Load cities
      d3.csv('us-cities.csv', function(data) {
        svg.selectAll('circle')
           .data(data)
           .enter()
           .append('circle') // represent each city as circle
           .attr('cx', function(d) { // input geo coords, get screen xy
              return projection([d.lon, d.lat])[0];
            })
           .attr('cy', function(d) {
              return projection([d.lon, d.lat])[1];
            })
           .attr('r', function(d) {
              return Math.sqrt(parseInt(d.population) * 0.00004);
 // scale the circles
           })
           .style('fill', 'yellow')
           .style('stroke', 'gray')
           .style('stroke-width', 0.25)
           .style('opacity', 0.75)
           .append('title')
           .text(function(d) {
              return d.place + ": Pop. " + formatAsThousands(d.population);
            });

           createPanButtons();
      });
    });

  // Add panning
  var createPanButtons = function() {
    // Create clickable elements

    // North
    var north = svg.append('g')
                   .attr('class', 'pan') // will watch all pan els
                   .attr('id', 'north'); // give unique direction

    north.append('rect')
         .attr('x', 0)
         .attr('y', 0)
         .attr('width', w)
         .attr('height', 30); // NOTE: magic number?

    north.append('text')
         .attr('x', w / 2) // center  text
         .attr('y', 20) // NOTE: magic number?
         .attr('&uarr;'); //unicode for arrow char

    // South
    var south = svg.append('g')
                   .attr('class', 'pan')
                   .attr('id', 'south');

    south.append('rect')
                   .attr('x', w / 2)
                   .attr('y', 20)
                   .html('&uarr;');

    south.append('text')
             .attr('x', w / 2) // center  text
             .attr('y', 20) // NOTE: magic number?
             .attr('&uarr;'); //unicode for arrow char

    // West
    var west = svg.append('g')
                   .attr('class', 'pan')
                   .attr('id', 'west');

    west.append('rect')
                   .attr('x', 0)
                   .attr('y', 30)
                   .attr('width', 30)
                   .attr('height', h - 60);

    west.append('text')
             .attr('x', 15) // center  text
             .attr('y', h / 2) // NOTE: magic number?
             .attr('&larr;'); //unicode for arrow char

    // East
    var east = svg.append('g')
                   .attr('class', 'pan')
                   .attr('id', 'east');

    east.append('rect')
                   .attr('x', 0)
                   .attr('y', 30)
                   .attr('width', 30)
                   .attr('height', h - 60);

    east.append('text')
             .attr('x', 15) // center  text
             .attr('y', h / 2) // NOTE: magic number?
             .attr('&larr;'); //unicode for arrow char

    // Panning event listener
    d3.selectAll('pan')
      .on('click', function() {
        var  offset = projection.translate(); // move view of the map
        console.log('touch');
        // amount of space to move on click
        var moveAmount = 50;

        // Get direction to move in
        var direction = d3.select(this).attr('id');

        // Modify the offset, depending on the direction
        switch(direction) {
          case 'north':
            offset[1] += moveAmount; // increases y offset
            break;
          case 'south':
            offset[1] -= moveAmount; // decreases y offset
            break;
          case 'west':
            offset[0] += moveAmount; // increases x offset
            break;
          case 'east':
            offset[0] -= moveAmount; // decrease x offset
            break;
          default:
            break;
        }

        // Update map (projection) with this new offset
        projection.translate(offset);

        // Update all the visual elements
        svg.selectAll('path')
           .attr('d', path);

        svg.selectAll('circle')
           .attr('cx', function(d) {
              return projection([d.lon, d.lat])[0];
           })
           .attr('cy', function(d) {
              return projection([d.lon, d.lat])[1];
           });
      });
  }
});
