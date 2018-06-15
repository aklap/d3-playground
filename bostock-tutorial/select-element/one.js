// Select one element: Add the text 'Hello world!' to your web page
// using D3.js// Add the text 'Hello world!' to your web page using d3.js
var body = d3.select('body'),
    div = body.append('div');

// Inject the text into the div we're appending
div.html('Hello world!');