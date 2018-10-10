var w = 500,
    h = 300;

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Center the map
var projection = d3.geoAlbersUsa()
                   .translate([w/2, h/2])
                   .scale([500]); // scale the map down so it fits

// Define path generator; use Albers USA projection
var path = d3.geoPath()
             .projection(projection);

// Load JSON data
d3.json('us-states.json', function(json) {
  svg.selectAll('path')
     .data(json.features)
     .enter()
     .append('path')
     .attr('d', path);
});