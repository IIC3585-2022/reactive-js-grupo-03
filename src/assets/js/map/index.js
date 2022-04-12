// Using d3 library

import { easeLinear } from 'd3';

/**
@param dim = {
    cubeSize,
    width,
    height
}
@param circleFilter = function return boolean
@return void
*/

const drawCircles = (dim) => (grid, data, j) => {
  const colorByNumber = (number) => {
    switch (number) {
      case 0:
        return 'yellow';
      default:
        return 'black';
    }
  };
  /// d3 add circles
  grid
    .selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', (_, i) => ((i - ((j * data.length) / (j + 1))) + 1 / 2) * dim.cubeSize)
    .attr('cy', (d) => (d === 0) ? (j + 1 / 2) * dim.cubeSize : 0)
    .attr('r', (d) => (d === 0) ? dim.width : 0)
    .style('stroke', (d, _) => colorByNumber(d))
    .style('fill', (d, _) => colorByNumber(d));
};

const deleteCircles = (grid) => {
  grid.selectAll('circle').remove();
};

const subscribeCircles = (dim) => (grid) =>
  (pacmanObservables) => {
    console.log('BBBBBBBBBBB');
    console.log(circles);
    grid.selectAll('circle').data(data).forEach((circle) => {
      pacmanObservables.forEach((pacmanObservable) => {
        pacmanObservable.subscribe(async ([x, y]) => {
          let [cx, cy] = [circle.cx, circle.cy];
          if (
            x >= cx - dim.cubeSize / 2 &&
            x <= cx + dim.cubeSize / 2 &&
            y >= cy - dim.cubeSize / 2 &&
            y <= cy + dim.cubeSize / 2
          ) {
            circle.remove();
          }
        });
      });
    });
};

const drawCubes = (dim) => (grid, data, j) => {
  const colorByNumber = (number) => {
    switch (number) {
      case -1:
        return 'black';
      case 0:
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
    .attr('x', (_, i) => (i - ((j * data.length) / (j + 1))) * dim.cubeSize)
    .attr('y', () => j * dim.cubeSize)
    .attr('width', dim.width)
    .attr('height', dim.height)
    .attr('fill', (d, _) => colorByNumber(d));
};

// Data must be an array of an object that says its place in the mapGrid
// {
//     x: 0,
//     y: 0,
//     number: 0,
//     image: '',
// }
const drawCharacter = (dim) => (timeTransition) => (grid, data) => {
  grid
    .selectAll('image')
    .data(data)
    .join(
      (enter) =>
        enter
          .append('svg:image')
          .attr('x', (d) => d.x * dim.cubeSize)
          .attr('y', (d) => d.y * dim.cubeSize),
      (update) =>
        update
          .transition()
          .duration(timeTransition)
          .ease(easeLinear)
          .attr('x', (d) => d.x * dim.cubeSize)
          .attr('y', (d) => d.y * dim.cubeSize),
      (exit) =>
        exit
          .remove(),
    )
    .attr('width', dim.width)
    .attr('height', dim.height)
    .attr('xlink:href', (d) => d.image)
    .attr('preserveAspectRatio', 'none');
};

/**
@param d3.Object
@return functions
*/
const MAP = (mapGrid) => {
  const _mapGrid = mapGrid;

  return {
    draw(array, drawFunction) {
      const mapLoads = [];
      array.forEach((row, j) => {
        mapLoads.push(...row);
        drawFunction(_mapGrid, mapLoads, j);
      });
    },
    insertElements(array, drawFunction) {
      drawFunction(_mapGrid, array);
    },
    subscribeObserver(subscribeFunction) {
      return subscribeFunction(_mapGrid);
    },
    delete(deleteFunction) {
      deleteFunction(_mapGrid);
    },
  };
};

module.exports = { MAP, drawCircles, drawCubes, subscribeCircles, deleteCircles, drawCharacter };
