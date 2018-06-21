// Chain operations to many new elements

d3.selectAll('section') // Select all section elements
    .attr('class', 'special') // set attr on all section els
  .append('div')
    .html('But even Nikos, who could turn cats into cattle, snowflakes into snowdrops, and unicorns into men, could not change me into so much as a carnival cardsharp.')