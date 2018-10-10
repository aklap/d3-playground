var w = 500,
    h = 300;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var projection = d3.geoAlbersUsa()
                   .translate([w/2, h/2])
                   .scale([500]);

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
           .attr('cx', function(d) {
              return projection([d.lon, d.lat])[0];
            })
           .attr('cy', function(d) {
              return projection([d.lon, d.lat])[1];
            })
           .attr('r', 5)
           .style('fill', 'yellow')
           .style('stroke', 'gray')
           .style('stroke-width', 0.25)
           .style('opacity', 0.75)
           .append('title')
           .text(function(d) {
              return d.place + ": Pop. " + formatAsThousands(d.population);
            });
      });
    });
});




