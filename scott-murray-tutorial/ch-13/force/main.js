var w = 500,
    h = 300;

//Original data
var dataset = {
  nodes: [
    { name: "Adam" },
    { name: "Bob" },
    { name: "Carrie" },
    { name: "Donovan" },
    { name: "Edward" },
    { name: "Felicity" },
    { name: "George" },
    { name: "Hannah" },
    { name: "Iris" },
    { name: "Jerry" }
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 }
  ]
};

// Initialize force layout
var force = d3.forceSimulation(dataset.nodes)
              .force('charge', d3.forceManyBody())
              .force('link', d3.forceLink(dataset.edges))
              .force('center', d3.forceCenter().x(w/2).y(h/2));

// Create visual elements
var colors = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height' ,h);

var edges = svg.selectAll('line')
               .data(dataset.edges)
               .enter()
               .append('line')
               .style('stroke', '#ccc')
               .style('stroke-width', 1);

var nodes = svg.selectAll('circle')
               .data(dataset.nodes)
               .enter()
               .append('circle')
               .attr('r', 10)
               .style('fill', function(d, i) {
                return colors(i);
               });

// Add tooltips
nodes.append('title')
     .text(function(d) {
      return d.name;
     });

// Create graph by drawing lines between 2 data points
force.on('tick', function() {
  edges.attr('x1', function(d) {
    return d.source.x; // map these properties calculated by D3 to
    // visual elements in the DOM
  })
  .attr('y1', function(d) {
    return d.source.y;
  })
  .attr('x2', function(d) {
    return d.target.x;
  })
  .attr('y2', function(d) {
    return d.target.y;
  });

  // Draws a circle at each data point
  nodes.attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; });
});