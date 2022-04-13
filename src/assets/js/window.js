import * as d3 from 'd3';

const setDivGrid = (margin, height, width) => (id) => {
  return d3.select(id)
    .append('svg')
    .attr('id', `${id}-svg`)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
};

const setSVGG = (margin, id) => (grid) => {
  return grid.append('g')
    .attr('id', id)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
};

export { setDivGrid, setSVGG };
