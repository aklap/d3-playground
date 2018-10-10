var w = 500,
    h = 300;

var svg = d3.select('body')
            .append('svg')
            .attr('w', w)
            .attr('h', h);

// Define path generator; use Albers USA projection
var path = d3.geoPath()
             .projection(d3.geoAlbersUsa());

// Load JSON data
d3.json('us-states.json', function(json) {
  svg.selectAll('path')
     .data(json.features)
     .enter()
     .append('path')
     .attr('d', path);
});