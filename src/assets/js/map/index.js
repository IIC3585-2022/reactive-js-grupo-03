import * as d3 from 'd3';

/**
@param dim = {
    cubeSize,
    width,
    height
}
@param circleFilter = function return boolean
@return void
*/

const drawCircles = (dim) => (circleFilter) => (grid, data, j) => {
  const colorByNumber = (number) => {
    switch (number) {
      case 0:
        return 'yellow';
      case 15:
        return 'orange';
      default:
        return 'black';
    }
  };
  /// d3 add circles
  grid
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .style('stroke', (d, _) => colorByNumber(d))
    .style('fill', (d, _) => colorByNumber(d))
    .attr('r', dim.width)
    .attr('cx', (_, i) => (i + 1 / 2) * dim.cubeSize)
    .attr('cy', (j + 1 / 2) * dim.cubeSize);
};

const drawCubes = (dim) => (cubeFilter) => (grid, data, j) => {
  const colorByNumber = (number) => {
    switch (number) {
      case -1:
        return 'black';
      case 0:
        return 'black';
      case 15:
        return 'black';
      default:
        return 'blue';
    }
  };
  /// d3 add cubes
  grid
    .selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', (_, i) => i * dim.cubeSize)
    .attr('y', () => j * dim.cubeSize)
    .attr('width', dim.width)
    .attr('height', dim.height)
    .attr('fill', (d, _) => colorByNumber(d));
};

/**
@param d3.Object
@return functions
*/
const MAP = (mapGrid) => {
  const _mapGrid = mapGrid;

  return {
    draw(map, drawFunction) {
      _mapGrid
        .selectAll('g')
        .data(map)
        .enter()
        .append('g')
        .each(function (data, j) {
          drawFunction(d3.select(this), data, j);
        });
    },
  };
};

export { MAP, drawCircles, drawCubes };
