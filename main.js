var url =
'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
var dataset;

// Append an SVG for our bar chart
d3.select('body')
  .append('svg');

// Fetch data for dataset as json with key-value of year and GDP in
// billions of USD $
d3.json(url, function(err, data) {
  if(err) {
    console.log(err);
  }

  dataset = JSON.parse(data);
});

