var dataset = [5, 10, 20, 45, 6, 25];

var pie = d3.pie();

pie(dataset);

var color = d3.scaleOrdinal(d3.schemeCategory10); // an array of 10 hex
// colors

// Create SVG
var w = 300,
    h = 300;

var svg = d3.select('body')
              .append('svg')
              .attr('width', w)
              .attr('height', h);

// Necessary for a pie chart:
var outerRadius = w / 2;
var innerRadius = 0;
var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

// Set up groups of slices in pie chart
var arcs = svg.selectAll('g.arc') // each datapoint bound to a g.arc el
              .data(pie(dataset))
              .enter()
                  .append('g')
                  .attr('class', 'arc')
                  .attr('transform', 'translate(' + outerRadius + ',' +outerRadius + ')');

// Draw arc paths
arcs.append('path')
    .attr('fill', function(d, i) {
      return color(i);
    })
    .attr('d', arc); // d3 will see the function and pass in d, i
    // automatically
