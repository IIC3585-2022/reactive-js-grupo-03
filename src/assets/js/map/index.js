import * as d3 from 'd3';

const colorByNumber = (number) => {
  switch (number) {
    case -1:
      return 'black';
    case 0:
      return 'black';
    case 15:
      return 'yellow';
    default:
      return 'blue';
  }
};

/**
@param d3.Object
@return functions
*/
const MAP = (mapGrid) => {
  const _mapGrid = mapGrid;
  const _map = [];
  let _cubeSize = 0;
  const _mapDim = {
    height: 0,
    width: 0,
  };

  return {
    setMap(map) {
      _map.push(...map);
    },
    setHeight(height) {
      _mapDim.height = height;
    },
    setWidth(width) {
      _mapDim.width = width;
    },
    setCubeSize(cubeSize) {
      _cubeSize = cubeSize;
    },
    draw() {
      _mapGrid
        .selectAll('rect')
        .data(_map)
        .enter()
        .append('g')
        .each(function (d, j) {
          d3.select(this)
            .selectAll('rect')
            .data(d)
            .enter()
            .append('rect')
            .attr('x', (_, i) => i * _cubeSize)
            .attr('y', () => j * _cubeSize)
            .attr('width', _cubeSize)
            .attr('height', _cubeSize)
            .attr('fill', (d, _) => colorByNumber(d));
        });
    },
  };
};

export { MAP, colorByNumber };
