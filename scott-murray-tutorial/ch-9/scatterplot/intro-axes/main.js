// Constants
var w = 500,
    h = 300,
    padding = 30;

// Make dynamic dataset

var dataset = [];
var numDataPoints = 50;
var maxRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.floor(Math.random() * maxRange);
  var newNumber2 = Math.floor(Math.random() * maxRange);

  dataset.push([newNumber1, newNumber2]);
}

// Set scales
// Set x axis to scale of inputs of 0-max data, outputs 0-width of svg
var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d){
                return d[0]; })])
               .range([padding, w - padding * 2]);

// Set y axis to scale of inputs 0-max data 2nd val, outputs 0-height of svg
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                  return d[1];})])
               .range([h - padding, padding]);

// Create axes and pass in scale as argument
var xAxis = d3.axisBottom(xScale)
              .ticks(5); // suggest minimum of ticks
              // .tickValues([0, 100, 250, 600]); // set ticks manually, D3 won't override

var yAxis = d3.axisLeft(yScale)
              .ticks(5);

// Create svg
var svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

// Scatterplot with hierarchical size
svg.selectAll('circle') // each data point will be a circle
   .data(dataset)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
      return xScale(d[0]); //return _scaled_ value
   })
   .attr('cy', function(d) {
      return yScale(d[1]);
   })
   .attr('r', 2);

// Add x axis
svg.append('g') // add group element, an invisible element
   .attr('class', 'x axis')
   .attr('transform', 'translate(0,' + (h - padding) + ')') // move
   // down by certain number of pixels
   .call(xAxis); // apply a transformation to our svg

// Add y axis
svg.append('g')
   .attr('class', 'y axis')
   .attr('transform', 'translate(' + padding + ',0)')
   .call(yAxis);

//On click, update with new data
d3.select("p")
  .on("click", function() {
    //New values for dataset
    var numValues = dataset.length;               //Count original length of dataset
    var maxRange = Math.random() * 1000;            //Max range of new values
    dataset = [];                         //Initialize empty array
    for (var i = 0; i < numValues; i++) {           //Loop numValues times
      var newNumber1 = Math.floor(Math.random() * maxRange);  //New random integer
      var newNumber2 = Math.floor(Math.random() * maxRange);  //New random integer
      dataset.push([newNumber1, newNumber2]);         //Add new number to array
    }

    //Update scale domains
    xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
    yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    //Update all circles
    svg.selectAll("circle")
       .data(dataset)
       .transition()
         .duration(1000)
       .attr("cx", function(d) {
          return xScale(d[0]);
       })
       .attr("cy", function(d) {
          return yScale(d[1]);
       });

    // Update the x axis
    svg.select('.x.axis')
       .transition()
       .duration(1000)
       .call(xAxis); // this will re-generate the x axis and scale it

    // Update the y axis
    svg.select('.y.axis')
       .transition()
       .duration(1000)
       .call(yAxis); // this will re-generate the x axis and scale it
  });
